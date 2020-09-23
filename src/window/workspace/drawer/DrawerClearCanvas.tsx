import * as React from 'react'
import pups from '@pups/js'

import executor from '@redux-store/executor'

import Grid from '@components/Grid'
import Checkbox from '@components/input/Checkbox'

interface DrawerClearCanvasProps {
	clearCanvas: boolean
	ghosts: number
}

const DrawerClearCanvas: React.FunctionComponent<DrawerClearCanvasProps> = ({
	clearCanvas,
	ghosts,
}: DrawerClearCanvasProps) => {
	return (
		<Grid
			rows={2}
			flow="max-content auto"
			style={{
				justifyItems: 'center',
				opacity: ghosts > 0 ? 0.2 : 1,
				pointerEvents: ghosts > 0 ? 'none' : undefined,
			}}
			gap={pups.ms(-2)}
		>
			<small>
				<label
					style={{
						cursor: 'pointer',
						color: ghosts === 0 && !clearCanvas ? pups.color('primary').toString('hex') : '',
					}}
					htmlFor="cb_clearCanvas"
				>
					Clear
				</label>
			</small>
			<Checkbox
				size={1}
				checked={clearCanvas}
				id="cb_clearCanvas"
				onChange={v => executor.ask('set-drawer-clear', v)}
			/>
		</Grid>
	)
}

export default React.memo(DrawerClearCanvas)
