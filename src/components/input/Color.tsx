import * as React from 'react'

import ColorPreview from '@components/ColorPreview'
import ColorPicker from '@components/input/ColorPicker/ColorPicker'

import { Coords, ctrlKeyPressed } from '@ui-services/utilities/utilies'

import { TSliderMode } from '@hooks/useSlider'

interface ColorProps {
	value: string
	onChange: (value: string, preventPushToHistory: boolean) => void
	enableAlpha?: boolean
	size?: number
}

const Color: React.FunctionComponent<ColorProps> = ({ value, enableAlpha, size, onChange }) => {
	const [color, setColor] = React.useState<string>(value)
	const [openCoords, setOpenCoords] = React.useState<Coords | null>(null)

	const colorRef = React.useRef<HTMLDivElement>(null)
	const colorPickerRef = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		value != color && setColor(value)

		function handleClick(e) {
			if (
				!ctrlKeyPressed(e) &&
				(e.target == colorRef.current ||
					colorRef.current?.contains(e.target) ||
					e.target == colorPickerRef.current ||
					colorPickerRef.current?.contains(e.target))
			)
				openCoords == null && setOpenCoords({ x: e.clientX + 12, y: e.clientY + 12 })
			else {
				openCoords != null && setOpenCoords(null)
			}
		}

		document.addEventListener('mousedown', handleClick, { passive: true })

		return () => document.removeEventListener('mousedown', handleClick)
	}, [value, colorRef.current, colorPickerRef.current, openCoords])

	function handleChange(value, mode: TSliderMode) {
		if (mode == 'slider') setColor(value)

		onChange(value, mode == 'slider')
	}

	return (
		<React.Fragment>
			<div ref={colorRef} className="color">
				<ColorPreview size={size} color={color} onClick={e => (!ctrlKeyPressed(e) ? false : undefined)} />
			</div>
			<ColorPicker
				ref={colorPickerRef}
				enableAlpha={enableAlpha ?? true}
				position={openCoords}
				color={color}
				onChange={handleChange}
			/>
		</React.Fragment>
	)
}

export default React.memo(Color)
