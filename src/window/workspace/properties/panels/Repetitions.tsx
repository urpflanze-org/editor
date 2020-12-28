import * as React from 'react'

import executor from '@redux-store/executor'
import { ERepetitionType } from '@genbs/urpflanze/dist/core/types/scene-child'
import Radio from '@components/input/Radio'

import Panel, { ISceneChildPanel } from '@window/workspace/properties/Panel'
import Prop from '@window/workspace/properties/Prop'
import { toArray, toNumber, clampArray } from '@ui-services/utilities/utilies'
import { clamp } from '@genbs/urpflanze/dist/Utilites'
import SceneUtilitiesExtended from '@genbs/urpflanze/dist/services/scene-utilities/SceneUtilitiesExtended'
import { IProjectSceneChild } from '@genbs/urpflanze/dist/services/types/exporters-importers'
import { TTransformable } from '@genbs/urpflanze/dist/services/types/scene-utilities'
import SceneChildUtilitiesData from '@genbs/urpflanze/dist/services/scene-utilities/SceneChildUtilitiesData'

const REPETITION_TYPES = [
	{ key: 'Matrix', value: ERepetitionType.Matrix },
	{ key: 'Ring', value: ERepetitionType.Ring },
	// { key: 'Random', value: ERepetitionType.Random }
]

const MAX_REPETITIONS = SceneChildUtilitiesData.repetitions.max as number
const MAX_DISTANCE = SceneChildUtilitiesData.distance.max as number

function getRepetitionType(layer: IProjectSceneChild): ERepetitionType {
	return Array.isArray(layer.props.repetitions) ? ERepetitionType.Matrix : ERepetitionType.Ring
	// : layer.props.randomSeed ? ERepetitionType.Random : ERepetitionType.Ring
}

const Repetition: React.FunctionComponent<ISceneChildPanel> = (props: ISceneChildPanel) => {
	const layer = props.layer

	let repetitions = layer.props.repetitions || 1
	let distance = layer.props.distance || 0

	const [repetition_type, setRepetitionType] = React.useState<ERepetitionType>(getRepetitionType(layer))
	// const [randomSeed] = React.useState<string>(layer.props.randomSeed || layer.id as string)

	React.useEffect(() => {
		const _repetition_type = getRepetitionType(layer)
		_repetition_type != repetition_type && setRepetitionType(_repetition_type)
	}, [layer])

	function setRepetition(type: ERepetitionType) {
		if (type !== repetition_type) {
			const _repetitions =
				type == ERepetitionType.Matrix // '==' is
					? clampArray(1, Math.round(MAX_REPETITIONS / 5), toArray(repetitions as number | Array<number>))
					: clamp(1, MAX_REPETITIONS, toNumber(repetitions as number | Array<number>))
			// const _randomSeed: string | undefined = type == ERepetitionType.Random ? randomSeed : undefined

			const props: Array<any> = [{ id: layer.id, name: 'repetitions', value: _repetitions, prev_value: repetitions }]

			if (!SceneUtilitiesExtended.bValueAnimation(distance)) {
				const currentDistance = SceneUtilitiesExtended.bValueTransformable(distance)
					? (distance as TTransformable).value
					: distance
				const _distance =
					type == ERepetitionType.Matrix
						? clampArray(-MAX_DISTANCE, MAX_DISTANCE, toArray(currentDistance as number | Array<number>))
						: clamp(-MAX_DISTANCE, MAX_DISTANCE, toNumber(currentDistance as number | Array<number>))

				props.push({
					id: layer.id,
					name: 'distance',
					value: { type: 'transformable-prop', value: _distance },
					prev_value: distance,
				})
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
		if (repetition_type == ERepetitionType.Matrix) {
			const _repetitions = toArray(repetitions as number | Array<number>)
			const new_distance = [
				_repetitions[0] <= 1 ? 0 : 100 / _repetitions[0],
				_repetitions[1] <= 1 ? 0 : 100 / _repetitions[1],
			]

			executor.run('set-prop', {
				id: layer.id,
				name: 'distance',
				value: { type: 'transformable-prop', value: new_distance },
				prev_value: distance,
			})
		} else {
			const _repetitions = toNumber(repetitions as number | Array<number>)

			if (_repetitions == 1) {
				executor.run('set-prop', { id: layer.id, name: 'distance', value: 0, prev_value: distance })
			} else {
				const result = await executor.ask('single-bounding', { id: layer.id })
				const new_distance = _repetitions <= 1 ? 0 : (result.width * 50) / (Math.PI / (_repetitions + 1))

				executor.run('set-prop', {
					id: layer.id,
					name: 'distance',
					value: { type: 'transformable-prop', value: clamp(-100, 100, new_distance) },
					prev_value: distance,
				})
			}
		}
	}

	return (
		<Panel name="Repetition" icon="repetitions" expandable={true} expanded={true}>
			{!SceneUtilitiesExtended.bValueAnimation(repetitions) && (
				<Radio selected={repetition_type} values={REPETITION_TYPES} name="Type" onChange={setRepetition} />
			)}

			<Prop
				layer={layer}
				name="repetitions"
				onChange={v => (repetitions = v)}
				forceArray={repetition_type == ERepetitionType.Matrix}
			/>
			<Prop layer={layer} name="distance" onChange={v => (distance = v)} />
			{repetition_type == ERepetitionType.Ring && <Prop layer={layer} name="displace" />}

			{/* { repetition_type == ERepetitionType.Random ? (
                <small style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => regenerateRandomSeed()}>randomSeed</small>
            ) : (
                <small style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => distribute()}>distribute</small>
            )} */}

			{!SceneUtilitiesExtended.bValueAnimation(repetitions) && (
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
