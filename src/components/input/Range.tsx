import * as React from 'react'
import styled from 'styled-components'
import pups from '@pups/js'
import { clamp } from '@pups/utility/build/Number'

import Icon from '@components/icons/Icon'
import useSlider, { TSliderMode } from '@hooks/useSlider'
import useRef from '@hooks/useRef'

export interface IRange
{
    min: number
    max: number
    step: number
    value: number
    small?: boolean
    size?: number | string
    onChange: (value: any, mode: TSliderMode) => void
    bDefaultValue?: boolean
}



const Range: React.FunctionComponent<IRange> = ({ min, max, step, value, small, size, onChange, bDefaultValue }: IRange) => 
{
    const [inputRef] = useRef<HTMLInputElement>()
    const [bRawEdit, setRawEdit] = React.useState(false)
    const expMatch = step.toExponential(1).match(/e(-?[0-9]+)/)
    const exp = 10 ** (expMatch ? -expMatch[1] : 0)

    React.useEffect(() => {
        bRawEdit && setRawEdit(false)
    }, [value])

    function handleChange(next_value: number, mode: TSliderMode): boolean
    {
        next_value = clamp(min, max, next_value)
        // next_value != value && onChange(next_value, mode)
        onChange(next_value, mode)
        return next_value != value
    }

    function incValue(sign: number, mul = 1)
    {
        const result = clamp(min, max, Math.round((value + (mul * step * sign)) * exp) / exp)
        handleChange(result, 'none')
    }

    function handleInputValue(value: string): boolean
    {
        const parsed: number = parseFloat(value.replace(/,/g, '.'))
        return !Number.isNaN(parsed) ? handleChange(clamp(min, max, parsed), 'none') : false
    }

    const [currentValue, sliderRef] = useSlider<HTMLDivElement>({ value, min, max, step, exp, onChange: handleChange, events: {
        notDrag: () => {
            !(bRawEdit && inputRef.current && handleInputValue(inputRef.current.value)) && setRawEdit(false)
        },
        dragEnd: (dragged) => {
            !dragged && setRawEdit(true)
        }
    } })
    
    return (
        <Input small={small} size={size}>
            {bRawEdit ? (
                <InputText 
                    ref={inputRef} 
                    defaultValue={value} 
                    autoFocus={true} 
                    onKeyUp={(e) => e.keyCode == 13 && handleInputValue((e.target as HTMLInputElement).value)} 
                    onFocus={(e: React.FocusEvent) => (e.target as HTMLInputElement).select()} />
            ) : (
                <React.Fragment>
                    <Arrow style={{ left: 0 }} onClick={(e) => incValue(-1, e.shiftKey ? 10 : 1)}>
                        <Icon size={0} rotate={180} name="arrow-right" />
                    </Arrow>
                    <SliderContainer ref={sliderRef} bDefaultValue={bDefaultValue && currentValue.value == value}>
                        <SliderValue style={{ width: currentValue.valuePercentage + '%' }} />
                        <Value>{currentValue.value.toFixed(Math.log10(exp))}</Value>
                    </SliderContainer>
                    <Arrow style={{ right: 0 }} onClick={(e) => incValue(1, e.shiftKey ? 10 : 1)}>
                        <Icon size={0} name="arrow-right" />
                    </Arrow>
                </React.Fragment>
            )}
        </Input>
    )
}

const Arrow = styled.div`
    display: none;
    position: absolute;
    z-index: 100;
    height: 100%;
    top: 0;
    background: ${pups.palette.get('dark-lighten', 'hex').lighten(5)};
    cursor: pointer;
`
    
const Input = styled.div<{ small?: boolean, size?: number | string }>`
    position: relative;
    height: ${props => props.small ? pups.ms(0) : props.size ? typeof props.size === 'string' ? props.size : pups.ms(props.size) : '100%'};
    line-height: ${props => props.small ? pups.ms(0) : props.size ? typeof props.size === 'string' ? props.size : pups.ms(props.size) : 'inherit'};
    font-size: ${props => props.small ? pups.sub(-1) : null };
    background: ${pups.palette.get('dark', 'hex')};
    
    width: 100%;
    &:hover ${Arrow}{ display: block; }
`

const InputText = styled.input`
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 0 ${pups.ms(-1)};
    background: ${pups.palette.get('dark', 'hex').darken(5)};
    border:none;
    color: #fff;
`

const SliderContainer = styled.div<{ bDefaultValue?: boolean }>`
    position: relative;
    height: 100%;
    opacity: ${props => props.bDefaultValue ? .3 : 1 };
    cursor: ew-resize;

    &:hover{
        background: rgba(255,255,255,.2);
    }
`

const SliderValue = styled.div`
    height: 100%;
    background: ${pups.palette.get('primary', 'hex')};
    pointer-events: none;
`

const Value = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
`



export default React.memo(Range)