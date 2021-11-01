import Executor from 'executor/Executor'
import { ECommandStatus, ICommandEffects, ICommandArgs } from 'types/command'

class Command {
	id: number
	slug: string
	descriptor: string
	passive: boolean
	preventPushToHistory: boolean
	data: { [e: string]: any }
	status: ECommandStatus
	effects: ICommandEffects

	constructor(id: number, args: ICommandArgs = {}, preventPushToHistory = false, executor: Executor) {
		this.id = id

		this.preventPushToHistory = preventPushToHistory || false

		this.data = args

		this.setDescriptor()
	}

	/**
	 * handle redo if not passive and status isn't REDO
	 *
	 * @param {Executor} executor
	 * @returns {ECommandStatus}
	 * @memberof Command
	 */
	public redo(executor: Executor): ECommandStatus {
		if (!this.passive) {
			if (this.status != ECommandStatus.REDO) {
				try {
					const executed: boolean = this.handleRedo(executor) || false
					if (executed) this.status = ECommandStatus.REDO
				} catch (e) {
					console.error(e)
					return ECommandStatus.NONE
				}
			}

			return this.status
		}

		return ECommandStatus.NONE
	}

	/**
	 * handle undo if not passive and status isn't UNDO
	 *
	 * @param {Executor} executor
	 * @returns {ECommandStatus}
	 * @memberof Command
	 */
	public undo(executor: Executor): ECommandStatus {
		if (!this.passive) {
			if (this.status != ECommandStatus.UNDO) {
				try {
					const executed: boolean = this.handleUndo(executor) || false

					if (executed) this.status = ECommandStatus.UNDO
				} catch (e) {
					console.error(e)
					return ECommandStatus.NONE
				}
			}

			return this.status
		}

		return ECommandStatus.NONE
	}

	/**
	 * Apply redo
	 *
	 * @protected
	 * @param {Executor} executor
	 * @returns {boolean | undefined}
	 * @memberof Command
	 */
	protected handleRedo(executor: Executor): boolean | undefined {
		return false
	}

	/**
	 * Apply undo
	 *
	 * @protected
	 * @param {Executor} executor
	 * @returns {boolean | undefined}
	 * @memberof Command
	 */
	protected handleUndo(executor: Executor): boolean | undefined {
		return false
	}

	/**
	 * Set command descriptor
	 *
	 * @protected
	 * @memberof Command
	 */
	protected setDescriptor() {}
}

export default Command
