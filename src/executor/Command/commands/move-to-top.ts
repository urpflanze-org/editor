import Executor from 'executor/Executor'
import Move from 'executor/Command/commands/move'

class MoveToTop extends Move {
	slug = 'move-to-top'

	constructor(id: number, args: Array<number | string>, preventPushToHistory = false, executor: Executor) {
		super(id, 'top', args, preventPushToHistory, executor)
	}
}

export default MoveToTop
