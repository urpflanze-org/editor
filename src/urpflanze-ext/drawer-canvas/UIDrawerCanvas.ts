import {
	IDrawerCanvasPropArguments,
	DrawerCanvas,
	BrowserDrawerCanvas,
	IBrowserDrawerCanvasOptions,
} from '@urpflanze/drawer-canvas/dist/cjs'

import {
	IStreamArguments,
	SceneChild,
	now,
	Modifiers,
	IBufferIndex,
	IShapeBounding,
	Scene,
	ShapePrimitive,
	Vec2,
} from '@urpflanze/core/dist/cjs'
import { SceneUtilities } from 'urpflanze-ext'

export class UIDrawerCanvas extends BrowserDrawerCanvas {
	scale: number
	translate: [number, number]

	constructor(
		scene?: Scene,
		canvasOrContainer?: HTMLElement | HTMLCanvasElement | OffscreenCanvas,
		drawerOptions?: IBrowserDrawerCanvasOptions & { translate?: [number, number]; scale?: number },
		duration?: number,
		framerate?: number
	) {
		super(scene, canvasOrContainer, drawerOptions, duration, framerate, 'linear')
		this.translate = drawerOptions?.translate ?? [0, 0]
		this.scale = drawerOptions?.scale ?? 1
	}

	/**
	 * Set draw option
	 *
	 * @template K
	 * @param {(K | IDrawerOptions)} name
	 * @param {Required<IDrawerOptions>[K]} [value]
	 * @memberof CanvasDrawer
	 */
	public setOption<K extends keyof IBrowserDrawerCanvasOptions>(
		name: K | 'translate' | 'scale',
		value: IBrowserDrawerCanvasOptions[K] | number | [number, number]
	): void {
		switch (name) {
			case 'translate':
				this.translate = value as [number, number]
				break
			case 'scale':
				this.scale = value as number
				break
			default:
				super.setOption(name, value as IBrowserDrawerCanvasOptions[K])
		}
	}

	/**
	 * draw scene
	 *
	 * @static
	 * @param {IBrowserDrawerCanvasOptions} options
	 * @returns {number}
	 * @memberof DrawerCanvas
	 */
	public realDraw(options: IBrowserDrawerCanvasOptions & { ghostIndex?: number }): number {
		const start_time = now()
		const scene = this.scene as Scene
		const context = this.context as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D

		if (!context) return 0

		context.globalCompositeOperation = 'source-over'

		const scale: number = this.scale
		const translate: Array<number> = this.translate
		const time: number = options.time ?? 0
		const simmetricLines: number = options.simmetricLines ?? 0
		// const fixedLineWidth: boolean | undefined = true
		const clear: boolean | undefined = options.clear
		const noBackground: boolean | undefined = options.noBackground
		const backgroundImage: CanvasImageSource | undefined = options.backgroundImage
		const bGhost: boolean =
			typeof options.ghosts !== 'undefined' &&
			options.ghosts > 0 &&
			typeof options.ghostIndex !== 'undefined' &&
			options.ghostIndex > 0
		const ghostMultiplier: number = bGhost ? 1 - (options.ghostIndex as number) / ((options.ghosts as number) + 0.5) : 0
		const ghostAlpha: boolean = options.ghostAlpha === true
		const width: number = scene.width
		const height: number = scene.height
		const ratio = width / height

		const final_scale = [scale, scale]

		const final_translate = [
			width / 2 - (scale > 1 ? (translate[0] * width) / (1 / ((scale - 1) / 2)) : 0),
			height / 2 - (scale > 1 ? (translate[1] * height) / (1 / ((scale - 1) / 2)) : 0),
		]

		if (clear) {
			if (noBackground) {
				context.clearRect(0, 0, width, height)
			} else {
				context.fillStyle = scene.background
				context.fillRect(0, 0, width, height)

				if (backgroundImage) {
					const sourceWidth =
						backgroundImage instanceof SVGImageElement ? backgroundImage.width.baseVal.value : backgroundImage.width
					const sourceHeight =
						backgroundImage instanceof SVGImageElement ? backgroundImage.height.baseVal.value : backgroundImage.height
					const sourceRatio = sourceWidth / sourceHeight

					let x = 0,
						y = 0,
						bgWidth = width,
						bgHeight = height
					if (sourceRatio !== ratio) {
						if (options.backgroundImageFit === 'contain') {
							bgWidth = ratio > sourceRatio ? (sourceWidth * height) / sourceHeight : width
							bgHeight = ratio > sourceRatio ? height : (sourceHeight * width) / sourceWidth
						} else {
							bgWidth = ratio < sourceRatio ? (sourceWidth * height) / sourceHeight : width
							bgHeight = ratio < sourceRatio ? height : (sourceHeight * width) / sourceWidth
						}

						x = (width - bgWidth) / 2
						y = (height - bgHeight) / 2
					}

					context.drawImage(backgroundImage, x, y, bgWidth, bgHeight)
				}
			}

			if (simmetricLines > 0) {
				UIDrawerCanvas.drawSimmetricLinesWithScaleAndTranslate(
					context,
					simmetricLines,
					width,
					height,
					scene.color,
					final_scale,
					final_translate
				)
			}
		}

		{
			let logFillColorWarn = false
			let logStrokeColorWarn = false

			scene.currentTime = time
			scene.getChildren().forEach((sceneChild: SceneChild) => {
				if (
					!sceneChild.data ||
					(!(sceneChild.data.visible === false) && !(bGhost && sceneChild.data.disableGhost === true))
				) {
					sceneChild.generate(time, true)
					context.save()
					sceneChild.stream((stream: IStreamArguments) => {
						const currentIndex: IBufferIndex = stream.currentIndexing
						const shape = currentIndex.shape as ShapePrimitive
						const shapeData: any = shape.data || {}
						const propArguments: IDrawerCanvasPropArguments = {
							canvasContext: context,
							shape,
							// singleRepetitionBounding: currentIndex.singleRepetitionBounding,
							repetition: currentIndex.repetition,
							parent: currentIndex.parent,
							time: scene.currentTime,
						}

						// const composite = Drawer.getStreamDrawerProp<IDrawerCanvasStreamProps>(
						// 	shape,
						// 	'composite',
						// 	propArguments,
						// 	'source-over'
						// )

						// context.globalCompositeOperation = composite

						context.beginPath()
						context.moveTo(
							(stream.buffer[stream.frameBufferIndex] - width / 2) * final_scale[0] + final_translate[0],
							(stream.buffer[stream.frameBufferIndex + 1] - height / 2) * final_scale[1] + final_translate[1]
						)

						for (let i = 2; i < stream.frameLength; i += 2) {
							context.lineTo(
								(stream.buffer[stream.frameBufferIndex + i] - width / 2) * final_scale[0] + final_translate[0],
								(stream.buffer[stream.frameBufferIndex + i + 1] - height / 2) * final_scale[1] + final_translate[1]
							)
						}

						shape.isClosed() && context.closePath()

						if (shapeData && shapeData.highlighted) {
							const lineWidth = DrawerCanvas.getStreamDrawerProp(shape, 'lineWidth', propArguments, 1)
							context.lineWidth = lineWidth * 3 * scale
							context.strokeStyle = scene.color
							context.stroke()

							return
						}

						// const shadowColor = Drawer.getStreamDrawerProp<IDrawerCanvasStreamProps>(
						// 	shape,
						// 	'shadowColor',
						// 	propArguments
						// )
						// const shadowBlur = Drawer.getStreamDrawerProp<IDrawerCanvasStreamProps>(shape, 'shadowBlur', propArguments)
						// const shadowOffsetX = Drawer.getStreamDrawerProp<IDrawerCanvasStreamProps>(
						// 	shape,
						// 	'shadowOffsetX',
						// 	propArguments
						// )
						// const shadowOffsetY = Drawer.getStreamDrawerProp<IDrawerCanvasStreamProps>(
						// 	shape,
						// 	'shadowOffsetY',
						// 	propArguments
						// )

						// context.shadowColor = shadowColor
						// context.shadowBlur = shadowBlur
						// shadowOffsetX && (context.shadowOffsetX = shadowOffsetX)
						// shadowOffsetY && (context.shadowOffsetY = shadowOffsetY)

						let fill = DrawerCanvas.getStreamDrawerProp(shape, 'fill', propArguments)

						if (typeof fill !== 'undefined') {
							if (bGhost && ghostAlpha) {
								const color = DrawerCanvas.ghostifyColor(fill, ghostMultiplier)
								if (color) {
									fill = color
								} else if (!logFillColorWarn) {
									console.warn(`[Urpflanze:DrawerCanvas] Unable ghost fill color '${fill}',
								please enter a rgba or hsla color`)
									logFillColorWarn = true
								}
							}

							context.fillStyle = fill
							context.fill()
						}

						let stroke = DrawerCanvas.getStreamDrawerProp(
							shape,
							'stroke',
							propArguments,
							typeof fill === 'undefined' ? scene.color : undefined
						)
						let lineWidth = DrawerCanvas.getStreamDrawerProp(shape, 'lineWidth', propArguments, 1)

						if (stroke) {
							if (bGhost && ghostAlpha) {
								const color = DrawerCanvas.ghostifyColor(stroke, ghostMultiplier)
								if (color) {
									stroke = color
								} else if (!logStrokeColorWarn) {
									console.warn(`[Urpflanze:DrawerCanvas] Unable ghost stroke color '${stroke}',
								please enter a rgba or hsla color`)
									logStrokeColorWarn = true
								}
								lineWidth *= ghostMultiplier
							}

							// const lineJoin = Drawer.getStreamDrawerProp<IDrawerCanvasStreamProps>(shape, 'lineJoin', propArguments)
							// const lineCap = Drawer.getStreamDrawerProp<IDrawerCanvasStreamProps>(shape, 'lineCap', propArguments)
							// const lineDash = Drawer.getStreamDrawerProp<IDrawerCanvasStreamProps>(shape, 'lineDash', propArguments)
							// const lineDashOffset = Drawer.getStreamDrawerProp<IDrawerCanvasStreamProps>(
							// 	shape,
							// 	'lineDashOffset',
							// 	propArguments
							// )
							// const miterLimit = Drawer.getStreamDrawerProp<IDrawerCanvasStreamProps>(
							// 	shape,
							// 	'miterLimit',
							// 	propArguments
							// )

							// context.setLineDash.call(context, lineDash || [])
							// context.lineJoin = lineJoin
							// context.lineCap = lineCap
							// context.lineDashOffset = lineDashOffset
							// context.miterLimit = miterLimit

							// context.lineWidth = fixedLineWidth ? lineWidth : lineWidth * scale
							context.lineWidth = lineWidth * scale
							context.strokeStyle = stroke
							context.stroke()
						}
					})
					context.restore()
				}
			})
		}

		const end_time = now()

		return end_time - start_time
	}

	/**
	 * Generate image from scene
	 *
	 * @static
	 * @param {(string | SceneChild)} type
	 * @param {number} [width=800]
	 * @param {number} [height=800]
	 * @param {string} [background]
	 * @param {string} [color]
	 * @returns {Promise<string>}
	 * @memberof UIDrawerCanvas
	 */
	public static generateImage(
		type: string | SceneChild,
		width = 800,
		height = 800,
		background?: string,
		color?: string
	): Promise<string> {
		const scene = new Scene({ width, height, background, color })

		const sceneChild = SceneUtilities.create(type)

		if (sceneChild) {
			const shape = SceneUtilities.copy(sceneChild, scene, true)
			// if (shape instanceof ShapePrimitive) {
			// 	shape.style.lineWidth = 3
			// } else if (shape) {
			// 	SceneUtilities.getChildrenPrimitives(shape).forEach(shape => {
			// 		shape.style.lineWidth = 3
			// 	})
			// }

			if (shape) {
				scene.add(shape)
				scene.update(0)

				const fixedLineWidth = false
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
		const rect: IShapeBounding = Modifiers.Adapt.getBounding(shape.getBuffer() as Float32Array)

		// if (rect.width > scene.width || rect.height > scene.height)
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
				const drawer = new UIDrawerCanvas(scene, canvas)
				drawer.realDraw({ time: 0, fixedLineWidth, scale })

				canvas.convertToBlob({ type: 'image/png', quality: 1 }).then(blob => {
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

				canvas.width = width
				canvas.height = height
				canvas.style.width = width + 'px'
				canvas.style.height = height + 'px'

				const drawer = new UIDrawerCanvas(scene, canvas, { time: 0, fixedLineWidth, scale })
				drawer.realDraw({ time: 0, fixedLineWidth, scale })

				resolve(canvas.toDataURL())
			}
		})
	}

	static drawSimmetricLinesWithScaleAndTranslate(
		context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
		simmetricLines: number,
		width: number,
		height: number,
		color: string,
		scale: Array<number>,
		translate: Array<number>
	): void {
		const offset = Math.PI / simmetricLines
		const size = Math.max(width, height)
		const center = [size / 2, size / 2]

		for (let i = 0; i < simmetricLines; i++) {
			const a = [-size, -size]
			const b = [size * 2, size * 2]
			const rotate = i * offset + Math.PI / 4

			Vec2.rotateZ(a, center, rotate)
			Vec2.rotateZ(b, center, rotate)

			context.beginPath()
			context.strokeStyle = color
			context.lineWidth = 1

			context.moveTo((a[0] - size / 2) * scale[0] + translate[0], (a[1] - size / 2) * scale[1] + translate[1])
			context.lineTo((b[0] - size / 2) * scale[0] + translate[0], (b[1] - size / 2) * scale[1] + translate[1])

			context.stroke()
		}
	}
}
