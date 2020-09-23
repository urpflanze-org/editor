import * as React from 'react'
import styled from 'styled-components'
import pups from '@pups/js'

interface IButton {
    onClick?: any
    label: string
}

const Button: React.FunctionComponent<IButton> = ({ label, onClick }) => {
    return (
        <ButtonComponent onClick={onClick}>{label}</ButtonComponent>
    )
}

const ButtonComponent = styled.button`
    border: none;
    color: rgba(255,255,255,.8);
    background: none;
    cursor: pointer;
    line-height: 1;
    border-bottom: 2px solid ${pups.color('primary')};
    padding: ${pups.ms(-1)};

    &:hover {
        color: rgba(255,255,255,1);
    }
`


export default React.memo(Button)