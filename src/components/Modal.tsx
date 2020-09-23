import * as React from 'react'
import ReactDOM from 'react-dom'

import styled, { keyframes } from 'styled-components'
import pups from '@pups/js'
import Icon from '@components/icons/Icon'


interface ModalProps {
    open: boolean
    noCloseButton?: boolean
    close?: (e: React.MouseEvent) => void
    bCloseOnBackground?: boolean
}

const Modal: React.FunctionComponent<ModalProps> = ({ bCloseOnBackground, open, close, children, noCloseButton = false }) => 
{
    const modalRoot: HTMLElement = document.getElementById('modal-root') as HTMLElement
    const container: HTMLDivElement = document.createElement('div')
    
    React.useEffect(() => {
        modalRoot.appendChild(container)
        
        return () => {
            modalRoot.removeChild(container)
        }
    }, [container]) 

    return open ? ReactDOM.createPortal((
        <Container>
            <Background onClick={(e) => bCloseOnBackground && close && close(e)} />
            <Content>
                {!noCloseButton && (
                    <IconContainer>
                        <Icon onClick={close} name="close" />
                    </IconContainer>
                )}
                {children}
            </Content>
        </Container>
    ), container) : null
}

const Container = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
`

const OpenBackground = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`

const Background = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    animation: ${OpenBackground} .1s ease-out both;
    background: rgba(0,0,0,.6);
`

const OpenModal = keyframes`
    from { opacity: 0; transform: scale(.98); }
    to { opacity: 1; transform: scale(1); }
`

const Content = styled.div`
    position: relative;
    z-index: 1000;
    max-width: 80vw;
    background: ${pups.color('dark-lighten')};
    padding: ${pups.ms(2)};
    box-shadow: 0 ${pups.ms(0)} ${pups.ms(2)} ${pups.ms(0)} rgba(0,0,0,.5);
    animation: ${OpenModal} .1s ease-out both;
    border-radius: 2px;
`

const IconContainer = styled.div`
    position: absolute;
    top: ${pups.ms(-1)}; 
    right: ${pups.ms(-1)};
`


export default React.memo(Modal)