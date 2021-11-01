import { SubMenuActions } from 'app/app_bar/SubMenu'
import executor from 'redux-store/executor'

const EditActions: SubMenuActions = [
	{
		name: 'Undo',
		action: () => {
			executor.undo()
		},
	},
	{
		name: 'Redo',
		action: () => {
			executor.redo()
		},
	},
	null,
	{
		name: 'History',
		action: ({ setOpenHistory }) => {
			setOpenHistory(true)
		},
	},
]

export default EditActions
