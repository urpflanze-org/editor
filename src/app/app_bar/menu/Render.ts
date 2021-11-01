import { SubMenuActions } from 'app/app_bar/SubMenu'

import store from 'redux-store/root'
import { openModal } from 'redux-store/app/actions'

const RenderActions: SubMenuActions = [
	{
		name: 'Render Image',
		action: () => {
			store.dispatch(openModal('render-image'))
		},
	},
	{
		name: 'Render Animation',
		action: () => {
			store.dispatch(openModal('render-animation'))
		},
	},
	{
		name: 'Generate GCODE',
		action: () => {
			store.dispatch(openModal('generate-gcode'))
		},
	},
]

export default RenderActions
