import * as React from 'react'
import pups from '@pups/js'

import dispatchMessage from '@window/messages/dispatchMessage'

import useClipboard from '@hooks/useClipboard'

interface ColorPreviewProps {
	color: string
	clipboard?: boolean
	size?: number | string
	onClick?: (e: React.MouseEvent) => boolean | undefined | void
}

const ColorPreview: React.FunctionComponent<ColorPreviewProps> = ({ color, clipboard, size, onClick }) => {
	clipboard = typeof clipboard === 'undefined' ? true : clipboard

	let data, setData

	if (clipboard) [data, setData] = useClipboard()

	function handleClick(e) {
		const result = onClick && onClick(e)

		if (result !== false && clipboard) setData(color) && dispatchMessage(`Copy ${color} to clipboard.`)
	}

	size = typeof size === 'string' ? size : pups.ms(size || 0)

	return (
		<div style={{ ...ContainerStyle, width: size, height: size, cursor: onClick ? 'pointer' : undefined }}>
			<div style={{ ...ColorStyle, background: color }} onClick={handleClick}></div>
		</div>
	)
}

const ContainerStyle: React.CSSProperties = {
	backgroundImage: 'url(assets/images/png-background.png)',
	backgroundPosition: 'center center',
	backgroundSize: 'cover',
	position: 'relative',
	borderRadius: '4px',
	display: 'inline-block',
	verticalAlign: 'middle',
}

const ColorStyle: React.CSSProperties = {
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	borderRadius: '2px',
}

export default React.memo(ColorPreview)
