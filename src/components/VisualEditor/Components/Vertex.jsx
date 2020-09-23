import Rete, { Node } from 'rete'

import * as sockets from '../Sockets'
import NumberControl from '../Controls/NumberControl'

class NumberComponent extends Rete.Component {
	constructor() {
		super('Vertex')
	}

	builder(node) {
		const x = new Rete.Output('x', 'x', sockets.number)
		const y = new Rete.Output('y', 'y', sockets.number)

		node.addOutput(x)
		node.addOutput(y)
	}

	worker(node, inputs, outputs) {
		// const x = inputs['x'] && inputs['x'].length > 0 ? inputs['x'][0] : node.data['x']
		// const y = inputs['y'] && inputs['y'].length > 0 ? inputs['y'][0] : node.data['y']
		outputs['x'] = `vertex[0]`
		outputs['y'] = `vertex[1]`
	}
}

export default NumberComponent
