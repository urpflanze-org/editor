import {
	AppActionTypes,
	SET_TIMELINE_STARTED,
	SHOW_MESSAGE,
	SHOW_SPLASHSCREEN,
	HIDE_SPLASHSCREEN,
	HIDE_MESSAGE,
	IMPORT_APP_STATE,
	OPEN_MODAL,
	SHOW_TUTORIAL,
	HIDE_TUTORIAL,
} from 'redux-store/app/types'

import { AppState } from 'types/state'

export const initialAppState: AppState = {
	messages: {},
	bTutorial: false,
	bSplashScreen: true,
	bTimelineStarted: false,
	opened_modal: undefined,
	opened_modal_props: undefined,
}

export function appReducer(state = initialAppState, action: AppActionTypes): AppState {
	switch (action.type) {
		case IMPORT_APP_STATE:
			return action.state

		case SHOW_SPLASHSCREEN:
			return { ...state, bSplashScreen: true }

		case HIDE_SPLASHSCREEN:
			return { ...state, bSplashScreen: false }

		case SHOW_TUTORIAL:
			return { ...state, bTutorial: true }

		case HIDE_TUTORIAL:
			return { ...state, bTutorial: false }

		case SET_TIMELINE_STARTED:
			return { ...state, bTimelineStarted: action.started }

		case SHOW_MESSAGE: {
			const id: number = action.message_id
			const message = { id, message: action.message, data: action.data }
			return { ...state, messages: { ...state.messages, [id]: message } }
		}

		case HIDE_MESSAGE: {
			const messages = { ...state.messages }
			delete messages[action.message_id]
			return { ...state, messages }
		}

		case OPEN_MODAL:
			return { ...state, opened_modal: action.modal, opened_modal_props: action.data }

		default:
			return state
	}
}
