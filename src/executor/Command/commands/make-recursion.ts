import Executor from 'executor/Executor'

import { ICommandEffects } from 'types/command'
import Command from 'executor/Command/Command'
import { SceneChild } from '@urpflanze/core/dist/cjs'
import { SceneUtilities } from 'urpflanze-ext'

interface ICommandMakeRecursionData {
	ids: Array<string | number>

	sceneChild: SceneChild | null

	parentId?: string | number | null
	new_shape_id?: string | number
}

class MakeRecursion extends Command {
	slug = 'make-shape'
	passive = false
	data: ICommandMakeRecursionData

	effects: ICommandEffects = {
		scene_update: true,
		scene_layers_update: true,
		select_layer: [],
	}

	constructor(id: number, args: Array<number | string>, preventPushToHistory = false, executor: Executor) {
		super(id, args, preventPushToHistory, executor)

		this.data = {
			ids: args,
			sceneChild: executor.getScene().find(args[0]),
		}
	}

	protected handleRedo(executor: Executor): boolean | undefined {
		const scene = executor.getScene()

		if (this.data.sceneChild) {
			const sceneChild = this.data.sceneChild
			const parent = SceneUtilities.getParent(sceneChild)

			const shape = SceneUtilities.create(
				'ShapeRecursive',
				{
					id: this.data.new_shape_id,
				},
				scene
			) as SceneChild

			SceneUtilities.remove(sceneChild)
			SceneUtilities.add(shape, sceneChild, undefined, scene)

			if (parent) SceneUtilities.add(parent, shape)
			else scene.add(shape)

			this.data.parentId = parent ? parent.id : null
			this.data.new_shape_id = shape.id

			this.effects.select_layer = this.data.new_shape_id ? [this.data.new_shape_id] : undefined
			return true
		}
	}

	protected handleUndo(executor: Executor): boolean | undefined {
		const scene = executor.getScene()

		if (this.data.sceneChild && this.data.new_shape_id) {
			scene.removeFromId(this.data.new_shape_id)
			const parent = this.data.parentId ? scene.find(this.data.parentId) : null

			if (parent) SceneUtilities.add(parent, this.data.sceneChild)
			else scene.add(this.data.sceneChild)

			this.effects.select_layer = [this.data.sceneChild.id]
			return true
		}
	}

	protected setDescriptor(): void {
		this.descriptor = `make shape`
	}
}

export default MakeRecursion
