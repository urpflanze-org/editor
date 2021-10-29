import * as React from 'react'
import useDraggable from '@hooks/useDraggable'
import useRect from '@hooks/useRect'
import pups from '@pups/js'

import { getHSLAFromCoords, getWheelImage } from '@components/input/ColorPicker/ColorPickerUtility'
import { TSliderMode } from '@hooks/useSlider'

interface ColorWheelProps {
	coords: { x: number; y: number }
	value: number
	alpha: number
	color: string
	wheelSize: number
	onChange: (value: string, mode: TSliderMode) => void
}

const ColorWheel: React.FunctionComponent<ColorWheelProps> = ({
	color,
	coords,
	value,
	alpha,
	onChange,
	wheelSize,
}: ColorWheelProps) => {
	const canvas = useDraggable<HTMLCanvasElement>({
		onDrag(c, clientCoords) {
			const coords = { x: clientCoords.x - rect.x, y: clientCoords.y - rect.y }
			onChange(getHSLAFromCoords(coords, value, alpha, wheelSize), 'slider')
		},
		onDragEnd(c, clientCoords) {
			const coords = { x: clientCoords.x - rect.x, y: clientCoords.y - rect.y }
			onChange(getHSLAFromCoords(coords, value, alpha, wheelSize), 'none')
		},
	})

	const rect = useRect<HTMLCanvasElement>(canvas)
	React.useEffect(() => {
		if (canvas.current) {
			const context = canvas.current.getContext('2d')
			context && context.putImageData(getWheelImage(value, wheelSize), 0, 0)
		}
	}, [value, canvas.current])

	return (
		<div className="color-picker__wheel" style={{ width: wheelSize + 'px', height: wheelSize + 'px' }}>
			<div
				className="color-picker__wheel__cursor"
				style={{
					background: color,
					transform: `translate(${coords.x}px, ${coords.y}px)`,
					borderColor: value > 50 ? pups.color('dark').toString() : '#ffff',
				}}
			/>
			<canvas
				className="color-picker__wheel__canvas"
				ref={canvas}
				width={wheelSize}
				height={wheelSize}
				style={{ width: wheelSize + 'px', height: wheelSize + 'px' }}
			/>
		</div>
	)
}

export default React.memo(ColorWheel)
