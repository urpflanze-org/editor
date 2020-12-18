import * as React from 'react'
import { connect } from 'react-redux'

import pups from '@pups/js'

import { RootState } from '&types/state'

import { selectLayers } from '@redux-store/project/actions'

import Icon from '@components/icons/Icon'

import { handleSelection, findLayer } from '@window/workspace/layers/layer_utilities'
import LayerActions from '@window/workspace/layers/LayerActions'
import Layer from '@window/workspace/layers/Layer'
import { IProjectSceneChild } from '@genbs/urpflanze/dist/services/types/exporters-importers'

interface ILayerProps {
	layers: { [key: string]: IProjectSceneChild }
	open_layer_id: number | string | undefined
	selectLayers: (selecteds?: Array<string | number>, preventPushToHistory?: boolean) => any
	selecteds: Array<string | number>
}

const Layers: React.FunctionComponent<ILayerProps> = ({
	layers,
	open_layer_id,
	selectLayers,
	selecteds,
}: ILayerProps) => {
	const layers_array: Array<IProjectSceneChild> = Object.values(layers)

	React.useEffect(() => {
		function handleHistoryChange() {
			const path = window.location.pathname

			if (path.length > 0 && path != '/') {
				const id = path.substr(1)
				if (open_layer_id != id) {
					const sceneChild = findLayer(id, Object.values(layers))
					sceneChild && selectLayers([id], true)
				}
			} else selectLayers([], true)
		}

		window.addEventListener('popstate', handleHistoryChange, { passive: true })

		return () => {
			window.removeEventListener('popstate', handleHistoryChange)
		}
	}, [layers, open_layer_id])

	function toggleSelection(event: React.MouseEvent, id: string | number) {
		const new_selecteds: Array<string | number> = handleSelection(event, id, selecteds, layers_array)
		selectLayers(new_selecteds)
	}

	return (
		<section data-name="layers" style={{ height: '100%' }}>
			<div style={HeadStyle}>Layers</div>

			<ul style={ListStyle}>
				{layers_array.length > 0 ? (
					layers_array.map(layer => (
						<Layer
							key={layer.id}
							layers={layers_array}
							toggleSelection={toggleSelection}
							selecteds={selecteds}
							layer={layer}
							deep={0}
						/>
					))
				) : (
					<li
						style={{
							color: pups.color('gray-dark').toString('hex'),
							padding: `0 ${pups.ms(0)}`,
							lineHeight: pups.ms(2),
							borderTop: '1px solid rgba(0,0,0,0)',
						}}
					>
						<small>
							<i>
								Add new shape from Toolbar or <Icon fill={pups.color('gray-dark').toString('hex')} name="add" />
							</i>
						</small>
					</li>
				)}
			</ul>

			<LayerActions selecteds={selecteds} layers={layers} />
		</section>
	)
}

const HeadStyle: React.CSSProperties = {
	padding: `0 ${pups.ms(0)}`,
	height: pups.ms(2) as string,
	lineHeight: pups.ms(2) as string,
	fonstSize: pups.sub(0, -3) as string,
	fontWeight: 'bold',
	color: pups.color('gray-dark').toString('hex'),
	borderRadius: `2px 2px 0 0`,
	background: pups.color('dark').toString('hex'),
	border: `1px solid ${pups.color('dark-lighten')}`,
	borderBottom: `0px`,
}

const ListStyle: React.CSSProperties = {
	maxHeight: `calc(100vh - ${pups.add(
		2 /* appbar */,
		1 /* statusbar */,
		2 /* layers head */,
		2,
		2 /* layer actions */
	)})`,
	listStyle: 'none',
	margin: 0,
	padding: 0,
	overflowY: 'auto',
	overflowX: 'hidden',
	border: `1px solid ${pups.color('dark-lighten')}`,
	borderWidth: '0 1px',
}

export default React.memo(
	connect(
		(state: RootState) => ({
			layers: state.project.scene,
			selecteds: state.project.selected_layers,
			open_layer_id: state.project.open_layer_properties?.id,
		}),
		dispatch => ({
			selectLayers: (selecteds: Array<string | number>, preventPushToHistory = false) =>
				dispatch(selectLayers(selecteds, preventPushToHistory)),
		})
	)(Layers)
)
