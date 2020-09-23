import Rete from 'rete'
import ReactRenderPlugin from 'rete-react-render-plugin'
import ConnectionPlugin from 'rete-connection-plugin'
import CodePlugin, { generate } from 'rete-code-plugin'
import ContextMenuPlugin from 'rete-context-menu-plugin'
import AreaPlugin from 'rete-area-plugin'

import NumberComponent from './Components/Number'
import VectorComponent from './Components/Vector'
import NoiseComponent from './Components/Noise'
// import BranchComponent from './Components/Branch'
// import ConditionComponent from './Components/Condition'
import RepetitionComponent from './Components/Repetition'
import ShapeLoopComponent from './Components/ShapeLoop'
import VertexComponent from './Components/Vertex'
import ShapeComponent from './Components/Shape'

import OutputComponent from './Components/Output'
import OutputVertexComponent from './Components/OutputVertex'
import OutputHSLComponent from './Components/OutputHSL'

import TimeComponent from './Components/Time'
import MathComponent from './Components/Math'
import MathConstantComponent from './Components/MathConstant'
import OperationComponent from './Components/Operation'

import Node from './Node'

const components = {
	Number: new NumberComponent(),
	Vector: new VectorComponent(),
	// Branch: new BranchComponent(),
	// Condition: new ConditionComponent(),

	Operation: new OperationComponent(),
	Math: new MathComponent(),
	MathConstant: new MathConstantComponent(),
	Noise: new NoiseComponent(),

	Shape: new ShapeComponent(),
	Repetition: new RepetitionComponent(),
	Time: new TimeComponent(),
}

const Vertex = new VertexComponent()
const OutputVertex = new OutputVertexComponent()
const ShapeLoop = new ShapeLoopComponent()

const uniqueNodes = ['Time', 'Repetition', 'Output', 'OutputVertex', 'OutputHSL']

export async function resetEditor(editor, data, options) {
	editor.clear()

	if (data) {
		await editor.fromJSON(data)
	} else {
		if (options.bVertexCallback) {
			const output = await OutputVertex.createNode()

			const vertex = await Vertex.createNode()

			vertex.position = [-500, 0]
			vertex.output = [500, 0]

			editor.addNode(vertex)
			editor.addNode(output)
		} else {
			const output = options.bColor
				? await components.OutputHSL.createNode()
				: await components.Output.createNode({
						bVector: options.bVector,
						canbVector: options.canbVector,
				  })

			const repetition = await components.Repetition.createNode()
			const time = await components.Time.createNode()

			time.position = [0, 0]
			repetition.position = [0, 120]
			output.position = [1000, 100]

			editor.addNode(output)
			editor.addNode(time)
			editor.addNode(repetition)

			if (options.shapeLoop) {
				const shapeLoop = await ShapeLoop.createNode()
				shapeLoop.position = [400, 60]

				editor.addNode(shapeLoop)
			}
		}
	}
}

export async function createEditor(container, data, options) {
	const editor = new Rete.NodeEditor('mandala-ui@0.1.0', container)

	editor.use(AreaPlugin)
	editor.use(CodePlugin)
	editor.use(ConnectionPlugin)
	editor.use(ReactRenderPlugin, {
		component: Node,
	})

	editor.use(ContextMenuPlugin, {
		searchBar: true,
		delay: 100,
	})

	const engine = new Rete.Engine('mandala-ui@0.1.0')

	if (options.bColor) {
		components.OutputHSL = new OutputHSLComponent()
	} else {
		components.Output = new OutputComponent()
	}

	Object.keys(components).forEach(key => {
		editor.register(components[key])
		engine.register(components[key])
	})

	if (options.shapeLoop) {
		editor.register(ShapeLoop)
		engine.register(ShapeLoop)
	}

	if (options.bVertexCallback) {
		editor.register(Vertex)
		engine.register(Vertex)
		editor.register(OutputVertex)
		engine.register(OutputVertex)
	}

	await resetEditor(editor, data, options)

	try {
		editor.view.resize()
	} catch (e) {}

	AreaPlugin.zoomAt(editor, editor.nodes)

	editor.on('nodecreate', node => {
		if (uniqueNodes.includes(node.name)) {
			const haveSomeNode = editor.nodes.some(item => item.name === node.name)
			if (haveSomeNode) {
				const finded = editor.nodes.find(item => item.name === node.name)
				editor.selectNode(finded)
				return false
			}
		}
	})

	editor.on(['process', 'nodecreated', 'noderemoved', 'connectioncreated', 'connectionremoved'], async () => {
		await engine.abort()
		await engine.process(editor.toJSON())
	})

	editor.on('zoom', ({ source }) => {
		return source !== 'dblclick'
	})

	editor.trigger('process')

	return {
		editor,
		engine,
		getCode: () => generate(engine, editor.toJSON()),
	}
}
