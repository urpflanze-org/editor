import * as React from 'react'
import pups from '@pups/js'

import { ISceneChildUtiltiesData } from 'urpflanze/dist/services/scene-utilities/SceneChildUtilitiesData'

import Color from '@components/input/Color'
import Range from '@components/input/Range'
import Slider from '@components/input/Slider'
import MultipleRange from '@components/input/MultipleRange'
import Icon from '@components/icons/Icon'
import { ISimpleAnimation } from 'urpflanze/dist/services/types/animation'
import { TTransformable } from 'urpflanze/dist/services/types/scene-utilities'
import SceneUtilitiesExtended from 'urpflanze/dist/services/scene-utilities/SceneUtilitiesExtended'

interface ISimpleAnimationInputProp {
	value: TTransformable | string | number | Array<number>
	name: keyof ISimpleAnimation
	onChange: (key: keyof ISimpleAnimation, value: ISimpleAnimation[keyof ISimpleAnimation]) => void
	sceneChildProp: ISceneChildUtiltiesData
}

const SimpleAnimationInput: React.FunctionComponent<ISimpleAnimationInputProp> = ({
	value,
	name,
	onChange,
	sceneChildProp,
}: ISimpleAnimationInputProp) => {
	switch (sceneChildProp.type) {
		case 'color':
			return (
				<Color
					size={pups.add(1, -1)}
					value={value as string}
					onChange={(value, p) => p === false && onChange(name, value)}
				/>
			)
		case 'range':
			return (
				<Range
					value={
						(SceneUtilitiesExtended.bValueTransformable(value) ? (value as TTransformable).value : value) as number
					}
					onChange={(value, p) => p === 'none' && onChange(name, value)}
					min={sceneChildProp.min as number}
					max={sceneChildProp.max as number}
					step={sceneChildProp.step as number}
				/>
			)
		case 'multiple-range': {
			const [locked, setLocked] = React.useState(Array.isArray(value) ? value[0] === value[1] : true)

			return (
				<div style={{ display: 'flex', gap: pups.ms(-2), alignItems: 'center', height: '100%' }}>
					<Icon
						size={0}
						style={{ marginRight: pups.ms(-2) }}
						name={locked ? 'unlock-value' : 'lock-value'}
						onClick={() => setLocked(!locked)}
					/>
					<MultipleRange
						locked={locked}
						value={
							(SceneUtilitiesExtended.bValueTransformable(value)
								? (value as TTransformable).value
								: value) as Array<number>
						}
						onChange={(value, p) => p === 'none' && onChange(name, value)}
						min={sceneChildProp.min as number}
						max={sceneChildProp.max as number}
						step={sceneChildProp.step as number}
					/>
				</div>
			)
		}
		case 'slider':
			return (
				<Slider
					value={value as number}
					onChange={(value, p) => p === 'none' && onChange(name, value)}
					min={sceneChildProp.min as number}
					max={sceneChildProp.max as number}
					step={sceneChildProp.step as number}
				/>
			)
	}

	return null
}

export default React.memo(SimpleAnimationInput)
