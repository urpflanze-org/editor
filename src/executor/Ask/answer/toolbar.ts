import Executor from 'executor/Executor'
import { IComunication } from 'types/comunication'
import { SceneUtilities, UIDrawerCanvas } from 'urpflanze-ext'

export default async function (
	comunication: IComunication,
	executor: Executor
): Promise<Array<{ name: string; image: string }>> {
	const { size, color } = comunication.args
	const shapes = SceneUtilities.getRegistered()

	;['ShapeLoop', 'ShapeBuffer', 'Shape', 'ShapeRecursive', 'Group'].forEach(shape => {
		shapes.splice(shapes.indexOf(shape), 1)
	})
	const result: Array<{ name: string; image: string }> = []
	const promises: Array<Promise<string>> = []

	shapes.forEach(shape => {
		promises.push(UIDrawerCanvas.generateImage(shape, size, size, undefined, color))
	})

	const images = await Promise.all(promises)

	shapes.forEach((shape, index) => {
		result.push({ name: shape, image: images[index] })
	})

	return result
}
