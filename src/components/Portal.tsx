import * as React from 'react'
import ReactDOM from 'react-dom'

const Portal: React.FunctionComponent<{ container: string | HTMLElement }> = ({ children, container }) => ReactDOM.createPortal(children, (typeof container === 'string' ? document.querySelector(container) : container) as HTMLElement)

export default Portal