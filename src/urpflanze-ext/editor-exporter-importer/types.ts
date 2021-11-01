import {
	ILissajousProps,
	IPolygonProps,
	IPropArguments,
	IRoseProps,
	IShapeBufferProps,
	IShapeFollowProps,
	IShapeLoopProps,
	IShapePrimitiveProps,
	IShapeRecursiveProps,
	ISpiralProps,
	IStarProps,
	ISuperShapeProps,
	TSceneChildProp,
} from '@urpflanze/core/dist/cjs'
import { EAdaptMode } from '@urpflanze/core/dist/cjs/modifiers/Adapt'
import { IDrawerCanvasStreamProps, TDrawerCanvasProp } from '@urpflanze/drawer-canvas/dist/cjs'
import { ICallableValue, IVertexCallbackAnimation, TAnimation, TCallableValue } from 'urpflanze-ext'

/**
 * @category Services.Export/Import
 */
export interface IProjectSequence {
	duration: number
	framerate: number
}

/**
 * @category Services.Export/Import
 */
export interface IProject {
	urpflanze_version: string
	id: string
	name: string
	background: string
	color: string

	width?: number
	height?: number
	resolution?: number

	// DrawOptions
	backgroundImage?: string
	clear: boolean
	ghosts: number
	ghostSkipTime?: number
	ghostSkipFunction?: number | string | CallableFunction

	// Timeline
	sequence: IProjectSequence

	// Scene
	scene: {
		[key: string]: IProjectSceneChild
	}
}

/**
 * @category Services.Export/Import
 */
export interface IProjectSceneChild {
	type: string
	id: string
	name: string
	order: number
	data: any
	// data: Partial<ISceneChildDrawerData>

	// Only TSceneChildProp<T>
	props: TProjectSceneChildProps

	bPrimitive: boolean
	// exists if is Primitive
	drawer: TProjectDrawerProps

	parentId?: string | number
	// exist if Shape or Group
	children?: Array<IProjectSceneChild>
	// exist if ShapeBuffer
	shape?: Float32Array | ((propArguments: IPropArguments) => Float32Array | Array<number>)
	depth: number

	adaptMode?: EAdaptMode

	bClosed?: boolean
	bUseParent?: boolean
	bUseRecursion?: boolean
	vertexCallback?: IVertexCallbackAnimation
}

export type TProjectSceneChildPropsKeys = keyof (IShapeLoopProps &
	IShapeRecursiveProps &
	IShapeFollowProps &
	IShapeBufferProps &
	IShapePrimitiveProps &
	IPolygonProps &
	ILissajousProps &
	ISpiralProps &
	IRoseProps &
	IStarProps &
	ISuperShapeProps)

/**
 * @internal
 * @category Services.Scene Utilities
 */
export interface TShapeLoopCallable {
	start: TCallableValue<number>
	end: TCallableValue<number>
	inc: TCallableValue<number>
	vertex: ICallableValue<[number, number] | Float32Array>
	dynamyc: boolean // add 'propArguments' in loopDependencies
}

/**
 * @internal
 * @category Services.Scene Utilities
 */
export type TTransformableType = 'none' | 'angle' | 'scene-size-percentage' | 'scene-size-percentage-inverse'

/**
 * @internal
 * @category Services.Scene Utilities
 */
export type TTransformable = {
	type: 'transformable-prop'
	value: number | [number, number]
}

/**
 * @internal
 * @category Services.Scene Utilities
 */
export type TProjectSceneChildPropsValue<T = string | number | [number, number] | [number, number, number]> =
	| TShapeLoopCallable
	| TTransformable // Object
	| TAnimation // Object
	| ICallableValue<T> // Object
	| TSceneChildProp<T>

export type TProjectSceneChildProps = Partial<Record<TProjectSceneChildPropsKeys, TProjectSceneChildPropsValue>> & {
	loop?: TShapeLoopCallable
}

/**
 * @internal
 * @category Services.Scene Utilities
 */
export type TDrawerPropsExtendedKeys = keyof IDrawerCanvasStreamProps

/**
 * @internal
 * @category Services.Scene Utilities
 */
export type TDrawerPropExtendedValue<T = string | number | [number, number]> =
	| TAnimation // Object
	| ICallableValue<T> // Object
	| TDrawerCanvasProp<T>

//////////

export type TProjectDrawerProps = {
	[key in TDrawerPropsExtendedKeys]?: TDrawerPropExtendedValue
}

/**
 * @internal
 * @category Services.Scene Utilities
 */
export type TSettingsExtendedKeys =
	| 'id'
	| 'name'
	| 'order'
	| 'bClosed'
	| 'bUseParent'
	| 'bUseRecursion'
	| 'adaptMode'
	| 'vertexCallback'
// export type TSettingExtendedValue = string | number | boolean | ISceneChildPropsExtendedVertexCallback

///////

export type TSceneChildUtilitiesSettingsKeys = TProjectSceneChildPropsKeys | TSettingsExtendedKeys

export type TSceneChildUtilitiesSettings = {
	[key in TSceneChildUtilitiesSettingsKeys | 'data' | 'shape' | 'loopDependencies']?:
		| string
		| number
		| [number, number]
		| any
}

// /**
//  * @category Services.Export/Import
//  */
// export type IProjectSceneChildProps = {
// 	[k in keyof Omit<
// 		TSceneChildProps,
// 		'id' | 'name' | 'order' | 'data' | 'shape' | 'loop' | 'vertexCallback' // 'adaptMode' | 'bClosed'
// 	>]: TSceneUtilityPropValue | TAnimation | TCallableValue<number | Array<number> | vec2 | string>
// } & {
// 	loop?: IShapeLoopAnimation
// 	vertexCallback?: IVertexCallbackAnimation
// }
