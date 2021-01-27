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
	{
		name: 'Support',
		action: () => {
			const link = document.createElement('a')
			link.href = 'https://ko-fi.com/urpflanze'
			link.target = '_blank'

			document.body.appendChild(link)
			link.click()

			link.remove()
		},
	},
]

export default AppMenuActions
