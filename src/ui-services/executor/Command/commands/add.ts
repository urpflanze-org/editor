import Executor from '@executor/Executor'

import SceneUtilties from '@genbs/urpflanze/dist/services/scene-utilities/SceneUtilities'
import { ICommandEffects } from '&types/command'
import Command from '@executor/Command/Command'
import { ISceneChildProps } from '@genbs/urpflanze/dist/core/types/scene-child'

interface ICommandAddArgs {
	type: string
	parent_id?: string | number
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

		const sceneChild = SceneUtilties.create(
			this.data.type,
			{
				id: this.data.added_id,
				name: this.data.added_name,
				order: this.data.added_order,
			},
			scene,
			drawer
		)

		if (sceneChild && scene.find(this.data.added_id) == null) {
			sceneChild.scene = scene

			if (this.data.props) {
				Object.keys(this.data.props).forEach(propKey =>
					SceneUtilties.setProp(sceneChild, propKey, this.data.props[propKey], drawer)
				)
			}

			if (this.data.parent_id) {
				const parent = scene.find(this.data.parent_id)
				if (parent) SceneUtilties.add(parent, sceneChild, undefined, scene)
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
		if (this.data.parent_id) this.descriptor = `add "${this.data.type}" to ${this.data.parent_id}`
		else this.descriptor = `add "${this.data.type}" to Scene`
	}
}

export default Add
