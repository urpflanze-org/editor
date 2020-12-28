// import { IScene, ILayer } from '&types/scene'
import { ICommand } from '&types/command'
import { IProject, IProjectSceneChild } from '@genbs/urpflanze/dist/services/types/exporters-importers'

export interface AppMessage {
	id: number
	message: string
	data?: any
}

export type AppMessages = { [id: number]: AppMessage }

export type TOpenModal = 'render-image' | 'render-animation' | 'import-svg' | 'generate-gcode' | undefined

export interface AppState {
	messages: AppMessages
	bTutorial: boolean
	bSplashScreen: boolean
	bTimelineStarted: boolean
	opened_modal?: TOpenModal
	opened_modal_props?: any
}

export interface ProjectState extends IProject {
	open_layer_properties?: IProjectSceneChild
	selected_layers: Array<string | number>

	history: Array<ICommand>
}

export type RootState = { app: AppState; project: ProjectState }
