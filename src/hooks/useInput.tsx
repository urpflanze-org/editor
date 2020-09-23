import * as React from 'react'

interface IInput<T> {
	value: any
	setValue: (value: any) => void
	reset: () => void
	bind: {
		value: any
		onChange: (event: React.KeyboardEvent<T>) => void
	}
}

function useInput<T extends HTMLInputElement>(initialValue): IInput<T> {
	const [value, setValue] = React.useState(initialValue)

	return {
		value,
		setValue,
		reset: () => setValue(initialValue),
		bind: {
			value,
			onChange: (event: React.KeyboardEvent<T>) => {
				//@ts-ignore
				setValue(event.target.value)
			},
		},
	}
}

export default useInput
