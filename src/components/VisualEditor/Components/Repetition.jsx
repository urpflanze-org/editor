import Rete, { Node } from 'rete'

import * as sockets from '../Sockets'

const variables = [
	{ key: 'repetition.current_index', label: 'Current index' },
	{ key: 'repetition.current_offset', label: 'Current offset' },
	{ key: 'repetition.current_row', label: 'Current row' },
	{ key: 'repetition.current_row_offset', label: 'Current row offset' },
	{ key: 'repetition.current_col', label: 'Current col' },
	{ key: 'repetition.current_col_offset', label: 'Current col offset' },
	{ key: 'repetition.current_angle', label: 'Current angle' },
	{ key: 'repetition.count', label: 'Count' },
	{ key: 'repetition.count_col', label: 'Count col' },
	{ key: 'repetition.count_row', label: 'Count row' },
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
