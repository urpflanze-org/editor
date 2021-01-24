import ExecutorProxy from '@ui-services/executor/ExecutorProxy'
import TimelineClass from 'urpflanze/dist/services/timeline/Timeline'
import store from '@redux-store/root'
import {
	updateLayers,
	historyChange,
	updateLayerProps,
	updateSequence,
	importProjectState,
	updateProjectProperties,
	updateLayerDataProps,
} from '@redux-store/project/actions'
import { ICommand } from '&types/command'
import { ProjectState } from '&types/state'

import { setTimelineStarted } from '@redux-store/app/actions'
import { bRunOnServiceWorker } from '@ui-services/utilities/utilies'
import { IProjectSceneChild } from 'urpflanze/dist/services/types/exporters-importers'
import { ISequenceMeta } from 'urpflanze/dist/services/types/timeline'

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
	store.dispatch(setTimelineStarted((data as string) == TimelineClass.START))
})

executor.attach('timeline:update_sequence', data => {
	store.dispatch(updateSequence(data as ISequenceMeta))
})

// executor.ask('timeline-sequence').then(data => store.dispatch(updateSequence(data as ISequenceMeta)))

executor.attach('command_history:update_history', data => {
	store.dispatch(historyChange(data as Array<ICommand>))
})

export default executor
