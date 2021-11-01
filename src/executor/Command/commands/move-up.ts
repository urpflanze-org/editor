import Executor from 'executor/Executor'
import Move from 'executor/Command/commands/move'

class MoveUp extends Move {
	slug = 'move-up'

	constructor(id: number, args: Array<number | string>, preventPushToHistory = false, executor: Executor) {
		super(id, 'up', args, preventPushToHistory, executor)
	}
}

export default MoveUp
