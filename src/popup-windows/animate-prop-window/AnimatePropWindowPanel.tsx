import * as React from 'react'
import { IProjectSceneChild } from 'urpflanze/dist/services/types/exporters-importers'

import pups from '@pups/js'

import SceneTree from '@popup-windows/animate-prop-window/SceneTree'
import Select from '@components/input/Select'
import SceneChildPropsData from '@ui-services/utilities/SceneChildUtilitiesData'

interface AnimatePropWindowPanelProp {
	scene: { [key: string]: IProjectSceneChild }
	prop_name: string | undefined
	layer: IProjectSceneChild | undefined
	selectLayer: (layer: IProjectSceneChild) => void
	selectPropName: (prop_name: string) => void
}

const AnimatePropWindowPanel: React.FunctionComponent<AnimatePropWindowPanelProp> = (
	props: AnimatePropWindowPanelProp
) => {
	return (
		<React.Fragment>
			<div style={Panel}>
				<div style={Name}>{props.layer ? props.layer.name : 'select layer'}</div>
				<div>
					<Select
						options={Object.keys(SceneChildPropsData).map(e => ({ key: e, value: e }))}
						placeholder="Select property"
						value={props.prop_name}
						onChange={props.selectPropName}
						width={pups.add(5, 2) as string}
					/>
				</div>
			</div>
			<div style={SceneTreeContainer}>
				<SceneTree
					selectLayer={props.selectLayer}
					selected_id={props.layer ? props.layer.id : undefined}
					scene={props.scene}
				/>
			</div>
		</React.Fragment>
	)
}

const Panel: React.CSSProperties = {
	position: 'absolute',
	top: 0,
	right: 0,
	display: 'flex',
	alignItems: 'flex-end',
	flexDirection: 'column',
	gap: pups.ms(0),
	padding: pups.ms(1),
}

const Name: React.CSSProperties = {
	fontSize: pups.ms(1),
}

const SceneTreeContainer: React.CSSProperties = {
	position: 'absolute',
	bottom: pups.ms(1),
	right: pups.ms(1),
	padding: pups.ms(1),
	fontSize: pups.ms(1),
	background: pups.color('dark-lighten').toString('hex'),
}

export default AnimatePropWindowPanel
