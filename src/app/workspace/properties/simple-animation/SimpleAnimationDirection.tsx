import type { ISimpleAnimation } from '@urpflanze/animation'
import Select from 'components/input/Select'
import React from 'react'

export default function SimpleAnimationDirection({
	value,
	onChange,
}: {
	value: ISimpleAnimation['direction']
	onChange: (direction: ISimpleAnimation['direction']) => void
}) {
	return (
		<div>
			Direction
			<Select
				placeholder="Direction"
				value={value}
				options={[
					{
						key: 'Normal',
						value: 'normal',
					},
					{
						key: 'Reverse',
						value: 'reverse',
					},
					{
						key: 'Alternate',
						value: 'alternate',
					},
				]}
				onChange={onChange}
			/>
		</div>
	)
}
