import * as React from 'react'
import styled from 'styled-components'
import pups from '@pups/js'

import useClipboard from '@hooks/useClipboard'

import ColorPreview from '@components/ColorPreview'
import Grid from '@components/Grid'
import { validateColor } from '@components/input/ColorPicker/ColorPickerUtility'

const ColorPickerInput: React.FunctionComponent<{ color: string, onChange: (color: string) => void }> = ({ color, onChange }) => 
{
    const inputRef = React.useRef<HTMLInputElement>(null)
    
    const [clipboardData] = useClipboard()

    const clipboardColor: string | null = clipboardData ? validateColor(clipboardData) : null
    
    function checkInputColor()
    {
        if (inputRef.current && inputRef.current.value.length > 0)
        {
            const new_color: string | null = validateColor(inputRef.current.value)
            
            if (new_color && new_color != color)
            {
                inputRef.current.value = ''
                onChange(new_color)
            }
        }
    }

    return (
        <Grid columns={3} flow="repeat(3, max-content)" valign="center" gap={pups.ms(-1)} style={{ width: '100%' }}>
            <InputText ref={inputRef} placeholder="Insert color" onKeyUp={(e) => e.keyCode == 13 && checkInputColor()} />
            <Add onClick={() => checkInputColor()}>Add</Add>
            
            { clipboardColor 
                ? <ColorPreview onClick={() => onChange(clipboardColor)} color={clipboardColor} clipboard={false} /> 
                : <div style={{ width: pups.ms(0), height: pups.ms(0) }}></div>
             }
                
        </Grid>
    )
}

const InputText = styled.input`
    width: ${pups.add(4, 2)};
    padding: ${pups.ms(-3)} ${pups.ms(-2)};
    background: ${pups.palette.get('dark', 'hex').darken(5)};
    border:none;
    font-size: 1rem;
    color: #fff;
`

const Add = styled.div`
    cursor: pointer;
    color: rgba(255,255,255,.3);
    &:hover {
        color: rgba(255,255,255,.6);
    }
`

export default React.memo(ColorPickerInput)