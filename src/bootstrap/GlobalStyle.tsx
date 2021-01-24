import { createGlobalStyle, keyframes } from 'styled-components'
import pups from '@pups/js'

// const dark = pups.palette.get('dark', 'rgb')
// const dark2 = dark.lighten(80)
// const primary = pups.palette.get('primary', 'rgb')
// const primary2 = primary.spin(180)

// pups.palette.addColor(dark2.toString('hex'), 'dark')
// pups.palette.addColor(primary2.toString('hex'), 'primary')

import VisualEditorStyle from '@components/VisualEditor/VisualEditorStyle'
import CodeEditorStyle from '@popup-windows/code-editor-window/CodeEditorStyle'

const promptAnimation = keyframes`
    from { transform: translateX(-50%) scale(1.05); box-shadow: 0 ${pups.ms(-1)} ${pups.ms(1)} rgba(20,20,20,.9); }
    to { transform: translateX(-50%) scale(1); box-shadow: 0 ${pups.ms(-1)} ${pups.ms(0)} rgba(0,0,0,.6); }
`
const promptFocusAnimation = keyframes`
    from { transform: translateX(-50%) scale(1.05); box-shadow: 0 ${pups.ms(-1)} ${pups.ms(1)} rgba(20,20,20,.9); }
    to { transform: translateX(-50%) scale(1); box-shadow: 0 ${pups.ms(-1)} ${pups.ms(0)} rgba(0,0,0,.6); }
`

export default createGlobalStyle`  
    ::-webkit-scrollbar {
        width: ${pups.ms(-2)};
        height: ${pups.ms(-2)};
        background-color: ${pups.palette.get('dark', 'hex').lighten(5)};
    }

    ::-webkit-scrollbar-thumb { 
        background: ${pups.palette.get('dark', 'hex').lighten(20)}; 
        border-radius: 6px; 
    }
    
    html {       
        background: ${pups.palette.get('dark', 'hex').darken(5)};
        color: rgba(255,255,255,.8);
    }

    html, body {
        margin: 0;
    }

    
    input::-moz-selection{ 
        background: ${pups.color('dark', 'hex').lighten(60)}; 
    }
    input::selection{ 
        background: ${pups.color('dark', 'hex').lighten(60)}; 
    }

    input { color: inherit; font-family: inherit; font-size: inherit; }

    #picker-root {  position: relative; z-index: 10000; }
    #modal-root {  position: relative; z-index: 1000; }
    #alert-root {  position: relative; z-index: 1000; }

    * { box-sizing: border-box; scrollbar-width: thin; }
    *:not(input) { user-select: none; }

    *:focus { outline: 1px solid rgba(255,255,255,.2); }

    h1, h2, h3 { margin: 0; }

    #prompt-root, #alert-root {
        &.open {
            position: fixed;
            z-index: 100000000;
            top: 0; left: 0;
            width: 100vw;
            height: 100vh;
        }
        .prompt, .alert {
            position: fixed;
            z-index: 1000000000;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            background: ${pups.color('dark-lighten')};
            box-shadow: 0 ${pups.ms(-1)} ${pups.ms(0)} rgba(0,0,0,.6);
            padding: ${pups.ms(0)};
            border-radius: 0 0 2px 2px;
            
            &.prompt--focus {
                animation: ${promptFocusAnimation} .3s both;
            }

            &__label {
                font-size: ${pups.ms(0)};
                font-weight: bold;
                margin-bottom: ${pups.ms(-1)};
            }
            &__input {
                width: ${pups.ms(6)};
                line-height: 1;
                background: ${pups.color('dark')};
                border: none;
                margin-right: ${pups.ms(-1)};
                padding: ${pups.ms(-1)};
            }
            
            &__confirm_buttons {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-gap: ${pups.ms(0)};
                justify-content: space-between;
            }

            &__button { 
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
            }
        }
    }

    ${VisualEditorStyle}
    ${CodeEditorStyle}

    .input, .textarea {
        background: ${pups.color('dark')};
        color: ${pups.color('lighten')};
    }
`
