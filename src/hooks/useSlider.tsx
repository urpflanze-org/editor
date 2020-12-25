import * as React from 'react'

import useDraggable from '@hooks/useDraggable'
import useRect from '@hooks/useRect'
import useWheel from '@hooks/useWheel'
import { clamp, relativeClamp } from '@genbs/urpflanze/dist/Utilites'

type TChangeMode = 'slider' | 'none'

interface ISliderInteface {
	value: number
	step: number
	exp: number
	min: number
	max: number
	vertical?: boolean
	onChange: (value: number, mode: TChangeMode) => void
	onClick?: () => void
	events?: {
		notDrag?: () => void
		dragStart?: () => void
		drag?: (coords: { x: number; y: number }) => void
		dragEnd?: (dragged: boolean) => void
	}
}

type TSliderValueInteface<T> = [{ value: number; valuePercentage: number }, React.RefObject<T>, DOMRect]

export type TSliderMode = 'slider' | 'none'

function useSlider<T extends HTMLElement>({
	value,
	step,
	vertical,
	exp,
	min,
	max,
	onChange,
	events,
}: ISliderInteface): TSliderValueInteface<T> {
	const initialValuePercentage = relativeClamp(min, max, value, 0, 100)
	const [currentValue, setCurrentValue] = React.useState({
		value,
		valuePercentage: initialValuePercentage,
	})

	const sliderRef: React.RefObject<T> = useDraggable({
		onNotDrag: () => {
			events && events.notDrag && events.notDrag()
		},
		onDragStart: () => {
			events && events.dragStart && events.dragStart()
		},
		onDrag: coords => {
			const values = valueFromCoords(coords)
			if (values.value != currentValue.value) {
				setCurrentValue(values)
				onChange(values.value, 'slider')
			}
			events && events.drag && events.drag(coords)
		},
		onDragEnd: coords => {
			const dragged = Math.abs(vertical ? coords.y : coords.x) > 0
			dragged && onChange(valueFromCoords(coords).value, 'none')
			events && events.dragEnd && events.dragEnd(dragged)
		},
	})

	const rect = useRect(sliderRef)

	useWheel(sliderRef, (deltaY, e) => {
		const sign = Math.sign(deltaY) * -1
		const mul = e.shiftKey ? 10 : 1
		const finalValue = clamp(min, max, Math.round((currentValue.value + mul * step * sign) * exp) / exp)
		onChange(finalValue, 'none')
	})

	React.useEffect(() => {
		setCurrentValue({ value, valuePercentage: relativeClamp(min, max, value, 0, 100) })
	}, [value])

	function valueFromCoords(coords: { x: number; y: number }) {
		const steps = (max - min) / step

		const offset = vertical ? (-coords.y * 100) / rect.height : (coords.x * 100) / rect.width
		const valuePercentage = clamp(0, 100, offset + initialValuePercentage)
		const inc = Math.round((valuePercentage / 100) * steps)

		const value = clamp(min, max, Math.round((min + inc * step) * exp) / exp)
		return { value, valuePercentage }
	}

	return [currentValue, sliderRef, rect]
}

export default useSlider
