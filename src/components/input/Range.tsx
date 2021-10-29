import * as React from 'react'
import { clamp } from '@pups/utility/build/Number'

import Icon from '@components/icons/Icon'
import useSlider, { TSliderMode } from '@hooks/useSlider'
import useRef from '@hooks/useRef'

export interface IRange {
	min: number
	max: number
	step: number
	value: number
	small?: boolean
	onChange: (value: any, mode: TSliderMode) => void
	bDefaultValue?: boolean
}

const Range: React.FunctionComponent<IRange> = ({ min, max, step, value, small, onChange, bDefaultValue }: IRange) => {
	const [inputRef] = useRef<HTMLInputElement>()
	const [bRawEdit, setRawEdit] = React.useState(false)
	const expMatch = step.toExponential(1).match(/e(-?[0-9]+)/)
	const exp = 10 ** (expMatch ? -expMatch[1] : 0)

	function handleChange(next_value: number, mode: TSliderMode): boolean {
		next_value = clamp(min, max, next_value)
		// next_value != value && onChange(next_value, mode)
		onChange(next_value, mode)
		return next_value !== value
	}

	function incValue(sign: number, mul = 1) {
		const result = clamp(min, max, Math.round((value + mul * step * sign) * exp) / exp)
		handleChange(result, 'none')
	}

	function handleInputValue(newValue: string): boolean {
		const parsed: number = parseFloat(newValue.replace(/,/g, '.'))
		if (!Number.isNaN(parsed)) {
			if (parsed == value) {
				return true
			}

			return handleChange(parsed, 'none')
		}
		return false
	}

	const [currentValue, sliderRef] = useSlider<HTMLDivElement>({
		value,
		min,
		max,
		step,
		exp,
		onChange: handleChange,
		events: {
			notDrag: () => {
				inputRef.current && handleInputValue(inputRef.current.value) && setRawEdit(false)
			},
			dragEnd: dragged => {
				!dragged && setRawEdit(true)
			},
		},
	})

	return (
		<div className={`range ${small ? 'range--small' : ''}`}>
			{bRawEdit ? (
				<input
					className="range__input"
					ref={inputRef}
					defaultValue={value}
					autoFocus={true}
					onKeyDown={e =>
						e.key === 'Enter' && handleInputValue((e.target as HTMLInputElement).value) && setRawEdit(false)
					}
					onFocus={(e: React.FocusEvent) => (e.target as HTMLInputElement).select()}
				/>
			) : (
				<React.Fragment>
					<div className="range__arrow" style={{ left: 0 }} onClick={e => incValue(-1, e.shiftKey ? 10 : 1)}>
						<Icon size={0} rotate={180} name="arrow-right" />
					</div>
					<div
						className={`range__slider ${bDefaultValue && currentValue.value === value ? 'range__slider--default' : ''}`}
						ref={sliderRef}
					>
						<div className="range__slider__slide" style={{ width: currentValue.valuePercentage + '%' }} />
						<div className="range__slider__value">{currentValue.value.toFixed(Math.log10(exp))}</div>
					</div>
					<div className="range__arrow" style={{ right: 0 }} onClick={e => incValue(1, e.shiftKey ? 10 : 1)}>
						<Icon size={0} name="arrow-right" />
					</div>
				</React.Fragment>
			)}
		</div>
	)
}

export default React.memo(Range)
