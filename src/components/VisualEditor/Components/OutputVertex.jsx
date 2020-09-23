import Rete from 'rete'

import * as sockets from '../Sockets'

class OutputVertexComponent extends Rete.Component {
	constructor() {
		super('OutputVertex')
	}

	builder(node) {
		const x = new Rete.Input('input_x', 'x value', sockets.numberOrVariable)
		const y = new Rete.Input('input_y', 'y value', sockets.numberOrVariable)
		node.addInput(x)
		node.addInput(y)
	}

	worker(node, inputs, outputs) {
		if (inputs.input != undefined && inputs.input.length > 0) node.data.return_value = inputs.input[0]

		if (inputs.input_x && inputs.input_x.length > 0 && inputs.input_y && inputs.input_y.length > 0)
			node.data.return_value = `(function(){ 
                vertex[0] = ${inputs.input_x[0]}; 
                vertex[1] = ${inputs.input_y[0]};
            }).call(this)`
	}

	code(node, inputs, add) {
		if (node.data.return_value) {
			add(`${node.data.return_value}`)
		}
	}
}

export default OutputVertexComponent
