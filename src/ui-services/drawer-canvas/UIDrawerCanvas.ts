import Scene from '@genbs/urpflanze/dist/core/Scene'
import DrawerCanvas from '@genbs/urpflanze/dist/services/drawer-canvas/DrawerCanvas'

import { ShapeBounding } from '@genbs/urpflanze/dist/core/types/ShapeBase'
import ShapePrimitive from '@genbs/urpflanze/dist/core/shapes/ShapePrimitive'
import SceneUtilities from '@genbs/urpflanze/dist/services/scene-utilities/SceneUtilities'
import SceneChild from '@genbs/urpflanze/dist/core/SceneChild'

class UIDrawerCanvas extends DrawerCanvas {
	/**
	 * Generate image from scene
	 *
	 * @static
	 * @param {(string | SceneChild)} type
	 * @param {number} [width=800]
	 * @param {number} [height=800]
	 * @param {string} [background]
	 * @param {string} [mainColor]
	 * @returns {Promise<string>}
	 * @memberof UIDrawerCanvas
	 */
	public static generateImage(
		type: string | SceneChild,
		width = 800,
		height = 800,
		background?: string,
		mainColor?: string
	): Promise<string> {
		const scene = new Scene({ width, height, background, mainColor })

		const sceneChild = SceneUtilities.create(type)

		if (sceneChild) {
			const shape = SceneUtilities.copy(sceneChild, scene, undefined, true)

			if (shape) {
				scene.add(shape)
				scene.update(0)

				const fixedLineWidth = true

				const scale = UIDrawerCanvas.adaptShapeToScene(shape, scene)

				return UIDrawerCanvas.getSceneImage(scene, width, height, fixedLineWidth, scale).then(image =>
					image.length ? image : '/assets/images/broken-shape.png'
				)
			}
		}

		return Promise.resolve('/assets/images/broken-shape.png')
	}

	/**
	 * Scale Shape to adapt int scene size
	 *
	 * @static
	 * @param {SceneChild} shape
	 * @param {Scene} scene
	 * @param {number} [scale=1]
	 * @returns
	 * @memberof UIDrawerCanvas
	 */
	public static adaptShapeToScene(shape: SceneChild, scene: Scene, scale = 1): number {
		scene.update(0)
		const rect: ShapeBounding = ShapePrimitive.getBounding(shape.getBuffer() as Float32Array)

		if (rect.width > scene.width || rect.height > scene.height)
			scale = (Math.min(scene.width, scene.height) / Math.max(rect.width, rect.height)) * scale

		return scale * 0.9
	}

	/**
	 * Return scene image
	 *
	 * @static
	 * @param {Scene} scene
	 * @param {number} [width=800]
	 * @param {number} [height=800]
	 * @param {boolean} [fixedLineWidth=false]
	 * @param {number} scale
	 * @returns
	 * @memberof UIDrawerCanvas
	 */
	public static getSceneImage(
		scene: Scene,
		width = 800,
		height = 800,
		fixedLineWidth = false,
		scale: number
	): Promise<string> {
		return new Promise(resolve => {
			if (typeof OffscreenCanvas !== 'undefined') {
				const canvas: OffscreenCanvas = new OffscreenCanvas(width, height)
				const context: OffscreenCanvasRenderingContext2D | null = canvas.getContext('2d')
				UIDrawerCanvas.draw(scene, context, { time: 0, fixedLineWidth, scale }, width)

				canvas.convertToBlob({ type: 'image/png', quality: 0.95 }).then(blob => {
					const fileReader = new FileReader()
					fileReader.addEventListener(
						'load',
						() => (fileReader.result ? resolve(fileReader.result as string) : resolve('')),
						{ passive: true }
					)
					fileReader.readAsDataURL(blob)
				})
			} else {
				const canvas: HTMLCanvasElement = document.createElement('canvas')
				const context: CanvasRenderingContext2D | null = canvas.getContext('2d')

				canvas.width = width
				canvas.height = height
				canvas.style.width = width + 'px'
				canvas.style.height = height + 'px'

				UIDrawerCanvas.draw(scene, context, { time: 0, fixedLineWidth, scale }, width)

				resolve(canvas.toDataURL())
			}
		})
	}
}

export default UIDrawerCanvas
