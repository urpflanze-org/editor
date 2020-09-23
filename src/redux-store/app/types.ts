import { AppState, TOpenModal } from '&types/state'

export const IMPORT_APP_STATE = 'IMPORT_APP_STATE'

export const SHOW_SPLASHSCREEN = 'SHOW_SPLASHSCREEN'
export const HIDE_SPLASHSCREEN = 'HIDE_SPLASHSCREEN'

export const SHOW_TUTORIAL = 'SHOW_TUTORIAL'
export const HIDE_TUTORIAL = 'HIDE_TUTORIAL'

export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const HIDE_MESSAGE = 'HIDE_MESSAGE'

export const SET_TIMELINE_STARTED = 'SET_TIMELINE_STARTED'

export const OPEN_MODAL = 'OPEN_MODAL'

interface ImportAppStateAction {
	type: typeof IMPORT_APP_STATE
	state: AppState
}

interface SetTimelineStartedAction {
	type: typeof SET_TIMELINE_STARTED
	started: boolean
}

interface ShowSplashScreenAction {
	type: typeof SHOW_SPLASHSCREEN
}
interface HideSplashScreenAction {
	type: typeof HIDE_SPLASHSCREEN
}

interface ShowTutorialAction {
	type: typeof SHOW_TUTORIAL
}
interface HideTutorialAction {
	type: typeof HIDE_TUTORIAL
}

interface ShowMessageAction {
	type: typeof SHOW_MESSAGE
	message: string
	data?: any
	message_id: number
}

interface HideMessageAction {
	type: typeof HIDE_MESSAGE
	message_id: number
}

interface SetOpenModal {
	type: typeof OPEN_MODAL
	modal: TOpenModal
	data?: any
}

export type AppActionTypes =
	| ImportAppStateAction
	| ShowSplashScreenAction
	| HideSplashScreenAction
	| ShowTutorialAction
	| HideTutorialAction
	| ShowMessageAction
	| HideMessageAction
	| SetTimelineStartedAction
	| SetOpenModal
