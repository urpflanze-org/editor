import Rete from 'rete'

import * as sockets from '../Sockets'

class OutputComponent extends Rete.Component {
	constructor() {
		super('Output')
	}

	builder(node) {
		const bVector = node.data.bVector
		const canbVector = node.data.canbVector

		if (bVector) {
			const x = new Rete.Input('input_x', 'x value', sockets.numberOrVariable)
			const y = new Rete.Input('input_y', 'y value', sockets.numberOrVariable)
			node.addInput(x)
			node.addInput(y)
		} else {
			const finalOutputSocket = new Rete.Input(
				'input',
				'return value',
				canbVector ? sockets.numberOrVariableOrVector : sockets.numberOrVariable
			)
			node.addInput(finalOutputSocket)
		}
	}

	worker(node, inputs, outputs) {
		if (inputs.input != undefined && inputs.input.length > 0) node.data.return_value = inputs.input[0]

		if (inputs.input_x && inputs.input_x.length > 0 && inputs.input_y && inputs.input_y.length > 0)
			node.data.return_value = `[${inputs.input_x[0]},${inputs.input_y[0]}]`
	}

	code(node, inputs, add) {
		if (node.data.return_value) {
			add(`${node.data.return_value}`)
		}
	}
}

export default OutputComponent
