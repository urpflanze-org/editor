import * as React from 'react'

interface IButton {
	onClick?: any
	label: string
}

const Button: React.FunctionComponent<IButton> = ({ label, onClick }: IButton) => {
	return (
		<button className="button" onClick={onClick}>
			{label}
		</button>
	)
}

export default React.memo(Button)
