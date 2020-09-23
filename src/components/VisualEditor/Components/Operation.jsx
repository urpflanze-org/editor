import DynamicComponent from './DynamicComponent'


const OperationFunctions = [
    { key: 'add', label: 'Add', inputs: 2 },
    { key: 'sub', label: 'Subtract', inputs: 2 },
    { key: 'mul', label: 'Multiply', inputs: 2 },
    { key: 'div', label: 'Divide', inputs: 2 },
    { key: 'mod', label: 'Modulus ', inputs: 2 },
]


class OperationComponent extends DynamicComponent 
{
    constructor() 
    {
        super('Operation', OperationFunctions)
    }

    worker(node, inputs, outputs) 
    {
        const dynamic_function = this.getCurrentDynamicFunction(node)
        if (dynamic_function)
        {
            let operator = '+'
            switch (dynamic_function)
            {
                case 'add': operator = '+'; break;
                case 'div': operator = '/'; break;
                case 'mul': operator = '*'; break;
                case 'sub': operator = '*'; break;
                case 'mod': operator = '%'; break;
            }
            const input_1 = this.getInputValue(node, inputs, 'input_1')
            const input_2 = this.getInputValue(node, inputs, 'input_2')
            
            let result
            
            if (typeof input_1 == 'number' && typeof input_2 == 'number')
                result = eval(`${input_1} ${operator} ${input_2}`)
            else
                result = `(${input_1} ${operator} ${input_2})`
            
            outputs['result'] = result
        }
    }

}

export default OperationComponent