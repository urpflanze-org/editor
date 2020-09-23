import {
	ProjectActionTypes,
	CREATE_PROJECT,
	IMPORT_PROJECT,
	UPDATE_SCENE,
	UPDATE_SCENE_BACKGROUND,
	UPDATE_SCENE_CLEAR,
	// UPDATE_RESOLUTION,
	HISTORY_CHANGE,
	UPDATE_LAYERS,
	UPDATE_LAYER_PROPS,
	UPDATE_LAYER_UI_PROPS,
	SELECT_LAYERS,
	UPDATE_SEQUENCE,
	OPEN_LAYER_PROPERTIES,
	IMPORT_PROJECT_STATE,
	UPDATE_PROJECT_PROPERTIES,
} from '@redux-store/project/types'
import { ShapeBaseProps } from '@genbs/urpflanze/dist/core/interfaces/shapes/Interfaces'

import { ICommand } from '&types/command'
import { ProjectState } from '&types/state'
import { SequenceMeta } from '@genbs/urpflanze/dist/services/types/timeline'
import { IProjectSceneChild, IProjectSceneChildData } from '@genbs/urpflanze/dist/services/types/project'

export function importProjectState(state: ProjectState): ProjectActionTypes {
	return {
		type: IMPORT_PROJECT_STATE,
		state,
	}
}

export function createProject(name: string): ProjectActionTypes {
	return {
		type: CREATE_PROJECT,
		name,
	}
}

export function importProject(json_data: string): ProjectActionTypes {
	return {
		type: IMPORT_PROJECT,
		json_data,
	}
}
export function updateProjectProperties(properties: Omit<Partial<ProjectState>, 'scene'>): ProjectActionTypes {
	return {
		type: UPDATE_PROJECT_PROPERTIES,
		properties,
	}
}

export function updateSceneBackground(color: string): ProjectActionTypes {
	return {
		type: UPDATE_SCENE_BACKGROUND,
		color,
	}
}

export function updateSceneClear(clearCanvas: boolean): ProjectActionTypes {
	return {
		type: UPDATE_SCENE_CLEAR,
		clearCanvas,
	}
}

// export function updateResolution(resolution: number): ProjectActionTypes {
//     return {
//         type: UPDATE_RESOLUTION,
//         resolution
//     }
// }

export function updateSequence(sequence: SequenceMeta): ProjectActionTypes {
	return {
		type: UPDATE_SEQUENCE,
		sequence,
	}
}

export function updateLayers(
	layers: Array<IProjectSceneChild>,
	selecteds?: Array<string | number>
): ProjectActionTypes {
	return {
		type: UPDATE_LAYERS,
		layers,
		selecteds,
	}
}

export function updateLayerProps(
	props: Array<{ id: number | string; name: keyof ShapeBaseProps; value: any }>
): ProjectActionTypes {
	return {
		type: UPDATE_LAYER_PROPS,
		props,
	}
}
export function updateLayerDataProps(
	props: Array<{ id: number | string; name: keyof IProjectSceneChildData; value: any }>
): ProjectActionTypes {
	return {
		type: UPDATE_LAYER_UI_PROPS,
		props,
	}
}
export function selectLayers(selecteds: Array<string | number>, preventPushToHistory = false): ProjectActionTypes {
	return {
		type: SELECT_LAYERS,
		preventPushToHistory,
		selecteds,
	}
}

export function historyChange(history: Array<ICommand>): ProjectActionTypes {
	return {
		type: HISTORY_CHANGE,
		history,
	}
}
