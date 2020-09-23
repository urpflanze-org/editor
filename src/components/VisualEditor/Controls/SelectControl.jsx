import * as React from 'react'
import Rete from 'rete'


class SelectControl extends Rete.Control 
{
    constructor(emitter, key, node, options, defaultValue = options[0].key, onChange) 
    {
        super(key)

        this.emitter = emitter
        this.key = key


        this.component = ({ value, onChange }) => (
            <select 
                defaultValue={defaultValue}
                ref={ref => { ref && ref.addEventListener("pointerdown", e => e.stopPropagation()) }}
                onChange={e => onChange(e.target.value)}
            >
                {options.map(option => (
                    <option key={option.key} value={option.key}>{option.label}</option>
                ))}
            </select>
        )

        const initial = node.data[key] || defaultValue

        node.data[key] = initial

        this.props = {
            value: initial,
            onChange: v => {
                this.setValue(v)
                this.emitter.trigger('process')
                onChange && onChange(v)
            }
        };
    }

    setValue(val) 
    {
        this.props.value = val
        this.putData(this.key, val)
        this.update()
    }
}

export default SelectControl