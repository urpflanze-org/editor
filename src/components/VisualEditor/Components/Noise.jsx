import Rete, { Node } from 'rete'

import * as sockets from '../Sockets'
import NumberControl from '../Controls/NumberControl'
import StringControl from '../Controls/StringControl'

class NoiseComponent extends Rete.Component {
	constructor() {
		super('Noise')
	}

	builder(node) {
		const out = new Rete.Output('value', 'Noise', sockets.number)

		const seed = new Rete.Input('seed', 'seed', sockets.string)
		seed.addControl(new StringControl(this.editor, 'seed', node))
		node.addInput(seed)

		const x = new Rete.Input('x', 'x', sockets.numberOrVariable)
		x.addControl(new NumberControl(this.editor, 'x', node))
		node.addInput(x)

		const y = new Rete.Input('y', 'y', sockets.numberOrVariable)
		y.addControl(new NumberControl(this.editor, 'y', node))
		node.addInput(y)

		const z = new Rete.Input('z', 'z', sockets.numberOrVariable)
		z.addControl(new NumberControl(this.editor, 'z', node))
		node.addInput(z)

		node.addOutput(out)
	}

	worker(node, inputs, outputs) {
		const seed = inputs['seed'] && inputs['seed'].length > 0 ? inputs['seed'][0] : node.data['seed']
		const x = inputs['x'] && inputs['x'].length > 0 ? inputs['x'][0] : node.data['x']
		const y = inputs['y'] && inputs['y'].length > 0 ? inputs['y'][0] : node.data['y']
		const z = inputs['z'] && inputs['z'].length > 0 ? inputs['z'][0] : node.data['z']

		outputs['value'] = `context.noise(${seed && seed.length > 0 ? `'${seed}'` : `'random'`}, ${x}, ${y}, ${z})`
	}

	code() {}
}

export default NoiseComponent
