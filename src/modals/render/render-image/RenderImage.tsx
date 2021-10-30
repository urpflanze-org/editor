import * as React from 'react'
import pups from '@pups/js'
import { connect } from 'react-redux'

import { ProjectState, RootState } from '&types/state'

// import JSONExporter from '@ui-services/exporter-importer/json/Exporter'
import executor from '@redux-store/executor'

import Bar from '@window/workspace/timeline/Bar'
import Grid from '@components/Grid'

import RenderImagePreview from '@modals/render/render-image/RenderImagePreview'
import RenderImageOptions from '@modals/render/render-image/RenderImageOptions'
import Loading from '@bootstrap/Loading'

import { bytesToHuman } from '@ui-services/utilities/utilies'
import { IRenderSettings } from 'urpflanze/dist/services/types/renderer'

import { createDownload } from '@window/app_bar/menu/FileUtility'

interface RenderImageProps {
	project: ProjectState
	closeModal: () => void
}

const RenderImage: React.FunctionComponent<RenderImageProps> = ({ project, closeModal }: RenderImageProps) => {
	const [svg, setSVG] = React.useState<string | null>(null)
	const [settings, setSettings] = React.useState<IRenderSettings>({
		size: 1024,
		quality: 0.8,
		time: 0,
		type: 'image/jpeg',
		noBackground: false,
	})

	const [loading, setLoading] = React.useState<boolean>(false)

	const [renderImage, setRenderImage] = React.useState<HTMLImageElement | null>(null)
	const [blob, setBlob] = React.useState<Blob | null>(null)
	const [renderImageStorageSize, setRenderImageStorageSize] = React.useState<string | null>(null)

	async function getImage() {
		if (!loading) {
			setLoading(true)
			const result = await executor.ask('render-image', {
				settings,
				// project: JSONExporter.export(project),
			})

			if (settings.type === 'image/svg+xml') {
				setSVG(result.svg)
				setLoading(false)
			} else {
				const blob = new Blob([result], { type: settings.type })
				const renderImage = new Image()

				renderImage.addEventListener(
					'load',
					() => {
						setRenderImage(renderImage)
						setBlob(blob)
						setLoading(false)
						setRenderImageStorageSize(bytesToHuman(blob.size))
					},
					{ passive: true }
				)
				renderImage.src = window.URL.createObjectURL(blob)
			}
		}
	}

	function download() {
		if (svg || blob) {
			const ext = settings.type === 'image/jpeg' ? 'jpg' : settings.type === 'image/svg+xml' ? 'svg' : 'png'
			createDownload(project.name + '.' + ext, svg ? svg : blob, settings.type)
		}
	}

	// React.useEffect(() => {
	//     if (renderImage || svg)
	//     {

	//     }
	// }, [renderImage, svg])

	React.useEffect(() => {
		return () => {
			executor.ask('render-stop')
		}
	}, [])

	return (
		<div className="render-image">
			<Grid columns={2} className="render-image__wrapper">
				<div className="render-image__wrapper__content">
					{loading && (
						<div className="render-image__wrapper__content__loading">
							<Loading />
						</div>
					)}
					{svg ? (
						<div className="render-image__wrapper__content__preview">
							<div dangerouslySetInnerHTML={{ __html: svg }}></div>
						</div>
					) : (
						<RenderImagePreview ratio={project.ratio} render={renderImage} settings={settings} />
					)}
				</div>

				<div>
					<RenderImageOptions settings={settings} setSettings={setSettings} downloadSize={renderImageStorageSize} />
					<button disabled={loading} onClick={getImage}>
						render
					</button>

					{(svg || renderImage) && <div onClick={() => download()}>download</div>}
				</div>
			</Grid>
			<div style={{ padding: `${pups.ms(0)} ${pups.ms(-1)} 0` }}>
				<Bar
					enableMoveTime={true}
					sequence_duration={project.sequence.duration}
					sequence_framerate={project.sequence.framerate}
					renderedFrames={[]}
					current_time={settings.time}
					onChange={t => setSettings({ ...settings, time: t })}
					steps={8}
				/>
			</div>

			<div onClick={closeModal}>Close</div>
		</div>
	)
}

export default React.memo(
	connect((state: RootState) => ({
		project: state.project,
	}))(RenderImage)
)
