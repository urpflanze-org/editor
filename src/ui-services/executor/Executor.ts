import pups from '@pups/js'

import Scene from 'urpflanze/dist/core/Scene'
import Emitter from 'urpflanze/dist/services/events/Emitter'
import Renderer from 'urpflanze/dist/services/renderer/Renderer'

import UIDrawerCanvas from '@ui-services/drawer-canvas/UIDrawerCanvas'

import CommandHistory from '@executor/Command/CommandHistory'
import { IComunicationResponse, IEffectResponse, IComunication } from '&types/comunication'
import { handleAsk } from '@executor/Ask/Ask'

import DesidusShape from 'DesidusShape'
import { ICommandEffects } from '&types/command'
// import ILayerExport from '@ui-services/exporter-importer/ILayer/Exporter'

import { resize } from '@executor/Ask/answer/drawers'
// import JSONImporter from '@ui-services/exporter-importer/json/Importer'
import Log from 'Log'
import DrawerCanvas from 'urpflanze/dist/services/drawers/drawer-canvas/DrawerCanvas'
import JSONExporter from 'urpflanze/dist/services/exporters/JSONExporter'

import SceneUtilities from 'urpflanze/dist/services/scene-utilities/SceneUtilities'

interface EventIterceptor {
	event: {
		event: string
		data: any
	}
}

class Executor extends Emitter<EventIterceptor> {
	private drawer: UIDrawerCanvas
	private renderer: Renderer
	private commandHistory: CommandHistory

	constructor() {
		super()

		const scene = new Scene()
		scene.color = pups.color('primary').toString('hex')
		scene.background = pups.color('dark').toString('hex')

		const initialDrawer = new UIDrawerCanvas(scene)
		initialDrawer.getTimeline().setSequence(6000, 60)
		this.updateDrawer(initialDrawer)

		this.renderer = new Renderer()
		this.commandHistory = new CommandHistory()

		this.commandHistory.attach(
			'command_history:update_history',
			this.sendEvent.bind(this, 'command_history:update_history')
		)
		this.renderer.attach('renderer:start', this.sendEvent.bind(this, 'renderer:start'))
		this.renderer.attach('renderer:render-frame', this.sendEvent.bind(this, 'renderer:render-frame'))

		SceneUtilities.register('Desidus', DesidusShape)
	}

	/**
	 * Dispatch event to self and emit intercepted event
	 *
	 * @param {string} event
	 * @param {*} data
	 * @memberof Executor
	 */
	public sendEvent(event: string, data: any): void {
		this.dispatch('event', { event, data })
	}

	/**
	 * Return scene
	 *
	 * @returns {Scene}
	 * @memberof Executor
	 */
	public getScene(): Scene {
		return this.drawer.getScene() as Scene
	}

	/**
	 * Set scene
	 *
	 * @param {Scene} scene
	 * @memberof Executor
	 */
	public setScene(scene: Scene): void {
		const currentScene = this.getScene()
		if (currentScene) currentScene.resize(currentScene.width, currentScene.height)

		this.drawer.setScene(scene)

		this.drawer.buffer.flush()
		this.drawer.redraw()
	}

	/**
	 * Get drawer
	 *
	 * @returns {UIDrawerCanvas}
	 * @memberof Executor
	 */
	public getDrawer(): UIDrawerCanvas {
		return this.drawer
	}

	/**
	 * Set drawer
	 *
	 * @param {({ canvas: HTMLElement | HTMLCanvasElement | OffscreenCanvas, size: number, ratio: number, resolution: 'low' | 'medium' | 'high' | 'ultra' })} props
	 * @memberof Executor
	 */
	public setDrawer(props: {
		canvas: HTMLElement | HTMLCanvasElement | OffscreenCanvas
		size: number
		ratio: number
		// resolution: 'low' | 'medium' | 'high' | 'ultra'
	}): void {
		if (props.canvas) this.drawer.setCanvas(props.canvas)

		// if (props.size || props.ratio || props.resolution)
		if (props.size || props.ratio) resize(this.drawer, props.size, props.ratio)

		this.sendEvent('drawer:update', {})
	}

	/**
	 * update drawer
	 * @memberof Executor
	 */
	public updateDrawer(drawer: DrawerCanvas): void {
		if (this.drawer && this.drawer.getCanvas()) {
			const canvas = this.drawer.getCanvas()
			drawer.setCanvas(canvas)
		}

		this.drawer = new UIDrawerCanvas(
			drawer.getScene(),
			drawer.getCanvas(),
			drawer.getOptions(),
			drawer.getRatio(),
			drawer.getTimeline().getSequence().duration,
			drawer.getTimeline().getSequence().framerate
		)
		this.drawer.setBuffering(true)

		const scene = this.drawer.getScene()
		if (scene) this.setScene(scene)

		this.drawer.attach('drawer-canvas:buffer_loaded', this.sendEvent.bind(this, 'drawer-canvas:buffer_loaded'))
		this.drawer.attach('drawer-canvas:buffer_flush', this.sendEvent.bind(this, 'drawer-canvas:buffer_flush'))
		// this.drawer.attach('drawer-canvas:resize', this.sendEvent.bind(this, 'drawer-canvas:resize'))
		this.drawer.getTimeline().attach('timeline:update_sequence', this.sendEvent.bind(this, 'timeline:update_sequence'))
		this.drawer.getTimeline().attach('timeline:change_status', this.sendEvent.bind(this, 'timeline:change_status'))
		this.drawer.getTimeline().attach('timeline:progress', this.sendEvent.bind(this, 'timeline:progress'))

		this.sendEvent('drawer:update', {})
	}

	/**
	 * Return renderer
	 *
	 * @returns {Renderer}
	 * @memberof Executor
	 */
	public getRenderer(): Renderer {
		return this.renderer
	}

	/**
	 * Return command history
	 *
	 * @returns {CommandHistory}
	 * @memberof Executor
	 */
	public getCommandHistory(): CommandHistory {
		return this.commandHistory
	}

	/**
	 * Read comunication
	 *
	 * @param {IComunication} comunication
	 * @returns {Promise<IComunicationResponse>}
	 * @memberof Executor
	 */
	async read(comunication: IComunication): Promise<IComunicationResponse> {
		Log.log('Comunication', comunication.deferred_id, comunication)

		try {
			let execution_effects: ICommandEffects | void
			let response_data: any

			switch (comunication.type) {
				case 'set-drawer':
					await this.setDrawer(comunication.args)
					break
				case 'run': {
					const runOptions = comunication.args
					execution_effects = await this.commandHistory.execute(
						this,
						comunication.command,
						runOptions.args,
						runOptions.preventPushToHistory
					)
					break
				}
				case 'ask': {
					const ask_response = await handleAsk(comunication, this)
					response_data = ask_response?.data
					execution_effects = ask_response?.execution_effects
					break
				}
				case 'undo':
					execution_effects = await this.commandHistory.undo(this)
					break
				case 'redo':
					execution_effects = await this.commandHistory.redo(this)
					break
				case 'history':
					execution_effects = await this.commandHistory.goTo(this, comunication.args)
					break
			}

			if (execution_effects) {
				const response: IEffectResponse = {
					type: 'execution-effect',
					deferred_id: comunication.deferred_id,
					effect: 'no-effect',
				}

				if (execution_effects.scene_update) {
					this.drawer.buffer.flush()
					this.drawer.redraw()
				}

				if (execution_effects.scene_layers_update) {
					response.effect = 'scene:update-layers'
					response.data = {
						// layers: ILayerExport.export(this.scene, this.drawer),
						layers: Object.values(JSONExporter.parseAsProject(this.drawer).scene),
						selecteds: execution_effects.select_layer ? execution_effects.select_layer : undefined,
					}
				}
				if (execution_effects.scene_child_prop_update) {
					response.effect = 'scene:update-scene_child-prop'
					response.data = execution_effects.scene_child_prop_update
				}
				if (execution_effects.scene_child_ui_prop_update) {
					response.effect = 'scene:update-scene_child-ui-prop'
					response.data = execution_effects.scene_child_ui_prop_update
				}

				return response
			} else {
				const response: IComunicationResponse = {
					deferred_id: comunication.deferred_id,
					type: 'response',
					command: comunication.command,
					data: response_data,
				}

				return response
			}
		} catch (e) {
			const response: IComunicationResponse = {
				deferred_id: comunication.deferred_id,
				type: 'response-unresolved',
				command: comunication.command,
				data: e,
			}
			return response
		}
	}
}

export default Executor
