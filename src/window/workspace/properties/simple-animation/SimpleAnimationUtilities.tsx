import { toNumber } from '@ui-services/utilities/utilies'
import { ISceneChildUtiltiesData } from '@genbs/urpflanze/dist/services/scene-utilities/SceneChildUtilitiesData'
import Easings from '@genbs/urpflanze/dist/services/animation/Easings'
import { ISimpleAnimation, TAnimation, TEasing } from '@genbs/urpflanze/dist/services/types/animation'
import SceneUtilitiesExtend from '@genbs/urpflanze/dist/services/scene-utilities/SceneUtilitiesExtended'

export const MODE_FUNCTIONS: {
	sinusoidal: Array<{ key: 'sin' | 'cos'; value: 'sin' | 'cos' }>
	easing: Array<{ key: TEasing; value: TEasing }>
} = {
	sinusoidal: [
		{ key: 'sin', value: 'sin' },
		{ key: 'cos', value: 'cos' },
	],
	easing: Object.keys(Easings).map(ease => ({ key: ease as TEasing, value: ease as TEasing })),
}

export function getSimpleAnimationInitialState(
	value: any,
	sceneChildProp: ISceneChildUtiltiesData,
	defaultDuration = 1000
): ISimpleAnimation {
	const initialValue =
		SceneUtilitiesExtend.bValueAnimation(value) && (value as TAnimation).type == 'simple' ? value.value : {}

	const initialState: ISimpleAnimation = {
		from: Array.isArray(sceneChildProp.default) ? toNumber(sceneChildProp.default) : sceneChildProp.default,
		to: sceneChildProp.default_animate,
		duration: defaultDuration,
		invertOdd: false,
		colorTransitionMode: 'rgb',
		type: 'loop',
		mode: 'sinusoidal',
		modeFunction: 'sin',

		type_value: sceneChildProp.type_value,

		delay: 0,

		...initialValue,
	}

	// if (sceneChildProp.bAngle)
	// {
	//     initialState.from = toDegrees(initialState.from as number)
	//     initialState.to = toDegrees(initialState.to as number)
	// }

	return initialState
}

export function sanitizeAnimation(sceneChildProp: ISceneChildUtiltiesData, value: ISimpleAnimation): ISimpleAnimation {
	// const newValue = {
	// 	...value,
	// 	from: sceneChildProp.type == 'color' ? value.from : parseFloat(value.from + ''),
	// 	to: sceneChildProp.type == 'color' ? value.to : parseFloat(value.to + ''),
	// 	durate: parseFloat(value.durate + ''),
	// 	delay: parseFloat(value.delay + ''),
	// }

	return value
}

export function isAdvancedAnimation(animation: ISimpleAnimation): boolean {
	return (
		animation.type !== 'loop' ||
		animation.mode !== 'sinusoidal' ||
		animation.modeFunction !== 'sin' ||
		animation.invertOdd !== false ||
		animation.colorTransitionMode !== 'rgb'
	)
}
