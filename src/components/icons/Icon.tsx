import * as React from 'react'
import styled from 'styled-components'
import pups from '@pups/js'


interface IconSettings {
    size?: number | string
    fill?: string
    stroke?: string
    strokeWidth?: number
    cursor?: string 
    rotate?: number
    disabled?: boolean
    onClick?: any
    style?: any
    valign?: string
}

interface IconProps extends IconSettings
{
    name: string
}

const Icon = (props: IconProps) => {
    
    const { name, ...otherProps } = props

    const svg = require(`./${name}.svg`).default

    return (
        <IconContainer {...otherProps} dangerouslySetInnerHTML={{ __html: svg }} />
    )
}

const IconContainer = styled.div<IconSettings>`
    display: inline-block;
    vertical-align: ${props => props.valign || 'middle' };    
    width: ${props => typeof props.size == 'string' ? props.size : pups.ms(typeof props.size !== 'undefined' ? props.size : 1)};
    height: ${props => typeof props.size == 'string' ? props.size : pups.ms(typeof props.size !== 'undefined' ? props.size : 1)};
    line-height: ${props => typeof props.size == 'string' ? props.size : pups.ms(typeof props.size !== 'undefined' ? props.size : 1)};
    font-size: 0;
    cursor: ${props => props.cursor || (props.onClick ? 'pointer' : null)};
    pointer-events: ${props => props.disabled ? 'none' : null};
    opacity: ${props => props.disabled ? .2 : props.onClick ? .8 : 1};
    transition: all .1s;
    
    &:hover {
        opacity: ${props => props.onClick ? 1 : undefined};
    }

    > svg {
        display: inline-block;
        vertical-align: middle;
        pointer-events: none;
        width: 100%;
        fill: ${props => props.fill || '#fff'};
        stroke: ${props => props.stroke };
        stroke-width: ${props => props.strokeWidth ? props.strokeWidth : props.stroke ? 1 : null};
        transition: transform .3s;

        ${ props => typeof props.rotate !== 'undefined' ? `transform: rotate(${props.rotate}deg)` : null}
    }
`


export default React.memo(Icon)