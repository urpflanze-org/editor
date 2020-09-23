import * as React from 'react'

import pups from '@pups/js'

import { bRunOnServiceWorker } from '@ui-services/utilities/utilies'

import executor from '@redux-store/executor'
import Tooltip from '@components/Tooltip'

const Loading: React.NamedExoticComponent<{ visible: boolean }> = React.memo((props: { visible: boolean }) => (
	<Tooltip title="Processing" style={{ height: '100%' }}>
		<svg
			style={{ height: '100%', opacity: props.visible ? 1 : 0.001, transition: 'opacity .1s' }}
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid"
		>
			<circle
				cx="50"
				cy="50"
				r="37"
				strokeWidth="10"
				stroke="#ffffff"
				strokeDasharray="58.119464091411174 58.119464091411174"
				fill="none"
				strokeLinecap="round"
				transform="rotate(66.0614 50 50)"
			>
				<animateTransform
					attributeName="transform"
					type="rotate"
					repeatCount="indefinite"
					dur="1s"
					keyTimes="0;1"
					values="0 50 50;360 50 50"
				></animateTransform>
			</circle>
		</svg>
	</Tooltip>
))
Loading.displayName = 'Loading'

const StatusBar: React.FunctionComponent<{}> = () => {
	const bRunOnWorker = bRunOnServiceWorker()

	const [waiting, setWaiting] = React.useState<boolean>(false)
	const [points, setPoints] = React.useState<number>(0)

	const workspace = document.getElementById('workspace')

	React.useEffect(() => {
		if (workspace) {
			document.documentElement.style.cursor = waiting ? 'wait' : 'auto'

			workspace.style.pointerEvents = waiting ? 'none' : 'auto'
		}
	}, [waiting])

	React.useEffect(() => {
		let tid = 0
		let lastWaitingTime = performance.now()

		executor.attach('executor-work', (data: any) => {
			const now = performance.now()
			if (now - lastWaitingTime > 300 || data.waiting == 0) {
				lastWaitingTime = now
				setWaiting(data.waiting > 0)
			}
		})

		executor.attach('project:update-properties', (data: any) => {
			data.ghosts && (tid = getScenePoints())
		})

		executor.attach('scene:update-layers', (data: any) => {
			tid = getScenePoints()
		})

		executor.attach('drawer:update', (data: any) => {
			tid = getScenePoints()
		})

		executor.attach('scene:update-scene_child-prop', (data: any) => {
			for (let i = 0, len = data.length; i < len; i++)
				if (data[i].name === 'repetitions' || data[i].name === 'shape') return (tid = getScenePoints())
		})

		function getScenePoints() {
			return setTimeout(async () => {
				const scene_points = await executor.ask('scene-points')
				scene_points != points && setPoints(scene_points)
			})
		}

		getScenePoints()

		return () => {
			tid && clearTimeout(tid)
		}
	}, [])

	return (
		<div style={StatusBarStyle}>
			<div>{bRunOnWorker ? 'Run on web worker' : 'Run in local'}</div>

			<Loading visible={waiting} />

			<div style={{ justifySelf: 'flex-end', flex: 5, textAlign: 'right' }}>
				<div>Number of points: {points}</div>
			</div>
		</div>
	)
}

const StatusBarStyle: React.CSSProperties = {
	color: 'rgba(255,255,255,.4)',
	background: pups.color('dark').toString('hex'),
	display: 'flex',
	gap: pups.ms(-1),
	padding: `0 ${pups.ms(-1)}`,
	alignItems: 'center',
	fontSize: '.8rem',
	height: '100%',
}

export default React.memo(StatusBar)
