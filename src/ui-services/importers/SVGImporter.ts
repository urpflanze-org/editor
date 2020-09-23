import { fromTransformAttribute, fromDefinition, compose, toSVG } from 'transformation-matrix'
import Snap from 'snapsvg-cjs'

import simplify from 'simplify-js'
import ShapePrimitive from '@genbs/urpflanze/dist/core/shapes/ShapePrimitive'

class SVGImporter {
	static readonly SVG_REGEX = /^\s*(?:<\?xml[^>]*>\s*)?(?:<!doctype svg[^>]*\s*(?:\[?(?:\s*<![^>]*>\s*)*\]?)*[^>]*>\s*)?(?:<svg[^>]*>[^]*<\/svg>|<svg[^/>]*\/\s*>)\s*$/i
	static readonly COMMENT_REGEX = /<!--([\s\S]*?)-->/g

	static isSVG(input: string): boolean {
		return SVGImporter.SVG_REGEX.test(input.replace(SVGImporter.COMMENT_REGEX, ''))
	}

	static parse(input: string): SVGElement | null {
		if (typeof DOMParser === 'undefined') {
			console.warn('DOMParser not defined')
			return null
		}

		const parser: DOMParser = new DOMParser()
		const document: Document = parser.parseFromString(input, 'image/svg+xml')
		return document.querySelector('svg')
	}

	static toBuffers(input: string, simplify = 0.001): Array<{ buffer: Float32Array; closed: boolean }> {
		const svg: SVGElement | null = SVGImporter.parse(input)

		if (svg === null) return []

		const viewBox: [number, number, number, number] = SVGImporter.getViewbox(svg)

		const groups = svg.querySelectorAll('g')

		groups.forEach(SVGImporter.propagateGroupTransformToChildren)

		const elements: Array<SVGElement> = Array.from(
			svg.querySelectorAll('rect, circle, ellipse, line, polyline, polygon, path')
		)
		const paths: Array<SVGPathElement> = ([] as Array<SVGPathElement>).concat(
			...elements.map(e => SVGImporter.elementToPath(e as SVGElement))
		)

		const expMatch = Math.max(viewBox[2] - viewBox[0], viewBox[3] - viewBox[1])
			.toExponential(1)
			.match(/e(\+?[0-9]+)/)
		const exp = Math.min(10 ** Math.max(expMatch ? +expMatch[1] : 0, 0), 1000)

		const steps = 10 / (1000 / exp)
		let buffers: Array<Float32Array> = paths.map(path => SVGImporter.pathToBuffer(path, steps, viewBox))

		buffers = buffers.map(buffer => SVGImporter.simpliyBuffer(buffer, simplify))

		if (buffers.length <= 0) return []

		const result: Array<{ buffer: Float32Array; closed: boolean }> = []
		for (let i = 0; i < buffers.length; i++)
			result.push({ buffer: buffers[i], closed: SVGImporter.pathIsClosed(paths[i]) })
		return result
	}

	static async toBuffersAsync(
		input: string,
		simplify = 0.001
	): Promise<Array<{ buffer: Float32Array; closed: boolean }>> {
		return SVGImporter.toBuffers(input, simplify)
	}

	static getViewbox(svg: SVGElement): [number, number, number, number] {
		const vb = svg.getAttribute('viewBox')
		if (vb) return vb.split(' ').map(e => parseFloat(e)) as [number, number, number, number]

		svg = svg.cloneNode(true) as SVGElement
		const elements: Array<SVGElement> = Array.from(
			svg.querySelectorAll('rect, circle, ellipse, line, polyline, polygon, path')
		)
		const paths: Array<SVGPathElement> = ([] as Array<SVGPathElement>).concat(
			...elements.map(e => SVGImporter.elementToPath(e as SVGElement))
		)

		if (paths.length > 0) {
			let width = 0
			let height = 0

			for (let i = 0, len = paths.length; i < len; i++) {
				const box = ShapePrimitive.getBounding(SVGImporter.pathToBuffer(paths[i], 1))
				box.width += box.x
				box.height += box.y
				if (box.width > width) width = box.width
				if (box.height > height) height = box.height
			}
			return [0, 0, width, height]
		}

		return [-1, -1, 1, 1]
	}

	static pathIsClosed(path: SVGPathElement): boolean {
		return path.getAttribute('d')?.trim().substr(-1).toLowerCase() === 'z'
	}

	static simpliyBuffer(buffer: Float32Array, simplifyLevel = 0.01): Float32Array {
		const simplifiedBuffer: Array<{ x: number; y: number }> = []

		for (let i = 0, len = buffer.length; i < len; i += 2) simplifiedBuffer.push({ x: buffer[i], y: buffer[i + 1] })

		const points = simplify(simplifiedBuffer, simplifyLevel, true)
		points.forEach((point, index) => {
			buffer[index * 2] = point.x
			buffer[index * 2 + 1] = point.y
		})

		return buffer.subarray(0, points.length * 2)
	}

	static pathToBuffer(path: SVGPathElement, steps = 0.01, viewBox = [-1, -1, 1, 1]): Float32Array {
		const width = viewBox[2] - viewBox[0]
		const height = viewBox[3] - viewBox[1]

		const rw = width > height ? 1 : width / height
		const rh = width > height ? height / width : 1

		const transform = path.getAttribute('transform') || ''

		let matrix
		if (transform.length > 0) {
			const transformMatrix = compose(fromDefinition(fromTransformAttribute(transform)))
			matrix = new Snap.Matrix(
				transformMatrix.a,
				transformMatrix.b,
				transformMatrix.c,
				transformMatrix.d,
				transformMatrix.e,
				transformMatrix.f
			)
		}

		const pathString = Snap.path.map(path.getAttribute('d') || '', matrix)

		const path_length = Math.floor(Snap.path.getTotalLength(pathString))
		const buffer_length = Math.floor(path_length / steps) * 2

		const buffer = new Float32Array(buffer_length)

		for (let i = 0, j = 0; i < path_length; i += steps, j += 2) {
			const { x, y } = Snap.path.getPointAtLength(pathString, i) as { x: number; y: number }
			buffer[j] = rw * (x / width) * 2 - 1
			buffer[j + 1] = rh * (y / height) * 2 - 1

			if (rw < 1) buffer[j] += 1 - rw
			if (rh < 1) buffer[j + 1] += 1 - rh
		}

		return buffer
	}

	static propagateGroupTransformToChildren(g: SVGGElement): void {
		const gTransform = g.getAttribute('transform')

		if (gTransform && gTransform.length > 0) {
			const gMatrix = compose(fromDefinition(fromTransformAttribute(gTransform)))
			const children = g.children

			Array.from(children).forEach(child => {
				const transform = child.getAttribute('transform')
				if (transform && transform.length > 0) {
					const matrix = compose(fromDefinition(fromTransformAttribute(transform)))
					const finalMatrix = compose(matrix, gMatrix)
					child.setAttribute('transform', toSVG(finalMatrix))
				} else {
					child.setAttribute('transform', gTransform)
				}
			})
		}
	}

	static elementToPath(element: SVGElement): SVGPathElement {
		const transform = element.getAttribute('transform') || ''

		if (element.nodeName == 'path') {
			const d: string | null = element.getAttribute('d') || ''

			const result = Snap.path
				.toAbsolute(d)
				.map((e: Array<any>) => `${e.shift()}${e.join(',')}`)
				.join(' ')
				.split('M')
				.filter((e: string) => e.length > 0)
				.map((e: string) => 'M' + e)

			return result.map((d: string) => {
				const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
				path.setAttribute('d', d)
				path.setAttribute('transform', transform)
				return path
			})
		}

		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

		path.setAttribute('d', SVGImporter.conversion[element.nodeName](element))
		path.setAttribute('transform', transform)

		return path
	}

	static conversion = {
		fromPercentage: (val: number | string, base: number): number =>
			/%$/.test(val + '') ? (parseFloat((val + '').replace('%', '')) * 100) / base : +val,

		chunkArray: (arr: Array<string | number>, size = 2): Array<Array<string | number>> => {
			const results: Array<Array<string | number>> = []

			while (arr.length > 0) results.push(arr.splice(0, size))

			return results
		},

		rect: (rect: SVGRectElement): string => {
			const width: number = parseFloat(rect.getAttribute('width') || '0')
			const height: number = parseFloat(rect.getAttribute('height') || '0')
			const x: number = parseFloat(rect.getAttribute('x') || '0')
			const y: number = parseFloat(rect.getAttribute('y') || '0')
			let rx: number | string = rect.getAttribute('rx') || 'auto'
			let ry: number | string = rect.getAttribute('ry') || 'auto'

			if (rx === 'auto' && ry === 'auto') rx = ry = 0
			else if (rx !== 'auto' && ry === 'auto') rx = ry = SVGImporter.conversion.fromPercentage(rx, width)
			else if (ry !== 'auto' && rx === 'auto') ry = rx = SVGImporter.conversion.fromPercentage(ry, height)
			else {
				rx = SVGImporter.conversion.fromPercentage(rx, width)
				ry = SVGImporter.conversion.fromPercentage(ry, height)
			}

			if (rx > width / 2) rx = width / 2
			if (ry > height / 2) ry = height / 2

			const hasCurves = rx > 0 && ry > 0

			return [
				`M${x + rx} ${y}`,
				`H${x + width - rx}`,
				...(hasCurves ? [`A${rx} ${ry} 0 0 1 ${x + width} ${y + ry}`] : []),
				`V${y + height - ry}`,
				...(hasCurves ? [`A${rx} ${ry} 0 0 1 ${x + width - rx} ${y + height}`] : []),
				`H${x + rx}`,
				...(hasCurves ? [`A${rx} ${ry} 0 0 1 ${x} ${y + height - ry}`] : []),
				`V${y + ry}`,
				...(hasCurves ? [`A${rx} ${ry} 0 0 1 ${x + rx} ${y}`] : []),
				'Z',
			].join(' ')
		},

		ellipse: (ellipse: SVGEllipseElement | SVGCircleElement): string => {
			const cx = parseFloat(ellipse.getAttribute('cx') || '0')
			const cy = parseFloat(ellipse.getAttribute('cy') || '0')

			const rx = parseFloat(ellipse.getAttribute('rx') ?? ellipse.getAttribute('r') ?? '0')
			const ry = parseFloat(ellipse.getAttribute('ry') ?? ellipse.getAttribute('r') ?? '0')

			return [
				`M${cx + rx} ${cy}`,
				`A${rx} ${ry} 0 0 1 ${cx} ${cy + ry}`,
				`A${rx} ${ry} 0 0 1 ${cx - rx} ${cy}`,
				`A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`,
				'Z',
			].join(' ')
		},

		circle: (circle: SVGCircleElement): string => SVGImporter.conversion.ellipse(circle),

		line: (line: SVGLineElement): string =>
			`M${line.getAttribute('x1') || '0'} ${line.getAttribute('y1') || '0'} L${line.getAttribute('x2') || '0'} ${
				line.getAttribute('y2') || '0'
			}`,

		polyline: (polyline: SVGPolylineElement): string => {
			const points = polyline.getAttribute('points') || ''
			const pointsArray = points
				.trim()
				.replace(/  +/g, ' ')
				.split(' ')
				.reduce(
					(arr: Array<string>, point: string) => [...arr, ...(point.includes(',') ? point.split(',') : [point])],
					[]
				)
			const pairs = SVGImporter.conversion.chunkArray(pointsArray, 2)

			return pairs.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')
		},

		polygon: (polygon: SVGPolygonElement): string => SVGImporter.conversion.polyline(polygon) + ' Z',

		path: (path: SVGPathElement): string => path.getAttribute('d') + '',
	}
}

export default SVGImporter
