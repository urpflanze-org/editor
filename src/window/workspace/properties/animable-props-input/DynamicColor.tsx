import React from 'react'
import pups from '@pups/js'
import styled from 'styled-components'

import Icon from '@components/icons/Icon'
import { TSliderMode } from '@hooks/useSlider'
import Tooltip from '@components/Tooltip'

import SimpleAnimationProp from '@window/workspace/properties/simple-animation/SimpleAnimation'
import Modal from '@components/Modal'
import Color from '@components/input/Color'
import ScenePropUtilities from '@genbs/urpflanze/dist/services/scene-utilities/ScenePropUtilities'
import { IProjectSceneChild } from '@genbs/urpflanze/dist/services/types/project'

interface IDynamicColorProp {
	value: any
	name: string
	prop_name: string
	layer: IProjectSceneChild
	bDefaultValue: boolean
	onChange: (new_value: any, preventPushToHistory?: boolean) => void
}

const DynamicColor: React.FunctionComponent<IDynamicColorProp> = ({
	name,
	value,
	layer,
	prop_name,
	bDefaultValue,
	onChange,
}: IDynamicColorProp) => {
	const [bOpenSimpleAnimation, setBOpenSimpleAnimation] = React.useState<boolean>(false)

	const bAnimation = ScenePropUtilities.bValueAnimation(value)

	function handleChange(new_value: any, mode: TSliderMode) {
		onChange(new_value, mode == 'slider')

		bOpenSimpleAnimation && setBOpenSimpleAnimation(false)
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
			<div style={{ lineHeight: 1, marginBottom: pups.ms(-2) }}>{name}</div>
			<div style={{ display: 'flex' }}>
				<ColorContainer>
					<RemoveColor style={{}} onClick={() => onChange(undefined)}>
						<Icon size={0} name="close" />
					</RemoveColor>
					{bAnimation ? (
						<Icon size={pups.add(1, -1)} name="animate-color" />
					) : (
						<Color onChange={onChange} value={value} size={pups.add(1, -1)} />
					)}
				</ColorContainer>

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

const RemoveColor = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	background: ${pups.color('dark')};
	border-radius: 0 2px 0 0;
	line-height: 1;
	z-index: 1;
	transform: scale(0);
	transform-origin: left bottom;
	transition: transform 0.1s 0.5s ease-out;
`

const ColorContainer = styled.div`
	position: relative;

	&:hover ${RemoveColor} {
		transform: scale(1);
	}
`

export default React.memo(DynamicColor)
