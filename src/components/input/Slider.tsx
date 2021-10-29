import * as React from 'react'

import useSlider, { TSliderMode } from '@hooks/useSlider'

interface SliderProp {
	vertical?: boolean
	min: number
	max: number
	step: number
	value: number
	onChange: (value: any, mode: TSliderMode) => void
}

const Slider: React.FunctionComponent<SliderProp> = ({ value, step, min, max, onChange, vertical }: SliderProp) => {
	const expMatch = step.toExponential(1).match(/e(-?[0-9]+)/)
	const exp = 10 ** (expMatch ? -expMatch[1] : 0)
	const [over, setOver] = React.useState<boolean>(false)

	const [currentValue, sliderRef] = useSlider<HTMLDivElement>({
		value,
		vertical,
		step,
		exp,
		min,
		max,
		onChange,
		events: {
			drag: () => setOver(true),
		},
	})

	return (
		<div
			className={`slider slider--${vertical ? 'vertical' : 'horizontal'}`}
			ref={sliderRef}
			onMouseOver={() => !over && setOver(true)}
			onMouseOut={() => over && setOver(false)}
		>
			<div className="slider__value" style={{ [vertical ? 'top' : 'left']: currentValue.valuePercentage + '%' }}>
				<small style={{ display: over ? 'block' : 'none' }}>{currentValue.value.toFixed(Math.log10(exp))}</small>
			</div>
		</div>
	)
}

export default React.memo(Slider)
