import '@babel/polyfill'

import * as React from 'react'
import { render } from 'react-dom'

import * as Urpflanze from 'urpflanze/dist/index'

//@ts-ignore
window.Urpflanze = Urpflanze

import Boot from '@bootstrap/Boot'

render(<Boot />, document.querySelector('#app-root'))
