import { EAdaptMode } from '@urpflanze/core/dist/cjs/modifiers/Adapt'
import { IVertexCallbackAnimation } from 'urpflanze-ext'

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
	ratio: number
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
	data: Partial<ISceneChildDrawerData>

	// Only TSceneChildProp<T>
	props: TProjectSceneChildProps

	bPrimitive: boolean
	// exists if is Primitive
	style: TProjectDrawerProps

	parentId?: string | number
	// exist if Shape or Group
	children?: Array<IProjectSceneChild>
	// exist if ShapeBuffer
	shape?: Float32Array
	depth: number

	adaptMode?: EAdaptMode

	bClosed?: boolean
	bUseParent?: boolean
	bUseRecursion?: boolean
	vertexCallback?: IVertexCallbackAnimation
}

/**
 * @category Services.Export/Import
 */
// export interface IProjectSceneChildData extends ISceneChildDrawerData {
// 	imported?: boolean
// 	fill?: { r: number; g: number; b: number; a: number }
// 	stroke?: { r: number; g: number; b: number; a: number }
// 	lineWidth?: number
// }

/**
 * @category Services.Export/Import
 */
// export type TProjectSceneChildProps =
// 	| {
// 			// Map TSceneChildProp to TSceneChildUtilityPropValue
// 			[key in TSceneChildPropsExtendedKeys]?: TSceneChildPropExtendedValue
// 			// Convert ShapeLoopGenerato to IShapeLoopAnimation
// 	  }
// 	| {
// 			loop?: IShapeLoopAnimation
// 	  }

export type TProjectSceneChildProps = Partial<Record<TSceneChildPropsExtendedKeys, TSceneChildPropExtendedValue>> & {
	loop?: IShapeLoopAnimation
}

export type TProjectDrawerProps = {
	[key in TDrawerPropsExtendedKeys]?: TDrawerPropExtendedValue
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
