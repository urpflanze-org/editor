import ShapeBase from 'urpflanze/dist/core/shapes/ShapeBase'
import { IProjectSceneChild } from 'urpflanze/dist/services/types/exporters-importers'
import Rect from 'urpflanze/dist/core/shapes/primitives/Rect'
import Scene from 'urpflanze/dist/core/Scene'
import { ISceneChildPropArguments } from 'urpflanze/dist/core/types/scene-child'
import * as Urpflanze from 'urpflanze/dist'
import { ShapeRecursive } from 'urpflanze/dist'

export const SceneChildPropHead = `({ repetition, shape }) => {

}`
export const SceneChildPropHeadWithParent = `({ repetition, shape, parent }) => {

}`

export function validateRawCode(
	layer: IProjectSceneChild,
	raw: string | undefined
): { valid: boolean; error?: string } {
	if (raw === undefined) return { valid: true }

	try {
		const scene = new Scene()
		const shape = new Rect()

		const fn = new Function('Urpflanze', 'scene', `"use strict"; return ${raw}`)(Urpflanze, scene)

		scene.add(shape)

		const prop_arguments: ISceneChildPropArguments = {
			repetition: ShapeBase.getEmptyRepetition(),
			shape,
			parent: undefined,
		}

		if (layer.bUseParent || layer.bUseRecursion) {
			prop_arguments.parent = {
				repetition: ShapeBase.getEmptyRepetition(),
				recursion: ShapeRecursive.getEmptyRecursion(),
			}
		}

		fn(prop_arguments)

		return { valid: true }
	} catch (e) {
		return { valid: false, error: e }
	}
}
