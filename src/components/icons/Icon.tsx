import * as React from 'react'

interface IconSettings {
	size?: number | string
	fill?: string
	stroke?: string
	strokeWidth?: number
	cursor?: string
	rotate?: number
	disabled?: boolean
	onClick?: any
	style?: any
	valign?: string
}

interface IconProps extends IconSettings {
	name: string
}

const Icon = (props: IconProps) => {
	const { name, size, fill, stroke, strokeWidth, cursor, rotate, disabled, onClick, valign, style, ...otherProps } =
		props

	const svg = require(`./${name}.svg`).default

	const ref = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		if (ref.current) {
			const svg = ref.current.firstChild as SVGElement | null
			if (svg) {
				fill && (svg.style.fill = fill)
				stroke && (svg.style.stroke = stroke)
				strokeWidth && (svg.style.strokeWidth = strokeWidth + '')
			}
		}
	}, [ref])

	return (
		<div
			ref={ref}
			className={`icon icon--s${typeof size === 'undefined' ? 1 : size} ${rotate ? 'icon--r' + rotate : ''} ${
				onClick ? 'icon--cliccable' : ''
			} ${disabled ? 'icon--disabled' : ''}`}
			style={{ ...style, cursor, verticalAlign: valign }}
			onClick={onClick}
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	)
}

export default React.memo(Icon)
