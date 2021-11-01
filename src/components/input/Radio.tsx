import * as React from 'react'

import Grid from 'components/Grid'
import pups from '@pups/js'

interface IRadio {
	onChange: (selected: any) => void
	name: string
	selected: any
	align?: string
	values: Array<{ key: string; value: any }>
}

let id = 0

const Radio = (props: IRadio) => {
	const name = 'rb_' + ++id + '_' + props.name

	return (
		<Grid
			className="radio"
			columns={props.values.length}
			flow={`auto repeat(${props.values.length}, auto)`}
			gap={pups.ms(0)}
			valign="center"
			halign={props.align || 'space-around'}
		>
			<div>{props.name}</div>
			{props.values.map(({ key, value }) => (
				<div className="radio__option" key={name + '_' + key}>
					<input
						className="radio__option__value"
						id={name + '_' + key}
						name={name}
						value={value}
						type="radio"
						defaultChecked={value == props.selected}
						onChange={e => {
							props.onChange((e.target as HTMLInputElement).value)
						}}
					/>
					<label className="radio__option__name" htmlFor={name + '_' + key}>
						{key}
					</label>
				</div>
			))}
		</Grid>
	)
}

export default React.memo(Radio)
