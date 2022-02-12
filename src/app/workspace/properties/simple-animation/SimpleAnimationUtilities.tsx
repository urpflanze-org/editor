import { Easings, ISimpleAnimation, TEasings } from '@urpflanze/animation/dist/cjs'
import { bValueAnimation, ISceneChildUtiltiesData, TAnimation } from 'urpflanze-ext'
import { toNumber } from 'utilities'

export const MODE_FUNCTIONS: {
	sinusoidal: Array<{ key: 'sin' | 'cos'; value: 'sin' | 'cos' }>
	easing: Array<{ key: TEasings; value: TEasings }>
} = {
	sinusoidal: [
		{ key: 'sin', value: 'sin' },
		{ key: 'cos', value: 'cos' },
	],
	easing: Object.keys(Easings).map(ease => ({ key: ease as TEasings, value: ease as TEasings })),
}

export function getSimpleAnimationInitialState(
	value: any,
	sceneChildProp: ISceneChildUtiltiesData,
	defaultDuration = 1000
): Required<ISimpleAnimation> {
	const initialValue = bValueAnimation(value) && (value as TAnimation).type == 'simple' ? value.value : {}

	const initialState: Required<ISimpleAnimation> = {
		from: Array.isArray(sceneChildProp.default) ? toNumber(sceneChildProp.default) : sceneChildProp.default,
		to: sceneChildProp.default_animate,
		duration: defaultDuration,
		colorTransitionMode: 'rgb',
		type_value: sceneChildProp.type_value,
		delay: 0,
		afterDelay: 0,
		loop: true,
		direction: 'alternate',
		interpolator: 'linear',
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
	const newValue: Partial<ISimpleAnimation> = {
		...value,
		from: sceneChildProp.type == 'color' ? value.from : parseFloat(value.from + ''),
		to: sceneChildProp.type == 'color' ? value.to : parseFloat(value.to + ''),
		duration: parseFloat(value.duration + ''),
		delay: parseFloat(value.delay + ''),
	}

	return newValue as ISimpleAnimation
}

export function isAdvancedAnimation(animation: ISimpleAnimation): boolean {
	return (
		// animation.type !== 'loop' ||
		// animation.mode !== 'sinusoidal' ||
		// animation.modeFunction !== 'sin' ||
		// animation.invertOdd !== false ||
		animation.colorTransitionMode !== 'rgb'
	)
}
