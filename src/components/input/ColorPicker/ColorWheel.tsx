import * as React from 'react'
import useDraggable from "@hooks/useDraggable"
import useRect from '@hooks/useRect'
import pups from '@pups/js'


import { getHSLAFromCoords, getWheelImage } from '@components/input/ColorPicker/ColorPickerUtility'
import { TSliderMode } from '@hooks/useSlider'



interface ColorWheelProps {
    coords: { x: number, y: number }
    value: number
    alpha: number
    color: string
    wheelSize: number
    onChange: (value: string, mode: TSliderMode) => void
}

const ColorWheel: React.FunctionComponent<ColorWheelProps> = ({ color, coords, value, alpha, onChange, wheelSize }: ColorWheelProps) => {

    const canvas = useDraggable<HTMLCanvasElement>({
        onDrag(c, clientCoords) {
            const coords = { x: clientCoords.x - rect.x, y: clientCoords.y - rect.y }
            onChange(getHSLAFromCoords(coords, value, alpha, wheelSize), 'slider')
        },
        onDragEnd(c, clientCoords) {
            const coords = { x: clientCoords.x - rect.x, y: clientCoords.y - rect.y }
            onChange(getHSLAFromCoords(coords, value, alpha, wheelSize), 'none')
        }
    })

    const rect = useRect<HTMLCanvasElement>(canvas)
    React.useEffect(() => {
        if (canvas.current)
        {
            const context = canvas.current.getContext('2d')
            context && context.putImageData(getWheelImage(value, wheelSize), 0, 0)
        }
    }, [value, canvas.current])

    return (
        <div style={{ ...CanvasContainerStyle, width: wheelSize + 'px', height: wheelSize + 'px' }}>
            <div 
                style={{ 
                    ...CursorStyle, 
                    position: 'absolute',
                    background: color,
                    transform: `translate(${coords.x}px, ${coords.y}px)`,
                    borderColor: value > 50 ? pups.color('dark').toString() : '#ffff'
                }} 
            />
            <canvas 
                ref={canvas} 
                width={wheelSize} height={wheelSize}
                style={{ width: wheelSize + 'px', height: wheelSize + 'px', transform: 'scale(1.025)'  }} 
            />
        </div>
    )
}
const CanvasContainerStyle: React.CSSProperties = {
    position: 'relative',
    borderRadius:' 50%',
    overflow: 'hidden',
    cursor: 'pointer',
    border: `1px solid ${pups.color('dark').darken(5)}`
}

const CursorStyle: React.CSSProperties = { 
    cursor: 'pointer', 
    borderRadius: '50%', 
    border: `2px solid`, 
    width: '12px', 
    height: '12px',
    top: '-7px',
    left: '-7px',
    zIndex: 1,
    backfaceVisibility: 'hidden',
    transition: 'border-color .3s ease-in',
    pointerEvents: 'none'
}


export default React.memo(ColorWheel)

