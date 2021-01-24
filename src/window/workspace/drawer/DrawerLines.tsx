import * as React from 'react'
import pups from '@pups/js'

import executor from '@redux-store/executor'

import Grid from '@components/Grid'
import Icon from '@components/icons/Icon'
import { clamp } from 'urpflanze/dist/Utilites'

const DrawerLines: React.FunctionComponent<{}> = () => {
	const [lines, setLines] = React.useState<number>(0)

	React.useEffect(() => {
		executor.ask('set-drawer-lines', lines)
	}, [lines])

	React.useEffect(() => {
		let bShowLines = true

		function handleToggleLines(e) {
			bShowLines = !bShowLines
			e.keyCode == 72 && executor.ask('set-drawer-lines', bShowLines ? lines : 0)
		}

		document.addEventListener('keydown', handleToggleLines, { passive: true })

		return () => document.removeEventListener('keydown', handleToggleLines)
	}, [lines])

	return (
		<Grid rows={2} flow="max-content auto" style={{ justifyItems: 'center' }} gap={pups.ms(-2)}>
			<small>Lines</small>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Icon size={0} rotate={180} name="arrow-right" onClick={() => setLines(clamp(0, 20, lines - 1))} />
				<small>{lines}</small>
				<Icon size={0} name="arrow-right" onClick={() => setLines(clamp(0, 20, lines + 1))} />
			</div>
		</Grid>
	)
}

export default React.memo(DrawerLines)
