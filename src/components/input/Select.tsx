import * as React from 'react'
import styled from 'styled-components'
import pups from '@pups/js'

import Icon from '@components/icons/Icon'

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
	}, [props.value, open])

	function getKeyFromValue() {
		for (let i = 0, len = props.options.length; i < len; i++)
			if (props.options[i].value == props.value) return props.options[i].key
	}

	function onChange(value) {
		setTimeout(() => props.onChange(value))
	}

	return (
		<Container width={props.width}>
			<Value onClick={() => setOpen(true)}>
				<span>{props.value ? getKeyFromValue() : <i>{props.placeholder}</i>}</span>
				<Icon
					rotate={90}
					style={{ transform: `scale(${(open ? -1 : 1) * (props.position == 'top' ? -1 : 1)})` }}
					name="arrow-right"
				/>
			</Value>

			<Options position={props.position || 'bottom'} open={open}>
				{props.options.map(option => (
					<Option key={option.key} onClick={() => onChange(option.value)} selected={option.value == props.value}>
						{option.key}
					</Option>
				))}
			</Options>
		</Container>
	)
}

const Container = styled.div<{ width?: string }>`
	position: relative;
	width: ${props => props.width};
	border: 1px solid ${pups.color('gray-dark')};
	border-radius: 2px;
`

const Value = styled.div`
	padding: 0 ${pups.ms(-1)};
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
`

const Options = styled.ul<{ position: 'top' | 'bottom'; open: boolean }>`
	position: absolute;
	z-index: 1;
	width: 100%;
	max-height: 20vh;
	overflow: auto;
	${props => (props.position == 'top' ? 'bottom: 100%;' : 'top: 100%; ')}
	border: 1px solid ${pups.color('gray-dark')};
	display: ${props => (props.open ? 'block' : 'none')};
	list-style: none;
	margin: ${pups.ms(-2)} 0;
	padding: 0;
	background: ${pups.color('dark')};
`

const Option = styled.li<{ selected: boolean }>`
	padding: 0 ${pups.ms(-1)};
	cursor: pointer;
	background: ${props => (props.selected ? pups.color('primary') : null)};

	&:hover {
		background: ${props => (props.selected ? null : pups.color('dark').lighten(5))};
	}
`

export default React.memo(Select)
