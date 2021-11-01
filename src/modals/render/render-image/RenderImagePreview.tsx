import * as React from 'react'

import Icon from 'components/icons/Icon'
import Radio from 'components/input/Radio'
import pups from '@pups/js'

interface IRenderSettings {
	size: number
}
interface RenderImagePreviewProps {
	render: HTMLImageElement | null
	ratio: number
	settings: IRenderSettings
}

const RenderImagePreview: React.FunctionComponent<RenderImagePreviewProps> = ({
	render,
	ratio,
	settings,
}: RenderImagePreviewProps) => {
	const canvasRef = React.createRef<HTMLCanvasElement>()

	const [previewType, setPreviewType] = React.useState<'image' | 'pattern'>('image')
	const [tile, setTile] = React.useState(1)

	React.useEffect(() => {
		if (render && canvasRef.current) {
			const canvas = canvasRef.current
			const context = canvas.getContext('2d', { alpha: true }) as CanvasRenderingContext2D

			let width = ratio >= 1 ? settings.size : settings.size * ratio
			let height = ratio >= 1 ? settings.size / ratio : settings.size

			if (width > settings.size) {
				const ratio = width / height
				width = settings.size
				height = settings.size / ratio
			} else if (height > settings.size) {
				const ratio = height / width
				height = settings.size
				width = settings.size / ratio
			}

			canvas.width = width
			canvas.height = height

			context.clearRect(0, 0, canvas.width, canvas.height)

			if (previewType == 'pattern' && tile > 1) {
				canvas.width *= tile
				canvas.height *= tile

				const pattern = context.createPattern(render, 'repeat') as CanvasPattern

				context.fillStyle = pattern
				context.fillRect(0, 0, canvas.width, canvas.height)
			} else {
				context.drawImage(render, 0, 0, canvas.width, canvas.height)
			}
		}
	}, [render, tile])

	return (
		<div style={{ position: 'relative' }}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					padding: `0 ${pups.ms(0)} ${pups.ms(0)} ${pups.ms(0)}`,
				}}
			>
				<Radio
					name="Preview type"
					selected={previewType}
					values={[
						{ key: 'Image', value: 'image' },
						{ key: 'Pattern', value: 'pattern' },
					]}
					onChange={t => setPreviewType(t)}
				/>
				<div>
					{previewType == 'pattern' && (
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<small>Tiles</small>
							<div>
								<Icon
									size={0}
									rotate={180}
									name="arrow-right"
									disabled={tile <= 1}
									onClick={e => tile > 1 && setTile(tile - 1)}
								/>
								<small>{tile}</small>
								<Icon size={0} name="arrow-right" disabled={tile >= 5} onClick={e => tile < 5 && setTile(tile + 1)} />
							</div>
						</div>
					)}
				</div>
			</div>
			<div
				style={{
					width: '100%',
					height: '100%',
					lineHeight: 0,
					fontSize: 0,
					backgroundImage: 'url(assets/images/png-background.png)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '100%' }} />
			</div>
		</div>
	)
}

export default React.memo(RenderImagePreview)
