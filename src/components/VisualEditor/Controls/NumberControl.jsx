import * as React from 'react'
import Rete from 'rete'

class NumberControl extends Rete.Control {
	constructor(emitter, key, node, readonly = false) {
		super(key)
		this.emitter = emitter
		this.key = key
		this.component = ({ value, onChange }) => (
			<input
				type="number"
				value={value}
				ref={ref => {
					ref && ref.addEventListener('pointerdown', e => e.stopPropagation())
				}}
				onChange={e => onChange(+e.target.value)}
			/>
		)

		const initial = node.data[key] || 0

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

export default NumberControl
