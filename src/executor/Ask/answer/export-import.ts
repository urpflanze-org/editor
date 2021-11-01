import Executor from 'executor/Executor'
import { IComunication } from 'types/comunication'

import { ProjectState } from 'types/state'
import Log from 'Log'
import { JSONExporter, JSONImporter } from 'urpflanze-ext'

//TODO: exporters

export function exportGCODE(comunication: IComunication, executor: Executor): string {
	const { settings } = comunication.args

	// return GCODEExporter.parse(executor.getDrawer(), settings)
	return ''
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

		// drawer.buffer.flush()
		drawer.redraw()

		return true
	}

	return false
}
