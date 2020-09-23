import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import pups from '@pups/js'

interface Props {
    title: string
    disabled?: boolean
    small?: boolean
    position?: 'top' | 'left' | 'bottom' | 'right'
}

const Tooltip: React.FunctionComponent<Props> = ({ disabled, small, position, title, children, ...otherProps }) => (
    <Container disabled={disabled} {...otherProps}>
        <Label small={small || false} position={position || 'top'} dangerouslySetInnerHTML={{ __html: title }}></Label>
        {children}
    </Container>
)


const TooltipAnimation = keyframes`
    0%{ opacity: 0; }
    100%{ opacity: 1; }
`

const color = pups.color('dark').lighten(10)
const Label = styled.div<{ position: 'top' | 'left' | 'bottom' | 'right', small: boolean }>`
    position: absolute;
    text-align: left;
    background: ${color};
    font-size: ${props => props.small ? '.7rem' : '.8rem'};
    padding: ${pups.ms(-3)} ${pups.ms(-2)};
    line-height: 1.2;
    border-radius: 4px;
    opacity: 0;
    pointer-events: none;
    z-index: 1000;
    white-space: pre;

    &:after{
        position: absolute;
        display: block;
        line-height: 0;
        font-size: 0;
        content: ' ';
    }

    ${ props => {

        switch(props.position)
        {
            case 'bottom': return `
                top: 120%;
                left: 50%;
                transform: translate(-50%, 0);
                
                &:after {
                    left: 50%;
                    bottom: 100%;
                    transform: translate(-50%, 0%);
                    border-bottom: 6px solid ${color};
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                }
            `
            case 'left': return `
                top: 50%;
                right: 120%;
                transform: translate(0%, -50%);
                
                &:after {
                    left: 100%;
                    top: 50%;
                    transform: translate(0%, -50%);
                    border-left: 6px solid ${color};
                    border-top: 5px solid transparent;
                    border-bottom: 5px solid transparent;
                }
            `
            case 'right': return `
                top: 50%;
                left: 120%;
                transform: translate(0%, -50%);
                
                &:after {
                    right: 100%;
                    top: 50%;
                    transform: translate(0%, -50%);
                    border-right: 6px solid ${color};
                    border-top: 5px solid transparent;
                    border-bottom: 5px solid transparent;
                }
            `

            case 'top': return `
                bottom: 120%;
                left: 50%;
                transform: translate(-50%, 0);
                
                &:after {
                    left: 50%;
                    top: 100%;
                    transform: translate(-50%, 0%);
                    border-top: 6px solid ${color};
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                }
            `
        }
    }}
`

const Container = styled.div<{ disabled?: boolean }>`
    position: relative;
    &:hover ${Label} { 
        animation: ${props => !props.disabled ? TooltipAnimation : null} .1s .3s linear both;
    }
`


export default React.memo(Tooltip)