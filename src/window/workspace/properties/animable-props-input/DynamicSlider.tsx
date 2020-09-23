import React from 'react'
import pups from '@pups/js'

import Icon from '@components/icons/Icon'
import { TSliderMode } from '@hooks/useSlider'
import Tooltip from '@components/Tooltip'

import SimpleAnimationProp from '@window/workspace/properties/simple-animation/SimpleAnimation'
import Modal from '@components/Modal'
import Slider from '@components/input/Slider'
import ScenePropUtilities from '@genbs/urpflanze/dist/services/scene-utilities/ScenePropUtilities'
import { IProjectSceneChild } from '@genbs/urpflanze/dist/services/types/project'

interface IDynamicSliderProp {
	value: any
	name: string
	prop_name: string
	min: number
	max: number
	step: number
	layer: IProjectSceneChild
	bDefaultValue: boolean
	onChange: (new_value: any, mode?: TSliderMode) => void
}

const DynamicSlider: React.FunctionComponent<IDynamicSliderProp> = ({
	name,
	value,
	layer,
	min,
	max,
	step,
	prop_name,
	bDefaultValue,
	onChange,
}: IDynamicSliderProp) => {
	const [bOpenSimpleAnimation, setBOpenSimpleAnimation] = React.useState<boolean>(false)

	const bAnimation = ScenePropUtilities.bValueAnimation(value)

	function handleChange(new_value: any, mode: TSliderMode) {
		onChange(new_value, mode)

		bOpenSimpleAnimation && setBOpenSimpleAnimation(false)
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
			<div style={{ lineHeight: 1, marginBottom: pups.ms(-2) }}>{name}</div>
			<div
				style={{
					display: 'flex',
					height: pups.add(1, -1),
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				{bAnimation ? (
					<Icon size={pups.add(1, -1)} name="animate-color" />
				) : (
					<Slider min={min} max={max} step={step} onChange={onChange} value={value} />
				)}

				<Tooltip title="Animate prop" position="right">
					<Icon name={bAnimation ? 'animated' : 'not-animated'} onClick={() => setBOpenSimpleAnimation(true)} />
				</Tooltip>
			</div>

			<Modal open={bOpenSimpleAnimation} close={() => setBOpenSimpleAnimation(false)}>
				<SimpleAnimationProp
					close={() => setBOpenSimpleAnimation(false)}
					value={value}
					layer={layer}
					prop_name={prop_name}
					onChange={animation => handleChange(animation, 'none')}
				/>
			</Modal>
		</div>
	)
}

export default React.memo(DynamicSlider)
