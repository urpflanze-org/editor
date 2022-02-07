import * as React from 'react'
import pups from '@pups/js'

import Color from 'components/input/Color'
import Range from 'components/input/Range'
import Slider from 'components/input/Slider'
import MultipleRange from 'components/input/MultipleRange'
import Icon from 'components/icons/Icon'
import { TTransformable, ISceneChildUtiltiesData } from 'urpflanze-ext'
import { ISimpleAnimation } from '@urpflanze/animation/dist/cjs/types'
import { bValueTransformable } from 'urpflanze-ext'

interface ISimpleAnimationInputProp {
	value: ISimpleAnimation['from']
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
			return <Color size={1} value={value as string} onChange={(value, p) => p === false && onChange(name, value)} />
		case 'range':
			return (
				<Range
					value={value as number}
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
						value={value as number[]}
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
