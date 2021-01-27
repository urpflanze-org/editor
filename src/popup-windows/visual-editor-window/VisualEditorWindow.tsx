import * as React from 'react'
import { connect } from 'react-redux'

import { RootState } from '&types/state'

import useRef from '@hooks/useRef'

import { findLayer } from '@window/workspace/layers/layer_utilities'

import VisualEditorWindowPanel from '@popup-windows/visual-editor-window/VisualEditorWindowPanel'
import VisualEditorWindowVisualEditor from '@popup-windows/visual-editor-window/VisualEditorWindowVisualEditor'
import Icon from '@components/icons/Icon'
import pups from '@pups/js'

import SceneUtilitiesExtended from 'urpflanze/dist/services/scene-utilities/SceneUtilitiesExtended'
import { ctrlKeyPressed } from '@ui-services/utilities/utilies'
import { IRawState } from 'urpflanze/dist/services/types/animation'
import { IProjectSceneChild } from 'urpflanze/dist/services/types/exporters-importers'

import PopupStateHook from '@popup-windows/PupupStateHook'
import { SceneChildPropHeadWithParent, validateRawCode } from '@ui-services/utilities/ValidateCode'
import AlertPromise from '@components/Alert'

interface VisualEditorWindowProps {
	layer_id?: number | string
	prop_name?: string
	scene: { [key: string]: IProjectSceneChild }
}

const VisualEditorWindow: React.FunctionComponent<VisualEditorWindowProps> = (props: VisualEditorWindowProps) => {
	const [reteAnimation, setReteAnimation] = React.useState<IRawState | null>(null)
	const [copy, setCopy] = React.useState<{ prop_name: string; value: string | null } | null>(null)
	const [initialReteState, setInitialReteState] = React.useState<string | null>(null)

	const [state, setState] = PopupStateHook('animate', props.scene, props.layer_id, props.prop_name)

	React.useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.keyCode === 83 && ctrlKeyPressed(e)) {
				e.preventDefault()
				save()
			}
		}

		window.addEventListener('keydown', handleKeyDown, { passive: false })

		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [
		state.layer?.id,
		state.layer && state.prop_name ? state.layer.props[state.prop_name] : null,
		state.prop_name,
		reteAnimation,
	])

	React.useEffect(() => {
		if (state.layer && state.prop_name && state.layer.id && (state.layer.id + '').length > 0) {
			const newInitialReteState =
				state.layer &&
				state.prop_name &&
				SceneUtilitiesExtended.bValueAnimation(state.layer.props[state.prop_name]) &&
				state.layer.props[state.prop_name].type === 'raw'
					? state.layer.props[state.prop_name].value.state
					: null

			setInitialReteState(newInitialReteState)
		}
	}, [state.prop_name, state.layer, state.layer.props, state.prop_name ? state.layer.props[state.prop_name] : null])

	function handleCopy() {
		state.prop_name && setCopy({ prop_name: state.prop_name, value: reteAnimation?.state || null })
	}

	function paste() {
		// TODO: check input type validation
		copy && setInitialReteState(copy.value)
	}

	function save() {
		if (state.layer && state.prop_name) {
			const value = {
				raw: `(${SceneUtilitiesExtended.RAW_ARGUMENTS}) => ${reteAnimation?.raw}`,
				state: reteAnimation?.state,
			}
			const validator = validateRawCode(state.layer, value.raw)
			if (validator.valid) {
				const data = {
					id: state.layer.id,
					name: state.prop_name,
					value: { type: 'raw', value },
					prev_value: state.layer.props[state.prop_name],
				}
				window.opener.postMessage({ event: 'set-popup-window-value', value: data }, location.origin)
			} else {
				AlertPromise(`Code error:\n ${validator.error}`)
			}
		}
	}

	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<div style={{ position: 'relative', width: '100%', height: '100%' }}>
				<div style={Header}>
					<Icon name="save" onClick={save} size={2} />
					<Icon name="copy" size={2} onClick={handleCopy} />
					<Icon name="paste" disabled={copy === null} size={2} onClick={paste} />
				</div>
				<VisualEditorWindowVisualEditor
					layer={state.layer}
					prop_name={state.prop_name}
					initialReteState={initialReteState}
					setReteAnimation={setReteAnimation}
				/>
			</div>
			<VisualEditorWindowPanel
				scene={props.scene}
				layer={state.layer}
				prop_name={state.prop_name}
				selectLayer={layer => {
					setState({ prop_name: state.prop_name, layer })
				}}
				selectPropName={prop_name => {
					setState({ layer: state.layer, prop_name })
				}}
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
}))(VisualEditorWindow)
