import * as React from 'react'
import pups from '@pups/js'

import useClipboard from '@hooks/useClipboard'

import ColorPreview from '@components/ColorPreview'
import Grid from '@components/Grid'
import { validateColor } from '@components/input/ColorPicker/ColorPickerUtility'

interface IProps {
	color: string
	onChange: (color: string) => void
}

const ColorPickerInput: React.FunctionComponent<IProps> = ({ color, onChange }: IProps) => {
	const inputRef = React.useRef<HTMLInputElement>(null)

	const [clipboardData] = useClipboard()

	const clipboardColor: string | null = clipboardData ? validateColor(clipboardData) : null

	function checkInputColor() {
		if (inputRef.current && inputRef.current.value.length > 0) {
			const new_color: string | null = validateColor(inputRef.current.value)

			if (new_color && new_color != color) {
				inputRef.current.value = ''
				onChange(new_color)
			}
		}
	}

	return (
		<Grid className="color-picker__input" columns={3} flow="repeat(3, max-content)" valign="center" gap={pups.ms(-1)}>
			<input
				className="color-picker__input__input"
				ref={inputRef}
				placeholder="Insert color"
				onKeyUp={e => e.keyCode == 13 && checkInputColor()}
			/>
			<div className="color-picker__input__add" onClick={() => checkInputColor()}>
				Add
			</div>

			{clipboardColor ? (
				<ColorPreview onClick={() => onChange(clipboardColor)} color={clipboardColor} clipboard={false} />
			) : (
				<div className="color-picker__input__empty"></div>
			)}
		</Grid>
	)
}

export default React.memo(ColorPickerInput)
