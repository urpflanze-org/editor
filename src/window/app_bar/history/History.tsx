import * as React from 'react'
import { connect } from 'react-redux'

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
		<div className="history">
			<div className="history__title">History</div>

			<ul className="history__list">
				{history.length > 0 &&
					history.map(executed => {
						hasHistory = hasHistory || executed.bLast
						return (
							<div
								className={`history__list__item ${executed.bLast ? 'history__list__item--active' : ''}`}
								key={executed.id}
								onClick={() => goToHistory(executed.level)}
							>
								{executed.command}
							</div>
						)
					})}
				<div
					className={`history__list__item ${!hasHistory ? 'history__list__item--active' : ''}`}
					onClick={() => goToHistory(history.length)}
				>
					Original
				</div>
			</ul>
		</div>
	)
}

export default connect((state: RootState) => ({
	history: state.project.history,
}))(History)
