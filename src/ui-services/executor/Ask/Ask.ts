import { IComunication } from '&types/comunication'
import Executor from '@executor/Executor'

import * as layers from '@executor/Ask/answer/layers'
import * as timelines from '@executor/Ask/answer/timelines'
import * as drawers from '@executor/Ask/answer/drawers'
import * as sceneChild from '@executor/Ask/answer/sceneChild'

import toolbar from '@executor/Ask/answer/toolbar'
import { exportJSON, importJSON, appendJSON } from '@ui-services/executor/Ask/answer/json'
import { ICommandEffects } from '&types/command'

export type PossibleAnswer =
	| 'export-json'
	| 'import-json'
	| 'append-json'
	// | 'scene-layers'
	| 'layer-highlight'
	| 'layer-visibility'
	| 'layer-ghost'
	| 'layer-rename'
	| 'toggle-timeline'
	| 'change-timeline-state'
	| 'set-timeline-duration'
	| 'set-timeline-framerate'
	| 'set-timeline'
	| 'timeline-sequence'
	| 'set-drawer-offsets'
	| 'set-drawer-lines'
	| 'set-drawer-clear'
	| 'set-drawer-ghosts'
	| 'set-drawer-ratio'
	| 'get-rendered-frames'
	| 'set-scene-background'
	| 'set-background-image'
	| 'render-image'
	| 'render-animation'
	| 'render-stop'
	| 'prop'
	| 'single-bounding'
	| 'toolbar'
	| 'scene-points'
	| 'get-buffer-length'

type AskCallback = (comunication: IComunication, executor: Executor) => any
type AskEffectCallback = (args: any) => ICommandEffects

export const answers: Record<PossibleAnswer, AskCallback | [AskCallback, ...Array<string | AskEffectCallback>]> = {
	'export-json': exportJSON,
	'import-json': importJSON,
	'append-json': appendJSON,

	// 'scene-layers': layers.sceneLayers,
	'layer-highlight': layers.highlight,
	'layer-visibility': [layers.visibility, 'scene_layers_update'],
	'layer-ghost': [
		layers.ghost,
		'scene_layers_update',
		({ id, status }): ICommandEffects => ({
			scene_child_ui_prop_update: [{ id: id, name: 'disableGhost', value: status }],
		}),
	],
	'layer-rename': [layers.rename, 'scene_layers_update'],

	'toggle-timeline': timelines.toggle,
	'change-timeline-state': timelines.changeState,
	'set-timeline-duration': timelines.setDuration,
	'set-timeline-framerate': timelines.setFramerate,
	'set-timeline': timelines.setTime,
	'timeline-sequence': timelines.getSequence,

	'set-drawer-offsets': drawers.setOffsets,
	'set-drawer-lines': drawers.setLines,
	'set-drawer-clear': drawers.setClearCanvas,
	'set-drawer-ghosts': drawers.setGhosts,
	'set-drawer-ratio': drawers.setRatio,
	'set-scene-background': drawers.setBackground,
	'set-background-image': drawers.setBackgroundImage,
	'get-rendered-frames': drawers.getRenderedFrames,

	'render-image': drawers.render,
	'render-animation': drawers.renderAnimation,
	'render-stop': drawers.renderStop,

	prop: sceneChild.getProp,
	'single-bounding': sceneChild.getSingleBounding,

	toolbar: toolbar,

	'scene-points': (comunication: IComunication, executor: Executor) => {
		const points =
			executor
				.getScene()
				.getChildren()
				.reduce((a, b) => a + b.getBufferLength(), 0) / 2

		const ghosts = executor.getDrawer().getOption('ghosts', 0) as number
		return ghosts && ghosts > 0 ? points * ghosts : points
	},
	'get-buffer-length': (comunication: IComunication, executor: Executor) => {
		const bufferLength = executor.getScene().find(comunication.args.id)?.getBufferLength()

		return bufferLength ? bufferLength / 2 : 0
	},
}

interface AskResponse {
	execution_effects?: ICommandEffects
	data: any
}

export async function handleAsk(comunication: IComunication, executor: Executor): Promise<AskResponse | undefined> {
	if (comunication.command in answers) {
		const answer: AskCallback | [AskCallback, ...Array<string | AskEffectCallback>] = answers[comunication.command]
		const bindedAnswer: [AskCallback, ...Array<string | AskEffectCallback>] = Array.isArray(answer) ? answer : [answer]

		let execution_effects: undefined | ICommandEffects

		if (bindedAnswer.length > 1) {
			execution_effects = {}

			for (let i = 1; i < bindedAnswer.length; i++) {
				const answare_effect = bindedAnswer[i] as string | AskEffectCallback

				if (typeof answare_effect === 'string') execution_effects[answare_effect] = true
				else {
					const result_effects = answare_effect(comunication.args)
					Object.keys(result_effects).forEach(
						key => ((execution_effects as ICommandEffects)[key] = result_effects[key])
					)
				}
			}
		}

		const response = {
			data: await bindedAnswer[0](comunication, executor),
			execution_effects,
		}

		return response
	}

	console.warn(`Executor Ask '${comunication.command}' command not recognized`)
}
