import ClipperShape from '@doodle3d/clipper-js'

import Executor from '@executor/Executor'

import { ICommandEffects } from '&types/command'
import Command from '@executor/Command/Command'
import ShapePrimitive from '@genbs/urpflanze/dist/core/shapes/ShapePrimitive'
import SceneUtilities from '@genbs/urpflanze/dist/services/scene-utilities/SceneUtilities'
import SceneChild from '@genbs/urpflanze/dist/core/SceneChild'

type TShapeOperationType = 'union' | 'difference' | 'intersect' | 'xor'

interface ICommandAddArgs {
	type: TShapeOperationType
	a_id: string | number
	b_id: string | number

	a?: ShapePrimitive
	b?: ShapePrimitive
	a_parent_id?: string | number
	b_parent_id?: string | number

	new_id?: number | string
}

function sceneChildToShape(sceneChild: ShapePrimitive, type: TShapeOperationType): ClipperShape {
	const buffer = sceneChild.getBuffer()
	// let shape: ClipperShape | null = null
	let shape: ClipperShape | null = null

	if (buffer) {
		const repetitions = sceneChild.getProp('repetitions', undefined, 1)
		sceneChild.generate(-1)
		const single_repetition_lengths = sceneChild.getIndexedBuffer()
		console.log(sceneChild, single_repetition_lengths)
		let vertex_index = 0
		for (let r = 0; r < repetitions; r++) {
			const buffer_length = single_repetition_lengths[r].frameLength
			const points = new Array(buffer_length / 2)
			for (let i = 0, j = 0; i < buffer_length; i += 2, j++, vertex_index += 2)
				points[j] = { X: buffer[vertex_index], Y: buffer[vertex_index + 1] }
			shape = shape ? shape[type](new ClipperShape([points])) : new ClipperShape([points])
		}
	}
	return shape ? shape : new ClipperShape([[]])
}

function shapeToBuffer(shape: ClipperShape): Array<Float32Array> {
	const tot_points: Array<{ X: number; Y: number }> = Array.prototype.concat.apply([], shape.paths)

	const tot_buffer_length = tot_points.length * 2
	const tot_buffer = new Float32Array(tot_buffer_length)

	for (let i = 0, j = 0; i < tot_buffer_length; i += 2, j++) {
		tot_buffer[i] = tot_points[j].X
		tot_buffer[i + 1] = tot_points[j].Y
	}
	const bounding = ShapePrimitive.getBounding(tot_buffer)
	const rw = bounding.width > bounding.height ? 1 : bounding.width / bounding.height
	const rh = bounding.width > bounding.height ? bounding.height / bounding.width : 1

	const plen = shape.paths.length
	const buffers = new Array(plen)

	for (let p = 0; p < plen; p++) {
		const points: Array<{ X: number; Y: number }> = shape.paths[p]

		const buffer_length = points.length * 2
		const buffer = new Float32Array(buffer_length)

		for (let i = 0, j = 0; i < buffer_length; i += 2, j++) {
			buffer[i] = rw * ((points[j].X - bounding.cx) / bounding.width) * 2
			buffer[i + 1] = rh * ((points[j].Y - bounding.cy) / bounding.height) * 2
		}

		buffers[p] = buffer
	}
	return buffers
}

class ShapeOperation extends Command {
	slug = 'shape-operation'
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

		const a = scene.find(this.data.a_id) as ShapePrimitive | null
		const b = scene.find(this.data.b_id) as ShapePrimitive | null

		if (a && b) {
			const a_buffer = a.getBuffer()
			const b_buffer = b.getBuffer()

			if (a_buffer && b_buffer && a_buffer.length > 0 && b_buffer.length > 0) {
				this.data.a = a
				this.data.b = b

				const buffers: Array<Float32Array> = shapeToBuffer(
					sceneChildToShape(a, this.data.type)[this.data.type](sceneChildToShape(b, this.data.type))
				)

				if (buffers && buffers.length > 0) {
					const parent = SceneUtilities.getParent(a)

					let sceneChild: SceneChild | null = null

					if (buffers.length == 1) {
						sceneChild = SceneUtilities.create('ShapeBuffer', { shape: buffers[0] }, scene)
					} else {
						sceneChild = SceneUtilities.create('Shape', undefined, scene)
						const sb_count = SceneUtilities.getCountSceneChildOfType(scene, 'ShapeBuffer') + 1
						if (sceneChild) {
							for (let i = 0; i < buffers.length; i++) {
								const item = SceneUtilities.create('ShapeBuffer', { shape: buffers[i] }, scene)
								item && SceneUtilities.add(sceneChild, item, { name: `ShapeBuffer_${sb_count + i}` }, scene)
							}
						}
					}

					if (sceneChild) {
						this.data.new_id = sceneChild.id

						if (parent) {
							SceneUtilities.add(parent, sceneChild, undefined, scene)
						} else {
							scene.add(sceneChild)
						}

						scene.removeFromId(this.data.a_id)
						scene.removeFromId(this.data.b_id)

						this.effects.select_layer = [this.data.new_id]

						return true
					}
				}
			}
		}

		return false
	}

	protected handleUndo(executor: Executor): boolean | undefined {
		const scene = executor.getScene()
		if (scene.find(this.data.new_id)) {
			scene.removeFromId(this.data.new_id)

			const a_parent = this.data.a_parent_id ? scene.find(this.data.a_parent_id) : null
			const b_parent = this.data.b_parent_id ? scene.find(this.data.b_parent_id) : null

			a_parent ? SceneUtilities.add(a_parent, this.data.a, undefined, scene) : scene.add(this.data.a)
			b_parent ? SceneUtilities.add(b_parent, this.data.b, undefined, scene) : scene.add(this.data.b)

			this.effects.select_layer = [this.data.a_id, this.data.b_id]

			return true
		}
	}

	protected setDescriptor(): void {
		this.descriptor = `shape "${this.data.type}"`
	}
}

export default ShapeOperation
