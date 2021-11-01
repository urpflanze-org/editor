import * as Urpflanze from '@urpflanze/core/dist/cjs'
import { IProjectSceneChild } from 'urpflanze-ext/editor-exporter-importer/types'

export const SceneChildPropHead = `({ repetition, shape }) => {

}`
export const SceneChildPropHeadWithParent = `({ repetition, shape, parent }) => {

}`

export function validateRawCode(layer: IProjectSceneChild, raw: string | undefined): { valid: boolean; error?: any } {
	if (raw === undefined) return { valid: true }

	try {
		const scene = new Urpflanze.Scene()
		const shape = new Urpflanze.Rect()

		const fn = new Function('Urpflanze', 'scene', `"use strict"; return ${raw}`)(Urpflanze, scene)

		scene.add(shape)

		const prop_arguments: Urpflanze.IPropArguments = {
			repetition: Urpflanze.ShapeBase.getEmptyRepetition(),
			shape,
			parent: undefined,
		}

		if (layer.bUseParent || layer.bUseRecursion) {
			let current = prop_arguments

			for (let i = 0; i < 20; i++) {
				current.parent = {
					shape: new Urpflanze.Shape({ name: `tmp_parent_${i}`, shape: shape }),
					repetition: Urpflanze.ShapeBase.getEmptyRepetition(),
					recursion: Urpflanze.ShapeRecursive.getEmptyRecursion(),
				}
				//@ts-ignore
				current = current.parent
			}
		}

		fn(prop_arguments)

		return { valid: true }
	} catch (e) {
		return { valid: false, error: e }
	}
}
