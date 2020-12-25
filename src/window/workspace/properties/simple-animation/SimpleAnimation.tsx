import * as React from 'react'
import { connect } from 'react-redux'
import pups from '@pups/js'

import { RootState } from '&types/state'

import { openAnimatePropWindow, openCodeEditorWindow } from 'popup-windows/PupupUtilities'

import Range from '@components/input/Range'
import Checkbox from '@components/input/Checkbox'
import Grid from '@components/Grid'
import Button from '@components/input/Button'

import SimpleAnimationAdvanceSettings from '@window/workspace/properties/simple-animation/SimpleAnimationAdvanceSettings'
import {
	getSimpleAnimationInitialState,
	MODE_FUNCTIONS,
	sanitizeAnimation,
	isAdvancedAnimation,
} from '@window/workspace/properties/simple-animation/SimpleAnimationUtilities'
import SimpleAnimationInput from '@window/workspace/properties/simple-animation/SimpleAnimationInput'

import { ISequenceMeta } from '@genbs/urpflanze/dist/services/types/timeline'
import ScenePropUtilities from '@genbs/urpflanze/dist/services/scene-utilities/ScenePropUtilities'
import { ISceneChildPropData } from '@genbs/urpflanze/dist/services/scene-utilities/SceneChildPropsData'
import SceneChildPropsData from '@ui-services/utilities/SceneChildPropsData'

import { TAnimation, ISimpleAnimation } from '@genbs/urpflanze/dist/services/types/animation'
import { IProjectSceneChild } from '@genbs/urpflanze/dist/services/types/exporters-importers'

interface SimpleAnimationPropProps {
	layer: IProjectSceneChild
	value: any
	prop_name: string
	sequence: ISequenceMeta
	close: () => void
	onChange: (value: TAnimation | undefined) => void
}

const SimpleAnimationProp: React.FunctionComponent<SimpleAnimationPropProps> = ({
	close,
	value,
	onChange,
	sequence,
	layer,
	prop_name,
}: SimpleAnimationPropProps) => {
	const sceneChildProp: ISceneChildPropData = SceneChildPropsData[prop_name]
	const _bValueIsAnimation = ScenePropUtilities.bValueAnimation(value)
	const initialState = getSimpleAnimationInitialState(value, sceneChildProp, Math.min(2000, sequence.durate))
	const [state, setState] = React.useState<ISimpleAnimation>(initialState)
	const [bAdvanceMode, setAdvanceMode] = React.useState<boolean>(
		_bValueIsAnimation && isAdvancedAnimation(initialState)
	)

	function set(key: keyof ISimpleAnimation, value: any) {
		if (key === 'mode') {
			const mf = MODE_FUNCTIONS[value]
			setState({ ...state, mode: value, mode_function: mf[0].value })
		} else if (key === 'type') {
			setState({
				...state,
				type: value,
				mode: value === 'static' ? 'easing' : state.mode,
				mode_function:
					value === 'static' && state.mode != 'easing' ? MODE_FUNCTIONS.easing[0].value : state.modeFunction,
			})
		} else {
			setState({ ...state, [key]: value })
		}
	}

	function handleChange() {
		onChange({ type: 'simple', value: sanitizeAnimation(sceneChildProp, state) })
	}

	function handleRemove() {
		onChange(undefined)
	}

	function openVisualEditor() {
		close()
		openAnimatePropWindow(layer.id as string, prop_name)
	}
	function openCodeEditor() {
		close()
		openCodeEditorWindow(layer.id as string, prop_name)
	}

	return (
		<div>
			<h2>Simple animation</h2>
			<small>
				Animate prop <b>{prop_name}</b> of shape {layer.name}
			</small>

			<Grid
				gap={pups.ms(-2)}
				valign="center"
				style={{ margin: `${pups.ms(0)} 0` }}
				flow={`repeat(3, 1fr) / max-content ${pups.ms(4)}`}
			>
				<div>From</div>

				<SimpleAnimationInput value={state.from} onChange={set} name="from" sceneChildProp={sceneChildProp} />
				<div>To</div>
				<SimpleAnimationInput value={state.to} onChange={set} name="to" sceneChildProp={sceneChildProp} />

				<div>Durate</div>
				<Range
					size={pups.add(1, -1)}
					min={0}
					max={sequence.durate}
					step={100}
					value={state.durate}
					onChange={(e, mode) => mode == 'none' && set('durate', e)}
				/>
			</Grid>

			<Checkbox checked={bAdvanceMode} onChange={c => setAdvanceMode(c)} name="Advance mode" size={0} />

			{bAdvanceMode && (
				<SimpleAnimationAdvanceSettings
					state={state}
					bColor={sceneChildProp.type === 'color'}
					sequence={sequence}
					onChange={set}
				/>
			)}

			<div>
				<div
					style={{ margin: `${pups.ms(0)} 0`, textDecoration: 'underline', cursor: 'pointer' }}
					onClick={openVisualEditor}
				>
					Open visual editor in new window
				</div>
				<div
					style={{ margin: `${pups.ms(0)} 0`, textDecoration: 'underline', cursor: 'pointer' }}
					onClick={openCodeEditor}
				>
					openCodeEditor
				</div>
			</div>

			<Button onClick={handleChange} label="Apply" />

			{_bValueIsAnimation && <Button onClick={handleRemove} label="Remove" />}
		</div>
	)
}

export default React.memo(
	connect((state: RootState) => ({
		sequence: state.project.sequence as ISequenceMeta,
	}))(SimpleAnimationProp)
)
