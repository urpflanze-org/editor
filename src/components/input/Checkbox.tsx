import * as React from 'react'

interface Props {
	id?: string
	size?: number
	checked: boolean
	onChange: (checked: boolean) => void
	name?: string
}

export default (props: Props) => {
	const id = props.id || 'cb_' + props.name

	return (
		<div className={`checkbox checkbox--s${props.size || 0}`}>
			<input
				className="checkbox__input"
				id={id}
				type="checkbox"
				onChange={e => props.onChange((e.target as HTMLInputElement).checked)}
				checked={props.checked}
			/>
			{props.name && <label htmlFor={id}>{props.name}</label>}
		</div>
	)
}
