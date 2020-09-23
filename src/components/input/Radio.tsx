import * as React from 'react'
import styled from 'styled-components'
import pups from '@pups/js'

import Grid from '@components/Grid'

interface IRadio
{
    onChange: (selected: any) => void
    name: string
    selected: any
    align?: string
    values: Array<{ key: string, value: any }>
}

let id = 0

const Radio = (props: IRadio) => {

    const name = 'rb_'  + (++id) + '_' + props.name

    return (
        <Grid
            columns={props.values.length} 
            flow={`auto repeat(${props.values.length}, auto)`}
            gap={pups.ms(0)} 
            valign="center"
            halign={props.align || 'space-around'}
        >
            <div>
                {props.name}
            </div>
            {props.values.map(({ key, value }) => (
                <RadioContainer key={name + '_' + key}>
                    <RadioButton 
                        id={name + '_' + key} 
                        name={name}
                        value={value} 
                        defaultChecked={value == props.selected}
                        onClick={(e) => {
                            props.onChange((e.target as HTMLInputElement).value)
                        }}
                    />
                    <label htmlFor={name + '_' + key}>{key}</label>
                </RadioContainer>
            ))}
        </Grid>
    )
}

export default React.memo(Radio)

const RadioContainer = styled.div`
    position: relative;
    line-height: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding-bottom: 3px;
    color: ${pups.color('gray-dark')};
    font-size: .8rem;
    
    input:checked+label {
        color: ${pups.color('primary')};
    }

    label { cursor: pointer; }
`

const RadioButton = styled.input.attrs({
    type: 'radio'
})`
    position: absolute; 
    bottom: 0; left: 0;
    appearance: none;
    width: 100%;
    height: 3px;
    margin: 0;
    background: ${pups.color('gray-dark')};
    &:checked{
        background: ${pups.color('primary')};
    }
`