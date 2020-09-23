import Rete, { Node } from 'rete'
import NumberControl from '../Controls/NumberControl'

import * as sockets from '../Sockets'

class TimeComponent extends Rete.Component {
	constructor() {
		super('Time')
	}

	builder(node) {
		const time = new Rete.Output('time', 'Current time (ms)', sockets.variable)
		const mstime = new Rete.Output('mstime', 'Current time (s)', sockets.variable)

		// const input = new Rete.Input('input_scale', 'scale', sockets.numberOrVariable)

		// node.data['scale'] = 1
		// input.addControl(new NumberControl(this.editor, 'scale', node))
		// node.addInput(input)

		node.addOutput(time)
		node.addOutput(mstime)
	}

	worker(node, inputs, outputs) {
		// const scale =
		// 	inputs['input_scale'] && inputs['input_scale'].length > 0 ? inputs['input_scale'][0] : node.data['scale']

		// outputs['time'] = `(time / ${scale})`
		outputs['time'] = `time`
		outputs['mstime'] = `(time / 1000)`
	}

	code() {}
}

export default TimeComponent
