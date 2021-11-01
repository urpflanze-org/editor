import * as React from 'react'
import { connect } from 'react-redux'

import History from 'app/app_bar/history/History'
import SubMenu from 'app/app_bar/SubMenu'
import { RootState, ProjectState } from 'types/state'

import AppMenuActions from 'app/app_bar/menu/AppMenu'
import FileActions from 'app/app_bar/menu/File'
import EditActions from 'app/app_bar/menu/Edit'
import RenderActions from 'app/app_bar/menu/Render'
import { updateProjectProperties } from 'redux-store/project/actions'
import KeyboardController from 'app/KeyboardController'
import executor from 'redux-store/executor'

interface AppBarProps {
	project: ProjectState
}

const AppBar: React.FunctionComponent<AppBarProps> = ({ project }: AppBarProps) => {
	const appBarRef = React.createRef<HTMLElement>()
	const [bOpenSubMenu, setOpenSubMenu] = React.useState(false)
	const [bOpenHistory, setOpenHistory] = React.useState(false)

	React.useEffect(() => {
		function handleMessage(e: MessageEvent) {
			if (e.data && e.data.event) {
				switch (e.data.event) {
					case 'set-popup-window-value':
						console.log(e.data)
						// const { id, name, value, pre_value } = e.data.value
						executor.run('set-prop', e.data.value)
						break
				}
			}
		}

		window.addEventListener('message', handleMessage, false)

		return () => window.removeEventListener('message', handleMessage)
	}, [])

	KeyboardController({ project, updateProjectProperties })

	React.useEffect(() => {
		let iid = 0

		function handleClick(e: MouseEvent) {
			iid && clearTimeout(iid)
			if (e.target == appBarRef.current || appBarRef.current?.contains(e.target as HTMLElement))
				setOpenSubMenu(!bOpenSubMenu)
			else {
				bOpenHistory && setOpenHistory(false)
				bOpenSubMenu && setOpenSubMenu(false)
			}
		}

		function handleMousemove(e: MouseEvent) {
			if (e.target == appBarRef?.current || appBarRef?.current?.contains(e.target as HTMLElement))
				iid && clearTimeout(iid)
			else
				!iid &&
					(iid = window.setTimeout(() => {
						bOpenSubMenu && setOpenSubMenu(false)
					}, 1000))
		}

		document.addEventListener('mousemove', handleMousemove, { passive: true })
		document.addEventListener('click', handleClick, { passive: true })

		return () => {
			document.removeEventListener('mousemove', handleMousemove)
			document.removeEventListener('click', handleClick)
		}
	}, [bOpenSubMenu, appBarRef, bOpenHistory])

	return (
		<nav className={`appbar ${bOpenSubMenu ? 'appbar--open-submenu' : ''}`} role="navigation" ref={appBarRef}>
			<div className="appbar__list">
				<div className="appbar__list__item">
					<img
						src="assets/images/logo-full.svg"
						style={{ height: '18px', display: 'inline-block', verticalAlign: 'middle' }}
					/>
					<SubMenu actions={AppMenuActions} />
				</div>
				<div className="appbar__list__item">
					<div>File</div>
					<SubMenu actions={FileActions} project={project} />
				</div>
				<div className="appbar__list__item">
					<div>Edit</div>
					<SubMenu actions={EditActions} setOpenHistory={setOpenHistory} />
				</div>
				<div className="appbar__list__item">
					Render
					<SubMenu actions={RenderActions} />
				</div>
			</div>

			{bOpenHistory && <History />}
		</nav>
	)
}

export default React.memo(
	connect(
		(state: RootState) => ({
			project: state.project,
		}),
		dispatch => ({
			updateProjectProperties: (props: Omit<Partial<ProjectState>, 'scene'>) =>
				dispatch(updateProjectProperties(props)),
		})
	)(AppBar)
)
