import * as React from 'react'
import { connect } from 'react-redux'

import { RootState } from '&types/state'

import useRef from '@hooks/useRef'

import { findLayer } from '@window/workspace/layers/layer_utilities'

import ShapeLoopWindowPanel, { LoopMeta } from '@popup-windows/shape-loop-window/ShapeLoopWindowPanel'
import Icon from '@components/icons/Icon'
import pups from '@pups/js'

import { ctrlKeyPressed } from '@ui-services/utilities/utilies'
import ShapeLoopWindowVisualEditor from '@popup-windows/shape-loop-window/ShapeLoopWindowVisualEditor'
import { IProjectSceneChild } from 'urpflanze/dist/services/types/exporters-importers'
import { IRawState } from 'urpflanze/dist/services/types/animation'

import PopupStateHook from '@popup-windows/PupupStateHook'

interface ShapeLoopWindowProps {
	layer_id?: number | string
	scene: { [key: string]: IProjectSceneChild }
}

// const defaultLayer = {
// 	id: '',
// 	props: { loop: { start: 0, end: 0, inc: 0, reteEditor: '', raw: '', dynamyc: false } },
// }
const ShapeLoopWindow: React.FunctionComponent<ShapeLoopWindowProps> = (props: ShapeLoopWindowProps) => {
	const [loopMeta, setLoopMeta] = React.useState<LoopMeta>({
		start: 0,
		end: Math.PI * 2,
		inc: (Math.PI * 2) / 100,
		dynamyc: false,
	})
	const [reteAnimationRef, setReteAnimationRef] = useRef<IRawState | null>(null)
	const [initialReteState, setInitialReteState] = React.useState<string | null>(null)

	const [{ layer }] = PopupStateHook('shape-loop', props.scene, props.layer_id)

	React.useEffect(() => {
		if (layer && layer.id && (layer.id + '').length > 0) {
			const newInitialReteState = layer.id ? layer.props.loop?.vertex?.state : null

			setInitialReteState(newInitialReteState)
		}
	}, [layer?.id, layer?.props.loop])

	React.useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.keyCode === 83 && ctrlKeyPressed(e)) {
				e.preventDefault()
				save()
			}
		}

		window.addEventListener('keydown', handleKeyDown, { passive: false })

		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [layer?.id, layer?.props.loop, loopMeta, reteAnimationRef.current])

	function save() {
		if (layer && (layer.id + '').length > 0 && reteAnimationRef.current?.raw && reteAnimationRef.current?.raw.length) {
			const data = {
				id: layer.id,
				name: 'loop',
				value: {
					...loopMeta,
					vertex: reteAnimationRef.current,
				},
				prev_value: layer.props.loop,
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
				<ShapeLoopWindowVisualEditor initialReteState={initialReteState} setReteAnimationRef={setReteAnimationRef} />
			</div>
			<ShapeLoopWindowPanel
				loopMeta={loopMeta}
				setLoopMeta={setLoopMeta}
				loop
				scene={props.scene}
				layer={layer as IProjectSceneChild}
			/>
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
}))(ShapeLoopWindow)
