import * as React from 'react'
import ReactDOM from 'react-dom'

const container = document.getElementById('prompt-root') as HTMLDivElement

interface ConfirmProps {
	onResult: (data: boolean) => void
	label: string
	ok: string
	no: string
}

const Confirm: React.FunctionComponent<ConfirmProps> = ({ onResult, label, ok, no }: ConfirmProps) => {
	const promptRef = React.createRef<HTMLDivElement>()

	React.useEffect(() => {
		container.className = 'open'
		document.addEventListener('click', prompt_focus, { passive: true })

		return () => {
			container.className = ''
			document.removeEventListener('click', prompt_focus)
		}
	}, [])

	function prompt_focus() {
		if (promptRef.current) {
			const container = promptRef.current as HTMLDivElement

			container.classList.remove('prompt--focus')
			setTimeout(() => {
				container.classList.add('prompt--focus')
				setTimeout(() => {
					container.classList.remove('prompt--focus')
				}, 500)
			})
		}
	}

	return (
		<div ref={promptRef} className="prompt">
			<div>
				<div className="prompt__label">{label}</div>
				<div className="prompt__confirm_buttons">
					<button className="prompt__button" onClick={() => onResult(true)}>
						{ok}
					</button>
					<button className="prompt__button" onClick={() => onResult(false)}>
						{no}
					</button>
				</div>
			</div>
		</div>
	)
}

const Empty = () => null

function ConfirmPromise(label: string, ok = 'Accept', no = 'Cancel'): Promise<boolean> {
	return new Promise<boolean>(resolve => {
		function handleResult(data: boolean) {
			resolve(data)
			ReactDOM.render(<Empty />, container)
		}

		ReactDOM.render(<Confirm onResult={handleResult} label={label} ok={ok} no={no} />, container)
	})
}

export default ConfirmPromise
