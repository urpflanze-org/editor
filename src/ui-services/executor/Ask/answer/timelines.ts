import Executor from '@ui-services/executor/Executor'

import { IComunication } from '&types/comunication'
import Timeline from 'urpflanze/dist/services/timeline/Timeline'
import { ISequenceMeta } from 'urpflanze/dist/services/types/timeline'

export const toggle = (comunication: IComunication, executor: Executor): void => {
	const drawer = executor.getDrawer()
	if (drawer.getTimeline().bSequenceStarted()) drawer.pauseAnimation()
	else {
		drawer.playAnimation()
	}
}

export const changeState = (comunication: IComunication, executor: Executor): void => {
	const drawer = executor.getDrawer()
	const state = comunication.args

	if (state == Timeline.START) !drawer.getTimeline().bSequenceStarted() && drawer.playAnimation()
	else {
		drawer.getTimeline().bSequenceStarted() && drawer.pauseAnimation()
	}
}

export const setDuration = (comunication: IComunication, executor: Executor): void => {
	const drawer = executor.getDrawer()
	const time = comunication.args
	drawer.getTimeline().setDuration(time)
}

export const setFramerate = (comunication: IComunication, executor: Executor): void => {
	const drawer = executor.getDrawer()
	const framerate = comunication.args
	drawer.getTimeline().setFramerate(framerate)
}

export const setTime = (comunication: IComunication, executor: Executor): void => {
	const drawer = executor.getDrawer()
	const time = comunication.args

	drawer.getTimeline().setTime(time)
	drawer.redraw()
}

export const getSequence = (comunication: IComunication, executor: Executor): ISequenceMeta => {
	return executor.getDrawer().getTimeline().getSequence()
}
