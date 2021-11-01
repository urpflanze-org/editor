import * as React from 'react'

import Icon from 'components/icons/Icon'
import pups from '@pups/js'

import { isParentOf } from 'app/workspace/layers/layer_utilities'
import { IProjectSceneChild } from 'urpflanze-ext'

interface SceneTreeProps {
	selectLayer: (layer: IProjectSceneChild) => void
	scene: { [key: string]: IProjectSceneChild }
	selected_id?: string | number
}

const SceneTree: React.FunctionComponent<SceneTreeProps> = ({ scene, selectLayer, selected_id }: SceneTreeProps) => {
	const layers: Array<IProjectSceneChild> = Object.values(scene)

	const layers_length = layers.length

	return (
		<div>
			<Icon name="scene" />
			<ul style={{ padding: `0 0 0 0.3rem`, margin: 0, listStyle: 'none', fontSize: '1rem', lineHeight: '1.1rem' }}>
				{layers.map((layer, index) => (
					<SceneTreeLayer
						key={layer.id}
						selected_id={selected_id}
						position={index === 0 && layers_length > 1 ? '├' : '└'}
						selectLayer={selectLayer}
						layer={layer}
						layers={layers}
						hasNeighbor={layers_length > 1}
						parentHasNeighbor={false}
						depth={0}
					/>
				))}
			</ul>
		</div>
	)
}

const _SceneTreeLayer = ({
	layer,
	depth,
	position,
	hasNeighbor,
	parentHasNeighbor,
	parentPosition,
	selected_id,
	layers,
	selectLayer,
}: {
	layer: IProjectSceneChild
	depth: number
	selected_id?: string | number
	hasNeighbor: boolean
	parentHasNeighbor: boolean
	layers: Array<IProjectSceneChild>
	position: '├' | '└'
	parentPosition?: '├' | '└'
	selectLayer: (layer: IProjectSceneChild) => void
}) => {
	const [open, setOpen] = React.useState<boolean>(selected_id ? isParentOf(layer.id, selected_id, layers) : false)

	React.useEffect(() => {
		const o = selected_id ? isParentOf(layer.id, selected_id, layers) : false
		o && o != open && setOpen(o)
	}, [selected_id])

	const selected = selected_id == layer.id
	const layer_children_length = layer.children ? layer.children.length : 0

	const space = i =>
		i === 0 ||
		(i === depth - 1 &&
			!hasNeighbor &&
			((i === depth - 1 && !hasNeighbor && parentPosition !== '└') || i !== depth - 1))

	return (
		<li>
			{new Array(depth).fill(1).map((v, i) => (
				<span key={i} style={{ color: space(i) ? '' : 'rgba(255,255,255,.1)' }}>
					│{depth > 0 && '\u00A0'}
				</span>
			))}
			{position}─{layer_children_length > 0 && open ? '┐' : '\u00A0'}
			<span style={{ fontSize: '.2rem' }}> </span>
			<span
				style={{ cursor: selected ? '' : 'pointer', color: selected ? pups.color('primary').toString('hex') : '' }}
				onClick={() => selectLayer(layer)}
			>
				{layer.name}
			</span>
			<span style={OpenLayerButton} onClick={() => layer.children && layer.children.length > 0 && setOpen(!open)}>
				{layer.children && layer.children.length > 0 && (
					<Icon name="arrow-right-fill" size={0} rotate={open ? 90 : 0} fill="#fff" />
				)}
			</span>
			{open && layer.children && layer.children.length > 0 && (
				<ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
					{layer.children.map((child, index) => (
						<SceneTreeLayer
							layers={layers}
							selectLayer={selectLayer}
							selected_id={selected_id}
							position={index === 0 && layer_children_length > 1 ? '├' : '└'}
							parentPosition={position}
							layer={child}
							key={child.id}
							hasNeighbor={layer_children_length > 1}
							parentHasNeighbor={parentHasNeighbor}
							depth={depth + 1}
						/>
					))}
				</ul>
			)}
		</li>
	)
}

const SceneTreeLayer = React.memo(_SceneTreeLayer)

const OpenLayerButton = {
	cursor: 'pointer',
	width: pups.add(0, -3),
	paddingLeft: pups.ms(-3),
	height: '100%',
}

export default React.memo(SceneTree)
