import Executor from 'executor/Executor'

import { ICommandEffects } from 'types/command'
import Command from 'executor/Command/Command'
import { ISceneChildProps } from '@urpflanze/core/dist/cjs'
import { SceneUtilities } from 'urpflanze-ext'

interface ICommandAddArgs {
	type: string
	parentId?: string | number
	props?: ISceneChildProps

	added_id?: string | number
	added_name?: string
	added_order?: number
}

class Add extends Command {
	slug = 'add'
	passive = false
	data: Required<ICommandAddArgs>

	effects: ICommandEffects = {
		scene_update: true,
		scene_layers_update: true,
		select_layer: [],
	}

	protected handleRedo(executor: Executor): boolean | undefined {
		const scene = executor.getScene()
		const drawer = executor.getDrawer()

		const sceneChild = SceneUtilities.create(
			this.data.type,
			{
				id: this.data.added_id,
				name: this.data.added_name,
				order: this.data.added_order,
			},
			scene
		)

		if (sceneChild && scene.find(this.data.added_id) == null) {
			sceneChild.scene = scene

			if (this.data.props) {
				Object.keys(this.data.props).forEach(propKey =>
					SceneUtilities.set(sceneChild, propKey as keyof ISceneChildProps, this.data.props[propKey], scene)
				)
			}

			if (this.data.parentId) {
				const parent = scene.find(this.data.parentId)
				if (parent) SceneUtilities.add(parent, sceneChild, undefined, scene)
				else return false
			} else {
				scene.add(sceneChild)
			}

			this.data.added_order = this.data.added_order || (sceneChild?.order as number)
			this.data.added_name = this.data.added_name || (sceneChild?.name as string)
			this.data.added_id = sceneChild.id

			this.effects.select_layer = [this.data.added_id]

			return true
		}
	}

	protected handleUndo(executor: Executor): boolean | undefined {
		const scene = executor.getScene()
		if (scene.find(this.data.added_id)) {
			scene.removeFromId(this.data.added_id)
			this.effects.select_layer = []
			return true
		}
	}

	protected setDescriptor(): void {
		if (this.data.parentId) this.descriptor = `add "${this.data.type}" to ${this.data.parentId}`
		else this.descriptor = `add "${this.data.type}" to Scene`
	}
}

export default Add
