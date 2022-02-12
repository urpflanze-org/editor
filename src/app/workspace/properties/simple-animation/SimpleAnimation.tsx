import * as React from 'react'
import { connect } from 'react-redux'
import pups from '@pups/js'

import { RootState } from 'types/state'

import { openAnimatePropWindow, openCodeEditorWindow } from 'popup-windows/PupupUtilities'

import Range from 'components/input/Range'
import Checkbox from 'components/input/Checkbox'
import Grid from 'components/Grid'
import Button from 'components/input/Button'

import SimpleAnimationAdvanceSettings from 'app/workspace/properties/simple-animation/SimpleAnimationAdvanceSettings'
import {
	getSimpleAnimationInitialState,
	MODE_FUNCTIONS,
	sanitizeAnimation,
	isAdvancedAnimation,
} from 'app/workspace/properties/simple-animation/SimpleAnimationUtilities'
import SimpleAnimationInput from 'app/workspace/properties/simple-animation/SimpleAnimationInput'
import { ISimpleAnimation } from '@urpflanze/animation/dist/cjs'
import { ISequenceMeta } from '@urpflanze/drawer-canvas/dist/cjs'
import {
	IProjectSceneChild,
	TAnimation,
	ISceneChildUtiltiesData,
	SceneChildUtilitiesData,
	bValueAnimation,
} from 'urpflanze-ext'
import Select from 'components/input/Select'
import SimpleAnimationLoop from './SimpleAnimationLoop'
import SimpleAnimationDirection from './SimpleAnimationDirection'
import SimpleAnimationInterpolator from './SimpleAnimationInterpolator'
import Radio from 'components/input/Radio'

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
	const sceneChildProp: ISceneChildUtiltiesData = SceneChildUtilitiesData[prop_name]
	const bValueIsAnimation = bValueAnimation(value)
	const initialState = getSimpleAnimationInitialState(value, sceneChildProp, Math.min(2000, sequence.duration))
	const bColor = sceneChildProp.type === 'color'
	const [state, setState] = React.useState<Required<ISimpleAnimation>>(initialState)

	function set(key: keyof ISimpleAnimation, value: any) {
		setState({ ...state, [key]: value })
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
				<Range min={0} max={sequence.duration} step={100} value={state.duration} onChange={e => set('duration', e)} />
			</Grid>

			<SimpleAnimationLoop value={state.loop} onChange={loop => set('loop', loop)} />

			<div>
				Delay
				<Range min={0} max={sequence.duration} step={100} value={state.delay} onChange={e => set('delay', e)} />
			</div>
			{state.loop && (
				<div>
					AfterDelay
					<Range
						min={0}
						max={sequence.duration}
						step={100}
						value={state.afterDelay}
						onChange={e => set('afterDelay', e)}
					/>
				</div>
			)}

			<SimpleAnimationDirection value={state.direction} onChange={direction => set('direction', direction)} />
			<SimpleAnimationInterpolator
				value={state.interpolator}
				onChange={interpolator => set('interpolator', interpolator)}
			/>

			{bColor && (
				<div>
					<Radio
						name="Color mode"
						values={[
							{ key: 'rgb', value: 'rgb' },
							{ key: 'hue', value: 'hue' },
						]}
						selected={state.colorTransitionMode}
						onChange={c => set('colorTransitionMode', c)}
					/>
				</div>
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

			{bValueIsAnimation && <Button onClick={handleRemove} label="Remove" />}
		</div>
	)
}

export default React.memo(
	connect((state: RootState) => ({
		sequence: state.project.sequence as ISequenceMeta,
	}))(SimpleAnimationProp)
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
