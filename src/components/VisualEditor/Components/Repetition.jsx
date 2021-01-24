import Rete, { Node } from 'rete'

import * as sockets from '../Sockets'

const variables = [
	{ key: 'repetition.index', label: 'Current index' },
	{ key: 'repetition.offset', label: 'Current offset' },
	{ key: 'repetition.row.index', label: 'Current row index' },
	{ key: 'repetition.row.offset', label: 'Current row offset' },
	{ key: 'repetition.col.index', label: 'Current col index' },
	{ key: 'repetition.col.offset', label: 'Current col offset' },
	{ key: 'repetition.angle', label: 'Current angle' },
	{ key: 'repetition.count', label: 'Count' },
	{ key: 'repetition.col.count', label: 'Count col' },
	{ key: 'repetition.row.count', label: 'Count row' },
]

class ReptitionComponent extends Rete.Component {
	constructor() {
		super('Repetition')
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
