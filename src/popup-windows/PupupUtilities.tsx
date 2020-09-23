import { shallowEqual } from 'react-redux'

import { importAppState } from '@redux-store/app/actions'
import { importProjectState } from '@redux-store/project/actions'

import { RootState } from '&types/state'
import Storage from '@ui-services/storage/Storage'
import { debounce } from '@ui-services/utilities/utilies'

import store from '@redux-store/root'

export const LOCAL_STORAGE_KEY = 'redux-storage'

// Window controller

let popupWindow: Window | null
let popupWindowRoute: 'animate' | 'shape-loop' | 'vertex-callback' | 'code' | '' = ''

const ww = window.innerWidth
const wh = window.innerHeight

const popupWindowOptions: string = [
	'status=no',
	'scrollbars=no',
	'toolbar=no',
	'menubar=no',
	'location=no',
	'resizable=yes',
	'titlebar=no',
	'top=' + (wh - wh * 0.8) / 2,
	'left=' + (ww - ww * 0.8) / 2,
	'width=' + ww * 0.8,
	'height=' + wh * 0.8,
].join(',')

export function openAnimatePropWindow(layer_id: string, prop_name?: string): void {
	if (!popupWindow) {
		popupWindow = window.open('/animate/' + layer_id + '/' + prop_name, '_blank', popupWindowOptions)
		if (popupWindow) {
			popupWindowRoute = 'animate'
			popupWindow.addEventListener('beforeunload', () => {
				popupWindow = null
			})
			popupWindow.addEventListener('load', function () {
				setTimeout(() => {
					this.postMessage({ event: 'changeroute', layer_id, prop_name }, location.origin)
					this.focus()
				})
			})
		}
	} else {
		if (popupWindowRoute !== 'animate') {
			closePropWindow()
			openAnimatePropWindow(layer_id, prop_name)
		} else {
			popupWindow.postMessage({ event: 'changeroute', layer_id, prop_name }, location.origin)
			popupWindow.focus()
		}
	}
}

export function openCodeEditorWindow(layer_id: string, prop_name?: string): void {
	if (!popupWindow) {
		popupWindow = window.open('/code/' + layer_id + '/' + prop_name, '_blank', popupWindowOptions)
		if (popupWindow) {
			popupWindowRoute = 'code'
			popupWindow.addEventListener('beforeunload', () => {
				popupWindow = null
			})
			popupWindow.addEventListener('load', function () {
				setTimeout(() => {
					this.postMessage({ event: 'changeroute', layer_id, prop_name }, location.origin)
					this.focus()
				})
			})
		}
	} else {
		if (popupWindowRoute !== 'code') {
			closePropWindow()
			openCodeEditorWindow(layer_id, prop_name)
		} else {
			popupWindow.postMessage({ event: 'changeroute', layer_id, prop_name }, location.origin)
			popupWindow.focus()
		}
	}
}

export function openShapeLoopWindow(layer_id: string): void {
	if (!popupWindow) {
		popupWindow = window.open('/shape-loop/' + layer_id, '_blank', popupWindowOptions)
		if (popupWindow) {
			popupWindowRoute = 'shape-loop'
			popupWindow.addEventListener('beforeunload', () => {
				popupWindow = null
			})
			popupWindow.addEventListener('load', function () {
				setTimeout(() => {
					this.postMessage({ event: 'changeroute', layer_id }, location.origin)
					this.focus()
				})
			})
		}
	} else {
		if (popupWindowRoute !== 'shape-loop') {
			closePropWindow()
			openShapeLoopWindow(layer_id)
		} else {
			popupWindow.postMessage({ event: 'changeroute', layer_id }, location.origin)
			popupWindow.focus()
		}
	}
}

export function openVertexCallbackWindow(layer_id: string): void {
	if (!popupWindow) {
		popupWindow = window.open('/vertex-callback/' + layer_id, '_blank', popupWindowOptions)
		if (popupWindow) {
			popupWindowRoute = 'vertex-callback'
			popupWindow.addEventListener('beforeunload', () => {
				popupWindow = null
			})
			popupWindow.addEventListener('load', function () {
				setTimeout(() => {
					this.postMessage({ event: 'changeroute', layer_id }, location.origin)
					this.focus()
				})
			})
		}
	} else {
		if (popupWindowRoute !== 'vertex-callback') {
			closePropWindow()
			openShapeLoopWindow(layer_id)
		} else {
			popupWindow.postMessage({ event: 'changeroute', layer_id }, location.origin)
			popupWindow.focus()
		}
	}
}

export function closePropWindow(): void {
	if (popupWindow) {
		popupWindow.close()
		popupWindow = null
		popupWindowRoute = ''
	}
}

export function isOpenPopup(): boolean {
	return popupWindow !== null
}

/**
 * Bind events
 */

function loadStoreFromStorage() {
	window.opener && loadJSONState()
}

const _loadStoreFromStorage = debounce(loadStoreFromStorage, 100)

window.addEventListener(
	'storage',
	(e: StorageEvent) => {
		// Dispatch store update only if current window is a popup
		_loadStoreFromStorage()
	},
	{ passive: true }
)

// load store data from popup
window.addEventListener(
	'load',
	e => {
		window.opener && loadJSONState()
	},
	{ passive: true }
)

export function loadJSONState() {
	const state = Storage.get<RootState | null>(LOCAL_STORAGE_KEY, null)

	if (state) {
		const currentState = store.getState()

		if (!shallowEqual(currentState.app, state.app)) store.dispatch(importAppState(state.app))

		if (!shallowEqual(currentState.project, state.project)) store.dispatch(importProjectState(state.project))
	}
}

if (window.opener === null) {
	window.addEventListener('beforeunload', () => closePropWindow())
}
