import { Scene, SceneChild, ShapePrimitive, ShapeBuffer, ShapeBase, Shape, Group } from '@urpflanze/core/dist/cjs'
import { Timeline } from '@urpflanze/drawer-canvas/dist/cjs'
import { UIDrawerCanvas } from 'urpflanze-ext'
import {
	SceneChildUtilitiesData,
	TSceneChildPropsDataKeys,
} from 'urpflanze-ext/scene-utilities/SceneChildUtilitiesData'
import { SceneUtilities } from 'urpflanze-ext'
import { parseFunction } from 'utilities'
import { JSONImporter } from './importer'
import { IProject, IProjectSceneChild, TProjectSceneChildProps, TProjectDrawerProps } from './types'

/**
 *
 * @category Services.Export/Import
 * @class JSONExporter
 */
export class JSONExporter {
	static parse(drawer: UIDrawerCanvas, name = 'EmptyProject'): string {
		return JSONExporter.toString(JSONExporter.parseAsProject(drawer, name))
	}

	static toString(project: IProject): string {
		return JSON.stringify(project)
	}

	static parseAsProject(drawer: UIDrawerCanvas, name = 'EmptyProject'): IProject {
		const timeline: Timeline = drawer.timeline

		const project = JSONImporter.createEmptyProject()

		project.name = name

		project.clear = drawer.getOption('clear', true) as boolean
		project.ghosts = drawer.getOption('ghosts', 0) as number
		project.ghostSkipTime = drawer.getOption('ghostSkipTime', undefined)
		project.ghostSkipFunction = parseFunction.parse(drawer.getOption('ghostSkipFunction', undefined))

		// project.ratio = drawer.getRatio()

		const { duration, framerate } = timeline.getSequence()
		project.sequence = { duration, framerate }

		project.scene = {}

		const scene: Scene | undefined = drawer.getScene()
		if (scene) {
			project.width = scene.width
			project.height = scene.height
			// project.resolution = drawer.getResolution()
			project.color = scene.color
			project.background = scene.background

			const sceneChilds: Array<SceneChild> = scene.getChildren()

			for (let i = 0, len = sceneChilds.length; i < len; i++) {
				project.scene[sceneChilds[i].id] = JSONExporter.parseSceneChild(sceneChilds[i])
			}
		}
		return project
	}

	private static filterDataTye<T>(data: T, dataType: 'props' | 'drawer'): T {
		const filtered: Partial<T> = {}

		const keys = Object.keys(data)
		for (let i = 0; i < keys.length; i++) {
			const name = keys[i]

			if (
				name in SceneChildUtilitiesData &&
				SceneChildUtilitiesData[name as TSceneChildPropsDataKeys].dataType === dataType
			) {
				filtered[name as keyof T] = data[name as keyof T]
			}
		}
		return filtered as T
	}

	static parseSceneChild(sceneChild: SceneChild, parentId?: string | number, depth = 0): IProjectSceneChild {
		const projectSceneChild: IProjectSceneChild = {
			id: sceneChild.id + '',
			type: sceneChild.type,
			name: sceneChild.name,
			order: sceneChild.order as number,
			data: { ...JSON.parse(JSON.stringify(sceneChild.data)), props: undefined, drawer: undefined },
			// data: {},
			depth,
			bPrimitive: sceneChild instanceof ShapePrimitive,
			props: {},
			drawer: {},
			parentId,
		}

		Object.entries(sceneChild.getProps()).forEach(([key, value]) => {
			if (
				key in SceneChildUtilitiesData &&
				SceneChildUtilitiesData[key as TSceneChildPropsDataKeys].dataType === 'props'
			) {
				projectSceneChild.props[key as keyof TProjectSceneChildProps] =
					sceneChild.data.props[key] || parseFunction.parse(value)
			}
		})
		// const props = sceneChild.getProps()
		// const propsKeys = Object.keys(props) as Array<keyof ISceneChildProps>
		// for (let i = 0, len = propsKeys.length; i < len; i++) {
		// 	const propName = propsKeys[i]
		// 	if (
		// 		propName in SceneChildUtilitiesData &&
		// 		SceneChildUtilitiesData[propName as TSceneChildPropsDataKeys].dataType === 'props'
		// 	) {
		// 		projectSceneChild.props[propName] = sceneChild.data.props[propName] || parseFunction.parse(props[propName])
		// 	}
		// }

		// for (let i = 0, len = propsKeys.length; i < len; i++) props[propsKeys[i]] = parseFunction.parse(props[propsKeys[i]])
		// projectSceneChild.props = JSONExporter.filterDataTye({ ...props, ...sceneChild.data.props }, 'props')

		if (sceneChild instanceof ShapeBuffer) {
			projectSceneChild.shape = sceneChild.shape instanceof Float32Array ? sceneChild.shape.slice() : sceneChild.shape
		}

		if (sceneChild instanceof ShapeBase) {
			// TODO: use parent
			// projectSceneChild.bUseParent = sceneChild.bUseParent
			// projectSceneChild.bUseRecursion = sceneChild.bUseRecursion
			projectSceneChild.vertexCallback = parseFunction.parse(
				sceneChild.data.vertexCallback || sceneChild.vertexCallback
			)
		}

		if (sceneChild instanceof ShapePrimitive) {
			Object.entries(sceneChild.drawer).forEach(([key, value]) => {
				if (
					key in SceneChildUtilitiesData &&
					SceneChildUtilitiesData[key as TSceneChildPropsDataKeys].dataType === 'drawer'
				) {
					projectSceneChild.drawer[key as keyof TProjectDrawerProps] =
						sceneChild.data.drawer[key] || parseFunction.parse(value)
				}
			})
			// const style = sceneChild.style
			// const styleKeys = Object.keys(style) as Array<keyof IDrawerStreamProps>
			// for (let i = 0, len = styleKeys.length; i < len; i++)
			// 	style[styleKeys[i]] = parseFunction.parse(style[styleKeys[i]])

			// projectSceneChild.style = JSONExporter.filterDataTye({ ...style, ...sceneChild.data.style }, 'drawer')

			// TODO: adapt mode
			// projectSceneChild.adaptMode = sceneChild.adaptMode
			projectSceneChild.bClosed = sceneChild.bClosed
		} else if (sceneChild instanceof Shape || sceneChild instanceof Group) {
			const children: Array<IProjectSceneChild> = []
			const shapeChildren = SceneUtilities.getChildren(sceneChild)

			for (let i = 0; i < shapeChildren.length; i++)
				children.push(JSONExporter.parseSceneChild(shapeChildren[i], sceneChild.id, depth + 1))

			projectSceneChild.children = children
		}

		return projectSceneChild
	}
}
