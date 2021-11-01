import * as React from 'react'
import { connect } from 'react-redux'

import { RootState } from 'types/state'

import useRef from 'hooks/useRef'

import { findLayer } from 'app/workspace/layers/layer_utilities'

import VertexCallbackWindowPanel from 'popup-windows/vertex-callback-window/VertexCallbackWindowPanel'
import Icon from 'components/icons/Icon'
import pups from '@pups/js'

import { ctrlKeyPressed } from 'utilities'
import VertexCallbackWindowVisualEditor from 'popup-windows/vertex-callback-window/VertexCallbackWindowVisualEditor'

import PopupStateHook from 'popup-windows/PupupStateHook'
import { IProjectSceneChild, IRawState } from 'urpflanze-ext'

interface VertexCallbackWindowProps {
	layer_id?: string
	scene: { [key: string]: IProjectSceneChild }
}

const VertexCallbackWindow: React.FunctionComponent<VertexCallbackWindowProps> = (props: VertexCallbackWindowProps) => {
	const [reteAnimationRef, setReteAnimationRef] = useRef<IRawState | null>(null)
	const [initialReteState, setInitialReteState] = React.useState<string | null>(null)

	const [{ layer }] = PopupStateHook('vertex-callback', props.scene, props.layer_id)

	React.useEffect(() => {
		if (layer && layer.id && (layer.id + '').length > 0) {
			const newInitialReteState = layer.id && layer.vertexCallback ? (layer.vertexCallback.state as string) : null

			setInitialReteState(newInitialReteState)
		}
	}, [layer?.id, layer?.vertexCallback])

	React.useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.keyCode === 83 && ctrlKeyPressed(e)) {
				e.preventDefault()
				save()
			}
		}

		window.addEventListener('keydown', handleKeyDown, { passive: false })

		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [layer?.id, layer?.vertexCallback, reteAnimationRef.current])

	function save() {
		if (layer && (layer.id + '').length > 0) {
			const data = {
				id: layer.id,
				name: 'vertexCallback',
				value: {
					...reteAnimationRef.current,
				},
				prev_value: layer.vertexCallback,
			}
			window.opener.postMessage({ event: 'set-popup-window-value', value: data }, location.origin)
		}
	}

	if (layer === null) return null

	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<div style={{ position: 'relative', width: '100%', height: '100%' }}>
				<div style={Header}>
					<Icon name="save" onClick={save} size={2} />
				</div>
				<VertexCallbackWindowVisualEditor
					initialReteState={initialReteState}
					setReteAnimationRef={setReteAnimationRef}
				/>
			</div>
			{/* <VertexCallbackWindowPanel
				loopMeta={loopMeta}
				setLoopMeta={setLoopMeta}
				loop
				scene={props.scene}
				layer={layer as ILayer}
			/> */}
		</div>
	)
}

const Header: React.CSSProperties = {
	position: 'absolute',
	top: 0,
	left: 0,
	padding: pups.ms(1),
}

export default connect((state: RootState) => ({
	scene: state.project.scene,
}))(VertexCallbackWindow)
