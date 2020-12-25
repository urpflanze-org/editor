import Executor from '@executor/Executor'

import { ICommandEffects } from '&types/command'
import Command from '@executor/Command/Command'
import UIDrawerCanvas from '@ui-services/drawer-canvas/UIDrawerCanvas'
import Scene from '@genbs/urpflanze/dist/core/Scene'
import SceneUtilities from '@genbs/urpflanze/dist/services/scene-utilities/SceneUtilities'
import SceneChildPropsData from '@ui-services/utilities/SceneChildPropsData'
import SceneChild from '@genbs/urpflanze/dist/core/SceneChild'

interface ICommandCreateFromBufferArgs {
	buffers: Array<{ buffer: Float32Array; closed: boolean }>

	added_id?: string | number
}

class CreateFromBuffer extends Command {
	slug = 'create-from-buffer'
	passive = false
	data: Required<ICommandCreateFromBufferArgs>

	effects: ICommandEffects = {
		scene_update: true,
		scene_layers_update: true,
		select_layer: [],
	}

	protected handleRedo(executor: Executor): boolean | undefined {
		const scene = executor.getScene()
		const drawer = executor.getDrawer()

		const sceneChild = svgBufferToScene(drawer, this.data.buffers)

		if (sceneChild && scene.find(this.data.added_id) == null) {
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
		this.descriptor = `create from buffer`
	}
}

export function svgBufferToScene(
	drawer: UIDrawerCanvas,
	buffers: Array<{ buffer: Float32Array; closed: boolean }>
): SceneChild | null {
	const scene: Scene | undefined = drawer.getScene()
	let sceneChild: SceneChild | null = null

	if (buffers.length) {
		const sideLength = SceneChildPropsData.sideLength?.default

		switch (buffers.length) {
			case 0:
				sceneChild = null
				break
			case 1:
				sceneChild = SceneUtilities.create(
					'ShapeBuffer',
					{ shape: buffers[0].buffer, sideLength, bCloseShape: buffers[0].closed },
					scene
				)
				break
			default:
				sceneChild = SceneUtilities.create('Shape', undefined, scene)

				if (sceneChild) {
					buffers.forEach((buffer, index) => {
						const child = SceneUtilities.create(
							'ShapeBuffer',
							{ shape: buffer.buffer, sideLength, order: index, bCloseShape: buffer.closed },
							scene
						)
						child && SceneUtilities.add(sceneChild as SceneChild, child, undefined, scene)
					})
				}
				break
		}

		if (scene && sceneChild) scene.add(sceneChild)
	}

	return sceneChild
}

export default CreateFromBuffer
