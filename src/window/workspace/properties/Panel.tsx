import * as React from 'react'
import styled from 'styled-components'
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
		<Container>
			<Head
				withAction={!!props.action}
				expandable={!!props.expandable}
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
			</Head>

			{expanded && <Section>{props.children}</Section>}
		</Container>
	)
}

const Container = styled.section`
	border: 1px solid ${pups.color('dark-lighten')};
	border-radius: 2px 2px 0 0;

	& + & {
		margin-top: ${pups.ms(0)};
	}
`

const Head = styled.header<{ expandable: boolean; withAction: boolean }>`
	cursor: ${props => (props.expandable ? 'pointer' : null)};
	display: grid;
	align-items: center;
	grid-template-columns: ${props =>
		props.withAction ? 'max-content auto max-content max-content' : 'max-content auto max-content'};
	grid-gap: ${pups.ms(-1)};
	padding: 0 ${pups.ms(0)};
	line-height: ${pups.ms(2)};
	height: ${pups.ms(2)};
	background: ${pups.color('dark')};
	fonst-size: ${pups.sub(0, -3)};
	font-weight: bold;
	color: ${pups.color('gray-dark')};
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`

const Section = styled.section`
	padding: ${pups.ms(0)};

	display: grid;
	grid-template-columns: 1fr;
	grid-gap: ${pups.ms(-2)};
	font-size: ${pups.sub(0, -4)};

	> * {
		line-height: ${pups.add(1, -1)};
	}
`

export default React.memo(Panel)
