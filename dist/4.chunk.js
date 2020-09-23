;(window.webpackJsonp = window.webpackJsonp || []).push([
	[4],
	{
		384: function (e, t, n) {
			'use strict'
			var a = n(3),
				r = n.n(a),
				i = n(18),
				o = n(85),
				s = n(385),
				l = n(381),
				c = n(2),
				d = n(22)
			class u extends l.a {
				static generateImage(e, t = 800, n = 800, a, r) {
					const o = new i.a({ width: t, height: n, background: a, mainColor: r }),
						s = c.b.create(e)
					if (s) {
						const e = c.b.copy(s, o, void 0, !0)
						if (e) {
							o.add(e), o.update(0)
							const a = !0,
								r = u.adaptShapeToScene(e, o)
							return u.getSceneImage(o, t, n, a, r).then(e => (e.length ? e : '/assets/images/broken-shape.png'))
						}
					}
					return Promise.resolve('/assets/images/broken-shape.png')
				}
				static adaptShapeToScene(e, t, n = 1) {
					t.update(0)
					const a = d.a.getBounding(e.getBuffer())
					return (
						(a.width > t.width || a.height > t.height) &&
							(n = (Math.min(t.width, t.height) / Math.max(a.width, a.height)) * n),
						0.9 * n
					)
				}
				static getSceneImage(e, t = 800, n = 800, a = !1, r) {
					return new Promise(i => {
						if ('undefined' != typeof OffscreenCanvas) {
							const o = new OffscreenCanvas(t, n),
								s = o.getContext('2d')
							u.draw(e, s, { time: 0, fixedLineWidth: a, scale: r }, t),
								o.convertToBlob({ type: 'image/png', quality: 0.95 }).then(e => {
									const t = new FileReader()
									t.addEventListener('load', () => (t.result ? i(t.result) : i('')), { passive: !0 }),
										t.readAsDataURL(e)
								})
						} else {
							const o = document.createElement('canvas'),
								s = o.getContext('2d')
							;(o.width = t),
								(o.height = n),
								(o.style.width = t + 'px'),
								(o.style.height = n + 'px'),
								u.draw(e, s, { time: 0, fixedLineWidth: a, scale: r }, t),
								i(o.toDataURL())
						}
					})
				}
			}
			var m,
				p = u
			!(function (e) {
				;(e[(e.UNDO = 0)] = 'UNDO'), (e[(e.REDO = 1)] = 'REDO'), (e[(e.NONE = 2)] = 'NONE')
			})(m || (m = {}))
			var h = n(6)
			var g = class {
				constructor(e, t = {}, n = !1, a) {
					;(this.id = e), (this.preventPushToHistory = n || !1), (this.data = t), this.setDescriptor()
				}
				redo(e) {
					if (!this.passive) {
						if (this.status != m.REDO) {
							;(this.handleRedo(e) || !1) && (this.status = m.REDO)
						}
						return this.status
					}
					return (this.status = m.NONE)
				}
				undo(e) {
					if (!this.passive) {
						if (this.status != m.UNDO) {
							;(this.handleUndo(e) || !1) && (this.status = m.UNDO)
						}
						return this.status
					}
					return (this.status = m.NONE)
				}
				handleRedo(e) {
					return !1
				}
				handleUndo(e) {
					return !1
				}
				setDescriptor() {}
			}
			var v = class extends g {
				constructor() {
					super(...arguments),
						(this.slug = 'add'),
						(this.passive = !1),
						(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: [] })
				}
				handleRedo(e) {
					const t = e.getScene(),
						n = e.getDrawer(),
						a = c.b.create(
							this.data.type,
							{ id: this.data.added_id, name: this.data.added_name, order: this.data.added_order },
							t,
							n
						)
					if (a && null == t.find(this.data.added_id)) {
						if (
							((a.scene = t),
							this.data.props && Object.keys(this.data.props).forEach(e => c.a.setProp(a, e, this.data.props[e], n)),
							this.data.parent_id)
						) {
							const e = t.find(this.data.parent_id)
							if (!e) return !1
							c.b.add(e, a, void 0, t)
						} else t.add(a)
						return (
							(this.data.added_order = this.data.added_order || (null == a ? void 0 : a.order)),
							(this.data.added_name = this.data.added_name || (null == a ? void 0 : a.name)),
							(this.data.added_id = a.id),
							(this.effects.select_layer = [this.data.added_id]),
							!0
						)
					}
				}
				handleUndo(e) {
					const t = e.getScene()
					if (t.find(this.data.added_id))
						return t.removeFromId(this.data.added_id), (this.effects.select_layer = []), !0
				}
				setDescriptor() {
					this.data.parent_id
						? (this.descriptor = `add "${this.data.type}" to ${this.data.parent_id}`)
						: (this.descriptor = `add "${this.data.type}" to Scene`)
				}
			}
			var f = class extends g {
					constructor(e, t, n = !1, a) {
						super(e, t, n, a),
							(this.slug = 'remove'),
							(this.passive = !1),
							(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: [] }),
							(t = Array.isArray(t) ? t : [t])
						const r = a.getScene(),
							i = a.getDrawer()
						;(this.data = t
							.map(e => {
								var t
								const n = r.find(e)
								return n
									? {
											id: e,
											copied_sceneChild: c.b.copy(n, r, i, !0),
											parent_id: (null === (t = c.b.getParent(n)) || void 0 === t ? void 0 : t.id) || null,
									  }
									: null
							})
							.filter(e => !!e)
							.sort((e, t) => (e && t ? e.copied_sceneChild.order - t.copied_sceneChild.order : 0))),
							this.setDescriptor()
					}
					handleRedo(e) {
						let t = !1
						return (
							this.data.forEach(n => {
								const a = e.getScene().find(n.id)
								a && (c.b.remove(a), (t = !0))
							}),
							t
						)
					}
					handleUndo(e) {
						let t = !1
						return (
							this.data.forEach(n => {
								if (n.copied_sceneChild && !e.getScene().find(n.id)) {
									const a = n.copied_sceneChild,
										r = n.parent_id ? e.getScene().find(n.parent_id) : null
									n.parent_id && r ? (c.b.add(r, a), (t = !0)) : null == n.parent_id && (e.getScene().add(a), (t = !0))
								}
							}),
							t
						)
					}
					setDescriptor() {
						var e
						this.data.length >= 0
							? (this.descriptor = `remove "${
									null === (e = this.data[0].copied_sceneChild) || void 0 === e ? void 0 : e.id
							  }"`)
							: (this.descriptor = `remove "${this.data.length}" scenechild`)
					}
				},
				b = n(17)
			var y = class extends g {
				constructor(e, t, n = !1, a) {
					super(e, Array.isArray(t) ? t : [t], n, a),
						(this.slug = 'set-prop'),
						(this.passive = !1),
						(this.effects = {
							scene_update: !0,
							scene_child_prop_update: this.data.map(e => ({ id: e.id, name: e.name, value: e.value })),
						}),
						this.setDescriptor(a)
				}
				handleRedo(e) {
					let t = !1,
						n = 0
					return (
						this.data.forEach(({ id: a, name: r, value: i }) => {
							const o = e.getScene().find(a)
							if (o && this.effects.scene_child_prop_update) {
								c.a.setProp(o, r, i, e.getDrawer()),
									(this.effects.scene_child_prop_update[n++].value = i),
									o instanceof b.a &&
										c.b.getChildren(o).forEach(e => {
											this.effects.scene_child_prop_update[n++] = { id: e.id, name: r, value: i }
										})
								const a = c.b.getParent(o)
								a &&
									a instanceof b.a &&
									(a.setPropUnsafe(r, void 0),
									(this.effects.scene_child_prop_update[n++] = { id: a.id, name: r, value: void 0 })),
									(t = t || !0)
							}
						}),
						t
					)
				}
				handleUndo(e) {
					let t = !1,
						n = 0
					return (
						this.data.forEach(({ id: a, name: r, prev_value: i }) => {
							const o = e.getScene().find(a)
							if (o && this.effects.scene_child_prop_update) {
								c.a.setProp(o, r, i, e.getDrawer()),
									(this.effects.scene_child_prop_update[n++].value = i),
									o instanceof b.a &&
										c.b.getChildren(o).forEach(e => {
											this.effects.scene_child_prop_update[n++] = { id: e.id, name: r, value: i }
										})
								const a = c.b.getParent(o)
								a &&
									a instanceof b.a &&
									(a.setPropUnsafe(r, i),
									(this.effects.scene_child_prop_update[n++] = { id: a.id, name: r, value: i })),
									(t = t || !0)
							}
						}),
						t
					)
				}
				setDescriptor(e) {
					var t
					if (1 == this.data.length) {
						const { name: n, id: a, prev_value: r, value: i } = this.data[0],
							o = (null === (t = null == e ? void 0 : e.getScene().find(a)) || void 0 === t ? void 0 : t.name) || a
						this.descriptor = `set prop "${n}" of "${o}" from "${r}" to "${i}"`
					} else this.descriptor = 'set multiple prop'
				}
			}
			var w = class extends g {
				constructor(e, t, n = !1, a) {
					super(e, Array.isArray(t) ? t : [t], n, a),
						(this.slug = 'set-prop'),
						(this.passive = !1),
						(this.effects = {
							scene_update: !0,
							scene_child_ui_prop_update: this.data.map(e => ({ id: e.id, name: e.name, value: e.value })),
						}),
						this.setDescriptor(a)
				}
				handleRedo(e) {
					let t = !1,
						n = 0
					return (
						this.data.forEach(({ id: a, name: r, value: i }) => {
							const o = e.getScene().find(a)
							o &&
								this.effects.scene_child_ui_prop_update &&
								((o.data[r] = i), (this.effects.scene_child_ui_prop_update[n++].value = i), (t = t || !0))
						}),
						t
					)
				}
				handleUndo(e) {
					let t = !1,
						n = 0
					return (
						this.data.forEach(({ id: a, name: r, prev_value: i }) => {
							const o = e.getScene().find(a)
							o &&
								this.effects.scene_child_ui_prop_update &&
								((o.data[r] = i), (this.effects.scene_child_ui_prop_update[n++].value = i), (t = t || !0))
						}),
						t
					)
				}
				setDescriptor(e) {
					var t
					if (1 == this.data.length) {
						const { name: n, id: a, prev_value: r, value: i } = this.data[0],
							o = (null === (t = null == e ? void 0 : e.getScene().find(a)) || void 0 === t ? void 0 : t.name) || a
						this.descriptor = `set ui prop "${n}" of "${o}" from "${r}" to "${i}"`
					} else this.descriptor = 'set multiple prop'
				}
			}
			var E = class extends g {
					constructor(e, t, n = !1, a) {
						super(e, t, n, a),
							(this.slug = 'make-shape'),
							(this.passive = !1),
							(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: [] }),
							(this.data = {
								ids: t,
								sceneChilds: t
									.map(e => a.getScene().find(e))
									.filter(e => null !== e)
									.sort((e, t) => e.order - t.order),
							})
					}
					hasSameParents(e) {
						if (e.length <= 1) return !0
						const t = e.map(e => c.b.getParent(e))
						let n = t[0]
						for (let e = 1, a = t.length; e < a; e++) {
							if (n != t[e]) return !1
							n = t[e]
						}
						return !0
					}
					handleRedo(e) {
						const t = e.getScene()
						if (this.data.sceneChilds.length > 0 && this.hasSameParents(this.data.sceneChilds)) {
							const n = this.data.sceneChilds,
								a = c.b.getParent(n[0]),
								r = c.b.create('Shape', { id: this.data.new_shape_id }, t)
							return (
								n.forEach(e => {
									c.b.remove(e), c.b.add(r, e, void 0, t)
								}),
								a ? c.b.add(a, r) : e.getScene().add(r),
								(this.data.parent_id = a ? a.id : null),
								(this.data.new_shape_id = r.id),
								(this.effects.select_layer = [this.data.new_shape_id]),
								!0
							)
						}
					}
					handleUndo(e) {
						const t = e.getScene()
						if (this.data.sceneChilds.length > 0 && this.data.new_shape_id) {
							t.removeFromId(this.data.new_shape_id)
							const e = this.data.parent_id ? t.find(this.data.parent_id) : null
							return (
								e ? this.data.sceneChilds.forEach(t => c.b.add(e, t)) : this.data.sceneChilds.forEach(e => t.add(e)),
								(this.effects.select_layer = this.data.sceneChilds.map(e => e.id)),
								!0
							)
						}
					}
					setDescriptor() {
						this.descriptor = 'make shape'
					}
				},
				x = n(65)
			var _ = class extends g {
				constructor(e, t, n, a = !1, r) {
					super(e, n, !0, r),
						(this.slug = 'move'),
						(this.passive = !1),
						(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: null }),
						(this.data = { id: n, move: t, sceneChild: r.getScene().find(n) }),
						this.setDescriptor()
				}
				handleRedo(e) {
					var t
					const n = e.getScene()
					if (this.data.sceneChild) {
						const e = c.b.getParent(this.data.sceneChild) || n
						if (e instanceof i.a || e instanceof b.a) {
							const n = c.b.getNeighbors(this.data.sceneChild),
								a = Object(x.indexOfObjectProperty)(n, 'id', this.data.sceneChild.id),
								r =
									'up' == this.data.move
										? a - 1
										: 'top' == this.data.move
										? 0
										: 'down' == this.data.move
										? a + 1
										: n.length - 1
							r >= 0 &&
								r < n.length &&
								((n[a].order = (null !== (t = n[r].order) && void 0 !== t ? t : 0) + (r > a ? 1 : -1)),
								e.sortChildren())
						}
						return !0
					}
				}
				handleUndo(e) {
					var t
					const n = e.getScene()
					if (this.data.sceneChild) {
						const e = c.b.getParent(this.data.sceneChild) || n
						if (e instanceof i.a || e instanceof b.a) {
							const n = c.b.getNeighbors(this.data.sceneChild),
								a = Object(x.indexOfObjectProperty)(n, 'id', this.data.sceneChild.id),
								r =
									'down' == this.data.move
										? a - 1
										: 'bottom' == this.data.move
										? 0
										: 'up' == this.data.move
										? a + 1
										: n.length - 1
							r >= 0 &&
								r < n.length &&
								((n[a].order = (null !== (t = n[r].order) && void 0 !== t ? t : 0) + (r > a ? 1 : -1)),
								e.sortChildren())
						}
						return !0
					}
				}
				setDescriptor() {
					this.descriptor = 'move ' + this.data.move
				}
			}
			var k = class extends _ {
				constructor(e, t, n = !1, a) {
					super(e, 'up', t, n, a), (this.slug = 'move-up')
				}
			}
			var O = class extends _ {
				constructor(e, t, n = !1, a) {
					super(e, 'down', t, n, a), (this.slug = 'move-down')
				}
			}
			var C = class extends _ {
				constructor(e, t, n = !1, a) {
					super(e, 'top', t, n, a), (this.slug = 'move-to-top')
				}
			}
			var j = class extends _ {
					constructor(e, t, n = !1, a) {
						super(e, 'bottom', t, n, a), (this.slug = 'move-to-bottom')
					}
				},
				$ = n(167),
				z = n.n($)
			function S(e, t) {
				const n = e.getBuffer()
				let a = null
				if (n) {
					const r = e.getProp('repetitions', void 0, 1),
						i = e.getSingleRepetitionBufferLength()
					let o = 0
					for (let e = 0; e < r; e++) {
						const r = i[e],
							s = new Array(r / 2)
						for (let e = 0, t = 0; e < r; e += 2, t++, o += 2) s[t] = { X: n[o], Y: n[o + 1] }
						a = a ? a[t](new z.a([s])) : new z.a([s])
					}
				}
				return a || new z.a([[]])
			}
			var M = class extends g {
				constructor() {
					super(...arguments),
						(this.slug = 'shape-operation'),
						(this.passive = !1),
						(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: [] })
				}
				handleRedo(e) {
					const t = e.getScene(),
						n = e.getDrawer(),
						a = t.find(this.data.a_id),
						r = t.find(this.data.b_id)
					if (a && r) {
						const e = a.getBuffer(),
							i = r.getBuffer()
						if (e && i && e.length > 0 && i.length > 0) {
							;(this.data.a = a), (this.data.b = r)
							const e = (function (e) {
								const t = Array.prototype.concat.apply([], e.paths),
									n = 2 * t.length,
									a = new Float32Array(n)
								for (let e = 0, r = 0; e < n; e += 2, r++) (a[e] = t[r].X), (a[e + 1] = t[r].Y)
								const r = d.a.getBounding(a),
									i = r.width > r.height ? 1 : r.width / r.height,
									o = r.width > r.height ? r.height / r.width : 1,
									s = e.paths.length,
									l = new Array(s)
								for (let t = 0; t < s; t++) {
									const n = e.paths[t],
										a = 2 * n.length,
										s = new Float32Array(a)
									for (let e = 0, t = 0; e < a; e += 2, t++)
										(s[e] = i * ((n[t].X - r.cx) / r.width) * 2), (s[e + 1] = o * ((n[t].Y - r.cy) / r.height) * 2)
									l[t] = s
								}
								return l
							})(S(a, this.data.type)[this.data.type](S(r, this.data.type)))
							if (e && e.length > 0) {
								const r = c.b.getParent(a)
								let i = null
								if (1 == e.length) i = c.b.create('ShapeBuffer', { shape: e[0] }, t, n)
								else {
									i = c.b.create('Shape', void 0, t)
									const a = c.a.getCountSceneChildOfType(t, 'ShapeBuffer') + 1
									if (i)
										for (let r = 0; r < e.length; r++) {
											const o = c.b.create('ShapeBuffer', { shape: e[r] }, t, n)
											o && c.b.add(i, o, { name: 'ShapeBuffer_' + (a + r) }, t)
										}
								}
								if (i)
									return (
										(this.data.new_id = i.id),
										r ? c.b.add(r, i, void 0, t) : t.add(i),
										t.removeFromId(this.data.a_id),
										t.removeFromId(this.data.b_id),
										(this.effects.select_layer = [this.data.new_id]),
										!0
									)
							}
						}
					}
					return !1
				}
				handleUndo(e) {
					const t = e.getScene()
					if (t.find(this.data.new_id)) {
						t.removeFromId(this.data.new_id)
						const e = this.data.a_parent_id ? t.find(this.data.a_parent_id) : null,
							n = this.data.b_parent_id ? t.find(this.data.b_parent_id) : null
						return (
							e ? c.b.add(e, this.data.a, void 0, t) : t.add(this.data.a),
							n ? c.b.add(n, this.data.b, void 0, t) : t.add(this.data.b),
							(this.effects.select_layer = [this.data.a_id, this.data.b_id]),
							!0
						)
					}
				}
				setDescriptor() {
					this.descriptor = `shape "${this.data.type}"`
				}
			}
			var A = class extends g {
				constructor() {
					super(...arguments),
						(this.slug = 'create-from-buffer'),
						(this.passive = !1),
						(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: [] })
				}
				handleRedo(e) {
					const t = e.getScene(),
						n = (function (e, t) {
							var n
							const a = e.getScene()
							let r = null
							if (t.length) {
								const i = null === (n = c.a.sceneChildProps.sideLength) || void 0 === n ? void 0 : n.default
								switch (t.length) {
									case 0:
										r = null
										break
									case 1:
										r = c.b.create('ShapeBuffer', { shape: t[0].buffer, sideLength: i, bCloseShape: t[0].closed }, a, e)
										break
									default:
										;(r = c.b.create('Shape', void 0, a, e)),
											r &&
												t.forEach((t, n) => {
													const o = c.b.create(
														'ShapeBuffer',
														{ shape: t.buffer, sideLength: i, order: n, bCloseShape: t.closed },
														a,
														e
													)
													o && c.b.add(r, o, void 0, a)
												})
								}
								r && a.add(r)
							}
							return r
						})(e.getDrawer(), this.data.buffers)
					if (n && null == t.find(this.data.added_id))
						return (this.data.added_id = n.id), (this.effects.select_layer = [this.data.added_id]), !0
				}
				handleUndo(e) {
					const t = e.getScene()
					if (t.find(this.data.added_id))
						return t.removeFromId(this.data.added_id), (this.effects.select_layer = []), !0
				}
				setDescriptor() {
					this.descriptor = 'create from buffer'
				}
			}
			var D = class extends g {
				constructor(e, t, n = !1, a) {
					var r, i
					super(e, t, n, a),
						(this.slug = 'copy'),
						(this.passive = !1),
						(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: [] }),
						(this.data.refName =
							(null === (i = null === (r = a.getScene()) || void 0 === r ? void 0 : r.find(this.data.id)) ||
							void 0 === i
								? void 0
								: i.name) || '')
				}
				handleRedo(e) {
					const t = e.getScene(),
						n = e.getDrawer(),
						a = t.find(this.data.id)
					if (a) {
						const e = c.b.copy(a, t, n)
						if (e) {
							if (this.data.parent_id) {
								const n = t.find(this.data.parent_id)
								if (!n) return !1
								c.b.add(n, e, void 0, t)
							} else t.add(e)
							return (
								(this.data.added_order = this.data.added_order || (null == e ? void 0 : e.order)),
								(this.data.added_name = this.data.added_name || (null == e ? void 0 : e.name)),
								(this.data.added_id = e.id),
								(this.effects.select_layer = [this.data.added_id]),
								!0
							)
						}
					}
				}
				handleUndo(e) {
					const t = e.getScene().find(this.data.added_id)
					if (t) return c.b.remove(t), (this.effects.select_layer = []), !0
				}
				setDescriptor() {
					this.descriptor = `copy "${this.data.refName}"`
				}
			}
			var L = class extends g {
				constructor(e, t, n = !1, a) {
					super(e, t, n, a),
						(this.slug = 'cut'),
						(this.passive = !1),
						(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: [] })
					const r = a.getScene().find(this.data.id)
					r && ((this.data.parentSceneChild = c.b.getParent(r)), (this.data.refName = r.name))
				}
				handleRedo(e) {
					const t = e.getScene(),
						n = t.find(this.data.id)
					if (n) {
						if ((c.b.remove(n), this.data.parent_id)) {
							const e = t.find(this.data.parent_id)
							e && c.b.add(e, n, void 0, t)
						} else t.add(n)
						return (this.effects.select_layer = [this.data.id]), !0
					}
				}
				handleUndo(e) {
					const t = e.getScene(),
						n = t.find(this.data.id)
					if (n)
						return (
							c.b.remove(n),
							this.data.parentSceneChild ? c.b.add(this.data.parentSceneChild, n) : t.add(n),
							(this.effects.select_layer = []),
							!0
						)
				}
				setDescriptor() {
					this.descriptor = `cut "${this.data.refName}"`
				}
			}
			class P extends o.a {
				constructor() {
					super(),
						(this.command_increment_id = 0),
						(this.commmands = {
							add: v,
							copy: D,
							cut: L,
							'create-from-buffer': A,
							'shape-operation': M,
							remove: f,
							'set-prop': y,
							'set-ui-prop': w,
							'make-shape': E,
							'move-up': k,
							'move-down': O,
							'move-to-top': C,
							'move-to-bottom': j,
						}),
						(this.history = []),
						(this.current_history_index = 0)
				}
				execute(e, t, n, a) {
					if (!(t in this.commmands)) return void console.warn(`Command history: command "${t}" not recognized.`)
					const r = new this.commmands[t](++this.command_increment_id, n, a, e)
					return r.redo(e) !== m.NONE
						? r.preventPushToHistory
							? { scene_update: r.effects.scene_update, scene_layers_update: r.effects.scene_layers_update }
							: (this.reindexingHistory(),
							  this.history.unshift(r),
							  this.history.length >= P.MAX_HISTORY && (this.history = this.history.slice(0, P.MAX_HISTORY)),
							  this.dispatchHistoryUpdate(),
							  r.effects)
						: void 0
				}
				handleCommandEffect(e, t) {
					e &&
						Object.keys(e).forEach(n => {
							const a = Array.isArray(e[n]) ? e[n] : [e[n]]
							switch (n) {
								case 'scene_child_prop_update':
									if (void 0 === t[n]) t[n] = [a]
									else {
										const r = t[n]
										let i = !1
										for (let e = 0, t = r.length; e < t; e++)
											for (let t = 0, n = a.length; e < n; e++)
												r[e].id == a[t].id && r[e].name == a[t].name && ((r[e].value = a.value), (i = !0))
										!i && t[n].push(e[n])
									}
									break
								default:
									t[n] = t[n] || e[n]
							}
						})
				}
				goTo(e, t) {
					if (t == this.current_history_index) return
					const n = {}
					if (t > this.current_history_index)
						for (let a = t - this.current_history_index - 1; a >= 0; a--) this.handleCommandEffect(this.undo(e, !0), n)
					if (t < this.current_history_index)
						for (let a = this.current_history_index - t - 1; a >= 0; a--) this.handleCommandEffect(this.redo(e, !0), n)
					return this.dispatchHistoryUpdate(), n
				}
				redo(e, t = !1) {
					if (this.history.length > 0 && this.current_history_index > 0) {
						const n = Object(h.b)(0, this.history.length, this.current_history_index - 1),
							a = this.history[n]
						return a.redo(e), (this.current_history_index = n), t || this.dispatchHistoryUpdate(), a.effects
					}
				}
				undo(e, t = !1) {
					if (this.history.length >= 0 && this.current_history_index < this.history.length) {
						const n = Object(h.b)(0, this.history.length, this.current_history_index),
							a = this.history[n]
						return a.undo(e), (this.current_history_index = n + 1), t || this.dispatchHistoryUpdate(), a.effects
					}
				}
				reindexingHistory() {
					if (this.current_history_index > 0)
						for (let e = 0, t = this.current_history_index; e < t; e++) this.history.shift()
					this.current_history_index = 0
				}
				dispatchHistoryUpdate() {
					const e = this.history
						.map((e, t) => ({
							id: e.id,
							command: e.descriptor,
							level: t,
							status: e.status,
							bLast: t == this.current_history_index,
							passive: e.passive,
						}))
						.filter(e => !e.passive)
					this.dispatch('command_history:update_history', e)
				}
				clear() {
					;(this.history = []), (this.command_increment_id = 0), (this.current_history_index = 0)
				}
			}
			P.MAX_HISTORY = 100
			var R = P,
				T = n(70)
			function B(e, t, n) {
				;(t.data[e] = n), c.b.getChildren(t).forEach(t => B(e, t, n))
			}
			var I = n(165)
			var H = n(71),
				F = n(120)
			class N {
				static export(e, t) {
					const n = e.getScene(),
						a = e.getTimeline(),
						r = Math.floor(4 * t.quality),
						i = [],
						o = Object.assign({}, e.getOptions())
					if (o.ghosts) {
						const t = a.getTime(),
							s = a.getSequenceEndTime()
						for (let a = 1; a <= o.ghosts; a++) {
							const l = t - (o.ghost_skip_function ? o.ghost_skip_function(a) : a * (o.ghost_skip_time || 30))
							;(o.clearCanvas = 1 == a),
								(o.ghost_index = a),
								(o.time = l < 0 ? l + s : l > s ? l % s : l),
								i.push(N.draw(n, o, e.getResolution(), r))
						}
						;(o.clearCanvas = !1),
							(o.ghost_index = void 0),
							(o.time = a.getTime()),
							i.push(N.draw(n, o, e.getResolution(), r))
					} else if (o.clearCanvas)
						(o.time = a.getTime()),
							(o.clearCanvas = o.clearCanvas || a.getCurrentFrame() <= 0),
							i.push(N.draw(n, o, e.getResolution(), r))
					else {
						const s = a.getSequence(),
							l = t.time >= s.end ? s.frames : a.getFrameAtTime(t.time)
						for (let t = 0; t <= l; t++)
							a.setFrame(t), (o.time = a.getTime()), i.push(N.draw(n, o, e.getResolution(), r))
					}
					const s = []
					return (
						s.push(`\x3c!-- Generate with: ${F.a.app_name} ${F.a.app_version} --\x3e`),
						s.push(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n.width.toFixed(r)} ${n.height.toFixed(
								r
							)}" width="${n.width.toFixed(r)}" height="${n.height.toFixed(r)}">`
						),
						t.noBackground ||
							s.push(`\t<rect width="${n.width.toFixed(r)}" height="${n.height.toFixed(r)}" fill="${n.background}" />`),
						s.push(i.map(e => `<g>${e.join('\t\t')}</g>`).join('\t')),
						s.push('</svg>'),
						s.join('\n')
					)
				}
				static draw(e, t, n, a) {
					var r, i, o
					const s = null !== (r = t.scale) && void 0 !== r ? r : 1,
						l = null !== (i = t.translate) && void 0 !== i ? i : [0, 0],
						c = null !== (o = t.time) && void 0 !== o ? o : 0,
						d = void 0 !== t.ghosts && t.ghosts > 0 && void 0 !== t.ghost_index && t.ghost_index > 0,
						u = d ? 1 - t.ghost_index / (t.ghosts + 0.5) : 1,
						m = e.width,
						p = e.height,
						h = [(m / ((n = n || m) / (m > p ? 1 : p / m))) * s, (p / (n / (m > p ? m / p : 1))) * s],
						g = [
							m / 2 - (s > 1 ? (l[0] * m) / (1 / ((s - 1) / 2)) : 0),
							p / 2 - (s > 1 ? (l[1] * p) / (1 / ((s - 1) / 2)) : 0),
						]
					;(e.current_time = c),
						e.getChildren().forEach(e => {
							var t, n
							!1 === (null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.visible) ||
								(d && !0 === (null === (n = null == e ? void 0 : e.data) || void 0 === n ? void 0 : n.disableGhost)) ||
								e.generate(c, !0)
						})
					const v = []
					return (
						e.draw(
							({
								lineWidth: e,
								strokeColor: t,
								fillColor: n,
								shape: r,
								buffer: i,
								buffer_length: o,
								current_buffer_index: s,
							}) => {
								var l, c
								if (
									0 == (null === (l = null == r ? void 0 : r.data) || void 0 === l ? void 0 : l.visible) ||
									(d && 1 == (null === (c = null == r ? void 0 : r.data) || void 0 === c ? void 0 : c.disableGhost))
								)
									return
								const f = []
								for (let e = 0; e < o; e += 2) {
									const t = (i[s + e] - m / 2) * h[0] + g[0],
										n = (i[s + e + 1] - p / 2) * h[1] + g[1]
									f.push(t.toFixed(a) + ' ' + n.toFixed(a))
								}
								if (n && d) {
									const e = /\((.+),(.+),(.+),(.+)\)/g.exec(n)
									if (e) {
										let [, t, a, r, i] = e
										const o = i ? parseFloat(i) : 1,
											s = o <= 0 ? 0 : o * u
										n = n.indexOf('rgb') >= 0 ? `rgba(${t},${a},${r},${s})` : `hsla(${t},${a},${r},${s})`
									}
								}
								if (t && e && d) {
									const n = /\((.+),(.+),(.+),(.+)\)/g.exec(t)
									if (n) {
										let [, e, a, r, i] = n
										const o = i ? parseFloat(i) : 1,
											s = o <= 0 ? 0 : o * u
										t = t.indexOf('rgb') >= 0 ? `rgba(${e},${a},${r},${s})` : `hsla(${e},${a},${r},${s})`
									}
									e *= u
								}
								v.push(
									`<path fill="${n || 'none'}" ${t ? `stroke="${t}"` : ''} ${
										e ? `stroke-width="${e}"` : ''
									} d="M${f.join(' L')} ${r && r.isClosed() ? 'Z' : ''}" />`
								)
							}
						),
						v
					)
				}
			}
			var q = N
			const V = (e, t, n, a, r) => {
				const o = r || n,
					s = n / ('low' == o ? 5 : 'medium' == o ? 2 : 'ultra' == o ? 0.5 : 1)
				t.resize(s, s),
					t.setResolution(s),
					t.setRatio(a),
					i.a.walk(e => {
						const n = e.data.props
						Object.keys(n).forEach(a => {
							c.a.setProp(e, a, n[a], t)
						})
					}, e),
					t.redraw()
			}
			function U(e, t, n) {
				const { scene: a, project: r } = H.a.import(t, e),
					i = void 0 !== typeof OffscreenCanvas ? new OffscreenCanvas(0, 0) : document.createElement('canvas'),
					o = new p(a, i, { noBackground: 'image/png' === n.type && n.noBackground, time: n.time }, n.size)
				return (
					X(r, o),
					o.getTimeline().setTime(n.time),
					V(a, o, n.size, r.ratio, 'high'),
					{ project: r, drawer: o, settings: n }
				)
			}
			function X(e, t) {
				t.setOption('clearCanvas', e.clearCanvas),
					t.setOption('ghosts', e.ghosts),
					t.setOption('ghost_skip_time', e.ghost_skip_time),
					void 0 !== e.sequence.start &&
						void 0 !== e.sequence.end &&
						void 0 !== e.sequence.framerate &&
						t.getTimeline().setSequence(e.sequence.start, e.sequence.end, e.sequence.framerate)
			}
			var G = n(11)
			var Y = function (e, t, n, a) {
					return new (n || (n = Promise))(function (r, i) {
						function o(e) {
							try {
								l(a.next(e))
							} catch (e) {
								i(e)
							}
						}
						function s(e) {
							try {
								l(a.throw(e))
							} catch (e) {
								i(e)
							}
						}
						function l(e) {
							var t
							e.done
								? r(e.value)
								: ((t = e.value),
								  t instanceof n
										? t
										: new n(function (e) {
												e(t)
										  })).then(o, s)
						}
						l((a = a.apply(e, t || [])).next())
					})
				},
				W = n(126)
			var K = function (e, t, n, a) {
				return new (n || (n = Promise))(function (r, i) {
					function o(e) {
						try {
							l(a.next(e))
						} catch (e) {
							i(e)
						}
					}
					function s(e) {
						try {
							l(a.throw(e))
						} catch (e) {
							i(e)
						}
					}
					function l(e) {
						var t
						e.done
							? r(e.value)
							: ((t = e.value),
							  t instanceof n
									? t
									: new n(function (e) {
											e(t)
									  })).then(o, s)
					}
					l((a = a.apply(e, t || [])).next())
				})
			}
			const J = {
				'export-json': function (e, t) {
					const n = e.args
					return W.a.export(n)
				},
				'import-json': function (e, t) {
					const n = e.args,
						a = t.getDrawer(),
						r = H.a.import(n, a)
					if (r) {
						const { scene: e, project: n } = r
						return (
							X(n, a),
							t.getCommandHistory().clear(),
							t.setScene(e),
							t.sendEvent('project:init', n),
							V(e, a, e.width, n.ratio, 'high'),
							n
						)
					}
					return null
				},
				'append-json': function (e, t) {
					const n = e.args,
						a = t.getDrawer(),
						r = t.getScene(),
						i = H.a.import(n, a)
					if (i) {
						return (
							i.scene.getChildren().forEach(e => {
								r.find(e.id) || r.add(e)
							}),
							t.sendEvent('scene:update-layers', { layers: T.a.export(r, a) }),
							a.redraw(),
							!0
						)
					}
					return !1
				},
				'scene-layers': function (e, t) {
					return T.a.export(t.getScene(), t.getDrawer())
				},
				'layer-highlight': function (e, t) {
					const n = t.getScene().find(e.args.id)
					n && (B('highlighted', n, e.args.status), t.getDrawer().redraw())
				},
				'layer-visibility': [
					function (e, t) {
						const n = t.getScene().find(e.args.id)
						n && (B('visible', n, e.args.status), t.getDrawer().redraw())
					},
					'scene_layers_update',
				],
				'layer-ghost': [
					function (e, t) {
						const n = t.getScene().find(e.args.id)
						n && ((n.data.disableGhost = e.args.status), t.getDrawer().redraw())
					},
					'scene_layers_update',
					({ id: e, status: t }) => ({ scene_child_ui_prop_update: [{ id: e, name: 'disableGhost', value: t }] }),
				],
				'layer-rename': [
					function (e, t) {
						const { id: n, name: a } = e.args,
							r = t.getScene().find(n)
						r && (r.name = a)
					},
					'scene_layers_update',
				],
				'toggle-timeline': (e, t) => {
					const n = t.getDrawer()
					n.getTimeline().bSequenceStarted() ? n.pauseAnimation() : n.playAnimation()
				},
				'change-timeline-state': (e, t) => {
					const n = t.getDrawer()
					e.args == I.a.START
						? !n.getTimeline().bSequenceStarted() && n.playAnimation()
						: n.getTimeline().bSequenceStarted() && n.pauseAnimation()
				},
				'set-timeline-duration': (e, t) => {
					const n = t.getDrawer(),
						a = e.args
					n.getTimeline().setSequenceEndTime(a)
				},
				'set-timeline-framerate': (e, t) => {
					const n = t.getDrawer(),
						a = e.args
					n.getTimeline().setFramerate(a)
				},
				'set-timeline': (e, t) => {
					const n = t.getDrawer(),
						a = e.args
					n.getTimeline().setTime(a), n.redraw()
				},
				'timeline-sequence': (e, t) => t.getDrawer().getTimeline().getSequence(),
				'set-drawer-offsets': (e, t) => {
					const n = t.getDrawer(),
						{ scale: a, translate: r } = e.args
					n.setOption({ scale: a, translate: r }), n.redraw()
				},
				'set-drawer-lines': (e, t) => {
					const n = t.getDrawer(),
						a = e.args
					n.setOption('simmetricLine', a), n.redraw()
				},
				'set-drawer-clear': (e, t) => {
					const n = t.getDrawer(),
						a = e.args
					n.setOption('clearCanvas', a), n.redraw(), t.sendEvent('project:update-properties', { clearCanvas: a })
				},
				'set-drawer-ghosts': (e, t) => {
					const n = t.getDrawer(),
						{ ghosts: a, ghost_skip_time: r } = e.args
					n.setOption('ghosts', a),
						n.setOption('ghost_skip_time', r),
						n.redraw(),
						t.sendEvent('project:update-properties', {
							ghosts: Math.round(10 * a) / 10,
							ghost_skip_time: Math.round(10 * r) / 10,
						})
				},
				'set-drawer-ratio': (e, t) => {
					const { size: n, ratio: a, resolution: r } = e.args
					V(t.getScene(), t.getDrawer(), n, a, r), t.sendEvent('project:update-properties', { ratio: a })
				},
				'set-scene-background': (e, t) => {
					const n = t.getScene(),
						a = t.getDrawer(),
						{ background: r, preventDispatch: i } = e.args
					;(n.background = r), a.redraw(), !i && t.sendEvent('project:update-properties', { background: r })
				},
				'set-background-image': (e, t) => {
					const { image: n, source: a } = e.args
					t.getDrawer().setOption('backgroundImage', n), t.getDrawer().redraw()
					const r = a
					t.sendEvent('project:update-properties', { backgroundImage: r })
				},
				'render-image': (e, t) => {
					const n = t.getDrawer()
					n.stopAnimation()
					const a = e.args.settings,
						r = e.args.project,
						i = t.getRenderer()
					if ('image/svg+xml' === a.type) {
						const e = U(n, r, a)
						return JSON.stringify({ svg: q.export(e.drawer, a) })
					}
					const o = U(n, r, a)
					return i.renderImage(o.drawer, a)
				},
				'render-animation': (e, t) => {
					const n = t.getDrawer()
					n.stopAnimation()
					const a = e.args.settings,
						r = e.args.project,
						i = t.getRenderer(),
						o = U(n, r, a)
					return i.renderAnimation(o.drawer, a)
				},
				'render-stop': (e, t) => {
					t.getRenderer().stop()
				},
				prop: (e, t) => {
					var n
					const { id: a, name: r } = e.args,
						i = t.getScene().find(a)
					if (0 == r.indexOf('loop.') && i instanceof G.a) {
						const e = r.substr(5)
						return null !== (n = i.getLoop()[e]) && void 0 !== n ? n : void 0
					}
					return i ? i.getProp(r) : void 0
				},
				'single-bounding': (e, t) => {
					const n = t.getScene(),
						a = t.getScene().find(e.args.id)
					if (a) {
						const e = a.getProp('repetitions', void 0, 1),
							t = a.getProp('distance', void 0, 0)
						a.setProp({ repetitions: 1, distance: 0 }, !0), a.generate(Math.random(), !0)
						const r = d.a.getBounding(a.getBuffer())
						return (
							a.setProp({ repetitions: e, distance: t }),
							(r.x /= n.width),
							(r.y /= n.height),
							(r.cx /= n.width),
							(r.cy /= n.height),
							(r.width /= n.width),
							(r.height /= n.height),
							r
						)
					}
					return null
				},
				toolbar: function (e, t) {
					return Y(this, void 0, void 0, function* () {
						const { size: t, color: n } = e.args,
							a = c.b.getRegistered()
						;['ShapeLoop', 'ShapePrimitive', 'ShapeBuffer', 'Shape', 'Group'].forEach(e => {
							a.splice(a.indexOf(e), 1)
						})
						const r = [],
							i = []
						a.forEach(e => {
							i.push(p.generateImage(e, t, t, void 0, n))
						})
						const o = yield Promise.all(i)
						return (
							a.forEach((e, t) => {
								r.push({ name: e, image: o[t] })
							}),
							r
						)
					})
				},
				'scene-points': (e, t) => {
					const n =
							t
								.getScene()
								.getChildren()
								.reduce((e, t) => e + t.getBufferLength(), 0) / 2,
						a = t.getDrawer().getOption('ghosts')
					return a && a > 0 ? n * a : n
				},
				'get-buffer-length': (e, t) => {
					var n
					const a = null === (n = t.getScene().find(e.args.id)) || void 0 === n ? void 0 : n.getBufferLength()
					return a ? a / 2 : 0
				},
			}
			var Z = n(25)
			const Q = Float32Array.from([-1, 0.4957, 0, -0.0813, 1, 0.4957, 1, -0.0813, 0, -0.6582, -1, -0.0813]),
				ee = Float32Array.from([
					-0.3676,
					0.4804,
					-0,
					0.2683,
					0.3676,
					0.4804,
					0.3676,
					0.2683,
					-0,
					0.0562,
					-0.3676,
					0.2683,
				])
			class te extends Z.a {
				constructor(e = {}) {
					;(e.type = 'Desidus'), super(e), (this.created = !1), e.data.imported || this.buildShape()
				}
				buildShape() {
					var e
					if (!this.created && !this.shape) {
						const t = null === (e = c.a.sceneChildProps.sideLength) || void 0 === e ? void 0 : e.default,
							n = c.b.create('Group', { name: this.name + '_Group' }, this.scene),
							a = c.b.create('ShapeBuffer', { name: this.name + '_top', shape: Q }, this.scene),
							r = c.b.create('ShapeBuffer', { name: this.name + '_bottom', shape: ee }, this.scene)
						;(a.data.props.sideLength = t),
							(r.data.props.sideLength = t),
							this.setShape(n),
							n.add(a),
							n.add(r),
							(this.created = !0)
					}
				}
				setProp(e, t) {
					super.setProp(e, t), this.buildShape()
				}
			}
			var ne = te,
				ae = function (e, t, n, a) {
					return new (n || (n = Promise))(function (r, i) {
						function o(e) {
							try {
								l(a.next(e))
							} catch (e) {
								i(e)
							}
						}
						function s(e) {
							try {
								l(a.throw(e))
							} catch (e) {
								i(e)
							}
						}
						function l(e) {
							var t
							e.done
								? r(e.value)
								: ((t = e.value),
								  t instanceof n
										? t
										: new n(function (e) {
												e(t)
										  })).then(o, s)
						}
						l((a = a.apply(e, t || [])).next())
					})
				}
			class re extends o.a {
				constructor() {
					super(),
						(this.scene = new i.a()),
						(this.scene.mainColor = r.a.color('primary').toString('hex')),
						(this.scene.background = r.a.color('dark').toString('hex')),
						(this.drawer = new p(this.scene))
					const e = H.a.getInitialProjectState().sequence
					this.drawer.getTimeline().setSequence(e.start, e.end, e.framerate),
						(this.renderer = new s.a()),
						(this.commandHistory = new R()),
						this.drawer
							.getTimeline()
							.attach('timeline:update_sequence', this.sendEvent.bind(this, 'timeline:update_sequence')),
						this.drawer
							.getTimeline()
							.attach('timeline:change_status', this.sendEvent.bind(this, 'timeline:change_status')),
						this.drawer.getTimeline().attach('timeline:progress', this.sendEvent.bind(this, 'timeline:progress')),
						this.commandHistory.attach(
							'command_history:update_history',
							this.sendEvent.bind(this, 'command_history:update_history')
						),
						this.renderer.attach('renderer:start', this.sendEvent.bind(this, 'renderer:start')),
						this.renderer.attach('renderer:render-frame', this.sendEvent.bind(this, 'renderer:render-frame')),
						c.b.register('Desidus', ne)
				}
				sendEvent(e, t) {
					this.dispatch('event', { event: e, data: t ? JSON.stringify(t) : void 0 })
				}
				getScene() {
					return this.scene
				}
				setScene(e) {
					this.scene && e.resize(this.scene.width, this.scene.height),
						(this.scene = e),
						this.drawer.setScene(this.scene),
						this.drawer.redraw()
				}
				getDrawer() {
					return this.drawer
				}
				setDrawer(e) {
					e.canvas && this.drawer.setCanvas(e.canvas),
						(e.size || e.ratio || e.resolution) && V(this.scene, this.drawer, e.size, e.ratio, e.resolution),
						this.sendEvent('drawer:update', {})
				}
				getRenderer() {
					return this.renderer
				}
				getCommandHistory() {
					return this.commandHistory
				}
				read(e) {
					return ae(this, void 0, void 0, function* () {
						try {
							let t, n
							switch (e.type) {
								case 'set-drawer':
									yield this.setDrawer(e.args)
									break
								case 'run': {
									const n = e.args
									t = yield this.commandHistory.execute(this, e.command, n.args, n.preventPushToHistory)
									break
								}
								case 'ask': {
									const a = yield (function (e, t) {
										return K(this, void 0, void 0, function* () {
											if (e.command in J) {
												const n = J[e.command],
													a = Array.isArray(n) ? n : [n]
												let r
												if (a.length > 1) {
													r = {}
													for (let t = 1; t < a.length; t++) {
														const n = a[t]
														if ('string' == typeof n) r[n] = !0
														else {
															const t = n(e.args)
															Object.keys(t).forEach(e => (r[e] = t[e]))
														}
													}
												}
												return { data: yield a[0](e, t), execution_effects: r }
											}
											console.warn(`Executor Ask '${e.command}' command not recognized`)
										})
									})(e, this)
									;(n = null == a ? void 0 : a.data), (t = null == a ? void 0 : a.execution_effects)
									break
								}
								case 'undo':
									t = yield this.commandHistory.undo(this)
									break
								case 'redo':
									t = yield this.commandHistory.redo(this)
									break
								case 'history':
									t = yield this.commandHistory.goTo(this, e.args)
							}
							if (t) {
								const n = { type: 'execution-effect', deferred_id: e.deferred_id, effect: 'no-effect' }
								return (
									t.scene_update && this.drawer.redraw(),
									t.scene_layers_update &&
										((n.effect = 'scene:update-layers'),
										(n.data = JSON.stringify({
											layers: T.a.export(this.scene, this.drawer),
											selecteds: t.select_layer ? t.select_layer : void 0,
										}))),
									t.scene_child_prop_update &&
										((n.effect = 'scene:update-scene_child-prop'),
										(n.data = JSON.stringify(t.scene_child_prop_update))),
									t.scene_child_ui_prop_update &&
										((n.effect = 'scene:update-scene_child-ui-prop'),
										(n.data = JSON.stringify(t.scene_child_ui_prop_update))),
									n
								)
							}
							return { deferred_id: e.deferred_id, type: 'response', command: e.command, data: n }
						} catch (t) {
							return { deferred_id: e.deferred_id, type: 'response-unresolved', command: e.command, data: t }
						}
					})
				}
			}
			t.a = re
		},
		411: function (e, t, n) {
			'use strict'
			var a = n(1),
				r = n(163),
				i = n(3),
				o = n.n(i),
				s = function (e, t) {
					var n = {}
					for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a])
					if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
						var r = 0
						for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
							t.indexOf(a[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[r]) && (n[a[r]] = e[a[r]])
					}
					return n
				}
			const l = r.b.div`
    display: inline-block;
    vertical-align: ${e => e.valign || 'middle'};    
    width: ${e => ('string' == typeof e.size ? e.size : o.a.ms(void 0 !== e.size ? e.size : 1))};
    height: ${e => ('string' == typeof e.size ? e.size : o.a.ms(void 0 !== e.size ? e.size : 1))};
    line-height: ${e => ('string' == typeof e.size ? e.size : o.a.ms(void 0 !== e.size ? e.size : 1))};
    font-size: 0;
    cursor: ${e => e.cursor || (e.onClick ? 'pointer' : null)};
    pointer-events: ${e => (e.disabled ? 'none' : null)};
    opacity: ${e => (e.disabled ? 0.2 : e.onClick ? 0.8 : 1)};
    transition: all .1s;
    
    &:hover {
        opacity: ${e => (e.onClick ? 1 : void 0)};
    }

    > svg {
        display: inline-block;
        vertical-align: middle;
        pointer-events: none;
        width: 100%;
        fill: ${e => e.fill || '#fff'};
        stroke: ${e => e.stroke};
        stroke-width: ${e => (e.strokeWidth ? e.strokeWidth : e.stroke ? 1 : null)};
        transition: transform .3s;

        ${e => (void 0 !== e.rotate ? `transform: rotate(${e.rotate}deg)` : null)}
    }
`
			t.a = a.memo(e => {
				const { name: t } = e,
					r = s(e, ['name']),
					i = n(417)(`./${t}.svg`).default
				return a.createElement(l, Object.assign({}, r, { dangerouslySetInnerHTML: { __html: i } }))
			})
		},
		413: function (e, t, n) {
			'use strict'
			var a = n(1),
				r = n(163),
				i = n(3),
				o = n.n(i),
				s = n(411)
			const l = r.b.div`
	position: relative;
	width: ${e => e.width};
	border: 1px solid ${o.a.color('gray-dark')};
	border-radius: 2px;
`,
				c = r.b.div`
	padding: 0 ${o.a.ms(-1)};
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
`,
				d = r.b.ul`
	position: absolute;
	z-index: 1;
	width: 100%;
	max-height: 20vh;
	overflow: auto;
	${e => ('top' == e.position ? 'bottom: 100%;' : 'top: 100%; ')}
	border: 1px solid ${o.a.color('gray-dark')};
	display: ${e => (e.open ? 'block' : 'none')};
	list-style: none;
	margin: ${o.a.ms(-2)} 0;
	padding: 0;
	background: ${o.a.color('dark')};
`,
				u = r.b.li`
	padding: 0 ${o.a.ms(-1)};
	cursor: pointer;
	background: ${e => (e.selected ? o.a.color('primary') : null)};

	&:hover {
		background: ${e => (e.selected ? null : o.a.color('dark').lighten(5))};
	}
`
			t.a = a.memo(e => {
				const [t, n] = a.useState(!1)
				return (
					a.useEffect(() => {
						function e() {
							t && n(!1)
						}
						return (
							document.addEventListener('click', e, { passive: !0 }),
							() => {
								document.removeEventListener('click', e)
							}
						)
					}, [e.value, t]),
					a.createElement(
						l,
						{ width: e.width },
						a.createElement(
							c,
							{ onClick: () => n(!0) },
							a.createElement(
								'span',
								null,
								e.value
									? (function () {
											for (let t = 0, n = e.options.length; t < n; t++)
												if (e.options[t].value == e.value) return e.options[t].key
									  })()
									: a.createElement('i', null, e.placeholder)
							),
							a.createElement(s.a, {
								rotate: 90,
								style: { transform: `scale(${(t ? -1 : 1) * ('top' == e.position ? -1 : 1)})` },
								name: 'arrow-right',
							})
						),
						a.createElement(
							d,
							{ position: e.position || 'bottom', open: t },
							e.options.map(t =>
								a.createElement(
									u,
									{
										key: t.key,
										onClick: () => {
											return (n = t.value), void setTimeout(() => e.onChange(n))
											var n
										},
										selected: t.value == e.value,
									},
									t.key
								)
							)
						)
					)
				)
			})
		},
		415: function (e, t, n) {
			'use strict'
			var a = n(1)
			t.a = function (e = null) {
				const t = a.useRef(e),
					n = a.useCallback(e => {
						t.current, (t.current = e)
					}, [])
				return [t, n]
			}
		},
		417: function (e, t, n) {
			var a = {
				'./add.svg': 418,
				'./animate-color.svg': 419,
				'./animated.svg': 420,
				'./arrow-right-fill.svg': 421,
				'./arrow-right.svg': 422,
				'./back.svg': 423,
				'./checkbox.svg': 424,
				'./close.svg': 425,
				'./copy-properties.svg': 426,
				'./copy.svg': 427,
				'./custom-shape.svg': 428,
				'./cut.svg': 429,
				'./edit.svg': 430,
				'./group.svg': 431,
				'./hidden.svg': 432,
				'./highlight.svg': 433,
				'./image.svg': 434,
				'./lock-value.svg': 435,
				'./loop.svg': 436,
				'./not-animated.svg': 437,
				'./paste-properties.svg': 438,
				'./paste.svg': 439,
				'./pause.svg': 440,
				'./play.svg': 441,
				'./primitive.svg': 442,
				'./remove.svg': 443,
				'./repetitions.svg': 444,
				'./save.svg': 445,
				'./scene.svg': 446,
				'./sequence-end.svg': 447,
				'./sequence-start.svg': 448,
				'./shape-buffer.svg': 449,
				'./shape-combine-difference.svg': 450,
				'./shape-combine-intersect.svg': 451,
				'./shape-combine-union.svg': 452,
				'./shape-combine-xor.svg': 453,
				'./shape.svg': 454,
				'./storage.svg': 455,
				'./style.svg': 456,
				'./time.svg': 457,
				'./to-top.svg': 458,
				'./transform.svg': 459,
				'./unlock-value.svg': 460,
				'./visible.svg': 461,
			}
			function r(e) {
				var t = i(e)
				return n(t)
			}
			function i(e) {
				if (!n.o(a, e)) {
					var t = new Error("Cannot find module '" + e + "'")
					throw ((t.code = 'MODULE_NOT_FOUND'), t)
				}
				return a[e]
			}
			;(r.keys = function () {
				return Object.keys(a)
			}),
				(r.resolve = i),
				(e.exports = r),
				(r.id = 417)
		},
		418: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 4.5C7 4.5 4.5 7 4.5 10S7 15.5 10 15.5s5.5-2.5 5.5-5.5S13 4.5 10 4.5zm0 2c.3 0 .5.2.5.5v2.5H13c.3 0 .5.2.5.5s-.2.5-.5.5h-2.5V13c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-2.5H7c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h2.6V7c-.1-.3.1-.5.4-.5z"/></svg>')
		},
		419: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11.95 3c-2.5 0-4.5 1.8-4.9 4.1.5-.1 1-.1 1.5-.1.7.1.6 1.1-.1 1-.5-.1-1 0-1.4.1.1 2.7 2.2 4.8 4.9 4.9.1-.5.2-1 .1-1.5 0-.3.2-.6.5-.6s.5.2.5.4c.1.5 0 1-.1 1.5 2.3-.4 4.1-2.5 4.1-4.9-.1-2.7-2.3-4.9-5.1-4.9zm-1.6 4.8c.1 0 .2 0 .3.1.5.4 1 .8 1.4 1.4s-.5 1.1-.8.6c-.3-.4-.7-.8-1.1-1.1-.5-.3-.3-1 .2-1z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M5.45 7.8c-.1 0-.2 0-.3.1C3.45 9 2.65 11 3.05 13s1.9 3.5 3.9 3.9 4-.4 5.1-2c.2-.2.1-.5-.1-.7-.2-.2-.5-.1-.7.1-.9 1.3-2.5 2-4.1 1.6s-2.8-1.6-3.1-3.2c-.3-1.6.4-3.2 1.7-4.1.2-.2.3-.5.1-.7-.1-.1-.2-.1-.4-.1z"/></svg>')
		},
		420: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.95 5.52c-.1 0-.3.1-.3.1l-4 4c-.2.2-.2.5 0 .7l4 4c.2.2.5.2.7 0l4-4c.2-.2.2-.5 0-.7l-4-4c-.1.01-.3-.1-.4-.1z"/></svg>')
		},
		421: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.66 9.15l-8.6-3.58c-.54-.18-1.25.18-1.25.9v7.06c0 .72.72 1.07 1.25.9l8.6-3.58c.37-.19.54-.52.52-.85.02-.33-.14-.66-.52-.85z"/></svg>')
		},
		422: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7.97 5.53c-.3 0-.5.2-.5.5 0 .1.1.3.2.4l3.6 3.6-3.6 3.6c-.2.2-.2.5 0 .7s.5.2.7 0l4-4c.2-.2.2-.5 0-.7l-4-4c-.1-.1-.3-.1-.4-.1z"/></svg>')
		},
		423: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7.42 2.95c-.1 0-.3.1-.3.2l-4 4c-.2.2-.2.5 0 .7l4 4c.2.2.5.2.7 0s.2-.5 0-.7l-3.1-3.1h7.3c2.2 0 4 1.8 4 4s-1.8 4-4 4h-1.5c-.3 0-.5.2-.5.5s.2.5.5.5h1.5c2.8 0 5-2.2 5-5s-2.2-5-5-5h-7.3l3.1-3.1c.2-.2.2-.5 0-.7-.1-.3-.29-.3-.4-.3z"/></svg>')
		},
		424: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="none" d="M0 0h20v20H0z"/><g transform="matrix(.86667 0 0 .86667 39.53 -302.8)"><path fill-rule="evenodd" d="M-34.08 352.85a8.03 8.03 0 00-8.08 8.08c0 4.5 3.58 8.08 8.08 8.08s8.08-3.58 8.08-8.08a8.03 8.03 0 00-8.08-8.08zm0 1.15a6.94 6.94 0 016.92 6.92 6.94 6.94 0 01-6.92 6.92 6.94 6.94 0 01-6.92-6.92c0-3.8 3.12-6.92 6.92-6.92z" clip-rule="evenodd" opacity=".3"/><path fill-rule="evenodd" d="M-34.08 358.62a2.32 2.32 0 00-2.31 2.31 2.32 2.32 0 002.31 2.31 2.31 2.31 0 000-4.62z" clip-rule="evenodd"/></g></svg>')
		},
		425: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13.82 6.15c.21.21.21.53 0 .74l-3.13 3.13 3.13 3.13c.21.21.21.53.06.69-.22.21-.53.21-.7.05l-.05-.05L10 10.7l-3.12 3.13c-.22.21-.53.21-.7.05s-.2-.53-.05-.69l.06-.05 3.13-3.13-3.13-3.13c-.22-.21-.22-.53-.06-.69.22-.21.53-.21.7-.05l.05.05L10 9.33l3.13-3.13c.16-.26.48-.26.7-.05z"/></svg>')
		},
		426: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g fill-rule="evenodd" clip-rule="evenodd"><path d="M16.504 3c.3 0 .5.2.5.5v10c0 .3-.2.5-.5.5h-10c-.3 0-.5-.2-.5-.5v-10c0-.3.2-.5.5-.5h10zm-.5 1h-9v9h9V4z"/><path d="M8.004 7h4.5c.3 0 .5.2.5.5V12h-1V8h-4V7zm-3 0v1h-1v8h8v-1h1v1.5c0 .3-.2.5-.5.5h-9c-.3 0-.5-.2-.5-.5v-9c0-.3.2-.5.5-.5h1.5z" opacity=".7"/></g></svg>')
		},
		427: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g transform="matrix(1 0 0 -1 894 921)"><path fill-rule="evenodd" d="M-890.5 904c-.3 0-.5.2-.5.5v10c0 .3.2.5.5.5h2.5v-1h-2v-9h9v2h1v-2.5c0-.3-.2-.5-.5-.5h-10z" clip-rule="evenodd" opacity=".7"/><path fill-rule="evenodd" d="M-886.5 918c-.3 0-.5-.2-.5-.5v-9c0-.3.2-.5.5-.5h9c.3 0 .5.2.5.5v4.5h-1v-4h-8v8h5v-2.5c0-.3.2-.5.5-.5h3.5v.5c0 .1-.1.3-.1.4l-3 3c-.1.1-.2.1-.4.1h-6z" clip-rule="evenodd"/></g></svg>')
		},
		428: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.7 3.05c-.2 0-.46.1-.56.3L7.6 7.95H3.5c-.3 0-.5.2-.5.5v.8c0 .2.1.3.2.4l3.2 2-1.4 3.9v1c0 .3.2.5.5.5h.8c.1 0 .2 0 .3-.1l3.4-2.9h.1l3.4 2.9c.1.1.2.1.3.1h.7c.3 0 .5-.2.5-.5v-.7-.2l-1.4-3.9 3.2-2c.1-.1.2-.2.2-.4v-.8c0-.3-.2-.5-.5-.5h-4.1l-1.6-4.7c-.1-.2-.3-.3-.5-.3H9.7z"/></svg>')
		},
		429: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M15.5 2.99c-.3 0-.5.2-.5.5v1c0 .7 1 .7 1 0v-1c0-.3-.2-.5-.5-.5zm-6 0c-.1 0-.2.1-.3.1l-5 5c-.1.1-.1.2-.1.3v2c0 .7 1 .7 1 0v-1.4h4.5c.3 0 .5-.2.5-.5v-4.5h.5c.7 0 .7-1 0-1H9.5zm3 0c-.7 0-.7 1 0 1h1c.7 0 .7-1 0-1h-1zm3 3c-.3 0-.5.2-.5.5v1c0 .7 1 .7 1 0v-1c0-.3-.2-.5-.5-.5zm0 3c-.3 0-.5.2-.5.5v1c0 .7 1 .7 1 0v-1c0-.3-.2-.5-.5-.5zm-11 3c-.3 0-.5.2-.5.5v1c0 .7 1 .7 1 0v-1c0-.3-.2-.5-.5-.5zm11 0c-.3 0-.5.2-.5.5v1c0 .7 1 .7 1 0v-1c0-.3-.2-.5-.5-.5zm-11 3c-.3 0-.5.2-.5.5v1c0 .7 1 .7 1 0v-1c0-.3-.2-.5-.5-.5zm11 0c-.3 0-.5.2-.5.5v1c0 .7 1 .7 1 0v-1c0-.3-.2-.5-.5-.5zm-9 1c-.7 0-.7 1 0 1h1c.7 0 .7-1 0-1h-1zm3 0c-.7 0-.7 1 0 1h1c.7 0 .7-1 0-1h-1zm3 0c-.7 0-.7 1 0 1h1c.7 0 .7-1 0-1h-1z" opacity=".99"/></svg>')
		},
		430: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.15 2.99c-.5 0-1 .2-1.5.6l-.8.8c-.2.2-.2.5 0 .7l3 3c.2.2.5.2.7 0l.8-.8c.5-.5.7-1 .6-1.5s-.3-.9-.6-1.2l-1-1c-.3-.3-.7-.5-1.2-.6zm-3.4 2.8c-.1 0-.3.1-.3.1l-6.3 6.3c-.1.1-.1.1-.1.2l-1 4c-.1.4.2.7.6.6l4-1c.1 0 .2-.1.2-.1l6.3-6.3c.2-.2.2-.5 0-.7l-3-3c-.1-.1-.2-.2-.4-.1z"/></svg>')
		},
		431: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4.43 8.56v7.21c0 .29.19.48.46.48H15.1c.28 0 .46-.19.46-.48V8.56H4.43zm4.64.96h1.86c.56 0 .93.38.93.96s-.37.96-.93.96H9.07c-.56 0-.93-.38-.93-.96 0-.48.37-.96.93-.96zM3.96 3.75c-.28 0-.46.19-.46.48v2.88c0 .29.19.48.46.48h12.07c.28 0 .46-.19.46-.48V4.23c0-.29-.19-.48-.46-.48H3.96z"/></svg>')
		},
		432: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4.08 9.53c-.3 0-.5.3-.5.5 0 .1.1.2.1.3 1.3 1.4 3.1 4.2 6.3 4.2s5-2.7 6.3-4.2c.2-.2.2-.5 0-.7s-.5-.2-.7 0c-1.4 1.6-2.9 3.8-5.6 3.8s-4.2-2.3-5.6-3.8c-.01 0-.1-.1-.3-.1z" opacity=".6"/></svg>')
		},
		433: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6.47 3.49a.5.5 0 00-.4.76L9.13 9.5H3.5a.5.5 0 00-.51.49c0 .28.22.5.49.51h5.64l-3.06 5.25c-.15.23-.08.54.16.69s.54.08.69-.16l.02-.03L10 10.99l3.07 5.26a.5.5 0 00.68.2.5.5 0 00.2-.68l-.02-.03-3.06-5.25h5.63a.5.5 0 00.51-.49.5.5 0 00-.49-.51h-5.64l3.06-5.25a.5.5 0 00-.16-.69.5.5 0 00-.69.16l-.02.03L10 9.01 6.93 3.75a.5.5 0 00-.46-.26z"/></svg>')
		},
		434: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g opacity=".99"><path d="M7.5 9c.2 0 .3.1.4.3l4 7c.2.3-.1.7-.4.7h-8c-.4 0-.6-.4-.4-.7l4-7c.1-.2.2-.3.4-.3zM12.5 6c.8 0 1.5.7 1.5 1.5S13.3 9 12.5 9 11 8.3 11 7.5 11.7 6 12.5 6z"/><path d="M3.5 3c-.3 0-.5.2-.5.5v10.9l1-1.8V4h12v12h-3.1c.1.3.1.7 0 1h3.6c.3 0 .5-.2.5-.5v-13c0-.3-.2-.5-.5-.5h-13z" fill-rule="evenodd" clip-rule="evenodd"/></g></svg>')
		},
		435: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="none" d="M0 0h20v20H0z"/><path d="M13.7 3c-.8 0-1.6.3-2.2.9L9.8 5.4C9.3 6 9 6.8 9 7.6c0 .3.2.5.5.5s.5-.2.5-.5c0-.5.2-1 .6-1.4l1.5-1.5c.4-.4 1-.6 1.4-.6s1.1.3 1.6.8c.6.6.8 1.1.8 1.7 0 .5-.2 1-.6 1.4l-1.5 1.5a2 2 0 01-1.4.6c-.3 0-.5.2-.5.5s.2.5.5.5c.8 0 1.5-.3 2.1-.9L16 8.7c.6-.6 1-1.4 1-2.2 0-.8-.5-1.6-1.2-2.3A3 3 0 0013.6 3zm-1.1 4l-.3.2-5 5c-.2.2-.2.5 0 .7s.5.2.7 0l5-5v-.7l-.4-.2zm-5 2c-.7 0-1.5.3-2.1.9L4 11.4c-.6.6-1 1.4-1 2.2 0 .8.5 1.6 1.2 2.3.7.7 1.5 1.1 2.3 1.1s1.6-.3 2.2-.9l1.5-1.5c.6-.6.9-1.3.9-2.1 0-.3-.2-.5-.5-.5s-.5.2-.5.5c0 .5-.2 1-.6 1.4L8 15.4c-.4.4-1 .6-1.4.6s-1.1-.3-1.7-.8c-.6-.6-.8-1.1-.8-1.6s.2-1 .6-1.4l1.5-1.5a2 2 0 011.4-.6c.3 0 .5-.2.5-.5S8 9 7.7 9z"/></svg>')
		},
		436: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="none" d="M0 0h20v20H0z"/><path fill-rule="evenodd" d="M7.5 3c-.3 0-.5.2-.5.5v3c0 .3.2.5.5.5h3c.3 0 .5-.2.5-.5V5h.5c1.3 0 2.4.4 3.2 1S16 7.6 16 9c0 1.6-.8 3.1-2.2 4.2S10.2 15 7.5 15H7v-1.5c0-.3-.2-.5-.5-.5h-3c-.3 0-.5.2-.5.5v3c0 .3.2.5.5.5h3c.3 0 .5-.2.5-.5V16h.5c2.8 0 5.2-.8 6.9-2S17 11 17 9c0-1.6-.6-2.9-1.6-3.8S13 4 11.5 4H11v-.5c0-.3-.2-.5-.5-.5h-3zM8 4h2v2H8V4zM4 14h2v2H4v-2z" clip-rule="evenodd"/></svg>')
		},
		437: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.95 5.52c-.1 0-.3.1-.3.1l-4 4c-.2.2-.2.5 0 .7l4 4c.2.2.5.2.7 0l4-4c.2-.2.2-.5 0-.7l-4-4c-.1.01-.3-.1-.4-.1zm0 1.2l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3z"/></svg>')
		},
		438: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M3.51 3c-.3 0-.5.2-.5.5v3c0 .3.2.5.5.5s.5-.2.5-.5v-3c0-.3-.2-.5-.5-.5zm0 5c-.3 0-.5.2-.5.5v3c0 .3.2.5.5.5s.5-.2.5-.5v-3c0-.3-.2-.5-.5-.5zm0 5c-.3 0-.5.2-.5.5v3c0 .3.2.5.5.5s.5-.2.5-.5v-3c0-.3-.2-.5-.5-.5z"/><path d="M6.51 3c-.3 0-.5.2-.5.5V4h-1v1h5v-.5c0-.2-.2-.5-.5-.5h-1.5v-.5c0-.3-.2-.5-.5-.5h-1zm3.5 2v1h-5v9h4v-4.3c-.1-.9.6-1.7 1.5-1.7h1.5V5.5c0-.3-.2-.5-.5-.5h-1.5z" opacity=".5"/><path d="M10.536 10h4c.3 0 .5.2.5.5s-.2.5-.5.5h-2.8l5.1 5.1c.2.2.2.5 0 .7s-.5.2-.7 0l-5.1-5.1v2.8c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-3.9c0-.3.1-.6.5-.6-.1 0 0 0 0 0z"/></svg>')
		},
		439: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g transform="translate(171)"><path d="M-159.52 3.02c-.3 0-.5.2-.5.5v.5h-1.5c-.3 0-.5.3-.5.5v.5h6v-.5c0-.3-.1-.5-.5-.5h-1.5v-.5c0-.3-.2-.5-.5-.5h-1zm3.5 2v1h-6v-1h-1.5c-.3 0-.5.2-.5.5v3.5h2.5c.8 0 1.5.6 1.5 1.5v4.5h5.5c.3 0 .5-.2.5-.5v-9c0-.3-.2-.5-.5-.5h-1.5z" opacity=".5"/><path d="M-161.52 10.02h-4c-.3 0-.5.2-.5.5s.2.5.5.5h2.8l-5.1 5.1c-.2.2-.2.5 0 .7s.5.2.7 0l5.1-5.1v2.8c0 .3.2.5.5.5s.5-.2.5-.5v-3.9c0-.3-.11-.6-.5-.6.1 0 0 0 0 0z"/></g></svg>')
		},
		440: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 4.02v11.96h2V4.02H6zm6 0v11.96h2V4.02h-2z"/></svg>')
		},
		441: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6.03 4c-.5 0-1 .5-1 1v10c0 .8.9 1.3 1.5.8l8-5c.6-.4.6-1.3 0-1.7l-8-5c-.1-.1-.3-.1-.5-.1z" fill-rule="evenodd" clip-rule="evenodd"/></svg>')
		},
		442: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="none" d="M0 0h20v20H0z"/><path fill-rule="evenodd" d="M3.5 3c-.3 0-.5.2-.5.5v3c0 .3.2.5.5.5h.9L8 13.6v2.9c0 .3.2.5.5.5h3c.3 0 .5-.2.5-.5v-2.9L15.6 7h.9c.3 0 .5-.2.5-.5v-3c0-.3-.2-.5-.5-.5h-3c-.3 0-.5.2-.5.5V4H7v-.5c0-.3-.2-.5-.5-.5h-3zM4 4h2v2H4V4zm10 0h2v2h-2V4zM7 5h6v1.5c0 .3.2.5.5.5h.9l-3.2 6H8.8L5.6 7h.9c.3 0 .5-.2.5-.5V5zm2 9h2v2H9v-2z" clip-rule="evenodd"/></svg>')
		},
		443: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 7.45v7.3c0 .5.2.9.5 1.3.3.3.8.5 1.3.5h6.5c.5 0 .9-.2 1.3-.5.3-.3.5-.8.5-1.3v-7.3h-1v7.3c0 .3-.1.4-.2.6-.1.1-.3.2-.6.2H6.8c-.3 0-.4-.1-.6-.2-.1-.1-.2-.3-.2-.6v-7.3H5zm3.5-4c-.3 0-.5.2-.5.5v1.5H4.5c-.7 0-.7 1 0 1h11c.7 0 .7-1 0-1H12v-1.5c0-.3-.2-.5-.5-.5h-3zm.5 1h2v1H9v-1z"/><path d="M8.5 8.45c-.3 0-.5.2-.5.5v4c0 .7 1 .7 1 0v-4c0-.3-.2-.5-.5-.5zm3 0c-.3 0-.5.2-.5.5v4c0 .7 1 .7 1 0v-4c0-.3-.2-.5-.5-.5z" opacity=".6"/></svg>')
		},
		444: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4.08 8.57c-.8 1-1.2 2.2-1 3.5.2 1.8 1.6 3.3 3.3 3.8 1.4.4 2.9 0 4-.9-.3.1-.6.1-.9.1-.4 0-.8 0-1.1-.1-.6.1-1.2.2-1.8 0-1.4-.4-2.4-1.5-2.6-2.9-.1-.5 0-.9.1-1.3-.1-.4-.1-.7-.1-1.1 0-.5 0-.8.1-1.1z" opacity=".8"/><path d="M8.08 5.27c-1.8.6-3.1 2.3-3.1 4.3 0 2.5 2 4.5 4.5 4.5.5 0 1-.1 1.4-.2-.6-.2-1.1-.4-1.6-.8-1.9-.1-3.3-1.6-3.3-3.5 0-1.1.5-2 1.3-2.7.2-.6.4-1.2.8-1.6z"/><path d="M12.48 3.97c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5zm0 2c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z"/></svg>')
		},
		445: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10.05 13.05h1v2h-1v-2zm-2 0h1v2h-1v-2zm-2 0h1v2h-1v-2zm-.5-10c-.8 0-1.5.7-1.5 1.5v10.9c0 .8.7 1.5 1.5 1.5h8.9c.7 0 1.4-.5 1.5-1.2V4.55c0-.8-.7-1.5-1.5-1.5h-8.9zm0 9h8.9c.3 0 .5.2.5.5v2.9c0 .3-.2.5-.5.5h-8.9c-.3 0-.5-.2-.5-.5v-2.9c0-.3.2-.5.5-.5z"/></svg>')
		},
		446: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7.5 3c-.2 0-.4.1-.4.3l-3.8 8.3c-.1.3-.3.5-.3.9 0 .8.5 1.5 1.3 1.9s1.8.6 3 .6c.3 0 .5-.2.5-.5v-.7-.7c0-1.9 1-3.5 2.5-4.4.2-.1.3-.4.2-.7L7.9 3.4c-.1-.3-.2-.4-.4-.4zM15 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-2 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 1c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm-.5 1c-.8 0-1.5.7-1.5 1.5 0 .3.2.5.5.5s.5-.2.5-.5.2-.5.5-.5.5-.2.5-.5c0-.2-.3-.5-.5-.5z"/></svg>')
		},
		447: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 6c-.3 0-.5.2-.5.5v7c0 .4.5.6.8.4l5-3.5c.3-.2.3-.6 0-.8l-5-3.5C6.2 6 6.1 6 6 6zm6.5-1v10h2V5h-2z" fill-rule="evenodd" clip-rule="evenodd"/></svg>')
		},
		448: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14 6c.3 0 .5.2.5.5v7c0 .4-.5.6-.8.4l-5-3.5c-.3-.2-.3-.6 0-.8l5-3.5c.1-.1.2-.1.3-.1zM7.5 5v10h-2V5h2z" fill-rule="evenodd" clip-rule="evenodd"/></svg>')
		},
		449: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g transform="matrix(0 -1 -1 0 409 409)"><path d="M392.5 397.73c-.28 0-.5.23-.49.51l-.01 7.26c0 .28.22.5.5.5l7.26-.01a.5.5 0 00.51-.49.5.5 0 00-.49-.51h-.01L393 405l.01-6.76a.5.5 0 00-.49-.51h-.02z" opacity=".5"/><path d="M406 401.95l-4 4V396l-9.96-.01 3.85-3.85.15-.15 9.96.01v9.95zm-1-.42v-7.97l-2 2v7.97l2-2zm-.56-8.54l-7.98-.01-2 2 7.98.01 2-2z"/></g></svg>')
		},
		450: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g id="shape-combine-difference_1_" class="st1"><g id="g24262-4_1_" transform="translate(-188.996 -1801.003)" class="st1"><path id="rect24246-3_1_" d="M192 1808v2h1v-1h1v-1h-2zm0 4v2h1v-2h-1zm0 4v2h2v-1h-1v-1h-1zm9 0v1h-1v1h2v-2h-1zm-5 1v1h2v-1h-2z"/></g><path id="path24264-0_1_" d="M7.5 3c-.3 0-.5.2-.5.5v4c0 .3.2.5.5.5H12v4.5c0 .3.2.5.5.5h4c.3 0 .5-.2.5-.5v-9c0-.3-.2-.5-.5-.5h-9z"/></g></svg>')
		},
		451: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g id="shape-combine-intersect_1_" class="st1"><path id="path24344-9_1_" d="M7.5 7c-.3 0-.5.2-.5.5v5c0 .3.2.5.5.5h5c.3 0 .5-.2.5-.5v-5c0-.3-.2-.5-.5-.5h-5z"/><g id="g24392-5_1_" transform="translate(-166.996 -1801.003)" class="st1"><path id="rect24376-2_1_" d="M174 1804v2h1v-1h1v-1h-2zm4 0v1h2v-1h-2zm4 0v1h1v1h1v-2h-2zm1 4v2h1v-2h-1zm-13 0v2h1v-1h1v-1h-2zm13 4v1h-1v1h2v-2h-1zm-13 0v2h1v-2h-1zm0 4v2h2v-1h-1v-1h-1zm9 0v1h-1v1h2v-2h-1zm-5 1v1h2v-1h-2z"/></g></g></svg>')
		},
		452: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7.5 3c-.3 0-.5.2-.5.5V7H3.5c-.3 0-.5.2-.5.5v9c0 .3.2.5.5.5h9c.3 0 .5-.2.5-.5V13h3.5c.3 0 .5-.2.5-.5v-9c0-.3-.2-.5-.5-.5h-9z"/></svg>')
		},
		453: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7.5 3c-.3 0-.5.2-.5.5v3c0 .3.2.5.5.5H13v5.5c0 .3.2.5.5.5h3c.3 0 .5-.2.5-.5v-9c0-.3-.2-.5-.5-.5h-9zm-4 4c-.3 0-.5.2-.5.5v9c0 .3.2.5.5.5h9c.3 0 .5-.2.5-.5v-3c0-.3-.2-.5-.5-.5H7V7.5c0-.3-.2-.5-.5-.5h-3z"/></svg>')
		},
		454: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4.46 2.99c-.8 0-1.5.7-1.5 1.5 0 .2.1.5.2.7l5.5 11c.4.7 1.3 1 2 .7.3-.1.5-.4.7-.7l5.5-11c.4-.7.1-1.6-.7-2-.2-.1-.4-.2-.7-.2h-11zm2.4 3h6.1l-3.1 6.1-3-6.1z"/></svg>')
		},
		455: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10.05 13.05h1v2h-1v-2zm-2 0h1v2h-1v-2zm-2 0h1v2h-1v-2zm-.5-10c-.8 0-1.5.7-1.5 1.5v10.9c0 .8.7 1.5 1.5 1.5h8.9c.7 0 1.4-.5 1.5-1.2V4.55c0-.8-.7-1.5-1.5-1.5h-8.9zm0 9h8.9c.3 0 .5.2.5.5v2.9c0 .3-.2.5-.5.5h-8.9c-.3 0-.5-.2-.5-.5v-2.9c0-.3.2-.5.5-.5z"/></svg>')
		},
		456: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.95 3c-2.5 0-4.5 1.8-4.9 4.1.5-.1 1-.1 1.5-.1.7.1.6 1.1-.1 1-.5-.1-1 0-1.4.1.1 2.7 2.2 4.8 4.9 4.9.1-.5.2-1 .1-1.5 0-.3.2-.6.5-.6s.5.2.5.4c.1.5 0 1-.1 1.5 2.3-.4 4.1-2.5 4.1-4.9-.1-2.7-2.3-4.9-5.1-4.9zm-1.6 4.8c.1 0 .2 0 .3.1.5.4 1 .8 1.4 1.4s-.5 1.1-.8.6c-.3-.4-.7-.8-1.1-1.1-.5-.3-.3-1 .2-1z" clip-rule="evenodd"/><path d="M5.45 7.8c-.1 0-.2 0-.3.1C3.45 9 2.65 11 3.05 13s1.9 3.5 3.9 3.9 4-.4 5.1-2c.2-.2.1-.5-.1-.7-.2-.2-.5-.1-.7.1-.9 1.3-2.5 2-4.1 1.6s-2.8-1.6-3.1-3.2c-.3-1.6.4-3.2 1.7-4.1.2-.2.3-.5.1-.7-.1-.1-.2-.1-.4-.1z"/></svg>')
		},
		457: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6.97 3c-.7 0-.7 1 0 1h1.5v1.1c-2.8.5-5 2.9-5 5.9 0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.2-.4-2.4-1-3.3 0 0 .1 0 .1-.1l1.8-1.8c.2-.2.2-.5 0-.7-.1-.1-.2-.2-.4-.2-.1 0-.3.1-.3.2l-1.8 1.8c-1.1-1.2-2.7-1.9-4.4-1.9V4h1.5c.7 0 .7-1 0-1h-4zm2.5 3c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M8.97 7c-.3 0-.5.2-.5.5v3.9c0 .1 0 .3.1.4.1.1.3.1.4.1h2.9c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-2.4V7.4c0-.2-.2-.4-.5-.4z"/></svg>')
		},
		458: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M3.95 7.42c0-.1.1-.3.2-.3l4-4c.2-.2.5-.2.7 0l4 4c.2.2.2.5 0 .7-.2.2-.5.2-.7 0l-3.1-3.1v9.8c0 .8.7 1.5 1.5 1.5h5c.3 0 .5.2.5.5s-.2.5-.5.5h-5c-1.4 0-2.5-1.1-2.5-2.5v-9.8l-3.1 3.1c-.2.2-.5.2-.7 0-.3-.1-.3-.3-.3-.4z"/></svg>')
		},
		459: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M3.5 3c-.3 0-.5.2-.5.5V7h1V4h3V3H3.5zM13 3v1h3v3h1V3.5c0-.3-.2-.5-.5-.5H13zM3 13v3.5c0 .3.2.5.5.5H7v-1H4v-3H3zm13 0v3h-3v1h3.5c.3 0 .5-.2.5-.5V13h-1z" opacity=".6"/><path d="M6.5 6c-.3 0-.5.2-.5.5v7c0 .3.2.5.5.5h7c.3 0 .5-.2.5-.5v-7c0-.3-.2-.5-.5-.5h-7z"/></svg>')
		},
		460: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13.7 3c-.8 0-1.6.3-2.2.9L10 5.2c-.2.2-.2.5 0 .7s.5.2.7 0l1.3-1.3c.4-.4 1-.6 1.4-.6s1.1.3 1.6.8c.6.6.8 1 .8 1.7s-.2 1-.6 1.4L14 9.2c-.2.2-.2.5 0 .7s.5.2.7 0L16 8.6c.6-.6 1-1.4 1-2.2 0-.8-.5-1.6-1.2-2.3-.6-.7-1.4-1-2.2-1.1zm-8.2 7l-.3.1L4 11.4c-.6.6-.9 1.4-.9 2.2 0 .8.4 1.6 1.1 2.3.7.7 1.5 1.1 2.3 1.1s1.6-.2 2.2-.8L9.8 15c.2-.2.2-.5 0-.7s-.5-.2-.7 0l-1.3 1.3c-.4.4-.9.6-1.4.6s-1-.3-1.7-.8c-.6-.6-.8-1.1-.8-1.6s.2-1 .6-1.4L5.8 11c.2-.2.2-.5 0-.7 0-.5-.1-.5-.3-.5z" opacity=".6"/></svg>')
		},
		461: function (e, t, n) {
			'use strict'
			n.r(t),
				(t.default =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 5.45c-3.3 0-5 2.7-6.4 4.2-.2.2-.2.5 0 .7 1.3 1.4 3.1 4.2 6.4 4.2s5-2.7 6.4-4.2c.2-.2.2-.5 0-.7-1.4-1.5-3.1-4.2-6.4-4.2zm0 1c1.9 0 3.5 1.6 3.5 3.5s-1.6 3.5-3.5 3.5-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5zm0 2c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z"/></svg>')
		},
		478: function (e, t, n) {
			'use strict'
			n.r(t)
			var a = n(1),
				r = n.n(a),
				i = n(125),
				o = n(3),
				s = n.n(o),
				l = n(379),
				c = n(163),
				d = n(384),
				u = n(85),
				m = n(166),
				p = function (e, t, n, a) {
					return new (n || (n = Promise))(function (r, i) {
						function o(e) {
							try {
								l(a.next(e))
							} catch (e) {
								i(e)
							}
						}
						function s(e) {
							try {
								l(a.throw(e))
							} catch (e) {
								i(e)
							}
						}
						function l(e) {
							var t
							e.done
								? r(e.value)
								: ((t = e.value),
								  t instanceof n
										? t
										: new n(function (e) {
												e(t)
										  })).then(o, s)
						}
						l((a = a.apply(e, t || [])).next())
					})
				}
			class h extends u.a {
				constructor(e) {
					super(),
						(this.bRunOnLocal = e),
						(this.response_promises = []),
						(this.increment_deferred_id = 0),
						(this.bCanvasMounted = !1),
						(this.proxyComunicationResponse = this.proxyComunicationResponse.bind(this)),
						(this.onDeamonMessage = this.onDeamonMessage.bind(this)),
						this.bRunOnLocal
							? ((this.executor = new d.a()),
							  this.executor.attach('event', e => {
									if (e) {
										const t = Object.assign({ type: 'event' }, e)
										this.dispatch(t.event, t.data ? JSON.parse(t.data) : void 0)
									}
							  }))
							: ((this.deamonWorker = new Worker('deamon.js')),
							  this.deamonWorker.addEventListener('message', this.onDeamonMessage))
				}
				hasAutosave() {
					return m.a.has('autosave')
				}
				getAutosaveProjectId() {
					var e
					return this.hasAutosave()
						? null === (e = m.a.get('autosave', void 0)) || void 0 === e
							? void 0
							: e.id
						: void 0
				}
				autosave(e) {
					return new Promise((t, n) => {
						this.ask('export-json', e)
							.then(e => {
								e ? (m.a.set('autosave', e), t()) : n()
							})
							.catch(n)
					})
				}
				restoreAutosave() {
					return p(this, void 0, void 0, function* () {
						const e = m.a.get('autosave', void 0, !0)
						e && this.ask('import-json', e)
					})
				}
				setDrawer(e, t, n, a) {
					if (!this.bCanvasMounted && e) {
						if (((this.bCanvasMounted = !0), this.bRunOnLocal))
							return (
								console.log('Drawer work sync'),
								this.proxyComunicationDispatcher('set-drawer', 'set-drawer', {
									canvas: e,
									size: t,
									ratio: n,
									resolution: a,
								})
							)
						{
							console.log('Drawer work on async service')
							const r = e.transferControlToOffscreen()
							return this.proxyComunicationDispatcher(
								'set-drawer',
								'set-drawer',
								{ canvas: r, size: t, ratio: n, resolution: a },
								[r]
							)
						}
					}
					return this.proxyComunicationDispatcher('set-drawer', 'set-drawer', { size: t, ratio: n, resolution: a })
				}
				run(e, t, n) {
					const a = { args: t, preventPushToHistory: n }
					return this.proxyComunicationDispatcher('run', e, a)
				}
				ask(e, t, n) {
					return this.proxyComunicationDispatcher('ask', e, t, n)
				}
				undo() {
					return this.proxyComunicationDispatcher('undo', 'undo')
				}
				redo() {
					return this.proxyComunicationDispatcher('redo', 'redo')
				}
				history(e = 0) {
					return this.proxyComunicationDispatcher('history', 'history', e)
				}
				onDeamonMessage(e) {
					const t = e.data
					if ('event' == t.type) {
						const e = t
						this.dispatch(e.event, e.data ? JSON.parse(e.data) : void 0)
					} else {
						const e = t
						this.proxyComunicationResponse(e)
					}
				}
				proxyComunicationDispatcher(e, t, n, a) {
					return p(this, void 0, void 0, function* () {
						const r = this.createDeferred(),
							i = ++this.increment_deferred_id,
							o = { type: e, command: t, args: n, deferred_id: i }
						return (
							this.dispatch('executor-work', { waiting: this.response_promises.length }),
							this.response_promises.push({ deferred_id: i, promise: r }),
							this.bRunOnLocal
								? this.proxyComunicationResponse(yield this.executor.read(o))
								: this.deamonWorker.postMessage(o, a),
							r.promise
						)
					})
				}
				proxyComunicationResponse(e) {
					e && e.data && 'string' == typeof e.data && (e.data = JSON.parse(e.data))
					for (let t = 0, n = this.response_promises.length; t < n; t++)
						if (this.response_promises[t].deferred_id === e.deferred_id) {
							'response-unresolved' === e.type
								? this.response_promises[t].promise.reject(e.data)
								: this.response_promises[t].promise.resolve(e.data),
								this.response_promises.splice(t, 1)
							break
						}
					return (
						0 == this.response_promises.length &&
							((this.increment_deferred_id = 0),
							this.dispatch('executor-work', { waiting: this.response_promises.length })),
						'execution-effect' == e.type && this.dispatch(e.effect, e.data),
						e
					)
				}
				createDeferred() {
					const e = { resolve: void 0, reject: void 0, promise: void 0 },
						t = new Promise((t, n) => {
							;(e.resolve = t), (e.reject = n)
						})
					return (e.promise = t), e
				}
			}
			var g = h,
				v = n(165),
				f = n(86),
				b = n(380),
				y = n(118)
			const w = new g(!Object(y.a)())
			w.attach('project:init', e => {
				f.a.dispatch(Object(b.b)(e))
			}),
				w.attach('project:update-properties', e => {
					f.a.dispatch(Object(b.g)(e))
				}),
				w.attach('scene:update-layers', e => {
					const t = e
					f.a.dispatch(Object(b.f)(t.layers, t.selecteds))
				}),
				w.attach('scene:update-scene_child-prop', e => {
					f.a.dispatch(Object(b.d)(e))
				}),
				w.attach('scene:update-scene_child-ui-prop', e => {
					f.a.dispatch(Object(b.e)(e))
				}),
				w.attach('timeline:change_status', e => {
					f.a.dispatch(Object(l.e)(e == v.a.START))
				}),
				w.attach('timeline:update_sequence', e => {
					f.a.dispatch(Object(b.h)(e))
				}),
				w.attach('command_history:update_history', e => {
					f.a.dispatch(Object(b.a)(e))
				})
			var E = w
			const x = s.a.color('dark-lighten').alpha(0.9),
				_ = c.b.div`
    position: fixed;
    top: ${s.a.add(2, 0)};
    left: ${s.a.add(2, 0)};
    background: ${x.toString('rgba')};
    font-size: 1rem;
    border-radius: 2px;
    z-index: 2;
`,
				k = c.b.li`
    position: relative;
    padding: 0 ${s.a.ms(0)} 0 ${s.a.ms(-1)};
    cursor: pointer;

    &:hover { 
        background: ${s.a.color('dark-verylighten')};
    }

    &:before {
        display: inline-block; 
        vertical-align: middle;
        content: ' ';
        width: 5px;
        height: 5px;
        border-radius: 3px;
        transform: translateY(-2px);
        z-index: 1;
        margin-right: ${s.a.ms(-1)};
        ${e => e.current && 'background: #fff;'}
    }
`
			var O = Object(i.b)(e => ({ history: e.project.history }))(({ history: e }) => {
					function t(e) {
						E.history(e)
					}
					let n = !1
					return a.createElement(
						_,
						null,
						a.createElement(
							'div',
							{
								style: {
									borderBottom: '1px solid ' + s.a.color('dark-verylighten'),
									padding: `${s.a.ms(-1)} ${s.a.ms(0)}`,
								},
							},
							'History'
						),
						a.createElement(
							'ul',
							{
								style: {
									margin: 0,
									padding: s.a.ms(-2) + ' 1px',
									listStyle: 'none',
									maxHeight: '70vh',
									overflow: 'auto',
								},
							},
							e.length > 0 &&
								e.map(
									e => (
										(n = n || e.bLast),
										a.createElement(k, { current: e.bLast, key: e.id, onClick: () => t(e.level) }, e.command)
									)
								),
							a.createElement(k, { current: !n, onClick: () => t(e.length) }, 'Original')
						)
					)
				}),
				C = function (e, t) {
					var n = {}
					for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a])
					if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
						var r = 0
						for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
							t.indexOf(a[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[r]) && (n[a[r]] = e[a[r]])
					}
					return n
				}
			const j = c.b.ul`
    background: ${s.a.color('dark-lighten')};
    line-height: ${s.a.ms(1)};
    position: absolute;
    margin: 0; 
    padding: ${s.a.ms(-2)} 1px; 
    top: 100%;
    left: 0;
    list-style: none; 
    transform: translateY(-2px);

    li {
        padding: 0 ${s.a.ms(0)};
        white-space: nowrap;

        &:hover {
            background: ${s.a.color('dark-verylighten')}
        }
    }
`
			var $ = e => {
				var { actions: t } = e,
					n = C(e, ['actions'])
				return a.createElement(
					j,
					null,
					t.map((e, t) =>
						null == e
							? a.createElement('li', {
									key: t,
									style: {
										height: '1px',
										lineHeight: 0,
										margin: s.a.ms(-2) + ' 0',
										background: s.a.color('dark-verylighten').toString(),
									},
							  })
							: a.createElement('li', { key: t, onClick: () => e.action(n) }, e.name)
					)
				)
			}
			var z = [
					{
						name: 'Splash Screen',
						action: () => {
							f.a.dispatch(Object(l.g)())
						},
					},
					{
						name: 'Support',
						action: () => {
							console.log('support')
						},
					},
				],
				S = function (e, t, n = 3e3) {
					const { message_id: a } = f.a.dispatch(Object(l.f)(e, t))
					setTimeout(() => {
						f.a.dispatch(Object(l.a)(a))
					}, n)
				},
				M = n(120),
				A = function (e, t, n, a) {
					return new (n || (n = Promise))(function (r, i) {
						function o(e) {
							try {
								l(a.next(e))
							} catch (e) {
								i(e)
							}
						}
						function s(e) {
							try {
								l(a.throw(e))
							} catch (e) {
								i(e)
							}
						}
						function l(e) {
							var t
							e.done
								? r(e.value)
								: ((t = e.value),
								  t instanceof n
										? t
										: new n(function (e) {
												e(t)
										  })).then(o, s)
						}
						l((a = a.apply(e, t || [])).next())
					})
				}
			function D(e, t, n) {
				const a = new Blob([t], { type: n }),
					r = URL.createObjectURL(a),
					i = document.createElement('a')
				i.setAttribute('href', r),
					i.setAttribute('download', e),
					i.setAttribute('target', '_blank'),
					document.body.appendChild(i),
					i.click(),
					URL.revokeObjectURL(r),
					i.remove()
			}
			function L(e = !1) {
				return A(this, void 0, void 0, function* () {
					return new Promise(e => {
						const t = document.createElement('input')
						t.setAttribute('type', 'file'),
							t.setAttribute('accept', '.' + M.a.file_extension),
							(t.style.position = 'absolute'),
							(t.style.top = '-100000'),
							(t.style.left = '-100000'),
							(t.style.display = 'none'),
							t.addEventListener(
								'change',
								n =>
									A(this, void 0, void 0, function* () {
										const a = yield (function (e) {
											if (e.target.files && e.target.files.length > 0) {
												const t = e.target.files[0],
													n = new TextDecoder('utf-8')
												return new Promise(e => {
													const a = new FileReader()
													a.addEventListener(
														'load',
														() =>
															A(this, void 0, void 0, function* () {
																const t = a.result
																try {
																	const a = n.decode(t)
																	e(a)
																} catch (t) {
																	e(null)
																}
															}),
														{ passive: !0 }
													),
														a.readAsArrayBuffer(t)
												})
											}
											return Promise.resolve(null)
										})(n)
										t.remove(), e(a)
									}),
								{ passive: !0 }
							),
							document.body.appendChild(t),
							t.click()
					})
				})
			}
			var P = n(164),
				R = n.n(P)
			const T = document.getElementById('prompt-root'),
				B = ({ onResult: e, label: t, defaultValue: n }) => {
					const r = a.createRef(),
						i = a.createRef()
					function o() {
						var t
						const n = (null === (t = i.current) || void 0 === t ? void 0 : t.value) || ''
						n.length > 0 ? e(n) : s()
					}
					function s() {
						if (r.current) {
							const e = r.current
							e.classList.remove('prompt--focus'),
								setTimeout(() => {
									var t
									e.classList.add('prompt--focus'),
										null === (t = i.current) || void 0 === t || t.focus(),
										setTimeout(() => {
											e.classList.remove('prompt--focus')
										}, 500)
								})
						}
					}
					return (
						a.useEffect(
							() => (
								(T.className = 'open'),
								document.addEventListener('click', s, { passive: !0 }),
								() => {
									;(T.className = ''), document.removeEventListener('click', s)
								}
							),
							[]
						),
						a.createElement(
							'div',
							{ ref: r, className: 'prompt' },
							a.createElement('div', { className: 'prompt__label' }, t),
							a.createElement('input', {
								className: 'prompt__input',
								autoFocus: !0,
								ref: i,
								defaultValue: n,
								onFocus: e => e.target.select(),
								onKeyDown: e => 13 == e.keyCode && o(),
							}),
							a.createElement(
								'div',
								{ className: 'prompt__confirm_buttons' },
								a.createElement('button', { className: 'prompt__button', onClick: o }, 'Save'),
								a.createElement('button', { className: 'prompt__button', onClick: () => e(null) }, 'Cancel')
							)
						)
					)
				},
				I = () => null
			var H = function (e, t) {
					return new Promise(n => {
						R.a.render(
							a.createElement(B, {
								onResult: function (e) {
									n(e), R.a.render(a.createElement(I, null), T)
								},
								label: e,
								defaultValue: t,
							}),
							T
						)
					})
				},
				F = function (e, t, n, a) {
					return new (n || (n = Promise))(function (r, i) {
						function o(e) {
							try {
								l(a.next(e))
							} catch (e) {
								i(e)
							}
						}
						function s(e) {
							try {
								l(a.throw(e))
							} catch (e) {
								i(e)
							}
						}
						function l(e) {
							var t
							e.done
								? r(e.value)
								: ((t = e.value),
								  t instanceof n
										? t
										: new n(function (e) {
												e(t)
										  })).then(o, s)
						}
						l((a = a.apply(e, t || [])).next())
					})
				}
			function N(e) {
				return F(this, void 0, void 0, function* () {
					const t = yield H('Set project name', M.a.empty_project_name)
					if (yield E.ask('import-json', JSON.stringify({ name: t, scene: {} })))
						return S(t + ' created.'), void (e && e())
					S('creation error')
				})
			}
			function q(e = !1, t) {
				return F(this, void 0, void 0, function* () {
					const n = yield L(e)
					if (n) {
						if (yield E.ask(e ? 'append-json' : 'import-json', n))
							return t && t(), void S(e ? 'added to scene' : 'imported')
					}
					S('error import')
				})
			}
			var V = [
				{
					name: 'New',
					action: () => {
						N()
					},
				},
				{
					name: 'Open',
					action: () => {
						q()
					},
				},
				{
					name: 'Recover',
					action: () => {
						E.restoreAutosave()
					},
				},
				{
					name: 'Import',
					action: () => {
						q(!0)
					},
				},
				{
					name: 'Save',
					action: ({ project: e }) => {
						E.autosave(e).then(() => {
							S('Save complete')
						})
					},
				},
				{
					name: 'Save As',
					action: ({ project: e }) =>
						F(void 0, void 0, void 0, function* () {
							const t = yield H('Project name', e.name && e.name.length > 0 ? e.name : M.a.empty_project_name)
							e.name = t
							const n = JSON.stringify(e),
								a = new TextEncoder().encode(n)
							D(e.name + '.' + M.a.file_extension, a, 'application/octet-stream')
						}),
				},
			]
			var U = [
				{
					name: 'Undo',
					action: () => {
						E.undo()
					},
				},
				{
					name: 'Redo',
					action: () => {
						E.redo()
					},
				},
				null,
				{
					name: 'History',
					action: ({ setOpenHistory: e }) => {
						e(!0)
					},
				},
			]
			var X = [
				{
					name: 'Render Image',
					action: () => {
						f.a.dispatch(Object(l.d)('render-image'))
					},
				},
				{
					name: 'Render Animation',
					action: () => {
						f.a.dispatch(Object(l.d)('render-animation'))
					},
				},
			]
			const G = document.getElementById('prompt-root'),
				Y = ({ onResult: e, label: t, ok: n, no: r }) => {
					const i = a.createRef()
					function o() {
						if (i.current) {
							const e = i.current
							e.classList.remove('prompt--focus'),
								setTimeout(() => {
									e.classList.add('prompt--focus'),
										setTimeout(() => {
											e.classList.remove('prompt--focus')
										}, 500)
								})
						}
					}
					return (
						a.useEffect(
							() => (
								(G.className = 'open'),
								document.addEventListener('click', o, { passive: !0 }),
								() => {
									;(G.className = ''), document.removeEventListener('click', o)
								}
							),
							[]
						),
						a.createElement(
							'div',
							{ ref: i, className: 'prompt' },
							a.createElement(
								'div',
								null,
								a.createElement('div', { className: 'prompt__label' }, t),
								a.createElement(
									'div',
									{ className: 'prompt__confirm_buttons' },
									a.createElement('button', { className: 'prompt__button', onClick: () => e(!0) }, n),
									a.createElement('button', { className: 'prompt__button', onClick: () => e(!1) }, r)
								)
							)
						)
					)
				},
				W = () => null
			var K = function (e, t = 'Accept', n = 'Cancel') {
					return new Promise(r => {
						R.a.render(
							a.createElement(Y, {
								onResult: function (e) {
									r(e), R.a.render(a.createElement(W, null), G)
								},
								label: e,
								ok: t,
								no: n,
							}),
							G
						)
					})
				},
				J = n(475),
				Z = n(464),
				Q = n.n(Z),
				ee = n(466),
				te = n.n(ee),
				ne = n(22),
				ae = function (e, t, n, a) {
					return new (n || (n = Promise))(function (r, i) {
						function o(e) {
							try {
								l(a.next(e))
							} catch (e) {
								i(e)
							}
						}
						function s(e) {
							try {
								l(a.throw(e))
							} catch (e) {
								i(e)
							}
						}
						function l(e) {
							var t
							e.done
								? r(e.value)
								: ((t = e.value),
								  t instanceof n
										? t
										: new n(function (e) {
												e(t)
										  })).then(o, s)
						}
						l((a = a.apply(e, t || [])).next())
					})
				}
			class re {
				static isSVG(e) {
					return re.SVG_REGEX.test(e.replace(re.COMMENT_REGEX, ''))
				}
				static parse(e) {
					if ('undefined' == typeof DOMParser) return console.warn('DOMParser not defined'), null
					return new DOMParser().parseFromString(e, 'image/svg+xml').querySelector('svg')
				}
				static toBuffers(e, t = 0.001) {
					const n = re.parse(e)
					if (null === n) return []
					const a = re.getViewbox(n)
					n.querySelectorAll('g').forEach(re.propagateGroupTransformToChildren)
					const r = Array.from(n.querySelectorAll('rect, circle, ellipse, line, polyline, polygon, path')),
						i = [].concat(...r.map(e => re.elementToPath(e))),
						o = Math.max(a[2] - a[0], a[3] - a[1])
							.toExponential(1)
							.match(/e(\+?[0-9]+)/),
						s = 10 / (1e3 / Math.min(Math.pow(10, Math.max(o ? +o[1] : 0, 0)), 1e3))
					let l = i.map(e => re.pathToBuffer(e, s, a))
					if (((l = l.map(e => re.simpliyBuffer(e, t))), l.length <= 0)) return []
					const c = []
					for (let e = 0; e < l.length; e++) c.push({ buffer: l[e], closed: re.pathIsClosed(i[e]) })
					return c
				}
				static toBuffersAsync(e, t = 0.001) {
					return ae(this, void 0, void 0, function* () {
						return re.toBuffers(e, t)
					})
				}
				static getViewbox(e) {
					const t = e.getAttribute('viewBox')
					if (t) return t.split(' ').map(e => parseFloat(e))
					e = e.cloneNode(!0)
					const n = Array.from(e.querySelectorAll('rect, circle, ellipse, line, polyline, polygon, path')),
						a = [].concat(...n.map(e => re.elementToPath(e)))
					if (a.length > 0) {
						let e = 0,
							t = 0
						for (let n = 0, r = a.length; n < r; n++) {
							const r = ne.a.getBounding(re.pathToBuffer(a[n], 1))
							;(r.width += r.x), (r.height += r.y), r.width > e && (e = r.width), r.height > t && (t = r.height)
						}
						return [0, 0, e, t]
					}
					return [-1, -1, 1, 1]
				}
				static pathIsClosed(e) {
					var t
					return (
						'z' === (null === (t = e.getAttribute('d')) || void 0 === t ? void 0 : t.trim().substr(-1).toLowerCase())
					)
				}
				static simpliyBuffer(e, t = 0.01) {
					const n = []
					for (let t = 0, a = e.length; t < a; t += 2) n.push({ x: e[t], y: e[t + 1] })
					const a = te()(n, t, !0)
					return (
						a.forEach((t, n) => {
							;(e[2 * n] = t.x), (e[2 * n + 1] = t.y)
						}),
						e.subarray(0, 2 * a.length)
					)
				}
				static pathToBuffer(e, t = 0.01, n = [-1, -1, 1, 1]) {
					const a = n[2] - n[0],
						r = n[3] - n[1],
						i = a > r ? 1 : a / r,
						o = a > r ? r / a : 1,
						s = e.getAttribute('transform') || ''
					let l
					if (s.length > 0) {
						const e = Object(J.a)(Object(J.b)(Object(J.c)(s)))
						l = new Q.a.Matrix(e.a, e.b, e.c, e.d, e.e, e.f)
					}
					const c = Q.a.path.map(e.getAttribute('d') || '', l),
						d = Math.floor(Q.a.path.getTotalLength(c)),
						u = 2 * Math.floor(d / t),
						m = new Float32Array(u)
					for (let e = 0, n = 0; e < d; e += t, n += 2) {
						const { x: t, y: s } = Q.a.path.getPointAtLength(c, e)
						;(m[n] = i * (t / a) * 2 - 1),
							(m[n + 1] = o * (s / r) * 2 - 1),
							i < 1 && (m[n] += 1 - i),
							o < 1 && (m[n + 1] += 1 - o)
					}
					return m
				}
				static propagateGroupTransformToChildren(e) {
					const t = e.getAttribute('transform')
					if (t && t.length > 0) {
						const n = Object(J.a)(Object(J.b)(Object(J.c)(t))),
							a = e.children
						Array.from(a).forEach(e => {
							const a = e.getAttribute('transform')
							if (a && a.length > 0) {
								const t = Object(J.a)(Object(J.b)(Object(J.c)(a))),
									r = Object(J.a)(t, n)
								e.setAttribute('transform', Object(J.d)(r))
							} else e.setAttribute('transform', t)
						})
					}
				}
				static elementToPath(e) {
					const t = e.getAttribute('transform') || ''
					if ('path' == e.nodeName) {
						const n = e.getAttribute('d') || ''
						return Q.a.path
							.toAbsolute(n)
							.map(e => `${e.shift()}${e.join(',')}`)
							.join(' ')
							.split('M')
							.filter(e => e.length > 0)
							.map(e => 'M' + e)
							.map(e => {
								const n = document.createElementNS('http://www.w3.org/2000/svg', 'path')
								return n.setAttribute('d', e), n.setAttribute('transform', t), n
							})
					}
					const n = document.createElementNS('http://www.w3.org/2000/svg', 'path')
					return n.setAttribute('d', re.conversion[e.nodeName](e)), n.setAttribute('transform', t), n
				}
			}
			;(re.SVG_REGEX = /^\s*(?:<\?xml[^>]*>\s*)?(?:<!doctype svg[^>]*\s*(?:\[?(?:\s*<![^>]*>\s*)*\]?)*[^>]*>\s*)?(?:<svg[^>]*>[^]*<\/svg>|<svg[^/>]*\/\s*>)\s*$/i),
				(re.COMMENT_REGEX = /<!--([\s\S]*?)-->/g),
				(re.conversion = {
					fromPercentage: (e, t) => (/%$/.test(e + '') ? (100 * parseFloat((e + '').replace('%', ''))) / t : +e),
					chunkArray: (e, t = 2) => {
						const n = []
						for (; e.length > 0; ) n.push(e.splice(0, t))
						return n
					},
					rect: e => {
						const t = parseFloat(e.getAttribute('width') || '0'),
							n = parseFloat(e.getAttribute('height') || '0'),
							a = parseFloat(e.getAttribute('x') || '0'),
							r = parseFloat(e.getAttribute('y') || '0')
						let i = e.getAttribute('rx') || 'auto',
							o = e.getAttribute('ry') || 'auto'
						'auto' === i && 'auto' === o
							? (i = o = 0)
							: 'auto' !== i && 'auto' === o
							? (i = o = re.conversion.fromPercentage(i, t))
							: 'auto' !== o && 'auto' === i
							? (o = i = re.conversion.fromPercentage(o, n))
							: ((i = re.conversion.fromPercentage(i, t)), (o = re.conversion.fromPercentage(o, n))),
							i > t / 2 && (i = t / 2),
							o > n / 2 && (o = n / 2)
						const s = i > 0 && o > 0
						return [
							`M${a + i} ${r}`,
							'H' + (a + t - i),
							...(s ? [`A${i} ${o} 0 0 1 ${a + t} ${r + o}`] : []),
							'V' + (r + n - o),
							...(s ? [`A${i} ${o} 0 0 1 ${a + t - i} ${r + n}`] : []),
							'H' + (a + i),
							...(s ? [`A${i} ${o} 0 0 1 ${a} ${r + n - o}`] : []),
							'V' + (r + o),
							...(s ? [`A${i} ${o} 0 0 1 ${a + i} ${r}`] : []),
							'Z',
						].join(' ')
					},
					ellipse: e => {
						var t, n, a, r
						const i = parseFloat(e.getAttribute('cx') || '0'),
							o = parseFloat(e.getAttribute('cy') || '0'),
							s = parseFloat(
								null !== (n = null !== (t = e.getAttribute('rx')) && void 0 !== t ? t : e.getAttribute('r')) &&
									void 0 !== n
									? n
									: '0'
							),
							l = parseFloat(
								null !== (r = null !== (a = e.getAttribute('ry')) && void 0 !== a ? a : e.getAttribute('r')) &&
									void 0 !== r
									? r
									: '0'
							)
						return [
							`M${i + s} ${o}`,
							`A${s} ${l} 0 0 1 ${i} ${o + l}`,
							`A${s} ${l} 0 0 1 ${i - s} ${o}`,
							`A${s} ${l} 0 0 1 ${i + s} ${o}`,
							'Z',
						].join(' ')
					},
					circle: e => re.conversion.ellipse(e),
					line: e =>
						`M${e.getAttribute('x1') || '0'} ${e.getAttribute('y1') || '0'} L${e.getAttribute('x2') || '0'} ${
							e.getAttribute('y2') || '0'
						}`,
					polyline: e => {
						const t = (e.getAttribute('points') || '')
							.trim()
							.replace(/  +/g, ' ')
							.split(' ')
							.reduce((e, t) => [...e, ...(t.includes(',') ? t.split(',') : [t])], [])
						return re.conversion
							.chunkArray(t, 2)
							.map(([e, t], n) => `${0 === n ? 'M' : 'L'}${e} ${t}`)
							.join(' ')
					},
					polygon: e => re.conversion.polyline(e) + ' Z',
					path: e => e.getAttribute('d') + '',
				})
			var ie = re,
				oe = function (e, t, n, a) {
					return new (n || (n = Promise))(function (r, i) {
						function o(e) {
							try {
								l(a.next(e))
							} catch (e) {
								i(e)
							}
						}
						function s(e) {
							try {
								l(a.throw(e))
							} catch (e) {
								i(e)
							}
						}
						function l(e) {
							var t
							e.done
								? r(e.value)
								: ((t = e.value),
								  t instanceof n
										? t
										: new n(function (e) {
												e(t)
										  })).then(o, s)
						}
						l((a = a.apply(e, t || [])).next())
					})
				}
			var se = function ({ project: e, updateProjectProperties: t }) {
				const [n, r] = a.useState({ project_id: '', promptOpen: !1, interval: !1 })
				a.useEffect(() => {
					function e(e) {
						var t
						const n = (null === (t = e.clipboardData) || void 0 === t ? void 0 : t.getData('text')) || ''
						ie.isSVG(n) && f.a.dispatch(Object(l.d)('import-svg', { svg: n }))
					}
					return document.addEventListener('paste', e, { passive: !0 }), () => document.removeEventListener('paste', e)
				}, []),
					a.useEffect(() => {
						e.id != n.project_id && r(Object.assign(Object.assign({}, n), { project_id: e.id }))
					}, [e.id]),
					a.useEffect(() => {
						let a = 0
						function i(a) {
							if (70 == a.keyCode && Object(y.d)(a))
								return (
									document.fullscreenElement ? document.exitFullscreen() : document.body.requestFullscreen(),
									a.preventDefault()
								)
							if (n.promptOpen) 83 == a.keyCode && Object(y.d)(a) && a.preventDefault()
							else
								switch (a.keyCode) {
									case 32:
										E.ask('toggle-timeline')
										break
									case 90:
										Object(y.d)(a) && (a.shiftKey ? E.redo() : E.undo())
										break
									case 83:
										Object(y.d)(a) &&
											(a.preventDefault(),
											(function () {
												oe(this, void 0, void 0, function* () {
													if (!n.interval) {
														const e = E.getAutosaveProjectId()
														if (e && e != n.project_id) {
															if (!(yield K('Override exist autosave project?', 'Yes', 'No'))) {
																return void (
																	(yield K('Restore autosave project?', 'Yes', 'No')) &&
																	(r({ project_id: e, promptOpen: !1, interval: !0 }), E.restoreAutosave())
																)
															}
														}
													}
													if (void 0 === e.name || 0 === e.name.length) {
														r(Object.assign(Object.assign({}, n), { promptOpen: !0 }))
														const a = yield H('Set project name', M.a.empty_project_name)
														if (null == a) return void r(Object.assign(Object.assign({}, n), { promptOpen: !1 }))
														t({ name: a }),
															(e.name = a),
															(document.title = M.a.getDocumentProjectTitle(a)),
															r(Object.assign(Object.assign({}, n), { promptOpen: !1 }))
													}
													;(e.id !== n.project_id || (e.id === n.project_id && !n.interval)) &&
														r({ project_id: e.id, interval: !0, promptOpen: !1 }),
														E.autosave(e).then(() => S(e.name + ' saved'))
												})
											})())
								}
						}
						return (
							n.interval &&
								(a = setInterval(() => {
									S('autosave'), E.autosave(e)
								}, M.a.autosave_interval)),
							document.addEventListener('keydown', i),
							() => {
								document.removeEventListener('keydown', i), clearInterval(a)
							}
						)
					}, [e, n])
			}
			const le = c.b.ul`
    display: grid;
    grid-template-columns: repeat(4, max-content);
    align-items: center;
    list-style: none;
    margin: 0 ${s.a.ms(-2)};
    padding: 0 ${s.a.ms(-2)};
    font-size: .8rem;
    line-height: ${s.a.ms(2)};
    height: 100%;

    li ul { display: none; }

    ${e => e.enableSubMenu && '\n        li:hover ul { display: block; }\n    '}
`,
				ce = c.b.li`
    position: relative;
    z-index: 10;
    padding: ${s.a.ms(-2)} ${s.a.ms(-1)};
    line-height: 1;

    &:hover{ 
        background: ${s.a.color('dark-verylighten')};
        border-radius: 2px;
        cursor: pointer;
    }
`
			var de = a.memo(
					Object(i.b)(
						e => ({ project: e.project }),
						e => ({ updateProjectProperties: t => e(Object(b.g)(t)) })
					)(({ project: e }) => {
						const t = a.createRef(),
							[n, r] = a.useState(!1),
							[i, o] = a.useState(!1)
						return (
							a.useEffect(() => {
								function e(e) {
									if (e.data && e.data.event)
										switch (e.data.event) {
											case 'set-popup-window-value':
												console.log(e.data), E.run('set-prop', e.data.value)
										}
								}
								return window.addEventListener('message', e, !1), () => window.removeEventListener('message', e)
							}, []),
							se({ project: e, updateProjectProperties: b.g }),
							a.useEffect(() => {
								let e = 0
								function a(a) {
									var s
									e && clearTimeout(e),
										a.target == t.current || (null === (s = t.current) || void 0 === s ? void 0 : s.contains(a.target))
											? r(!n)
											: (i && o(!1), n && r(!1))
								}
								function s(a) {
									var i
									a.target == (null == t ? void 0 : t.current) ||
									(null === (i = null == t ? void 0 : t.current) || void 0 === i ? void 0 : i.contains(a.target))
										? e && clearTimeout(e)
										: !e &&
										  (e = setTimeout(() => {
												n && r(!1)
										  }, 1e3))
								}
								return (
									document.addEventListener('mousemove', s, { passive: !0 }),
									document.addEventListener('click', a, { passive: !0 }),
									() => {
										document.removeEventListener('mousemove', s), document.removeEventListener('click', a)
									}
								)
							}, [n, t, i]),
							a.createElement(
								'nav',
								{ role: 'navigation', ref: t },
								a.createElement(
									le,
									{ enableSubMenu: n },
									a.createElement(
										ce,
										null,
										a.createElement('img', {
											src: '/assets/images/logo.svg',
											style: { height: '18px', display: 'inline-block', verticalAlign: 'middle' },
										}),
										a.createElement($, { actions: z })
									),
									a.createElement(
										ce,
										null,
										a.createElement('div', null, 'File'),
										a.createElement($, { actions: V, project: e })
									),
									a.createElement(
										ce,
										null,
										a.createElement('div', null, 'Edit'),
										a.createElement($, { actions: U, setOpenHistory: o })
									),
									a.createElement(ce, null, 'Render', a.createElement($, { actions: X }))
								),
								i && a.createElement(O, null)
							)
						)
					})
				),
				ue = function (e, t) {
					var n = {}
					for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a])
					if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
						var r = 0
						for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
							t.indexOf(a[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[r]) && (n[a[r]] = e[a[r]])
					}
					return n
				}
			const me = c.c`
    0%{ opacity: 0; }
    100%{ opacity: 1; }
`,
				pe = s.a.color('dark').lighten(10),
				he = c.b.div`
    position: absolute;
    text-align: left;
    background: ${pe};
    font-size: ${e => (e.small ? '.7rem' : '.8rem')};
    padding: ${s.a.ms(-3)} ${s.a.ms(-2)};
    line-height: 1.2;
    border-radius: 4px;
    opacity: 0;
    pointer-events: none;
    z-index: 1000;
    white-space: pre;

    &:after{
        position: absolute;
        display: block;
        line-height: 0;
        font-size: 0;
        content: ' ';
    }

    ${e => {
			switch (e.position) {
				case 'bottom':
					return `\n                top: 120%;\n                left: 50%;\n                transform: translate(-50%, 0);\n                \n                &:after {\n                    left: 50%;\n                    bottom: 100%;\n                    transform: translate(-50%, 0%);\n                    border-bottom: 6px solid ${pe};\n                    border-left: 5px solid transparent;\n                    border-right: 5px solid transparent;\n                }\n            `
				case 'left':
					return `\n                top: 50%;\n                right: 120%;\n                transform: translate(0%, -50%);\n                \n                &:after {\n                    left: 100%;\n                    top: 50%;\n                    transform: translate(0%, -50%);\n                    border-left: 6px solid ${pe};\n                    border-top: 5px solid transparent;\n                    border-bottom: 5px solid transparent;\n                }\n            `
				case 'right':
					return `\n                top: 50%;\n                left: 120%;\n                transform: translate(0%, -50%);\n                \n                &:after {\n                    right: 100%;\n                    top: 50%;\n                    transform: translate(0%, -50%);\n                    border-right: 6px solid ${pe};\n                    border-top: 5px solid transparent;\n                    border-bottom: 5px solid transparent;\n                }\n            `
				case 'top':
					return `\n                bottom: 120%;\n                left: 50%;\n                transform: translate(-50%, 0);\n                \n                &:after {\n                    left: 50%;\n                    top: 100%;\n                    transform: translate(-50%, 0%);\n                    border-top: 6px solid ${pe};\n                    border-left: 5px solid transparent;\n                    border-right: 5px solid transparent;\n                }\n            `
			}
		}}
`,
				ge = c.b.div`
    position: relative;
    &:hover ${he} { 
        animation: ${e => (e.disabled ? null : me)} .1s .3s linear both;
    }
`
			var ve = a.memo(e => {
					var { disabled: t, small: n, position: r, title: i, children: o } = e,
						s = ue(e, ['disabled', 'small', 'position', 'title', 'children'])
					return a.createElement(
						ge,
						Object.assign({ disabled: t }, s),
						a.createElement(he, { small: n || !1, position: r || 'top', dangerouslySetInnerHTML: { __html: i } }),
						o
					)
				}),
				fe = function (e, t, n, a) {
					return new (n || (n = Promise))(function (r, i) {
						function o(e) {
							try {
								l(a.next(e))
							} catch (e) {
								i(e)
							}
						}
						function s(e) {
							try {
								l(a.throw(e))
							} catch (e) {
								i(e)
							}
						}
						function l(e) {
							var t
							e.done
								? r(e.value)
								: ((t = e.value),
								  t instanceof n
										? t
										: new n(function (e) {
												e(t)
										  })).then(o, s)
						}
						l((a = a.apply(e, t || [])).next())
					})
				}
			const be = a.memo(e =>
				a.createElement(
					ve,
					{ title: 'Processing', style: { height: '100%' } },
					a.createElement(
						'svg',
						{
							style: { height: '100%', opacity: e.visible ? 1 : 0.001, transition: 'opacity .1s' },
							viewBox: '0 0 100 100',
							preserveAspectRatio: 'xMidYMid',
						},
						a.createElement(
							'circle',
							{
								cx: '50',
								cy: '50',
								r: '37',
								strokeWidth: '10',
								stroke: '#ffffff',
								strokeDasharray: '58.119464091411174 58.119464091411174',
								fill: 'none',
								strokeLinecap: 'round',
								transform: 'rotate(66.0614 50 50)',
							},
							a.createElement('animateTransform', {
								attributeName: 'transform',
								type: 'rotate',
								repeatCount: 'indefinite',
								dur: '1s',
								keyTimes: '0;1',
								values: '0 50 50;360 50 50',
							})
						)
					)
				)
			)
			be.displayName = 'Loading'
			const ye = {
				background: s.a.color('dark').toString('hex'),
				display: 'flex',
				alignItems: 'center',
				fontSize: '.8rem',
				height: '100%',
				padding: s.a.ms(-3),
			}
			var we = a.memo(() => {
				const e = Object(y.a)(),
					[t, n] = a.useState(!1),
					[r, i] = a.useState(0),
					o = document.getElementById('workspace')
				return (
					a.useEffect(() => {
						o &&
							((document.documentElement.style.cursor = t ? 'wait' : 'auto'),
							(o.style.pointerEvents = t ? 'none' : 'auto'))
					}, [t]),
					a.useEffect(() => {
						let e = 0,
							t = performance.now()
						function a() {
							return setTimeout(() =>
								fe(this, void 0, void 0, function* () {
									const e = yield E.ask('scene-points')
									e != r && i(e)
								})
							)
						}
						return (
							E.attach('executor-work', e => {
								const a = performance.now()
								;(a - t > 300 || 0 == e.waiting) && ((t = a), n(e.waiting > 0))
							}),
							E.attach('project:update-properties', t => {
								t.ghosts && (e = a())
							}),
							E.attach('scene:update-layers', t => {
								e = a()
							}),
							E.attach('drawer:update', t => {
								e = a()
							}),
							E.attach('scene:update-scene_child-prop', t => {
								for (let n = 0, r = t.length; n < r; n++) if ('repetitions' === t[n].name) return (e = a())
							}),
							a(),
							() => {
								e && clearTimeout(e)
							}
						)
					}, []),
					a.createElement(
						'div',
						{ style: ye },
						a.createElement('div', null, e ? 'Run on web worker' : 'Run in local'),
						a.createElement(be, { visible: t }),
						a.createElement('div', null, 'points: ', r)
					)
				)
			})
			const Ee = { position: 'fixed', bottom: 0, left: 0, listStyle: 'none', margin: 0, padding: 0 },
				xe = c.c`
    from { transform: translate(0%, 0%) scale(.8); }
    to { transform: translate(0%, 0%) scale(1); }
`,
				_e = c.b.li`
    background: ${s.a.color('secondary')};
    color: #fff;
    padding: ${s.a.ms(-1)};
    margin: ${s.a.ms(-1)};
    transform-origin: left center;
    animation: ${xe} .1s ease-out both;
`
			var ke = Object(i.b)(e => ({ messages: e.app.messages }))(({ messages: e }) => {
				const t = Object.values(e).reverse()
				return a.createElement(
					'ul',
					{ style: Ee },
					t.map(e => a.createElement(_e, { key: e.id }, e.message))
				)
			})
			const Oe = {
					position: 'relative',
					border: '1px solid ' + s.a.color('dark-lighten'),
					width: s.a.add(2, 0),
					borderRadius: '2px',
					maxHeight: '70vh',
				},
				Ce = { listStyle: 'none', margin: 0, padding: 0, width: '100%' },
				je = c.b.li`
    position: relative;
    width: 100%;
    cursor: pointer;
    padding: ${s.a.div(1, '2rem')};

    &:hover img { filter: hue-rotate(180deg); }

    & + & { margin-top: 1px; }
`
			var $e = () => {
					const [e, t] = a.useState([])
					a.useEffect(() => {
						E.ask('toolbar', { size: 32, color: s.a.color('primary').toString('hex') }).then(t)
					}, [])
					return a.createElement(
						'section',
						{ 'data-name': 'toolbar', style: Oe },
						a.createElement(
							'ul',
							{ style: Ce },
							e.map((e, t) =>
								a.createElement(
									je,
									{
										key: t,
										onClick: () => {
											return (t = e.name), void E.run('add', { type: t })
											var t
										},
									},
									a.createElement(
										ve,
										{ title: `Add <i><b>${e.name}</b></i> shape to Scene`, position: 'right' },
										a.createElement('img', { src: e.image, style: { width: '100%' } })
									)
								)
							)
						)
					)
				},
				ze = function (e, t) {
					var n = {}
					for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a])
					if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
						var r = 0
						for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
							t.indexOf(a[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[r]) && (n[a[r]] = e[a[r]])
					}
					return n
				}
			var Se = e => {
					var { columns: t, rows: n, flow: r, gap: i, halign: o, valign: s, style: l, children: c, component: d } = e,
						u = ze(e, ['columns', 'rows', 'flow', 'gap', 'halign', 'valign', 'style', 'children', 'component'])
					const m =
							(void 0 === t && void 0 === n) || (void 0 !== t && void 0 !== n)
								? 'gridTemplate'
								: t >= 0
								? 'gridTemplateColumns'
								: 'gridTemplateRows',
						p = r || (t && n ? `repeat(${n}, 1fr) / repeat(${t}, 1fr)` : `repeat(${t || n}, 1fr)`),
						h = Object.assign({ display: 'grid', [m]: p, gap: i, alignItems: s, justifyContent: o }, l)
					return a.createElement(d || 'div', Object.assign({ style: h }, u), c)
				},
				Me = e => {
					const t = e.id || 'cb_' + e.name
					return a.createElement(
						Ae,
						null,
						a.createElement(De, {
							size: e.size || 0,
							id: t,
							type: 'checkbox',
							onChange: t => e.onChange(t.target.checked),
							checked: e.checked,
						}),
						e.name && a.createElement('label', { htmlFor: t }, e.name)
					)
				}
			const Ae = c.b.div`
    display: flex;
    align-items: center;
    > label { margin-left: ${s.a.ms(-1)}; }
    > * { 
        cursor: pointer; 
    }
`,
				De = c.b.input`
    position: relative;
    appearance: none;
    margin: 0;
    border-radius: 2px;
    width: ${e => s.a.ms(e.size)};
    height: ${e => s.a.ms(e.size)};
    
    border: 1px solid ${s.a.color('gray-dark')};
    transition: 0.1s border-color ease-out;

    &:after{
        position: absolute;
        width: 100%;
        height: 100%;
        display: block;
        content: ' ';
        background: ${s.a.color('gray-dark')};
        transform: scale(.7);
        transform-origin: center center;
        transition: 0.1s background ease-out;
        border-radius: 2px;
    }

    &:checked {
        border-color: ${s.a.color('primary')};

        &:after{ 
            background: ${s.a.color('primary')}; 
        }
    }
`
			var Le = n(6)
			const Pe = { display: 'inline-block', overflow: 'hidden', borerRadius: '2px' },
				Re = {
					position: 'relative',
					width: '100%',
					height: '100%',
					margin: '-1px',
					transformOrigin: 'left top',
					background: 'rgba(255,255,255,.2)',
				}
			var Te = a.memo(({ scale: e, translate: t, height: n }) => {
					const r = parseFloat(n),
						i = r / e / 2,
						o = {
							border: '1px solid ' + (e > 1 ? s.a.color('primary') : s.a.color('primary').alpha(0.4).toString('rgba')),
							width: r + 'rem',
							height: r + 'rem',
						},
						l = {
							top: Object(Le.e)(t[1], -1, 1, i, r - i) + 'rem',
							left: Object(Le.e)(t[0], -1, 1, i, r - i) + 'rem',
							transform: `scale(${1 / e}) translate(-50%, -50%)`,
						}
					return a.createElement(
						Se,
						{ rows: 2, flow: 'max-content auto', style: { justifyItems: 'center' }, gap: s.a.ms(-2) },
						a.createElement(
							'small',
							null,
							a.createElement(ve, { small: !0, title: 'Use wheel on drawer for zoom\nand drag for translate' }, 'Zoom')
						),
						a.createElement(
							'div',
							{ style: Object.assign(Object.assign({}, o), Pe) },
							a.createElement('div', { style: Object.assign(Object.assign({}, l), Re) })
						)
					)
				}),
				Be = n(411)
			var Ie = a.memo(() => {
					const [e, t] = a.useState(0)
					return (
						a.useEffect(() => {
							E.ask('set-drawer-lines', e)
						}, [e]),
						a.useEffect(() => {
							let t = !0
							function n(n) {
								;(t = !t), 72 == n.keyCode && E.ask('set-drawer-lines', t ? e : 0)
							}
							return (
								document.addEventListener('keydown', n, { passive: !0 }),
								() => document.removeEventListener('keydown', n)
							)
						}, [e]),
						a.createElement(
							Se,
							{ rows: 2, flow: 'max-content auto', style: { justifyItems: 'center' }, gap: s.a.ms(-2) },
							a.createElement('small', null, 'Lines'),
							a.createElement(
								'div',
								{ style: { display: 'flex', alignItems: 'center' } },
								a.createElement(Be.a, {
									size: 0,
									rotate: 180,
									name: 'arrow-right',
									onClick: () => t(Object(Le.b)(0, 20, e - 1)),
								}),
								a.createElement('small', null, e),
								a.createElement(Be.a, { size: 0, name: 'arrow-right', onClick: () => t(Object(Le.b)(0, 20, e + 1)) })
							)
						)
					)
				}),
				He = n(415),
				Fe = n(382)
			const Ne = { width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 }
			var qe = function (e) {
				const [t, n] = a.useState(e && e.current ? e.current.getBoundingClientRect() : Ne),
					r = Object(Fe.a)()
				return (
					a.useEffect(() => {
						e.current && n(e.current.getBoundingClientRect())
					}, [r, e.current]),
					t
				)
			}
			var Ve = function (e, t) {
				a.useEffect(() => {
					function n(n) {
						n.target === e.current &&
							(n.stopPropagation(), n.stopImmediatePropagation(), n.preventDefault(), t(n.deltaY, n))
					}
					return document.addEventListener('wheel', n, { passive: !1 }), () => document.removeEventListener('wheel', n)
				}, [e.current, t])
			}
			var Ue = function (e) {
				const [t] = Object(He.a)()
				e = e || {}
				const [n, r] = a.useState({ coords: { x: 0, y: 0 }, bDrag: !1, time: 0 }),
					i = a.useCallback(
						({ target: a, clientX: i, clientY: o }) => {
							const s = a === (null == t ? void 0 : t.current)
							s &&
								s != n.bDrag &&
								(r({ coords: { x: i, y: o }, bDrag: !0, time: Object(y.f)() }), e.onDragStart && e.onDragStart()),
								s || (e.onNotDrag && e.onNotDrag())
						},
						[t.current, n.bDrag, e.onNotDrag]
					),
					o = a.useCallback(
						({ clientX: t, clientY: a }) => {
							if (n.bDrag) {
								const i = Object(y.f)() - n.time,
									o = { x: t - n.coords.x, y: a - n.coords.y }
								i < 300 && 0 == o.x && 0 == o.y && e.onClick && e.onClick({ x: t, y: a }),
									r({ coords: o, bDrag: !1, time: 0 }),
									e.onDragEnd && e.onDragEnd(o, { x: t, y: a }, i)
							}
						},
						[t.current, n.bDrag]
					),
					s = a.useCallback(
						({ clientX: t, clientY: a }) => {
							if (n.bDrag) {
								const i = { x: t - n.coords.x, y: a - n.coords.y }
								r({ coords: i, bDrag: !0, time: 0 }), e.onDrag && e.onDrag(i, { x: t, y: a })
							}
						},
						[t.current, n.bDrag]
					)
				return (
					a.useEffect(
						() => (
							document.addEventListener('mousedown', i, { passive: !0 }),
							document.addEventListener('mouseup', o, { passive: !0 }),
							document.addEventListener('mousemove', s, { passive: !0 }),
							() => {
								document.removeEventListener('mousedown', i),
									document.removeEventListener('mouseup', o),
									document.removeEventListener('mousemove', s)
							}
						),
						[t.current, i, s, o]
					),
					t
				)
			}
			var Xe = a.memo(({ offsets: e, ratio: t, setSize: n, setOffsets: r }) => {
				const [i, o] = a.useState([0, 0]),
					[s] = Object(He.a)(),
					l = a.useRef(null),
					c = Ue({
						onDrag: t => {
							;(e.translate = [
								Object(Le.b)(-1.5, 1.5, i[0] + t.x / -100 / e.scale),
								Object(Le.b)(-1.5, 1.5, i[1] + t.y / -100 / e.scale),
							]),
								1 == e.scale && (e.translate = [0, 0]),
								(1 != e.scale || (0 != e.translate[0] && 0 != e.translate[1])) && E.ask('set-drawer-offsets', e),
								r(Object.assign({}, e))
						},
						onDragEnd: () => {
							o([...e.translate])
						},
					}),
					d = qe(l),
					u = Math.floor(Math.min(d.width, d.height))
				return (
					Ve(c, (t, n) => {
						n.preventDefault()
						const a = e.scale
						;(e.scale = Object(Le.b)(1, 10, a + -1 * Math.sign(t) * (n.shiftKey ? 1 : n.altKey ? 0.01 : 0.1))),
							1 == e.scale && (e.translate = [0, 0]),
							(1 != e.scale || (0 != e.translate[0] && 0 != e.translate[1])) && E.ask('set-drawer-offsets', e),
							r(Object.assign({}, e))
					}),
					a.useEffect(() => {
						c.current &&
							s.current &&
							u > 0 &&
							(r(Object.assign(Object.assign({}, e), { size: u })),
							E.setDrawer(s.current, u, t, m.a.get('resolution', 'high')),
							(c.current.style.width = u + 'px'),
							(c.current.style.height = u + 'px'),
							n(u))
					}, [u]),
					a.useEffect(() => {
						if (s.current && u > 0) {
							let e = t >= 1 ? u : u * t,
								n = t >= 1 ? u / t : u
							if (e > u) {
								const t = e / n
								;(e = u), (n = u / t)
							} else if (n > u) {
								const t = n / e
								;(n = u), (e = u / t)
							}
							;(s.current.style.width = e + 'px'),
								(s.current.style.height = n + 'px'),
								(s.current.style.maxWidth = e + 'px'),
								(s.current.style.maxHeight = n + 'px'),
								(s.current.style.minWidth = e + 'px'),
								(s.current.style.minHeight = n + 'px')
						}
					}, [u, t]),
					a.createElement(
						'div',
						{
							ref: l,
							style: { width: '100%', height: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center' },
						},
						a.createElement(
							'div',
							{
								ref: c,
								style: { background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' },
							},
							a.createElement('canvas', {
								ref: s,
								style: { pointerEvents: 'none', maxWidth: '100%', maxHeight: '100%' },
							})
						)
					)
				)
			})
			const Ge = { passive: !0, once: !1, capture: !1 },
				Ye = {}
			function We(e, t) {
				return e.passive == t.passive && e.capture == t.capture && e.once == t.once
			}
			function Ke(e, t, n = Ge) {
				const a = Object.assign(Object.assign({}, Ge), n || {})
				;('string' == typeof e ? [e] : e).forEach(e => {
					if (e in Ye) {
						let n = !1
						for (let r = 0, i = Ye[e].length; r < i; r++) {
							const i = Ye[e][r]
							if (We(a, i.options)) {
								i.callbacks.push(t), (n = !0)
								break
							}
						}
						n || Ye[e].push({ options: a, callbacks: [t], handler: Ze(e, a) })
					} else Ye[e] = [{ options: a, callbacks: [t], handler: Ze(e, a) }]
				})
			}
			function Je(e, t, n = Ge) {
				const a = 'string' == typeof e ? [e] : e,
					r = Object.assign(Object.assign({}, Ge), n || {})
				a.forEach(e => {
					if (e in Ye) {
						for (let n = 0, a = Ye[e].length; n < a; n++) {
							const a = Ye[e][n]
							if (We(r, a.options) && (a.callbacks.splice(a.callbacks.indexOf(t), 1), 0 === a.callbacks.length)) {
								window.removeEventListener(e, a.handler), Ye[e].splice(n, 1)
								break
							}
						}
						0 == Ye[e].length && delete Ye[e]
					}
				})
			}
			function Ze(e, t) {
				function n(n) {
					if (e in Ye) {
						Ye[e].forEach(e => {
							We(e.options, t) && e.callbacks.forEach(e => e(n))
						})
					}
				}
				return window.addEventListener(e, n, t), n
			}
			var Qe = function () {
				return [Ke, Je]
			}
			const [et] = Qe()
			let tt
			const nt = []
			function at(e) {
				if (e == tt) return !1
				const t = document.createElement('textarea')
				return (
					(t.value = e || ''),
					document.body.appendChild(t),
					t.select(),
					document.execCommand('copy'),
					document.body.removeChild(t),
					!0
				)
			}
			et(
				['cut', 'copy'],
				function () {
					const e = window.getSelection()
					;(tt = e ? e.toString() : void 0), nt.forEach(e => e(tt))
				},
				{ passive: !0 }
			)
			var rt = function () {
				const [e, t] = a.useState(tt)
				return (
					a.useEffect(() => {
						function e(e) {
							t(e)
						}
						return (
							nt.push(e),
							() => {
								nt.splice(nt.indexOf(e, 1))
							}
						)
					}, []),
					[e, at]
				)
			}
			const it = {
					backgroundImage: 'url(/assets/images/png-background.png)',
					backgroundPosition: 'center center',
					backgroundSize: 'cover',
					position: 'relative',
					borderRadius: '4px',
					display: 'inline-block',
					verticalAlign: 'middle',
				},
				ot = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '2px' }
			var st = a.memo(({ color: e, clipboard: t, size: n, onClick: r }) => {
				let i, o
				return (
					(t = void 0 === t || t) && ([i, o] = rt()),
					(n = 'string' == typeof n ? n : s.a.ms(n || 0)),
					a.createElement(
						'div',
						{ style: Object.assign(Object.assign({}, it), { width: n, height: n, cursor: r ? 'pointer' : void 0 }) },
						a.createElement('div', {
							style: Object.assign(Object.assign({}, ot), { background: e }),
							onClick: function (n) {
								!1 !== (r && r(n)) && t && o(e) && S(`Copy ${e} to clipboard.`)
							},
						})
					)
				)
			})
			var lt = ({ children: e, container: t }) =>
					R.a.createPortal(e, 'string' == typeof t ? document.querySelector(t) : t),
				ct = n(45)
			var dt = function ({ value: e, step: t, vertical: n, exp: r, min: i, max: o, onChange: s, events: l }) {
				let c = Object(ct.relativeClamp)(e, i, o, 0, 100)
				const [d, u] = a.useState({ value: e, valuePercentage: c }),
					m = Ue({
						onNotDrag: () => {
							l && l.notDrag && l.notDrag()
						},
						onDragStart: () => {
							l && l.dragStart && l.dragStart()
						},
						onDrag: e => {
							const t = h(e)
							t.value != d.value && (u(t), s(t.value, 'slider')), l && l.drag && l.drag(e)
						},
						onDragEnd: e => {
							const t = Math.abs(n ? e.y : e.x) > 0
							t && s(h(e).value, 'none'), l && l.dragEnd && l.dragEnd(t)
						},
					}),
					p = qe(m)
				function h(e) {
					const a = (o - i) / t,
						s = n ? (100 * -e.y) / p.height : (100 * e.x) / p.width,
						l = Object(ct.clamp)(0, 100, s + c),
						d = Math.round((l / 100) * a)
					return { value: Object(ct.clamp)(i, o, Math.round((i + d * t) * r) / r), valuePercentage: l }
				}
				return (
					Ve(m, (e, n) => {
						const a = -1 * Math.sign(e),
							l = n.shiftKey ? 10 : 1,
							c = Object(ct.clamp)(i, o, Math.round((d.value + l * t * a) * r) / r)
						s(c, 'none')
					}),
					a.useEffect(() => {
						;(c = Object(ct.relativeClamp)(e, i, o, 0, 100)), u({ value: e, valuePercentage: c })
					}, [e]),
					[d, m, p]
				)
			}
			const ut = c.b.div`
    position: relative;
    line-height: 0;
    
    ${e =>
			e.vertical
				? `\n        width: ${s.a.ms(0)};\n        min-height: ${s.a.ms(
						4
				  )};\n        height: 100%;  \n        padding: ${s.a.div(
						0,
						'1.6rem'
				  )} 0;\n        transform: scale(-1);\n\n        > div { transform: translate(0%, -50%) scale(-1.2); }\n        cursor: n-resize;\n    `
				: `\n        height: ${s.a.ms(0)};\n        min-width: ${s.a.ms(
						4
				  )};\n        width: 100%;  \n        padding: 0 ${s.a.div(
						0,
						'1.6rem'
				  )};\n\n        > div { transform: translate(-50%, 0) scale(1.2); }\n        cursor: e-resize;\n    `}
    border-radius: ${s.a.ms(0)};
    background: ${s.a.color('dark', 'hex')};
    

        
    &:hover > div{
        background: ${s.a.color('dark-lighten').lighten(10)};
    }
`,
				mt = c.b.div`
    position: absolute;
    height: ${s.a.ms(0)};
    width: ${s.a.ms(0)};
    border-radius: ${s.a.ms(0)};
    background: ${s.a.color('dark-lighten')};
    box-shadow: 0 0 4px 1px rgba(0,0,0, .6);
    pointer-events: none;

    > small {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translate(-50%, -${s.a.add(-2, '2px')});
        line-height: 1;
        background: ${s.a.color('dark-lighten').lighten(10)};
        padding: ${s.a.ms(-3)} ${s.a.ms(-2)};
        border-radius: 2px;

        &:after{
            display: block;
            content: ' ';
            clear: both;
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translate(-50%, -2px);
            border-top: 6px solid ${s.a.color('dark-lighten').lighten(10)};
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
        }
    }
`
			var pt = a.memo(({ value: e, step: t, min: n, max: r, onChange: i, vertical: o }) => {
					const s = t.toExponential(1).match(/e(-?[0-9]+)/),
						l = Math.pow(10, s ? -s[1] : 0),
						[c, d] = a.useState(!1),
						[u, m] = dt({
							value: e,
							vertical: o,
							step: t,
							exp: l,
							min: n,
							max: r,
							onChange: i,
							events: { drag: () => d(!0) },
						})
					return a.createElement(
						ut,
						{ vertical: o, ref: m, onMouseOver: () => !c && d(!0), onMouseOut: () => c && d(!1) },
						a.createElement(
							mt,
							{ style: { [o ? 'top' : 'left']: u.valuePercentage + '%' } },
							a.createElement('small', { style: { display: c ? 'block' : 'none' } }, u.value.toFixed(Math.log10(l)))
						)
					)
				}),
				ht = n(84),
				gt = n.n(ht)
			function vt(e) {
				try {
					return new gt.a(e).toRGBA().replace(/ /gi, '')
				} catch (e) {}
				return null
			}
			function ft(e, t, n, a) {
				const r = a / 2,
					i = (Math.atan2(e.y - r, e.x - r) + Math.PI) / (2 * Math.PI),
					o = Math.sqrt((e.x - r) * (e.x - r) + (e.y - r) * (e.y - r)) / r
				return new gt.a(`rgba(${bt(i, o, t / 100).join(',')},${Math.round(100 * n) / 100})`).toHSLA()
			}
			function bt(e, t, n) {
				let a = 0,
					r = 0,
					i = 0
				const o = Math.floor(6 * e),
					s = 6 * e - o,
					l = n * (1 - t),
					c = n * (1 - s * t),
					d = n * (1 - (1 - s) * t)
				switch (o % 6) {
					case 0:
						;(a = n), (r = d), (i = l)
						break
					case 1:
						;(a = c), (r = n), (i = l)
						break
					case 2:
						;(a = l), (r = n), (i = d)
						break
					case 3:
						;(a = l), (r = c), (i = n)
						break
					case 4:
						;(a = d), (r = l), (i = n)
						break
					case 5:
						;(a = n), (r = l), (i = c)
				}
				return [a, r, i].map(e => Object(Le.b)(0, 255, Math.round(255 * e)))
			}
			const yt = {
					position: 'relative',
					borderRadius: ' 50%',
					overflow: 'hidden',
					cursor: 'pointer',
					border: '1px solid ' + s.a.color('dark').darken(5),
				},
				wt = {
					cursor: 'pointer',
					borderRadius: '50%',
					border: '2px solid',
					width: '12px',
					height: '12px',
					top: '-7px',
					left: '-7px',
					zIndex: 1,
					backfaceVisibility: 'hidden',
					transition: 'border-color .3s ease-in',
					pointerEvents: 'none',
				}
			var Et = a.memo(({ color: e, coords: t, value: n, alpha: r, onChange: i, wheelSize: o }) => {
				const l = Ue({
						onDrag(e, t) {
							const a = { x: t.x - c.x, y: t.y - c.y }
							i(ft(a, n, r, o), 'slider')
						},
						onDragEnd(e, t) {
							const a = { x: t.x - c.x, y: t.y - c.y }
							i(ft(a, n, r, o), 'none')
						},
					}),
					c = qe(l)
				return (
					a.useEffect(() => {
						if (l.current) {
							const e = l.current.getContext('2d')
							e &&
								e.putImageData(
									(function (e, t) {
										const n = t / 2,
											a = new ImageData(t, t),
											r = a.data
										for (let a = -n; a < n; a++)
											for (let i = -n; i < n; i++) {
												const o = Math.sqrt(a * a + i * i),
													s = Math.atan2(i, a)
												if (o > n) continue
												const l = (s + Math.PI) / (2 * Math.PI),
													c = 4 * (a + n + (i + n) * t),
													[d, u, m] = bt(l, o / n, e / 100)
												;(r[c] = d), (r[c + 1] = u), (r[c + 2] = m), (r[c + 3] = 255)
											}
										return a
									})(n, o),
									0,
									0
								)
						}
					}, [n, l.current]),
					a.createElement(
						'div',
						{ style: Object.assign(Object.assign({}, yt), { width: o + 'px', height: o + 'px' }) },
						a.createElement('div', {
							style: Object.assign(Object.assign({}, wt), {
								position: 'absolute',
								background: e,
								transform: `translate(${t.x}px, ${t.y}px)`,
								borderColor: n > 50 ? s.a.color('dark').toString() : '#ffff',
							}),
						}),
						a.createElement('canvas', {
							ref: l,
							width: o,
							height: o,
							style: { width: o + 'px', height: o + 'px', transform: 'scale(1.025)' },
						})
					)
				)
			})
			const xt = c.b.input`
    width: ${s.a.add(4, 2)};
    padding: ${s.a.ms(-3)} ${s.a.ms(-2)};
    background: ${s.a.palette.get('dark', 'hex').darken(5)};
    border:none;
    font-size: 1rem;
    color: #fff;
`,
				_t = c.b.div`
    cursor: pointer;
    color: rgba(255,255,255,.3);
    &:hover {
        color: rgba(255,255,255,.6);
    }
`
			var kt = a.memo(({ color: e, onChange: t }) => {
				const n = a.useRef(null),
					[r] = rt(),
					i = r ? vt(r) : null
				function o() {
					if (n.current && n.current.value.length > 0) {
						const a = vt(n.current.value)
						a && a != e && ((n.current.value = ''), t(a))
					}
				}
				return a.createElement(
					Se,
					{ columns: 3, flow: 'repeat(3, max-content)', valign: 'center', gap: s.a.ms(-1), style: { width: '100%' } },
					a.createElement(xt, { ref: n, placeholder: 'Insert color', onKeyUp: e => 13 == e.keyCode && o() }),
					a.createElement(_t, { onClick: () => o() }, 'Add'),
					i
						? a.createElement(st, { onClick: () => t(i), color: i, clipboard: !1 })
						: a.createElement('div', { style: { width: s.a.ms(0), height: s.a.ms(0) } })
				)
			})
			const Ot = {
					position: 'fixed',
					background: '' + s.a.color('dark').lighten(2),
					border: '1px solid ' + s.a.color('dark').lighten(10),
					borderRadius: '2px',
					padding: '' + s.a.ms(0),
					userSelect: 'none',
					lineHight: s.a.ms(0),
				},
				Ct = c.b.div`
    position: relative;
    margin-left: ${s.a.sub(0, -3)};
    padding-left: ${s.a.add(-1)};
`,
				jt = c.b.div`
    position: absolute;
    font-size: .8rem;
    transform: translate(-50%, -50%) rotate(-90deg);
    left: 0;
    top: 50%;
`
			var $t = a.memo(
				a.forwardRef((e, t) => {
					if (!e.position) return null
					const n = e.color ? e.color : '#fff',
						r = (function (e, t) {
							const n = new gt.a(e),
								{ h: a, s: r, v: i } = n.getHsv(),
								o = (r * t) / 2,
								s = 2 * a * Math.PI - Math.PI
							return {
								value: Math.round(100 * i),
								alpha: n.getAlpha(),
								hue: a,
								saturation: r,
								coords: { x: o * Math.cos(s) + t / 2, y: o * Math.sin(s) + t / 2 },
							}
						})(n, 140),
						i = Object(Fe.a)(),
						o = e.position.x > i.width - 238 ? e.position.x - 238 : e.position.x,
						l = e.position.y > i.height - 238 ? e.position.y - 238 : e.position.y
					return a.createElement(
						lt,
						{ container: '#picker-root' },
						a.createElement(
							'div',
							{ ref: t, style: { position: 'relative', zIndex: 1e3 } },
							a.createElement(
								Se,
								{
									rows: 3,
									gap: s.a.ms(0),
									flow: "repeat(3, 'max-content')",
									style: Object.assign(Object.assign({}, Ot), { top: l + 'px', left: o + 'px' }),
								},
								a.createElement(
									'div',
									{ style: { display: 'flex' } },
									a.createElement(Et, {
										wheelSize: 140,
										color: n,
										onChange: e.onChange,
										coords: r.coords,
										value: r.value,
										alpha: r.alpha,
									}),
									a.createElement(
										Ct,
										null,
										a.createElement(jt, null, 'Value'),
										a.createElement(pt, {
											min: 0,
											max: 100,
											step: 1,
											vertical: !0,
											value: r.value,
											onChange: function (t, a) {
												const i = ft(r.coords, t, r.alpha, 140)
												i != n && e.onChange(i, a)
											},
										})
									),
									e.enableAlpha &&
										a.createElement(
											Ct,
											null,
											a.createElement(jt, null, 'Alpha'),
											a.createElement(pt, {
												min: 0,
												max: 1,
												step: 0.01,
												vertical: !0,
												value: r.alpha,
												onChange: function (t, a) {
													const i = ft(r.coords, r.value, t, 140)
													i != n && e.onChange(i, a)
												},
											})
										)
								),
								a.createElement(
									'div',
									null,
									a.createElement(st, { color: n }),
									a.createElement('small', { style: { marginLeft: s.a.ms(-2) } }, n)
								),
								a.createElement(
									'div',
									null,
									a.createElement(kt, {
										color: n,
										onChange: function (t) {
											t != n && e.onChange(t, 'none')
										},
									})
								)
							)
						)
					)
				})
			)
			var zt = a.memo(({ value: e, enableAlpha: t, size: n, onChange: r }) => {
					const [i, o] = a.useState(e),
						[s, l] = a.useState(null),
						c = a.useRef(null),
						d = a.useRef(null)
					return (
						a.useEffect(() => {
							function t(e) {
								var t, n
								Object(y.d)(e) ||
								(e.target != c.current &&
									!(null === (t = c.current) || void 0 === t ? void 0 : t.contains(e.target)) &&
									e.target != d.current &&
									!(null === (n = d.current) || void 0 === n ? void 0 : n.contains(e.target)))
									? null != s && l(null)
									: null == s && l({ x: e.clientX + 12, y: e.clientY + 12 })
							}
							return (
								e != i && o(e),
								document.addEventListener('mousedown', t, { passive: !0 }),
								() => document.removeEventListener('mousedown', t)
							)
						}, [e, c.current, d.current, s]),
						a.createElement(
							a.Fragment,
							null,
							a.createElement(
								'div',
								{ ref: c, style: { display: 'flex', alignItems: 'center' } },
								a.createElement(st, { size: n, color: i, onClick: e => !!Object(y.d)(e) && void 0 })
							),
							a.createElement($t, {
								ref: d,
								enableAlpha: null == t || t,
								position: s,
								color: i,
								onChange: function (e, t) {
									'slider' == t && o(e), r(e, 'slider' == t)
								},
							})
						)
					)
				}),
				St = function (e, t, n, a) {
					return new (n || (n = Promise))(function (r, i) {
						function o(e) {
							try {
								l(a.next(e))
							} catch (e) {
								i(e)
							}
						}
						function s(e) {
							try {
								l(a.throw(e))
							} catch (e) {
								i(e)
							}
						}
						function l(e) {
							var t
							e.done
								? r(e.value)
								: ((t = e.value),
								  t instanceof n
										? t
										: new n(function (e) {
												e(t)
										  })).then(o, s)
						}
						l((a = a.apply(e, t || [])).next())
					})
				}
			function Mt(e, t, n, a = 1, r = 1) {
				return new Promise(i => {
					const o = new Image()
					;(o.onload = () =>
						St(this, void 0, void 0, function* () {
							const e = t
								? yield (function (e, t, n, a = 1, r = 1) {
										return new Promise(i => {
											const o = document.createElement('canvas'),
												s = o.getContext('2d')
											;(o.width = t), (o.height = t), (s.globalAlpha = a)
											const l =
													'none' == n ? 1 : Math['adapt' == n ? 'min' : 'max'](o.width / e.width, o.height / e.height),
												c = 'none' == n ? 0 : o.width / 2 - (e.width / 2) * l,
												d = 'none' == n ? 0 : o.height / 2 - (e.height / 2) * l
											s.drawImage(e, c, d, e.width * l, e.height * l)
											const u = new Image()
											;(u.onload = () => i(u)), (u.src = o.toDataURL('image/png', r))
										})
								  })(o, t, n, a, r)
								: o
							if (Object(y.a)()) {
								const t = yield createImageBitmap(e)
								i({ image: t, source: e.src })
							} else i({ image: e, source: e.src })
						})),
						(o.src = e)
				})
			}
			var At = function (e, t, n, a) {
				return new (n || (n = Promise))(function (r, i) {
					function o(e) {
						try {
							l(a.next(e))
						} catch (e) {
							i(e)
						}
					}
					function s(e) {
						try {
							l(a.throw(e))
						} catch (e) {
							i(e)
						}
					}
					function l(e) {
						var t
						e.done
							? r(e.value)
							: ((t = e.value),
							  t instanceof n
									? t
									: new n(function (e) {
											e(t)
									  })).then(o, s)
					}
					l((a = a.apply(e, t || [])).next())
				})
			}
			var Dt = a.memo(({ offsets: e, background: t, backgroundImage: n }) => {
				const [r, i] = a.useState(!0)
				return (
					a.useEffect(() => {
						r &&
							n &&
							(function (e) {
								At(this, void 0, void 0, function* () {
									if (null === e) E.ask('set-background-image', { image: null, source: null })
									else {
										const { image: t, source: n } = 'string' == typeof e ? yield Mt(e, r ? null : 1080, 'fill', 1) : e
										r && i(!1), E.ask('set-background-image', { image: t, source: n })
									}
								})
							})(n)
					}, [n, r]),
					a.createElement(
						Se,
						{ rows: 2, flow: 'max-content auto', style: { justifyItems: 'center' }, gap: s.a.ms(-2) },
						a.createElement('small', null, 'Background'),
						a.createElement(zt, {
							enableAlpha: !1,
							hideColorName: !0,
							size: 1,
							onChange: (e, t) => {
								E.ask('set-scene-background', { background: e, preventDispatch: t })
							},
							value: t,
						})
					)
				)
			})
			var Lt = a.memo(({ ghost_skip_time: e, ghosts: t }) => {
					function n(n = t, a = e) {
						;(((n = n < 0 ? 0 : n) >= 0 && n != t) || a != e) &&
							E.ask('set-drawer-ghosts', { ghosts: n, ghost_skip_time: a })
					}
					function r(e, t, n, a = 1) {
						return Math.floor((e.shiftKey ? t : 1) * (e.ctrlKey ? n : 1)) * (e.altKey ? a : 1)
					}
					return a.createElement(
						Se,
						{ rows: 2, flow: 'max-content auto', style: { justifyItems: 'center' }, gap: s.a.ms(-2) },
						a.createElement('small', null, 'Ghosts'),
						a.createElement(
							'div',
							{ style: { textAlign: 'center' } },
							a.createElement(
								ve,
								{ title: 'Number of ghosts' },
								a.createElement(Be.a, {
									size: 0,
									rotate: 180,
									name: 'arrow-right',
									onClick: a => n(t - r(a, 5, 10), e),
								}),
								a.createElement('small', null, t || 0),
								a.createElement(Be.a, { size: 0, name: 'arrow-right', onClick: a => n(t + r(a, 5, 10), e) })
							),
							a.createElement(
								ve,
								{ title: 'Ghost frame skip' },
								a.createElement(Be.a, {
									size: 0,
									rotate: 180,
									name: 'arrow-right',
									onClick: a => n(t, e - r(a, 100, 10, 0.1)),
								}),
								a.createElement('small', null, e || 1),
								a.createElement(Be.a, { size: 0, name: 'arrow-right', onClick: a => n(t, e + r(a, 100, 10, 0.1)) })
							)
						)
					)
				}),
				Pt = n(413)
			var Rt = a.memo(
				({ size: e, ratio: t, resolution: n, setResolution: r }) => (
					a.useEffect(() => {
						m.a.set('resolution', n), E.setDrawer(void 0, e, t, n)
					}, [n]),
					a.createElement(
						Se,
						{ rows: 2, flow: 'max-content auto', style: { justifyItems: 'center' }, gap: s.a.ms(-2) },
						a.createElement('small', null, 'Resolution'),
						a.createElement(
							'div',
							{ style: { display: 'flex', alignItems: 'center' } },
							a.createElement(
								'small',
								null,
								a.createElement(Pt.a, {
									width: '5rem',
									position: 'top',
									options: ['low', 'medium', 'high', 'ultra'].map(e => ({ key: 'medium' == e ? 'med' : e, value: e })),
									value: n,
									onChange: e => r(e),
									placeholder: 'Resolution',
								})
							)
						)
					)
				)
			)
			const Tt = [
				{ key: '1:1', value: 1 },
				{ key: '4:3', value: 4 / 3 },
				{ key: '3:2', value: 1.5 },
				{ key: '1.85:1', value: 1.85 },
				{ key: '2.39:1', value: 2.39 },
				{ key: '16:9', value: 16 / 9 },
				{ key: 'A4', value: 210 / 297 },
				{ key: '9:16', value: 9 / 16 },
				{ key: '10:16', value: 0.625 },
			]
			var Bt = a.memo(({ ratio: e, size: t, resolution: n }) =>
				a.createElement(
					Se,
					{ rows: 2, flow: 'max-content auto', style: { justifyItems: 'center' }, gap: s.a.ms(-2) },
					a.createElement('small', null, 'Aspect Ratio'),
					a.createElement(
						'div',
						{ style: { display: 'flex', alignItems: 'center' } },
						a.createElement(
							'small',
							null,
							a.createElement(Pt.a, {
								width: '5rem',
								position: 'top',
								options: Tt,
								value: e,
								onChange: e =>
									(function (e) {
										E.ask('set-drawer-ratio', { ratio: e, size: t, resolution: n })
									})(e),
								placeholder: 'Resolution',
							})
						)
					)
				)
			)
			var It = a.memo(
				Object(i.b)(e => ({
					backgroundImage: e.project.backgroundImage,
					background: e.project.background,
					clearCanvas: e.project.clearCanvas,
					ghosts: e.project.ghosts,
					ghost_skip_time: e.project.ghost_skip_time,
					ratio: e.project.ratio,
				}))(({ background: e, clearCanvas: t, backgroundImage: n, ghost_skip_time: r, ghosts: i, ratio: o }) => {
					const [l, c] = a.useState(0),
						[d, u] = a.useState(m.a.get('resolution', 'high')),
						[p, h] = a.useState({ scale: 1, translate: [0, 0], size: 400 })
					return a.createElement(
						Se,
						{
							component: 'section',
							'data-name': 'drawer',
							rows: 2,
							gap: s.a.ms(0),
							flow: 'auto max-content',
							style: { width: '100%', height: '100%', overflow: 'hidden' },
						},
						a.createElement(Xe, { setSize: c, ratio: o, offsets: p, setOffsets: h }),
						a.createElement(
							Se,
							{ columns: 7, gap: s.a.ms(0), flow: 'repeat(7, max-content)', halign: 'center', valign: 'start' },
							a.createElement(Te, Object.assign({ height: s.a.ms(1) }, p)),
							a.createElement(Dt, { offsets: p, background: e, backgroundImage: n }),
							a.createElement(
								Se,
								{
									rows: 2,
									flow: 'max-content auto',
									style: { justifyItems: 'center', opacity: i > 0 ? 0.2 : 1, pointerEvents: i > 0 ? 'none' : void 0 },
									gap: s.a.ms(-2),
								},
								a.createElement(
									'small',
									null,
									a.createElement('label', { style: { cursor: 'pointer' }, htmlFor: 'cb_clearCanvas' }, 'Clear')
								),
								a.createElement(Me, {
									size: 1,
									checked: t,
									id: 'cb_clearCanvas',
									onChange: e => E.ask('set-drawer-clear', e),
								})
							),
							a.createElement(Lt, { ghosts: i, ghost_skip_time: r }),
							a.createElement(Ie, null),
							a.createElement(Rt, { resolution: d, setResolution: u, ratio: o, size: l }),
							a.createElement(Bt, { ratio: o, size: l, resolution: d })
						)
					)
				})
			)
			function Ht(e) {
				return (Math.round(e / 10) / 100).toFixed(2) + 's'
			}
			const Ft = c.b.div`
    line-height: 1;
`,
				Nt = c.b.div`
    display: flex;
    position: relative;
    height: .8rem;
    width: 100%;
    margin: ${s.a.ms(-2)} 0;

    > span {
        position: absolute;
        transform: translate(-50%, 0);
    }
`,
				qt = c.b.div`
    display: flex;
    justify-content: space-between;
    height: ${s.a.ms(0)};

    > span {
        position: absolute;
        height: 100%;
        width: 6px;
        transform: translate(-50%, 0);

        &:after { 
            position: absolute;
            top: 0; left: 2.5px;
            width: 1px; height: 100%;
            display: block;
            content: ' ';
        }
        &:nth-child(2n+1):after { background: rgba(255,255,255,.05); }
        &:nth-child(2n):after { background: rgba(0,0,0,.2); }
    }
`,
				Vt = c.b.div`
    position: relative;
    background: ${s.a.color('dark-lighten')};
`,
				Ut = c.b.div`
    position: absolute;
    top: -${s.a.ms(-2)};

    &:after {
        position: absolute;
        top: 0;
        display: block;
        content: ' ';
        width: 1px;
        height: ${s.a.add(0, -2)};
        background: ${s.a.color('primary')};
    }
`,
				Xt = c.b.div`
    position: absolute;
    bottom: 100%; 
    background: ${s.a.color('primary')};
    padding: ${s.a.ms(-3)};
    font-weight: 600;
    transform: translateX(-50%);
    border-radius: 2px;
`
			var Gt = a.memo(
				({ sequence_start: e, sequence_end: t, current_time: n, steps: r, enableMoveTime: i, onChange: o }) => {
					const s = a.useRef(),
						{ width: l } = qe(s),
						c = new Array(r)
							.fill(0)
							.map((n, i) =>
								a.createElement(
									'span',
									{ key: i, onClick: () => u((i * (t - e)) / r), style: { left: i * (100 / r) + '%' } },
									Ht((i * (t - e)) / r)
								)
							),
						d = new Array(2 * r + 1).fill(0).map((n, i) =>
							a.createElement('span', {
								style: { left: i * (100 / (2 * r)) + '%' },
								onClick: () => u(i * ((t - e) / (2 * r))),
								key: i,
							})
						)
					function u(a) {
						Object(Le.b)(e, t, a) != n && o(a)
					}
					const m = Ue({
						onDrag: a => {
							const r = n + ((Object(Le.b)(0, l, Math.abs(a.x)) * Math.sign(a.x)) / l) * (t - e),
								o = Object(Le.b)(e, t, r)
							i && u(o)
						},
					})
					return a.createElement(
						Ft,
						null,
						a.createElement(Nt, null, c, a.createElement('span', { style: { left: '100%' } }, Ht(t))),
						a.createElement(
							Vt,
							{ ref: s },
							a.createElement(qt, null, d),
							a.createElement(
								Ut,
								{ style: { left: Object(Le.e)(n, e, t, 0, 100) + '%' } },
								a.createElement(Xt, { style: { cursor: i ? 'ew-resize' : 'not-allowed' }, ref: m }, Ht(n))
							)
						)
					)
				}
			)
			const Yt = {
				position: 'relative',
				padding: `${s.a.ms(0)} ${s.a.ms(1)}`,
				width: '100%',
				fontSize: '.8rem',
				border: '1px solid ' + s.a.color('dark-lighten'),
				borderBottomWidth: 0,
				borderRadius: '2px 0 0 2px',
			}
			var Wt = a.memo(
					Object(i.b)(e => ({
						sequence: e.project.sequence,
						bEnableMoveBar: e.project.clearCanvas || (void 0 !== typeof e.project.ghosts && e.project.ghosts > 0),
						ghosts: e.project.ghosts,
						bTimelineStarted: e.app.bTimelineStarted,
					}))(({ sequence: e, bEnableMoveBar: t, bTimelineStarted: n }) => {
						const r = new Array(15).fill(0).map((e, t) => ({ key: t + 1 + 's', value: t + 1 })),
							[i, o] = a.useState({ current_frame: 0, current_time: 0, fps: 0 })
						return (
							a.useEffect(() => {
								E.attach('timeline:progress', e => {
									o(e)
								})
							}, []),
							a.createElement(
								'section',
								{ 'data-name': 'timeline', style: Yt },
								a.createElement(
									'div',
									{ style: { position: 'absolute', left: s.a.ms(0), top: s.a.ms(0), display: 'flex' } },
									'FPS: ',
									i.fps
								),
								a.createElement(
									'div',
									{ style: { display: 'flex', justifyContent: 'center', marginBottom: s.a.ms(0) } },
									a.createElement(Be.a, { name: 'sequence-start', onClick: () => E.ask('set-timeline', e.start) }),
									a.createElement(Be.a, {
										name: n ? 'pause' : 'play',
										onClick: () => E.ask('change-timeline-state', n ? v.a.PAUSE : v.a.START),
									}),
									a.createElement(Be.a, { name: 'sequence-end', onClick: () => E.ask('set-timeline', e.end) })
								),
								a.createElement(
									'div',
									{ style: { position: 'absolute', right: s.a.ms(0), top: s.a.ms(0), display: 'flex' } },
									a.createElement(ve, { title: 'Durate' }, a.createElement(Be.a, { name: 'time' })),
									a.createElement(Pt.a, {
										position: 'top',
										options: r,
										value: e.durate / 1e3,
										placeholder: 'durate',
										onChange: e => E.ask('set-timeline-duration', 1e3 * e),
									})
								),
								a.createElement(Gt, {
									enableMoveTime: t,
									sequence_start: e.start,
									sequence_end: e.end,
									current_time: i.current_time,
									onChange: e => E.ask('set-timeline', e),
									steps: 12,
								})
							)
						)
					})
				),
				Kt = n(121)
			const Jt = [
				'Line',
				'Triangle',
				'Rect',
				'RegularPolygon',
				'Circle',
				'Rose',
				'Spiral',
				'Lissajous',
				'Desidus',
				'Shape',
				'ShapeLoop',
				'Group',
			]
			const Zt = c.b.div`
	height: ${s.a.ms(2)};
	display: grid;
	grid-template-columns: repeat(11, max-content);
	justify-content: right;
	align-items: center;
	grid-gap: ${s.a.ms(-1)};
	padding: 0 ${s.a.ms(-1)};

	background: ${s.a.color('dark')};
	border: 1px solid ${s.a.color('dark-lighten')};
	border-top-width: 0;
`,
				Qt = c.b.div`
	height: ${s.a.ms(2)};
	display: grid;
	grid-template-columns: repeat(4, max-content);
	justify-content: left;
	align-items: center;
	grid-gap: ${s.a.ms(-1)};
	padding: 0 ${s.a.ms(-1)};

	background: ${s.a.color('dark')};
	border: 1px solid ${s.a.color('dark-lighten')};
	border-top-width: 0;
`,
				en = c.b.div`
	position: relative;
	z-index: 10;
`,
				tn = c.b.ul`
	position: fixed;
	list-style: none;
	margin: 0;
	background: ${s.a.color('dark')};
	border: 1px solid ${s.a.color('dark').lighten(5)};
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
	padding: 0;
	font-size: ${s.a.sub(0, -4)};
	z-index: ${e => (e.open ? 1 : -1)};
	pointer-events: ${e => (e.open ? null : 'none')};
	transition: transform 0.1s, opacity 0.1s;
	transform-origin: bottom right;
	transform: translate(-92%, -99%) scale(${e => (e.open ? 1 : 0.8)});
	opacity: ${e => (e.open ? 1 : 0)};
	display: grid;
	grid-template-columns: repeat(3, auto);
`,
				nn = c.b.li`
	cursor: pointer;
	padding: ${s.a.ms(-1)} ${s.a.ms(0)};
	display: block;
	&:hover {
		background: ${s.a.color('dark').darken(10)};
	}
`
			var an = a.memo(e => {
					const [t, n] = a.useState(null),
						[r, i] = a.useState(!1),
						o = a.useRef(null)
					a.useEffect(() => {
						function e(e) {
							e.target && o.current && e.target != o.current && !o.current.contains(e.target) && i(!1)
						}
						return (
							document.addEventListener('click', e, { passive: !0 }),
							() => {
								document.removeEventListener('click', e)
							}
						)
					}, [r])
					const s = 0 === e.selecteds.length,
						l = 1 === e.selecteds.length,
						c = e.selecteds.length > 1,
						d = Object.values(e.layers),
						u = l && Object(Kt.b)(e.selecteds[0], d),
						m = e.selecteds.map(e => Object(Kt.b)(e, d)).filter(e => !!e),
						p = !(!l || !u) && u.bPrimitive,
						h = !(t && (s || (l && t.layer.id !== u.id) || 'copy' === t.type)),
						g = c || s || !t || 'copy-properties' != t.type || (u && t.layer.id == u.id),
						v =
							s ||
							l ||
							!(function (e) {
								return (
									2 == e.length &&
									e[0].parent_id == e[1].parent_id &&
									((e[0].bPrimitive && 'Line' !== e[0].type && void 0 === e[0].props.repetitions) ||
										1 == e[0].props.repetitions) &&
									((e[1].bPrimitive && 'Line' !== e[1].type && void 0 === e[1].props.repetitions) ||
										1 == e[1].props.repetitions)
								)
							})(m),
						f = u ? Object(Kt.a)(u, d) : -100,
						b = Object(Kt.f)(e.selecteds, d)
					function y(n, a, r) {
						switch (a) {
							case 'add':
								E.run('add', { type: r, parent_id: l && u ? u.id : void 0 }), i(!1)
								break
							case 'paste':
								t &&
									'copy-properties' !== t.type &&
									E.run(t.type, { id: t.layer.id, parent_id: l && u ? u.id : void 0, props: t.layer.props })
								break
							case 'paste-properties':
								if (t && 'copy-properties' == t.type && u) {
									const e = t.layer.props,
										n = u.props
									E.run(
										'set-prop',
										(function (e, t, n) {
											const a = []
											return (
												Object.keys(t).forEach(r => {
													a.push({ id: e, name: r, value: t[r], prev_value: n[r] })
												}),
												a
											)
										})(u.id, e, n)
									)
								}
								break
							case 'union':
							case 'difference':
							case 'intersect':
							case 'xor':
								2 == e.selecteds.length &&
									E.run('shape-operation', { type: a, a_id: e.selecteds[0], b_id: e.selecteds[1] })
								break
							default:
								E.run(a, r)
						}
					}
					function w(e) {
						if (!s && !c) {
							const t = u
							n({ type: e, layer: t }), S(`${e} ${t.name}`)
						}
					}
					return a.createElement(
						a.Fragment,
						null,
						a.createElement(
							Zt,
							null,
							a.createElement(
								ve,
								{ position: 'top', title: 'Cut', disabled: s || c },
								a.createElement(Be.a, { name: 'cut', disabled: s || c, onClick: () => w('cut') })
							),
							a.createElement(
								ve,
								{ position: 'top', title: 'Copy', disabled: s || c },
								a.createElement(Be.a, { name: 'copy', disabled: s || c, onClick: () => w('copy') })
							),
							a.createElement(
								ve,
								{ position: 'top', title: 'Copy properties', disabled: s || c },
								a.createElement(Be.a, {
									name: 'copy-properties',
									disabled: s || c,
									onClick: () => w('copy-properties'),
								})
							),
							a.createElement(
								ve,
								{ position: 'top', title: 'Paste', disabled: h },
								a.createElement(Be.a, { name: 'paste', disabled: h, onClick: e => y(0, 'paste') })
							),
							a.createElement(
								ve,
								{ position: 'top', title: 'Paste properties', disabled: g },
								a.createElement(Be.a, { name: 'paste-properties', disabled: g, onClick: e => y(0, 'paste-properties') })
							),
							a.createElement(
								ve,
								{ position: 'top', title: 'Add shape', disabled: r || !s || p },
								a.createElement(
									en,
									{ ref: o },
									a.createElement(Be.a, {
										onClick: () => i(!r),
										style: { position: 'relative', zIndex: 2 },
										name: 'add',
										rotate: r ? 45 : 0,
										disabled: !s && p,
									}),
									a.createElement(
										tn,
										{ open: r },
										Jt.map(e =>
											a.createElement(
												nn,
												{
													key: e,
													onClick: t => {
														y(0, 'add', e)
													},
												},
												e
											)
										)
									)
								)
							),
							a.createElement(
								ve,
								{ position: 'top', title: 'Move down', disabled: c || f <= -2 || -1 == f },
								a.createElement(Be.a, {
									name: 'arrow-right-fill',
									size: 0,
									rotate: 90,
									disabled: c || f <= -2 || -1 == f,
									onClick: t => y(0, t.shiftKey ? 'move-to-bottom' : 'move-down', e.selecteds),
								})
							),
							a.createElement(
								ve,
								{ position: 'top', title: 'Move up', disabled: c || f <= -2 || 1 == f },
								a.createElement(Be.a, {
									name: 'arrow-right-fill',
									size: 0,
									rotate: 270,
									disabled: c || f <= -2 || 1 == f,
									onClick: t => y(0, t.shiftKey ? 'move-to-top' : 'move-up', e.selecteds),
								})
							),
							a.createElement(
								ve,
								{ position: 'top', title: 'Make shape', disabled: s || !b },
								a.createElement(Be.a, {
									name: 'shape',
									disabled: s || !b,
									onClick: t => y(0, 'make-shape', e.selecteds),
								})
							),
							a.createElement(
								ve,
								{ position: 'top', title: 'Make group', disabled: l || s || !b },
								a.createElement(Be.a, { name: 'group', disabled: l || s || !b, onClick: e => y(0, 'makeGroup') })
							),
							a.createElement(
								ve,
								{ position: 'top', title: 'Remove', disabled: s },
								a.createElement(Be.a, { name: 'remove', disabled: s, onClick: t => y(0, 'remove', e.selecteds) })
							)
						),
						a.createElement(
							Qt,
							null,
							a.createElement(
								ve,
								{ position: 'top', title: 'Union', disabled: v },
								a.createElement(Be.a, { name: 'shape-combine-union', disabled: v, onClick: e => y(0, 'union') })
							),
							a.createElement(
								ve,
								{ position: 'top', title: 'Difference', disabled: v },
								a.createElement(Be.a, {
									name: 'shape-combine-difference',
									disabled: v,
									onClick: e => y(0, 'difference'),
								})
							),
							a.createElement(
								ve,
								{ position: 'top', title: 'Intersect', disabled: v },
								a.createElement(Be.a, { name: 'shape-combine-intersect', disabled: v, onClick: e => y(0, 'intersect') })
							),
							a.createElement(
								ve,
								{ position: 'top', title: 'XOR', disabled: v },
								a.createElement(Be.a, { name: 'shape-combine-xor', disabled: v, onClick: e => y(0, 'xor') })
							)
						)
					)
				}),
				rn = n(2)
			const on = ({ layer: e, deep: t, toggleSelection: n, layers: r, selecteds: i }) => {
					const [o, l] = a.useState(!(!r || 1 != i.length) && Object(Kt.g)(e.id, i[0], r)),
						[c, d] = a.useState(!1),
						u = a.createRef(),
						m = i.includes(e.id)
					function p() {
						u.current &&
							u.current.value.length > 0 &&
							(u.current.value != e.name && E.ask('layer-rename', { id: e.id, name: u.current.value }), d(!1))
					}
					return (
						a.useEffect(() => {
							r && !o && Object(Kt.g)(e.id, i[0], r) && l(!0)
						}, [i, o, r]),
						a.createElement(
							ln,
							{ deep: t },
							a.createElement(
								sn,
								{ selected: m },
								c
									? a.createElement(dn, {
											ref: u,
											autoFocus: !0,
											defaultValue: e.name,
											onKeyDown: e => 13 == e.keyCode && p(),
											onFocus: e => e.target.select(),
									  })
									: a.createElement(
											'div',
											{ style: { display: 'flex', alignItems: 'center' } },
											a.createElement(
												un,
												{ onClick: () => e.children && e.children.length > 0 && l(!o) },
												e.children &&
													e.children.length > 0 &&
													a.createElement(Be.a, { name: 'arrow-right-fill', size: 0, rotate: o ? 90 : 0, fill: '#fff' })
											),
											a.createElement(
												cn,
												{ onClick: t => n(t, e.id) },
												a.createElement(Be.a, { size: 0, name: rn.a.getIcon(e.type) }),
												a.createElement('span', { style: { marginLeft: s.a.ms(-3) } }, e.name)
											)
									  ),
								c
									? a.createElement(Be.a, { name: 'save', fill: '#fff', onClick: () => p() })
									: a.createElement(
											ve,
											{ title: 'Rename' },
											a.createElement(Be.a, { name: 'edit', fill: '#fff', onClick: () => d(!0) })
									  ),
								a.createElement(
									ve,
									{ title: 'Highlight' },
									a.createElement(Be.a, {
										name: 'highlight',
										fill: '#fff',
										onMouseOver: () => E.ask('layer-highlight', { id: e.id, status: !0 }),
										onMouseOut: () => E.ask('layer-highlight', { id: e.id, status: !1 }),
									})
								),
								a.createElement(
									ve,
									{ title: 'Visibility' },
									e.ui.visible
										? a.createElement(Be.a, {
												name: 'visible',
												fill: '#fff',
												onClick: () => E.ask('layer-visibility', { id: e.id, status: !1 }),
										  })
										: a.createElement(Be.a, {
												name: 'hidden',
												fill: '#fff',
												onClick: () => E.ask('layer-visibility', { id: e.id, status: !0 }),
										  })
								)
							),
							o &&
								e.children &&
								e.children.length > 0 &&
								a.createElement(
									'ul',
									{ style: { margin: 0, padding: 0 } },
									e.children.map(e =>
										a.createElement(on, {
											key: e.id,
											layers: r,
											layer: e,
											selecteds: i,
											toggleSelection: n,
											deep: t + 1,
										})
									)
								)
						)
					)
				},
				sn = c.b.div`
	border: 1px solid ${e => (e.selected ? s.a.color('primary') : s.a.color('dark'))};
	display: grid;
	align-items: center;
	grid-template-columns: auto max-content max-content max-content;
	line-height: ${s.a.ms(2)};
	grid-gap: ${s.a.ms(-2)};
	padding-right: ${s.a.ms(-2)};

	&:hover {
		background: ${s.a.color('dark').lighten(10)};
	}
`,
				ln = c.b.li`
	list-style: none;
	margin: 0;
	user-select: none;

	position: relative;
	z-index: 1;

	> ${sn} {
		padding-left: ${e => (e.deep > 0 ? s.a.mul(s.a.add(0, -2, -2), e.deep + 'rem') : 0)};
	}
`,
				cn = c.b.div`
	display: flex;
	align-items: center;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	cursor: cell;
`,
				dn = c.b.input`
	width: 100%;
	line-height: inherit;
	background: ${s.a.color('dark-lighten')};
	border: none;
	padding: 0 ${s.a.ms(-1)};
`,
				un = c.b.div`
	cursor: pointer;
	width: ${s.a.add(0, -3)};
	padding-left: ${s.a.ms(-3)};
	height: 100%;
`
			var mn = a.memo(on)
			const pn = {
					padding: '0 ' + s.a.ms(0),
					height: s.a.ms(2),
					lineHeight: s.a.ms(2),
					fonstSize: s.a.sub(0, -3),
					fontWeight: 'bold',
					color: s.a.color('gray-dark').toString('hex'),
					borderRadius: '2px 2px 0 0',
					background: s.a.color('dark').toString('hex'),
					border: '1px solid ' + s.a.color('dark-lighten'),
					borderBottom: '0px',
				},
				hn = {
					maxHeight: `calc(100vh - ${s.a.add(2, 1, 2, 2, 2)})`,
					listStyle: 'none',
					margin: 0,
					padding: 0,
					overflowY: 'auto',
					overflowX: 'hidden',
					border: '1px solid ' + s.a.color('dark-lighten'),
					borderWidth: '0 1px',
				}
			var gn = a.memo(
				Object(i.b)(
					e => {
						var t
						return {
							layers: e.project.scene,
							selecteds: e.project.selected_layers,
							open_layer_id: null === (t = e.project.open_layer_properties) || void 0 === t ? void 0 : t.id,
						}
					},
					e => ({ selectLayers: (t, n = !1) => e(Object(b.c)(t, n)) })
				)(({ layers: e, open_layer_id: t, selectLayers: n, selecteds: r }) => {
					const i = Object.values(e)
					function o(e, t) {
						const a = Object(Kt.e)(e, t, r, i)
						n(a)
					}
					return (
						a.useEffect(() => {
							function a() {
								const a = window.location.pathname
								if (a.length > 0 && '/' != a) {
									const r = a.substr(1)
									if (t != r) {
										Object(Kt.c)(r, Object.values(e)) && n([r], !0)
									}
								} else n([], !0)
							}
							return (
								window.addEventListener('popstate', a, { passive: !0 }),
								() => {
									window.removeEventListener('popstate', a)
								}
							)
						}, [e, t]),
						a.createElement(
							'section',
							{ 'data-name': 'layers', style: { height: '100%' } },
							a.createElement('div', { style: pn }, 'Layers'),
							a.createElement(
								'ul',
								{ style: hn },
								i.length > 0
									? i.map(e =>
											a.createElement(mn, { key: e.id, layers: i, toggleSelection: o, selecteds: r, layer: e, deep: 0 })
									  )
									: a.createElement(
											'li',
											{
												style: {
													color: s.a.color('gray-dark').toString('hex'),
													padding: '0 ' + s.a.ms(0),
													lineHeight: s.a.ms(2),
													borderTop: '1px solid rgba(0,0,0,0)',
												},
											},
											a.createElement(
												'small',
												null,
												a.createElement(
													'i',
													null,
													'Add new shape from Toolbar or ',
													a.createElement(Be.a, { fill: s.a.color('gray-dark').toString('hex'), name: 'add' })
												)
											)
									  )
							),
							a.createElement(an, { selecteds: r, layers: e })
						)
					)
				})
			)
			const vn = c.b.section`
    border: 1px solid ${s.a.color('dark-lighten')};
    border-radius: 2px 2px 0 0;
    
    &+&{ 
        margin-top: ${s.a.ms(0)}; 
    }
`,
				fn = c.b.header`
    cursor: ${e => (e.expandable ? 'pointer' : null)};
    display: grid;
    align-items: center;
    grid-template-columns: ${e =>
			e.withAction ? 'max-content auto max-content max-content' : 'max-content auto max-content'};
    grid-gap: ${s.a.ms(-1)};
    padding: 0 ${s.a.ms(0)};
    line-height: ${s.a.ms(2)};
    height: ${s.a.ms(2)};
    background: ${s.a.color('dark')};
    fonst-size: ${s.a.sub(0, -3)};
    font-weight: bold;
    color: ${s.a.color('gray-dark')};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`,
				bn = c.b.section`
    padding: ${s.a.ms(0)};

    display: grid;
    grid-template-columns: 1fr;
    grid-gap: ${s.a.ms(-2)};
    font-size: ${s.a.sub(0, -4)};

    > * {
        line-height: ${s.a.add(1, -1)};
    }
`
			var yn = a.memo(e => {
					const [t, n] = a.useState(void 0 === e.expanded || e.expanded)
					return a.createElement(
						vn,
						null,
						a.createElement(
							fn,
							{ withAction: !!e.action, expandable: !!e.expandable, onClick: () => e.expandable && n(!t) },
							a.createElement(Be.a, { name: e.icon, fill: s.a.color('gray-dark').toString('hex') }),
							a.createElement('span', null, e.name),
							e.action && e.action,
							e.expandable &&
								a.createElement(Be.a, {
									name: 'arrow-right',
									fill: s.a.color('gray-dark').toString('hex'),
									cursor: 'pointer',
									rotate: 90,
									style: { transform: `scale(1, ${t ? -1 : 1})` },
								})
						),
						t && a.createElement(bn, null, e.children)
					)
				}),
				wn = n(169)
			var En = a.memo(e => {
					const [t, n] = a.useState(),
						r = e.layer,
						i = r.name
					function o() {
						const e = r.id
						return Object(wn.a)(
							E.ask('get-buffer-length', { id: e }).then(t => {
								r.id === e && n(t)
							})
						)
					}
					a.useEffect(() => {
						let e,
							t = !1
						return (
							E.attach('scene:update-scene_child-prop', n => {
								if (!t)
									for (let t = 0, a = n.length; t < a; t++)
										if (n[t].id === r.id && 'repetitions' === n[t].name) return (e = o())
							}),
							(e = o()),
							() => {
								;(t = !0), e && e.cancel()
							}
						)
					}, [r.id])
					const l = Object(Kt.d)(r)
					return a.createElement(
						yn,
						{
							name: i,
							icon: rn.a.getIcon(r.type),
							expandable: !0,
							expanded: !0,
							action: a.createElement(Be.a, {
								name: 'highlight',
								size: 0,
								onMouseOver: () => E.ask('layer-highlight', { id: r.id, status: !0 }),
								onMouseOut: () => E.ask('layer-highlight', { id: r.id, status: !1 }),
							}),
						},
						'Number of points: ',
						t,
						l.length > 0 &&
							a.createElement(
								'div',
								null,
								'Primitives:',
								l.map(t =>
									a.createElement(
										Se,
										{
											key: t.id,
											columns: 4,
											gap: s.a.ms(-2),
											valign: 'center',
											flow: 'auto max-content max-content max-content',
										},
										a.createElement('div', null, t.name),
										a.createElement(Be.a, {
											name: 'highlight',
											size: 0,
											onMouseOver: () => E.ask('layer-highlight', { id: t.id, status: !0 }),
											onMouseOut: () => E.ask('layer-highlight', { id: t.id, status: !1 }),
										}),
										a.createElement(
											ve,
											{ title: 'Open' },
											a.createElement(Be.a, {
												name: 'to-top',
												size: 0,
												onClick: () => e.selectLayer && e.selectLayer(t.id),
											})
										)
									)
								)
							)
					)
				}),
				xn = n(20)
			let _n = 0
			var kn = a.memo(e => {
				const t = 'rb_' + ++_n + '_' + e.name
				return a.createElement(
					Se,
					{
						columns: e.values.length,
						flow: `auto repeat(${e.values.length}, auto)`,
						gap: s.a.ms(0),
						valign: 'center',
						halign: e.align || 'space-around',
					},
					a.createElement('div', null, e.name),
					e.values.map(({ key: n, value: r }) =>
						a.createElement(
							On,
							{ key: t + '_' + n },
							a.createElement(Cn, {
								id: t + '_' + n,
								name: t,
								value: r,
								defaultChecked: r == e.selected,
								onClick: t => {
									e.onChange(t.target.value)
								},
							}),
							a.createElement('label', { htmlFor: t + '_' + n }, n)
						)
					)
				)
			})
			const On = c.b.div`
    position: relative;
    line-height: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding-bottom: 3px;
    color: ${s.a.color('gray-dark')};
    font-size: .8rem;
    
    input:checked+label {
        color: ${s.a.color('primary')};
    }

    label { cursor: pointer; }
`,
				Cn = c.b.input.attrs({ type: 'radio' })`
    position: absolute; 
    bottom: 0; left: 0;
    appearance: none;
    width: 100%;
    height: 3px;
    margin: 0;
    background: ${s.a.color('gray-dark')};
    &:checked{
        background: ${s.a.color('primary')};
    }
`
			var jn = n(64)
			let $n = null
			var zn = function (e, t, n, r) {
					a.useEffect(() => {
						var a
						function i(e) {
							Object(y.d)(e) &&
								(e.shiftKey
									? (e.stopImmediatePropagation(),
									  $n &&
											($n.type === t.type ||
												('multiple-range' === $n.type && 'range' === t.type) ||
												('multiple-range' === t.type && 'range' === $n.type)) &&
											(r($n.value), S($n.name + ' pasted to ' + t.name)))
									: (e.stopImmediatePropagation(),
									  ($n = { value: n, type: t.type, name: t.name }),
									  S(t.name + ' copied')))
						}
						return (
							null === (a = e.current) || void 0 === a || a.addEventListener('click', i, { passive: !0 }),
							() => {
								var t
								null === (t = e.current) || void 0 === t || t.removeEventListener('click', i)
							}
						)
					}, [e, n, t, r])
				},
				Sn = n(375)
			const Mn = c.b.div`
    display: none;
    position: absolute;
    z-index: 100;
    height: 100%;
    top: 0;
    background: ${s.a.palette.get('dark-lighten', 'hex').lighten(5)};
    cursor: pointer;
`,
				An = c.b.div`
    position: relative;
    height: ${e => (e.small ? s.a.ms(0) : e.size ? ('string' == typeof e.size ? e.size : s.a.ms(e.size)) : '100%')};
    line-height: ${e =>
			e.small ? s.a.ms(0) : e.size ? ('string' == typeof e.size ? e.size : s.a.ms(e.size)) : 'inherit'};
    font-size: ${e => (e.small ? s.a.sub(-1) : null)};
    background: ${s.a.palette.get('dark', 'hex')};
    
    width: 100%;
    &:hover ${Mn}{ display: block; }
`,
				Dn = c.b.input`
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 0 ${s.a.ms(-1)};
    background: ${s.a.palette.get('dark', 'hex').darken(5)};
    border:none;
    color: #fff;
`,
				Ln = c.b.div`
    position: relative;
    height: 100%;
    opacity: ${e => (e.bDefaultValue ? 0.3 : 1)};
    cursor: ew-resize;

    &:hover{
        background: rgba(255,255,255,.2);
    }
`,
				Pn = c.b.div`
    height: 100%;
    background: ${s.a.palette.get('primary', 'hex')};
    pointer-events: none;
`,
				Rn = c.b.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
`
			var Tn = a.memo(({ min: e, max: t, step: n, value: r, small: i, size: o, onChange: s, bDefaultValue: l }) => {
				const [c] = Object(He.a)(),
					[d, u] = a.useState(!1),
					m = n.toExponential(1).match(/e(-?[0-9]+)/),
					p = Math.pow(10, m ? -m[1] : 0)
				function h(n, a) {
					return (n = Object(ct.clamp)(e, t, n)), s(n, a), n != r
				}
				function g(a, i = 1) {
					h(Object(ct.clamp)(e, t, Math.round((r + i * n * a) * p) / p), 'none')
				}
				function v(n) {
					const a = parseFloat(n.replace(/,/g, '.'))
					return !Number.isNaN(a) && h(Object(ct.clamp)(e, t, a), 'none')
				}
				a.useEffect(() => {
					d && u(!1)
				}, [r])
				const [f, b] = dt({
					value: r,
					min: e,
					max: t,
					step: n,
					exp: p,
					onChange: h,
					events: {
						notDrag: () => {
							!(d && c.current && v(c.current.value)) && u(!1)
						},
						dragEnd: e => {
							!e && u(!0)
						},
					},
				})
				return a.createElement(
					An,
					{ small: i, size: o },
					d
						? a.createElement(Dn, {
								ref: c,
								defaultValue: r,
								autoFocus: !0,
								onKeyUp: e => 13 == e.keyCode && v(e.target.value),
								onFocus: e => e.target.select(),
						  })
						: a.createElement(
								a.Fragment,
								null,
								a.createElement(
									Mn,
									{ style: { left: 0 }, onClick: e => g(-1, e.shiftKey ? 10 : 1) },
									a.createElement(Be.a, { size: 0, rotate: 180, name: 'arrow-right' })
								),
								a.createElement(
									Ln,
									{ ref: b, bDefaultValue: l && f.value == r },
									a.createElement(Pn, { style: { width: f.valuePercentage + '%' } }),
									a.createElement(Rn, null, f.value.toFixed(Math.log10(p)))
								),
								a.createElement(
									Mn,
									{ style: { right: 0 }, onClick: e => g(1, e.shiftKey ? 10 : 1) },
									a.createElement(Be.a, { size: 0, name: 'arrow-right' })
								)
						  )
				)
			})
			const Bn = c.b.button`
    border: none;
    color: rgba(255,255,255,.8);
    background: none;
    cursor: pointer;
    line-height: 1;
    border-bottom: 2px solid ${s.a.color('primary')};
    padding: ${s.a.ms(-1)};

    &:hover {
        color: rgba(255,255,255,1);
    }
`
			var In = a.memo(({ label: e, onClick: t }) => a.createElement(Bn, { onClick: t }, e)),
				Hn = n(56)
			const Fn = {
				sinusoidal: [
					{ key: 'sin', value: 'sin' },
					{ key: 'cos', value: 'cos' },
				],
				easing: Object.keys(Hn).map(e => ({ key: e, value: e })),
			}
			function Nn(e, t) {
				return Object.assign(Object.assign({}, t), {
					from: 'color' == e.type ? t.from : parseFloat(t.from + ''),
					to: 'color' == e.type ? t.to : parseFloat(t.to + ''),
					durate: parseFloat(t.durate + ''),
					delay: parseFloat(t.delay + ''),
				})
			}
			var qn = a.memo(({ state: e, onChange: t, bColor: n, sequence: r }) =>
				a.createElement(
					Se,
					{
						gap: s.a.ms(-2),
						valign: 'center',
						style: { margin: s.a.ms(0) + ' 0' },
						columns: 2,
						rows: 5,
						flow: 'repeat(5, 1fr) / max-content ' + s.a.ms(4),
					},
					a.createElement(
						'div',
						{ style: { gridColumn: '1 / span 2' } },
						a.createElement(kn, {
							name: 'Type',
							align: 'flex-start',
							values: [
								{ key: 'Loop', value: 'loop' },
								{ key: 'Uncontrolled loop', value: 'uncontroller-loop' },
								{ key: 'Static', value: 'static' },
							],
							selected: e.type,
							onChange: e => t('type', e),
						})
					),
					('static' === e.type || 'uncontroller-loop' === e.type) &&
						a.createElement(
							a.Fragment,
							null,
							a.createElement('div', null, 'Delay'),
							a.createElement(Tn, {
								size: 2,
								min: 0,
								max: r.durate,
								step: 100,
								value: e.delay,
								onChange: (e, n) => 'none' == n && t('delay', e),
							})
						),
					('loop' === e.type || 'uncontroller-loop' === e.type) &&
						a.createElement(
							'div',
							{ style: { width: s.a.ms(5), gridColumn: '1 / span 2' } },
							a.createElement(kn, {
								name: 'Mode',
								align: 'flex-start',
								values: [
									{ key: 'Sinusoidal', value: 'sinusoidal' },
									{ key: 'Easing', value: 'easing' },
								],
								selected: e.mode,
								onChange: e => t('mode', e),
							})
						),
					a.createElement('div', null, 'Mode function'),
					a.createElement(Pt.a, {
						onChange: e => t('mode_function', e),
						placeholder: e.mode + ' function',
						options: Fn[e.mode],
						value: e.mode_function,
					}),
					'loop' === e.type &&
						'easing' === e.mode &&
						a.createElement(
							'small',
							{ style: { gridColumn: '1 / span 2' } },
							'the durate of animation will be',
							a.createElement('br', null),
							'divide for two.'
						),
					a.createElement(
						Se,
						{ columns: n ? 2 : 1 },
						a.createElement(
							'div',
							null,
							a.createElement(Me, { checked: e.invertOdd, name: 'Invert odd', onChange: e => t('invertOdd', e) })
						),
						n &&
							a.createElement(
								'div',
								null,
								a.createElement(kn, {
									name: 'Color mode',
									values: [
										{ key: 'rgb', value: 'rgb' },
										{ key: 'hue', value: 'hue' },
									],
									selected: e.colorTransitionMode,
									onChange: e => t('colorTransitionMode', e),
								})
							)
					)
				)
			)
			var Vn = a.memo(({ value: e, name: t, onChange: n, sceneChildProp: r }) => {
				switch (r.type) {
					case 'color':
						return a.createElement(zt, { size: s.a.add(1, -1), value: e, onChange: (e, a) => !1 === a && n(t, e) })
					case 'range':
					case 'multiple-range':
						return a.createElement(Tn, {
							value: e,
							onChange: (e, a) => 'none' === a && n(t, e),
							min: r.min,
							max: r.max,
							step: r.step,
						})
					case 'slider':
						return a.createElement(pt, {
							value: e,
							onChange: (e, a) => 'none' === a && n(t, e),
							min: r.min,
							max: r.max,
							step: r.step,
						})
				}
				return null
			})
			var Un = a.memo(
				Object(i.b)(e => ({ sequence: e.project.sequence }))(
					({ close: e, value: t, onChange: n, sequence: r, layer: i, prop_name: o }) => {
						const l = rn.a.sceneChildProps[o],
							c = jn.a.bValueAnimation(t),
							d = (function (e, t, n = 1e3) {
								const a = jn.a.bValueAnimation(e) && 'simple' == e.type ? e.value : {}
								return Object.assign(
									{
										from: Array.isArray(t.default) ? Object(y.h)(t.default) : t.default,
										to: t.default_animate,
										durate: n,
										invertOdd: !1,
										colorTransitionMode: 'rgb',
										type: 'loop',
										mode: 'sinusoidal',
										mode_function: 'sin',
										delay: 0,
									},
									a
								)
							})(t, l, Math.min(2e3, r.durate)),
							[u, m] = a.useState(d),
							[p, h] = a.useState(
								c &&
									('loop' !== (g = d).type ||
										'sinusoidal' !== g.mode ||
										'sin' !== g.mode_function ||
										!1 !== g.invertOdd ||
										'rgb' !== g.colorTransitionMode)
							)
						var g
						function v(e, t) {
							if ('mode' === e) {
								const e = Fn[t]
								m(Object.assign(Object.assign({}, u), { mode: t, mode_function: e[0].value }))
							} else
								m(
									'type' === e
										? Object.assign(Object.assign({}, u), {
												type: t,
												mode: 'static' === t ? 'easing' : u.mode,
												mode_function: 'static' === t && 'easing' != u.mode ? Fn.easing[0].value : u.mode_function,
										  })
										: Object.assign(Object.assign({}, u), { [e]: t })
								)
						}
						return a.createElement(
							'div',
							null,
							a.createElement('h2', null, 'Simple animation'),
							a.createElement('small', null, 'Animate prop ', a.createElement('b', null, o), ' of shape ', i.name),
							a.createElement(
								Se,
								{
									gap: s.a.ms(-2),
									valign: 'center',
									style: { margin: s.a.ms(0) + ' 0' },
									flow: 'repeat(3, 1fr) / max-content ' + s.a.ms(4),
								},
								a.createElement('div', null, 'From'),
								a.createElement(Vn, { value: u.from, onChange: v, name: 'from', sceneChildProp: l }),
								a.createElement('div', null, 'To'),
								a.createElement(Vn, { value: u.to, onChange: v, name: 'to', sceneChildProp: l }),
								a.createElement('div', null, 'Durate'),
								a.createElement(Tn, {
									size: s.a.add(1, -1),
									min: 0,
									max: r.durate,
									step: 100,
									value: u.durate,
									onChange: (e, t) => 'none' == t && v('durate', e),
								})
							),
							a.createElement(Me, { checked: p, onChange: e => h(e), name: 'Advance mode', size: 0 }),
							p && a.createElement(qn, { state: u, bColor: 'color' == l.type, sequence: r, onChange: v }),
							a.createElement(
								'div',
								{
									onClick: function () {
										e(), Object(Sn.c)(i.id, o)
									},
								},
								'open visual editor in new window'
							),
							a.createElement(In, {
								onClick: function () {
									n({ type: 'simple', value: Nn(l, u) })
								},
								label: 'Apply',
							}),
							c &&
								a.createElement(In, {
									onClick: function () {
										n(void 0)
									},
									label: 'Remove',
								})
						)
					}
				)
			)
			const Xn = c.b.div`
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
`,
				Gn = c.c`
    from { opacity: 0; }
    to { opacity: 1; }
`,
				Yn = c.b.div`
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    animation: ${Gn} .1s ease-out both;
    background: rgba(0,0,0,.6);
`,
				Wn = c.c`
    from { opacity: 0; transform: scale(.98); }
    to { opacity: 1; transform: scale(1); }
`,
				Kn = c.b.div`
    position: relative;
    z-index: 1000;
    max-width: 80vw;
    background: ${s.a.color('dark-lighten')};
    padding: ${s.a.ms(2)};
    box-shadow: 0 ${s.a.ms(0)} ${s.a.ms(2)} ${s.a.ms(0)} rgba(0,0,0,.5);
    animation: ${Wn} .1s ease-out both;
    border-radius: 2px;
`,
				Jn = c.b.div`
    position: absolute;
    top: ${s.a.ms(-1)}; 
    right: ${s.a.ms(-1)};
`
			var Zn = a.memo(({ bCloseOnBackground: e, open: t, close: n, children: r, noCloseButton: i = !1 }) => {
				const o = document.getElementById('modal-root'),
					s = document.createElement('div')
				return (
					a.useEffect(
						() => (
							o.appendChild(s),
							() => {
								o.removeChild(s)
							}
						),
						[s]
					),
					t
						? R.a.createPortal(
								a.createElement(
									Xn,
									null,
									a.createElement(Yn, { onClick: t => e && n && n(t) }),
									a.createElement(
										Kn,
										null,
										!i && a.createElement(Jn, null, a.createElement(Be.a, { onClick: n, name: 'close' })),
										r
									)
								),
								s
						  )
						: null
				)
			})
			var Qn = r.a.memo(({ name: e, value: t, layer: n, prop_name: a, bDefaultValue: i, onChange: o }) => {
				const [l, c] = r.a.useState(!1),
					d = jn.a.bValueAnimation(t)
				return r.a.createElement(
					'div',
					{ style: { display: 'flex', justifyContent: 'center', flexDirection: 'column' } },
					r.a.createElement('div', { style: { lineHeight: 1, marginBottom: s.a.ms(-2) } }, e),
					r.a.createElement(
						'div',
						{ style: { display: 'flex' } },
						d
							? r.a.createElement(Be.a, { size: s.a.add(1, -1), name: 'animate-color' })
							: r.a.createElement(zt, { onChange: o, value: t, size: s.a.add(1, -1) }),
						r.a.createElement(
							ve,
							{ title: 'Animate prop', position: 'right' },
							r.a.createElement(Be.a, { name: d ? 'animated' : 'not-animated', onClick: () => c(!0) })
						)
					),
					r.a.createElement(
						Zn,
						{ open: l, close: () => c(!1) },
						r.a.createElement(Un, {
							close: () => c(!1),
							value: t,
							layer: n,
							prop_name: a,
							onChange: e => (o(e, 'slider' == 'none'), void (l && c(!1))),
						})
					)
				)
			})
			var ea = a.memo(e => {
				function t(t, n, a) {
					let r
					void 0 !== a ? ((r = Object(y.g)(e.value)), (r[a] = t)) : (r = t), e.onChange(r, n)
				}
				if (e.locked)
					return a.createElement(Tn, Object.assign({}, e, { value: Object(y.h)(e.value), onChange: (e, n) => t(e, n) }))
				const n = Object(y.g)(e.value)
				return a.createElement(
					Se,
					{ rows: 2, gap: s.a.ms(-4) },
					a.createElement(Tn, Object.assign({}, e, { small: !0, value: n[0], onChange: (e, n) => t(e, n, 0) })),
					a.createElement(Tn, Object.assign({}, e, { small: !0, value: n[1], onChange: (e, n) => t(e, n, 1) }))
				)
			})
			var ta = r.a.memo(
				({
					name: e,
					prop_name: t,
					value: n,
					min: a,
					max: i,
					step: o,
					type: l,
					animable: c,
					layer: d,
					onChange: u,
					bDefaultValue: m,
					canBArray: p,
				}) => {
					const [h, g] = r.a.useState(!1),
						[v, f] = r.a.useState(Array.isArray(n) && n[0] === n[1]),
						b = jn.a.bValueAnimation(n),
						y = 'multiple-range' == l,
						w = y ? ea : Tn
					function E(e, t) {
						u(e, 'slider' == t), h && g(!1)
					}
					return r.a.createElement(
						Se,
						{ columns: 3, flow: '1fr 1fr max-content', gap: s.a.ms(0), style: { userSelect: 'none' } },
						r.a.createElement(
							'div',
							{
								onClick: () => !b && y && void f(!v),
								style: {
									textAlign: 'right',
									cursor: y ? 'pointer' : void 0,
									whiteSpace: 'nowrap',
									textOverflow: 'ellipsis',
									overflow: 'hidden',
								},
							},
							!b &&
								y &&
								r.a.createElement(Be.a, {
									size: 0,
									style: { marginRight: s.a.ms(-2) },
									name: v ? 'unlock-value' : 'lock-value',
									onClick: () => {},
								}),
							e
						),
						b
							? r.a.createElement(
									'div',
									{ style: { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } },
									'simple' == n.type
										? r.a.createElement(
												'small',
												null,
												n.value.from,
												' → ',
												n.value.to,
												' in ',
												Math.round(n.value.durate / 100) / 10,
												's'
										  )
										: r.a.createElement('span', null, 'animated')
							  )
							: r.a.createElement(w, { bDefaultValue: m, locked: v, value: n, min: a, max: i, step: o, onChange: E }),
						r.a.createElement(
							'div',
							{ style: { width: s.a.ms(1) } },
							c &&
								r.a.createElement(
									ve,
									{ title: 'Animate prop', position: 'left' },
									r.a.createElement(Be.a, { name: b ? 'animated' : 'not-animated', onClick: () => g(!0) })
								)
						),
						r.a.createElement(
							Zn,
							{ open: h, close: () => g(!1) },
							r.a.createElement(Un, {
								close: () => g(!1),
								value: n,
								layer: d,
								prop_name: t,
								onChange: e => E(e, 'none'),
							})
						)
					)
				}
			)
			var na = r.a.memo(
				({ name: e, value: t, layer: n, min: a, max: i, step: o, prop_name: l, bDefaultValue: c, onChange: d }) => {
					const [u, m] = r.a.useState(!1),
						p = jn.a.bValueAnimation(t)
					return r.a.createElement(
						'div',
						{ style: { display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' } },
						r.a.createElement('div', { style: { lineHeight: 1, marginBottom: s.a.ms(-2) } }, e),
						r.a.createElement(
							'div',
							{
								style: {
									display: 'flex',
									height: s.a.add(1, -1),
									alignItems: 'center',
									justifyContent: 'center',
									width: '100%',
								},
							},
							p
								? r.a.createElement(Be.a, { size: s.a.add(1, -1), name: 'animate-color' })
								: r.a.createElement(pt, { min: a, max: i, step: o, onChange: d, value: t }),
							r.a.createElement(
								ve,
								{ title: 'Animate prop', position: 'right' },
								r.a.createElement(Be.a, { name: p ? 'animated' : 'not-animated', onClick: () => m(!0) })
							)
						),
						r.a.createElement(
							Zn,
							{ open: u, close: () => m(!1) },
							r.a.createElement(Un, {
								close: () => m(!1),
								value: t,
								layer: n,
								prop_name: l,
								onChange: e => (d(e, 'none'), void (u && m(!1))),
							})
						)
					)
				}
			)
			var aa = r.a.memo(
					Object(i.b)((e, t) => ({ value: t.layer ? t.layer.props[t.name] : void 0 }))(
						({ name: e, layer: t, value: n, onChange: a, forceArray: i }) => {
							const o = r.a.useRef(null),
								s = rn.a.sceneChildProps[e]
							let l = null != n ? n : s.default
							const c =
								void 0 === n ||
								((d = n),
								(u = s.default),
								typeof d == typeof u &&
									(Array.isArray(d) && Array.isArray(u) ? d[0] === u[0] && d[1] === u[1] : d === u))
							var d, u
							let m = s.canBArray ? (Array.isArray(l) ? 'multiple-range' : 'range') : s.type
							function p(n, r) {
								n != l &&
									(jn.a.bValueAnimation(n) || (n = i ? Object(y.g)(n) : n),
									E.run('set-prop', { id: t.id, name: e, value: n, prev_value: l }, r),
									a && a(n, l))
							}
							'Line' === t.type && 'sideLength' == e && Array.isArray(l) && ((l = Object(y.h)(l)), (m = 'range')),
								zn(o, s, l, p)
							let h = null
							switch (m) {
								case 'multiple-range':
								case 'range':
									h = r.a.createElement(ta, {
										value: 'number' == typeof l || Array.isArray(l) ? ((g = l), Array.isArray(g) ? g.slice() : g) : l,
										bDefaultValue: c,
										canBArray: s.canBArray || !1,
										min: s.min,
										max: 'repetitions' == e ? ('multiple-range' == m ? 20 : 100) : s.max,
										step: s.step,
										type: m,
										name: s.label,
										prop_name: s.name,
										layer: t,
										onChange: p,
										animable: s.animable,
									})
									break
								case 'radio':
									h = r.a.createElement(kn, { onChange: p, name: s.label, selected: l, values: s.options })
									break
								case 'checkbox':
									h = r.a.createElement(Me, { checked: l, onChange: p, name: s.label })
									break
								case 'select':
									h = r.a.createElement(Pt.a, { options: s.options, value: l, placeholder: s.label, onChange: p })
									break
								case 'color':
									h = r.a.createElement(Qn, {
										layer: t,
										prop_name: e,
										value: l,
										name: s.label,
										onChange: p,
										bDefaultValue: void 0 === n,
									})
									break
								case 'slider':
									h = r.a.createElement(na, {
										layer: t,
										name: s.label,
										prop_name: e,
										value: l,
										min: s.min,
										max: s.max,
										step: s.step,
										onChange: (e, t) => p(e, 'slider' == t),
										bDefaultValue: void 0 === n,
									})
							}
							var g
							return r.a.createElement('div', { ref: o }, h)
						}
					)
				),
				ra = function (e, t, n, a) {
					return new (n || (n = Promise))(function (r, i) {
						function o(e) {
							try {
								l(a.next(e))
							} catch (e) {
								i(e)
							}
						}
						function s(e) {
							try {
								l(a.throw(e))
							} catch (e) {
								i(e)
							}
						}
						function l(e) {
							var t
							e.done
								? r(e.value)
								: ((t = e.value),
								  t instanceof n
										? t
										: new n(function (e) {
												e(t)
										  })).then(o, s)
						}
						l((a = a.apply(e, t || [])).next())
					})
				}
			const ia = [
				{ key: 'Matrix', value: xn.a.Matrix },
				{ key: 'Ring', value: xn.a.Ring },
			]
			function oa(e) {
				return Array.isArray(e.props.repetitions) ? xn.a.Matrix : xn.a.Ring
			}
			var sa = a.memo(e => {
				const t = e.layer
				let n = t.props.repetitions || 1,
					r = t.props.distance || 0
				const [i, o] = a.useState(oa(t))
				return (
					a.useEffect(() => {
						const e = oa(t)
						e != i && o(e)
					}, [t]),
					a.createElement(
						yn,
						{ name: 'Repetition', icon: 'repetitions', expandable: !0, expanded: !0 },
						a.createElement(kn, {
							selected: i,
							values: ia,
							name: 'Type',
							onChange: function (e) {
								if ((console.log('setRepetition', { type: e, repetition_type: i, distance: r }), e != i)) {
									const a = e == xn.a.Matrix ? Object(y.c)(1, 20, n) : Object(Le.b)(1, 100, Object(y.h)(n)),
										i = [{ id: t.id, name: 'repetitions', value: a, prev_value: n }]
									if (!jn.a.bValueAnimation(r)) {
										const n = e == xn.a.Matrix ? Object(y.c)(-100, 100, r) : Object(Le.b)(-100, 100, Object(y.h)(r))
										i.push({ id: t.id, name: 'distance', value: n, prev_value: r })
									}
									E.run('set-prop', i), o(e)
								}
							},
						}),
						a.createElement(aa, {
							layer: t,
							name: 'repetitions',
							onChange: e => (n = e),
							forceArray: i == xn.a.Matrix,
						}),
						a.createElement(aa, { layer: t, name: 'distance', onChange: e => (r = e) }),
						i == xn.a.Ring && a.createElement(aa, { layer: t, name: 'displace' }),
						a.createElement(
							'small',
							{
								style: { textAlign: 'right', cursor: 'pointer' },
								onClick: () =>
									(function () {
										return ra(this, void 0, void 0, function* () {
											if (i == xn.a.Matrix) {
												const e = Object(y.g)(n),
													a = [e[0] <= 1 ? 0 : 200 / e[0], e[1] <= 1 ? 0 : 200 / e[1]]
												E.run('set-prop', { id: t.id, name: 'distance', value: a, prev_value: r })
											} else {
												const e = Object(y.h)(n)
												if (1 == e) E.run('set-prop', { id: t.id, name: 'distance', value: 0, prev_value: r })
												else {
													const n = yield E.ask('single-bounding', { id: t.id }),
														a = e <= 1 ? 0 : (100 * n.width) / (Math.PI / (e + 1))
													E.run('set-prop', {
														id: t.id,
														name: 'distance',
														value: Object(Le.b)(-100, 100, a),
														prev_value: r,
													})
												}
											}
										})
									})(),
							},
							'distribute'
						)
					)
				)
			})
			var la = a.memo(({ layer: e }) =>
				a.createElement(
					yn,
					{ name: 'Primitive settings', icon: 'primitive', expandable: !0, expanded: !0 },
					a.createElement(aa, { layer: e, name: 'sideLength' }),
					'RegularPolygon' === e.type && a.createElement(aa, { layer: e, name: 'sideNumber' }),
					'Rose' === e.type &&
						a.createElement(
							a.Fragment,
							null,
							a.createElement(aa, { layer: e, name: 'n' }),
							a.createElement(aa, { layer: e, name: 'd' })
						),
					'Lissajous' === e.type &&
						a.createElement(
							a.Fragment,
							null,
							a.createElement(aa, { layer: e, name: 'wx' }),
							a.createElement(aa, { layer: e, name: 'wy' }),
							a.createElement(aa, { layer: e, name: 'wz' })
						),
					'Spiral' === e.type &&
						a.createElement(
							a.Fragment,
							null,
							a.createElement(aa, { layer: e, name: 'twists' }),
							a.createElement(aa, { layer: e, name: 'twists_start' }),
							a.createElement(aa, { layer: e, name: 'spiral' }),
							'Spiral type'
						),
					a.createElement(aa, { layer: e, name: 'bCloseShape' }),
					a.createElement(aa, { layer: e, name: 'bAdaptBuffer' })
				)
			)
			var ca = a.memo(e => {
					const t = e.layer
					return a.createElement(
						yn,
						{ name: 'Transformations', icon: 'transform', expandable: !0, expanded: !0 },
						a.createElement(aa, { layer: t, name: 'scale' }),
						a.createElement(aa, { layer: t, name: 'translate' }),
						a.createElement(aa, { layer: t, name: 'squeezeX' }),
						a.createElement(aa, { layer: t, name: 'squeezeY' }),
						a.createElement(aa, { layer: t, name: 'skewX' }),
						a.createElement(aa, { layer: t, name: 'skewY' }),
						a.createElement(aa, { layer: t, name: 'rotateX' }),
						a.createElement(aa, { layer: t, name: 'rotateY' }),
						a.createElement(aa, { layer: t, name: 'rotateZ' })
					)
				}),
				da = function (e, t, n, a) {
					return new (n || (n = Promise))(function (r, i) {
						function o(e) {
							try {
								l(a.next(e))
							} catch (e) {
								i(e)
							}
						}
						function s(e) {
							try {
								l(a.throw(e))
							} catch (e) {
								i(e)
							}
						}
						function l(e) {
							var t
							e.done
								? r(e.value)
								: ((t = e.value),
								  t instanceof n
										? t
										: new n(function (e) {
												e(t)
										  })).then(o, s)
						}
						l((a = a.apply(e, t || [])).next())
					})
				}
			var ua = a.memo(
				Object(i.b)(e => ({ bGhost: e.project.ghosts > 0 }))(({ layer: e, bGhost: t }) => {
					const [n, r] = a.useState(e.ui.disableGhost)
					return (
						a.useEffect(() => {
							e.ui.disableGhost != n && r(e.ui.disableGhost)
						}, [e.id]),
						a.createElement(
							yn,
							{ name: 'Style', icon: 'style', expandable: !0, expanded: !0 },
							a.createElement(
								Se,
								{
									columns: 4,
									gap: s.a.ms(-2),
									flow: 'max-content max-content auto max-content',
									valign: 'center',
									style: { width: '100%', overflow: 'hidden' },
								},
								a.createElement(aa, { layer: e, name: 'fillColor' }),
								a.createElement(aa, { layer: e, name: 'strokeColor' }),
								a.createElement(aa, { layer: e, name: 'lineWidth' }),
								a.createElement(
									'div',
									{ style: { display: 'flex', justifyContent: 'center', flexDirection: 'column' } },
									t &&
										a.createElement(
											a.Fragment,
											null,
											a.createElement('small', { style: { lineHeight: 1, marginBottom: s.a.ms(-2) } }, 'Disable Ghost'),
											a.createElement(
												'div',
												{
													style: {
														display: 'flex',
														height: s.a.add(1, -1),
														alignItems: 'center',
														justifyContent: 'center',
													},
												},
												a.createElement(Me, {
													checked: n,
													name: '',
													onChange: function () {
														return da(this, void 0, void 0, function* () {
															const t = !n
															yield E.ask('layer-ghost', { id: e.id, status: t }), r(t)
														})
													},
													size: 1,
												})
											)
										)
								)
							)
						)
					)
				})
			)
			var ma = Object(i.b)(
				e => ({ selected_layer: e.project.open_layer_properties }),
				e => ({ selectLayer: t => e(Object(b.c)([t])) })
			)(({ selected_layer: e, selectLayer: t }) =>
				a.createElement(
					'section',
					{ 'data-name': 'properties', style: { maxHeight: '100%', overflow: 'auto' } },
					e
						? a.createElement(
								a.Fragment,
								null,
								a.createElement(En, { layer: e, selectLayer: t }),
								e.bPrimitive && a.createElement(ua, { layer: e }),
								a.createElement(sa, { layer: e }),
								e.bPrimitive && a.createElement(la, { layer: e }),
								a.createElement(ca, { layer: e })
						  )
						: a.createElement('i', null, 'Select layer to change properties')
				)
			)
			const pa = {
					style: { width: '100vw', height: '100%', overflow: 'hidden', padding: '0 ' + s.a.ms(0) },
					columns: 2,
					flow: 'repeat(2, minmax(0, 1fr))',
					component: 'section',
					gap: s.a.ms(0),
				},
				ha = {
					columns: 2,
					rows: 2,
					valign: 'start',
					flow: 'auto max-content / max-content auto',
					gap: s.a.ms(0),
					style: { height: `calc(100vh - ${s.a.add(2, 1)})` },
				},
				ga = {
					columns: 2,
					valign: 'start',
					flow: 'repeat(2, minmax(0, 1fr))',
					gap: s.a.ms(0),
					style: { height: '100%', overflow: 'hidden' },
				}
			var va = () =>
					a.createElement(
						Se,
						Object.assign({}, pa, { id: 'workspace' }),
						a.createElement(
							Se,
							Object.assign({}, ha),
							a.createElement($e, null),
							a.createElement(It, null),
							a.createElement('div', { style: { gridColumn: '1 / span 2' } }, a.createElement(Wt, null))
						),
						a.createElement(Se, Object.assign({}, ga), a.createElement(gn, null), a.createElement(ma, null))
					),
				fa = n(65),
				ba = n(381),
				ya = n(71)
			const wa = [
					'{"background":"#111413","mainColor":"#1fcc9a","clearCanvas":true,"scene":{"761599d0-d011-11ea-94c2-93a9acce0c52":{"type":"Shape","props":{"distance":0,"repetitions":1,"displace":{"type":"simple","value":{"from":0,"to":360,"durate":5000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}},"scale":4.43},"id":"761599d0-d011-11ea-94c2-93a9acce0c52","name":"Shape_3","ui":{"props":{},"visible":true,"shapeLoop":{},"highlighted":false},"order":0,"depth":0,"bPrimitive":false,"children":[{"type":"Shape","props":{"distance":{"type":"simple","value":{"from":0,"to":16,"durate":2500,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}},"repetitions":9,"squeezeX":{"type":"simple","value":{"from":0,"to":0.01,"durate":2500,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"easing","mode_function":"cubicInOut","delay":0}},"displace":0,"scale":0.54},"id":"20e2a580-d010-11ea-90ac-51b5f98cf390","name":"Shape_1","ui":{"props":{},"visible":true,"shapeLoop":{},"highlighted":false,"imported":true},"order":0,"depth":1,"parent_id":"761599d0-d011-11ea-94c2-93a9acce0c52","bPrimitive":false,"children":[{"type":"Shape","props":{"distance":{"type":"simple","value":{"from":6,"to":22,"durate":2500,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"cos","delay":0}},"repetitions":6,"rotateX":{"type":"simple","value":{"from":0,"to":180,"durate":2500,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}},"skewX":0,"squeezeX":{"type":"simple","value":{"from":0,"to":0.016,"durate":2500,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}},"displace":0},"id":"70271dc0-d00f-11ea-90ac-51b5f98cf390","name":"Shape_1","ui":{"props":{},"visible":true,"shapeLoop":{},"highlighted":false,"imported":true},"order":0,"depth":2,"parent_id":"20e2a580-d010-11ea-90ac-51b5f98cf390","bPrimitive":false,"children":[{"type":"Rect","props":{"distance":{"type":"simple","value":{"from":0,"to":3,"durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}},"repetitions":4,"skewX":0,"skewY":0,"squeezeX":{"type":"simple","value":{"from":0,"to":0.01,"durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}},"displace":0,"scale":{"type":"simple","value":{"from":0.15,"to":0.34,"durate":2500,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}},"sideLength":2.4,"fillColor":{"type":"simple","value":{"from":"rgba(0,255,104,1)","to":"rgba(255,0,5,1)","durate":2500,"invertOdd":true,"colorTransitionMode":"hue","type":"loop","mode":"sinusoidal","mode_function":"cos","delay":0}},"bAdaptBuffer":2,"bCloseShape":true},"id":"0d22e920-d00f-11ea-90ac-51b5f98cf390","name":"Circle_1","ui":{"props":{},"visible":true,"shapeLoop":{},"highlighted":false,"imported":true},"order":0,"depth":3,"parent_id":"70271dc0-d00f-11ea-90ac-51b5f98cf390","shape":{"0":-1,"1":-1,"2":1,"3":-1,"4":1,"5":1,"6":-1,"7":1},"bPrimitive":true}]}]}]}},"ghosts":3,"ghost_skip_time":45,"history":[],"ratio":1.85,"sequence":{"start":0,"end":5000,"durate":5000,"framerate":60,"frames":300},"selected_layers":[],"name":"EmptyProject"}',
					'{"background":"#111413","mainColor":"#1fcc9a","clearCanvas":true,"scene":{"9508e580-d0f3-11ea-8311-efe78dbb3dbe":{"type":"Shape","props":{"scale":{"type":"simple","value":{"from":0.5,"to":1.06,"durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"easing","mode_function":"cubicOut","delay":0}},"distance":0},"id":"9508e580-d0f3-11ea-8311-efe78dbb3dbe","name":"Shape_2","ui":{"visible":true,"props":{"scale":{"type":"simple","value":{"from":0.5,"to":1.06,"durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"easing","mode_function":"cubicOut","delay":0}}},"shapeLoop":{},"highlighted":false},"order":0,"depth":0,"bPrimitive":false,"children":[{"type":"Shape","props":{"distance":{"type":"simple","value":{"from":0,"to":25,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}},"repetitions":8,"rotateY":{"type":"simple","value":{"from":0,"to":180,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"cos","delay":0}},"skewX":0,"squeezeX":{"type":"simple","value":{"from":0,"to":0.022,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"cos","delay":0}},"scale":{"type":"simple","value":{"from":1.7,"to":0.52,"durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"cos","delay":0}},"rotateX":{"type":"simple","value":{"from":0,"to":180,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}}},"id":"d60f4750-d0f2-11ea-8311-efe78dbb3dbe","name":"Shape_1","ui":{"visible":true,"props":{"distance":{"type":"simple","value":{"from":0,"to":25,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}},"scale":{"type":"simple","value":{"from":1.7,"to":0.52,"durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"cos","delay":0}},"squeezeX":{"type":"simple","value":{"from":0,"to":0.107,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"cos","delay":0}},"rotateY":{"type":"simple","value":{"from":0,"to":180,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"cos","delay":0}},"rotateX":{"type":"simple","value":{"from":0,"to":180,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}}},"shapeLoop":{},"highlighted":false},"order":0,"depth":1,"parent_id":"9508e580-d0f3-11ea-8311-efe78dbb3dbe","bPrimitive":false,"children":[{"type":"Group","props":{"data":{"ui":{"visible":true,"shapeLoop":{},"highlighted":false,"props":{"distance":37}}},"distance":46,"repetitions":10},"id":"d60f6e60-d0f2-11ea-8311-efe78dbb3dbe","name":"Group_1","ui":{"visible":true,"props":{},"shapeLoop":{},"highlighted":false},"order":0,"depth":2,"parent_id":"d60f4750-d0f2-11ea-8311-efe78dbb3dbe","bPrimitive":false,"children":[{"type":"Line","props":{"distance":37,"repetitions":10,"squeezeX":0,"sideLength":15.9,"lineWidth":0.2,"strokeColor":{"type":"simple","value":{"from":"rgba(255,16,0,1)","to":"rgba(0,194,204,1)","durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}},"bAdaptBuffer":2,"bCloseShape":true,"loop":{"start":0,"end":6.283185307179586},"sideNumber":2,"data":{"ui":{"visible":true,"props":{},"shapeLoop":{},"highlighted":false}}},"id":"b9afca30-d0f2-11ea-8311-efe78dbb3dbe","name":"Line_1","ui":{"visible":true,"props":{"strokeColor":{"type":"simple","value":{"from":"rgba(255,16,0,1)","to":"rgba(0,194,204,1)","durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}}},"shapeLoop":{},"highlighted":false},"order":0,"depth":3,"parent_id":"d60f6e60-d0f2-11ea-8311-efe78dbb3dbe","bPrimitive":true},{"type":"Rect","props":{"distance":37,"repetitions":10,"sideLength":0.7,"fillColor":{"type":"simple","value":{"from":"rgba(129,0,255,1)","to":"rgba(193,128,255,1)","durate":2000,"invertOdd":true,"colorTransitionMode":"hue","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}},"bAdaptBuffer":2,"bCloseShape":true,"data":{"ui":{"visible":true,"shapeLoop":{},"highlighted":false,"props":{"squeezeX":0.02}}},"squeezeX":0.02},"id":"c0543ab0-d0f2-11ea-8311-efe78dbb3dbe","name":"Circle_1","ui":{"visible":true,"props":{"fillColor":{"type":"simple","value":{"from":"rgba(129,0,255,1)","to":"rgba(193,128,255,1)","durate":2000,"invertOdd":true,"colorTransitionMode":"hue","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}}},"shapeLoop":{},"highlighted":false},"order":1,"depth":3,"parent_id":"d60f6e60-d0f2-11ea-8311-efe78dbb3dbe","bPrimitive":true},{"type":"Circle","props":{"distance":46,"repetitions":10,"squeezeX":0.2,"sideLength":2.3,"fillColor":{"type":"simple","value":{"from":"rgba(164,0,255,1)","to":"rgba(59,255,112,1)","durate":2000,"invertOdd":true,"colorTransitionMode":"hue","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}},"bAdaptBuffer":2,"bCloseShape":true,"data":{"ui":{"visible":true,"props":{},"shapeLoop":{},"highlighted":false}}},"id":"bd410740-d0f2-11ea-8311-efe78dbb3dbe","name":"Circle_1","ui":{"visible":true,"props":{"fillColor":{"type":"simple","value":{"from":"rgba(164,0,255,1)","to":"rgba(59,255,112,1)","durate":2000,"invertOdd":true,"colorTransitionMode":"hue","type":"loop","mode":"sinusoidal","mode_function":"sin","delay":0}}},"shapeLoop":{},"highlighted":false},"order":2,"depth":3,"parent_id":"d60f6e60-d0f2-11ea-8311-efe78dbb3dbe","bPrimitive":true}]}]}]}},"ghosts":3,"ghost_skip_frames":0.3,"history":[],"sequence":{"start":0,"end":6000,"durate":6000,"framerate":60,"frames":360},"selected_layers":[],"ratio":1.85,"ghost_skip_time":20,"name":"EmptyProject"}',
				],
				Ea = ['meanderings.jpg'],
				xa = c.c`from { opacity: 1; } to { opacity: 0; } `,
				_a = c.b.div`  
    position: relative;
    width: 500px;
    height: 270px;
    overflow: hidden;
    position: relative;
    
    &:after {
        position: absolute;
        top: 0; left: 0;
        display: block; 
        content: ' ';
        width: 100%; height: 100%;
        background: ${s.a.color('dark')};
        animation: ${xa} .5s .1s linear both;
    }
`
			var ka = a.memo(() => {
				const e = a.createRef()
				return (
					a.useEffect(() => {
						let t
						if (e.current)
							if (Math.random() > 0.5) {
								const t = new Image()
								t.addEventListener('load', () => {
									var n
									e.current && (null === (n = e.current.getContext('2d')) || void 0 === n || n.drawImage(t, 0, 0))
								}),
									(e.current.width = 1024),
									(e.current.height = 1024),
									(e.current.style.width = '100%'),
									(e.current.style.height = 'auto'),
									(e.current.style.transform = 'translateY(-25%)'),
									(t.src = '/assets/images/examples/' + Object(fa.randomElement)(Ea))
							} else {
								t = new ba.a(void 0, void 0, {}, 500)
								const n = ya.a.import(Object(fa.randomElement)(wa), t)
								if (n) {
									const a = n.scene
									a.resize(500, 500),
										t.setScene(a),
										t.setCanvas(e.current),
										t.setOption('clearCanvas', n.project.clearCanvas),
										t.setOption('ghosts', n.project.ghosts),
										t.setOption('ghost_skip_time', n.project.ghost_skip_time),
										t.setRatio(n.project.ratio),
										t
											.getTimeline()
											.setSequence(n.project.sequence.start, n.project.sequence.end, n.project.sequence.framerate),
										t.startAnimation()
								}
							}
						return () => {
							t && t.stopAnimation()
						}
					}, [e.current]),
					a.createElement(
						'div',
						{ style: { position: 'relative' } },
						a.createElement(_a, null, a.createElement('canvas', { ref: e })),
						a.createElement(
							'div',
							{
								style: {
									background: 'linear-gradient(0deg, rgba(0,0,0, 0.4) 0%, rgba(0,0,0,0) 80%)',
									position: 'absolute',
									bottom: -1,
									left: 0,
									width: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									padding: `${s.a.ms(-1)} ${s.a.ms(0)}`,
									color: 'rgba(255,255,255,.4)',
								},
							},
							a.createElement('div', null, 'Author'),
							a.createElement('div', null, 'Send yours')
						)
					)
				)
			})
			const Oa = c.b.div`
	position: fixed;
	top: 50%;
	left: 50%;
	background: ${s.a.color('dark-lighten')};
	transform: translate(-50%, -50%);
	box-shadow: 0 ${s.a.ms(0)} ${s.a.ms(2)} ${s.a.ms(0)} rgba(0, 0, 0, 0.5);
	border-radius: 2px;
	z-index: 12;
`
			var Ca = a.memo(
					Object(i.b)(null, e => ({ hide: () => e(Object(l.b)()) }))(({ hide: e }) =>
						a.createElement(
							a.Fragment,
							null,
							a.createElement('div', {
								style: { position: 'fixed', zIndex: 11, top: 0, left: 0, width: '100vw', height: '100vh' },
								onClick: e,
							}),
							a.createElement(
								Oa,
								null,
								a.createElement(ka, null),
								a.createElement(
									Se,
									{ rows: 2, style: { padding: s.a.ms(2) } },
									a.createElement(
										Se,
										{ columns: 2 },
										a.createElement('div', null, 'Tutorial'),
										a.createElement('div', null, 'Tutorial')
									),
									a.createElement(
										Se,
										{ columns: 2 },
										a.createElement(
											'div',
											null,
											a.createElement(
												'div',
												{
													onClick: () => {
														N(() => e())
													},
												},
												'New'
											),
											a.createElement(
												'div',
												{
													onClick: () => {
														q(!1, () => e())
													},
												},
												'Open'
											),
											E.hasAutosave() &&
												a.createElement(
													'div',
													{
														onClick: () => {
															E.restoreAutosave(), e()
														},
													},
													'Recover Last Session'
												)
										),
										a.createElement('div', null, 'Support')
									)
								)
							)
						)
					)
				),
				ja = n(126)
			var $a = a.memo(({ render: e, ratio: t, settings: n }) => {
				const r = a.createRef(),
					[i, o] = a.useState('image'),
					[l, c] = a.useState(1)
				return (
					a.useEffect(() => {
						if (e && r.current) {
							const a = r.current,
								o = a.getContext('2d', { alpha: !0 })
							let s = t >= 1 ? n.size : n.size * t,
								c = t >= 1 ? n.size / t : n.size
							if (s > n.size) {
								const e = s / c
								;(s = n.size), (c = n.size / e)
							} else if (c > n.size) {
								const e = c / s
								;(c = n.size), (s = n.size / e)
							}
							if (((a.width = s), (a.height = c), o.clearRect(0, 0, a.width, a.height), 'pattern' == i && l > 1)) {
								;(a.width *= l), (a.height *= l)
								const t = o.createPattern(e, 'repeat')
								;(o.fillStyle = t), o.fillRect(0, 0, a.width, a.height)
							} else o.drawImage(e, 0, 0, a.width, a.height)
						}
					}, [e, l]),
					a.createElement(
						'div',
						{ style: { position: 'relative' } },
						a.createElement(
							'div',
							{
								style: {
									display: 'flex',
									justifyContent: 'space-between',
									padding: `0 ${s.a.ms(0)} ${s.a.ms(0)} ${s.a.ms(0)}`,
								},
							},
							a.createElement(kn, {
								name: 'Preview type',
								selected: i,
								values: [
									{ key: 'Image', value: 'image' },
									{ key: 'Pattern', value: 'pattern' },
								],
								onChange: e => o(e),
							}),
							a.createElement(
								'div',
								null,
								'pattern' == i &&
									a.createElement(
										'div',
										{ style: { display: 'flex', alignItems: 'center' } },
										a.createElement('small', null, 'Tiles'),
										a.createElement(
											'div',
											null,
											a.createElement(Be.a, {
												size: 0,
												rotate: 180,
												name: 'arrow-right',
												disabled: l <= 1,
												onClick: e => l > 1 && c(l - 1),
											}),
											a.createElement('small', null, l),
											a.createElement(Be.a, {
												size: 0,
												name: 'arrow-right',
												disabled: l >= 5,
												onClick: e => l < 5 && c(l + 1),
											})
										)
									)
							)
						),
						a.createElement(
							'div',
							{
								style: {
									width: '100%',
									height: '100%',
									lineHeight: 0,
									fontSize: 0,
									backgroundImage: 'url(/assets/images/png-background.png)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								},
							},
							a.createElement('canvas', { ref: r, style: { maxWidth: '100%', maxHeight: '100%' } })
						)
					)
				)
			})
			const za = [256, 512, 1024, 2048, 4096, 8192].map(e => ({ key: e, value: e }))
			var Sa = a.memo(({ settings: e, setSettings: t, downloadSize: n }) =>
					a.createElement(
						'div',
						null,
						a.createElement(kn, {
							name: 'Image type',
							selected: e.type,
							values: [
								{ key: 'JPEG', value: 'image/jpeg' },
								{ key: 'PNG', value: 'image/png' },
								{ key: 'SVG', value: 'image/svg+xml' },
							],
							onChange: n => t(Object.assign(Object.assign({}, e), { type: n })),
						}),
						'image/svg+xml' !== e.type &&
							a.createElement(Pt.a, {
								value: e.size,
								placeholder: 'Size',
								options: za,
								onChange: n => t(Object.assign(Object.assign({}, e), { size: n })),
							}),
						a.createElement(pt, {
							value: e.quality,
							min: 0.1,
							max: 1,
							step: 0.1,
							onChange: n => t(Object.assign(Object.assign({}, e), { quality: n })),
						}),
						'image/jpeg' !== e.type &&
							a.createElement(Me, {
								checked: e.noBackground,
								onChange: n => t(Object.assign(Object.assign({}, e), { noBackground: n })),
								name: 'Remove background color',
							}),
						n && a.createElement('div', null, n)
					)
				),
				Ma = n(387),
				Aa = function (e, t, n, a) {
					return new (n || (n = Promise))(function (r, i) {
						function o(e) {
							try {
								l(a.next(e))
							} catch (e) {
								i(e)
							}
						}
						function s(e) {
							try {
								l(a.throw(e))
							} catch (e) {
								i(e)
							}
						}
						function l(e) {
							var t
							e.done
								? r(e.value)
								: ((t = e.value),
								  t instanceof n
										? t
										: new n(function (e) {
												e(t)
										  })).then(o, s)
						}
						l((a = a.apply(e, t || [])).next())
					})
				}
			const Da = c.b.div`
    svg { width: 100%; height: 100%; }
`
			var La = a.memo(
					Object(i.b)(e => ({ project: e.project }))(({ project: e, closeModal: t }) => {
						const [n, r] = a.useState(null),
							[i, o] = a.useState({ size: 1024, quality: 0.8, time: 0, type: 'image/jpeg', noBackground: !1 }),
							[l, c] = a.useState(!1),
							[d, u] = a.useState(null),
							[m, p] = a.useState(null)
						return (
							a.useEffect(
								() => () => {
									E.ask('render-stop')
								},
								[]
							),
							a.createElement(
								'div',
								null,
								a.createElement(
									Se,
									{ columns: 2, style: { width: s.a.add(7, 5) } },
									a.createElement(
										'div',
										{ style: { width: s.a.ms(7), position: 'relative' } },
										l &&
											a.createElement(
												'div',
												{
													style: {
														position: 'absolute',
														zIndex: 1,
														background: 'rgba(255,255,255,.4)',
														width: '100%',
														height: '100%',
													},
												},
												a.createElement(Ma.a, null)
											),
										n
											? a.createElement(Da, null, a.createElement('div', { dangerouslySetInnerHTML: { __html: n } }))
											: a.createElement($a, { ratio: e.ratio, render: d, settings: i })
									),
									a.createElement(
										'div',
										null,
										a.createElement(Sa, { settings: i, setSettings: o, downloadSize: m }),
										a.createElement(
											'button',
											{
												disabled: l,
												onClick: function () {
													return Aa(this, void 0, void 0, function* () {
														if (!l) {
															c(!0)
															const t = yield E.ask('render-image', { settings: i, project: ja.a.export(e) })
															if ('image/svg+xml' === i.type) r(t.svg), c(!1)
															else {
																const e = new Blob([t], { type: i.type }),
																	n = new Image()
																n.addEventListener(
																	'load',
																	() => {
																		u(n), c(!1), p(Object(y.b)(e.size))
																	},
																	{ passive: !0 }
																),
																	(n.src = window.URL.createObjectURL(e))
															}
														}
													})
												},
											},
											'render'
										),
										(n || d) &&
											a.createElement(
												'div',
												{
													onClick: () =>
														(function () {
															if (n || d) {
																const t = 'image/jpeg' === i.type ? 'jpg' : 'image/svg+xml' === i.type ? 'svg' : 'png'
																D(e.name + '.' + t, n || d, i.type)
															}
														})(),
												},
												'download'
											)
									)
								),
								a.createElement(
									'div',
									{ style: { padding: `${s.a.ms(0)} ${s.a.ms(-1)} 0` } },
									a.createElement(Gt, {
										enableMoveTime: !0,
										sequence_start: e.sequence.start,
										sequence_end: e.sequence.end,
										current_time: i.time,
										onChange: e => o(Object.assign(Object.assign({}, i), { time: e })),
										steps: 8,
									})
								),
								a.createElement('div', { onClick: t }, 'Close')
							)
						)
					})
				),
				Pa = function (e, t, n, a) {
					return new (n || (n = Promise))(function (r, i) {
						function o(e) {
							try {
								l(a.next(e))
							} catch (e) {
								i(e)
							}
						}
						function s(e) {
							try {
								l(a.throw(e))
							} catch (e) {
								i(e)
							}
						}
						function l(e) {
							var t
							e.done
								? r(e.value)
								: ((t = e.value),
								  t instanceof n
										? t
										: new n(function (e) {
												e(t)
										  })).then(o, s)
						}
						l((a = a.apply(e, t || [])).next())
					})
				}
			const Ra = {
					estimated_time: 0,
					forPart: 0,
					total_frames: 0,
					total_parts: 0,
					start_time: 0,
					remaining_time: 0,
					current_frame: 0,
					progress_percentage: 0,
				},
				Ta = [256, 512, 1080, 1024, 2048, 4096, 8192].map(e => ({ key: e, value: e }))
			var Ba = a.memo(
				Object(i.b)(e => ({ project: e.project }))(({ project: e, closeModal: t }) => {
					const [n, r] = a.useState(!1),
						[i, o] = a.useState(!1),
						[s, l] = a.useState(Ra),
						[c, d] = a.useState({ index: 0, samples: [] }),
						[u, m] = a.useState({ size: 1080, quality: 1, time: 0, type: 'image/jpeg', noBackground: !1 }),
						[p, h] = a.useState(null)
					function g(e) {
						const t = c.samples.length
						let n = e
						if (t > 0) {
							let e = 0
							for (let n = 0; n < t; n++) e += c.samples[n]
							n = Math.round(e / t)
						}
						return (c.samples[c.index] = Math.round(e)), (c.index = (c.index + 1) % 100), d(Object.assign({}, c)), n
					}
					function v(t) {
						p &&
							p.length > 0 &&
							p.length >= t &&
							D(
								`${e.name && e.name.length > 0 ? e.name : M.a.empty_project_name}_part_${t + 1}`,
								p[t],
								'application/zip'
							)
					}
					function f() {
						return Pa(this, void 0, void 0, function* () {
							console.log('stop'), o(!0), yield E.ask('render-stop'), r(!1), o(!1)
						})
					}
					return (
						a.useEffect(() => {
							function t(e) {
								const t = e
								l(
									Object.assign(Object.assign({}, t), {
										start_time: Object(y.f)(),
										remaining_time: t.estimated_time,
										current_frame: 0,
										progress_percentage: 0,
									})
								)
							}
							function n(t) {
								const n = t,
									a = Math.round(((100 * ++n.frame) / s.total_frames) * 100) / 100
								;(document.title = a + '% ' + e.name),
									l(
										Object.assign(Object.assign({}, s), {
											remaining_time: g(n.render_time) * s.total_frames - (Object(y.f)() - s.start_time),
											current_frame: n.frame + 1,
											progress_percentage: a,
										})
									)
							}
							return (
								E.attach('renderer:start', t),
								E.attach('renderer:render-frame', n),
								() => {
									E.detach('renderer:start', t), E.detach('renderer:render-frame', n)
								}
							)
						}, [s, c, n]),
						a.createElement(
							'div',
							null,
							i && a.createElement('div', null, 'wait stop...'),
							a.createElement(Pt.a, {
								value: u.size,
								placeholder: 'Size',
								options: Ta,
								onChange: e => m(Object.assign(Object.assign({}, u), { size: e })),
							}),
							a.createElement(
								'button',
								{
									onClick: function () {
										return Pa(this, void 0, void 0, function* () {
											r(!0)
											const t = yield E.ask('render-animation', { settings: u, project: ja.a.export(e) })
											h(t), r(!1)
										})
									},
									disabled: n,
								},
								'render'
							),
							a.createElement('button', { onClick: f, disabled: !n }, 'stop'),
							a.createElement(
								'div',
								null,
								'frame: ',
								s.current_frame,
								' su ',
								s.total_frames,
								a.createElement('br', null),
								'part: ',
								s.total_parts,
								a.createElement('br', null),
								'rem: ',
								s.remaining_time <= 0 ? 0 : Math.floor(s.remaining_time / 1e3),
								's',
								a.createElement('br', null),
								'prog: ',
								s.progress_percentage,
								'%',
								a.createElement('br', null)
							),
							p &&
								a.createElement(
									'div',
									null,
									p.map((e, t) =>
										a.createElement(
											'div',
											{ key: t, onClick: () => v(t) },
											'zip_part_',
											t + 1,
											' - ',
											Object(y.b)(e.size)
										)
									),
									a.createElement(
										'div',
										{
											onClick: function () {
												if (p && p.length > 0) for (let e = 0; e < p.length; e++) v(e)
											},
										},
										'download all'
									)
								),
							a.createElement(
								'div',
								{
									onClick: function () {
										return Pa(this, void 0, void 0, function* () {
											yield f(), (document.title = M.a.getDocumentProjectTitle(e.name)), t()
										})
									},
								},
								'Close'
							)
						)
					)
				})
			)
			var Ia = a.memo(
				({ svg: e, closeModal: t }) => (
					a.useEffect(() => {
						E.run('create-from-buffer', { buffers: ie.toBuffers(e) }).then(t)
					}, []),
					a.createElement('div', null, 'import svg')
				)
			)
			const Ha = { rows: 3, flow: `${s.a.ms(2)} auto ${s.a.ms(1)}`, style: { height: '100vh' }, component: 'section' }
			t.default = a.memo(
				Object(i.b)(
					e => ({
						bSplashScreen: e.app.bSplashScreen,
						modal: e.app.opened_modal,
						modal_props: e.app.opened_modal_props,
					}),
					e => ({ closeModal: () => e(Object(l.d)(void 0)) })
				)(({ bSplashScreen: e, modal: t, modal_props: n, closeModal: r }) =>
					a.createElement(
						a.Fragment,
						null,
						a.createElement(
							Se,
							Object.assign({}, Ha),
							a.createElement(de, null),
							a.createElement(va, null),
							a.createElement(we, null),
							a.createElement(ke, null)
						),
						e && a.createElement(Ca, null),
						t &&
							a.createElement(
								Zn,
								{ open: !0, close: r, noCloseButton: 'render-animation' == t || 'render-image' == t },
								(function (e) {
									switch (e) {
										case 'render-image':
											return a.createElement(La, Object.assign({}, n, { closeModal: r }))
										case 'render-animation':
											return a.createElement(Ba, Object.assign({}, n, { closeModal: r }))
										case 'import-svg':
											return a.createElement(Ia, Object.assign({}, n, { closeModal: r }))
									}
								})(t)
							)
					)
				)
			)
		},
	},
])
