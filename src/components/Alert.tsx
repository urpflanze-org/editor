import * as React from 'react'
import ReactDOM from 'react-dom'

const container = document.getElementById('alert-root') as HTMLDivElement

interface AlertProps {
	onResult: (data: boolean) => void
	label: string
}

const Alert: React.FunctionComponent<AlertProps> = ({ onResult, label }: AlertProps) => {
	const alertRef = React.createRef<HTMLDivElement>()

	React.useEffect(() => {
		container.className = 'open'
		document.addEventListener('click', alert_focus, { passive: true })

		return () => {
			container.className = ''
			document.removeEventListener('click', alert_focus)
		}
	}, [])

	function alert_focus() {
		if (alertRef.current) {
			const container = alertRef.current as HTMLDivElement

			container.classList.remove('alert--focus')
			setTimeout(() => {
				container.classList.add('alert--focus')
				setTimeout(() => {
					container.classList.remove('alert--focus')
				}, 500)
			})
		}
	}

	return (
		<div ref={alertRef} className="alert">
			<div>
				<div className="alert__label">{label}</div>
				<div className="alert__buttons">
					<button className="alert__button" onClick={() => onResult(true)}>
						OK
					</button>
				</div>
			</div>
		</div>
	)
}

const Empty = () => null

function AlertPromise(label: string, ok = 'Accept', no = 'Cancel'): void {
	function handleResult() {
		ReactDOM.render(<Empty />, container)
	}

	ReactDOM.render(<Alert onResult={handleResult} label={label} ok={ok} no={no} />, container)
}

export default AlertPromise
