import * as React from 'react'
import Rete from 'rete'
import { indexOfObjectProperty } from '@pups/utility/build/Array'

import * as sockets from '../Sockets'

import SelectControl from '../Controls/SelectControl'
import NumberControl from '../Controls/NumberControl'

class DynamicComponent extends Rete.Component {
	constructor(name, dynamicFunctions, outputType = sockets.numberOrVariable) {
		super(name)
		this.dynamicFunctions = dynamicFunctions

		this.outputType = outputType
		this.component = Node
		this.maxInputs = Math.max.apply(
			null,
			this.dynamicFunctions.map(df => df.inputs)
		)
		this.setInputFromDynamicFunction = this.setInputFromDynamicFunction.bind(this)
	}

	getInputsFromFunctions(function_key) {
		const index = indexOfObjectProperty(this.dynamicFunctions, 'key', function_key)
		return index >= 0 ? this.dynamicFunctions[index].inputs : 0
	}

	builder(node) {
		const out = new Rete.Output('result', 'out', this.outputType)

		node.addControl(
			new SelectControl(
				this.editor,
				'dynamic_function',
				node,
				this.dynamicFunctions,
				node.data.dynamic_function,
				this.setInputFromDynamicFunction.bind(null, node)
			)
		)

		this.setInputFromDynamicFunction(node, node.data.dynamic_function)

		node.addOutput(out)
	}

	getCurrentDynamicFunction(node) {
		return node.data.dynamic_function && node.data.dynamic_function.length > 0 ? node.data.dynamic_function : null
	}

	setInputFromDynamicFunction(node, math_function) {
		const count_input = this.getInputsFromFunctions(math_function)

		for (let i = 1; i <= this.maxInputs; i++) {
			const inputKey = 'input_' + i
			if (i <= count_input) this.addInput(node, inputKey, ['x', 'y', 'z', 'a', 'b', 'c'][i - 1])
			else this.removeInput(node, inputKey)
		}

		node.update()
	}

	addInput(node, key, label) {
		if (!node.inputs.has(key)) {
			const input = new Rete.Input(key, label, sockets.numberOrVariable)

			input.addControl(new NumberControl(this.editor, key, node))
			node.addInput(input)
		}
	}

	removeInput(node, key) {
		if (node.inputs.has(key)) {
			const input = node.inputs.get(key)
			input.connections.slice().map(this.editor.removeConnection.bind(this.editor))
			node.removeInput(input)
		}
	}

	getInputValue(node, inputs, key) {
		return inputs[key] && inputs[key].length > 0 ? inputs[key][0] : node.data[key]
	}

	code(node, inputs, add) {
		// add('math', node.data.result_preview)
	}
}

export default DynamicComponent
