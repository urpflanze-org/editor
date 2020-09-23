import DynamicComponent from './DynamicComponent'

const MathFunctions = [
    { key: 'abs', label: 'abs', inputs: 1 },
    { key: 'sin', label: 'sin', inputs: 1 },
    { key: 'cos', label: 'cos', inputs: 1 },
    { key: 'tan', label: 'tan', inputs: 1 },
    { key: 'atan', label: 'atan', inputs: 1 },
    { key: 'atan2', label: 'atan2', inputs: 2 },
    { key: 'ceil', label: 'ceil', inputs: 1 },
    { key: 'floor', label: 'floor', inputs: 1 },
    { key: 'log', label: 'log', inputs: 1 },
    { key: 'min', label: 'min', inputs: 2 },
    { key: 'max', label: 'max', inputs: 2 },
    { key: 'pow', label: 'pow', inputs: 2 },
    { key: 'round', label: 'round', inputs: 1 },
    { key: 'random', label: 'random', inputs: 0 },
    { key: 'sqrt', label: 'sqrt', inputs: 1 },
]

class MathComponent extends DynamicComponent
{
    constructor() 
    {
        super('Math', MathFunctions)
    }
    
    worker(node, inputs, outputs) 
    {
        const math_function = this.getCurrentDynamicFunction(node)
        if (math_function)
        {
            const input_count = this.getInputsFromFunctions(math_function)
            const x = this.getInputValue(node, inputs, 'input_1')
            const y = this.getInputValue(node, inputs, 'input_2')
            
            let result

            switch(math_function)
            {
                case 'abs': result = `Math.abs(${x})`
                    break
                case 'sin': result = `Math.sin(${x})`
                    break
                case 'cos': result = `Math.cos(${x})`
                    break
                case 'tan': result = `Math.tan(${x})`
                    break
                case 'atan': result = `Math.atan(${x})`
                    break
                case 'atan2': result = `Math.atan2(${y}, ${x})`
                    break
                case 'ceil': result = `Math.ceil(${x})`
                    break
                case 'floor': result = `Math.floor(${x})`
                    break
                case 'log': result = `Math.log(${x})`
                    break
                case 'min': result = `Math.min(${x}, ${y})`
                    break
                case 'max': result = `Math.max(${x}, ${y})`
                    break
                case 'pow': result = `Math.round(${x}, ${y})`
                    break
                case 'round': result = `Math.round(${x})`
                    break
                case 'random': result = `Math.random()`
                    break
                case 'sqrt': result = `Math.sqrt(${x})`
                    break
            }

            if (input_count == 0 || (input_count == 1 && typeof x === 'number') || (input_count == 2 && (typeof x === 'number' && typeof y === 'number')))
                result = eval(result)

            outputs['result'] = result
        }
    }

}

export default MathComponent