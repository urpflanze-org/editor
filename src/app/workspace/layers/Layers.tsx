import * as React from 'react'
import { connect } from 'react-redux'

import pups from '@pups/js'

import { RootState } from 'types/state'

import { selectLayers } from 'redux-store/project/actions'

import Icon from 'components/icons/Icon'

import { handleSelection, findLayer } from 'app/workspace/layers/layer_utilities'
import LayerActions from 'app/workspace/layers/LayerActions'
import Layer from 'app/workspace/layers/Layer'
import { IProjectSceneChild } from 'urpflanze-ext'

interface ILayerProps {
	layers: { [key: string]: IProjectSceneChild }
	open_layer_id: number | string | undefined
	selectLayers: (selecteds: Array<string | number>, preventPushToHistory?: boolean) => any
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
		console.log('new_selecteds', new_selecteds)
		selectLayers(new_selecteds)
	}

	return (
		<section data-name="layers" className="layers">
			<div className="layers__title">Layers</div>

			<ul className="layers__list">
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
					<li className="layers__list__empty">
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
