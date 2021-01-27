import ShapeBase from 'urpflanze/dist/core/shapes/ShapeBase'
import { IProjectSceneChild } from 'urpflanze/dist/services/types/exporters-importers'
import Rect from 'urpflanze/dist/core/shapes/primitives/Rect'
import Scene from 'urpflanze/dist/core/Scene'
import { ISceneChildPropArguments } from 'urpflanze/dist/core/types/scene-child'
import SceneUtilitiesExtended from 'urpflanze/dist/services/scene-utilities/SceneUtilitiesExtended'
import * as Urpflanze from 'urpflanze/dist'
// const INITIAL = `(${SceneUtilitiesExtended.RAW_ARGUMENTS}) => {

// }`
// const INITIAL_WITH_PARENT = `(${SceneUtilitiesExtended.RAW_ARGUMENTS_WITH_PARENT}) => {

// }`
export const SceneChildPropHead = `({ repetition, recursion, shape }) => {

}`
export const SceneChildPropHeadWithParent = `({ repetition, recursion, shape, parent }) => {

}`

export function validateRawCode(
	layer: IProjectSceneChild,
	raw: string | undefined
): { valid: boolean; error?: string } {
	if (raw === undefined) return { valid: true }

	try {
		const scene = new Scene()
		const shape = new Rect()

		console.log(raw)
		const fn = new Function('Urpflanze', 'scene', `"use strict"; return ${raw}`)(Urpflanze, scene)

		scene.add(shape)

		const prop_arguments: ISceneChildPropArguments = {
			repetition: ShapeBase.getEmptyRepetition(),
			shape,
			parent: undefined,
		}

		if (layer.bUseParent) {
			prop_arguments.parent = { repetition: ShapeBase.getEmptyRepetition() }
		}

		fn(prop_arguments)

		return { valid: true }
	} catch (e) {
		return { valid: false, error: e }
	}
}
