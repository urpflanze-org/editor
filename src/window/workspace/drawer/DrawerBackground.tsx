import * as React from 'react'
import pups from '@pups/js'

import executor from '@redux-store/executor'

import Grid from '@components/Grid'
import Color from '@components/input/Color'

import { DrawerOffsets } from '@window/workspace/drawer/DrawerOffsetsViewer'

// import DrawerBackgroundImage from '@window/workspace/drawer/DrawerBackgroundImage'
import { imageToCanvas } from '@window/workspace/drawer/DrawerUtilities'

interface IDrawerBackgroundProps {
	offsets: DrawerOffsets
	background: string
	backgroundImage: string
}

const DrawerBackground: React.FunctionComponent<IDrawerBackgroundProps> = ({
	background,
	backgroundImage,
}: IDrawerBackgroundProps) => {
	const [bInitial, setBInitial] = React.useState<boolean>(true)

	async function setBackgroundImage(src: { image: CanvasImageSource; source: string } | string | null) {
		if (src === null) {
			executor.ask('set-background-image', { image: null, source: null })
		} else {
			const { image, source } =
				typeof src == 'string' ? await imageToCanvas(src, bInitial ? null : 1080, 'fill', 1) : src
			bInitial && setBInitial(false)
			executor.ask('set-background-image', { image, source })
		}
	}

	React.useEffect(() => {
		bInitial && backgroundImage && setBackgroundImage(backgroundImage)
	}, [backgroundImage, bInitial])

	return (
		<Grid rows={2} flow="max-content auto" style={{ justifyItems: 'center' }} gap={pups.ms(-2)}>
			<small>Background</small>
			{/* <div> */}
			{/* <Grid columns={2} gap={pups.ms(-2)}> */}
			<Color
				enableAlpha={false}
				hideColorName={true}
				size={1}
				onChange={(v, t) => {
					executor.ask('set-scene-background', { background: v, preventDispatch: t })
				}}
				value={background}
			/>
			{/* <DrawerBackgroundImage image={backgroundImage} onChange={setBackgroundImage} /> */}
			{/* </Grid> */}
			{/* </div> */}
		</Grid>
	)
}

export default React.memo(DrawerBackground)
