import { SceneChild } from '@urpflanze/core/dist/cjs'
import Executor from 'executor/Executor'

import { IComunication } from 'types/comunication'
import { SceneUtilities } from 'urpflanze-ext'
// import ILayerExport from 'ui-services/exporter-importer/ILayer/Exporter'

export function visibility(comunication: IComunication, executor: Executor): void {
	const sceneChild = executor.getScene().find(comunication.args.id)

	if (sceneChild) {
		applyProp('visible', sceneChild, comunication.args.status)
		// executor.getDrawer().flushBuffer()

		executor.getDrawer().redraw()
	}
}

function applyProp(prop: 'highlighted' | 'visible', sceneChild: SceneChild, status: boolean): void {
	sceneChild.data[prop] = status

	SceneUtilities.getChildren(sceneChild).forEach(child => applyProp(prop, child, status))
}

export function highlight(comunication: IComunication, executor: Executor): void {
	const sceneChild = executor.getScene().find(comunication.args.id)

	if (sceneChild) {
		applyProp('highlighted', sceneChild, comunication.args.status)
		// executor.getDrawer().flushBuffer()
		executor.getDrawer().redraw()
	}
}
export function ghost(comunication: IComunication, executor: Executor): void {
	const sceneChild = executor.getScene().find(comunication.args.id)

	if (sceneChild) {
		sceneChild.data['disableGhost'] = comunication.args.status

		executor.getDrawer().redraw()
	}
}

// export function sceneLayers(comunication: IComunication, executor: Executor): Array<ILayer> {
// 	return ILayerExport.export(executor.getScene(), executor.getDrawer())
// }

export function rename(comunication: IComunication, executor: Executor): void {
	const { id, name } = comunication.args
	const sceneChild = executor.getScene().find(id)

	if (sceneChild) {
		sceneChild.name = name
	}
}
