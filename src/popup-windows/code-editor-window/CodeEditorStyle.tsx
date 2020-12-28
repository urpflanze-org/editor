import pups from '@pups/js'

export default `
    .ace_editor {
        font-family: inherit;
        line-height: 1.618;
        background: ${pups.color('dark')}!important;
    }
    .ace_gutter {
        background: ${pups.color('dark').lighten(2)}!important;
    }
`
