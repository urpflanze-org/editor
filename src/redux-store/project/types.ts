import { ISceneChildProps } from '@urpflanze/core/dist/cjs'
import { ISceneChildDrawerData, ISequenceMeta } from '@urpflanze/drawer-canvas/dist/cjs'

import { ICommand } from 'types/command'
import { ProjectState } from 'types/state'

import { IProjectSceneChild } from 'urpflanze-ext'

export const IMPORT_PROJECT_STATE = 'IMPORT_PROJECT_STATE'

export const CREATE_PROJECT = 'CREATE_PROJECT'
export const IMPORT_PROJECT = 'IMPORT_PROJECT'
export const UPDATE_PROJECT_PROPERTIES = 'UPDATE_PROJECT_PROPERTIES'

export const CREATE_SCENE = 'CREATE_SCENE'
export const UPDATE_SCENE = 'UPDATE_SCENE'

export const UPDATE_SCENE_BACKGROUND = 'UPDATE_SCENE_BACKGROUND'
export const UPDATE_SCENE_CLEAR = 'UPDATE_SCENE_CLEAR'
// export const UPDATE_RESOLUTION = 'UPDATE_RESOLUTION'

export const UPDATE_LAYERS = 'UPDATE_LAYERS'
export const UPDATE_LAYER_PROPS = 'UPDATE_LAYER_PROPS'
export const UPDATE_LAYER_UI_PROPS = 'UPDATE_LAYER_UI_PROPS'
export const SELECT_LAYERS = 'SELECT_LAYERS'

export const HISTORY_CHANGE = 'HISTORY_CHANGE'

export const UPDATE_SEQUENCE = 'UPDATE_SEQUENCE'

export const OPEN_LAYER_PROPERTIES = 'OPEN_LAYER_PROPERTIES'

interface ImportProjectStateAction {
	type: typeof IMPORT_PROJECT_STATE
	state: ProjectState
}

interface CreateProjectAction {
	type: typeof CREATE_PROJECT
	name: string
}

interface UpdateProjectPropertiesAction {
	type: typeof UPDATE_PROJECT_PROPERTIES
	properties: Omit<Partial<ProjectState>, 'scene'>
}

interface ImportProjectAction {
	type: typeof IMPORT_PROJECT
	json_data: string
}

interface CreateSceneAction {
	type: typeof CREATE_SCENE
}

interface UpdateSceneAction {
	type: typeof UPDATE_SCENE
}

interface UpdateSceneBackgroundAction {
	type: typeof UPDATE_SCENE_BACKGROUND
	color: string
}
interface UpdateSceneClearAction {
	type: typeof UPDATE_SCENE_CLEAR
	clearCanvas: boolean
}

// interface UpdateResolutionAction
// {
//     type: typeof UPDATE_RESOLUTION
//     resolution: number
// }

interface UpdateSequenceAction {
	type: typeof UPDATE_SEQUENCE
	sequence: ISequenceMeta
}

interface UpdateLayersAction {
	type: typeof UPDATE_LAYERS
	layers: Array<IProjectSceneChild>
	selecteds?: Array<string | number>
}

interface UpdateLayerPropsAction {
	type: typeof UPDATE_LAYER_PROPS
	props: Array<{
		id: number | string
		name: keyof ISceneChildProps
		value: any
	}>
}

interface UpdateLayerDataPropsAction {
	type: typeof UPDATE_LAYER_UI_PROPS
	props: Array<{
		id: number | string
		name: keyof ISceneChildDrawerData
		value: any
	}>
}

interface SelectLayersAction {
	type: typeof SELECT_LAYERS
	selecteds: Array<number | string>
	preventPushToHistory: boolean
}

interface HistoryChangeAction {
	type: typeof HISTORY_CHANGE
	history: Array<ICommand>
}

export type ProjectActionTypes =
	| ImportProjectStateAction
	| CreateProjectAction
	| ImportProjectAction
	| UpdateProjectPropertiesAction
	| CreateSceneAction
	| UpdateSceneAction
	| UpdateSceneBackgroundAction
	| UpdateSceneClearAction /*| UpdateResolutionAction*/
	| HistoryChangeAction
	| UpdateLayerPropsAction
	| UpdateLayerDataPropsAction
	| UpdateLayersAction
	| SelectLayersAction
	| UpdateSequenceAction
