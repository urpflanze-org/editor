import * as React from 'react'
import pups from '@pups/js'

import executor from '@redux-store/executor'

import Grid from '@components/Grid'
import Icon from '@components/icons/Icon'
import Tooltip from '@components/Tooltip'

interface DrawerGhostsProps {
	clearCanvas: boolean
	ghost_skip_time: number
	ghosts: number
}

const DrawerGhosts: React.FunctionComponent<DrawerGhostsProps> = ({
	clearCanvas,
	ghost_skip_time,
	ghosts,
}: DrawerGhostsProps) => {
	function setGhosts(_ghosts: number = ghosts, _ghost_skip_time: number = ghost_skip_time) {
		_ghosts = _ghosts < 0 ? 0 : _ghosts
		if ((_ghosts >= 0 && _ghosts != ghosts) || _ghost_skip_time != ghost_skip_time)
			executor.ask('set-drawer-ghosts', { ghosts: _ghosts, ghost_skip_time: _ghost_skip_time })
	}

	function getOffset(e: MouseEvent, t, k, l = 1) {
		return Math.floor((e.shiftKey ? t : 1) * (e.ctrlKey ? k : 1)) * (e.altKey ? l : 1)
	}

	return (
		<Grid
			rows={2}
			flow="max-content auto"
			style={{ justifyItems: 'center', pointerEvent: !clearCanvas ? 'none' : '', opacity: !clearCanvas ? '.2' : '' }}
			gap={pups.ms(-2)}
		>
			<small style={{ color: ghosts > 0 ? pups.color('primary').toString('hex') : '' }}>Ghosts</small>
			<div style={{ textAlign: 'center' }}>
				<Tooltip title="Number of ghosts">
					<Icon
						size={0}
						rotate={180}
						name="arrow-right"
						onClick={e => setGhosts(ghosts - getOffset(e, 5, 10), ghost_skip_time)}
					/>
					<small>{ghosts || 0}</small>
					<Icon size={0} name="arrow-right" onClick={e => setGhosts(ghosts + getOffset(e, 5, 10), ghost_skip_time)} />
				</Tooltip>
				<Tooltip title="Ghost frame skip">
					<Icon
						size={0}
						rotate={180}
						name="arrow-right"
						onClick={e => setGhosts(ghosts, ghost_skip_time - getOffset(e, 100, 10, 0.1))}
					/>
					<small>{ghost_skip_time || 1}</small>
					<Icon
						size={0}
						name="arrow-right"
						onClick={e => setGhosts(ghosts, ghost_skip_time + getOffset(e, 100, 10, 0.1))}
					/>
				</Tooltip>
			</div>
		</Grid>
	)
}

export default React.memo(DrawerGhosts)
