import type { TInterpolator } from '@urpflanze/animation'
import Select from 'components/input/Select'
import React from 'react'

const EASING_OPTIONS = [
	'linear',
	'quadraticIn',
	'quadraticOut',
	'quadraticInOut',
	'cubicIn',
	'cubicOut',
	'cubicInOut',
	'quarticIn',
	'quarticOut',
	'quarticInOut',
	'quinticIn',
	'quinticOut',
	'quinticInOut',
	'sinusoidalIn',
	'sinusoidalOut',
	'sinusoidalInOut',
	'exponentialIn',
	'exponentialOut',
	'exponentialInOut',
	'circularIn',
	'circularOut',
	'circularInOut',
	'elasticIn',
	'elasticOut',
	'elasticInOut',
	'backIn',
	'backOut',
	'backInOut',
	'bounceIn',
	'bounceOut',
	'bounceInOut',
].map(e => ({ key: e, value: e }))

export default function SimpleAnimationInterpolator({
	value,
	onChange,
}: {
	value: TInterpolator
	onChange: (interpolator: TInterpolator) => void
}) {
	return (
		<div>
			Interpolator
			<Select placeholder="Interpolator" value={value} options={EASING_OPTIONS} onChange={onChange} />
		</div>
	)
}
