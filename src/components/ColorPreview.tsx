import * as React from 'react'
import pups from '@pups/js'

import dispatchMessage from 'app/messages/dispatchMessage'

import useClipboard from 'hooks/useClipboard'

interface ColorPreviewProps {
	color: string
	clipboard?: boolean
	size?: number
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

	return (
		<div className={`color-preview color-preview--s${size || 0} ${onClick ? 'color-preview--clickable' : ''}`}>
			<div className="color-preview__color" style={{ background: color }} onClick={handleClick}></div>
		</div>
	)
}

export default React.memo(ColorPreview)
