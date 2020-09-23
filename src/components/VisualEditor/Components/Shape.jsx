import Rete, { Node } from 'rete'


import * as sockets from '../Sockets'

const variables = [
    { key: 'shape.getAngleFromMatrixRepetition(repetition)', label: 'Matrix angle' },
    { key: 'shape.getDistanceFromMatrixRepetition(repetition)', label: 'Matrix distance' },
]

class ShapeComponent extends Rete.Component 
{
    constructor() 
    {
        super('Shape')
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

export default ShapeComponent