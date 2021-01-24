import Executor from '@executor/Executor'

import { ICommandEffects } from '&types/command'
import Command from '@executor/Command/Command'

import SceneUtilities from 'urpflanze/dist/services/scene-utilities/SceneUtilities'
import SceneChild from 'urpflanze/dist/core/SceneChild'

interface ICommandCutArgs {
	id: string | number
	parent_id?: string | number

	parentSceneChild: SceneChild | null
	refName: string
}

class Cut extends Command {
	slug = 'cut'
	passive = false
	data: ICommandCutArgs

	effects: ICommandEffects = {
		scene_update: true,
		scene_layers_update: true,
		select_layer: [],
	}

	constructor(id: number, args: Array<number | string>, preventPushToHistory = false, executor: Executor) {
		super(id, args, preventPushToHistory, executor)

		const cutted = executor.getScene().find(this.data.id)

		if (cutted) {
			this.data.parentSceneChild = SceneUtilities.getParent(cutted)
			this.data.refName = cutted.name
		}
	}

	protected handleRedo(executor: Executor): boolean | undefined {
		const scene = executor.getScene()

		const sceneChild = scene.find(this.data.id)

		if (sceneChild) {
			SceneUtilities.remove(sceneChild)
			if (this.data.parent_id) {
				const parent = scene.find(this.data.parent_id)
				parent && SceneUtilities.add(parent, sceneChild, undefined, scene)
			} else {
				scene.add(sceneChild)
			}

			this.effects.select_layer = [this.data.id]

			return true
		}
	}

	protected handleUndo(executor: Executor): boolean | undefined {
		const scene = executor.getScene()
		const sceneChild = scene.find(this.data.id)

		if (sceneChild) {
			SceneUtilities.remove(sceneChild)

			if (this.data.parentSceneChild) {
				SceneUtilities.add(this.data.parentSceneChild, sceneChild)
			} else {
				scene.add(sceneChild)
			}

			this.effects.select_layer = []
			return true
		}
	}
	protected setDescriptor(): void {
		this.descriptor = `cut "${this.data.refName}"`
	}
}

export default Cut
