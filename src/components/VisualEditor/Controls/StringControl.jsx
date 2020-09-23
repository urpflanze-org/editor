import * as React from 'react'
import Rete from 'rete'

class StringControl extends Rete.Control {
	constructor(emitter, key, node, readonly = false) {
		super(key)

		this.emitter = emitter
		this.key = key

		this.component = ({ value, onChange }) => (
			<input
				type="text"
				value={value}
				ref={ref => {
					ref && ref.addEventListener('pointerdown', e => e.stopPropagation())
				}}
				onChange={e => onChange(e.target.value)}
			/>
		)

		const initial = node.data[key] || ''

		node.data[key] = initial

		this.props = {
			readonly,
			value: initial,
			onChange: v => {
				this.setValue(v)
				this.emitter.trigger('process')
			},
		}
	}

	setValue(val) {
		this.props.value = val
		this.putData(this.key, val)
		this.update()
	}
}

export default StringControl
