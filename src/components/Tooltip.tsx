import * as React from 'react'

interface Props {
	title: string
	disabled?: boolean
	small?: boolean
	position?: 'top' | 'left' | 'bottom' | 'right'
}

const Tooltip: React.FunctionComponent<Props> = ({
	disabled,
	small,
	position,
	title,
	children,
	...otherProps
}: React.PropsWithChildren<Props>) => (
	<div className={`tooltip ${disabled ? 'tooltip--disabled' : ''}`} disabled={disabled} {...otherProps}>
		<div
			className={`tooltip__label ${small ? 'tooltip__label--small' : ''} tooltip__label--${position || 'top'}`}
			dangerouslySetInnerHTML={{ __html: title }}
		/>
		{children}
	</div>
)

export default React.memo(Tooltip)
