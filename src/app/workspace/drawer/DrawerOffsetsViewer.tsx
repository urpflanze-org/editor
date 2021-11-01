import * as React from 'react'
import { relativeClamp } from '@urpflanze/core/dist/cjs'
import pups from '@pups/js'

import Grid from 'components/Grid'
import Tooltip from 'components/Tooltip'

export interface DrawerOffsets {
	scale: number
	translate: [number, number]
	size: number
}

const DrawerOffsetsViewer: React.FunctionComponent<DrawerOffsets & { height: string }> = ({
	scale,
	translate,
	height,
}: DrawerOffsets & { height: string }) => {
	const containerSize = parseFloat(height)
	const containerSizeScaledCenter = containerSize / scale / 2

	const containerStyle: React.CSSProperties = {
		border: `1px solid ${scale > 1 ? pups.color('primary') : pups.color('primary').alpha(0.4).toString('rgba')}`,
		width: containerSize + 'rem',
		height: containerSize + 'rem',
	}

	const viewerStyle: React.CSSProperties = {
		top:
			relativeClamp(-1, 1, translate[1], containerSizeScaledCenter, containerSize - containerSizeScaledCenter) + 'rem',
		left:
			relativeClamp(-1, 1, translate[0], containerSizeScaledCenter, containerSize - containerSizeScaledCenter) + 'rem',
		transform: `scale(${1 / scale}) translate(-50%, -50%)`,
	}

	return (
		<Grid rows={2} flow="max-content auto" style={{ justifyItems: 'center' }} gap={pups.ms(-2)}>
			<small>
				<Tooltip small={true} title={'Use wheel on drawer for zoom\nand drag for translate'}>
					<span style={{ color: scale !== 1 ? pups.color('primary').toString('hex') : '' }}>Zoom</span>
				</Tooltip>
			</small>
			<div style={{ ...containerStyle, ...DrawerOffsetStyle }}>
				<div style={{ ...viewerStyle, ...DrawerOffsetViewerStyle }}></div>
			</div>
		</Grid>
	)
}

const DrawerOffsetStyle: React.CSSProperties = {
	display: 'inline-block',
	overflow: 'hidden',
	borerRadius: '2px',
}
const DrawerOffsetViewerStyle: React.CSSProperties = {
	position: 'relative',
	width: '100%',
	height: '100%',
	margin: '-1px',
	transformOrigin: 'left top',
	background: 'rgba(255,255,255,.2)',
}

export default React.memo(DrawerOffsetsViewer)
