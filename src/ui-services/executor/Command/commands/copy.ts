import Executor from '@executor/Executor'

import { ICommandEffects } from '&types/command'
import Command from '@executor/Command/Command'

import SceneUtilities from 'urpflanze/dist/services/scene-utilities/SceneUtilities'

interface ICommandCopyArgs {
	id: string | number
	parentId?: string | number
	refName: string

	added_id?: string | number
	added_name?: string
	added_order?: number
}

class Copy extends Command {
	slug = 'copy'
	passive = false
	data: Required<ICommandCopyArgs>

	effects: ICommandEffects = {
		scene_update: true,
		scene_layers_update: true,
		select_layer: [],
	}

	constructor(id: number, args: Array<number | string>, preventPushToHistory = false, executor: Executor) {
		super(id, args, preventPushToHistory, executor)

		this.data.refName = executor.getScene()?.find(this.data.id)?.name || ''
	}

	protected handleRedo(executor: Executor): boolean | undefined {
		const scene = executor.getScene()
		const drawer = executor.getDrawer()

		const sceneChildReference = scene.find(this.data.id)

		if (sceneChildReference) {
			const sceneChild = SceneUtilities.copy(sceneChildReference, scene)

			if (sceneChild) {
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
	}

	protected handleUndo(executor: Executor): boolean | undefined {
		const scene = executor.getScene()
		const sceneChild = scene.find(this.data.added_id)
		if (sceneChild) {
			SceneUtilities.remove(sceneChild)
			this.effects.select_layer = []
			return true
		}
	}

	protected setDescriptor(): void {
		this.descriptor = `copy "${this.data.refName}"`
	}
}

export default Copy
