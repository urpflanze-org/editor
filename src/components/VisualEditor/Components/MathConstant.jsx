import Rete, { Node } from 'rete'


import * as sockets from '../Sockets'

const variables = [
    { key: 'Math.PI', label: 'PI' },
    { key: '(Math.PI * 2)', label: 'PI2' },
    { key: 'Math.LN2', label: 'LN2' },
    { key: 'Math.LN10', label: 'LN10' },
    { key: 'Math.SQRT1_2', label: 'SQRT1_2' },
    { key: 'Math.SQRT2', label: 'SQRT2' }
]

class MathConstant extends Rete.Component 
{
    constructor() 
    {
        super('Math Constant');
    }
    
    builder(node)
    {
        variables.forEach(variable => {
            node.addOutput(new Rete.Output(variable.key, variable.label, sockets.variable))
        })
    }
    

    worker(node, inputs, outputs) 
    {
        variables.forEach(variable => {
            if (node.outputs[variable.key].connections.length > 0)
                outputs[variable.key] = variable.key
        })
    }

    code(node, inputs, add)
    {
    }

}

export default MathConstant