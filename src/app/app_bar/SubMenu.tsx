import * as React from 'react'

export type SubMenuActions = Array<{
	name: string
	action: (args: any) => void | undefined
} | null>

interface SubMenuProps {
	actions: SubMenuActions
}

const SubMenu: React.FunctionComponent<SubMenuProps> = ({ actions, ...otherProps }: SubMenuProps) => {
	return (
		<ul className="appbar__submenu">
			{actions.map((action, index) => {
				return action == null ? (
					<li className="appbar__submenu__item appbar__submenu__item--no-action" key={index}></li>
				) : (
					<li className="appbar__submenu__item" key={index} onClick={() => action.action(otherProps)}>
						{action.name}
					</li>
				)
			})}
		</ul>
	)
}

export default SubMenu
