import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import pups from '@pups/js'

import executor from '@redux-store/executor'
import { ICommand, ECommandStatus } from '&types/command'
import { RootState } from '&types/state'

interface HistoryProps {
	history: Array<ICommand>
}

const History: React.FunctionComponent<HistoryProps> = ({ history }: HistoryProps) => {
	function goToHistory(level: number) {
		executor.history(level)
	}

	// function getStatus(executed: ICommand): string
	// {
	//     return executed.status === ECommandStatus.REDO ? 'redo' : ( executed.status === ECommandStatus.UNDO ? 'undo' : 'none' )
	// }
	let hasHistory = false

	return (
		<Container>
			<div
				style={{ borderBottom: '1px solid ' + pups.color('dark-verylighten'), padding: `${pups.ms(-1)} ${pups.ms(0)}` }}
			>
				History
			</div>

			<ul style={{ margin: 0, padding: `${pups.ms(-2)} 1px`, listStyle: 'none', maxHeight: '70vh', overflow: 'auto' }}>
				{history.length > 0 &&
					history.map(executed => {
						hasHistory = hasHistory || executed.bLast
						return (
							<HistoryItem current={executed.bLast} key={executed.id} onClick={() => goToHistory(executed.level)}>
								{executed.command}
							</HistoryItem>
						)
					})}
				<HistoryItem current={!hasHistory} onClick={() => goToHistory(history.length)}>
					Original
				</HistoryItem>
			</ul>
		</Container>
	)
}

const bg = pups.color('dark-lighten').alpha(0.9)

const Container = styled.div`
	position: fixed;
	top: ${pups.add(2, 0)};
	left: ${pups.add(2, 0)};
	background: ${bg.toString('rgba')};
	font-size: 1rem;
	border-radius: 2px;
	z-index: 2;
`

const HistoryItem = styled.li<{ current: boolean }>`
	position: relative;
	padding: 0 ${pups.ms(0)} 0 ${pups.ms(-1)};
	cursor: pointer;

	&:hover {
		background: ${pups.color('dark-verylighten')};
	}

	&:before {
		display: inline-block;
		vertical-align: middle;
		content: ' ';
		width: 5px;
		height: 5px;
		border-radius: 3px;
		transform: translateY(-2px);
		z-index: 1;
		margin-right: ${pups.ms(-1)};
		${props => props.current && `background: #fff;`}
	}
`

export default connect((state: RootState) => ({
	history: state.project.history,
}))(History)
