import Rete from 'rete'

import * as sockets from '../Sockets'

class OutputHSLComponent extends Rete.Component {
	constructor() {
		super('OutputHSL')
	}

	builder(node) {
		const h = new Rete.Input('input_h', 'hue', sockets.numberOrVariable)
		const s = new Rete.Input('input_s', 'saturation', sockets.numberOrVariable)
		const l = new Rete.Input('input_l', 'luminosity', sockets.numberOrVariable)
		const a = new Rete.Input('input_a', 'alpha', sockets.numberOrVariable)
		node.addInput(h)
		node.addInput(s)
		node.addInput(l)
		node.addInput(a)
	}

	worker(node, inputs, outputs) {
		if (
			inputs.input_h &&
			inputs.input_h.length > 0 &&
			inputs.input_s &&
			inputs.input_s.length > 0 &&
			inputs.input_l &&
			inputs.input_l.length > 0 &&
			inputs.input_a &&
			inputs.input_a.length > 0
		) {
			const hsla = `hsla($\{${inputs.input_h[0]}}, $\{${inputs.input_s[0]}}%, $\{${inputs.input_l[0]}}%, $\{${inputs.input_a[0]}})`

			node.data.return_value = '`' + hsla + '`'

			console.log(node.data.return_value)
		}
	}

	code(node, inputs, add) {
		if (node.data.return_value) {
			add(`${node.data.return_value}`)
		}
	}
}

export default OutputHSLComponent
