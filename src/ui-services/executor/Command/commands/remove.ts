import Executor from '@executor/Executor'

import { ICommandEffects } from '&types/command'
import Command from '@executor/Command/Command'

import SceneUtilities from 'urpflanze/dist/services/scene-utilities/SceneUtilities'
import SceneChild from 'urpflanze/dist/core/SceneChild'

interface ICommandRemoveData {
	id: number | string
	copied_sceneChild: SceneChild
	parentId?: string | number | null
}

class Remove extends Command {
	slug = 'remove'
	passive = false
	data: Array<ICommandRemoveData>

	effects: ICommandEffects = {
		scene_update: true,
		scene_layers_update: true,
		select_layer: [],
	}

	constructor(id: number, args: Array<number | string>, preventPushToHistory = false, executor: Executor) {
		super(id, args, preventPushToHistory, executor)
		args = Array.isArray(args) ? args : [args]

		const scene = executor.getScene()
		const drawer = executor.getDrawer()

		this.data = args
			.map(id => {
				const sceneChild: SceneChild | null = scene.find(id)

				if (sceneChild) {
					return {
						id,
						copied_sceneChild: SceneUtilities.copy(sceneChild, scene, true) as SceneChild,
						parentId: SceneUtilities.getParent(sceneChild)?.id || null,
					}
				}

				return null
			})
			.filter(e => !!e)
			.sort((a, b) =>
				a && b ? (a.copied_sceneChild.order as number) - (b.copied_sceneChild.order as number) : 0
			) as Array<ICommandRemoveData>

		this.setDescriptor()
	}

	protected handleRedo(executor: Executor): boolean | undefined {
		let executed = false

		this.data.forEach(data => {
			const sceneChild = executor.getScene().find(data.id)
			if (sceneChild) {
				SceneUtilities.remove(sceneChild)
				executed = true
			}
		})

		return executed
	}

	protected handleUndo(executor: Executor): boolean | undefined {
		let executed = false

		this.data.forEach(data => {
			if (data.copied_sceneChild && !executor.getScene().find(data.id)) {
				const sceneChild = data.copied_sceneChild
				const parent = data.parentId ? executor.getScene().find(data.parentId) : null

				if (data.parentId && parent) {
					SceneUtilities.add(parent, sceneChild)
					executed = true
				} else if (data.parentId == null) {
					executor.getScene().add(sceneChild)
					executed = true
				}
			}
		})

		return executed
	}

	protected setDescriptor(): void {
		if (this.data.length >= 0) this.descriptor = `remove "${this.data[0].copied_sceneChild?.id}"`
		else this.descriptor = `remove "${this.data.length}" scenechild`
	}
}

export default Remove
