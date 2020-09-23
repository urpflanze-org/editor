/*! For license information please see 5.chunk.js.LICENSE.txt */
;(window.webpackJsonp = window.webpackJsonp || []).push([
	[5],
	{
		122: function (t, e, r) {
			'use strict'
			r.d(e, 'a', function () {
				return n
			})
			const n = () => (performance && performance.now ? performance.now() : Date.now())
		},
		165: function (t, e, r) {
			'use strict'
			var n = r(85)
			class i extends n.a {
				constructor() {
					super(),
						(this.sequence = { start: 0, end: 6e4, durate: 6e4, framerate: 60, frames: 3600 }),
						(this.fps = this.sequence.framerate),
						(this.fps_samples_size = 30),
						(this.fps_samples = []),
						(this.fps_samples_index = 0),
						(this.b_sequence_started = !1),
						(this.current_frame = -1),
						(this.last_tick = 0),
						this.calculateTickAndSequence()
				}
				getSequence() {
					return Object.assign({}, this.sequence)
				}
				setSequence(t, e, r) {
					;(this.sequence.start = t),
						(this.sequence.end = e),
						(this.sequence.framerate = r),
						this.calculateTickAndSequence(),
						this.dispatch('timeline:update_sequence', this.getSequence())
				}
				getFramerate() {
					return this.sequence.framerate
				}
				setFramerate(t) {
					;(this.sequence.framerate = t),
						this.calculateTickAndSequence(),
						this.dispatch('timeline:update_sequence', this.getSequence())
				}
				calculateTickAndSequence() {
					;(this.tick_time = 1e3 / this.sequence.framerate),
						(this.sequence.frames = Math.floor(
							((this.sequence.end - this.sequence.start) / 1e3) * this.sequence.framerate
						)),
						(this.sequence.durate = this.sequence.end - this.sequence.start)
				}
				getSequenceStartTime() {
					return this.sequence.start
				}
				setSequenceStartTime(t) {
					;(this.sequence.start = t),
						this.calculateTickAndSequence(),
						this.dispatch('timeline:update_sequence', this.getSequence())
				}
				getSequenceEndTime() {
					return this.sequence.end
				}
				setSequenceEndTime(t) {
					;(this.sequence.end = t),
						this.calculateTickAndSequence(),
						this.dispatch('timeline:update_sequence', this.getSequence())
				}
				getSequenceDuration() {
					return this.sequence.end - this.sequence.start
				}
				getFramesCount() {
					return this.sequence.frames
				}
				start() {
					this.b_sequence_started ||
						((this.b_sequence_started = !0), (this.last_tick = 0), this.dispatch('timeline:change_status', i.START))
				}
				pause() {
					this.b_sequence_started && ((this.b_sequence_started = !1), this.dispatch('timeline:change_status', i.PAUSE))
				}
				stop() {
					;(1 != this.current_frame || this.b_sequence_started) &&
						((this.b_sequence_started = !1),
						(this.current_frame = -1),
						(this.last_tick = 0),
						this.dispatch('timeline:progress', { current_frame: this.current_frame, current_time: 0, fps: this.fps }),
						this.dispatch('timeline:change_status', i.STOP))
				}
				tick(t) {
					if (this.b_sequence_started) {
						const e = t,
							r = e - this.last_tick
						if (r >= this.tick_time) {
							const t = (e - this.last_tick) / 1e3
							return (
								this.calculateFPS(1 / t),
								(this.last_tick = e - (r % this.tick_time)),
								(this.current_frame = (this.current_frame + 1) % this.sequence.frames),
								this.dispatch('timeline:progress', {
									current_frame: this.current_frame,
									current_time: this.getTime(),
									fps: this.fps,
								}),
								!0
							)
						}
					}
					return !1
				}
				calculateFPS(t) {
					const e = this.fps_samples.length
					if (e > 0) {
						let t = 0
						for (let r = 0; r < e; r++) t += this.fps_samples[r]
						this.fps = Math.round(t / e)
					}
					;(this.fps_samples[this.fps_samples_index] = Math.round(t)),
						(this.fps_samples_index = (this.fps_samples_index + 1) % this.fps_samples_size)
				}
				bSequenceStarted() {
					return this.b_sequence_started
				}
				getCurrentFrame() {
					return this.current_frame
				}
				getFrameTime(t) {
					return (
						(t = t < 0 ? this.sequence.frames - (t % this.sequence.frames) : t % this.sequence.frames),
						(this.sequence.start + t * this.tick_time) % this.sequence.end
					)
				}
				getFrameAtTime(t) {
					return Math.floor(((this.sequence.start + t) % this.sequence.end) / this.tick_time)
				}
				setFrame(t) {
					this.current_frame = t - 1
				}
				getTickTime() {
					return this.tick_time
				}
				getTime() {
					return (this.sequence.start + this.current_frame * this.tick_time) % this.sequence.end
				}
				setTime(t) {
					;(t = t < this.sequence.start ? this.sequence.start : t > this.sequence.end ? this.sequence.end : t),
						(this.current_frame = Math.floor(t / this.tick_time) - 1),
						this.dispatch('timeline:progress', { current_frame: this.current_frame, current_time: t, fps: this.fps })
				}
			}
			;(i.START = 'start'), (i.PAUSE = 'pause'), (i.STOP = 'stop'), (e.a = i)
		},
		167: function (t, e, r) {
			'use strict'
			Object.defineProperty(e, '__esModule', { value: !0 }), (e.setErrorCallback = void 0)
			var n,
				i = (function () {
					function t(t, e) {
						for (var r = 0; r < e.length; r++) {
							var n = e[r]
							;(n.enumerable = n.enumerable || !1),
								(n.configurable = !0),
								'value' in n && (n.writable = !0),
								Object.defineProperty(t, n.key, n)
						}
					}
					return function (e, r, n) {
						return r && t(e.prototype, r), n && t(e, n), e
					}
				})(),
				s = r(398),
				o = (n = s) && n.__esModule ? n : { default: n }
			function a(t) {
				if (Array.isArray(t)) {
					for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e]
					return r
				}
				return Array.from(t)
			}
			function l(t, e) {
				if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function')
			}
			var u = void 0
			e.setErrorCallback = function (t) {
				u = t
			}
			o.default.Error = function (t) {
				u && u(t)
			}
			var h = new o.default.Clipper(),
				f = new o.default.ClipperOffset(),
				p = (function () {
					function t() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
							r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
							n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
							i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
							s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4]
						l(this, t),
							(this.paths = e),
							n && (this.paths = this.paths.map(m)),
							i && (this.paths = this.paths.map(v)),
							s && (this.paths = this.paths.map(_)),
							(this.closed = r)
					}
					return (
						i(t, [
							{
								key: '_clip',
								value: function (e) {
									var r = new o.default.PolyTree()
									h.Clear(), h.AddPaths(this.paths, o.default.PolyType.ptSubject, this.closed)
									for (var n = arguments.length, i = Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++)
										i[s - 1] = arguments[s]
									for (var a = 0; a < i.length; a++) {
										var l = i[a]
										h.AddPaths(l.paths, o.default.PolyType.ptClip, l.closed)
									}
									h.Execute(e, r)
									var u = o.default.Clipper.PolyTreeToPaths(r)
									return new t(u, this.closed)
								},
							},
							{
								key: 'union',
								value: function () {
									for (var t = arguments.length, e = Array(t), r = 0; r < t; r++) e[r] = arguments[r]
									return this._clip.apply(this, [o.default.ClipType.ctUnion].concat(e))
								},
							},
							{
								key: 'difference',
								value: function () {
									for (var t = arguments.length, e = Array(t), r = 0; r < t; r++) e[r] = arguments[r]
									return this._clip.apply(this, [o.default.ClipType.ctDifference].concat(e))
								},
							},
							{
								key: 'intersect',
								value: function () {
									for (var t = arguments.length, e = Array(t), r = 0; r < t; r++) e[r] = arguments[r]
									return this._clip.apply(this, [o.default.ClipType.ctIntersection].concat(e))
								},
							},
							{
								key: 'xor',
								value: function () {
									for (var t = arguments.length, e = Array(t), r = 0; r < t; r++) e[r] = arguments[r]
									return this._clip.apply(this, [o.default.ClipType.ctXor].concat(e))
								},
							},
							{
								key: 'offset',
								value: function (e) {
									var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
										n = r.jointType,
										i = void 0 === n ? 'jtSquare' : n,
										s = r.endType,
										a = void 0 === s ? 'etClosedPolygon' : s,
										l = r.miterLimit,
										u = void 0 === l ? 2 : l,
										h = r.roundPrecision,
										p = void 0 === h ? 0.25 : h
									f.Clear(), (f.ArcTolerance = p), (f.MiterLimit = u)
									var c = new o.default.Paths()
									return (
										f.AddPaths(this.paths, o.default.JoinType[i], o.default.EndType[a]), f.Execute(c, e), new t(c, !0)
									)
								},
							},
							{
								key: 'scaleUp',
								value: function (t) {
									return o.default.JS.ScaleUpPaths(this.paths, t), this
								},
							},
							{
								key: 'scaleDown',
								value: function (t) {
									return o.default.JS.ScaleDownPaths(this.paths, t), this
								},
							},
							{
								key: 'firstPoint',
								value: function () {
									var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
									if (0 !== this.paths.length) {
										var e = this.paths[0],
											r = e[0]
										return t ? d(r) : r
									}
								},
							},
							{
								key: 'lastPoint',
								value: function () {
									var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
									if (0 !== this.paths.length) {
										var e = this.paths[this.paths.length - 1],
											r = this.closed ? e[0] : e[e.length - 1]
										return t ? d(r) : r
									}
								},
							},
							{
								key: 'areas',
								value: function () {
									var t = this,
										e = this.paths.map(function (e, r) {
											return t.area(r)
										})
									return e
								},
							},
							{
								key: 'area',
								value: function (t) {
									var e = this.paths[t],
										r = o.default.Clipper.Area(e)
									return r
								},
							},
							{
								key: 'totalArea',
								value: function () {
									return this.areas().reduce(function (t, e) {
										return t + e
									}, 0)
								},
							},
							{
								key: 'perimeter',
								value: function (t) {
									var e = this.paths[t],
										r = o.default.JS.PerimeterOfPath(e, this.closed, 1)
									return r
								},
							},
							{
								key: 'perimeters',
								value: function () {
									var t = this
									return this.paths.map(function (e) {
										return o.default.JS.PerimeterOfPath(e, t.closed, 1)
									})
								},
							},
							{
								key: 'totalPerimeter',
								value: function () {
									return o.default.JS.PerimeterOfPaths(this.paths, this.closed)
								},
							},
							{
								key: 'reverse',
								value: function () {
									return o.default.Clipper.ReversePaths(this.paths), this
								},
							},
							{
								key: 'thresholdArea',
								value: function (t) {
									for (var e = [].concat(a(this.paths)), r = 0; r < e.length; r++) {
										var n = e[r]
										if (Math.abs(o.default.Clipper.Area(n)) < t) {
											var i = this.paths.indexOf(n)
											this.paths.splice(i, 1)
										}
									}
									return this
								},
							},
							{
								key: 'join',
								value: function (t) {
									var e
									return (e = this.paths).splice.apply(e, [this.paths.length, 0].concat(a(t.paths))), this
								},
							},
							{
								key: 'clone',
								value: function () {
									return new t(o.default.JS.Clone(this.paths), this.closed)
								},
							},
							{
								key: 'shapeBounds',
								value: function () {
									return o.default.JS.BoundsOfPaths(this.paths)
								},
							},
							{
								key: 'pathBounds',
								value: function (t) {
									var e = this.paths[t]
									return o.default.JS.BoundsOfPath(e)
								},
							},
							{
								key: 'clean',
								value: function (e) {
									return new t(o.default.Clipper.CleanPolygons(this.paths, e), this.closed)
								},
							},
							{
								key: 'orientation',
								value: function (t) {
									var e = this.paths[t]
									return o.default.Clipper.Orientation(e)
								},
							},
							{
								key: 'pointInShape',
								value: function (t) {
									var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
										r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
									e && (t = y(t)), r && (t = g(t))
									for (var n = 0; n < this.paths.length; n++) {
										var i = this.pointInPath(n, t),
											s = this.orientation(n)
										if ((!i && s) || (i && !s)) return !1
									}
									return !0
								},
							},
							{
								key: 'pointInPath',
								value: function (t, e) {
									var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
										n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3]
									r && (e = y(e)), n && (e = g(e))
									var i = this.paths[t],
										s = { X: Math.round(e.X), Y: Math.round(e.Y) }
									return o.default.Clipper.PointInPolygon(s, i) > 0
								},
							},
							{
								key: 'fixOrientation',
								value: function () {
									return this.closed ? (this.totalArea() < 0 && this.reverse(), this) : this
								},
							},
							{
								key: 'simplify',
								value: function (e) {
									return this.closed
										? new t(o.default.Clipper.SimplifyPolygons(this.paths, o.default.PolyFillType[e]), !0)
										: this
								},
							},
							{
								key: 'separateShapes',
								value: function () {
									var e = []
									if (this.closed) {
										for (var r = new WeakMap(), n = [], i = [], s = 0; s < this.paths.length; s++) {
											var o = this.paths[s]
											if (this.orientation(s)) {
												var a = this.area(s)
												r.set(o, a), n.push(o)
											} else i.push(o)
										}
										n.sort(function (t, e) {
											return r.get(t) - r.get(e)
										})
										var l = !0,
											u = !1,
											h = void 0
										try {
											for (var f, p = n[Symbol.iterator](); !(l = (f = p.next()).done); l = !0) {
												for (
													var c = f.value, d = [c], m = this.paths.indexOf(c), y = [].concat(i), v = 0;
													v < y.length;
													v++
												) {
													var g = y[v]
													if (this.pointInPath(m, g[0])) {
														d.push(g)
														var _ = i.indexOf(g)
														i.splice(_, 1)
													}
												}
												e.push(new t(d, !0))
											}
										} catch (t) {
											;(u = !0), (h = t)
										} finally {
											try {
												!l && p.return && p.return()
											} finally {
												if (u) throw h
											}
										}
									} else {
										var x = !0,
											P = !1,
											b = void 0
										try {
											for (var C, w = this.paths[Symbol.iterator](); !(x = (C = w.next()).done); x = !0) {
												var E = C.value
												e.push(new t([E], !1))
											}
										} catch (t) {
											;(P = !0), (b = t)
										} finally {
											try {
												!x && w.return && w.return()
											} finally {
												if (P) throw b
											}
										}
									}
									return e
								},
							},
							{
								key: 'round',
								value: function () {
									return new t(this.paths.map(v), this.closed)
								},
							},
							{
								key: 'removeDuplicates',
								value: function () {
									return new t(this.paths.map(_), this.closed)
								},
							},
							{
								key: 'mapToLower',
								value: function () {
									return this.paths.map(c)
								},
							},
						]),
						t
					)
				})()
			function c(t) {
				return t.map(d)
			}
			function d(t) {
				return { x: t.X, y: t.Y }
			}
			function m(t) {
				return t.map(y)
			}
			function y(t) {
				return { X: t.x, Y: t.y }
			}
			function v(t) {
				return t.map(g)
			}
			function g(t) {
				var e = t.X,
					r = t.Y
				return { X: Math.round(e), Y: Math.round(r) }
			}
			function _(t) {
				return t.filter(x)
			}
			function x(t, e, r) {
				if (0 === e) return !0
				var n = r[e - 1]
				return !(t.X === n.X && t.Y === n.Y)
			}
			e.default = p
		},
		169: function (t, e, r) {
			'use strict'
			function n(t) {
				let e = !1,
					r = !1
				return {
					promise: new Promise((n, i) => {
						t.then(t => {
							;(e = !0), r ? i('canceled') : n(t)
						}).catch(t => {
							;(e = !0), i(r ? 'canceled' : t)
						})
					}),
					resolved: () => e,
					canceled: () => r,
					cancel: () => {
						r = !0
					},
				}
			}
			r.d(e, 'a', function () {
				return n
			})
		},
		381: function (t, e, r) {
			'use strict'
			var n = r(4),
				i = r(122),
				s = r(165)
			class o {
				constructor(t, e, r = {}, n = 0) {
					var i, o, a, l, u, h, f
					if (
						((this.timeline = new s.a()),
						(this.resolution = n || (t && t.width ? t.width : 0)),
						t && this.setScene(t),
						('undefined' != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement) ||
							('undefined' != typeof OffscreenCanvas && e instanceof OffscreenCanvas))
					) {
						const t = e
						this.setCanvas(t)
					} else if (e) {
						const t = document.createElement('canvas')
						e.appendChild(t), this.setCanvas(t)
					}
					;(this.drawOptions = {
						scale: null !== (i = r.scale) && void 0 !== i ? i : 1,
						translate: null !== (o = r.translate) && void 0 !== o ? o : [0, 0],
						time: null !== (a = r.time) && void 0 !== a ? a : 0,
						simmetricLine: null !== (l = r.simmetricLine) && void 0 !== l ? l : 0,
						clearCanvas: null === (u = r.clearCanvas) || void 0 === u || u,
						fixedLineWidth: null !== (h = r.fixedLineWidth) && void 0 !== h && h,
						noBackground: null !== (f = r.noBackground) && void 0 !== f && f,
						ghosts: r.ghosts || 0,
						ghost_skip_time: r.ghost_skip_time || 0,
						ghost_skip_function: r.ghost_skip_function,
						backgroundImage: r.backgroundImage,
					}),
						(this.draw_id = null),
						(this.redraw_id = null),
						(this.animation_id = null),
						(this.animate = this.animate.bind(this))
				}
				setScene(t) {
					;(this.scene = t),
						!this.resolution && this.scene.width && (this.resolution = this.scene.width),
						this.canvas && this.setCanvas(this.canvas)
				}
				getScene() {
					return this.scene
				}
				getTimeline() {
					return this.timeline
				}
				setCanvas(t) {
					let e
					if ('undefined' != typeof HTMLElement && t instanceof HTMLElement)
						if ('undefined' != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement) e = t
						else {
							for (e = this.canvas || document.createElement('canvas'); t.lastChild; ) t.removeChild(t.lastChild)
							t.appendChild(e)
						}
					else e = t
					if (
						((this.canvas = e),
						(this.context = this.canvas.getContext('2d', { alpha: !0, desynchronized: !0 })),
						this.scene)
					) {
						const t = this.scene.width,
							e = this.scene.height,
							r = 1
						;(this.canvas.width = t * r),
							(this.canvas.height = e * r),
							'undefined' != typeof HTMLCanvasElement &&
								this.canvas instanceof HTMLCanvasElement &&
								((this.canvas.style.width = t + 'px'), (this.canvas.style.height = e + 'px'))
					}
				}
				getCanvas() {
					return this.canvas
				}
				resize(t, e) {
					this.scene && this.scene.resize(t, e),
						!this.resolution && this.scene.width && (this.resolution = this.scene.width),
						this.canvas &&
							((this.canvas.width = 1 * t),
							(this.canvas.height = 1 * e),
							'undefined' != typeof HTMLCanvasElement &&
								this.canvas instanceof HTMLCanvasElement &&
								((this.canvas.style.width = t + 'px'), (this.canvas.style.height = e + 'px')))
				}
				setRatio(t) {
					if (this.scene) {
						const e = t >= 1 ? this.scene.width : this.scene.width * t,
							r = t >= 1 ? this.scene.height / t : this.scene.height
						this.resize(e, r)
					}
				}
				getResolution() {
					return this.resolution
				}
				setResolution(t) {
					this.resolution = t
				}
				getValueFromResolution(t) {
					return (t * this.resolution) / 200
				}
				getValueFromResolutionScaled(t) {
					return (200 * t) / this.resolution
				}
				setOption(t, e) {
					if ('object' == typeof t) {
						const e = Object.keys(t)
						for (let r = 0, n = e.length; r < n; r++) this.drawOptions[e[r]] = t[e[r]]
					} else this.drawOptions[t] = e
				}
				getOption(t, e) {
					var r
					return null !== (r = this.drawOptions[t]) && void 0 !== r ? r : e
				}
				getOptions() {
					return this.drawOptions
				}
				animate(t) {
					this.timeline.bSequenceStarted() &&
						((this.animation_id = requestAnimationFrame(this.animate)), this.timeline.tick(t) && this.draw())
				}
				startAnimation() {
					this.stopAnimation(), this.timeline.start(), (this.animation_id = requestAnimationFrame(this.animate))
				}
				stopAnimation() {
					this.timeline.stop(), this.animation_id && cancelAnimationFrame(this.animation_id)
				}
				pauseAnimation() {
					this.timeline.pause(), this.animation_id && cancelAnimationFrame(this.animation_id)
				}
				playAnimation() {
					this.timeline.start(), requestAnimationFrame(this.animate)
				}
				draw() {
					const t = Object.assign({}, this.drawOptions)
					if (t.ghosts) {
						let e = 0
						const r = this.timeline.getTime(),
							n = this.timeline.getSequenceEndTime()
						for (let i = 1; i <= t.ghosts; i++) {
							const s = r - (t.ghost_skip_function ? t.ghost_skip_function(i) : i * (t.ghost_skip_time || 30))
							;(t.clearCanvas = 1 == i),
								(t.ghost_index = i),
								(t.time = s < 0 ? s + n : s > n ? s % n : s),
								(e += o.draw(this.scene, this.context, t, this.resolution))
						}
						return (
							(t.clearCanvas = !1),
							(t.ghost_index = void 0),
							(t.time = this.timeline.getTime()),
							(e += o.draw(this.scene, this.context, t, this.resolution)),
							e
						)
					}
					return (
						(t.time = this.timeline.getTime()),
						(t.clearCanvas = this.drawOptions.clearCanvas || this.timeline.getCurrentFrame() <= 0),
						o.draw(this.scene, this.context, t, this.resolution)
					)
				}
				redraw() {
					this.timeline.bSequenceStarted()
						? this.drawOptions.clearCanvas ||
						  (null != typeof this.drawOptions.ghosts && 0 != this.drawOptions.ghosts) ||
						  (this.stopAnimation(),
						  this.redraw_id && clearTimeout(this.redraw_id),
						  (this.redraw_id = setTimeout(() => this.startAnimation(), 100)))
						: (this.draw_id && cancelAnimationFrame(this.draw_id),
						  !this.drawOptions.clearCanvas &&
								(null == typeof this.drawOptions.ghosts || 0 == this.drawOptions.ghosts) &&
								this.timeline.stop(),
						  (this.draw_id = requestAnimationFrame(() => {
								this.draw()
						  })))
				}
				static draw(t, e, r, s) {
					var o, a, l, u
					const h = Object(i.a)()
					if (e) {
						const i = null !== (o = r.scale) && void 0 !== o ? o : 1,
							h = null !== (a = r.translate) && void 0 !== a ? a : [0, 0],
							f = null !== (l = r.time) && void 0 !== l ? l : 0,
							p = null !== (u = r.simmetricLine) && void 0 !== u ? u : 0,
							c = r.fixedLineWidth,
							d = r.clearCanvas,
							m = r.noBackground,
							y = r.backgroundImage,
							v = void 0 !== r.ghosts && r.ghosts > 0 && void 0 !== r.ghost_index && r.ghost_index > 0,
							g = v ? 1 - r.ghost_index / (r.ghosts + 0.5) : 1,
							_ = t.width,
							x = t.height,
							P = [(_ / ((s = s || _) / (_ > x ? 1 : x / _))) * i, (x / (s / (_ > x ? _ / x : 1))) * i],
							b = [
								_ / 2 - (i > 1 ? (h[0] * _) / (1 / ((i - 1) / 2)) : 0),
								x / 2 - (i > 1 ? (h[1] * x) / (1 / ((i - 1) / 2)) : 0),
							]
						if (
							((t.current_time = f),
							t.getChildren().forEach(t => {
								var e, r
								!1 === (null === (e = null == t ? void 0 : t.data) || void 0 === e ? void 0 : e.visible) ||
									(v &&
										!0 === (null === (r = null == t ? void 0 : t.data) || void 0 === r ? void 0 : r.disableGhost)) ||
									t.generate(f, !0)
							}),
							d &&
								(m
									? e.clearRect(0, 0, _, x)
									: ((e.fillStyle = t.background), e.fillRect(0, 0, _, x), y && e.drawImage(y, 0, 0, _, x))),
							p > 0)
						) {
							const r = Math.PI / p,
								i = Math.max(_, x) / 2,
								s = [i / 2, i / 2]
							for (let o = 0; o < p; o++) {
								const a = Float32Array.from([-i, -i]),
									l = Float32Array.from([2 * i, 2 * i]),
									u = o * r + Math.PI / 4
								n.a.rotateZ(a, s, u),
									n.a.rotateZ(l, s, u),
									e.beginPath(),
									(e.strokeStyle = t.mainColor),
									(e.lineWidth = 1),
									e.moveTo((a[0] - i / 2) * P[0] + b[0], (a[1] - i / 2) * P[1] + b[1]),
									e.lineTo((l[0] - i / 2) * P[0] + b[0], (l[1] - i / 2) * P[1] + b[1]),
									e.stroke()
							}
						}
						t.draw(
							({
								lineWidth: r,
								strokeColor: n,
								fillColor: s,
								shape: o,
								buffer: a,
								buffer_length: l,
								current_buffer_index: u,
							}) => {
								var h, f
								if (
									!(
										0 == (null === (h = null == o ? void 0 : o.data) || void 0 === h ? void 0 : h.visible) ||
										(v && 1 == (null === (f = null == o ? void 0 : o.data) || void 0 === f ? void 0 : f.disableGhost))
									)
								) {
									e.beginPath(), e.moveTo((a[u] - _ / 2) * P[0] + b[0], (a[u + 1] - x / 2) * P[1] + b[1])
									for (let t = 2; t < l; t += 2)
										e.lineTo((a[u + t] - _ / 2) * P[0] + b[0], (a[u + t + 1] - x / 2) * P[1] + b[1])
									if ((o && o.isClosed() && e.closePath(), o && o.data && o.data.highlighted))
										return (e.lineWidth = 3 * (r || 1) * i), (e.strokeStyle = t.mainColor), void e.stroke()
									if (s) {
										if (v) {
											const t = /\((.+),(.+),(.+),(.+)\)/g.exec(s)
											if (t) {
												let [, e, r, n, i] = t
												const o = i ? parseFloat(i) : 1,
													a = o <= 0 ? 0 : o * g
												s = s.indexOf('rgb') >= 0 ? `rgba(${e},${r},${n},${a})` : `hsla(${e},${r},${n},${a})`
											}
										}
										;(e.fillStyle = s), e.fill()
									}
									if (n && r) {
										if (v) {
											const t = /\((.+),(.+),(.+),(.+)\)/g.exec(n)
											if (t) {
												let [, e, r, i, s] = t
												const o = s ? parseFloat(s) : 1,
													a = o <= 0 ? 0 : o * g
												n = n.indexOf('rgb') >= 0 ? `rgba(${e},${r},${i},${a})` : `hsla(${e},${r},${i},${a})`
											}
											r *= g
										}
										;(e.lineWidth = c ? r : r * i), (e.strokeStyle = n), e.stroke()
									}
								}
							}
						)
					}
					return Object(i.a)() - h
				}
			}
			e.a = o
		},
		383: function (t, e, r) {
			;(function (e, r, n) {
				t.exports = (function t(e, r, n) {
					function i(o, a) {
						if (!r[o]) {
							if (!e[o]) {
								if (s) return s(o, !0)
								var l = new Error("Cannot find module '" + o + "'")
								throw ((l.code = 'MODULE_NOT_FOUND'), l)
							}
							var u = (r[o] = { exports: {} })
							e[o][0].call(
								u.exports,
								function (t) {
									return i(e[o][1][t] || t)
								},
								u,
								u.exports,
								t,
								e,
								r,
								n
							)
						}
						return r[o].exports
					}
					for (var s = !1, o = 0; o < n.length; o++) i(n[o])
					return i
				})(
					{
						1: [
							function (t, e, r) {
								'use strict'
								var n = t('./utils'),
									i = t('./support'),
									s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
								;(r.encode = function (t) {
									for (
										var e, r, i, o, a, l, u, h = [], f = 0, p = t.length, c = p, d = 'string' !== n.getTypeOf(t);
										f < t.length;

									)
										(c = p - f),
											(i = d
												? ((e = t[f++]), (r = f < p ? t[f++] : 0), f < p ? t[f++] : 0)
												: ((e = t.charCodeAt(f++)),
												  (r = f < p ? t.charCodeAt(f++) : 0),
												  f < p ? t.charCodeAt(f++) : 0)),
											(o = e >> 2),
											(a = ((3 & e) << 4) | (r >> 4)),
											(l = 1 < c ? ((15 & r) << 2) | (i >> 6) : 64),
											(u = 2 < c ? 63 & i : 64),
											h.push(s.charAt(o) + s.charAt(a) + s.charAt(l) + s.charAt(u))
									return h.join('')
								}),
									(r.decode = function (t) {
										var e,
											r,
											n,
											o,
											a,
											l,
											u = 0,
											h = 0,
											f = 'data:'
										if (t.substr(0, f.length) === f) throw new Error('Invalid base64 input, it looks like a data url.')
										var p,
											c = (3 * (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, '')).length) / 4
										if (
											(t.charAt(t.length - 1) === s.charAt(64) && c--,
											t.charAt(t.length - 2) === s.charAt(64) && c--,
											c % 1 != 0)
										)
											throw new Error('Invalid base64 input, bad content length.')
										for (p = i.uint8array ? new Uint8Array(0 | c) : new Array(0 | c); u < t.length; )
											(e = (s.indexOf(t.charAt(u++)) << 2) | ((o = s.indexOf(t.charAt(u++))) >> 4)),
												(r = ((15 & o) << 4) | ((a = s.indexOf(t.charAt(u++))) >> 2)),
												(n = ((3 & a) << 6) | (l = s.indexOf(t.charAt(u++)))),
												(p[h++] = e),
												64 !== a && (p[h++] = r),
												64 !== l && (p[h++] = n)
										return p
									})
							},
							{ './support': 30, './utils': 32 },
						],
						2: [
							function (t, e, r) {
								'use strict'
								var n = t('./external'),
									i = t('./stream/DataWorker'),
									s = t('./stream/DataLengthProbe'),
									o = t('./stream/Crc32Probe')
								function a(t, e, r, n, i) {
									;(this.compressedSize = t),
										(this.uncompressedSize = e),
										(this.crc32 = r),
										(this.compression = n),
										(this.compressedContent = i)
								}
								;(s = t('./stream/DataLengthProbe')),
									(a.prototype = {
										getContentWorker: function () {
											var t = new i(n.Promise.resolve(this.compressedContent))
													.pipe(this.compression.uncompressWorker())
													.pipe(new s('data_length')),
												e = this
											return (
												t.on('end', function () {
													if (this.streamInfo.data_length !== e.uncompressedSize)
														throw new Error('Bug : uncompressed data size mismatch')
												}),
												t
											)
										},
										getCompressedWorker: function () {
											return new i(n.Promise.resolve(this.compressedContent))
												.withStreamInfo('compressedSize', this.compressedSize)
												.withStreamInfo('uncompressedSize', this.uncompressedSize)
												.withStreamInfo('crc32', this.crc32)
												.withStreamInfo('compression', this.compression)
										},
									}),
									(a.createWorkerFrom = function (t, e, r) {
										return t
											.pipe(new o())
											.pipe(new s('uncompressedSize'))
											.pipe(e.compressWorker(r))
											.pipe(new s('compressedSize'))
											.withStreamInfo('compression', e)
									}),
									(e.exports = a)
							},
							{ './external': 6, './stream/Crc32Probe': 25, './stream/DataLengthProbe': 26, './stream/DataWorker': 27 },
						],
						3: [
							function (t, e, r) {
								'use strict'
								var n = t('./stream/GenericWorker')
								;(r.STORE = {
									magic: '\0\0',
									compressWorker: function (t) {
										return new n('STORE compression')
									},
									uncompressWorker: function () {
										return new n('STORE decompression')
									},
								}),
									(r.DEFLATE = t('./flate'))
							},
							{ './flate': 7, './stream/GenericWorker': 28 },
						],
						4: [
							function (t, e, r) {
								'use strict'
								var n = t('./utils'),
									i = (function () {
										for (var t, e = [], r = 0; r < 256; r++) {
											t = r
											for (var n = 0; n < 8; n++) t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1
											e[r] = t
										}
										return e
									})()
								e.exports = function (t, e) {
									return void 0 !== t && t.length
										? 'string' !== n.getTypeOf(t)
											? (function (t, e, r, n) {
													var s = i,
														o = 0 + r
													t ^= -1
													for (var a = 0; a < o; a++) t = (t >>> 8) ^ s[255 & (t ^ e[a])]
													return -1 ^ t
											  })(0 | e, t, t.length)
											: (function (t, e, r, n) {
													var s = i,
														o = 0 + r
													t ^= -1
													for (var a = 0; a < o; a++) t = (t >>> 8) ^ s[255 & (t ^ e.charCodeAt(a))]
													return -1 ^ t
											  })(0 | e, t, t.length)
										: 0
								}
							},
							{ './utils': 32 },
						],
						5: [
							function (t, e, r) {
								'use strict'
								;(r.base64 = !1),
									(r.binary = !1),
									(r.dir = !1),
									(r.createFolders = !0),
									(r.date = null),
									(r.compression = null),
									(r.compressionOptions = null),
									(r.comment = null),
									(r.unixPermissions = null),
									(r.dosPermissions = null)
							},
							{},
						],
						6: [
							function (t, e, r) {
								'use strict'
								var n
								;(n = 'undefined' != typeof Promise ? Promise : t('lie')), (e.exports = { Promise: n })
							},
							{ lie: 37 },
						],
						7: [
							function (t, e, r) {
								'use strict'
								var n =
										'undefined' != typeof Uint8Array &&
										'undefined' != typeof Uint16Array &&
										'undefined' != typeof Uint32Array,
									i = t('pako'),
									s = t('./utils'),
									o = t('./stream/GenericWorker'),
									a = n ? 'uint8array' : 'array'
								function l(t, e) {
									o.call(this, 'FlateWorker/' + t),
										(this._pako = null),
										(this._pakoAction = t),
										(this._pakoOptions = e),
										(this.meta = {})
								}
								;(r.magic = '\b\0'),
									s.inherits(l, o),
									(l.prototype.processChunk = function (t) {
										;(this.meta = t.meta),
											null === this._pako && this._createPako(),
											this._pako.push(s.transformTo(a, t.data), !1)
									}),
									(l.prototype.flush = function () {
										o.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], !0)
									}),
									(l.prototype.cleanUp = function () {
										o.prototype.cleanUp.call(this), (this._pako = null)
									}),
									(l.prototype._createPako = function () {
										this._pako = new i[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 })
										var t = this
										this._pako.onData = function (e) {
											t.push({ data: e, meta: t.meta })
										}
									}),
									(r.compressWorker = function (t) {
										return new l('Deflate', t)
									}),
									(r.uncompressWorker = function () {
										return new l('Inflate', {})
									})
							},
							{ './stream/GenericWorker': 28, './utils': 32, pako: 38 },
						],
						8: [
							function (t, e, r) {
								'use strict'
								function n(t, e) {
									var r,
										n = ''
									for (r = 0; r < e; r++) (n += String.fromCharCode(255 & t)), (t >>>= 8)
									return n
								}
								function i(t, e, r, i, o, h) {
									var f,
										p,
										c = t.file,
										d = t.compression,
										m = h !== a.utf8encode,
										y = s.transformTo('string', h(c.name)),
										v = s.transformTo('string', a.utf8encode(c.name)),
										g = c.comment,
										_ = s.transformTo('string', h(g)),
										x = s.transformTo('string', a.utf8encode(g)),
										P = v.length !== c.name.length,
										b = x.length !== g.length,
										C = '',
										w = '',
										E = '',
										I = c.dir,
										A = c.date,
										S = { crc32: 0, compressedSize: 0, uncompressedSize: 0 }
									;(e && !r) ||
										((S.crc32 = t.crc32),
										(S.compressedSize = t.compressedSize),
										(S.uncompressedSize = t.uncompressedSize))
									var T = 0
									e && (T |= 8), m || (!P && !b) || (T |= 2048)
									var k = 0,
										O = 0
									I && (k |= 16),
										'UNIX' === o
											? ((O = 798),
											  (k |= (function (t, e) {
													var r = t
													return t || (r = e ? 16893 : 33204), (65535 & r) << 16
											  })(c.unixPermissions, I)))
											: ((O = 20),
											  (k |= (function (t) {
													return 63 & (t || 0)
											  })(c.dosPermissions))),
										(f = A.getUTCHours()),
										(f <<= 6),
										(f |= A.getUTCMinutes()),
										(f <<= 5),
										(f |= A.getUTCSeconds() / 2),
										(p = A.getUTCFullYear() - 1980),
										(p <<= 4),
										(p |= A.getUTCMonth() + 1),
										(p <<= 5),
										(p |= A.getUTCDate()),
										P && ((w = n(1, 1) + n(l(y), 4) + v), (C += 'up' + n(w.length, 2) + w)),
										b && ((E = n(1, 1) + n(l(_), 4) + x), (C += 'uc' + n(E.length, 2) + E))
									var L = ''
									return (
										(L += '\n\0'),
										(L += n(T, 2)),
										(L += d.magic),
										(L += n(f, 2)),
										(L += n(p, 2)),
										(L += n(S.crc32, 4)),
										(L += n(S.compressedSize, 4)),
										(L += n(S.uncompressedSize, 4)),
										(L += n(y.length, 2)),
										(L += n(C.length, 2)),
										{
											fileRecord: u.LOCAL_FILE_HEADER + L + y + C,
											dirRecord:
												u.CENTRAL_FILE_HEADER +
												n(O, 2) +
												L +
												n(_.length, 2) +
												'\0\0\0\0' +
												n(k, 4) +
												n(i, 4) +
												y +
												C +
												_,
										}
									)
								}
								var s = t('../utils'),
									o = t('../stream/GenericWorker'),
									a = t('../utf8'),
									l = t('../crc32'),
									u = t('../signature')
								function h(t, e, r, n) {
									o.call(this, 'ZipFileWorker'),
										(this.bytesWritten = 0),
										(this.zipComment = e),
										(this.zipPlatform = r),
										(this.encodeFileName = n),
										(this.streamFiles = t),
										(this.accumulate = !1),
										(this.contentBuffer = []),
										(this.dirRecords = []),
										(this.currentSourceOffset = 0),
										(this.entriesCount = 0),
										(this.currentFile = null),
										(this._sources = [])
								}
								s.inherits(h, o),
									(h.prototype.push = function (t) {
										var e = t.meta.percent || 0,
											r = this.entriesCount,
											n = this._sources.length
										this.accumulate
											? this.contentBuffer.push(t)
											: ((this.bytesWritten += t.data.length),
											  o.prototype.push.call(this, {
													data: t.data,
													meta: { currentFile: this.currentFile, percent: r ? (e + 100 * (r - n - 1)) / r : 100 },
											  }))
									}),
									(h.prototype.openedSource = function (t) {
										;(this.currentSourceOffset = this.bytesWritten), (this.currentFile = t.file.name)
										var e = this.streamFiles && !t.file.dir
										if (e) {
											var r = i(t, e, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName)
											this.push({ data: r.fileRecord, meta: { percent: 0 } })
										} else this.accumulate = !0
									}),
									(h.prototype.closedSource = function (t) {
										this.accumulate = !1
										var e = this.streamFiles && !t.file.dir,
											r = i(t, e, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName)
										if ((this.dirRecords.push(r.dirRecord), e))
											this.push({
												data: (function (t) {
													return u.DATA_DESCRIPTOR + n(t.crc32, 4) + n(t.compressedSize, 4) + n(t.uncompressedSize, 4)
												})(t),
												meta: { percent: 100 },
											})
										else
											for (this.push({ data: r.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; )
												this.push(this.contentBuffer.shift())
										this.currentFile = null
									}),
									(h.prototype.flush = function () {
										for (var t = this.bytesWritten, e = 0; e < this.dirRecords.length; e++)
											this.push({ data: this.dirRecords[e], meta: { percent: 100 } })
										var r = this.bytesWritten - t,
											i = (function (t, e, r, i, o) {
												var a = s.transformTo('string', o(i))
												return (
													u.CENTRAL_DIRECTORY_END +
													'\0\0\0\0' +
													n(t, 2) +
													n(t, 2) +
													n(e, 4) +
													n(r, 4) +
													n(a.length, 2) +
													a
												)
											})(this.dirRecords.length, r, t, this.zipComment, this.encodeFileName)
										this.push({ data: i, meta: { percent: 100 } })
									}),
									(h.prototype.prepareNextSource = function () {
										;(this.previous = this._sources.shift()),
											this.openedSource(this.previous.streamInfo),
											this.isPaused ? this.previous.pause() : this.previous.resume()
									}),
									(h.prototype.registerPrevious = function (t) {
										this._sources.push(t)
										var e = this
										return (
											t.on('data', function (t) {
												e.processChunk(t)
											}),
											t.on('end', function () {
												e.closedSource(e.previous.streamInfo), e._sources.length ? e.prepareNextSource() : e.end()
											}),
											t.on('error', function (t) {
												e.error(t)
											}),
											this
										)
									}),
									(h.prototype.resume = function () {
										return (
											!!o.prototype.resume.call(this) &&
											(!this.previous && this._sources.length
												? (this.prepareNextSource(), !0)
												: this.previous || this._sources.length || this.generatedError
												? void 0
												: (this.end(), !0))
										)
									}),
									(h.prototype.error = function (t) {
										var e = this._sources
										if (!o.prototype.error.call(this, t)) return !1
										for (var r = 0; r < e.length; r++)
											try {
												e[r].error(t)
											} catch (t) {}
										return !0
									}),
									(h.prototype.lock = function () {
										o.prototype.lock.call(this)
										for (var t = this._sources, e = 0; e < t.length; e++) t[e].lock()
									}),
									(e.exports = h)
							},
							{ '../crc32': 4, '../signature': 23, '../stream/GenericWorker': 28, '../utf8': 31, '../utils': 32 },
						],
						9: [
							function (t, e, r) {
								'use strict'
								var n = t('../compressions'),
									i = t('./ZipFileWorker')
								r.generateWorker = function (t, e, r) {
									var s = new i(e.streamFiles, r, e.platform, e.encodeFileName),
										o = 0
									try {
										t.forEach(function (t, r) {
											o++
											var i = (function (t, e) {
													var r = t || e,
														i = n[r]
													if (!i) throw new Error(r + ' is not a valid compression method !')
													return i
												})(r.options.compression, e.compression),
												a = r.options.compressionOptions || e.compressionOptions || {},
												l = r.dir,
												u = r.date
											r._compressWorker(i, a)
												.withStreamInfo('file', {
													name: t,
													dir: l,
													date: u,
													comment: r.comment || '',
													unixPermissions: r.unixPermissions,
													dosPermissions: r.dosPermissions,
												})
												.pipe(s)
										}),
											(s.entriesCount = o)
									} catch (t) {
										s.error(t)
									}
									return s
								}
							},
							{ '../compressions': 3, './ZipFileWorker': 8 },
						],
						10: [
							function (t, e, r) {
								'use strict'
								function n() {
									if (!(this instanceof n)) return new n()
									if (arguments.length)
										throw new Error(
											'The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.'
										)
									;(this.files = {}),
										(this.comment = null),
										(this.root = ''),
										(this.clone = function () {
											var t = new n()
											for (var e in this) 'function' != typeof this[e] && (t[e] = this[e])
											return t
										})
								}
								;((n.prototype = t('./object')).loadAsync = t('./load')),
									(n.support = t('./support')),
									(n.defaults = t('./defaults')),
									(n.version = '3.5.0'),
									(n.loadAsync = function (t, e) {
										return new n().loadAsync(t, e)
									}),
									(n.external = t('./external')),
									(e.exports = n)
							},
							{ './defaults': 5, './external': 6, './load': 11, './object': 15, './support': 30 },
						],
						11: [
							function (t, e, r) {
								'use strict'
								var n = t('./utils'),
									i = t('./external'),
									s = t('./utf8'),
									o = ((n = t('./utils')), t('./zipEntries')),
									a = t('./stream/Crc32Probe'),
									l = t('./nodejsUtils')
								function u(t) {
									return new i.Promise(function (e, r) {
										var n = t.decompressed.getContentWorker().pipe(new a())
										n.on('error', function (t) {
											r(t)
										})
											.on('end', function () {
												n.streamInfo.crc32 !== t.decompressed.crc32
													? r(new Error('Corrupted zip : CRC32 mismatch'))
													: e()
											})
											.resume()
									})
								}
								e.exports = function (t, e) {
									var r = this
									return (
										(e = n.extend(e || {}, {
											base64: !1,
											checkCRC32: !1,
											optimizedBinaryString: !1,
											createFolders: !1,
											decodeFileName: s.utf8decode,
										})),
										l.isNode && l.isStream(t)
											? i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."))
											: n
													.prepareContent('the loaded zip file', t, !0, e.optimizedBinaryString, e.base64)
													.then(function (t) {
														var r = new o(e)
														return r.load(t), r
													})
													.then(function (t) {
														var r = [i.Promise.resolve(t)],
															n = t.files
														if (e.checkCRC32) for (var s = 0; s < n.length; s++) r.push(u(n[s]))
														return i.Promise.all(r)
													})
													.then(function (t) {
														for (var n = t.shift(), i = n.files, s = 0; s < i.length; s++) {
															var o = i[s]
															r.file(o.fileNameStr, o.decompressed, {
																binary: !0,
																optimizedBinaryString: !0,
																date: o.date,
																dir: o.dir,
																comment: o.fileCommentStr.length ? o.fileCommentStr : null,
																unixPermissions: o.unixPermissions,
																dosPermissions: o.dosPermissions,
																createFolders: e.createFolders,
															})
														}
														return n.zipComment.length && (r.comment = n.zipComment), r
													})
									)
								}
							},
							{
								'./external': 6,
								'./nodejsUtils': 14,
								'./stream/Crc32Probe': 25,
								'./utf8': 31,
								'./utils': 32,
								'./zipEntries': 33,
							},
						],
						12: [
							function (t, e, r) {
								'use strict'
								var n = t('../utils'),
									i = t('../stream/GenericWorker')
								function s(t, e) {
									i.call(this, 'Nodejs stream input adapter for ' + t), (this._upstreamEnded = !1), this._bindStream(e)
								}
								n.inherits(s, i),
									(s.prototype._bindStream = function (t) {
										var e = this
										;(this._stream = t).pause(),
											t
												.on('data', function (t) {
													e.push({ data: t, meta: { percent: 0 } })
												})
												.on('error', function (t) {
													e.isPaused ? (this.generatedError = t) : e.error(t)
												})
												.on('end', function () {
													e.isPaused ? (e._upstreamEnded = !0) : e.end()
												})
									}),
									(s.prototype.pause = function () {
										return !!i.prototype.pause.call(this) && (this._stream.pause(), !0)
									}),
									(s.prototype.resume = function () {
										return (
											!!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
										)
									}),
									(e.exports = s)
							},
							{ '../stream/GenericWorker': 28, '../utils': 32 },
						],
						13: [
							function (t, e, r) {
								'use strict'
								var n = t('readable-stream').Readable
								function i(t, e, r) {
									n.call(this, e), (this._helper = t)
									var i = this
									t.on('data', function (t, e) {
										i.push(t) || i._helper.pause(), r && r(e)
									})
										.on('error', function (t) {
											i.emit('error', t)
										})
										.on('end', function () {
											i.push(null)
										})
								}
								t('../utils').inherits(i, n),
									(i.prototype._read = function () {
										this._helper.resume()
									}),
									(e.exports = i)
							},
							{ '../utils': 32, 'readable-stream': 16 },
						],
						14: [
							function (t, r, n) {
								'use strict'
								r.exports = {
									isNode: void 0 !== e,
									newBufferFrom: function (t, r) {
										if (e.from && e.from !== Uint8Array.from) return e.from(t, r)
										if ('number' == typeof t) throw new Error('The "data" argument must not be a number')
										return new e(t, r)
									},
									allocBuffer: function (t) {
										if (e.alloc) return e.alloc(t)
										var r = new e(t)
										return r.fill(0), r
									},
									isBuffer: function (t) {
										return e.isBuffer(t)
									},
									isStream: function (t) {
										return (
											t && 'function' == typeof t.on && 'function' == typeof t.pause && 'function' == typeof t.resume
										)
									},
								}
							},
							{},
						],
						15: [
							function (t, e, r) {
								'use strict'
								function n(t, e, r) {
									var n,
										i = s.getTypeOf(e),
										a = s.extend(r || {}, l)
									;(a.date = a.date || new Date()),
										null !== a.compression && (a.compression = a.compression.toUpperCase()),
										'string' == typeof a.unixPermissions && (a.unixPermissions = parseInt(a.unixPermissions, 8)),
										a.unixPermissions && 16384 & a.unixPermissions && (a.dir = !0),
										a.dosPermissions && 16 & a.dosPermissions && (a.dir = !0),
										a.dir && (t = m(t)),
										a.createFolders && (n = d(t)) && y.call(this, n, !0)
									var f,
										v = 'string' === i && !1 === a.binary && !1 === a.base64
									;(r && void 0 !== r.binary) || (a.binary = !v),
										((e instanceof u && 0 === e.uncompressedSize) || a.dir || !e || 0 === e.length) &&
											((a.base64 = !1), (a.binary = !0), (e = ''), (a.compression = 'STORE'), (i = 'string')),
										(f =
											e instanceof u || e instanceof o
												? e
												: p.isNode && p.isStream(e)
												? new c(t, e)
												: s.prepareContent(t, e, a.binary, a.optimizedBinaryString, a.base64))
									var g = new h(t, f, a)
									this.files[t] = g
								}
								var i = t('./utf8'),
									s = t('./utils'),
									o = t('./stream/GenericWorker'),
									a = t('./stream/StreamHelper'),
									l = t('./defaults'),
									u = t('./compressedObject'),
									h = t('./zipObject'),
									f = t('./generate'),
									p = t('./nodejsUtils'),
									c = t('./nodejs/NodejsStreamInputAdapter'),
									d = function (t) {
										'/' === t.slice(-1) && (t = t.substring(0, t.length - 1))
										var e = t.lastIndexOf('/')
										return 0 < e ? t.substring(0, e) : ''
									},
									m = function (t) {
										return '/' !== t.slice(-1) && (t += '/'), t
									},
									y = function (t, e) {
										return (
											(e = void 0 !== e ? e : l.createFolders),
											(t = m(t)),
											this.files[t] || n.call(this, t, null, { dir: !0, createFolders: e }),
											this.files[t]
										)
									}
								function v(t) {
									return '[object RegExp]' === Object.prototype.toString.call(t)
								}
								var g = {
									load: function () {
										throw new Error('This method has been removed in JSZip 3.0, please check the upgrade guide.')
									},
									forEach: function (t) {
										var e, r, n
										for (e in this.files)
											this.files.hasOwnProperty(e) &&
												((n = this.files[e]),
												(r = e.slice(this.root.length, e.length)) &&
													e.slice(0, this.root.length) === this.root &&
													t(r, n))
									},
									filter: function (t) {
										var e = []
										return (
											this.forEach(function (r, n) {
												t(r, n) && e.push(n)
											}),
											e
										)
									},
									file: function (t, e, r) {
										if (1 !== arguments.length) return (t = this.root + t), n.call(this, t, e, r), this
										if (v(t)) {
											var i = t
											return this.filter(function (t, e) {
												return !e.dir && i.test(t)
											})
										}
										var s = this.files[this.root + t]
										return s && !s.dir ? s : null
									},
									folder: function (t) {
										if (!t) return this
										if (v(t))
											return this.filter(function (e, r) {
												return r.dir && t.test(e)
											})
										var e = this.root + t,
											r = y.call(this, e),
											n = this.clone()
										return (n.root = r.name), n
									},
									remove: function (t) {
										t = this.root + t
										var e = this.files[t]
										if ((e || ('/' !== t.slice(-1) && (t += '/'), (e = this.files[t])), e && !e.dir))
											delete this.files[t]
										else
											for (
												var r = this.filter(function (e, r) {
														return r.name.slice(0, t.length) === t
													}),
													n = 0;
												n < r.length;
												n++
											)
												delete this.files[r[n].name]
										return this
									},
									generate: function (t) {
										throw new Error('This method has been removed in JSZip 3.0, please check the upgrade guide.')
									},
									generateInternalStream: function (t) {
										var e,
											r = {}
										try {
											if (
												(((r = s.extend(t || {}, {
													streamFiles: !1,
													compression: 'STORE',
													compressionOptions: null,
													type: '',
													platform: 'DOS',
													comment: null,
													mimeType: 'application/zip',
													encodeFileName: i.utf8encode,
												})).type = r.type.toLowerCase()),
												(r.compression = r.compression.toUpperCase()),
												'binarystring' === r.type && (r.type = 'string'),
												!r.type)
											)
												throw new Error('No output type specified.')
											s.checkSupport(r.type),
												('darwin' !== r.platform &&
													'freebsd' !== r.platform &&
													'linux' !== r.platform &&
													'sunos' !== r.platform) ||
													(r.platform = 'UNIX'),
												'win32' === r.platform && (r.platform = 'DOS')
											var n = r.comment || this.comment || ''
											e = f.generateWorker(this, r, n)
										} catch (t) {
											;(e = new o('error')).error(t)
										}
										return new a(e, r.type || 'string', r.mimeType)
									},
									generateAsync: function (t, e) {
										return this.generateInternalStream(t).accumulate(e)
									},
									generateNodeStream: function (t, e) {
										return (
											(t = t || {}).type || (t.type = 'nodebuffer'), this.generateInternalStream(t).toNodejsStream(e)
										)
									},
								}
								e.exports = g
							},
							{
								'./compressedObject': 2,
								'./defaults': 5,
								'./generate': 9,
								'./nodejs/NodejsStreamInputAdapter': 12,
								'./nodejsUtils': 14,
								'./stream/GenericWorker': 28,
								'./stream/StreamHelper': 29,
								'./utf8': 31,
								'./utils': 32,
								'./zipObject': 35,
							},
						],
						16: [
							function (t, e, r) {
								e.exports = t('stream')
							},
							{ stream: void 0 },
						],
						17: [
							function (t, e, r) {
								'use strict'
								var n = t('./DataReader')
								function i(t) {
									n.call(this, t)
									for (var e = 0; e < this.data.length; e++) t[e] = 255 & t[e]
								}
								t('../utils').inherits(i, n),
									(i.prototype.byteAt = function (t) {
										return this.data[this.zero + t]
									}),
									(i.prototype.lastIndexOfSignature = function (t) {
										for (
											var e = t.charCodeAt(0),
												r = t.charCodeAt(1),
												n = t.charCodeAt(2),
												i = t.charCodeAt(3),
												s = this.length - 4;
											0 <= s;
											--s
										)
											if (
												this.data[s] === e &&
												this.data[s + 1] === r &&
												this.data[s + 2] === n &&
												this.data[s + 3] === i
											)
												return s - this.zero
										return -1
									}),
									(i.prototype.readAndCheckSignature = function (t) {
										var e = t.charCodeAt(0),
											r = t.charCodeAt(1),
											n = t.charCodeAt(2),
											i = t.charCodeAt(3),
											s = this.readData(4)
										return e === s[0] && r === s[1] && n === s[2] && i === s[3]
									}),
									(i.prototype.readData = function (t) {
										if ((this.checkOffset(t), 0 === t)) return []
										var e = this.data.slice(this.zero + this.index, this.zero + this.index + t)
										return (this.index += t), e
									}),
									(e.exports = i)
							},
							{ '../utils': 32, './DataReader': 18 },
						],
						18: [
							function (t, e, r) {
								'use strict'
								var n = t('../utils')
								function i(t) {
									;(this.data = t), (this.length = t.length), (this.index = 0), (this.zero = 0)
								}
								;(i.prototype = {
									checkOffset: function (t) {
										this.checkIndex(this.index + t)
									},
									checkIndex: function (t) {
										if (this.length < this.zero + t || t < 0)
											throw new Error(
												'End of data reached (data length = ' +
													this.length +
													', asked index = ' +
													t +
													'). Corrupted zip ?'
											)
									},
									setIndex: function (t) {
										this.checkIndex(t), (this.index = t)
									},
									skip: function (t) {
										this.setIndex(this.index + t)
									},
									byteAt: function (t) {},
									readInt: function (t) {
										var e,
											r = 0
										for (this.checkOffset(t), e = this.index + t - 1; e >= this.index; e--)
											r = (r << 8) + this.byteAt(e)
										return (this.index += t), r
									},
									readString: function (t) {
										return n.transformTo('string', this.readData(t))
									},
									readData: function (t) {},
									lastIndexOfSignature: function (t) {},
									readAndCheckSignature: function (t) {},
									readDate: function () {
										var t = this.readInt(4)
										return new Date(
											Date.UTC(
												1980 + ((t >> 25) & 127),
												((t >> 21) & 15) - 1,
												(t >> 16) & 31,
												(t >> 11) & 31,
												(t >> 5) & 63,
												(31 & t) << 1
											)
										)
									},
								}),
									(e.exports = i)
							},
							{ '../utils': 32 },
						],
						19: [
							function (t, e, r) {
								'use strict'
								var n = t('./Uint8ArrayReader')
								function i(t) {
									n.call(this, t)
								}
								t('../utils').inherits(i, n),
									(i.prototype.readData = function (t) {
										this.checkOffset(t)
										var e = this.data.slice(this.zero + this.index, this.zero + this.index + t)
										return (this.index += t), e
									}),
									(e.exports = i)
							},
							{ '../utils': 32, './Uint8ArrayReader': 21 },
						],
						20: [
							function (t, e, r) {
								'use strict'
								var n = t('./DataReader')
								function i(t) {
									n.call(this, t)
								}
								t('../utils').inherits(i, n),
									(i.prototype.byteAt = function (t) {
										return this.data.charCodeAt(this.zero + t)
									}),
									(i.prototype.lastIndexOfSignature = function (t) {
										return this.data.lastIndexOf(t) - this.zero
									}),
									(i.prototype.readAndCheckSignature = function (t) {
										return t === this.readData(4)
									}),
									(i.prototype.readData = function (t) {
										this.checkOffset(t)
										var e = this.data.slice(this.zero + this.index, this.zero + this.index + t)
										return (this.index += t), e
									}),
									(e.exports = i)
							},
							{ '../utils': 32, './DataReader': 18 },
						],
						21: [
							function (t, e, r) {
								'use strict'
								var n = t('./ArrayReader')
								function i(t) {
									n.call(this, t)
								}
								t('../utils').inherits(i, n),
									(i.prototype.readData = function (t) {
										if ((this.checkOffset(t), 0 === t)) return new Uint8Array(0)
										var e = this.data.subarray(this.zero + this.index, this.zero + this.index + t)
										return (this.index += t), e
									}),
									(e.exports = i)
							},
							{ '../utils': 32, './ArrayReader': 17 },
						],
						22: [
							function (t, e, r) {
								'use strict'
								var n = t('../utils'),
									i = t('../support'),
									s = t('./ArrayReader'),
									o = t('./StringReader'),
									a = t('./NodeBufferReader'),
									l = t('./Uint8ArrayReader')
								e.exports = function (t) {
									var e = n.getTypeOf(t)
									return (
										n.checkSupport(e),
										'string' !== e || i.uint8array
											? 'nodebuffer' === e
												? new a(t)
												: i.uint8array
												? new l(n.transformTo('uint8array', t))
												: new s(n.transformTo('array', t))
											: new o(t)
									)
								}
							},
							{
								'../support': 30,
								'../utils': 32,
								'./ArrayReader': 17,
								'./NodeBufferReader': 19,
								'./StringReader': 20,
								'./Uint8ArrayReader': 21,
							},
						],
						23: [
							function (t, e, r) {
								'use strict'
								;(r.LOCAL_FILE_HEADER = 'PK'),
									(r.CENTRAL_FILE_HEADER = 'PK'),
									(r.CENTRAL_DIRECTORY_END = 'PK'),
									(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = 'PK'),
									(r.ZIP64_CENTRAL_DIRECTORY_END = 'PK'),
									(r.DATA_DESCRIPTOR = 'PK\b')
							},
							{},
						],
						24: [
							function (t, e, r) {
								'use strict'
								var n = t('./GenericWorker'),
									i = t('../utils')
								function s(t) {
									n.call(this, 'ConvertWorker to ' + t), (this.destType = t)
								}
								i.inherits(s, n),
									(s.prototype.processChunk = function (t) {
										this.push({ data: i.transformTo(this.destType, t.data), meta: t.meta })
									}),
									(e.exports = s)
							},
							{ '../utils': 32, './GenericWorker': 28 },
						],
						25: [
							function (t, e, r) {
								'use strict'
								var n = t('./GenericWorker'),
									i = t('../crc32')
								function s() {
									n.call(this, 'Crc32Probe'), this.withStreamInfo('crc32', 0)
								}
								t('../utils').inherits(s, n),
									(s.prototype.processChunk = function (t) {
										;(this.streamInfo.crc32 = i(t.data, this.streamInfo.crc32 || 0)), this.push(t)
									}),
									(e.exports = s)
							},
							{ '../crc32': 4, '../utils': 32, './GenericWorker': 28 },
						],
						26: [
							function (t, e, r) {
								'use strict'
								var n = t('../utils'),
									i = t('./GenericWorker')
								function s(t) {
									i.call(this, 'DataLengthProbe for ' + t), (this.propName = t), this.withStreamInfo(t, 0)
								}
								n.inherits(s, i),
									(s.prototype.processChunk = function (t) {
										if (t) {
											var e = this.streamInfo[this.propName] || 0
											this.streamInfo[this.propName] = e + t.data.length
										}
										i.prototype.processChunk.call(this, t)
									}),
									(e.exports = s)
							},
							{ '../utils': 32, './GenericWorker': 28 },
						],
						27: [
							function (t, e, r) {
								'use strict'
								var n = t('../utils'),
									i = t('./GenericWorker')
								function s(t) {
									i.call(this, 'DataWorker')
									var e = this
									;(this.dataIsReady = !1),
										(this.index = 0),
										(this.max = 0),
										(this.data = null),
										(this.type = ''),
										(this._tickScheduled = !1),
										t.then(
											function (t) {
												;(e.dataIsReady = !0),
													(e.data = t),
													(e.max = (t && t.length) || 0),
													(e.type = n.getTypeOf(t)),
													e.isPaused || e._tickAndRepeat()
											},
											function (t) {
												e.error(t)
											}
										)
								}
								n.inherits(s, i),
									(s.prototype.cleanUp = function () {
										i.prototype.cleanUp.call(this), (this.data = null)
									}),
									(s.prototype.resume = function () {
										return (
											!!i.prototype.resume.call(this) &&
											(!this._tickScheduled &&
												this.dataIsReady &&
												((this._tickScheduled = !0), n.delay(this._tickAndRepeat, [], this)),
											!0)
										)
									}),
									(s.prototype._tickAndRepeat = function () {
										;(this._tickScheduled = !1),
											this.isPaused ||
												this.isFinished ||
												(this._tick(),
												this.isFinished || (n.delay(this._tickAndRepeat, [], this), (this._tickScheduled = !0)))
									}),
									(s.prototype._tick = function () {
										if (this.isPaused || this.isFinished) return !1
										var t = null,
											e = Math.min(this.max, this.index + 16384)
										if (this.index >= this.max) return this.end()
										switch (this.type) {
											case 'string':
												t = this.data.substring(this.index, e)
												break
											case 'uint8array':
												t = this.data.subarray(this.index, e)
												break
											case 'array':
											case 'nodebuffer':
												t = this.data.slice(this.index, e)
										}
										return (
											(this.index = e),
											this.push({ data: t, meta: { percent: this.max ? (this.index / this.max) * 100 : 0 } })
										)
									}),
									(e.exports = s)
							},
							{ '../utils': 32, './GenericWorker': 28 },
						],
						28: [
							function (t, e, r) {
								'use strict'
								function n(t) {
									;(this.name = t || 'default'),
										(this.streamInfo = {}),
										(this.generatedError = null),
										(this.extraStreamInfo = {}),
										(this.isPaused = !0),
										(this.isFinished = !1),
										(this.isLocked = !1),
										(this._listeners = { data: [], end: [], error: [] }),
										(this.previous = null)
								}
								;(n.prototype = {
									push: function (t) {
										this.emit('data', t)
									},
									end: function () {
										if (this.isFinished) return !1
										this.flush()
										try {
											this.emit('end'), this.cleanUp(), (this.isFinished = !0)
										} catch (t) {
											this.emit('error', t)
										}
										return !0
									},
									error: function (t) {
										return (
											!this.isFinished &&
											(this.isPaused
												? (this.generatedError = t)
												: ((this.isFinished = !0),
												  this.emit('error', t),
												  this.previous && this.previous.error(t),
												  this.cleanUp()),
											!0)
										)
									},
									on: function (t, e) {
										return this._listeners[t].push(e), this
									},
									cleanUp: function () {
										;(this.streamInfo = this.generatedError = this.extraStreamInfo = null), (this._listeners = [])
									},
									emit: function (t, e) {
										if (this._listeners[t])
											for (var r = 0; r < this._listeners[t].length; r++) this._listeners[t][r].call(this, e)
									},
									pipe: function (t) {
										return t.registerPrevious(this)
									},
									registerPrevious: function (t) {
										if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.")
										;(this.streamInfo = t.streamInfo), this.mergeStreamInfo(), (this.previous = t)
										var e = this
										return (
											t.on('data', function (t) {
												e.processChunk(t)
											}),
											t.on('end', function () {
												e.end()
											}),
											t.on('error', function (t) {
												e.error(t)
											}),
											this
										)
									},
									pause: function () {
										return (
											!this.isPaused &&
											!this.isFinished &&
											((this.isPaused = !0), this.previous && this.previous.pause(), !0)
										)
									},
									resume: function () {
										if (!this.isPaused || this.isFinished) return !1
										var t = (this.isPaused = !1)
										return (
											this.generatedError && (this.error(this.generatedError), (t = !0)),
											this.previous && this.previous.resume(),
											!t
										)
									},
									flush: function () {},
									processChunk: function (t) {
										this.push(t)
									},
									withStreamInfo: function (t, e) {
										return (this.extraStreamInfo[t] = e), this.mergeStreamInfo(), this
									},
									mergeStreamInfo: function () {
										for (var t in this.extraStreamInfo)
											this.extraStreamInfo.hasOwnProperty(t) && (this.streamInfo[t] = this.extraStreamInfo[t])
									},
									lock: function () {
										if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.")
										;(this.isLocked = !0), this.previous && this.previous.lock()
									},
									toString: function () {
										var t = 'Worker ' + this.name
										return this.previous ? this.previous + ' -> ' + t : t
									},
								}),
									(e.exports = n)
							},
							{},
						],
						29: [
							function (t, r, n) {
								'use strict'
								var i = t('../utils'),
									s = t('./ConvertWorker'),
									o = t('./GenericWorker'),
									a = t('../base64'),
									l = t('../support'),
									u = t('../external'),
									h = null
								if (l.nodestream)
									try {
										h = t('../nodejs/NodejsStreamOutputAdapter')
									} catch (t) {}
								function f(t, e, r) {
									var n = e
									switch (e) {
										case 'blob':
										case 'arraybuffer':
											n = 'uint8array'
											break
										case 'base64':
											n = 'string'
									}
									try {
										;(this._internalType = n),
											(this._outputType = e),
											(this._mimeType = r),
											i.checkSupport(n),
											(this._worker = t.pipe(new s(n))),
											t.lock()
									} catch (t) {
										;(this._worker = new o('error')), this._worker.error(t)
									}
								}
								;(f.prototype = {
									accumulate: function (t) {
										return (function (t, r) {
											return new u.Promise(function (n, s) {
												var o = [],
													l = t._internalType,
													u = t._outputType,
													h = t._mimeType
												t.on('data', function (t, e) {
													o.push(t), r && r(e)
												})
													.on('error', function (t) {
														;(o = []), s(t)
													})
													.on('end', function () {
														try {
															var t = (function (t, e, r) {
																switch (t) {
																	case 'blob':
																		return i.newBlob(i.transformTo('arraybuffer', e), r)
																	case 'base64':
																		return a.encode(e)
																	default:
																		return i.transformTo(t, e)
																}
															})(
																u,
																(function (t, r) {
																	var n,
																		i = 0,
																		s = null,
																		o = 0
																	for (n = 0; n < r.length; n++) o += r[n].length
																	switch (t) {
																		case 'string':
																			return r.join('')
																		case 'array':
																			return Array.prototype.concat.apply([], r)
																		case 'uint8array':
																			for (s = new Uint8Array(o), n = 0; n < r.length; n++)
																				s.set(r[n], i), (i += r[n].length)
																			return s
																		case 'nodebuffer':
																			return e.concat(r)
																		default:
																			throw new Error("concat : unsupported type '" + t + "'")
																	}
																})(l, o),
																h
															)
															n(t)
														} catch (t) {
															s(t)
														}
														o = []
													})
													.resume()
											})
										})(this, t)
									},
									on: function (t, e) {
										var r = this
										return (
											'data' === t
												? this._worker.on(t, function (t) {
														e.call(r, t.data, t.meta)
												  })
												: this._worker.on(t, function () {
														i.delay(e, arguments, r)
												  }),
											this
										)
									},
									resume: function () {
										return i.delay(this._worker.resume, [], this._worker), this
									},
									pause: function () {
										return this._worker.pause(), this
									},
									toNodejsStream: function (t) {
										if ((i.checkSupport('nodestream'), 'nodebuffer' !== this._outputType))
											throw new Error(this._outputType + ' is not supported by this method')
										return new h(this, { objectMode: 'nodebuffer' !== this._outputType }, t)
									},
								}),
									(r.exports = f)
							},
							{
								'../base64': 1,
								'../external': 6,
								'../nodejs/NodejsStreamOutputAdapter': 13,
								'../support': 30,
								'../utils': 32,
								'./ConvertWorker': 24,
								'./GenericWorker': 28,
							},
						],
						30: [
							function (t, r, n) {
								'use strict'
								if (
									((n.base64 = !0),
									(n.array = !0),
									(n.string = !0),
									(n.arraybuffer = 'undefined' != typeof ArrayBuffer && 'undefined' != typeof Uint8Array),
									(n.nodebuffer = void 0 !== e),
									(n.uint8array = 'undefined' != typeof Uint8Array),
									'undefined' == typeof ArrayBuffer)
								)
									n.blob = !1
								else {
									var i = new ArrayBuffer(0)
									try {
										n.blob = 0 === new Blob([i], { type: 'application/zip' }).size
									} catch (t) {
										try {
											var s = new (self.BlobBuilder ||
												self.WebKitBlobBuilder ||
												self.MozBlobBuilder ||
												self.MSBlobBuilder)()
											s.append(i), (n.blob = 0 === s.getBlob('application/zip').size)
										} catch (t) {
											n.blob = !1
										}
									}
								}
								try {
									n.nodestream = !!t('readable-stream').Readable
								} catch (t) {
									n.nodestream = !1
								}
							},
							{ 'readable-stream': 16 },
						],
						31: [
							function (t, e, r) {
								'use strict'
								for (
									var n = t('./utils'),
										i = t('./support'),
										s = t('./nodejsUtils'),
										o = t('./stream/GenericWorker'),
										a = new Array(256),
										l = 0;
									l < 256;
									l++
								)
									a[l] = 252 <= l ? 6 : 248 <= l ? 5 : 240 <= l ? 4 : 224 <= l ? 3 : 192 <= l ? 2 : 1
								function u() {
									o.call(this, 'utf-8 decode'), (this.leftOver = null)
								}
								function h() {
									o.call(this, 'utf-8 encode')
								}
								;(a[254] = a[254] = 1),
									(r.utf8encode = function (t) {
										return i.nodebuffer
											? s.newBufferFrom(t, 'utf-8')
											: (function (t) {
													var e,
														r,
														n,
														s,
														o,
														a = t.length,
														l = 0
													for (s = 0; s < a; s++)
														55296 == (64512 & (r = t.charCodeAt(s))) &&
															s + 1 < a &&
															56320 == (64512 & (n = t.charCodeAt(s + 1))) &&
															((r = 65536 + ((r - 55296) << 10) + (n - 56320)), s++),
															(l += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4)
													for (e = i.uint8array ? new Uint8Array(l) : new Array(l), s = o = 0; o < l; s++)
														55296 == (64512 & (r = t.charCodeAt(s))) &&
															s + 1 < a &&
															56320 == (64512 & (n = t.charCodeAt(s + 1))) &&
															((r = 65536 + ((r - 55296) << 10) + (n - 56320)), s++),
															r < 128
																? (e[o++] = r)
																: (r < 2048
																		? (e[o++] = 192 | (r >>> 6))
																		: (r < 65536
																				? (e[o++] = 224 | (r >>> 12))
																				: ((e[o++] = 240 | (r >>> 18)), (e[o++] = 128 | ((r >>> 12) & 63))),
																		  (e[o++] = 128 | ((r >>> 6) & 63))),
																  (e[o++] = 128 | (63 & r)))
													return e
											  })(t)
									}),
									(r.utf8decode = function (t) {
										return i.nodebuffer
											? n.transformTo('nodebuffer', t).toString('utf-8')
											: (function (t) {
													var e,
														r,
														i,
														s,
														o = t.length,
														l = new Array(2 * o)
													for (e = r = 0; e < o; )
														if ((i = t[e++]) < 128) l[r++] = i
														else if (4 < (s = a[i])) (l[r++] = 65533), (e += s - 1)
														else {
															for (i &= 2 === s ? 31 : 3 === s ? 15 : 7; 1 < s && e < o; )
																(i = (i << 6) | (63 & t[e++])), s--
															1 < s
																? (l[r++] = 65533)
																: i < 65536
																? (l[r++] = i)
																: ((i -= 65536), (l[r++] = 55296 | ((i >> 10) & 1023)), (l[r++] = 56320 | (1023 & i)))
														}
													return (
														l.length !== r && (l.subarray ? (l = l.subarray(0, r)) : (l.length = r)),
														n.applyFromCharCode(l)
													)
											  })((t = n.transformTo(i.uint8array ? 'uint8array' : 'array', t)))
									}),
									n.inherits(u, o),
									(u.prototype.processChunk = function (t) {
										var e = n.transformTo(i.uint8array ? 'uint8array' : 'array', t.data)
										if (this.leftOver && this.leftOver.length) {
											if (i.uint8array) {
												var s = e
												;(e = new Uint8Array(s.length + this.leftOver.length)).set(this.leftOver, 0),
													e.set(s, this.leftOver.length)
											} else e = this.leftOver.concat(e)
											this.leftOver = null
										}
										var o = (function (t, e) {
												var r
												for (
													(e = e || t.length) > t.length && (e = t.length), r = e - 1;
													0 <= r && 128 == (192 & t[r]);

												)
													r--
												return r < 0 || 0 === r ? e : r + a[t[r]] > e ? r : e
											})(e),
											l = e
										o !== e.length &&
											(i.uint8array
												? ((l = e.subarray(0, o)), (this.leftOver = e.subarray(o, e.length)))
												: ((l = e.slice(0, o)), (this.leftOver = e.slice(o, e.length)))),
											this.push({ data: r.utf8decode(l), meta: t.meta })
									}),
									(u.prototype.flush = function () {
										this.leftOver &&
											this.leftOver.length &&
											(this.push({ data: r.utf8decode(this.leftOver), meta: {} }), (this.leftOver = null))
									}),
									(r.Utf8DecodeWorker = u),
									n.inherits(h, o),
									(h.prototype.processChunk = function (t) {
										this.push({ data: r.utf8encode(t.data), meta: t.meta })
									}),
									(r.Utf8EncodeWorker = h)
							},
							{ './nodejsUtils': 14, './stream/GenericWorker': 28, './support': 30, './utils': 32 },
						],
						32: [
							function (t, e, r) {
								'use strict'
								var n = t('./support'),
									i = t('./base64'),
									s = t('./nodejsUtils'),
									o = t('set-immediate-shim'),
									a = t('./external')
								function l(t) {
									return t
								}
								function u(t, e) {
									for (var r = 0; r < t.length; ++r) e[r] = 255 & t.charCodeAt(r)
									return e
								}
								r.newBlob = function (t, e) {
									r.checkSupport('blob')
									try {
										return new Blob([t], { type: e })
									} catch (r) {
										try {
											var n = new (self.BlobBuilder ||
												self.WebKitBlobBuilder ||
												self.MozBlobBuilder ||
												self.MSBlobBuilder)()
											return n.append(t), n.getBlob(e)
										} catch (t) {
											throw new Error("Bug : can't construct the Blob.")
										}
									}
								}
								var h = {
									stringifyByChunk: function (t, e, r) {
										var n = [],
											i = 0,
											s = t.length
										if (s <= r) return String.fromCharCode.apply(null, t)
										for (; i < s; )
											'array' === e || 'nodebuffer' === e
												? n.push(String.fromCharCode.apply(null, t.slice(i, Math.min(i + r, s))))
												: n.push(String.fromCharCode.apply(null, t.subarray(i, Math.min(i + r, s)))),
												(i += r)
										return n.join('')
									},
									stringifyByChar: function (t) {
										for (var e = '', r = 0; r < t.length; r++) e += String.fromCharCode(t[r])
										return e
									},
									applyCanBeUsed: {
										uint8array: (function () {
											try {
												return n.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length
											} catch (t) {
												return !1
											}
										})(),
										nodebuffer: (function () {
											try {
												return n.nodebuffer && 1 === String.fromCharCode.apply(null, s.allocBuffer(1)).length
											} catch (t) {
												return !1
											}
										})(),
									},
								}
								function f(t) {
									var e = 65536,
										n = r.getTypeOf(t),
										i = !0
									if (
										('uint8array' === n
											? (i = h.applyCanBeUsed.uint8array)
											: 'nodebuffer' === n && (i = h.applyCanBeUsed.nodebuffer),
										i)
									)
										for (; 1 < e; )
											try {
												return h.stringifyByChunk(t, n, e)
											} catch (t) {
												e = Math.floor(e / 2)
											}
									return h.stringifyByChar(t)
								}
								function p(t, e) {
									for (var r = 0; r < t.length; r++) e[r] = t[r]
									return e
								}
								r.applyFromCharCode = f
								var c = {}
								;(c.string = {
									string: l,
									array: function (t) {
										return u(t, new Array(t.length))
									},
									arraybuffer: function (t) {
										return c.string.uint8array(t).buffer
									},
									uint8array: function (t) {
										return u(t, new Uint8Array(t.length))
									},
									nodebuffer: function (t) {
										return u(t, s.allocBuffer(t.length))
									},
								}),
									(c.array = {
										string: f,
										array: l,
										arraybuffer: function (t) {
											return new Uint8Array(t).buffer
										},
										uint8array: function (t) {
											return new Uint8Array(t)
										},
										nodebuffer: function (t) {
											return s.newBufferFrom(t)
										},
									}),
									(c.arraybuffer = {
										string: function (t) {
											return f(new Uint8Array(t))
										},
										array: function (t) {
											return p(new Uint8Array(t), new Array(t.byteLength))
										},
										arraybuffer: l,
										uint8array: function (t) {
											return new Uint8Array(t)
										},
										nodebuffer: function (t) {
											return s.newBufferFrom(new Uint8Array(t))
										},
									}),
									(c.uint8array = {
										string: f,
										array: function (t) {
											return p(t, new Array(t.length))
										},
										arraybuffer: function (t) {
											return t.buffer
										},
										uint8array: l,
										nodebuffer: function (t) {
											return s.newBufferFrom(t)
										},
									}),
									(c.nodebuffer = {
										string: f,
										array: function (t) {
											return p(t, new Array(t.length))
										},
										arraybuffer: function (t) {
											return c.nodebuffer.uint8array(t).buffer
										},
										uint8array: function (t) {
											return p(t, new Uint8Array(t.length))
										},
										nodebuffer: l,
									}),
									(r.transformTo = function (t, e) {
										if (((e = e || ''), !t)) return e
										r.checkSupport(t)
										var n = r.getTypeOf(e)
										return c[n][t](e)
									}),
									(r.getTypeOf = function (t) {
										return 'string' == typeof t
											? 'string'
											: '[object Array]' === Object.prototype.toString.call(t)
											? 'array'
											: n.nodebuffer && s.isBuffer(t)
											? 'nodebuffer'
											: n.uint8array && t instanceof Uint8Array
											? 'uint8array'
											: n.arraybuffer && t instanceof ArrayBuffer
											? 'arraybuffer'
											: void 0
									}),
									(r.checkSupport = function (t) {
										if (!n[t.toLowerCase()]) throw new Error(t + ' is not supported by this platform')
									}),
									(r.MAX_VALUE_16BITS = 65535),
									(r.MAX_VALUE_32BITS = -1),
									(r.pretty = function (t) {
										var e,
											r,
											n = ''
										for (r = 0; r < (t || '').length; r++)
											n += '\\x' + ((e = t.charCodeAt(r)) < 16 ? '0' : '') + e.toString(16).toUpperCase()
										return n
									}),
									(r.delay = function (t, e, r) {
										o(function () {
											t.apply(r || null, e || [])
										})
									}),
									(r.inherits = function (t, e) {
										function r() {}
										;(r.prototype = e.prototype), (t.prototype = new r())
									}),
									(r.extend = function () {
										var t,
											e,
											r = {}
										for (t = 0; t < arguments.length; t++)
											for (e in arguments[t])
												arguments[t].hasOwnProperty(e) && void 0 === r[e] && (r[e] = arguments[t][e])
										return r
									}),
									(r.prepareContent = function (t, e, s, o, l) {
										return a.Promise.resolve(e)
											.then(function (t) {
												return n.blob &&
													(t instanceof Blob ||
														-1 !== ['[object File]', '[object Blob]'].indexOf(Object.prototype.toString.call(t))) &&
													'undefined' != typeof FileReader
													? new a.Promise(function (e, r) {
															var n = new FileReader()
															;(n.onload = function (t) {
																e(t.target.result)
															}),
																(n.onerror = function (t) {
																	r(t.target.error)
																}),
																n.readAsArrayBuffer(t)
													  })
													: t
											})
											.then(function (e) {
												var h = r.getTypeOf(e)
												return h
													? ('arraybuffer' === h
															? (e = r.transformTo('uint8array', e))
															: 'string' === h &&
															  (l
																	? (e = i.decode(e))
																	: s &&
																	  !0 !== o &&
																	  (e = (function (t) {
																			return u(t, n.uint8array ? new Uint8Array(t.length) : new Array(t.length))
																	  })(e))),
													  e)
													: a.Promise.reject(
															new Error(
																"Can't read the data of '" +
																	t +
																	"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"
															)
													  )
											})
									})
							},
							{ './base64': 1, './external': 6, './nodejsUtils': 14, './support': 30, 'set-immediate-shim': 54 },
						],
						33: [
							function (t, e, r) {
								'use strict'
								var n = t('./reader/readerFor'),
									i = t('./utils'),
									s = t('./signature'),
									o = t('./zipEntry'),
									a = (t('./utf8'), t('./support'))
								function l(t) {
									;(this.files = []), (this.loadOptions = t)
								}
								;(l.prototype = {
									checkSignature: function (t) {
										if (!this.reader.readAndCheckSignature(t)) {
											this.reader.index -= 4
											var e = this.reader.readString(4)
											throw new Error(
												'Corrupted zip or bug: unexpected signature (' + i.pretty(e) + ', expected ' + i.pretty(t) + ')'
											)
										}
									},
									isSignature: function (t, e) {
										var r = this.reader.index
										this.reader.setIndex(t)
										var n = this.reader.readString(4) === e
										return this.reader.setIndex(r), n
									},
									readBlockEndOfCentral: function () {
										;(this.diskNumber = this.reader.readInt(2)),
											(this.diskWithCentralDirStart = this.reader.readInt(2)),
											(this.centralDirRecordsOnThisDisk = this.reader.readInt(2)),
											(this.centralDirRecords = this.reader.readInt(2)),
											(this.centralDirSize = this.reader.readInt(4)),
											(this.centralDirOffset = this.reader.readInt(4)),
											(this.zipCommentLength = this.reader.readInt(2))
										var t = this.reader.readData(this.zipCommentLength),
											e = a.uint8array ? 'uint8array' : 'array',
											r = i.transformTo(e, t)
										this.zipComment = this.loadOptions.decodeFileName(r)
									},
									readBlockZip64EndOfCentral: function () {
										;(this.zip64EndOfCentralSize = this.reader.readInt(8)),
											this.reader.skip(4),
											(this.diskNumber = this.reader.readInt(4)),
											(this.diskWithCentralDirStart = this.reader.readInt(4)),
											(this.centralDirRecordsOnThisDisk = this.reader.readInt(8)),
											(this.centralDirRecords = this.reader.readInt(8)),
											(this.centralDirSize = this.reader.readInt(8)),
											(this.centralDirOffset = this.reader.readInt(8)),
											(this.zip64ExtensibleData = {})
										for (var t, e, r, n = this.zip64EndOfCentralSize - 44; 0 < n; )
											(t = this.reader.readInt(2)),
												(e = this.reader.readInt(4)),
												(r = this.reader.readData(e)),
												(this.zip64ExtensibleData[t] = { id: t, length: e, value: r })
									},
									readBlockZip64EndOfCentralLocator: function () {
										if (
											((this.diskWithZip64CentralDirStart = this.reader.readInt(4)),
											(this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8)),
											(this.disksCount = this.reader.readInt(4)),
											1 < this.disksCount)
										)
											throw new Error('Multi-volumes zip are not supported')
									},
									readLocalFiles: function () {
										var t, e
										for (t = 0; t < this.files.length; t++)
											(e = this.files[t]),
												this.reader.setIndex(e.localHeaderOffset),
												this.checkSignature(s.LOCAL_FILE_HEADER),
												e.readLocalPart(this.reader),
												e.handleUTF8(),
												e.processAttributes()
									},
									readCentralDir: function () {
										var t
										for (
											this.reader.setIndex(this.centralDirOffset);
											this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);

										)
											(t = new o({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader),
												this.files.push(t)
										if (
											this.centralDirRecords !== this.files.length &&
											0 !== this.centralDirRecords &&
											0 === this.files.length
										)
											throw new Error(
												'Corrupted zip or bug: expected ' +
													this.centralDirRecords +
													' records in central dir, got ' +
													this.files.length
											)
									},
									readEndOfCentral: function () {
										var t = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END)
										if (t < 0)
											throw this.isSignature(0, s.LOCAL_FILE_HEADER)
												? new Error("Corrupted zip: can't find end of central directory")
												: new Error(
														"Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"
												  )
										this.reader.setIndex(t)
										var e = t
										if (
											(this.checkSignature(s.CENTRAL_DIRECTORY_END),
											this.readBlockEndOfCentral(),
											this.diskNumber === i.MAX_VALUE_16BITS ||
												this.diskWithCentralDirStart === i.MAX_VALUE_16BITS ||
												this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS ||
												this.centralDirRecords === i.MAX_VALUE_16BITS ||
												this.centralDirSize === i.MAX_VALUE_32BITS ||
												this.centralDirOffset === i.MAX_VALUE_32BITS)
										) {
											if (
												((this.zip64 = !0),
												(t = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0)
											)
												throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator")
											if (
												(this.reader.setIndex(t),
												this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),
												this.readBlockZip64EndOfCentralLocator(),
												!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) &&
													((this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(
														s.ZIP64_CENTRAL_DIRECTORY_END
													)),
													this.relativeOffsetEndOfZip64CentralDir < 0))
											)
												throw new Error("Corrupted zip: can't find the ZIP64 end of central directory")
											this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),
												this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),
												this.readBlockZip64EndOfCentral()
										}
										var r = this.centralDirOffset + this.centralDirSize
										this.zip64 && ((r += 20), (r += 12 + this.zip64EndOfCentralSize))
										var n = e - r
										if (0 < n) this.isSignature(e, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n)
										else if (n < 0) throw new Error('Corrupted zip: missing ' + Math.abs(n) + ' bytes.')
									},
									prepareReader: function (t) {
										this.reader = n(t)
									},
									load: function (t) {
										this.prepareReader(t), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles()
									},
								}),
									(e.exports = l)
							},
							{
								'./reader/readerFor': 22,
								'./signature': 23,
								'./support': 30,
								'./utf8': 31,
								'./utils': 32,
								'./zipEntry': 34,
							},
						],
						34: [
							function (t, e, r) {
								'use strict'
								var n = t('./reader/readerFor'),
									i = t('./utils'),
									s = t('./compressedObject'),
									o = t('./crc32'),
									a = t('./utf8'),
									l = t('./compressions'),
									u = t('./support')
								function h(t, e) {
									;(this.options = t), (this.loadOptions = e)
								}
								;(h.prototype = {
									isEncrypted: function () {
										return 1 == (1 & this.bitFlag)
									},
									useUTF8: function () {
										return 2048 == (2048 & this.bitFlag)
									},
									readLocalPart: function (t) {
										var e, r
										if (
											(t.skip(22),
											(this.fileNameLength = t.readInt(2)),
											(r = t.readInt(2)),
											(this.fileName = t.readData(this.fileNameLength)),
											t.skip(r),
											-1 === this.compressedSize || -1 === this.uncompressedSize)
										)
											throw new Error(
												"Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)"
											)
										if (
											null ===
											(e = (function (t) {
												for (var e in l) if (l.hasOwnProperty(e) && l[e].magic === t) return l[e]
												return null
											})(this.compressionMethod))
										)
											throw new Error(
												'Corrupted zip : compression ' +
													i.pretty(this.compressionMethod) +
													' unknown (inner file : ' +
													i.transformTo('string', this.fileName) +
													')'
											)
										this.decompressed = new s(
											this.compressedSize,
											this.uncompressedSize,
											this.crc32,
											e,
											t.readData(this.compressedSize)
										)
									},
									readCentralPart: function (t) {
										;(this.versionMadeBy = t.readInt(2)),
											t.skip(2),
											(this.bitFlag = t.readInt(2)),
											(this.compressionMethod = t.readString(2)),
											(this.date = t.readDate()),
											(this.crc32 = t.readInt(4)),
											(this.compressedSize = t.readInt(4)),
											(this.uncompressedSize = t.readInt(4))
										var e = t.readInt(2)
										if (
											((this.extraFieldsLength = t.readInt(2)),
											(this.fileCommentLength = t.readInt(2)),
											(this.diskNumberStart = t.readInt(2)),
											(this.internalFileAttributes = t.readInt(2)),
											(this.externalFileAttributes = t.readInt(4)),
											(this.localHeaderOffset = t.readInt(4)),
											this.isEncrypted())
										)
											throw new Error('Encrypted zip are not supported')
										t.skip(e),
											this.readExtraFields(t),
											this.parseZIP64ExtraField(t),
											(this.fileComment = t.readData(this.fileCommentLength))
									},
									processAttributes: function () {
										;(this.unixPermissions = null), (this.dosPermissions = null)
										var t = this.versionMadeBy >> 8
										;(this.dir = !!(16 & this.externalFileAttributes)),
											0 == t && (this.dosPermissions = 63 & this.externalFileAttributes),
											3 == t && (this.unixPermissions = (this.externalFileAttributes >> 16) & 65535),
											this.dir || '/' !== this.fileNameStr.slice(-1) || (this.dir = !0)
									},
									parseZIP64ExtraField: function (t) {
										if (this.extraFields[1]) {
											var e = n(this.extraFields[1].value)
											this.uncompressedSize === i.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)),
												this.compressedSize === i.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)),
												this.localHeaderOffset === i.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)),
												this.diskNumberStart === i.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4))
										}
									},
									readExtraFields: function (t) {
										var e,
											r,
											n,
											i = t.index + this.extraFieldsLength
										for (this.extraFields || (this.extraFields = {}); t.index + 4 < i; )
											(e = t.readInt(2)),
												(r = t.readInt(2)),
												(n = t.readData(r)),
												(this.extraFields[e] = { id: e, length: r, value: n })
										t.setIndex(i)
									},
									handleUTF8: function () {
										var t = u.uint8array ? 'uint8array' : 'array'
										if (this.useUTF8())
											(this.fileNameStr = a.utf8decode(this.fileName)),
												(this.fileCommentStr = a.utf8decode(this.fileComment))
										else {
											var e = this.findExtraFieldUnicodePath()
											if (null !== e) this.fileNameStr = e
											else {
												var r = i.transformTo(t, this.fileName)
												this.fileNameStr = this.loadOptions.decodeFileName(r)
											}
											var n = this.findExtraFieldUnicodeComment()
											if (null !== n) this.fileCommentStr = n
											else {
												var s = i.transformTo(t, this.fileComment)
												this.fileCommentStr = this.loadOptions.decodeFileName(s)
											}
										}
									},
									findExtraFieldUnicodePath: function () {
										var t = this.extraFields[28789]
										if (t) {
											var e = n(t.value)
											return 1 !== e.readInt(1) || o(this.fileName) !== e.readInt(4)
												? null
												: a.utf8decode(e.readData(t.length - 5))
										}
										return null
									},
									findExtraFieldUnicodeComment: function () {
										var t = this.extraFields[25461]
										if (t) {
											var e = n(t.value)
											return 1 !== e.readInt(1) || o(this.fileComment) !== e.readInt(4)
												? null
												: a.utf8decode(e.readData(t.length - 5))
										}
										return null
									},
								}),
									(e.exports = h)
							},
							{
								'./compressedObject': 2,
								'./compressions': 3,
								'./crc32': 4,
								'./reader/readerFor': 22,
								'./support': 30,
								'./utf8': 31,
								'./utils': 32,
							},
						],
						35: [
							function (t, e, r) {
								'use strict'
								function n(t, e, r) {
									;(this.name = t),
										(this.dir = r.dir),
										(this.date = r.date),
										(this.comment = r.comment),
										(this.unixPermissions = r.unixPermissions),
										(this.dosPermissions = r.dosPermissions),
										(this._data = e),
										(this._dataBinary = r.binary),
										(this.options = { compression: r.compression, compressionOptions: r.compressionOptions })
								}
								var i = t('./stream/StreamHelper'),
									s = t('./stream/DataWorker'),
									o = t('./utf8'),
									a = t('./compressedObject'),
									l = t('./stream/GenericWorker')
								n.prototype = {
									internalStream: function (t) {
										var e = null,
											r = 'string'
										try {
											if (!t) throw new Error('No output type specified.')
											var n = 'string' === (r = t.toLowerCase()) || 'text' === r
											;('binarystring' !== r && 'text' !== r) || (r = 'string'), (e = this._decompressWorker())
											var s = !this._dataBinary
											s && !n && (e = e.pipe(new o.Utf8EncodeWorker())),
												!s && n && (e = e.pipe(new o.Utf8DecodeWorker()))
										} catch (t) {
											;(e = new l('error')).error(t)
										}
										return new i(e, r, '')
									},
									async: function (t, e) {
										return this.internalStream(t).accumulate(e)
									},
									nodeStream: function (t, e) {
										return this.internalStream(t || 'nodebuffer').toNodejsStream(e)
									},
									_compressWorker: function (t, e) {
										if (this._data instanceof a && this._data.compression.magic === t.magic)
											return this._data.getCompressedWorker()
										var r = this._decompressWorker()
										return this._dataBinary || (r = r.pipe(new o.Utf8EncodeWorker())), a.createWorkerFrom(r, t, e)
									},
									_decompressWorker: function () {
										return this._data instanceof a
											? this._data.getContentWorker()
											: this._data instanceof l
											? this._data
											: new s(this._data)
									},
								}
								for (
									var u = ['asText', 'asBinary', 'asNodeBuffer', 'asUint8Array', 'asArrayBuffer'],
										h = function () {
											throw new Error('This method has been removed in JSZip 3.0, please check the upgrade guide.')
										},
										f = 0;
									f < u.length;
									f++
								)
									n.prototype[u[f]] = h
								e.exports = n
							},
							{
								'./compressedObject': 2,
								'./stream/DataWorker': 27,
								'./stream/GenericWorker': 28,
								'./stream/StreamHelper': 29,
								'./utf8': 31,
							},
						],
						36: [
							function (t, e, n) {
								;(function (t) {
									'use strict'
									var r,
										n,
										i = t.MutationObserver || t.WebKitMutationObserver
									if (i) {
										var s = 0,
											o = new i(h),
											a = t.document.createTextNode('')
										o.observe(a, { characterData: !0 }),
											(r = function () {
												a.data = s = ++s % 2
											})
									} else if (t.setImmediate || void 0 === t.MessageChannel)
										r =
											'document' in t && 'onreadystatechange' in t.document.createElement('script')
												? function () {
														var e = t.document.createElement('script')
														;(e.onreadystatechange = function () {
															h(), (e.onreadystatechange = null), e.parentNode.removeChild(e), (e = null)
														}),
															t.document.documentElement.appendChild(e)
												  }
												: function () {
														setTimeout(h, 0)
												  }
									else {
										var l = new t.MessageChannel()
										;(l.port1.onmessage = h),
											(r = function () {
												l.port2.postMessage(0)
											})
									}
									var u = []
									function h() {
										var t, e
										n = !0
										for (var r = u.length; r; ) {
											for (e = u, u = [], t = -1; ++t < r; ) e[t]()
											r = u.length
										}
										n = !1
									}
									e.exports = function (t) {
										1 !== u.push(t) || n || r()
									}
								}.call(
									this,
									void 0 !== r ? r : 'undefined' != typeof self ? self : 'undefined' != typeof window ? window : {}
								))
							},
							{},
						],
						37: [
							function (t, e, r) {
								'use strict'
								var n = t('immediate')
								function i() {}
								var s = {},
									o = ['REJECTED'],
									a = ['FULFILLED'],
									l = ['PENDING']
								function u(t) {
									if ('function' != typeof t) throw new TypeError('resolver must be a function')
									;(this.state = l), (this.queue = []), (this.outcome = void 0), t !== i && c(this, t)
								}
								function h(t, e, r) {
									;(this.promise = t),
										'function' == typeof e && ((this.onFulfilled = e), (this.callFulfilled = this.otherCallFulfilled)),
										'function' == typeof r && ((this.onRejected = r), (this.callRejected = this.otherCallRejected))
								}
								function f(t, e, r) {
									n(function () {
										var n
										try {
											n = e(r)
										} catch (n) {
											return s.reject(t, n)
										}
										n === t ? s.reject(t, new TypeError('Cannot resolve promise with itself')) : s.resolve(t, n)
									})
								}
								function p(t) {
									var e = t && t.then
									if (t && ('object' == typeof t || 'function' == typeof t) && 'function' == typeof e)
										return function () {
											e.apply(t, arguments)
										}
								}
								function c(t, e) {
									var r = !1
									function n(e) {
										r || ((r = !0), s.reject(t, e))
									}
									function i(e) {
										r || ((r = !0), s.resolve(t, e))
									}
									var o = d(function () {
										e(i, n)
									})
									'error' === o.status && n(o.value)
								}
								function d(t, e) {
									var r = {}
									try {
										;(r.value = t(e)), (r.status = 'success')
									} catch (t) {
										;(r.status = 'error'), (r.value = t)
									}
									return r
								}
								;((e.exports = u).prototype.finally = function (t) {
									if ('function' != typeof t) return this
									var e = this.constructor
									return this.then(
										function (r) {
											return e.resolve(t()).then(function () {
												return r
											})
										},
										function (r) {
											return e.resolve(t()).then(function () {
												throw r
											})
										}
									)
								}),
									(u.prototype.catch = function (t) {
										return this.then(null, t)
									}),
									(u.prototype.then = function (t, e) {
										if (('function' != typeof t && this.state === a) || ('function' != typeof e && this.state === o))
											return this
										var r = new this.constructor(i)
										return (
											this.state !== l ? f(r, this.state === a ? t : e, this.outcome) : this.queue.push(new h(r, t, e)),
											r
										)
									}),
									(h.prototype.callFulfilled = function (t) {
										s.resolve(this.promise, t)
									}),
									(h.prototype.otherCallFulfilled = function (t) {
										f(this.promise, this.onFulfilled, t)
									}),
									(h.prototype.callRejected = function (t) {
										s.reject(this.promise, t)
									}),
									(h.prototype.otherCallRejected = function (t) {
										f(this.promise, this.onRejected, t)
									}),
									(s.resolve = function (t, e) {
										var r = d(p, e)
										if ('error' === r.status) return s.reject(t, r.value)
										var n = r.value
										if (n) c(t, n)
										else {
											;(t.state = a), (t.outcome = e)
											for (var i = -1, o = t.queue.length; ++i < o; ) t.queue[i].callFulfilled(e)
										}
										return t
									}),
									(s.reject = function (t, e) {
										;(t.state = o), (t.outcome = e)
										for (var r = -1, n = t.queue.length; ++r < n; ) t.queue[r].callRejected(e)
										return t
									}),
									(u.resolve = function (t) {
										return t instanceof this ? t : s.resolve(new this(i), t)
									}),
									(u.reject = function (t) {
										var e = new this(i)
										return s.reject(e, t)
									}),
									(u.all = function (t) {
										var e = this
										if ('[object Array]' !== Object.prototype.toString.call(t))
											return this.reject(new TypeError('must be an array'))
										var r = t.length,
											n = !1
										if (!r) return this.resolve([])
										for (var o = new Array(r), a = 0, l = -1, u = new this(i); ++l < r; ) h(t[l], l)
										return u
										function h(t, i) {
											e.resolve(t).then(
												function (t) {
													;(o[i] = t), ++a !== r || n || ((n = !0), s.resolve(u, o))
												},
												function (t) {
													n || ((n = !0), s.reject(u, t))
												}
											)
										}
									}),
									(u.race = function (t) {
										if ('[object Array]' !== Object.prototype.toString.call(t))
											return this.reject(new TypeError('must be an array'))
										var e = t.length,
											r = !1
										if (!e) return this.resolve([])
										for (var n, o = -1, a = new this(i); ++o < e; )
											(n = t[o]),
												this.resolve(n).then(
													function (t) {
														r || ((r = !0), s.resolve(a, t))
													},
													function (t) {
														r || ((r = !0), s.reject(a, t))
													}
												)
										return a
									})
							},
							{ immediate: 36 },
						],
						38: [
							function (t, e, r) {
								'use strict'
								var n = {}
								;(0, t('./lib/utils/common').assign)(
									n,
									t('./lib/deflate'),
									t('./lib/inflate'),
									t('./lib/zlib/constants')
								),
									(e.exports = n)
							},
							{ './lib/deflate': 39, './lib/inflate': 40, './lib/utils/common': 41, './lib/zlib/constants': 44 },
						],
						39: [
							function (t, e, r) {
								'use strict'
								var n = t('./zlib/deflate'),
									i = t('./utils/common'),
									s = t('./utils/strings'),
									o = t('./zlib/messages'),
									a = t('./zlib/zstream'),
									l = Object.prototype.toString
								function u(t) {
									if (!(this instanceof u)) return new u(t)
									this.options = i.assign(
										{ level: -1, method: 8, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: 0, to: '' },
										t || {}
									)
									var e = this.options
									e.raw && 0 < e.windowBits
										? (e.windowBits = -e.windowBits)
										: e.gzip && 0 < e.windowBits && e.windowBits < 16 && (e.windowBits += 16),
										(this.err = 0),
										(this.msg = ''),
										(this.ended = !1),
										(this.chunks = []),
										(this.strm = new a()),
										(this.strm.avail_out = 0)
									var r = n.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy)
									if (0 !== r) throw new Error(o[r])
									if ((e.header && n.deflateSetHeader(this.strm, e.header), e.dictionary)) {
										var h
										if (
											((h =
												'string' == typeof e.dictionary
													? s.string2buf(e.dictionary)
													: '[object ArrayBuffer]' === l.call(e.dictionary)
													? new Uint8Array(e.dictionary)
													: e.dictionary),
											0 !== (r = n.deflateSetDictionary(this.strm, h)))
										)
											throw new Error(o[r])
										this._dict_set = !0
									}
								}
								function h(t, e) {
									var r = new u(e)
									if ((r.push(t, !0), r.err)) throw r.msg || o[r.err]
									return r.result
								}
								;(u.prototype.push = function (t, e) {
									var r,
										o,
										a = this.strm,
										u = this.options.chunkSize
									if (this.ended) return !1
									;(o = e === ~~e ? e : !0 === e ? 4 : 0),
										'string' == typeof t
											? (a.input = s.string2buf(t))
											: '[object ArrayBuffer]' === l.call(t)
											? (a.input = new Uint8Array(t))
											: (a.input = t),
										(a.next_in = 0),
										(a.avail_in = a.input.length)
									do {
										if (
											(0 === a.avail_out && ((a.output = new i.Buf8(u)), (a.next_out = 0), (a.avail_out = u)),
											1 !== (r = n.deflate(a, o)) && 0 !== r)
										)
											return this.onEnd(r), !(this.ended = !0)
										;(0 !== a.avail_out && (0 !== a.avail_in || (4 !== o && 2 !== o))) ||
											('string' === this.options.to
												? this.onData(s.buf2binstring(i.shrinkBuf(a.output, a.next_out)))
												: this.onData(i.shrinkBuf(a.output, a.next_out)))
									} while ((0 < a.avail_in || 0 === a.avail_out) && 1 !== r)
									return 4 === o
										? ((r = n.deflateEnd(this.strm)), this.onEnd(r), (this.ended = !0), 0 === r)
										: 2 !== o || (this.onEnd(0), !(a.avail_out = 0))
								}),
									(u.prototype.onData = function (t) {
										this.chunks.push(t)
									}),
									(u.prototype.onEnd = function (t) {
										0 === t &&
											('string' === this.options.to
												? (this.result = this.chunks.join(''))
												: (this.result = i.flattenChunks(this.chunks))),
											(this.chunks = []),
											(this.err = t),
											(this.msg = this.strm.msg)
									}),
									(r.Deflate = u),
									(r.deflate = h),
									(r.deflateRaw = function (t, e) {
										return ((e = e || {}).raw = !0), h(t, e)
									}),
									(r.gzip = function (t, e) {
										return ((e = e || {}).gzip = !0), h(t, e)
									})
							},
							{
								'./utils/common': 41,
								'./utils/strings': 42,
								'./zlib/deflate': 46,
								'./zlib/messages': 51,
								'./zlib/zstream': 53,
							},
						],
						40: [
							function (t, e, r) {
								'use strict'
								var n = t('./zlib/inflate'),
									i = t('./utils/common'),
									s = t('./utils/strings'),
									o = t('./zlib/constants'),
									a = t('./zlib/messages'),
									l = t('./zlib/zstream'),
									u = t('./zlib/gzheader'),
									h = Object.prototype.toString
								function f(t) {
									if (!(this instanceof f)) return new f(t)
									this.options = i.assign({ chunkSize: 16384, windowBits: 0, to: '' }, t || {})
									var e = this.options
									e.raw &&
										0 <= e.windowBits &&
										e.windowBits < 16 &&
										((e.windowBits = -e.windowBits), 0 === e.windowBits && (e.windowBits = -15)),
										!(0 <= e.windowBits && e.windowBits < 16) || (t && t.windowBits) || (e.windowBits += 32),
										15 < e.windowBits && e.windowBits < 48 && 0 == (15 & e.windowBits) && (e.windowBits |= 15),
										(this.err = 0),
										(this.msg = ''),
										(this.ended = !1),
										(this.chunks = []),
										(this.strm = new l()),
										(this.strm.avail_out = 0)
									var r = n.inflateInit2(this.strm, e.windowBits)
									if (r !== o.Z_OK) throw new Error(a[r])
									;(this.header = new u()), n.inflateGetHeader(this.strm, this.header)
								}
								function p(t, e) {
									var r = new f(e)
									if ((r.push(t, !0), r.err)) throw r.msg || a[r.err]
									return r.result
								}
								;(f.prototype.push = function (t, e) {
									var r,
										a,
										l,
										u,
										f,
										p,
										c = this.strm,
										d = this.options.chunkSize,
										m = this.options.dictionary,
										y = !1
									if (this.ended) return !1
									;(a = e === ~~e ? e : !0 === e ? o.Z_FINISH : o.Z_NO_FLUSH),
										'string' == typeof t
											? (c.input = s.binstring2buf(t))
											: '[object ArrayBuffer]' === h.call(t)
											? (c.input = new Uint8Array(t))
											: (c.input = t),
										(c.next_in = 0),
										(c.avail_in = c.input.length)
									do {
										if (
											(0 === c.avail_out && ((c.output = new i.Buf8(d)), (c.next_out = 0), (c.avail_out = d)),
											(r = n.inflate(c, o.Z_NO_FLUSH)) === o.Z_NEED_DICT &&
												m &&
												((p =
													'string' == typeof m
														? s.string2buf(m)
														: '[object ArrayBuffer]' === h.call(m)
														? new Uint8Array(m)
														: m),
												(r = n.inflateSetDictionary(this.strm, p))),
											r === o.Z_BUF_ERROR && !0 === y && ((r = o.Z_OK), (y = !1)),
											r !== o.Z_STREAM_END && r !== o.Z_OK)
										)
											return this.onEnd(r), !(this.ended = !0)
										c.next_out &&
											((0 !== c.avail_out &&
												r !== o.Z_STREAM_END &&
												(0 !== c.avail_in || (a !== o.Z_FINISH && a !== o.Z_SYNC_FLUSH))) ||
												('string' === this.options.to
													? ((l = s.utf8border(c.output, c.next_out)),
													  (u = c.next_out - l),
													  (f = s.buf2string(c.output, l)),
													  (c.next_out = u),
													  (c.avail_out = d - u),
													  u && i.arraySet(c.output, c.output, l, u, 0),
													  this.onData(f))
													: this.onData(i.shrinkBuf(c.output, c.next_out)))),
											0 === c.avail_in && 0 === c.avail_out && (y = !0)
									} while ((0 < c.avail_in || 0 === c.avail_out) && r !== o.Z_STREAM_END)
									return (
										r === o.Z_STREAM_END && (a = o.Z_FINISH),
										a === o.Z_FINISH
											? ((r = n.inflateEnd(this.strm)), this.onEnd(r), (this.ended = !0), r === o.Z_OK)
											: a !== o.Z_SYNC_FLUSH || (this.onEnd(o.Z_OK), !(c.avail_out = 0))
									)
								}),
									(f.prototype.onData = function (t) {
										this.chunks.push(t)
									}),
									(f.prototype.onEnd = function (t) {
										t === o.Z_OK &&
											('string' === this.options.to
												? (this.result = this.chunks.join(''))
												: (this.result = i.flattenChunks(this.chunks))),
											(this.chunks = []),
											(this.err = t),
											(this.msg = this.strm.msg)
									}),
									(r.Inflate = f),
									(r.inflate = p),
									(r.inflateRaw = function (t, e) {
										return ((e = e || {}).raw = !0), p(t, e)
									}),
									(r.ungzip = p)
							},
							{
								'./utils/common': 41,
								'./utils/strings': 42,
								'./zlib/constants': 44,
								'./zlib/gzheader': 47,
								'./zlib/inflate': 49,
								'./zlib/messages': 51,
								'./zlib/zstream': 53,
							},
						],
						41: [
							function (t, e, r) {
								'use strict'
								var n =
									'undefined' != typeof Uint8Array &&
									'undefined' != typeof Uint16Array &&
									'undefined' != typeof Int32Array
								;(r.assign = function (t) {
									for (var e = Array.prototype.slice.call(arguments, 1); e.length; ) {
										var r = e.shift()
										if (r) {
											if ('object' != typeof r) throw new TypeError(r + 'must be non-object')
											for (var n in r) r.hasOwnProperty(n) && (t[n] = r[n])
										}
									}
									return t
								}),
									(r.shrinkBuf = function (t, e) {
										return t.length === e ? t : t.subarray ? t.subarray(0, e) : ((t.length = e), t)
									})
								var i = {
										arraySet: function (t, e, r, n, i) {
											if (e.subarray && t.subarray) t.set(e.subarray(r, r + n), i)
											else for (var s = 0; s < n; s++) t[i + s] = e[r + s]
										},
										flattenChunks: function (t) {
											var e, r, n, i, s, o
											for (e = n = 0, r = t.length; e < r; e++) n += t[e].length
											for (o = new Uint8Array(n), e = i = 0, r = t.length; e < r; e++)
												(s = t[e]), o.set(s, i), (i += s.length)
											return o
										},
									},
									s = {
										arraySet: function (t, e, r, n, i) {
											for (var s = 0; s < n; s++) t[i + s] = e[r + s]
										},
										flattenChunks: function (t) {
											return [].concat.apply([], t)
										},
									}
								;(r.setTyped = function (t) {
									t
										? ((r.Buf8 = Uint8Array), (r.Buf16 = Uint16Array), (r.Buf32 = Int32Array), r.assign(r, i))
										: ((r.Buf8 = Array), (r.Buf16 = Array), (r.Buf32 = Array), r.assign(r, s))
								}),
									r.setTyped(n)
							},
							{},
						],
						42: [
							function (t, e, r) {
								'use strict'
								var n = t('./common'),
									i = !0,
									s = !0
								try {
									String.fromCharCode.apply(null, [0])
								} catch (t) {
									i = !1
								}
								try {
									String.fromCharCode.apply(null, new Uint8Array(1))
								} catch (t) {
									s = !1
								}
								for (var o = new n.Buf8(256), a = 0; a < 256; a++)
									o[a] = 252 <= a ? 6 : 248 <= a ? 5 : 240 <= a ? 4 : 224 <= a ? 3 : 192 <= a ? 2 : 1
								function l(t, e) {
									if (e < 65537 && ((t.subarray && s) || (!t.subarray && i)))
										return String.fromCharCode.apply(null, n.shrinkBuf(t, e))
									for (var r = '', o = 0; o < e; o++) r += String.fromCharCode(t[o])
									return r
								}
								;(o[254] = o[254] = 1),
									(r.string2buf = function (t) {
										var e,
											r,
											i,
											s,
											o,
											a = t.length,
											l = 0
										for (s = 0; s < a; s++)
											55296 == (64512 & (r = t.charCodeAt(s))) &&
												s + 1 < a &&
												56320 == (64512 & (i = t.charCodeAt(s + 1))) &&
												((r = 65536 + ((r - 55296) << 10) + (i - 56320)), s++),
												(l += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4)
										for (e = new n.Buf8(l), s = o = 0; o < l; s++)
											55296 == (64512 & (r = t.charCodeAt(s))) &&
												s + 1 < a &&
												56320 == (64512 & (i = t.charCodeAt(s + 1))) &&
												((r = 65536 + ((r - 55296) << 10) + (i - 56320)), s++),
												r < 128
													? (e[o++] = r)
													: (r < 2048
															? (e[o++] = 192 | (r >>> 6))
															: (r < 65536
																	? (e[o++] = 224 | (r >>> 12))
																	: ((e[o++] = 240 | (r >>> 18)), (e[o++] = 128 | ((r >>> 12) & 63))),
															  (e[o++] = 128 | ((r >>> 6) & 63))),
													  (e[o++] = 128 | (63 & r)))
										return e
									}),
									(r.buf2binstring = function (t) {
										return l(t, t.length)
									}),
									(r.binstring2buf = function (t) {
										for (var e = new n.Buf8(t.length), r = 0, i = e.length; r < i; r++) e[r] = t.charCodeAt(r)
										return e
									}),
									(r.buf2string = function (t, e) {
										var r,
											n,
											i,
											s,
											a = e || t.length,
											u = new Array(2 * a)
										for (r = n = 0; r < a; )
											if ((i = t[r++]) < 128) u[n++] = i
											else if (4 < (s = o[i])) (u[n++] = 65533), (r += s - 1)
											else {
												for (i &= 2 === s ? 31 : 3 === s ? 15 : 7; 1 < s && r < a; ) (i = (i << 6) | (63 & t[r++])), s--
												1 < s
													? (u[n++] = 65533)
													: i < 65536
													? (u[n++] = i)
													: ((i -= 65536), (u[n++] = 55296 | ((i >> 10) & 1023)), (u[n++] = 56320 | (1023 & i)))
											}
										return l(u, n)
									}),
									(r.utf8border = function (t, e) {
										var r
										for ((e = e || t.length) > t.length && (e = t.length), r = e - 1; 0 <= r && 128 == (192 & t[r]); )
											r--
										return r < 0 || 0 === r ? e : r + o[t[r]] > e ? r : e
									})
							},
							{ './common': 41 },
						],
						43: [
							function (t, e, r) {
								'use strict'
								e.exports = function (t, e, r, n) {
									for (var i = (65535 & t) | 0, s = ((t >>> 16) & 65535) | 0, o = 0; 0 !== r; ) {
										for (r -= o = 2e3 < r ? 2e3 : r; (s = (s + (i = (i + e[n++]) | 0)) | 0), --o; );
										;(i %= 65521), (s %= 65521)
									}
									return i | (s << 16) | 0
								}
							},
							{},
						],
						44: [
							function (t, e, r) {
								'use strict'
								e.exports = {
									Z_NO_FLUSH: 0,
									Z_PARTIAL_FLUSH: 1,
									Z_SYNC_FLUSH: 2,
									Z_FULL_FLUSH: 3,
									Z_FINISH: 4,
									Z_BLOCK: 5,
									Z_TREES: 6,
									Z_OK: 0,
									Z_STREAM_END: 1,
									Z_NEED_DICT: 2,
									Z_ERRNO: -1,
									Z_STREAM_ERROR: -2,
									Z_DATA_ERROR: -3,
									Z_BUF_ERROR: -5,
									Z_NO_COMPRESSION: 0,
									Z_BEST_SPEED: 1,
									Z_BEST_COMPRESSION: 9,
									Z_DEFAULT_COMPRESSION: -1,
									Z_FILTERED: 1,
									Z_HUFFMAN_ONLY: 2,
									Z_RLE: 3,
									Z_FIXED: 4,
									Z_DEFAULT_STRATEGY: 0,
									Z_BINARY: 0,
									Z_TEXT: 1,
									Z_UNKNOWN: 2,
									Z_DEFLATED: 8,
								}
							},
							{},
						],
						45: [
							function (t, e, r) {
								'use strict'
								var n = (function () {
									for (var t, e = [], r = 0; r < 256; r++) {
										t = r
										for (var n = 0; n < 8; n++) t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1
										e[r] = t
									}
									return e
								})()
								e.exports = function (t, e, r, i) {
									var s = n,
										o = i + r
									t ^= -1
									for (var a = i; a < o; a++) t = (t >>> 8) ^ s[255 & (t ^ e[a])]
									return -1 ^ t
								}
							},
							{},
						],
						46: [
							function (t, e, r) {
								'use strict'
								var n,
									i = t('../utils/common'),
									s = t('./trees'),
									o = t('./adler32'),
									a = t('./crc32'),
									l = t('./messages'),
									u = -2,
									h = 258,
									f = 262,
									p = 113
								function c(t, e) {
									return (t.msg = l[e]), e
								}
								function d(t) {
									return (t << 1) - (4 < t ? 9 : 0)
								}
								function m(t) {
									for (var e = t.length; 0 <= --e; ) t[e] = 0
								}
								function y(t) {
									var e = t.state,
										r = e.pending
									r > t.avail_out && (r = t.avail_out),
										0 !== r &&
											(i.arraySet(t.output, e.pending_buf, e.pending_out, r, t.next_out),
											(t.next_out += r),
											(e.pending_out += r),
											(t.total_out += r),
											(t.avail_out -= r),
											(e.pending -= r),
											0 === e.pending && (e.pending_out = 0))
								}
								function v(t, e) {
									s._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, e),
										(t.block_start = t.strstart),
										y(t.strm)
								}
								function g(t, e) {
									t.pending_buf[t.pending++] = e
								}
								function _(t, e) {
									;(t.pending_buf[t.pending++] = (e >>> 8) & 255), (t.pending_buf[t.pending++] = 255 & e)
								}
								function x(t, e) {
									var r,
										n,
										i = t.max_chain_length,
										s = t.strstart,
										o = t.prev_length,
										a = t.nice_match,
										l = t.strstart > t.w_size - f ? t.strstart - (t.w_size - f) : 0,
										u = t.window,
										p = t.w_mask,
										c = t.prev,
										d = t.strstart + h,
										m = u[s + o - 1],
										y = u[s + o]
									t.prev_length >= t.good_match && (i >>= 2), a > t.lookahead && (a = t.lookahead)
									do {
										if (u[(r = e) + o] === y && u[r + o - 1] === m && u[r] === u[s] && u[++r] === u[s + 1]) {
											;(s += 2), r++
											do {} while (
												u[++s] === u[++r] &&
												u[++s] === u[++r] &&
												u[++s] === u[++r] &&
												u[++s] === u[++r] &&
												u[++s] === u[++r] &&
												u[++s] === u[++r] &&
												u[++s] === u[++r] &&
												u[++s] === u[++r] &&
												s < d
											)
											if (((n = h - (d - s)), (s = d - h), o < n)) {
												if (((t.match_start = e), a <= (o = n))) break
												;(m = u[s + o - 1]), (y = u[s + o])
											}
										}
									} while ((e = c[e & p]) > l && 0 != --i)
									return o <= t.lookahead ? o : t.lookahead
								}
								function P(t) {
									var e,
										r,
										n,
										s,
										l,
										u,
										h,
										p,
										c,
										d,
										m = t.w_size
									do {
										if (((s = t.window_size - t.lookahead - t.strstart), t.strstart >= m + (m - f))) {
											for (
												i.arraySet(t.window, t.window, m, m, 0),
													t.match_start -= m,
													t.strstart -= m,
													t.block_start -= m,
													e = r = t.hash_size;
												(n = t.head[--e]), (t.head[e] = m <= n ? n - m : 0), --r;

											);
											for (e = r = m; (n = t.prev[--e]), (t.prev[e] = m <= n ? n - m : 0), --r; );
											s += m
										}
										if (0 === t.strm.avail_in) break
										if (
											((u = t.strm),
											(h = t.window),
											(p = t.strstart + t.lookahead),
											(d = void 0),
											(c = s) < (d = u.avail_in) && (d = c),
											(r =
												0 === d
													? 0
													: ((u.avail_in -= d),
													  i.arraySet(h, u.input, u.next_in, d, p),
													  1 === u.state.wrap
															? (u.adler = o(u.adler, h, d, p))
															: 2 === u.state.wrap && (u.adler = a(u.adler, h, d, p)),
													  (u.next_in += d),
													  (u.total_in += d),
													  d)),
											(t.lookahead += r),
											t.lookahead + t.insert >= 3)
										)
											for (
												l = t.strstart - t.insert,
													t.ins_h = t.window[l],
													t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[l + 1]) & t.hash_mask;
												t.insert &&
												((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[l + 3 - 1]) & t.hash_mask),
												(t.prev[l & t.w_mask] = t.head[t.ins_h]),
												(t.head[t.ins_h] = l),
												l++,
												t.insert--,
												!(t.lookahead + t.insert < 3));

											);
									} while (t.lookahead < f && 0 !== t.strm.avail_in)
								}
								function b(t, e) {
									for (var r, n; ; ) {
										if (t.lookahead < f) {
											if ((P(t), t.lookahead < f && 0 === e)) return 1
											if (0 === t.lookahead) break
										}
										if (
											((r = 0),
											t.lookahead >= 3 &&
												((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 3 - 1]) & t.hash_mask),
												(r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
												(t.head[t.ins_h] = t.strstart)),
											0 !== r && t.strstart - r <= t.w_size - f && (t.match_length = x(t, r)),
											t.match_length >= 3)
										)
											if (
												((n = s._tr_tally(t, t.strstart - t.match_start, t.match_length - 3)),
												(t.lookahead -= t.match_length),
												t.match_length <= t.max_lazy_match && t.lookahead >= 3)
											) {
												for (
													t.match_length--;
													t.strstart++,
														(t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 3 - 1]) & t.hash_mask),
														(r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
														(t.head[t.ins_h] = t.strstart),
														0 != --t.match_length;

												);
												t.strstart++
											} else
												(t.strstart += t.match_length),
													(t.match_length = 0),
													(t.ins_h = t.window[t.strstart]),
													(t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 1]) & t.hash_mask)
										else (n = s._tr_tally(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++
										if (n && (v(t, !1), 0 === t.strm.avail_out)) return 1
									}
									return (
										(t.insert = t.strstart < 2 ? t.strstart : 2),
										4 === e
											? (v(t, !0), 0 === t.strm.avail_out ? 3 : 4)
											: t.last_lit && (v(t, !1), 0 === t.strm.avail_out)
											? 1
											: 2
									)
								}
								function C(t, e) {
									for (var r, n, i; ; ) {
										if (t.lookahead < f) {
											if ((P(t), t.lookahead < f && 0 === e)) return 1
											if (0 === t.lookahead) break
										}
										if (
											((r = 0),
											t.lookahead >= 3 &&
												((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 3 - 1]) & t.hash_mask),
												(r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
												(t.head[t.ins_h] = t.strstart)),
											(t.prev_length = t.match_length),
											(t.prev_match = t.match_start),
											(t.match_length = 2),
											0 !== r &&
												t.prev_length < t.max_lazy_match &&
												t.strstart - r <= t.w_size - f &&
												((t.match_length = x(t, r)),
												t.match_length <= 5 &&
													(1 === t.strategy || (3 === t.match_length && 4096 < t.strstart - t.match_start)) &&
													(t.match_length = 2)),
											t.prev_length >= 3 && t.match_length <= t.prev_length)
										) {
											for (
												i = t.strstart + t.lookahead - 3,
													n = s._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - 3),
													t.lookahead -= t.prev_length - 1,
													t.prev_length -= 2;
												++t.strstart <= i &&
													((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 3 - 1]) & t.hash_mask),
													(r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
													(t.head[t.ins_h] = t.strstart)),
													0 != --t.prev_length;

											);
											if (
												((t.match_available = 0),
												(t.match_length = 2),
												t.strstart++,
												n && (v(t, !1), 0 === t.strm.avail_out))
											)
												return 1
										} else if (t.match_available) {
											if (
												((n = s._tr_tally(t, 0, t.window[t.strstart - 1])) && v(t, !1),
												t.strstart++,
												t.lookahead--,
												0 === t.strm.avail_out)
											)
												return 1
										} else (t.match_available = 1), t.strstart++, t.lookahead--
									}
									return (
										t.match_available && ((n = s._tr_tally(t, 0, t.window[t.strstart - 1])), (t.match_available = 0)),
										(t.insert = t.strstart < 2 ? t.strstart : 2),
										4 === e
											? (v(t, !0), 0 === t.strm.avail_out ? 3 : 4)
											: t.last_lit && (v(t, !1), 0 === t.strm.avail_out)
											? 1
											: 2
									)
								}
								function w(t, e, r, n, i) {
									;(this.good_length = t),
										(this.max_lazy = e),
										(this.nice_length = r),
										(this.max_chain = n),
										(this.func = i)
								}
								function E() {
									;(this.strm = null),
										(this.status = 0),
										(this.pending_buf = null),
										(this.pending_buf_size = 0),
										(this.pending_out = 0),
										(this.pending = 0),
										(this.wrap = 0),
										(this.gzhead = null),
										(this.gzindex = 0),
										(this.method = 8),
										(this.last_flush = -1),
										(this.w_size = 0),
										(this.w_bits = 0),
										(this.w_mask = 0),
										(this.window = null),
										(this.window_size = 0),
										(this.prev = null),
										(this.head = null),
										(this.ins_h = 0),
										(this.hash_size = 0),
										(this.hash_bits = 0),
										(this.hash_mask = 0),
										(this.hash_shift = 0),
										(this.block_start = 0),
										(this.match_length = 0),
										(this.prev_match = 0),
										(this.match_available = 0),
										(this.strstart = 0),
										(this.match_start = 0),
										(this.lookahead = 0),
										(this.prev_length = 0),
										(this.max_chain_length = 0),
										(this.max_lazy_match = 0),
										(this.level = 0),
										(this.strategy = 0),
										(this.good_match = 0),
										(this.nice_match = 0),
										(this.dyn_ltree = new i.Buf16(1146)),
										(this.dyn_dtree = new i.Buf16(122)),
										(this.bl_tree = new i.Buf16(78)),
										m(this.dyn_ltree),
										m(this.dyn_dtree),
										m(this.bl_tree),
										(this.l_desc = null),
										(this.d_desc = null),
										(this.bl_desc = null),
										(this.bl_count = new i.Buf16(16)),
										(this.heap = new i.Buf16(573)),
										m(this.heap),
										(this.heap_len = 0),
										(this.heap_max = 0),
										(this.depth = new i.Buf16(573)),
										m(this.depth),
										(this.l_buf = 0),
										(this.lit_bufsize = 0),
										(this.last_lit = 0),
										(this.d_buf = 0),
										(this.opt_len = 0),
										(this.static_len = 0),
										(this.matches = 0),
										(this.insert = 0),
										(this.bi_buf = 0),
										(this.bi_valid = 0)
								}
								function I(t) {
									var e
									return t && t.state
										? ((t.total_in = t.total_out = 0),
										  (t.data_type = 2),
										  ((e = t.state).pending = 0),
										  (e.pending_out = 0),
										  e.wrap < 0 && (e.wrap = -e.wrap),
										  (e.status = e.wrap ? 42 : p),
										  (t.adler = 2 === e.wrap ? 0 : 1),
										  (e.last_flush = 0),
										  s._tr_init(e),
										  0)
										: c(t, u)
								}
								function A(t) {
									var e = I(t)
									return (
										0 === e &&
											(function (t) {
												;(t.window_size = 2 * t.w_size),
													m(t.head),
													(t.max_lazy_match = n[t.level].max_lazy),
													(t.good_match = n[t.level].good_length),
													(t.nice_match = n[t.level].nice_length),
													(t.max_chain_length = n[t.level].max_chain),
													(t.strstart = 0),
													(t.block_start = 0),
													(t.lookahead = 0),
													(t.insert = 0),
													(t.match_length = t.prev_length = 2),
													(t.match_available = 0),
													(t.ins_h = 0)
											})(t.state),
										e
									)
								}
								function S(t, e, r, n, s, o) {
									if (!t) return u
									var a = 1
									if (
										(-1 === e && (e = 6),
										n < 0 ? ((a = 0), (n = -n)) : 15 < n && ((a = 2), (n -= 16)),
										s < 1 || 9 < s || 8 !== r || n < 8 || 15 < n || e < 0 || 9 < e || o < 0 || 4 < o)
									)
										return c(t, u)
									8 === n && (n = 9)
									var l = new E()
									return (
										((t.state = l).strm = t),
										(l.wrap = a),
										(l.gzhead = null),
										(l.w_bits = n),
										(l.w_size = 1 << l.w_bits),
										(l.w_mask = l.w_size - 1),
										(l.hash_bits = s + 7),
										(l.hash_size = 1 << l.hash_bits),
										(l.hash_mask = l.hash_size - 1),
										(l.hash_shift = ~~((l.hash_bits + 3 - 1) / 3)),
										(l.window = new i.Buf8(2 * l.w_size)),
										(l.head = new i.Buf16(l.hash_size)),
										(l.prev = new i.Buf16(l.w_size)),
										(l.lit_bufsize = 1 << (s + 6)),
										(l.pending_buf_size = 4 * l.lit_bufsize),
										(l.pending_buf = new i.Buf8(l.pending_buf_size)),
										(l.d_buf = 1 * l.lit_bufsize),
										(l.l_buf = 3 * l.lit_bufsize),
										(l.level = e),
										(l.strategy = o),
										(l.method = r),
										A(t)
									)
								}
								;(n = [
									new w(0, 0, 0, 0, function (t, e) {
										var r = 65535
										for (r > t.pending_buf_size - 5 && (r = t.pending_buf_size - 5); ; ) {
											if (t.lookahead <= 1) {
												if ((P(t), 0 === t.lookahead && 0 === e)) return 1
												if (0 === t.lookahead) break
											}
											;(t.strstart += t.lookahead), (t.lookahead = 0)
											var n = t.block_start + r
											if (
												(0 === t.strstart || t.strstart >= n) &&
												((t.lookahead = t.strstart - n), (t.strstart = n), v(t, !1), 0 === t.strm.avail_out)
											)
												return 1
											if (t.strstart - t.block_start >= t.w_size - f && (v(t, !1), 0 === t.strm.avail_out)) return 1
										}
										return (
											(t.insert = 0),
											4 === e
												? (v(t, !0), 0 === t.strm.avail_out ? 3 : 4)
												: (t.strstart > t.block_start && (v(t, !1), t.strm.avail_out), 1)
										)
									}),
									new w(4, 4, 8, 4, b),
									new w(4, 5, 16, 8, b),
									new w(4, 6, 32, 32, b),
									new w(4, 4, 16, 16, C),
									new w(8, 16, 32, 32, C),
									new w(8, 16, 128, 128, C),
									new w(8, 32, 128, 256, C),
									new w(32, 128, 258, 1024, C),
									new w(32, 258, 258, 4096, C),
								]),
									(r.deflateInit = function (t, e) {
										return S(t, e, 8, 15, 8, 0)
									}),
									(r.deflateInit2 = S),
									(r.deflateReset = A),
									(r.deflateResetKeep = I),
									(r.deflateSetHeader = function (t, e) {
										return t && t.state ? (2 !== t.state.wrap ? u : ((t.state.gzhead = e), 0)) : u
									}),
									(r.deflate = function (t, e) {
										var r, i, o, l
										if (!t || !t.state || 5 < e || e < 0) return t ? c(t, u) : u
										if (((i = t.state), !t.output || (!t.input && 0 !== t.avail_in) || (666 === i.status && 4 !== e)))
											return c(t, 0 === t.avail_out ? -5 : u)
										if (((i.strm = t), (r = i.last_flush), (i.last_flush = e), 42 === i.status))
											if (2 === i.wrap)
												(t.adler = 0),
													g(i, 31),
													g(i, 139),
													g(i, 8),
													i.gzhead
														? (g(
																i,
																(i.gzhead.text ? 1 : 0) +
																	(i.gzhead.hcrc ? 2 : 0) +
																	(i.gzhead.extra ? 4 : 0) +
																	(i.gzhead.name ? 8 : 0) +
																	(i.gzhead.comment ? 16 : 0)
														  ),
														  g(i, 255 & i.gzhead.time),
														  g(i, (i.gzhead.time >> 8) & 255),
														  g(i, (i.gzhead.time >> 16) & 255),
														  g(i, (i.gzhead.time >> 24) & 255),
														  g(i, 9 === i.level ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0),
														  g(i, 255 & i.gzhead.os),
														  i.gzhead.extra &&
																i.gzhead.extra.length &&
																(g(i, 255 & i.gzhead.extra.length), g(i, (i.gzhead.extra.length >> 8) & 255)),
														  i.gzhead.hcrc && (t.adler = a(t.adler, i.pending_buf, i.pending, 0)),
														  (i.gzindex = 0),
														  (i.status = 69))
														: (g(i, 0),
														  g(i, 0),
														  g(i, 0),
														  g(i, 0),
														  g(i, 0),
														  g(i, 9 === i.level ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0),
														  g(i, 3),
														  (i.status = p))
											else {
												var f = (8 + ((i.w_bits - 8) << 4)) << 8
												;(f |= (2 <= i.strategy || i.level < 2 ? 0 : i.level < 6 ? 1 : 6 === i.level ? 2 : 3) << 6),
													0 !== i.strstart && (f |= 32),
													(f += 31 - (f % 31)),
													(i.status = p),
													_(i, f),
													0 !== i.strstart && (_(i, t.adler >>> 16), _(i, 65535 & t.adler)),
													(t.adler = 1)
											}
										if (69 === i.status)
											if (i.gzhead.extra) {
												for (
													o = i.pending;
													i.gzindex < (65535 & i.gzhead.extra.length) &&
													(i.pending !== i.pending_buf_size ||
														(i.gzhead.hcrc && i.pending > o && (t.adler = a(t.adler, i.pending_buf, i.pending - o, o)),
														y(t),
														(o = i.pending),
														i.pending !== i.pending_buf_size));

												)
													g(i, 255 & i.gzhead.extra[i.gzindex]), i.gzindex++
												i.gzhead.hcrc && i.pending > o && (t.adler = a(t.adler, i.pending_buf, i.pending - o, o)),
													i.gzindex === i.gzhead.extra.length && ((i.gzindex = 0), (i.status = 73))
											} else i.status = 73
										if (73 === i.status)
											if (i.gzhead.name) {
												o = i.pending
												do {
													if (
														i.pending === i.pending_buf_size &&
														(i.gzhead.hcrc && i.pending > o && (t.adler = a(t.adler, i.pending_buf, i.pending - o, o)),
														y(t),
														(o = i.pending),
														i.pending === i.pending_buf_size)
													) {
														l = 1
														break
													}
													;(l = i.gzindex < i.gzhead.name.length ? 255 & i.gzhead.name.charCodeAt(i.gzindex++) : 0),
														g(i, l)
												} while (0 !== l)
												i.gzhead.hcrc && i.pending > o && (t.adler = a(t.adler, i.pending_buf, i.pending - o, o)),
													0 === l && ((i.gzindex = 0), (i.status = 91))
											} else i.status = 91
										if (91 === i.status)
											if (i.gzhead.comment) {
												o = i.pending
												do {
													if (
														i.pending === i.pending_buf_size &&
														(i.gzhead.hcrc && i.pending > o && (t.adler = a(t.adler, i.pending_buf, i.pending - o, o)),
														y(t),
														(o = i.pending),
														i.pending === i.pending_buf_size)
													) {
														l = 1
														break
													}
													;(l =
														i.gzindex < i.gzhead.comment.length ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++) : 0),
														g(i, l)
												} while (0 !== l)
												i.gzhead.hcrc && i.pending > o && (t.adler = a(t.adler, i.pending_buf, i.pending - o, o)),
													0 === l && (i.status = 103)
											} else i.status = 103
										if (
											(103 === i.status &&
												(i.gzhead.hcrc
													? (i.pending + 2 > i.pending_buf_size && y(t),
													  i.pending + 2 <= i.pending_buf_size &&
															(g(i, 255 & t.adler), g(i, (t.adler >> 8) & 255), (t.adler = 0), (i.status = p)))
													: (i.status = p)),
											0 !== i.pending)
										) {
											if ((y(t), 0 === t.avail_out)) return (i.last_flush = -1), 0
										} else if (0 === t.avail_in && d(e) <= d(r) && 4 !== e) return c(t, -5)
										if (666 === i.status && 0 !== t.avail_in) return c(t, -5)
										if (0 !== t.avail_in || 0 !== i.lookahead || (0 !== e && 666 !== i.status)) {
											var x =
												2 === i.strategy
													? (function (t, e) {
															for (var r; ; ) {
																if (0 === t.lookahead && (P(t), 0 === t.lookahead)) {
																	if (0 === e) return 1
																	break
																}
																if (
																	((t.match_length = 0),
																	(r = s._tr_tally(t, 0, t.window[t.strstart])),
																	t.lookahead--,
																	t.strstart++,
																	r && (v(t, !1), 0 === t.strm.avail_out))
																)
																	return 1
															}
															return (
																(t.insert = 0),
																4 === e
																	? (v(t, !0), 0 === t.strm.avail_out ? 3 : 4)
																	: t.last_lit && (v(t, !1), 0 === t.strm.avail_out)
																	? 1
																	: 2
															)
													  })(i, e)
													: 3 === i.strategy
													? (function (t, e) {
															for (var r, n, i, o, a = t.window; ; ) {
																if (t.lookahead <= h) {
																	if ((P(t), t.lookahead <= h && 0 === e)) return 1
																	if (0 === t.lookahead) break
																}
																if (
																	((t.match_length = 0),
																	t.lookahead >= 3 &&
																		0 < t.strstart &&
																		(n = a[(i = t.strstart - 1)]) === a[++i] &&
																		n === a[++i] &&
																		n === a[++i])
																) {
																	o = t.strstart + h
																	do {} while (
																		n === a[++i] &&
																		n === a[++i] &&
																		n === a[++i] &&
																		n === a[++i] &&
																		n === a[++i] &&
																		n === a[++i] &&
																		n === a[++i] &&
																		n === a[++i] &&
																		i < o
																	)
																	;(t.match_length = h - (o - i)),
																		t.match_length > t.lookahead && (t.match_length = t.lookahead)
																}
																if (
																	(t.match_length >= 3
																		? ((r = s._tr_tally(t, 1, t.match_length - 3)),
																		  (t.lookahead -= t.match_length),
																		  (t.strstart += t.match_length),
																		  (t.match_length = 0))
																		: ((r = s._tr_tally(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++),
																	r && (v(t, !1), 0 === t.strm.avail_out))
																)
																	return 1
															}
															return (
																(t.insert = 0),
																4 === e
																	? (v(t, !0), 0 === t.strm.avail_out ? 3 : 4)
																	: t.last_lit && (v(t, !1), 0 === t.strm.avail_out)
																	? 1
																	: 2
															)
													  })(i, e)
													: n[i.level].func(i, e)
											if (((3 !== x && 4 !== x) || (i.status = 666), 1 === x || 3 === x))
												return 0 === t.avail_out && (i.last_flush = -1), 0
											if (
												2 === x &&
												(1 === e
													? s._tr_align(i)
													: 5 !== e &&
													  (s._tr_stored_block(i, 0, 0, !1),
													  3 === e &&
															(m(i.head),
															0 === i.lookahead && ((i.strstart = 0), (i.block_start = 0), (i.insert = 0)))),
												y(t),
												0 === t.avail_out)
											)
												return (i.last_flush = -1), 0
										}
										return 4 !== e
											? 0
											: i.wrap <= 0
											? 1
											: (2 === i.wrap
													? (g(i, 255 & t.adler),
													  g(i, (t.adler >> 8) & 255),
													  g(i, (t.adler >> 16) & 255),
													  g(i, (t.adler >> 24) & 255),
													  g(i, 255 & t.total_in),
													  g(i, (t.total_in >> 8) & 255),
													  g(i, (t.total_in >> 16) & 255),
													  g(i, (t.total_in >> 24) & 255))
													: (_(i, t.adler >>> 16), _(i, 65535 & t.adler)),
											  y(t),
											  0 < i.wrap && (i.wrap = -i.wrap),
											  0 !== i.pending ? 0 : 1)
									}),
									(r.deflateEnd = function (t) {
										var e
										return t && t.state
											? 42 !== (e = t.state.status) &&
											  69 !== e &&
											  73 !== e &&
											  91 !== e &&
											  103 !== e &&
											  e !== p &&
											  666 !== e
												? c(t, u)
												: ((t.state = null), e === p ? c(t, -3) : 0)
											: u
									}),
									(r.deflateSetDictionary = function (t, e) {
										var r,
											n,
											s,
											a,
											l,
											h,
											f,
											p,
											c = e.length
										if (!t || !t.state) return u
										if (2 === (a = (r = t.state).wrap) || (1 === a && 42 !== r.status) || r.lookahead) return u
										for (
											1 === a && (t.adler = o(t.adler, e, c, 0)),
												r.wrap = 0,
												c >= r.w_size &&
													(0 === a && (m(r.head), (r.strstart = 0), (r.block_start = 0), (r.insert = 0)),
													(p = new i.Buf8(r.w_size)),
													i.arraySet(p, e, c - r.w_size, r.w_size, 0),
													(e = p),
													(c = r.w_size)),
												l = t.avail_in,
												h = t.next_in,
												f = t.input,
												t.avail_in = c,
												t.next_in = 0,
												t.input = e,
												P(r);
											r.lookahead >= 3;

										) {
											for (
												n = r.strstart, s = r.lookahead - 2;
												(r.ins_h = ((r.ins_h << r.hash_shift) ^ r.window[n + 3 - 1]) & r.hash_mask),
													(r.prev[n & r.w_mask] = r.head[r.ins_h]),
													(r.head[r.ins_h] = n),
													n++,
													--s;

											);
											;(r.strstart = n), (r.lookahead = 2), P(r)
										}
										return (
											(r.strstart += r.lookahead),
											(r.block_start = r.strstart),
											(r.insert = r.lookahead),
											(r.lookahead = 0),
											(r.match_length = r.prev_length = 2),
											(r.match_available = 0),
											(t.next_in = h),
											(t.input = f),
											(t.avail_in = l),
											(r.wrap = a),
											0
										)
									}),
									(r.deflateInfo = 'pako deflate (from Nodeca project)')
							},
							{ '../utils/common': 41, './adler32': 43, './crc32': 45, './messages': 51, './trees': 52 },
						],
						47: [
							function (t, e, r) {
								'use strict'
								e.exports = function () {
									;(this.text = 0),
										(this.time = 0),
										(this.xflags = 0),
										(this.os = 0),
										(this.extra = null),
										(this.extra_len = 0),
										(this.name = ''),
										(this.comment = ''),
										(this.hcrc = 0),
										(this.done = !1)
								}
							},
							{},
						],
						48: [
							function (t, e, r) {
								'use strict'
								e.exports = function (t, e) {
									var r, n, i, s, o, a, l, u, h, f, p, c, d, m, y, v, g, _, x, P, b, C, w, E, I
									;(r = t.state),
										(n = t.next_in),
										(E = t.input),
										(i = n + (t.avail_in - 5)),
										(s = t.next_out),
										(I = t.output),
										(o = s - (e - t.avail_out)),
										(a = s + (t.avail_out - 257)),
										(l = r.dmax),
										(u = r.wsize),
										(h = r.whave),
										(f = r.wnext),
										(p = r.window),
										(c = r.hold),
										(d = r.bits),
										(m = r.lencode),
										(y = r.distcode),
										(v = (1 << r.lenbits) - 1),
										(g = (1 << r.distbits) - 1)
									t: do {
										d < 15 && ((c += E[n++] << d), (d += 8), (c += E[n++] << d), (d += 8)), (_ = m[c & v])
										e: for (;;) {
											if (((c >>>= x = _ >>> 24), (d -= x), 0 == (x = (_ >>> 16) & 255))) I[s++] = 65535 & _
											else {
												if (!(16 & x)) {
													if (0 == (64 & x)) {
														_ = m[(65535 & _) + (c & ((1 << x) - 1))]
														continue e
													}
													if (32 & x) {
														r.mode = 12
														break t
													}
													;(t.msg = 'invalid literal/length code'), (r.mode = 30)
													break t
												}
												;(P = 65535 & _),
													(x &= 15) &&
														(d < x && ((c += E[n++] << d), (d += 8)), (P += c & ((1 << x) - 1)), (c >>>= x), (d -= x)),
													d < 15 && ((c += E[n++] << d), (d += 8), (c += E[n++] << d), (d += 8)),
													(_ = y[c & g])
												r: for (;;) {
													if (((c >>>= x = _ >>> 24), (d -= x), !(16 & (x = (_ >>> 16) & 255)))) {
														if (0 == (64 & x)) {
															_ = y[(65535 & _) + (c & ((1 << x) - 1))]
															continue r
														}
														;(t.msg = 'invalid distance code'), (r.mode = 30)
														break t
													}
													if (
														((b = 65535 & _),
														d < (x &= 15) && ((c += E[n++] << d), (d += 8) < x && ((c += E[n++] << d), (d += 8))),
														l < (b += c & ((1 << x) - 1)))
													) {
														;(t.msg = 'invalid distance too far back'), (r.mode = 30)
														break t
													}
													if (((c >>>= x), (d -= x), (x = s - o) < b)) {
														if (h < (x = b - x) && r.sane) {
															;(t.msg = 'invalid distance too far back'), (r.mode = 30)
															break t
														}
														if (((w = p), (C = 0) === f)) {
															if (((C += u - x), x < P)) {
																for (P -= x; (I[s++] = p[C++]), --x; );
																;(C = s - b), (w = I)
															}
														} else if (f < x) {
															if (((C += u + f - x), (x -= f) < P)) {
																for (P -= x; (I[s++] = p[C++]), --x; );
																if (((C = 0), f < P)) {
																	for (P -= x = f; (I[s++] = p[C++]), --x; );
																	;(C = s - b), (w = I)
																}
															}
														} else if (((C += f - x), x < P)) {
															for (P -= x; (I[s++] = p[C++]), --x; );
															;(C = s - b), (w = I)
														}
														for (; 2 < P; ) (I[s++] = w[C++]), (I[s++] = w[C++]), (I[s++] = w[C++]), (P -= 3)
														P && ((I[s++] = w[C++]), 1 < P && (I[s++] = w[C++]))
													} else {
														for (C = s - b; (I[s++] = I[C++]), (I[s++] = I[C++]), (I[s++] = I[C++]), 2 < (P -= 3); );
														P && ((I[s++] = I[C++]), 1 < P && (I[s++] = I[C++]))
													}
													break
												}
											}
											break
										}
									} while (n < i && s < a)
									;(n -= P = d >> 3),
										(c &= (1 << (d -= P << 3)) - 1),
										(t.next_in = n),
										(t.next_out = s),
										(t.avail_in = n < i ? i - n + 5 : 5 - (n - i)),
										(t.avail_out = s < a ? a - s + 257 : 257 - (s - a)),
										(r.hold = c),
										(r.bits = d)
								}
							},
							{},
						],
						49: [
							function (t, e, r) {
								'use strict'
								var n = t('../utils/common'),
									i = t('./adler32'),
									s = t('./crc32'),
									o = t('./inffast'),
									a = t('./inftrees'),
									l = -2
								function u(t) {
									return ((t >>> 24) & 255) + ((t >>> 8) & 65280) + ((65280 & t) << 8) + ((255 & t) << 24)
								}
								function h() {
									;(this.mode = 0),
										(this.last = !1),
										(this.wrap = 0),
										(this.havedict = !1),
										(this.flags = 0),
										(this.dmax = 0),
										(this.check = 0),
										(this.total = 0),
										(this.head = null),
										(this.wbits = 0),
										(this.wsize = 0),
										(this.whave = 0),
										(this.wnext = 0),
										(this.window = null),
										(this.hold = 0),
										(this.bits = 0),
										(this.length = 0),
										(this.offset = 0),
										(this.extra = 0),
										(this.lencode = null),
										(this.distcode = null),
										(this.lenbits = 0),
										(this.distbits = 0),
										(this.ncode = 0),
										(this.nlen = 0),
										(this.ndist = 0),
										(this.have = 0),
										(this.next = null),
										(this.lens = new n.Buf16(320)),
										(this.work = new n.Buf16(288)),
										(this.lendyn = null),
										(this.distdyn = null),
										(this.sane = 0),
										(this.back = 0),
										(this.was = 0)
								}
								function f(t) {
									var e
									return t && t.state
										? ((e = t.state),
										  (t.total_in = t.total_out = e.total = 0),
										  (t.msg = ''),
										  e.wrap && (t.adler = 1 & e.wrap),
										  (e.mode = 1),
										  (e.last = 0),
										  (e.havedict = 0),
										  (e.dmax = 32768),
										  (e.head = null),
										  (e.hold = 0),
										  (e.bits = 0),
										  (e.lencode = e.lendyn = new n.Buf32(852)),
										  (e.distcode = e.distdyn = new n.Buf32(592)),
										  (e.sane = 1),
										  (e.back = -1),
										  0)
										: l
								}
								function p(t) {
									var e
									return t && t.state ? (((e = t.state).wsize = 0), (e.whave = 0), (e.wnext = 0), f(t)) : l
								}
								function c(t, e) {
									var r, n
									return t && t.state
										? ((n = t.state),
										  e < 0 ? ((r = 0), (e = -e)) : ((r = 1 + (e >> 4)), e < 48 && (e &= 15)),
										  e && (e < 8 || 15 < e)
												? l
												: (null !== n.window && n.wbits !== e && (n.window = null), (n.wrap = r), (n.wbits = e), p(t)))
										: l
								}
								function d(t, e) {
									var r, n
									return t
										? ((n = new h()), ((t.state = n).window = null), 0 !== (r = c(t, e)) && (t.state = null), r)
										: l
								}
								var m,
									y,
									v = !0
								function g(t) {
									if (v) {
										var e
										for (m = new n.Buf32(512), y = new n.Buf32(32), e = 0; e < 144; ) t.lens[e++] = 8
										for (; e < 256; ) t.lens[e++] = 9
										for (; e < 280; ) t.lens[e++] = 7
										for (; e < 288; ) t.lens[e++] = 8
										for (a(1, t.lens, 0, 288, m, 0, t.work, { bits: 9 }), e = 0; e < 32; ) t.lens[e++] = 5
										a(2, t.lens, 0, 32, y, 0, t.work, { bits: 5 }), (v = !1)
									}
									;(t.lencode = m), (t.lenbits = 9), (t.distcode = y), (t.distbits = 5)
								}
								function _(t, e, r, i) {
									var s,
										o = t.state
									return (
										null === o.window &&
											((o.wsize = 1 << o.wbits), (o.wnext = 0), (o.whave = 0), (o.window = new n.Buf8(o.wsize))),
										i >= o.wsize
											? (n.arraySet(o.window, e, r - o.wsize, o.wsize, 0), (o.wnext = 0), (o.whave = o.wsize))
											: (i < (s = o.wsize - o.wnext) && (s = i),
											  n.arraySet(o.window, e, r - i, s, o.wnext),
											  (i -= s)
													? (n.arraySet(o.window, e, r - i, i, 0), (o.wnext = i), (o.whave = o.wsize))
													: ((o.wnext += s),
													  o.wnext === o.wsize && (o.wnext = 0),
													  o.whave < o.wsize && (o.whave += s))),
										0
									)
								}
								;(r.inflateReset = p),
									(r.inflateReset2 = c),
									(r.inflateResetKeep = f),
									(r.inflateInit = function (t) {
										return d(t, 15)
									}),
									(r.inflateInit2 = d),
									(r.inflate = function (t, e) {
										var r,
											h,
											f,
											p,
											c,
											d,
											m,
											y,
											v,
											x,
											P,
											b,
											C,
											w,
											E,
											I,
											A,
											S,
											T,
											k,
											O,
											L,
											B,
											F,
											N = 0,
											D = new n.Buf8(4),
											Y = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
										if (!t || !t.state || !t.output || (!t.input && 0 !== t.avail_in)) return l
										12 === (r = t.state).mode && (r.mode = 13),
											(c = t.next_out),
											(f = t.output),
											(m = t.avail_out),
											(p = t.next_in),
											(h = t.input),
											(d = t.avail_in),
											(y = r.hold),
											(v = r.bits),
											(x = d),
											(P = m),
											(L = 0)
										t: for (;;)
											switch (r.mode) {
												case 1:
													if (0 === r.wrap) {
														r.mode = 13
														break
													}
													for (; v < 16; ) {
														if (0 === d) break t
														d--, (y += h[p++] << v), (v += 8)
													}
													if (2 & r.wrap && 35615 === y) {
														;(D[(r.check = 0)] = 255 & y),
															(D[1] = (y >>> 8) & 255),
															(r.check = s(r.check, D, 2, 0)),
															(v = y = 0),
															(r.mode = 2)
														break
													}
													if (
														((r.flags = 0),
														r.head && (r.head.done = !1),
														!(1 & r.wrap) || (((255 & y) << 8) + (y >> 8)) % 31)
													) {
														;(t.msg = 'incorrect header check'), (r.mode = 30)
														break
													}
													if (8 != (15 & y)) {
														;(t.msg = 'unknown compression method'), (r.mode = 30)
														break
													}
													if (((v -= 4), (O = 8 + (15 & (y >>>= 4))), 0 === r.wbits)) r.wbits = O
													else if (O > r.wbits) {
														;(t.msg = 'invalid window size'), (r.mode = 30)
														break
													}
													;(r.dmax = 1 << O), (t.adler = r.check = 1), (r.mode = 512 & y ? 10 : 12), (v = y = 0)
													break
												case 2:
													for (; v < 16; ) {
														if (0 === d) break t
														d--, (y += h[p++] << v), (v += 8)
													}
													if (((r.flags = y), 8 != (255 & r.flags))) {
														;(t.msg = 'unknown compression method'), (r.mode = 30)
														break
													}
													if (57344 & r.flags) {
														;(t.msg = 'unknown header flags set'), (r.mode = 30)
														break
													}
													r.head && (r.head.text = (y >> 8) & 1),
														512 & r.flags &&
															((D[0] = 255 & y), (D[1] = (y >>> 8) & 255), (r.check = s(r.check, D, 2, 0))),
														(v = y = 0),
														(r.mode = 3)
												case 3:
													for (; v < 32; ) {
														if (0 === d) break t
														d--, (y += h[p++] << v), (v += 8)
													}
													r.head && (r.head.time = y),
														512 & r.flags &&
															((D[0] = 255 & y),
															(D[1] = (y >>> 8) & 255),
															(D[2] = (y >>> 16) & 255),
															(D[3] = (y >>> 24) & 255),
															(r.check = s(r.check, D, 4, 0))),
														(v = y = 0),
														(r.mode = 4)
												case 4:
													for (; v < 16; ) {
														if (0 === d) break t
														d--, (y += h[p++] << v), (v += 8)
													}
													r.head && ((r.head.xflags = 255 & y), (r.head.os = y >> 8)),
														512 & r.flags &&
															((D[0] = 255 & y), (D[1] = (y >>> 8) & 255), (r.check = s(r.check, D, 2, 0))),
														(v = y = 0),
														(r.mode = 5)
												case 5:
													if (1024 & r.flags) {
														for (; v < 16; ) {
															if (0 === d) break t
															d--, (y += h[p++] << v), (v += 8)
														}
														;(r.length = y),
															r.head && (r.head.extra_len = y),
															512 & r.flags &&
																((D[0] = 255 & y), (D[1] = (y >>> 8) & 255), (r.check = s(r.check, D, 2, 0))),
															(v = y = 0)
													} else r.head && (r.head.extra = null)
													r.mode = 6
												case 6:
													if (
														1024 & r.flags &&
														(d < (b = r.length) && (b = d),
														b &&
															(r.head &&
																((O = r.head.extra_len - r.length),
																r.head.extra || (r.head.extra = new Array(r.head.extra_len)),
																n.arraySet(r.head.extra, h, p, b, O)),
															512 & r.flags && (r.check = s(r.check, h, b, p)),
															(d -= b),
															(p += b),
															(r.length -= b)),
														r.length)
													)
														break t
													;(r.length = 0), (r.mode = 7)
												case 7:
													if (2048 & r.flags) {
														if (0 === d) break t
														for (
															b = 0;
															(O = h[p + b++]),
																r.head && O && r.length < 65536 && (r.head.name += String.fromCharCode(O)),
																O && b < d;

														);
														if ((512 & r.flags && (r.check = s(r.check, h, b, p)), (d -= b), (p += b), O)) break t
													} else r.head && (r.head.name = null)
													;(r.length = 0), (r.mode = 8)
												case 8:
													if (4096 & r.flags) {
														if (0 === d) break t
														for (
															b = 0;
															(O = h[p + b++]),
																r.head && O && r.length < 65536 && (r.head.comment += String.fromCharCode(O)),
																O && b < d;

														);
														if ((512 & r.flags && (r.check = s(r.check, h, b, p)), (d -= b), (p += b), O)) break t
													} else r.head && (r.head.comment = null)
													r.mode = 9
												case 9:
													if (512 & r.flags) {
														for (; v < 16; ) {
															if (0 === d) break t
															d--, (y += h[p++] << v), (v += 8)
														}
														if (y !== (65535 & r.check)) {
															;(t.msg = 'header crc mismatch'), (r.mode = 30)
															break
														}
														v = y = 0
													}
													r.head && ((r.head.hcrc = (r.flags >> 9) & 1), (r.head.done = !0)),
														(t.adler = r.check = 0),
														(r.mode = 12)
													break
												case 10:
													for (; v < 32; ) {
														if (0 === d) break t
														d--, (y += h[p++] << v), (v += 8)
													}
													;(t.adler = r.check = u(y)), (v = y = 0), (r.mode = 11)
												case 11:
													if (0 === r.havedict)
														return (
															(t.next_out = c),
															(t.avail_out = m),
															(t.next_in = p),
															(t.avail_in = d),
															(r.hold = y),
															(r.bits = v),
															2
														)
													;(t.adler = r.check = 1), (r.mode = 12)
												case 12:
													if (5 === e || 6 === e) break t
												case 13:
													if (r.last) {
														;(y >>>= 7 & v), (v -= 7 & v), (r.mode = 27)
														break
													}
													for (; v < 3; ) {
														if (0 === d) break t
														d--, (y += h[p++] << v), (v += 8)
													}
													switch (((r.last = 1 & y), (v -= 1), 3 & (y >>>= 1))) {
														case 0:
															r.mode = 14
															break
														case 1:
															if ((g(r), (r.mode = 20), 6 !== e)) break
															;(y >>>= 2), (v -= 2)
															break t
														case 2:
															r.mode = 17
															break
														case 3:
															;(t.msg = 'invalid block type'), (r.mode = 30)
													}
													;(y >>>= 2), (v -= 2)
													break
												case 14:
													for (y >>>= 7 & v, v -= 7 & v; v < 32; ) {
														if (0 === d) break t
														d--, (y += h[p++] << v), (v += 8)
													}
													if ((65535 & y) != ((y >>> 16) ^ 65535)) {
														;(t.msg = 'invalid stored block lengths'), (r.mode = 30)
														break
													}
													if (((r.length = 65535 & y), (v = y = 0), (r.mode = 15), 6 === e)) break t
												case 15:
													r.mode = 16
												case 16:
													if ((b = r.length)) {
														if ((d < b && (b = d), m < b && (b = m), 0 === b)) break t
														n.arraySet(f, h, p, b, c), (d -= b), (p += b), (m -= b), (c += b), (r.length -= b)
														break
													}
													r.mode = 12
													break
												case 17:
													for (; v < 14; ) {
														if (0 === d) break t
														d--, (y += h[p++] << v), (v += 8)
													}
													if (
														((r.nlen = 257 + (31 & y)),
														(y >>>= 5),
														(v -= 5),
														(r.ndist = 1 + (31 & y)),
														(y >>>= 5),
														(v -= 5),
														(r.ncode = 4 + (15 & y)),
														(y >>>= 4),
														(v -= 4),
														286 < r.nlen || 30 < r.ndist)
													) {
														;(t.msg = 'too many length or distance symbols'), (r.mode = 30)
														break
													}
													;(r.have = 0), (r.mode = 18)
												case 18:
													for (; r.have < r.ncode; ) {
														for (; v < 3; ) {
															if (0 === d) break t
															d--, (y += h[p++] << v), (v += 8)
														}
														;(r.lens[Y[r.have++]] = 7 & y), (y >>>= 3), (v -= 3)
													}
													for (; r.have < 19; ) r.lens[Y[r.have++]] = 0
													if (
														((r.lencode = r.lendyn),
														(r.lenbits = 7),
														(B = { bits: r.lenbits }),
														(L = a(0, r.lens, 0, 19, r.lencode, 0, r.work, B)),
														(r.lenbits = B.bits),
														L)
													) {
														;(t.msg = 'invalid code lengths set'), (r.mode = 30)
														break
													}
													;(r.have = 0), (r.mode = 19)
												case 19:
													for (; r.have < r.nlen + r.ndist; ) {
														for (
															;
															(I = ((N = r.lencode[y & ((1 << r.lenbits) - 1)]) >>> 16) & 255),
																(A = 65535 & N),
																!((E = N >>> 24) <= v);

														) {
															if (0 === d) break t
															d--, (y += h[p++] << v), (v += 8)
														}
														if (A < 16) (y >>>= E), (v -= E), (r.lens[r.have++] = A)
														else {
															if (16 === A) {
																for (F = E + 2; v < F; ) {
																	if (0 === d) break t
																	d--, (y += h[p++] << v), (v += 8)
																}
																if (((y >>>= E), (v -= E), 0 === r.have)) {
																	;(t.msg = 'invalid bit length repeat'), (r.mode = 30)
																	break
																}
																;(O = r.lens[r.have - 1]), (b = 3 + (3 & y)), (y >>>= 2), (v -= 2)
															} else if (17 === A) {
																for (F = E + 3; v < F; ) {
																	if (0 === d) break t
																	d--, (y += h[p++] << v), (v += 8)
																}
																;(v -= E), (O = 0), (b = 3 + (7 & (y >>>= E))), (y >>>= 3), (v -= 3)
															} else {
																for (F = E + 7; v < F; ) {
																	if (0 === d) break t
																	d--, (y += h[p++] << v), (v += 8)
																}
																;(v -= E), (O = 0), (b = 11 + (127 & (y >>>= E))), (y >>>= 7), (v -= 7)
															}
															if (r.have + b > r.nlen + r.ndist) {
																;(t.msg = 'invalid bit length repeat'), (r.mode = 30)
																break
															}
															for (; b--; ) r.lens[r.have++] = O
														}
													}
													if (30 === r.mode) break
													if (0 === r.lens[256]) {
														;(t.msg = 'invalid code -- missing end-of-block'), (r.mode = 30)
														break
													}
													if (
														((r.lenbits = 9),
														(B = { bits: r.lenbits }),
														(L = a(1, r.lens, 0, r.nlen, r.lencode, 0, r.work, B)),
														(r.lenbits = B.bits),
														L)
													) {
														;(t.msg = 'invalid literal/lengths set'), (r.mode = 30)
														break
													}
													if (
														((r.distbits = 6),
														(r.distcode = r.distdyn),
														(B = { bits: r.distbits }),
														(L = a(2, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, B)),
														(r.distbits = B.bits),
														L)
													) {
														;(t.msg = 'invalid distances set'), (r.mode = 30)
														break
													}
													if (((r.mode = 20), 6 === e)) break t
												case 20:
													r.mode = 21
												case 21:
													if (6 <= d && 258 <= m) {
														;(t.next_out = c),
															(t.avail_out = m),
															(t.next_in = p),
															(t.avail_in = d),
															(r.hold = y),
															(r.bits = v),
															o(t, P),
															(c = t.next_out),
															(f = t.output),
															(m = t.avail_out),
															(p = t.next_in),
															(h = t.input),
															(d = t.avail_in),
															(y = r.hold),
															(v = r.bits),
															12 === r.mode && (r.back = -1)
														break
													}
													for (
														r.back = 0;
														(I = ((N = r.lencode[y & ((1 << r.lenbits) - 1)]) >>> 16) & 255),
															(A = 65535 & N),
															!((E = N >>> 24) <= v);

													) {
														if (0 === d) break t
														d--, (y += h[p++] << v), (v += 8)
													}
													if (I && 0 == (240 & I)) {
														for (
															S = E, T = I, k = A;
															(I = ((N = r.lencode[k + ((y & ((1 << (S + T)) - 1)) >> S)]) >>> 16) & 255),
																(A = 65535 & N),
																!(S + (E = N >>> 24) <= v);

														) {
															if (0 === d) break t
															d--, (y += h[p++] << v), (v += 8)
														}
														;(y >>>= S), (v -= S), (r.back += S)
													}
													if (((y >>>= E), (v -= E), (r.back += E), (r.length = A), 0 === I)) {
														r.mode = 26
														break
													}
													if (32 & I) {
														;(r.back = -1), (r.mode = 12)
														break
													}
													if (64 & I) {
														;(t.msg = 'invalid literal/length code'), (r.mode = 30)
														break
													}
													;(r.extra = 15 & I), (r.mode = 22)
												case 22:
													if (r.extra) {
														for (F = r.extra; v < F; ) {
															if (0 === d) break t
															d--, (y += h[p++] << v), (v += 8)
														}
														;(r.length += y & ((1 << r.extra) - 1)),
															(y >>>= r.extra),
															(v -= r.extra),
															(r.back += r.extra)
													}
													;(r.was = r.length), (r.mode = 23)
												case 23:
													for (
														;
														(I = ((N = r.distcode[y & ((1 << r.distbits) - 1)]) >>> 16) & 255),
															(A = 65535 & N),
															!((E = N >>> 24) <= v);

													) {
														if (0 === d) break t
														d--, (y += h[p++] << v), (v += 8)
													}
													if (0 == (240 & I)) {
														for (
															S = E, T = I, k = A;
															(I = ((N = r.distcode[k + ((y & ((1 << (S + T)) - 1)) >> S)]) >>> 16) & 255),
																(A = 65535 & N),
																!(S + (E = N >>> 24) <= v);

														) {
															if (0 === d) break t
															d--, (y += h[p++] << v), (v += 8)
														}
														;(y >>>= S), (v -= S), (r.back += S)
													}
													if (((y >>>= E), (v -= E), (r.back += E), 64 & I)) {
														;(t.msg = 'invalid distance code'), (r.mode = 30)
														break
													}
													;(r.offset = A), (r.extra = 15 & I), (r.mode = 24)
												case 24:
													if (r.extra) {
														for (F = r.extra; v < F; ) {
															if (0 === d) break t
															d--, (y += h[p++] << v), (v += 8)
														}
														;(r.offset += y & ((1 << r.extra) - 1)),
															(y >>>= r.extra),
															(v -= r.extra),
															(r.back += r.extra)
													}
													if (r.offset > r.dmax) {
														;(t.msg = 'invalid distance too far back'), (r.mode = 30)
														break
													}
													r.mode = 25
												case 25:
													if (0 === m) break t
													if (((b = P - m), r.offset > b)) {
														if ((b = r.offset - b) > r.whave && r.sane) {
															;(t.msg = 'invalid distance too far back'), (r.mode = 30)
															break
														}
														;(C = b > r.wnext ? ((b -= r.wnext), r.wsize - b) : r.wnext - b),
															b > r.length && (b = r.length),
															(w = r.window)
													} else (w = f), (C = c - r.offset), (b = r.length)
													for (m < b && (b = m), m -= b, r.length -= b; (f[c++] = w[C++]), --b; );
													0 === r.length && (r.mode = 21)
													break
												case 26:
													if (0 === m) break t
													;(f[c++] = r.length), m--, (r.mode = 21)
													break
												case 27:
													if (r.wrap) {
														for (; v < 32; ) {
															if (0 === d) break t
															d--, (y |= h[p++] << v), (v += 8)
														}
														if (
															((P -= m),
															(t.total_out += P),
															(r.total += P),
															P && (t.adler = r.check = r.flags ? s(r.check, f, P, c - P) : i(r.check, f, P, c - P)),
															(P = m),
															(r.flags ? y : u(y)) !== r.check)
														) {
															;(t.msg = 'incorrect data check'), (r.mode = 30)
															break
														}
														v = y = 0
													}
													r.mode = 28
												case 28:
													if (r.wrap && r.flags) {
														for (; v < 32; ) {
															if (0 === d) break t
															d--, (y += h[p++] << v), (v += 8)
														}
														if (y !== (4294967295 & r.total)) {
															;(t.msg = 'incorrect length check'), (r.mode = 30)
															break
														}
														v = y = 0
													}
													r.mode = 29
												case 29:
													L = 1
													break t
												case 30:
													L = -3
													break t
												case 31:
													return -4
												case 32:
												default:
													return l
											}
										return (
											(t.next_out = c),
											(t.avail_out = m),
											(t.next_in = p),
											(t.avail_in = d),
											(r.hold = y),
											(r.bits = v),
											(r.wsize || (P !== t.avail_out && r.mode < 30 && (r.mode < 27 || 4 !== e))) &&
											_(t, t.output, t.next_out, P - t.avail_out)
												? ((r.mode = 31), -4)
												: ((x -= t.avail_in),
												  (P -= t.avail_out),
												  (t.total_in += x),
												  (t.total_out += P),
												  (r.total += P),
												  r.wrap &&
														P &&
														(t.adler = r.check = r.flags
															? s(r.check, f, P, t.next_out - P)
															: i(r.check, f, P, t.next_out - P)),
												  (t.data_type =
														r.bits +
														(r.last ? 64 : 0) +
														(12 === r.mode ? 128 : 0) +
														(20 === r.mode || 15 === r.mode ? 256 : 0)),
												  ((0 == x && 0 === P) || 4 === e) && 0 === L && (L = -5),
												  L)
										)
									}),
									(r.inflateEnd = function (t) {
										if (!t || !t.state) return l
										var e = t.state
										return e.window && (e.window = null), (t.state = null), 0
									}),
									(r.inflateGetHeader = function (t, e) {
										var r
										return t && t.state ? (0 == (2 & (r = t.state).wrap) ? l : (((r.head = e).done = !1), 0)) : l
									}),
									(r.inflateSetDictionary = function (t, e) {
										var r,
											n = e.length
										return t && t.state
											? 0 !== (r = t.state).wrap && 11 !== r.mode
												? l
												: 11 === r.mode && i(1, e, n, 0) !== r.check
												? -3
												: _(t, e, n, n)
												? ((r.mode = 31), -4)
												: ((r.havedict = 1), 0)
											: l
									}),
									(r.inflateInfo = 'pako inflate (from Nodeca project)')
							},
							{ '../utils/common': 41, './adler32': 43, './crc32': 45, './inffast': 48, './inftrees': 50 },
						],
						50: [
							function (t, e, r) {
								'use strict'
								var n = t('../utils/common'),
									i = [
										3,
										4,
										5,
										6,
										7,
										8,
										9,
										10,
										11,
										13,
										15,
										17,
										19,
										23,
										27,
										31,
										35,
										43,
										51,
										59,
										67,
										83,
										99,
										115,
										131,
										163,
										195,
										227,
										258,
										0,
										0,
									],
									s = [
										16,
										16,
										16,
										16,
										16,
										16,
										16,
										16,
										17,
										17,
										17,
										17,
										18,
										18,
										18,
										18,
										19,
										19,
										19,
										19,
										20,
										20,
										20,
										20,
										21,
										21,
										21,
										21,
										16,
										72,
										78,
									],
									o = [
										1,
										2,
										3,
										4,
										5,
										7,
										9,
										13,
										17,
										25,
										33,
										49,
										65,
										97,
										129,
										193,
										257,
										385,
										513,
										769,
										1025,
										1537,
										2049,
										3073,
										4097,
										6145,
										8193,
										12289,
										16385,
										24577,
										0,
										0,
									],
									a = [
										16,
										16,
										16,
										16,
										17,
										17,
										18,
										18,
										19,
										19,
										20,
										20,
										21,
										21,
										22,
										22,
										23,
										23,
										24,
										24,
										25,
										25,
										26,
										26,
										27,
										27,
										28,
										28,
										29,
										29,
										64,
										64,
									]
								e.exports = function (t, e, r, l, u, h, f, p) {
									var c,
										d,
										m,
										y,
										v,
										g,
										_,
										x,
										P,
										b = p.bits,
										C = 0,
										w = 0,
										E = 0,
										I = 0,
										A = 0,
										S = 0,
										T = 0,
										k = 0,
										O = 0,
										L = 0,
										B = null,
										F = 0,
										N = new n.Buf16(16),
										D = new n.Buf16(16),
										Y = null,
										X = 0
									for (C = 0; C <= 15; C++) N[C] = 0
									for (w = 0; w < l; w++) N[e[r + w]]++
									for (A = b, I = 15; 1 <= I && 0 === N[I]; I--);
									if ((I < A && (A = I), 0 === I)) return (u[h++] = 20971520), (u[h++] = 20971520), (p.bits = 1), 0
									for (E = 1; E < I && 0 === N[E]; E++);
									for (A < E && (A = E), C = k = 1; C <= 15; C++) if (((k <<= 1), (k -= N[C]) < 0)) return -1
									if (0 < k && (0 === t || 1 !== I)) return -1
									for (D[1] = 0, C = 1; C < 15; C++) D[C + 1] = D[C] + N[C]
									for (w = 0; w < l; w++) 0 !== e[r + w] && (f[D[e[r + w]]++] = w)
									if (
										((g =
											0 === t
												? ((B = Y = f), 19)
												: 1 === t
												? ((B = i), (F -= 257), (Y = s), (X -= 257), 256)
												: ((B = o), (Y = a), -1)),
										(C = E),
										(v = h),
										(T = w = L = 0),
										(m = -1),
										(y = (O = 1 << (S = A)) - 1),
										(1 === t && 852 < O) || (2 === t && 592 < O))
									)
										return 1
									for (;;) {
										for (
											_ = C - T,
												P = f[w] < g ? ((x = 0), f[w]) : f[w] > g ? ((x = Y[X + f[w]]), B[F + f[w]]) : ((x = 96), 0),
												c = 1 << (C - T),
												E = d = 1 << S;
											(u[v + (L >> T) + (d -= c)] = (_ << 24) | (x << 16) | P | 0), 0 !== d;

										);
										for (c = 1 << (C - 1); L & c; ) c >>= 1
										if ((0 !== c ? ((L &= c - 1), (L += c)) : (L = 0), w++, 0 == --N[C])) {
											if (C === I) break
											C = e[r + f[w]]
										}
										if (A < C && (L & y) !== m) {
											for (0 === T && (T = A), v += E, k = 1 << (S = C - T); S + T < I && !((k -= N[S + T]) <= 0); )
												S++, (k <<= 1)
											if (((O += 1 << S), (1 === t && 852 < O) || (2 === t && 592 < O))) return 1
											u[(m = L & y)] = (A << 24) | (S << 16) | (v - h) | 0
										}
									}
									return 0 !== L && (u[v + L] = ((C - T) << 24) | (64 << 16) | 0), (p.bits = A), 0
								}
							},
							{ '../utils/common': 41 },
						],
						51: [
							function (t, e, r) {
								'use strict'
								e.exports = {
									2: 'need dictionary',
									1: 'stream end',
									0: '',
									'-1': 'file error',
									'-2': 'stream error',
									'-3': 'data error',
									'-4': 'insufficient memory',
									'-5': 'buffer error',
									'-6': 'incompatible version',
								}
							},
							{},
						],
						52: [
							function (t, e, r) {
								'use strict'
								var n = t('../utils/common')
								function i(t) {
									for (var e = t.length; 0 <= --e; ) t[e] = 0
								}
								var s = 256,
									o = 286,
									a = 30,
									l = 15,
									u = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
									h = [
										0,
										0,
										0,
										0,
										1,
										1,
										2,
										2,
										3,
										3,
										4,
										4,
										5,
										5,
										6,
										6,
										7,
										7,
										8,
										8,
										9,
										9,
										10,
										10,
										11,
										11,
										12,
										12,
										13,
										13,
									],
									f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
									p = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
									c = new Array(576)
								i(c)
								var d = new Array(60)
								i(d)
								var m = new Array(512)
								i(m)
								var y = new Array(256)
								i(y)
								var v = new Array(29)
								i(v)
								var g,
									_,
									x,
									P = new Array(a)
								function b(t, e, r, n, i) {
									;(this.static_tree = t),
										(this.extra_bits = e),
										(this.extra_base = r),
										(this.elems = n),
										(this.max_length = i),
										(this.has_stree = t && t.length)
								}
								function C(t, e) {
									;(this.dyn_tree = t), (this.max_code = 0), (this.stat_desc = e)
								}
								function w(t) {
									return t < 256 ? m[t] : m[256 + (t >>> 7)]
								}
								function E(t, e) {
									;(t.pending_buf[t.pending++] = 255 & e), (t.pending_buf[t.pending++] = (e >>> 8) & 255)
								}
								function I(t, e, r) {
									t.bi_valid > 16 - r
										? ((t.bi_buf |= (e << t.bi_valid) & 65535),
										  E(t, t.bi_buf),
										  (t.bi_buf = e >> (16 - t.bi_valid)),
										  (t.bi_valid += r - 16))
										: ((t.bi_buf |= (e << t.bi_valid) & 65535), (t.bi_valid += r))
								}
								function A(t, e, r) {
									I(t, r[2 * e], r[2 * e + 1])
								}
								function S(t, e) {
									for (var r = 0; (r |= 1 & t), (t >>>= 1), (r <<= 1), 0 < --e; );
									return r >>> 1
								}
								function T(t, e, r) {
									var n,
										i,
										s = new Array(16),
										o = 0
									for (n = 1; n <= l; n++) s[n] = o = (o + r[n - 1]) << 1
									for (i = 0; i <= e; i++) {
										var a = t[2 * i + 1]
										0 !== a && (t[2 * i] = S(s[a]++, a))
									}
								}
								function k(t) {
									var e
									for (e = 0; e < o; e++) t.dyn_ltree[2 * e] = 0
									for (e = 0; e < a; e++) t.dyn_dtree[2 * e] = 0
									for (e = 0; e < 19; e++) t.bl_tree[2 * e] = 0
									;(t.dyn_ltree[512] = 1), (t.opt_len = t.static_len = 0), (t.last_lit = t.matches = 0)
								}
								function O(t) {
									8 < t.bi_valid ? E(t, t.bi_buf) : 0 < t.bi_valid && (t.pending_buf[t.pending++] = t.bi_buf),
										(t.bi_buf = 0),
										(t.bi_valid = 0)
								}
								function L(t, e, r, n) {
									var i = 2 * e,
										s = 2 * r
									return t[i] < t[s] || (t[i] === t[s] && n[e] <= n[r])
								}
								function B(t, e, r) {
									for (
										var n = t.heap[r], i = r << 1;
										i <= t.heap_len &&
										(i < t.heap_len && L(e, t.heap[i + 1], t.heap[i], t.depth) && i++, !L(e, n, t.heap[i], t.depth));

									)
										(t.heap[r] = t.heap[i]), (r = i), (i <<= 1)
									t.heap[r] = n
								}
								function F(t, e, r) {
									var n,
										i,
										o,
										a,
										l = 0
									if (0 !== t.last_lit)
										for (
											;
											(n = (t.pending_buf[t.d_buf + 2 * l] << 8) | t.pending_buf[t.d_buf + 2 * l + 1]),
												(i = t.pending_buf[t.l_buf + l]),
												l++,
												0 === n
													? A(t, i, e)
													: (A(t, (o = y[i]) + s + 1, e),
													  0 !== (a = u[o]) && I(t, (i -= v[o]), a),
													  A(t, (o = w(--n)), r),
													  0 !== (a = h[o]) && I(t, (n -= P[o]), a)),
												l < t.last_lit;

										);
									A(t, 256, e)
								}
								function N(t, e) {
									var r,
										n,
										i,
										s = e.dyn_tree,
										o = e.stat_desc.static_tree,
										a = e.stat_desc.has_stree,
										u = e.stat_desc.elems,
										h = -1
									for (t.heap_len = 0, t.heap_max = 573, r = 0; r < u; r++)
										0 !== s[2 * r] ? ((t.heap[++t.heap_len] = h = r), (t.depth[r] = 0)) : (s[2 * r + 1] = 0)
									for (; t.heap_len < 2; )
										(s[2 * (i = t.heap[++t.heap_len] = h < 2 ? ++h : 0)] = 1),
											(t.depth[i] = 0),
											t.opt_len--,
											a && (t.static_len -= o[2 * i + 1])
									for (e.max_code = h, r = t.heap_len >> 1; 1 <= r; r--) B(t, s, r)
									for (
										i = u;
										(r = t.heap[1]),
											(t.heap[1] = t.heap[t.heap_len--]),
											B(t, s, 1),
											(n = t.heap[1]),
											(t.heap[--t.heap_max] = r),
											(t.heap[--t.heap_max] = n),
											(s[2 * i] = s[2 * r] + s[2 * n]),
											(t.depth[i] = (t.depth[r] >= t.depth[n] ? t.depth[r] : t.depth[n]) + 1),
											(s[2 * r + 1] = s[2 * n + 1] = i),
											(t.heap[1] = i++),
											B(t, s, 1),
											2 <= t.heap_len;

									);
									;(t.heap[--t.heap_max] = t.heap[1]),
										(function (t, e) {
											var r,
												n,
												i,
												s,
												o,
												a,
												u = e.dyn_tree,
												h = e.max_code,
												f = e.stat_desc.static_tree,
												p = e.stat_desc.has_stree,
												c = e.stat_desc.extra_bits,
												d = e.stat_desc.extra_base,
												m = e.stat_desc.max_length,
												y = 0
											for (s = 0; s <= l; s++) t.bl_count[s] = 0
											for (u[2 * t.heap[t.heap_max] + 1] = 0, r = t.heap_max + 1; r < 573; r++)
												m < (s = u[2 * u[2 * (n = t.heap[r]) + 1] + 1] + 1) && ((s = m), y++),
													(u[2 * n + 1] = s),
													h < n ||
														(t.bl_count[s]++,
														(o = 0),
														d <= n && (o = c[n - d]),
														(a = u[2 * n]),
														(t.opt_len += a * (s + o)),
														p && (t.static_len += a * (f[2 * n + 1] + o)))
											if (0 !== y) {
												do {
													for (s = m - 1; 0 === t.bl_count[s]; ) s--
													t.bl_count[s]--, (t.bl_count[s + 1] += 2), t.bl_count[m]--, (y -= 2)
												} while (0 < y)
												for (s = m; 0 !== s; s--)
													for (n = t.bl_count[s]; 0 !== n; )
														h < (i = t.heap[--r]) ||
															(u[2 * i + 1] !== s && ((t.opt_len += (s - u[2 * i + 1]) * u[2 * i]), (u[2 * i + 1] = s)),
															n--)
											}
										})(t, e),
										T(s, h, t.bl_count)
								}
								function D(t, e, r) {
									var n,
										i,
										s = -1,
										o = e[1],
										a = 0,
										l = 7,
										u = 4
									for (0 === o && ((l = 138), (u = 3)), e[2 * (r + 1) + 1] = 65535, n = 0; n <= r; n++)
										(i = o),
											(o = e[2 * (n + 1) + 1]),
											(++a < l && i === o) ||
												(a < u
													? (t.bl_tree[2 * i] += a)
													: 0 !== i
													? (i !== s && t.bl_tree[2 * i]++, t.bl_tree[32]++)
													: a <= 10
													? t.bl_tree[34]++
													: t.bl_tree[36]++,
												(s = i),
												(u = (a = 0) === o ? ((l = 138), 3) : i === o ? ((l = 6), 3) : ((l = 7), 4)))
								}
								function Y(t, e, r) {
									var n,
										i,
										s = -1,
										o = e[1],
										a = 0,
										l = 7,
										u = 4
									for (0 === o && ((l = 138), (u = 3)), n = 0; n <= r; n++)
										if (((i = o), (o = e[2 * (n + 1) + 1]), !(++a < l && i === o))) {
											if (a < u) for (; A(t, i, t.bl_tree), 0 != --a; );
											else
												0 !== i
													? (i !== s && (A(t, i, t.bl_tree), a--), A(t, 16, t.bl_tree), I(t, a - 3, 2))
													: a <= 10
													? (A(t, 17, t.bl_tree), I(t, a - 3, 3))
													: (A(t, 18, t.bl_tree), I(t, a - 11, 7))
											;(s = i), (u = (a = 0) === o ? ((l = 138), 3) : i === o ? ((l = 6), 3) : ((l = 7), 4))
										}
								}
								i(P)
								var X = !1
								function R(t, e, r, i) {
									I(t, 0 + (i ? 1 : 0), 3),
										(function (t, e, r, i) {
											O(t), E(t, r), E(t, ~r), n.arraySet(t.pending_buf, t.window, e, r, t.pending), (t.pending += r)
										})(t, e, r)
								}
								;(r._tr_init = function (t) {
									X ||
										((function () {
											var t,
												e,
												r,
												n,
												i,
												s = new Array(16)
											for (n = r = 0; n < 28; n++) for (v[n] = r, t = 0; t < 1 << u[n]; t++) y[r++] = n
											for (y[r - 1] = n, n = i = 0; n < 16; n++) for (P[n] = i, t = 0; t < 1 << h[n]; t++) m[i++] = n
											for (i >>= 7; n < a; n++) for (P[n] = i << 7, t = 0; t < 1 << (h[n] - 7); t++) m[256 + i++] = n
											for (e = 0; e <= l; e++) s[e] = 0
											for (t = 0; t <= 143; ) (c[2 * t + 1] = 8), t++, s[8]++
											for (; t <= 255; ) (c[2 * t + 1] = 9), t++, s[9]++
											for (; t <= 279; ) (c[2 * t + 1] = 7), t++, s[7]++
											for (; t <= 287; ) (c[2 * t + 1] = 8), t++, s[8]++
											for (T(c, 287, s), t = 0; t < a; t++) (d[2 * t + 1] = 5), (d[2 * t] = S(t, 5))
											;(g = new b(c, u, 257, o, l)), (_ = new b(d, h, 0, a, l)), (x = new b(new Array(0), f, 0, 19, 7))
										})(),
										(X = !0)),
										(t.l_desc = new C(t.dyn_ltree, g)),
										(t.d_desc = new C(t.dyn_dtree, _)),
										(t.bl_desc = new C(t.bl_tree, x)),
										(t.bi_buf = 0),
										(t.bi_valid = 0),
										k(t)
								}),
									(r._tr_stored_block = R),
									(r._tr_flush_block = function (t, e, r, n) {
										var i,
											o,
											a = 0
										0 < t.level
											? (2 === t.strm.data_type &&
													(t.strm.data_type = (function (t) {
														var e,
															r = 4093624447
														for (e = 0; e <= 31; e++, r >>>= 1) if (1 & r && 0 !== t.dyn_ltree[2 * e]) return 0
														if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return 1
														for (e = 32; e < s; e++) if (0 !== t.dyn_ltree[2 * e]) return 1
														return 0
													})(t)),
											  N(t, t.l_desc),
											  N(t, t.d_desc),
											  (a = (function (t) {
													var e
													for (
														D(t, t.dyn_ltree, t.l_desc.max_code),
															D(t, t.dyn_dtree, t.d_desc.max_code),
															N(t, t.bl_desc),
															e = 18;
														3 <= e && 0 === t.bl_tree[2 * p[e] + 1];
														e--
													);
													return (t.opt_len += 3 * (e + 1) + 5 + 5 + 4), e
											  })(t)),
											  (i = (t.opt_len + 3 + 7) >>> 3),
											  (o = (t.static_len + 3 + 7) >>> 3) <= i && (i = o))
											: (i = o = r + 5),
											r + 4 <= i && -1 !== e
												? R(t, e, r, n)
												: 4 === t.strategy || o === i
												? (I(t, 2 + (n ? 1 : 0), 3), F(t, c, d))
												: (I(t, 4 + (n ? 1 : 0), 3),
												  (function (t, e, r, n) {
														var i
														for (I(t, e - 257, 5), I(t, r - 1, 5), I(t, n - 4, 4), i = 0; i < n; i++)
															I(t, t.bl_tree[2 * p[i] + 1], 3)
														Y(t, t.dyn_ltree, e - 1), Y(t, t.dyn_dtree, r - 1)
												  })(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, a + 1),
												  F(t, t.dyn_ltree, t.dyn_dtree)),
											k(t),
											n && O(t)
									}),
									(r._tr_tally = function (t, e, r) {
										return (
											(t.pending_buf[t.d_buf + 2 * t.last_lit] = (e >>> 8) & 255),
											(t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e),
											(t.pending_buf[t.l_buf + t.last_lit] = 255 & r),
											t.last_lit++,
											0 === e
												? t.dyn_ltree[2 * r]++
												: (t.matches++, e--, t.dyn_ltree[2 * (y[r] + s + 1)]++, t.dyn_dtree[2 * w(e)]++),
											t.last_lit === t.lit_bufsize - 1
										)
									}),
									(r._tr_align = function (t) {
										I(t, 2, 3),
											A(t, 256, c),
											(function (t) {
												16 === t.bi_valid
													? (E(t, t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0))
													: 8 <= t.bi_valid &&
													  ((t.pending_buf[t.pending++] = 255 & t.bi_buf), (t.bi_buf >>= 8), (t.bi_valid -= 8))
											})(t)
									})
							},
							{ '../utils/common': 41 },
						],
						53: [
							function (t, e, r) {
								'use strict'
								e.exports = function () {
									;(this.input = null),
										(this.next_in = 0),
										(this.avail_in = 0),
										(this.total_in = 0),
										(this.output = null),
										(this.next_out = 0),
										(this.avail_out = 0),
										(this.total_out = 0),
										(this.msg = ''),
										(this.state = null),
										(this.data_type = 2),
										(this.adler = 0)
								}
							},
							{},
						],
						54: [
							function (t, e, r) {
								'use strict'
								e.exports =
									'function' == typeof n
										? n
										: function () {
												var t = [].slice.apply(arguments)
												t.splice(1, 0, 0), setTimeout.apply(null, t)
										  }
							},
							{},
						],
					},
					{},
					[10]
				)(10)
			}.call(this, r(394).Buffer, r(119), r(392).setImmediate))
		},
		385: function (t, e, r) {
			'use strict'
			var n = r(383),
				i = r(122),
				s = r(169),
				o = r(85)
			class a {
				constructor(t = {}) {
					;(this.type = t.type || 'image/jpeg'),
						(this.encoder = 'image/png' === this.type ? 'png' : 'jpeg'),
						(this.extension = 'jpeg' == this.encoder ? '.jpg' : '.png'),
						(this.quality = t && t.quality ? t.quality : 1),
						(this.started = !1),
						(this.promises = []),
						(this.chunks = [])
				}
				setSettings(t) {
					;(this.type = t.type || 'image/jpeg'),
						(this.encoder = 'image/png' === this.type ? 'png' : 'jpeg'),
						(this.extension = 'jpeg' == this.encoder ? '.jpg' : '.png'),
						(this.quality = t && t.quality ? t.quality : 1)
				}
				start(t) {
					;(this.chunks = new Array(t)), (this.promises = new Array(t)), (this.started = !0)
				}
				stop() {
					;(this.chunks = []), (this.promises = []), (this.started = !1)
				}
				capture(t, e) {
					if (this.started) {
						const r = this.type,
							n = this.quality,
							i = this.chunks,
							s = new Promise((s, o) => {
								a.render(t, r, n)
									.then(t => {
										;(i[e] = t), s(e)
									})
									.catch(() => o(e))
							})
						return (this.promises[e] = s), s
					}
					return Promise.reject()
				}
				save() {
					return this.started
						? new Promise((t, e) => {
								Promise.all(this.promises).then(
									() => {
										t(this.chunks)
									},
									t => {
										e(t)
									}
								)
						  })
						: Promise.reject('not started')
				}
				static getRenderTime(t, e, r) {
					const n = performance.now()
					return a.render(t, e, r).then(() => performance.now() - n)
				}
				static getBlob(t, e, r) {
					return new Promise((n, i) => {
						if (t instanceof OffscreenCanvas) return t.convertToBlob({ type: e, quality: r }).then(n).catch(i)
						t instanceof HTMLCanvasElement && t.toBlob(t => (t ? n(t) : i()), e, r), i()
					})
				}
				static render(t, e, r) {
					return new Promise((n, i) => {
						a.getBlob(t, e, r)
							.then(t => {
								const e = new FileReader()
								e.addEventListener(
									'load',
									() => {
										e.result && e.result instanceof ArrayBuffer ? n(new Uint8Array(e.result)) : i()
									},
									{ passive: !0 }
								),
									e.readAsArrayBuffer(t)
							})
							.catch(() => i())
					})
				}
			}
			var l = a,
				u = function (t, e, r, n) {
					return new (r || (r = Promise))(function (i, s) {
						function o(t) {
							try {
								l(n.next(t))
							} catch (t) {
								s(t)
							}
						}
						function a(t) {
							try {
								l(n.throw(t))
							} catch (t) {
								s(t)
							}
						}
						function l(t) {
							var e
							t.done
								? i(t.value)
								: ((e = t.value),
								  e instanceof r
										? e
										: new r(function (t) {
												t(e)
										  })).then(o, a)
						}
						l((n = n.apply(t, e || [])).next())
					})
				}
			class h extends o.a {
				constructor() {
					super(), (this.capturer = new l())
				}
				renderImage(t, e) {
					;(this.started = !0), this.capturer.setSettings(e), this.capturer.stop(), this.capturer.start(1)
					const r = new Promise((r, n) => {
						const i = t.getOption('clearCanvas', !0),
							s = t.getTimeline(),
							o = s.getSequence()
						if (i) t.draw()
						else {
							const r = e.time >= o.end ? o.frames : s.getFrameAtTime(e.time)
							for (let e = 0; e <= r; e++) s.setFrame(e), t.draw()
						}
						this.capturer.capture(t.getCanvas(), 0),
							this.capturer
								.save()
								.then(t => {
									r(t[0]), (this.started = !1)
								})
								.catch(n)
					})
					return (this.renderPromise = Object(s.a)(r)), r
				}
				prepareRenderAnimation(t, e) {
					return u(this, void 0, void 0, function* () {
						const r = performance.now()
						t.setOption('time', 0), t.draw()
						const n = performance.now() - r,
							i = t.getTimeline().getSequence(),
							s = ((yield l.getRenderTime(t.getCanvas(), e.type, e.quality)) + n) * i.frames,
							o = 1 + Math.floor(s / 1e3 / 60),
							a = Math.floor(i.frames / o)
						return { estimated_time: s, total_frames: i.frames, total_parts: o, forPart: a }
					})
				}
				stop() {
					;(this.started = !1), this.renderPromise && this.renderPromise.cancel(), this.capturer.stop()
				}
				renderAnimation(t, e) {
					this.stop(), (this.started = !0)
					const r = t.getTimeline().getSequence(),
						n = new Promise((n, i) => {
							this.prepareRenderAnimation(t, e).then(s =>
								u(this, void 0, void 0, function* () {
									this.dispatch('renderer:start', s)
									const o = []
									for (let n = 0; n < s.total_parts; n++)
										if (this.started)
											try {
												const a = yield this.renderAnimationPart(
													t,
													e,
													n * s.forPart,
													s.forPart,
													n,
													r.frames,
													s.total_parts
												)
												a ? o.push(a) : i()
											} catch (t) {
												i(t)
											}
										else i()
									n(o), (this.started = !1)
								})
							)
						})
					return (this.renderPromise = Object(s.a)(n)), n
				}
				renderAnimationPart(t, e, r, s, o, a, l) {
					return u(this, void 0, void 0, function* () {
						this.capturer.setSettings(e), this.capturer.stop(), this.capturer.start(s)
						const u = t.getTimeline(),
							h = u.getSequence(),
							f = u.getTickTime()
						let p = 0
						for (let e = 0; e < s; e++) {
							if (!this.started) return
							const n = e + r,
								c = Object(i.a)()
							u.setTime((h.start + n * f) % h.end), t.draw(), yield this.capturer.capture(t.getCanvas(), e)
							;(p = Object(i.a)() - c),
								this.dispatch('renderer:render-frame', {
									frame: n,
									part: o,
									forPart: s,
									total_frames: a,
									total_parts: l,
									render_time: p,
								})
						}
						const c = yield this.capturer.save()
						if (this.started) {
							const t = new n()
							for (let e = 0, n = c.length; e < n; e++) {
								const n = (e + r).toString()
								let i = ''
								for (let t = n.length; t <= 4; t++) i += '0'
								;(i += n), t.file(i + this.capturer.extension, c[e])
							}
							const e = yield t.generateAsync({ type: 'blob' })
							if (!this.started) return
							return this.capturer.stop(), e
						}
					})
				}
			}
			e.a = h
		},
		392: function (t, e, r) {
			;(function (t) {
				var n = (void 0 !== t && t) || ('undefined' != typeof self && self) || window,
					i = Function.prototype.apply
				function s(t, e) {
					;(this._id = t), (this._clearFn = e)
				}
				;(e.setTimeout = function () {
					return new s(i.call(setTimeout, n, arguments), clearTimeout)
				}),
					(e.setInterval = function () {
						return new s(i.call(setInterval, n, arguments), clearInterval)
					}),
					(e.clearTimeout = e.clearInterval = function (t) {
						t && t.close()
					}),
					(s.prototype.unref = s.prototype.ref = function () {}),
					(s.prototype.close = function () {
						this._clearFn.call(n, this._id)
					}),
					(e.enroll = function (t, e) {
						clearTimeout(t._idleTimeoutId), (t._idleTimeout = e)
					}),
					(e.unenroll = function (t) {
						clearTimeout(t._idleTimeoutId), (t._idleTimeout = -1)
					}),
					(e._unrefActive = e.active = function (t) {
						clearTimeout(t._idleTimeoutId)
						var e = t._idleTimeout
						e >= 0 &&
							(t._idleTimeoutId = setTimeout(function () {
								t._onTimeout && t._onTimeout()
							}, e))
					}),
					r(393),
					(e.setImmediate =
						('undefined' != typeof self && self.setImmediate) ||
						(void 0 !== t && t.setImmediate) ||
						(this && this.setImmediate)),
					(e.clearImmediate =
						('undefined' != typeof self && self.clearImmediate) ||
						(void 0 !== t && t.clearImmediate) ||
						(this && this.clearImmediate))
			}.call(this, r(119)))
		},
		393: function (t, e, r) {
			;(function (t, e) {
				!(function (t, r) {
					'use strict'
					if (!t.setImmediate) {
						var n,
							i,
							s,
							o,
							a,
							l = 1,
							u = {},
							h = !1,
							f = t.document,
							p = Object.getPrototypeOf && Object.getPrototypeOf(t)
						;(p = p && p.setTimeout ? p : t),
							'[object process]' === {}.toString.call(t.process)
								? (n = function (t) {
										e.nextTick(function () {
											d(t)
										})
								  })
								: !(function () {
										if (t.postMessage && !t.importScripts) {
											var e = !0,
												r = t.onmessage
											return (
												(t.onmessage = function () {
													e = !1
												}),
												t.postMessage('', '*'),
												(t.onmessage = r),
												e
											)
										}
								  })()
								? t.MessageChannel
									? (((s = new MessageChannel()).port1.onmessage = function (t) {
											d(t.data)
									  }),
									  (n = function (t) {
											s.port2.postMessage(t)
									  }))
									: f && 'onreadystatechange' in f.createElement('script')
									? ((i = f.documentElement),
									  (n = function (t) {
											var e = f.createElement('script')
											;(e.onreadystatechange = function () {
												d(t), (e.onreadystatechange = null), i.removeChild(e), (e = null)
											}),
												i.appendChild(e)
									  }))
									: (n = function (t) {
											setTimeout(d, 0, t)
									  })
								: ((o = 'setImmediate$' + Math.random() + '$'),
								  (a = function (e) {
										e.source === t && 'string' == typeof e.data && 0 === e.data.indexOf(o) && d(+e.data.slice(o.length))
								  }),
								  t.addEventListener ? t.addEventListener('message', a, !1) : t.attachEvent('onmessage', a),
								  (n = function (e) {
										t.postMessage(o + e, '*')
								  })),
							(p.setImmediate = function (t) {
								'function' != typeof t && (t = new Function('' + t))
								for (var e = new Array(arguments.length - 1), r = 0; r < e.length; r++) e[r] = arguments[r + 1]
								var i = { callback: t, args: e }
								return (u[l] = i), n(l), l++
							}),
							(p.clearImmediate = c)
					}
					function c(t) {
						delete u[t]
					}
					function d(t) {
						if (h) setTimeout(d, 0, t)
						else {
							var e = u[t]
							if (e) {
								h = !0
								try {
									!(function (t) {
										var e = t.callback,
											r = t.args
										switch (r.length) {
											case 0:
												e()
												break
											case 1:
												e(r[0])
												break
											case 2:
												e(r[0], r[1])
												break
											case 3:
												e(r[0], r[1], r[2])
												break
											default:
												e.apply(void 0, r)
										}
									})(e)
								} finally {
									c(t), (h = !1)
								}
							}
						}
					}
				})('undefined' == typeof self ? (void 0 === t ? this : t) : self)
			}.call(this, r(119), r(168)))
		},
		394: function (t, e, r) {
			'use strict'
			;(function (t) {
				var n = r(395),
					i = r(396),
					s = r(397)
				function o() {
					return l.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
				}
				function a(t, e) {
					if (o() < e) throw new RangeError('Invalid typed array length')
					return (
						l.TYPED_ARRAY_SUPPORT
							? ((t = new Uint8Array(e)).__proto__ = l.prototype)
							: (null === t && (t = new l(e)), (t.length = e)),
						t
					)
				}
				function l(t, e, r) {
					if (!(l.TYPED_ARRAY_SUPPORT || this instanceof l)) return new l(t, e, r)
					if ('number' == typeof t) {
						if ('string' == typeof e)
							throw new Error('If encoding is specified then the first argument must be a string')
						return f(this, t)
					}
					return u(this, t, e, r)
				}
				function u(t, e, r, n) {
					if ('number' == typeof e) throw new TypeError('"value" argument must not be a number')
					return 'undefined' != typeof ArrayBuffer && e instanceof ArrayBuffer
						? (function (t, e, r, n) {
								if ((e.byteLength, r < 0 || e.byteLength < r)) throw new RangeError("'offset' is out of bounds")
								if (e.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds")
								e =
									void 0 === r && void 0 === n
										? new Uint8Array(e)
										: void 0 === n
										? new Uint8Array(e, r)
										: new Uint8Array(e, r, n)
								l.TYPED_ARRAY_SUPPORT ? ((t = e).__proto__ = l.prototype) : (t = p(t, e))
								return t
						  })(t, e, r, n)
						: 'string' == typeof e
						? (function (t, e, r) {
								;('string' == typeof r && '' !== r) || (r = 'utf8')
								if (!l.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding')
								var n = 0 | d(e, r),
									i = (t = a(t, n)).write(e, r)
								i !== n && (t = t.slice(0, i))
								return t
						  })(t, e, r)
						: (function (t, e) {
								if (l.isBuffer(e)) {
									var r = 0 | c(e.length)
									return 0 === (t = a(t, r)).length || e.copy(t, 0, 0, r), t
								}
								if (e) {
									if (('undefined' != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer) || 'length' in e)
										return 'number' != typeof e.length || (n = e.length) != n ? a(t, 0) : p(t, e)
									if ('Buffer' === e.type && s(e.data)) return p(t, e.data)
								}
								var n
								throw new TypeError(
									'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
								)
						  })(t, e)
				}
				function h(t) {
					if ('number' != typeof t) throw new TypeError('"size" argument must be a number')
					if (t < 0) throw new RangeError('"size" argument must not be negative')
				}
				function f(t, e) {
					if ((h(e), (t = a(t, e < 0 ? 0 : 0 | c(e))), !l.TYPED_ARRAY_SUPPORT)) for (var r = 0; r < e; ++r) t[r] = 0
					return t
				}
				function p(t, e) {
					var r = e.length < 0 ? 0 : 0 | c(e.length)
					t = a(t, r)
					for (var n = 0; n < r; n += 1) t[n] = 255 & e[n]
					return t
				}
				function c(t) {
					if (t >= o())
						throw new RangeError(
							'Attempt to allocate Buffer larger than maximum size: 0x' + o().toString(16) + ' bytes'
						)
					return 0 | t
				}
				function d(t, e) {
					if (l.isBuffer(t)) return t.length
					if (
						'undefined' != typeof ArrayBuffer &&
						'function' == typeof ArrayBuffer.isView &&
						(ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
					)
						return t.byteLength
					'string' != typeof t && (t = '' + t)
					var r = t.length
					if (0 === r) return 0
					for (var n = !1; ; )
						switch (e) {
							case 'ascii':
							case 'latin1':
							case 'binary':
								return r
							case 'utf8':
							case 'utf-8':
							case void 0:
								return M(t).length
							case 'ucs2':
							case 'ucs-2':
							case 'utf16le':
							case 'utf-16le':
								return 2 * r
							case 'hex':
								return r >>> 1
							case 'base64':
								return z(t).length
							default:
								if (n) return M(t).length
								;(e = ('' + e).toLowerCase()), (n = !0)
						}
				}
				function m(t, e, r) {
					var n = !1
					if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return ''
					if (((void 0 === r || r > this.length) && (r = this.length), r <= 0)) return ''
					if ((r >>>= 0) <= (e >>>= 0)) return ''
					for (t || (t = 'utf8'); ; )
						switch (t) {
							case 'hex':
								return T(this, e, r)
							case 'utf8':
							case 'utf-8':
								return I(this, e, r)
							case 'ascii':
								return A(this, e, r)
							case 'latin1':
							case 'binary':
								return S(this, e, r)
							case 'base64':
								return E(this, e, r)
							case 'ucs2':
							case 'ucs-2':
							case 'utf16le':
							case 'utf-16le':
								return k(this, e, r)
							default:
								if (n) throw new TypeError('Unknown encoding: ' + t)
								;(t = (t + '').toLowerCase()), (n = !0)
						}
				}
				function y(t, e, r) {
					var n = t[e]
					;(t[e] = t[r]), (t[r] = n)
				}
				function v(t, e, r, n, i) {
					if (0 === t.length) return -1
					if (
						('string' == typeof r
							? ((n = r), (r = 0))
							: r > 2147483647
							? (r = 2147483647)
							: r < -2147483648 && (r = -2147483648),
						(r = +r),
						isNaN(r) && (r = i ? 0 : t.length - 1),
						r < 0 && (r = t.length + r),
						r >= t.length)
					) {
						if (i) return -1
						r = t.length - 1
					} else if (r < 0) {
						if (!i) return -1
						r = 0
					}
					if (('string' == typeof e && (e = l.from(e, n)), l.isBuffer(e))) return 0 === e.length ? -1 : g(t, e, r, n, i)
					if ('number' == typeof e)
						return (
							(e &= 255),
							l.TYPED_ARRAY_SUPPORT && 'function' == typeof Uint8Array.prototype.indexOf
								? i
									? Uint8Array.prototype.indexOf.call(t, e, r)
									: Uint8Array.prototype.lastIndexOf.call(t, e, r)
								: g(t, [e], r, n, i)
						)
					throw new TypeError('val must be string, number or Buffer')
				}
				function g(t, e, r, n, i) {
					var s,
						o = 1,
						a = t.length,
						l = e.length
					if (
						void 0 !== n &&
						('ucs2' === (n = String(n).toLowerCase()) || 'ucs-2' === n || 'utf16le' === n || 'utf-16le' === n)
					) {
						if (t.length < 2 || e.length < 2) return -1
						;(o = 2), (a /= 2), (l /= 2), (r /= 2)
					}
					function u(t, e) {
						return 1 === o ? t[e] : t.readUInt16BE(e * o)
					}
					if (i) {
						var h = -1
						for (s = r; s < a; s++)
							if (u(t, s) === u(e, -1 === h ? 0 : s - h)) {
								if ((-1 === h && (h = s), s - h + 1 === l)) return h * o
							} else -1 !== h && (s -= s - h), (h = -1)
					} else
						for (r + l > a && (r = a - l), s = r; s >= 0; s--) {
							for (var f = !0, p = 0; p < l; p++)
								if (u(t, s + p) !== u(e, p)) {
									f = !1
									break
								}
							if (f) return s
						}
					return -1
				}
				function _(t, e, r, n) {
					r = Number(r) || 0
					var i = t.length - r
					n ? (n = Number(n)) > i && (n = i) : (n = i)
					var s = e.length
					if (s % 2 != 0) throw new TypeError('Invalid hex string')
					n > s / 2 && (n = s / 2)
					for (var o = 0; o < n; ++o) {
						var a = parseInt(e.substr(2 * o, 2), 16)
						if (isNaN(a)) return o
						t[r + o] = a
					}
					return o
				}
				function x(t, e, r, n) {
					return U(M(e, t.length - r), t, r, n)
				}
				function P(t, e, r, n) {
					return U(
						(function (t) {
							for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r))
							return e
						})(e),
						t,
						r,
						n
					)
				}
				function b(t, e, r, n) {
					return P(t, e, r, n)
				}
				function C(t, e, r, n) {
					return U(z(e), t, r, n)
				}
				function w(t, e, r, n) {
					return U(
						(function (t, e) {
							for (var r, n, i, s = [], o = 0; o < t.length && !((e -= 2) < 0); ++o)
								(r = t.charCodeAt(o)), (n = r >> 8), (i = r % 256), s.push(i), s.push(n)
							return s
						})(e, t.length - r),
						t,
						r,
						n
					)
				}
				function E(t, e, r) {
					return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r))
				}
				function I(t, e, r) {
					r = Math.min(t.length, r)
					for (var n = [], i = e; i < r; ) {
						var s,
							o,
							a,
							l,
							u = t[i],
							h = null,
							f = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1
						if (i + f <= r)
							switch (f) {
								case 1:
									u < 128 && (h = u)
									break
								case 2:
									128 == (192 & (s = t[i + 1])) && (l = ((31 & u) << 6) | (63 & s)) > 127 && (h = l)
									break
								case 3:
									;(s = t[i + 1]),
										(o = t[i + 2]),
										128 == (192 & s) &&
											128 == (192 & o) &&
											(l = ((15 & u) << 12) | ((63 & s) << 6) | (63 & o)) > 2047 &&
											(l < 55296 || l > 57343) &&
											(h = l)
									break
								case 4:
									;(s = t[i + 1]),
										(o = t[i + 2]),
										(a = t[i + 3]),
										128 == (192 & s) &&
											128 == (192 & o) &&
											128 == (192 & a) &&
											(l = ((15 & u) << 18) | ((63 & s) << 12) | ((63 & o) << 6) | (63 & a)) > 65535 &&
											l < 1114112 &&
											(h = l)
							}
						null === h
							? ((h = 65533), (f = 1))
							: h > 65535 && ((h -= 65536), n.push(((h >>> 10) & 1023) | 55296), (h = 56320 | (1023 & h))),
							n.push(h),
							(i += f)
					}
					return (function (t) {
						var e = t.length
						if (e <= 4096) return String.fromCharCode.apply(String, t)
						var r = '',
							n = 0
						for (; n < e; ) r += String.fromCharCode.apply(String, t.slice(n, (n += 4096)))
						return r
					})(n)
				}
				;(e.Buffer = l),
					(e.SlowBuffer = function (t) {
						;+t != t && (t = 0)
						return l.alloc(+t)
					}),
					(e.INSPECT_MAX_BYTES = 50),
					(l.TYPED_ARRAY_SUPPORT =
						void 0 !== t.TYPED_ARRAY_SUPPORT
							? t.TYPED_ARRAY_SUPPORT
							: (function () {
									try {
										var t = new Uint8Array(1)
										return (
											(t.__proto__ = {
												__proto__: Uint8Array.prototype,
												foo: function () {
													return 42
												},
											}),
											42 === t.foo() && 'function' == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
										)
									} catch (t) {
										return !1
									}
							  })()),
					(e.kMaxLength = o()),
					(l.poolSize = 8192),
					(l._augment = function (t) {
						return (t.__proto__ = l.prototype), t
					}),
					(l.from = function (t, e, r) {
						return u(null, t, e, r)
					}),
					l.TYPED_ARRAY_SUPPORT &&
						((l.prototype.__proto__ = Uint8Array.prototype),
						(l.__proto__ = Uint8Array),
						'undefined' != typeof Symbol &&
							Symbol.species &&
							l[Symbol.species] === l &&
							Object.defineProperty(l, Symbol.species, { value: null, configurable: !0 })),
					(l.alloc = function (t, e, r) {
						return (function (t, e, r, n) {
							return (
								h(e),
								e <= 0
									? a(t, e)
									: void 0 !== r
									? 'string' == typeof n
										? a(t, e).fill(r, n)
										: a(t, e).fill(r)
									: a(t, e)
							)
						})(null, t, e, r)
					}),
					(l.allocUnsafe = function (t) {
						return f(null, t)
					}),
					(l.allocUnsafeSlow = function (t) {
						return f(null, t)
					}),
					(l.isBuffer = function (t) {
						return !(null == t || !t._isBuffer)
					}),
					(l.compare = function (t, e) {
						if (!l.isBuffer(t) || !l.isBuffer(e)) throw new TypeError('Arguments must be Buffers')
						if (t === e) return 0
						for (var r = t.length, n = e.length, i = 0, s = Math.min(r, n); i < s; ++i)
							if (t[i] !== e[i]) {
								;(r = t[i]), (n = e[i])
								break
							}
						return r < n ? -1 : n < r ? 1 : 0
					}),
					(l.isEncoding = function (t) {
						switch (String(t).toLowerCase()) {
							case 'hex':
							case 'utf8':
							case 'utf-8':
							case 'ascii':
							case 'latin1':
							case 'binary':
							case 'base64':
							case 'ucs2':
							case 'ucs-2':
							case 'utf16le':
							case 'utf-16le':
								return !0
							default:
								return !1
						}
					}),
					(l.concat = function (t, e) {
						if (!s(t)) throw new TypeError('"list" argument must be an Array of Buffers')
						if (0 === t.length) return l.alloc(0)
						var r
						if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length
						var n = l.allocUnsafe(e),
							i = 0
						for (r = 0; r < t.length; ++r) {
							var o = t[r]
							if (!l.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers')
							o.copy(n, i), (i += o.length)
						}
						return n
					}),
					(l.byteLength = d),
					(l.prototype._isBuffer = !0),
					(l.prototype.swap16 = function () {
						var t = this.length
						if (t % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits')
						for (var e = 0; e < t; e += 2) y(this, e, e + 1)
						return this
					}),
					(l.prototype.swap32 = function () {
						var t = this.length
						if (t % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits')
						for (var e = 0; e < t; e += 4) y(this, e, e + 3), y(this, e + 1, e + 2)
						return this
					}),
					(l.prototype.swap64 = function () {
						var t = this.length
						if (t % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits')
						for (var e = 0; e < t; e += 8)
							y(this, e, e + 7), y(this, e + 1, e + 6), y(this, e + 2, e + 5), y(this, e + 3, e + 4)
						return this
					}),
					(l.prototype.toString = function () {
						var t = 0 | this.length
						return 0 === t ? '' : 0 === arguments.length ? I(this, 0, t) : m.apply(this, arguments)
					}),
					(l.prototype.equals = function (t) {
						if (!l.isBuffer(t)) throw new TypeError('Argument must be a Buffer')
						return this === t || 0 === l.compare(this, t)
					}),
					(l.prototype.inspect = function () {
						var t = '',
							r = e.INSPECT_MAX_BYTES
						return (
							this.length > 0 &&
								((t = this.toString('hex', 0, r).match(/.{2}/g).join(' ')), this.length > r && (t += ' ... ')),
							'<Buffer ' + t + '>'
						)
					}),
					(l.prototype.compare = function (t, e, r, n, i) {
						if (!l.isBuffer(t)) throw new TypeError('Argument must be a Buffer')
						if (
							(void 0 === e && (e = 0),
							void 0 === r && (r = t ? t.length : 0),
							void 0 === n && (n = 0),
							void 0 === i && (i = this.length),
							e < 0 || r > t.length || n < 0 || i > this.length)
						)
							throw new RangeError('out of range index')
						if (n >= i && e >= r) return 0
						if (n >= i) return -1
						if (e >= r) return 1
						if (this === t) return 0
						for (
							var s = (i >>>= 0) - (n >>>= 0),
								o = (r >>>= 0) - (e >>>= 0),
								a = Math.min(s, o),
								u = this.slice(n, i),
								h = t.slice(e, r),
								f = 0;
							f < a;
							++f
						)
							if (u[f] !== h[f]) {
								;(s = u[f]), (o = h[f])
								break
							}
						return s < o ? -1 : o < s ? 1 : 0
					}),
					(l.prototype.includes = function (t, e, r) {
						return -1 !== this.indexOf(t, e, r)
					}),
					(l.prototype.indexOf = function (t, e, r) {
						return v(this, t, e, r, !0)
					}),
					(l.prototype.lastIndexOf = function (t, e, r) {
						return v(this, t, e, r, !1)
					}),
					(l.prototype.write = function (t, e, r, n) {
						if (void 0 === e) (n = 'utf8'), (r = this.length), (e = 0)
						else if (void 0 === r && 'string' == typeof e) (n = e), (r = this.length), (e = 0)
						else {
							if (!isFinite(e))
								throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported')
							;(e |= 0), isFinite(r) ? ((r |= 0), void 0 === n && (n = 'utf8')) : ((n = r), (r = void 0))
						}
						var i = this.length - e
						if (((void 0 === r || r > i) && (r = i), (t.length > 0 && (r < 0 || e < 0)) || e > this.length))
							throw new RangeError('Attempt to write outside buffer bounds')
						n || (n = 'utf8')
						for (var s = !1; ; )
							switch (n) {
								case 'hex':
									return _(this, t, e, r)
								case 'utf8':
								case 'utf-8':
									return x(this, t, e, r)
								case 'ascii':
									return P(this, t, e, r)
								case 'latin1':
								case 'binary':
									return b(this, t, e, r)
								case 'base64':
									return C(this, t, e, r)
								case 'ucs2':
								case 'ucs-2':
								case 'utf16le':
								case 'utf-16le':
									return w(this, t, e, r)
								default:
									if (s) throw new TypeError('Unknown encoding: ' + n)
									;(n = ('' + n).toLowerCase()), (s = !0)
							}
					}),
					(l.prototype.toJSON = function () {
						return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) }
					})
				function A(t, e, r) {
					var n = ''
					r = Math.min(t.length, r)
					for (var i = e; i < r; ++i) n += String.fromCharCode(127 & t[i])
					return n
				}
				function S(t, e, r) {
					var n = ''
					r = Math.min(t.length, r)
					for (var i = e; i < r; ++i) n += String.fromCharCode(t[i])
					return n
				}
				function T(t, e, r) {
					var n = t.length
					;(!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n)
					for (var i = '', s = e; s < r; ++s) i += R(t[s])
					return i
				}
				function k(t, e, r) {
					for (var n = t.slice(e, r), i = '', s = 0; s < n.length; s += 2)
						i += String.fromCharCode(n[s] + 256 * n[s + 1])
					return i
				}
				function O(t, e, r) {
					if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint')
					if (t + e > r) throw new RangeError('Trying to access beyond buffer length')
				}
				function L(t, e, r, n, i, s) {
					if (!l.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance')
					if (e > i || e < s) throw new RangeError('"value" argument is out of bounds')
					if (r + n > t.length) throw new RangeError('Index out of range')
				}
				function B(t, e, r, n) {
					e < 0 && (e = 65535 + e + 1)
					for (var i = 0, s = Math.min(t.length - r, 2); i < s; ++i)
						t[r + i] = (e & (255 << (8 * (n ? i : 1 - i)))) >>> (8 * (n ? i : 1 - i))
				}
				function F(t, e, r, n) {
					e < 0 && (e = 4294967295 + e + 1)
					for (var i = 0, s = Math.min(t.length - r, 4); i < s; ++i) t[r + i] = (e >>> (8 * (n ? i : 3 - i))) & 255
				}
				function N(t, e, r, n, i, s) {
					if (r + n > t.length) throw new RangeError('Index out of range')
					if (r < 0) throw new RangeError('Index out of range')
				}
				function D(t, e, r, n, s) {
					return s || N(t, 0, r, 4), i.write(t, e, r, n, 23, 4), r + 4
				}
				function Y(t, e, r, n, s) {
					return s || N(t, 0, r, 8), i.write(t, e, r, n, 52, 8), r + 8
				}
				;(l.prototype.slice = function (t, e) {
					var r,
						n = this.length
					if (
						((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
						(e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
						e < t && (e = t),
						l.TYPED_ARRAY_SUPPORT)
					)
						(r = this.subarray(t, e)).__proto__ = l.prototype
					else {
						var i = e - t
						r = new l(i, void 0)
						for (var s = 0; s < i; ++s) r[s] = this[s + t]
					}
					return r
				}),
					(l.prototype.readUIntLE = function (t, e, r) {
						;(t |= 0), (e |= 0), r || O(t, e, this.length)
						for (var n = this[t], i = 1, s = 0; ++s < e && (i *= 256); ) n += this[t + s] * i
						return n
					}),
					(l.prototype.readUIntBE = function (t, e, r) {
						;(t |= 0), (e |= 0), r || O(t, e, this.length)
						for (var n = this[t + --e], i = 1; e > 0 && (i *= 256); ) n += this[t + --e] * i
						return n
					}),
					(l.prototype.readUInt8 = function (t, e) {
						return e || O(t, 1, this.length), this[t]
					}),
					(l.prototype.readUInt16LE = function (t, e) {
						return e || O(t, 2, this.length), this[t] | (this[t + 1] << 8)
					}),
					(l.prototype.readUInt16BE = function (t, e) {
						return e || O(t, 2, this.length), (this[t] << 8) | this[t + 1]
					}),
					(l.prototype.readUInt32LE = function (t, e) {
						return (
							e || O(t, 4, this.length), (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3]
						)
					}),
					(l.prototype.readUInt32BE = function (t, e) {
						return (
							e || O(t, 4, this.length), 16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
						)
					}),
					(l.prototype.readIntLE = function (t, e, r) {
						;(t |= 0), (e |= 0), r || O(t, e, this.length)
						for (var n = this[t], i = 1, s = 0; ++s < e && (i *= 256); ) n += this[t + s] * i
						return n >= (i *= 128) && (n -= Math.pow(2, 8 * e)), n
					}),
					(l.prototype.readIntBE = function (t, e, r) {
						;(t |= 0), (e |= 0), r || O(t, e, this.length)
						for (var n = e, i = 1, s = this[t + --n]; n > 0 && (i *= 256); ) s += this[t + --n] * i
						return s >= (i *= 128) && (s -= Math.pow(2, 8 * e)), s
					}),
					(l.prototype.readInt8 = function (t, e) {
						return e || O(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
					}),
					(l.prototype.readInt16LE = function (t, e) {
						e || O(t, 2, this.length)
						var r = this[t] | (this[t + 1] << 8)
						return 32768 & r ? 4294901760 | r : r
					}),
					(l.prototype.readInt16BE = function (t, e) {
						e || O(t, 2, this.length)
						var r = this[t + 1] | (this[t] << 8)
						return 32768 & r ? 4294901760 | r : r
					}),
					(l.prototype.readInt32LE = function (t, e) {
						return e || O(t, 4, this.length), this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
					}),
					(l.prototype.readInt32BE = function (t, e) {
						return e || O(t, 4, this.length), (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
					}),
					(l.prototype.readFloatLE = function (t, e) {
						return e || O(t, 4, this.length), i.read(this, t, !0, 23, 4)
					}),
					(l.prototype.readFloatBE = function (t, e) {
						return e || O(t, 4, this.length), i.read(this, t, !1, 23, 4)
					}),
					(l.prototype.readDoubleLE = function (t, e) {
						return e || O(t, 8, this.length), i.read(this, t, !0, 52, 8)
					}),
					(l.prototype.readDoubleBE = function (t, e) {
						return e || O(t, 8, this.length), i.read(this, t, !1, 52, 8)
					}),
					(l.prototype.writeUIntLE = function (t, e, r, n) {
						;((t = +t), (e |= 0), (r |= 0), n) || L(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
						var i = 1,
							s = 0
						for (this[e] = 255 & t; ++s < r && (i *= 256); ) this[e + s] = (t / i) & 255
						return e + r
					}),
					(l.prototype.writeUIntBE = function (t, e, r, n) {
						;((t = +t), (e |= 0), (r |= 0), n) || L(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
						var i = r - 1,
							s = 1
						for (this[e + i] = 255 & t; --i >= 0 && (s *= 256); ) this[e + i] = (t / s) & 255
						return e + r
					}),
					(l.prototype.writeUInt8 = function (t, e, r) {
						return (
							(t = +t),
							(e |= 0),
							r || L(this, t, e, 1, 255, 0),
							l.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
							(this[e] = 255 & t),
							e + 1
						)
					}),
					(l.prototype.writeUInt16LE = function (t, e, r) {
						return (
							(t = +t),
							(e |= 0),
							r || L(this, t, e, 2, 65535, 0),
							l.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8)) : B(this, t, e, !0),
							e + 2
						)
					}),
					(l.prototype.writeUInt16BE = function (t, e, r) {
						return (
							(t = +t),
							(e |= 0),
							r || L(this, t, e, 2, 65535, 0),
							l.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t)) : B(this, t, e, !1),
							e + 2
						)
					}),
					(l.prototype.writeUInt32LE = function (t, e, r) {
						return (
							(t = +t),
							(e |= 0),
							r || L(this, t, e, 4, 4294967295, 0),
							l.TYPED_ARRAY_SUPPORT
								? ((this[e + 3] = t >>> 24), (this[e + 2] = t >>> 16), (this[e + 1] = t >>> 8), (this[e] = 255 & t))
								: F(this, t, e, !0),
							e + 4
						)
					}),
					(l.prototype.writeUInt32BE = function (t, e, r) {
						return (
							(t = +t),
							(e |= 0),
							r || L(this, t, e, 4, 4294967295, 0),
							l.TYPED_ARRAY_SUPPORT
								? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = 255 & t))
								: F(this, t, e, !1),
							e + 4
						)
					}),
					(l.prototype.writeIntLE = function (t, e, r, n) {
						if (((t = +t), (e |= 0), !n)) {
							var i = Math.pow(2, 8 * r - 1)
							L(this, t, e, r, i - 1, -i)
						}
						var s = 0,
							o = 1,
							a = 0
						for (this[e] = 255 & t; ++s < r && (o *= 256); )
							t < 0 && 0 === a && 0 !== this[e + s - 1] && (a = 1), (this[e + s] = (((t / o) >> 0) - a) & 255)
						return e + r
					}),
					(l.prototype.writeIntBE = function (t, e, r, n) {
						if (((t = +t), (e |= 0), !n)) {
							var i = Math.pow(2, 8 * r - 1)
							L(this, t, e, r, i - 1, -i)
						}
						var s = r - 1,
							o = 1,
							a = 0
						for (this[e + s] = 255 & t; --s >= 0 && (o *= 256); )
							t < 0 && 0 === a && 0 !== this[e + s + 1] && (a = 1), (this[e + s] = (((t / o) >> 0) - a) & 255)
						return e + r
					}),
					(l.prototype.writeInt8 = function (t, e, r) {
						return (
							(t = +t),
							(e |= 0),
							r || L(this, t, e, 1, 127, -128),
							l.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
							t < 0 && (t = 255 + t + 1),
							(this[e] = 255 & t),
							e + 1
						)
					}),
					(l.prototype.writeInt16LE = function (t, e, r) {
						return (
							(t = +t),
							(e |= 0),
							r || L(this, t, e, 2, 32767, -32768),
							l.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8)) : B(this, t, e, !0),
							e + 2
						)
					}),
					(l.prototype.writeInt16BE = function (t, e, r) {
						return (
							(t = +t),
							(e |= 0),
							r || L(this, t, e, 2, 32767, -32768),
							l.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t)) : B(this, t, e, !1),
							e + 2
						)
					}),
					(l.prototype.writeInt32LE = function (t, e, r) {
						return (
							(t = +t),
							(e |= 0),
							r || L(this, t, e, 4, 2147483647, -2147483648),
							l.TYPED_ARRAY_SUPPORT
								? ((this[e] = 255 & t), (this[e + 1] = t >>> 8), (this[e + 2] = t >>> 16), (this[e + 3] = t >>> 24))
								: F(this, t, e, !0),
							e + 4
						)
					}),
					(l.prototype.writeInt32BE = function (t, e, r) {
						return (
							(t = +t),
							(e |= 0),
							r || L(this, t, e, 4, 2147483647, -2147483648),
							t < 0 && (t = 4294967295 + t + 1),
							l.TYPED_ARRAY_SUPPORT
								? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = 255 & t))
								: F(this, t, e, !1),
							e + 4
						)
					}),
					(l.prototype.writeFloatLE = function (t, e, r) {
						return D(this, t, e, !0, r)
					}),
					(l.prototype.writeFloatBE = function (t, e, r) {
						return D(this, t, e, !1, r)
					}),
					(l.prototype.writeDoubleLE = function (t, e, r) {
						return Y(this, t, e, !0, r)
					}),
					(l.prototype.writeDoubleBE = function (t, e, r) {
						return Y(this, t, e, !1, r)
					}),
					(l.prototype.copy = function (t, e, r, n) {
						if (
							(r || (r = 0),
							n || 0 === n || (n = this.length),
							e >= t.length && (e = t.length),
							e || (e = 0),
							n > 0 && n < r && (n = r),
							n === r)
						)
							return 0
						if (0 === t.length || 0 === this.length) return 0
						if (e < 0) throw new RangeError('targetStart out of bounds')
						if (r < 0 || r >= this.length) throw new RangeError('sourceStart out of bounds')
						if (n < 0) throw new RangeError('sourceEnd out of bounds')
						n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r)
						var i,
							s = n - r
						if (this === t && r < e && e < n) for (i = s - 1; i >= 0; --i) t[i + e] = this[i + r]
						else if (s < 1e3 || !l.TYPED_ARRAY_SUPPORT) for (i = 0; i < s; ++i) t[i + e] = this[i + r]
						else Uint8Array.prototype.set.call(t, this.subarray(r, r + s), e)
						return s
					}),
					(l.prototype.fill = function (t, e, r, n) {
						if ('string' == typeof t) {
							if (
								('string' == typeof e
									? ((n = e), (e = 0), (r = this.length))
									: 'string' == typeof r && ((n = r), (r = this.length)),
								1 === t.length)
							) {
								var i = t.charCodeAt(0)
								i < 256 && (t = i)
							}
							if (void 0 !== n && 'string' != typeof n) throw new TypeError('encoding must be a string')
							if ('string' == typeof n && !l.isEncoding(n)) throw new TypeError('Unknown encoding: ' + n)
						} else 'number' == typeof t && (t &= 255)
						if (e < 0 || this.length < e || this.length < r) throw new RangeError('Out of range index')
						if (r <= e) return this
						var s
						if (((e >>>= 0), (r = void 0 === r ? this.length : r >>> 0), t || (t = 0), 'number' == typeof t))
							for (s = e; s < r; ++s) this[s] = t
						else {
							var o = l.isBuffer(t) ? t : M(new l(t, n).toString()),
								a = o.length
							for (s = 0; s < r - e; ++s) this[s + e] = o[s % a]
						}
						return this
					})
				var X = /[^+\/0-9A-Za-z-_]/g
				function R(t) {
					return t < 16 ? '0' + t.toString(16) : t.toString(16)
				}
				function M(t, e) {
					var r
					e = e || 1 / 0
					for (var n = t.length, i = null, s = [], o = 0; o < n; ++o) {
						if ((r = t.charCodeAt(o)) > 55295 && r < 57344) {
							if (!i) {
								if (r > 56319) {
									;(e -= 3) > -1 && s.push(239, 191, 189)
									continue
								}
								if (o + 1 === n) {
									;(e -= 3) > -1 && s.push(239, 191, 189)
									continue
								}
								i = r
								continue
							}
							if (r < 56320) {
								;(e -= 3) > -1 && s.push(239, 191, 189), (i = r)
								continue
							}
							r = 65536 + (((i - 55296) << 10) | (r - 56320))
						} else i && (e -= 3) > -1 && s.push(239, 191, 189)
						if (((i = null), r < 128)) {
							if ((e -= 1) < 0) break
							s.push(r)
						} else if (r < 2048) {
							if ((e -= 2) < 0) break
							s.push((r >> 6) | 192, (63 & r) | 128)
						} else if (r < 65536) {
							if ((e -= 3) < 0) break
							s.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128)
						} else {
							if (!(r < 1114112)) throw new Error('Invalid code point')
							if ((e -= 4) < 0) break
							s.push((r >> 18) | 240, ((r >> 12) & 63) | 128, ((r >> 6) & 63) | 128, (63 & r) | 128)
						}
					}
					return s
				}
				function z(t) {
					return n.toByteArray(
						(function (t) {
							if (
								(t = (function (t) {
									return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '')
								})(t).replace(X, '')).length < 2
							)
								return ''
							for (; t.length % 4 != 0; ) t += '='
							return t
						})(t)
					)
				}
				function U(t, e, r, n) {
					for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i) e[i + r] = t[i]
					return i
				}
			}.call(this, r(119)))
		},
		395: function (t, e, r) {
			'use strict'
			;(e.byteLength = function (t) {
				var e = u(t),
					r = e[0],
					n = e[1]
				return (3 * (r + n)) / 4 - n
			}),
				(e.toByteArray = function (t) {
					var e,
						r,
						n = u(t),
						o = n[0],
						a = n[1],
						l = new s(
							(function (t, e, r) {
								return (3 * (e + r)) / 4 - r
							})(0, o, a)
						),
						h = 0,
						f = a > 0 ? o - 4 : o
					for (r = 0; r < f; r += 4)
						(e =
							(i[t.charCodeAt(r)] << 18) |
							(i[t.charCodeAt(r + 1)] << 12) |
							(i[t.charCodeAt(r + 2)] << 6) |
							i[t.charCodeAt(r + 3)]),
							(l[h++] = (e >> 16) & 255),
							(l[h++] = (e >> 8) & 255),
							(l[h++] = 255 & e)
					2 === a && ((e = (i[t.charCodeAt(r)] << 2) | (i[t.charCodeAt(r + 1)] >> 4)), (l[h++] = 255 & e))
					1 === a &&
						((e = (i[t.charCodeAt(r)] << 10) | (i[t.charCodeAt(r + 1)] << 4) | (i[t.charCodeAt(r + 2)] >> 2)),
						(l[h++] = (e >> 8) & 255),
						(l[h++] = 255 & e))
					return l
				}),
				(e.fromByteArray = function (t) {
					for (var e, r = t.length, i = r % 3, s = [], o = 0, a = r - i; o < a; o += 16383)
						s.push(h(t, o, o + 16383 > a ? a : o + 16383))
					1 === i
						? ((e = t[r - 1]), s.push(n[e >> 2] + n[(e << 4) & 63] + '=='))
						: 2 === i &&
						  ((e = (t[r - 2] << 8) + t[r - 1]), s.push(n[e >> 10] + n[(e >> 4) & 63] + n[(e << 2) & 63] + '='))
					return s.join('')
				})
			for (
				var n = [],
					i = [],
					s = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
					o = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
					a = 0,
					l = o.length;
				a < l;
				++a
			)
				(n[a] = o[a]), (i[o.charCodeAt(a)] = a)
			function u(t) {
				var e = t.length
				if (e % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4')
				var r = t.indexOf('=')
				return -1 === r && (r = e), [r, r === e ? 0 : 4 - (r % 4)]
			}
			function h(t, e, r) {
				for (var i, s, o = [], a = e; a < r; a += 3)
					(i = ((t[a] << 16) & 16711680) + ((t[a + 1] << 8) & 65280) + (255 & t[a + 2])),
						o.push(n[((s = i) >> 18) & 63] + n[(s >> 12) & 63] + n[(s >> 6) & 63] + n[63 & s])
				return o.join('')
			}
			;(i['-'.charCodeAt(0)] = 62), (i['_'.charCodeAt(0)] = 63)
		},
		396: function (t, e) {
			;(e.read = function (t, e, r, n, i) {
				var s,
					o,
					a = 8 * i - n - 1,
					l = (1 << a) - 1,
					u = l >> 1,
					h = -7,
					f = r ? i - 1 : 0,
					p = r ? -1 : 1,
					c = t[e + f]
				for (f += p, s = c & ((1 << -h) - 1), c >>= -h, h += a; h > 0; s = 256 * s + t[e + f], f += p, h -= 8);
				for (o = s & ((1 << -h) - 1), s >>= -h, h += n; h > 0; o = 256 * o + t[e + f], f += p, h -= 8);
				if (0 === s) s = 1 - u
				else {
					if (s === l) return o ? NaN : (1 / 0) * (c ? -1 : 1)
					;(o += Math.pow(2, n)), (s -= u)
				}
				return (c ? -1 : 1) * o * Math.pow(2, s - n)
			}),
				(e.write = function (t, e, r, n, i, s) {
					var o,
						a,
						l,
						u = 8 * s - i - 1,
						h = (1 << u) - 1,
						f = h >> 1,
						p = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
						c = n ? 0 : s - 1,
						d = n ? 1 : -1,
						m = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0
					for (
						e = Math.abs(e),
							isNaN(e) || e === 1 / 0
								? ((a = isNaN(e) ? 1 : 0), (o = h))
								: ((o = Math.floor(Math.log(e) / Math.LN2)),
								  e * (l = Math.pow(2, -o)) < 1 && (o--, (l *= 2)),
								  (e += o + f >= 1 ? p / l : p * Math.pow(2, 1 - f)) * l >= 2 && (o++, (l /= 2)),
								  o + f >= h
										? ((a = 0), (o = h))
										: o + f >= 1
										? ((a = (e * l - 1) * Math.pow(2, i)), (o += f))
										: ((a = e * Math.pow(2, f - 1) * Math.pow(2, i)), (o = 0)));
						i >= 8;
						t[r + c] = 255 & a, c += d, a /= 256, i -= 8
					);
					for (o = (o << i) | a, u += i; u > 0; t[r + c] = 255 & o, c += d, o /= 256, u -= 8);
					t[r + c - d] |= 128 * m
				})
		},
		397: function (t, e) {
			var r = {}.toString
			t.exports =
				Array.isArray ||
				function (t) {
					return '[object Array]' == r.call(t)
				}
		},
		398: function (t, e, r) {
			!(function () {
				'use strict'
				var e,
					r = { version: '6.4.2.2', use_lines: !0, use_xyz: !1 },
					n = !1
				if (
					(t.exports
						? ((t.exports = r), (n = !0))
						: 'undefined' != typeof document
						? (window.ClipperLib = r)
						: (self.ClipperLib = r),
					n)
				) {
					i = 'chrome'
					e = 'Netscape'
				} else {
					var i = navigator.userAgent.toString().toLowerCase()
					e = navigator.appName
				}
				var s,
					o = {}
				;-1 != i.indexOf('chrome') && -1 == i.indexOf('chromium') ? (o.chrome = 1) : (o.chrome = 0),
					-1 != i.indexOf('chromium') ? (o.chromium = 1) : (o.chromium = 0),
					-1 != i.indexOf('safari') && -1 == i.indexOf('chrome') && -1 == i.indexOf('chromium')
						? (o.safari = 1)
						: (o.safari = 0),
					-1 != i.indexOf('firefox') ? (o.firefox = 1) : (o.firefox = 0),
					-1 != i.indexOf('firefox/17') ? (o.firefox17 = 1) : (o.firefox17 = 0),
					-1 != i.indexOf('firefox/15') ? (o.firefox15 = 1) : (o.firefox15 = 0),
					-1 != i.indexOf('firefox/3') ? (o.firefox3 = 1) : (o.firefox3 = 0),
					-1 != i.indexOf('opera') ? (o.opera = 1) : (o.opera = 0),
					-1 != i.indexOf('msie 10') ? (o.msie10 = 1) : (o.msie10 = 0),
					-1 != i.indexOf('msie 9') ? (o.msie9 = 1) : (o.msie9 = 0),
					-1 != i.indexOf('msie 8') ? (o.msie8 = 1) : (o.msie8 = 0),
					-1 != i.indexOf('msie 7') ? (o.msie7 = 1) : (o.msie7 = 0),
					-1 != i.indexOf('msie ') ? (o.msie = 1) : (o.msie = 0),
					(r.biginteger_used = null)
				function a(t, e, n) {
					;(r.biginteger_used = 1),
						null != t &&
							('number' == typeof t && void 0 === e
								? this.fromInt(t)
								: 'number' == typeof t
								? this.fromNumber(t, e, n)
								: null == e && 'string' != typeof t
								? this.fromString(t, 256)
								: this.fromString(t, e))
				}
				function l() {
					return new a(null, void 0, void 0)
				}
				'Microsoft Internet Explorer' == e
					? ((a.prototype.am = function (t, e, r, n, i, s) {
							for (var o = 32767 & e, a = e >> 15; --s >= 0; ) {
								var l = 32767 & this[t],
									u = this[t++] >> 15,
									h = a * l + u * o
								;(i =
									((l = o * l + ((32767 & h) << 15) + r[n] + (1073741823 & i)) >>> 30) +
									(h >>> 15) +
									a * u +
									(i >>> 30)),
									(r[n++] = 1073741823 & l)
							}
							return i
					  }),
					  (s = 30))
					: 'Netscape' != e
					? ((a.prototype.am = function (t, e, r, n, i, s) {
							for (; --s >= 0; ) {
								var o = e * this[t++] + r[n] + i
								;(i = Math.floor(o / 67108864)), (r[n++] = 67108863 & o)
							}
							return i
					  }),
					  (s = 26))
					: ((a.prototype.am = function (t, e, r, n, i, s) {
							for (var o = 16383 & e, a = e >> 14; --s >= 0; ) {
								var l = 16383 & this[t],
									u = this[t++] >> 14,
									h = a * l + u * o
								;(i = ((l = o * l + ((16383 & h) << 14) + r[n] + i) >> 28) + (h >> 14) + a * u),
									(r[n++] = 268435455 & l)
							}
							return i
					  }),
					  (s = 28)),
					(a.prototype.DB = s),
					(a.prototype.DM = (1 << s) - 1),
					(a.prototype.DV = 1 << s)
				;(a.prototype.FV = Math.pow(2, 52)), (a.prototype.F1 = 52 - s), (a.prototype.F2 = 2 * s - 52)
				var u,
					h,
					f = new Array()
				for (u = '0'.charCodeAt(0), h = 0; h <= 9; ++h) f[u++] = h
				for (u = 'a'.charCodeAt(0), h = 10; h < 36; ++h) f[u++] = h
				for (u = 'A'.charCodeAt(0), h = 10; h < 36; ++h) f[u++] = h
				function p(t) {
					return '0123456789abcdefghijklmnopqrstuvwxyz'.charAt(t)
				}
				function c(t, e) {
					var r = f[t.charCodeAt(e)]
					return null == r ? -1 : r
				}
				function d(t) {
					var e = l()
					return e.fromInt(t), e
				}
				function m(t) {
					var e,
						r = 1
					return (
						0 != (e = t >>> 16) && ((t = e), (r += 16)),
						0 != (e = t >> 8) && ((t = e), (r += 8)),
						0 != (e = t >> 4) && ((t = e), (r += 4)),
						0 != (e = t >> 2) && ((t = e), (r += 2)),
						0 != (e = t >> 1) && ((t = e), (r += 1)),
						r
					)
				}
				function y(t) {
					this.m = t
				}
				function v(t) {
					;(this.m = t),
						(this.mp = t.invDigit()),
						(this.mpl = 32767 & this.mp),
						(this.mph = this.mp >> 15),
						(this.um = (1 << (t.DB - 15)) - 1),
						(this.mt2 = 2 * t.t)
				}
				function g(t, e) {
					return t & e
				}
				function _(t, e) {
					return t | e
				}
				function x(t, e) {
					return t ^ e
				}
				function P(t, e) {
					return t & ~e
				}
				function b(t) {
					if (0 == t) return -1
					var e = 0
					return (
						0 == (65535 & t) && ((t >>= 16), (e += 16)),
						0 == (255 & t) && ((t >>= 8), (e += 8)),
						0 == (15 & t) && ((t >>= 4), (e += 4)),
						0 == (3 & t) && ((t >>= 2), (e += 2)),
						0 == (1 & t) && ++e,
						e
					)
				}
				function C(t) {
					for (var e = 0; 0 != t; ) (t &= t - 1), ++e
					return e
				}
				function w() {}
				function E(t) {
					return t
				}
				function I(t) {
					;(this.r2 = l()),
						(this.q3 = l()),
						a.ONE.dlShiftTo(2 * t.t, this.r2),
						(this.mu = this.r2.divide(t)),
						(this.m = t)
				}
				;(y.prototype.convert = function (t) {
					return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
				}),
					(y.prototype.revert = function (t) {
						return t
					}),
					(y.prototype.reduce = function (t) {
						t.divRemTo(this.m, null, t)
					}),
					(y.prototype.mulTo = function (t, e, r) {
						t.multiplyTo(e, r), this.reduce(r)
					}),
					(y.prototype.sqrTo = function (t, e) {
						t.squareTo(e), this.reduce(e)
					}),
					(v.prototype.convert = function (t) {
						var e = l()
						return (
							t.abs().dlShiftTo(this.m.t, e),
							e.divRemTo(this.m, null, e),
							t.s < 0 && e.compareTo(a.ZERO) > 0 && this.m.subTo(e, e),
							e
						)
					}),
					(v.prototype.revert = function (t) {
						var e = l()
						return t.copyTo(e), this.reduce(e), e
					}),
					(v.prototype.reduce = function (t) {
						for (; t.t <= this.mt2; ) t[t.t++] = 0
						for (var e = 0; e < this.m.t; ++e) {
							var r = 32767 & t[e],
								n = (r * this.mpl + (((r * this.mph + (t[e] >> 15) * this.mpl) & this.um) << 15)) & t.DM
							for (t[(r = e + this.m.t)] += this.m.am(0, n, t, e, 0, this.m.t); t[r] >= t.DV; ) (t[r] -= t.DV), t[++r]++
						}
						t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
					}),
					(v.prototype.mulTo = function (t, e, r) {
						t.multiplyTo(e, r), this.reduce(r)
					}),
					(v.prototype.sqrTo = function (t, e) {
						t.squareTo(e), this.reduce(e)
					}),
					(a.prototype.copyTo = function (t) {
						for (var e = this.t - 1; e >= 0; --e) t[e] = this[e]
						;(t.t = this.t), (t.s = this.s)
					}),
					(a.prototype.fromInt = function (t) {
						;(this.t = 1),
							(this.s = t < 0 ? -1 : 0),
							t > 0 ? (this[0] = t) : t < -1 ? (this[0] = t + this.DV) : (this.t = 0)
					}),
					(a.prototype.fromString = function (t, e) {
						var r
						if (16 == e) r = 4
						else if (8 == e) r = 3
						else if (256 == e) r = 8
						else if (2 == e) r = 1
						else if (32 == e) r = 5
						else {
							if (4 != e) return void this.fromRadix(t, e)
							r = 2
						}
						;(this.t = 0), (this.s = 0)
						for (var n = t.length, i = !1, s = 0; --n >= 0; ) {
							var o = 8 == r ? 255 & t[n] : c(t, n)
							o < 0
								? '-' == t.charAt(n) && (i = !0)
								: ((i = !1),
								  0 == s
										? (this[this.t++] = o)
										: s + r > this.DB
										? ((this[this.t - 1] |= (o & ((1 << (this.DB - s)) - 1)) << s),
										  (this[this.t++] = o >> (this.DB - s)))
										: (this[this.t - 1] |= o << s),
								  (s += r) >= this.DB && (s -= this.DB))
						}
						8 == r &&
							0 != (128 & t[0]) &&
							((this.s = -1), s > 0 && (this[this.t - 1] |= ((1 << (this.DB - s)) - 1) << s)),
							this.clamp(),
							i && a.ZERO.subTo(this, this)
					}),
					(a.prototype.clamp = function () {
						for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; ) --this.t
					}),
					(a.prototype.dlShiftTo = function (t, e) {
						var r
						for (r = this.t - 1; r >= 0; --r) e[r + t] = this[r]
						for (r = t - 1; r >= 0; --r) e[r] = 0
						;(e.t = this.t + t), (e.s = this.s)
					}),
					(a.prototype.drShiftTo = function (t, e) {
						for (var r = t; r < this.t; ++r) e[r - t] = this[r]
						;(e.t = Math.max(this.t - t, 0)), (e.s = this.s)
					}),
					(a.prototype.lShiftTo = function (t, e) {
						var r,
							n = t % this.DB,
							i = this.DB - n,
							s = (1 << i) - 1,
							o = Math.floor(t / this.DB),
							a = (this.s << n) & this.DM
						for (r = this.t - 1; r >= 0; --r) (e[r + o + 1] = (this[r] >> i) | a), (a = (this[r] & s) << n)
						for (r = o - 1; r >= 0; --r) e[r] = 0
						;(e[o] = a), (e.t = this.t + o + 1), (e.s = this.s), e.clamp()
					}),
					(a.prototype.rShiftTo = function (t, e) {
						e.s = this.s
						var r = Math.floor(t / this.DB)
						if (r >= this.t) e.t = 0
						else {
							var n = t % this.DB,
								i = this.DB - n,
								s = (1 << n) - 1
							e[0] = this[r] >> n
							for (var o = r + 1; o < this.t; ++o) (e[o - r - 1] |= (this[o] & s) << i), (e[o - r] = this[o] >> n)
							n > 0 && (e[this.t - r - 1] |= (this.s & s) << i), (e.t = this.t - r), e.clamp()
						}
					}),
					(a.prototype.subTo = function (t, e) {
						for (var r = 0, n = 0, i = Math.min(t.t, this.t); r < i; )
							(n += this[r] - t[r]), (e[r++] = n & this.DM), (n >>= this.DB)
						if (t.t < this.t) {
							for (n -= t.s; r < this.t; ) (n += this[r]), (e[r++] = n & this.DM), (n >>= this.DB)
							n += this.s
						} else {
							for (n += this.s; r < t.t; ) (n -= t[r]), (e[r++] = n & this.DM), (n >>= this.DB)
							n -= t.s
						}
						;(e.s = n < 0 ? -1 : 0), n < -1 ? (e[r++] = this.DV + n) : n > 0 && (e[r++] = n), (e.t = r), e.clamp()
					}),
					(a.prototype.multiplyTo = function (t, e) {
						var r = this.abs(),
							n = t.abs(),
							i = r.t
						for (e.t = i + n.t; --i >= 0; ) e[i] = 0
						for (i = 0; i < n.t; ++i) e[i + r.t] = r.am(0, n[i], e, i, 0, r.t)
						;(e.s = 0), e.clamp(), this.s != t.s && a.ZERO.subTo(e, e)
					}),
					(a.prototype.squareTo = function (t) {
						for (var e = this.abs(), r = (t.t = 2 * e.t); --r >= 0; ) t[r] = 0
						for (r = 0; r < e.t - 1; ++r) {
							var n = e.am(r, e[r], t, 2 * r, 0, 1)
							;(t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, n, e.t - r - 1)) >= e.DV &&
								((t[r + e.t] -= e.DV), (t[r + e.t + 1] = 1))
						}
						t.t > 0 && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)), (t.s = 0), t.clamp()
					}),
					(a.prototype.divRemTo = function (t, e, r) {
						var n = t.abs()
						if (!(n.t <= 0)) {
							var i = this.abs()
							if (i.t < n.t) return null != e && e.fromInt(0), void (null != r && this.copyTo(r))
							null == r && (r = l())
							var s = l(),
								o = this.s,
								u = t.s,
								h = this.DB - m(n[n.t - 1])
							h > 0 ? (n.lShiftTo(h, s), i.lShiftTo(h, r)) : (n.copyTo(s), i.copyTo(r))
							var f = s.t,
								p = s[f - 1]
							if (0 != p) {
								var c = p * (1 << this.F1) + (f > 1 ? s[f - 2] >> this.F2 : 0),
									d = this.FV / c,
									y = (1 << this.F1) / c,
									v = 1 << this.F2,
									g = r.t,
									_ = g - f,
									x = null == e ? l() : e
								for (
									s.dlShiftTo(_, x),
										r.compareTo(x) >= 0 && ((r[r.t++] = 1), r.subTo(x, r)),
										a.ONE.dlShiftTo(f, x),
										x.subTo(s, s);
									s.t < f;

								)
									s[s.t++] = 0
								for (; --_ >= 0; ) {
									var P = r[--g] == p ? this.DM : Math.floor(r[g] * d + (r[g - 1] + v) * y)
									if ((r[g] += s.am(0, P, r, _, 0, f)) < P)
										for (s.dlShiftTo(_, x), r.subTo(x, r); r[g] < --P; ) r.subTo(x, r)
								}
								null != e && (r.drShiftTo(f, e), o != u && a.ZERO.subTo(e, e)),
									(r.t = f),
									r.clamp(),
									h > 0 && r.rShiftTo(h, r),
									o < 0 && a.ZERO.subTo(r, r)
							}
						}
					}),
					(a.prototype.invDigit = function () {
						if (this.t < 1) return 0
						var t = this[0]
						if (0 == (1 & t)) return 0
						var e = 3 & t
						return (e =
							((e =
								((e = ((e = (e * (2 - (15 & t) * e)) & 15) * (2 - (255 & t) * e)) & 255) *
									(2 - (((65535 & t) * e) & 65535))) &
								65535) *
								(2 - ((t * e) % this.DV))) %
							this.DV) > 0
							? this.DV - e
							: -e
					}),
					(a.prototype.isEven = function () {
						return 0 == (this.t > 0 ? 1 & this[0] : this.s)
					}),
					(a.prototype.exp = function (t, e) {
						if (t > 4294967295 || t < 1) return a.ONE
						var r = l(),
							n = l(),
							i = e.convert(this),
							s = m(t) - 1
						for (i.copyTo(r); --s >= 0; )
							if ((e.sqrTo(r, n), (t & (1 << s)) > 0)) e.mulTo(n, i, r)
							else {
								var o = r
								;(r = n), (n = o)
							}
						return e.revert(r)
					}),
					(a.prototype.toString = function (t) {
						if (this.s < 0) return '-' + this.negate().toString(t)
						var e
						if (16 == t) e = 4
						else if (8 == t) e = 3
						else if (2 == t) e = 1
						else if (32 == t) e = 5
						else {
							if (4 != t) return this.toRadix(t)
							e = 2
						}
						var r,
							n = (1 << e) - 1,
							i = !1,
							s = '',
							o = this.t,
							a = this.DB - ((o * this.DB) % e)
						if (o-- > 0)
							for (a < this.DB && (r = this[o] >> a) > 0 && ((i = !0), (s = p(r))); o >= 0; )
								a < e
									? ((r = (this[o] & ((1 << a) - 1)) << (e - a)), (r |= this[--o] >> (a += this.DB - e)))
									: ((r = (this[o] >> (a -= e)) & n), a <= 0 && ((a += this.DB), --o)),
									r > 0 && (i = !0),
									i && (s += p(r))
						return i ? s : '0'
					}),
					(a.prototype.negate = function () {
						var t = l()
						return a.ZERO.subTo(this, t), t
					}),
					(a.prototype.abs = function () {
						return this.s < 0 ? this.negate() : this
					}),
					(a.prototype.compareTo = function (t) {
						var e = this.s - t.s
						if (0 != e) return e
						var r = this.t
						if (0 != (e = r - t.t)) return this.s < 0 ? -e : e
						for (; --r >= 0; ) if (0 != (e = this[r] - t[r])) return e
						return 0
					}),
					(a.prototype.bitLength = function () {
						return this.t <= 0 ? 0 : this.DB * (this.t - 1) + m(this[this.t - 1] ^ (this.s & this.DM))
					}),
					(a.prototype.mod = function (t) {
						var e = l()
						return this.abs().divRemTo(t, null, e), this.s < 0 && e.compareTo(a.ZERO) > 0 && t.subTo(e, e), e
					}),
					(a.prototype.modPowInt = function (t, e) {
						var r
						return (r = t < 256 || e.isEven() ? new y(e) : new v(e)), this.exp(t, r)
					}),
					(a.ZERO = d(0)),
					(a.ONE = d(1)),
					(w.prototype.convert = E),
					(w.prototype.revert = E),
					(w.prototype.mulTo = function (t, e, r) {
						t.multiplyTo(e, r)
					}),
					(w.prototype.sqrTo = function (t, e) {
						t.squareTo(e)
					}),
					(I.prototype.convert = function (t) {
						if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m)
						if (t.compareTo(this.m) < 0) return t
						var e = l()
						return t.copyTo(e), this.reduce(e), e
					}),
					(I.prototype.revert = function (t) {
						return t
					}),
					(I.prototype.reduce = function (t) {
						for (
							t.drShiftTo(this.m.t - 1, this.r2),
								t.t > this.m.t + 1 && ((t.t = this.m.t + 1), t.clamp()),
								this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
								this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
							t.compareTo(this.r2) < 0;

						)
							t.dAddOffset(1, this.m.t + 1)
						for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; ) t.subTo(this.m, t)
					}),
					(I.prototype.mulTo = function (t, e, r) {
						t.multiplyTo(e, r), this.reduce(r)
					}),
					(I.prototype.sqrTo = function (t, e) {
						t.squareTo(e), this.reduce(e)
					})
				var A = [
						2,
						3,
						5,
						7,
						11,
						13,
						17,
						19,
						23,
						29,
						31,
						37,
						41,
						43,
						47,
						53,
						59,
						61,
						67,
						71,
						73,
						79,
						83,
						89,
						97,
						101,
						103,
						107,
						109,
						113,
						127,
						131,
						137,
						139,
						149,
						151,
						157,
						163,
						167,
						173,
						179,
						181,
						191,
						193,
						197,
						199,
						211,
						223,
						227,
						229,
						233,
						239,
						241,
						251,
						257,
						263,
						269,
						271,
						277,
						281,
						283,
						293,
						307,
						311,
						313,
						317,
						331,
						337,
						347,
						349,
						353,
						359,
						367,
						373,
						379,
						383,
						389,
						397,
						401,
						409,
						419,
						421,
						431,
						433,
						439,
						443,
						449,
						457,
						461,
						463,
						467,
						479,
						487,
						491,
						499,
						503,
						509,
						521,
						523,
						541,
						547,
						557,
						563,
						569,
						571,
						577,
						587,
						593,
						599,
						601,
						607,
						613,
						617,
						619,
						631,
						641,
						643,
						647,
						653,
						659,
						661,
						673,
						677,
						683,
						691,
						701,
						709,
						719,
						727,
						733,
						739,
						743,
						751,
						757,
						761,
						769,
						773,
						787,
						797,
						809,
						811,
						821,
						823,
						827,
						829,
						839,
						853,
						857,
						859,
						863,
						877,
						881,
						883,
						887,
						907,
						911,
						919,
						929,
						937,
						941,
						947,
						953,
						967,
						971,
						977,
						983,
						991,
						997,
					],
					S = (1 << 26) / A[A.length - 1]
				;(a.prototype.chunkSize = function (t) {
					return Math.floor((Math.LN2 * this.DB) / Math.log(t))
				}),
					(a.prototype.toRadix = function (t) {
						if ((null == t && (t = 10), 0 == this.signum() || t < 2 || t > 36)) return '0'
						var e = this.chunkSize(t),
							r = Math.pow(t, e),
							n = d(r),
							i = l(),
							s = l(),
							o = ''
						for (this.divRemTo(n, i, s); i.signum() > 0; )
							(o = (r + s.intValue()).toString(t).substr(1) + o), i.divRemTo(n, i, s)
						return s.intValue().toString(t) + o
					}),
					(a.prototype.fromRadix = function (t, e) {
						this.fromInt(0), null == e && (e = 10)
						for (var r = this.chunkSize(e), n = Math.pow(e, r), i = !1, s = 0, o = 0, l = 0; l < t.length; ++l) {
							var u = c(t, l)
							u < 0
								? '-' == t.charAt(l) && 0 == this.signum() && (i = !0)
								: ((o = e * o + u), ++s >= r && (this.dMultiply(n), this.dAddOffset(o, 0), (s = 0), (o = 0)))
						}
						s > 0 && (this.dMultiply(Math.pow(e, s)), this.dAddOffset(o, 0)), i && a.ZERO.subTo(this, this)
					}),
					(a.prototype.fromNumber = function (t, e, r) {
						if ('number' == typeof e)
							if (t < 2) this.fromInt(1)
							else
								for (
									this.fromNumber(t, r),
										this.testBit(t - 1) || this.bitwiseTo(a.ONE.shiftLeft(t - 1), _, this),
										this.isEven() && this.dAddOffset(1, 0);
									!this.isProbablePrime(e);

								)
									this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(a.ONE.shiftLeft(t - 1), this)
						else {
							var n = new Array(),
								i = 7 & t
							;(n.length = 1 + (t >> 3)),
								e.nextBytes(n),
								i > 0 ? (n[0] &= (1 << i) - 1) : (n[0] = 0),
								this.fromString(n, 256)
						}
					}),
					(a.prototype.bitwiseTo = function (t, e, r) {
						var n,
							i,
							s = Math.min(t.t, this.t)
						for (n = 0; n < s; ++n) r[n] = e(this[n], t[n])
						if (t.t < this.t) {
							for (i = t.s & this.DM, n = s; n < this.t; ++n) r[n] = e(this[n], i)
							r.t = this.t
						} else {
							for (i = this.s & this.DM, n = s; n < t.t; ++n) r[n] = e(i, t[n])
							r.t = t.t
						}
						;(r.s = e(this.s, t.s)), r.clamp()
					}),
					(a.prototype.changeBit = function (t, e) {
						var r = a.ONE.shiftLeft(t)
						return this.bitwiseTo(r, e, r), r
					}),
					(a.prototype.addTo = function (t, e) {
						for (var r = 0, n = 0, i = Math.min(t.t, this.t); r < i; )
							(n += this[r] + t[r]), (e[r++] = n & this.DM), (n >>= this.DB)
						if (t.t < this.t) {
							for (n += t.s; r < this.t; ) (n += this[r]), (e[r++] = n & this.DM), (n >>= this.DB)
							n += this.s
						} else {
							for (n += this.s; r < t.t; ) (n += t[r]), (e[r++] = n & this.DM), (n >>= this.DB)
							n += t.s
						}
						;(e.s = n < 0 ? -1 : 0), n > 0 ? (e[r++] = n) : n < -1 && (e[r++] = this.DV + n), (e.t = r), e.clamp()
					}),
					(a.prototype.dMultiply = function (t) {
						;(this[this.t] = this.am(0, t - 1, this, 0, 0, this.t)), ++this.t, this.clamp()
					}),
					(a.prototype.dAddOffset = function (t, e) {
						if (0 != t) {
							for (; this.t <= e; ) this[this.t++] = 0
							for (this[e] += t; this[e] >= this.DV; )
								(this[e] -= this.DV), ++e >= this.t && (this[this.t++] = 0), ++this[e]
						}
					}),
					(a.prototype.multiplyLowerTo = function (t, e, r) {
						var n,
							i = Math.min(this.t + t.t, e)
						for (r.s = 0, r.t = i; i > 0; ) r[--i] = 0
						for (n = r.t - this.t; i < n; ++i) r[i + this.t] = this.am(0, t[i], r, i, 0, this.t)
						for (n = Math.min(t.t, e); i < n; ++i) this.am(0, t[i], r, i, 0, e - i)
						r.clamp()
					}),
					(a.prototype.multiplyUpperTo = function (t, e, r) {
						--e
						var n = (r.t = this.t + t.t - e)
						for (r.s = 0; --n >= 0; ) r[n] = 0
						for (n = Math.max(e - this.t, 0); n < t.t; ++n)
							r[this.t + n - e] = this.am(e - n, t[n], r, 0, 0, this.t + n - e)
						r.clamp(), r.drShiftTo(1, r)
					}),
					(a.prototype.modInt = function (t) {
						if (t <= 0) return 0
						var e = this.DV % t,
							r = this.s < 0 ? t - 1 : 0
						if (this.t > 0)
							if (0 == e) r = this[0] % t
							else for (var n = this.t - 1; n >= 0; --n) r = (e * r + this[n]) % t
						return r
					}),
					(a.prototype.millerRabin = function (t) {
						var e = this.subtract(a.ONE),
							r = e.getLowestSetBit()
						if (r <= 0) return !1
						var n = e.shiftRight(r)
						;(t = (t + 1) >> 1) > A.length && (t = A.length)
						for (var i = l(), s = 0; s < t; ++s) {
							i.fromInt(A[Math.floor(Math.random() * A.length)])
							var o = i.modPow(n, this)
							if (0 != o.compareTo(a.ONE) && 0 != o.compareTo(e)) {
								for (var u = 1; u++ < r && 0 != o.compareTo(e); )
									if (0 == (o = o.modPowInt(2, this)).compareTo(a.ONE)) return !1
								if (0 != o.compareTo(e)) return !1
							}
						}
						return !0
					}),
					(a.prototype.clone = function () {
						var t = l()
						return this.copyTo(t), t
					}),
					(a.prototype.intValue = function () {
						if (this.s < 0) {
							if (1 == this.t) return this[0] - this.DV
							if (0 == this.t) return -1
						} else {
							if (1 == this.t) return this[0]
							if (0 == this.t) return 0
						}
						return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0]
					}),
					(a.prototype.byteValue = function () {
						return 0 == this.t ? this.s : (this[0] << 24) >> 24
					}),
					(a.prototype.shortValue = function () {
						return 0 == this.t ? this.s : (this[0] << 16) >> 16
					}),
					(a.prototype.signum = function () {
						return this.s < 0 ? -1 : this.t <= 0 || (1 == this.t && this[0] <= 0) ? 0 : 1
					}),
					(a.prototype.toByteArray = function () {
						var t = this.t,
							e = new Array()
						e[0] = this.s
						var r,
							n = this.DB - ((t * this.DB) % 8),
							i = 0
						if (t-- > 0)
							for (
								n < this.DB &&
								(r = this[t] >> n) != (this.s & this.DM) >> n &&
								(e[i++] = r | (this.s << (this.DB - n)));
								t >= 0;

							)
								n < 8
									? ((r = (this[t] & ((1 << n) - 1)) << (8 - n)), (r |= this[--t] >> (n += this.DB - 8)))
									: ((r = (this[t] >> (n -= 8)) & 255), n <= 0 && ((n += this.DB), --t)),
									0 != (128 & r) && (r |= -256),
									0 == i && (128 & this.s) != (128 & r) && ++i,
									(i > 0 || r != this.s) && (e[i++] = r)
						return e
					}),
					(a.prototype.equals = function (t) {
						return 0 == this.compareTo(t)
					}),
					(a.prototype.min = function (t) {
						return this.compareTo(t) < 0 ? this : t
					}),
					(a.prototype.max = function (t) {
						return this.compareTo(t) > 0 ? this : t
					}),
					(a.prototype.and = function (t) {
						var e = l()
						return this.bitwiseTo(t, g, e), e
					}),
					(a.prototype.or = function (t) {
						var e = l()
						return this.bitwiseTo(t, _, e), e
					}),
					(a.prototype.xor = function (t) {
						var e = l()
						return this.bitwiseTo(t, x, e), e
					}),
					(a.prototype.andNot = function (t) {
						var e = l()
						return this.bitwiseTo(t, P, e), e
					}),
					(a.prototype.not = function () {
						for (var t = l(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e]
						return (t.t = this.t), (t.s = ~this.s), t
					}),
					(a.prototype.shiftLeft = function (t) {
						var e = l()
						return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e
					}),
					(a.prototype.shiftRight = function (t) {
						var e = l()
						return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e
					}),
					(a.prototype.getLowestSetBit = function () {
						for (var t = 0; t < this.t; ++t) if (0 != this[t]) return t * this.DB + b(this[t])
						return this.s < 0 ? this.t * this.DB : -1
					}),
					(a.prototype.bitCount = function () {
						for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r) t += C(this[r] ^ e)
						return t
					}),
					(a.prototype.testBit = function (t) {
						var e = Math.floor(t / this.DB)
						return e >= this.t ? 0 != this.s : 0 != (this[e] & (1 << t % this.DB))
					}),
					(a.prototype.setBit = function (t) {
						return this.changeBit(t, _)
					}),
					(a.prototype.clearBit = function (t) {
						return this.changeBit(t, P)
					}),
					(a.prototype.flipBit = function (t) {
						return this.changeBit(t, x)
					}),
					(a.prototype.add = function (t) {
						var e = l()
						return this.addTo(t, e), e
					}),
					(a.prototype.subtract = function (t) {
						var e = l()
						return this.subTo(t, e), e
					}),
					(a.prototype.multiply = function (t) {
						var e = l()
						return this.multiplyTo(t, e), e
					}),
					(a.prototype.divide = function (t) {
						var e = l()
						return this.divRemTo(t, e, null), e
					}),
					(a.prototype.remainder = function (t) {
						var e = l()
						return this.divRemTo(t, null, e), e
					}),
					(a.prototype.divideAndRemainder = function (t) {
						var e = l(),
							r = l()
						return this.divRemTo(t, e, r), new Array(e, r)
					}),
					(a.prototype.modPow = function (t, e) {
						var r,
							n,
							i = t.bitLength(),
							s = d(1)
						if (i <= 0) return s
						;(r = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6),
							(n = i < 8 ? new y(e) : e.isEven() ? new I(e) : new v(e))
						var o = new Array(),
							a = 3,
							u = r - 1,
							h = (1 << r) - 1
						if (((o[1] = n.convert(this)), r > 1)) {
							var f = l()
							for (n.sqrTo(o[1], f); a <= h; ) (o[a] = l()), n.mulTo(f, o[a - 2], o[a]), (a += 2)
						}
						var p,
							c,
							g = t.t - 1,
							_ = !0,
							x = l()
						for (i = m(t[g]) - 1; g >= 0; ) {
							for (
								i >= u
									? (p = (t[g] >> (i - u)) & h)
									: ((p = (t[g] & ((1 << (i + 1)) - 1)) << (u - i)), g > 0 && (p |= t[g - 1] >> (this.DB + i - u))),
									a = r;
								0 == (1 & p);

							)
								(p >>= 1), --a
							if (((i -= a) < 0 && ((i += this.DB), --g), _)) o[p].copyTo(s), (_ = !1)
							else {
								for (; a > 1; ) n.sqrTo(s, x), n.sqrTo(x, s), (a -= 2)
								a > 0 ? n.sqrTo(s, x) : ((c = s), (s = x), (x = c)), n.mulTo(x, o[p], s)
							}
							for (; g >= 0 && 0 == (t[g] & (1 << i)); )
								n.sqrTo(s, x), (c = s), (s = x), (x = c), --i < 0 && ((i = this.DB - 1), --g)
						}
						return n.revert(s)
					}),
					(a.prototype.modInverse = function (t) {
						var e = t.isEven()
						if ((this.isEven() && e) || 0 == t.signum()) return a.ZERO
						for (var r = t.clone(), n = this.clone(), i = d(1), s = d(0), o = d(0), l = d(1); 0 != r.signum(); ) {
							for (; r.isEven(); )
								r.rShiftTo(1, r),
									e
										? ((i.isEven() && s.isEven()) || (i.addTo(this, i), s.subTo(t, s)), i.rShiftTo(1, i))
										: s.isEven() || s.subTo(t, s),
									s.rShiftTo(1, s)
							for (; n.isEven(); )
								n.rShiftTo(1, n),
									e
										? ((o.isEven() && l.isEven()) || (o.addTo(this, o), l.subTo(t, l)), o.rShiftTo(1, o))
										: l.isEven() || l.subTo(t, l),
									l.rShiftTo(1, l)
							r.compareTo(n) >= 0
								? (r.subTo(n, r), e && i.subTo(o, i), s.subTo(l, s))
								: (n.subTo(r, n), e && o.subTo(i, o), l.subTo(s, l))
						}
						return 0 != n.compareTo(a.ONE)
							? a.ZERO
							: l.compareTo(t) >= 0
							? l.subtract(t)
							: l.signum() < 0
							? (l.addTo(t, l), l.signum() < 0 ? l.add(t) : l)
							: l
					}),
					(a.prototype.pow = function (t) {
						return this.exp(t, new w())
					}),
					(a.prototype.gcd = function (t) {
						var e = this.s < 0 ? this.negate() : this.clone(),
							r = t.s < 0 ? t.negate() : t.clone()
						if (e.compareTo(r) < 0) {
							var n = e
							;(e = r), (r = n)
						}
						var i = e.getLowestSetBit(),
							s = r.getLowestSetBit()
						if (s < 0) return e
						for (i < s && (s = i), s > 0 && (e.rShiftTo(s, e), r.rShiftTo(s, r)); e.signum() > 0; )
							(i = e.getLowestSetBit()) > 0 && e.rShiftTo(i, e),
								(i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r),
								e.compareTo(r) >= 0 ? (e.subTo(r, e), e.rShiftTo(1, e)) : (r.subTo(e, r), r.rShiftTo(1, r))
						return s > 0 && r.lShiftTo(s, r), r
					}),
					(a.prototype.isProbablePrime = function (t) {
						var e,
							r = this.abs()
						if (1 == r.t && r[0] <= A[A.length - 1]) {
							for (e = 0; e < A.length; ++e) if (r[0] == A[e]) return !0
							return !1
						}
						if (r.isEven()) return !1
						for (e = 1; e < A.length; ) {
							for (var n = A[e], i = e + 1; i < A.length && n < S; ) n *= A[i++]
							for (n = r.modInt(n); e < i; ) if (n % A[e++] == 0) return !1
						}
						return r.millerRabin(t)
					}),
					(a.prototype.square = function () {
						var t = l()
						return this.squareTo(t), t
					})
				var T = a
				;(T.prototype.IsNegative = function () {
					return -1 == this.compareTo(T.ZERO)
				}),
					(T.op_Equality = function (t, e) {
						return 0 == t.compareTo(e)
					}),
					(T.op_Inequality = function (t, e) {
						return 0 != t.compareTo(e)
					}),
					(T.op_GreaterThan = function (t, e) {
						return t.compareTo(e) > 0
					}),
					(T.op_LessThan = function (t, e) {
						return t.compareTo(e) < 0
					}),
					(T.op_Addition = function (t, e) {
						return new T(t, void 0, void 0).add(new T(e, void 0, void 0))
					}),
					(T.op_Subtraction = function (t, e) {
						return new T(t, void 0, void 0).subtract(new T(e, void 0, void 0))
					}),
					(T.Int128Mul = function (t, e) {
						return new T(t, void 0, void 0).multiply(new T(e, void 0, void 0))
					}),
					(T.op_Division = function (t, e) {
						return t.divide(e)
					}),
					(T.prototype.ToDouble = function () {
						return parseFloat(this.toString())
					})
				var k = function (t, e) {
					var r
					if (void 0 === Object.getOwnPropertyNames) {
						for (r in e.prototype)
							(void 0 !== t.prototype[r] && t.prototype[r] !== Object.prototype[r]) || (t.prototype[r] = e.prototype[r])
						for (r in e) void 0 === t[r] && (t[r] = e[r])
						t.$baseCtor = e
					} else {
						for (var n = Object.getOwnPropertyNames(e.prototype), i = 0; i < n.length; i++)
							void 0 === Object.getOwnPropertyDescriptor(t.prototype, n[i]) &&
								Object.defineProperty(t.prototype, n[i], Object.getOwnPropertyDescriptor(e.prototype, n[i]))
						for (r in e) void 0 === t[r] && (t[r] = e[r])
						t.$baseCtor = e
					}
				}
				;(r.Path = function () {
					return []
				}),
					(r.Path.prototype.push = Array.prototype.push),
					(r.Paths = function () {
						return []
					}),
					(r.Paths.prototype.push = Array.prototype.push),
					(r.DoublePoint = function () {
						var t = arguments
						;(this.X = 0),
							(this.Y = 0),
							1 === t.length
								? ((this.X = t[0].X), (this.Y = t[0].Y))
								: 2 === t.length && ((this.X = t[0]), (this.Y = t[1]))
					}),
					(r.DoublePoint0 = function () {
						;(this.X = 0), (this.Y = 0)
					}),
					(r.DoublePoint0.prototype = r.DoublePoint.prototype),
					(r.DoublePoint1 = function (t) {
						;(this.X = t.X), (this.Y = t.Y)
					}),
					(r.DoublePoint1.prototype = r.DoublePoint.prototype),
					(r.DoublePoint2 = function (t, e) {
						;(this.X = t), (this.Y = e)
					}),
					(r.DoublePoint2.prototype = r.DoublePoint.prototype),
					(r.PolyNode = function () {
						;(this.m_Parent = null),
							(this.m_polygon = new r.Path()),
							(this.m_Index = 0),
							(this.m_jointype = 0),
							(this.m_endtype = 0),
							(this.m_Childs = []),
							(this.IsOpen = !1)
					}),
					(r.PolyNode.prototype.IsHoleNode = function () {
						for (var t = !0, e = this.m_Parent; null !== e; ) (t = !t), (e = e.m_Parent)
						return t
					}),
					(r.PolyNode.prototype.ChildCount = function () {
						return this.m_Childs.length
					}),
					(r.PolyNode.prototype.Contour = function () {
						return this.m_polygon
					}),
					(r.PolyNode.prototype.AddChild = function (t) {
						var e = this.m_Childs.length
						this.m_Childs.push(t), (t.m_Parent = this), (t.m_Index = e)
					}),
					(r.PolyNode.prototype.GetNext = function () {
						return this.m_Childs.length > 0 ? this.m_Childs[0] : this.GetNextSiblingUp()
					}),
					(r.PolyNode.prototype.GetNextSiblingUp = function () {
						return null === this.m_Parent
							? null
							: this.m_Index === this.m_Parent.m_Childs.length - 1
							? this.m_Parent.GetNextSiblingUp()
							: this.m_Parent.m_Childs[this.m_Index + 1]
					}),
					(r.PolyNode.prototype.Childs = function () {
						return this.m_Childs
					}),
					(r.PolyNode.prototype.Parent = function () {
						return this.m_Parent
					}),
					(r.PolyNode.prototype.IsHole = function () {
						return this.IsHoleNode()
					}),
					(r.PolyTree = function () {
						;(this.m_AllPolys = []), r.PolyNode.call(this)
					}),
					(r.PolyTree.prototype.Clear = function () {
						for (var t = 0, e = this.m_AllPolys.length; t < e; t++) this.m_AllPolys[t] = null
						;(this.m_AllPolys.length = 0), (this.m_Childs.length = 0)
					}),
					(r.PolyTree.prototype.GetFirst = function () {
						return this.m_Childs.length > 0 ? this.m_Childs[0] : null
					}),
					(r.PolyTree.prototype.Total = function () {
						var t = this.m_AllPolys.length
						return t > 0 && this.m_Childs[0] !== this.m_AllPolys[0] && t--, t
					}),
					k(r.PolyTree, r.PolyNode),
					(r.Math_Abs_Int64 = r.Math_Abs_Int32 = r.Math_Abs_Double = function (t) {
						return Math.abs(t)
					}),
					(r.Math_Max_Int32_Int32 = function (t, e) {
						return Math.max(t, e)
					}),
					o.msie || o.opera || o.safari
						? (r.Cast_Int32 = function (t) {
								return 0 | t
						  })
						: (r.Cast_Int32 = function (t) {
								return ~~t
						  }),
					void 0 === Number.toInteger && (Number.toInteger = null),
					o.chrome
						? (r.Cast_Int64 = function (t) {
								return t < -2147483648 || t > 2147483647 ? (t < 0 ? Math.ceil(t) : Math.floor(t)) : ~~t
						  })
						: o.firefox && 'function' == typeof Number.toInteger
						? (r.Cast_Int64 = function (t) {
								return Number.toInteger(t)
						  })
						: o.msie7 || o.msie8
						? (r.Cast_Int64 = function (t) {
								return parseInt(t, 10)
						  })
						: o.msie
						? (r.Cast_Int64 = function (t) {
								return t < -2147483648 || t > 2147483647 ? (t < 0 ? Math.ceil(t) : Math.floor(t)) : 0 | t
						  })
						: (r.Cast_Int64 = function (t) {
								return t < 0 ? Math.ceil(t) : Math.floor(t)
						  }),
					(r.Clear = function (t) {
						t.length = 0
					}),
					(r.PI = 3.141592653589793),
					(r.PI2 = 6.283185307179586),
					(r.IntPoint = function () {
						var t = arguments,
							e = t.length
						if (((this.X = 0), (this.Y = 0), r.use_xyz))
							if (((this.Z = 0), 3 === e)) (this.X = t[0]), (this.Y = t[1]), (this.Z = t[2])
							else if (2 === e) (this.X = t[0]), (this.Y = t[1]), (this.Z = 0)
							else if (1 === e)
								if (t[0] instanceof r.DoublePoint) {
									var n = t[0]
									;(this.X = r.Clipper.Round(n.X)), (this.Y = r.Clipper.Round(n.Y)), (this.Z = 0)
								} else {
									void 0 === (i = t[0]).Z && (i.Z = 0), (this.X = i.X), (this.Y = i.Y), (this.Z = i.Z)
								}
							else (this.X = 0), (this.Y = 0), (this.Z = 0)
						else if (2 === e) (this.X = t[0]), (this.Y = t[1])
						else if (1 === e)
							if (t[0] instanceof r.DoublePoint) {
								n = t[0]
								;(this.X = r.Clipper.Round(n.X)), (this.Y = r.Clipper.Round(n.Y))
							} else {
								var i = t[0]
								;(this.X = i.X), (this.Y = i.Y)
							}
						else (this.X = 0), (this.Y = 0)
					}),
					(r.IntPoint.op_Equality = function (t, e) {
						return t.X === e.X && t.Y === e.Y
					}),
					(r.IntPoint.op_Inequality = function (t, e) {
						return t.X !== e.X || t.Y !== e.Y
					}),
					(r.IntPoint0 = function () {
						;(this.X = 0), (this.Y = 0), r.use_xyz && (this.Z = 0)
					}),
					(r.IntPoint0.prototype = r.IntPoint.prototype),
					(r.IntPoint1 = function (t) {
						;(this.X = t.X), (this.Y = t.Y), r.use_xyz && (void 0 === t.Z ? (this.Z = 0) : (this.Z = t.Z))
					}),
					(r.IntPoint1.prototype = r.IntPoint.prototype),
					(r.IntPoint1dp = function (t) {
						;(this.X = r.Clipper.Round(t.X)), (this.Y = r.Clipper.Round(t.Y)), r.use_xyz && (this.Z = 0)
					}),
					(r.IntPoint1dp.prototype = r.IntPoint.prototype),
					(r.IntPoint2 = function (t, e, n) {
						;(this.X = t), (this.Y = e), r.use_xyz && (this.Z = void 0 === n ? 0 : n)
					}),
					(r.IntPoint2.prototype = r.IntPoint.prototype),
					(r.IntRect = function () {
						var t = arguments,
							e = t.length
						if (4 === e) (this.left = t[0]), (this.top = t[1]), (this.right = t[2]), (this.bottom = t[3])
						else if (1 === e) {
							var r = t[0]
							;(this.left = r.left), (this.top = r.top), (this.right = r.right), (this.bottom = r.bottom)
						} else (this.left = 0), (this.top = 0), (this.right = 0), (this.bottom = 0)
					}),
					(r.IntRect0 = function () {
						;(this.left = 0), (this.top = 0), (this.right = 0), (this.bottom = 0)
					}),
					(r.IntRect0.prototype = r.IntRect.prototype),
					(r.IntRect1 = function (t) {
						;(this.left = t.left), (this.top = t.top), (this.right = t.right), (this.bottom = t.bottom)
					}),
					(r.IntRect1.prototype = r.IntRect.prototype),
					(r.IntRect4 = function (t, e, r, n) {
						;(this.left = t), (this.top = e), (this.right = r), (this.bottom = n)
					}),
					(r.IntRect4.prototype = r.IntRect.prototype),
					(r.ClipType = { ctIntersection: 0, ctUnion: 1, ctDifference: 2, ctXor: 3 }),
					(r.PolyType = { ptSubject: 0, ptClip: 1 }),
					(r.PolyFillType = { pftEvenOdd: 0, pftNonZero: 1, pftPositive: 2, pftNegative: 3 }),
					(r.JoinType = { jtSquare: 0, jtRound: 1, jtMiter: 2 }),
					(r.EndType = { etOpenSquare: 0, etOpenRound: 1, etOpenButt: 2, etClosedLine: 3, etClosedPolygon: 4 }),
					(r.EdgeSide = { esLeft: 0, esRight: 1 }),
					(r.Direction = { dRightToLeft: 0, dLeftToRight: 1 }),
					(r.TEdge = function () {
						;(this.Bot = new r.IntPoint0()),
							(this.Curr = new r.IntPoint0()),
							(this.Top = new r.IntPoint0()),
							(this.Delta = new r.IntPoint0()),
							(this.Dx = 0),
							(this.PolyTyp = r.PolyType.ptSubject),
							(this.Side = r.EdgeSide.esLeft),
							(this.WindDelta = 0),
							(this.WindCnt = 0),
							(this.WindCnt2 = 0),
							(this.OutIdx = 0),
							(this.Next = null),
							(this.Prev = null),
							(this.NextInLML = null),
							(this.NextInAEL = null),
							(this.PrevInAEL = null),
							(this.NextInSEL = null),
							(this.PrevInSEL = null)
					}),
					(r.IntersectNode = function () {
						;(this.Edge1 = null), (this.Edge2 = null), (this.Pt = new r.IntPoint0())
					}),
					(r.MyIntersectNodeSort = function () {}),
					(r.MyIntersectNodeSort.Compare = function (t, e) {
						var r = e.Pt.Y - t.Pt.Y
						return r > 0 ? 1 : r < 0 ? -1 : 0
					}),
					(r.LocalMinima = function () {
						;(this.Y = 0), (this.LeftBound = null), (this.RightBound = null), (this.Next = null)
					}),
					(r.Scanbeam = function () {
						;(this.Y = 0), (this.Next = null)
					}),
					(r.Maxima = function () {
						;(this.X = 0), (this.Next = null), (this.Prev = null)
					}),
					(r.OutRec = function () {
						;(this.Idx = 0),
							(this.IsHole = !1),
							(this.IsOpen = !1),
							(this.FirstLeft = null),
							(this.Pts = null),
							(this.BottomPt = null),
							(this.PolyNode = null)
					}),
					(r.OutPt = function () {
						;(this.Idx = 0), (this.Pt = new r.IntPoint0()), (this.Next = null), (this.Prev = null)
					}),
					(r.Join = function () {
						;(this.OutPt1 = null), (this.OutPt2 = null), (this.OffPt = new r.IntPoint0())
					}),
					(r.ClipperBase = function () {
						;(this.m_MinimaList = null),
							(this.m_CurrentLM = null),
							(this.m_edges = new Array()),
							(this.m_UseFullRange = !1),
							(this.m_HasOpenPaths = !1),
							(this.PreserveCollinear = !1),
							(this.m_Scanbeam = null),
							(this.m_PolyOuts = null),
							(this.m_ActiveEdges = null)
					}),
					(r.ClipperBase.horizontal = -9007199254740992),
					(r.ClipperBase.Skip = -2),
					(r.ClipperBase.Unassigned = -1),
					(r.ClipperBase.tolerance = 1e-20),
					(r.ClipperBase.loRange = 47453132),
					(r.ClipperBase.hiRange = 0xfffffffffffff),
					(r.ClipperBase.near_zero = function (t) {
						return t > -r.ClipperBase.tolerance && t < r.ClipperBase.tolerance
					}),
					(r.ClipperBase.IsHorizontal = function (t) {
						return 0 === t.Delta.Y
					}),
					(r.ClipperBase.prototype.PointIsVertex = function (t, e) {
						var n = e
						do {
							if (r.IntPoint.op_Equality(n.Pt, t)) return !0
							n = n.Next
						} while (n !== e)
						return !1
					}),
					(r.ClipperBase.prototype.PointOnLineSegment = function (t, e, r, n) {
						return n
							? (t.X === e.X && t.Y === e.Y) ||
									(t.X === r.X && t.Y === r.Y) ||
									(t.X > e.X == t.X < r.X &&
										t.Y > e.Y == t.Y < r.Y &&
										T.op_Equality(T.Int128Mul(t.X - e.X, r.Y - e.Y), T.Int128Mul(r.X - e.X, t.Y - e.Y)))
							: (t.X === e.X && t.Y === e.Y) ||
									(t.X === r.X && t.Y === r.Y) ||
									(t.X > e.X == t.X < r.X &&
										t.Y > e.Y == t.Y < r.Y &&
										(t.X - e.X) * (r.Y - e.Y) == (r.X - e.X) * (t.Y - e.Y))
					}),
					(r.ClipperBase.prototype.PointOnPolygon = function (t, e, r) {
						for (var n = e; ; ) {
							if (this.PointOnLineSegment(t, n.Pt, n.Next.Pt, r)) return !0
							if ((n = n.Next) === e) break
						}
						return !1
					}),
					(r.ClipperBase.prototype.SlopesEqual = r.ClipperBase.SlopesEqual = function () {
						var t,
							e,
							n,
							i,
							s,
							o,
							a = arguments,
							l = a.length
						return 3 === l
							? ((t = a[0]),
							  (e = a[1]),
							  a[2]
									? T.op_Equality(T.Int128Mul(t.Delta.Y, e.Delta.X), T.Int128Mul(t.Delta.X, e.Delta.Y))
									: r.Cast_Int64(t.Delta.Y * e.Delta.X) === r.Cast_Int64(t.Delta.X * e.Delta.Y))
							: 4 === l
							? ((n = a[0]),
							  (i = a[1]),
							  (s = a[2]),
							  a[3]
									? T.op_Equality(T.Int128Mul(n.Y - i.Y, i.X - s.X), T.Int128Mul(n.X - i.X, i.Y - s.Y))
									: r.Cast_Int64((n.Y - i.Y) * (i.X - s.X)) - r.Cast_Int64((n.X - i.X) * (i.Y - s.Y)) == 0)
							: ((n = a[0]),
							  (i = a[1]),
							  (s = a[2]),
							  (o = a[3]),
							  a[4]
									? T.op_Equality(T.Int128Mul(n.Y - i.Y, s.X - o.X), T.Int128Mul(n.X - i.X, s.Y - o.Y))
									: r.Cast_Int64((n.Y - i.Y) * (s.X - o.X)) - r.Cast_Int64((n.X - i.X) * (s.Y - o.Y)) == 0)
					}),
					(r.ClipperBase.SlopesEqual3 = function (t, e, n) {
						return n
							? T.op_Equality(T.Int128Mul(t.Delta.Y, e.Delta.X), T.Int128Mul(t.Delta.X, e.Delta.Y))
							: r.Cast_Int64(t.Delta.Y * e.Delta.X) === r.Cast_Int64(t.Delta.X * e.Delta.Y)
					}),
					(r.ClipperBase.SlopesEqual4 = function (t, e, n, i) {
						return i
							? T.op_Equality(T.Int128Mul(t.Y - e.Y, e.X - n.X), T.Int128Mul(t.X - e.X, e.Y - n.Y))
							: r.Cast_Int64((t.Y - e.Y) * (e.X - n.X)) - r.Cast_Int64((t.X - e.X) * (e.Y - n.Y)) == 0
					}),
					(r.ClipperBase.SlopesEqual5 = function (t, e, n, i, s) {
						return s
							? T.op_Equality(T.Int128Mul(t.Y - e.Y, n.X - i.X), T.Int128Mul(t.X - e.X, n.Y - i.Y))
							: r.Cast_Int64((t.Y - e.Y) * (n.X - i.X)) - r.Cast_Int64((t.X - e.X) * (n.Y - i.Y)) == 0
					}),
					(r.ClipperBase.prototype.Clear = function () {
						this.DisposeLocalMinimaList()
						for (var t = 0, e = this.m_edges.length; t < e; ++t) {
							for (var n = 0, i = this.m_edges[t].length; n < i; ++n) this.m_edges[t][n] = null
							r.Clear(this.m_edges[t])
						}
						r.Clear(this.m_edges), (this.m_UseFullRange = !1), (this.m_HasOpenPaths = !1)
					}),
					(r.ClipperBase.prototype.DisposeLocalMinimaList = function () {
						for (; null !== this.m_MinimaList; ) {
							var t = this.m_MinimaList.Next
							;(this.m_MinimaList = null), (this.m_MinimaList = t)
						}
						this.m_CurrentLM = null
					}),
					(r.ClipperBase.prototype.RangeTest = function (t, e) {
						e.Value
							? (t.X > r.ClipperBase.hiRange ||
									t.Y > r.ClipperBase.hiRange ||
									-t.X > r.ClipperBase.hiRange ||
									-t.Y > r.ClipperBase.hiRange) &&
							  r.Error('Coordinate outside allowed range in RangeTest().')
							: (t.X > r.ClipperBase.loRange ||
									t.Y > r.ClipperBase.loRange ||
									-t.X > r.ClipperBase.loRange ||
									-t.Y > r.ClipperBase.loRange) &&
							  ((e.Value = !0), this.RangeTest(t, e))
					}),
					(r.ClipperBase.prototype.InitEdge = function (t, e, n, i) {
						;(t.Next = e),
							(t.Prev = n),
							(t.Curr.X = i.X),
							(t.Curr.Y = i.Y),
							r.use_xyz && (t.Curr.Z = i.Z),
							(t.OutIdx = -1)
					}),
					(r.ClipperBase.prototype.InitEdge2 = function (t, e) {
						t.Curr.Y >= t.Next.Curr.Y
							? ((t.Bot.X = t.Curr.X),
							  (t.Bot.Y = t.Curr.Y),
							  r.use_xyz && (t.Bot.Z = t.Curr.Z),
							  (t.Top.X = t.Next.Curr.X),
							  (t.Top.Y = t.Next.Curr.Y),
							  r.use_xyz && (t.Top.Z = t.Next.Curr.Z))
							: ((t.Top.X = t.Curr.X),
							  (t.Top.Y = t.Curr.Y),
							  r.use_xyz && (t.Top.Z = t.Curr.Z),
							  (t.Bot.X = t.Next.Curr.X),
							  (t.Bot.Y = t.Next.Curr.Y),
							  r.use_xyz && (t.Bot.Z = t.Next.Curr.Z)),
							this.SetDx(t),
							(t.PolyTyp = e)
					}),
					(r.ClipperBase.prototype.FindNextLocMin = function (t) {
						for (var e; ; ) {
							for (; r.IntPoint.op_Inequality(t.Bot, t.Prev.Bot) || r.IntPoint.op_Equality(t.Curr, t.Top); ) t = t.Next
							if (t.Dx !== r.ClipperBase.horizontal && t.Prev.Dx !== r.ClipperBase.horizontal) break
							for (; t.Prev.Dx === r.ClipperBase.horizontal; ) t = t.Prev
							for (e = t; t.Dx === r.ClipperBase.horizontal; ) t = t.Next
							if (t.Top.Y !== t.Prev.Bot.Y) {
								e.Prev.Bot.X < t.Bot.X && (t = e)
								break
							}
						}
						return t
					}),
					(r.ClipperBase.prototype.ProcessBound = function (t, e) {
						var n,
							i,
							s = t
						if (s.OutIdx === r.ClipperBase.Skip) {
							if (((t = s), e)) {
								for (; t.Top.Y === t.Next.Bot.Y; ) t = t.Next
								for (; t !== s && t.Dx === r.ClipperBase.horizontal; ) t = t.Prev
							} else {
								for (; t.Top.Y === t.Prev.Bot.Y; ) t = t.Prev
								for (; t !== s && t.Dx === r.ClipperBase.horizontal; ) t = t.Next
							}
							if (t === s) s = e ? t.Next : t.Prev
							else {
								t = e ? s.Next : s.Prev
								var o = new r.LocalMinima()
								;(o.Next = null),
									(o.Y = t.Bot.Y),
									(o.LeftBound = null),
									(o.RightBound = t),
									(t.WindDelta = 0),
									(s = this.ProcessBound(t, e)),
									this.InsertLocalMinima(o)
							}
							return s
						}
						if (
							(t.Dx === r.ClipperBase.horizontal &&
								((n = e ? t.Prev : t.Next).Dx === r.ClipperBase.horizontal
									? n.Bot.X !== t.Bot.X && n.Top.X !== t.Bot.X && this.ReverseHorizontal(t)
									: n.Bot.X !== t.Bot.X && this.ReverseHorizontal(t)),
							(n = t),
							e)
						) {
							for (; s.Top.Y === s.Next.Bot.Y && s.Next.OutIdx !== r.ClipperBase.Skip; ) s = s.Next
							if (s.Dx === r.ClipperBase.horizontal && s.Next.OutIdx !== r.ClipperBase.Skip) {
								for (i = s; i.Prev.Dx === r.ClipperBase.horizontal; ) i = i.Prev
								i.Prev.Top.X > s.Next.Top.X && (s = i.Prev)
							}
							for (; t !== s; )
								(t.NextInLML = t.Next),
									t.Dx === r.ClipperBase.horizontal && t !== n && t.Bot.X !== t.Prev.Top.X && this.ReverseHorizontal(t),
									(t = t.Next)
							t.Dx === r.ClipperBase.horizontal && t !== n && t.Bot.X !== t.Prev.Top.X && this.ReverseHorizontal(t),
								(s = s.Next)
						} else {
							for (; s.Top.Y === s.Prev.Bot.Y && s.Prev.OutIdx !== r.ClipperBase.Skip; ) s = s.Prev
							if (s.Dx === r.ClipperBase.horizontal && s.Prev.OutIdx !== r.ClipperBase.Skip) {
								for (i = s; i.Next.Dx === r.ClipperBase.horizontal; ) i = i.Next
								;(i.Next.Top.X === s.Prev.Top.X || i.Next.Top.X > s.Prev.Top.X) && (s = i.Next)
							}
							for (; t !== s; )
								(t.NextInLML = t.Prev),
									t.Dx === r.ClipperBase.horizontal && t !== n && t.Bot.X !== t.Next.Top.X && this.ReverseHorizontal(t),
									(t = t.Prev)
							t.Dx === r.ClipperBase.horizontal && t !== n && t.Bot.X !== t.Next.Top.X && this.ReverseHorizontal(t),
								(s = s.Prev)
						}
						return s
					}),
					(r.ClipperBase.prototype.AddPath = function (t, e, n) {
						r.use_lines
							? n || e !== r.PolyType.ptClip || r.Error('AddPath: Open paths must be subject.')
							: n || r.Error('AddPath: Open paths have been disabled.')
						var i = t.length - 1
						if (n) for (; i > 0 && r.IntPoint.op_Equality(t[i], t[0]); ) --i
						for (; i > 0 && r.IntPoint.op_Equality(t[i], t[i - 1]); ) --i
						if ((n && i < 2) || (!n && i < 1)) return !1
						for (var s = new Array(), o = 0; o <= i; o++) s.push(new r.TEdge())
						var a = !0
						;(s[1].Curr.X = t[1].X), (s[1].Curr.Y = t[1].Y), r.use_xyz && (s[1].Curr.Z = t[1].Z)
						var l = { Value: this.m_UseFullRange }
						this.RangeTest(t[0], l),
							(this.m_UseFullRange = l.Value),
							(l.Value = this.m_UseFullRange),
							this.RangeTest(t[i], l),
							(this.m_UseFullRange = l.Value),
							this.InitEdge(s[0], s[1], s[i], t[0]),
							this.InitEdge(s[i], s[0], s[i - 1], t[i])
						for (o = i - 1; o >= 1; --o)
							(l.Value = this.m_UseFullRange),
								this.RangeTest(t[o], l),
								(this.m_UseFullRange = l.Value),
								this.InitEdge(s[o], s[o + 1], s[o - 1], t[o])
						for (var u, h = s[0], f = h, p = h; ; )
							if (f.Curr !== f.Next.Curr || (!n && f.Next === h)) {
								if (f.Prev === f.Next) break
								if (
									!n ||
									!r.ClipperBase.SlopesEqual4(f.Prev.Curr, f.Curr, f.Next.Curr, this.m_UseFullRange) ||
									(this.PreserveCollinear && this.Pt2IsBetweenPt1AndPt3(f.Prev.Curr, f.Curr, f.Next.Curr))
								) {
									if ((f = f.Next) === p || (!n && f.Next === h)) break
								} else f === h && (h = f.Next), (p = f = (f = this.RemoveEdge(f)).Prev)
							} else {
								if (f === f.Next) break
								f === h && (h = f.Next), (p = f = this.RemoveEdge(f))
							}
						if ((!n && f === f.Next) || (n && f.Prev === f.Next)) return !1
						n || ((this.m_HasOpenPaths = !0), (h.Prev.OutIdx = r.ClipperBase.Skip)), (f = h)
						do {
							this.InitEdge2(f, e), (f = f.Next), a && f.Curr.Y !== h.Curr.Y && (a = !1)
						} while (f !== h)
						if (a) {
							if (n) return !1
							for (
								f.Prev.OutIdx = r.ClipperBase.Skip,
									(d = new r.LocalMinima()).Next = null,
									d.Y = f.Bot.Y,
									d.LeftBound = null,
									d.RightBound = f,
									d.RightBound.Side = r.EdgeSide.esRight,
									d.RightBound.WindDelta = 0;
								f.Bot.X !== f.Prev.Top.X && this.ReverseHorizontal(f), f.Next.OutIdx !== r.ClipperBase.Skip;

							)
								(f.NextInLML = f.Next), (f = f.Next)
							return this.InsertLocalMinima(d), this.m_edges.push(s), !0
						}
						this.m_edges.push(s)
						var c = null
						for (r.IntPoint.op_Equality(f.Prev.Bot, f.Prev.Top) && (f = f.Next); (f = this.FindNextLocMin(f)) !== c; ) {
							var d
							null === c && (c = f),
								((d = new r.LocalMinima()).Next = null),
								(d.Y = f.Bot.Y),
								f.Dx < f.Prev.Dx
									? ((d.LeftBound = f.Prev), (d.RightBound = f), (u = !1))
									: ((d.LeftBound = f), (d.RightBound = f.Prev), (u = !0)),
								(d.LeftBound.Side = r.EdgeSide.esLeft),
								(d.RightBound.Side = r.EdgeSide.esRight),
								n
									? d.LeftBound.Next === d.RightBound
										? (d.LeftBound.WindDelta = -1)
										: (d.LeftBound.WindDelta = 1)
									: (d.LeftBound.WindDelta = 0),
								(d.RightBound.WindDelta = -d.LeftBound.WindDelta),
								(f = this.ProcessBound(d.LeftBound, u)).OutIdx === r.ClipperBase.Skip && (f = this.ProcessBound(f, u))
							var m = this.ProcessBound(d.RightBound, !u)
							m.OutIdx === r.ClipperBase.Skip && (m = this.ProcessBound(m, !u)),
								d.LeftBound.OutIdx === r.ClipperBase.Skip
									? (d.LeftBound = null)
									: d.RightBound.OutIdx === r.ClipperBase.Skip && (d.RightBound = null),
								this.InsertLocalMinima(d),
								u || (f = m)
						}
						return !0
					}),
					(r.ClipperBase.prototype.AddPaths = function (t, e, r) {
						for (var n = !1, i = 0, s = t.length; i < s; ++i) this.AddPath(t[i], e, r) && (n = !0)
						return n
					}),
					(r.ClipperBase.prototype.Pt2IsBetweenPt1AndPt3 = function (t, e, n) {
						return (
							!(r.IntPoint.op_Equality(t, n) || r.IntPoint.op_Equality(t, e) || r.IntPoint.op_Equality(n, e)) &&
							(t.X !== n.X ? e.X > t.X == e.X < n.X : e.Y > t.Y == e.Y < n.Y)
						)
					}),
					(r.ClipperBase.prototype.RemoveEdge = function (t) {
						;(t.Prev.Next = t.Next), (t.Next.Prev = t.Prev)
						var e = t.Next
						return (t.Prev = null), e
					}),
					(r.ClipperBase.prototype.SetDx = function (t) {
						;(t.Delta.X = t.Top.X - t.Bot.X),
							(t.Delta.Y = t.Top.Y - t.Bot.Y),
							0 === t.Delta.Y ? (t.Dx = r.ClipperBase.horizontal) : (t.Dx = t.Delta.X / t.Delta.Y)
					}),
					(r.ClipperBase.prototype.InsertLocalMinima = function (t) {
						if (null === this.m_MinimaList) this.m_MinimaList = t
						else if (t.Y >= this.m_MinimaList.Y) (t.Next = this.m_MinimaList), (this.m_MinimaList = t)
						else {
							for (var e = this.m_MinimaList; null !== e.Next && t.Y < e.Next.Y; ) e = e.Next
							;(t.Next = e.Next), (e.Next = t)
						}
					}),
					(r.ClipperBase.prototype.PopLocalMinima = function (t, e) {
						return (
							(e.v = this.m_CurrentLM),
							null !== this.m_CurrentLM && this.m_CurrentLM.Y === t && ((this.m_CurrentLM = this.m_CurrentLM.Next), !0)
						)
					}),
					(r.ClipperBase.prototype.ReverseHorizontal = function (t) {
						var e = t.Top.X
						;(t.Top.X = t.Bot.X), (t.Bot.X = e), r.use_xyz && ((e = t.Top.Z), (t.Top.Z = t.Bot.Z), (t.Bot.Z = e))
					}),
					(r.ClipperBase.prototype.Reset = function () {
						if (((this.m_CurrentLM = this.m_MinimaList), null !== this.m_CurrentLM)) {
							this.m_Scanbeam = null
							for (var t = this.m_MinimaList; null !== t; ) {
								this.InsertScanbeam(t.Y)
								var e = t.LeftBound
								null !== e &&
									((e.Curr.X = e.Bot.X),
									(e.Curr.Y = e.Bot.Y),
									r.use_xyz && (e.Curr.Z = e.Bot.Z),
									(e.OutIdx = r.ClipperBase.Unassigned)),
									null !== (e = t.RightBound) &&
										((e.Curr.X = e.Bot.X),
										(e.Curr.Y = e.Bot.Y),
										r.use_xyz && (e.Curr.Z = e.Bot.Z),
										(e.OutIdx = r.ClipperBase.Unassigned)),
									(t = t.Next)
							}
							this.m_ActiveEdges = null
						}
					}),
					(r.ClipperBase.prototype.InsertScanbeam = function (t) {
						if (null === this.m_Scanbeam)
							(this.m_Scanbeam = new r.Scanbeam()), (this.m_Scanbeam.Next = null), (this.m_Scanbeam.Y = t)
						else if (t > this.m_Scanbeam.Y) {
							var e = new r.Scanbeam()
							;(e.Y = t), (e.Next = this.m_Scanbeam), (this.m_Scanbeam = e)
						} else {
							for (var n = this.m_Scanbeam; null !== n.Next && t <= n.Next.Y; ) n = n.Next
							if (t === n.Y) return
							var i = new r.Scanbeam()
							;(i.Y = t), (i.Next = n.Next), (n.Next = i)
						}
					}),
					(r.ClipperBase.prototype.PopScanbeam = function (t) {
						return null === this.m_Scanbeam
							? ((t.v = 0), !1)
							: ((t.v = this.m_Scanbeam.Y), (this.m_Scanbeam = this.m_Scanbeam.Next), !0)
					}),
					(r.ClipperBase.prototype.LocalMinimaPending = function () {
						return null !== this.m_CurrentLM
					}),
					(r.ClipperBase.prototype.CreateOutRec = function () {
						var t = new r.OutRec()
						return (
							(t.Idx = r.ClipperBase.Unassigned),
							(t.IsHole = !1),
							(t.IsOpen = !1),
							(t.FirstLeft = null),
							(t.Pts = null),
							(t.BottomPt = null),
							(t.PolyNode = null),
							this.m_PolyOuts.push(t),
							(t.Idx = this.m_PolyOuts.length - 1),
							t
						)
					}),
					(r.ClipperBase.prototype.DisposeOutRec = function (t) {
						var e = this.m_PolyOuts[t]
						;(e.Pts = null), (e = null), (this.m_PolyOuts[t] = null)
					}),
					(r.ClipperBase.prototype.UpdateEdgeIntoAEL = function (t) {
						null === t.NextInLML && r.Error('UpdateEdgeIntoAEL: invalid call')
						var e = t.PrevInAEL,
							n = t.NextInAEL
						return (
							(t.NextInLML.OutIdx = t.OutIdx),
							null !== e ? (e.NextInAEL = t.NextInLML) : (this.m_ActiveEdges = t.NextInLML),
							null !== n && (n.PrevInAEL = t.NextInLML),
							(t.NextInLML.Side = t.Side),
							(t.NextInLML.WindDelta = t.WindDelta),
							(t.NextInLML.WindCnt = t.WindCnt),
							(t.NextInLML.WindCnt2 = t.WindCnt2),
							((t = t.NextInLML).Curr.X = t.Bot.X),
							(t.Curr.Y = t.Bot.Y),
							(t.PrevInAEL = e),
							(t.NextInAEL = n),
							r.ClipperBase.IsHorizontal(t) || this.InsertScanbeam(t.Top.Y),
							t
						)
					}),
					(r.ClipperBase.prototype.SwapPositionsInAEL = function (t, e) {
						if (t.NextInAEL !== t.PrevInAEL && e.NextInAEL !== e.PrevInAEL) {
							if (t.NextInAEL === e) {
								var r = e.NextInAEL
								null !== r && (r.PrevInAEL = t)
								var n = t.PrevInAEL
								null !== n && (n.NextInAEL = e),
									(e.PrevInAEL = n),
									(e.NextInAEL = t),
									(t.PrevInAEL = e),
									(t.NextInAEL = r)
							} else if (e.NextInAEL === t) {
								var i = t.NextInAEL
								null !== i && (i.PrevInAEL = e)
								var s = e.PrevInAEL
								null !== s && (s.NextInAEL = t),
									(t.PrevInAEL = s),
									(t.NextInAEL = e),
									(e.PrevInAEL = t),
									(e.NextInAEL = i)
							} else {
								var o = t.NextInAEL,
									a = t.PrevInAEL
								;(t.NextInAEL = e.NextInAEL),
									null !== t.NextInAEL && (t.NextInAEL.PrevInAEL = t),
									(t.PrevInAEL = e.PrevInAEL),
									null !== t.PrevInAEL && (t.PrevInAEL.NextInAEL = t),
									(e.NextInAEL = o),
									null !== e.NextInAEL && (e.NextInAEL.PrevInAEL = e),
									(e.PrevInAEL = a),
									null !== e.PrevInAEL && (e.PrevInAEL.NextInAEL = e)
							}
							null === t.PrevInAEL ? (this.m_ActiveEdges = t) : null === e.PrevInAEL && (this.m_ActiveEdges = e)
						}
					}),
					(r.ClipperBase.prototype.DeleteFromAEL = function (t) {
						var e = t.PrevInAEL,
							r = t.NextInAEL
						;(null === e && null === r && t !== this.m_ActiveEdges) ||
							(null !== e ? (e.NextInAEL = r) : (this.m_ActiveEdges = r),
							null !== r && (r.PrevInAEL = e),
							(t.NextInAEL = null),
							(t.PrevInAEL = null))
					}),
					(r.Clipper = function (t) {
						void 0 === t && (t = 0),
							(this.m_PolyOuts = null),
							(this.m_ClipType = r.ClipType.ctIntersection),
							(this.m_Scanbeam = null),
							(this.m_Maxima = null),
							(this.m_ActiveEdges = null),
							(this.m_SortedEdges = null),
							(this.m_IntersectList = null),
							(this.m_IntersectNodeComparer = null),
							(this.m_ExecuteLocked = !1),
							(this.m_ClipFillType = r.PolyFillType.pftEvenOdd),
							(this.m_SubjFillType = r.PolyFillType.pftEvenOdd),
							(this.m_Joins = null),
							(this.m_GhostJoins = null),
							(this.m_UsingPolyTree = !1),
							(this.ReverseSolution = !1),
							(this.StrictlySimple = !1),
							r.ClipperBase.call(this),
							(this.m_Scanbeam = null),
							(this.m_Maxima = null),
							(this.m_ActiveEdges = null),
							(this.m_SortedEdges = null),
							(this.m_IntersectList = new Array()),
							(this.m_IntersectNodeComparer = r.MyIntersectNodeSort.Compare),
							(this.m_ExecuteLocked = !1),
							(this.m_UsingPolyTree = !1),
							(this.m_PolyOuts = new Array()),
							(this.m_Joins = new Array()),
							(this.m_GhostJoins = new Array()),
							(this.ReverseSolution = 0 != (1 & t)),
							(this.StrictlySimple = 0 != (2 & t)),
							(this.PreserveCollinear = 0 != (4 & t)),
							r.use_xyz && (this.ZFillFunction = null)
					}),
					(r.Clipper.ioReverseSolution = 1),
					(r.Clipper.ioStrictlySimple = 2),
					(r.Clipper.ioPreserveCollinear = 4),
					(r.Clipper.prototype.Clear = function () {
						0 !== this.m_edges.length && (this.DisposeAllPolyPts(), r.ClipperBase.prototype.Clear.call(this))
					}),
					(r.Clipper.prototype.InsertMaxima = function (t) {
						var e = new r.Maxima()
						if (((e.X = t), null === this.m_Maxima))
							(this.m_Maxima = e), (this.m_Maxima.Next = null), (this.m_Maxima.Prev = null)
						else if (t < this.m_Maxima.X) (e.Next = this.m_Maxima), (e.Prev = null), (this.m_Maxima = e)
						else {
							for (var n = this.m_Maxima; null !== n.Next && t >= n.Next.X; ) n = n.Next
							if (t === n.X) return
							;(e.Next = n.Next), (e.Prev = n), null !== n.Next && (n.Next.Prev = e), (n.Next = e)
						}
					}),
					(r.Clipper.prototype.Execute = function () {
						var t = arguments,
							e = t.length,
							n = t[1] instanceof r.PolyTree
						if (4 === e && !n) {
							var i = t[0],
								s = t[1],
								o = t[2],
								a = t[3]
							if (this.m_ExecuteLocked) return !1
							this.m_HasOpenPaths && r.Error('Error: PolyTree struct is needed for open path clipping.'),
								(this.m_ExecuteLocked = !0),
								r.Clear(s),
								(this.m_SubjFillType = o),
								(this.m_ClipFillType = a),
								(this.m_ClipType = i),
								(this.m_UsingPolyTree = !1)
							try {
								;(u = this.ExecuteInternal()) && this.BuildResult(s)
							} finally {
								this.DisposeAllPolyPts(), (this.m_ExecuteLocked = !1)
							}
							return u
						}
						if (4 === e && n) {
							i = t[0]
							var l = t[1]
							;(o = t[2]), (a = t[3])
							if (this.m_ExecuteLocked) return !1
							;(this.m_ExecuteLocked = !0),
								(this.m_SubjFillType = o),
								(this.m_ClipFillType = a),
								(this.m_ClipType = i),
								(this.m_UsingPolyTree = !0)
							try {
								var u
								;(u = this.ExecuteInternal()) && this.BuildResult2(l)
							} finally {
								this.DisposeAllPolyPts(), (this.m_ExecuteLocked = !1)
							}
							return u
						}
						if (2 === e && !n) {
							;(i = t[0]), (s = t[1])
							return this.Execute(i, s, r.PolyFillType.pftEvenOdd, r.PolyFillType.pftEvenOdd)
						}
						if (2 === e && n) {
							;(i = t[0]), (l = t[1])
							return this.Execute(i, l, r.PolyFillType.pftEvenOdd, r.PolyFillType.pftEvenOdd)
						}
					}),
					(r.Clipper.prototype.FixHoleLinkage = function (t) {
						if (null !== t.FirstLeft && (t.IsHole === t.FirstLeft.IsHole || null === t.FirstLeft.Pts)) {
							for (var e = t.FirstLeft; null !== e && (e.IsHole === t.IsHole || null === e.Pts); ) e = e.FirstLeft
							t.FirstLeft = e
						}
					}),
					(r.Clipper.prototype.ExecuteInternal = function () {
						try {
							this.Reset(), (this.m_SortedEdges = null), (this.m_Maxima = null)
							var t,
								e,
								r,
								n = {},
								i = {}
							if (!this.PopScanbeam(n)) return !1
							for (this.InsertLocalMinimaIntoAEL(n.v); this.PopScanbeam(i) || this.LocalMinimaPending(); ) {
								if ((this.ProcessHorizontals(), (this.m_GhostJoins.length = 0), !this.ProcessIntersections(i.v)))
									return !1
								this.ProcessEdgesAtTopOfScanbeam(i.v), (n.v = i.v), this.InsertLocalMinimaIntoAEL(n.v)
							}
							for (e = 0, r = this.m_PolyOuts.length; e < r; e++)
								null === (t = this.m_PolyOuts[e]).Pts ||
									t.IsOpen ||
									((t.IsHole ^ this.ReverseSolution) == this.Area$1(t) > 0 && this.ReversePolyPtLinks(t.Pts))
							for (this.JoinCommonEdges(), e = 0, r = this.m_PolyOuts.length; e < r; e++)
								null !== (t = this.m_PolyOuts[e]).Pts && (t.IsOpen ? this.FixupOutPolyline(t) : this.FixupOutPolygon(t))
							return this.StrictlySimple && this.DoSimplePolygons(), !0
						} finally {
							;(this.m_Joins.length = 0), (this.m_GhostJoins.length = 0)
						}
					}),
					(r.Clipper.prototype.DisposeAllPolyPts = function () {
						for (var t = 0, e = this.m_PolyOuts.length; t < e; ++t) this.DisposeOutRec(t)
						r.Clear(this.m_PolyOuts)
					}),
					(r.Clipper.prototype.AddJoin = function (t, e, n) {
						var i = new r.Join()
						;(i.OutPt1 = t),
							(i.OutPt2 = e),
							(i.OffPt.X = n.X),
							(i.OffPt.Y = n.Y),
							r.use_xyz && (i.OffPt.Z = n.Z),
							this.m_Joins.push(i)
					}),
					(r.Clipper.prototype.AddGhostJoin = function (t, e) {
						var n = new r.Join()
						;(n.OutPt1 = t),
							(n.OffPt.X = e.X),
							(n.OffPt.Y = e.Y),
							r.use_xyz && (n.OffPt.Z = e.Z),
							this.m_GhostJoins.push(n)
					}),
					(r.Clipper.prototype.SetZ = function (t, e, n) {
						if (null !== this.ZFillFunction) {
							if (0 !== t.Z || null === this.ZFillFunction) return
							r.IntPoint.op_Equality(t, e.Bot)
								? (t.Z = e.Bot.Z)
								: r.IntPoint.op_Equality(t, e.Top)
								? (t.Z = e.Top.Z)
								: r.IntPoint.op_Equality(t, n.Bot)
								? (t.Z = n.Bot.Z)
								: r.IntPoint.op_Equality(t, n.Top)
								? (t.Z = n.Top.Z)
								: this.ZFillFunction(e.Bot, e.Top, n.Bot, n.Top, t)
						}
					}),
					(r.Clipper.prototype.InsertLocalMinimaIntoAEL = function (t) {
						for (var e, n, i = {}; this.PopLocalMinima(t, i); ) {
							;(e = i.v.LeftBound), (n = i.v.RightBound)
							var s = null
							if (
								(null === e
									? (this.InsertEdgeIntoAEL(n, null),
									  this.SetWindingCount(n),
									  this.IsContributing(n) && (s = this.AddOutPt(n, n.Bot)))
									: null === n
									? (this.InsertEdgeIntoAEL(e, null),
									  this.SetWindingCount(e),
									  this.IsContributing(e) && (s = this.AddOutPt(e, e.Bot)),
									  this.InsertScanbeam(e.Top.Y))
									: (this.InsertEdgeIntoAEL(e, null),
									  this.InsertEdgeIntoAEL(n, e),
									  this.SetWindingCount(e),
									  (n.WindCnt = e.WindCnt),
									  (n.WindCnt2 = e.WindCnt2),
									  this.IsContributing(e) && (s = this.AddLocalMinPoly(e, n, e.Bot)),
									  this.InsertScanbeam(e.Top.Y)),
								null !== n &&
									(r.ClipperBase.IsHorizontal(n)
										? (null !== n.NextInLML && this.InsertScanbeam(n.NextInLML.Top.Y), this.AddEdgeToSEL(n))
										: this.InsertScanbeam(n.Top.Y)),
								null !== e && null !== n)
							) {
								if (null !== s && r.ClipperBase.IsHorizontal(n) && this.m_GhostJoins.length > 0 && 0 !== n.WindDelta)
									for (var o = 0, a = this.m_GhostJoins.length; o < a; o++) {
										var l = this.m_GhostJoins[o]
										this.HorzSegmentsOverlap(l.OutPt1.Pt.X, l.OffPt.X, n.Bot.X, n.Top.X) &&
											this.AddJoin(l.OutPt1, s, l.OffPt)
									}
								if (
									e.OutIdx >= 0 &&
									null !== e.PrevInAEL &&
									e.PrevInAEL.Curr.X === e.Bot.X &&
									e.PrevInAEL.OutIdx >= 0 &&
									r.ClipperBase.SlopesEqual5(e.PrevInAEL.Curr, e.PrevInAEL.Top, e.Curr, e.Top, this.m_UseFullRange) &&
									0 !== e.WindDelta &&
									0 !== e.PrevInAEL.WindDelta
								) {
									var u = this.AddOutPt(e.PrevInAEL, e.Bot)
									this.AddJoin(s, u, e.Top)
								}
								if (e.NextInAEL !== n) {
									if (
										n.OutIdx >= 0 &&
										n.PrevInAEL.OutIdx >= 0 &&
										r.ClipperBase.SlopesEqual5(n.PrevInAEL.Curr, n.PrevInAEL.Top, n.Curr, n.Top, this.m_UseFullRange) &&
										0 !== n.WindDelta &&
										0 !== n.PrevInAEL.WindDelta
									) {
										u = this.AddOutPt(n.PrevInAEL, n.Bot)
										this.AddJoin(s, u, n.Top)
									}
									var h = e.NextInAEL
									if (null !== h) for (; h !== n; ) this.IntersectEdges(n, h, e.Curr), (h = h.NextInAEL)
								}
							}
						}
					}),
					(r.Clipper.prototype.InsertEdgeIntoAEL = function (t, e) {
						if (null === this.m_ActiveEdges) (t.PrevInAEL = null), (t.NextInAEL = null), (this.m_ActiveEdges = t)
						else if (null === e && this.E2InsertsBeforeE1(this.m_ActiveEdges, t))
							(t.PrevInAEL = null),
								(t.NextInAEL = this.m_ActiveEdges),
								(this.m_ActiveEdges.PrevInAEL = t),
								(this.m_ActiveEdges = t)
						else {
							for (
								null === e && (e = this.m_ActiveEdges);
								null !== e.NextInAEL && !this.E2InsertsBeforeE1(e.NextInAEL, t);

							)
								e = e.NextInAEL
							;(t.NextInAEL = e.NextInAEL),
								null !== e.NextInAEL && (e.NextInAEL.PrevInAEL = t),
								(t.PrevInAEL = e),
								(e.NextInAEL = t)
						}
					}),
					(r.Clipper.prototype.E2InsertsBeforeE1 = function (t, e) {
						return e.Curr.X === t.Curr.X
							? e.Top.Y > t.Top.Y
								? e.Top.X < r.Clipper.TopX(t, e.Top.Y)
								: t.Top.X > r.Clipper.TopX(e, t.Top.Y)
							: e.Curr.X < t.Curr.X
					}),
					(r.Clipper.prototype.IsEvenOddFillType = function (t) {
						return t.PolyTyp === r.PolyType.ptSubject
							? this.m_SubjFillType === r.PolyFillType.pftEvenOdd
							: this.m_ClipFillType === r.PolyFillType.pftEvenOdd
					}),
					(r.Clipper.prototype.IsEvenOddAltFillType = function (t) {
						return t.PolyTyp === r.PolyType.ptSubject
							? this.m_ClipFillType === r.PolyFillType.pftEvenOdd
							: this.m_SubjFillType === r.PolyFillType.pftEvenOdd
					}),
					(r.Clipper.prototype.IsContributing = function (t) {
						var e, n
						switch (
							(t.PolyTyp === r.PolyType.ptSubject
								? ((e = this.m_SubjFillType), (n = this.m_ClipFillType))
								: ((e = this.m_ClipFillType), (n = this.m_SubjFillType)),
							e)
						) {
							case r.PolyFillType.pftEvenOdd:
								if (0 === t.WindDelta && 1 !== t.WindCnt) return !1
								break
							case r.PolyFillType.pftNonZero:
								if (1 !== Math.abs(t.WindCnt)) return !1
								break
							case r.PolyFillType.pftPositive:
								if (1 !== t.WindCnt) return !1
								break
							default:
								if (-1 !== t.WindCnt) return !1
						}
						switch (this.m_ClipType) {
							case r.ClipType.ctIntersection:
								switch (n) {
									case r.PolyFillType.pftEvenOdd:
									case r.PolyFillType.pftNonZero:
										return 0 !== t.WindCnt2
									case r.PolyFillType.pftPositive:
										return t.WindCnt2 > 0
									default:
										return t.WindCnt2 < 0
								}
							case r.ClipType.ctUnion:
								switch (n) {
									case r.PolyFillType.pftEvenOdd:
									case r.PolyFillType.pftNonZero:
										return 0 === t.WindCnt2
									case r.PolyFillType.pftPositive:
										return t.WindCnt2 <= 0
									default:
										return t.WindCnt2 >= 0
								}
							case r.ClipType.ctDifference:
								if (t.PolyTyp === r.PolyType.ptSubject)
									switch (n) {
										case r.PolyFillType.pftEvenOdd:
										case r.PolyFillType.pftNonZero:
											return 0 === t.WindCnt2
										case r.PolyFillType.pftPositive:
											return t.WindCnt2 <= 0
										default:
											return t.WindCnt2 >= 0
									}
								else
									switch (n) {
										case r.PolyFillType.pftEvenOdd:
										case r.PolyFillType.pftNonZero:
											return 0 !== t.WindCnt2
										case r.PolyFillType.pftPositive:
											return t.WindCnt2 > 0
										default:
											return t.WindCnt2 < 0
									}
							case r.ClipType.ctXor:
								if (0 !== t.WindDelta) return !0
								switch (n) {
									case r.PolyFillType.pftEvenOdd:
									case r.PolyFillType.pftNonZero:
										return 0 === t.WindCnt2
									case r.PolyFillType.pftPositive:
										return t.WindCnt2 <= 0
									default:
										return t.WindCnt2 >= 0
								}
						}
						return !0
					}),
					(r.Clipper.prototype.SetWindingCount = function (t) {
						for (var e = t.PrevInAEL; null !== e && (e.PolyTyp !== t.PolyTyp || 0 === e.WindDelta); ) e = e.PrevInAEL
						if (null === e) {
							var n = t.PolyTyp === r.PolyType.ptSubject ? this.m_SubjFillType : this.m_ClipFillType
							0 === t.WindDelta ? (t.WindCnt = n === r.PolyFillType.pftNegative ? -1 : 1) : (t.WindCnt = t.WindDelta),
								(t.WindCnt2 = 0),
								(e = this.m_ActiveEdges)
						} else if (0 === t.WindDelta && this.m_ClipType !== r.ClipType.ctUnion)
							(t.WindCnt = 1), (t.WindCnt2 = e.WindCnt2), (e = e.NextInAEL)
						else if (this.IsEvenOddFillType(t)) {
							if (0 === t.WindDelta) {
								for (var i = !0, s = e.PrevInAEL; null !== s; )
									s.PolyTyp === e.PolyTyp && 0 !== s.WindDelta && (i = !i), (s = s.PrevInAEL)
								t.WindCnt = i ? 0 : 1
							} else t.WindCnt = t.WindDelta
							;(t.WindCnt2 = e.WindCnt2), (e = e.NextInAEL)
						} else
							e.WindCnt * e.WindDelta < 0
								? Math.abs(e.WindCnt) > 1
									? e.WindDelta * t.WindDelta < 0
										? (t.WindCnt = e.WindCnt)
										: (t.WindCnt = e.WindCnt + t.WindDelta)
									: (t.WindCnt = 0 === t.WindDelta ? 1 : t.WindDelta)
								: 0 === t.WindDelta
								? (t.WindCnt = e.WindCnt < 0 ? e.WindCnt - 1 : e.WindCnt + 1)
								: e.WindDelta * t.WindDelta < 0
								? (t.WindCnt = e.WindCnt)
								: (t.WindCnt = e.WindCnt + t.WindDelta),
								(t.WindCnt2 = e.WindCnt2),
								(e = e.NextInAEL)
						if (this.IsEvenOddAltFillType(t))
							for (; e !== t; ) 0 !== e.WindDelta && (t.WindCnt2 = 0 === t.WindCnt2 ? 1 : 0), (e = e.NextInAEL)
						else for (; e !== t; ) (t.WindCnt2 += e.WindDelta), (e = e.NextInAEL)
					}),
					(r.Clipper.prototype.AddEdgeToSEL = function (t) {
						null === this.m_SortedEdges
							? ((this.m_SortedEdges = t), (t.PrevInSEL = null), (t.NextInSEL = null))
							: ((t.NextInSEL = this.m_SortedEdges),
							  (t.PrevInSEL = null),
							  (this.m_SortedEdges.PrevInSEL = t),
							  (this.m_SortedEdges = t))
					}),
					(r.Clipper.prototype.PopEdgeFromSEL = function (t) {
						if (((t.v = this.m_SortedEdges), null === t.v)) return !1
						var e = t.v
						return (
							(this.m_SortedEdges = t.v.NextInSEL),
							null !== this.m_SortedEdges && (this.m_SortedEdges.PrevInSEL = null),
							(e.NextInSEL = null),
							(e.PrevInSEL = null),
							!0
						)
					}),
					(r.Clipper.prototype.CopyAELToSEL = function () {
						var t = this.m_ActiveEdges
						for (this.m_SortedEdges = t; null !== t; )
							(t.PrevInSEL = t.PrevInAEL), (t.NextInSEL = t.NextInAEL), (t = t.NextInAEL)
					}),
					(r.Clipper.prototype.SwapPositionsInSEL = function (t, e) {
						if (!((null === t.NextInSEL && null === t.PrevInSEL) || (null === e.NextInSEL && null === e.PrevInSEL))) {
							if (t.NextInSEL === e)
								null !== (r = e.NextInSEL) && (r.PrevInSEL = t),
									null !== (n = t.PrevInSEL) && (n.NextInSEL = e),
									(e.PrevInSEL = n),
									(e.NextInSEL = t),
									(t.PrevInSEL = e),
									(t.NextInSEL = r)
							else if (e.NextInSEL === t) {
								null !== (r = t.NextInSEL) && (r.PrevInSEL = e),
									null !== (n = e.PrevInSEL) && (n.NextInSEL = t),
									(t.PrevInSEL = n),
									(t.NextInSEL = e),
									(e.PrevInSEL = t),
									(e.NextInSEL = r)
							} else {
								var r = t.NextInSEL,
									n = t.PrevInSEL
								;(t.NextInSEL = e.NextInSEL),
									null !== t.NextInSEL && (t.NextInSEL.PrevInSEL = t),
									(t.PrevInSEL = e.PrevInSEL),
									null !== t.PrevInSEL && (t.PrevInSEL.NextInSEL = t),
									(e.NextInSEL = r),
									null !== e.NextInSEL && (e.NextInSEL.PrevInSEL = e),
									(e.PrevInSEL = n),
									null !== e.PrevInSEL && (e.PrevInSEL.NextInSEL = e)
							}
							null === t.PrevInSEL ? (this.m_SortedEdges = t) : null === e.PrevInSEL && (this.m_SortedEdges = e)
						}
					}),
					(r.Clipper.prototype.AddLocalMaxPoly = function (t, e, r) {
						this.AddOutPt(t, r),
							0 === e.WindDelta && this.AddOutPt(e, r),
							t.OutIdx === e.OutIdx
								? ((t.OutIdx = -1), (e.OutIdx = -1))
								: t.OutIdx < e.OutIdx
								? this.AppendPolygon(t, e)
								: this.AppendPolygon(e, t)
					}),
					(r.Clipper.prototype.AddLocalMinPoly = function (t, e, n) {
						var i, s, o
						if (
							(r.ClipperBase.IsHorizontal(e) || t.Dx > e.Dx
								? ((i = this.AddOutPt(t, n)),
								  (e.OutIdx = t.OutIdx),
								  (t.Side = r.EdgeSide.esLeft),
								  (e.Side = r.EdgeSide.esRight),
								  (o = (s = t).PrevInAEL === e ? e.PrevInAEL : s.PrevInAEL))
								: ((i = this.AddOutPt(e, n)),
								  (t.OutIdx = e.OutIdx),
								  (t.Side = r.EdgeSide.esRight),
								  (e.Side = r.EdgeSide.esLeft),
								  (o = (s = e).PrevInAEL === t ? t.PrevInAEL : s.PrevInAEL)),
							null !== o && o.OutIdx >= 0 && o.Top.Y < n.Y && s.Top.Y < n.Y)
						) {
							var a = r.Clipper.TopX(o, n.Y),
								l = r.Clipper.TopX(s, n.Y)
							if (
								a === l &&
								0 !== s.WindDelta &&
								0 !== o.WindDelta &&
								r.ClipperBase.SlopesEqual5(
									new r.IntPoint2(a, n.Y),
									o.Top,
									new r.IntPoint2(l, n.Y),
									s.Top,
									this.m_UseFullRange
								)
							) {
								var u = this.AddOutPt(o, n)
								this.AddJoin(i, u, s.Top)
							}
						}
						return i
					}),
					(r.Clipper.prototype.AddOutPt = function (t, e) {
						if (t.OutIdx < 0) {
							;(i = this.CreateOutRec()).IsOpen = 0 === t.WindDelta
							var n = new r.OutPt()
							return (
								(i.Pts = n),
								(n.Idx = i.Idx),
								(n.Pt.X = e.X),
								(n.Pt.Y = e.Y),
								r.use_xyz && (n.Pt.Z = e.Z),
								(n.Next = n),
								(n.Prev = n),
								i.IsOpen || this.SetHoleState(t, i),
								(t.OutIdx = i.Idx),
								n
							)
						}
						var i,
							s = (i = this.m_PolyOuts[t.OutIdx]).Pts,
							o = t.Side === r.EdgeSide.esLeft
						return o && r.IntPoint.op_Equality(e, s.Pt)
							? s
							: !o && r.IntPoint.op_Equality(e, s.Prev.Pt)
							? s.Prev
							: (((n = new r.OutPt()).Idx = i.Idx),
							  (n.Pt.X = e.X),
							  (n.Pt.Y = e.Y),
							  r.use_xyz && (n.Pt.Z = e.Z),
							  (n.Next = s),
							  (n.Prev = s.Prev),
							  (n.Prev.Next = n),
							  (s.Prev = n),
							  o && (i.Pts = n),
							  n)
					}),
					(r.Clipper.prototype.GetLastOutPt = function (t) {
						var e = this.m_PolyOuts[t.OutIdx]
						return t.Side === r.EdgeSide.esLeft ? e.Pts : e.Pts.Prev
					}),
					(r.Clipper.prototype.SwapPoints = function (t, e) {
						var n = new r.IntPoint1(t.Value)
						;(t.Value.X = e.Value.X),
							(t.Value.Y = e.Value.Y),
							r.use_xyz && (t.Value.Z = e.Value.Z),
							(e.Value.X = n.X),
							(e.Value.Y = n.Y),
							r.use_xyz && (e.Value.Z = n.Z)
					}),
					(r.Clipper.prototype.HorzSegmentsOverlap = function (t, e, r, n) {
						var i
						return t > e && ((i = t), (t = e), (e = i)), r > n && ((i = r), (r = n), (n = i)), t < n && r < e
					}),
					(r.Clipper.prototype.SetHoleState = function (t, e) {
						for (var r = t.PrevInAEL, n = null; null !== r; )
							r.OutIdx >= 0 && 0 !== r.WindDelta && (null === n ? (n = r) : n.OutIdx === r.OutIdx && (n = null)),
								(r = r.PrevInAEL)
						null === n
							? ((e.FirstLeft = null), (e.IsHole = !1))
							: ((e.FirstLeft = this.m_PolyOuts[n.OutIdx]), (e.IsHole = !e.FirstLeft.IsHole))
					}),
					(r.Clipper.prototype.GetDx = function (t, e) {
						return t.Y === e.Y ? r.ClipperBase.horizontal : (e.X - t.X) / (e.Y - t.Y)
					}),
					(r.Clipper.prototype.FirstIsBottomPt = function (t, e) {
						for (var n = t.Prev; r.IntPoint.op_Equality(n.Pt, t.Pt) && n !== t; ) n = n.Prev
						var i = Math.abs(this.GetDx(t.Pt, n.Pt))
						for (n = t.Next; r.IntPoint.op_Equality(n.Pt, t.Pt) && n !== t; ) n = n.Next
						var s = Math.abs(this.GetDx(t.Pt, n.Pt))
						for (n = e.Prev; r.IntPoint.op_Equality(n.Pt, e.Pt) && n !== e; ) n = n.Prev
						var o = Math.abs(this.GetDx(e.Pt, n.Pt))
						for (n = e.Next; r.IntPoint.op_Equality(n.Pt, e.Pt) && n !== e; ) n = n.Next
						var a = Math.abs(this.GetDx(e.Pt, n.Pt))
						return Math.max(i, s) === Math.max(o, a) && Math.min(i, s) === Math.min(o, a)
							? this.Area(t) > 0
							: (i >= o && i >= a) || (s >= o && s >= a)
					}),
					(r.Clipper.prototype.GetBottomPt = function (t) {
						for (var e = null, n = t.Next; n !== t; )
							n.Pt.Y > t.Pt.Y
								? ((t = n), (e = null))
								: n.Pt.Y === t.Pt.Y &&
								  n.Pt.X <= t.Pt.X &&
								  (n.Pt.X < t.Pt.X ? ((e = null), (t = n)) : n.Next !== t && n.Prev !== t && (e = n)),
								(n = n.Next)
						if (null !== e)
							for (; e !== n; )
								for (this.FirstIsBottomPt(n, e) || (t = e), e = e.Next; r.IntPoint.op_Inequality(e.Pt, t.Pt); )
									e = e.Next
						return t
					}),
					(r.Clipper.prototype.GetLowermostRec = function (t, e) {
						null === t.BottomPt && (t.BottomPt = this.GetBottomPt(t.Pts)),
							null === e.BottomPt && (e.BottomPt = this.GetBottomPt(e.Pts))
						var r = t.BottomPt,
							n = e.BottomPt
						return r.Pt.Y > n.Pt.Y
							? t
							: r.Pt.Y < n.Pt.Y
							? e
							: r.Pt.X < n.Pt.X
							? t
							: r.Pt.X > n.Pt.X || r.Next === r
							? e
							: n.Next === n || this.FirstIsBottomPt(r, n)
							? t
							: e
					}),
					(r.Clipper.prototype.OutRec1RightOfOutRec2 = function (t, e) {
						do {
							if ((t = t.FirstLeft) === e) return !0
						} while (null !== t)
						return !1
					}),
					(r.Clipper.prototype.GetOutRec = function (t) {
						for (var e = this.m_PolyOuts[t]; e !== this.m_PolyOuts[e.Idx]; ) e = this.m_PolyOuts[e.Idx]
						return e
					}),
					(r.Clipper.prototype.AppendPolygon = function (t, e) {
						var n,
							i = this.m_PolyOuts[t.OutIdx],
							s = this.m_PolyOuts[e.OutIdx]
						n = this.OutRec1RightOfOutRec2(i, s) ? s : this.OutRec1RightOfOutRec2(s, i) ? i : this.GetLowermostRec(i, s)
						var o = i.Pts,
							a = o.Prev,
							l = s.Pts,
							u = l.Prev
						t.Side === r.EdgeSide.esLeft
							? e.Side === r.EdgeSide.esLeft
								? (this.ReversePolyPtLinks(l), (l.Next = o), (o.Prev = l), (a.Next = u), (u.Prev = a), (i.Pts = u))
								: ((u.Next = o), (o.Prev = u), (l.Prev = a), (a.Next = l), (i.Pts = l))
							: e.Side === r.EdgeSide.esRight
							? (this.ReversePolyPtLinks(l), (a.Next = u), (u.Prev = a), (l.Next = o), (o.Prev = l))
							: ((a.Next = l), (l.Prev = a), (o.Prev = u), (u.Next = o)),
							(i.BottomPt = null),
							n === s && (s.FirstLeft !== i && (i.FirstLeft = s.FirstLeft), (i.IsHole = s.IsHole)),
							(s.Pts = null),
							(s.BottomPt = null),
							(s.FirstLeft = i)
						var h = t.OutIdx,
							f = e.OutIdx
						;(t.OutIdx = -1), (e.OutIdx = -1)
						for (var p = this.m_ActiveEdges; null !== p; ) {
							if (p.OutIdx === f) {
								;(p.OutIdx = h), (p.Side = t.Side)
								break
							}
							p = p.NextInAEL
						}
						s.Idx = i.Idx
					}),
					(r.Clipper.prototype.ReversePolyPtLinks = function (t) {
						if (null !== t) {
							var e, r
							e = t
							do {
								;(r = e.Next), (e.Next = e.Prev), (e.Prev = r), (e = r)
							} while (e !== t)
						}
					}),
					(r.Clipper.SwapSides = function (t, e) {
						var r = t.Side
						;(t.Side = e.Side), (e.Side = r)
					}),
					(r.Clipper.SwapPolyIndexes = function (t, e) {
						var r = t.OutIdx
						;(t.OutIdx = e.OutIdx), (e.OutIdx = r)
					}),
					(r.Clipper.prototype.IntersectEdges = function (t, e, n) {
						var i = t.OutIdx >= 0,
							s = e.OutIdx >= 0
						if ((r.use_xyz && this.SetZ(n, t, e), !r.use_lines || (0 !== t.WindDelta && 0 !== e.WindDelta))) {
							if (t.PolyTyp === e.PolyTyp)
								if (this.IsEvenOddFillType(t)) {
									var o = t.WindCnt
									;(t.WindCnt = e.WindCnt), (e.WindCnt = o)
								} else
									t.WindCnt + e.WindDelta === 0 ? (t.WindCnt = -t.WindCnt) : (t.WindCnt += e.WindDelta),
										e.WindCnt - t.WindDelta == 0 ? (e.WindCnt = -e.WindCnt) : (e.WindCnt -= t.WindDelta)
							else
								this.IsEvenOddFillType(e) ? (t.WindCnt2 = 0 === t.WindCnt2 ? 1 : 0) : (t.WindCnt2 += e.WindDelta),
									this.IsEvenOddFillType(t) ? (e.WindCnt2 = 0 === e.WindCnt2 ? 1 : 0) : (e.WindCnt2 -= t.WindDelta)
							var a, l, u, h, f, p
							switch (
								(t.PolyTyp === r.PolyType.ptSubject
									? ((a = this.m_SubjFillType), (u = this.m_ClipFillType))
									: ((a = this.m_ClipFillType), (u = this.m_SubjFillType)),
								e.PolyTyp === r.PolyType.ptSubject
									? ((l = this.m_SubjFillType), (h = this.m_ClipFillType))
									: ((l = this.m_ClipFillType), (h = this.m_SubjFillType)),
								a)
							) {
								case r.PolyFillType.pftPositive:
									f = t.WindCnt
									break
								case r.PolyFillType.pftNegative:
									f = -t.WindCnt
									break
								default:
									f = Math.abs(t.WindCnt)
							}
							switch (l) {
								case r.PolyFillType.pftPositive:
									p = e.WindCnt
									break
								case r.PolyFillType.pftNegative:
									p = -e.WindCnt
									break
								default:
									p = Math.abs(e.WindCnt)
							}
							if (i && s)
								(0 !== f && 1 !== f) ||
								(0 !== p && 1 !== p) ||
								(t.PolyTyp !== e.PolyTyp && this.m_ClipType !== r.ClipType.ctXor)
									? this.AddLocalMaxPoly(t, e, n)
									: (this.AddOutPt(t, n),
									  this.AddOutPt(e, n),
									  r.Clipper.SwapSides(t, e),
									  r.Clipper.SwapPolyIndexes(t, e))
							else if (i)
								(0 !== p && 1 !== p) ||
									(this.AddOutPt(t, n), r.Clipper.SwapSides(t, e), r.Clipper.SwapPolyIndexes(t, e))
							else if (s)
								(0 !== f && 1 !== f) ||
									(this.AddOutPt(e, n), r.Clipper.SwapSides(t, e), r.Clipper.SwapPolyIndexes(t, e))
							else if (!((0 !== f && 1 !== f) || (0 !== p && 1 !== p))) {
								var c, d
								switch (u) {
									case r.PolyFillType.pftPositive:
										c = t.WindCnt2
										break
									case r.PolyFillType.pftNegative:
										c = -t.WindCnt2
										break
									default:
										c = Math.abs(t.WindCnt2)
								}
								switch (h) {
									case r.PolyFillType.pftPositive:
										d = e.WindCnt2
										break
									case r.PolyFillType.pftNegative:
										d = -e.WindCnt2
										break
									default:
										d = Math.abs(e.WindCnt2)
								}
								if (t.PolyTyp !== e.PolyTyp) this.AddLocalMinPoly(t, e, n)
								else if (1 === f && 1 === p)
									switch (this.m_ClipType) {
										case r.ClipType.ctIntersection:
											c > 0 && d > 0 && this.AddLocalMinPoly(t, e, n)
											break
										case r.ClipType.ctUnion:
											c <= 0 && d <= 0 && this.AddLocalMinPoly(t, e, n)
											break
										case r.ClipType.ctDifference:
											;((t.PolyTyp === r.PolyType.ptClip && c > 0 && d > 0) ||
												(t.PolyTyp === r.PolyType.ptSubject && c <= 0 && d <= 0)) &&
												this.AddLocalMinPoly(t, e, n)
											break
										case r.ClipType.ctXor:
											this.AddLocalMinPoly(t, e, n)
									}
								else r.Clipper.SwapSides(t, e)
							}
						} else {
							if (0 === t.WindDelta && 0 === e.WindDelta) return
							t.PolyTyp === e.PolyTyp && t.WindDelta !== e.WindDelta && this.m_ClipType === r.ClipType.ctUnion
								? 0 === t.WindDelta
									? s && (this.AddOutPt(t, n), i && (t.OutIdx = -1))
									: i && (this.AddOutPt(e, n), s && (e.OutIdx = -1))
								: t.PolyTyp !== e.PolyTyp &&
								  (0 !== t.WindDelta ||
								  1 !== Math.abs(e.WindCnt) ||
								  (this.m_ClipType === r.ClipType.ctUnion && 0 !== e.WindCnt2)
										? 0 !== e.WindDelta ||
										  1 !== Math.abs(t.WindCnt) ||
										  (this.m_ClipType === r.ClipType.ctUnion && 0 !== t.WindCnt2) ||
										  (this.AddOutPt(e, n), s && (e.OutIdx = -1))
										: (this.AddOutPt(t, n), i && (t.OutIdx = -1)))
						}
					}),
					(r.Clipper.prototype.DeleteFromSEL = function (t) {
						var e = t.PrevInSEL,
							r = t.NextInSEL
						;(null === e && null === r && t !== this.m_SortedEdges) ||
							(null !== e ? (e.NextInSEL = r) : (this.m_SortedEdges = r),
							null !== r && (r.PrevInSEL = e),
							(t.NextInSEL = null),
							(t.PrevInSEL = null))
					}),
					(r.Clipper.prototype.ProcessHorizontals = function () {
						for (var t = {}; this.PopEdgeFromSEL(t); ) this.ProcessHorizontal(t.v)
					}),
					(r.Clipper.prototype.GetHorzDirection = function (t, e) {
						t.Bot.X < t.Top.X
							? ((e.Left = t.Bot.X), (e.Right = t.Top.X), (e.Dir = r.Direction.dLeftToRight))
							: ((e.Left = t.Top.X), (e.Right = t.Bot.X), (e.Dir = r.Direction.dRightToLeft))
					}),
					(r.Clipper.prototype.ProcessHorizontal = function (t) {
						var e = { Dir: null, Left: null, Right: null }
						this.GetHorzDirection(t, e)
						for (
							var n = e.Dir, i = e.Left, s = e.Right, o = 0 === t.WindDelta, a = t, l = null;
							null !== a.NextInLML && r.ClipperBase.IsHorizontal(a.NextInLML);

						)
							a = a.NextInLML
						null === a.NextInLML && (l = this.GetMaximaPair(a))
						var u = this.m_Maxima
						if (null !== u)
							if (n === r.Direction.dLeftToRight) {
								for (; null !== u && u.X <= t.Bot.X; ) u = u.Next
								null !== u && u.X >= a.Top.X && (u = null)
							} else {
								for (; null !== u.Next && u.Next.X < t.Bot.X; ) u = u.Next
								u.X <= a.Top.X && (u = null)
							}
						for (var h = null; ; ) {
							for (var f = t === a, p = this.GetNextInAEL(t, n); null !== p; ) {
								if (null !== u)
									if (n === r.Direction.dLeftToRight)
										for (; null !== u && u.X < p.Curr.X; )
											t.OutIdx >= 0 && !o && this.AddOutPt(t, new r.IntPoint2(u.X, t.Bot.Y)), (u = u.Next)
									else
										for (; null !== u && u.X > p.Curr.X; )
											t.OutIdx >= 0 && !o && this.AddOutPt(t, new r.IntPoint2(u.X, t.Bot.Y)), (u = u.Prev)
								if (
									(n === r.Direction.dLeftToRight && p.Curr.X > s) ||
									(n === r.Direction.dRightToLeft && p.Curr.X < i)
								)
									break
								if (p.Curr.X === t.Top.X && null !== t.NextInLML && p.Dx < t.NextInLML.Dx) break
								if (t.OutIdx >= 0 && !o) {
									r.use_xyz && (n === r.Direction.dLeftToRight ? this.SetZ(p.Curr, t, p) : this.SetZ(p.Curr, p, t)),
										(h = this.AddOutPt(t, p.Curr))
									for (var c = this.m_SortedEdges; null !== c; ) {
										if (c.OutIdx >= 0 && this.HorzSegmentsOverlap(t.Bot.X, t.Top.X, c.Bot.X, c.Top.X)) {
											var d = this.GetLastOutPt(c)
											this.AddJoin(d, h, c.Top)
										}
										c = c.NextInSEL
									}
									this.AddGhostJoin(h, t.Bot)
								}
								if (p === l && f)
									return (
										t.OutIdx >= 0 && this.AddLocalMaxPoly(t, l, t.Top),
										this.DeleteFromAEL(t),
										void this.DeleteFromAEL(l)
									)
								if (n === r.Direction.dLeftToRight) {
									var m = new r.IntPoint2(p.Curr.X, t.Curr.Y)
									this.IntersectEdges(t, p, m)
								} else {
									m = new r.IntPoint2(p.Curr.X, t.Curr.Y)
									this.IntersectEdges(p, t, m)
								}
								var y = this.GetNextInAEL(p, n)
								this.SwapPositionsInAEL(t, p), (p = y)
							}
							if (null === t.NextInLML || !r.ClipperBase.IsHorizontal(t.NextInLML)) break
							;(t = this.UpdateEdgeIntoAEL(t)).OutIdx >= 0 && this.AddOutPt(t, t.Bot),
								(e = { Dir: n, Left: i, Right: s }),
								this.GetHorzDirection(t, e),
								(n = e.Dir),
								(i = e.Left),
								(s = e.Right)
						}
						if (t.OutIdx >= 0 && null === h) {
							h = this.GetLastOutPt(t)
							for (c = this.m_SortedEdges; null !== c; ) {
								if (c.OutIdx >= 0 && this.HorzSegmentsOverlap(t.Bot.X, t.Top.X, c.Bot.X, c.Top.X)) {
									d = this.GetLastOutPt(c)
									this.AddJoin(d, h, c.Top)
								}
								c = c.NextInSEL
							}
							this.AddGhostJoin(h, t.Top)
						}
						if (null !== t.NextInLML)
							if (t.OutIdx >= 0) {
								if (((h = this.AddOutPt(t, t.Top)), 0 === (t = this.UpdateEdgeIntoAEL(t)).WindDelta)) return
								var v = t.PrevInAEL
								y = t.NextInAEL
								if (
									null !== v &&
									v.Curr.X === t.Bot.X &&
									v.Curr.Y === t.Bot.Y &&
									0 === v.WindDelta &&
									v.OutIdx >= 0 &&
									v.Curr.Y > v.Top.Y &&
									r.ClipperBase.SlopesEqual3(t, v, this.m_UseFullRange)
								) {
									d = this.AddOutPt(v, t.Bot)
									this.AddJoin(h, d, t.Top)
								} else if (
									null !== y &&
									y.Curr.X === t.Bot.X &&
									y.Curr.Y === t.Bot.Y &&
									0 !== y.WindDelta &&
									y.OutIdx >= 0 &&
									y.Curr.Y > y.Top.Y &&
									r.ClipperBase.SlopesEqual3(t, y, this.m_UseFullRange)
								) {
									d = this.AddOutPt(y, t.Bot)
									this.AddJoin(h, d, t.Top)
								}
							} else t = this.UpdateEdgeIntoAEL(t)
						else t.OutIdx >= 0 && this.AddOutPt(t, t.Top), this.DeleteFromAEL(t)
					}),
					(r.Clipper.prototype.GetNextInAEL = function (t, e) {
						return e === r.Direction.dLeftToRight ? t.NextInAEL : t.PrevInAEL
					}),
					(r.Clipper.prototype.IsMinima = function (t) {
						return null !== t && t.Prev.NextInLML !== t && t.Next.NextInLML !== t
					}),
					(r.Clipper.prototype.IsMaxima = function (t, e) {
						return null !== t && t.Top.Y === e && null === t.NextInLML
					}),
					(r.Clipper.prototype.IsIntermediate = function (t, e) {
						return t.Top.Y === e && null !== t.NextInLML
					}),
					(r.Clipper.prototype.GetMaximaPair = function (t) {
						return r.IntPoint.op_Equality(t.Next.Top, t.Top) && null === t.Next.NextInLML
							? t.Next
							: r.IntPoint.op_Equality(t.Prev.Top, t.Top) && null === t.Prev.NextInLML
							? t.Prev
							: null
					}),
					(r.Clipper.prototype.GetMaximaPairEx = function (t) {
						var e = this.GetMaximaPair(t)
						return null === e ||
							e.OutIdx === r.ClipperBase.Skip ||
							(e.NextInAEL === e.PrevInAEL && !r.ClipperBase.IsHorizontal(e))
							? null
							: e
					}),
					(r.Clipper.prototype.ProcessIntersections = function (t) {
						if (null === this.m_ActiveEdges) return !0
						try {
							if ((this.BuildIntersectList(t), 0 === this.m_IntersectList.length)) return !0
							if (1 !== this.m_IntersectList.length && !this.FixupIntersectionOrder()) return !1
							this.ProcessIntersectList()
						} catch (t) {
							;(this.m_SortedEdges = null), (this.m_IntersectList.length = 0), r.Error('ProcessIntersections error')
						}
						return (this.m_SortedEdges = null), !0
					}),
					(r.Clipper.prototype.BuildIntersectList = function (t) {
						if (null !== this.m_ActiveEdges) {
							var e = this.m_ActiveEdges
							for (this.m_SortedEdges = e; null !== e; )
								(e.PrevInSEL = e.PrevInAEL),
									(e.NextInSEL = e.NextInAEL),
									(e.Curr.X = r.Clipper.TopX(e, t)),
									(e = e.NextInAEL)
							for (var n = !0; n && null !== this.m_SortedEdges; ) {
								for (n = !1, e = this.m_SortedEdges; null !== e.NextInSEL; ) {
									var i = e.NextInSEL,
										s = new r.IntPoint0()
									if (e.Curr.X > i.Curr.X) {
										this.IntersectPoint(e, i, s), s.Y < t && (s = new r.IntPoint2(r.Clipper.TopX(e, t), t))
										var o = new r.IntersectNode()
										;(o.Edge1 = e),
											(o.Edge2 = i),
											(o.Pt.X = s.X),
											(o.Pt.Y = s.Y),
											r.use_xyz && (o.Pt.Z = s.Z),
											this.m_IntersectList.push(o),
											this.SwapPositionsInSEL(e, i),
											(n = !0)
									} else e = i
								}
								if (null === e.PrevInSEL) break
								e.PrevInSEL.NextInSEL = null
							}
							this.m_SortedEdges = null
						}
					}),
					(r.Clipper.prototype.EdgesAdjacent = function (t) {
						return t.Edge1.NextInSEL === t.Edge2 || t.Edge1.PrevInSEL === t.Edge2
					}),
					(r.Clipper.IntersectNodeSort = function (t, e) {
						return e.Pt.Y - t.Pt.Y
					}),
					(r.Clipper.prototype.FixupIntersectionOrder = function () {
						this.m_IntersectList.sort(this.m_IntersectNodeComparer), this.CopyAELToSEL()
						for (var t = this.m_IntersectList.length, e = 0; e < t; e++) {
							if (!this.EdgesAdjacent(this.m_IntersectList[e])) {
								for (var r = e + 1; r < t && !this.EdgesAdjacent(this.m_IntersectList[r]); ) r++
								if (r === t) return !1
								var n = this.m_IntersectList[e]
								;(this.m_IntersectList[e] = this.m_IntersectList[r]), (this.m_IntersectList[r] = n)
							}
							this.SwapPositionsInSEL(this.m_IntersectList[e].Edge1, this.m_IntersectList[e].Edge2)
						}
						return !0
					}),
					(r.Clipper.prototype.ProcessIntersectList = function () {
						for (var t = 0, e = this.m_IntersectList.length; t < e; t++) {
							var r = this.m_IntersectList[t]
							this.IntersectEdges(r.Edge1, r.Edge2, r.Pt), this.SwapPositionsInAEL(r.Edge1, r.Edge2)
						}
						this.m_IntersectList.length = 0
					})
				o.msie
					? (r.Clipper.Round = function (t) {
							return t < 0 ? Math.ceil(t - 0.5) : Math.round(t)
					  })
					: o.chromium
					? (r.Clipper.Round = function (t) {
							return t < 0 ? -Math.round(Math.abs(t)) : Math.round(t)
					  })
					: o.safari
					? (r.Clipper.Round = function (t) {
							return t < 0
								? (t -= 0.5) < -2147483648
									? Math.ceil(t)
									: 0 | t
								: (t += 0.5) > 2147483647
								? Math.floor(t)
								: 0 | t
					  })
					: (r.Clipper.Round = function (t) {
							return t < 0 ? Math.ceil(t - 0.5) : Math.floor(t + 0.5)
					  }),
					(r.Clipper.TopX = function (t, e) {
						return e === t.Top.Y ? t.Top.X : t.Bot.X + r.Clipper.Round(t.Dx * (e - t.Bot.Y))
					}),
					(r.Clipper.prototype.IntersectPoint = function (t, e, n) {
						var i, s
						if (((n.X = 0), (n.Y = 0), t.Dx === e.Dx)) return (n.Y = t.Curr.Y), void (n.X = r.Clipper.TopX(t, n.Y))
						if (0 === t.Delta.X)
							(n.X = t.Bot.X),
								r.ClipperBase.IsHorizontal(e)
									? (n.Y = e.Bot.Y)
									: ((s = e.Bot.Y - e.Bot.X / e.Dx), (n.Y = r.Clipper.Round(n.X / e.Dx + s)))
						else if (0 === e.Delta.X)
							(n.X = e.Bot.X),
								r.ClipperBase.IsHorizontal(t)
									? (n.Y = t.Bot.Y)
									: ((i = t.Bot.Y - t.Bot.X / t.Dx), (n.Y = r.Clipper.Round(n.X / t.Dx + i)))
						else {
							i = t.Bot.X - t.Bot.Y * t.Dx
							var o = ((s = e.Bot.X - e.Bot.Y * e.Dx) - i) / (t.Dx - e.Dx)
							;(n.Y = r.Clipper.Round(o)),
								Math.abs(t.Dx) < Math.abs(e.Dx)
									? (n.X = r.Clipper.Round(t.Dx * o + i))
									: (n.X = r.Clipper.Round(e.Dx * o + s))
						}
						if (n.Y < t.Top.Y || n.Y < e.Top.Y) {
							if (t.Top.Y > e.Top.Y) return (n.Y = t.Top.Y), (n.X = r.Clipper.TopX(e, t.Top.Y)), n.X < t.Top.X
							;(n.Y = e.Top.Y),
								Math.abs(t.Dx) < Math.abs(e.Dx) ? (n.X = r.Clipper.TopX(t, n.Y)) : (n.X = r.Clipper.TopX(e, n.Y))
						}
						n.Y > t.Curr.Y &&
							((n.Y = t.Curr.Y),
							Math.abs(t.Dx) > Math.abs(e.Dx) ? (n.X = r.Clipper.TopX(e, n.Y)) : (n.X = r.Clipper.TopX(t, n.Y)))
					}),
					(r.Clipper.prototype.ProcessEdgesAtTopOfScanbeam = function (t) {
						for (var e = this.m_ActiveEdges; null !== e; ) {
							var n = this.IsMaxima(e, t)
							if (n) {
								var i = this.GetMaximaPairEx(e)
								n = null === i || !r.ClipperBase.IsHorizontal(i)
							}
							if (n) {
								this.StrictlySimple && this.InsertMaxima(e.Top.X)
								var s = e.PrevInAEL
								this.DoMaxima(e), (e = null === s ? this.m_ActiveEdges : s.NextInAEL)
							} else {
								if (
									(this.IsIntermediate(e, t) && r.ClipperBase.IsHorizontal(e.NextInLML)
										? ((e = this.UpdateEdgeIntoAEL(e)).OutIdx >= 0 && this.AddOutPt(e, e.Bot), this.AddEdgeToSEL(e))
										: ((e.Curr.X = r.Clipper.TopX(e, t)), (e.Curr.Y = t)),
									r.use_xyz &&
										(e.Top.Y === t ? (e.Curr.Z = e.Top.Z) : e.Bot.Y === t ? (e.Curr.Z = e.Bot.Z) : (e.Curr.Z = 0)),
									this.StrictlySimple)
								) {
									s = e.PrevInAEL
									if (
										e.OutIdx >= 0 &&
										0 !== e.WindDelta &&
										null !== s &&
										s.OutIdx >= 0 &&
										s.Curr.X === e.Curr.X &&
										0 !== s.WindDelta
									) {
										var o = new r.IntPoint1(e.Curr)
										r.use_xyz && this.SetZ(o, s, e)
										var a = this.AddOutPt(s, o),
											l = this.AddOutPt(e, o)
										this.AddJoin(a, l, o)
									}
								}
								e = e.NextInAEL
							}
						}
						for (this.ProcessHorizontals(), this.m_Maxima = null, e = this.m_ActiveEdges; null !== e; ) {
							if (this.IsIntermediate(e, t)) {
								a = null
								e.OutIdx >= 0 && (a = this.AddOutPt(e, e.Top))
								s = (e = this.UpdateEdgeIntoAEL(e)).PrevInAEL
								var u = e.NextInAEL
								if (
									null !== s &&
									s.Curr.X === e.Bot.X &&
									s.Curr.Y === e.Bot.Y &&
									null !== a &&
									s.OutIdx >= 0 &&
									s.Curr.Y === s.Top.Y &&
									r.ClipperBase.SlopesEqual5(e.Curr, e.Top, s.Curr, s.Top, this.m_UseFullRange) &&
									0 !== e.WindDelta &&
									0 !== s.WindDelta
								) {
									l = this.AddOutPt(ePrev2, e.Bot)
									this.AddJoin(a, l, e.Top)
								} else if (
									null !== u &&
									u.Curr.X === e.Bot.X &&
									u.Curr.Y === e.Bot.Y &&
									null !== a &&
									u.OutIdx >= 0 &&
									u.Curr.Y === u.Top.Y &&
									r.ClipperBase.SlopesEqual5(e.Curr, e.Top, u.Curr, u.Top, this.m_UseFullRange) &&
									0 !== e.WindDelta &&
									0 !== u.WindDelta
								) {
									l = this.AddOutPt(u, e.Bot)
									this.AddJoin(a, l, e.Top)
								}
							}
							e = e.NextInAEL
						}
					}),
					(r.Clipper.prototype.DoMaxima = function (t) {
						var e = this.GetMaximaPairEx(t)
						if (null === e) return t.OutIdx >= 0 && this.AddOutPt(t, t.Top), void this.DeleteFromAEL(t)
						for (var n = t.NextInAEL; null !== n && n !== e; )
							this.IntersectEdges(t, n, t.Top), this.SwapPositionsInAEL(t, n), (n = t.NextInAEL)
						;-1 === t.OutIdx && -1 === e.OutIdx
							? (this.DeleteFromAEL(t), this.DeleteFromAEL(e))
							: t.OutIdx >= 0 && e.OutIdx >= 0
							? (t.OutIdx >= 0 && this.AddLocalMaxPoly(t, e, t.Top), this.DeleteFromAEL(t), this.DeleteFromAEL(e))
							: r.use_lines && 0 === t.WindDelta
							? (t.OutIdx >= 0 && (this.AddOutPt(t, t.Top), (t.OutIdx = r.ClipperBase.Unassigned)),
							  this.DeleteFromAEL(t),
							  e.OutIdx >= 0 && (this.AddOutPt(e, t.Top), (e.OutIdx = r.ClipperBase.Unassigned)),
							  this.DeleteFromAEL(e))
							: r.Error('DoMaxima error')
					}),
					(r.Clipper.ReversePaths = function (t) {
						for (var e = 0, r = t.length; e < r; e++) t[e].reverse()
					}),
					(r.Clipper.Orientation = function (t) {
						return r.Clipper.Area(t) >= 0
					}),
					(r.Clipper.prototype.PointCount = function (t) {
						if (null === t) return 0
						var e = 0,
							r = t
						do {
							e++, (r = r.Next)
						} while (r !== t)
						return e
					}),
					(r.Clipper.prototype.BuildResult = function (t) {
						r.Clear(t)
						for (var e = 0, n = this.m_PolyOuts.length; e < n; e++) {
							var i = this.m_PolyOuts[e]
							if (null !== i.Pts) {
								var s = i.Pts.Prev,
									o = this.PointCount(s)
								if (!(o < 2)) {
									for (var a = new Array(o), l = 0; l < o; l++) (a[l] = s.Pt), (s = s.Prev)
									t.push(a)
								}
							}
						}
					}),
					(r.Clipper.prototype.BuildResult2 = function (t) {
						t.Clear()
						for (var e = 0, n = this.m_PolyOuts.length; e < n; e++) {
							var i = this.m_PolyOuts[e],
								s = this.PointCount(i.Pts)
							if (!((i.IsOpen && s < 2) || (!i.IsOpen && s < 3))) {
								this.FixHoleLinkage(i)
								var o = new r.PolyNode()
								t.m_AllPolys.push(o), (i.PolyNode = o), (o.m_polygon.length = s)
								for (var a = i.Pts.Prev, l = 0; l < s; l++) (o.m_polygon[l] = a.Pt), (a = a.Prev)
							}
						}
						for (e = 0, n = this.m_PolyOuts.length; e < n; e++) {
							null !== (i = this.m_PolyOuts[e]).PolyNode &&
								(i.IsOpen
									? ((i.PolyNode.IsOpen = !0), t.AddChild(i.PolyNode))
									: null !== i.FirstLeft && null !== i.FirstLeft.PolyNode
									? i.FirstLeft.PolyNode.AddChild(i.PolyNode)
									: t.AddChild(i.PolyNode))
						}
					}),
					(r.Clipper.prototype.FixupOutPolyline = function (t) {
						for (var e = t.Pts, n = e.Prev; e !== n; )
							if (((e = e.Next), r.IntPoint.op_Equality(e.Pt, e.Prev.Pt))) {
								e === n && (n = e.Prev)
								var i = e.Prev
								;(i.Next = e.Next), (e.Next.Prev = i), (e = i)
							}
						e === e.Prev && (t.Pts = null)
					}),
					(r.Clipper.prototype.FixupOutPolygon = function (t) {
						var e = null
						t.BottomPt = null
						for (var n = t.Pts, i = this.PreserveCollinear || this.StrictlySimple; ; ) {
							if (n.Prev === n || n.Prev === n.Next) return void (t.Pts = null)
							if (
								r.IntPoint.op_Equality(n.Pt, n.Next.Pt) ||
								r.IntPoint.op_Equality(n.Pt, n.Prev.Pt) ||
								(r.ClipperBase.SlopesEqual4(n.Prev.Pt, n.Pt, n.Next.Pt, this.m_UseFullRange) &&
									(!i || !this.Pt2IsBetweenPt1AndPt3(n.Prev.Pt, n.Pt, n.Next.Pt)))
							)
								(e = null), (n.Prev.Next = n.Next), (n.Next.Prev = n.Prev), (n = n.Prev)
							else {
								if (n === e) break
								null === e && (e = n), (n = n.Next)
							}
						}
						t.Pts = n
					}),
					(r.Clipper.prototype.DupOutPt = function (t, e) {
						var n = new r.OutPt()
						return (
							(n.Pt.X = t.Pt.X),
							(n.Pt.Y = t.Pt.Y),
							r.use_xyz && (n.Pt.Z = t.Pt.Z),
							(n.Idx = t.Idx),
							e
								? ((n.Next = t.Next), (n.Prev = t), (t.Next.Prev = n), (t.Next = n))
								: ((n.Prev = t.Prev), (n.Next = t), (t.Prev.Next = n), (t.Prev = n)),
							n
						)
					}),
					(r.Clipper.prototype.GetOverlap = function (t, e, r, n, i) {
						return (
							t < e
								? r < n
									? ((i.Left = Math.max(t, r)), (i.Right = Math.min(e, n)))
									: ((i.Left = Math.max(t, n)), (i.Right = Math.min(e, r)))
								: r < n
								? ((i.Left = Math.max(e, r)), (i.Right = Math.min(t, n)))
								: ((i.Left = Math.max(e, n)), (i.Right = Math.min(t, r))),
							i.Left < i.Right
						)
					}),
					(r.Clipper.prototype.JoinHorz = function (t, e, n, i, s, o) {
						var a = t.Pt.X > e.Pt.X ? r.Direction.dRightToLeft : r.Direction.dLeftToRight,
							l = n.Pt.X > i.Pt.X ? r.Direction.dRightToLeft : r.Direction.dLeftToRight
						if (a === l) return !1
						if (a === r.Direction.dLeftToRight) {
							for (; t.Next.Pt.X <= s.X && t.Next.Pt.X >= t.Pt.X && t.Next.Pt.Y === s.Y; ) t = t.Next
							o && t.Pt.X !== s.X && (t = t.Next),
								(e = this.DupOutPt(t, !o)),
								r.IntPoint.op_Inequality(e.Pt, s) &&
									(((t = e).Pt.X = s.X), (t.Pt.Y = s.Y), r.use_xyz && (t.Pt.Z = s.Z), (e = this.DupOutPt(t, !o)))
						} else {
							for (; t.Next.Pt.X >= s.X && t.Next.Pt.X <= t.Pt.X && t.Next.Pt.Y === s.Y; ) t = t.Next
							o || t.Pt.X === s.X || (t = t.Next),
								(e = this.DupOutPt(t, o)),
								r.IntPoint.op_Inequality(e.Pt, s) &&
									(((t = e).Pt.X = s.X), (t.Pt.Y = s.Y), r.use_xyz && (t.Pt.Z = s.Z), (e = this.DupOutPt(t, o)))
						}
						if (l === r.Direction.dLeftToRight) {
							for (; n.Next.Pt.X <= s.X && n.Next.Pt.X >= n.Pt.X && n.Next.Pt.Y === s.Y; ) n = n.Next
							o && n.Pt.X !== s.X && (n = n.Next),
								(i = this.DupOutPt(n, !o)),
								r.IntPoint.op_Inequality(i.Pt, s) &&
									(((n = i).Pt.X = s.X), (n.Pt.Y = s.Y), r.use_xyz && (n.Pt.Z = s.Z), (i = this.DupOutPt(n, !o)))
						} else {
							for (; n.Next.Pt.X >= s.X && n.Next.Pt.X <= n.Pt.X && n.Next.Pt.Y === s.Y; ) n = n.Next
							o || n.Pt.X === s.X || (n = n.Next),
								(i = this.DupOutPt(n, o)),
								r.IntPoint.op_Inequality(i.Pt, s) &&
									(((n = i).Pt.X = s.X), (n.Pt.Y = s.Y), r.use_xyz && (n.Pt.Z = s.Z), (i = this.DupOutPt(n, o)))
						}
						return (
							(a === r.Direction.dLeftToRight) === o
								? ((t.Prev = n), (n.Next = t), (e.Next = i), (i.Prev = e))
								: ((t.Next = n), (n.Prev = t), (e.Prev = i), (i.Next = e)),
							!0
						)
					}),
					(r.Clipper.prototype.JoinPoints = function (t, e, n) {
						var i = t.OutPt1,
							s = new r.OutPt(),
							o = t.OutPt2,
							a = new r.OutPt(),
							l = t.OutPt1.Pt.Y === t.OffPt.Y
						if (l && r.IntPoint.op_Equality(t.OffPt, t.OutPt1.Pt) && r.IntPoint.op_Equality(t.OffPt, t.OutPt2.Pt)) {
							if (e !== n) return !1
							for (s = t.OutPt1.Next; s !== i && r.IntPoint.op_Equality(s.Pt, t.OffPt); ) s = s.Next
							var u = s.Pt.Y > t.OffPt.Y
							for (a = t.OutPt2.Next; a !== o && r.IntPoint.op_Equality(a.Pt, t.OffPt); ) a = a.Next
							return (
								u !== a.Pt.Y > t.OffPt.Y &&
								(u
									? ((s = this.DupOutPt(i, !1)),
									  (a = this.DupOutPt(o, !0)),
									  (i.Prev = o),
									  (o.Next = i),
									  (s.Next = a),
									  (a.Prev = s),
									  (t.OutPt1 = i),
									  (t.OutPt2 = s),
									  !0)
									: ((s = this.DupOutPt(i, !0)),
									  (a = this.DupOutPt(o, !1)),
									  (i.Next = o),
									  (o.Prev = i),
									  (s.Prev = a),
									  (a.Next = s),
									  (t.OutPt1 = i),
									  (t.OutPt2 = s),
									  !0))
							)
						}
						if (l) {
							for (s = i; i.Prev.Pt.Y === i.Pt.Y && i.Prev !== s && i.Prev !== o; ) i = i.Prev
							for (; s.Next.Pt.Y === s.Pt.Y && s.Next !== i && s.Next !== o; ) s = s.Next
							if (s.Next === i || s.Next === o) return !1
							for (a = o; o.Prev.Pt.Y === o.Pt.Y && o.Prev !== a && o.Prev !== s; ) o = o.Prev
							for (; a.Next.Pt.Y === a.Pt.Y && a.Next !== o && a.Next !== i; ) a = a.Next
							if (a.Next === o || a.Next === i) return !1
							var h = { Left: null, Right: null }
							if (!this.GetOverlap(i.Pt.X, s.Pt.X, o.Pt.X, a.Pt.X, h)) return !1
							var f,
								p = h.Left,
								c = h.Right,
								d = new r.IntPoint0()
							return (
								i.Pt.X >= p && i.Pt.X <= c
									? ((d.X = i.Pt.X), (d.Y = i.Pt.Y), r.use_xyz && (d.Z = i.Pt.Z), (f = i.Pt.X > s.Pt.X))
									: o.Pt.X >= p && o.Pt.X <= c
									? ((d.X = o.Pt.X), (d.Y = o.Pt.Y), r.use_xyz && (d.Z = o.Pt.Z), (f = o.Pt.X > a.Pt.X))
									: s.Pt.X >= p && s.Pt.X <= c
									? ((d.X = s.Pt.X), (d.Y = s.Pt.Y), r.use_xyz && (d.Z = s.Pt.Z), (f = s.Pt.X > i.Pt.X))
									: ((d.X = a.Pt.X), (d.Y = a.Pt.Y), r.use_xyz && (d.Z = a.Pt.Z), (f = a.Pt.X > o.Pt.X)),
								(t.OutPt1 = i),
								(t.OutPt2 = o),
								this.JoinHorz(i, s, o, a, d, f)
							)
						}
						for (s = i.Next; r.IntPoint.op_Equality(s.Pt, i.Pt) && s !== i; ) s = s.Next
						var m = s.Pt.Y > i.Pt.Y || !r.ClipperBase.SlopesEqual4(i.Pt, s.Pt, t.OffPt, this.m_UseFullRange)
						if (m) {
							for (s = i.Prev; r.IntPoint.op_Equality(s.Pt, i.Pt) && s !== i; ) s = s.Prev
							if (s.Pt.Y > i.Pt.Y || !r.ClipperBase.SlopesEqual4(i.Pt, s.Pt, t.OffPt, this.m_UseFullRange)) return !1
						}
						for (a = o.Next; r.IntPoint.op_Equality(a.Pt, o.Pt) && a !== o; ) a = a.Next
						var y = a.Pt.Y > o.Pt.Y || !r.ClipperBase.SlopesEqual4(o.Pt, a.Pt, t.OffPt, this.m_UseFullRange)
						if (y) {
							for (a = o.Prev; r.IntPoint.op_Equality(a.Pt, o.Pt) && a !== o; ) a = a.Prev
							if (a.Pt.Y > o.Pt.Y || !r.ClipperBase.SlopesEqual4(o.Pt, a.Pt, t.OffPt, this.m_UseFullRange)) return !1
						}
						return (
							s !== i &&
							a !== o &&
							s !== a &&
							(e !== n || m !== y) &&
							(m
								? ((s = this.DupOutPt(i, !1)),
								  (a = this.DupOutPt(o, !0)),
								  (i.Prev = o),
								  (o.Next = i),
								  (s.Next = a),
								  (a.Prev = s),
								  (t.OutPt1 = i),
								  (t.OutPt2 = s),
								  !0)
								: ((s = this.DupOutPt(i, !0)),
								  (a = this.DupOutPt(o, !1)),
								  (i.Next = o),
								  (o.Prev = i),
								  (s.Prev = a),
								  (a.Next = s),
								  (t.OutPt1 = i),
								  (t.OutPt2 = s),
								  !0))
						)
					}),
					(r.Clipper.GetBounds = function (t) {
						for (var e = 0, n = t.length; e < n && 0 === t[e].length; ) e++
						if (e === n) return new r.IntRect(0, 0, 0, 0)
						var i = new r.IntRect()
						for (i.left = t[e][0].X, i.right = i.left, i.top = t[e][0].Y, i.bottom = i.top; e < n; e++)
							for (var s = 0, o = t[e].length; s < o; s++)
								t[e][s].X < i.left ? (i.left = t[e][s].X) : t[e][s].X > i.right && (i.right = t[e][s].X),
									t[e][s].Y < i.top ? (i.top = t[e][s].Y) : t[e][s].Y > i.bottom && (i.bottom = t[e][s].Y)
						return i
					}),
					(r.Clipper.prototype.GetBounds2 = function (t) {
						var e = t,
							n = new r.IntRect()
						for (n.left = t.Pt.X, n.right = t.Pt.X, n.top = t.Pt.Y, n.bottom = t.Pt.Y, t = t.Next; t !== e; )
							t.Pt.X < n.left && (n.left = t.Pt.X),
								t.Pt.X > n.right && (n.right = t.Pt.X),
								t.Pt.Y < n.top && (n.top = t.Pt.Y),
								t.Pt.Y > n.bottom && (n.bottom = t.Pt.Y),
								(t = t.Next)
						return n
					}),
					(r.Clipper.PointInPolygon = function (t, e) {
						var r = 0,
							n = e.length
						if (n < 3) return 0
						for (var i = e[0], s = 1; s <= n; ++s) {
							var o = s === n ? e[0] : e[s]
							if (o.Y === t.Y && (o.X === t.X || (i.Y === t.Y && o.X > t.X == i.X < t.X))) return -1
							if (i.Y < t.Y != o.Y < t.Y)
								if (i.X >= t.X)
									if (o.X > t.X) r = 1 - r
									else {
										if (0 === (a = (i.X - t.X) * (o.Y - t.Y) - (o.X - t.X) * (i.Y - t.Y))) return -1
										a > 0 == o.Y > i.Y && (r = 1 - r)
									}
								else if (o.X > t.X) {
									var a
									if (0 === (a = (i.X - t.X) * (o.Y - t.Y) - (o.X - t.X) * (i.Y - t.Y))) return -1
									a > 0 == o.Y > i.Y && (r = 1 - r)
								}
							i = o
						}
						return r
					}),
					(r.Clipper.prototype.PointInPolygon = function (t, e) {
						var r = 0,
							n = e,
							i = t.X,
							s = t.Y,
							o = e.Pt.X,
							a = e.Pt.Y
						do {
							var l = (e = e.Next).Pt.X,
								u = e.Pt.Y
							if (u === s && (l === i || (a === s && l > i == o < i))) return -1
							if (a < s != u < s)
								if (o >= i)
									if (l > i) r = 1 - r
									else {
										if (0 === (h = (o - i) * (u - s) - (l - i) * (a - s))) return -1
										h > 0 == u > a && (r = 1 - r)
									}
								else if (l > i) {
									var h
									if (0 === (h = (o - i) * (u - s) - (l - i) * (a - s))) return -1
									h > 0 == u > a && (r = 1 - r)
								}
							;(o = l), (a = u)
						} while (n !== e)
						return r
					}),
					(r.Clipper.prototype.Poly2ContainsPoly1 = function (t, e) {
						var r = t
						do {
							var n = this.PointInPolygon(r.Pt, e)
							if (n >= 0) return n > 0
							r = r.Next
						} while (r !== t)
						return !0
					}),
					(r.Clipper.prototype.FixupFirstLefts1 = function (t, e) {
						for (var n, i, s = 0, o = this.m_PolyOuts.length; s < o; s++)
							(n = this.m_PolyOuts[s]),
								(i = r.Clipper.ParseFirstLeft(n.FirstLeft)),
								null !== n.Pts && i === t && this.Poly2ContainsPoly1(n.Pts, e.Pts) && (n.FirstLeft = e)
					}),
					(r.Clipper.prototype.FixupFirstLefts2 = function (t, e) {
						for (var n, i, s = e.FirstLeft, o = 0, a = this.m_PolyOuts.length; o < a; o++)
							null !== (n = this.m_PolyOuts[o]).Pts &&
								n !== e &&
								n !== t &&
								(((i = r.Clipper.ParseFirstLeft(n.FirstLeft)) !== s && i !== t && i !== e) ||
									(this.Poly2ContainsPoly1(n.Pts, t.Pts)
										? (n.FirstLeft = t)
										: this.Poly2ContainsPoly1(n.Pts, e.Pts)
										? (n.FirstLeft = e)
										: (n.FirstLeft !== t && n.FirstLeft !== e) || (n.FirstLeft = s)))
					}),
					(r.Clipper.prototype.FixupFirstLefts3 = function (t, e) {
						for (var n, i, s = 0, o = this.m_PolyOuts.length; s < o; s++)
							(n = this.m_PolyOuts[s]),
								(i = r.Clipper.ParseFirstLeft(n.FirstLeft)),
								null !== n.Pts && i === t && (n.FirstLeft = e)
					}),
					(r.Clipper.ParseFirstLeft = function (t) {
						for (; null !== t && null === t.Pts; ) t = t.FirstLeft
						return t
					}),
					(r.Clipper.prototype.JoinCommonEdges = function () {
						for (var t = 0, e = this.m_Joins.length; t < e; t++) {
							var r,
								n = this.m_Joins[t],
								i = this.GetOutRec(n.OutPt1.Idx),
								s = this.GetOutRec(n.OutPt2.Idx)
							if (null !== i.Pts && null !== s.Pts)
								if (!i.IsOpen && !s.IsOpen)
									(r =
										i === s
											? i
											: this.OutRec1RightOfOutRec2(i, s)
											? s
											: this.OutRec1RightOfOutRec2(s, i)
											? i
											: this.GetLowermostRec(i, s)),
										this.JoinPoints(n, i, s) &&
											(i === s
												? ((i.Pts = n.OutPt1),
												  (i.BottomPt = null),
												  ((s = this.CreateOutRec()).Pts = n.OutPt2),
												  this.UpdateOutPtIdxs(s),
												  this.Poly2ContainsPoly1(s.Pts, i.Pts)
														? ((s.IsHole = !i.IsHole),
														  (s.FirstLeft = i),
														  this.m_UsingPolyTree && this.FixupFirstLefts2(s, i),
														  (s.IsHole ^ this.ReverseSolution) == this.Area$1(s) > 0 && this.ReversePolyPtLinks(s.Pts))
														: this.Poly2ContainsPoly1(i.Pts, s.Pts)
														? ((s.IsHole = i.IsHole),
														  (i.IsHole = !s.IsHole),
														  (s.FirstLeft = i.FirstLeft),
														  (i.FirstLeft = s),
														  this.m_UsingPolyTree && this.FixupFirstLefts2(i, s),
														  (i.IsHole ^ this.ReverseSolution) == this.Area$1(i) > 0 && this.ReversePolyPtLinks(i.Pts))
														: ((s.IsHole = i.IsHole),
														  (s.FirstLeft = i.FirstLeft),
														  this.m_UsingPolyTree && this.FixupFirstLefts1(i, s)))
												: ((s.Pts = null),
												  (s.BottomPt = null),
												  (s.Idx = i.Idx),
												  (i.IsHole = r.IsHole),
												  r === s && (i.FirstLeft = s.FirstLeft),
												  (s.FirstLeft = i),
												  this.m_UsingPolyTree && this.FixupFirstLefts3(s, i)))
						}
					}),
					(r.Clipper.prototype.UpdateOutPtIdxs = function (t) {
						var e = t.Pts
						do {
							;(e.Idx = t.Idx), (e = e.Prev)
						} while (e !== t.Pts)
					}),
					(r.Clipper.prototype.DoSimplePolygons = function () {
						for (var t = 0; t < this.m_PolyOuts.length; ) {
							var e = this.m_PolyOuts[t++],
								n = e.Pts
							if (null !== n && !e.IsOpen)
								do {
									for (var i = n.Next; i !== e.Pts; ) {
										if (r.IntPoint.op_Equality(n.Pt, i.Pt) && i.Next !== n && i.Prev !== n) {
											var s = n.Prev,
												o = i.Prev
											;(n.Prev = o), (o.Next = n), (i.Prev = s), (s.Next = i), (e.Pts = n)
											var a = this.CreateOutRec()
											;(a.Pts = i),
												this.UpdateOutPtIdxs(a),
												this.Poly2ContainsPoly1(a.Pts, e.Pts)
													? ((a.IsHole = !e.IsHole),
													  (a.FirstLeft = e),
													  this.m_UsingPolyTree && this.FixupFirstLefts2(a, e))
													: this.Poly2ContainsPoly1(e.Pts, a.Pts)
													? ((a.IsHole = e.IsHole),
													  (e.IsHole = !a.IsHole),
													  (a.FirstLeft = e.FirstLeft),
													  (e.FirstLeft = a),
													  this.m_UsingPolyTree && this.FixupFirstLefts2(e, a))
													: ((a.IsHole = e.IsHole),
													  (a.FirstLeft = e.FirstLeft),
													  this.m_UsingPolyTree && this.FixupFirstLefts1(e, a)),
												(i = n)
										}
										i = i.Next
									}
									n = n.Next
								} while (n !== e.Pts)
						}
					}),
					(r.Clipper.Area = function (t) {
						if (!Array.isArray(t)) return 0
						var e = t.length
						if (e < 3) return 0
						for (var r = 0, n = 0, i = e - 1; n < e; ++n) (r += (t[i].X + t[n].X) * (t[i].Y - t[n].Y)), (i = n)
						return 0.5 * -r
					}),
					(r.Clipper.prototype.Area = function (t) {
						var e = t
						if (null === t) return 0
						var r = 0
						do {
							;(r += (t.Prev.Pt.X + t.Pt.X) * (t.Prev.Pt.Y - t.Pt.Y)), (t = t.Next)
						} while (t !== e)
						return 0.5 * r
					}),
					(r.Clipper.prototype.Area$1 = function (t) {
						return this.Area(t.Pts)
					}),
					(r.Clipper.SimplifyPolygon = function (t, e) {
						var n = new Array(),
							i = new r.Clipper(0)
						return (
							(i.StrictlySimple = !0), i.AddPath(t, r.PolyType.ptSubject, !0), i.Execute(r.ClipType.ctUnion, n, e, e), n
						)
					}),
					(r.Clipper.SimplifyPolygons = function (t, e) {
						void 0 === e && (e = r.PolyFillType.pftEvenOdd)
						var n = new Array(),
							i = new r.Clipper(0)
						return (
							(i.StrictlySimple = !0),
							i.AddPaths(t, r.PolyType.ptSubject, !0),
							i.Execute(r.ClipType.ctUnion, n, e, e),
							n
						)
					}),
					(r.Clipper.DistanceSqrd = function (t, e) {
						var r = t.X - e.X,
							n = t.Y - e.Y
						return r * r + n * n
					}),
					(r.Clipper.DistanceFromLineSqrd = function (t, e, r) {
						var n = e.Y - r.Y,
							i = r.X - e.X,
							s = n * e.X + i * e.Y
						return ((s = n * t.X + i * t.Y - s) * s) / (n * n + i * i)
					}),
					(r.Clipper.SlopesNearCollinear = function (t, e, n, i) {
						return Math.abs(t.X - e.X) > Math.abs(t.Y - e.Y)
							? t.X > e.X == t.X < n.X
								? r.Clipper.DistanceFromLineSqrd(t, e, n) < i
								: e.X > t.X == e.X < n.X
								? r.Clipper.DistanceFromLineSqrd(e, t, n) < i
								: r.Clipper.DistanceFromLineSqrd(n, t, e) < i
							: t.Y > e.Y == t.Y < n.Y
							? r.Clipper.DistanceFromLineSqrd(t, e, n) < i
							: e.Y > t.Y == e.Y < n.Y
							? r.Clipper.DistanceFromLineSqrd(e, t, n) < i
							: r.Clipper.DistanceFromLineSqrd(n, t, e) < i
					}),
					(r.Clipper.PointsAreClose = function (t, e, r) {
						var n = t.X - e.X,
							i = t.Y - e.Y
						return n * n + i * i <= r
					}),
					(r.Clipper.ExcludeOp = function (t) {
						var e = t.Prev
						return (e.Next = t.Next), (t.Next.Prev = e), (e.Idx = 0), e
					}),
					(r.Clipper.CleanPolygon = function (t, e) {
						void 0 === e && (e = 1.415)
						var n = t.length
						if (0 === n) return new Array()
						for (var i = new Array(n), s = 0; s < n; ++s) i[s] = new r.OutPt()
						for (s = 0; s < n; ++s)
							(i[s].Pt = t[s]), (i[s].Next = i[(s + 1) % n]), (i[s].Next.Prev = i[s]), (i[s].Idx = 0)
						for (var o = e * e, a = i[0]; 0 === a.Idx && a.Next !== a.Prev; )
							r.Clipper.PointsAreClose(a.Pt, a.Prev.Pt, o)
								? ((a = r.Clipper.ExcludeOp(a)), n--)
								: r.Clipper.PointsAreClose(a.Prev.Pt, a.Next.Pt, o)
								? (r.Clipper.ExcludeOp(a.Next), (a = r.Clipper.ExcludeOp(a)), (n -= 2))
								: r.Clipper.SlopesNearCollinear(a.Prev.Pt, a.Pt, a.Next.Pt, o)
								? ((a = r.Clipper.ExcludeOp(a)), n--)
								: ((a.Idx = 1), (a = a.Next))
						n < 3 && (n = 0)
						var l = new Array(n)
						for (s = 0; s < n; ++s) (l[s] = new r.IntPoint1(a.Pt)), (a = a.Next)
						return (i = null), l
					}),
					(r.Clipper.CleanPolygons = function (t, e) {
						for (var n = new Array(t.length), i = 0, s = t.length; i < s; i++) n[i] = r.Clipper.CleanPolygon(t[i], e)
						return n
					}),
					(r.Clipper.Minkowski = function (t, e, n, i) {
						var s = i ? 1 : 0,
							o = t.length,
							a = e.length,
							l = new Array()
						if (n)
							for (var u = 0; u < a; u++) {
								for (var h = new Array(o), f = 0, p = t.length, c = t[f]; f < p; c = t[++f])
									h[f] = new r.IntPoint2(e[u].X + c.X, e[u].Y + c.Y)
								l.push(h)
							}
						else
							for (u = 0; u < a; u++) {
								for (h = new Array(o), f = 0, p = t.length, c = t[f]; f < p; c = t[++f])
									h[f] = new r.IntPoint2(e[u].X - c.X, e[u].Y - c.Y)
								l.push(h)
							}
						var d = new Array()
						for (u = 0; u < a - 1 + s; u++)
							for (f = 0; f < o; f++) {
								var m = new Array()
								m.push(l[u % a][f % o]),
									m.push(l[(u + 1) % a][f % o]),
									m.push(l[(u + 1) % a][(f + 1) % o]),
									m.push(l[u % a][(f + 1) % o]),
									r.Clipper.Orientation(m) || m.reverse(),
									d.push(m)
							}
						return d
					}),
					(r.Clipper.MinkowskiSum = function (t, e, n) {
						if (e[0] instanceof Array) {
							u = e
							for (var i = new r.Paths(), s = ((a = new r.Clipper()), 0); s < u.length; ++s) {
								var o = r.Clipper.Minkowski(t, u[s], !0, n)
								if ((a.AddPaths(o, r.PolyType.ptSubject, !0), n)) {
									l = r.Clipper.TranslatePath(u[s], t[0])
									a.AddPath(l, r.PolyType.ptClip, !0)
								}
							}
							return a.Execute(r.ClipType.ctUnion, i, r.PolyFillType.pftNonZero, r.PolyFillType.pftNonZero), i
						}
						var a,
							l = e,
							u = r.Clipper.Minkowski(t, l, !0, n)
						return (
							(a = new r.Clipper()).AddPaths(u, r.PolyType.ptSubject, !0),
							a.Execute(r.ClipType.ctUnion, u, r.PolyFillType.pftNonZero, r.PolyFillType.pftNonZero),
							u
						)
					}),
					(r.Clipper.TranslatePath = function (t, e) {
						for (var n = new r.Path(), i = 0; i < t.length; i++) n.push(new r.IntPoint2(t[i].X + e.X, t[i].Y + e.Y))
						return n
					}),
					(r.Clipper.MinkowskiDiff = function (t, e) {
						var n = r.Clipper.Minkowski(t, e, !1, !0),
							i = new r.Clipper()
						return (
							i.AddPaths(n, r.PolyType.ptSubject, !0),
							i.Execute(r.ClipType.ctUnion, n, r.PolyFillType.pftNonZero, r.PolyFillType.pftNonZero),
							n
						)
					}),
					(r.Clipper.PolyTreeToPaths = function (t) {
						var e = new Array()
						return r.Clipper.AddPolyNodeToPaths(t, r.Clipper.NodeType.ntAny, e), e
					}),
					(r.Clipper.AddPolyNodeToPaths = function (t, e, n) {
						var i = !0
						switch (e) {
							case r.Clipper.NodeType.ntOpen:
								return
							case r.Clipper.NodeType.ntClosed:
								i = !t.IsOpen
						}
						t.m_polygon.length > 0 && i && n.push(t.m_polygon)
						for (var s = 0, o = t.Childs(), a = o.length, l = o[s]; s < a; l = o[++s])
							r.Clipper.AddPolyNodeToPaths(l, e, n)
					}),
					(r.Clipper.OpenPathsFromPolyTree = function (t) {
						for (var e = new r.Paths(), n = 0, i = t.ChildCount(); n < i; n++)
							t.Childs()[n].IsOpen && e.push(t.Childs()[n].m_polygon)
						return e
					}),
					(r.Clipper.ClosedPathsFromPolyTree = function (t) {
						var e = new r.Paths()
						return r.Clipper.AddPolyNodeToPaths(t, r.Clipper.NodeType.ntClosed, e), e
					}),
					k(r.Clipper, r.ClipperBase),
					(r.Clipper.NodeType = { ntAny: 0, ntOpen: 1, ntClosed: 2 }),
					(r.ClipperOffset = function (t, e) {
						void 0 === t && (t = 2),
							void 0 === e && (e = r.ClipperOffset.def_arc_tolerance),
							(this.m_destPolys = new r.Paths()),
							(this.m_srcPoly = new r.Path()),
							(this.m_destPoly = new r.Path()),
							(this.m_normals = new Array()),
							(this.m_delta = 0),
							(this.m_sinA = 0),
							(this.m_sin = 0),
							(this.m_cos = 0),
							(this.m_miterLim = 0),
							(this.m_StepsPerRad = 0),
							(this.m_lowest = new r.IntPoint0()),
							(this.m_polyNodes = new r.PolyNode()),
							(this.MiterLimit = t),
							(this.ArcTolerance = e),
							(this.m_lowest.X = -1)
					}),
					(r.ClipperOffset.two_pi = 6.28318530717959),
					(r.ClipperOffset.def_arc_tolerance = 0.25),
					(r.ClipperOffset.prototype.Clear = function () {
						r.Clear(this.m_polyNodes.Childs()), (this.m_lowest.X = -1)
					}),
					(r.ClipperOffset.Round = r.Clipper.Round),
					(r.ClipperOffset.prototype.AddPath = function (t, e, n) {
						var i = t.length - 1
						if (!(i < 0)) {
							var s = new r.PolyNode()
							if (
								((s.m_jointype = e), (s.m_endtype = n), n === r.EndType.etClosedLine || n === r.EndType.etClosedPolygon)
							)
								for (; i > 0 && r.IntPoint.op_Equality(t[0], t[i]); ) i--
							s.m_polygon.push(t[0])
							for (var o = 0, a = 0, l = 1; l <= i; l++)
								r.IntPoint.op_Inequality(s.m_polygon[o], t[l]) &&
									(o++,
									s.m_polygon.push(t[l]),
									(t[l].Y > s.m_polygon[a].Y || (t[l].Y === s.m_polygon[a].Y && t[l].X < s.m_polygon[a].X)) && (a = o))
							if (
								!(n === r.EndType.etClosedPolygon && o < 2) &&
								(this.m_polyNodes.AddChild(s), n === r.EndType.etClosedPolygon)
							)
								if (this.m_lowest.X < 0) this.m_lowest = new r.IntPoint2(this.m_polyNodes.ChildCount() - 1, a)
								else {
									var u = this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon[this.m_lowest.Y]
									;(s.m_polygon[a].Y > u.Y || (s.m_polygon[a].Y === u.Y && s.m_polygon[a].X < u.X)) &&
										(this.m_lowest = new r.IntPoint2(this.m_polyNodes.ChildCount() - 1, a))
								}
						}
					}),
					(r.ClipperOffset.prototype.AddPaths = function (t, e, r) {
						for (var n = 0, i = t.length; n < i; n++) this.AddPath(t[n], e, r)
					}),
					(r.ClipperOffset.prototype.FixOrientations = function () {
						if (this.m_lowest.X >= 0 && !r.Clipper.Orientation(this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon))
							for (var t = 0; t < this.m_polyNodes.ChildCount(); t++) {
								;((e = this.m_polyNodes.Childs()[t]).m_endtype === r.EndType.etClosedPolygon ||
									(e.m_endtype === r.EndType.etClosedLine && r.Clipper.Orientation(e.m_polygon))) &&
									e.m_polygon.reverse()
							}
						else
							for (t = 0; t < this.m_polyNodes.ChildCount(); t++) {
								var e
								;(e = this.m_polyNodes.Childs()[t]).m_endtype !== r.EndType.etClosedLine ||
									r.Clipper.Orientation(e.m_polygon) ||
									e.m_polygon.reverse()
							}
					}),
					(r.ClipperOffset.GetUnitNormal = function (t, e) {
						var n = e.X - t.X,
							i = e.Y - t.Y
						if (0 === n && 0 === i) return new r.DoublePoint2(0, 0)
						var s = 1 / Math.sqrt(n * n + i * i)
						return (n *= s), (i *= s), new r.DoublePoint2(i, -n)
					}),
					(r.ClipperOffset.prototype.DoOffset = function (t) {
						if (((this.m_destPolys = new Array()), (this.m_delta = t), r.ClipperBase.near_zero(t)))
							for (var e = 0; e < this.m_polyNodes.ChildCount(); e++) {
								;(s = this.m_polyNodes.Childs()[e]).m_endtype === r.EndType.etClosedPolygon &&
									this.m_destPolys.push(s.m_polygon)
							}
						else {
							var n
							this.MiterLimit > 2
								? (this.m_miterLim = 2 / (this.MiterLimit * this.MiterLimit))
								: (this.m_miterLim = 0.5),
								(n =
									this.ArcTolerance <= 0
										? r.ClipperOffset.def_arc_tolerance
										: this.ArcTolerance > Math.abs(t) * r.ClipperOffset.def_arc_tolerance
										? Math.abs(t) * r.ClipperOffset.def_arc_tolerance
										: this.ArcTolerance)
							var i = 3.14159265358979 / Math.acos(1 - n / Math.abs(t))
							;(this.m_sin = Math.sin(r.ClipperOffset.two_pi / i)),
								(this.m_cos = Math.cos(r.ClipperOffset.two_pi / i)),
								(this.m_StepsPerRad = i / r.ClipperOffset.two_pi),
								t < 0 && (this.m_sin = -this.m_sin)
							for (e = 0; e < this.m_polyNodes.ChildCount(); e++) {
								var s = this.m_polyNodes.Childs()[e]
								this.m_srcPoly = s.m_polygon
								var o = this.m_srcPoly.length
								if (!(0 === o || (t <= 0 && (o < 3 || s.m_endtype !== r.EndType.etClosedPolygon))))
									if (((this.m_destPoly = new Array()), 1 !== o)) {
										this.m_normals.length = 0
										for (p = 0; p < o - 1; p++)
											this.m_normals.push(r.ClipperOffset.GetUnitNormal(this.m_srcPoly[p], this.m_srcPoly[p + 1]))
										if (
											(s.m_endtype === r.EndType.etClosedLine || s.m_endtype === r.EndType.etClosedPolygon
												? this.m_normals.push(r.ClipperOffset.GetUnitNormal(this.m_srcPoly[o - 1], this.m_srcPoly[0]))
												: this.m_normals.push(new r.DoublePoint1(this.m_normals[o - 2])),
											s.m_endtype === r.EndType.etClosedPolygon)
										) {
											var a = o - 1
											for (p = 0; p < o; p++) a = this.OffsetPoint(p, a, s.m_jointype)
											this.m_destPolys.push(this.m_destPoly)
										} else if (s.m_endtype === r.EndType.etClosedLine) {
											for (a = o - 1, p = 0; p < o; p++) a = this.OffsetPoint(p, a, s.m_jointype)
											this.m_destPolys.push(this.m_destPoly), (this.m_destPoly = new Array())
											var l = this.m_normals[o - 1]
											for (p = o - 1; p > 0; p--)
												this.m_normals[p] = new r.DoublePoint2(-this.m_normals[p - 1].X, -this.m_normals[p - 1].Y)
											;(this.m_normals[0] = new r.DoublePoint2(-l.X, -l.Y)), (a = 0)
											for (p = o - 1; p >= 0; p--) a = this.OffsetPoint(p, a, s.m_jointype)
											this.m_destPolys.push(this.m_destPoly)
										} else {
											var u
											for (a = 0, p = 1; p < o - 1; ++p) a = this.OffsetPoint(p, a, s.m_jointype)
											if (s.m_endtype === r.EndType.etOpenButt) {
												p = o - 1
												;(u = new r.IntPoint2(
													r.ClipperOffset.Round(this.m_srcPoly[p].X + this.m_normals[p].X * t),
													r.ClipperOffset.Round(this.m_srcPoly[p].Y + this.m_normals[p].Y * t)
												)),
													this.m_destPoly.push(u),
													(u = new r.IntPoint2(
														r.ClipperOffset.Round(this.m_srcPoly[p].X - this.m_normals[p].X * t),
														r.ClipperOffset.Round(this.m_srcPoly[p].Y - this.m_normals[p].Y * t)
													)),
													this.m_destPoly.push(u)
											} else {
												p = o - 1
												;(a = o - 2),
													(this.m_sinA = 0),
													(this.m_normals[p] = new r.DoublePoint2(-this.m_normals[p].X, -this.m_normals[p].Y)),
													s.m_endtype === r.EndType.etOpenSquare ? this.DoSquare(p, a) : this.DoRound(p, a)
											}
											for (p = o - 1; p > 0; p--)
												this.m_normals[p] = new r.DoublePoint2(-this.m_normals[p - 1].X, -this.m_normals[p - 1].Y)
											this.m_normals[0] = new r.DoublePoint2(-this.m_normals[1].X, -this.m_normals[1].Y)
											for (p = (a = o - 1) - 1; p > 0; --p) a = this.OffsetPoint(p, a, s.m_jointype)
											s.m_endtype === r.EndType.etOpenButt
												? ((u = new r.IntPoint2(
														r.ClipperOffset.Round(this.m_srcPoly[0].X - this.m_normals[0].X * t),
														r.ClipperOffset.Round(this.m_srcPoly[0].Y - this.m_normals[0].Y * t)
												  )),
												  this.m_destPoly.push(u),
												  (u = new r.IntPoint2(
														r.ClipperOffset.Round(this.m_srcPoly[0].X + this.m_normals[0].X * t),
														r.ClipperOffset.Round(this.m_srcPoly[0].Y + this.m_normals[0].Y * t)
												  )),
												  this.m_destPoly.push(u))
												: ((a = 1),
												  (this.m_sinA = 0),
												  s.m_endtype === r.EndType.etOpenSquare ? this.DoSquare(0, 1) : this.DoRound(0, 1)),
												this.m_destPolys.push(this.m_destPoly)
										}
									} else {
										if (s.m_jointype === r.JoinType.jtRound)
											for (var h = 1, f = 0, p = 1; p <= i; p++) {
												this.m_destPoly.push(
													new r.IntPoint2(
														r.ClipperOffset.Round(this.m_srcPoly[0].X + h * t),
														r.ClipperOffset.Round(this.m_srcPoly[0].Y + f * t)
													)
												)
												var c = h
												;(h = h * this.m_cos - this.m_sin * f), (f = c * this.m_sin + f * this.m_cos)
											}
										else {
											;(h = -1), (f = -1)
											for (var p = 0; p < 4; ++p)
												this.m_destPoly.push(
													new r.IntPoint2(
														r.ClipperOffset.Round(this.m_srcPoly[0].X + h * t),
														r.ClipperOffset.Round(this.m_srcPoly[0].Y + f * t)
													)
												),
													h < 0 ? (h = 1) : f < 0 ? (f = 1) : (h = -1)
										}
										this.m_destPolys.push(this.m_destPoly)
									}
							}
						}
					}),
					(r.ClipperOffset.prototype.Execute = function () {
						var t = arguments,
							e = t[0] instanceof r.PolyTree
						if (e) {
							;(o = t[0]), (a = t[1])
							if (
								(o.Clear(),
								this.FixOrientations(),
								this.DoOffset(a),
								(s = new r.Clipper(0)).AddPaths(this.m_destPolys, r.PolyType.ptSubject, !0),
								a > 0)
							)
								s.Execute(r.ClipType.ctUnion, o, r.PolyFillType.pftPositive, r.PolyFillType.pftPositive)
							else {
								u = r.Clipper.GetBounds(this.m_destPolys)
								if (
									((l = new r.Path()).push(new r.IntPoint2(u.left - 10, u.bottom + 10)),
									l.push(new r.IntPoint2(u.right + 10, u.bottom + 10)),
									l.push(new r.IntPoint2(u.right + 10, u.top - 10)),
									l.push(new r.IntPoint2(u.left - 10, u.top - 10)),
									s.AddPath(l, r.PolyType.ptSubject, !0),
									(s.ReverseSolution = !0),
									s.Execute(r.ClipType.ctUnion, o, r.PolyFillType.pftNegative, r.PolyFillType.pftNegative),
									1 === o.ChildCount() && o.Childs()[0].ChildCount() > 0)
								) {
									var n = o.Childs()[0]
									;(o.Childs()[0] = n.Childs()[0]), (o.Childs()[0].m_Parent = o)
									for (var i = 1; i < n.ChildCount(); i++) o.AddChild(n.Childs()[i])
								} else o.Clear()
							}
						} else {
							var s,
								o = t[0],
								a = t[1]
							if (
								(r.Clear(o),
								this.FixOrientations(),
								this.DoOffset(a),
								(s = new r.Clipper(0)).AddPaths(this.m_destPolys, r.PolyType.ptSubject, !0),
								a > 0)
							)
								s.Execute(r.ClipType.ctUnion, o, r.PolyFillType.pftPositive, r.PolyFillType.pftPositive)
							else {
								var l,
									u = r.Clipper.GetBounds(this.m_destPolys)
								;(l = new r.Path()).push(new r.IntPoint2(u.left - 10, u.bottom + 10)),
									l.push(new r.IntPoint2(u.right + 10, u.bottom + 10)),
									l.push(new r.IntPoint2(u.right + 10, u.top - 10)),
									l.push(new r.IntPoint2(u.left - 10, u.top - 10)),
									s.AddPath(l, r.PolyType.ptSubject, !0),
									(s.ReverseSolution = !0),
									s.Execute(r.ClipType.ctUnion, o, r.PolyFillType.pftNegative, r.PolyFillType.pftNegative),
									o.length > 0 && o.splice(0, 1)
							}
						}
					}),
					(r.ClipperOffset.prototype.OffsetPoint = function (t, e, n) {
						if (
							((this.m_sinA = this.m_normals[e].X * this.m_normals[t].Y - this.m_normals[t].X * this.m_normals[e].Y),
							Math.abs(this.m_sinA * this.m_delta) < 1)
						) {
							if (this.m_normals[e].X * this.m_normals[t].X + this.m_normals[t].Y * this.m_normals[e].Y > 0)
								return (
									this.m_destPoly.push(
										new r.IntPoint2(
											r.ClipperOffset.Round(this.m_srcPoly[t].X + this.m_normals[e].X * this.m_delta),
											r.ClipperOffset.Round(this.m_srcPoly[t].Y + this.m_normals[e].Y * this.m_delta)
										)
									),
									e
								)
						} else this.m_sinA > 1 ? (this.m_sinA = 1) : this.m_sinA < -1 && (this.m_sinA = -1)
						if (this.m_sinA * this.m_delta < 0)
							this.m_destPoly.push(
								new r.IntPoint2(
									r.ClipperOffset.Round(this.m_srcPoly[t].X + this.m_normals[e].X * this.m_delta),
									r.ClipperOffset.Round(this.m_srcPoly[t].Y + this.m_normals[e].Y * this.m_delta)
								)
							),
								this.m_destPoly.push(new r.IntPoint1(this.m_srcPoly[t])),
								this.m_destPoly.push(
									new r.IntPoint2(
										r.ClipperOffset.Round(this.m_srcPoly[t].X + this.m_normals[t].X * this.m_delta),
										r.ClipperOffset.Round(this.m_srcPoly[t].Y + this.m_normals[t].Y * this.m_delta)
									)
								)
						else
							switch (n) {
								case r.JoinType.jtMiter:
									var i = this.m_normals[t].X * this.m_normals[e].X + this.m_normals[t].Y * this.m_normals[e].Y + 1
									i >= this.m_miterLim ? this.DoMiter(t, e, i) : this.DoSquare(t, e)
									break
								case r.JoinType.jtSquare:
									this.DoSquare(t, e)
									break
								case r.JoinType.jtRound:
									this.DoRound(t, e)
							}
						return (e = t)
					}),
					(r.ClipperOffset.prototype.DoSquare = function (t, e) {
						var n = Math.tan(
							Math.atan2(
								this.m_sinA,
								this.m_normals[e].X * this.m_normals[t].X + this.m_normals[e].Y * this.m_normals[t].Y
							) / 4
						)
						this.m_destPoly.push(
							new r.IntPoint2(
								r.ClipperOffset.Round(
									this.m_srcPoly[t].X + this.m_delta * (this.m_normals[e].X - this.m_normals[e].Y * n)
								),
								r.ClipperOffset.Round(
									this.m_srcPoly[t].Y + this.m_delta * (this.m_normals[e].Y + this.m_normals[e].X * n)
								)
							)
						),
							this.m_destPoly.push(
								new r.IntPoint2(
									r.ClipperOffset.Round(
										this.m_srcPoly[t].X + this.m_delta * (this.m_normals[t].X + this.m_normals[t].Y * n)
									),
									r.ClipperOffset.Round(
										this.m_srcPoly[t].Y + this.m_delta * (this.m_normals[t].Y - this.m_normals[t].X * n)
									)
								)
							)
					}),
					(r.ClipperOffset.prototype.DoMiter = function (t, e, n) {
						var i = this.m_delta / n
						this.m_destPoly.push(
							new r.IntPoint2(
								r.ClipperOffset.Round(this.m_srcPoly[t].X + (this.m_normals[e].X + this.m_normals[t].X) * i),
								r.ClipperOffset.Round(this.m_srcPoly[t].Y + (this.m_normals[e].Y + this.m_normals[t].Y) * i)
							)
						)
					}),
					(r.ClipperOffset.prototype.DoRound = function (t, e) {
						for (
							var n,
								i = Math.atan2(
									this.m_sinA,
									this.m_normals[e].X * this.m_normals[t].X + this.m_normals[e].Y * this.m_normals[t].Y
								),
								s = Math.max(r.Cast_Int32(r.ClipperOffset.Round(this.m_StepsPerRad * Math.abs(i))), 1),
								o = this.m_normals[e].X,
								a = this.m_normals[e].Y,
								l = 0;
							l < s;
							++l
						)
							this.m_destPoly.push(
								new r.IntPoint2(
									r.ClipperOffset.Round(this.m_srcPoly[t].X + o * this.m_delta),
									r.ClipperOffset.Round(this.m_srcPoly[t].Y + a * this.m_delta)
								)
							),
								(n = o),
								(o = o * this.m_cos - this.m_sin * a),
								(a = n * this.m_sin + a * this.m_cos)
						this.m_destPoly.push(
							new r.IntPoint2(
								r.ClipperOffset.Round(this.m_srcPoly[t].X + this.m_normals[t].X * this.m_delta),
								r.ClipperOffset.Round(this.m_srcPoly[t].Y + this.m_normals[t].Y * this.m_delta)
							)
						)
					}),
					(r.Error = function (t) {
						try {
							throw new Error(t)
						} catch (t) {
							alert(t.message)
						}
					}),
					(r.JS = {}),
					(r.JS.AreaOfPolygon = function (t, e) {
						return e || (e = 1), r.Clipper.Area(t) / (e * e)
					}),
					(r.JS.AreaOfPolygons = function (t, e) {
						e || (e = 1)
						for (var n = 0, i = 0; i < t.length; i++) n += r.Clipper.Area(t[i])
						return n / (e * e)
					}),
					(r.JS.BoundsOfPath = function (t, e) {
						return r.JS.BoundsOfPaths([t], e)
					}),
					(r.JS.BoundsOfPaths = function (t, e) {
						e || (e = 1)
						var n = r.Clipper.GetBounds(t)
						return (n.left /= e), (n.bottom /= e), (n.right /= e), (n.top /= e), n
					}),
					(r.JS.Clean = function (t, e) {
						if (!(t instanceof Array)) return []
						var n = t[0] instanceof Array
						t = r.JS.Clone(t)
						if ('number' != typeof e || null === e) return r.Error('Delta is not a number in Clean().'), t
						if (0 === t.length || (1 === t.length && 0 === t[0].length) || e < 0) return t
						n || (t = [t])
						for (var i, s, o, a, l, u, h, f = t.length, p = [], c = 0; c < f; c++)
							if (0 !== (i = (s = t[c]).length))
								if (i < 3) (o = s), p.push(o)
								else {
									for (o = s, a = e * e, l = s[0], u = 1, h = 1; h < i; h++)
										(s[h].X - l.X) * (s[h].X - l.X) + (s[h].Y - l.Y) * (s[h].Y - l.Y) <= a ||
											((o[u] = s[h]), (l = s[h]), u++)
									;(l = s[u - 1]),
										(s[0].X - l.X) * (s[0].X - l.X) + (s[0].Y - l.Y) * (s[0].Y - l.Y) <= a && u--,
										u < i && o.splice(u, i - u),
										o.length && p.push(o)
								}
						return !n && p.length ? (p = p[0]) : n || 0 !== p.length ? n && 0 === p.length && (p = [[]]) : (p = []), p
					}),
					(r.JS.Clone = function (t) {
						if (!(t instanceof Array)) return []
						if (0 === t.length) return []
						if (1 === t.length && 0 === t[0].length) return [[]]
						var e = t[0] instanceof Array
						e || (t = [t])
						var r,
							n,
							i,
							s,
							o = t.length,
							a = new Array(o)
						for (n = 0; n < o; n++) {
							for (r = t[n].length, s = new Array(r), i = 0; i < r; i++) s[i] = { X: t[n][i].X, Y: t[n][i].Y }
							a[n] = s
						}
						return e || (a = a[0]), a
					}),
					(r.JS.Lighten = function (t, e) {
						if (!(t instanceof Array)) return []
						if ('number' != typeof e || null === e)
							return r.Error('Tolerance is not a number in Lighten().'), r.JS.Clone(t)
						if (0 === t.length || (1 === t.length && 0 === t[0].length) || e < 0) return r.JS.Clone(t)
						var n,
							i,
							s,
							o,
							a,
							l,
							u,
							h,
							f,
							p,
							c,
							d,
							m,
							y,
							v,
							g,
							_ = t[0] instanceof Array
						_ || (t = [t])
						var x = t.length,
							P = e * e,
							b = []
						for (n = 0; n < x; n++)
							if (0 !== (l = (s = t[n]).length)) {
								for (o = 0; o < 1e6; o++) {
									for (
										a = [],
											s[(l = s.length) - 1].X !== s[0].X || s[l - 1].Y !== s[0].Y
												? ((c = 1), s.push({ X: s[0].X, Y: s[0].Y }), (l = s.length))
												: (c = 0),
											p = [],
											i = 0;
										i < l - 2;
										i++
									)
										(u = s[i]),
											(f = s[i + 1]),
											(h = s[i + 2]),
											(v = u.X),
											(g = u.Y),
											(d = h.X - v),
											(m = h.Y - g),
											(0 === d && 0 === m) ||
												((y = ((f.X - v) * d + (f.Y - g) * m) / (d * d + m * m)) > 1
													? ((v = h.X), (g = h.Y))
													: y > 0 && ((v += d * y), (g += m * y))),
											(d = f.X - v) * d + (m = f.Y - g) * m <= P && ((p[i + 1] = 1), i++)
									for (a.push({ X: s[0].X, Y: s[0].Y }), i = 1; i < l - 1; i++) p[i] || a.push({ X: s[i].X, Y: s[i].Y })
									if ((a.push({ X: s[l - 1].X, Y: s[l - 1].Y }), c && s.pop(), !p.length)) break
									s = a
								}
								a[(l = a.length) - 1].X === a[0].X && a[l - 1].Y === a[0].Y && a.pop(), a.length > 2 && b.push(a)
							}
						return _ || (b = b[0]), void 0 === b && (b = []), b
					}),
					(r.JS.PerimeterOfPath = function (t, e, r) {
						if (void 0 === t) return 0
						var n,
							i,
							s = Math.sqrt,
							o = 0,
							a = 0,
							l = 0,
							u = 0,
							h = 0,
							f = t.length
						if (f < 2) return 0
						for (e && ((t[f] = t[0]), f++); --f; )
							(a = (n = t[f]).X),
								(l = n.Y),
								(o += s((a - (u = (i = t[f - 1]).X)) * (a - u) + (l - (h = i.Y)) * (l - h)))
						return e && t.pop(), o / r
					}),
					(r.JS.PerimeterOfPaths = function (t, e, n) {
						n || (n = 1)
						for (var i = 0, s = 0; s < t.length; s++) i += r.JS.PerimeterOfPath(t[s], e, n)
						return i
					}),
					(r.JS.ScaleDownPath = function (t, e) {
						var r, n
						for (e || (e = 1), r = t.length; r--; ) ((n = t[r]).X = n.X / e), (n.Y = n.Y / e)
					}),
					(r.JS.ScaleDownPaths = function (t, e) {
						var r, n, i
						for (e || (e = 1), r = t.length; r--; )
							for (n = t[r].length; n--; ) ((i = t[r][n]).X = i.X / e), (i.Y = i.Y / e)
					}),
					(r.JS.ScaleUpPath = function (t, e) {
						var r,
							n,
							i = Math.round
						for (e || (e = 1), r = t.length; r--; ) ((n = t[r]).X = i(n.X * e)), (n.Y = i(n.Y * e))
					}),
					(r.JS.ScaleUpPaths = function (t, e) {
						var r,
							n,
							i,
							s = Math.round
						for (e || (e = 1), r = t.length; r--; )
							for (n = t[r].length; n--; ) ((i = t[r][n]).X = s(i.X * e)), (i.Y = s(i.Y * e))
					}),
					(r.ExPolygons = function () {
						return []
					}),
					(r.ExPolygon = function () {
						;(this.outer = null), (this.holes = null)
					}),
					(r.JS.AddOuterPolyNodeToExPolygons = function (t, e) {
						var n = new r.ExPolygon()
						n.outer = t.Contour()
						var i,
							s,
							o,
							a,
							l,
							u,
							h = t.Childs(),
							f = h.length
						for (n.holes = new Array(f), o = 0; o < f; o++)
							for (i = h[o], n.holes[o] = i.Contour(), a = 0, u = (l = i.Childs()).length; a < u; a++)
								(s = l[a]), r.JS.AddOuterPolyNodeToExPolygons(s, e)
						e.push(n)
					}),
					(r.JS.ExPolygonsToPaths = function (t) {
						var e,
							n,
							i,
							s,
							o = new r.Paths()
						for (e = 0, i = t.length; e < i; e++)
							for (o.push(t[e].outer), n = 0, s = t[e].holes.length; n < s; n++) o.push(t[e].holes[n])
						return o
					}),
					(r.JS.PolyTreeToExPolygons = function (t) {
						var e,
							n,
							i,
							s,
							o = new r.ExPolygons()
						for (n = 0, s = (i = t.Childs()).length; n < s; n++) (e = i[n]), r.JS.AddOuterPolyNodeToExPolygons(e, o)
						return o
					})
			})()
		},
		464: function (t, e, r) {
			window.eve = r(465)
			var n = (function (t) {
					var e,
						r = {},
						n =
							window.requestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame ||
							window.oRequestAnimationFrame ||
							window.msRequestAnimationFrame ||
							function (t) {
								return setTimeout(t, 16, new Date().getTime()), !0
							},
						i =
							Array.isArray ||
							function (t) {
								return t instanceof Array || '[object Array]' == Object.prototype.toString.call(t)
							},
						s = 0,
						o = 'M' + (+new Date()).toString(36),
						a =
							Date.now ||
							function () {
								return +new Date()
							},
						l = function (t) {
							var e = this
							if (null == t) return e.s
							var r = e.s - t
							;(e.b += e.dur * r), (e.B += e.dur * r), (e.s = t)
						},
						u = function (t) {
							if (null == t) return this.spd
							this.spd = t
						},
						h = function (t) {
							var e = this
							if (null == t) return e.dur
							;(e.s = (e.s * t) / e.dur), (e.dur = t)
						},
						f = function () {
							var e = this
							delete r[e.id], e.update(), t('mina.stop.' + e.id, e)
						},
						p = function () {
							var t = this
							t.pdif || (delete r[t.id], t.update(), (t.pdif = t.get() - t.b))
						},
						c = function () {
							var t = this
							t.pdif && ((t.b = t.get() - t.pdif), delete t.pdif, (r[t.id] = t), m())
						},
						d = function () {
							var t,
								e = this
							if (i(e.start)) {
								t = []
								for (var r = 0, n = e.start.length; r < n; r++)
									t[r] = +e.start[r] + (e.end[r] - e.start[r]) * e.easing(e.s)
							} else t = +e.start + (e.end - e.start) * e.easing(e.s)
							e.set(t)
						},
						m = function (i) {
							if (i) {
								var s = 0
								for (var o in r)
									if (r.hasOwnProperty(o)) {
										var a = r[o],
											l = a.get()
										s++,
											(a.s = (l - a.b) / (a.dur / a.spd)),
											a.s >= 1 &&
												(delete r[o],
												(a.s = 1),
												s--,
												(function (e) {
													setTimeout(function () {
														t('mina.finish.' + e.id, e)
													})
												})(a)),
											a.update()
									}
								e = !!s && n(m)
							} else e || (e = n(m))
						},
						y = function (t, e, n, i, a, v, g) {
							var _ = {
								id: o + (s++).toString(36),
								start: t,
								end: e,
								b: n,
								s: 0,
								dur: i - n,
								spd: 1,
								get: a,
								set: v,
								easing: g || y.linear,
								status: l,
								speed: u,
								duration: h,
								stop: f,
								pause: p,
								resume: c,
								update: d,
							}
							r[_.id] = _
							var x,
								P = 0
							for (x in r) if (r.hasOwnProperty(x) && 2 == ++P) break
							return 1 == P && m(), _
						}
					return (
						(y.time = a),
						(y.getById = function (t) {
							return r[t] || null
						}),
						(y.linear = function (t) {
							return t
						}),
						(y.easeout = function (t) {
							return Math.pow(t, 1.7)
						}),
						(y.easein = function (t) {
							return Math.pow(t, 0.48)
						}),
						(y.easeinout = function (t) {
							if (1 == t) return 1
							if (0 == t) return 0
							var e = 0.48 - t / 1.04,
								r = Math.sqrt(0.1734 + e * e),
								n = r - e,
								i = -r - e,
								s =
									Math.pow(Math.abs(n), 1 / 3) * (n < 0 ? -1 : 1) +
									Math.pow(Math.abs(i), 1 / 3) * (i < 0 ? -1 : 1) +
									0.5
							return 3 * (1 - s) * s * s + s * s * s
						}),
						(y.backin = function (t) {
							if (1 == t) return 1
							var e = 1.70158
							return t * t * ((e + 1) * t - e)
						}),
						(y.backout = function (t) {
							if (0 == t) return 0
							var e = 1.70158
							return (t -= 1) * t * ((e + 1) * t + e) + 1
						}),
						(y.elastic = function (t) {
							return t == !!t ? t : Math.pow(2, -10 * t) * Math.sin(((t - 0.075) * (2 * Math.PI)) / 0.3) + 1
						}),
						(y.bounce = function (t) {
							var e = 7.5625,
								r = 2.75
							return t < 1 / r
								? e * t * t
								: t < 2 / r
								? e * (t -= 1.5 / r) * t + 0.75
								: t < 2.5 / r
								? e * (t -= 2.25 / r) * t + 0.9375
								: e * (t -= 2.625 / r) * t + 0.984375
						}),
						(window.mina = y),
						y
					)
				})('undefined' == typeof eve ? function () {} : eve),
				i = (function (t) {
					function e(t, n) {
						if (t) {
							if (t.nodeType) return Z(t)
							if (T(t, 'array') && e.set) return e.set.apply(e, t)
							if (t instanceof U) return t
							if (null == n)
								try {
									return Z((t = r.doc.querySelector(String(t))))
								} catch (t) {
									return null
								}
						}
						return new j((t = null == t ? '100%' : t), (n = null == n ? '100%' : n))
					}
					;(e.version = '0.5.1'),
						(e.toString = function () {
							return 'Snap v' + this.version
						}),
						(e._ = {})
					var r = { win: t.window, doc: t.window.document }
					e._.glob = r
					var n,
						i,
						s = 'hasOwnProperty',
						o = String,
						a = parseFloat,
						l = parseInt,
						u = Math,
						h = u.max,
						f = u.min,
						p = u.abs,
						c = (u.pow, u.PI),
						d = (u.round, Object.prototype.toString),
						m = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,
						y = ((e._.separator = /[,\s]+/), /[\s]*,[\s]*/),
						v = { hs: 1, rg: 1 },
						_ = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi,
						x = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi,
						P = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\s]*,?[\s]*/gi,
						b = 0,
						C = 'S' + (+new Date()).toString(36),
						w = function (t) {
							return (t && t.type ? t.type : '') + C + (b++).toString(36)
						},
						E = 'http://www.w3.org/1999/xlink',
						I = 'http://www.w3.org/2000/svg',
						A = {}
					e.url = function (t) {
						return "url('#" + t + "')"
					}
					function S(t, e) {
						if (e) {
							if (
								('#text' == t && (t = r.doc.createTextNode(e.text || e['#text'] || '')),
								'#comment' == t && (t = r.doc.createComment(e.text || e['#text'] || '')),
								'string' == typeof t && (t = S(t)),
								'string' == typeof e)
							)
								return 1 == t.nodeType
									? 'xlink:' == e.substring(0, 6)
										? t.getAttributeNS(E, e.substring(6))
										: 'xml:' == e.substring(0, 4)
										? t.getAttributeNS(I, e.substring(4))
										: t.getAttribute(e)
									: 'text' == e
									? t.nodeValue
									: null
							if (1 == t.nodeType) {
								for (var n in e)
									if (e[s](n)) {
										var i = o(e[n])
										i
											? 'xlink:' == n.substring(0, 6)
												? t.setAttributeNS(E, n.substring(6), i)
												: 'xml:' == n.substring(0, 4)
												? t.setAttributeNS(I, n.substring(4), i)
												: t.setAttribute(n, i)
											: t.removeAttribute(n)
									}
							} else 'text' in e && (t.nodeValue = e.text)
						} else t = r.doc.createElementNS(I, t)
						return t
					}
					function T(t, e) {
						return 'finite' == (e = o.prototype.toLowerCase.call(e))
							? isFinite(t)
							: !('array' != e || !(t instanceof Array || (Array.isArray && Array.isArray(t)))) ||
									('null' == e && null === t) ||
									(e == typeof t && null !== t) ||
									('object' == e && t === Object(t)) ||
									d.call(t).slice(8, -1).toLowerCase() == e
					}
					function k(t, e) {
						for (var r = 0, n = t.length; r < n; r++) if (t[r] === e) return t.push(t.splice(r, 1)[0])
					}
					function O(t, e, r) {
						return function n() {
							var i = Array.prototype.slice.call(arguments, 0),
								o = i.join('␀'),
								a = (n.cache = n.cache || {}),
								l = (n.count = n.count || [])
							return a[s](o)
								? (k(l, o), r ? r(a[o]) : a[o])
								: (l.length >= 1e3 && delete a[l.shift()], l.push(o), (a[o] = t.apply(e, i)), r ? r(a[o]) : a[o])
						}
					}
					function L(t) {
						return ((t % 360) * c) / 180
					}
					;(e._.$ = S),
						(e._.id = w),
						(e.format =
							((n = /\{([^\}]+)\}/g),
							(i = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g),
							function (t, e) {
								return o(t).replace(n, function (t, r) {
									return (function (t, e, r) {
										var n = r
										return (
											e.replace(i, function (t, e, r, i, s) {
												;(e = e || i), n && (e in n && (n = n[e]), 'function' == typeof n && s && (n = n()))
											}),
											(n = (null == n || n == r ? t : n) + '')
										)
									})(t, r, e)
								})
							})),
						(e._.clone = function t(e) {
							if ('function' == typeof e || Object(e) !== e) return e
							var r = new e.constructor()
							for (var n in e) e[s](n) && (r[n] = t(e[n]))
							return r
						}),
						(e._.cacher = O),
						(e.rad = L),
						(e.deg = function (t) {
							return ((180 * t) / c) % 360
						}),
						(e.sin = function (t) {
							return u.sin(e.rad(t))
						}),
						(e.tan = function (t) {
							return u.tan(e.rad(t))
						}),
						(e.cos = function (t) {
							return u.cos(e.rad(t))
						}),
						(e.asin = function (t) {
							return e.deg(u.asin(t))
						}),
						(e.acos = function (t) {
							return e.deg(u.acos(t))
						}),
						(e.atan = function (t) {
							return e.deg(u.atan(t))
						}),
						(e.atan2 = function (t) {
							return e.deg(u.atan2(t))
						}),
						(e.angle = function t(e, r, n, i, s, o) {
							if (null == s) {
								var a = e - n,
									l = r - i
								return a || l ? (180 + (180 * u.atan2(-l, -a)) / c + 360) % 360 : 0
							}
							return t(e, r, s, o) - t(n, i, s, o)
						}),
						(e.len = function (t, r, n, i) {
							return Math.sqrt(e.len2(t, r, n, i))
						}),
						(e.len2 = function (t, e, r, n) {
							return (t - r) * (t - r) + (e - n) * (e - n)
						}),
						(e.closestPoint = function (t, e, r) {
							function n(t) {
								var n = t.x - e,
									i = t.y - r
								return n * n + i * i
							}
							for (
								var i,
									s,
									o,
									a,
									l = t.node,
									u = l.getTotalLength(),
									h = (u / l.pathSegList.numberOfItems) * 0.125,
									f = 1 / 0,
									p = 0;
								p <= u;
								p += h
							)
								(a = n((o = l.getPointAtLength(p)))) < f && ((i = o), (s = p), (f = a))
							for (h *= 0.5; h > 0.5; ) {
								var c, d, m, y, v, g
								;(m = s - h) >= 0 && (v = n((c = l.getPointAtLength(m)))) < f
									? ((i = c), (s = m), (f = v))
									: (y = s + h) <= u && (g = n((d = l.getPointAtLength(y)))) < f
									? ((i = d), (s = y), (f = g))
									: (h *= 0.5)
							}
							return (i = { x: i.x, y: i.y, length: s, distance: Math.sqrt(f) })
						}),
						(e.is = T),
						(e.snapTo = function (t, e, r) {
							if (((r = T(r, 'finite') ? r : 10), T(t, 'array'))) {
								for (var n = t.length; n--; ) if (p(t[n] - e) <= r) return t[n]
							} else {
								var i = e % (t = +t)
								if (i < r) return e - i
								if (i > t - r) return e - i + t
							}
							return e
						}),
						(e.getRGB = O(function (t) {
							if (!t || (t = o(t)).indexOf('-') + 1) return { r: -1, g: -1, b: -1, hex: 'none', error: 1, toString: D }
							if ('none' == t) return { r: -1, g: -1, b: -1, hex: 'none', toString: D }
							if ((!v[s](t.toLowerCase().substring(0, 2)) && '#' != t.charAt() && (t = B(t)), !t))
								return { r: -1, g: -1, b: -1, hex: 'none', error: 1, toString: D }
							var r,
								n,
								i,
								p,
								c,
								d,
								g = t.match(m)
							return g
								? (g[2] &&
										((i = l(g[2].substring(5), 16)),
										(n = l(g[2].substring(3, 5), 16)),
										(r = l(g[2].substring(1, 3), 16))),
								  g[3] &&
										((i = l((c = g[3].charAt(3)) + c, 16)),
										(n = l((c = g[3].charAt(2)) + c, 16)),
										(r = l((c = g[3].charAt(1)) + c, 16))),
								  g[4] &&
										((d = g[4].split(y)),
										(r = a(d[0])),
										'%' == d[0].slice(-1) && (r *= 2.55),
										(n = a(d[1])),
										'%' == d[1].slice(-1) && (n *= 2.55),
										(i = a(d[2])),
										'%' == d[2].slice(-1) && (i *= 2.55),
										'rgba' == g[1].toLowerCase().slice(0, 4) && (p = a(d[3])),
										d[3] && '%' == d[3].slice(-1) && (p /= 100)),
								  g[5]
										? ((d = g[5].split(y)),
										  (r = a(d[0])),
										  '%' == d[0].slice(-1) && (r /= 100),
										  (n = a(d[1])),
										  '%' == d[1].slice(-1) && (n /= 100),
										  (i = a(d[2])),
										  '%' == d[2].slice(-1) && (i /= 100),
										  ('deg' == d[0].slice(-3) || '°' == d[0].slice(-1)) && (r /= 360),
										  'hsba' == g[1].toLowerCase().slice(0, 4) && (p = a(d[3])),
										  d[3] && '%' == d[3].slice(-1) && (p /= 100),
										  e.hsb2rgb(r, n, i, p))
										: g[6]
										? ((d = g[6].split(y)),
										  (r = a(d[0])),
										  '%' == d[0].slice(-1) && (r /= 100),
										  (n = a(d[1])),
										  '%' == d[1].slice(-1) && (n /= 100),
										  (i = a(d[2])),
										  '%' == d[2].slice(-1) && (i /= 100),
										  ('deg' == d[0].slice(-3) || '°' == d[0].slice(-1)) && (r /= 360),
										  'hsla' == g[1].toLowerCase().slice(0, 4) && (p = a(d[3])),
										  d[3] && '%' == d[3].slice(-1) && (p /= 100),
										  e.hsl2rgb(r, n, i, p))
										: ((r = f(u.round(r), 255)),
										  (n = f(u.round(n), 255)),
										  (i = f(u.round(i), 255)),
										  (p = f(h(p, 0), 1)),
										  ((g = { r: r, g: n, b: i, toString: D }).hex =
												'#' + (16777216 | i | (n << 8) | (r << 16)).toString(16).slice(1)),
										  (g.opacity = T(p, 'finite') ? p : 1),
										  g))
								: { r: -1, g: -1, b: -1, hex: 'none', error: 1, toString: D }
						}, e)),
						(e.hsb = O(function (t, r, n) {
							return e.hsb2rgb(t, r, n).hex
						})),
						(e.hsl = O(function (t, r, n) {
							return e.hsl2rgb(t, r, n).hex
						})),
						(e.rgb = O(function (t, e, r, n) {
							if (T(n, 'finite')) {
								var i = u.round
								return 'rgba(' + [i(t), i(e), i(r), +n.toFixed(2)] + ')'
							}
							return '#' + (16777216 | r | (e << 8) | (t << 16)).toString(16).slice(1)
						}))
					var B = function (t) {
							var e = r.doc.getElementsByTagName('head')[0] || r.doc.getElementsByTagName('svg')[0],
								n = 'rgb(255, 0, 0)'
							return (B = O(function (t) {
								if ('red' == t.toLowerCase()) return n
								;(e.style.color = n), (e.style.color = t)
								var i = r.doc.defaultView.getComputedStyle(e, '').getPropertyValue('color')
								return i == n ? null : i
							}))(t)
						},
						F = function () {
							return 'hsb(' + [this.h, this.s, this.b] + ')'
						},
						N = function () {
							return 'hsl(' + [this.h, this.s, this.l] + ')'
						},
						D = function () {
							return 1 == this.opacity || null == this.opacity
								? this.hex
								: 'rgba(' + [this.r, this.g, this.b, this.opacity] + ')'
						},
						Y = function (t, r, n) {
							if (
								(null == r && T(t, 'object') && 'r' in t && 'g' in t && 'b' in t && ((n = t.b), (r = t.g), (t = t.r)),
								null == r && T(t, string))
							) {
								var i = e.getRGB(t)
								;(t = i.r), (r = i.g), (n = i.b)
							}
							return (t > 1 || r > 1 || n > 1) && ((t /= 255), (r /= 255), (n /= 255)), [t, r, n]
						},
						X = function (t, r, n, i) {
							var s = {
								r: (t = u.round(255 * t)),
								g: (r = u.round(255 * r)),
								b: (n = u.round(255 * n)),
								opacity: T(i, 'finite') ? i : 1,
								hex: e.rgb(t, r, n),
								toString: D,
							}
							return T(i, 'finite') && (s.opacity = i), s
						}
					;(e.color = function (t) {
						var r
						return (
							T(t, 'object') && 'h' in t && 's' in t && 'b' in t
								? ((r = e.hsb2rgb(t)), (t.r = r.r), (t.g = r.g), (t.b = r.b), (t.opacity = 1), (t.hex = r.hex))
								: T(t, 'object') && 'h' in t && 's' in t && 'l' in t
								? ((r = e.hsl2rgb(t)), (t.r = r.r), (t.g = r.g), (t.b = r.b), (t.opacity = 1), (t.hex = r.hex))
								: (T(t, 'string') && (t = e.getRGB(t)),
								  T(t, 'object') && 'r' in t && 'g' in t && 'b' in t && !('error' in t)
										? ((r = e.rgb2hsl(t)), (t.h = r.h), (t.s = r.s), (t.l = r.l), (r = e.rgb2hsb(t)), (t.v = r.b))
										: (((t = { hex: 'none' }).r = t.g = t.b = t.h = t.s = t.v = t.l = -1), (t.error = 1))),
							(t.toString = D),
							t
						)
					}),
						(e.hsb2rgb = function (t, e, r, n) {
							var i, s, o, a, l
							return (
								T(t, 'object') && 'h' in t && 's' in t && 'b' in t && ((r = t.b), (e = t.s), (n = t.o), (t = t.h)),
								(a = (l = r * e) * (1 - p(((t = ((t *= 360) % 360) / 60) % 2) - 1))),
								(i = s = o = r - l),
								X((i += [l, a, 0, 0, a, l][(t = ~~t)]), (s += [a, l, l, a, 0, 0][t]), (o += [0, 0, a, l, l, a][t]), n)
							)
						}),
						(e.hsl2rgb = function (t, e, r, n) {
							var i, s, o, a, l
							return (
								T(t, 'object') && 'h' in t && 's' in t && 'l' in t && ((r = t.l), (e = t.s), (t = t.h)),
								(t > 1 || e > 1 || r > 1) && ((t /= 360), (e /= 100), (r /= 100)),
								(a = (l = 2 * e * (r < 0.5 ? r : 1 - r)) * (1 - p(((t = ((t *= 360) % 360) / 60) % 2) - 1))),
								(i = s = o = r - l / 2),
								X((i += [l, a, 0, 0, a, l][(t = ~~t)]), (s += [a, l, l, a, 0, 0][t]), (o += [0, 0, a, l, l, a][t]), n)
							)
						}),
						(e.rgb2hsb = function (t, e, r) {
							var n, i
							return (
								(t = (r = Y(t, e, r))[0]),
								(e = r[1]),
								(r = r[2]),
								{
									h:
										((((0 == (i = (n = h(t, e, r)) - f(t, e, r))
											? null
											: n == t
											? (e - r) / i
											: n == e
											? (r - t) / i + 2
											: (t - e) / i + 4) +
											360) %
											6) *
											60) /
										360,
									s: 0 == i ? 0 : i / n,
									b: n,
									toString: F,
								}
							)
						}),
						(e.rgb2hsl = function (t, e, r) {
							var n, i, s, o
							return (
								(t = (r = Y(t, e, r))[0]),
								(e = r[1]),
								(r = r[2]),
								(n = ((i = h(t, e, r)) + (s = f(t, e, r))) / 2),
								{
									h:
										((((0 == (o = i - s) ? null : i == t ? (e - r) / o : i == e ? (r - t) / o + 2 : (t - e) / o + 4) +
											360) %
											6) *
											60) /
										360,
									s: 0 == o ? 0 : n < 0.5 ? o / (2 * n) : o / (2 - 2 * n),
									l: n,
									toString: N,
								}
							)
						}),
						(e.parsePathString = function (t) {
							if (!t) return null
							var r = e.path(t)
							if (r.arr) return e.path.clone(r.arr)
							var n = { a: 7, c: 6, o: 2, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, u: 3, z: 0 },
								i = []
							return (
								T(t, 'array') && T(t[0], 'array') && (i = e.path.clone(t)),
								i.length ||
									o(t).replace(_, function (t, e, r) {
										var s = [],
											o = e.toLowerCase()
										if (
											(r.replace(P, function (t, e) {
												e && s.push(+e)
											}),
											'm' == o &&
												s.length > 2 &&
												(i.push([e].concat(s.splice(0, 2))), (o = 'l'), (e = 'm' == e ? 'l' : 'L')),
											'o' == o && 1 == s.length && i.push([e, s[0]]),
											'r' == o)
										)
											i.push([e].concat(s))
										else for (; s.length >= n[o] && (i.push([e].concat(s.splice(0, n[o]))), n[o]); );
									}),
								(i.toString = e.path.toString),
								(r.arr = e.path.clone(i)),
								i
							)
						})
					var R = (e.parseTransformString = function (t) {
						if (!t) return null
						var r = []
						return (
							T(t, 'array') && T(t[0], 'array') && (r = e.path.clone(t)),
							r.length ||
								o(t).replace(x, function (t, e, n) {
									var i = []
									e.toLowerCase()
									n.replace(P, function (t, e) {
										e && i.push(+e)
									}),
										r.push([e].concat(i))
								}),
							(r.toString = e.path.toString),
							r
						)
					})
					;(e._.svgTransform2string = function (t) {
						var e = []
						return (
							(t = t.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function (t, r, n) {
								return (
									(n = n.split(/\s*,\s*|\s+/)),
									'rotate' == r && 1 == n.length && n.push(0, 0),
									'scale' == r &&
										(n.length > 2 ? (n = n.slice(0, 2)) : 2 == n.length && n.push(0, 0),
										1 == n.length && n.push(n[0], 0, 0)),
									'skewX' == r
										? e.push(['m', 1, 0, u.tan(L(n[0])), 1, 0, 0])
										: 'skewY' == r
										? e.push(['m', 1, u.tan(L(n[0])), 0, 1, 0, 0])
										: e.push([r.charAt(0)].concat(n)),
									t
								)
							})),
							e
						)
					}),
						(e._.rgTransform = /^[a-z][\s]*-?\.?\d/i),
						(e._.transform2matrix = function (t, r) {
							var n = R(t),
								i = new e.Matrix()
							if (n)
								for (var s = 0, a = n.length; s < a; s++) {
									var l,
										u,
										h,
										f,
										p,
										c = n[s],
										d = c.length,
										m = o(c[0]).toLowerCase(),
										y = c[0] != m,
										v = y ? i.invert() : 0
									't' == m && 2 == d
										? i.translate(c[1], 0)
										: 't' == m && 3 == d
										? y
											? ((l = v.x(0, 0)),
											  (u = v.y(0, 0)),
											  (h = v.x(c[1], c[2])),
											  (f = v.y(c[1], c[2])),
											  i.translate(h - l, f - u))
											: i.translate(c[1], c[2])
										: 'r' == m
										? 2 == d
											? ((p = p || r), i.rotate(c[1], p.x + p.width / 2, p.y + p.height / 2))
											: 4 == d &&
											  (y
													? ((h = v.x(c[2], c[3])), (f = v.y(c[2], c[3])), i.rotate(c[1], h, f))
													: i.rotate(c[1], c[2], c[3]))
										: 's' == m
										? 2 == d || 3 == d
											? ((p = p || r), i.scale(c[1], c[d - 1], p.x + p.width / 2, p.y + p.height / 2))
											: 4 == d
											? y
												? ((h = v.x(c[2], c[3])), (f = v.y(c[2], c[3])), i.scale(c[1], c[1], h, f))
												: i.scale(c[1], c[1], c[2], c[3])
											: 5 == d &&
											  (y
													? ((h = v.x(c[3], c[4])), (f = v.y(c[3], c[4])), i.scale(c[1], c[2], h, f))
													: i.scale(c[1], c[2], c[3], c[4]))
										: 'm' == m && 7 == d && i.add(c[1], c[2], c[3], c[4], c[5], c[6])
								}
							return i
						}),
						(e._unit2px = function (t, e, r) {
							var n = M(t).node,
								i = {},
								s = n.querySelector('.svg---mgr')
							s ||
								((s = S('rect')),
								S(s, { x: -9e9, y: -9e9, width: 10, height: 10, class: 'svg---mgr', fill: 'none' }),
								n.appendChild(s))
							function o(t) {
								if (null == t) return ''
								if (t == +t) return t
								S(s, { width: t })
								try {
									return s.getBBox().width
								} catch (t) {
									return 0
								}
							}
							function a(t) {
								if (null == t) return ''
								if (t == +t) return t
								S(s, { height: t })
								try {
									return s.getBBox().height
								} catch (t) {
									return 0
								}
							}
							function l(n, s) {
								null == e ? (i[n] = s(t.attr(n) || 0)) : n == e && (i = s(null == r ? t.attr(n) || 0 : r))
							}
							switch (t.type) {
								case 'rect':
									l('rx', o), l('ry', a)
								case 'image':
									l('width', o), l('height', a)
								case 'text':
									l('x', o), l('y', a)
									break
								case 'circle':
									l('cx', o), l('cy', a), l('r', o)
									break
								case 'ellipse':
									l('cx', o), l('cy', a), l('rx', o), l('ry', a)
									break
								case 'line':
									l('x1', o), l('x2', o), l('y1', a), l('y2', a)
									break
								case 'marker':
									l('refX', o), l('markerWidth', o), l('refY', a), l('markerHeight', a)
									break
								case 'radialGradient':
									l('fx', o), l('fy', a)
									break
								case 'tspan':
									l('dx', o), l('dy', a)
									break
								default:
									l(e, o)
							}
							return n.removeChild(s), i
						})
					r.doc.contains || r.doc.compareDocumentPosition
					function M(t) {
						return (t.node.ownerSVGElement && Z(t.node.ownerSVGElement)) || e.select('svg')
					}
					function z(t) {
						T(t, 'array') || (t = Array.prototype.slice.call(arguments, 0))
						for (var e = 0, r = 0, n = this.node; this[e]; ) delete this[e++]
						for (e = 0; e < t.length; e++)
							'set' == t[e].type
								? t[e].forEach(function (t) {
										n.appendChild(t.node)
								  })
								: n.appendChild(t[e].node)
						var i = n.childNodes
						for (e = 0; e < i.length; e++) this[r++] = Z(i[e])
						return this
					}
					function U(t) {
						if (t.snap in A) return A[t.snap]
						var e
						try {
							e = t.ownerSVGElement
						} catch (t) {}
						;(this.node = t), e && (this.paper = new j(e)), (this.type = t.tagName || t.nodeName)
						var r = (this.id = w(this))
						if (
							((this.anims = {}),
							(this._ = { transform: [] }),
							(t.snap = r),
							(A[r] = this),
							'g' == this.type && (this.add = z),
							this.type in { g: 1, mask: 1, pattern: 1, symbol: 1 })
						)
							for (var n in j.prototype) j.prototype[s](n) && (this[n] = j.prototype[n])
					}
					function q(t) {
						this.node = t
					}
					function W(t, e) {
						var r = S(t)
						return e.appendChild(r), Z(r)
					}
					function j(t, e) {
						var n,
							i,
							o,
							a = j.prototype
						if (t && t.tagName && 'svg' == t.tagName.toLowerCase()) {
							if (t.snap in A) return A[t.snap]
							var l = t.ownerDocument
							for (var u in ((n = new U(t)),
							(i = t.getElementsByTagName('desc')[0]),
							(o = t.getElementsByTagName('defs')[0]),
							i || ((i = S('desc')).appendChild(l.createTextNode('Created with Snap')), n.node.appendChild(i)),
							o || ((o = S('defs')), n.node.appendChild(o)),
							(n.defs = o),
							a))
								a[s](u) && (n[u] = a[u])
							n.paper = n.root = n
						} else S((n = W('svg', r.doc.body)).node, { height: e, version: 1.1, width: t, xmlns: I })
						return n
					}
					function Z(t) {
						return t
							? t instanceof U || t instanceof q
								? t
								: t.tagName && 'svg' == t.tagName.toLowerCase()
								? new j(t)
								: t.tagName && 'object' == t.tagName.toLowerCase() && 'image/svg+xml' == t.type
								? new j(t.contentDocument.getElementsByTagName('svg')[0])
								: new U(t)
							: t
					}
					;(e._.getSomeDefs = function (t) {
						var r =
								(t.node.ownerSVGElement && Z(t.node.ownerSVGElement)) ||
								(t.node.parentNode && Z(t.node.parentNode)) ||
								e.select('svg') ||
								e(0, 0),
							n = r.select('defs'),
							i = null != n && n.node
						return i || (i = W('defs', r.node).node), i
					}),
						(e._.getSomeSVG = M),
						(e.select = function (t) {
							return (t = o(t).replace(/([^\\]):/g, '$1\\:')), Z(r.doc.querySelector(t))
						}),
						(e.selectAll = function (t) {
							for (var n = r.doc.querySelectorAll(t), i = (e.set || Array)(), s = 0; s < n.length; s++) i.push(Z(n[s]))
							return i
						}),
						setInterval(function () {
							for (var t in A)
								if (A[s](t)) {
									var e = A[t],
										r = e.node
									;(('svg' != e.type && !r.ownerSVGElement) ||
										('svg' == e.type &&
											(!r.parentNode || ('ownerSVGElement' in r.parentNode && !r.ownerSVGElement)))) &&
										delete A[t]
								}
						}, 1e4),
						(U.prototype.attr = function (t, e) {
							var r = this,
								n = r.node
							if (!t) {
								if (1 != n.nodeType) return { text: n.nodeValue }
								for (var i = n.attributes, o = {}, a = 0, l = i.length; a < l; a++) o[i[a].nodeName] = i[a].nodeValue
								return o
							}
							if (T(t, 'string')) {
								if (!(arguments.length > 1)) return eve('snap.util.getattr.' + t, r).firstDefined()
								var u = {}
								;(u[t] = e), (t = u)
							}
							for (var h in t) t[s](h) && eve('snap.util.attr.' + h, r, t[h])
							return r
						}),
						(e.parse = function (t) {
							var e = r.doc.createDocumentFragment(),
								n = !0,
								i = r.doc.createElement('div')
							if (
								((t = o(t)).match(/^\s*<\s*svg(?:\s|>)/) || ((t = '<svg>' + t + '</svg>'), (n = !1)),
								(i.innerHTML = t),
								(t = i.getElementsByTagName('svg')[0]))
							)
								if (n) e = t
								else for (; t.firstChild; ) e.appendChild(t.firstChild)
							return new q(e)
						}),
						(e.fragment = function () {
							for (
								var t = Array.prototype.slice.call(arguments, 0),
									n = r.doc.createDocumentFragment(),
									i = 0,
									s = t.length;
								i < s;
								i++
							) {
								var o = t[i]
								o.node && o.node.nodeType && n.appendChild(o.node),
									o.nodeType && n.appendChild(o),
									'string' == typeof o && n.appendChild(e.parse(o).node)
							}
							return new q(n)
						}),
						(e._.make = W),
						(e._.wrap = Z),
						(j.prototype.el = function (t, e) {
							var r = W(t, this.node)
							return e && r.attr(e), r
						}),
						(U.prototype.children = function () {
							for (var t = [], r = this.node.childNodes, n = 0, i = r.length; n < i; n++) t[n] = e(r[n])
							return t
						}),
						(U.prototype.toJSON = function () {
							var t = []
							return (
								(function t(e, r) {
									for (var n = 0, i = e.length; n < i; n++) {
										var s = { type: e[n].type, attr: e[n].attr() },
											o = e[n].children()
										r.push(s), o.length && t(o, (s.childNodes = []))
									}
								})([this], t),
								t[0]
							)
						}),
						eve.on('snap.util.getattr', function () {
							var t = eve.nt(),
								e = (t = t.substring(t.lastIndexOf('.') + 1)).replace(/[A-Z]/g, function (t) {
									return '-' + t.toLowerCase()
								})
							return H[s](e)
								? this.node.ownerDocument.defaultView.getComputedStyle(this.node, null).getPropertyValue(e)
								: S(this.node, t)
						})
					var H = {
						'alignment-baseline': 0,
						'baseline-shift': 0,
						clip: 0,
						'clip-path': 0,
						'clip-rule': 0,
						color: 0,
						'color-interpolation': 0,
						'color-interpolation-filters': 0,
						'color-profile': 0,
						'color-rendering': 0,
						cursor: 0,
						direction: 0,
						display: 0,
						'dominant-baseline': 0,
						'enable-background': 0,
						fill: 0,
						'fill-opacity': 0,
						'fill-rule': 0,
						filter: 0,
						'flood-color': 0,
						'flood-opacity': 0,
						font: 0,
						'font-family': 0,
						'font-size': 0,
						'font-size-adjust': 0,
						'font-stretch': 0,
						'font-style': 0,
						'font-variant': 0,
						'font-weight': 0,
						'glyph-orientation-horizontal': 0,
						'glyph-orientation-vertical': 0,
						'image-rendering': 0,
						kerning: 0,
						'letter-spacing': 0,
						'lighting-color': 0,
						marker: 0,
						'marker-end': 0,
						'marker-mid': 0,
						'marker-start': 0,
						mask: 0,
						opacity: 0,
						overflow: 0,
						'pointer-events': 0,
						'shape-rendering': 0,
						'stop-color': 0,
						'stop-opacity': 0,
						stroke: 0,
						'stroke-dasharray': 0,
						'stroke-dashoffset': 0,
						'stroke-linecap': 0,
						'stroke-linejoin': 0,
						'stroke-miterlimit': 0,
						'stroke-opacity': 0,
						'stroke-width': 0,
						'text-anchor': 0,
						'text-decoration': 0,
						'text-rendering': 0,
						'unicode-bidi': 0,
						visibility: 0,
						'word-spacing': 0,
						'writing-mode': 0,
					}
					eve.on('snap.util.attr', function (t) {
						var e = eve.nt(),
							r = {}
						r[(e = e.substring(e.lastIndexOf('.') + 1))] = t
						var n = e.replace(/-(\w)/gi, function (t, e) {
								return e.toUpperCase()
							}),
							i = e.replace(/[A-Z]/g, function (t) {
								return '-' + t.toLowerCase()
							})
						H[s](i) ? (this.node.style[n] = null == t ? '' : t) : S(this.node, r)
					}),
						j.prototype,
						(e.ajax = function (t, e, r, n) {
							var i = new XMLHttpRequest(),
								s = w()
							if (i) {
								if (T(e, 'function')) (n = r), (r = e), (e = null)
								else if (T(e, 'object')) {
									var o = []
									for (var a in e) e.hasOwnProperty(a) && o.push(encodeURIComponent(a) + '=' + encodeURIComponent(e[a]))
									e = o.join('&')
								}
								return (
									i.open(e ? 'POST' : 'GET', t, !0),
									e &&
										(i.setRequestHeader('X-Requested-With', 'XMLHttpRequest'),
										i.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')),
									r &&
										(eve.once('snap.ajax.' + s + '.0', r),
										eve.once('snap.ajax.' + s + '.200', r),
										eve.once('snap.ajax.' + s + '.304', r)),
									(i.onreadystatechange = function () {
										4 == i.readyState && eve('snap.ajax.' + s + '.' + i.status, n, i)
									}),
									4 == i.readyState ? i : (i.send(e), i)
								)
							}
						}),
						(e.load = function (t, r, n) {
							e.ajax(t, function (t) {
								var i = e.parse(t.responseText)
								n ? r.call(n, i) : r(i)
							})
						})
					return (
						(e.getElementByPoint = function (t, e) {
							this.canvas
							var n,
								i,
								s,
								o,
								a,
								l,
								u,
								h = r.doc.elementFromPoint(t, e)
							if (r.win.opera && 'svg' == h.tagName) {
								var f =
										((i = (n = h).getBoundingClientRect()),
										(s = n.ownerDocument),
										(o = s.body),
										(a = s.documentElement),
										(l = a.clientTop || o.clientTop || 0),
										(u = a.clientLeft || o.clientLeft || 0),
										{
											y: i.top + (g.win.pageYOffset || a.scrollTop || o.scrollTop) - l,
											x: i.left + (g.win.pageXOffset || a.scrollLeft || o.scrollLeft) - u,
										}),
									p = h.createSVGRect()
								;(p.x = t - f.x), (p.y = e - f.y), (p.width = p.height = 1)
								var c = h.getIntersectionList(p, null)
								c.length && (h = c[c.length - 1])
							}
							return h ? Z(h) : null
						}),
						(e.plugin = function (t) {
							t(e, U, j, r, q)
						}),
						(r.win.Snap = e),
						e
					)
				})(window || this)
			i.plugin(function (t, e, r, n, i) {
				var s = e.prototype,
					o = t.is,
					a = String,
					l = t._unit2px,
					u = t._.$,
					h = t._.make,
					f = t._.getSomeDefs,
					p = 'hasOwnProperty',
					c = t._.wrap
				s.getBBox = function (e) {
					if ('tspan' == this.type) return t._.box(this.node.getClientRects().item(0))
					if (!t.Matrix || !t.path) return this.node.getBBox()
					var r = this,
						n = new t.Matrix()
					if (r.removed) return t._.box()
					for (; 'use' == r.type; )
						if ((e || (n = n.add(r.transform().localMatrix.translate(r.attr('x') || 0, r.attr('y') || 0))), r.original))
							r = r.original
						else {
							var i = r.attr('xlink:href')
							r = r.original = r.node.ownerDocument.getElementById(i.substring(i.indexOf('#') + 1))
						}
					var s = r._,
						o = t.path.get[r.type] || t.path.get.deflt
					try {
						return e
							? ((s.bboxwt = o ? t.path.getBBox((r.realPath = o(r))) : t._.box(r.node.getBBox())), t._.box(s.bboxwt))
							: ((r.realPath = o(r)),
							  (r.matrix = r.transform().localMatrix),
							  (s.bbox = t.path.getBBox(t.path.map(r.realPath, n.add(r.matrix)))),
							  t._.box(s.bbox))
					} catch (e) {
						return t._.box()
					}
				}
				var d = function () {
					return this.string
				}
				function m(e, r) {
					if (null == r) {
						var n = !0
						if (
							!(r =
								'linearGradient' == e.type || 'radialGradient' == e.type
									? e.node.getAttribute('gradientTransform')
									: 'pattern' == e.type
									? e.node.getAttribute('patternTransform')
									: e.node.getAttribute('transform'))
						)
							return new t.Matrix()
						r = t._.svgTransform2string(r)
					} else (r = t._.rgTransform.test(r) ? a(r).replace(/\.{3}|\u2026/g, e._.transform || '') : t._.svgTransform2string(r)), o(r, 'array') && (r = t.path ? t.path.toString.call(r) : a(r)), (e._.transform = r)
					var i = t._.transform2matrix(r, e.getBBox(1))
					if (n) return i
					e.matrix = i
				}
				;(s.transform = function (e) {
					var r = this._
					if (null == e) {
						for (
							var n,
								i = this,
								s = new t.Matrix(this.node.getCTM()),
								o = m(this),
								l = [o],
								h = new t.Matrix(),
								f = o.toTransformString(),
								p = a(o) == a(this.matrix) ? a(r.transform) : f;
							'svg' != i.type && (i = i.parent());

						)
							l.push(m(i))
						for (n = l.length; n--; ) h.add(l[n])
						return {
							string: p,
							globalMatrix: s,
							totalMatrix: h,
							localMatrix: o,
							diffMatrix: s.clone().add(o.invert()),
							global: s.toTransformString(),
							total: h.toTransformString(),
							local: f,
							toString: d,
						}
					}
					return (
						e instanceof t.Matrix ? ((this.matrix = e), (this._.transform = e.toTransformString())) : m(this, e),
						this.node &&
							('linearGradient' == this.type || 'radialGradient' == this.type
								? u(this.node, { gradientTransform: this.matrix })
								: 'pattern' == this.type
								? u(this.node, { patternTransform: this.matrix })
								: u(this.node, { transform: this.matrix })),
						this
					)
				}),
					(s.parent = function () {
						return c(this.node.parentNode)
					}),
					(s.append = s.add = function (t) {
						if (t) {
							if ('set' == t.type) {
								var e = this
								return (
									t.forEach(function (t) {
										e.add(t)
									}),
									this
								)
							}
							;(t = c(t)), this.node.appendChild(t.node), (t.paper = this.paper)
						}
						return this
					}),
					(s.appendTo = function (t) {
						return t && (t = c(t)).append(this), this
					}),
					(s.prepend = function (t) {
						if (t) {
							if ('set' == t.type) {
								var e,
									r = this
								return (
									t.forEach(function (t) {
										e ? e.after(t) : r.prepend(t), (e = t)
									}),
									this
								)
							}
							var n = (t = c(t)).parent()
							this.node.insertBefore(t.node, this.node.firstChild),
								this.add && this.add(),
								(t.paper = this.paper),
								this.parent() && this.parent().add(),
								n && n.add()
						}
						return this
					}),
					(s.prependTo = function (t) {
						return (t = c(t)).prepend(this), this
					}),
					(s.before = function (t) {
						if ('set' == t.type) {
							var e = this
							return (
								t.forEach(function (t) {
									var r = t.parent()
									e.node.parentNode.insertBefore(t.node, e.node), r && r.add()
								}),
								this.parent().add(),
								this
							)
						}
						var r = (t = c(t)).parent()
						return (
							this.node.parentNode.insertBefore(t.node, this.node),
							this.parent() && this.parent().add(),
							r && r.add(),
							(t.paper = this.paper),
							this
						)
					}),
					(s.after = function (t) {
						var e = (t = c(t)).parent()
						return (
							this.node.nextSibling
								? this.node.parentNode.insertBefore(t.node, this.node.nextSibling)
								: this.node.parentNode.appendChild(t.node),
							this.parent() && this.parent().add(),
							e && e.add(),
							(t.paper = this.paper),
							this
						)
					}),
					(s.insertBefore = function (t) {
						t = c(t)
						var e = this.parent()
						return (
							t.node.parentNode.insertBefore(this.node, t.node),
							(this.paper = t.paper),
							e && e.add(),
							t.parent() && t.parent().add(),
							this
						)
					}),
					(s.insertAfter = function (t) {
						t = c(t)
						var e = this.parent()
						return (
							t.node.parentNode.insertBefore(this.node, t.node.nextSibling),
							(this.paper = t.paper),
							e && e.add(),
							t.parent() && t.parent().add(),
							this
						)
					}),
					(s.remove = function () {
						var t = this.parent()
						return (
							this.node.parentNode && this.node.parentNode.removeChild(this.node),
							delete this.paper,
							(this.removed = !0),
							t && t.add(),
							this
						)
					}),
					(s.select = function (t) {
						return c(this.node.querySelector(t))
					}),
					(s.selectAll = function (e) {
						for (var r = this.node.querySelectorAll(e), n = (t.set || Array)(), i = 0; i < r.length; i++)
							n.push(c(r[i]))
						return n
					}),
					(s.asPX = function (t, e) {
						return null == e && (e = this.attr(t)), +l(this, t, e)
					}),
					(s.use = function () {
						var t,
							e = this.node.id
						return (
							e || ((e = this.id), u(this.node, { id: e })),
							(t =
								'linearGradient' == this.type || 'radialGradient' == this.type || 'pattern' == this.type
									? h(this.type, this.node.parentNode)
									: h('use', this.node.parentNode)),
							u(t.node, { 'xlink:href': '#' + e }),
							(t.original = this),
							t
						)
					}),
					(s.clone = function () {
						var e = c(this.node.cloneNode(!0))
						return (
							u(e.node, 'id') && u(e.node, { id: e.id }),
							(function (e) {
								var r,
									n = e.selectAll('*'),
									i = /^\s*url\(("|'|)(.*)\1\)\s*$/,
									s = [],
									o = {}
								function a(e, r) {
									var n = u(e.node, r)
									;(n = (n = n && n.match(i)) && n[2]) &&
										'#' == n.charAt() &&
										(n = n.substring(1)) &&
										(o[n] = (o[n] || []).concat(function (n) {
											var i = {}
											;(i[r] = t.url(n)), u(e.node, i)
										}))
								}
								function l(t) {
									var e = u(t.node, 'xlink:href')
									e &&
										'#' == e.charAt() &&
										(e = e.substring(1)) &&
										(o[e] = (o[e] || []).concat(function (e) {
											t.attr('xlink:href', '#' + e)
										}))
								}
								for (var h = 0, f = n.length; h < f; h++) {
									a((r = n[h]), 'fill'), a(r, 'stroke'), a(r, 'filter'), a(r, 'mask'), a(r, 'clip-path'), l(r)
									var p = u(r.node, 'id')
									p && (u(r.node, { id: r.id }), s.push({ old: p, id: r.id }))
								}
								for (h = 0, f = s.length; h < f; h++) {
									var c = o[s[h].old]
									if (c) for (var d = 0, m = c.length; d < m; d++) c[d](s[h].id)
								}
							})(e),
							e.insertAfter(this),
							e
						)
					}),
					(s.toDefs = function () {
						return f(this).appendChild(this.node), this
					}),
					(s.pattern = s.toPattern = function (t, e, r, n) {
						var i = h('pattern', f(this))
						return (
							null == t && (t = this.getBBox()),
							o(t, 'object') && 'x' in t && ((e = t.y), (r = t.width), (n = t.height), (t = t.x)),
							u(i.node, {
								x: t,
								y: e,
								width: r,
								height: n,
								patternUnits: 'userSpaceOnUse',
								id: i.id,
								viewBox: [t, e, r, n].join(' '),
							}),
							i.node.appendChild(this.node),
							i
						)
					}),
					(s.marker = function (t, e, r, n, i, s) {
						var a = h('marker', f(this))
						return (
							null == t && (t = this.getBBox()),
							o(t, 'object') &&
								'x' in t &&
								((e = t.y), (r = t.width), (n = t.height), (i = t.refX || t.cx), (s = t.refY || t.cy), (t = t.x)),
							u(a.node, {
								viewBox: [t, e, r, n].join(' '),
								markerWidth: r,
								markerHeight: n,
								orient: 'auto',
								refX: i || 0,
								refY: s || 0,
								id: a.id,
							}),
							a.node.appendChild(this.node),
							a
						)
					})
				var y = {}
				function v(t) {
					return function () {
						var e = t ? '<' + this.type : '',
							r = this.node.attributes,
							n = this.node.childNodes
						if (t)
							for (var i = 0, s = r.length; i < s; i++)
								e += ' ' + r[i].name + '="' + r[i].value.replace(/"/g, '\\"') + '"'
						if (n.length) {
							for (t && (e += '>'), i = 0, s = n.length; i < s; i++)
								3 == n[i].nodeType ? (e += n[i].nodeValue) : 1 == n[i].nodeType && (e += c(n[i]).toString())
							t && (e += '</' + this.type + '>')
						} else t && (e += '/>')
						return e
					}
				}
				;(s.data = function (e, r) {
					var n = (y[this.id] = y[this.id] || {})
					if (0 == arguments.length) return eve('snap.data.get.' + this.id, this, n, null), n
					if (1 == arguments.length) {
						if (t.is(e, 'object')) {
							for (var i in e) e[p](i) && this.data(i, e[i])
							return this
						}
						return eve('snap.data.get.' + this.id, this, n[e], e), n[e]
					}
					return (n[e] = r), eve('snap.data.set.' + this.id, this, r, e), this
				}),
					(s.removeData = function (t) {
						return null == t ? (y[this.id] = {}) : y[this.id] && delete y[this.id][t], this
					}),
					(s.outerSVG = s.toString = v(1)),
					(s.innerSVG = v()),
					(s.toDataURL = function () {
						if (window && window.btoa) {
							var e = this.getBBox(),
								r = t.format(
									'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="{x} {y} {width} {height}">{contents}</svg>',
									{
										x: +e.x.toFixed(3),
										y: +e.y.toFixed(3),
										width: +e.width.toFixed(3),
										height: +e.height.toFixed(3),
										contents: this.outerSVG(),
									}
								)
							return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(r)))
						}
					}),
					(i.prototype.select = s.select),
					(i.prototype.selectAll = s.selectAll)
			}),
				i.plugin(function (t, e, r, n, i) {
					var s = Object.prototype.toString,
						o = String,
						a = Math
					function l(t, e, r, n, i, o) {
						if (null == e && '[object SVGMatrix]' == s.call(t))
							return (this.a = t.a), (this.b = t.b), (this.c = t.c), (this.d = t.d), (this.e = t.e), void (this.f = t.f)
						null != t
							? ((this.a = +t), (this.b = +e), (this.c = +r), (this.d = +n), (this.e = +i), (this.f = +o))
							: ((this.a = 1), (this.b = 0), (this.c = 0), (this.d = 1), (this.e = 0), (this.f = 0))
					}
					!(function (e) {
						function r(t) {
							return t[0] * t[0] + t[1] * t[1]
						}
						function n(t) {
							var e = a.sqrt(r(t))
							t[0] && (t[0] /= e), t[1] && (t[1] /= e)
						}
						;(e.add = function (t, e, r, n, i, s) {
							if (t && t instanceof l) return this.add(t.a, t.b, t.c, t.d, t.e, t.f)
							var o = t * this.a + e * this.c,
								a = t * this.b + e * this.d
							return (
								(this.e += i * this.a + s * this.c),
								(this.f += i * this.b + s * this.d),
								(this.c = r * this.a + n * this.c),
								(this.d = r * this.b + n * this.d),
								(this.a = o),
								(this.b = a),
								this
							)
						}),
							(l.prototype.multLeft = function (t, e, r, n, i, s) {
								if (t && t instanceof l) return this.multLeft(t.a, t.b, t.c, t.d, t.e, t.f)
								var o = t * this.a + r * this.b,
									a = t * this.c + r * this.d,
									u = t * this.e + r * this.f + i
								return (
									(this.b = e * this.a + n * this.b),
									(this.d = e * this.c + n * this.d),
									(this.f = e * this.e + n * this.f + s),
									(this.a = o),
									(this.c = a),
									(this.e = u),
									this
								)
							}),
							(e.invert = function () {
								var t = this,
									e = t.a * t.d - t.b * t.c
								return new l(
									t.d / e,
									-t.b / e,
									-t.c / e,
									t.a / e,
									(t.c * t.f - t.d * t.e) / e,
									(t.b * t.e - t.a * t.f) / e
								)
							}),
							(e.clone = function () {
								return new l(this.a, this.b, this.c, this.d, this.e, this.f)
							}),
							(e.translate = function (t, e) {
								return (this.e += t * this.a + e * this.c), (this.f += t * this.b + e * this.d), this
							}),
							(e.scale = function (t, e, r, n) {
								return (
									null == e && (e = t),
									(r || n) && this.translate(r, n),
									(this.a *= t),
									(this.b *= t),
									(this.c *= e),
									(this.d *= e),
									(r || n) && this.translate(-r, -n),
									this
								)
							}),
							(e.rotate = function (e, r, n) {
								;(e = t.rad(e)), (r = r || 0), (n = n || 0)
								var i = +a.cos(e).toFixed(9),
									s = +a.sin(e).toFixed(9)
								return this.add(i, s, -s, i, r, n), this.add(1, 0, 0, 1, -r, -n)
							}),
							(e.skewX = function (t) {
								return this.skew(t, 0)
							}),
							(e.skewY = function (t) {
								return this.skew(0, t)
							}),
							(e.skew = function (e, r) {
								;(e = e || 0), (r = r || 0), (e = t.rad(e)), (r = t.rad(r))
								var n = a.tan(e).toFixed(9),
									i = a.tan(r).toFixed(9)
								return this.add(1, i, n, 1, 0, 0)
							}),
							(e.x = function (t, e) {
								return t * this.a + e * this.c + this.e
							}),
							(e.y = function (t, e) {
								return t * this.b + e * this.d + this.f
							}),
							(e.get = function (t) {
								return +this[o.fromCharCode(97 + t)].toFixed(4)
							}),
							(e.toString = function () {
								return (
									'matrix(' +
									[this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() +
									')'
								)
							}),
							(e.offset = function () {
								return [this.e.toFixed(4), this.f.toFixed(4)]
							}),
							(e.determinant = function () {
								return this.a * this.d - this.b * this.c
							}),
							(e.split = function () {
								var e = {}
								;(e.dx = this.e), (e.dy = this.f)
								var i = [
									[this.a, this.b],
									[this.c, this.d],
								]
								;(e.scalex = a.sqrt(r(i[0]))),
									n(i[0]),
									(e.shear = i[0][0] * i[1][0] + i[0][1] * i[1][1]),
									(i[1] = [i[1][0] - i[0][0] * e.shear, i[1][1] - i[0][1] * e.shear]),
									(e.scaley = a.sqrt(r(i[1]))),
									n(i[1]),
									(e.shear /= e.scaley),
									this.determinant() < 0 && (e.scalex = -e.scalex)
								var s = i[0][1],
									o = i[1][1]
								return (
									o < 0
										? ((e.rotate = t.deg(a.acos(o))), s < 0 && (e.rotate = 360 - e.rotate))
										: (e.rotate = t.deg(a.asin(s))),
									(e.isSimple = !(+e.shear.toFixed(9) || (e.scalex.toFixed(9) != e.scaley.toFixed(9) && e.rotate))),
									(e.isSuperSimple = !+e.shear.toFixed(9) && e.scalex.toFixed(9) == e.scaley.toFixed(9) && !e.rotate),
									(e.noRotation = !+e.shear.toFixed(9) && !e.rotate),
									e
								)
							}),
							(e.toTransformString = function (t) {
								var e = t || this.split()
								return +e.shear.toFixed(9)
									? 'm' + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
									: ((e.scalex = +e.scalex.toFixed(4)),
									  (e.scaley = +e.scaley.toFixed(4)),
									  (e.rotate = +e.rotate.toFixed(4)),
									  (e.dx || e.dy ? 't' + [+e.dx.toFixed(4), +e.dy.toFixed(4)] : '') +
											(e.rotate ? 'r' + [+e.rotate.toFixed(4), 0, 0] : '') +
											(1 != e.scalex || 1 != e.scaley ? 's' + [e.scalex, e.scaley, 0, 0] : ''))
							})
					})(l.prototype),
						(t.Matrix = l),
						(t.matrix = function (t, e, r, n, i, s) {
							return new l(t, e, r, n, i, s)
						})
				}),
				i.plugin(function (t, e, r, n, i) {
					var s,
						o = t._.make,
						a = t._.wrap,
						l = t.is,
						u = t._.getSomeDefs,
						h = /^url\((['"]?)([^)]+)\1\)$/,
						f = t._.$,
						p = t.url,
						c = String,
						d = t._.separator
					function m(r) {
						return function (n) {
							if (
								(eve.stop(),
								n instanceof i &&
									1 == n.node.childNodes.length &&
									('radialGradient' == n.node.firstChild.tagName ||
										'linearGradient' == n.node.firstChild.tagName ||
										'pattern' == n.node.firstChild.tagName) &&
									((n = n.node.firstChild), u(this).appendChild(n), (n = a(n))),
								n instanceof e)
							)
								if ('radialGradient' == n.type || 'linearGradient' == n.type || 'pattern' == n.type) {
									n.node.id || f(n.node, { id: n.id })
									var s = p(n.node.id)
								} else s = n.attr(r)
							else if ((s = t.color(n)).error) {
								var o = t(u(this).ownerSVGElement).gradient(n)
								o ? (o.node.id || f(o.node, { id: o.id }), (s = p(o.node.id))) : (s = n)
							} else s = c(s)
							var l = {}
							;(l[r] = s), f(this.node, l), (this.node.style[r] = '')
						}
					}
					;(t.deurl = function (t) {
						var e = String(t).match(h)
						return e ? e[2] : t
					}),
						eve.on('snap.util.attr.mask', function (t) {
							if (t instanceof e || t instanceof i) {
								if (
									(eve.stop(),
									t instanceof i &&
										1 == t.node.childNodes.length &&
										((t = t.node.firstChild), u(this).appendChild(t), (t = a(t))),
									'mask' == t.type)
								)
									var r = t
								else (r = o('mask', u(this))).node.appendChild(t.node)
								!r.node.id && f(r.node, { id: r.id }), f(this.node, { mask: p(r.id) })
							}
						}),
						(s = function (t) {
							if (t instanceof e || t instanceof i) {
								eve.stop()
								for (var r, n = t.node; n; ) {
									if ('clipPath' === n.nodeName) {
										r = new e(n)
										break
									}
									if ('svg' === n.nodeName) {
										r = void 0
										break
									}
									n = n.parentNode
								}
								r || ((r = o('clipPath', u(this))).node.appendChild(t.node), !r.node.id && f(r.node, { id: r.id })),
									f(this.node, { 'clip-path': p(r.node.id || r.id) })
							}
						}),
						eve.on('snap.util.attr.clip', s),
						eve.on('snap.util.attr.clip-path', s),
						eve.on('snap.util.attr.clipPath', s),
						eve.on('snap.util.attr.fill', m('fill')),
						eve.on('snap.util.attr.stroke', m('stroke'))
					var y = /^([lr])(?:\(([^)]*)\))?(.*)$/i
					function v(t) {
						eve.stop(), t == +t && (t += 'px'), (this.node.style.fontSize = t)
					}
					function g() {
						return eve.stop(), this.node.style.fontSize
					}
					eve.on('snap.util.grad.parse', function (t) {
						var e = (t = c(t)).match(y)
						if (!e) return null
						var r = e[1],
							n = e[2],
							i = e[3]
						1 ==
							(n = n.split(/\s*,\s*/).map(function (t) {
								return +t == t ? +t : t
							})).length &&
							0 == n[0] &&
							(n = [])
						var s = (i = (i = i.split('-')).map(function (t) {
								var e = { color: (t = t.split(':'))[0] }
								return t[1] && (e.offset = parseFloat(t[1])), e
							})).length,
							o = 0,
							a = 0
						function l(t, e) {
							for (var r = (e - o) / (t - a), n = a; n < t; n++) i[n].offset = +(+o + r * (n - a)).toFixed(2)
							;(a = t), (o = e)
						}
						s--
						for (var u = 0; u < s; u++) 'offset' in i[u] && l(u, i[u].offset)
						return (i[s].offset = i[s].offset || 100), l(s, i[s].offset), { type: r, params: n, stops: i }
					}),
						eve.on('snap.util.attr.d', function (e) {
							eve.stop(),
								l(e, 'array') && l(e[0], 'array') && (e = t.path.toString.call(e)),
								(e = c(e)).match(/[ruo]/i) && (e = t.path.toAbsolute(e)),
								f(this.node, { d: e })
						})(-1),
						eve.on('snap.util.attr.#text', function (t) {
							eve.stop(), (t = c(t))
							for (var e = n.doc.createTextNode(t); this.node.firstChild; ) this.node.removeChild(this.node.firstChild)
							this.node.appendChild(e)
						})(-1),
						eve.on('snap.util.attr.path', function (t) {
							eve.stop(), this.attr({ d: t })
						})(-1),
						eve.on('snap.util.attr.class', function (t) {
							eve.stop(), (this.node.className.baseVal = t)
						})(-1),
						eve.on('snap.util.attr.viewBox', function (t) {
							var e
							;(e =
								l(t, 'object') && 'x' in t ? [t.x, t.y, t.width, t.height].join(' ') : l(t, 'array') ? t.join(' ') : t),
								f(this.node, { viewBox: e }),
								eve.stop()
						})(-1),
						eve.on('snap.util.attr.transform', function (t) {
							this.transform(t), eve.stop()
						})(-1),
						eve.on('snap.util.attr.r', function (t) {
							'rect' == this.type && (eve.stop(), f(this.node, { rx: t, ry: t }))
						})(-1),
						eve.on('snap.util.attr.textpath', function (t) {
							if ((eve.stop(), 'text' == this.type)) {
								var r, n, i
								if (!t && this.textPath) {
									for (n = this.textPath; n.node.firstChild; ) this.node.appendChild(n.node.firstChild)
									return n.remove(), void delete this.textPath
								}
								if (l(t, 'string')) {
									var s = u(this),
										o = a(s.parentNode).path(t)
									s.appendChild(o.node), (r = o.id), o.attr({ id: r })
								} else (t = a(t)) instanceof e && ((r = t.attr('id')) || ((r = t.id), t.attr({ id: r })))
								if (r)
									if (((n = this.textPath), (i = this.node), n)) n.attr({ 'xlink:href': '#' + r })
									else {
										for (n = f('textPath', { 'xlink:href': '#' + r }); i.firstChild; ) n.appendChild(i.firstChild)
										i.appendChild(n), (this.textPath = a(n))
									}
							}
						})(-1),
						eve.on('snap.util.attr.text', function (t) {
							if ('text' == this.type) {
								for (
									var e = this.node,
										r = function (t) {
											var e = f('tspan')
											if (l(t, 'array')) for (var i = 0; i < t.length; i++) e.appendChild(r(t[i]))
											else e.appendChild(n.doc.createTextNode(t))
											return e.normalize && e.normalize(), e
										};
									e.firstChild;

								)
									e.removeChild(e.firstChild)
								for (var i = r(t); i.firstChild; ) e.appendChild(i.firstChild)
							}
							eve.stop()
						})(-1),
						eve.on('snap.util.attr.fontSize', v)(-1),
						eve.on('snap.util.attr.font-size', v)(-1),
						eve.on('snap.util.getattr.transform', function () {
							return eve.stop(), this.transform()
						})(-1),
						eve.on('snap.util.getattr.textpath', function () {
							return eve.stop(), this.textPath
						})(-1),
						(function () {
							function e(e) {
								return function () {
									eve.stop()
									var r = n.doc.defaultView.getComputedStyle(this.node, null).getPropertyValue('marker-' + e)
									return 'none' == r ? r : t(n.doc.getElementById(r.match(h)[1]))
								}
							}
							function r(t) {
								return function (e) {
									eve.stop()
									var r = 'marker' + t.charAt(0).toUpperCase() + t.substring(1)
									if ('' != e && e) {
										if ('marker' == e.type) {
											var n = e.node.id
											return n || f(e.node, { id: e.id }), void (this.node.style[r] = p(n))
										}
									} else this.node.style[r] = 'none'
								}
							}
							eve.on('snap.util.getattr.marker-end', e('end'))(-1),
								eve.on('snap.util.getattr.markerEnd', e('end'))(-1),
								eve.on('snap.util.getattr.marker-start', e('start'))(-1),
								eve.on('snap.util.getattr.markerStart', e('start'))(-1),
								eve.on('snap.util.getattr.marker-mid', e('mid'))(-1),
								eve.on('snap.util.getattr.markerMid', e('mid'))(-1),
								eve.on('snap.util.attr.marker-end', r('end'))(-1),
								eve.on('snap.util.attr.markerEnd', r('end'))(-1),
								eve.on('snap.util.attr.marker-start', r('start'))(-1),
								eve.on('snap.util.attr.markerStart', r('start'))(-1),
								eve.on('snap.util.attr.marker-mid', r('mid'))(-1),
								eve.on('snap.util.attr.markerMid', r('mid'))(-1)
						})(),
						eve.on('snap.util.getattr.r', function () {
							if ('rect' == this.type && f(this.node, 'rx') == f(this.node, 'ry')) return eve.stop(), f(this.node, 'rx')
						})(-1),
						eve.on('snap.util.getattr.text', function () {
							if ('text' == this.type || 'tspan' == this.type) {
								eve.stop()
								var t = (function t(e) {
									for (var r = [], n = e.childNodes, i = 0, s = n.length; i < s; i++) {
										var o = n[i]
										3 == o.nodeType && r.push(o.nodeValue),
											'tspan' == o.tagName &&
												(1 == o.childNodes.length && 3 == o.firstChild.nodeType
													? r.push(o.firstChild.nodeValue)
													: r.push(t(o)))
									}
									return r
								})(this.node)
								return 1 == t.length ? t[0] : t
							}
						})(-1),
						eve.on('snap.util.getattr.#text', function () {
							return this.node.textContent
						})(-1),
						eve.on('snap.util.getattr.fill', function (e) {
							if (!e) {
								eve.stop()
								var r = eve('snap.util.getattr.fill', this, !0).firstDefined()
								return t(t.deurl(r)) || r
							}
						})(-1),
						eve.on('snap.util.getattr.stroke', function (e) {
							if (!e) {
								eve.stop()
								var r = eve('snap.util.getattr.stroke', this, !0).firstDefined()
								return t(t.deurl(r)) || r
							}
						})(-1),
						eve.on('snap.util.getattr.viewBox', function () {
							eve.stop()
							var e = f(this.node, 'viewBox')
							return e ? ((e = e.split(d)), t._.box(+e[0], +e[1], +e[2], +e[3])) : void 0
						})(-1),
						eve.on('snap.util.getattr.points', function () {
							var t = f(this.node, 'points')
							return eve.stop(), t ? t.split(d) : void 0
						})(-1),
						eve.on('snap.util.getattr.path', function () {
							var t = f(this.node, 'd')
							return eve.stop(), t
						})(-1),
						eve.on('snap.util.getattr.class', function () {
							return this.node.className.baseVal
						})(-1),
						eve.on('snap.util.getattr.fontSize', g)(-1),
						eve.on('snap.util.getattr.font-size', g)(-1)
				}),
				i.plugin(function (t, e, r, n, i) {
					var s = /\S+/g,
						o = String,
						a = e.prototype
					;(a.addClass = function (t) {
						var e,
							r,
							n,
							i = o(t || '').match(s) || [],
							a = this.node,
							l = a.className.baseVal,
							u = l.match(s) || []
						if (i.length) {
							for (e = 0; (r = i[e++]); ) ~u.indexOf(r) || u.push(r)
							l != (n = u.join(' ')) && (a.className.baseVal = n)
						}
						return this
					}),
						(a.removeClass = function (t) {
							var e,
								r,
								n,
								i,
								a = o(t || '').match(s) || [],
								l = this.node,
								u = l.className.baseVal,
								h = u.match(s) || []
							if (h.length) {
								for (e = 0; (n = a[e++]); ) ~(r = h.indexOf(n)) && h.splice(r, 1)
								u != (i = h.join(' ')) && (l.className.baseVal = i)
							}
							return this
						}),
						(a.hasClass = function (t) {
							return !!~(this.node.className.baseVal.match(s) || []).indexOf(t)
						}),
						(a.toggleClass = function (t, e) {
							if (null != e) return e ? this.addClass(t) : this.removeClass(t)
							var r,
								n,
								i,
								o,
								a = (t || '').match(s) || [],
								l = this.node,
								u = l.className.baseVal,
								h = u.match(s) || []
							for (r = 0; (i = a[r++]); ) ~(n = h.indexOf(i)) ? h.splice(n, 1) : h.push(i)
							return u != (o = h.join(' ')) && (l.className.baseVal = o), this
						})
				}),
				i.plugin(function (t, e, r, n, i) {
					var s = {
							'+': function (t, e) {
								return t + e
							},
							'-': function (t, e) {
								return t - e
							},
							'/': function (t, e) {
								return t / e
							},
							'*': function (t, e) {
								return t * e
							},
						},
						o = String,
						a = /[a-z]+$/i,
						l = /^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/
					function u(t) {
						return t
					}
					function h(t) {
						return function (e) {
							return +e.toFixed(3) + t
						}
					}
					eve.on('snap.util.attr', function (t) {
						var e = o(t).match(l)
						if (e) {
							var r = eve.nt(),
								n = r.substring(r.lastIndexOf('.') + 1),
								i = this.attr(n),
								u = {}
							eve.stop()
							var h = e[3] || '',
								f = i.match(a),
								p = s[e[1]]
							if (
								(f && f == h
									? (t = p(parseFloat(i), +e[2]))
									: ((i = this.asPX(n)), (t = p(this.asPX(n), this.asPX(n, e[2] + h)))),
								isNaN(i) || isNaN(t))
							)
								return
							;(u[n] = t), this.attr(u)
						}
					})(-10),
						eve.on('snap.util.equal', function (t, e) {
							var r = o(this.attr(t) || ''),
								n = o(e).match(l)
							if (n) {
								eve.stop()
								var i = n[3] || '',
									f = r.match(a),
									p = s[n[1]]
								return f && f == i
									? { from: parseFloat(r), to: p(parseFloat(r), +n[2]), f: h(f) }
									: { from: (r = this.asPX(t)), to: p(r, this.asPX(t, n[2] + i)), f: u }
							}
						})(-10)
				}),
				i.plugin(function (t, e, r, n, i) {
					var s = r.prototype,
						o = t.is
					;(s.rect = function (t, e, r, n, i, s) {
						var a
						return (
							null == s && (s = i),
							o(t, 'object') && '[object Object]' == t
								? (a = t)
								: null != t && ((a = { x: t, y: e, width: r, height: n }), null != i && ((a.rx = i), (a.ry = s))),
							this.el('rect', a)
						)
					}),
						(s.circle = function (t, e, r) {
							var n
							return (
								o(t, 'object') && '[object Object]' == t ? (n = t) : null != t && (n = { cx: t, cy: e, r: r }),
								this.el('circle', n)
							)
						})
					var a = (function () {
						function t() {
							this.parentNode.removeChild(this)
						}
						return function (e, r) {
							var i = n.doc.createElement('img'),
								s = n.doc.body
							;(i.style.cssText = 'position:absolute;left:-9999em;top:-9999em'),
								(i.onload = function () {
									r.call(i), (i.onload = i.onerror = null), s.removeChild(i)
								}),
								(i.onerror = t),
								s.appendChild(i),
								(i.src = e)
						}
					})()
					;(s.image = function (e, r, n, i, s) {
						var l = this.el('image')
						if (o(e, 'object') && 'src' in e) l.attr(e)
						else if (null != e) {
							var u = { 'xlink:href': e, preserveAspectRatio: 'none' }
							null != r && null != n && ((u.x = r), (u.y = n)),
								null != i && null != s
									? ((u.width = i), (u.height = s))
									: a(e, function () {
											t._.$(l.node, { width: this.offsetWidth, height: this.offsetHeight })
									  }),
								t._.$(l.node, u)
						}
						return l
					}),
						(s.ellipse = function (t, e, r, n) {
							var i
							return (
								o(t, 'object') && '[object Object]' == t ? (i = t) : null != t && (i = { cx: t, cy: e, rx: r, ry: n }),
								this.el('ellipse', i)
							)
						}),
						(s.path = function (t) {
							var e
							return o(t, 'object') && !o(t, 'array') ? (e = t) : t && (e = { d: t }), this.el('path', e)
						}),
						(s.group = s.g = function (t) {
							var e = this.el('g')
							return (
								1 == arguments.length && t && !t.type
									? e.attr(t)
									: arguments.length && e.add(Array.prototype.slice.call(arguments, 0)),
								e
							)
						}),
						(s.svg = function (t, e, r, n, i, s, a, l) {
							var u = {}
							return (
								o(t, 'object') && null == e
									? (u = t)
									: (null != t && (u.x = t),
									  null != e && (u.y = e),
									  null != r && (u.width = r),
									  null != n && (u.height = n),
									  null != i && null != s && null != a && null != l && (u.viewBox = [i, s, a, l])),
								this.el('svg', u)
							)
						}),
						(s.mask = function (t) {
							var e = this.el('mask')
							return (
								1 == arguments.length && t && !t.type
									? e.attr(t)
									: arguments.length && e.add(Array.prototype.slice.call(arguments, 0)),
								e
							)
						}),
						(s.ptrn = function (t, e, r, n, i, s, a, l) {
							if (o(t, 'object')) var u = t
							else
								(u = { patternUnits: 'userSpaceOnUse' }),
									t && (u.x = t),
									e && (u.y = e),
									null != r && (u.width = r),
									null != n && (u.height = n),
									(u.viewBox =
										null != i && null != s && null != a && null != l ? [i, s, a, l] : [t || 0, e || 0, r || 0, n || 0])
							return this.el('pattern', u)
						}),
						(s.use = function (r) {
							return null != r
								? (r instanceof e && (r.attr('id') || r.attr({ id: t._.id(r) }), (r = r.attr('id'))),
								  '#' == String(r).charAt() && (r = r.substring(1)),
								  this.el('use', { 'xlink:href': '#' + r }))
								: e.prototype.use.call(this)
						}),
						(s.symbol = function (t, e, r, n) {
							var i = {}
							return (
								null != t && null != e && null != r && null != n && (i.viewBox = [t, e, r, n]), this.el('symbol', i)
							)
						}),
						(s.text = function (t, e, r) {
							var n = {}
							return o(t, 'object') ? (n = t) : null != t && (n = { x: t, y: e, text: r || '' }), this.el('text', n)
						}),
						(s.line = function (t, e, r, n) {
							var i = {}
							return o(t, 'object') ? (i = t) : null != t && (i = { x1: t, x2: r, y1: e, y2: n }), this.el('line', i)
						}),
						(s.polyline = function (t) {
							arguments.length > 1 && (t = Array.prototype.slice.call(arguments, 0))
							var e = {}
							return (
								o(t, 'object') && !o(t, 'array') ? (e = t) : null != t && (e = { points: t }), this.el('polyline', e)
							)
						}),
						(s.polygon = function (t) {
							arguments.length > 1 && (t = Array.prototype.slice.call(arguments, 0))
							var e = {}
							return (
								o(t, 'object') && !o(t, 'array') ? (e = t) : null != t && (e = { points: t }), this.el('polygon', e)
							)
						}),
						(function () {
							var e = t._.$
							function r() {
								return this.selectAll('stop')
							}
							function n(r, n) {
								var i = e('stop'),
									s = { offset: +n + '%' }
								;(r = t.color(r)), (s['stop-color'] = r.hex), r.opacity < 1 && (s['stop-opacity'] = r.opacity), e(i, s)
								for (var o, a = this.stops(), l = 0; l < a.length; l++) {
									if (parseFloat(a[l].attr('offset')) > n) {
										this.node.insertBefore(i, a[l].node), (o = !0)
										break
									}
								}
								return o || this.node.appendChild(i), this
							}
							function i() {
								if ('linearGradient' == this.type) {
									var r = e(this.node, 'x1') || 0,
										n = e(this.node, 'x2') || 1,
										i = e(this.node, 'y1') || 0,
										s = e(this.node, 'y2') || 0
									return t._.box(r, i, math.abs(n - r), math.abs(s - i))
								}
								var o = this.node.cx || 0.5,
									a = this.node.cy || 0.5,
									l = this.node.r || 0
								return t._.box(o - l, a - l, 2 * l, 2 * l)
							}
							function o(e) {
								var r = e,
									n = this.stops()
								if (
									('string' == typeof e &&
										(r = eve('snap.util.grad.parse', null, 'l(0,0,0,1)' + e).firstDefined().stops),
									t.is(r, 'array'))
								) {
									for (var i = 0; i < n.length; i++)
										if (r[i]) {
											var s = t.color(r[i].color),
												o = { offset: r[i].offset + '%' }
											;(o['stop-color'] = s.hex), s.opacity < 1 && (o['stop-opacity'] = s.opacity), n[i].attr(o)
										} else n[i].remove()
									for (i = n.length; i < r.length; i++) this.addStop(r[i].color, r[i].offset)
									return this
								}
							}
							function a(s, a, l, u, h) {
								var f = t._.make('linearGradient', s)
								return (
									(f.stops = r),
									(f.addStop = n),
									(f.getBBox = i),
									(f.setStops = o),
									null != a && e(f.node, { x1: a, y1: l, x2: u, y2: h }),
									f
								)
							}
							function l(s, o, a, l, u, h) {
								var f = t._.make('radialGradient', s)
								return (
									(f.stops = r),
									(f.addStop = n),
									(f.getBBox = i),
									null != o && e(f.node, { cx: o, cy: a, r: l }),
									null != u && null != h && e(f.node, { fx: u, fy: h }),
									f
								)
							}
							;(s.gradient = function (t) {
								return (function (t, r) {
									var n,
										i = eve('snap.util.grad.parse', null, r).firstDefined()
									if (!i) return null
									i.params.unshift(t),
										(n = 'l' == i.type.toLowerCase() ? a.apply(0, i.params) : l.apply(0, i.params)),
										i.type != i.type.toLowerCase() && e(n.node, { gradientUnits: 'userSpaceOnUse' })
									for (var s = i.stops, o = s.length, u = 0; u < o; u++) {
										var h = s[u]
										n.addStop(h.color, h.offset)
									}
									return n
								})(this.defs, t)
							}),
								(s.gradientLinear = function (t, e, r, n) {
									return a(this.defs, t, e, r, n)
								}),
								(s.gradientRadial = function (t, e, r, n, i) {
									return l(this.defs, t, e, r, n, i)
								}),
								(s.toString = function () {
									var e,
										r = this.node.ownerDocument,
										n = r.createDocumentFragment(),
										i = r.createElement('div'),
										s = this.node.cloneNode(!0)
									return (
										n.appendChild(i),
										i.appendChild(s),
										t._.$(s, { xmlns: 'http://www.w3.org/2000/svg' }),
										(e = i.innerHTML),
										n.removeChild(n.firstChild),
										e
									)
								}),
								(s.toDataURL = function () {
									if (window && window.btoa)
										return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(this)))
								}),
								(s.clear = function () {
									for (var t, e = this.node.firstChild; e; )
										(t = e.nextSibling),
											'defs' != e.tagName ? e.parentNode.removeChild(e) : s.clear.call({ node: e }),
											(e = t)
								})
						})()
				}),
				i.plugin(function (t, e, r, n) {
					var i = e.prototype,
						s = t.is,
						o = t._.clone,
						a = /,?([a-z]),?/gi,
						l = parseFloat,
						u = Math,
						h = u.PI,
						f = u.min,
						p = u.max,
						c = u.pow,
						d = u.abs
					function m(t) {
						var e = (m.ps = m.ps || {})
						return (
							e[t] ? (e[t].sleep = 100) : (e[t] = { sleep: 100 }),
							setTimeout(function () {
								for (var r in e) e.hasOwnProperty(r) && r != t && (e[r].sleep--, !e[r].sleep && delete e[r])
							}),
							e[t]
						)
					}
					function y(t, e, r, n) {
						return (
							null == t && (t = e = r = n = 0),
							null == e && ((e = t.y), (r = t.width), (n = t.height), (t = t.x)),
							{
								x: t,
								y: e,
								width: r,
								w: r,
								height: n,
								h: n,
								x2: t + r,
								y2: e + n,
								cx: t + r / 2,
								cy: e + n / 2,
								r1: u.min(r, n) / 2,
								r2: u.max(r, n) / 2,
								r0: u.sqrt(r * r + n * n) / 2,
								path: F(t, e, r, n),
								vb: [t, e, r, n].join(' '),
							}
						)
					}
					function v() {
						return this.join(',').replace(a, '$1')
					}
					function g(t) {
						var e = o(t)
						return (e.toString = v), e
					}
					function _(t, e, r, n, i, s, o, a, l) {
						return null == l
							? T(t, e, r, n, i, s, o, a)
							: w(
									t,
									e,
									r,
									n,
									i,
									s,
									o,
									a,
									(function (t, e, r, n, i, s, o, a, l) {
										if (l < 0 || T(t, e, r, n, i, s, o, a) < l) return
										var u,
											h = 0.5,
											f = 1 - h
										u = T(t, e, r, n, i, s, o, a, f)
										for (; d(u - l) > 0.01; ) u = T(t, e, r, n, i, s, o, a, (f += (u < l ? 1 : -1) * (h /= 2)))
										return f
									})(t, e, r, n, i, s, o, a, l)
							  )
					}
					function x(r, n) {
						function i(t) {
							return +(+t).toFixed(3)
						}
						return t._.cacher(
							function (t, s, o) {
								t instanceof e && (t = t.attr('d'))
								for (var a, l, u, h, f, p = '', c = {}, d = 0, m = 0, y = (t = q(t)).length; m < y; m++) {
									if ('M' == (u = t[m])[0]) (a = +u[1]), (l = +u[2])
									else {
										if (d + (h = _(a, l, u[1], u[2], u[3], u[4], u[5], u[6])) > s) {
											if (n && !c.start) {
												if (
													((p += [
														'C' + i((f = _(a, l, u[1], u[2], u[3], u[4], u[5], u[6], s - d)).start.x),
														i(f.start.y),
														i(f.m.x),
														i(f.m.y),
														i(f.x),
														i(f.y),
													]),
													o)
												)
													return p
												;(c.start = p),
													(p = [
														'M' + i(f.x),
														i(f.y) + 'C' + i(f.n.x),
														i(f.n.y),
														i(f.end.x),
														i(f.end.y),
														i(u[5]),
														i(u[6]),
													].join()),
													(d += h),
													(a = +u[5]),
													(l = +u[6])
												continue
											}
											if (!r && !n) return (f = _(a, l, u[1], u[2], u[3], u[4], u[5], u[6], s - d))
										}
										;(d += h), (a = +u[5]), (l = +u[6])
									}
									p += u.shift() + u
								}
								return (c.end = p), (f = r ? d : n ? c : w(a, l, u[0], u[1], u[2], u[3], u[4], u[5], 1))
							},
							null,
							t._.clone
						)
					}
					var P = x(1),
						b = x(),
						C = x(0, 1)
					function w(t, e, r, n, i, s, o, a, l) {
						var f = 1 - l,
							p = c(f, 3),
							d = c(f, 2),
							m = l * l,
							y = m * l,
							v = t + 2 * l * (r - t) + m * (i - 2 * r + t),
							g = e + 2 * l * (n - e) + m * (s - 2 * n + e),
							_ = r + 2 * l * (i - r) + m * (o - 2 * i + r),
							x = n + 2 * l * (s - n) + m * (a - 2 * s + n)
						return {
							x: p * t + 3 * d * l * r + 3 * f * l * l * i + y * o,
							y: p * e + 3 * d * l * n + 3 * f * l * l * s + y * a,
							m: { x: v, y: g },
							n: { x: _, y: x },
							start: { x: f * t + l * r, y: f * e + l * n },
							end: { x: f * i + l * o, y: f * s + l * a },
							alpha: 90 - (180 * u.atan2(v - _, g - x)) / h,
						}
					}
					function E(e, r, n, i, s, o, a, l) {
						t.is(e, 'array') || (e = [e, r, n, i, s, o, a, l])
						var u = U.apply(null, e)
						return y(u.min.x, u.min.y, u.max.x - u.min.x, u.max.y - u.min.y)
					}
					function I(t, e, r) {
						return e >= t.x && e <= t.x + t.width && r >= t.y && r <= t.y + t.height
					}
					function A(t, e) {
						return (
							(t = y(t)),
							I((e = y(e)), t.x, t.y) ||
								I(e, t.x2, t.y) ||
								I(e, t.x, t.y2) ||
								I(e, t.x2, t.y2) ||
								I(t, e.x, e.y) ||
								I(t, e.x2, e.y) ||
								I(t, e.x, e.y2) ||
								I(t, e.x2, e.y2) ||
								(((t.x < e.x2 && t.x > e.x) || (e.x < t.x2 && e.x > t.x)) &&
									((t.y < e.y2 && t.y > e.y) || (e.y < t.y2 && e.y > t.y)))
						)
					}
					function S(t, e, r, n, i) {
						return t * (t * (-3 * e + 9 * r - 9 * n + 3 * i) + 6 * e - 12 * r + 6 * n) - 3 * e + 3 * r
					}
					function T(t, e, r, n, i, s, o, a, l) {
						null == l && (l = 1)
						for (
							var h = (l = l > 1 ? 1 : l < 0 ? 0 : l) / 2,
								f = [
									-0.1252,
									0.1252,
									-0.3678,
									0.3678,
									-0.5873,
									0.5873,
									-0.7699,
									0.7699,
									-0.9041,
									0.9041,
									-0.9816,
									0.9816,
								],
								p = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472],
								c = 0,
								d = 0;
							d < 12;
							d++
						) {
							var m = h * f[d] + h,
								y = S(m, t, r, i, o),
								v = S(m, e, n, s, a),
								g = y * y + v * v
							c += p[d] * u.sqrt(g)
						}
						return h * c
					}
					function k(t, e, r, n, i, s, o, a) {
						if (!(p(t, r) < f(i, o) || f(t, r) > p(i, o) || p(e, n) < f(s, a) || f(e, n) > p(s, a))) {
							var l = (t - r) * (s - a) - (e - n) * (i - o)
							if (l) {
								var u = ((t * n - e * r) * (i - o) - (t - r) * (i * a - s * o)) / l,
									h = ((t * n - e * r) * (s - a) - (e - n) * (i * a - s * o)) / l,
									c = +u.toFixed(2),
									d = +h.toFixed(2)
								if (
									!(
										c < +f(t, r).toFixed(2) ||
										c > +p(t, r).toFixed(2) ||
										c < +f(i, o).toFixed(2) ||
										c > +p(i, o).toFixed(2) ||
										d < +f(e, n).toFixed(2) ||
										d > +p(e, n).toFixed(2) ||
										d < +f(s, a).toFixed(2) ||
										d > +p(s, a).toFixed(2)
									)
								)
									return { x: u, y: h }
							}
						}
					}
					function O(t, e, r) {
						if (!A(E(t), E(e))) return r ? 0 : []
						for (
							var n = ~~(T.apply(0, t) / 8), i = ~~(T.apply(0, e) / 8), s = [], o = [], a = {}, l = r ? 0 : [], u = 0;
							u < n + 1;
							u++
						) {
							var h = w.apply(0, t.concat(u / n))
							s.push({ x: h.x, y: h.y, t: u / n })
						}
						for (u = 0; u < i + 1; u++) (h = w.apply(0, e.concat(u / i))), o.push({ x: h.x, y: h.y, t: u / i })
						for (u = 0; u < n; u++)
							for (var f = 0; f < i; f++) {
								var p = s[u],
									c = s[u + 1],
									m = o[f],
									y = o[f + 1],
									v = d(c.x - p.x) < 0.001 ? 'y' : 'x',
									g = d(y.x - m.x) < 0.001 ? 'y' : 'x',
									_ = k(p.x, p.y, c.x, c.y, m.x, m.y, y.x, y.y)
								if (_) {
									if (a[_.x.toFixed(4)] == _.y.toFixed(4)) continue
									a[_.x.toFixed(4)] = _.y.toFixed(4)
									var x = p.t + d((_[v] - p[v]) / (c[v] - p[v])) * (c.t - p.t),
										P = m.t + d((_[g] - m[g]) / (y[g] - m[g])) * (y.t - m.t)
									x >= 0 && x <= 1 && P >= 0 && P <= 1 && (r ? l++ : l.push({ x: _.x, y: _.y, t1: x, t2: P }))
								}
							}
						return l
					}
					function L(t, e, r) {
						;(t = q(t)), (e = q(e))
						for (var n, i, s, o, a, l, u, h, f, p, c = r ? 0 : [], d = 0, m = t.length; d < m; d++) {
							var y = t[d]
							if ('M' == y[0]) (n = a = y[1]), (i = l = y[2])
							else {
								'C' == y[0]
									? ((f = [n, i].concat(y.slice(1))), (n = f[6]), (i = f[7]))
									: ((f = [n, i, n, i, a, l, a, l]), (n = a), (i = l))
								for (var v = 0, g = e.length; v < g; v++) {
									var _ = e[v]
									if ('M' == _[0]) (s = u = _[1]), (o = h = _[2])
									else {
										'C' == _[0]
											? ((p = [s, o].concat(_.slice(1))), (s = p[6]), (o = p[7]))
											: ((p = [s, o, s, o, u, h, u, h]), (s = u), (o = h))
										var x = O(f, p, r)
										if (r) c += x
										else {
											for (var P = 0, b = x.length; P < b; P++)
												(x[P].segment1 = d), (x[P].segment2 = v), (x[P].bez1 = f), (x[P].bez2 = p)
											c = c.concat(x)
										}
									}
								}
							}
						}
						return c
					}
					function B(t) {
						var e = m(t)
						if (e.bbox) return o(e.bbox)
						if (!t) return y()
						for (var r, n = 0, i = 0, s = [], a = [], l = 0, u = (t = q(t)).length; l < u; l++)
							if ('M' == (r = t[l])[0]) (n = r[1]), (i = r[2]), s.push(n), a.push(i)
							else {
								var h = U(n, i, r[1], r[2], r[3], r[4], r[5], r[6])
								;(s = s.concat(h.min.x, h.max.x)), (a = a.concat(h.min.y, h.max.y)), (n = r[5]), (i = r[6])
							}
						var c = f.apply(0, s),
							d = f.apply(0, a),
							v = y(c, d, p.apply(0, s) - c, p.apply(0, a) - d)
						return (e.bbox = o(v)), v
					}
					function F(t, e, r, n, i) {
						if (i)
							return [
								['M', +t + +i, e],
								['l', r - 2 * i, 0],
								['a', i, i, 0, 0, 1, i, i],
								['l', 0, n - 2 * i],
								['a', i, i, 0, 0, 1, -i, i],
								['l', 2 * i - r, 0],
								['a', i, i, 0, 0, 1, -i, -i],
								['l', 0, 2 * i - n],
								['a', i, i, 0, 0, 1, i, -i],
								['z'],
							]
						var s = [['M', t, e], ['l', r, 0], ['l', 0, n], ['l', -r, 0], ['z']]
						return (s.toString = v), s
					}
					function N(t, e, r, n, i) {
						if ((null == i && null == n && (n = r), (t = +t), (e = +e), (r = +r), (n = +n), null != i))
							var s = Math.PI / 180,
								o = t + r * Math.cos(-n * s),
								a = t + r * Math.cos(-i * s),
								l = [
									['M', o, e + r * Math.sin(-n * s)],
									['A', r, r, 0, +(i - n > 180), 0, a, e + r * Math.sin(-i * s)],
								]
						else l = [['M', t, e], ['m', 0, -n], ['a', r, n, 0, 1, 1, 0, 2 * n], ['a', r, n, 0, 1, 1, 0, -2 * n], ['z']]
						return (l.toString = v), l
					}
					var D = t._unit2px,
						Y = {
							path: function (t) {
								return t.attr('path')
							},
							circle: function (t) {
								var e = D(t)
								return N(e.cx, e.cy, e.r)
							},
							ellipse: function (t) {
								var e = D(t)
								return N(e.cx || 0, e.cy || 0, e.rx, e.ry)
							},
							rect: function (t) {
								var e = D(t)
								return F(e.x || 0, e.y || 0, e.width, e.height, e.rx, e.ry)
							},
							image: function (t) {
								var e = D(t)
								return F(e.x || 0, e.y || 0, e.width, e.height)
							},
							line: function (t) {
								return 'M' + [t.attr('x1') || 0, t.attr('y1') || 0, t.attr('x2'), t.attr('y2')]
							},
							polyline: function (t) {
								return 'M' + t.attr('points')
							},
							polygon: function (t) {
								return 'M' + t.attr('points') + 'z'
							},
							deflt: function (t) {
								var e = t.node.getBBox()
								return F(e.x, e.y, e.width, e.height)
							},
						}
					function X(e) {
						var r = m(e)
						if (r.abs) return g(r.abs)
						if (((s(e, 'array') && s(e && e[0], 'array')) || (e = t.parsePathString(e)), !e || !e.length))
							return [['M', 0, 0]]
						var n,
							i = [],
							o = 0,
							a = 0,
							l = 0,
							u = 0,
							h = 0
						'M' == e[0][0] && ((l = o = +e[0][1]), (u = a = +e[0][2]), h++, (i[0] = ['M', o, a]))
						for (
							var f,
								p,
								c = 3 == e.length && 'M' == e[0][0] && 'R' == e[1][0].toUpperCase() && 'Z' == e[2][0].toUpperCase(),
								d = h,
								y = e.length;
							d < y;
							d++
						) {
							if ((i.push((f = [])), (n = (p = e[d])[0]) != n.toUpperCase()))
								switch (((f[0] = n.toUpperCase()), f[0])) {
									case 'A':
										;(f[1] = p[1]),
											(f[2] = p[2]),
											(f[3] = p[3]),
											(f[4] = p[4]),
											(f[5] = p[5]),
											(f[6] = +p[6] + o),
											(f[7] = +p[7] + a)
										break
									case 'V':
										f[1] = +p[1] + a
										break
									case 'H':
										f[1] = +p[1] + o
										break
									case 'R':
										for (var _ = [o, a].concat(p.slice(1)), x = 2, P = _.length; x < P; x++)
											(_[x] = +_[x] + o), (_[++x] = +_[x] + a)
										i.pop(), (i = i.concat(W(_, c)))
										break
									case 'O':
										i.pop(), (_ = N(o, a, p[1], p[2])).push(_[0]), (i = i.concat(_))
										break
									case 'U':
										i.pop(), (i = i.concat(N(o, a, p[1], p[2], p[3]))), (f = ['U'].concat(i[i.length - 1].slice(-2)))
										break
									case 'M':
										;(l = +p[1] + o), (u = +p[2] + a)
									default:
										for (x = 1, P = p.length; x < P; x++) f[x] = +p[x] + (x % 2 ? o : a)
								}
							else if ('R' == n)
								(_ = [o, a].concat(p.slice(1))), i.pop(), (i = i.concat(W(_, c))), (f = ['R'].concat(p.slice(-2)))
							else if ('O' == n) i.pop(), (_ = N(o, a, p[1], p[2])).push(_[0]), (i = i.concat(_))
							else if ('U' == n)
								i.pop(), (i = i.concat(N(o, a, p[1], p[2], p[3]))), (f = ['U'].concat(i[i.length - 1].slice(-2)))
							else for (var b = 0, C = p.length; b < C; b++) f[b] = p[b]
							if ('O' != (n = n.toUpperCase()))
								switch (f[0]) {
									case 'Z':
										;(o = +l), (a = +u)
										break
									case 'H':
										o = f[1]
										break
									case 'V':
										a = f[1]
										break
									case 'M':
										;(l = f[f.length - 2]), (u = f[f.length - 1])
									default:
										;(o = f[f.length - 2]), (a = f[f.length - 1])
								}
						}
						return (i.toString = v), (r.abs = g(i)), i
					}
					function R(t, e, r, n) {
						return [t, e, r, n, r, n]
					}
					function M(t, e, r, n, i, s) {
						return [
							(1 / 3) * t + (2 / 3) * r,
							(1 / 3) * e + (2 / 3) * n,
							(1 / 3) * i + (2 / 3) * r,
							(1 / 3) * s + (2 / 3) * n,
							i,
							s,
						]
					}
					function z(e, r, n, i, s, o, a, l, f, p) {
						var c,
							m = (120 * h) / 180,
							y = (h / 180) * (+s || 0),
							v = [],
							g = t._.cacher(function (t, e, r) {
								return { x: t * u.cos(r) - e * u.sin(r), y: t * u.sin(r) + e * u.cos(r) }
							})
						if (!n || !i) return [e, r, l, f, l, f]
						if (p) (A = p[0]), (S = p[1]), (E = p[2]), (I = p[3])
						else {
							;(e = (c = g(e, r, -y)).x), (r = c.y), (l = (c = g(l, f, -y)).x), (f = c.y)
							u.cos((h / 180) * s), u.sin((h / 180) * s)
							var _ = (e - l) / 2,
								x = (r - f) / 2,
								P = (_ * _) / (n * n) + (x * x) / (i * i)
							P > 1 && ((n *= P = u.sqrt(P)), (i *= P))
							var b = n * n,
								C = i * i,
								w = (o == a ? -1 : 1) * u.sqrt(d((b * C - b * x * x - C * _ * _) / (b * x * x + C * _ * _))),
								E = (w * n * x) / i + (e + l) / 2,
								I = (w * -i * _) / n + (r + f) / 2,
								A = u.asin(((r - I) / i).toFixed(9)),
								S = u.asin(((f - I) / i).toFixed(9))
							;(A = e < E ? h - A : A) < 0 && (A = 2 * h + A),
								(S = l < E ? h - S : S) < 0 && (S = 2 * h + S),
								a && A > S && (A -= 2 * h),
								!a && S > A && (S -= 2 * h)
						}
						var T = S - A
						if (d(T) > m) {
							var k = S,
								O = l,
								L = f
							;(S = A + m * (a && S > A ? 1 : -1)),
								(v = z((l = E + n * u.cos(S)), (f = I + i * u.sin(S)), n, i, s, 0, a, O, L, [S, k, E, I]))
						}
						T = S - A
						var B = u.cos(A),
							F = u.sin(A),
							N = u.cos(S),
							D = u.sin(S),
							Y = u.tan(T / 4),
							X = (4 / 3) * n * Y,
							R = (4 / 3) * i * Y,
							M = [e, r],
							U = [e + X * F, r - R * B],
							q = [l + X * D, f - R * N],
							W = [l, f]
						if (((U[0] = 2 * M[0] - U[0]), (U[1] = 2 * M[1] - U[1]), p)) return [U, q, W].concat(v)
						for (var j = [], Z = 0, H = (v = [U, q, W].concat(v).join().split(',')).length; Z < H; Z++)
							j[Z] = Z % 2 ? g(v[Z - 1], v[Z], y).y : g(v[Z], v[Z + 1], y).x
						return j
					}
					function U(t, e, r, n, i, s, o, a) {
						for (var l, h, c, m, y, v, g, _, x = [], P = [[], []], b = 0; b < 2; ++b)
							if (
								(0 == b
									? ((h = 6 * t - 12 * r + 6 * i), (l = -3 * t + 9 * r - 9 * i + 3 * o), (c = 3 * r - 3 * t))
									: ((h = 6 * e - 12 * n + 6 * s), (l = -3 * e + 9 * n - 9 * s + 3 * a), (c = 3 * n - 3 * e)),
								d(l) < 1e-12)
							) {
								if (d(h) < 1e-12) continue
								0 < (m = -c / h) && m < 1 && x.push(m)
							} else
								(g = h * h - 4 * c * l),
									(_ = u.sqrt(g)),
									g < 0 ||
										(0 < (y = (-h + _) / (2 * l)) && y < 1 && x.push(y),
										0 < (v = (-h - _) / (2 * l)) && v < 1 && x.push(v))
						for (var C, w = x.length, E = w; w--; )
							(C = 1 - (m = x[w])),
								(P[0][w] = C * C * C * t + 3 * C * C * m * r + 3 * C * m * m * i + m * m * m * o),
								(P[1][w] = C * C * C * e + 3 * C * C * m * n + 3 * C * m * m * s + m * m * m * a)
						return (
							(P[0][E] = t),
							(P[1][E] = e),
							(P[0][E + 1] = o),
							(P[1][E + 1] = a),
							(P[0].length = P[1].length = E + 2),
							{ min: { x: f.apply(0, P[0]), y: f.apply(0, P[1]) }, max: { x: p.apply(0, P[0]), y: p.apply(0, P[1]) } }
						)
					}
					function q(t, e) {
						var r = !e && m(t)
						if (!e && r.curve) return g(r.curve)
						for (
							var n = X(t),
								i = e && X(e),
								s = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
								o = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
								a = function (t, e, r) {
									var n, i
									if (!t) return ['C', e.x, e.y, e.x, e.y, e.x, e.y]
									switch ((!(t[0] in { T: 1, Q: 1 }) && (e.qx = e.qy = null), t[0])) {
										case 'M':
											;(e.X = t[1]), (e.Y = t[2])
											break
										case 'A':
											t = ['C'].concat(z.apply(0, [e.x, e.y].concat(t.slice(1))))
											break
										case 'S':
											'C' == r || 'S' == r ? ((n = 2 * e.x - e.bx), (i = 2 * e.y - e.by)) : ((n = e.x), (i = e.y)),
												(t = ['C', n, i].concat(t.slice(1)))
											break
										case 'T':
											'Q' == r || 'T' == r
												? ((e.qx = 2 * e.x - e.qx), (e.qy = 2 * e.y - e.qy))
												: ((e.qx = e.x), (e.qy = e.y)),
												(t = ['C'].concat(M(e.x, e.y, e.qx, e.qy, t[1], t[2])))
											break
										case 'Q':
											;(e.qx = t[1]), (e.qy = t[2]), (t = ['C'].concat(M(e.x, e.y, t[1], t[2], t[3], t[4])))
											break
										case 'L':
											t = ['C'].concat(R(e.x, e.y, t[1], t[2]))
											break
										case 'H':
											t = ['C'].concat(R(e.x, e.y, t[1], e.y))
											break
										case 'V':
											t = ['C'].concat(R(e.x, e.y, e.x, t[1]))
											break
										case 'Z':
											t = ['C'].concat(R(e.x, e.y, e.X, e.Y))
									}
									return t
								},
								u = function (t, e) {
									if (t[e].length > 7) {
										t[e].shift()
										for (var r = t[e]; r.length; )
											(f[e] = 'A'), i && (c[e] = 'A'), t.splice(e++, 0, ['C'].concat(r.splice(0, 6)))
										t.splice(e, 1), (_ = p(n.length, (i && i.length) || 0))
									}
								},
								h = function (t, e, r, s, o) {
									t &&
										e &&
										'M' == t[o][0] &&
										'M' != e[o][0] &&
										(e.splice(o, 0, ['M', s.x, s.y]),
										(r.bx = 0),
										(r.by = 0),
										(r.x = t[o][1]),
										(r.y = t[o][2]),
										(_ = p(n.length, (i && i.length) || 0)))
								},
								f = [],
								c = [],
								d = '',
								y = '',
								v = 0,
								_ = p(n.length, (i && i.length) || 0);
							v < _;
							v++
						) {
							n[v] && (d = n[v][0]),
								'C' != d && ((f[v] = d), v && (y = f[v - 1])),
								(n[v] = a(n[v], s, y)),
								'A' != f[v] && 'C' == d && (f[v] = 'C'),
								u(n, v),
								i &&
									(i[v] && (d = i[v][0]),
									'C' != d && ((c[v] = d), v && (y = c[v - 1])),
									(i[v] = a(i[v], o, y)),
									'A' != c[v] && 'C' == d && (c[v] = 'C'),
									u(i, v)),
								h(n, i, s, o, v),
								h(i, n, o, s, v)
							var x = n[v],
								P = i && i[v],
								b = x.length,
								C = i && P.length
							;(s.x = x[b - 2]),
								(s.y = x[b - 1]),
								(s.bx = l(x[b - 4]) || s.x),
								(s.by = l(x[b - 3]) || s.y),
								(o.bx = i && (l(P[C - 4]) || o.x)),
								(o.by = i && (l(P[C - 3]) || o.y)),
								(o.x = i && P[C - 2]),
								(o.y = i && P[C - 1])
						}
						return i || (r.curve = g(n)), i ? [n, i] : n
					}
					function W(t, e) {
						for (var r = [], n = 0, i = t.length; i - 2 * !e > n; n += 2) {
							var s = [
								{ x: +t[n - 2], y: +t[n - 1] },
								{ x: +t[n], y: +t[n + 1] },
								{ x: +t[n + 2], y: +t[n + 3] },
								{ x: +t[n + 4], y: +t[n + 5] },
							]
							e
								? n
									? i - 4 == n
										? (s[3] = { x: +t[0], y: +t[1] })
										: i - 2 == n && ((s[2] = { x: +t[0], y: +t[1] }), (s[3] = { x: +t[2], y: +t[3] }))
									: (s[0] = { x: +t[i - 2], y: +t[i - 1] })
								: i - 4 == n
								? (s[3] = s[2])
								: n || (s[0] = { x: +t[n], y: +t[n + 1] }),
								r.push([
									'C',
									(-s[0].x + 6 * s[1].x + s[2].x) / 6,
									(-s[0].y + 6 * s[1].y + s[2].y) / 6,
									(s[1].x + 6 * s[2].x - s[3].x) / 6,
									(s[1].y + 6 * s[2].y - s[3].y) / 6,
									s[2].x,
									s[2].y,
								])
						}
						return r
					}
					;(t.path = m),
						(t.path.getTotalLength = P),
						(t.path.getPointAtLength = b),
						(t.path.getSubpath = function (t, e, r) {
							if (this.getTotalLength(t) - r < 1e-6) return C(t, e).end
							var n = C(t, r, 1)
							return e ? C(n, e).end : n
						}),
						(i.getTotalLength = function () {
							if (this.node.getTotalLength) return this.node.getTotalLength()
						}),
						(i.getPointAtLength = function (t) {
							return b(this.attr('d'), t)
						}),
						(i.getSubpath = function (e, r) {
							return t.path.getSubpath(this.attr('d'), e, r)
						}),
						(t._.box = y),
						(t.path.findDotsAtSegment = w),
						(t.path.bezierBBox = E),
						(t.path.isPointInsideBBox = I),
						(t.closest = function (e, r, n, i) {
							for (
								var s = 100,
									o = y(e - s / 2, r - s / 2, s, s),
									a = [],
									l = n[0].hasOwnProperty('x')
										? function (t) {
												return { x: n[t].x, y: n[t].y }
										  }
										: function (t) {
												return { x: n[t], y: i[t] }
										  },
									u = 0;
								s <= 1e6 && !u;

							) {
								for (var h = 0, f = n.length; h < f; h++) {
									var p = l(h)
									if (I(o, p.x, p.y)) {
										u++, a.push(p)
										break
									}
								}
								u || (o = y(e - (s *= 2) / 2, r - s / 2, s, s))
							}
							if (1e6 != s) {
								var c,
									d = 1 / 0
								for (h = 0, f = a.length; h < f; h++) {
									var m = t.len(e, r, a[h].x, a[h].y)
									d > m && ((d = m), (a[h].len = m), (c = a[h]))
								}
								return c
							}
						}),
						(t.path.isBBoxIntersect = A),
						(t.path.intersection = function (t, e) {
							return L(t, e)
						}),
						(t.path.intersectionNumber = function (t, e) {
							return L(t, e, 1)
						}),
						(t.path.isPointInside = function (t, e, r) {
							var n = B(t)
							return (
								I(n, e, r) &&
								L(
									t,
									[
										['M', e, r],
										['H', n.x2 + 10],
									],
									1
								) %
									2 ==
									1
							)
						}),
						(t.path.getBBox = B),
						(t.path.get = Y),
						(t.path.toRelative = function (e) {
							var r = m(e),
								n = String.prototype.toLowerCase
							if (r.rel) return g(r.rel)
							;(t.is(e, 'array') && t.is(e && e[0], 'array')) || (e = t.parsePathString(e))
							var i = [],
								s = 0,
								o = 0,
								a = 0,
								l = 0,
								u = 0
							'M' == e[0][0] && ((a = s = e[0][1]), (l = o = e[0][2]), u++, i.push(['M', s, o]))
							for (var h = u, f = e.length; h < f; h++) {
								var p = (i[h] = []),
									c = e[h]
								if (c[0] != n.call(c[0]))
									switch (((p[0] = n.call(c[0])), p[0])) {
										case 'a':
											;(p[1] = c[1]),
												(p[2] = c[2]),
												(p[3] = c[3]),
												(p[4] = c[4]),
												(p[5] = c[5]),
												(p[6] = +(c[6] - s).toFixed(3)),
												(p[7] = +(c[7] - o).toFixed(3))
											break
										case 'v':
											p[1] = +(c[1] - o).toFixed(3)
											break
										case 'm':
											;(a = c[1]), (l = c[2])
										default:
											for (var d = 1, y = c.length; d < y; d++) p[d] = +(c[d] - (d % 2 ? s : o)).toFixed(3)
									}
								else {
									;(p = i[h] = []), 'm' == c[0] && ((a = c[1] + s), (l = c[2] + o))
									for (var _ = 0, x = c.length; _ < x; _++) i[h][_] = c[_]
								}
								var P = i[h].length
								switch (i[h][0]) {
									case 'z':
										;(s = a), (o = l)
										break
									case 'h':
										s += +i[h][P - 1]
										break
									case 'v':
										o += +i[h][P - 1]
										break
									default:
										;(s += +i[h][P - 2]), (o += +i[h][P - 1])
								}
							}
							return (i.toString = v), (r.rel = g(i)), i
						}),
						(t.path.toAbsolute = X),
						(t.path.toCubic = q),
						(t.path.map = function (t, e) {
							if (!e) return t
							var r, n, i, s, o, a, l
							for (i = 0, o = (t = q(t)).length; i < o; i++)
								for (s = 1, a = (l = t[i]).length; s < a; s += 2)
									(r = e.x(l[s], l[s + 1])), (n = e.y(l[s], l[s + 1])), (l[s] = r), (l[s + 1] = n)
							return t
						}),
						(t.path.toString = v),
						(t.path.clone = g)
				}),
				i.plugin(function (t, e, r, i) {
					var s = Math.max,
						o = Math.min,
						a = function (t) {
							if (((this.items = []), (this.bindings = {}), (this.length = 0), (this.type = 'set'), t))
								for (var e = 0, r = t.length; e < r; e++)
									t[e] && ((this[this.items.length] = this.items[this.items.length] = t[e]), this.length++)
						},
						l = a.prototype
					;(l.push = function () {
						for (var t, e, r = 0, n = arguments.length; r < n; r++)
							(t = arguments[r]) && ((this[(e = this.items.length)] = this.items[e] = t), this.length++)
						return this
					}),
						(l.pop = function () {
							return this.length && delete this[this.length--], this.items.pop()
						}),
						(l.forEach = function (t, e) {
							for (var r = 0, n = this.items.length; r < n; r++) if (!1 === t.call(e, this.items[r], r)) return this
							return this
						}),
						(l.animate = function (e, r, i, s) {
							'function' != typeof i || i.length || ((s = i), (i = n.linear)),
								e instanceof t._.Animation && ((s = e.callback), (i = e.easing), (r = i.dur), (e = e.attr))
							var o = arguments
							if (t.is(e, 'array') && t.is(o[o.length - 1], 'array')) var a = !0
							var l,
								u = function () {
									l ? (this.b = l) : (l = this.b)
								},
								h = 0,
								f = this,
								p =
									s &&
									function () {
										++h == f.length && s.call(this)
									}
							return this.forEach(function (t, n) {
								eve.once('snap.animcreated.' + t.id, u), a ? o[n] && t.animate.apply(t, o[n]) : t.animate(e, r, i, p)
							})
						}),
						(l.remove = function () {
							for (; this.length; ) this.pop().remove()
							return this
						}),
						(l.bind = function (t, e, r) {
							var n = {}
							if ('function' == typeof e) this.bindings[t] = e
							else {
								var i = r || t
								this.bindings[t] = function (t) {
									;(n[i] = t), e.attr(n)
								}
							}
							return this
						}),
						(l.attr = function (t) {
							var e = {}
							for (var r in t) this.bindings[r] ? this.bindings[r](t[r]) : (e[r] = t[r])
							for (var n = 0, i = this.items.length; n < i; n++) this.items[n].attr(e)
							return this
						}),
						(l.clear = function () {
							for (; this.length; ) this.pop()
						}),
						(l.splice = function (t, e, r) {
							;(t = t < 0 ? s(this.length + t, 0) : t), (e = s(0, o(this.length - t, e)))
							var n,
								i = [],
								l = [],
								u = []
							for (n = 2; n < arguments.length; n++) u.push(arguments[n])
							for (n = 0; n < e; n++) l.push(this[t + n])
							for (; n < this.length - t; n++) i.push(this[t + n])
							var h = u.length
							for (n = 0; n < h + i.length; n++) this.items[t + n] = this[t + n] = n < h ? u[n] : i[n - h]
							for (n = this.items.length = this.length -= e - h; this[n]; ) delete this[n++]
							return new a(l)
						}),
						(l.exclude = function (t) {
							for (var e = 0, r = this.length; e < r; e++) if (this[e] == t) return this.splice(e, 1), !0
							return !1
						}),
						(l.insertAfter = function (t) {
							for (var e = this.items.length; e--; ) this.items[e].insertAfter(t)
							return this
						}),
						(l.getBBox = function () {
							for (var t = [], e = [], r = [], n = [], i = this.items.length; i--; )
								if (!this.items[i].removed) {
									var a = this.items[i].getBBox()
									t.push(a.x), e.push(a.y), r.push(a.x + a.width), n.push(a.y + a.height)
								}
							return {
								x: (t = o.apply(0, t)),
								y: (e = o.apply(0, e)),
								x2: (r = s.apply(0, r)),
								y2: (n = s.apply(0, n)),
								width: r - t,
								height: n - e,
								cx: t + (r - t) / 2,
								cy: e + (n - e) / 2,
							}
						}),
						(l.clone = function (t) {
							t = new a()
							for (var e = 0, r = this.items.length; e < r; e++) t.push(this.items[e].clone())
							return t
						}),
						(l.toString = function () {
							return 'Snap‘s set'
						}),
						(l.type = 'set'),
						(t.Set = a),
						(t.set = function () {
							var t = new a()
							return arguments.length && t.push.apply(t, Array.prototype.slice.call(arguments, 0)), t
						})
				}),
				i.plugin(function (t, e, r, n) {
					var i = {},
						s = /[%a-z]+$/i,
						o = String
					function a(t) {
						var e = t[0]
						switch (e.toLowerCase()) {
							case 't':
								return [e, 0, 0]
							case 'm':
								return [e, 1, 0, 0, 1, 0, 0]
							case 'r':
								return 4 == t.length ? [e, 0, t[2], t[3]] : [e, 0]
							case 's':
								return 5 == t.length ? [e, 1, 1, t[3], t[4]] : 3 == t.length ? [e, 1, 1] : [e, 1]
						}
					}
					function l(t) {
						return t
					}
					function u(t) {
						return t.join(' ')
					}
					function h(e) {
						return t.rgb(e[0], e[1], e[2], e[3])
					}
					function f(t) {
						var e,
							r,
							n,
							i,
							s,
							o,
							a = 0,
							l = []
						for (e = 0, r = t.length; e < r; e++) {
							for (s = '[', o = ['"' + t[e][0] + '"'], n = 1, i = t[e].length; n < i; n++) o[n] = 'val[' + a++ + ']'
							;(s += o + ']'), (l[e] = s)
						}
						return Function('val', 'return Snap.path.toString.call([' + l + '])')
					}
					function p(t) {
						for (var e = [], r = 0, n = t.length; r < n; r++)
							for (var i = 1, s = t[r].length; i < s; i++) e.push(t[r][i])
						return e
					}
					function c(t) {
						return isFinite(t)
					}
					;(i.stroke = i.fill = 'colour'),
						(e.prototype.equal = function (t, e) {
							return eve('snap.util.equal', this, t, e).firstDefined()
						}),
						eve.on('snap.util.equal', function (e, r) {
							var n,
								d,
								m = o(this.attr(e) || ''),
								y = this
							if ('colour' == i[e])
								return (
									(n = t.color(m)),
									(d = t.color(r)),
									{ from: [n.r, n.g, n.b, n.opacity], to: [d.r, d.g, d.b, d.opacity], f: h }
								)
							if ('viewBox' == e)
								return { from: (n = this.attr(e).vb.split(' ').map(Number)), to: (d = r.split(' ').map(Number)), f: u }
							if ('transform' == e || 'gradientTransform' == e || 'patternTransform' == e)
								return (
									'string' == typeof r && (r = o(r).replace(/\.{3}|\u2026/g, m)),
									(function (e, r, n) {
										;(e = e || new t.Matrix()),
											(r = r || new t.Matrix()),
											(e = t.parseTransformString(e.toTransformString()) || []),
											(r = t.parseTransformString(r.toTransformString()) || [])
										for (var i, s, o, l, u = Math.max(e.length, r.length), h = [], c = [], d = 0; d < u; d++) {
											if (
												((o = e[d] || a(r[d])),
												(l = r[d] || a(o)),
												o[0] != l[0] ||
													('r' == o[0].toLowerCase() && (o[2] != l[2] || o[3] != l[3])) ||
													('s' == o[0].toLowerCase() && (o[3] != l[3] || o[4] != l[4])))
											) {
												;(e = t._.transform2matrix(e, n())),
													(r = t._.transform2matrix(r, n())),
													(h = [['m', e.a, e.b, e.c, e.d, e.e, e.f]]),
													(c = [['m', r.a, r.b, r.c, r.d, r.e, r.f]])
												break
											}
											for (h[d] = [], c[d] = [], i = 0, s = Math.max(o.length, l.length); i < s; i++)
												i in o && (h[d][i] = o[i]), i in l && (c[d][i] = l[i])
										}
										return { from: p(h), to: p(c), f: f(h) }
									})(
										(m = this.matrix),
										(r = t._.rgTransform.test(r)
											? t._.transform2matrix(r, this.getBBox())
											: t._.transform2matrix(t._.svgTransform2string(r), this.getBBox())),
										function () {
											return y.getBBox(1)
										}
									)
								)
							if ('d' == e || 'path' == e) return { from: p((n = t.path.toCubic(m, r))[0]), to: p(n[1]), f: f(n[0]) }
							if ('points' == e)
								return {
									from: (n = o(m).split(t._.separator)),
									to: (d = o(r).split(t._.separator)),
									f: function (t) {
										return t
									},
								}
							if (c(m) && c(r)) return { from: parseFloat(m), to: parseFloat(r), f: l }
							var v,
								g,
								_,
								x = m.match(s),
								P = o(r).match(s)
							return x && ((g = x), (_ = P), t.is(g, 'array') && t.is(_, 'array') && g.toString() == _.toString())
								? {
										from: parseFloat(m),
										to: parseFloat(r),
										f:
											((v = x),
											function (t) {
												return +t.toFixed(3) + v
											}),
								  }
								: { from: this.asPX(e), to: this.asPX(e, r), f: l }
						})
				}),
				i.plugin(function (t, e, r, n) {
					for (
						var i = e.prototype,
							s = ('createTouch' in n.doc),
							o = [
								'click',
								'dblclick',
								'mousedown',
								'mousemove',
								'mouseout',
								'mouseover',
								'mouseup',
								'touchstart',
								'touchmove',
								'touchend',
								'touchcancel',
							],
							a = { mousedown: 'touchstart', mousemove: 'touchmove', mouseup: 'touchend' },
							l = function (t, e) {
								var r = 'y' == t ? 'scrollTop' : 'scrollLeft',
									i = e && e.node ? e.node.ownerDocument : n.doc
								return i[(r in i.documentElement) ? 'documentElement' : 'body'][r]
							},
							u = function () {
								return this.originalEvent.preventDefault()
							},
							h = function () {
								return this.originalEvent.stopPropagation()
							},
							f = function (t, e, r, n) {
								var i = s && a[e] ? a[e] : e,
									o = function (i) {
										var o = l('y', n),
											f = l('x', n)
										if (s && a.hasOwnProperty(e))
											for (var p = 0, c = i.targetTouches && i.targetTouches.length; p < c; p++)
												if (i.targetTouches[p].target == t || t.contains(i.targetTouches[p].target)) {
													var d = i
													;((i = i.targetTouches[p]).originalEvent = d), (i.preventDefault = u), (i.stopPropagation = h)
													break
												}
										var m = i.clientX + f,
											y = i.clientY + o
										return r.call(n, i, m, y)
									}
								return (
									e !== i && t.addEventListener(e, o, !1),
									t.addEventListener(i, o, !1),
									function () {
										return e !== i && t.removeEventListener(e, o, !1), t.removeEventListener(i, o, !1), !0
									}
								)
							},
							p = [],
							c = function (t) {
								for (var e, r = t.clientX, n = t.clientY, i = l('y'), o = l('x'), a = p.length; a--; ) {
									if (((e = p[a]), s)) {
										for (var u, h = t.touches && t.touches.length; h--; )
											if ((u = t.touches[h]).identifier == e.el._drag.id || e.el.node.contains(u.target)) {
												;(r = u.clientX), (n = u.clientY), (t.originalEvent ? t.originalEvent : t).preventDefault()
												break
											}
									} else t.preventDefault()
									var f = e.el.node
									f.nextSibling, f.parentNode, f.style.display
									;(r += o),
										(n += i),
										eve('snap.drag.move.' + e.el.id, e.move_scope || e.el, r - e.el._drag.x, n - e.el._drag.y, r, n, t)
								}
							},
							d = function (e) {
								t.unmousemove(c).unmouseup(d)
								for (var r, n = p.length; n--; )
									((r = p[n]).el._drag = {}),
										eve('snap.drag.end.' + r.el.id, r.end_scope || r.start_scope || r.move_scope || r.el, e),
										eve.off('snap.drag.*.' + r.el.id)
								p = []
							},
							m = o.length;
						m--;

					)
						!(function (e) {
							;(t[e] = i[e] = function (r, n) {
								if (t.is(r, 'function'))
									(this.events = this.events || []),
										this.events.push({ name: e, f: r, unbind: f(this.node || document, e, r, n || this) })
								else
									for (var i = 0, s = this.events.length; i < s; i++)
										if (this.events[i].name == e)
											try {
												this.events[i].f.call(this)
											} catch (t) {}
								return this
							}),
								(t['un' + e] = i['un' + e] = function (t) {
									for (var r = this.events || [], n = r.length; n--; )
										if (r[n].name == e && (r[n].f == t || !t))
											return r[n].unbind(), r.splice(n, 1), !r.length && delete this.events, this
									return this
								})
						})(o[m])
					;(i.hover = function (t, e, r, n) {
						return this.mouseover(t, r).mouseout(e, n || r)
					}),
						(i.unhover = function (t, e) {
							return this.unmouseover(t).unmouseout(e)
						})
					var y = []
					;(i.drag = function (e, r, n, i, s, o) {
						var a,
							l = this
						if (!arguments.length)
							return l.drag(
								function (t, e) {
									this.attr({ transform: a + (a ? 'T' : 't') + [t, e] })
								},
								function () {
									a = this.transform().local
								}
							)
						function u(a, u, h) {
							;(a.originalEvent || a).preventDefault(),
								(l._drag.x = u),
								(l._drag.y = h),
								(l._drag.id = a.identifier),
								!p.length && t.mousemove(c).mouseup(d),
								p.push({ el: l, move_scope: i, start_scope: s, end_scope: o }),
								r && eve.on('snap.drag.start.' + l.id, r),
								e && eve.on('snap.drag.move.' + l.id, e),
								n && eve.on('snap.drag.end.' + l.id, n),
								eve('snap.drag.start.' + l.id, s || i || l, u, h, a)
						}
						function h(t, e, r) {
							eve('snap.draginit.' + l.id, l, t, e, r)
						}
						return (
							eve.on('snap.draginit.' + l.id, u),
							(l._drag = {}),
							y.push({ el: l, start: u, init: h }),
							l.mousedown(h),
							l
						)
					}),
						(i.undrag = function () {
							for (var e = y.length; e--; )
								y[e].el == this &&
									(this.unmousedown(y[e].init),
									y.splice(e, 1),
									eve.unbind('snap.drag.*.' + this.id),
									eve.unbind('snap.draginit.' + this.id))
							return !y.length && t.unmousemove(c).unmouseup(d), this
						})
				}),
				i.plugin(function (t, e, r, n) {
					e.prototype
					var i = r.prototype,
						s = /^\s*url\((.+)\)/,
						o = String,
						a = t._.$
					;(t.filter = {}),
						(i.filter = function (r) {
							var n = this
							'svg' != n.type && (n = n.paper)
							var i = t.parse(o(r)),
								s = t._.id(),
								l = (n.node.offsetWidth, n.node.offsetHeight, a('filter'))
							return (
								a(l, { id: s, filterUnits: 'userSpaceOnUse' }), l.appendChild(i.node), n.defs.appendChild(l), new e(l)
							)
						}),
						eve.on('snap.util.getattr.filter', function () {
							eve.stop()
							var e = a(this.node, 'filter')
							if (e) {
								var r = o(e).match(s)
								return r && t.select(r[1])
							}
						}),
						eve.on('snap.util.attr.filter', function (r) {
							if (r instanceof e && 'filter' == r.type) {
								eve.stop()
								var n = r.node.id
								n || (a(r.node, { id: r.id }), (n = r.id)), a(this.node, { filter: t.url(n) })
							}
							;(r && 'none' != r) || (eve.stop(), this.node.removeAttribute('filter'))
						}),
						(t.filter.blur = function (e, r) {
							null == e && (e = 2)
							var n = null == r ? e : [e, r]
							return t.format('<feGaussianBlur stdDeviation="{def}"/>', { def: n })
						}),
						(t.filter.blur.toString = function () {
							return this()
						}),
						(t.filter.shadow = function (e, r, n, i, s) {
							return (
								null == s && (null == i ? ((s = n), (n = 4), (i = '#000')) : ((s = i), (i = n), (n = 4))),
								null == n && (n = 4),
								null == s && (s = 1),
								null == e && ((e = 0), (r = 2)),
								null == r && (r = e),
								(i = t.color(i)),
								t.format(
									'<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>',
									{ color: i, dx: e, dy: r, blur: n, opacity: s }
								)
							)
						}),
						(t.filter.shadow.toString = function () {
							return this()
						}),
						(t.filter.grayscale = function (e) {
							return (
								null == e && (e = 1),
								t.format(
									'<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>',
									{
										a: 0.2126 + 0.7874 * (1 - e),
										b: 0.7152 - 0.7152 * (1 - e),
										c: 0.0722 - 0.0722 * (1 - e),
										d: 0.2126 - 0.2126 * (1 - e),
										e: 0.7152 + 0.2848 * (1 - e),
										f: 0.0722 - 0.0722 * (1 - e),
										g: 0.2126 - 0.2126 * (1 - e),
										h: 0.0722 + 0.9278 * (1 - e),
									}
								)
							)
						}),
						(t.filter.grayscale.toString = function () {
							return this()
						}),
						(t.filter.sepia = function (e) {
							return (
								null == e && (e = 1),
								t.format(
									'<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>',
									{
										a: 0.393 + 0.607 * (1 - e),
										b: 0.769 - 0.769 * (1 - e),
										c: 0.189 - 0.189 * (1 - e),
										d: 0.349 - 0.349 * (1 - e),
										e: 0.686 + 0.314 * (1 - e),
										f: 0.168 - 0.168 * (1 - e),
										g: 0.272 - 0.272 * (1 - e),
										h: 0.534 - 0.534 * (1 - e),
										i: 0.131 + 0.869 * (1 - e),
									}
								)
							)
						}),
						(t.filter.sepia.toString = function () {
							return this()
						}),
						(t.filter.saturate = function (e) {
							return (
								null == e && (e = 1), t.format('<feColorMatrix type="saturate" values="{amount}"/>', { amount: 1 - e })
							)
						}),
						(t.filter.saturate.toString = function () {
							return this()
						}),
						(t.filter.hueRotate = function (e) {
							return (e = e || 0), t.format('<feColorMatrix type="hueRotate" values="{angle}"/>', { angle: e })
						}),
						(t.filter.hueRotate.toString = function () {
							return this()
						}),
						(t.filter.invert = function (e) {
							return (
								null == e && (e = 1),
								t.format(
									'<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>',
									{ amount: e, amount2: 1 - e }
								)
							)
						}),
						(t.filter.invert.toString = function () {
							return this()
						}),
						(t.filter.brightness = function (e) {
							return (
								null == e && (e = 1),
								t.format(
									'<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>',
									{ amount: e }
								)
							)
						}),
						(t.filter.brightness.toString = function () {
							return this()
						}),
						(t.filter.contrast = function (e) {
							return (
								null == e && (e = 1),
								t.format(
									'<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>',
									{ amount: e, amount2: 0.5 - e / 2 }
								)
							)
						}),
						(t.filter.contrast.toString = function () {
							return this()
						})
				}),
				i.plugin(function (t, e, r, n, i) {
					var s = t._.box,
						o = t.is,
						a = /^[^a-z]*([tbmlrc])/i,
						l = function () {
							return 'T' + this.dx + ',' + this.dy
						}
					;(e.prototype.getAlign = function (t, e) {
						null == e && o(t, 'string') && ((e = t), (t = null))
						var r = (t = t || this.paper).getBBox ? t.getBBox() : s(t),
							n = this.getBBox(),
							i = {}
						switch ((e = (e = e && e.match(a)) ? e[1].toLowerCase() : 'c')) {
							case 't':
								;(i.dx = 0), (i.dy = r.y - n.y)
								break
							case 'b':
								;(i.dx = 0), (i.dy = r.y2 - n.y2)
								break
							case 'm':
								;(i.dx = 0), (i.dy = r.cy - n.cy)
								break
							case 'l':
								;(i.dx = r.x - n.x), (i.dy = 0)
								break
							case 'r':
								;(i.dx = r.x2 - n.x2), (i.dy = 0)
								break
							default:
								;(i.dx = r.cx - n.cx), (i.dy = 0)
						}
						return (i.toString = l), i
					}),
						(e.prototype.align = function (t, e) {
							return this.transform('...' + this.getAlign(t, e))
						})
				}),
				i.plugin(function (t, e, r, i, s) {
					var o = e.prototype,
						a = t.is,
						l = String,
						u = 'hasOwnProperty'
					function h(t, e, r) {
						return function (n) {
							var i = n.slice(t, e)
							return 1 == i.length && (i = i[0]), r ? r(i) : i
						}
					}
					var f = function (t, e, r, i) {
						'function' != typeof r || r.length || ((i = r), (r = n.linear)),
							(this.attr = t),
							(this.dur = e),
							r && (this.easing = r),
							i && (this.callback = i)
					}
					;(t._.Animation = f),
						(t.animation = function (t, e, r, n) {
							return new f(t, e, r, n)
						}),
						(o.inAnim = function () {
							var t = []
							for (var e in this.anims)
								this.anims[u](e) &&
									(function (e) {
										t.push({
											anim: new f(e._attrs, e.dur, e.easing, e._callback),
											mina: e,
											curStatus: e.status(),
											status: function (t) {
												return e.status(t)
											},
											stop: function () {
												e.stop()
											},
										})
									})(this.anims[e])
							return t
						}),
						(t.animate = function (t, e, r, i, s, o) {
							'function' != typeof s || s.length || ((o = s), (s = n.linear))
							var a = n.time(),
								l = n(t, e, a, a + i, n.time, r, s)
							return o && eve.once('mina.finish.' + l.id, o), l
						}),
						(o.stop = function () {
							for (var t = this.inAnim(), e = 0, r = t.length; e < r; e++) t[e].stop()
							return this
						}),
						(o.animate = function (t, e, r, i) {
							'function' != typeof r || r.length || ((i = r), (r = n.linear)),
								t instanceof f && ((i = t.callback), (r = t.easing), (e = t.dur), (t = t.attr))
							var s,
								o,
								p,
								c,
								d = [],
								m = [],
								y = {},
								v = this
							for (var g in t)
								if (t[u](g)) {
									v.equal
										? ((s = (c = v.equal(g, l(t[g]))).from), (o = c.to), (p = c.f))
										: ((s = +v.attr(g)), (o = +t[g]))
									var _ = a(s, 'array') ? s.length : 1
									;(y[g] = h(d.length, d.length + _, p)), (d = d.concat(s)), (m = m.concat(o))
								}
							var x = n.time(),
								P = n(
									d,
									m,
									x,
									x + e,
									n.time,
									function (t) {
										var e = {}
										for (var r in y) y[u](r) && (e[r] = y[r](t))
										v.attr(e)
									},
									r
								)
							return (
								(v.anims[P.id] = P),
								(P._attrs = t),
								(P._callback = i),
								eve('snap.animcreated.' + v.id, P),
								eve.once('mina.finish.' + P.id, function () {
									eve.off('mina.*.' + P.id), delete v.anims[P.id], i && i.call(v)
								}),
								eve.once('mina.stop.' + P.id, function () {
									eve.off('mina.*.' + P.id), delete v.anims[P.id]
								}),
								v
							)
						})
				}),
				i.plugin(function (t, e, r, n) {
					function i(t) {
						t = t.split(/(?=#)/)
						var e = new String(t[5])
						return (
							(e[50] = t[0]),
							(e[100] = t[1]),
							(e[200] = t[2]),
							(e[300] = t[3]),
							(e[400] = t[4]),
							(e[500] = t[5]),
							(e[600] = t[6]),
							(e[700] = t[7]),
							(e[800] = t[8]),
							(e[900] = t[9]),
							t[10] && ((e.A100 = t[10]), (e.A200 = t[11]), (e.A400 = t[12]), (e.A700 = t[13])),
							e
						)
					}
					;(t.mui = {}),
						(t.flat = {}),
						(t.mui.red = i(
							'#ffebee#ffcdd2#ef9a9a#e57373#ef5350#f44336#e53935#d32f2f#c62828#b71c1c#ff8a80#ff5252#ff1744#d50000'
						)),
						(t.mui.pink = i(
							'#FCE4EC#F8BBD0#F48FB1#F06292#EC407A#E91E63#D81B60#C2185B#AD1457#880E4F#FF80AB#FF4081#F50057#C51162'
						)),
						(t.mui.purple = i(
							'#F3E5F5#E1BEE7#CE93D8#BA68C8#AB47BC#9C27B0#8E24AA#7B1FA2#6A1B9A#4A148C#EA80FC#E040FB#D500F9#AA00FF'
						)),
						(t.mui.deeppurple = i(
							'#EDE7F6#D1C4E9#B39DDB#9575CD#7E57C2#673AB7#5E35B1#512DA8#4527A0#311B92#B388FF#7C4DFF#651FFF#6200EA'
						)),
						(t.mui.indigo = i(
							'#E8EAF6#C5CAE9#9FA8DA#7986CB#5C6BC0#3F51B5#3949AB#303F9F#283593#1A237E#8C9EFF#536DFE#3D5AFE#304FFE'
						)),
						(t.mui.blue = i(
							'#E3F2FD#BBDEFB#90CAF9#64B5F6#64B5F6#2196F3#1E88E5#1976D2#1565C0#0D47A1#82B1FF#448AFF#2979FF#2962FF'
						)),
						(t.mui.lightblue = i(
							'#E1F5FE#B3E5FC#81D4FA#4FC3F7#29B6F6#03A9F4#039BE5#0288D1#0277BD#01579B#80D8FF#40C4FF#00B0FF#0091EA'
						)),
						(t.mui.cyan = i(
							'#E0F7FA#B2EBF2#80DEEA#4DD0E1#26C6DA#00BCD4#00ACC1#0097A7#00838F#006064#84FFFF#18FFFF#00E5FF#00B8D4'
						)),
						(t.mui.teal = i(
							'#E0F2F1#B2DFDB#80CBC4#4DB6AC#26A69A#009688#00897B#00796B#00695C#004D40#A7FFEB#64FFDA#1DE9B6#00BFA5'
						)),
						(t.mui.green = i(
							'#E8F5E9#C8E6C9#A5D6A7#81C784#66BB6A#4CAF50#43A047#388E3C#2E7D32#1B5E20#B9F6CA#69F0AE#00E676#00C853'
						)),
						(t.mui.lightgreen = i(
							'#F1F8E9#DCEDC8#C5E1A5#AED581#9CCC65#8BC34A#7CB342#689F38#558B2F#33691E#CCFF90#B2FF59#76FF03#64DD17'
						)),
						(t.mui.lime = i(
							'#F9FBE7#F0F4C3#E6EE9C#DCE775#D4E157#CDDC39#C0CA33#AFB42B#9E9D24#827717#F4FF81#EEFF41#C6FF00#AEEA00'
						)),
						(t.mui.yellow = i(
							'#FFFDE7#FFF9C4#FFF59D#FFF176#FFEE58#FFEB3B#FDD835#FBC02D#F9A825#F57F17#FFFF8D#FFFF00#FFEA00#FFD600'
						)),
						(t.mui.amber = i(
							'#FFF8E1#FFECB3#FFE082#FFD54F#FFCA28#FFC107#FFB300#FFA000#FF8F00#FF6F00#FFE57F#FFD740#FFC400#FFAB00'
						)),
						(t.mui.orange = i(
							'#FFF3E0#FFE0B2#FFCC80#FFB74D#FFA726#FF9800#FB8C00#F57C00#EF6C00#E65100#FFD180#FFAB40#FF9100#FF6D00'
						)),
						(t.mui.deeporange = i(
							'#FBE9E7#FFCCBC#FFAB91#FF8A65#FF7043#FF5722#F4511E#E64A19#D84315#BF360C#FF9E80#FF6E40#FF3D00#DD2C00'
						)),
						(t.mui.brown = i('#EFEBE9#D7CCC8#BCAAA4#A1887F#8D6E63#795548#6D4C41#5D4037#4E342E#3E2723')),
						(t.mui.grey = i('#FAFAFA#F5F5F5#EEEEEE#E0E0E0#BDBDBD#9E9E9E#757575#616161#424242#212121')),
						(t.mui.bluegrey = i('#ECEFF1#CFD8DC#B0BEC5#90A4AE#78909C#607D8B#546E7A#455A64#37474F#263238')),
						(t.flat.turquoise = '#1abc9c'),
						(t.flat.greensea = '#16a085'),
						(t.flat.sunflower = '#f1c40f'),
						(t.flat.orange = '#f39c12'),
						(t.flat.emerland = '#2ecc71'),
						(t.flat.nephritis = '#27ae60'),
						(t.flat.carrot = '#e67e22'),
						(t.flat.pumpkin = '#d35400'),
						(t.flat.peterriver = '#3498db'),
						(t.flat.belizehole = '#2980b9'),
						(t.flat.alizarin = '#e74c3c'),
						(t.flat.pomegranate = '#c0392b'),
						(t.flat.amethyst = '#9b59b6'),
						(t.flat.wisteria = '#8e44ad'),
						(t.flat.clouds = '#ecf0f1'),
						(t.flat.silver = '#bdc3c7'),
						(t.flat.wetasphalt = '#34495e'),
						(t.flat.midnightblue = '#2c3e50'),
						(t.flat.concrete = '#95a5a6'),
						(t.flat.asbestos = '#7f8c8d'),
						(t.importMUIColors = function () {
							for (var e in t.mui) t.mui.hasOwnProperty(e) && (window[e] = t.mui[e])
						})
				}),
				(t.exports = i)
		},
		465: function (t, e, r) {
			var n
			!(function (r) {
				var i,
					s,
					o = 'hasOwnProperty',
					a = /[\.\/]/,
					l = /\s*,\s*/,
					u = function (t, e) {
						return t - e
					},
					h = { n: {} },
					f = function () {
						for (var t = 0, e = this.length; t < e; t++) if (void 0 !== this[t]) return this[t]
					},
					p = function () {
						for (var t = this.length; --t; ) if (void 0 !== this[t]) return this[t]
					},
					c = Object.prototype.toString,
					d = String,
					m =
						Array.isArray ||
						function (t) {
							return t instanceof Array || '[object Array]' == c.call(t)
						},
					y = function (t, e) {
						var r,
							n = s,
							o = Array.prototype.slice.call(arguments, 2),
							a = y.listeners(t),
							l = 0,
							h = [],
							c = {},
							d = [],
							m = i
						;(d.firstDefined = f), (d.lastDefined = p), (i = t), (s = 0)
						for (var v = 0, g = a.length; v < g; v++)
							'zIndex' in a[v] && (h.push(a[v].zIndex), a[v].zIndex < 0 && (c[a[v].zIndex] = a[v]))
						for (h.sort(u); h[l] < 0; ) if (((r = c[h[l++]]), d.push(r.apply(e, o)), s)) return (s = n), d
						for (v = 0; v < g; v++)
							if ('zIndex' in (r = a[v]))
								if (r.zIndex == h[l]) {
									if ((d.push(r.apply(e, o)), s)) break
									do {
										if (((r = c[h[++l]]) && d.push(r.apply(e, o)), s)) break
									} while (r)
								} else c[r.zIndex] = r
							else if ((d.push(r.apply(e, o)), s)) break
						return (s = n), (i = m), d
					}
				;(y._events = h),
					(y.listeners = function (t) {
						var e,
							r,
							n,
							i,
							s,
							o,
							l,
							u,
							f = m(t) ? t : t.split(a),
							p = h,
							c = [p],
							d = []
						for (i = 0, s = f.length; i < s; i++) {
							for (u = [], o = 0, l = c.length; o < l; o++)
								for (r = [(p = c[o].n)[f[i]], p['*']], n = 2; n--; )
									(e = r[n]) && (u.push(e), (d = d.concat(e.f || [])))
							c = u
						}
						return d
					}),
					(y.separator = function (t) {
						t ? ((t = '[' + (t = d(t).replace(/(?=[\.\^\]\[\-])/g, '\\')) + ']'), (a = new RegExp(t))) : (a = /[\.\/]/)
					}),
					(y.on = function (t, e) {
						if ('function' != typeof e) return function () {}
						for (var r = m(t) ? (m(t[0]) ? t : [t]) : d(t).split(l), n = 0, i = r.length; n < i; n++)
							!(function (t) {
								for (var r, n = m(t) ? t : d(t).split(a), i = h, s = 0, o = n.length; s < o; s++)
									i = ((i = i.n).hasOwnProperty(n[s]) && i[n[s]]) || (i[n[s]] = { n: {} })
								for (i.f = i.f || [], s = 0, o = i.f.length; s < o; s++)
									if (i.f[s] == e) {
										r = !0
										break
									}
								!r && i.f.push(e)
							})(r[n])
						return function (t) {
							;+t == +t && (e.zIndex = +t)
						}
					}),
					(y.f = function (t) {
						var e = [].slice.call(arguments, 1)
						return function () {
							y.apply(null, [t, null].concat(e).concat([].slice.call(arguments, 0)))
						}
					}),
					(y.stop = function () {
						s = 1
					}),
					(y.nt = function (t) {
						var e = m(i) ? i.join('.') : i
						return t ? new RegExp('(?:\\.|\\/|^)' + t + '(?:\\.|\\/|$)').test(e) : e
					}),
					(y.nts = function () {
						return m(i) ? i : i.split(a)
					}),
					(y.off = y.unbind = function (t, e) {
						if (t) {
							var r = m(t) ? (m(t[0]) ? t : [t]) : d(t).split(l)
							if (r.length > 1) for (var n = 0, i = r.length; n < i; n++) y.off(r[n], e)
							else {
								r = m(t) ? t : d(t).split(a)
								var s,
									u,
									f,
									p,
									c,
									v = [h],
									g = []
								for (n = 0, i = r.length; n < i; n++)
									for (p = 0; p < v.length; p += f.length - 2) {
										if (((f = [p, 1]), (s = v[p].n), '*' != r[n]))
											s[r[n]] && (f.push(s[r[n]]), g.unshift({ n: s, name: r[n] }))
										else for (u in s) s[o](u) && (f.push(s[u]), g.unshift({ n: s, name: u }))
										v.splice.apply(v, f)
									}
								for (n = 0, i = v.length; n < i; n++)
									for (s = v[n]; s.n; ) {
										if (e) {
											if (s.f) {
												for (p = 0, c = s.f.length; p < c; p++)
													if (s.f[p] == e) {
														s.f.splice(p, 1)
														break
													}
												!s.f.length && delete s.f
											}
											for (u in s.n)
												if (s.n[o](u) && s.n[u].f) {
													var _ = s.n[u].f
													for (p = 0, c = _.length; p < c; p++)
														if (_[p] == e) {
															_.splice(p, 1)
															break
														}
													!_.length && delete s.n[u].f
												}
										} else for (u in (delete s.f, s.n)) s.n[o](u) && s.n[u].f && delete s.n[u].f
										s = s.n
									}
								t: for (n = 0, i = g.length; n < i; n++) {
									for (u in (s = g[n]).n[s.name].f) continue t
									for (u in s.n[s.name].n) continue t
									delete s.n[s.name]
								}
							}
						} else y._events = h = { n: {} }
					}),
					(y.once = function (t, e) {
						var r = function () {
							return y.off(t, r), e.apply(this, arguments)
						}
						return y.on(t, r)
					}),
					(y.version = '0.5.4'),
					(y.toString = function () {
						return 'You are running Eve 0.5.4'
					}),
					(r.eve = y),
					t.exports
						? (t.exports = y)
						: void 0 ===
								(n = function () {
									return y
								}.apply(e, [])) || (t.exports = n)
			})('undefined' != typeof window ? window : this)
		},
		466: function (t, e, r) {
			var n
			!(function () {
				'use strict'
				function i(t, e, r) {
					var n = e.x,
						i = e.y,
						s = r.x - n,
						o = r.y - i
					if (0 !== s || 0 !== o) {
						var a = ((t.x - n) * s + (t.y - i) * o) / (s * s + o * o)
						a > 1 ? ((n = r.x), (i = r.y)) : a > 0 && ((n += s * a), (i += o * a))
					}
					return (s = t.x - n) * s + (o = t.y - i) * o
				}
				function s(t, e) {
					var r = t.length - 1,
						n = [t[0]]
					return (
						(function t(e, r, n, s, o) {
							for (var a, l = s, u = r + 1; u < n; u++) {
								var h = i(e[u], e[r], e[n])
								h > l && ((a = u), (l = h))
							}
							l > s && (a - r > 1 && t(e, r, a, s, o), o.push(e[a]), n - a > 1 && t(e, a, n, s, o))
						})(t, 0, r, e, n),
						n.push(t[r]),
						n
					)
				}
				function o(t, e, r) {
					if (t.length <= 2) return t
					var n = void 0 !== e ? e * e : 1
					return (t = s(
						(t = r
							? t
							: (function (t, e) {
									for (var r, n, i, s, o, a = t[0], l = [a], u = 1, h = t.length; u < h; u++)
										(r = t[u]),
											(i = a),
											(s = void 0),
											(o = void 0),
											(s = (n = r).x - i.x),
											(o = n.y - i.y),
											s * s + o * o > e && (l.push(r), (a = r))
									return a !== r && l.push(r), l
							  })(t, n)),
						n
					))
				}
				void 0 ===
					(n = function () {
						return o
					}.call(e, r, e, t)) || (t.exports = n)
			})()
		},
		475: function (t, e, r) {
			'use strict'
			r.d(e, 'd', function () {
				return d
			}),
				r.d(e, 'a', function () {
					return o
				}),
				r.d(e, 'b', function () {
					return y
				}),
				r.d(e, 'c', function () {
					return _
				})
			function n(t) {
				return void 0 === t
			}
			function i(t, e = 0) {
				return { a: 1, c: 0, e: t, b: 0, d: 1, f: e }
			}
			function s(...t) {
				const e = (t, e) => ({
					a: t.a * e.a + t.c * e.b,
					c: t.a * e.c + t.c * e.d,
					e: t.a * e.e + t.c * e.f + t.e,
					b: t.b * e.a + t.d * e.b,
					d: t.b * e.c + t.d * e.d,
					f: t.b * e.e + t.d * e.f + t.f,
				})
				switch ((t = Array.isArray(t[0]) ? t[0] : t).length) {
					case 0:
						throw new Error('no matrices provided')
					case 1:
						return t[0]
					case 2:
						return e(t[0], t[1])
					default: {
						const [r, n, ...i] = t
						return s(e(r, n), ...i)
					}
				}
			}
			function o(...t) {
				return s(...t)
			}
			const { cos: a, sin: l, PI: u } = Math
			function h(t, e, r) {
				return (function (t, e, r) {
					const o = a(t),
						u = l(t),
						h = { a: o, c: -u, e: 0, b: u, d: o, f: 0 }
					return n(e) || n(r) ? h : s([i(e, r), h, i(-e, -r)])
				})((t * u) / 180, e, r)
			}
			function f(t, e, r, o) {
				n(e) && (e = t)
				const a = { a: t, c: 0, e: 0, b: 0, d: e, f: 0 }
				return n(r) || n(o) ? a : s([i(r, o), a, i(-r, -o)])
			}
			const { tan: p } = Math
			function c(t, e) {
				return (function (t, e) {
					return { a: 1, c: p(t), e: 0, b: p(e), d: 1, f: 0 }
				})((t * Math.PI) / 180, (e * Math.PI) / 180)
			}
			function d(t) {
				return m(t)
			}
			function m(t) {
				return `matrix(${t.a},${t.b},${t.c},${t.d},${t.e},${t.f})`
			}
			function y(t) {
				return Array.isArray(t) ? t.map(e) : e(t)
				function e(t) {
					switch (t.type) {
						case 'matrix':
							if ('a' in t && 'b' in t && 'c' in t && 'd' in t && 'e' in t && 'f' in t)
								return (
									(n = t),
									{
										a: parseFloat(n.a),
										b: parseFloat(n.b),
										c: parseFloat(n.c),
										d: parseFloat(n.d),
										e: parseFloat(n.e),
										f: parseFloat(n.f),
									}
								)
							throw new Error('MISSING_MANDATORY_PARAM')
						case 'translate':
							if (!('tx' in t)) throw new Error('MISSING_MANDATORY_PARAM')
							return 'ty' in t ? i(t.tx, t.ty) : i(t.tx)
						case 'scale':
							if (!('sx' in t)) throw new Error('MISSING_MANDATORY_PARAM')
							return 'sy' in t ? f(t.sx, t.sy) : f(t.sx)
						case 'rotate':
							if (!('angle' in t)) throw new Error('MISSING_MANDATORY_PARAM')
							return 'cx' in t && 'cy' in t ? h(t.angle, t.cx, t.cy) : h(t.angle)
						case 'skewX':
							if (!('angle' in t)) throw new Error('MISSING_MANDATORY_PARAM')
							return c(t.angle, 0)
						case 'skewY':
							if (!('angle' in t)) throw new Error('MISSING_MANDATORY_PARAM')
							return c(0, t.angle)
						case 'shear':
							if (!('shx' in t) || !('shy' in t)) throw new Error('MISSING_MANDATORY_PARAM')
							return (e = t.shx), (r = t.shy), { a: 1, c: e, e: 0, b: r, d: 1, f: 0 }
						default:
							throw new Error('UNSUPPORTED_DESCRIPTOR')
					}
					var e, r, n
				}
			}
			function v(t, e, r, n) {
				;(this.message = t),
					(this.expected = e),
					(this.found = r),
					(this.location = n),
					(this.name = 'SyntaxError'),
					'function' == typeof Error.captureStackTrace && Error.captureStackTrace(this, v)
			}
			function g(t, e) {
				e = void 0 !== e ? e : {}
				var r,
					n = {},
					i = { transformList: Y },
					s = Y,
					o = /^[eE]/,
					a = /^[+\-]/,
					l = /^[0-9]/,
					u = /^[ \t\r\n]/,
					h = T('matrix', !1),
					f = T('(', !1),
					p = T(')', !1),
					c = T('translate', !1),
					d = T('scale', !1),
					m = T('rotate', !1),
					y = T('skewX', !1),
					g = T('skewY', !1),
					_ = T(',', !1),
					x = O('fractionalConstant'),
					P = k(['e', 'E'], !1, !1),
					b = k(['+', '-'], !1, !1),
					C = k([['0', '9']], !1, !1),
					w = k([' ', '\t', '\r', '\n'], !1, !1),
					E = 0,
					I = [{ line: 1, column: 1 }],
					A = [],
					S = 0
				if ('startRule' in e) {
					if (!(e.startRule in i)) throw new Error('Can\'t start parsing from rule "' + e.startRule + '".')
					s = i[e.startRule]
				}
				function T(t, e) {
					return { type: 'literal', text: t, ignoreCase: e }
				}
				function k(t, e, r) {
					return { type: 'class', parts: t, inverted: e, ignoreCase: r }
				}
				function O(t) {
					return { type: 'other', description: t }
				}
				function L(e) {
					var r,
						n = I[e]
					if (n) return n
					for (r = e - 1; !I[r]; ) r--
					for (n = { line: (n = I[r]).line, column: n.column }; r < e; )
						10 === t.charCodeAt(r) ? (n.line++, (n.column = 1)) : n.column++, r++
					return (I[e] = n), n
				}
				var B = 'string' == typeof e.filename && e.filename.length > 0
				function F(t, r) {
					var n = {}
					B && (n.filename = e.filename)
					var i = L(t)
					n.start = { offset: t, line: i.line, column: i.column }
					var s = L(r)
					return (n.end = { offset: r, line: s.line, column: s.column }), n
				}
				function N(t) {
					var e = A[A.length - 1]
					E < e.pos || (E > e.pos && ((e.pos = E), (e.variants = [])), e.variants.push(t))
				}
				function D(t, e, r) {
					return new v(v.buildMessage(t, e), t, e, r)
				}
				function Y() {
					var t, e, r, i, s
					for (t = E, e = [], r = H(); r !== n; ) e.push(r), (r = H())
					for (
						(r = (function t() {
							var e, r, i, s
							if (((e = E), (r = X()) !== n)) {
								if (((i = []), (s = z()) !== n)) for (; s !== n; ) i.push(s), (s = z())
								else i = n
								i !== n && (s = t()) !== n ? (e, (o = s), (e = r.concat(o))) : ((E = e), (e = n))
							} else (E = e), (e = n)
							var o
							e === n && (e = X())
							return e
						})()) === n && (r = null),
							i = [],
							s = H();
						s !== n;

					)
						i.push(s), (s = H())
					return t, (t = r)
				}
				function X() {
					var e
					return (
						(e = (function () {
							var e,
								r,
								i,
								s,
								o,
								a,
								l,
								u,
								c,
								d,
								m,
								y,
								v,
								g = function (t) {
									0 === S && N(t)
								}
							;(e = E), g(h), 'matrix' === t.substr(E, 6) ? ((r = 'matrix'), (E += 6)) : (r = n)
							if (r !== n) {
								for (i = [], s = H(); s !== n; ) i.push(s), (s = H())
								if ((g(f), 40 === t.charCodeAt(E) ? ((s = '('), E++) : (s = n), s !== n)) {
									for (o = [], a = H(); a !== n; ) o.push(a), (a = H())
									if ((a = R()) !== n)
										if (z() !== n)
											if ((l = R()) !== n)
												if (z() !== n)
													if ((u = R()) !== n)
														if (z() !== n)
															if ((c = R()) !== n)
																if (z() !== n)
																	if ((d = R()) !== n)
																		if (z() !== n)
																			if ((m = R()) !== n) {
																				for (y = [], v = H(); v !== n; ) y.push(v), (v = H())
																				g(p),
																					41 === t.charCodeAt(E) ? ((v = ')'), E++) : (v = n),
																					v !== n
																						? (e, (e = [{ type: 'matrix', a: a, b: l, c: u, d: c, e: d, f: m }]))
																						: ((E = e), (e = n))
																			} else (E = e), (e = n)
																		else (E = e), (e = n)
																	else (E = e), (e = n)
																else (E = e), (e = n)
															else (E = e), (e = n)
														else (E = e), (e = n)
													else (E = e), (e = n)
												else (E = e), (e = n)
											else (E = e), (e = n)
										else (E = e), (e = n)
									else (E = e), (e = n)
								} else (E = e), (e = n)
							} else (E = e), (e = n)
							return e
						})()) === n &&
							(e = (function () {
								var e,
									r,
									i,
									s,
									o,
									a,
									l,
									u,
									h,
									d = function (t) {
										0 === S && N(t)
									}
								;(e = E), d(c), 'translate' === t.substr(E, 9) ? ((r = 'translate'), (E += 9)) : (r = n)
								if (r !== n) {
									for (i = [], s = H(); s !== n; ) i.push(s), (s = H())
									if ((d(f), 40 === t.charCodeAt(E) ? ((s = '('), E++) : (s = n), s !== n)) {
										for (o = [], a = H(); a !== n; ) o.push(a), (a = H())
										if ((a = R()) !== n) {
											for ((l = M()) === n && (l = null), u = [], h = H(); h !== n; ) u.push(h), (h = H())
											d(p),
												41 === t.charCodeAt(E) ? ((h = ')'), E++) : (h = n),
												h !== n
													? (e, (y = { type: 'translate', tx: a }), (m = l) && (y.ty = m), (e = [y]))
													: ((E = e), (e = n))
										} else (E = e), (e = n)
									} else (E = e), (e = n)
								} else (E = e), (e = n)
								var m, y
								return e
							})()) === n &&
							(e = (function () {
								var e,
									r,
									i,
									s,
									o,
									a,
									l,
									u,
									h,
									c = function (t) {
										0 === S && N(t)
									}
								;(e = E), c(d), 'scale' === t.substr(E, 5) ? ((r = 'scale'), (E += 5)) : (r = n)
								if (r !== n) {
									for (i = [], s = H(); s !== n; ) i.push(s), (s = H())
									if ((c(f), 40 === t.charCodeAt(E) ? ((s = '('), E++) : (s = n), s !== n)) {
										for (o = [], a = H(); a !== n; ) o.push(a), (a = H())
										if ((a = R()) !== n) {
											for ((l = M()) === n && (l = null), u = [], h = H(); h !== n; ) u.push(h), (h = H())
											c(p),
												41 === t.charCodeAt(E) ? ((h = ')'), E++) : (h = n),
												h !== n
													? (e, (y = { type: 'scale', sx: a }), (m = l) && (y.sy = m), (e = [y]))
													: ((E = e), (e = n))
										} else (E = e), (e = n)
									} else (E = e), (e = n)
								} else (E = e), (e = n)
								var m, y
								return e
							})()) === n &&
							(e = (function () {
								var e,
									r,
									i,
									s,
									o,
									a,
									l,
									u,
									h,
									c = function (t) {
										0 === S && N(t)
									}
								;(e = E), c(m), 'rotate' === t.substr(E, 6) ? ((r = 'rotate'), (E += 6)) : (r = n)
								if (r !== n) {
									for (i = [], s = H(); s !== n; ) i.push(s), (s = H())
									if ((c(f), 40 === t.charCodeAt(E) ? ((s = '('), E++) : (s = n), s !== n)) {
										for (o = [], a = H(); a !== n; ) o.push(a), (a = H())
										if ((a = R()) !== n) {
											for (
												(l = (function () {
													var t, e, r
													;(t = E),
														z() !== n && (e = R()) !== n && z() !== n && (r = R()) !== n
															? (t, (t = [e, r]))
															: ((E = t), (t = n))
													return t
												})()) === n && (l = null),
													u = [],
													h = H();
												h !== n;

											)
												u.push(h), (h = H())
											c(p),
												41 === t.charCodeAt(E) ? ((h = ')'), E++) : (h = n),
												h !== n
													? (e,
													  (y = { type: 'rotate', angle: a }),
													  (d = l) && ((y.cx = d[0]), (y.cy = d[1])),
													  (e = [y]))
													: ((E = e), (e = n))
										} else (E = e), (e = n)
									} else (E = e), (e = n)
								} else (E = e), (e = n)
								var d, y
								return e
							})()) === n &&
							(e = (function () {
								var e,
									r,
									i,
									s,
									o,
									a,
									l,
									u,
									h = function (t) {
										0 === S && N(t)
									}
								;(e = E), h(y), 'skewX' === t.substr(E, 5) ? ((r = 'skewX'), (E += 5)) : (r = n)
								if (r !== n) {
									for (i = [], s = H(); s !== n; ) i.push(s), (s = H())
									if ((h(f), 40 === t.charCodeAt(E) ? ((s = '('), E++) : (s = n), s !== n)) {
										for (o = [], a = H(); a !== n; ) o.push(a), (a = H())
										if ((a = R()) !== n) {
											for (l = [], u = H(); u !== n; ) l.push(u), (u = H())
											h(p),
												41 === t.charCodeAt(E) ? ((u = ')'), E++) : (u = n),
												u !== n ? (e, (e = [{ type: 'skewX', angle: a }])) : ((E = e), (e = n))
										} else (E = e), (e = n)
									} else (E = e), (e = n)
								} else (E = e), (e = n)
								return e
							})()) === n &&
							(e = (function () {
								var e,
									r,
									i,
									s,
									o,
									a,
									l,
									u,
									h = function (t) {
										0 === S && N(t)
									}
								;(e = E), h(g), 'skewY' === t.substr(E, 5) ? ((r = 'skewY'), (E += 5)) : (r = n)
								if (r !== n) {
									for (i = [], s = H(); s !== n; ) i.push(s), (s = H())
									if ((h(f), 40 === t.charCodeAt(E) ? ((s = '('), E++) : (s = n), s !== n)) {
										for (o = [], a = H(); a !== n; ) o.push(a), (a = H())
										if ((a = R()) !== n) {
											for (l = [], u = H(); u !== n; ) l.push(u), (u = H())
											h(p),
												41 === t.charCodeAt(E) ? ((u = ')'), E++) : (u = n),
												u !== n ? (e, (e = [{ type: 'skewY', angle: a }])) : ((E = e), (e = n))
										} else (E = e), (e = n)
									} else (E = e), (e = n)
								} else (E = e), (e = n)
								return e
							})()),
						e
					)
				}
				function R() {
					var e, r, i, s
					return (
						(e = E),
						(r = E),
						(i = W()) === n && (i = null),
						(s = (function () {
							var e, r, i
							;(e = E),
								(r = (function () {
									var e, r, i, s
									;(function (t) {
										0 === S && N(t)
									})(x),
										S++,
										(e = E),
										(r = j()) === n && (r = null)
									46 === t.charCodeAt(E) ? ((i = '.'), E++) : (i = n)
									i !== n && (s = j()) !== n
										? (e, (a = s), (e = [(o = r) ? o.join('') : null, '.', a.join('')].join('')))
										: ((E = e), (e = n))
									var o, a
									e === n &&
										((e = E),
										(r = j()) !== n
											? (46 === t.charCodeAt(E) ? ((i = '.'), E++) : (i = n),
											  i !== n ? (e, (e = r.join(''))) : ((E = e), (e = n)))
											: ((E = e), (e = n)))
									return S--, e
								})()) !== n
									? ((i = q()) === n && (i = null), (e = r = [r, i]))
									: ((E = e), (e = n))
							e === n && ((e = E), (r = j()) !== n && (i = q()) !== n ? (e = r = [r, i]) : ((E = e), (e = n)))
							return e
						})()) !== n
							? (r = i = [i, s])
							: ((E = r), (r = n)),
						r !== n && (e, (r = parseFloat(r.join('')))),
						(e = r) === n &&
							((e = E),
							(r = E),
							(i = W()) === n && (i = null),
							(s = (function () {
								var t, e
								;(t = E), (e = j()) !== n && (t, (e = e.join('')))
								return (t = e)
							})()) !== n
								? (r = i = [i, s])
								: ((E = r), (r = n)),
							r !== n && (e, (r = parseInt(r.join('')))),
							(e = r)),
						e
					)
				}
				function M() {
					var t, e
					return (t = E), z() !== n && (e = R()) !== n ? (t, (t = e)) : ((E = t), (t = n)), t
				}
				function z() {
					var t, e, r, i, s
					if (((t = E), (e = []), (r = H()) !== n)) for (; r !== n; ) e.push(r), (r = H())
					else e = n
					if (e !== n) {
						for ((r = U()) === n && (r = null), i = [], s = H(); s !== n; ) i.push(s), (s = H())
						t = e = [e, r, i]
					} else (E = t), (t = n)
					if (t === n)
						if (((t = E), (e = U()) !== n)) {
							for (r = [], i = H(); i !== n; ) r.push(i), (i = H())
							t = e = [e, r]
						} else (E = t), (t = n)
					return t
				}
				function U() {
					var e
					return (
						(function (t) {
							0 === S && N(t)
						})(_),
						44 === t.charCodeAt(E) ? ((e = ','), E++) : (e = n),
						e
					)
				}
				function q() {
					var e, r, i, s
					return (
						(e = E),
						(function (t) {
							0 === S && N(t)
						})(P),
						o.test(t.charAt(E)) ? ((r = t.charAt(E)), E++) : (r = n),
						r !== n
							? ((i = W()) === n && (i = null), (s = j()) !== n ? (e = r = [r, i, s]) : ((E = e), (e = n)))
							: ((E = e), (e = n)),
						e
					)
				}
				function W() {
					var e
					return (
						(function (t) {
							0 === S && N(t)
						})(b),
						a.test(t.charAt(E)) ? ((e = t.charAt(E)), E++) : (e = n),
						e
					)
				}
				function j() {
					var t, e
					if (((t = []), (e = Z()) !== n)) for (; e !== n; ) t.push(e), (e = Z())
					else t = n
					return t
				}
				function Z() {
					var e
					return (
						(function (t) {
							0 === S && N(t)
						})(C),
						l.test(t.charAt(E)) ? ((e = t.charAt(E)), E++) : (e = n),
						e
					)
				}
				function H() {
					var e
					return (
						(function (t) {
							0 === S && N(t)
						})(w),
						u.test(t.charAt(E)) ? ((e = t.charAt(E)), E++) : (e = n),
						e
					)
				}
				if ((A.push({ pos: E, variants: [] }), (r = s()) !== n && E === t.length)) return r
				throw (
					(r !== n && E < t.length && N({ type: 'end' }),
					(function () {
						var e = A[0],
							r = e.pos
						return D(e.variants, r < t.length ? t.charAt(r) : null, r < t.length ? F(r, r + 1) : F(r, r))
					})())
				)
			}
			!(function (t, e) {
				function r() {
					this.constructor = t
				}
				;(r.prototype = e.prototype), (t.prototype = new r())
			})(v, Error),
				(v.buildMessage = function (t, e) {
					var r = {
						literal: function (t) {
							return '"' + i(t.text) + '"'
						},
						class: function (t) {
							var e = t.parts.map(function (t) {
								return Array.isArray(t) ? s(t[0]) + '-' + s(t[1]) : s(t)
							})
							return '[' + (t.inverted ? '^' : '') + e + ']'
						},
						any: function () {
							return 'any character'
						},
						end: function () {
							return 'end of input'
						},
						other: function (t) {
							return t.description
						},
						not: function (t) {
							return 'not ' + o(t.expected)
						},
					}
					function n(t) {
						return t.charCodeAt(0).toString(16).toUpperCase()
					}
					function i(t) {
						return t
							.replace(/\\/g, '\\\\')
							.replace(/"/g, '\\"')
							.replace(/\0/g, '\\0')
							.replace(/\t/g, '\\t')
							.replace(/\n/g, '\\n')
							.replace(/\r/g, '\\r')
							.replace(/[\x00-\x0F]/g, function (t) {
								return '\\x0' + n(t)
							})
							.replace(/[\x10-\x1F\x7F-\x9F]/g, function (t) {
								return '\\x' + n(t)
							})
					}
					function s(t) {
						return t
							.replace(/\\/g, '\\\\')
							.replace(/\]/g, '\\]')
							.replace(/\^/g, '\\^')
							.replace(/-/g, '\\-')
							.replace(/\0/g, '\\0')
							.replace(/\t/g, '\\t')
							.replace(/\n/g, '\\n')
							.replace(/\r/g, '\\r')
							.replace(/[\x00-\x0F]/g, function (t) {
								return '\\x0' + n(t)
							})
							.replace(/[\x10-\x1F\x7F-\x9F]/g, function (t) {
								return '\\x' + n(t)
							})
					}
					function o(t) {
						return r[t.type](t)
					}
					return (
						'Expected ' +
						(function (t) {
							var e,
								r,
								n = t.map(o)
							if ((n.sort(), n.length > 0)) {
								for (e = 1, r = 1; e < n.length; e++) n[e - 1] !== n[e] && ((n[r] = n[e]), r++)
								n.length = r
							}
							switch (n.length) {
								case 1:
									return n[0]
								case 2:
									return n[0] + ' or ' + n[1]
								default:
									return n.slice(0, -1).join(', ') + ', or ' + n[n.length - 1]
							}
						})(t) +
						' but ' +
						(function (t) {
							return t ? '"' + i(t) + '"' : 'end of input'
						})(e) +
						' found.'
					)
				})
			function _(t) {
				return g(t)
			}
		},
		85: function (t, e, r) {
			'use strict'
			e.a = class {
				constructor() {
					this.callbacks = {}
				}
				attach(t, e) {
					t in this.callbacks || (this.callbacks[t] = []), this.callbacks[t].push(e)
				}
				detach(t, e) {
					if (t in this.callbacks) {
						const r = this.callbacks[t].indexOf(e)
						r >= 0 && this.callbacks[t].splice(r, 1)
					}
				}
				dispatch(t, e) {
					if (t in this.callbacks)
						for (let r = 0, n = this.callbacks[t].length; r < n && !1 !== this.callbacks[t][r](e); r++);
				}
			}
		},
	},
])
