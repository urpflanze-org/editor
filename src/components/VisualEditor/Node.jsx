import * as React from 'react'
import { Node, Socket, Control } from 'rete-react-render-plugin'

export default class extends Node 
{
    render() 
    {
        const { node, bindSocket, bindControl } = this.props
        const { outputs, controls, inputs, selected } = this.state

        return (
            <div className={`ui-node node ${selected}`}>
                <div className="title">
                    {node.name}
                </div>
                {outputs.map(output => (
                    <div className="output" key={output.key}>
                        <div className="output-title">{output.name}</div>
                        <Socket
                            type="output"
                            socket={output.socket}
                            io={output}
                            innerRef={bindSocket}
                        />
                    </div>
                ))}

                {controls.map(control => (
                    <Control
                        className="control"
                        key={control.key}
                        control={control}
                        innerRef={bindControl}
                    />
                ))}
                
                {inputs.map(input => (
                    <div className="input" key={input.key}>
                        <Socket
                            type="input"
                            socket={input.socket}
                            io={input}
                            innerRef={bindSocket}
                        />
                        {!input.showControl() && (
                            <div className="input-title">{input.name}</div>
                        )}
                        {input.showControl() && (
                            <Control
                                className="input-control"
                                control={input.control}
                                innerRef={bindControl}
                            />
                        )}
                    </div>
                ))}
            </div>
        )
    }
}
