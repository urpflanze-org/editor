import pups from '@pups/js'

export default `
    .visual-editor {
        background: url(/assets/images/visual-editor-background.png);
        
        .ui-node {
            background: ${pups.color('dark').lighten(2)}!important;
            border: 1px solid ${pups.color('dark').lighten(10)};
            border-radius: 0px;
            padding-bottom: 0;
            &:hover, &.selected {
                border-color: ${pups.color('dark').lighten(20)};
            }
            .title {
                background: ${pups.color('dark')};
                color: ${pups.color('primary')};
                font-size: ${pups.ms(0)};
            }
            .title, .output-title, .input-title {
                font-family: inherit;
            }

            .output-title, .input-title {
                font-size: ${pups.sub(0, -4)};
                margin: ${pups.ms(-2)} ${pups.ms(0)};
                line-height: ${pups.add(0, -4)};
                text-transform: lowercase;
            }
            .socket {
                width: ${pups.sub(0, -4)};
                height: ${pups.sub(0, -4)};
                margin-right: -${pups.div(pups.sub(0, -4), '2rem')};
                margin-left: -${pups.div(pups.sub(0, -4), '2rem')};
                background: ${pups.color('primary')};
                outline: 2px solid ${pups.color('dark').lighten(2)};
                border: none;
                border-radius: 0;
                &:hover { background: ${pups.color('primary').spin(90)}; }
            }
            .input-control {
                max-width: 100%;
                width: auto;
                margin: ${pups.ms(-4)} ${pups.ms(-1)};
            }
            .control {
                padding: ${pups.ms(-4)} ${pups.ms(-1)};
            }
            .input-control, .control {
                input, select {
                    outline: none;
                    display: inline-block;
                    max-width: 100%;
                    background: ${pups.color('dark').lighten(5)};
                    border: 1px solid ${pups.color('dark').lighten(10)};
                    border-radius: 0;
                    font-family: inherit;
                    color: #fff;
                    font-size: ${pups.sub(0, -4)};
                    padding: ${pups.ms(-3)} ${pups.ms(-2)};
                }
            }
        }
        .connection .main-path {
            stroke: ${pups.color('primary').spin(90)};
        }
        .context-menu {
            font-size: ${pups.sub(0, -4)};        
            .search, .item {
                border-radius: 0!important;
                background: ${pups.color('dark')}!important;
                border-left: 1px solid ${pups.color('dark').lighten(10)}!important;
                border-right: 1px solid ${pups.color('dark').lighten(10)}!important;
                border-bottom: 1px solid ${pups.color('dark').lighten(2)}!important;
                padding: ${pups.ms(-2)} ${pups.ms(-2)}!important;
            }
            .search:first-child { 
                border-top: 1px solid ${pups.color('dark').lighten(10)}!important; 
                border-bottom: 1px solid ${pups.color('dark').lighten(10)}!important;
            }
            .item:last-child { border-bottom: 1px solid ${pups.color('dark').lighten(10)}!important; }
            .item:hover {
                background: ${pups.color('dark').lighten(5)}!important;
            }
            .search input {
                border-radius: 0px!important;
                border-color: ${pups.color('dark').lighten(10)}!important;
                background: ${pups.color('dark').darken(5)}!important;
                font-family: inherit!important;
                font-size: .8rem!important;
                padding: ${pups.ms(-2)} ${pups.ms(-2)}!important;
            }
        }
    }
`


