import Executor from '@executor/Executor'
import Move from '@executor/Command/commands/move'

class MoveToBottom extends Move
{
    slug = 'move-to-bottom'

    constructor(id: number, args: Array<number | string>, preventPushToHistory = false, executor: Executor)
    {
        super(id, 'bottom', args, preventPushToHistory, executor)
    }
}

export default MoveToBottom