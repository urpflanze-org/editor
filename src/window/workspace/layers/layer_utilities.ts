import { indexOfObjectProperty } from '@pups/utility/build/Array'
import { IProjectSceneChild } from '@genbs/urpflanze/dist/services/types/exporters-importers'
import store from '@redux-store/root'
import { ctrlKeyPressed } from '@ui-services/utilities/utilies'

export function handleSelection(
	event: React.MouseEvent,
	id: string | number,
	selecteds: Array<string | number>,
	layers: Array<IProjectSceneChild>
): Array<string | number> {
	if (ctrlKeyPressed(event)) {
		const new_selecteds: Array<string | number> = selecteds.slice()

		const index = new_selecteds.indexOf(id)

		if (index >= 0) new_selecteds.splice(index, 1)
		else new_selecteds.push(id)

		return new_selecteds
	}

	if (event.shiftKey) {
		const new_selecteds: Array<string | number> = [...selecteds, id]
		const selected_layers: Array<IProjectSceneChild> = selectedsToLayer(new_selecteds, layers)

		if (hasSameParent(new_selecteds, layers, selected_layers)) {
			const parent = findLayer(selected_layers[0].parentId as string | number, layers)
			const children = parent ? parent.children || [] : layers

			const index = indexOfObjectProperty(children, 'id', id)
			const firstIndex = indexOfObjectProperty(children, 'id', new_selecteds[0])
			const start = firstIndex < index ? firstIndex + 1 : index
			const end = firstIndex < index ? index + 1 : firstIndex

			for (let i = start; i < end; i += 1) !new_selecteds.includes(children[i].id) && new_selecteds.push(children[i].id)
		} else {
			return [id]
		}

		return new_selecteds
	}

	return selecteds.includes(id) && selecteds.length > 0 ? [] : [id]
}

export function hasSameParent(
	selecteds: Array<string | number>,
	layers: Array<IProjectSceneChild>,
	selected_layers?: Array<IProjectSceneChild>
): boolean {
	selected_layers = selected_layers || selectedsToLayer(selecteds, layers)
	const len = selected_layers.length

	if (len <= 1) return true

	const parentId = selected_layers[0].parentId

	for (let i = 1; i < len; i++) if (selected_layers[i].parentId != parentId) return false

	return true
}

export function selectedsToLayer(
	selecteds: Array<string | number>,
	layers: Array<IProjectSceneChild>
): Array<IProjectSceneChild> {
	let result: Array<IProjectSceneChild> = []

	for (let i = 0, len = selecteds.length; i < len; i++) {
		const current_id: string | number = selecteds[i]
		for (let j = 0, jlen = layers.length; j < jlen; j++) {
			const layer = layers[j]

			if (layer.id == current_id) result.push(layer)
			else if (layer.children && layer.children.length >= 0)
				result = result.concat(...selectedsToLayer(selecteds, layer.children))
		}
	}

	return result
}

export function find(id: string | number, layers: Array<IProjectSceneChild>): IProjectSceneChild | undefined {
	let result: IProjectSceneChild | undefined

	for (let i = 0, len = layers.length; i < len; i++) {
		const layer = layers[i]

		if (layer.id == id) return layer
		else if (layer.children && layer.children.length >= 0) if ((result = find(id, layer.children))) return result
	}

	return result
}

export function canBeSorted(layer: IProjectSceneChild, layers: Array<IProjectSceneChild>): number {
	const neighbors = getNeighbors(layer, layers)
	const len = neighbors.length

	if (len <= 1) return -2

	// TODO: check this: index of work on first level items
	const index = indexOfObjectProperty(neighbors, 'id', layer.id)
	return index == 0 ? 1 : index == len - 1 ? -1 : 0
}

export function getNeighbors(layer: IProjectSceneChild, layers: Array<IProjectSceneChild>): Array<IProjectSceneChild> {
	const parent: IProjectSceneChild | undefined = layer.parentId ? findLayer(layer.parentId, layers) : undefined
	let neighbors: Array<IProjectSceneChild> = []

	if (typeof parent === 'undefined') neighbors = Object.values(store.getState().project.scene)
	else neighbors = parent.children || []

	return neighbors
}

export function findLayer(
	id: string | number,
	current_layers?: Array<IProjectSceneChild>
): IProjectSceneChild | undefined {
	if (!current_layers) return

	for (let i = 0, len = current_layers.length; i < len; i++) {
		if (current_layers[i].id == id) return current_layers[i]

		if (current_layers[i].children) {
			const result = findLayer(id, current_layers[i].children)
			if (result) return result
		}
	}

	return
}

export function toSceneLayers(layers: Array<IProjectSceneChild>): { [key: string]: IProjectSceneChild } {
	const result: { [e: string]: IProjectSceneChild } = {}
	for (let i = 0, len = layers.length; i < len; i++) {
		// setParentLayer(layers[i])
		result[layers[i].id] = layers[i]
	}
	return result
}

// export function setParentLayer(layer: IProjectSceneChild): void
// {
//     if (layer.children && layer.children.length > 0)
//         for (let i = 0, len = layer.children.length; i < len; i++)
//         {
//             layer.children[i].parent = layer
//             setParentLayer(layer.children[i])
//         }
// }

export function getPrimitives(layer: IProjectSceneChild): Array<IProjectSceneChild> {
	let result: Array<IProjectSceneChild> = []

	if (layer.children) {
		for (let i = 0, len = layer.children.length; i < len; i++) {
			if (layer.children[i].bPrimitive) result.push(layer.children[i])
			else result = result.concat(...getPrimitives(layer.children[i]))
		}
	}

	return result
}

function _isParentOf(id: string | number, layer: IProjectSceneChild) {
	if (layer.children)
		for (let i = 0, len = layer.children.length; i < len; i++)
			if (layer.children[i].id == id || _isParentOf(id, layer.children[i])) return true

	return false
}

export function isParentOf(
	id: string | number,
	selected_id: string | number,
	layers: Array<IProjectSceneChild>
): boolean {
	const layer = findLayer(id, layers)

	return layer ? _isParentOf(selected_id, layer) : false
}
