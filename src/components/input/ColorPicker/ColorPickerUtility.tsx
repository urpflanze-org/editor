import ColorManager from '@pups/core/build/Models/Color/ColorManager'
import { Coords } from '@ui-services/utilities/utilies'
import { clamp } from '@genbs/urpflanze/dist/Utilites'

export interface ParsedColor {
	value: number
	alpha: number
	coords: Coords
	hue: number
	saturation: number
}

export function validateColor(color: string): string | null {
	try {
		const parsedColor = new ColorManager(color)
		return parsedColor.toRGBA().replace(/ /gi, '')
	} catch (e) {}

	return null
}

export function parseColor(color: string, wheelSize: number): ParsedColor {
	const parsedColor = new ColorManager(color)
	const { h, s, v } = parsedColor.getHsv()
	const r = (s * wheelSize) / 2
	const angle = h * 2 * Math.PI - Math.PI

	return {
		value: Math.round(v * 100),
		alpha: parsedColor.getAlpha(),
		hue: h,
		saturation: s,
		coords: { x: r * Math.cos(angle) + wheelSize / 2, y: r * Math.sin(angle) + wheelSize / 2 },
	}
}

export function getHSLAFromCoords(coords: Coords, value: number, alpha: number, wheelSize: number): string {
	const radius = wheelSize / 2
	const angle = (Math.atan2(coords.y - radius, coords.x - radius) + Math.PI) / (2 * Math.PI)
	const distance = Math.sqrt((coords.x - radius) * (coords.x - radius) + (coords.y - radius) * (coords.y - radius))
	const saturation = distance / radius

	const color = new ColorManager(
		`rgba(${hsv2rgb(angle, saturation, value / 100).join(',')},${Math.round(alpha * 100) / 100})`
	)
	return color.toHSLA()
}

export function getWheelImage(value: number, wheelSize: number): ImageData {
	const radius = wheelSize / 2
	const image = new ImageData(wheelSize, wheelSize)
	const data = image.data

	for (let x = -radius; x < radius; x++) {
		for (let y = -radius; y < radius; y++) {
			const r = Math.sqrt(x * x + y * y)
			const phi = Math.atan2(y, x)

			if (r > radius) continue

			const deg = (phi + Math.PI) / (2 * Math.PI)
			const index = (x + radius + (y + radius) * wheelSize) * 4

			const [red, green, blue] = hsv2rgb(deg, r / radius, value / 100)

			data[index] = red
			data[index + 1] = green
			data[index + 2] = blue
			data[index + 3] = 255
		}
	}

	return image
}

export function hsv2rgb(h: number, s: number, v: number) {
	let r = 0,
		g = 0,
		b = 0
	const i = Math.floor(h * 6)
	const f = h * 6 - i
	const p = v * (1 - s)
	const q = v * (1 - f * s)
	const t = v * (1 - (1 - f) * s)
	switch (i % 6) {
		case 0:
			;(r = v), (g = t), (b = p)
			break
		case 1:
			;(r = q), (g = v), (b = p)
			break
		case 2:
			;(r = p), (g = v), (b = t)
			break
		case 3:
			;(r = p), (g = q), (b = v)
			break
		case 4:
			;(r = t), (g = p), (b = v)
			break
		case 5:
			;(r = v), (g = p), (b = q)
			break
	}
	return [r, g, b].map(v => clamp(0, 255, Math.round(v * 255)))
}
