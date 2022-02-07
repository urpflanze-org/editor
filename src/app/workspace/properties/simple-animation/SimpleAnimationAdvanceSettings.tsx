import * as React from 'react'

import Radio from 'components/input/Radio'
import Range from 'components/input/Range'

import Select from 'components/input/Select'
import Grid from 'components/Grid'
import pups from '@pups/js'
import { MODE_FUNCTIONS } from 'app/workspace/properties/simple-animation/SimpleAnimationUtilities'
import Checkbox from 'components/input/Checkbox'
import { ISimpleAnimation } from '@urpflanze/animation/dist/cjs'
import { ISequenceMeta } from '@urpflanze/drawer-canvas/dist/cjs'

interface SimpleAnimationAdvanceSettingsProps {
	state: ISimpleAnimation
	bColor: boolean
	onChange: (key: keyof ISimpleAnimation, value: ISimpleAnimation[keyof ISimpleAnimation]) => void
	sequence: ISequenceMeta
}

const SimpleAnimationAdvanceSettings: React.FunctionComponent<SimpleAnimationAdvanceSettingsProps> = ({
	state,
	onChange,
	bColor,
	sequence,
}: SimpleAnimationAdvanceSettingsProps) => {
	// const rows = (state.type === 'loop' && state.mode === 'easing') ? 5 : 4
	const rows = 5

	console.log(state)
	return (
		<Grid
			gap={pups.ms(-2)}
			valign="center"
			style={{ margin: `${pups.ms(0)} 0` }}
			columns={2}
			rows={rows}
			flow={`repeat(${rows}, 1fr) / max-content ${pups.ms(4)}`}
		>
			<div style={{ gridColumn: '1 / span 2' }}>
				<Checkbox
					checked={typeof state.loop !== 'undefined' && state.loop !== false}
					onChange={c => onChange('loop', c)}
				/>
				{/* <Radio
					name="Type"
					align="flex-start"
					values={[
						{ key: 'Loop', value: 'loop' },
						{ key: 'Uncontrolled loop', value: 'uncontroller-loop' },
						{ key: 'Static', value: 'static' },
					]}
					selected={state.type}
					onChange={v => onChange('type', v)}
				/> */}
			</div>

			{/* {state.type !== 'loop' && (
				<React.Fragment>
					<div>Delay</div>
					<Range
						size={2}
						min={0}
						max={sequence.duration}
						step={100}
						value={state.delay || 0}
						onChange={(e, mode) => mode === 'none' && onChange('delay', e)}
					/>
				</React.Fragment>
			)} */}

			{/* {(state.type === 'loop' || state.type === 'uncontroller-loop') && ( */}
			<div style={{ width: pups.ms(5), gridColumn: '1 / span 2' }}>
				<Radio
					name="Mode"
					align="flex-start"
					values={[
						{ key: 'Sinusoidal', value: 'sinusoidal' },
						{ key: 'Easing', value: 'easing' },
					]}
					selected={null}
					onChange={() => null}
					// selected={state.mode}
					// onChange={v => onChange('mode', v)}
				/>
			</div>
			{/* )} */}

			<div>Mode function</div>
			{/* <Select
				onChange={v => onChange('modeFunction', v)}
				placeholder={`${state.mode} function`}
				options={MODE_FUNCTIONS[state.mode || 'cos']}
				value={state.modeFunction}
			/>

			{state.type === 'loop' && state.mode === 'easing' && (
				<small style={{ gridColumn: '1 / span 2' }}>
					the durate of animation will be
					<br />
					divide for two.
				</small>
			)} */}

			<Grid columns={bColor ? 2 : 1}>
				<div>
					{/* <Checkbox checked={state.invertOdd} name="Invert odd" onChange={c => onChange('invertOdd', c)} /> */}
				</div>
				{bColor && (
					<div>
						<Radio
							name="Color mode"
							values={[
								{ key: 'rgb', value: 'rgb' },
								{ key: 'hue', value: 'hue' },
							]}
							selected={state.colorTransitionMode}
							onChange={c => onChange('colorTransitionMode', c)}
						/>
					</div>
				)}
			</Grid>
		</Grid>
	)
}

export default React.memo(SimpleAnimationAdvanceSettings)
