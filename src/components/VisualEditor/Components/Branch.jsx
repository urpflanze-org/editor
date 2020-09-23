import Rete, { Node } from 'rete'


import * as sockets from '../Sockets'

const variables = [
    { key: 'shape.getAngleFromMatrixRepetition(repetition)', label: 'Matrix angle' },
    { key: 'shape.getDistanceFromMatrixRepetition(repetition)', label: 'Matrix distance' },
]

class BranchComponent extends Rete.Component 
{
    constructor() 
    {
        super('Branch')
    }
    
    builder(node)
    {
        node.addInput(new Rete.Input('condition', 'Condition', sockets.boolean))
        
        node.addOutput(new Rete.Output('true', 'True', sockets.numberOrVariable))
        node.addOutput(new Rete.Output('false', 'False', sockets.numberOrVariable))
    }
    

    worker(node, inputs, outputs) 
    {
        console.log(inputs, outputs, node, this)
        if (
            inputs.condition && inputs.condition.length > 0
            && node.outputs.true.connections.length > 0
            && node.outputs.false.connections.length > 0
        )
        {
            const condition = inputs.condition[0]

            const true_node = this.editor.nodes.find(n => n.id == node.outputs.true.connections[0].node)
            const false_node = this.editor.nodes.find(n => n.id == node.outputs.false.connections[0].node)

            console.log(condition, true_node, false_node)
        }
        
    }

    code(node, inputs, add)
    {
    }

}

export default BranchComponent