import '@babel/polyfill'

import * as React from 'react'
import { render } from 'react-dom'

import Boot from '@bootstrap/Boot'

render(<Boot />, document.querySelector('#app-root'))
