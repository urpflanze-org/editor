import * as React from 'react'
import { connect } from 'react-redux'

import { RootState } from '&types/state'

import { ctrlKeyPressed } from '@ui-services/utilities/utilies'
import { IRawState } from 'urpflanze/dist/services/types/animation'
import { IProjectSceneChild } from 'urpflanze/dist/services/types/exporters-importers'

import CodeEditorWindowEditor from '@popup-windows/code-editor-window/CodeEditorWindowEditor'
import CodeEditorWindowPanel from '@popup-windows/animate-prop-window/AnimatePropWindowPanel'

import PopupStateHook from '@popup-windows/PupupStateHook'
import AlertPromise from '@components/Alert'
import SceneUtilitiesExtended from 'urpflanze/dist/services/scene-utilities/SceneUtilitiesExtended'
import ShapeBase from 'urpflanze/dist/core/shapes/ShapeBase'
import Rect from 'urpflanze/dist/core/shapes/primitives/Rect'
import Scene from 'urpflanze/dist/core/Scene'

interface CodeEditorWindowProps {
	layer_id?: number | string
	prop_name?: string
	scene: { [key: string]: IProjectSceneChild }
}

const INITIAL = `(${SceneUtilitiesExtended.RAW_ARGUMENTS}) => {

}`
const INITIAL_WITH_PARENT = `(${SceneUtilitiesExtended.RAW_ARGUMENTS_WITH_PARENT}) => {

}`

const CodeEditorWindow: React.FunctionComponent<CodeEditorWindowProps> = (props: CodeEditorWindowProps) => {
	const [initialCodeState, setInitialCodeState] = React.useState<string>(INITIAL)
	const [copy, setCopy] = React.useState<{ prop_name: string; value: string | null } | null>(null)
	const [state, setState] = PopupStateHook('code', props.scene, props.layer_id, props.prop_name)
	const [currentRawCode, setCurrentRawCode] = React.useState<IRawState>({
		raw: INITIAL,
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

	React.useEffect(() => {
		if (state.layer && state.prop_name && state.layer.id && (state.layer.id + '').length > 0) {
			const newInitialCodeState =
				state.layer &&
				state.prop_name &&
				state.layer.props[state.prop_name] &&
				state.layer.props[state.prop_name].type === 'raw'
					? state.layer.props[state.prop_name].value.raw
					: state.layer.bUseParent
					? INITIAL_WITH_PARENT
					: INITIAL

			setInitialCodeState(newInitialCodeState)
		}
	}, [state.prop_name, state.layer, state.layer.props, state.prop_name ? state.layer.props[state.prop_name] : null])

	function handleCopy() {
		state.prop_name && setCopy({ prop_name: state.prop_name, value: currentRawCode?.raw || null })
	}
	function paste() {
		// TODO: check input type validation
		copy && copy.value && setInitialCodeState(copy.value)
	}

	function save() {
		if (state.layer && state.prop_name) {
			console.log('save', currentRawCode, state)
			if (validate(state.layer, currentRawCode ? currentRawCode.raw : undefined)) {
				const data = {
					id: state.layer.id,
					name: state.prop_name,
					value: { type: 'raw', value: currentRawCode },
					prev_value: state.layer.props[state.prop_name],
				}
				window.opener.postMessage({ event: 'set-popup-window-value', value: data }, location.origin)
			} else {
				console.log('error', currentRawCode)
				AlertPromise('Code error')
			}
		}
	}

	function validate(layer: IProjectSceneChild, raw: string | undefined): boolean {
		if (raw === undefined) return true
		try {
			const t = eval(raw)
			const prop_arguments = ShapeBase.EMPTY_PROP_ARGUMENTS
			if (layer.bUseParent) {
				prop_arguments.parent = ShapeBase.EMPTY_PROP_ARGUMENTS
			}
			prop_arguments.shape = new Rect({})
			prop_arguments.shape.scene = new Scene()

			t(prop_arguments)
			return true
		} catch (e) {
			console.error(e)
			return false
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
					setState({ prop_name: state.prop_name, layer })
				}}
				selectPropName={prop_name => {
					setState({ layer: state.layer, prop_name })
				}}
			/>
		</div>
	)
}

export default connect((state: RootState) => ({
	scene: state.project.scene,
}))(CodeEditorWindow)
