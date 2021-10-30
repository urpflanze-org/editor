import React from 'react'
import pups from '@pups/js'

import Icon from '@components/icons/Icon'
import { TSliderMode } from '@hooks/useSlider'
import Tooltip from '@components/Tooltip'

import SimpleAnimationProp from '@window/workspace/properties/simple-animation/SimpleAnimation'
import Modal from '@components/Modal'
import Color from '@components/input/Color'
import SceneUtilitiesExtended from 'urpflanze/dist/services/scene-utilities/SceneUtilitiesExtended'
import { IProjectSceneChild } from 'urpflanze/dist/services/types/exporters-importers'

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

	const bAnimation = SceneUtilitiesExtended.bValueAnimation(value)

	function handleChange(new_value: any, mode: TSliderMode) {
		onChange(new_value, mode == 'slider')

		bOpenSimpleAnimation && setBOpenSimpleAnimation(false)
	}

	return (
		<div className={`dynamic-color ${bDefaultValue ? 'dynamic-color--default' : ''}`}>
			<div className="dynamic-color__name">{name}</div>
			<div className="dynamic-color__wrapper">
				<div className="dynamic-color__wrapper__content">
					<div className="dynamic-color__wrapper__content__remove" style={{}} onClick={() => onChange(undefined)}>
						<Icon size={0} name="close" />
					</div>
					{bAnimation ? <Icon size={1} name="animate-color" /> : <Color onChange={onChange} value={value} size={1} />}
				</div>

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

export default React.memo(DynamicColor)
