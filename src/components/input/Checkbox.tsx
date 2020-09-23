import * as React from 'react'
import styled from 'styled-components'
import pups from '@pups/js'


interface Props
{
    id?: string
    size?: number
    checked: boolean
    onChange: (checked: boolean) => void
    name?: string
}

export default(props: Props) => {

    const id = props.id || 'cb_' + props.name
    
    return (
        <CheckboxContainer>
            <Checkbox size={props.size || 0} id={id} type="checkbox" onChange={(e) => props.onChange((e.target as HTMLInputElement).checked)} checked={props.checked} />
            { props.name && <label htmlFor={id}>{props.name}</label> }
        </CheckboxContainer>
    )
}

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    > label { margin-left: ${pups.ms(-1)}; }
    > * { 
        cursor: pointer; 
    }
`

const Checkbox = styled.input<{ size: number }>`
    position: relative;
    appearance: none;
    margin: 0;
    border-radius: 2px;
    width: ${props => pups.ms(props.size)};
    height: ${props => pups.ms(props.size)};
    
    border: 1px solid ${pups.color('gray-dark')};
    transition: 0.1s border-color ease-out;

    &:after{
        position: absolute;
        width: 100%;
        height: 100%;
        display: block;
        content: ' ';
        background: ${pups.color('gray-dark')};
        transform: scale(.7);
        transform-origin: center center;
        transition: 0.1s background ease-out;
        border-radius: 2px;
    }

    &:checked {
        border-color: ${pups.color('primary')};

        &:after{ 
            background: ${pups.color('primary')}; 
        }
    }
`