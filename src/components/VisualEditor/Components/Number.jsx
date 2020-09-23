import Rete, { Node } from 'rete'


import * as sockets from '../Sockets'
import NumberControl from '../Controls/NumberControl'


class NumberComponent extends Rete.Component 
{
    constructor() 
    {
        super('Number')
    }
    
    builder(node)
    {
        const out = new Rete.Output('value', 'Output', sockets.number)
        const ctrl = new NumberControl(this.editor, 'value', node)

        node.addControl(ctrl)
        node.addOutput(out)
    }
    

    worker(node, inputs, outputs) 
    {
        outputs['value'] = node.data.value
    }

    code(node, inputs, add)
    {
        // const value = node.data.value != null ? node.data.value : 0
        // add('value', value)
    }
}

export default NumberComponent