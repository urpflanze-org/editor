import * as React from 'react'

import executor from '@redux-store/executor'
import { RepetitionType } from '@genbs/urpflanze/dist/core/types/ShapeBase'

import Radio from '@components/input/Radio'

import Panel, { ISceneChildPanel } from '@window/workspace/properties/Panel'
import Prop from '@window/workspace/properties/Prop'
import { toArray, toNumber, clampArray } from '@ui-services/utilities/utilies'
import { clamp } from '@genbs/urpflanze/dist/core/Utilites'
import ScenePropUtilities from '@genbs/urpflanze/dist/services/scene-utilities/ScenePropUtilities'
import { IProjectSceneChild } from '@genbs/urpflanze/dist/services/types/project'

const REPETITION_TYPES = [
	{ key: 'Matrix', value: RepetitionType.Matrix },
	{ key: 'Ring', value: RepetitionType.Ring },
	// { key: 'Random', value: RepetitionType.Random }
]

function getRepetitionType(layer: IProjectSceneChild): RepetitionType {
	return Array.isArray(layer.props.repetitions) ? RepetitionType.Matrix : RepetitionType.Ring
	// : layer.props.randomSeed ? RepetitionType.Random : RepetitionType.Ring
}

const Repetition: React.FunctionComponent<ISceneChildPanel> = (props: ISceneChildPanel) => {
	const layer = props.layer

	let repetitions = layer.props.repetitions || 1
	let distance = layer.props.distance || 0

	const [repetition_type, setRepetitionType] = React.useState<RepetitionType>(getRepetitionType(layer))
	// const [randomSeed] = React.useState<string>(layer.props.randomSeed || layer.id as string)

	React.useEffect(() => {
		const _repetition_type = getRepetitionType(layer)
		_repetition_type != repetition_type && setRepetitionType(_repetition_type)
	}, [layer])

	function setRepetition(type: RepetitionType) {
		if (type != repetition_type) {
			const _repetitions =
				type == RepetitionType.Matrix
					? clampArray(1, 20, repetitions as number | Array<number>)
					: clamp(1, 100, toNumber(repetitions as number | Array<number>))
			// const _randomSeed: string | undefined = type == RepetitionType.Random ? randomSeed : undefined

			const props = [{ id: layer.id, name: 'repetitions', value: _repetitions, prev_value: repetitions }]

			if (!ScenePropUtilities.bValueAnimation(distance)) {
				const _distance =
					type == RepetitionType.Matrix
						? clampArray(-100, 100, distance as number | Array<number>)
						: clamp(-100, 100, toNumber(distance as number | Array<number>))
				props.push({ id: layer.id, name: 'distance', value: _distance, prev_value: distance })
			}

			executor.run('set-prop', props)
			// { id: layer.id, name: 'randomSeed', value: _randomSeed, prev_value: randomSeed },

			setRepetitionType(type)
		}
	}

	// async function regenerateRandomSeed()
	// {
	//     const seed = Math.random().toString(36).substring(7)
	//     executor.run('set-prop', { id: layer.id, name: 'randomSeed', value: seed, prev_value: randomSeed })
	// }

	async function distribute() {
		if (repetition_type == RepetitionType.Matrix) {
			const _repetitions = toArray(repetitions as number | Array<number>)
			const new_distance = [
				_repetitions[0] <= 1 ? 0 : 200 / _repetitions[0],
				_repetitions[1] <= 1 ? 0 : 200 / _repetitions[1],
			]

			executor.run('set-prop', {
				id: layer.id,
				name: 'distance',
				value: new_distance,
				prev_value: distance,
			})
		} else {
			const _repetitions = toNumber(repetitions as number | Array<number>)

			if (_repetitions == 1) {
				executor.run('set-prop', { id: layer.id, name: 'distance', value: 0, prev_value: distance })
			} else {
				const result = await executor.ask('single-bounding', { id: layer.id })
				const new_distance = _repetitions <= 1 ? 0 : (result.width * 100) / (Math.PI / (_repetitions + 1))

				executor.run('set-prop', {
					id: layer.id,
					name: 'distance',
					value: clamp(-100, 100, new_distance),
					prev_value: distance,
				})
			}
		}
	}

	return (
		<Panel name="Repetition" icon="repetitions" expandable={true} expanded={true}>
			{!ScenePropUtilities.bValueAnimation(repetitions) && (
				<Radio selected={repetition_type} values={REPETITION_TYPES} name="Type" onChange={setRepetition} />
			)}

			<Prop
				layer={layer}
				name="repetitions"
				onChange={v => (repetitions = v)}
				forceArray={repetition_type == RepetitionType.Matrix}
			/>
			<Prop layer={layer} name="distance" onChange={v => (distance = v)} />
			{repetition_type == RepetitionType.Ring && <Prop layer={layer} name="displace" />}

			{/* { repetition_type == RepetitionType.Random ? (
                <small style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => regenerateRandomSeed()}>randomSeed</small>
            ) : (
                <small style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => distribute()}>distribute</small>
            )} */}

			{!ScenePropUtilities.bValueAnimation(repetitions) && (
				<small style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => distribute()}>
					Distribute
				</small>
			)}

			{layer.depth > 0 && (
				<div style={{ textAlign: 'right', cursor: 'pointer' }}>
					<div style={{ display: 'inline-block' }}>
						<Prop layer={layer} name="bUseParent" />
					</div>
				</div>
			)}
		</Panel>
	)
}

export default React.memo(Repetition)
