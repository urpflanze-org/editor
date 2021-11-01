import { IDrawerCanvasEvents, ITimelineEvents } from '@urpflanze/drawer-canvas/dist/cjs'
import { ICommand } from 'types/command'
import { ProjectState } from 'types/state'
import { IProjectSceneChild } from 'urpflanze-ext'

export type IRenderEvents = null
// export interface IRenderEvents {
// 'renderer:start': IRenderStart
// 'renderer:render-frame': IRenderFrame
// }

export interface ICommandHistoryEvents {
	'command_history:update_history': Array<ICommand>
	'command_history:history_undo': void
	'command_history:history_redo': void
}

interface IExecutorProxyEvents {
	'project:init': ProjectState
	'project:update-properties': Omit<Partial<ProjectState>, 'scene'>
	'scene:update': void
	'scene:update-layers': { layers: Array<IProjectSceneChild>; selecteds?: Array<string | number> }
	'scene:update-scene_child-prop': void
	'scene:update-scene_child-ui-prop': void
	'scene:update-scene_child': void
	'drawer:update': void
	'executor-work': { waiting: number }
}

// export interface ExecutorEvents
// 	extends IDrawerCanvasEvents,
// 		ITimelineEvents,
// 		IExecutorProxyEvents,
// 		ICommandHistoryEvents,
// 		IRenderEvents {}

export interface ExecutorEvents
	extends IDrawerCanvasEvents,
		ITimelineEvents,
		IExecutorProxyEvents,
		ICommandHistoryEvents {}
