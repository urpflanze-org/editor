import { v1 as uuidv1 } from 'uuid'

import { vec2 } from 'gl-matrix'

import {
	SceneChildUtilitiesData,
	bValueVertexCallback,
	composeVertexCallback,
	TAnimation,
	TSceneChildUtilitiesSettings,
	TSettingsExtendedKeys,
	bValueLoop,
	composeLoop,
	bValueAnimation,
	bPropInSceneChildUtilitiesData,
	bValueTransformable,
	getTransformedValue,
} from 'urpflanze-ext'
import {
	SceneChild,
	Line,
	Triangle,
	Rect,
	Polygon,
	Circle,
	Rose,
	Spiral,
	Lissajous,
	SuperShape,
	Group,
	Shape,
	ShapeBuffer,
	Scene,
	ShapeBase,
	ShapePrimitive,
	ISceneChildProps,
	ShapeLoop,
	ShapeRecursive,
} from '@urpflanze/core/dist/cjs'

type SceneChildInstance = new (props: any) => SceneChild

/**
 *
 * @category Services.Scene Utilities
 * @class SceneUtilities
 */
class SceneUtilitiesInstance {
	private registeredSceneChilds: { [type: string]: SceneChildInstance } = {}

	constructor() {
		this.registeredSceneChilds = {
			Line,
			Triangle,
			Rect,
			Polygon,
			Circle,
			Rose,
			Spiral,
			Lissajous,
			SuperShape,
			Group,
			Shape,
			ShapeRecursive,
			ShapeLoop,
			ShapeBuffer,
		}
	}

	//#region Register scene child

	/**
	 * Return a list of name of registered sceneChild
	 *
	 * @returns {Array<string>}
	 * @memberof SceneUtilities
	 */
	public getRegistered(): Array<string> {
		return Object.keys(this.registeredSceneChilds)
	}

	/**
	 * Register scene child for fast creation
	 *
	 * @param {string} type
	 * @param {SceneChildInstance} ref
	 * @memberof SceneUtilities
	 */
	public register(type: string, ref: SceneChildInstance) {
		if (!(type in this.registeredSceneChilds)) {
			this.registeredSceneChilds[type] = ref
		} else {
			console.warn(`SceneUtilities: SceneChild "${type}" is already registered`)
		}
	}

	/**
	 * unregister scene child
	 *
	 * @param {string} type
	 * @memberof SceneUtilities
	 */
	public unregister(type: string) {
		if (type in this.registeredSceneChilds) {
			delete this.registeredSceneChilds[type]
		} else {
			console.warn(`SceneUtilities: SceneChild "${type}" is not registered`)
		}
	}

	//#endregion

	//#region Scene manipulation

	/**
	 * Logic creation of a SceneChild
	 * Since scene is not passed, name are set if they are present in args or type
	 *
	 *
	 * @param {(string | SceneChild)} item
	 * @param {TSceneChildUtilitiesSettings} [setting]
	 * @param {Scene} [scene]
	 * @returns {(SceneChild | null)}
	 * @memberof SceneUtilities
	 */
	create(item: string | SceneChild, settings?: TSceneChildUtilitiesSettings, scene?: Scene): SceneChild | null {
		scene = scene ? scene : typeof item !== 'string' ? item.scene : undefined

		if (item instanceof SceneChild) {
			this.getChildren(item).forEach(child => this.create(child, undefined, scene))
			return item
		}

		if (item in this.registeredSceneChilds) {
			if (!settings) settings = {}

			settings.id = settings.id || uuidv1()
			if (!settings.name && scene) settings.name = item + '_' + (this.getCountSceneChildOfType(scene, item) + 1)

			if (!settings.data) settings.data = {}
			if (!('props' in settings.data)) settings.data.props = {}
			if (!('style' in settings.data)) settings.data.style = {}
			if (!('visible' in settings.data)) settings.data.visible = true
			// if (!('highlighted' in settings.data)) settings.data.highlighted = false
			// if (!('disableGhost' in settings.data)) settings.data.disableGhost = false

			// if (item === 'ShapeLoop') {
			// 	if (!('loop' in settings)) settings.loop = { start: 0, end: Math.PI * 2, inc: (Math.PI * 2) / 20 }
			// }
			const sceneChild: SceneChild = new this.registeredSceneChilds[item](settings) as SceneChild

			if (sceneChild && scene && this.isAPrimitive(sceneChild)) {
				this.set(
					sceneChild,
					'sideLength',
					// { type: 'transformable-prop', value: SceneChildUtilitiesData.sideLength?.default },
					SceneChildUtilitiesData.sideLength?.default,
					scene
				)
				// this.setProp(
				// 	sceneChild,
				// 	'sideLength',
				// 	{ type: 'transformable-prop', value: SceneChildUtilitiesData.sideLength?.default },
				// 	scene
				// )
			}

			this.getChildren(sceneChild).forEach(child => this.create(child))

			return sceneChild
		}

		console.warn(`SceneUtilities: Creation failed. SceneChild "${item}" is not registered`)

		return null
	}

	/**
	 * Return number of element from a type
	 *
	 * @param {Scene} scene
	 * @param {string} type
	 * @returns {number}
	 * @memberof SceneUtilities
	 */
	getCountSceneChildOfType(scene: Scene, type: string): number {
		let count = 0

		Scene.walk(sceneChild => {
			count += sceneChild.type == type ? 1 : 0
		}, scene)

		return count
	}

	/**
	 * Return a copy of sceneChild
	 *
	 * @param {SceneChild} sceneChild
	 * @param {Scene} [scene]
	 * @param {boolean} [strict]
	 * @returns {(SceneChild | null)}
	 * @memberof SceneUtilities
	 */
	copy(sceneChild: SceneChild, scene?: Scene, strict = false): SceneChild | null {
		// copy only props, without name, id
		const setting: TSceneChildUtilitiesSettings = sceneChild.getProps()

		if (sceneChild instanceof ShapeBase) {
			// TODO: shapeUseParent
			// setting.bUseParent = sceneChild.bUseParent
			// setting.bUseRecursion = sceneChild.bUseRecursion
		}

		if (sceneChild instanceof ShapeBuffer) {
			setting.shape = sceneChild.shape instanceof Float32Array ? sceneChild.shape.slice() : sceneChild.shape
		}

		if (sceneChild instanceof ShapePrimitive) {
			setting.bClosed = sceneChild.bClosed
			setting.vertexCallback = sceneChild.vertexCallback
		}

		if (sceneChild instanceof ShapeLoop) {
			setting.loopDependencies = sceneChild.loopDependencies
		}

		if (sceneChild instanceof ShapeBuffer) {
			setting.adaptMode = sceneChild.adaptMode
		}

		if (strict) {
			setting.id = sceneChild.id
			setting.name = sceneChild.name
			setting.order = sceneChild.order
			setting.data = JSON.parse(JSON.stringify(sceneChild.data || {}))
		}

		const copied: SceneChild | null = this.create(sceneChild.type, setting, scene)

		if (copied) {
			if (sceneChild instanceof Group) {
				sceneChild.getChildren().forEach((child: SceneChild) => {
					const copiedChild: SceneChild | null = this.copy(child, scene)
					copiedChild && (copied as Group).add(copiedChild)
				})
			} else if (sceneChild instanceof Shape && copied instanceof Shape && sceneChild.shape) {
				const copiedShape: SceneChild | null = this.copy(sceneChild.shape, scene)
				copiedShape && (copied.shape = copiedShape)
			} else if (sceneChild instanceof ShapeBuffer && copied instanceof ShapeBuffer && sceneChild.shape) {
				copied.setShape(sceneChild.shape)
			}

			return copied
		}

		console.warn(`SceneUtilities: Copy failed.`, sceneChild)

		return null
	}

	/**
	 * Add scene child to parent.
	 * Create a group if parent is Shape and has one element (not Group) inside.
	 *
	 * @param {(SceneChild | Scene)} parent
	 * @param {(string | SceneChild)} sceneChild
	 * @param {TSceneChildUtilityProps} [props]
	 * @param {Scene} [scene]
	 * @returns {(SceneChild | null)}
	 * @memberof SceneUtilities
	 */
	add(
		parent: SceneChild | Scene,
		sceneChild: string | SceneChild,
		settings?: TSceneChildUtilitiesSettings,
		scene?: Scene
	): SceneChild | null {
		let newSceneChild: SceneChild | null = null

		if (parent instanceof Group || parent instanceof Scene) {
			newSceneChild = this.create(sceneChild, settings, scene)
			newSceneChild && parent.add(newSceneChild)
		} else if (parent instanceof Shape) {
			if (parent.shape == undefined) {
				newSceneChild = this.create(sceneChild, settings, scene)
				newSceneChild && parent.setShape(newSceneChild)
			} else if (parent.shape instanceof ShapeBase) {
				newSceneChild = this.create(sceneChild, settings, scene)

				if (newSceneChild) {
					const newGroup = this.create('Group', undefined, scene) as Group
					const sibling = parent.shape as Shape

					this.remove(parent, sibling)
					parent.setShape(newGroup)

					newGroup.add(sibling)
					newGroup.add(newSceneChild)
				}
			} else if (parent.shape instanceof Group) {
				this.add(parent.shape, sceneChild, undefined, scene)
			}
		}

		return newSceneChild
	}

	/**
	 * Remove scene child from
	 *
	 * @param {SceneChild} from
	 * @param {SceneChild} [item]
	 * @memberof SceneUtilities
	 */
	remove(from: SceneChild, item?: SceneChild): void {
		if (!item) {
			// 'from' as item to remove
			if (from.scene) {
				const parent = this.getParent(from)
				!parent ? from.scene.removeFromId(from.id) : this.remove(parent, from)
			} else {
				console.warn(`SceneUtilities: Remove failed. SceneChild is not added into scene`, from)
			}
		} else {
			if (from instanceof Group) from.removeFromId(item.id)
			else if (from instanceof Shape) from.setShape(undefined)
		}
	}

	//#endregion

	//#region Scene parent and children

	/**
	 * Get Root parent
	 *
	 * @param {SceneChild} sceneChild
	 * @returns {(SceneChild | null)}
	 * @memberof SceneUtilities
	 */
	getRootParent(sceneChild: SceneChild): SceneChild | null {
		const parents = this.getParents(sceneChild)
		return parents.length > 0 ? parents[0] : null
	}

	/**
	 * Get first level parent
	 *
	 * @param {SceneChild} sceneChild
	 * @returns {(SceneChild | null)}
	 * @memberof SceneUtilities
	 */
	getParent(sceneChild: SceneChild): SceneChild | null {
		const parents = this.getParents(sceneChild)
		return parents.length > 0 ? parents[parents.length - 1] : null
	}

	/**
	 * Get all parents
	 *
	 * @param {SceneChild} sceneChild
	 * @returns {Array<SceneChild>}
	 * @memberof SceneUtilities
	 */
	getParents(sceneChild: SceneChild): Array<SceneChild> {
		return sceneChild && sceneChild.scene ? sceneChild.scene.getParentsOfSceneChild(sceneChild) : []
	}

	/**
	 * Return children of a shape.
	 * Only Group has array of children, Shape has only one child.
	 *
	 * @param {SceneChild} sceneChild
	 * @returns {Array<SceneChild>}
	 * @memberof SceneUtilities
	 */
	getChildren(sceneChild: SceneChild): Array<SceneChild> {
		if (sceneChild instanceof Group) return sceneChild.getChildren()

		return sceneChild instanceof Shape && sceneChild.shape ? [sceneChild.shape] : []
	}

	/**
	 * Return only primitive children
	 *
	 * @param {SceneChild} sceneChild
	 * @returns {Array<SceneChild>}
	 * @memberof SceneUtilities
	 */
	getChildrenPrimitives(sceneChild: SceneChild): Array<ShapePrimitive> {
		let result: Array<ShapePrimitive> = []

		const children: Array<SceneChild> = this.getChildren(sceneChild)

		for (let i = 0, len = children.length; i < len; i++) {
			if (children[i] instanceof ShapePrimitive) result.push(children[i] as ShapePrimitive)
			else result = result.concat(...this.getChildrenPrimitives(children[i]))
		}

		return result
	}

	/**
	 * Return a list of neighbors
	 *
	 * @param {SceneChild} sceneChild
	 * @returns {(Array<SceneChild>)}
	 * @memberof SceneUtilities
	 */
	getNeighbors(sceneChild: SceneChild): Array<SceneChild> {
		if (sceneChild.scene) {
			const parent = this.getParent(sceneChild)

			return parent == null ? sceneChild.scene.getChildren() : this.getChildren(parent)
		}

		return []
	}

	/**
	 * Return a number of element type into a scene
	 *
	 * @param {Scene} scene
	 * @param {string} type
	 * @returns {number}
	 * @memberof SceneUtilities
	 */
	getCountOfSceneChildType(scene: Scene, type: string): number {
		let count = 0
		Scene.walk(sceneChild => {
			count += sceneChild.type == type ? 1 : 0
		}, scene)
		return count
	}

	// /**
	//  * Walk through sceneChild
	//  *
	//  * @param {SceneChild} sceneChild
	//  * @param {(child: SceneChild) => void} callback
	//  * @memberof SceneUtilities
	//  */
	// walk(sceneChild: SceneChild, callback: (child: SceneChild) => void) {
	// 	callback(sceneChild)

	// 	this.getChildren(sceneChild).forEach(child => callback(child))
	// }

	//#endregion

	//#region checker

	/**
	 * Check sceneChild is Group
	 *
	 * @param {SceneChild} sceneChild
	 * @returns {boolean}
	 * @memberof SceneUtilities
	 */
	isGroup(sceneChild: SceneChild): boolean {
		return sceneChild instanceof Group
	}

	/**
	 * Check sceneChild are Shape and has a child
	 *
	 * @param {SceneChild} sceneChild
	 * @returns {boolean}
	 * @memberof SceneUtilities
	 */
	hasShapeChild(sceneChild: SceneChild): boolean {
		return sceneChild instanceof Shape ? sceneChild.shape !== undefined : false
	}

	/**
	 * Check sceneChild is a ShapeBuffer an are binded
	 *
	 * @param {SceneChild} sceneChild
	 * @returns {boolean}
	 * @memberof SceneUtilities
	 */
	hasShapeBuffer(sceneChild: SceneChild): boolean {
		return sceneChild instanceof ShapeBuffer
	}

	/**
	 * Check scene child is a Primitive
	 *
	 * @param {SceneChild} sceneChild
	 * @returns {boolean}
	 * @memberof SceneUtilities
	 */
	isAPrimitive(sceneChild: SceneChild): boolean {
		return sceneChild instanceof ShapePrimitive
	}

	/**
	 * Check scene child is a ShapeLoop
	 *
	 * @param {SceneChild} sceneChild
	 * @returns {boolean}
	 * @memberof SceneUtilities
	 */
	hasLoop(sceneChild: SceneChild): boolean {
		return sceneChild instanceof ShapeLoop
	}

	//#endregion

	set(sceneChild: SceneChild, name: keyof typeof SceneChildUtilitiesData, value: any, scene: Scene): void {
		switch (SceneChildUtilitiesData[name].dataType) {
			case 'props':
				return this.setProp(sceneChild, name, value, scene)
			case 'drawer':
				return this.setDrawerProp(sceneChild, name, value, scene)
			case 'settings':
				return this.setSetting(sceneChild, name as TSettingsExtendedKeys, value, scene)
		}
	}
	/**
	 * Set prop: convert animation or transformable props
	 *
	 * @static
	 * @param {SceneChild} sceneChild
	 * @param {TSceheChildUtilityPropValue} value
	 * @param {Scene} scene
	 * @memberof SceneUtilities
	 */
	setProp(sceneChild: SceneChild, name: keyof typeof SceneChildUtilitiesData, value: any, scene: Scene): void {
		if (typeof sceneChild.data === 'undefined') {
			sceneChild.data = { props: {} }
		} else if (typeof sceneChild.data.props === 'undefined') {
			sceneChild.data.props = {}
		}

		sceneChild.clearBuffer(true, true)

		// Check LoopAnimation
		if (name === 'loop') {
			if (sceneChild instanceof ShapeLoop && bValueLoop(value)) {
				const shapeLoopAnimation = value
				sceneChild.data.props.loop = value
				sceneChild.setProp('loop', composeLoop(shapeLoopAnimation))

				// Set loopDependencies
				const dynamic = shapeLoopAnimation.dynamyc
				const realDynamic = (sceneChild as ShapeLoop).loopDependencies.indexOf('propArguments') >= 0

				if (dynamic !== realDynamic) {
					const dependencies = [...(sceneChild as ShapeLoop).loopDependencies]
					if (dynamic) !(dependencies.indexOf('propArguments') >= 0) && dependencies.push('propArguments')
					else
						dependencies.indexOf('propArguments') >= 0 && dependencies.splice(dependencies.indexOf('propArguments', 1))
					;(sceneChild as ShapeLoop).loopDependencies = dependencies
				}
			}
			return
		}

		// Check Animation
		if (bValueAnimation(value)) {
			sceneChild.data.props[name] = value
			// TODO: apply animation
			// sceneChild.setProp(name as keyof ISceneChildProps, Animation.composeAnimation(scene, name, value as TAnimation))
			return
		}

		// Check Transormable prop
		// if (bPropInSceneChildUtilitiesData(name) && bValueTransformable(value)) {
		// 	sceneChild.data.props[name] = value
		// 	;(sceneChild as ShapePrimitive).setProp(name as keyof ISceneChildProps, getTransformedValue(scene, name, value))
		// 	return
		// }

		// Otherwise, set prop without transformation
		//Equivalent of: if (name in SceneChildPropsData && SceneChildPropsData[name].transformation !== 'none')
		sceneChild.setProp(name as keyof ISceneChildProps, value as number | [number, number], true)
		delete sceneChild.data.props[name]

		// Not set to data because exporter override sceneChild.data.props on sceneChild.props (default)
		//sceneChild.data.props[name] = value
	}

	/**
	 * Set prop, convert raw function, animation on transformable prop
	 *
	 * @static
	 * @param {SceneChild} sceneChild
	 * @param {TDrawerPropsExtendedKeys} name
	 * @param {*} value
	 * @param {Scene} scene
	 * @memberof SceneUtilities
	 */
	setDrawerProp(sceneChild: SceneChild, name: any, value: any, scene: Scene): void {
		if (this.isAPrimitive(sceneChild)) {
			if (typeof sceneChild.data === 'undefined') {
				sceneChild.data = { drawer: {} }
			} else if (typeof sceneChild.data.drawer === 'undefined') {
				sceneChild.data.drawer = {}
			}

			if (bValueAnimation(value)) {
				sceneChild.data.drawer[name] = value
				// TODO: apply animation
				// ;(sceneChild as ShapePrimitive).drawer[name] = Animation.composeAnimation(scene, name, value as TAnimation)
				return
			}

			// Check Transormable prop
			if (bPropInSceneChildUtilitiesData(name) && bValueTransformable(value)) {
				sceneChild.data.drawer[name] = value

				//@ts-ignore
				;(sceneChild as ShapePrimitive).drawer[name] = getTransformedValue(scene, name, value)
				return
			}

			// Otherwise, set prop without transformation
			//Equivalent of: if (name in SceneChildPropsData && SceneChildPropsData[name].transformation !== 'none')
			// @ts-ignore
			sceneChild.drawer[name] = value
			delete sceneChild.data.drawer[name]
		}
	}

	/**
	 * TODO:
	 * Set Args (props, drawer, other settings)
	 * SceneChildPropData refactoring
	 */
	setSetting(sceneChild: SceneChild, name: TSettingsExtendedKeys, value: any, scene: Scene): void {
		sceneChild.clearBuffer(true, true)

		if (name === 'vertexCallback') {
			if (sceneChild instanceof ShapeBase && bValueVertexCallback(value)) {
				sceneChild.data.vertexCallback = value
				sceneChild.vertexCallback = composeVertexCallback(value)
				// If shape is static vertexCallback has no effect
				// sceneChild.bUseParent = true
			}
			return
		}

		switch (name) {
			case 'bUseParent':
				// if (sceneChild instanceof ShapeBase) sceneChild.bUseParent = value as boolean
				break
			case 'bUseRecursion':
				// if (sceneChild instanceof ShapeBase) sceneChild.bUseRecursion = value as boolean
				break
			case 'bClosed':
				if (sceneChild instanceof ShapePrimitive) sceneChild.setClosed(value as boolean)
				break
			case 'adaptMode':
				// if (sceneChild instanceof ShapePrimitive) sceneChild.adapt(value as EShapePrimitiveAdaptMode)
				break
			default:
				if (typeof sceneChild[name] !== 'undefined') {
					//@ts-ignore
					sceneChild[name] = value
				}

				break
		}
	}
}

const SceneUtilities = new SceneUtilitiesInstance()

export { SceneUtilities }
