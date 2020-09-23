import DynamicComponent from './DynamicComponent'

import * as sockets from '../Sockets'

const ConditionFunciton = [
    { key: '==', label: '==', inputs: 2 },
    { key: '>', label: '>', inputs: 2 },
    { key: '<', label: '<', inputs: 2 }
]

class ConditionComponent extends DynamicComponent
{
    constructor() 
    {
        super('Condition', ConditionFunciton, sockets.boolean)
    }
    
    worker(node, inputs, outputs) 
    {
        const condition_function = this.getCurrentDynamicFunction(node)
        if (condition_function)
        {
            const a = this.getInputValue(node, inputs, 'input_1')
            const b = this.getInputValue(node, inputs, 'input_2')
            
            const result = `(${a} ${condition_function} ${b})`

            if (typeof a === 'number' && typeof a === 'number')
                result = eval(result)

            outputs['result'] = result
            console.log('condition', result)
        }
    }

}

export default ConditionComponent