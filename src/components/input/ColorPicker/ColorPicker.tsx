import * as React from 'react'

import pups from '@pups/js'

import Portal from 'components/Portal'
import useWindowSize from 'hooks/useWindowSize'

import Slider from 'components/input/Slider'
import { TSliderMode } from 'hooks/useSlider'

import { parseColor, ParsedColor, getHSLAFromCoords } from 'components/input/ColorPicker/ColorPickerUtility'
import ColorWheel from 'components/input/ColorPicker/ColorWheel'
import ColorPickerInput from 'components/input/ColorPicker/ColorPickerInput'
import ColorPreview from 'components/ColorPreview'
import Grid from 'components/Grid'

const SIZE = 140

interface ColorPickerProps {
	color: string
	enableAlpha?: boolean
	position: { x: number; y: number } | null | undefined
	onChange: (v: any, mode: TSliderMode) => any
}

const ColorPicker: React.RefForwardingComponent<HTMLDivElement, ColorPickerProps> = (props: ColorPickerProps, ref) => {
	if (!props.position) return null

	const color = props.color ? props.color : '#fff'
	const parsed: ParsedColor = parseColor(color, SIZE)

	const size = useWindowSize()

	const position = {
		x: props.position.x > size.width - SIZE * 1.7 ? props.position.x - SIZE * 1.7 : props.position.x,
		y: props.position.y > size.height - SIZE * 1.7 ? props.position.y - SIZE * 1.7 : props.position.y,
	}

	function onChangeValue(value: number, mode: TSliderMode) {
		const new_color = getHSLAFromCoords(parsed.coords, value, parsed.alpha, SIZE)
		new_color != color && props.onChange(new_color, mode)
	}

	function onChangeAlpha(alpha: number, mode: TSliderMode) {
		const new_color = getHSLAFromCoords(parsed.coords, parsed.value, alpha, SIZE)
		new_color != color && props.onChange(new_color, mode)
	}

	function handleInput(new_color: string) {
		new_color != color && props.onChange(new_color, 'none')
	}

	return (
		<Portal container="#picker-root">
			<div className="color-picker" ref={ref}>
				<Grid
					className="color-picker__content"
					rows={3}
					gap={pups.ms(0)}
					flow="repeat(3, 'max-content')"
					style={{
						top: `${position.y}px`,
						left: `${position.x}px`,
					}}
				>
					<div className="color-picker__content__wrapper">
						<ColorWheel
							wheelSize={SIZE}
							color={color}
							onChange={props.onChange}
							coords={parsed.coords}
							value={parsed.value}
							alpha={parsed.alpha}
						/>

						<div className="color-picker__value">
							<div className="color-picker__value__label">Value</div>
							<Slider min={0} max={100} step={1} vertical={true} value={parsed.value} onChange={onChangeValue} />
						</div>
						{props.enableAlpha && (
							<div className="color-picker__value">
								<div className="color-picker__value__label">Alpha</div>
								<Slider min={0} max={1} step={0.01} vertical={true} value={parsed.alpha} onChange={onChangeAlpha} />
							</div>
						)}
					</div>
					<div>
						<ColorPreview color={color} />
						<small style={{ marginLeft: pups.ms(-2) }}>{color}</small>
					</div>
					<div>
						<ColorPickerInput color={color} onChange={handleInput} />
					</div>
				</Grid>
			</div>
		</Portal>
	)
}

export default React.memo(React.forwardRef(ColorPicker))
