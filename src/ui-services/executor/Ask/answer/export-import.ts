import Executor from '@executor/Executor'
import { IComunication } from '&types/comunication'

import JSONExporter from 'urpflanze/dist/services/exporters/JSONExporter'
import JSONImporter from 'urpflanze/dist/services/importers/JSONImporter'
import GCODEExporter from 'urpflanze/dist/services/exporters/GCODEExporter'
import { ProjectState } from '&types/state'
import Log from 'Log'
import { ISVGParsed } from 'urpflanze/dist/services/types/exporters-importers'
import Shape from 'urpflanze/dist/core/shapes/Shape'
import ShapeBuffer from 'urpflanze/dist/core/shapes/ShapeBuffer'
import SceneUtilities from 'urpflanze/dist/services/scene-utilities/SceneUtilities'

export function exportGCODE(comunication: IComunication, executor: Executor): string {
	const { settings } = comunication.args

	return GCODEExporter.parse(executor.getDrawer(), settings)
}

export function exportJSON(comunication: IComunication, executor: Executor): string {
	const { name } = comunication.args

	return JSONExporter.parse(executor.getDrawer(), name)
}

export function importJSON(comunication: IComunication, executor: Executor): ProjectState | null {
	const json_data = comunication.args

	const drawer = JSONImporter.parse(json_data)

	Log.log('Temporany', 'importJSON', json_data, drawer)

	if (drawer) {
		executor.updateDrawer(drawer)

		executor.getCommandHistory().clear()

		const project: Partial<ProjectState> = JSONExporter.parseAsProject(drawer)

		project.open_layer_properties = undefined
		project.selected_layers = []
		project.history = []

		executor.sendEvent('project:init', project)
		Log.log('Temporany', 'importJSON init', project)

		return project as ProjectState
	}

	return null
}

export function appendJSON(comunication: IComunication, executor: Executor): boolean {
	const json_data = comunication.args
	const drawer = executor.getDrawer()
	const scene = executor.getScene()

	const imported_drawer = JSONImporter.parse(json_data)

	if (imported_drawer) {
		const imported_scene = imported_drawer.getScene()

		if (imported_scene) {
			imported_scene.getChildren().forEach(sceneChild => {
				if (!scene.find(sceneChild.id)) {
					scene.add(sceneChild)
				}
			})
		}

		const layers = Object.values(JSONExporter.parseAsProject(drawer).scene)
		executor.sendEvent('scene:update-layers', { layers })

		drawer.buffer.flush()
		drawer.redraw()

		return true
	}

	return false
}

export function importSVG(comunication: IComunication, executor: Executor): boolean {
	const svgParsed: ISVGParsed = comunication.args
	const drawer = executor.getDrawer()
	const scene = executor.getScene()

	const importedShape = SceneUtilities.create('Shape', undefined, scene) as Shape

	svgParsed.buffers.forEach(buffer => {
		const imported = SceneUtilities.create(
			'ShapeBuffer',
			{
				shape: buffer.buffer,
				bClosed: buffer.closed,
				style: {
					fill: buffer.fill,
					stroke: buffer.stroke,
					lineWidth: buffer.lineWidth,
				},
			},
			scene
		) as ShapeBuffer

		SceneUtilities.add(importedShape, imported, undefined, scene)
	})

	scene.add(importedShape)

	const layers = Object.values(JSONExporter.parseAsProject(drawer).scene)
	executor.sendEvent('scene:update-layers', { layers })

	drawer.buffer.flush()
	drawer.redraw()

	return true
}
