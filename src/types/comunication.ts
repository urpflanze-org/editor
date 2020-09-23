import { PossibleAnswer } from '@ui-services/executor/Ask/Ask'
import { PossibleCommand } from '@ui-services/executor/Command/CommandHistory'

export type TComunicationType = 'set-drawer' | 'run' | 'ask' | 'undo' | 'redo' | 'history'

export type TResponseType = 'response' | 'response-unresolved' | 'event' | 'execution-effect'

export type TComunicationCommand = PossibleAnswer | PossibleCommand | 'undo' | 'redo' | 'history' | 'set-drawer'

export interface IComunication {
	type: TComunicationType
	command: TComunicationCommand
	deferred_id: number
	args: any
	transferData?: any
}

export interface IMessage {
	// Service Worker message
	type: TResponseType
	data?: string
}

export interface IComunicationResponse extends IMessage {
	command?: TComunicationCommand
	deferred_id: number
}

export interface IEventResponse extends IMessage {
	event: string
}

export interface IEffectResponse extends IMessage {
	effect: string
	deferred_id: number
}
