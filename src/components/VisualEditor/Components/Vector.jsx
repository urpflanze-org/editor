import Rete, { Node } from 'rete'


import * as sockets from '../Sockets'
import NumberControl from '../Controls/NumberControl'


class NumberComponent extends Rete.Component 
{
    constructor() 
    {
        super('Vector')
    }
    
    builder(node)
    {
        const out = new Rete.Output('value', 'Output', sockets.vector2)
        
        const x = new Rete.Input('x', 'x', sockets.numberOrVariable)
        x.addControl(new NumberControl(this.editor, 'x', node))
        node.addInput(x)

        const y = new Rete.Input('y', 'y', sockets.numberOrVariable)
        y.addControl(new NumberControl(this.editor, 'y', node))
        node.addInput(y)

        node.addOutput(out)
    }
    

    worker(node, inputs, outputs) 
    {
        const x = (inputs['x'] && inputs['x'].length > 0) ? inputs['x'][0] : node.data['x']
        const y = (inputs['y'] && inputs['y'].length > 0) ? inputs['y'][0] : node.data['y']
        outputs['value'] = `[${x}, ${y}]`
    }

    code(node, inputs, add)
    {
        // const value = node.data.value != null ? node.data.value : 0
        // add('value', value)
    }
}

export default NumberComponent