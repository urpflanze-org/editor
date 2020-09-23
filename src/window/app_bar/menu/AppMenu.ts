import { SubMenuActions } from '@window/app_bar/SubMenu'
import store from '@redux-store/root'
import { showSplashScreen } from '@redux-store/app/actions'

const AppMenuActions: SubMenuActions = [
	{
		name: 'Splash Screen',
		action: () => {
			store.dispatch(showSplashScreen())
		},
	},
	// }, {
	//     name: 'Support',
	//     action: () => { console.log('support') }
	// }
]

export default AppMenuActions
