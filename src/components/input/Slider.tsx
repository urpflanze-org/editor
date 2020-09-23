import * as React from 'react'

import styled from 'styled-components'
import pups from '@pups/js'

import useSlider, { TSliderMode } from '@hooks/useSlider'


interface SliderProp
{
    vertical?: boolean
    min: number
    max: number
    step: number
    value: number
    onChange: (value: any, mode: TSliderMode) => void
}

const Slider: React.FunctionComponent<SliderProp> = ({ value, step, min, max, onChange, vertical }: SliderProp) =>
{
    const expMatch = step.toExponential(1).match(/e(-?[0-9]+)/)
    const exp = 10 ** (expMatch ? -expMatch[1] : 0)
    const [over, setOver] = React.useState<boolean>(false)

    const [currentValue, sliderRef] = useSlider<HTMLDivElement>({ value, vertical, step, exp, min, max, onChange, events: {
        drag: () => setOver(true)
    } })

    return (
        <Container vertical={vertical} ref={sliderRef} onMouseOver={() => !over && setOver(true)} onMouseOut={() => over && setOver(false)}>
            <Value style={{ [vertical ? 'top' : 'left']: currentValue.valuePercentage + '%' }}>
                <small style={{ display: over ? 'block' : 'none' }}>{currentValue.value.toFixed(Math.log10(exp))}</small>
            </Value>
        </Container>
    )
}

const Container = styled.div<{ vertical?: boolean }>`
    position: relative;
    line-height: 0;
    
    ${ props => props.vertical ? `
        width: ${pups.ms(0)};
        min-height: ${pups.ms(4)};
        height: 100%;  
        padding: ${pups.div(0, '1.6rem')} 0;
        transform: scale(-1);

        > div { transform: translate(0%, -50%) scale(-1.2); }
        cursor: n-resize;
    ` : `
        height: ${pups.ms(0)};
        min-width: ${pups.ms(4)};
        width: 100%;  
        padding: 0 ${pups.div(0, '1.6rem')};

        > div { transform: translate(-50%, 0) scale(1.2); }
        cursor: e-resize;
    `}
    border-radius: ${pups.ms(0)};
    background: ${pups.color('dark', 'hex')};
    

        
    &:hover > div{
        background: ${pups.color('dark-lighten').lighten(10)};
    }
`

const Value = styled.div`
    position: absolute;
    height: ${pups.ms(0)};
    width: ${pups.ms(0)};
    border-radius: ${pups.ms(0)};
    background: ${pups.color('dark-lighten')};
    box-shadow: 0 0 4px 1px rgba(0,0,0, .6);
    pointer-events: none;

    > small {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translate(-50%, -${pups.add(-2, '2px')});
        line-height: 1;
        background: ${pups.color('dark-lighten').lighten(10)};
        padding: ${pups.ms(-3)} ${pups.ms(-2)};
        border-radius: 2px;

        &:after{
            display: block;
            content: ' ';
            clear: both;
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translate(-50%, -2px);
            border-top: 6px solid ${pups.color('dark-lighten').lighten(10)};
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
        }
    }
`


export default React.memo(Slider)