import React from 'react'
import { connect } from 'react-redux'
import executor from '@redux-store/executor'

import { getProperty } from '@pups/utility/build/Object'

import { RootState } from '&types/state'

import { toNumber, toArray } from '@ui-services/utilities/utilies'

import useClippableProperty from '@hooks/useClippableProperty'

import Radio from '@components/input/Radio'
import Checkbox from '@components/input/Checkbox'
import Select from '@components/input/Select'

import DynamicColor from '@window/workspace/properties/animable-props-input/DynamicColor'
import DynamicRange from '@window/workspace/properties/animable-props-input/DynamicRange'
import DynamicSlider from '@window/workspace/properties/animable-props-input/DynamicSlider'
import { ISceneChildPropData } from '@genbs/urpflanze/dist/services/scene-utilities/SceneChildPropsData'
import SceneChildPropsData from '@ui-services/utilities/SceneChildPropsData'
import ScenePropUtilities from '@genbs/urpflanze/dist/services/scene-utilities/ScenePropUtilities'

import { TAnimation } from '@genbs/urpflanze/dist/services/types/animation'
import { TDrawerValue } from '@genbs/urpflanze/dist/services/types/drawer'
import { IProjectSceneChild, IProjectSceneChildProps } from '@genbs/urpflanze/dist/services/types/exporters-importers'
import { TSceneChildProp } from '@genbs/urpflanze/dist/core/types/scene-child'

function copy(v: any): any {
	return Array.isArray(v) ? v.slice() : v
}

interface IProp {
	name: keyof IProjectSceneChildProps
	layer: IProjectSceneChild
	value: TSceneChildProp<any>
	forceArray?: boolean
	onChange?: (new_value: any, prev_value: any) => any
}

function isEqual(a: any, b: any): boolean {
	if (typeof a !== typeof b) return false

	if (Array.isArray(a) && Array.isArray(b)) return a[0] === b[0] && a[1] === b[1]

	return a === b
}

const Prop: React.FunctionComponent<IProp> = ({ name, layer, value, onChange, forceArray }: IProp) => {
	if (ScenePropUtilities.bValueDrawer(value)) {
		value = value.value
	}

	const propContainerRef = React.useRef<HTMLDivElement>(null)
	const sceneChildProp = SceneChildPropsData[name] as ISceneChildPropData
	let initValue = value ?? sceneChildProp.default
	// const bAngle = sceneChildProp.bAngle || false
	const bDefaultValue = typeof value === 'undefined' || isEqual(value, sceneChildProp.default)

	let input_type = sceneChildProp.canBArray
		? Array.isArray(initValue)
			? 'multiple-range'
			: 'range'
		: sceneChildProp.type

	if (layer.type === 'Line' && name == 'sideLength' && Array.isArray(initValue)) {
		initValue = toNumber(initValue)
		input_type = 'range'
	}

	function handleChange(
		new_value: TAnimation | TDrawerValue | string | number | [number, number] | boolean,
		preventPushToHistory?: boolean
	) {
		if (new_value != initValue) {
			if (!ScenePropUtilities.bValueAnimation(new_value)) {
				new_value = forceArray ? toArray(new_value as number) : new_value

				if (ScenePropUtilities.bPropTransformable(name, value)) {
					new_value = { type: 'drawer-transformation', value: new_value }
				}
			}

			executor.run(
				'set-prop',
				{
					id: layer.id,
					name: name,
					value: new_value,
					prev_value: initValue,
				},
				preventPushToHistory
			)

			onChange && onChange(new_value, initValue)
		}
	}

	useClippableProperty(propContainerRef, sceneChildProp, initValue, handleChange)

	let Component: JSX.Element | null = null

	switch (input_type) {
		case 'multiple-range':
		case 'range':
			Component = (
				<DynamicRange
					// value={typeof initValue == 'number' || Array.isArray(initValue) ? copy(bAngle ? toDegrees(initValue as number) : initValue) : initValue}
					value={typeof initValue == 'number' || Array.isArray(initValue) ? copy(initValue) : initValue}
					bDefaultValue={bDefaultValue}
					canBArray={sceneChildProp.canBArray || false}
					min={sceneChildProp.min as number}
					max={(name == 'repetitions' ? (input_type == 'multiple-range' ? 20 : 100) : sceneChildProp.max) as number}
					step={sceneChildProp.step as number}
					type={input_type}
					name={sceneChildProp.label}
					prop_name={sceneChildProp.name}
					layer={layer}
					onChange={handleChange}
					animable={sceneChildProp.animable}
				/>
			)
			break
		case 'radio':
			Component = (
				<Radio
					onChange={handleChange}
					name={sceneChildProp.label}
					selected={initValue}
					values={sceneChildProp.options as Array<{ key: string; value: any }>}
				/>
			)
			break
		case 'checkbox':
			Component = <Checkbox checked={initValue as boolean} onChange={handleChange} name={sceneChildProp.label} />
			break
		case 'select':
			Component = (
				<Select
					options={sceneChildProp.options as Array<{ key: string; value: any }>}
					value={initValue}
					placeholder={sceneChildProp.label}
					onChange={handleChange}
				/>
			)
			break
		case 'color':
			Component = (
				<DynamicColor
					layer={layer}
					prop_name={name}
					value={initValue}
					name={sceneChildProp.label}
					onChange={handleChange}
					bDefaultValue={typeof value === 'undefined'}
				/>
			)
			break
		case 'slider':
			Component = (
				<DynamicSlider
					layer={layer}
					name={sceneChildProp.label}
					prop_name={name}
					value={initValue}
					min={sceneChildProp.min as number}
					max={sceneChildProp.max as number}
					step={sceneChildProp.step as number}
					onChange={(value, mode) => handleChange(value, mode == 'slider')}
					bDefaultValue={typeof value === 'undefined'}
				/>
			)
			break
	}

	return <div ref={propContainerRef}>{Component}</div>
}

export default React.memo(
	connect((state: RootState, props: IProp) => {
		return {
			value: props.layer ? getProperty(props.layer.props, props.name) : undefined,
		}
	})(Prop)
)
