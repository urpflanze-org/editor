import Executor from '@executor/Executor'
import Move from '@executor/Command/commands/move'

class MoveDown extends Move
{
    slug = 'move-down'

    constructor(id: number, args: Array<number | string>, preventPushToHistory = false, executor: Executor)
    {
        super(id, 'down', args, preventPushToHistory, executor)
    }
}

export default MoveDown