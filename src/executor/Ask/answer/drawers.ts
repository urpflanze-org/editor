import Executor from 'executor/Executor'

import { IComunication } from 'types/comunication'
import { UIDrawerCanvas, JSONImporter, JSONExporter } from 'urpflanze-ext'

export const setOffsets = (comunication: IComunication, executor: Executor): void => {
	const drawer = executor.getDrawer()
	const { scale, translate } = comunication.args

	drawer.setOption('scale', scale)
	drawer.setOption('translate', translate)

	drawer.redraw()
}

export const setLines = (comunication: IComunication, executor: Executor): void => {
	const drawer = executor.getDrawer()
	const lines = comunication.args

	drawer.setOption('simmetricLines', lines)
	drawer.redraw()
}

export const setClearCanvas = (comunication: IComunication, executor: Executor): void => {
	const drawer = executor.getDrawer()
	const clear = comunication.args

	drawer.setOption('clear', clear)
	drawer.redraw()

	executor.sendEvent('project:update-properties', { clear })
}

export const setGhosts = (comunication: IComunication, executor: Executor): void => {
	const drawer = executor.getDrawer()
	const { ghosts, ghostSkipTime } = comunication.args

	drawer.setOption('ghosts', ghosts)
	drawer.setOption('ghostSkipTime', ghostSkipTime)
	drawer.redraw()

	executor.sendEvent('project:update-properties', {
		ghosts: Math.round(ghosts * 10) / 10,
		ghostSkipTime: Math.round(ghostSkipTime * 10) / 10,
	})
}

export const resize = (
	drawer: UIDrawerCanvas,
	size: number,
	ratio: number
	// resolution: 'low' | 'medium' | 'high' | 'ultra'
): void => {
	// const resolution_t = resolution || size
	// const resolution_scale = resolution_t == 'low' ? 5 : resolution_t == 'medium' ? 2 : resolution_t == 'ultra' ? 0.5 : 1
	// const finalResolution = size / resolution_scale

	// drawer.resize(size, size, ratio, finalResolution)
	drawer.resize(size, size)
	drawer.redraw()
}

export const setRatio = (comunication: IComunication, executor: Executor): void => {
	const { size, ratio } = comunication.args

	// resize(executor.getScene(), executor.getDrawer(), size, ratio, resolution)
	resize(executor.getDrawer(), size, ratio)

	executor.sendEvent('project:update-properties', { ratio })
}

export const getRenderedFrames = (comunication: IComunication, executor: Executor): Array<number> => {
	return [0]
}

export const setBackground = (comunication: IComunication, executor: Executor): void => {
	const scene = executor.getScene()
	const drawer = executor.getDrawer()
	const { background, preventDispatch } = comunication.args

	scene.background = background

	// drawer.flushBuffer()
	drawer.redraw()

	!preventDispatch && executor.sendEvent('project:update-properties', { background })
}

export const setBackgroundImage = (comunication: IComunication, executor: Executor): void => {
	const { image, source } = comunication.args

	executor.getDrawer().setOption('backgroundImage', image)
	executor.getDrawer().redraw()

	const backgroundImage = source

	executor.sendEvent('project:update-properties', { backgroundImage })
}

function prepareRender(d: UIDrawerCanvas, projectData: string, settings: any): UIDrawerCanvas {
	const drawer = JSONImporter.parse(projectData) as UIDrawerCanvas

	const canvas: HTMLCanvasElement | OffscreenCanvas =
		typeof OffscreenCanvas !== undefined
			? new OffscreenCanvas(settings.size, settings.size)
			: document.createElement('canvas')

	// TODO: resolution
	// drawer.resize(settings.size, settings.size, drawer.getRatio(), settings.size)
	drawer.resize(settings.size, settings.size)
	drawer.setCanvas(canvas)
	// Todo: set optiosn
	// drawer.setOption({
	// 	noBackground: settings.type === 'image/png' && settings.noBackground,
	// 	time: settings.time,
	// })
	drawer.getTimeline().setTime(settings.time)

	return drawer
}

export const render = (comunication: IComunication, executor: Executor): Promise<Uint8Array> | string => {
	const drawer = executor.getDrawer()
	drawer.stopAnimation()

	// // const settings: IRenderSettings = comunication.args.settings
	// // const projectData: string = JSONExporter.parse(drawer)
	// // const renderer: Renderer = executor.getRenderer()

	// // if (settings.type === 'image/svg+xml') {
	// // 	const prepared = prepareRender(drawer, projectData, settings)
	// // 	return JSON.stringify({ svg: SVGExporter.parse(prepared, settings) })
	// // }

	// const prepared = prepareRender(drawer, projectData, settings)
	// return renderer.renderImage(prepared, settings)
	return Promise.resolve(new Uint8Array())
}

export const renderAnimation = (comunication: IComunication, executor: Executor): Promise<Blob[]> => {
	//ffmpeg -framerate 60 -i %05d.jpg -c:v libx264 -pix_fmt yuv420p out.mp4
	const drawer = executor.getDrawer()
	// drawer.stopAnimation()

	// const settings: IRenderSettings = comunication.args.settings
	// const projectData: string = JSONExporter.parse(drawer)
	// const renderer: Renderer = executor.getRenderer()

	// const prepared = prepareRender(drawer, projectData, settings)
	// return renderer.renderAnimation(prepared, settings)
	return Promise.resolve([])
}

export const renderStop = (comunication: IComunication, executor: Executor): void => {
	// const renderer: Renderer = executor.getRenderer()
	// renderer.stop()
}
