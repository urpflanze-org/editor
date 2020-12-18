import { v1 as uuidv1 } from 'uuid'
import {
	ProjectActionTypes,
	IMPORT_PROJECT_STATE,
	CREATE_PROJECT,
	IMPORT_PROJECT,
	CREATE_SCENE,
	HISTORY_CHANGE,
	UPDATE_LAYERS,
	UPDATE_LAYER_PROPS,
	SELECT_LAYERS,
	UPDATE_SEQUENCE,
	UPDATE_SCENE_BACKGROUND,
	UPDATE_SCENE_CLEAR,
	// UPDATE_RESOLUTION,
	UPDATE_PROJECT_PROPERTIES,
	UPDATE_LAYER_UI_PROPS,
} from '@redux-store/project/types'

import { ProjectState } from '&types/state'

import { findLayer, toSceneLayers } from '@window/workspace/layers/layer_utilities'
import app_utilities from 'app_utilities'
import pups from '@pups/js'
import { IProjectSceneChild } from '@genbs/urpflanze/dist/services/types/exporters-importers'

export const initialProjectState: ProjectState = {
	id: uuidv1(),
	name: '',
	background: pups.color('dark').toString('hex'),
	color: pups.color('primary').toString('hex'),
	clear: true,
	scene: {},
	ghosts: 0,
	ghost_skip_time: 30,
	history: [],
	ratio: 1,
	sequence: {
		start: 0,
		end: 6000,
		framerate: 60,
		durate: 6000,
	},
	selected_layers: [],
}

export function projectReducer(state = initialProjectState, action: ProjectActionTypes): ProjectState {
	switch (action.type) {
		case IMPORT_PROJECT_STATE:
			document.title = app_utilities.getDocumentProjectTitle(action.state.name)
			return { ...initialProjectState, ...action.state }

		case CREATE_PROJECT:
			return state

		case UPDATE_PROJECT_PROPERTIES:
			return { ...state, ...action.properties }

		case IMPORT_PROJECT:
			return state

		case CREATE_SCENE:
			return state

		case UPDATE_SCENE_BACKGROUND:
			return { ...state, background: action.color }

		case UPDATE_SCENE_CLEAR:
			return { ...state, clearCanvas: action.clearCanvas }

		// case UPDATE_RESOLUTION:
		//     return { ...state, resolution: action.resolution }

		case HISTORY_CHANGE:
			return { ...state, history: [...action.history] }

		case UPDATE_SEQUENCE:
			return { ...state, sequence: action.sequence }

		case UPDATE_LAYER_PROPS: {
			let updated = false

			for (let i = 0, len = action.props.length; i < len; i++) {
				const layer = findLayer(action.props[i].id, Object.values(state.scene))
				const current_layer_prop = action.props[i]
				if (layer && layer.props[current_layer_prop.name] != current_layer_prop.value) {
					layer.props[current_layer_prop.name] = current_layer_prop.value
					updated = true
				}
			}

			if (updated) return { ...state, scene: { ...state.scene } }

			return state
		}
		case UPDATE_LAYER_UI_PROPS: {
			let update = false
			for (let i = 0, len = action.props.length; i < len; i++) {
				const layer = findLayer(action.props[i].id, Object.values(state.scene))
				const current_layer_prop = action.props[i]
				if (layer && layer.data[current_layer_prop.name] != current_layer_prop.value) {
					//@ts-ignore
					layer.data[current_layer_prop.name] = current_layer_prop.value
					update = true
				}
			}

			if (update) return { ...state, scene: { ...state.scene } }

			return state
		}
		case UPDATE_LAYERS: {
			const sceneLayers = toSceneLayers(action.layers)

			if (action.selecteds) {
				const selected_layers = action.selecteds
				const open_layer_properties =
					selected_layers.length == 0
						? undefined
						: selected_layers.length == 1
						? findLayer(selected_layers[0], Object.values(sceneLayers))
						: state.open_layer_properties
				pushToHistory(open_layer_properties, state.name)

				return { ...state, scene: sceneLayers, selected_layers, open_layer_properties }
			}

			return { ...state, scene: sceneLayers }
		}
		case SELECT_LAYERS: {
			const selected_layers = action.selecteds || []
			const layer =
				action.selecteds.length == 0
					? undefined
					: action.selecteds.length == 1
					? findLayer(action.selecteds[0], Object.values(state.scene))
					: state.open_layer_properties

			const open_layer_properties = layer && layer.data.visible ? layer : undefined

			!action.preventPushToHistory && pushToHistory(open_layer_properties, state.name)

			return { ...state, selected_layers, open_layer_properties }
		}
		default:
			return state
	}
}

function pushToHistory(layer: IProjectSceneChild | undefined, projectName?: string) {
	if (layer)
		history.pushState(null, `${projectName ? projectName + ' | ' : ''} ${layer.name}`, location.origin + '/' + layer.id)
	else history.pushState(null, `${projectName ? projectName : ''}`, location.origin)
}
