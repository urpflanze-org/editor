import * as React from 'react'
import { connect } from 'react-redux'

import { ProjectState, RootState } from '&types/state'

import executor from '@redux-store/executor'
import { bytesToHuman, now } from '@ui-services/utilities/utilies'
import app_utilities from 'app_utilities'
import { createDownload } from '@window/app_bar/menu/FileUtility'
import { IRenderFrame, IRenderSettings, IRenderStart } from 'urpflanze/dist/services/types/renderer'
import Select from '@components/input/Select'

interface RenderAnimationProps {
	project: ProjectState
	closeModal: () => void
}

interface IRenderAnimationState {
	estimated_time: number
	forPart: number
	total_frames: number
	total_parts: number
	start_time: number
	remaining_time: number
	current_frame: number
	progress_percentage: number
}

const DEFAULT_STATE = {
	estimated_time: 0,
	forPart: 0,
	total_frames: 0,
	total_parts: 0,
	start_time: 0,
	remaining_time: 0,
	current_frame: 0,
	progress_percentage: 0,
}

const SIZES = [256, 512, 1080, 1024, 2048, 4096, 8192].map(v => ({ key: v, value: v }))

const RenderAnimation: React.FunctionComponent<RenderAnimationProps> = ({
	project,
	closeModal,
}: RenderAnimationProps) => {
	const [started, setStarted] = React.useState<boolean>(false)
	const [stopped, setStopped] = React.useState<boolean>(false)
	const [state, setState] = React.useState<IRenderAnimationState>(DEFAULT_STATE)

	const estimatedSamplesSize = 100
	const [estimatedSamples, setEstimatedSamples] = React.useState<{ index: number; samples: Array<number> }>({
		index: 0,
		samples: [],
	})

	const [settings, setSettings] = React.useState<IRenderSettings>({
		size: 1080,
		quality: 1,
		time: 0,
		type: 'image/jpeg',
		noBackground: false,
	})

	const [blobs, setBlobs] = React.useState<Array<Blob> | null>(null)

	React.useEffect(() => {
		function handleRenderStart(e) {
			const event = e as IRenderStart

			setState({
				...event,
				start_time: now(),
				remaining_time: event.estimated_time,
				current_frame: 0,
				progress_percentage: 0,
			})
			// setStarted(true)
		}

		function handleRenderFrame(e) {
			const event = e as IRenderFrame
			const percentage = Math.round(((++event.frame * 100) / state.total_frames) * 100) / 100
			document.title = percentage + '% ' + project.name
			setState({
				...state,
				remaining_time: calculateFrameRenderTime(event.render_time) * state.total_frames - (now() - state.start_time),
				current_frame: event.frame + 1,
				progress_percentage: percentage,
			})
			// console.log('handleRenderFrame', event)
		}

		executor.attach('renderer:start', handleRenderStart)
		executor.attach('renderer:render-frame', handleRenderFrame)

		return () => {
			// executor.ask('render-stop')
			executor.detach('renderer:start', handleRenderStart)
			executor.detach('renderer:render-frame', handleRenderFrame)
		}
	}, [state, estimatedSamples, started])

	function calculateFrameRenderTime(frame_render_time: number): number {
		const samples = estimatedSamples.samples.length
		let avg = frame_render_time

		if (samples > 0) {
			let average = 0

			for (let i = 0; i < samples; i++) average += estimatedSamples.samples[i]

			avg = Math.round(average / samples)
		}

		estimatedSamples.samples[estimatedSamples.index] = Math.round(frame_render_time)
		estimatedSamples.index = (estimatedSamples.index + 1) % estimatedSamplesSize

		setEstimatedSamples({ ...estimatedSamples })

		return avg
	}

	async function render() {
		setStarted(true)
		const result: Array<Blob> = await executor.ask('render-animation', {
			settings,
			// project: JSONExporter.export(project),
		})

		setBlobs(result)
		setStarted(false)
	}

	function download(index) {
		if (blobs && blobs.length > 0 && blobs.length >= index) {
			createDownload(
				`${project.name && project.name.length > 0 ? project.name : app_utilities.empty_project_name}_part_${
					index + 1
				}`,
				blobs[index],
				'application/zip'
			)
		}
	}

	async function stop() {
		console.log('stop')
		setStopped(true)
		await executor.ask('render-stop')
		setStarted(false)
		setStopped(false)
	}

	function downloadAll() {
		if (blobs && blobs.length > 0) {
			for (let i = 0; i < blobs.length; i++) {
				download(i)
			}
		}
	}

	async function close() {
		await stop()
		document.title = app_utilities.getDocumentProjectTitle(project.name)
		closeModal()
	}

	return (
		<div>
			{stopped && <div>wait stop...</div>}
			<Select
				value={settings.size}
				placeholder="Size"
				options={SIZES}
				onChange={size => setSettings({ ...settings, size })}
			/>
			<button onClick={render} disabled={started}>
				render
			</button>
			<button onClick={stop} disabled={!started}>
				stop
			</button>

			<div>
				frame: {state.current_frame} su {state.total_frames}
				<br />
				part: {state.total_parts}
				<br />
				rem: {state.remaining_time <= 0 ? 0 : Math.floor(state.remaining_time / 1000)}s<br />
				prog: {state.progress_percentage}%<br />
			</div>

			{blobs && (
				<div>
					{blobs.map((blob, index) => {
						return (
							<div key={index} onClick={() => download(index)}>
								zip_part_{index + 1} - {bytesToHuman(blob.size)}
							</div>
						)
					})}

					<div onClick={downloadAll}>download all</div>
				</div>
			)}

			<div onClick={close}>Close</div>
		</div>
	)
}

export default React.memo(
	connect((state: RootState) => ({
		project: state.project,
	}))(RenderAnimation)
)
