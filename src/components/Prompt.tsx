import * as React from 'react'
import ReactDOM from 'react-dom'

const container = document.getElementById('prompt-root') as HTMLDivElement

interface PromptProps {
    onResult: (data: any) => void
    label: string
    defaultValue: string
}

const Prompt: React.FunctionComponent<PromptProps> = ({ onResult, label, defaultValue }: PromptProps) => 
{
    const promptRef = React.createRef<HTMLDivElement>()
    const inputRef = React.createRef<HTMLInputElement>()

    React.useEffect(() => {
        container.className = 'open'
        document.addEventListener('click', prompt_focus, { passive: true })
        
        return () => {
            container.className = ''
            document.removeEventListener('click', prompt_focus)
        }
    }, [])


    function save()
    {
        const projectName = inputRef.current?.value || ''

        if (projectName.length > 0)
            onResult(projectName)
        else 
            prompt_focus()
    }

    
    function prompt_focus() 
    {
        if (promptRef.current)
        {
            const container = promptRef.current as HTMLDivElement

            container.classList.remove('prompt--focus') 
            setTimeout(() => {
                container.classList.add('prompt--focus')
                inputRef.current?.focus()
                setTimeout(() => { container.classList.remove('prompt--focus') }, 500)
            })
        }
    }

    return (
        <div ref={promptRef} className="prompt">
            <div className="prompt__label">{label}</div>
            <input 
                className="prompt__input" autoFocus={true} 
                ref={inputRef} defaultValue={defaultValue}
                onFocus={(e: React.FocusEvent) => (e.target as HTMLInputElement).select()}
                onKeyDown={e => e.keyCode == 13 && save()}
            />
            <div className="prompt__confirm_buttons">
                <button className="prompt__button" onClick={save}>Save</button>
                <button className="prompt__button" onClick={() => onResult(null)}>Cancel</button>
            </div>
        </div>
    )
}


const Empty = () => null

function PromptPromise(label: string, defaultValue: string): Promise<string | null>
{
    return new Promise<string | null>((resolve) => {

        function handleResult(data: string | null) {
            resolve(data)
            ReactDOM.render(<Empty />, container)
        }

        ReactDOM.render(<Prompt onResult={handleResult} label={label} defaultValue={defaultValue} />, container)
    })
}


export default PromptPromise