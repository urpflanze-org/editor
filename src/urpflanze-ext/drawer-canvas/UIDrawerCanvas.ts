import {
	IDrawerCanvasPropArguments,
	DrawerCanvas,
	BrowserDrawerCanvas,
	IBrowserDrawerCanvasOptions,
	fit,
} from '@urpflanze/drawer-canvas/dist/cjs'

import {
	IStreamArguments,
	SceneChild,
	now,
	Modifiers,
	IBufferIndex,
	IShapeBounding,
	Scene,
	ShapePrimitive,
	Vec2,
} from '@urpflanze/core/dist/cjs'
import { SceneUtilities } from 'urpflanze-ext'

export class UIDrawerCanvas extends BrowserDrawerCanvas {
	scale: number
	translate: [number, number]

	constructor(
		scene?: Scene,
		canvasOrContainer?: HTMLElement | HTMLCanvasElement | OffscreenCanvas,
		drawerOptions?: IBrowserDrawerCanvasOptions & { translate?: [number, number]; scale?: number },
		duration?: number,
		framerate?: number
	) {
		super(scene, canvasOrContainer, drawerOptions, duration, framerate, 'linear')
		this.translate = drawerOptions?.translate ?? [0, 0]
		this.scale = drawerOptions?.scale ?? 1
	}

	/**
	 * Set draw option
	 *
	 * @template K
	 * @param {(K | IDrawerOptions)} name
	 * @param {Required<IDrawerOptions>[K]} [value]
	 * @memberof CanvasDrawer
	 */
	public setOption<K extends keyof IBrowserDrawerCanvasOptions>(
		name: K | 'translate' | 'scale',
		value: IBrowserDrawerCanvasOptions[K] | number | [number, number]
	): void {
		switch (name) {
			case 'translate':
				this.translate = value as [number, number]
				break
			case 'scale':
				this.scale = value as number
				break
			default:
				super.setOption(name, value as IBrowserDrawerCanvasOptions[K])
		}
	}

	/**
	 * draw scene
	 *
	 * @static
	 * @param {IBrowserDrawerCanvasOptions} options
	 * @returns {number}
	 * @memberof DrawerCanvas
	 */
	public realDraw(options: IBrowserDrawerCanvasOptions & { ghostIndex?: number }): number {
		const start_time = now()
		const scale: number = this.scale
		const translate: Array<number> = this.translate
		const width = this.drawerOptions.width
		const height = this.drawerOptions.height

		const context = this.context as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
		const scene = this.scene as Scene
		const time = options.time ?? 0

		const bGhost: boolean =
			typeof options.ghosts !== 'undefined' &&
			options.ghosts > 0 &&
			typeof options.ghostIndex !== 'undefined' &&
			options.ghostIndex > 0
		const ghostMultiplier: number = bGhost ? 1 - (options.ghostIndex as number) / ((options.ghosts as number) + 0.5) : 0
		const ghostAlpha: boolean = options.ghostAlpha === true

		const sceneFit = fit(scene.width, scene.height, width, height, this.drawerOptions.sceneFit)

		const translateX = sceneFit.x
		const translateY = sceneFit.y

		const final_scale = [scale, scale]

		const final_translate = [
			width / 2 - (scale > 1 ? (translate[0] * width) / (1 / ((scale - 1) / 2)) : 0),
			height / 2 - (scale > 1 ? (translate[1] * height) / (1 / ((scale - 1) / 2)) : 0),
		]

		options.clear &&
			DrawerCanvas.clear(
				context,
				width,
				height,
				options.noBackground ? false : scene.background,
				options.backgroundImage,
				options.backgroundImageFit
			)

		let logFillColorWarn = false
		let logStrokeColorWarn = false

		scene.currentTime = time

		const sceneChilds = scene.getChildren()
		for (let i = 0, len = sceneChilds.length; i < len; i++) {
			const sceneChild = sceneChilds[i]

			if (
				!sceneChild.data ||
				(!(sceneChild.data.visible === false) && !(bGhost && sceneChild.data.disableGhost === true))
			) {
				sceneChilds[i].generate(time, true)

				const childIndexedBuffer = sceneChilds[i].getIndexedBuffer() || []
				const childBuffer = sceneChilds[i].getBuffer() || []

				let childVertexIndex = 0

				for (
					let currentBufferIndex = 0, len = childIndexedBuffer.length;
					currentBufferIndex < len;
					currentBufferIndex++
				) {
					const currentIndexing = childIndexedBuffer[currentBufferIndex]
					const shape = currentIndexing.shape as ShapePrimitive
					const propArguments: IDrawerCanvasPropArguments = {
						canvasContext: context,
						...currentIndexing,
					}

					const composite = DrawerCanvas.getStreamDrawerProp(shape, 'composite', propArguments, 'source-over')

					context.globalCompositeOperation = composite
					context.beginPath()
					context.moveTo(
						((childBuffer[childVertexIndex] - width / 2) * final_scale[0] + final_translate[0]) * sceneFit.scale +
							translateX,
						((childBuffer[childVertexIndex + 1] - height / 2) * final_scale[1] + final_translate[1]) * sceneFit.scale +
							translateY
					)

					childVertexIndex += 2
					for (
						let currentFrameLength = childVertexIndex + currentIndexing.frameLength - 2;
						childVertexIndex < currentFrameLength;
						childVertexIndex += 2
					)
						context.lineTo(
							((childBuffer[childVertexIndex] - width / 2) * final_scale[0] + final_translate[0]) * sceneFit.scale +
								translateX,
							((childBuffer[childVertexIndex + 1] - height / 2) * final_scale[1] + final_translate[1]) *
								sceneFit.scale +
								translateY
						)

					if (shape.isClosed()) context.closePath()

					const alpha = DrawerCanvas.getStreamDrawerProp(shape, 'opacity', propArguments, 1)

					context.globalAlpha = alpha

					const shadowColor = DrawerCanvas.getStreamDrawerProp(shape, 'shadowColor', propArguments)
					const shadowBlur = DrawerCanvas.getStreamDrawerProp(shape, 'shadowBlur', propArguments)
					const shadowOffsetX = DrawerCanvas.getStreamDrawerProp(shape, 'shadowOffsetX', propArguments)
					const shadowOffsetY = DrawerCanvas.getStreamDrawerProp(shape, 'shadowOffsetY', propArguments)

					context.shadowColor = shadowColor
					context.shadowBlur = shadowBlur
					shadowOffsetX && (context.shadowOffsetX = shadowOffsetX)
					shadowOffsetY && (context.shadowOffsetY = shadowOffsetY)

					let fill = DrawerCanvas.getStreamDrawerProp(shape, 'fill', propArguments)

					if (typeof fill !== 'undefined') {
						if (bGhost && ghostAlpha) {
							const color = DrawerCanvas.ghostifyColor(fill, ghostMultiplier)
							if (color) {
								fill = color
							} else if (!logFillColorWarn) {
								console.warn(`[Urpflanze:DrawerCanvas] Unable ghost fill color '${fill}',
								please enter a rgba or hsla color`)
								logFillColorWarn = true
							}
						}

						context.fillStyle = fill
						context.fill()
					}

					let stroke = DrawerCanvas.getStreamDrawerProp(
						shape,
						'stroke',
						propArguments,
						typeof fill === 'undefined' ? scene.color : undefined
					)
					let lineWidth = DrawerCanvas.getStreamDrawerProp(shape, 'lineWidth', propArguments, 1)

					if (stroke) {
						if (bGhost && ghostAlpha) {
							const color = DrawerCanvas.ghostifyColor(stroke, ghostMultiplier)
							if (color) {
								stroke = color
							} else if (!logStrokeColorWarn) {
								console.warn(`[Urpflanze:DrawerCanvas] Unable ghost stroke color '${stroke}',
								please enter a rgba or hsla color`)
								logStrokeColorWarn = true
							}
							lineWidth *= ghostMultiplier
						}

						const lineJoin = DrawerCanvas.getStreamDrawerProp(shape, 'lineJoin', propArguments)
						const lineCap = DrawerCanvas.getStreamDrawerProp(shape, 'lineCap', propArguments)
						const lineDash = DrawerCanvas.getStreamDrawerProp(shape, 'lineDash', propArguments)
						const lineDashOffset = DrawerCanvas.getStreamDrawerProp(shape, 'lineDashOffset', propArguments)
						const miterLimit = DrawerCanvas.getStreamDrawerProp(shape, 'miterLimit', propArguments)

						context.setLineDash.call(context, lineDash || [])
						context.lineJoin = lineJoin
						context.lineCap = lineCap
						context.lineDashOffset = lineDashOffset
						context.miterLimit = miterLimit

						context.lineWidth = lineWidth * sceneFit.scale
						context.strokeStyle = stroke
						context.stroke()
					}
				}
				context.restore()
			}
		}

		const end_time = now()

		return end_time - start_time
	}

	/**
	 * Generate image from scene
	 *
	 * @static
	 * @param {(string | SceneChild)} type
	 * @param {number} [width=800]
	 * @param {number} [height=800]
	 * @param {string} [background]
	 * @param {string} [color]
	 * @returns {Promise<string>}
	 * @memberof UIDrawerCanvas
	 */
	public static generateImage(
		type: string | SceneChild,
		width = 800,
		height = 800,
		background?: string,
		color?: string
	): Promise<string> {
		const scene = new Scene({ width, height, background, color })

		const sceneChild = SceneUtilities.create(type)

		if (sceneChild) {
			const shape = SceneUtilities.copy(sceneChild, scene, true)
			// if (shape instanceof ShapePrimitive) {
			// 	shape.style.lineWidth = 3
			// } else if (shape) {
			// 	SceneUtilities.getChildrenPrimitives(shape).forEach(shape => {
			// 		shape.style.lineWidth = 3
			// 	})
			// }

			if (shape) {
				scene.add(shape)
				scene.update(0)

				const fixedLineWidth = false
				const scale = UIDrawerCanvas.adaptShapeToScene(shape, scene)

				return UIDrawerCanvas.getSceneImage(scene, width, height, fixedLineWidth, scale).then(image =>
					image.length ? image : '/assets/images/broken-shape.png'
				)
			}
		}

		return Promise.resolve('/assets/images/broken-shape.png')
	}

	/**
	 * Scale Shape to adapt int scene size
	 *
	 * @static
	 * @param {SceneChild} shape
	 * @param {Scene} scene
	 * @param {number} [scale=1]
	 * @returns
	 * @memberof UIDrawerCanvas
	 */
	public static adaptShapeToScene(shape: SceneChild, scene: Scene, scale = 1): number {
		scene.update(0)
		const rect: IShapeBounding = Modifiers.Adapt.getBounding(shape.getBuffer() as Float32Array)

		// if (rect.width > scene.width || rect.height > scene.height)
		scale = (Math.min(scene.width, scene.height) / Math.max(rect.width, rect.height)) * scale

		return scale * 0.9
	}

	/**
	 * Return scene image
	 *
	 * @static
	 * @param {Scene} scene
	 * @param {number} [width=800]
	 * @param {number} [height=800]
	 * @param {boolean} [fixedLineWidth=false]
	 * @param {number} scale
	 * @returns
	 * @memberof UIDrawerCanvas
	 */
	public static getSceneImage(
		scene: Scene,
		width = 800,
		height = 800,
		fixedLineWidth = false,
		scale: number
	): Promise<string> {
		return new Promise(resolve => {
			if (typeof OffscreenCanvas !== 'undefined') {
				const canvas: OffscreenCanvas = new OffscreenCanvas(width, height)
				const drawer = new UIDrawerCanvas(scene, canvas, {
					scale,
					sceneFit: 'cover',
				})
				drawer.realDraw({ time: 0, fixedLineWidth, scale })

				canvas.convertToBlob({ type: 'image/png', quality: 1 }).then(blob => {
					const fileReader = new FileReader()
					fileReader.addEventListener(
						'load',
						() => (fileReader.result ? resolve(fileReader.result as string) : resolve('')),
						{ passive: true }
					)
					fileReader.readAsDataURL(blob)
				})
			} else {
				const canvas: HTMLCanvasElement = document.createElement('canvas')

				canvas.width = width
				canvas.height = height
				canvas.style.width = width + 'px'
				canvas.style.height = height + 'px'

				const drawer = new UIDrawerCanvas(scene, canvas, { time: 0, fixedLineWidth, scale, sceneFit: 'cover' })
				drawer.realDraw({ time: 0, fixedLineWidth, scale })

				resolve(canvas.toDataURL())
			}
		})
	}

	static drawSimmetricLinesWithScaleAndTranslate(
		context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
		simmetricLines: number,
		width: number,
		height: number,
		color: string,
		scale: Array<number>,
		translate: Array<number>
	): void {
		const offset = Math.PI / simmetricLines
		const size = Math.max(width, height)
		const center = [size / 2, size / 2]

		for (let i = 0; i < simmetricLines; i++) {
			const a = [-size, -size]
			const b = [size * 2, size * 2]
			const rotate = i * offset + Math.PI / 4

			Vec2.rotateZ(a, center, rotate)
			Vec2.rotateZ(b, center, rotate)

			context.beginPath()
			context.strokeStyle = color
			context.lineWidth = 1

			context.moveTo((a[0] - size / 2) * scale[0] + translate[0], (a[1] - size / 2) * scale[1] + translate[1])
			context.lineTo((b[0] - size / 2) * scale[0] + translate[0], (b[1] - size / 2) * scale[1] + translate[1])

			context.stroke()
		}
	}
}
