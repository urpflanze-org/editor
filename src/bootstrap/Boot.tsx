import * as React from 'react'
import { Provider } from 'react-redux'

import store from '@redux-store/root'

import Router from '@bootstrap/Router'

const Boot: React.FunctionComponent = () => {
	return (
		<Provider store={store}>
			<Router />
		</Provider>
	)
}

export default Boot
