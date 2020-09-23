import * as React from 'react'
interface Props 
{
    columns?: number
    rows?: number
    flow?: string
    gap?: number | string
    halign?: string
    valign?: string
    style?: any
    component?: string
}

const Grid: React.FunctionComponent<Props> = ({ columns, rows, flow, gap, halign, valign, style, children, component, ...otherProps }) => {

    const key = typeof columns === 'undefined' && typeof rows === 'undefined' ? 'gridTemplate' : typeof columns !== 'undefined' && typeof rows !== 'undefined' ? 'gridTemplate' : (columns as number) >= 0 ? 'gridTemplateColumns' : 'gridTemplateRows'
    const value = flow ? flow : columns && rows ? `repeat(${rows}, 1fr) / repeat(${columns}, 1fr)` : `repeat(${ columns || rows }, 1fr)`

    const _style = {
        display: 'grid',
        [key]: value,
        gap: gap,
        alignItems: valign,
        justifyContent: halign,
        ...style
    }

    return React.createElement(component || 'div', { style: _style, ...otherProps }, children)
}

export default Grid