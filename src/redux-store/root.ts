import {
	combineReducers,
	createStore,
	compose,
	applyMiddleware,
	Middleware,
	MiddlewareAPI,
	Dispatch,
	Action,
	AnyAction,
} from 'redux'

import { appReducer } from 'redux-store/app/reducers'
import { projectReducer } from 'redux-store/project/reducers'
import { RootState } from 'types/state'
import Storage from 'storage/Storage'
import { isOpenPopup, LOCAL_STORAGE_KEY } from 'popup-windows/PupupUtilities'

const sanitizeProject = (key: string, value: any): any => {
	switch (key) {
		case 'open_layer_properties':
			return undefined
		case 'selected_layers':
			return []
		case 'history':
			return []
		case 'ui':
			return { ...value, props: {} }
		case 'parent':
			return undefined
		default:
			return value
	}
}

const storageMiddleware: Middleware<{}, RootState> =
	<S extends RootState>(api: MiddlewareAPI<Dispatch, S>) =>
	(next: Dispatch<AnyAction>) =>
	<A extends Action>(action: A): A => {
		const result = next(action)

		// Save store only if main window
		if (window.opener === null && isOpenPopup()) {
			const store = api.getState()
			// TODO: if app e project as same kay thi will error

			Storage.set(LOCAL_STORAGE_KEY, JSON.stringify(store, sanitizeProject), true)
		}

		return result
	}

const appliedMStorageiddleware = applyMiddleware(storageMiddleware)

const enhancer =
	process.env.NODE_ENV === 'development'
		? //@ts-ignore
		  compose(appliedMStorageiddleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
		: appliedMStorageiddleware

const rootReducer = combineReducers({
	app: appReducer,
	project: projectReducer,
})

const store = createStore(rootReducer, enhancer)

export default store
