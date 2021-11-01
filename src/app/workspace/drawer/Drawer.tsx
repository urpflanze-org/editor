import * as React from 'react'
import { connect } from 'react-redux'
import pups from '@pups/js'

import { RootState } from 'types/state'

import Grid from 'components/Grid'

import DrawerOffsetsViewer, { DrawerOffsets } from 'app/workspace/drawer/DrawerOffsetsViewer'
import DrawerLines from 'app/workspace/drawer/DrawerLines'
import DrawerCanvas from 'app/workspace/drawer/DrawerCanvas'
import DrawerClearCanvas from 'app/workspace/drawer/DrawerClearCanvas'
import DrawerBackground from 'app/workspace/drawer/DrawerBackground'
import DrawerGhosts from 'app/workspace/drawer/DrawerGhosts'
import DrawerResolution from 'app/workspace/drawer/DrawerResolution'
import DrawerRatio from 'app/workspace/drawer/DrawerRatio'
import Storage from 'storage/Storage'

interface IDrawerProps {
	background: string
	clear: boolean
	backgroundImage: string | undefined
	ghostSkipTime: number | undefined
	ghosts: number
}

const Drawer: React.FunctionComponent<IDrawerProps> = ({
	background,
	clear,
	backgroundImage,
	ghostSkipTime,
	ghosts,
}: IDrawerProps) => {
	const [size, setSize] = React.useState<number>(0)
	const [resolution, setResolution] = React.useState<'low' | 'medium' | 'high' | 'ultra'>(
		Storage.get('resolution', 'high')
	)

	const [offsets, setOffsets] = React.useState<DrawerOffsets>({ scale: 1, translate: [0, 0], size: 400 })

	return (
		<Grid
			component="section"
			data-name="drawer"
			rows={2}
			gap={pups.ms(0)}
			flow="auto max-content"
			style={{ width: '100%', height: '100%', overflow: 'hidden' }}
		>
			<DrawerCanvas setSize={setSize} offsets={offsets} setOffsets={setOffsets} />

			<Grid columns={7} gap={pups.ms(0)} flow="repeat(7, max-content)" halign="center" valign="start">
				<DrawerOffsetsViewer height={pups.ms(1) as string} {...offsets} />

				<DrawerBackground offsets={offsets} background={background} backgroundImage={backgroundImage} />

				<DrawerClearCanvas ghosts={ghosts} clear={clear} />

				<DrawerGhosts clear={clear} ghosts={ghosts} ghostSkipTime={ghostSkipTime} />

				<DrawerLines />

				{/* <DrawerResolution resolution={resolution} setResolution={setResolution} ratio={ratio} size={size} /> */}

				{/* <DrawerRatio size={size} resolution={resolution} /> */}
			</Grid>
		</Grid>
	)
}

export default React.memo(
	connect((state: RootState) => ({
		backgroundImage: state.project.backgroundImage,
		background: state.project.background,
		clear: state.project.clear,
		ghosts: state.project.ghosts,
		ghostSkipTime: state.project.ghostSkipTime,
		// ratio: state.project.ratio,
	}))(Drawer)
)
