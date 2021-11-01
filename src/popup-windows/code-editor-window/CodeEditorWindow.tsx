import * as React from 'react'
import { connect } from 'react-redux'

import { RootState } from 'types/state'

import { ctrlKeyPressed } from 'utilities'

import CodeEditorWindowEditor from 'popup-windows/code-editor-window/CodeEditorWindowEditor'
import CodeEditorWindowPanel from 'popup-windows/visual-editor-window/VisualEditorWindowPanel'

import PopupStateHook, { getPropTypeFromName } from 'popup-windows/PupupStateHook'
import AlertPromise from 'components/Alert'

import { SceneChildPropHead, SceneChildPropHeadWithParent, validateRawCode } from 'utilities/ValidateCode'
import { IProjectSceneChild, IRawState, TSceneChildPropsDataKeys } from 'urpflanze-ext'

interface CodeEditorWindowProps {
	layer_id?: number | string
	prop_name?: TSceneChildPropsDataKeys
	scene: { [key: string]: IProjectSceneChild }
}

const CodeEditorWindow: React.FunctionComponent<CodeEditorWindowProps> = (props: CodeEditorWindowProps) => {
	const [initialCodeState, setInitialCodeState] = React.useState<string>(SceneChildPropHead)
	const [state, setState] = PopupStateHook('code', props.scene, props.layer_id, props.prop_name)
	const [currentRawCode, setCurrentRawCode] = React.useState<IRawState>({
		raw: SceneChildPropHead,
		state: null,
	})

	React.useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.keyCode === 83 && ctrlKeyPressed(e)) {
				e.preventDefault()
				save()
			}
		}

		window.addEventListener('keydown', handleKeyDown, { passive: false })

		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [state.layer?.id, state.prop_name, currentRawCode])

	console.log('propType', props.prop_name, props, state.prop_type, state)
	React.useEffect(() => {
		if (state.layer && state.prop_name && state.layer.id && (state.layer.id + '').length > 0) {
			const newInitialCodeState =
				state.layer &&
				state.prop_name &&
				state.prop_type &&
				state.layer[state.prop_type][state.prop_name] &&
				state.layer[state.prop_type][state.prop_name].type === 'raw'
					? state.layer[state.prop_type][state.prop_name].value.raw
					: state.layer.bUseParent || state.layer.bUseRecursion
					? SceneChildPropHeadWithParent
					: SceneChildPropHead

			setInitialCodeState(newInitialCodeState)
		}
	}, [
		state.prop_name,
		state.layer,
		state.layer[state.prop_type],
		state.prop_name ? state.layer[state.prop_type][state.prop_name] : null,
	])

	function save() {
		if (state.layer && state.prop_name) {
			const validator = validateRawCode(state.layer, currentRawCode ? currentRawCode.raw : undefined)
			if (validator.valid) {
				const data = {
					id: state.layer.id,
					name: state.prop_name,
					value: { type: 'raw', value: currentRawCode },
					prev_value: state.layer[state.prop_type][state.prop_name],
				}
				window.opener.postMessage({ event: 'set-popup-window-value', value: data }, location.origin)
			} else {
				console.log('error', validator.error)
				AlertPromise(`Code error:\n ${validator.error}`)
			}
		}
	}

	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<div style={{ position: 'relative', width: '100%', height: '100%' }}>
				<CodeEditorWindowEditor
					layer={state.layer}
					prop_name={state.prop_name}
					initialCodeState={initialCodeState}
					setCurrentRawCode={setCurrentRawCode}
				/>
			</div>
			<CodeEditorWindowPanel
				scene={props.scene}
				layer={state.layer}
				prop_name={state.prop_name}
				selectLayer={layer => {
					setState({ prop_name: state.prop_name, layer, prop_type: state.prop_type })
				}}
				selectPropName={prop_name => {
					setState({ layer: state.layer, prop_name, prop_type: getPropTypeFromName(prop_name) })
				}}
			/>
		</div>
	)
}

export default connect((state: RootState) => ({
	scene: state.project.scene,
}))(CodeEditorWindow)
