import * as React from 'react'
import { Provider } from 'react-redux'

import store from '@redux-store/root'

import GlobalStyle from '@bootstrap/GlobalStyle'
import Router from '@bootstrap/Router'

const Boot: React.FunctionComponent = () => {
	return (
		<React.Fragment>
			<GlobalStyle />
			<Provider store={store}>
				<Router />
			</Provider>
		</React.Fragment>
	)
}

export default Boot
