import { ISceneChildProps } from 'urpflanze/dist/core/types/scene-child'

import Executor from '@executor/Executor'
import Command from '@ui-services/executor/Command/Command'
import { ICommandEffects } from '&types/command'

import SceneChild from 'urpflanze/dist/core/SceneChild'
import ShapeBuffer from 'urpflanze/dist/core/shapes/ShapeBuffer'

export interface ICommandSubdivideArgs {
	id: string | number
}

class Subdivide extends Command {
	slug = 'subdivide'
	passive = false
	data: ICommandSubdivideArgs & { prev_shape: Float32Array }

	effects: ICommandEffects

	constructor(id: number, args: ICommandSubdivideArgs, preventPushToHistory = false, executor: Executor) {
		super(id, args, preventPushToHistory, executor)

		this.effects = {
			scene_update: true,
			scene_child_prop_update: [
				{
					id: args.id,
					name: 'shape',
					value: null,
				},
				{
					id: args.id,
					name: 'type',
					value: 'ShapeBuffer',
				},
			],
		}

		this.setDescriptor(executor)
	}

	protected handleRedo(executor: Executor): boolean | undefined {
		let executed = false

		const sceneChild = executor.getScene().find(this.data.id) as SceneChild

		if (sceneChild && sceneChild instanceof ShapeBuffer && this.effects.scene_child_prop_update) {
			this.data.prev_shape = Float32Array.from(sceneChild.shape)
			sceneChild.subdivide()
			sceneChild.type = 'ShapeBuffer'
			this.effects.scene_child_prop_update[0].value = sceneChild.shape
			executed = true
		}

		return executed
	}

	protected handleUndo(executor: Executor): boolean | undefined {
		let executed = false

		const sceneChild = executor.getScene().find(this.data.id) as SceneChild

		if (sceneChild && sceneChild instanceof ShapeBuffer && this.effects.scene_child_prop_update) {
			sceneChild.setShape(this.data.prev_shape)
			this.effects.scene_child_prop_update[0].value = sceneChild.shape
			executed = true
		}

		return executed
	}

	protected setDescriptor(executor?: Executor): void {
		this.descriptor = `subdivide shapebuffer points`
	}
}

export default Subdivide
