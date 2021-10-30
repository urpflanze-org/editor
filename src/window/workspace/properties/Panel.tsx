import * as React from 'react'
import pups from '@pups/js'

import Icon from '@components/icons/Icon'
import { IProjectSceneChild } from 'urpflanze/dist/services/types/exporters-importers'

interface IPanelProps {
	icon: string
	name: string
	expandable?: boolean
	action?: any
	expanded?: boolean
}

export interface ISceneChildPanel {
	layer: IProjectSceneChild
	selectLayer?: (id: number | string) => void
}

const Panel: React.FunctionComponent<IPanelProps> = (props: React.PropsWithChildren<IPanelProps>) => {
	const [expanded, setExpanded] = React.useState(typeof props.expanded === 'undefined' ? true : props.expanded)

	return (
		<section className="panel">
			<div
				className={`panel__head ${props.action ? 'panel__head--with-actions' : ''} ${
					props.expandable ? 'panel__head--expandable' : ''
				}`}
				onClick={() => props.expandable && setExpanded(!expanded)}
			>
				<Icon name={props.icon} fill={pups.color('gray-dark').toString('hex')} />
				<span>{props.name}</span>
				{props.action && props.action}
				{props.expandable && (
					<Icon
						name="arrow-right"
						fill={pups.color('gray-dark').toString('hex')}
						cursor="pointer"
						rotate={90}
						style={{ transform: `scale(1, ${expanded ? -1 : 1})` }}
					/>
				)}
			</div>

			{expanded && <div className="panel__content">{props.children}</div>}
		</section>
	)
}

export default React.memo(Panel)
