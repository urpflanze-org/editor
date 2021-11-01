import { IShapeBounding, ShapeBase, ShapeLoop, Modifiers } from '@urpflanze/core/dist/cjs'
import Executor from 'executor/Executor'
import { IComunication } from 'types/comunication'

export const getProp = (comunication: IComunication, executor: Executor): any => {
	const { id, name } = comunication.args
	const sceneChild = executor.getScene().find(id)

	if (name.indexOf('loop.') == 0 && sceneChild instanceof ShapeLoop) {
		const key = name.substr(5) as 'start' | 'end' | 'inc'
		const loop = sceneChild.getLoop(ShapeBase.getEmptyPropArguments(sceneChild))
		return loop[key] ?? undefined
	}

	return sceneChild ? sceneChild.getProp(name) : undefined
}

export const getSingleBounding = (comunication: IComunication, executor: Executor): IShapeBounding | null => {
	const scene = executor.getScene()
	const sceneChild = executor.getScene().find(comunication.args.id)

	if (sceneChild) {
		const repetitions = sceneChild.getProp('repetitions', undefined, 1)
		const distance = sceneChild.getProp('distance', undefined, 0)
		sceneChild.setProp({ repetitions: 1, distance: 0 }, undefined, true)
		sceneChild.generate(Math.random(), true)
		const bounding = Modifiers.Adapt.getBounding(sceneChild.getBuffer() as Float32Array)
		sceneChild.setProp({ repetitions, distance })

		bounding.x /= scene.width
		bounding.y /= scene.height
		bounding.cx /= scene.width
		bounding.cy /= scene.height
		bounding.width /= scene.width
		bounding.height /= scene.height

		return bounding
	}

	return null
}
