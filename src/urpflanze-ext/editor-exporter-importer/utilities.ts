import {
	TVertexCallback,
	IShapeLoopGenerator,
	TShapeLoopGeneratorFormula,
	Scene,
	toRadians,
	toDegrees,
} from '@urpflanze/core/dist/cjs'
import { TAnimation } from 'urpflanze-ext'
import { SceneChildUtilitiesData } from 'urpflanze-ext'
import { TShapeLoopCallable, TTransformable } from './types'

export const RAW_ARGUMENTS = '{ repetition, recursion, shape }'
export const RAW_ARGUMENTS_WITH_PARENT = '{ repetition, recursion, shape, parent }'

export function bValueLoop(value: any): boolean {
	return (
		typeof value === 'object' &&
		'start' in value &&
		'end' in value &&
		'inc' in value &&
		'vertex' in value &&
		value.vertex.raw &&
		value.vertex.raw.length > 0
	)
}

export function bValueVertexCallback(value: any): boolean {
	return value && value.raw && value.raw.length > 0
}

export function composeVertexCallback(value: any): TVertexCallback | undefined {
	if (value && value.raw) {
		const vertexCallback = new Function(
			'vertex',
			'vertexRepetition',
			RAW_ARGUMENTS,
			`return ${value.raw}`
		) as TVertexCallback

		return vertexCallback
	}
}

export function composeLoop(loop: TShapeLoopCallable): IShapeLoopGenerator {
	const vertex = loop.vertex.raw
		? (new Function('shapeLoopRepetition', RAW_ARGUMENTS, `return ${loop.vertex.raw}`) as TShapeLoopGeneratorFormula)
		: undefined

	//Todo: number -> resolve function
	return {
		start: loop.start as number,
		end: loop.end as number,
		inc: loop.inc as number,
		vertex,
	}
}

//#endregion

// static getRandomFunctionForProp(name): (rand: number) => any {
//     const prop: ISceneChildProp = UISceneChildUtilitiesStatic.sceneChildProps[name]

//     switch (prop.type)
//     {
//         case 'multiple-range': case 'range': case 'slider':
//             return (rand: number) => {
//                 const min = prop.min as number / 2
//                 const max = prop.max as number / 2
//                 const value = min + ((max - min) * rand)
//                 return prop.bAngle ? toRadians(value) : value
//             }
//         case 'color':
//             return (rand: number) => `hsl(${Math.floor(360 * rand)}, ${Math.floor(25 + 75 * rand)}%, ${Math.floor(25 + 75 * rand)}%)`
//         default:
//             return (rand: number) => undefined
//     }
// }

//#endregion

//#region Props relative to drawer

/**
 * Check value is TAnimation
 * @param value
 */
export function bValueAnimation(value: TAnimation | any): boolean {
	return (
		value &&
		typeof value === 'object' &&
		value.type &&
		(value.type === 'simple' || value.type === 'raw') /*|| value.type == 'random'*/
	)
}

/**
 * Check value is TTransformableProp
 * @param value
 */
export function bValueTransformable(value: TTransformable | any): boolean {
	return (
		value !== null && typeof value === 'object' && typeof value.type === 'string' && value.type === 'transformable-prop'
	)
}

/**
 * Check the prop need transformation when set
 * @param name
 */
export function bPropInSceneChildUtilitiesData(name: keyof typeof SceneChildUtilitiesData): boolean {
	return typeof SceneChildUtilitiesData[name] !== 'undefined' && SceneChildUtilitiesData[name].transformation !== 'none'
}

/**
 * Transform value
 * @param scene
 * @param name
 * @param value
 */
export function getTransformedValue(
	scene: Scene,
	name: keyof typeof SceneChildUtilitiesData,
	value: TTransformable | any
): string | number | [number, number] {
	const sceneChildProp = SceneChildUtilitiesData[name]

	if (bPropInSceneChildUtilitiesData(name) && bValueTransformable(value)) {
		value = value.value

		const sceneX = name === 'distance' ? scene.height : scene.width
		const sceneY = name === 'distance' ? scene.width : scene.height

		switch (sceneChildProp.transformation) {
			case 'angle':
				if (Array.isArray(value)) {
					return [toRadians(value[0]), toRadians(value[1])]
				}
				return toRadians(value)
			case 'scene-size-percentage': {
				if (typeof scene !== 'undefined') {
					if (Array.isArray(value)) {
						return [(value[0] * sceneX) / 100, (value[1] * sceneY) / 100]
					}
					return (value * (scene.center[0] + scene.center[1])) / 100
				}
				break
			}
			case 'scene-size-percentage-inverse': {
				if (typeof scene !== 'undefined') {
					if (Array.isArray(value)) {
						return [(value[0] * 100) / sceneX, (value[1] * 100) / sceneY]
					}
					return (value * 100) / (scene.center[0] + scene.center[1])
				}
				break
			}
		}
	}

	return value
}

/**
 * Transform value inverse
 * @param scene
 * @param name
 * @param value
 */
export function getTransformedValueInverse(
	scene: Scene,
	name: keyof typeof SceneChildUtilitiesData,
	value: any
): number | Array<number> {
	const sceneChildProp = SceneChildUtilitiesData[name]

	if (bPropInSceneChildUtilitiesData(name) && bValueTransformable(value)) {
		value = value.value

		const sceneX = name === 'distance' ? scene.height : scene.width
		const sceneY = name === 'distance' ? scene.width : scene.height

		switch (sceneChildProp.transformation) {
			case 'angle': {
				if (Array.isArray(value)) {
					return [toDegrees(value[0]), toDegrees(value[1])]
				}
				return toDegrees(value)
			}
			case 'scene-size-percentage': {
				if (typeof scene !== 'undefined') {
					if (Array.isArray(value)) {
						return [(value[0] * 100) / sceneX, (value[1] * 100) / sceneY]
					}
					return (value * 100) / (scene.center[0] + scene.center[1])
				}
				break
			}
			case 'scene-size-percentage-inverse': {
				if (typeof scene !== 'undefined') {
					if (Array.isArray(value)) {
						return [(value[0] * sceneX) / 100, (value[1] * sceneY) / 100]
					}
					return (value * (scene.center[0] + scene.center[1])) / 100
				}
				break
			}
		}
	}

	return value
}
