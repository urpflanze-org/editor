import Executor from '@executor/Executor'

import { indexOfObjectProperty } from '@pups/utility/build/Array'

import { ICommandEffects } from '&types/command'
import Command from '@executor/Command/Command'
import Scene from '@genbs/urpflanze/dist/core/Scene'
import Group from '@genbs/urpflanze/dist/core/Group'

import SceneUtilities from '@genbs/urpflanze/dist/services/scene-utilities/SceneUtilities'
import SceneChild from '@genbs/urpflanze/dist/core/SceneChild'

export type TMoveType = 'up' | 'down' | 'top' | 'bottom'

interface ICommandMoveData {
	id: string | number
	move: TMoveType
	sceneChild: SceneChild | null
}

abstract class Move extends Command {
	slug = 'move'
	passive = false
	data: ICommandMoveData

	effects: ICommandEffects = {
		scene_update: true,
		scene_layers_update: true,
		select_layer: null,
	}

	constructor(id: number, move: TMoveType, args: any, preventPushToHistory = false, executor: Executor) {
		super(id, args, true, executor)

		this.data = {
			id: args,
			move,
			sceneChild: executor.getScene().find(args),
		}

		this.setDescriptor()
	}

	protected handleRedo(executor: Executor): boolean | undefined {
		const scene = executor.getScene()

		if (this.data.sceneChild) {
			const parent = SceneUtilities.getParent(this.data.sceneChild) || scene

			if (parent instanceof Scene || parent instanceof Group) {
				const children = SceneUtilities.getNeighbors(this.data.sceneChild)
				const selectedIndex = indexOfObjectProperty(children, 'id', this.data.sceneChild.id)
				const newIndex =
					this.data.move == 'up'
						? selectedIndex - 1
						: this.data.move == 'top'
						? 0
						: this.data.move == 'down'
						? selectedIndex + 1
						: children.length - 1

				if (newIndex >= 0 && newIndex < children.length) {
					children[selectedIndex].order = (children[newIndex].order ?? 0) + (newIndex > selectedIndex ? 1 : -1)

					parent.sortChildren()
				}
			}

			return true
		}
	}

	protected handleUndo(executor: Executor): boolean | undefined {
		const scene = executor.getScene()

		if (this.data.sceneChild) {
			const parent = SceneUtilities.getParent(this.data.sceneChild) || scene

			if (parent instanceof Scene || parent instanceof Group) {
				const children = SceneUtilities.getNeighbors(this.data.sceneChild)
				const selectedIndex = indexOfObjectProperty(children, 'id', this.data.sceneChild.id)
				const newIndex =
					this.data.move == 'down'
						? selectedIndex - 1
						: this.data.move == 'bottom'
						? 0
						: this.data.move == 'up'
						? selectedIndex + 1
						: children.length - 1

				if (newIndex >= 0 && newIndex < children.length) {
					children[selectedIndex].order = (children[newIndex].order ?? 0) + (newIndex > selectedIndex ? 1 : -1)

					parent.sortChildren()
				}
			}

			return true
		}
	}

	protected setDescriptor(): void {
		this.descriptor = `move ` + this.data.move
	}
}

export default Move
