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
import ScenePropUtilities from '@genbs/urpflanze/dist/services/scene-utilities/ScenePropUtilities'
import { IProjectSceneChild } from '@genbs/urpflanze/dist/services/types/project'
import { TAnimation } from '@genbs/urpflanze/dist/services/types/animation'

interface IDynamicRangeProp {
	type: 'range' | 'multiple-range'
	value: any
	name: string
	prop_name: string
	bDefaultValue: boolean
	min: number
	canBArray: boolean
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
	onChange,
	bDefaultValue,
}: IDynamicRangeProp) => {
	const [bOpenSimpleAnimation, setBOpenSimpleAnimation] = React.useState<boolean>(false)
	const [locked, setLocked] = React.useState<boolean>(Array.isArray(value) && value[0] === value[1])

	const bAnimation = ScenePropUtilities.bValueAnimation(value)

	const can_lock_unlock = true
	const multiple = type == 'multiple-range'
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
		<Grid columns={3} flow="1fr 1fr max-content" gap={pups.ms(0)} style={{ userSelect: 'none' }}>
			<div
				onClick={() => !bAnimation && can_lock_unlock && multiple && _setLocked()}
				style={{
					textAlign: 'right',
					cursor: can_lock_unlock && multiple ? 'pointer' : undefined,
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis',
					overflow: 'hidden',
				}}
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
				<div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
					{(value as TAnimation).type == 'simple' ? (
						<small>
							<i>
								{value.value.from.toString()} → {value.value.to.toString()} in{' '}
								{Math.round(value.value.durate / 100) / 10}s
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

			<div style={{ width: pups.ms(1) }}>
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
