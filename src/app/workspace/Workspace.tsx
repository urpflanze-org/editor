import * as React from 'react'

import Toolbar from 'app/workspace/toolbar/Toolbar'
import Drawer from 'app/workspace/drawer/Drawer'
import Timeline from 'app/workspace/timeline/Timeline'
import Layers from 'app/workspace/layers/Layers'
import Properties from 'app/workspace/properties/Properties'

import Grid from 'components/Grid'
import pups from '@pups/js'

const Workspace: React.FunctionComponent = () => {
	return (
		<Grid {...workspaceLayout} id="workspace">
			<Grid {...leftSideLayout}>
				<Toolbar />
				<Drawer />
				<div style={{ gridColumn: '1 / span 2' }}>
					<Timeline />
				</div>
			</Grid>
			<Grid {...rightSideLayout}>
				<Layers />
				<Properties />
			</Grid>
		</Grid>
	)
}

const workspaceLayout = {
	style: {
		width: '100vw',
		height: '100%',
		overflow: 'hidden',
		padding: `0 ${pups.ms(0)}`,
	},
	columns: 2,
	flow: 'repeat(2, minmax(0, 1fr))',
	component: 'section',
	gap: pups.ms(0),
}

const leftSideLayout = {
	columns: 2,
	rows: 2,
	valign: 'start',
	flow: `auto max-content / max-content auto`,
	gap: pups.ms(0),
	style: {
		height: `calc(100vh - ${pups.add(2 /* app_bar */, 1 /* status bar */)})`,
	},
}

const rightSideLayout = {
	columns: 2,
	valign: 'start',
	flow: `repeat(2, minmax(0, 1fr))`,
	gap: pups.ms(0),
	style: {
		height: '100%',
		overflow: 'hidden',
	},
}

export default Workspace
