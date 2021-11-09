import { Scene, SceneChild } from '@urpflanze/core/dist/cjs'
import { v1 as uuidv1 } from 'uuid'
import npmPkg from '../../../package.json'
import { UIDrawerCanvas, SceneUtilities } from 'urpflanze-ext'
import { IProject, IProjectSceneChild, TProjectSceneChildProps, TProjectDrawerProps } from './types'
import { parseFunction } from 'utilities'
import { IBrowserDrawerCanvasOptions } from '@urpflanze/drawer-canvas'

/**
 *
 * @category Services.Export/Import
 * @class JSONImporter
 */
export class JSONImporter {
	/**
	 * Empty project with default value
	 *
	 * @static
	 */
	static createEmptyProject = (): IProject => {
		return {
			id: uuidv1(),
			urpflanze_version: npmPkg.version,
			name: '',

			width: 600,
			height: 600,
			resolution: 600,
			background: '#000',
			color: '#fff',

			clear: true,
			ghosts: 0,
			ghostSkipTime: 30,

			scene: {},

			sequence: {
				duration: 6000,
				framerate: 60,
			},
		}
	}

	/**
	 * Parse string to DrawerCanvas
	 *
	 * @static
	 * @param {string} project_json
	 * @returns {(UIDrawerCanvas | null)}
	 */
	static parse(project_json: string): UIDrawerCanvas | null {
		if (!project_json) return null

		const parsed: Partial<IProject> = project_json && project_json.length > 0 ? JSON.parse(project_json) : {}

		if (!('scene' in parsed)) return null

		const emptyProject: IProject = JSONImporter.createEmptyProject()

		const project: IProject = {
			id: parsed.id ?? emptyProject.id,
			urpflanze_version: parsed.urpflanze_version ?? emptyProject.urpflanze_version,
			name: parsed.name ?? emptyProject.name,
			width: parsed.width ?? emptyProject.width,
			height: parsed.height ?? emptyProject.height,
			resolution: parsed.resolution ?? emptyProject.resolution,
			background: parsed.background ?? emptyProject.background,
			color: parsed.color ?? emptyProject.color,

			clear: parsed.clear ?? emptyProject.clear,
			ghosts: parsed.ghosts ?? emptyProject.ghosts,
			ghostSkipTime: parsed.ghostSkipTime ?? emptyProject.ghostSkipTime,
			ghostSkipFunction: parsed.ghostSkipFunction ?? emptyProject.ghostSkipFunction,
			// ratio: parsed.ratio ?? emptyProject.ratio,

			scene: parsed.scene || emptyProject.scene,

			sequence: { ...emptyProject.sequence, ...parsed.sequence },
		}

		const drawOptions: IBrowserDrawerCanvasOptions = {
			clear: project.clear,
			ghosts: project.ghosts,
			ghostSkipTime: parseFunction.unparse(project.ghostSkipTime),
			sceneFit: 'cover',
		}

		const scene = new Scene({
			color: project.color,
			background: project.background,
			width: project.width,
			height: project.height,
		})
		const drawer = new UIDrawerCanvas(scene, undefined, drawOptions)

		const timeline = drawer.timeline
		timeline.setSequence(project.sequence.duration, project.sequence.framerate)

		const sceneChilds: Array<IProjectSceneChild> = Object.values(project.scene || [])

		for (let i = 0, len = sceneChilds.length; i < len; i++) {
			const sceneChild = JSONImporter.parseSceneChild(sceneChilds[i], scene)
			sceneChild && scene.add(sceneChild)
		}

		return drawer
	}

	static parseSceneChild(projectSceneChild: IProjectSceneChild, scene: Scene): SceneChild | null {
		const shape: Float32Array | undefined =
			typeof projectSceneChild.shape !== 'undefined'
				? Float32Array.from(Object.values(projectSceneChild.shape) as Array<number> | Float32Array)
				: undefined

		const settings = {
			id: projectSceneChild.id,
			name: projectSceneChild.name,
			order: projectSceneChild.order,
			// data: projectSceneChild.data,
			bUseParent: projectSceneChild.bUseParent,
			bUseRecursion: projectSceneChild.bUseRecursion,
			adaptMode: projectSceneChild.adaptMode,
			bClosed: projectSceneChild.bClosed,
			shape: shape,
		}

		const sceneChild = SceneUtilities.create(projectSceneChild.type, settings)

		if (sceneChild) {
			const props: TProjectSceneChildProps = { ...projectSceneChild.props }
			const propKeys = Object.keys(props) as Array<keyof TProjectSceneChildProps>
			propKeys.forEach(propKey => {
				SceneUtilities.setProp(sceneChild, propKey, parseFunction.unparse(props[propKey]), scene)
			})

			const drawer: TProjectDrawerProps = { ...projectSceneChild.drawer }
			const drawerKeys = Object.keys(drawer) as Array<keyof TProjectDrawerProps>
			drawerKeys.forEach(styleKey => {
				SceneUtilities.setDrawerProp(sceneChild, styleKey, parseFunction.unparse(drawer[styleKey]), scene)
			})

			if (typeof projectSceneChild.vertexCallback !== 'undefined')
				SceneUtilities.setSetting(sceneChild, 'vertexCallback', projectSceneChild.vertexCallback, scene)

			if (projectSceneChild.children && projectSceneChild.children.length > 0) {
				for (let i = 0, len = projectSceneChild.children.length; i < len; i++) {
					const child = JSONImporter.parseSceneChild(projectSceneChild.children[i], scene)
					child && SceneUtilities.add(sceneChild, child)
				}
			}

			return sceneChild
		}

		console.warn(`[Urpflanze:JSONImporter] can't import`, projectSceneChild)

		return null
	}
}
