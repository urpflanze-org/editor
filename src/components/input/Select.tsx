import * as React from 'react'

import Icon from 'components/icons/Icon'

interface ISelect {
	options: Array<{ key: any; value: any }>
	value: any
	position?: 'top' | 'bottom'
	placeholder: string
	width?: string
	onChange: (selected: any) => void
}

const Select: React.FunctionComponent<ISelect> = (props: ISelect) => {
	const [open, setOpen] = React.useState<boolean>(false)

	React.useEffect(() => {
		function handleClick() {
			open && setOpen(false)
		}

		document.addEventListener('click', handleClick, { passive: true })

		return () => {
			document.removeEventListener('click', handleClick)
		}
	}, [open])

	function getKeyFromValue() {
		for (let i = 0, len = props.options.length; i < len; i++)
			if (props.options[i].value == props.value) return props.options[i].key
	}

	function onChange(value) {
		setTimeout(() => props.onChange(value))
	}

	return (
		<div
			className={`select select--${props.position || 'bottom'} ${open ? 'select--open' : ''}`}
			style={{ width: props.width }}
		>
			<div className="select__value" onClick={() => setOpen(true)}>
				<span>{props.value ? getKeyFromValue() : <i>{props.placeholder}</i>}</span>
				<Icon
					rotate={90}
					style={{ transform: `scale(${(open ? -1 : 1) * (props.position == 'top' ? -1 : 1)})` }}
					name="arrow-right"
				/>
			</div>

			<div className="select__options">
				{props.options.map(option => (
					<div
						className={`select__options__option ${
							option.value == props.value ? 'select__options__option--selected' : ''
						}`}
						key={option.key}
						onClick={() => onChange(option.value)}
					>
						{option.key}
					</div>
				))}
			</div>
		</div>
	)
}

export default React.memo(Select)
