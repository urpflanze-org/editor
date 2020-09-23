import * as React from 'react'
import styled from 'styled-components'
import pups from '@pups/js'


import Portal from '@components/Portal'
import useWindowSize from '@hooks/useWindowSize'

import Slider from '@components/input/Slider'
import { TSliderMode } from '@hooks/useSlider'

import { parseColor, ParsedColor, getHSLAFromCoords } from '@components/input/ColorPicker/ColorPickerUtility'
import ColorWheel from '@components/input/ColorPicker/ColorWheel'
import ColorPickerInput from '@components/input/ColorPicker/ColorPickerInput'
import ColorPreview from '@components/ColorPreview'
import Grid from '@components/Grid'


const SIZE = 140

interface ColorPickerProps {
    color: string
    enableAlpha?: boolean
    position: { x: number, y: number } | null | undefined
    onChange: (v: any, mode: TSliderMode) => any
}

const ColorPicker: React.RefForwardingComponent<HTMLDivElement, ColorPickerProps> = (props: ColorPickerProps, ref) => 
{
    if (!props.position)
        return null

    const color = props.color ? props.color : '#fff'
    const parsed: ParsedColor = parseColor(color, SIZE)

    const size = useWindowSize()
    
    const position = { 
        x: props.position.x > size.width - SIZE * 1.7 ? props.position.x - SIZE * 1.7 : props.position.x,
        y: props.position.y > size.height - SIZE * 1.7 ? props.position.y - SIZE * 1.7 : props.position.y,
    }

    function onChangeValue(value: number, mode: TSliderMode)
    {
        const new_color = getHSLAFromCoords(parsed.coords, value, parsed.alpha, SIZE)
        new_color != color && props.onChange(new_color, mode)
    }

    function onChangeAlpha(alpha: number, mode: TSliderMode)
    {
        const new_color = getHSLAFromCoords(parsed.coords, parsed.value, alpha, SIZE)
        new_color != color && props.onChange(new_color, mode)
    }

    function handleInput(new_color: string)
    {
        new_color != color && props.onChange(new_color, 'none')
    }

    return (
        <Portal container="#picker-root">
            <div ref={ref} style={{ position: 'relative', zIndex: 1000 }}>
                <Grid rows={3} gap={pups.ms(0)} flow="repeat(3, 'max-content')" style={{
                    ...ContainerStyle,
                    top: `${position.y}px`,
                    left: `${position.x}px`,
                }}>
                    <div style={{ display: 'flex' }}>
                        <ColorWheel wheelSize={SIZE} color={color} onChange={props.onChange} coords={parsed.coords} value={parsed.value} alpha={parsed.alpha} />
                    
                        <ValueContainer>
                            <ValueLabel>Value</ValueLabel>
                            <Slider min={0} max={100} step={1} vertical={true} value={parsed.value} onChange={onChangeValue} />
                        </ValueContainer>
                        { props.enableAlpha && (
                            <ValueContainer>
                                <ValueLabel>Alpha</ValueLabel>
                                <Slider min={0} max={1} step={0.01} vertical={true} value={parsed.alpha} onChange={onChangeAlpha} />
                            </ValueContainer>
                        )}
                    </div>
                    <div>
                        <ColorPreview color={color} />
                        <small style={{ marginLeft: pups.ms(-2)}}>{color}</small>
                    </div>
                    <div>
                        <ColorPickerInput color={color} onChange={handleInput} />
                    </div>
                </Grid>
            </div>
        </Portal>
    )
}


// background: pups.color('dark').darken(5).alpha(0.95).toString('rgba'),
const ContainerStyle: React.CSSProperties = {
    position: 'fixed',
    background: `${pups.color('dark').lighten(2)}`,
    border: `1px solid ${pups.color('dark').lighten(10)}`,
    borderRadius: '2px',
    padding: `${pups.ms(0)}`,
    userSelect: 'none',
    lineHight: pups.ms(0)
}



const ValueContainer = styled.div`
    position: relative;
    margin-left: ${pups.sub(0, -3)};
    padding-left: ${pups.add(-1)};
`

const ValueLabel = styled.div`
    position: absolute;
    font-size: .8rem;
    transform: translate(-50%, -50%) rotate(-90deg);
    left: 0;
    top: 50%;
`



export default React.memo(React.forwardRef(ColorPicker))