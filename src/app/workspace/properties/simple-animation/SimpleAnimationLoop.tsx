import Range from 'components/input/Range'
import Select from 'components/input/Select'
import React from 'react'

export default function SimpleAnimationLoop({
	value,
	onChange,
}: {
	value: number | boolean
	onChange: (loop: number | boolean) => void
}) {
	return (
		<div>
			Repetition
			<Select
				placeholder="Repetition type"
				onChange={onChange}
				value={value}
				options={[
					{
						key: 'Loop',
						value: true,
					},
					{
						key: 'Once',
						value: false,
					},
					{
						key: 'Static',
						value: 0,
					},
				]}
			/>
			{typeof value !== 'boolean' && <Range min={0} max={100} step={1} value={value} onChange={onChange} />}
		</div>
	)
}
