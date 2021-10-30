import React from 'react'

import Range from '@components/input/Range'
import MultipleRange from '@components/input/MultipleRange'

import Icon from '@components/icons/Icon'
import Grid from '@components/Grid'
import pups from '@pups/js'
import { TSliderMode } from '@hooks/useSlider'
import Tooltip from '@components/Tooltip'

import SimpleAnimationProp from '@window/workspace/properties/simple-animation/SimpleAnimation'
import Modal from '@components/Modal'
import SceneUtilitiesExtended from 'urpflanze/dist/services/scene-utilities/SceneUtilitiesExtended'
import { IProjectSceneChild } from 'urpflanze/dist/services/types/exporters-importers'
import { TAnimation } from 'urpflanze/dist/services/types/animation'

interface IDynamicRangeProp {
	type: 'range' | 'multiple-range'
	value: any
	name: string
	prop_name: string
	bDefaultValue: boolean
	min: number
	canBArray: boolean
	initialArray: boolean
	animable?: boolean
	max: number
	step: number
	layer: IProjectSceneChild
	onChange: (new_value: any, preventPushToHistory?: boolean) => void
}

const DynamicRange: React.FunctionComponent<IDynamicRangeProp> = ({
	name,
	prop_name,
	value,
	min,
	max,
	step,
	type,
	animable,
	layer,
	initialArray,
	onChange,
	bDefaultValue,
}: IDynamicRangeProp) => {
	const [bOpenSimpleAnimation, setBOpenSimpleAnimation] = React.useState<boolean>(false)
	const [locked, setLocked] = React.useState<boolean>(!initialArray && Array.isArray(value) && value[0] === value[1])

	const bAnimation = SceneUtilitiesExtended.bValueAnimation(value)

	const can_lock_unlock = true
	const multiple = type === 'multiple-range' || Array.isArray(value)
	const Input = multiple ? MultipleRange : Range

	// React.useEffect(() => {
	//     const isEqual = Array.isArray(value) ? value[0] === value[1] : true
	//     setLocked(isEqual)
	// }, [value])

	function _setLocked() {
		setLocked(!locked)
		// if (locked)
		//     setLocked(false)
		// else if ((Array.isArray(value) && value[0] === value[1]) || typeof value === 'number')
		//     setLocked(true)
	}

	function handleChange(new_value: any, mode: TSliderMode) {
		onChange(new_value, mode == 'slider')
		bOpenSimpleAnimation && setBOpenSimpleAnimation(false)
	}

	return (
		<Grid className="dynamic-range" valign="center" columns={3} flow="1fr 1fr max-content" gap={pups.ms(0)}>
			<div
				onClick={() => !bAnimation && can_lock_unlock && multiple && _setLocked()}
				className="dynamic-range__wrapper"
			>
				{!bAnimation && can_lock_unlock && multiple && (
					<Icon
						size={0}
						style={{ marginRight: pups.ms(-2) }}
						name={locked ? 'unlock-value' : 'lock-value'}
						onClick={() => null}
					/>
				)}
				{name}
			</div>

			{bAnimation ? (
				<div className="dynamic-range__animation-value">
					{(value as TAnimation).type === 'simple' ? (
						<small>
							<i>
								{SceneUtilitiesExtended.bValueTransformable(value.value.from)
									? value.value.from.value
									: value.value.from}{' '}
								→{SceneUtilitiesExtended.bValueTransformable(value.value.to) ? value.value.to.value : value.value.to} in{' '}
								{Math.round(value.value.duration / 100) / 10}s
							</i>
						</small>
					) : (
						<span>
							<i>raw function</i>
						</span>
					)}
				</div>
			) : (
				<Input
					bDefaultValue={bDefaultValue}
					locked={locked}
					value={value}
					min={min}
					max={max}
					step={step}
					onChange={handleChange}
				/>
			)}

			<div className="dynamic-range__animate-btn">
				{animable && (
					<Tooltip title="Animate prop" position="left">
						<Icon name={bAnimation ? 'animated' : 'not-animated'} onClick={() => setBOpenSimpleAnimation(true)} />
					</Tooltip>
				)}
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
		</Grid>
	)
}

export default React.memo(DynamicRange)
