import Emitter from '@genbs/urpflanze/dist/services/events/Emitter'

import Executor from '@executor/Executor'
import { ICommandHistoryEvents } from '&types/events'
import Command from '@executor/Command/Command'
import { ICommandEffects, ECommandStatus, ICommand } from '&types/command'

import { clamp } from '@genbs/urpflanze/dist/Utilites'

import Add from '@executor/Command/commands/add'
import Remove from '@executor/Command/commands/remove'
import SetProp from '@executor/Command/commands/set-prop'
import SetUIProp from '@executor/Command/commands/set-ui-prop'
import MakeShape from '@executor/Command/commands/make-shape'
import MoveUp from '@executor/Command/commands/move-up'
import MoveDown from '@executor/Command/commands/move-down'
import MoveToTop from '@executor/Command/commands/move-to-top'
import MoveToBottom from '@executor/Command/commands/move-to-bottom'
import ShapeOperation from '@executor/Command/commands/shape-operation'
import CreateFromBuffer from '@executor/Command/commands/create-from-buffer'
import Copy from '@executor/Command/commands/copy'
import Cut from '@executor/Command/commands/cut'
import Subdivide from '@executor/Command/commands/subdivide'

export type PossibleCommand =
	| 'add'
	| 'copy'
	| 'cut'
	| 'create-from-buffer'
	| 'shape-operation'
	| 'remove'
	| 'set-prop'
	| 'set-ui-prop'
	| 'make-shape'
	| 'move-up'
	| 'move-down'
	| 'move-to-top'
	| 'move-to-bottom'
	| 'subdivide'

class CommandHistory extends Emitter<ICommandHistoryEvents> {
	private static MAX_HISTORY = 100

	private command_increment_id = 0
	private commmands: Record<PossibleCommand, typeof Command>

	private history: Array<Command>
	private current_history_index: number

	constructor() {
		super()

		this.commmands = {
			add: Add,
			copy: Copy,
			cut: Cut,
			'create-from-buffer': CreateFromBuffer,
			'shape-operation': ShapeOperation,
			remove: Remove,
			'set-prop': SetProp,
			'set-ui-prop': SetUIProp,
			'make-shape': MakeShape,
			'move-up': MoveUp,
			'move-down': MoveDown,
			'move-to-top': MoveToTop,
			'move-to-bottom': MoveToBottom,
			subdivide: Subdivide,
		}

		this.history = []

		this.current_history_index = 0
	}

	/**
	 * Execute command
	 *
	 * @param {Executor} executor
	 * @param {string} command
	 * @param {*} args
	 * @param {boolean} [preventPushToHistory]
	 * @returns {(ICommandEffects | undefined)}
	 * @memberof CommandHistory
	 */
	public execute(
		executor: Executor,
		command: string,
		args: any,
		preventPushToHistory?: boolean
	): ICommandEffects | undefined {
		if (!(command in this.commmands)) {
			console.warn(`Command history: command "${command}" not recognized.`)
			return
		}

		const cmd = new this.commmands[command](++this.command_increment_id, args, preventPushToHistory, executor)

		const command_status: ECommandStatus = cmd.redo(executor)

		if (command_status !== ECommandStatus.NONE) {
			if (!cmd.preventPushToHistory) {
				this.reindexingHistory()

				this.history.unshift(cmd)

				if (this.history.length >= CommandHistory.MAX_HISTORY) {
					this.history = this.history.slice(0, CommandHistory.MAX_HISTORY)
				}

				this.dispatchHistoryUpdate()

				// dispatch executor effects (es scene:update-scene_child-prop)
				return cmd.effects
			}

			// update scene though effects (when preventPushToHistory is true) are visible
			return {
				scene_update: cmd.effects.scene_update,
				scene_layers_update: cmd.effects.scene_layers_update,
			}
		}
	}

	/**
	 * Combine effect
	 *
	 * @private
	 * @param {(ICommandEffects | undefined)} effect
	 * @param {IExecutionEffects} effects
	 * @memberof CommandHistory
	 */
	private handleCommandEffect(effect: ICommandEffects | undefined, effects: ICommandEffects): void {
		if (effect) {
			Object.keys(effect).forEach(key => {
				const current_prop_update_effect = Array.isArray(effect[key]) ? effect[key] : [effect[key]]

				switch (key as keyof ICommandEffects) {
					case 'scene_child_prop_update':
						if (typeof effects[key] === 'undefined') effects[key] = [current_prop_update_effect]
						else {
							// check effect on same scene child on same prop
							const props_update_effects = effects[key]
							let finded = false
							for (let i = 0, len = props_update_effects.length; i < len; i++)
								for (let j = 0, jlen = current_prop_update_effect.length; i < jlen; i++)
									if (
										props_update_effects[i].id == current_prop_update_effect[j].id &&
										props_update_effects[i].name == current_prop_update_effect[j].name
									) {
										props_update_effects[i].value = current_prop_update_effect.value
										finded = true
									}

							!finded && effects[key].push(effect[key])
						}

						break
					default:
						effects[key] = effects[key] || effect[key]
						break
				}
			})
		}
	}

	/**
	 * Go to history level
	 *
	 * @param {Executor} executor
	 * @param {number} index
	 * @returns {(ICommandEffects | undefined)}
	 * @memberof CommandHistory
	 */
	public goTo(executor: Executor, index: number): ICommandEffects | undefined {
		if (index == this.current_history_index) return

		const effects: ICommandEffects = {}

		if (index > this.current_history_index)
			for (let i = index - this.current_history_index - 1; i >= 0; i--)
				this.handleCommandEffect(this.undo(executor, true), effects)

		if (index < this.current_history_index)
			for (let i = this.current_history_index - index - 1; i >= 0; i--)
				this.handleCommandEffect(this.redo(executor, true), effects)

		this.dispatchHistoryUpdate()

		return effects
	}

	/**
	 * Redo next command
	 *
	 * @param {Executor} executor
	 * @param {boolean} [preventDispatchUpdate=false]
	 * @returns {(ICommandEffects | undefined)}
	 * @memberof CommandHistory
	 */
	public redo(executor: Executor, preventDispatchUpdate = false): ICommandEffects | undefined {
		if (this.history.length > 0 && this.current_history_index > 0) {
			const index = clamp(0, this.history.length, this.current_history_index - 1)
			const currentCommand: Command = this.history[index]
			currentCommand.redo(executor)

			this.current_history_index = index

			if (!preventDispatchUpdate) this.dispatchHistoryUpdate()

			return currentCommand.effects
		}
	}

	/**
	 * Undo current command
	 *
	 * @param {Executor} executor
	 * @param {boolean} [preventDispatchUpdate=false]
	 * @returns {(IExecutionEffects | undefined)}
	 * @memberof CommandHistory
	 */
	public undo(executor: Executor, preventDispatchUpdate = false): ICommandEffects | undefined {
		if (this.history.length >= 0 && this.current_history_index < this.history.length) {
			const index = clamp(0, this.history.length, this.current_history_index)

			const currentCommand: Command = this.history[index]
			currentCommand.undo(executor)

			this.current_history_index = index + 1

			if (!preventDispatchUpdate) this.dispatchHistoryUpdate()

			return currentCommand.effects
		}
	}

	/**
	 * Re-index history on execute command
	 *
	 * @private
	 * @memberof CommandHistory
	 */
	private reindexingHistory(): void {
		if (this.current_history_index > 0)
			for (let i = 0, len = this.current_history_index; i < len; i++) this.history.shift()

		this.current_history_index = 0
	}

	/**
	 * Dispatch history update
	 *
	 * @memberof CommandHistory
	 */
	public dispatchHistoryUpdate(): void {
		// Array<ICommand>
		const history = this.history
			.map((command: Command, index: number) => ({
				id: command.id,
				command: command.descriptor,
				level: index,
				status: command.status,
				bLast: index == this.current_history_index,
				passive: command.passive,
			}))
			.filter((executed: ICommand) => !executed.passive)

		this.dispatch('command_history:update_history', history)
	}

	public clear(): void {
		this.history = []
		this.command_increment_id = 0
		this.current_history_index = 0
	}
}

export default CommandHistory
