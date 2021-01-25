import Executor from '@executor/Executor'
import Emitter from 'urpflanze/dist/services/events/Emitter'
import { ExecutorEvents } from '&types/events'
import {
	IEventResponse,
	IComunicationResponse,
	IEffectResponse,
	TComunicationType,
	TComunicationCommand,
	IMessage,
	IComunication,
} from '&types/comunication'

import { ProjectState } from '&types/state'
import Storage from '@ui-services/storage/Storage'
import { PossibleAnswer } from '@executor/Ask/Ask'
import { PossibleCommand } from '@executor/Command/CommandHistory'
import Log from 'Log'

export interface IDeferred {
	resolve: <T>(value?: T | Promise<T>) => void
	reject: <T>(error: T) => void
	promise: Promise<any>
}

class ExecutorProxy extends Emitter<ExecutorEvents> {
	private bRunOnLocal: boolean
	private bCanvasMounted: boolean

	private executor: Executor

	private deamonWorker: Worker

	private response_promises: Array<{ deferred_id: number; promise: IDeferred }>
	private increment_deferred_id: number

	constructor(bRunOnLocal: boolean) {
		super()

		this.bRunOnLocal = bRunOnLocal
		// this.bRunOnLocal = true
		this.response_promises = []
		this.increment_deferred_id = 0
		this.bCanvasMounted = false

		this.proxyComunicationResponse = this.proxyComunicationResponse.bind(this)
		this.onDeamonMessage = this.onDeamonMessage.bind(this)

		if (this.bRunOnLocal) {
			this.executor = new Executor()

			this.executor.attach('event', event => {
				if (event) {
					const response: IEventResponse = { type: 'event', ...event }
					this.dispatch(response.event as keyof ExecutorEvents, response.data)
				}
			})
		} else {
			this.deamonWorker = new Worker('assets/js/deamon.js')
			this.deamonWorker.addEventListener('message', this.onDeamonMessage)
		}
	}

	//#endregion

	//#region Import Export

	/**
	 * Check autosave into storage
	 *
	 * @returns {boolean}
	 * @memberof ExecutorProxy
	 */
	public hasAutosave(): boolean {
		return Storage.has('autosave')
	}

	/**
	 * Get id of autosaved project
	 *
	 * @returns {(string | undefined)}
	 * @memberof ExecutorProxy
	 */
	public getAutosaveProjectId(): string | undefined {
		return this.hasAutosave() ? Storage.get<ProjectState | undefined>('autosave', undefined)?.id : undefined
	}

	/**
	 * Save project into Storage
	 *
	 * @param {ProjectState} project
	 * @returns {Promise<void>}
	 * @memberof ExecutorProxy
	 */
	public autosave(project: ProjectState): Promise<void> {
		return new Promise((resolve, reject) => {
			this.ask('export-json', project)
				.then(data => {
					if (data) {
						Storage.set('autosave', data)
						resolve()
					} else reject()
				})
				.catch(reject)
		})
	}

	/**
	 * Restore autosave
	 *
	 * @returns {Promise<void>}
	 * @memberof ExecutorProxy
	 */
	public async restoreAutosave(): Promise<void> {
		const autosave_data = Storage.get<ProjectState | undefined>('autosave', undefined, true)

		if (autosave_data) this.ask('import-json', autosave_data)
	}

	//#endregion

	//#region Drawer and timeline

	/**
	 * Setup canvas drawer
	 *
	 * @param {HTMLCanvasElement} canvas
	 * @param {number} size
	 * @param {number} ratio
	 * @param {'low' | 'medium' | 'high' | 'ultra'} resolution
	 * @returns {Promise<IComunicationResponse>}
	 * @memberof ExecutorProxy
	 */
	public setDrawer(
		canvas?: HTMLCanvasElement,
		size?: number,
		ratio?: number,
		resolution?: 'low' | 'medium' | 'high' | 'ultra'
	): Promise<IComunicationResponse> {
		if (!this.bCanvasMounted && canvas) {
			this.bCanvasMounted = true

			if (this.bRunOnLocal) {
				console.log('Drawer work sync')
				return this.proxyComunicationDispatcher('set-drawer', 'set-drawer', { canvas, size, ratio, resolution })
			} else {
				console.log('Drawer work on async service')
				const offscreen = canvas.transferControlToOffscreen()
				return this.proxyComunicationDispatcher(
					'set-drawer',
					'set-drawer',
					{ canvas: offscreen, size, ratio, resolution },
					[offscreen]
				)
			}
		} else {
			return this.proxyComunicationDispatcher('set-drawer', 'set-drawer', { size, ratio, resolution })
		}
	}

	//#endregion

	//#region comunicate with real executor

	/**
	 * Run Command
	 *
	 * @param {string} command
	 * @param {*} [args]
	 * @param {*} [preventPushToHistory]
	 * @returns {Promise<any>}
	 * @memberof ExecutorProxy
	 */
	public run(command: PossibleCommand, args?: any, preventPushToHistory?: any): Promise<any> {
		const runOptions = { args, preventPushToHistory }
		return this.proxyComunicationDispatcher('run', command, runOptions)
	}

	public ask(ask: PossibleAnswer, args?: any, transferData?: any): Promise<any> {
		return this.proxyComunicationDispatcher('ask', ask, args, transferData)
	}

	public undo(): Promise<IComunicationResponse> {
		return this.proxyComunicationDispatcher('undo', 'undo')
	}

	public redo(): Promise<IComunicationResponse> {
		return this.proxyComunicationDispatcher('redo', 'redo')
	}

	public history(level = 0): Promise<IComunicationResponse> {
		return this.proxyComunicationDispatcher('history', 'history', level)
	}

	//#endregion

	//#region Response / Dispatch

	/**
	 * Intercept ccmunication from service worker message
	 *
	 * @private
	 * @param {MessageEvent} e
	 * @memberof ExecutorProxy
	 */
	private onDeamonMessage(e: MessageEvent) {
		const message: IMessage = e.data

		// if event is receved (executor events), dispatch it
		if (message.type == 'event') {
			const response: IEventResponse = message as IEventResponse
			this.dispatch(response.event as keyof ExecutorEvents, response.data)
		} // handle comunication
		else {
			const response: IComunicationResponse = message as IComunicationResponse
			this.proxyComunicationResponse(response)
		}
	}

	/**
	 * Handled from ExecurtProxy and Dispatch comunication at local or worker
	 *
	 * @private
	 * @param {TComunicationType} type
	 * @param {TComunicationCommand} command
	 * @param {*} [args]
	 * @param {*} [transferData]
	 * @returns {*}
	 * @memberof ExecutorProxy
	 */
	private async proxyComunicationDispatcher(
		type: TComunicationType,
		command: TComunicationCommand,
		args?: any,
		transferData?: any
	): Promise<IComunicationResponse> {
		const deferred = this.createDeferred()
		const deferred_id = ++this.increment_deferred_id
		const comunication: IComunication = { type, command, args, deferred_id }

		this.dispatch('executor-work', { waiting: this.response_promises.length })

		this.response_promises.push({ deferred_id, promise: deferred })

		if (this.bRunOnLocal) {
			this.proxyComunicationResponse(await this.executor.read(comunication))
		} else this.deamonWorker.postMessage(comunication, transferData)

		return deferred.promise
	}

	/**
	 * Handle response from local or service worker and resolve
	 *
	 * @private
	 * @param {IComunicationResponse | IEffectResponse} response
	 * @memberof ExecutorProxy
	 */
	private proxyComunicationResponse(response: IComunicationResponse | IEffectResponse) {
		Log.log('ComunicationResponse', response.deferred_id, response)
		// Service worker cominicate with json so convert response data to object
		// if (response && response.data && typeof response.data == 'string') response.data = JSON.parse(response.data)

		// find deferred, resolve and remove from promises
		for (let i = 0, len = this.response_promises.length; i < len; i++) {
			if (this.response_promises[i].deferred_id === response.deferred_id) {
				if (response.type === 'response-unresolved') this.response_promises[i].promise.reject(response.data)
				else this.response_promises[i].promise.resolve(response.data)
				this.response_promises.splice(i, 1)
				break
			}
		}

		if (this.response_promises.length == 0) {
			this.increment_deferred_id = 0
			this.dispatch('executor-work', { waiting: this.response_promises.length })
		}

		/**
		 * Client action affect the scene (layer creation, scenechild manipulation)
		 * so dispatch
		 */
		if (response.type == 'execution-effect') {
			this.dispatch(
				(response as IEffectResponse).effect as keyof ExecutorEvents,
				response.data as ExecutorEvents[keyof ExecutorEvents]
			)
		}

		return response
	}

	//#endregion

	private createDeferred(): IDeferred {
		const deferred: any = {
			resolve: undefined,
			reject: undefined,
			promise: undefined,
		}

		const promise = new Promise<IComunicationResponse | IEffectResponse>((resolve, reject) => {
			deferred.resolve = resolve
			deferred.reject = reject
		})

		deferred.promise = promise

		return deferred as IDeferred
	}
}

export default ExecutorProxy
