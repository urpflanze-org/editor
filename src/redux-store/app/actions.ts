import {
	AppActionTypes,
	SET_TIMELINE_STARTED,
	SHOW_SPLASHSCREEN,
	HIDE_SPLASHSCREEN,
	SHOW_TUTORIAL,
	HIDE_TUTORIAL,
	SHOW_MESSAGE,
	HIDE_MESSAGE,
	IMPORT_APP_STATE,
	OPEN_MODAL,
} from 'redux-store/app/types'
import { AppState, TOpenModal } from 'types/state'

export function importAppState(state: AppState): AppActionTypes {
	return {
		type: IMPORT_APP_STATE,
		state,
	}
}

export function setTimelineStarted(started: boolean): AppActionTypes {
	return {
		type: SET_TIMELINE_STARTED,
		started,
	}
}

export function showSplashScreen(): AppActionTypes {
	return {
		type: SHOW_SPLASHSCREEN,
	}
}

export function hideSplashScreen(): AppActionTypes {
	return {
		type: HIDE_SPLASHSCREEN,
	}
}

export function showTutorial(): AppActionTypes {
	return {
		type: SHOW_TUTORIAL,
	}
}

export function hideTutorial(): AppActionTypes {
	return {
		type: HIDE_TUTORIAL,
	}
}

let message_id = 0

export function showMessage(message: string, data?: any): AppActionTypes & { message_id: number } {
	return {
		type: SHOW_MESSAGE,
		message,
		data,
		message_id: ++message_id,
	}
}

export function hideMessage(message_id: number): AppActionTypes {
	return {
		type: HIDE_MESSAGE,
		message_id,
	}
}

export function openModal(modal: TOpenModal | undefined, data?: any): AppActionTypes {
	return {
		type: OPEN_MODAL,
		modal,
		data,
	}
}
