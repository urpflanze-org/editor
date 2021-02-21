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
import SceneChildUtilitiesData, {
	ISceneChildUtiltiesData,
} from 'urpflanze/dist/services/scene-utilities/SceneChildUtilitiesData'
import SceneChildPropsData from '@ui-services/utilities/SceneChildUtilitiesData'
import SceneUtilitiesExtends from 'urpflanze/dist/services/scene-utilities/SceneUtilitiesExtended'

import { IProjectSceneChild } from 'urpflanze/dist/services/types/exporters-importers'
import { TSceneChildProp } from 'urpflanze/dist/core/types/scene-child'

function valueToComponent(value: any): any {
	if (SceneUtilitiesExtends.bValueTransformable(value)) {
		value = value.value
	}
	return Array.isArray(value) ? value.slice() : value
}

interface IProp {
	name: keyof typeof SceneChildUtilitiesData
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
	const propContainerRef = React.useRef<HTMLDivElement>(null)
	const sceneChildProp = SceneChildPropsData[name] as ISceneChildUtiltiesData
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

	function handleChange(new_value: any, preventPushToHistory?: boolean) {
		if (new_value !== initValue) {
			// Convert value from a array to single value.
			// Is util for sideLength on not 1:1 ratio
			if (sceneChildProp.canBArray && Array.isArray(new_value) && new_value[0] == new_value[1]) {
				new_value = new_value[0]
			}

			// Convert value to transformable-prop (responsivity)

			if (SceneUtilitiesExtends.bPropInSceneChildUtilitiesData(name)) {
				if (!SceneUtilitiesExtends.bValueTransformable(new_value)) {
					if (SceneUtilitiesExtends.bValueAnimation(new_value)) {
						if (!SceneUtilitiesExtends.bValueTransformable(new_value.value.from)) {
							new_value.value.from = { type: 'transformable-prop', value: new_value.value.from }
						}
						if (!SceneUtilitiesExtends.bValueTransformable(new_value.value.to)) {
							new_value.value.to = { type: 'transformable-prop', value: new_value.value.to }
						}
					} else {
						new_value = forceArray ? toArray(new_value as number) : new_value
						new_value = { type: 'transformable-prop', value: new_value }
					}
				}
			} else {
				new_value = forceArray ? toArray(new_value as number) : new_value
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
					// value={typeof initValue == 'number' || Array.isArray(initValue) ? valueToComponent(bAngle ? toDegrees(initValue as number) : initValue) : initValue}
					// value={typeof initValue === 'number' || Array.isArray(initValue) ? valueToComponent(initValue) : initValue}
					value={valueToComponent(initValue)}
					bDefaultValue={bDefaultValue}
					canBArray={sceneChildProp.canBArray || false}
					initialArray={sceneChildProp.initialArray || false}
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
					selected={valueToComponent(initValue)}
					values={sceneChildProp.options as Array<{ key: string; value: any }>}
				/>
			)
			break
		case 'checkbox':
			Component = (
				<Checkbox
					checked={valueToComponent(initValue) as boolean}
					onChange={handleChange}
					name={sceneChildProp.label}
				/>
			)
			break
		case 'select':
			Component = (
				<Select
					options={sceneChildProp.options as Array<{ key: string; value: any }>}
					value={valueToComponent(initValue)}
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
					value={valueToComponent(initValue)}
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
					value={valueToComponent(initValue)}
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
		let value = props.value

		switch (SceneChildUtilitiesData[props.name].dataType) {
			case 'props': {
				value = getProperty(props.layer.props, props.name)
				break
			}
			case 'drawer': {
				value = getProperty(props.layer.style, props.name)
				break
			}
			case 'settings': {
				value = getProperty(props.layer, props.name)
				break
			}
		}

		return { value }
	})(Prop)
)
