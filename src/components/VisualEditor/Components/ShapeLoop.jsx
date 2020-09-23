import Rete, { Node } from 'rete'

import * as sockets from '../Sockets'

const variables = [
	{ key: 'shape_loop.current_index', label: 'Current index' },
	{ key: 'shape_loop.current_angle', label: 'Current angle' },
	{ key: 'shape_loop.current_offset', label: 'Current offset' },
	{ key: 'shape_loop.count', label: 'Count' },
]

class ReptitionComponent extends Rete.Component {
	constructor() {
		super('ShapeLoop')
	}

	builder(node) {
		variables.forEach(variable => {
			node.addOutput(new Rete.Output(variable.key, variable.label, sockets.variable))
		})
	}

	worker(node, inputs, outputs) {
		variables.forEach(variable => {
			if (node.outputs[variable.key].connections.length > 0) outputs[variable.key] = variable.key
		})
	}

	code(node, inputs, add) {}
}

export default ReptitionComponent
