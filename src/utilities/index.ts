import { clamp } from '@urpflanze/core/dist/cjs'
import Log from 'Log'

export const debounce = function <T>(func: Function, wait = 0, immediate = false): (args?: T) => any {
	let timeout: number | null = null

	return function (): any {
		const self = this
		const args = arguments
		const later = function () {
			timeout = null
			!immediate && func.apply(self, args)
		}

		const callNow = immediate && !timeout

		timeout && clearTimeout(timeout)
		timeout = window.setTimeout(later, wait)

		callNow && func.apply(self, args)
	}
}

export const toArray = (val: number | Array<number>): [number, number] =>
	Array.isArray(val) ? (val as [number, number]) : [val, val]
export const toNumber = (val: number | Array<number>): number => (Array.isArray(val) ? val[0] : val)

export function clampArray(min: number, max: number, value: Array<number> | number): Array<number> {
	return (Array.isArray(value) ? value : new Array(2).fill(value)).map(v => clamp(min, max, v))
}

export function bRunOnServiceWorker(): boolean {
	if (Log.forceLocalWorker) return false
	const bSupportWorker: boolean = typeof Worker !== 'undefined'
	const bSupportOffscreenCanvas: boolean = typeof OffscreenCanvas !== 'undefined'
	const bSupportImageBitmapCreation = typeof window.createImageBitmap !== 'undefined'

	return bSupportWorker && bSupportOffscreenCanvas && bSupportImageBitmapCreation
}

export interface Coords {
	x: number
	y: number
}

export function ctrlKeyPressed(event: MouseEvent | KeyboardEvent | React.MouseEvent): boolean {
	return event.ctrlKey || event.metaKey
}

export function bytesToHuman(bytes: number): string {
	const i: number = Math.floor(Math.log(bytes) / Math.log(1024))
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

	return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]
}

export function getIcon(type: string): string {
	return type == 'Scene'
		? 'scene'
		: type == 'ShapeBuffer'
		? 'shape-buffer'
		: type == 'ShapePrimitive'
		? 'primitive'
		: type == 'Shape'
		? 'shape'
		: type == 'Group'
		? 'group'
		: 'shape'
}

export * from './cancelablePromise'
export * from './parseFunction'
