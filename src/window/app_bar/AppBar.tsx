import * as React from 'react'
import pups from '@pups/js'
import { connect } from 'react-redux'
import styled from 'styled-components'

import History from '@window/app_bar/history/History'
import SubMenu from '@window/app_bar/SubMenu'
import { RootState, ProjectState } from '&types/state'

import AppMenuActions from '@window/app_bar/menu/AppMenu'
import FileActions from '@window/app_bar/menu/File'
import EditActions from '@window/app_bar/menu/Edit'
import RenderActions from '@window/app_bar/menu/Render'
import { updateProjectProperties } from '@redux-store/project/actions'
import KeyboardController from '@window/KeyboardController'
import executor from '@redux-store/executor'

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
					(iid = setTimeout(() => {
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
		<nav role="navigation" ref={appBarRef}>
			<List enableSubMenu={bOpenSubMenu}>
				<Item>
					<img
						src="/assets/images/logo.svg"
						style={{ height: '18px', display: 'inline-block', verticalAlign: 'middle' }}
					/>
					<SubMenu actions={AppMenuActions} />
				</Item>
				<Item>
					<div>File</div>
					<SubMenu actions={FileActions} project={project} />
				</Item>
				<Item>
					<div>Edit</div>
					<SubMenu actions={EditActions} setOpenHistory={setOpenHistory} />
				</Item>
				<Item>
					Render
					<SubMenu actions={RenderActions} />
				</Item>
			</List>

			{bOpenHistory && <History />}
		</nav>
	)
}

const List = styled.ul<{ enableSubMenu: boolean }>`
	display: grid;
	grid-template-columns: repeat(4, max-content);
	align-items: center;
	list-style: none;
	margin: 0 ${pups.ms(-2)};
	padding: 0 ${pups.ms(-2)};
	font-size: 0.8rem;
	line-height: ${pups.ms(2)};
	height: 100%;

	li ul {
		display: none;
	}

	${props =>
		props.enableSubMenu &&
		`
        li:hover ul { display: block; }
    `}
`

const Item = styled.li`
	position: relative;
	z-index: 10;
	padding: ${pups.ms(-2)} ${pups.ms(-1)};
	line-height: 1;

	&:hover {
		background: ${pups.color('dark-verylighten')};
		border-radius: 2px;
		cursor: pointer;
	}
`

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
