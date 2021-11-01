import ExecutorProxy from 'executor/ExecutorProxy'
import { Timeline } from '@urpflanze/drawer-canvas/dist/cjs'
import store from 'redux-store/root'
import {
	updateLayers,
	historyChange,
	updateLayerProps,
	updateSequence,
	importProjectState,
	updateProjectProperties,
	updateLayerDataProps,
} from 'redux-store/project/actions'
import { ICommand } from 'types/command'
import { ProjectState } from 'types/state'

import { setTimelineStarted } from 'redux-store/app/actions'
import { bRunOnServiceWorker } from 'utilities'
import { IProjectSceneChild } from 'urpflanze-ext'
import { ISequenceMeta } from '@urpflanze/drawer-canvas/dist/cjs'

const executor = new ExecutorProxy(!bRunOnServiceWorker())

//@ts-ignore
window.executor = executor

/**
 * Attach event executor -> store
 */
executor.attach('project:init', data => {
	store.dispatch(importProjectState(data as ProjectState))
})
executor.attach('project:update-properties', data => {
	store.dispatch(updateProjectProperties(data as Omit<Partial<ProjectState>, 'scene'>))
})

executor.attach('scene:update-layers', data => {
	const result = data as { layers: Array<IProjectSceneChild>; selecteds?: Array<string | number> }

	store.dispatch(updateLayers(result.layers, result.selecteds))
})

executor.attach('scene:update-scene_child-prop', (data: any) => {
	store.dispatch(updateLayerProps(data))
})
executor.attach('scene:update-scene_child-ui-prop', (data: any) => {
	store.dispatch(updateLayerDataProps(data))
})

executor.attach('timeline:change_status', data => {
	store.dispatch(setTimelineStarted((data as string) == Timeline.START))
})

executor.attach('timeline:update_sequence', data => {
	store.dispatch(updateSequence(data as ISequenceMeta))
})

// executor.ask('timeline-sequence').then(data => store.dispatch(updateSequence(data as ISequenceMeta)))

executor.attach('command_history:update_history', data => {
	store.dispatch(historyChange(data as Array<ICommand>))
})

export default executor
