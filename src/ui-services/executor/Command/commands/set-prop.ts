import { ShapeBaseProps } from '@genbs/urpflanze/dist/core/interfaces/shapes/Interfaces'

import Executor from '@executor/Executor'
import Command from '@ui-services/executor/Command/Command'
import { ICommandEffects } from '&types/command'
import Group from '@genbs/urpflanze/dist/core/Group'
import SceneUtilties from '@genbs/urpflanze/dist/services/scene-utilities/SceneUtilities'
import SceneChild from '@genbs/urpflanze/dist/core/SceneChild'

export interface ICommandSetPropArgs {
	id: string | number
	name: string
	value: any
	prev_value: any

	passive: boolean
}

class SetProp extends Command {
	slug = 'set-prop'
	passive = false
	data: Array<ICommandSetPropArgs & { prev_value: any }>

	effects: ICommandEffects

	constructor(id: number, args: ICommandSetPropArgs, preventPushToHistory = false, executor: Executor) {
		super(id, Array.isArray(args) ? args : [args], preventPushToHistory, executor)

		this.effects = {
			scene_update: true,
			scene_child_prop_update: this.data.map(arg => ({
				id: arg.id,
				name: arg.name,
				value: arg.value,
			})),
		}

		this.setDescriptor(executor)
	}

	protected handleRedo(executor: Executor): boolean | undefined {
		let executed = false
		let effect_index = 0

		this.data.forEach(({ id, name, value }) => {
			const sceneChild = executor.getScene().find(id) as SceneChild

			if (sceneChild && this.effects.scene_child_prop_update) {
				SceneUtilties.setProp(sceneChild, name, value, executor.getDrawer())
				this.effects.scene_child_prop_update[effect_index++].value = value

				if (sceneChild instanceof Group)
					SceneUtilties.getChildren(sceneChild).forEach(child => {
						;(this.effects.scene_child_prop_update as Array<any>)[effect_index++] = { id: child.id, name, value }
					})

				const parent = SceneUtilties.getParent(sceneChild)
				if (parent && parent instanceof Group) {
					parent.setPropUnsafe(name as keyof ShapeBaseProps, undefined)
					;(this.effects.scene_child_prop_update as Array<any>)[effect_index++] = {
						id: parent.id,
						name,
						value: undefined,
					}
				}

				executed = executed || true
			}
		})

		return executed
	}

	protected handleUndo(executor: Executor): boolean | undefined {
		let executed = false
		let effect_index = 0
		this.data.forEach(({ id, name, prev_value }) => {
			const sceneChild = executor.getScene().find(id)

			if (sceneChild && this.effects.scene_child_prop_update) {
				SceneUtilties.setProp(sceneChild, name, prev_value, executor.getDrawer())
				this.effects.scene_child_prop_update[effect_index++].value = prev_value

				if (sceneChild instanceof Group)
					SceneUtilties.getChildren(sceneChild).forEach(child => {
						;(this.effects.scene_child_prop_update as Array<any>)[effect_index++] = {
							id: child.id,
							name,
							value: prev_value,
						}
					})

				const parent = SceneUtilties.getParent(sceneChild)
				if (parent && parent instanceof Group) {
					parent.setPropUnsafe(name as keyof ShapeBaseProps, prev_value)
					;(this.effects.scene_child_prop_update as Array<any>)[effect_index++] = {
						id: parent.id,
						name,
						value: prev_value,
					}
				}

				executed = executed || true
			}
		})

		return executed
	}

	protected setDescriptor(executor?: Executor): void {
		if (this.data.length == 1) {
			const { name, id, prev_value, value } = this.data[0]

			const label = executor?.getScene().find(id)?.name || id

			this.descriptor = `set prop "${name}" of "${label}" from "${prev_value}" to "${value}"`
		} else {
			this.descriptor = `set multiple prop`
		}
	}
}

export default SetProp
