/*! For license information please see deamon.js.LICENSE.txt */
!(function (t) {
	var e = {}
	function r(i) {
		if (e[i]) return e[i].exports
		var n = (e[i] = { i: i, l: !1, exports: {} })
		return t[i].call(n.exports, n, n.exports, r), (n.l = !0), n.exports
	}
	;(r.m = t),
		(r.c = e),
		(r.d = function (t, e, i) {
			r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i })
		}),
		(r.r = function (t) {
			'undefined' != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
				Object.defineProperty(t, '__esModule', { value: !0 })
		}),
		(r.t = function (t, e) {
			if ((1 & e && (t = r(t)), 8 & e)) return t
			if (4 & e && 'object' == typeof t && t && t.__esModule) return t
			var i = Object.create(null)
			if ((r.r(i), Object.defineProperty(i, 'default', { enumerable: !0, value: t }), 2 & e && 'string' != typeof t))
				for (var n in t)
					r.d(
						i,
						n,
						function (e) {
							return t[e]
						}.bind(null, n)
					)
			return i
		}),
		(r.n = function (t) {
			var e =
				t && t.__esModule
					? function () {
							return t.default
					  }
					: function () {
							return t
					  }
			return r.d(e, 'a', e), e
		}),
		(r.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e)
		}),
		(r.p = '/'),
		r((r.s = 408))
})({
	11: function (t, e, r) {
		'use strict'
		var i = r(20),
			n = r(5),
			s = r(22),
			o = r(31),
			a = r(4)
		class l extends s.a {
			constructor(t = {}, e = !1) {
				;(t.type = t.type || 'ShapeLoop'),
					super(t),
					(this.shapeLoopPropsDependencies = (t.shapeLoopPropsDependencies || []).concat('bAdaptBuffer')),
					(this.props.loop = t.loop),
					e ||
						((this.loop = { start: 0, end: l.PI2, inc: l.PI2, vertex: () => a.a.ZERO }),
						(this.bStaticLoop = this.isStaticLoop()),
						(this.bStatic = this.isStatic()),
						(this.bStaticIndexed = this.isStaticIndexed()))
			}
			isStaticLoop() {
				if ('function' == typeof this.vertexCallback) return !1
				if (this.shapeLoopPropsDependencies.indexOf('prop_arguments') >= 0) return !1
				for (let t = 0, e = this.shapeLoopPropsDependencies.length; t < e; t++)
					if ('function' == typeof this.props[this.shapeLoopPropsDependencies[t]]) return !1
				return !0
			}
			isStatic() {
				return this.bStaticLoop && super.isStatic()
			}
			isStaticIndexed() {
				return this.bStaticLoop && super.isStaticIndexed()
			}
			clearBuffer(t = !1, e = !0) {
				super.clearBuffer(t, e), (this.bStaticLoop = this.isStaticLoop()), t && (this.loop_buffer = void 0)
			}
			setProp(t, e) {
				let r = !1
				t = 'string' == typeof t ? { [t]: e } : t
				for (let e = this.shapeLoopPropsDependencies.length - 1; e >= 0; e--)
					if (this.shapeLoopPropsDependencies[e] in t) {
						r = !0
						break
					}
				'loop' in t && ((t.loop = Object.assign(Object.assign({}, this.props.loop), t.loop)), (r = !0)),
					super.setProp(t, e, r)
			}
			getProp(t, e, r) {
				return super.getProp(t, e, r)
			}
			getBufferLength(t) {
				if (this.bStatic && this.buffer && this.buffer.length > 0) return this.buffer.length
				if (this.bStaticLoop && this.loop_buffer && this.loop_buffer.length > 0)
					return this.loop_buffer.length * this.getRepetitionCount()
				const { repetition: e } = this.getLoop(t)
				return this.getRepetitionCount() * e * 2
			}
			generateBuffer(t, e) {
				return (
					this.bindSideLength(e),
					this.bStaticLoop
						? (void 0 === this.loop_buffer && (this.loop_buffer = this.generateLoopBuffer(e)), this.loop_buffer)
						: this.generateLoopBuffer(e)
				)
			}
			generateLoopBuffer(t) {
				const { start: e, end: r, inc: o, repetition: a } = this.getLoop(t),
					l = this.props.loop && this.props.loop.vertex ? this.props.loop.vertex : this.loop.vertex,
					h = {
						current_index: 1,
						current_offset: 0,
						current_angle: 0,
						current_col: 1,
						current_row: 1,
						current_col_offset: 0,
						current_row_offset: 0,
						type: i.a.Loop,
						count: a,
						count_col: 1,
						count_row: 1,
					},
					u = h.count
				t.shape_loop = h
				const c = new Float32Array(2 * u)
				for (let i = 0, n = 0; i < u; i++, n += 2) {
					const s = e + o * i
					;(h.current_angle = s >= r ? r : s), (h.current_index = i + 1), (h.current_offset = h.current_index / h.count)
					const a = Float32Array.from(l(h.current_angle, t))
					this.vertexCallback && this.vertexCallback(a, t, i, u), (c[n] = a[0]), (c[n + 1] = a[1])
				}
				return this.props.bAdaptBuffer != n.a.None ? s.a.adaptBuffer(c, this.props.bAdaptBuffer) : c
			}
			getLoop(t = o.a.EMPTY_PROP_ARGUMENTS) {
				var e, r, i, n, s, a
				t.time = this.scene ? this.scene.current_time : 1
				let l =
						null !== (r = null === (e = this.props.loop) || void 0 === e ? void 0 : e.start) && void 0 !== r
							? r
							: this.loop.start,
					h =
						null !== (n = null === (i = this.props.loop) || void 0 === i ? void 0 : i.end) && void 0 !== n
							? n
							: this.loop.end,
					u =
						null !== (a = null === (s = this.props.loop) || void 0 === s ? void 0 : s.inc) && void 0 !== a
							? a
							: this.loop.inc
				;(l = 'function' == typeof l ? l(t) : l),
					(h = 'function' == typeof h ? h(t) : h),
					(u = 'function' == typeof u ? u(t) : u)
				const c = Math.ceil((h - l) / u)
				return { start: l, end: h, inc: u, repetition: c < 0 ? 0 : c }
			}
			setShape(t) {
				this.setProp('loop', t)
			}
		}
		;(l.PI2 = 2 * Math.PI),
			(l.PId2 = Math.PI / 2),
			(l.PId4 = Math.PI / 4),
			(l.PI4 = 4 * Math.PI),
			(l.EMPTY_PROP_ARGUMENTS = {
				time: 1,
				repetition: o.a.getEmptyRepetition(),
				shape_loop: {
					type: i.a.Loop,
					current_index: 0,
					current_offset: 0,
					current_angle: 0,
					current_row: 0,
					current_col: 0,
					current_col_offset: 0,
					current_row_offset: 0,
					count: 0,
					count_col: 0,
					count_row: 0,
				},
			}),
			(e.a = l)
	},
	115: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(45)
		;(e.randomString = (t = 10, e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => {
			let r = ''
			for (let n = 0; n < t; n++) r += e.charAt(i.randomInt(0, e.length - 1))
			return r
		}),
			(e.ucfirst = t => t.charAt(0).toUpperCase() + t.slice(1)),
			(e.toCamelCase = t =>
				t
					? t
							.replace(/[^A-Z0-9]+/gi, '')
							.replace(/\s(.)/g, t => t.toUpperCase())
							.replace(/\s/g, '')
							.replace(/^(.)/, t => t.toLowerCase())
					: ''),
			(e.pluralize = (t, e, r, i) => {
				switch ((t = t.length ? t.length : t)) {
					case 0:
						return e
					case 1:
						return r
					default:
						return i
				}
			})
	},
	116: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(63),
			n = r(367),
			s = r(115),
			o = r(45),
			a = r(368)
		class l extends i.default {
			constructor(
				t = a.DEFAULT_MODULAR_SCALE_BASE,
				e = a.DEFAULT_MODULAR_SCALE_UNIT,
				r = a.DEFAULT_MODULAR_SCALE_RATIO,
				i = a.DEFAULT_MODULAR_SCALE_ROOT_BASE
			) {
				super(),
					(this.exportableProperties = ['base', 'unit', 'ratio']),
					this.setBase(t),
					this.setUnit(e),
					this.setRatio(r),
					this.setRootBase(i)
			}
			setRootBase(t) {
				if (t.indexOf('px') < 0) throw new n.RootBaseNotValidException()
				this.rootBase = parseFloat(t)
			}
			getRootBase(t) {
				return t ? this.rootBase + 'px' : this.rootBase
			}
			setBase(t) {
				this.base = 'string' == typeof t ? parseFloat(t) : t
			}
			getBase() {
				return this.base
			}
			setRatio(t) {
				if ('string' == typeof t) {
					if (Object.keys(l.RATIOS).indexOf(t) < 0) throw new n.RatioNotValidException(l.RATIOS)
					this.ratio = l.RATIOS[t]
				} else this.ratio = t
			}
			getRatio() {
				return this.ratio
			}
			setUnit(t) {
				if (l.getUnits().indexOf(t) < 0) throw new n.UnitNotValidException(t, l.UNITS)
				this.unit = t
			}
			getUnit() {
				return this.unit
			}
			get(t) {
				return l.get(t, this.base, this.unit, this.ratio)
			}
			static get(t, e, r, i) {
				let n = e
				for (let e = Math.abs(t); e > 0; e--) n = t > 0 ? n * i : n / i
				return n + r
			}
			static getUnits() {
				return l.UNITS
			}
			static getUnitFromString(t, e) {
				if ('string' == typeof t) {
					const e = t.replace(parseFloat(t).toString(), '').toLowerCase()
					return l.UNITS.indexOf(e) >= 0 ? e : a.DEFAULT_MODULAR_SCALE_UNIT
				}
				return e || a.DEFAULT_MODULAR_SCALE_UNIT
			}
			operation(t, e) {
				const r = e.length,
					i = this.getUnit(),
					n = this.resolveValue(e[0], i)
				let s = parseFloat(n)
				for (let n = 1; n < r; n++) {
					const r = this.resolveValue(e[n], i)
					switch (t) {
						case '+':
							s += parseFloat(r)
							break
						case '-':
							s -= parseFloat(r)
							break
						case '*':
							s *= parseFloat(r)
							break
						case '/':
							s /= parseFloat(r)
					}
				}
				return s + i
			}
			resolveValue(t, e) {
				if ('number' == typeof t) return this.get(t)
				const r = l.getUnitFromString(t)
				if (!e || r != e) {
					return this[`${r}To${s.ucfirst(e)}`](t)
				}
				return t
			}
			add(...t) {
				return this.operation('+', t)
			}
			sub(...t) {
				return this.operation('-', t)
			}
			mul(...t) {
				return this.operation('*', t)
			}
			div(...t) {
				return this.operation('/', t)
			}
			static fib(t = null) {
				return t <= 2 ? 1 : Math.round(Math.pow(a.PHI, t) / a.SQRT_5)
			}
			static gs(t) {
				return l.GOLDEN_SECTIONS['GLD' + (t - 1)]
			}
			valueToUnit(t, e) {
				return this.resolveValue(t, e)
			}
			remToPx(t) {
				return l.remToPx(t, this.rootBase)
			}
			remToPt(t) {
				return l.remToPt(t, this.rootBase)
			}
			emToPt(t) {
				return l.emToPt(t)
			}
			emToPx(t) {
				return l.emToPx(t)
			}
			pxToRem(t) {
				return l.pxToRem(t, this.rootBase)
			}
			pxToEm(t) {
				return l.pxToEm(t)
			}
			pxToPt(t) {
				return l.pxToPt(t)
			}
			ptToPx(t) {
				return l.ptToPx(t)
			}
			ptToRem(t) {
				return l.ptToRem(t, this.rootBase)
			}
			ptToEm(t) {
				return l.ptToEm(t)
			}
			static remToPx(t, e) {
				return o.fix(o.fix(t) * e) + 'px'
			}
			static remToPt(t, e) {
				return l.pxToPt(l.remToPx(t, e))
			}
			static emToPt(t) {
				return l.pxToPt(l.emToPx(t))
			}
			static emToPx(t) {
				return o.fix(16 * o.fix(t)) + 'px'
			}
			static pxToRem(t, e) {
				return o.fix(t) / e + 'rem'
			}
			static pxToEm(t) {
				return o.fix(t) / 16 + 'em'
			}
			static pxToPt(t) {
				return 0.75 * o.fix(t) + 'pt'
			}
			static ptToPx(t) {
				return o.fix(t) * (12 / 9) + 'px'
			}
			static ptToRem(t, e) {
				return l.pxToRem(l.ptToPx(t), e)
			}
			static ptToEm(t) {
				return l.pxToEm(l.ptToPx(t))
			}
		}
		;(l.UNITS = ['', 'em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax']),
			(l.RATIOS = {
				MINOR_SECOND: 1.067,
				MAJOR_SECOND: 1.125,
				MINOR_THIRD: 1.2,
				MAJOR_THIRD: 1.25,
				PERFECT_FOURTH: 1.333,
				AUGMENTED_FOURTH: 1.414,
				PERFECT_FIFTH: 1.5,
				MINOR_SIXTH: 1.6,
				PHI: a.PHI,
				GOLDEN: a.PHI,
				MAJOR_SIXTH: 1.667,
				MINOR_SEVENTH: 1.778,
				MAJOR_SEVENTH: 1.875,
				OCTAVE: 2,
				MAJOR_TENTH: 2.5,
				MAJOR_ELEVENTH: 2.667,
				MAJOR_TWELFTH: 3,
				DOUBLE_OCTAVE: 4,
			}),
			(l.GOLDEN_SECTIONS = {
				GLD10: a.GLD10,
				GLD9: a.GLD9,
				GLD8: a.GLD8,
				GLD7: a.GLD7,
				GLD6: a.GLD6,
				GLD5: a.GLD5,
				GLD4: a.GLD4,
				GLD3: a.GLD3,
				GLD2: a.GLD2,
				GLD1: a.GLD1,
			}),
			(e.default = l)
	},
	119: function (t, e) {
		var r
		r = (function () {
			return this
		})()
		try {
			r = r || new Function('return this')()
		} catch (t) {
			'object' == typeof window && (r = window)
		}
		t.exports = r
	},
	120: function (t, e, r) {
		'use strict'
		const i = {
			app_name: 'Mandala',
			app_version: '0.1',
			file_extension: 'ext',
			autosave_interval: 5e3,
			empty_project_name: 'Empty_Project',
			getDocumentProjectTitle: t => (t || i.empty_project_name) + ' ∴ ' + i.app_name,
		}
		e.a = i
	},
	122: function (t, e, r) {
		'use strict'
		r.d(e, 'a', function () {
			return i
		})
		const i = () => (performance && performance.now ? performance.now() : Date.now())
	},
	126: function (t, e, r) {
		'use strict'
		class i {
			static export(t) {
				return JSON.stringify(t, i.sanitizeProject)
			}
			static sanitizeProject(t, e) {
				switch (t) {
					case 'open_layer_properties':
						return
					case 'selected_layers':
					case 'history':
						return []
					case 'ui':
						return Object.assign(Object.assign({}, e), { props: {} })
					case 'parent':
						return
					default:
						return e
				}
			}
		}
		e.a = i
	},
	160: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(161),
			n = r(63),
			s = r(365),
			o = r(366)
		class a extends n.default {
			constructor(t) {
				super(),
					(this.exportableProperties = ['colors', 'format']),
					(this.colors = []),
					(this.tags = {}),
					(this.format = t && t.format ? t.format : o.DEFAULT_COLOR_FORMAT),
					t &&
						t.colors &&
						t.colors.forEach(t => {
							this.addColor(t.value, t.name, t.tags, t.id)
						})
			}
			getFormat() {
				return this.format
			}
			setFormat(t) {
				if (a.FORMATS.indexOf(t) < 0) throw new s.FormatNotValidException(t, a.FORMATS)
				this.format = t
			}
			static getFormats() {
				return a.FORMATS
			}
			setColors(t) {
				;(this.colors = []), t && t.length && t.forEach(t => this.addColor(t.name, t.value, t.tags, t.id))
			}
			getColors(t = !1) {
				return t
					? this.colors.map(t => ({
							id: t.getId(),
							name: t.getName(),
							ccName: t.getCcName(),
							value: t.toString(),
							tags: t.getTags(),
					  }))
					: [...this.colors]
			}
			getIndex(t) {
				for (let e = this.colors.length - 1; e >= 0; e--) if (this.colors[e].getId() === t.getId()) return e
				return -1
			}
			addColor(t, e, r = [], n) {
				const s = new i.default(t, e, r, n, this.getFormat())
				this.colors.push(s),
					r.forEach(t => {
						t in this.tags ? this.tags[t].push(s) : (this.tags[t] = [s])
					})
			}
			getTags() {
				return this.tags
			}
			getAllColorsByTag(t) {
				if (void 0 === this.tags[t]) throw new s.TagNotFoundException(t)
				return this.tags[t]
			}
			find(t) {
				for (let e = this.colors.length - 1; e >= 0; e--) if (this.colors[e].getId() == t) return this.colors[e]
				throw new s.ColorNotFoundException(t)
			}
			get(t, e) {
				for (let e = this.colors.length - 1; e >= 0; e--)
					if (this.colors[e].getName() == t || this.colors[e].getCcName() == t) return this.colors[e]
				throw new s.ColorNotFoundException(`Il colore '${t}' non è stato trovato`)
			}
			updateColor(t) {
				const e = this.getIndex(t)
				if (e >= 0) return this.colors[e].setName(t.getName()), this.colors[e].setValue(t.getValue(this.format)), !0
			}
			removeColor(t) {
				this.colors.splice(this.getIndex(t), 1)
			}
		}
		;(a.FORMATS = ['rgb', 'rgba', 'hsl', 'hsla', 'hsv', 'hsva', 'hex', 'cmyk']), (e.default = a)
	},
	161: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(45),
			n = r(38),
			s = r(361)
		class o extends s.default {
			constructor(t, e = '', r = [], i, s) {
				super(t, e, r, i, s)
				let o = this.value.getRgb()
				;(this.brightness = (299 * o.r + 587 * o.g + 114 * o.b) / 1e3),
					(this.isDark = this.brightness < 128),
					(this.isLight = !this.isDark),
					(o = n.map(o, t => (t / 255 <= 0.03928 ? t / 255 / 12.92 : Math.pow((t / 255 + 0.055) / 1.055, 2.4)))),
					(this.luminance = 0.2126 * o.r + 0.7152 * o.g + 0.0722 * o.b)
			}
			create(t, e) {
				return new o(t, e, this.getTags(), null, this.format)
			}
			alpha(t, e) {
				const r = this.value.getRgb()
				return (r.a = t), this.create(r, e || this.getName() + '--alpha-' + 100 * t)
			}
			desaturate(t = 10, e) {
				const r = this.value.getHsl()
				return (r.s = i.clamp01(r.s - t / 100)), this.create(r, e || this.getName() + '--desaturate-' + t)
			}
			saturate(t = 10) {
				const e = this.value.getHsl()
				return (e.s = i.clamp01(e.s + t / 100)), this.create(e, this.getName() + '--saturate-' + t)
			}
			greyscale() {
				return this.desaturate(100, this.getName() + '--greyscale')
			}
			lighten(t = 10) {
				let e = this.value.getHsl()
				return (e.l = i.clamp01(e.l + t / 100)), this.create(e, this.getName() + '--lighten-' + t)
			}
			brighten(t = 10) {
				const e = n.map(this.value.getRgb(), e => i.clamp(0, 255, e - Math.round((-t / 100) * 255)))
				return this.create(e, this.getName() + '--brighten-' + t)
			}
			darken(t = 10) {
				const e = this.value.getHsl()
				return (e.l = i.clamp01(e.l - t / 100)), this.create(e, this.getName() + '--darken-' + t)
			}
			spin(t, e) {
				const r = this.value.getHsl()
				return (
					(r.h *= 360),
					(r.h = (r.h + t) % 360),
					(r.h = (r.h < 0 ? 360 + r.h : r.h) / 360),
					this.create(r, e || this.getName() + '--spin-' + t)
				)
			}
			complement() {
				return this.spin(180, this.getName() + '--complement')
			}
			triad() {
				return [this, this.spin(120, this.getName() + '--traid-120'), this.spin(240, this.getName() + '--traid-240')]
			}
			tetrad() {
				return [
					this,
					this.spin(90, this.getName() + '--traid-90'),
					this.spin(180, this.getName() + '--traid-180'),
					this.spin(270, this.getName() + '--traid-270'),
				]
			}
			splitcomplement() {
				return [this, this.spin(72, this.getName() + '--complment-1'), this.spin(216, this.getName() + '--complment-2')]
			}
			analogous(t = 6, e = 30) {
				const r = this.value.getHsl(),
					i = 360 / e,
					n = []
				for (r.h = (r.h - ((i * t) >> 1) + 720) % 360; --t; )
					(r.h = (r.h + i) % 360),
						n.push(
							this.create(Object.assign(Object.assign({}, r), { h: r.h / 360 }), this.getName() + '--analogous-' + t)
						)
				return n.sort((t, e) => (t.brightness > e.brightness ? -1 : 1))
			}
			monochromatic(t = 6) {
				const e = this.value.getHsv(),
					r = [],
					i = 1 / t
				for (; t--; )
					r.push(this.create(Object.assign(Object.assign({}, e), { v: e.v }), this.getName() + '--monochromatic-' + t)),
						(e.v = (e.v + i) % 1)
				return r.sort((t, e) => (t.luminance > e.luminance ? 1 : -1))
			}
		}
		e.default = o
	},
	162: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(63),
			n = r(116),
			s = r(45)
		class o extends i.default {
			constructor(t, e, r, i) {
				super(),
					(this.exportableProperties = ['fontSize', 'lineHeight', 'lineWidth']),
					(this.modularScale = t || new n.default())
				const s = this.getFontProperties(e, r, i)
				;(this.fontSize = s.fontSize), (this.lineHeight = s.lineHeight), (this.lineWidth = s.lineWidth)
			}
			get ms() {
				return this.modularScale
			}
			getFontSize() {
				return this.fontSize
			}
			getLineHeight() {
				return this.lineHeight
			}
			getLineWidth() {
				return this.lineWidth
			}
			getFontSizeFromLineWidth(t) {
				let e = n.default.getUnitFromString(t)
				return (
					(t = this.modularScale.valueToUnit(t, 'px')),
					this.modularScale.valueToUnit(Math.sqrt(s.fix(t)) / this.modularScale.getRatio() + 'px', e)
				)
			}
			getLineHeightFromFontSizeAndLineWidth(t, e) {
				let r = n.default.getUnitFromString(t)
				;(t = this.modularScale.valueToUnit(t, 'px')), (e = this.modularScale.valueToUnit(e, 'px'))
				const i =
					this.modularScale.getRatio() -
					(1 / (2 * this.modularScale.getRatio())) * (1 - s.fix(e) / Math.pow(s.fix(t) * this.ms.getRatio(), 2))
				return this.modularScale.valueToUnit(s.fix(t) * i + 'px', r)
			}
			getLineWidthFromFontSizeAndLineHeight(t, e) {
				let r = n.default.getUnitFromString(t)
				return (
					(t = this.modularScale.valueToUnit(t, 'px')),
					(e = this.modularScale.valueToUnit(e + '', 'px')),
					this.modularScale.valueToUnit(
						Math.pow(s.fix(t) * this.modularScale.getRatio(), 2) *
							(1 + 2 * this.modularScale.getRatio() * (s.fix(e) / s.fix(t) - this.modularScale.getRatio())) +
							'px',
						r
					)
				)
			}
			getFontProperties(t, e, r) {
				t = t || this.modularScale.getBase() + this.modularScale.getUnit()
				let i,
					o,
					a = n.default.getUnitFromString(t)
				return (
					(t = this.modularScale.valueToUnit(t, 'px')),
					e || r
						? e
							? r
								? ((o = n.default.getUnitFromString(r)), (i = n.default.getUnitFromString(e)))
								: ((i = n.default.getUnitFromString(e)),
								  (o = a),
								  (r = this.getLineWidthFromFontSizeAndLineHeight(t, e)))
							: ((o = n.default.getUnitFromString(r)), (i = a), (e = this.getLineHeightFromFontSizeAndLineWidth(t, r)))
						: ((i = o = a), (e = s.fix(t) * this.modularScale.getRatio() + 'px'), (r = Math.pow(s.fix(e), 2) + 'px')),
					{
						fontSize: this.modularScale.valueToUnit(t, a),
						lineHeight: this.modularScale.valueToUnit(e + '', i),
						lineWidth: this.modularScale.valueToUnit(r, o),
					}
				)
			}
		}
		e.default = o
	},
	165: function (t, e, r) {
		'use strict'
		var i = r(85)
		class n extends i.a {
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
					((this.b_sequence_started = !0), (this.last_tick = 0), this.dispatch('timeline:change_status', n.START))
			}
			pause() {
				this.b_sequence_started && ((this.b_sequence_started = !1), this.dispatch('timeline:change_status', n.PAUSE))
			}
			stop() {
				;(1 != this.current_frame || this.b_sequence_started) &&
					((this.b_sequence_started = !1),
					(this.current_frame = -1),
					(this.last_tick = 0),
					this.dispatch('timeline:progress', { current_frame: this.current_frame, current_time: 0, fps: this.fps }),
					this.dispatch('timeline:change_status', n.STOP))
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
		;(n.START = 'start'), (n.PAUSE = 'pause'), (n.STOP = 'stop'), (e.a = n)
	},
	167: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 }), (e.setErrorCallback = void 0)
		var i,
			n = (function () {
				function t(t, e) {
					for (var r = 0; r < e.length; r++) {
						var i = e[r]
						;(i.enumerable = i.enumerable || !1),
							(i.configurable = !0),
							'value' in i && (i.writable = !0),
							Object.defineProperty(t, i.key, i)
					}
				}
				return function (e, r, i) {
					return r && t(e.prototype, r), i && t(e, i), e
				}
			})(),
			s = r(398),
			o = (i = s) && i.__esModule ? i : { default: i }
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
		var h = void 0
		e.setErrorCallback = function (t) {
			h = t
		}
		o.default.Error = function (t) {
			h && h(t)
		}
		var u = new o.default.Clipper(),
			c = new o.default.ClipperOffset(),
			d = (function () {
				function t() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
						r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
						i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
						n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
						s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4]
					l(this, t),
						(this.paths = e),
						i && (this.paths = this.paths.map(m)),
						n && (this.paths = this.paths.map(y)),
						s && (this.paths = this.paths.map(v)),
						(this.closed = r)
				}
				return (
					n(t, [
						{
							key: '_clip',
							value: function (e) {
								var r = new o.default.PolyTree()
								u.Clear(), u.AddPaths(this.paths, o.default.PolyType.ptSubject, this.closed)
								for (var i = arguments.length, n = Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++) n[s - 1] = arguments[s]
								for (var a = 0; a < n.length; a++) {
									var l = n[a]
									u.AddPaths(l.paths, o.default.PolyType.ptClip, l.closed)
								}
								u.Execute(e, r)
								var h = o.default.Clipper.PolyTreeToPaths(r)
								return new t(h, this.closed)
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
									i = r.jointType,
									n = void 0 === i ? 'jtSquare' : i,
									s = r.endType,
									a = void 0 === s ? 'etClosedPolygon' : s,
									l = r.miterLimit,
									h = void 0 === l ? 2 : l,
									u = r.roundPrecision,
									d = void 0 === u ? 0.25 : u
								c.Clear(), (c.ArcTolerance = d), (c.MiterLimit = h)
								var p = new o.default.Paths()
								return (
									c.AddPaths(this.paths, o.default.JoinType[n], o.default.EndType[a]), c.Execute(p, e), new t(p, !0)
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
									return t ? f(r) : r
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
									return t ? f(r) : r
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
									var i = e[r]
									if (Math.abs(o.default.Clipper.Area(i)) < t) {
										var n = this.paths.indexOf(i)
										this.paths.splice(n, 1)
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
								e && (t = g(t)), r && (t = _(t))
								for (var i = 0; i < this.paths.length; i++) {
									var n = this.pointInPath(i, t),
										s = this.orientation(i)
									if ((!n && s) || (n && !s)) return !1
								}
								return !0
							},
						},
						{
							key: 'pointInPath',
							value: function (t, e) {
								var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
									i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3]
								r && (e = g(e)), i && (e = _(e))
								var n = this.paths[t],
									s = { X: Math.round(e.X), Y: Math.round(e.Y) }
								return o.default.Clipper.PointInPolygon(s, n) > 0
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
									for (var r = new WeakMap(), i = [], n = [], s = 0; s < this.paths.length; s++) {
										var o = this.paths[s]
										if (this.orientation(s)) {
											var a = this.area(s)
											r.set(o, a), i.push(o)
										} else n.push(o)
									}
									i.sort(function (t, e) {
										return r.get(t) - r.get(e)
									})
									var l = !0,
										h = !1,
										u = void 0
									try {
										for (var c, d = i[Symbol.iterator](); !(l = (c = d.next()).done); l = !0) {
											for (
												var p = c.value, f = [p], m = this.paths.indexOf(p), g = [].concat(n), y = 0;
												y < g.length;
												y++
											) {
												var _ = g[y]
												if (this.pointInPath(m, _[0])) {
													f.push(_)
													var v = n.indexOf(_)
													n.splice(v, 1)
												}
											}
											e.push(new t(f, !0))
										}
									} catch (t) {
										;(h = !0), (u = t)
									} finally {
										try {
											!l && d.return && d.return()
										} finally {
											if (h) throw u
										}
									}
								} else {
									var P = !0,
										b = !1,
										x = void 0
									try {
										for (var w, C = this.paths[Symbol.iterator](); !(P = (w = C.next()).done); P = !0) {
											var S = w.value
											e.push(new t([S], !1))
										}
									} catch (t) {
										;(b = !0), (x = t)
									} finally {
										try {
											!P && C.return && C.return()
										} finally {
											if (b) throw x
										}
									}
								}
								return e
							},
						},
						{
							key: 'round',
							value: function () {
								return new t(this.paths.map(y), this.closed)
							},
						},
						{
							key: 'removeDuplicates',
							value: function () {
								return new t(this.paths.map(v), this.closed)
							},
						},
						{
							key: 'mapToLower',
							value: function () {
								return this.paths.map(p)
							},
						},
					]),
					t
				)
			})()
		function p(t) {
			return t.map(f)
		}
		function f(t) {
			return { x: t.X, y: t.Y }
		}
		function m(t) {
			return t.map(g)
		}
		function g(t) {
			return { X: t.x, Y: t.y }
		}
		function y(t) {
			return t.map(_)
		}
		function _(t) {
			var e = t.X,
				r = t.Y
			return { X: Math.round(e), Y: Math.round(r) }
		}
		function v(t) {
			return t.filter(P)
		}
		function P(t, e, r) {
			if (0 === e) return !0
			var i = r[e - 1]
			return !(t.X === i.X && t.Y === i.Y)
		}
		e.default = d
	},
	168: function (t, e) {
		var r,
			i,
			n = (t.exports = {})
		function s() {
			throw new Error('setTimeout has not been defined')
		}
		function o() {
			throw new Error('clearTimeout has not been defined')
		}
		function a(t) {
			if (r === setTimeout) return setTimeout(t, 0)
			if ((r === s || !r) && setTimeout) return (r = setTimeout), setTimeout(t, 0)
			try {
				return r(t, 0)
			} catch (e) {
				try {
					return r.call(null, t, 0)
				} catch (e) {
					return r.call(this, t, 0)
				}
			}
		}
		!(function () {
			try {
				r = 'function' == typeof setTimeout ? setTimeout : s
			} catch (t) {
				r = s
			}
			try {
				i = 'function' == typeof clearTimeout ? clearTimeout : o
			} catch (t) {
				i = o
			}
		})()
		var l,
			h = [],
			u = !1,
			c = -1
		function d() {
			u && l && ((u = !1), l.length ? (h = l.concat(h)) : (c = -1), h.length && p())
		}
		function p() {
			if (!u) {
				var t = a(d)
				u = !0
				for (var e = h.length; e; ) {
					for (l = h, h = []; ++c < e; ) l && l[c].run()
					;(c = -1), (e = h.length)
				}
				;(l = null),
					(u = !1),
					(function (t) {
						if (i === clearTimeout) return clearTimeout(t)
						if ((i === o || !i) && clearTimeout) return (i = clearTimeout), clearTimeout(t)
						try {
							i(t)
						} catch (e) {
							try {
								return i.call(null, t)
							} catch (e) {
								return i.call(this, t)
							}
						}
					})(t)
			}
		}
		function f(t, e) {
			;(this.fun = t), (this.array = e)
		}
		function m() {}
		;(n.nextTick = function (t) {
			var e = new Array(arguments.length - 1)
			if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r]
			h.push(new f(t, e)), 1 !== h.length || u || a(p)
		}),
			(f.prototype.run = function () {
				this.fun.apply(null, this.array)
			}),
			(n.title = 'browser'),
			(n.browser = !0),
			(n.env = {}),
			(n.argv = []),
			(n.version = ''),
			(n.versions = {}),
			(n.on = m),
			(n.addListener = m),
			(n.once = m),
			(n.off = m),
			(n.removeListener = m),
			(n.removeAllListeners = m),
			(n.emit = m),
			(n.prependListener = m),
			(n.prependOnceListener = m),
			(n.listeners = function (t) {
				return []
			}),
			(n.binding = function (t) {
				throw new Error('process.binding is not supported')
			}),
			(n.cwd = function () {
				return '/'
			}),
			(n.chdir = function (t) {
				throw new Error('process.chdir is not supported')
			}),
			(n.umask = function () {
				return 0
			})
	},
	169: function (t, e, r) {
		'use strict'
		function i(t) {
			let e = !1,
				r = !1
			return {
				promise: new Promise((i, n) => {
					t.then(t => {
						;(e = !0), r ? n('canceled') : i(t)
					}).catch(t => {
						;(e = !0), n(r ? 'canceled' : t)
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
			return i
		})
	},
	17: function (t, e, r) {
		'use strict'
		var i = r(19),
			n = r(31),
			s = r(18)
		class o extends i.a {
			constructor(t = {}) {
				;(t.type = 'Group'),
					super(t),
					(this.children = []),
					['id', 'name', 'order', 'type'].forEach(e => {
						e in t && delete t[e]
					}),
					(this.props = t)
			}
			isStatic() {
				const t = this.children
				for (let e = 0, r = t.length; e < r; e++) if (!t[e].isStatic()) return !1
				return !0
			}
			isStaticIndexed() {
				const t = this.children
				for (let e = 0, r = t.length; e < r; e++) if (!t[e].isStaticIndexed()) return !1
				return !0
			}
			add(t) {
				t.setProp(this.props),
					(t.order =
						void 0 !== t.order
							? t.order
							: this.children.length > 0
							? Math.max.apply(
									this,
									this.children.map(t => t.order || 0)
							  ) + 1
							: 0),
					this.scene && s.a.propagateToChilden(t, this.scene),
					this.children.push(t),
					this.sortChildren()
			}
			sortChildren() {
				this.children.sort((t, e) => t.order - e.order),
					(this.children = this.children.map((t, e) => ((t.order = e), t))),
					this.clearBuffer(!0)
			}
			getChildren() {
				return this.children
			}
			find(t) {
				if (this.id == t) return this
				const e = this.getChildren()
				for (let r = 0, i = e.length; r < i; r++) {
					const i = e[r].find(t)
					if (null !== i) return i
				}
				return null
			}
			get(t) {
				return t >= 0 && t < this.children.length ? this.children[t] : null
			}
			remove(t) {
				if (t >= 0 && t < this.children.length) {
					const e = this.children.splice(t, 1)
					return this.clearBuffer(!0), e
				}
				return !1
			}
			removeFromId(t) {
				for (let e = 0, r = this.children.length; e < r; e++)
					if (this.children[e].id == t) return this.children.splice(e, 1), this.clearBuffer(!0)
			}
			generate(t, e = !1, r) {
				this.children.forEach(i => i.generate(t, e, r))
			}
			clearBuffer(t = !1, e = !0) {
				if ((this.children.forEach(e => e.clearBuffer(t, !1)), this.scene && e)) {
					const r = this.scene.getParentsOfSceneChild(this)
					r.length > 0 && r[r.length - 1].clearBuffer(t, e)
				}
			}
			setProp(t, e) {
				'object' == typeof t ? Object.keys(t).forEach(e => (this.props[e] = t[e])) : (this.props[t] = e),
					this.children.forEach(r => r.setProp(t, e))
			}
			getBufferLength(t) {
				return this.children.map(e => e.getBufferLength(t)).reduce((t, e) => t + e, 0)
			}
			getBuffer() {
				const t = this.children.map(t => t.getBuffer()).filter(t => void 0 !== t),
					e = t.reduce((t, e) => t + e.length, 0)
				if (e > 0) {
					const r = new Float32Array(e)
					r.set(t[0], 0)
					for (let e = 1, i = 0, n = t.length; e < n; e++) (i += t[e - 1].length), r.set(t[e], i)
					return r
				}
				return n.a.EMPTY_BUFFER
			}
			getIndexedBuffer() {
				const t = this.children.map(t => t.getIndexedBuffer()).filter(t => void 0 !== t)
				return [].concat.apply(null, t)
			}
			stream(t) {
				this.children.forEach(e => e.stream(t))
			}
			index(t, e) {
				for (let r = 0, i = this.children.length; r < i; r++) this.children[r].index(t, e)
			}
			static propagateProp(t, e, r) {
				t.setProp(e, r)
			}
			static removeIntersected(t, e) {
				const r = t.getProps(),
					i = e.getProps(),
					n = Object.keys(r),
					s = Object.keys(i),
					o = {}
				return (
					n.forEach(t => {
						s.indexOf(t) >= 0 && (o[t] = r[t])
					}),
					o
				)
			}
		}
		e.a = o
	},
	18: function (t, e, r) {
		'use strict'
		var i = r(6),
			n = r(19),
			s = r(17),
			o = r(25),
			a = r(4)
		class l {
			constructor(t = {}) {
				;(this.start_time = 0),
					(this.last_update_time = 0),
					(this.current_time = 0),
					(this.delta_time = 0),
					(this.fps = 0),
					(this.width = Object(i.a)(t.width, 400)),
					(this.height = Object(i.a)(t.height, 400)),
					(this.background = Object(i.a)(t.background, '#fff')),
					(this.mainColor = Object(i.a)(t.mainColor, '#000')),
					(this.children = []),
					(this.center = a.a.create(this.width / 2, this.height / 2))
			}
			resize(t, e = t) {
				;(this.width = t),
					(this.height = e),
					(this.center = a.a.create(this.width / 2, this.height / 2)),
					this.children.forEach(t => t.clearBuffer())
			}
			update(t) {
				if (null == t) {
					this.start_time || (this.start_time = Object(i.d)())
					const t = Object(i.d)()
					this.current_time = t - this.start_time
				} else this.current_time = t
				this.children.forEach(t => t.generate(this.current_time, !0))
			}
			clearAllBuffers() {
				l.walk(t => t.clearBuffer(!0, !1), this)
			}
			draw(t) {
				this.children.forEach(e => e.stream(t))
			}
			getChildren() {
				return this.children
			}
			add(t, e) {
				;(t.order =
					void 0 !== e
						? e
						: void 0 !== t.order
						? t.order
						: this.children.length > 0
						? Math.max.apply(
								this,
								this.children.map(t => t.order || 0)
						  ) + 1
						: 0),
					l.propagateToChilden(t, this),
					this.children.push(t),
					t.clearBuffer(),
					this.sortChildren()
			}
			sortChildren() {
				this.children.sort((t, e) => t.order - e.order),
					(this.children = this.children.map((t, e) => ((t.order = e), t)))
			}
			isFirstLevelChild(t) {
				for (let e = 0, r = this.children.length; e < r; e++) if (this.children[e].id == t.id) return !0
				const e = this.getParentsOfSceneChild(t)
				return 1 == e.length && e[0] instanceof s.a
			}
			find(t) {
				const e = this.getChildren()
				for (let r = 0, i = e.length; r < i; r++) {
					const i = e[r].find(t)
					if (null !== i) return i
				}
				return null
			}
			get(t) {
				return t >= 0 && t < this.children.length ? this.children[t] : null
			}
			remove(t) {
				t >= 0 && t < this.children.length && this.children.splice(t, 1)
			}
			clearChildren() {
				this.children = []
			}
			removeFromId(t) {
				for (let e = 0, r = this.children.length; e < r; e++)
					if (this.children[e].id == t) return void this.children.splice(e, 1)
			}
			getParentsOfSceneChild(t) {
				const e = l.getParentsOfSceneChild(this, t)
				return e ? (e.splice(0, 1), e) : []
			}
			static getParentsOfSceneChild(t, e, r = []) {
				let i
				if (t instanceof n.a) {
					if (t.id == e.id) return r
					if (t instanceof o.a && t.shape) {
						const n = r.slice()
						if ((n.push(t), (i = l.getParentsOfSceneChild(t.shape, e, n)))) return i
					}
				}
				if (t instanceof l || t instanceof s.a) {
					const n = t.getChildren()
					r.push(t)
					for (let t = 0, s = n.length; t < s; t++) {
						const s = n[t]
						if ((i = l.getParentsOfSceneChild(s, e, r))) return i
					}
					r.pop()
				}
				return null
			}
			static walk(t, e) {
				if (e instanceof n.a) {
					if (!1 === t(e)) return !1
					if (e instanceof o.a && e.shape && !1 === l.walk(t, e.shape)) return !1
				}
				if (e instanceof l || e instanceof s.a) {
					const r = e.getChildren()
					for (let e = 0, i = r.length; e < i; e++) {
						const i = r[e]
						if (!1 === l.walk(t, i)) return !1
					}
				}
			}
			static propagateToChilden(t, e) {
				;(t.scene = e),
					t instanceof s.a
						? t.children.forEach(t => {
								l.propagateToChilden(t, e)
						  })
						: t instanceof o.a && t.shape && ((t.shape.scene = e), l.propagateToChilden(t.shape, e))
			}
		}
		e.a = l
	},
	19: function (t, e, r) {
		'use strict'
		let i = 0
		e.a = class {
			constructor(t) {
				var e
				;(this.id = null !== (e = t.id) && void 0 !== e ? e : ++i),
					(this.type = t.type || 'SceneChild'),
					(this.name = t.name || this.type + '_' + this.id),
					(this.order = t.order || 0),
					(this.data = t.data || {}),
					(this.props = {})
			}
			getProps() {
				return this.props
			}
			getProp(t, e, r) {
				var i
				return null !== (i = this.props[t]) && void 0 !== i ? i : r
			}
			setPropUnsafe(t, e) {
				'string' == typeof t ? (this.props[t] = e) : Object.keys(t).forEach(e => (this.props[e] = t[e]))
			}
		}
	},
	2: function (t, e, r) {
		'use strict'
		r.d(e, 'a', function () {
			return Y
		})
		var i = r(38),
			n = r(19),
			s = r(5),
			o = r(410),
			a = r(18),
			l = r(17),
			h = r(22)
		class u extends h.a {
			constructor(t = {}) {
				;(t.type = t.type || 'ShapeBuffer'),
					(t.bAdaptBuffer = t.bAdaptBuffer || s.a.Scale),
					super(t),
					(this.shape = t.shape instanceof Float32Array ? t.shape : u.EMPTY_BUFFER),
					(this.shape_buffer =
						this.isAdapted() != s.a.None ? h.a.adaptBuffer(this.shape, this.isAdapted()) : this.shape),
					(this.bStatic = this.isStatic()),
					(this.bStaticIndexed = this.isStaticIndexed())
			}
			clearBuffer(t = !1, e = !0) {
				super.clearBuffer(t, e),
					(this.shape_buffer =
						this.isAdapted() != s.a.None ? h.a.adaptBuffer(this.shape, this.isAdapted()) : this.shape)
			}
			getBufferLength() {
				return this.buffer && this.buffer.length > 0
					? this.buffer.length
					: this.shape_buffer.length * this.getRepetitionCount()
			}
			generateBuffer(t, e) {
				if ((this.bindSideLength(e), this.vertexCallback)) {
					const t = this.shape_buffer.length,
						r = t / 2,
						i = Float32Array.from(this.shape_buffer)
					for (let n = 0, s = 0; n < t; n += 2, s++) {
						const t = [i[n], i[n + 1]]
						this.vertexCallback(t, e, s, r), (i[n] = t[0]), (i[n + 1] = t[1])
					}
					return i
				}
				return this.shape_buffer
			}
			setShape(t) {
				;(this.shape = t), this.clearBuffer(!0)
			}
		}
		var c = u
		const d = Float32Array.from([-1, 0, 1, 0])
		var p = class extends c {
			constructor(t = {}) {
				;(t.type = 'Line'), (t.shape = d), (t.bAdaptBuffer = s.a.None), super(t)
			}
		}
		const f = Float32Array.from([-1, -1, 1, 0, -1, 1])
		var m = class extends c {
			constructor(t = {}) {
				;(t.type = 'Triangle'), (t.shape = f), (t.bAdaptBuffer = s.a.None), super(t)
			}
		}
		const g = Float32Array.from([-1, -1, 1, -1, 1, 1, -1, 1])
		var y = class extends c {
				constructor(t = {}) {
					;(t.type = 'Rect'), (t.shape = g), (t.bAdaptBuffer = s.a.None), super(t)
				}
			},
			_ = r(11)
		class v extends _.a {
			constructor(t = {}) {
				var e
				;(t.type = t.type || 'RegularPolygon'),
					(t.shapeLoopPropsDependencies = (t.shapeLoopPropsDependencies || []).concat(['sideNumber'])),
					(t.bAdaptBuffer = null !== (e = t.bAdaptBuffer) && void 0 !== e ? e : s.a.None),
					super(t, !0),
					(this.props.sideNumber = t.sideNumber),
					(this.loop = {
						start: 0,
						end: _.a.PI2,
						inc: t => _.a.PI2 / this.getProp('sideNumber', t, 5),
						vertex: t => [Math.cos(t), Math.sin(t)],
					}),
					(this.bStaticLoop = this.isStaticLoop()),
					(this.bStatic = this.isStatic()),
					(this.bStaticIndexed = this.isStaticIndexed())
			}
			getProp(t, e, r) {
				return super.getProp(t, e, r)
			}
			setProp(t, e) {
				super.setProp(t, e)
			}
		}
		var P = v
		class b extends _.a {
			constructor(t = {}) {
				var e
				;(t.type = 'Circle'),
					(t.shapeLoopPropsDependencies = (t.shapeLoopPropsDependencies || []).concat(['sideLength'])),
					(t.bAdaptBuffer = null !== (e = t.bAdaptBuffer) && void 0 !== e ? e : s.a.Scale),
					super(t),
					(this.loop = {
						start: 0,
						end: _.a.PI2,
						inc: t => (1 / Math.pow(this.sideLength[0] * this.sideLength[1], 0.25)) * _.a.PId2,
						vertex: t => [Math.cos(t), Math.sin(t)],
					})
			}
		}
		var x = b,
			w = r(6)
		class C extends _.a {
			constructor(t = {}) {
				var e
				;(t.type = 'Rose'),
					(t.shapeLoopPropsDependencies = (t.shapeLoopPropsDependencies || []).concat(['n', 'd', 'sideLength'])),
					(t.bAdaptBuffer = null !== (e = t.bAdaptBuffer) && void 0 !== e ? e : s.a.Scale),
					super(t, !0),
					(this.props.n = Object(w.a)(t.n, 1)),
					(this.props.d = Object(w.a)(t.d, 2)),
					(this.loop = {
						start: 0,
						end: t => C.getFinalAngleFromK(this.getProp('n', t), this.getProp('d', t)),
						inc: t => {
							const e = this.getProp('n', t),
								r = this.getProp('d', t),
								i = Math.pow(this.sideLength[0] * this.sideLength[1], 0.45),
								n = r < e ? e / r : 1.5
							return _.a.PI2 / (i * n)
						},
						vertex: (t, e) => {
							const r = this.getProp('n', e) / this.getProp('d', e),
								i = Math.cos(r * t)
							return [i * Math.cos(t), i * Math.sin(t)]
						},
					}),
					(this.bStaticLoop = this.isStaticLoop()),
					(this.bStatic = this.isStatic()),
					(this.bStaticIndexed = this.isStaticIndexed())
			}
			getProp(t, e, r) {
				return super.getProp(t, e, r)
			}
			setProp(t, e) {
				super.setProp(t, e)
			}
			static getFinalAngleFromK(t, e) {
				if (t == e) return _.a.PI2
				const r = t / e,
					i = t * e
				return Number.isInteger(r) || r % 0.5 != 0 ? Math.PI * e * (i % 2 == 0 ? 2 : 1) : 4 * Math.PI
			}
		}
		var S = C
		class E extends _.a {
			constructor(t = {}) {
				var e
				;(t.type = 'Spiral'),
					(t.bCloseShape = !1),
					(t.bAdaptBuffer = null !== (e = t.bAdaptBuffer) && void 0 !== e ? e : s.a.None),
					(t.shapeLoopPropsDependencies = (t.shapeLoopPropsDependencies || []).concat([
						'twists',
						'twists_start',
						'spiral',
						'sideLength',
					])),
					super(t, !0),
					(this.props.spiral = Object(w.a)(t.spiral, E.types.ARCHIMEDE)),
					(this.props.twists = Object(w.a)(t.twists, 2)),
					(this.props.twists_start = Object(w.a)(t.twists_start, 0)),
					(this.loop = {
						start: t => _.a.PI2 * this.getProp('twists_start', t),
						end: t => _.a.PI2 * (this.getProp('twists_start', t) + this.getProp('twists', t)),
						inc: t => {
							const e = this.getProp('twists', t)
							return (_.a.PI2 * e) / ((4 + Math.sqrt(this.sideLength[0] * this.sideLength[1])) * e)
						},
						vertex: (t, e) => {
							const r = E.getRFromSpiralType(this.getProp('spiral', e), t)
							return [r * Math.cos(t), r * Math.sin(t)]
						},
					}),
					(this.bStaticLoop = this.isStaticLoop()),
					(this.bStatic = this.isStatic()),
					(this.bStaticIndexed = this.isStaticIndexed())
			}
			getProp(t, e, r) {
				return super.getProp(t, e, r)
			}
			setProp(t, e) {
				;('twists' in (t = 'string' == typeof t ? { [t]: e } : t) || 'twists_start' in t) &&
					this.props.loop &&
					((this.props.loop.start = void 0), (this.props.loop.end = void 0)),
					super.setProp(t, e)
			}
			static getRFromSpiralType(t, e) {
				switch (t) {
					case E.types.ARCHIMEDE:
						return e / 10
					case E.types.HYPERBOLIC:
						return (1 / e) * 3
					case E.types.FERMAT:
						return Math.pow(e, 0.5) / 3
					case E.types.LITUUS:
						return Math.pow(e, -0.5)
					case E.types.LOGARITHMIC:
						return Math.pow(Math.E, 0.2 * e) / 10
				}
				return 1
			}
		}
		E.types = {
			ARCHIMEDE: 'ARCHIMEDE',
			HYPERBOLIC: 'HYPERBOLIC',
			FERMAT: 'FERMAT',
			LITUUS: 'LITUUS',
			LOGARITHMIC: 'LOGARITHMIC',
		}
		var I = E
		class T extends _.a {
			constructor(t = {}) {
				var e
				;(t.type = 'Lissajous'),
					(t.shapeLoopPropsDependencies = (t.shapeLoopPropsDependencies || []).concat([
						'wx',
						'wy',
						'wz',
						'sideLength',
					])),
					(t.bAdaptBuffer = null !== (e = t.bAdaptBuffer) && void 0 !== e ? e : s.a.Scale),
					super(t, !0),
					(this.props.wx = t.wx || 1),
					(this.props.wy = t.wy || 2),
					(this.props.wz = t.wz || 0),
					(this.loop = {
						start: 0,
						end: _.a.PI2,
						inc: t => {
							const e = this.getProp('wx', t),
								r = this.getProp('wy', t),
								i = e == r ? _.a.PId2 : 0.5 - 0.01 * Math.min(49, e + r)
							return (1 / Math.pow(this.sideLength[0] * this.sideLength[1], 0.25)) * i
						},
						vertex: (t, e) => {
							const r = this.getProp('wx', e),
								i = this.getProp('wy', e),
								n = this.getProp('wz', e, 0)
							return r == i ? [Math.cos(t + n), Math.sin(t)] : [Math.cos(r * t + n), Math.sin(i * t)]
						},
					}),
					(this.bStaticLoop = this.isStaticLoop()),
					(this.bStatic = this.isStatic()),
					(this.bStaticIndexed = this.isStaticIndexed())
			}
			getProp(t, e, r) {
				return super.getProp(t, e, r)
			}
			setProp(t, e) {
				super.setProp(t, e)
			}
		}
		var A = T,
			O = r(25)
		var L = {
				ShapePrimitiveAdaptMode: s.a,
				toDegrees: w.f,
				toRadians: w.g,
				isDef: w.c,
				clamp: w.b,
				relativeClamp: w.e,
				Scene: a.a,
				SceneChild: n.a,
				Group: l.a,
				Line: p,
				Triangle: m,
				Rect: y,
				RegularPolygon: P,
				Circle: x,
				Rose: S,
				Lissajous: A,
				Spiral: I,
				Shape: O.a,
				ShapeBuffer: c,
				ShapeLoop: _.a,
				ShapePrimitive: h.a,
			},
			k = r(31)
		class N {
			constructor() {
				;(this.registeredSceneChilds = {}), (this.registeredSceneChilds = {})
				const t = Object.keys(L)
				for (let e = 0, r = t.length; e < r; e++)
					L[t[e]].prototype instanceof n.a && (this.registeredSceneChilds[t[e]] = L[t[e]])
			}
			getRegistered() {
				return Object.keys(this.registeredSceneChilds)
			}
			register(t, e) {
				t in this.registeredSceneChilds
					? console.warn(`SceneChildUtilities: SceneChild "${t}" is already registered`)
					: (this.registeredSceneChilds[t] = e)
			}
			unregister(t) {
				t in this.registeredSceneChilds
					? delete this.registeredSceneChilds[t]
					: console.warn(`SceneChildUtilities: SceneChild "${t}" is not registered`)
			}
			create(t, e, r, i) {
				if (t instanceof n.a) return this.getChildren(t).forEach(t => this.create(t)), t
				if (t in this.registeredSceneChilds) {
					e ? (e.id = e.id || Object(o.a)()) : (e = { id: Object(o.a)() })
					let r = new this.registeredSceneChilds[t](e)
					return this.getChildren(r).forEach(t => this.create(t)), r
				}
				return console.warn(`SceneChildUtilities: Creation failed. SceneChild "${t}" is not registered`), null
			}
			copy(t, e, r) {
				const i = t.getProps(),
					n = this.create(t.type, i, e, r)
				if (n) {
					if (t instanceof l.a)
						t.getChildren().forEach(t => {
							const i = this.copy(t, e, r)
							i && n.add(i)
						})
					else if (t instanceof O.a && t.shape) {
						const i = t.shape instanceof Float32Array ? t.shape : this.copy(t.shape, e, r)
						i && (n.shape = i)
					} else t instanceof c && t.shape && n.setShape(new Float32Array(t.shape))
					return n
				}
				return console.warn('SceneChildUtilities: Copy failed.', t), null
			}
			add(t, e, r, i) {
				let n = null
				if (t instanceof l.a || t instanceof a.a) (n = this.create(e, r, i)), n && t.add(n)
				else if (t instanceof O.a)
					if (null == t.shape) (n = this.create(e, r, i)), n && t.setShape(n)
					else if (t.shape instanceof k.a) {
						if (((n = this.create(e, r, i)), n)) {
							const e = this.create('Group', void 0, i),
								r = t.shape
							this.remove(t, r), t.setShape(e), e.add(r), e.add(n)
						}
					} else t.shape instanceof l.a && this.add(t.shape, e, void 0, i)
				return n
			}
			remove(t, e) {
				if (e) t instanceof l.a ? t.removeFromId(e.id) : t instanceof O.a && t.setShape(void 0)
				else if (t.scene) {
					const e = this.getParent(t)
					e ? this.remove(e, t) : t.scene.removeFromId(t.id)
				} else console.warn('SceneChildUtilities: Remove failed. SceneChild is not added into scene', t)
			}
			getRootParent(t) {
				const e = this.getParents(t)
				return e.length > 0 ? e[0] : null
			}
			getParent(t) {
				const e = this.getParents(t)
				return e.length > 0 ? e[e.length - 1] : null
			}
			getParents(t) {
				return t && t.scene ? t.scene.getParentsOfSceneChild(t) : []
			}
			getChildren(t) {
				return t instanceof l.a ? t.getChildren() : t instanceof O.a && t.shape ? [t.shape] : []
			}
			getChildrenPrimitives(t) {
				let e = []
				const r = this.getChildren(t)
				for (let t = 0, i = r.length; t < i; t++)
					r[t] instanceof h.a ? e.push(r[t]) : (e = e.concat(...this.getChildrenPrimitives(r[t])))
				return e
			}
			getCountOfSceneChildType(t, e) {
				let r = 0
				return (
					a.a.walk(t => {
						r += t.type == e ? 1 : 0
					}, t),
					r
				)
			}
			walk(t, e) {
				e(t), this.getChildren(t).forEach(t => e(t))
			}
			isGroup(t) {
				return t instanceof l.a
			}
			hasShapeChild(t) {
				return t instanceof O.a && void 0 !== t.shape
			}
			hasShapeBuffer(t) {
				return t instanceof c
			}
			isAPrimitive(t) {
				return t instanceof h.a
			}
			hasLoop(t) {
				return t instanceof _.a
			}
		}
		new N()
		var R = r(3),
			B = r.n(R),
			D = r(64)
		const M = [
				{ key: 'None', value: s.a.None },
				{ key: 'Scale', value: s.a.Scale },
				{ key: 'Center', value: s.a.Center },
				{ key: 'Fill', value: s.a.Fill },
			],
			F = [
				{ key: 'ARCHIMEDE', value: I.types.ARCHIMEDE },
				{ key: 'FERMAT', value: I.types.FERMAT },
				{ key: 'HYPERBOLIC', value: I.types.HYPERBOLIC },
				{ key: 'LITUUS', value: I.types.LITUUS },
				{ key: 'LOGARITHMIC', value: I.types.LOGARITHMIC },
			]
		class Y extends N {
			create(t, e, r, s) {
				var o
				e || (e = {}),
					!e.name &&
						(('string' != typeof t && t.scene) || r) &&
						(e.name =
							('string' == typeof t ? t : t.type) +
							'_' +
							(Y.getCountSceneChildOfType(r || t.scene, 'string' == typeof t ? t : t.type) + 1)),
					e.data || (e.data = Object(i.getProperty)('string' == typeof t ? e : t, 'data', {})),
					e.data || (e.data = Object(i.getProperty)('string' == typeof t ? e : t, 'data', {})),
					(e.data.visible = Object(i.getProperty)('string' == typeof t ? e : t, 'data.visible', !0)),
					(e.data.props = Object(i.getProperty)('string' == typeof t ? e : t, 'data.props', {})),
					(e.data.shapeLoop = Object(i.getProperty)('string' == typeof t ? e : t, 'data.shapeLoop', {})),
					(e.data.highlighted = Object(i.getProperty)('string' == typeof t ? e : t, 'data.highlighted', !1)),
					(e.data.disableGhost = Object(i.getProperty)('string' == typeof t ? e : t, 'data.disableGhost', !1)),
					t instanceof n.a && Object.keys(e).forEach(r => (t[r] = e[r]))
				const a = super.create(t, e)
				if (a && s && this.isAPrimitive(a)) {
					const t = null === (o = Y.sceneChildProps.sideLength) || void 0 === o ? void 0 : o.default
					a.setProp('sideLength', D.a.getTransformedValue(s, 'sideLength', t)), (a.data.props.sideLength = t)
				}
				return a
			}
			copy(t, e, r, i = !1) {
				const n = super.copy(t, e, r)
				return n && i && ((n.id = t.id), (n.name = t.name), (n.order = t.order), (n.data = t.data)), n
			}
			getNeighbors(t) {
				if (t.scene) {
					const e = this.getParent(t)
					return null == e ? t.scene.getChildren() : this.getChildren(e)
				}
				return []
			}
			static getCountSceneChildOfType(t, e) {
				let r = 0
				return (
					a.a.walk(t => {
						r += t.type == e ? 1 : 0
					}, t),
					r
				)
			}
			static getIcon(t) {
				return 'Scene' == t
					? 'scene'
					: 'ShapeBuffer' == t
					? 'shape-buffer'
					: 'ShapePrimitive' == t
					? 'primitive'
					: 'Shape' == t
					? 'shape'
					: 'Group' == t
					? 'group'
					: 'shape'
			}
			static setProp(t, e, r, i) {
				if (D.a.bValueAnimation(r)) return (t.data.props[e] = r), void t.setProp(e, D.a.composeAnimation(i, e, r))
				if (D.a.bPropTransformable(e, r))
					return (t.data.props[e] = r), void t.setProp(e, D.a.getTransformedValue(i, e, r))
				switch ((e in Y.sceneChildProps && 'none' !== Y.sceneChildProps[e].transformable && (t.data.props[e] = r), e)) {
					case 'bCloseShape':
						t.setClosed(r)
						break
					case 'bAdaptMode':
						t.setAdapted(r)
						break
					default:
						if (e.indexOf('.') > 0) {
							const i = e.split('.')
							t.setProp({ [i[0]]: { [i[1]]: r } })
						} else t.setProp(e, r)
				}
			}
		}
		Y.sceneChildProps = {
			repetitions: {
				animable: !1,
				name: 'repetitions',
				label: 'Repetitions',
				type: 'range',
				min: 1,
				max: 100,
				step: 1,
				default: 1,
				canBArray: !0,
				transformation: 'none',
			},
			distance: {
				animable: !0,
				name: 'distance',
				label: 'Distance',
				type: 'range',
				min: -200,
				max: 200,
				step: 1,
				default: 0,
				canBArray: !0,
				default_animate: 50,
				transformation: 'resolution-based',
			},
			displace: {
				animable: !0,
				name: 'displace',
				label: 'Displace',
				type: 'range',
				min: -360,
				max: 360,
				step: 1,
				default: 0,
				default_animate: 360,
				transformation: 'angle',
			},
			squeezeX: {
				animable: !0,
				name: 'squeezeX',
				label: 'SqueezeX',
				type: 'range',
				min: -0.2,
				max: 0.2,
				step: 0.001,
				default: 0,
				default_animate: 0.01,
				transformation: 'resolution-scaled-based',
			},
			squeezeY: {
				animable: !0,
				name: 'squeezeY',
				label: 'SqueezeY',
				type: 'range',
				min: -0.2,
				max: 0.2,
				step: 0.001,
				default: 0,
				default_animate: 0.01,
				transformation: 'resolution-scaled-based',
			},
			rotateX: {
				animable: !0,
				name: 'rotateX',
				label: 'RotateX',
				type: 'range',
				min: -360,
				max: 360,
				step: 1,
				default: 0,
				default_animate: 360,
				transformation: 'angle',
			},
			rotateY: {
				animable: !0,
				name: 'rotateY',
				label: 'RotateY',
				type: 'range',
				min: -360,
				max: 360,
				step: 1,
				default: 0,
				default_animate: 360,
				transformation: 'angle',
			},
			rotateZ: {
				animable: !0,
				name: 'rotateZ',
				label: 'RotateZ',
				type: 'range',
				min: -360,
				max: 360,
				step: 1,
				default: 0,
				default_animate: 360,
				transformation: 'angle',
			},
			skewX: {
				animable: !0,
				name: 'skewX',
				label: 'SkewX',
				type: 'range',
				min: -90,
				max: 90,
				step: 1,
				default: 0,
				default_animate: 1,
				transformation: 'angle',
			},
			skewY: {
				animable: !0,
				name: 'skewY',
				label: 'SkewY',
				type: 'range',
				min: -90,
				max: 90,
				step: 1,
				default: 0,
				default_animate: 1,
				transformation: 'angle',
			},
			translate: {
				animable: !0,
				name: 'translate',
				label: 'Translate',
				type: 'multiple-range',
				min: -200,
				max: 200,
				step: 1,
				default: [0, 0],
				default_animate: 0,
				transformation: 'resolution-based',
			},
			scale: {
				animable: !0,
				name: 'scale',
				label: 'Scale',
				type: 'multiple-range',
				min: -5,
				max: 5,
				step: 0.01,
				default: [1, 1],
				default_animate: 3,
				transformation: 'none',
			},
			fillColor: {
				animable: !0,
				name: 'fillColor',
				label: 'Fill',
				type: 'color',
				default: B.a.color('primary').toString('rgba').replace(/ /gi, ''),
				default_animate: 'rgba(204,31,81,1)',
				transformation: 'none',
			},
			strokeColor: {
				animable: !0,
				name: 'strokeColor',
				label: 'Stroke',
				type: 'color',
				default: B.a.color('primary').toString('rgba').replace(/ /gi, ''),
				default_animate: 'rgba(204,31,81,1)',
				transformation: 'none',
			},
			lineWidth: {
				animable: !0,
				name: 'lineWidth',
				label: 'Stroke weight',
				type: 'slider',
				min: 0,
				max: 30,
				step: 0.1,
				default: 1,
				default_animate: 3,
				transformation: 'none',
			},
			bCloseShape: { name: 'bCloseShape', label: 'Closed', type: 'checkbox', default: void 0, transformation: 'none' },
			bAdaptBuffer: {
				name: 'bAdaptBuffer',
				label: 'Adapt',
				type: 'radio',
				options: M,
				default: void 0,
				transformation: 'none',
			},
			sideLength: {
				animable: !0,
				name: 'sideLength',
				label: 'Side Length',
				type: 'multiple-range',
				min: 0.1,
				max: 100,
				step: 0.1,
				default: [10, 10],
				default_animate: 20,
				transformation: 'resolution-based',
			},
			sideNumber: {
				animable: !0,
				name: 'sideNumber',
				label: 'Side Number',
				type: 'range',
				min: 1,
				max: 20,
				step: 1,
				default: 5,
				default_animate: 2,
				transformation: 'none',
			},
			n: {
				animable: !0,
				name: 'n',
				label: 'n',
				type: 'range',
				min: 1,
				max: 10,
				step: 1,
				default: 1,
				default_animate: 3,
				transformation: 'none',
			},
			d: {
				animable: !0,
				name: 'd',
				label: 'd',
				type: 'range',
				min: 1,
				max: 10,
				step: 1,
				default: 2,
				default_animate: 4,
				transformation: 'none',
			},
			wx: {
				animable: !0,
				name: 'wx',
				label: 'wx',
				type: 'range',
				min: 1,
				max: 10,
				step: 1,
				default: 1,
				default_animate: 3,
				transformation: 'none',
			},
			wy: {
				animable: !0,
				name: 'wy',
				label: 'wy',
				type: 'range',
				min: 1,
				max: 10,
				step: 1,
				default: 2,
				default_animate: 4,
				transformation: 'none',
			},
			wz: {
				animable: !0,
				name: 'wz',
				label: 'wz',
				type: 'range',
				min: -360,
				max: 360,
				step: 1,
				default: 0,
				bAngle: !0,
				default_animate: 360,
				transformation: 'angle',
			},
			twists: {
				animable: !0,
				name: 'twists',
				label: 'Twists',
				type: 'range',
				min: 1,
				max: 60,
				step: 0.1,
				default: 1,
				default_animate: 3,
				transformation: 'none',
			},
			twists_start: {
				animable: !0,
				name: 'twists_start',
				label: 'Twists start',
				type: 'range',
				min: 1,
				max: 60,
				step: 0.1,
				default: 0,
				default_animate: 1,
				transformation: 'none',
			},
			spiral: {
				name: 'spiral',
				label: 'Spiral type',
				type: 'select',
				options: F,
				default: I.types.ARCHIMEDE,
				transformation: 'none',
			},
			'loop.start': {
				name: 'loop.start',
				label: 'start',
				type: 'range',
				default: void 0,
				min: 0,
				max: 100,
				step: 1,
				transformation: 'none',
			},
			'loop.end': {
				name: 'loop.end',
				label: 'end',
				type: 'range',
				default: void 0,
				min: 0,
				max: 100,
				step: 1,
				transformation: 'none',
			},
			'loop.inc': {
				name: 'loop.inc',
				label: 'inc',
				type: 'range',
				default: void 0,
				min: 0.1,
				max: 10,
				step: 1,
				transformation: 'none',
			},
		}
		e.b = new Y()
	},
	20: function (t, e, r) {
		'use strict'
		var i
		r.d(e, 'a', function () {
			return i
		}),
			(function (t) {
				;(t[(t.Ring = 1)] = 'Ring'), (t[(t.Matrix = 2)] = 'Matrix'), (t[(t.Loop = 3)] = 'Loop')
			})(i || (i = {}))
	},
	22: function (t, e, r) {
		'use strict'
		var i = r(31),
			n = r(5),
			s = r(6),
			o = r(4)
		class a extends i.a {
			constructor(t = {}) {
				var e, r
				super(t),
					(this.props.sideLength = Object(s.a)(t.sideLength, [50, 50])),
					(this.sideLength = o.a.create(Object(s.a)(t.sideLength, [50, 50]))),
					(this.props.fillColor = t.fillColor),
					(this.props.lineWidth = t.lineWidth),
					(this.props.strokeColor = t.strokeColor),
					(this.props.bAdaptBuffer = null !== (e = t.bAdaptBuffer) && void 0 !== e ? e : n.a.None),
					(this.props.bCloseShape = null === (r = t.bCloseShape) || void 0 === r || r),
					(this.vertexCallback = t.vertexCallback)
			}
			isStatic() {
				return 'function' != typeof this.props.sideLength && super.isStatic()
			}
			find(t) {
				return this.id == t ? this : null
			}
			getProp(t, e, r) {
				return super.getProp(t, e, r)
			}
			bindSideLength(t) {
				this.sideLength = o.a.create(this.getProp('sideLength', t, [50, 50]))
			}
			applyVertexTransform(t) {
				;(t[0] *= this.sideLength[0]), (t[1] *= this.sideLength[1])
			}
			isClosed() {
				return this.props.bCloseShape
			}
			setClosed(t) {
				this.props.bCloseShape = t
			}
			isAdapted() {
				return this.props.bAdaptBuffer
			}
			setAdapted(t) {
				;(this.props.bAdaptBuffer = t), this.clearBuffer(!0)
			}
			addIndex(t, e, r, i) {
				const n = { shape: this, buffer_length: e, parent: i, repetition: r }
				t.push(n)
			}
			static getBounding(t) {
				let e = Number.MAX_VALUE,
					r = Number.MAX_VALUE,
					i = Number.MIN_VALUE,
					n = Number.MIN_VALUE
				for (let s = 0, o = t.length; s < o; s += 2) {
					const o = t[s],
						a = t[s + 1]
					o > i ? (i = o) : o < e && (e = o), a > n ? (n = a) : a < r && (r = a)
				}
				return { x: e, y: r, cx: (e + i) / 2, cy: (r + n) / 2, width: i - e, height: n - r }
			}
			static adaptBuffer(t, e) {
				if (e == n.a.None) return t
				const r = new Float32Array(t.length),
					i = a.getBounding(t)
				let s =
						i.width > 2 || i.height > 2 || (e >= n.a.Fill && (i.width < 2 || i.height < 2))
							? 2 / Math.max(i.width, i.height)
							: 1,
					o = e >= n.a.Center ? i.cx : 0,
					l = e >= n.a.Center ? i.cy : 0
				for (let e = 0, i = t.length; e < i; e += 2) (r[e] = (t[e] - o) * s), (r[e + 1] = (t[e + 1] - l) * s)
				return r
			}
		}
		e.a = a
	},
	25: function (t, e, r) {
		'use strict'
		var i = r(31),
			n = r(19),
			s = r(18)
		class o extends i.a {
			constructor(t = {}) {
				;(t.type = t.type || 'Shape'),
					super(t),
					t.shape instanceof n.a && (this.shape = t.shape),
					(this.bStatic = this.isStatic()),
					(this.bStaticIndexed = this.isStaticIndexed())
			}
			isStatic() {
				return super.isStatic() && (!this.shape || this.shape.isStatic())
			}
			isStaticIndexed() {
				return super.isStaticIndexed() && (!this.shape || this.shape.isStaticIndexed())
			}
			find(t) {
				return this.id == t ? this : this.shape ? this.shape.find(t) : null
			}
			getBufferLength(t) {
				if (this.bStatic && this.buffer && this.buffer.length > 0) return this.buffer.length
				return (this.shape ? this.shape.getBufferLength(t) : 0) * this.getRepetitionCount()
			}
			generateBuffer(t, e) {
				return this.shape ? (this.shape.generate(t, !1, e), this.shape.getBuffer() || o.EMPTY_BUFFER) : o.EMPTY_BUFFER
			}
			setShape(t) {
				void 0 === t
					? ((this.shape = void 0), this.clearBuffer(!0))
					: (this.scene && s.a.propagateToChilden(t, this.scene), (this.shape = t), this.shape.clearBuffer(!0))
			}
			addIndex(t, e, r, i) {
				if (this.shape) {
					const n = { shape: this, buffer_length: e, parent: i, repetition: r }
					this.shape.index(t, n)
				}
			}
		}
		e.a = o
	},
	3: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(357),
			n = r(374),
			s = new i.default(n)
		e.default = s
	},
	31: function (t, e, r) {
		'use strict'
		var i = r(20),
			n = r(19),
			s = r(4)
		class o extends n.a {
			constructor(t = {}) {
				super(t),
					(this.generate_id = 0),
					(this.props = {
						distance: t.distance,
						repetitions: t.repetitions,
						rotateX: t.rotateX,
						rotateY: t.rotateY,
						rotateZ: t.rotateZ,
						skewX: t.skewX,
						skewY: t.skewY,
						squeezeX: t.squeezeX,
						squeezeY: t.squeezeY,
						displace: t.displace,
						translate: t.translate,
						scale: t.scale,
						rotationOrigin: t.rotationOrigin,
					}),
					(this.bUseParent = !!t.bUseParent)
			}
			isStatic() {
				const t = this.props
				return (
					'function' != typeof t.distance &&
					'function' != typeof t.repetitions &&
					'function' != typeof t.rotateX &&
					'function' != typeof t.rotateY &&
					'function' != typeof t.rotateZ &&
					'function' != typeof t.displace &&
					'function' != typeof t.skewX &&
					'function' != typeof t.skewY &&
					'function' != typeof t.squeezeX &&
					'function' != typeof t.squeezeY &&
					'function' != typeof t.translate &&
					'function' != typeof t.scale &&
					'function' != typeof t.rotationOrigin
				)
			}
			isStaticIndexed() {
				return 'function' != typeof this.props.repetitions
			}
			getProp(t, e, r) {
				let i = this.props[t]
				return (
					'function' == typeof i &&
						(void 0 === (e = e || o.EMPTY_PROP_ARGUMENTS).shape && (e.shape = this),
						this.scene && (e.time = this.scene.current_time),
						(i = i(e))),
					void 0 === i || Number.isNaN(i) ? r : i
				)
			}
			setProp(t, e, r = !1) {
				'string' == typeof t
					? ((r = r || 'repetitions' == t), (this.props[t] = e))
					: ((r = r || 'repetitions' in t), Object.keys(t).forEach(e => (this.props[e] = t[e]))),
					this.clearBuffer(r)
			}
			clearBuffer(t = !1, e = !0) {
				if (
					((this.buffer = void 0),
					t && (this.indexed_buffer = void 0),
					(this.bStatic = this.isStatic()),
					(this.bStaticIndexed = this.isStaticIndexed()),
					e && this.scene && !this.scene.isFirstLevelChild(this))
				) {
					const r = this.scene.getParentsOfSceneChild(this)
					r.length > 0 && r[r.length - 1].clearBuffer(t, e)
				}
			}
			generate(t, e = !1, r) {
				var n, a
				if (!this.scene || (this.buffer && (this.bStatic || (t == this.generate_id && !this.bUseParent)))) return
				this.generate_id = t
				const l = o.getEmptyRepetition(),
					h = this.getProp('repetitions', { parent: r, repetition: l, time: 1 }, 1),
					u = Array.isArray(h) ? i.a.Matrix : i.a.Ring,
					c = Array.isArray(h) ? h[0] * (null !== (n = h[1]) && void 0 !== n ? n : h[0]) : h,
					d = Array.isArray(h) ? h[0] : c,
					p = Array.isArray(h) ? (null !== (a = h[1]) && void 0 !== a ? a : h[0]) : 1
				;(l.count = c), (l.count_col = d), (l.count_row = p), (l.type = u)
				const f = {
					repetition: l,
					time: this.scene ? this.scene.current_time : 1,
					shape: this,
					data: this.data,
					parent: r,
				}
				this.single_repetition_buffer_length = new Uint16Array(c)
				let m = 0
				const g = []
				let y = 0
				const _ = s.a.create((d - 1) / 2, (p - 1) / 2)
				for (let r = 0; r < p; r++)
					for (let n = 0; n < d; n++, y++) {
						;(l.current_index = y + 1),
							(l.current_offset = l.current_index / l.count),
							(l.current_angle = u == i.a.Ring ? ((2 * Math.PI) / c) * y : 0),
							(l.current_col = n + 1),
							(l.current_col_offset = l.current_col / l.count_col),
							(l.current_row = r + 1),
							(l.current_row_offset = l.current_row / l.count_row)
						const o = s.a.create(this.getProp('distance', f, s.a.ZERO)),
							a = this.getProp('displace', f, 0),
							h = s.a.create(this.getProp('scale', f, s.a.ONE)),
							d = s.a.create(this.getProp('translate', f, s.a.ZERO)),
							p = this.getProp('skewX', f, 0),
							v = this.getProp('skewY', f, 0),
							P = this.getProp('squeezeX', f, 0),
							b = this.getProp('squeezeY', f, 0),
							x = this.getProp('rotateX', f, 0),
							w = this.getProp('rotateY', f, 0),
							C = this.getProp('rotateZ', f, 0),
							S = s.a.ZERO,
							E = this.generateBuffer(t, f),
							I = E.length
						let T
						switch (((g[y] = new Float32Array(I)), (this.single_repetition_buffer_length[y] = I), (m += I), u)) {
							case i.a.Ring:
								;(T = s.a.create(o[0], 0)), s.a.rotateZ(T, s.a.ZERO, l.current_angle + a)
								break
							case i.a.Matrix:
								T = s.a.create(o[0] * (n - _[0]), o[1] * (r - _[1]))
						}
						for (let t = 0; t < I; t += 2) {
							const r = s.a.create(E[t], E[t + 1])
							this.applyVertexTransform(r),
								0 != P && s.a.squeezeX(r, P),
								0 != b && s.a.squeezeY(r, b),
								0 != x && s.a.rotateX(r, S, x),
								0 != w && s.a.rotateY(r, S, w),
								0 != C && s.a.rotateZ(r, S, C),
								0 != p && s.a.skewX(r, p),
								0 != v && s.a.skewY(r, v),
								(0 != d[0] || 0 != d[1]) && s.a.translate(r, d),
								(1 != h[0] || 1 != h[1]) && s.a.scale(r, h),
								u == i.a.Ring && s.a.rotateZ(r, s.a.ZERO, l.current_angle + a),
								s.a.translate(r, T),
								e && ((r[0] += this.scene.center[0]), (r[1] += this.scene.center[1])),
								(g[y][t] = r[0]),
								(g[y][t + 1] = r[1])
						}
					}
				this.buffer = new Float32Array(m)
				for (let t = 0, e = 0, r = g.length; t < r; e += g[t].length, t++) this.buffer.set(g[t], e)
				!e || (this.indexed_buffer && this.bStaticIndexed) || this.index((this.indexed_buffer = []))
			}
			applyVertexTransform(t) {}
			getRepetitionCount() {
				var t
				let e = this.getProp('repetitions', void 0, 1)
				return Array.isArray(e) ? e[0] * (null !== (t = e[1]) && void 0 !== t ? t : e[0]) : e
			}
			getBuffer() {
				return this.buffer
			}
			getIndexedBuffer() {
				return this.indexed_buffer
			}
			getSingleRepetitionBufferLength() {
				return this.single_repetition_buffer_length
			}
			stream(t) {
				if (this.scene && this.buffer && this.indexed_buffer)
					for (let e = 0, r = 0, i = this.indexed_buffer.length; e < i; e++) {
						const n = this.indexed_buffer[e],
							s = { shape: n.shape, repetition: n.repetition, time: 0, parent: n.parent, data: n.shape.data },
							o = n.shape.getProp('fillColor', s),
							a = n.shape.getProp('lineWidth', s, o ? void 0 : 1),
							l = n.shape.getProp('strokeColor', s, o ? void 0 : this.scene.mainColor)
						t({
							shape: n.shape,
							repetition: n.repetition,
							buffer: this.buffer,
							buffer_length: n.buffer_length,
							current_buffer_index: r,
							current_shape_index: e,
							total_shapes: i,
							lineWidth: a,
							strokeColor: l,
							fillColor: o,
						}),
							(r += n.buffer_length)
					}
			}
			index(t, e) {
				var r, n
				if (this.getBuffer()) {
					const s = this.getProp('repetitions', { parent: e, time: 1, repetition: o.getEmptyRepetition() }, 1),
						a = Array.isArray(s) ? i.a.Matrix : i.a.Ring,
						l = Array.isArray(s) ? s[0] * (null !== (r = s[1]) && void 0 !== r ? r : s[0]) : s,
						h = Array.isArray(s) ? s[0] : 1,
						u = Array.isArray(s) ? (null !== (n = s[1]) && void 0 !== n ? n : s[0]) : l
					let c = 0
					for (let r = 0; r < h; r++)
						for (let n = 0; n < u; n++, c++) {
							const s = {
								current_index: c + 1,
								current_offset: (c + 1) / l,
								current_angle: a == i.a.Ring ? ((2 * Math.PI) / l) * c : 0,
								count: l,
								count_col: u,
								count_row: h,
								current_col: n + 1,
								current_col_offset: (n + 1) / u,
								current_row: r + 1,
								current_row_offset: (r + 1) / h,
								type: a,
							}
							this.addIndex(t, this.single_repetition_buffer_length[c], s, e)
						}
				}
			}
			getAngleFromMatrixRepetition(t, e) {
				var r
				if (t.type == i.a.Matrix) {
					const r = e,
						i = s.a.create((t.count_col - 1) / 2, (t.count_row - 1) / 2)
					return (
						(i[0] += i[0] * r[0]),
						(i[1] += i[1] * r[1]),
						Math.atan((t.current_row - 1 - i[1]) / (t.current_col - 1 - i[0]))
					)
				}
				return null !== (r = t.current_angle) && void 0 !== r ? r : 0
			}
			getDistanceFromMatrixRepetition(t, e) {
				if (t.type == i.a.Matrix) {
					const r = e,
						i = s.a.create((t.count_col - 1) / 2, (t.count_row - 1) / 2)
					;(i[0] += i[0] * r[0]), (i[1] += i[1] * r[1])
					const n = s.a.create(t.current_col - 1, t.current_row - 1)
					return s.a.distance(n, i)
				}
				return 1
			}
		}
		;(o.EMPTY_BUFFER = new Float32Array(0)),
			(o.getEmptyRepetition = () => ({
				current_index: 1,
				current_offset: 0,
				current_angle: 0,
				current_col: 1,
				current_row: 1,
				current_col_offset: 0,
				current_row_offset: 0,
				type: i.a.Ring,
				count: 1,
				count_col: 1,
				count_row: 1,
			})),
			(o.EMPTY_PROP_ARGUMENTS = { time: 1, repetition: o.getEmptyRepetition() }),
			(e.a = o)
	},
	357: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(358)
		e.Pups = i.default
		const n = r(63)
		e.Model = n.default
		const s = r(161)
		e.Color = s.default
		const o = r(160)
		e.Palette = o.default
		const a = r(162)
		e.Typography = a.default
		const l = r(116)
		e.ModularScale = l.default
		const h = r(373)
		;(e.types = h), (e.default = i.default)
	},
	358: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(359),
			n = r(360)
		e.default = class {
			constructor(t) {
				;(this.components = {}),
					(this.pupsConfig = new n.default(t)),
					this.palette.getColors().map(t => {
						const e = t
						Object.defineProperty(this, e.getCcName(), {
							enumerable: !1,
							configurable: !1,
							writable: !1,
							value: this.color(e.getCcName()),
						})
					})
			}
			getPupsConfig() {
				return this.pupsConfig
			}
			get palette() {
				return this.pupsConfig.getPalette()
			}
			color(t, e) {
				return this.palette.get(t, e || this.palette.getFormat())
			}
			get modularScale() {
				return this.pupsConfig.getModularScale()
			}
			ms(t, e = !1) {
				const r = this.modularScale.get(t)
				return e ? parseInt(r) : r
			}
			add(...t) {
				return this.modularScale.add.apply(this.modularScale, t)
			}
			sub(...t) {
				return this.modularScale.sub.apply(this.modularScale, t)
			}
			mul(...t) {
				return this.modularScale.mul.apply(this.modularScale, t)
			}
			div(...t) {
				return this.modularScale.div.apply(this.modularScale, t)
			}
			get ratio() {
				return this.modularScale.getRatio()
			}
			get typography() {
				return this.pupsConfig.getTypography()
			}
			get mediaQuery() {
				return this.pupsConfig.getMediaQuery()
			}
			mq(t, e = null) {
				return this.mediaQuery.get(t, e)
			}
			get animation() {
				return this.pupsConfig.getAnimation()
			}
			tm(t, e) {
				return this.animation.getTiming(t, e)
			}
			es(t) {
				return this.animation.getEasing(t)
			}
			define() {
				const t = Array.from(arguments)
				if ('string' != typeof t[0]) throw new i.DefineComponentException()
				t[0] in this.components && console.warn(`Il componente ${t[0]} è già esistente e verrà sostituito.`),
					this.setComponent(
						t.shift(),
						Object.assign.apply(
							null,
							t.map(t => ('string' == typeof t ? this.getComponent(t) : t))
						)
					)
			}
			require(t) {
				return this.getComponent(t)
			}
			getComponent(t) {
				if (t in this.components) return this.components[t]
				throw new i.ComponentNotFoundException(t)
			}
			setComponent(t, e) {
				t in this.components && console.warn(`Il componente ${t} è già esistente e verrà sostituito.`),
					(this.components[t] = e)
			}
		}
	},
	359: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		class i extends Error {
			constructor() {
				super("Il primo argomento del metodo 'define' deve essere una stringa (il nome del nuovo componente).")
			}
		}
		e.DefineComponentException = i
		class n extends Error {
			constructor(t) {
				super(`Il componente '${t}' non è stato trovato.`)
			}
		}
		e.ComponentNotFoundException = n
	},
	360: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(160),
			n = r(116),
			s = r(162),
			o = r(369),
			a = r(371)
		e.default = class {
			constructor(t) {
				t && this.import(t)
			}
			getPalette() {
				return this.palette
			}
			getModularScale() {
				return this.modularScale
			}
			getTypography() {
				return this.typography
			}
			getMediaQuery() {
				return this.mediaQuery
			}
			getAnimation() {
				return this.animation
			}
			import(t) {
				;(this.palette = new i.default(t.palette)),
					(this.modularScale = t.modularScale
						? new n.default(t.modularScale.base, t.modularScale.unit, t.modularScale.ratio, t.modularScale.rootBase)
						: new n.default()),
					(this.typography = t.typography
						? new s.default(this.modularScale, t.typography.fontSize, t.typography.lineHeight, t.typography.lineWidth)
						: new s.default(this.modularScale)),
					(this.mediaQuery = new o.default(t.mediaQuery)),
					(this.animation = t.animation ? new a.default(t.animation.timings, t.animation.easings) : new a.default()),
					(this.version = t.version)
			}
			importFromString(t) {
				this.import(JSON.parse(t))
			}
			export() {
				return {
					palette: this.palette.export(),
					modularScale: this.modularScale.export(),
					typography: this.typography.export(),
					mediaQuery: this.mediaQuery.export(),
					animation: this.animation.export(),
					version: this.version,
				}
			}
			toJSON() {
				return JSON.stringify(this.export())
			}
		}
	},
	361: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(115),
			n = r(84)
		e.default = class {
			constructor(t, e, r, s, o) {
				e.length || (e = i.randomString(5)),
					(this.id = s || i.randomString()),
					(this.ccName = i.toCamelCase(e)),
					(this.name = e),
					(this.tags = r),
					(this.format = o || 'hex'),
					(this.value = new n.default(t))
			}
			getId() {
				return this.id
			}
			getName() {
				return this.name
			}
			getCcName() {
				return this.ccName
			}
			getValue(t = this.format) {
				return this.value['to' + t.toUpperCase()]()
			}
			getTags() {
				return this.tags
			}
			setId(t) {
				this.id = t
			}
			setName(t) {
				;(this.name = t), (this.ccName = i.toCamelCase(t))
			}
			setValue(t) {
				this.value = new n.default(t)
			}
			setTags(t) {
				this.tags = t
			}
			toString(t = this.format) {
				return this.getValue(t)
			}
		}
	},
	362: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(363),
			n = r(65),
			s = r(45)
		class o {
			static parse(t) {
				return 'string' == typeof t ? o.fromString(t) : o.fromObject(t)
			}
			static fromString(t) {
				let e,
					r = null
				for (let i = o.MATCHES.length - 1; i >= 0; i--)
					(e = o.MATCHES[i].regexp.exec(t)) && (r = { type: o.MATCHES[i].type, value: e.slice(1) })
				if (!r) throw new i.ColorNotValidException(t, o.MATCHES)
				if (-1 != r.type.indexOf('hex')) return r
				r.value = n.toFloat(r.value)
				const s =
					'string' == typeof o.MATCH_VALUES[r.type] ? o.MATCH_VALUES[o.MATCH_VALUES[r.type]] : o.MATCH_VALUES[r.type]
				for (let t in s.possibilities)
					if (o.isFromZeroTo(r.value, s.possibilities[t]))
						return (
							s.possibilities[t] != s.want && (r.value = o.scaleToFromZeroTo(r.value, s.possibilities[t], s.want)), r
						)
				throw new i.ColorParsingException(t)
			}
			static fromObject(t) {
				if ('r' in t) return { type: 'rgba', value: [t.r, t.g, t.b, t.a] }
				if ('l' in t) return { type: 'hsla', value: [t.h, t.s, t.l, t.a] }
				if ('v' in t) return { type: 'hsva', value: [t.h, t.s, t.v, t.a] }
				if ('c' in t) return { type: 'cmyk', value: [t.c, t.m, t.y, t.k] }
				throw new i.ColorParsingException(JSON.stringify(t))
			}
			static isFromZeroToOne(t) {
				for (let e in t) if (t[e] > 1) return !1
				return !0
			}
			static isFromZeroTo(t, e) {
				if (((Array.isArray(e) && e != o.ZERO_TO_ONE) || (!Array.isArray(e) && 1 == e)) && o.isFromZeroToOne(t))
					return !1
				for (let r in t) if (t[r] > (Array.isArray(e) ? e[r] : e)) return !1
				return !0
			}
			static scaleToFromZeroToOne(t, e) {
				if (o.isFromZeroToOne(t)) return t
				const r = []
				for (let i in t) r.push(s.clamp01(t[i] / (Array.isArray(e) ? e[i] : e)))
				return r
			}
			static scaleToFromZeroTo(t, e, r) {
				const i = []
				for (let n in t)
					i.push(
						s.clamp(
							0,
							Array.isArray(r) ? r[n] : r,
							(t[n] / (Array.isArray(e) ? e[n] : e)) * (Array.isArray(r) ? r[n] : r)
						)
					)
				return i
			}
		}
		;(o.CSS_INTEGER = '[-\\+]?\\d+%?'),
			(o.CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?'),
			(o.CSS_UNIT = '(?:' + o.CSS_NUMBER + ')|(?:' + o.CSS_INTEGER + ')'),
			(o.PERMISSIVE_MATCH3 =
				'[\\s|\\(]+(' + o.CSS_UNIT + ')[,|\\s]+(' + o.CSS_UNIT + ')[,|\\s]+(' + o.CSS_UNIT + ')\\s*\\)?'),
			(o.PERMISSIVE_MATCH4 =
				'[\\s|\\(]+(' +
				o.CSS_UNIT +
				')[,|\\s]+(' +
				o.CSS_UNIT +
				')[,|\\s]+(' +
				o.CSS_UNIT +
				')[,|\\s]+(' +
				o.CSS_UNIT +
				')\\s*\\)?'),
			(o.ZERO_TO_ONE = [1, 1, 1, 1]),
			(o.ZERO_TO_255 = [255, 255, 255, 1]),
			(o.MATCH_VALUES = {
				rgb: { possibilities: [o.ZERO_TO_ONE, o.ZERO_TO_255], want: o.ZERO_TO_255 },
				rgba: 'rgb',
				cmyk: { possibilities: [[100, 100, 100, 100], o.ZERO_TO_ONE], want: o.ZERO_TO_ONE },
				hsl: { possibilities: [[360, 100, 100, 1], o.ZERO_TO_ONE], want: o.ZERO_TO_ONE },
				hsla: 'hsl',
				hsv: 'hsl',
				hsva: 'hsl',
			}),
			(o.MATCHES = [
				{ type: 'rgb', regexp: new RegExp('rgb' + o.PERMISSIVE_MATCH3) },
				{ type: 'rgba', regexp: new RegExp('rgba' + o.PERMISSIVE_MATCH4) },
				{ type: 'hsl', regexp: new RegExp('hsl' + o.PERMISSIVE_MATCH3) },
				{ type: 'hsla', regexp: new RegExp('hsla' + o.PERMISSIVE_MATCH4) },
				{ type: 'hsv', regexp: new RegExp('hsv' + o.PERMISSIVE_MATCH3) },
				{ type: 'hsva', regexp: new RegExp('hsva' + o.PERMISSIVE_MATCH4) },
				{ type: 'cmyk', regexp: new RegExp('cmyk' + o.PERMISSIVE_MATCH4) },
				{ type: 'hex3', regexp: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/ },
				{ type: 'hex6', regexp: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/ },
				{ type: 'hex4', regexp: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/ },
				{ type: 'hex8', regexp: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/ },
			]),
			(e.default = o)
	},
	363: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		class i extends Error {
			constructor(t, e) {
				super(`Il colore '${t}' non è valido.\nI formati supportati sono: ${e.map(t => t.type).join(', ')}`)
			}
		}
		e.ColorNotValidException = i
		class n extends Error {
			constructor(t) {
				super(`Impossibile convertire il colore '${t}'`)
			}
		}
		e.ColorParsingException = n
	},
	364: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		class i {
			static rgbToHex(t) {
				return `#${i.toHex(t.r)}${i.toHex(t.g)}${i.toHex(t.b)}`
			}
			static toHex(t) {
				const e = t.toString(16)
				return 2 == e.length ? e : '0' + e
			}
			static hexToRgb(t) {
				return (
					(t = 'string' == typeof t ? t.match(/[a-zA-Z0-9]{2}/gi) : t),
					{ r: i.hexToDec(t[0]), g: i.hexToDec(t[1]), b: i.hexToDec(t[2]) }
				)
			}
			static hexToDec(t) {
				return parseInt(i.fill2(t), 16)
			}
			static fill2(t) {
				return 1 == t.length ? t + t : t
			}
			static rgbToHsl(t) {
				let e = t.r / 255,
					r = t.g / 255,
					i = t.b / 255
				const n = Math.max(e, r, i),
					s = Math.min(e, r, i)
				let o,
					a,
					l = (n + s) / 2
				if (n == s) o = a = 0
				else {
					const t = n - s
					switch (((a = l > 0.5 ? t / (2 - n - s) : t / (n + s)), n)) {
						case e:
							o = (r - i) / t + (r < i ? 6 : 0)
							break
						case r:
							o = (i - e) / t + 2
							break
						case i:
							o = (e - r) / t + 4
					}
					o /= 6
				}
				return { h: o, s: a, l: l }
			}
			static hslToRgb(t) {
				let e,
					r,
					i,
					n = t.h,
					s = t.s,
					o = t.l
				if (0 == s) e = r = i = o
				else {
					const t = (t, e, r) =>
							(r += r < 0 ? 1 : r > 1 ? -1 : 0) < 1 / 6
								? t + 6 * (e - t) * r
								: r < 0.5
								? e
								: r < 2 / 3
								? t + (e - t) * (2 / 3 - r) * 6
								: t,
						a = o < 0.5 ? o * (1 + s) : o + s - o * s,
						l = 2 * o - a
					;(e = t(l, a, n + 1 / 3)), (r = t(l, a, n)), (i = t(l, a, n - 1 / 3))
				}
				return { r: Math.round(255 * e), g: Math.round(255 * r), b: Math.round(255 * i) }
			}
			static rgbToHsv(t) {
				let e = t.r / 255,
					r = t.g / 255,
					i = t.b / 255
				const n = Math.max(e, r, i),
					s = Math.min(e, r, i)
				let o,
					a,
					l = n
				const h = n - s
				if (((a = 0 == n ? 0 : h / n), n == s)) o = 0
				else {
					switch (n) {
						case e:
							o = (r - i) / h + (r < i ? 6 : 0)
							break
						case r:
							o = (i - e) / h + 2
							break
						case i:
							o = (e - r) / h + 4
					}
					o /= 6
				}
				return { h: o, s: a, v: l }
			}
			static hsvToRgb(t) {
				let e,
					r,
					i,
					n = t.h,
					s = t.s,
					o = t.v
				const a = Math.floor(6 * n),
					l = 6 * n - a,
					h = o * (1 - s),
					u = o * (1 - l * s),
					c = o * (1 - (1 - l) * s)
				switch (a % 6) {
					case 0:
						;(e = o), (r = c), (i = h)
						break
					case 1:
						;(e = u), (r = o), (i = h)
						break
					case 2:
						;(e = h), (r = o), (i = c)
						break
					case 3:
						;(e = h), (r = u), (i = o)
						break
					case 4:
						;(e = c), (r = h), (i = o)
						break
					case 5:
						;(e = o), (r = h), (i = u)
				}
				return { r: Math.round(255 * e), g: Math.round(255 * r), b: Math.round(255 * i) }
			}
			static rgbToCmyk(t) {
				let e = t.r / 255,
					r = t.g / 255,
					i = t.b / 255,
					n = { k: null, c: null, m: null, y: null }
				return (
					(n.k = +(1 - Math.max.call(null, e, r, i))),
					(n.c = +(1 - e - n.k) / (1 - n.k)),
					(n.m = +(1 - r - n.k) / (1 - n.k)),
					(n.y = +(1 - i - n.k) / (1 - n.k)),
					n
				)
			}
			static cmykToRgb(t) {
				return { r: 255 * (1 - t.c) * (1 - t.k), g: 255 * (1 - t.m) * (1 - t.k), b: 255 * (1 - t.y) * (1 - t.k) }
			}
		}
		e.default = i
	},
	365: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		class i extends Error {
			constructor(t, e) {
				super(`Il formato '${t}' non è valido. I formati supportati sono: ${e.join(', ')}`)
			}
		}
		e.FormatNotValidException = i
		class n extends Error {
			constructor(t) {
				super(`Il colore con id '${t}' non è stato trovato`)
			}
		}
		e.ColorNotFoundException = n
		class s extends Error {
			constructor(t) {
				super(`il tag '${t}' non è stato trovato.`)
			}
		}
		e.TagNotFoundException = s
	},
	366: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 }), (e.DEFAULT_COLOR_FORMAT = 'rgba')
	},
	367: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		class i extends Error {
			constructor() {
				super("Il valore di 'rootBase' deve essere espresso in pixel: Es. '16px'")
			}
		}
		e.RootBaseNotValidException = i
		class n extends Error {
			constructor(t, e) {
				super(`L'unità '${t}' non è stata trovata.\nI valori possibili sono: '${e.join(', ')}'`)
			}
		}
		e.UnitNotValidException = n
		class s extends Error {
			constructor(t) {
				super(
					"Il valore di 'ratio' non è valido. Inserire un valore numerico oppure una costante tra: " +
						Object.keys(t)
							.map(e => e + `(${t[e]})`)
							.join(', ')
				)
			}
		}
		e.RatioNotValidException = s
	},
	368: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		;(e.SQRT_5 = Math.sqrt(5)),
			(e.PHI = (e.SQRT_5 + 1) / 2),
			(e.GLD10 = 100 / e.PHI),
			(e.GLD9 = 100 - e.GLD10),
			(e.GLD8 = e.GLD9 / e.PHI),
			(e.GLD7 = e.GLD9 - e.GLD8),
			(e.GLD6 = e.GLD7 / e.PHI),
			(e.GLD5 = e.GLD7 - e.GLD6),
			(e.GLD4 = e.GLD5 / e.PHI),
			(e.GLD3 = e.GLD5 - e.GLD4),
			(e.GLD2 = e.GLD3 / e.PHI),
			(e.GLD1 = e.GLD3 - e.GLD2),
			(e.DEFAULT_MODULAR_SCALE_BASE = 1),
			(e.DEFAULT_MODULAR_SCALE_RATIO = e.PHI),
			(e.DEFAULT_MODULAR_SCALE_UNIT = 'rem'),
			(e.DEFAULT_MODULAR_SCALE_ROOT_BASE = '16px')
	},
	369: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(63),
			n = r(370)
		class s extends i.default {
			constructor(t) {
				super(),
					(this.exportableProperties = ['breakpoints']),
					(this.breakpoints = t || {}),
					Object.keys(this.breakpoints).forEach(t => {
						Object.defineProperty(this, t, {
							enumerable: !1,
							configurable: !1,
							writable: !1,
							value: e => this.get(t, e),
						})
					})
			}
			get(t, e = null) {
				const r = Object.keys(this.breakpoints)
				for (let i = r.length - 1; i >= 0; i--)
					if (r[i] == t) return e ? this.toCSS(this.breakpoints[r[i]], e) : this.breakpoints[r[i]]
				throw new n.MediaQueryNotFoundException(t)
			}
			toCSS(t, e) {
				return `@media ${t} { ${e} }`
			}
		}
		e.default = s
	},
	370: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		class i extends Error {
			constructor(t) {
				super(`La media query '${t}' non è stata trovata.`)
			}
		}
		e.MediaQueryNotFoundException = i
	},
	371: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(63),
			n = r(372)
		class s extends i.default {
			constructor(t, e, r, i) {
				super(),
					(this.exportableProperties = ['timings', 'easings']),
					(this.timings = {}),
					(this.easings = e || {}),
					(this.timingUnit = r || 'ms'),
					(this.deafultAddUnit = i || !0),
					t && Object.keys(t).forEach(e => this.setTiming(e, t[e]))
			}
			setTiming(t, e) {
				this.timings[t] = 'string' == typeof e ? parseFloat(this.stringToTimingUnit(e)) : e
			}
			getTiming(t, e = this.deafultAddUnit) {
				if (!(t in this.timings)) throw new n.TimingNotFoundException(t)
				return e ? this.timings[t] : this.timings[t] + this.timingUnit
			}
			setEasing(t, e) {
				this.easings[t] = e
			}
			getEasing(t) {
				if (!(t in this.easings)) throw new n.EasingNotFoundException(t)
				return this.easings[t]
			}
			setTimingUnit(t) {
				this.timingUnit = t
			}
			getTimingUnit() {
				return this.timingUnit
			}
			setDeafultAddUnit(t) {
				this.deafultAddUnit = t
			}
			getDeafultAddUnit() {
				return this.deafultAddUnit
			}
			isInMilliseconds(t) {
				return null != t.match(/\d+ms/g)
			}
			isInSeconds(t) {
				return null != t.match(/\d+s/g)
			}
			stringToTimingUnit(t) {
				const e = parseFloat(t),
					r = this.isInSeconds(t)
				return 's' == this.timingUnit ? (r ? t : e / 1e3 + 's') : r ? 1e3 * e + 'ms' : t
			}
		}
		e.default = s
	},
	372: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		class i extends Error {
			constructor(t) {
				super(`La durata '${t}' non è stata trovata.`)
			}
		}
		e.TimingNotFoundException = i
		class n extends Error {
			constructor(t) {
				super(`L'easing '${t}' non è stato trovato.`)
			}
		}
		e.EasingNotFoundException = n
	},
	373: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
	},
	374: function (t, e) {
		t.exports = {
			version: '1.0.0',
			palette: {
				colors: [
					{ id: '1', name: 'primary', value: '#1fcc9a', tags: ['custom'] },
					{ id: '3', name: 'dark', value: '#111413', tags: ['custom'] },
					{ id: '3', name: 'dark-lighten', value: '#1d2220', tags: ['custom'] },
					{ id: '3', name: 'dark-verylighten', value: '#343e3a', tags: ['custom'] },
					{ id: '3', name: 'dark-darken', value: '#050606', tags: ['custom'] },
					{ id: '3', name: 'gray-dark', value: '#404b47', tags: ['custom'] },
					{ id: '4', name: 'secondary', value: '#cc1f51', tags: ['custom'] },
					{ id: '4', name: 'red', value: '#cc2200', tags: ['custom'] },
					{ id: '5', name: 'green', value: '#22cc00', tags: ['custom'] },
				],
				format: 'hex',
			},
			modularScale: { rootBase: '16px', base: 1, unit: 'rem', ratio: 'PHI' },
			mediaQuery: {
				xs: '(max-width: 480px)',
				s: '(min-width: 481px) and (max-width: 992px)',
				mp: '(min-width: 481px) and (max-width: 992px) and (orientation: portrait)',
				ml: '(min-width: 481px) and (max-width: 992px) and (orientation: landscape)',
				l: '(min-width: 1241px) and (max-width: 1440px)',
				xl: '(min-width: 1441px) and (max-width: 0px)',
				mi: 'only screen and (max-width: 992px)',
				ma: 'only screen and (min-width: 993px)',
				dpx: '(min-width-resolution: 2dppx) and (color: true)',
				print: 'print and (monocrome: true)',
			},
			typography: {},
		}
	},
	38: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 }),
			(e.isDef = t => void 0 !== t),
			(e.isUndef = t => !e.isDef(t)),
			(e.isEqual = (t, r) => {
				if ('object' != typeof t || null === t || null === r) return t === r
				{
					const i = Object.keys(t)
					for (let n = 0, s = i.length; n < s; n++) if (void 0 === r[i[n]] || !e.isEqual(t[i[n]], r[i[n]])) return !1
				}
				return !0
			}),
			(e.map = (t, e) => (
				Object.keys(t).forEach((r, i) => {
					t[r] = e(t[r], r, i)
				}),
				t
			)),
			(e.each = (t, e) => {
				Object.keys(t).forEach((r, i) => {
					e(t[r], r, i)
				})
			}),
			(e.hasProperty = (t, e) => void 0 !== this.getProperty(t, e, void 0)),
			(e.getProperty = (t, e, r = null) => {
				const i = e.split('.'),
					n = i.length
				for (let e = 0; e < n; e++) {
					const n = i[e],
						s = parseInt(n)
					if ('*' == n && Array.isArray(t)) return t.map(t => this.getProperty(t, i.slice(e + 1).join('.'), r))
					if (!isNaN(s) && Array.isArray(t)) return this.getProperty(t[e], i.slice(e + 1).join('.'), r)
					if (!t.hasOwnProperty(n)) return r
					if (void 0 === (t = t[n])) return r
				}
				return t
			}),
			(e.setProperties = (t, e, r) => {
				e.forEach((e, i) => {
					let n = t
					const s = e.split('.'),
						o = s.pop()
					s.forEach(t => {
						n = n[t] || {}
					}),
						(n[o] = Array.isArray(r) ? r[i] : 'function' == typeof r ? r(n[o]) : r)
				})
			})
	},
	381: function (t, e, r) {
		'use strict'
		var i = r(4),
			n = r(122),
			s = r(165)
		class o {
			constructor(t, e, r = {}, i = 0) {
				var n, o, a, l, h, u, c
				if (
					((this.timeline = new s.a()),
					(this.resolution = i || (t && t.width ? t.width : 0)),
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
					scale: null !== (n = r.scale) && void 0 !== n ? n : 1,
					translate: null !== (o = r.translate) && void 0 !== o ? o : [0, 0],
					time: null !== (a = r.time) && void 0 !== a ? a : 0,
					simmetricLine: null !== (l = r.simmetricLine) && void 0 !== l ? l : 0,
					clearCanvas: null === (h = r.clearCanvas) || void 0 === h || h,
					fixedLineWidth: null !== (u = r.fixedLineWidth) && void 0 !== u && u,
					noBackground: null !== (c = r.noBackground) && void 0 !== c && c,
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
					for (let r = 0, i = e.length; r < i; r++) this.drawOptions[e[r]] = t[e[r]]
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
						i = this.timeline.getSequenceEndTime()
					for (let n = 1; n <= t.ghosts; n++) {
						const s = r - (t.ghost_skip_function ? t.ghost_skip_function(n) : n * (t.ghost_skip_time || 30))
						;(t.clearCanvas = 1 == n),
							(t.ghost_index = n),
							(t.time = s < 0 ? s + i : s > i ? s % i : s),
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
				var o, a, l, h
				const u = Object(n.a)()
				if (e) {
					const n = null !== (o = r.scale) && void 0 !== o ? o : 1,
						u = null !== (a = r.translate) && void 0 !== a ? a : [0, 0],
						c = null !== (l = r.time) && void 0 !== l ? l : 0,
						d = null !== (h = r.simmetricLine) && void 0 !== h ? h : 0,
						p = r.fixedLineWidth,
						f = r.clearCanvas,
						m = r.noBackground,
						g = r.backgroundImage,
						y = void 0 !== r.ghosts && r.ghosts > 0 && void 0 !== r.ghost_index && r.ghost_index > 0,
						_ = y ? 1 - r.ghost_index / (r.ghosts + 0.5) : 1,
						v = t.width,
						P = t.height,
						b = [(v / ((s = s || v) / (v > P ? 1 : P / v))) * n, (P / (s / (v > P ? v / P : 1))) * n],
						x = [
							v / 2 - (n > 1 ? (u[0] * v) / (1 / ((n - 1) / 2)) : 0),
							P / 2 - (n > 1 ? (u[1] * P) / (1 / ((n - 1) / 2)) : 0),
						]
					if (
						((t.current_time = c),
						t.getChildren().forEach(t => {
							var e, r
							!1 === (null === (e = null == t ? void 0 : t.data) || void 0 === e ? void 0 : e.visible) ||
								(y && !0 === (null === (r = null == t ? void 0 : t.data) || void 0 === r ? void 0 : r.disableGhost)) ||
								t.generate(c, !0)
						}),
						f &&
							(m
								? e.clearRect(0, 0, v, P)
								: ((e.fillStyle = t.background), e.fillRect(0, 0, v, P), g && e.drawImage(g, 0, 0, v, P))),
						d > 0)
					) {
						const r = Math.PI / d,
							n = Math.max(v, P) / 2,
							s = [n / 2, n / 2]
						for (let o = 0; o < d; o++) {
							const a = Float32Array.from([-n, -n]),
								l = Float32Array.from([2 * n, 2 * n]),
								h = o * r + Math.PI / 4
							i.a.rotateZ(a, s, h),
								i.a.rotateZ(l, s, h),
								e.beginPath(),
								(e.strokeStyle = t.mainColor),
								(e.lineWidth = 1),
								e.moveTo((a[0] - n / 2) * b[0] + x[0], (a[1] - n / 2) * b[1] + x[1]),
								e.lineTo((l[0] - n / 2) * b[0] + x[0], (l[1] - n / 2) * b[1] + x[1]),
								e.stroke()
						}
					}
					t.draw(
						({
							lineWidth: r,
							strokeColor: i,
							fillColor: s,
							shape: o,
							buffer: a,
							buffer_length: l,
							current_buffer_index: h,
						}) => {
							var u, c
							if (
								!(
									0 == (null === (u = null == o ? void 0 : o.data) || void 0 === u ? void 0 : u.visible) ||
									(y && 1 == (null === (c = null == o ? void 0 : o.data) || void 0 === c ? void 0 : c.disableGhost))
								)
							) {
								e.beginPath(), e.moveTo((a[h] - v / 2) * b[0] + x[0], (a[h + 1] - P / 2) * b[1] + x[1])
								for (let t = 2; t < l; t += 2)
									e.lineTo((a[h + t] - v / 2) * b[0] + x[0], (a[h + t + 1] - P / 2) * b[1] + x[1])
								if ((o && o.isClosed() && e.closePath(), o && o.data && o.data.highlighted))
									return (e.lineWidth = 3 * (r || 1) * n), (e.strokeStyle = t.mainColor), void e.stroke()
								if (s) {
									if (y) {
										const t = /\((.+),(.+),(.+),(.+)\)/g.exec(s)
										if (t) {
											let [, e, r, i, n] = t
											const o = n ? parseFloat(n) : 1,
												a = o <= 0 ? 0 : o * _
											s = s.indexOf('rgb') >= 0 ? `rgba(${e},${r},${i},${a})` : `hsla(${e},${r},${i},${a})`
										}
									}
									;(e.fillStyle = s), e.fill()
								}
								if (i && r) {
									if (y) {
										const t = /\((.+),(.+),(.+),(.+)\)/g.exec(i)
										if (t) {
											let [, e, r, n, s] = t
											const o = s ? parseFloat(s) : 1,
												a = o <= 0 ? 0 : o * _
											i = i.indexOf('rgb') >= 0 ? `rgba(${e},${r},${n},${a})` : `hsla(${e},${r},${n},${a})`
										}
										r *= _
									}
									;(e.lineWidth = p ? r : r * n), (e.strokeStyle = i), e.stroke()
								}
							}
						}
					)
				}
				return Object(n.a)() - u
			}
		}
		e.a = o
	},
	383: function (t, e, r) {
		;(function (e, r, i) {
			t.exports = (function t(e, r, i) {
				function n(o, a) {
					if (!r[o]) {
						if (!e[o]) {
							if (s) return s(o, !0)
							var l = new Error("Cannot find module '" + o + "'")
							throw ((l.code = 'MODULE_NOT_FOUND'), l)
						}
						var h = (r[o] = { exports: {} })
						e[o][0].call(
							h.exports,
							function (t) {
								return n(e[o][1][t] || t)
							},
							h,
							h.exports,
							t,
							e,
							r,
							i
						)
					}
					return r[o].exports
				}
				for (var s = !1, o = 0; o < i.length; o++) n(i[o])
				return n
			})(
				{
					1: [
						function (t, e, r) {
							'use strict'
							var i = t('./utils'),
								n = t('./support'),
								s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
							;(r.encode = function (t) {
								for (
									var e, r, n, o, a, l, h, u = [], c = 0, d = t.length, p = d, f = 'string' !== i.getTypeOf(t);
									c < t.length;

								)
									(p = d - c),
										(n = f
											? ((e = t[c++]), (r = c < d ? t[c++] : 0), c < d ? t[c++] : 0)
											: ((e = t.charCodeAt(c++)), (r = c < d ? t.charCodeAt(c++) : 0), c < d ? t.charCodeAt(c++) : 0)),
										(o = e >> 2),
										(a = ((3 & e) << 4) | (r >> 4)),
										(l = 1 < p ? ((15 & r) << 2) | (n >> 6) : 64),
										(h = 2 < p ? 63 & n : 64),
										u.push(s.charAt(o) + s.charAt(a) + s.charAt(l) + s.charAt(h))
								return u.join('')
							}),
								(r.decode = function (t) {
									var e,
										r,
										i,
										o,
										a,
										l,
										h = 0,
										u = 0,
										c = 'data:'
									if (t.substr(0, c.length) === c) throw new Error('Invalid base64 input, it looks like a data url.')
									var d,
										p = (3 * (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, '')).length) / 4
									if (
										(t.charAt(t.length - 1) === s.charAt(64) && p--,
										t.charAt(t.length - 2) === s.charAt(64) && p--,
										p % 1 != 0)
									)
										throw new Error('Invalid base64 input, bad content length.')
									for (d = n.uint8array ? new Uint8Array(0 | p) : new Array(0 | p); h < t.length; )
										(e = (s.indexOf(t.charAt(h++)) << 2) | ((o = s.indexOf(t.charAt(h++))) >> 4)),
											(r = ((15 & o) << 4) | ((a = s.indexOf(t.charAt(h++))) >> 2)),
											(i = ((3 & a) << 6) | (l = s.indexOf(t.charAt(h++)))),
											(d[u++] = e),
											64 !== a && (d[u++] = r),
											64 !== l && (d[u++] = i)
									return d
								})
						},
						{ './support': 30, './utils': 32 },
					],
					2: [
						function (t, e, r) {
							'use strict'
							var i = t('./external'),
								n = t('./stream/DataWorker'),
								s = t('./stream/DataLengthProbe'),
								o = t('./stream/Crc32Probe')
							function a(t, e, r, i, n) {
								;(this.compressedSize = t),
									(this.uncompressedSize = e),
									(this.crc32 = r),
									(this.compression = i),
									(this.compressedContent = n)
							}
							;(s = t('./stream/DataLengthProbe')),
								(a.prototype = {
									getContentWorker: function () {
										var t = new n(i.Promise.resolve(this.compressedContent))
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
										return new n(i.Promise.resolve(this.compressedContent))
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
							var i = t('./stream/GenericWorker')
							;(r.STORE = {
								magic: '\0\0',
								compressWorker: function (t) {
									return new i('STORE compression')
								},
								uncompressWorker: function () {
									return new i('STORE decompression')
								},
							}),
								(r.DEFLATE = t('./flate'))
						},
						{ './flate': 7, './stream/GenericWorker': 28 },
					],
					4: [
						function (t, e, r) {
							'use strict'
							var i = t('./utils'),
								n = (function () {
									for (var t, e = [], r = 0; r < 256; r++) {
										t = r
										for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1
										e[r] = t
									}
									return e
								})()
							e.exports = function (t, e) {
								return void 0 !== t && t.length
									? 'string' !== i.getTypeOf(t)
										? (function (t, e, r, i) {
												var s = n,
													o = 0 + r
												t ^= -1
												for (var a = 0; a < o; a++) t = (t >>> 8) ^ s[255 & (t ^ e[a])]
												return -1 ^ t
										  })(0 | e, t, t.length)
										: (function (t, e, r, i) {
												var s = n,
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
							var i
							;(i = 'undefined' != typeof Promise ? Promise : t('lie')), (e.exports = { Promise: i })
						},
						{ lie: 37 },
					],
					7: [
						function (t, e, r) {
							'use strict'
							var i =
									'undefined' != typeof Uint8Array &&
									'undefined' != typeof Uint16Array &&
									'undefined' != typeof Uint32Array,
								n = t('pako'),
								s = t('./utils'),
								o = t('./stream/GenericWorker'),
								a = i ? 'uint8array' : 'array'
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
									this._pako = new n[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 })
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
							function i(t, e) {
								var r,
									i = ''
								for (r = 0; r < e; r++) (i += String.fromCharCode(255 & t)), (t >>>= 8)
								return i
							}
							function n(t, e, r, n, o, u) {
								var c,
									d,
									p = t.file,
									f = t.compression,
									m = u !== a.utf8encode,
									g = s.transformTo('string', u(p.name)),
									y = s.transformTo('string', a.utf8encode(p.name)),
									_ = p.comment,
									v = s.transformTo('string', u(_)),
									P = s.transformTo('string', a.utf8encode(_)),
									b = y.length !== p.name.length,
									x = P.length !== _.length,
									w = '',
									C = '',
									S = '',
									E = p.dir,
									I = p.date,
									T = { crc32: 0, compressedSize: 0, uncompressedSize: 0 }
								;(e && !r) ||
									((T.crc32 = t.crc32),
									(T.compressedSize = t.compressedSize),
									(T.uncompressedSize = t.uncompressedSize))
								var A = 0
								e && (A |= 8), m || (!b && !x) || (A |= 2048)
								var O = 0,
									L = 0
								E && (O |= 16),
									'UNIX' === o
										? ((L = 798),
										  (O |= (function (t, e) {
												var r = t
												return t || (r = e ? 16893 : 33204), (65535 & r) << 16
										  })(p.unixPermissions, E)))
										: ((L = 20),
										  (O |= (function (t) {
												return 63 & (t || 0)
										  })(p.dosPermissions))),
									(c = I.getUTCHours()),
									(c <<= 6),
									(c |= I.getUTCMinutes()),
									(c <<= 5),
									(c |= I.getUTCSeconds() / 2),
									(d = I.getUTCFullYear() - 1980),
									(d <<= 4),
									(d |= I.getUTCMonth() + 1),
									(d <<= 5),
									(d |= I.getUTCDate()),
									b && ((C = i(1, 1) + i(l(g), 4) + y), (w += 'up' + i(C.length, 2) + C)),
									x && ((S = i(1, 1) + i(l(v), 4) + P), (w += 'uc' + i(S.length, 2) + S))
								var k = ''
								return (
									(k += '\n\0'),
									(k += i(A, 2)),
									(k += f.magic),
									(k += i(c, 2)),
									(k += i(d, 2)),
									(k += i(T.crc32, 4)),
									(k += i(T.compressedSize, 4)),
									(k += i(T.uncompressedSize, 4)),
									(k += i(g.length, 2)),
									(k += i(w.length, 2)),
									{
										fileRecord: h.LOCAL_FILE_HEADER + k + g + w,
										dirRecord:
											h.CENTRAL_FILE_HEADER + i(L, 2) + k + i(v.length, 2) + '\0\0\0\0' + i(O, 4) + i(n, 4) + g + w + v,
									}
								)
							}
							var s = t('../utils'),
								o = t('../stream/GenericWorker'),
								a = t('../utf8'),
								l = t('../crc32'),
								h = t('../signature')
							function u(t, e, r, i) {
								o.call(this, 'ZipFileWorker'),
									(this.bytesWritten = 0),
									(this.zipComment = e),
									(this.zipPlatform = r),
									(this.encodeFileName = i),
									(this.streamFiles = t),
									(this.accumulate = !1),
									(this.contentBuffer = []),
									(this.dirRecords = []),
									(this.currentSourceOffset = 0),
									(this.entriesCount = 0),
									(this.currentFile = null),
									(this._sources = [])
							}
							s.inherits(u, o),
								(u.prototype.push = function (t) {
									var e = t.meta.percent || 0,
										r = this.entriesCount,
										i = this._sources.length
									this.accumulate
										? this.contentBuffer.push(t)
										: ((this.bytesWritten += t.data.length),
										  o.prototype.push.call(this, {
												data: t.data,
												meta: { currentFile: this.currentFile, percent: r ? (e + 100 * (r - i - 1)) / r : 100 },
										  }))
								}),
								(u.prototype.openedSource = function (t) {
									;(this.currentSourceOffset = this.bytesWritten), (this.currentFile = t.file.name)
									var e = this.streamFiles && !t.file.dir
									if (e) {
										var r = n(t, e, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName)
										this.push({ data: r.fileRecord, meta: { percent: 0 } })
									} else this.accumulate = !0
								}),
								(u.prototype.closedSource = function (t) {
									this.accumulate = !1
									var e = this.streamFiles && !t.file.dir,
										r = n(t, e, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName)
									if ((this.dirRecords.push(r.dirRecord), e))
										this.push({
											data: (function (t) {
												return h.DATA_DESCRIPTOR + i(t.crc32, 4) + i(t.compressedSize, 4) + i(t.uncompressedSize, 4)
											})(t),
											meta: { percent: 100 },
										})
									else
										for (this.push({ data: r.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; )
											this.push(this.contentBuffer.shift())
									this.currentFile = null
								}),
								(u.prototype.flush = function () {
									for (var t = this.bytesWritten, e = 0; e < this.dirRecords.length; e++)
										this.push({ data: this.dirRecords[e], meta: { percent: 100 } })
									var r = this.bytesWritten - t,
										n = (function (t, e, r, n, o) {
											var a = s.transformTo('string', o(n))
											return (
												h.CENTRAL_DIRECTORY_END +
												'\0\0\0\0' +
												i(t, 2) +
												i(t, 2) +
												i(e, 4) +
												i(r, 4) +
												i(a.length, 2) +
												a
											)
										})(this.dirRecords.length, r, t, this.zipComment, this.encodeFileName)
									this.push({ data: n, meta: { percent: 100 } })
								}),
								(u.prototype.prepareNextSource = function () {
									;(this.previous = this._sources.shift()),
										this.openedSource(this.previous.streamInfo),
										this.isPaused ? this.previous.pause() : this.previous.resume()
								}),
								(u.prototype.registerPrevious = function (t) {
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
								(u.prototype.resume = function () {
									return (
										!!o.prototype.resume.call(this) &&
										(!this.previous && this._sources.length
											? (this.prepareNextSource(), !0)
											: this.previous || this._sources.length || this.generatedError
											? void 0
											: (this.end(), !0))
									)
								}),
								(u.prototype.error = function (t) {
									var e = this._sources
									if (!o.prototype.error.call(this, t)) return !1
									for (var r = 0; r < e.length; r++)
										try {
											e[r].error(t)
										} catch (t) {}
									return !0
								}),
								(u.prototype.lock = function () {
									o.prototype.lock.call(this)
									for (var t = this._sources, e = 0; e < t.length; e++) t[e].lock()
								}),
								(e.exports = u)
						},
						{ '../crc32': 4, '../signature': 23, '../stream/GenericWorker': 28, '../utf8': 31, '../utils': 32 },
					],
					9: [
						function (t, e, r) {
							'use strict'
							var i = t('../compressions'),
								n = t('./ZipFileWorker')
							r.generateWorker = function (t, e, r) {
								var s = new n(e.streamFiles, r, e.platform, e.encodeFileName),
									o = 0
								try {
									t.forEach(function (t, r) {
										o++
										var n = (function (t, e) {
												var r = t || e,
													n = i[r]
												if (!n) throw new Error(r + ' is not a valid compression method !')
												return n
											})(r.options.compression, e.compression),
											a = r.options.compressionOptions || e.compressionOptions || {},
											l = r.dir,
											h = r.date
										r._compressWorker(n, a)
											.withStreamInfo('file', {
												name: t,
												dir: l,
												date: h,
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
							function i() {
								if (!(this instanceof i)) return new i()
								if (arguments.length)
									throw new Error(
										'The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.'
									)
								;(this.files = {}),
									(this.comment = null),
									(this.root = ''),
									(this.clone = function () {
										var t = new i()
										for (var e in this) 'function' != typeof this[e] && (t[e] = this[e])
										return t
									})
							}
							;((i.prototype = t('./object')).loadAsync = t('./load')),
								(i.support = t('./support')),
								(i.defaults = t('./defaults')),
								(i.version = '3.5.0'),
								(i.loadAsync = function (t, e) {
									return new i().loadAsync(t, e)
								}),
								(i.external = t('./external')),
								(e.exports = i)
						},
						{ './defaults': 5, './external': 6, './load': 11, './object': 15, './support': 30 },
					],
					11: [
						function (t, e, r) {
							'use strict'
							var i = t('./utils'),
								n = t('./external'),
								s = t('./utf8'),
								o = ((i = t('./utils')), t('./zipEntries')),
								a = t('./stream/Crc32Probe'),
								l = t('./nodejsUtils')
							function h(t) {
								return new n.Promise(function (e, r) {
									var i = t.decompressed.getContentWorker().pipe(new a())
									i.on('error', function (t) {
										r(t)
									})
										.on('end', function () {
											i.streamInfo.crc32 !== t.decompressed.crc32 ? r(new Error('Corrupted zip : CRC32 mismatch')) : e()
										})
										.resume()
								})
							}
							e.exports = function (t, e) {
								var r = this
								return (
									(e = i.extend(e || {}, {
										base64: !1,
										checkCRC32: !1,
										optimizedBinaryString: !1,
										createFolders: !1,
										decodeFileName: s.utf8decode,
									})),
									l.isNode && l.isStream(t)
										? n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."))
										: i
												.prepareContent('the loaded zip file', t, !0, e.optimizedBinaryString, e.base64)
												.then(function (t) {
													var r = new o(e)
													return r.load(t), r
												})
												.then(function (t) {
													var r = [n.Promise.resolve(t)],
														i = t.files
													if (e.checkCRC32) for (var s = 0; s < i.length; s++) r.push(h(i[s]))
													return n.Promise.all(r)
												})
												.then(function (t) {
													for (var i = t.shift(), n = i.files, s = 0; s < n.length; s++) {
														var o = n[s]
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
													return i.zipComment.length && (r.comment = i.zipComment), r
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
							var i = t('../utils'),
								n = t('../stream/GenericWorker')
							function s(t, e) {
								n.call(this, 'Nodejs stream input adapter for ' + t), (this._upstreamEnded = !1), this._bindStream(e)
							}
							i.inherits(s, n),
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
									return !!n.prototype.pause.call(this) && (this._stream.pause(), !0)
								}),
								(s.prototype.resume = function () {
									return (
										!!n.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
									)
								}),
								(e.exports = s)
						},
						{ '../stream/GenericWorker': 28, '../utils': 32 },
					],
					13: [
						function (t, e, r) {
							'use strict'
							var i = t('readable-stream').Readable
							function n(t, e, r) {
								i.call(this, e), (this._helper = t)
								var n = this
								t.on('data', function (t, e) {
									n.push(t) || n._helper.pause(), r && r(e)
								})
									.on('error', function (t) {
										n.emit('error', t)
									})
									.on('end', function () {
										n.push(null)
									})
							}
							t('../utils').inherits(n, i),
								(n.prototype._read = function () {
									this._helper.resume()
								}),
								(e.exports = n)
						},
						{ '../utils': 32, 'readable-stream': 16 },
					],
					14: [
						function (t, r, i) {
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
									return t && 'function' == typeof t.on && 'function' == typeof t.pause && 'function' == typeof t.resume
								},
							}
						},
						{},
					],
					15: [
						function (t, e, r) {
							'use strict'
							function i(t, e, r) {
								var i,
									n = s.getTypeOf(e),
									a = s.extend(r || {}, l)
								;(a.date = a.date || new Date()),
									null !== a.compression && (a.compression = a.compression.toUpperCase()),
									'string' == typeof a.unixPermissions && (a.unixPermissions = parseInt(a.unixPermissions, 8)),
									a.unixPermissions && 16384 & a.unixPermissions && (a.dir = !0),
									a.dosPermissions && 16 & a.dosPermissions && (a.dir = !0),
									a.dir && (t = m(t)),
									a.createFolders && (i = f(t)) && g.call(this, i, !0)
								var c,
									y = 'string' === n && !1 === a.binary && !1 === a.base64
								;(r && void 0 !== r.binary) || (a.binary = !y),
									((e instanceof h && 0 === e.uncompressedSize) || a.dir || !e || 0 === e.length) &&
										((a.base64 = !1), (a.binary = !0), (e = ''), (a.compression = 'STORE'), (n = 'string')),
									(c =
										e instanceof h || e instanceof o
											? e
											: d.isNode && d.isStream(e)
											? new p(t, e)
											: s.prepareContent(t, e, a.binary, a.optimizedBinaryString, a.base64))
								var _ = new u(t, c, a)
								this.files[t] = _
							}
							var n = t('./utf8'),
								s = t('./utils'),
								o = t('./stream/GenericWorker'),
								a = t('./stream/StreamHelper'),
								l = t('./defaults'),
								h = t('./compressedObject'),
								u = t('./zipObject'),
								c = t('./generate'),
								d = t('./nodejsUtils'),
								p = t('./nodejs/NodejsStreamInputAdapter'),
								f = function (t) {
									'/' === t.slice(-1) && (t = t.substring(0, t.length - 1))
									var e = t.lastIndexOf('/')
									return 0 < e ? t.substring(0, e) : ''
								},
								m = function (t) {
									return '/' !== t.slice(-1) && (t += '/'), t
								},
								g = function (t, e) {
									return (
										(e = void 0 !== e ? e : l.createFolders),
										(t = m(t)),
										this.files[t] || i.call(this, t, null, { dir: !0, createFolders: e }),
										this.files[t]
									)
								}
							function y(t) {
								return '[object RegExp]' === Object.prototype.toString.call(t)
							}
							var _ = {
								load: function () {
									throw new Error('This method has been removed in JSZip 3.0, please check the upgrade guide.')
								},
								forEach: function (t) {
									var e, r, i
									for (e in this.files)
										this.files.hasOwnProperty(e) &&
											((i = this.files[e]),
											(r = e.slice(this.root.length, e.length)) &&
												e.slice(0, this.root.length) === this.root &&
												t(r, i))
								},
								filter: function (t) {
									var e = []
									return (
										this.forEach(function (r, i) {
											t(r, i) && e.push(i)
										}),
										e
									)
								},
								file: function (t, e, r) {
									if (1 !== arguments.length) return (t = this.root + t), i.call(this, t, e, r), this
									if (y(t)) {
										var n = t
										return this.filter(function (t, e) {
											return !e.dir && n.test(t)
										})
									}
									var s = this.files[this.root + t]
									return s && !s.dir ? s : null
								},
								folder: function (t) {
									if (!t) return this
									if (y(t))
										return this.filter(function (e, r) {
											return r.dir && t.test(e)
										})
									var e = this.root + t,
										r = g.call(this, e),
										i = this.clone()
									return (i.root = r.name), i
								},
								remove: function (t) {
									t = this.root + t
									var e = this.files[t]
									if ((e || ('/' !== t.slice(-1) && (t += '/'), (e = this.files[t])), e && !e.dir)) delete this.files[t]
									else
										for (
											var r = this.filter(function (e, r) {
													return r.name.slice(0, t.length) === t
												}),
												i = 0;
											i < r.length;
											i++
										)
											delete this.files[r[i].name]
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
												encodeFileName: n.utf8encode,
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
										var i = r.comment || this.comment || ''
										e = c.generateWorker(this, r, i)
									} catch (t) {
										;(e = new o('error')).error(t)
									}
									return new a(e, r.type || 'string', r.mimeType)
								},
								generateAsync: function (t, e) {
									return this.generateInternalStream(t).accumulate(e)
								},
								generateNodeStream: function (t, e) {
									return (t = t || {}).type || (t.type = 'nodebuffer'), this.generateInternalStream(t).toNodejsStream(e)
								},
							}
							e.exports = _
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
							var i = t('./DataReader')
							function n(t) {
								i.call(this, t)
								for (var e = 0; e < this.data.length; e++) t[e] = 255 & t[e]
							}
							t('../utils').inherits(n, i),
								(n.prototype.byteAt = function (t) {
									return this.data[this.zero + t]
								}),
								(n.prototype.lastIndexOfSignature = function (t) {
									for (
										var e = t.charCodeAt(0),
											r = t.charCodeAt(1),
											i = t.charCodeAt(2),
											n = t.charCodeAt(3),
											s = this.length - 4;
										0 <= s;
										--s
									)
										if (
											this.data[s] === e &&
											this.data[s + 1] === r &&
											this.data[s + 2] === i &&
											this.data[s + 3] === n
										)
											return s - this.zero
									return -1
								}),
								(n.prototype.readAndCheckSignature = function (t) {
									var e = t.charCodeAt(0),
										r = t.charCodeAt(1),
										i = t.charCodeAt(2),
										n = t.charCodeAt(3),
										s = this.readData(4)
									return e === s[0] && r === s[1] && i === s[2] && n === s[3]
								}),
								(n.prototype.readData = function (t) {
									if ((this.checkOffset(t), 0 === t)) return []
									var e = this.data.slice(this.zero + this.index, this.zero + this.index + t)
									return (this.index += t), e
								}),
								(e.exports = n)
						},
						{ '../utils': 32, './DataReader': 18 },
					],
					18: [
						function (t, e, r) {
							'use strict'
							var i = t('../utils')
							function n(t) {
								;(this.data = t), (this.length = t.length), (this.index = 0), (this.zero = 0)
							}
							;(n.prototype = {
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
									for (this.checkOffset(t), e = this.index + t - 1; e >= this.index; e--) r = (r << 8) + this.byteAt(e)
									return (this.index += t), r
								},
								readString: function (t) {
									return i.transformTo('string', this.readData(t))
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
								(e.exports = n)
						},
						{ '../utils': 32 },
					],
					19: [
						function (t, e, r) {
							'use strict'
							var i = t('./Uint8ArrayReader')
							function n(t) {
								i.call(this, t)
							}
							t('../utils').inherits(n, i),
								(n.prototype.readData = function (t) {
									this.checkOffset(t)
									var e = this.data.slice(this.zero + this.index, this.zero + this.index + t)
									return (this.index += t), e
								}),
								(e.exports = n)
						},
						{ '../utils': 32, './Uint8ArrayReader': 21 },
					],
					20: [
						function (t, e, r) {
							'use strict'
							var i = t('./DataReader')
							function n(t) {
								i.call(this, t)
							}
							t('../utils').inherits(n, i),
								(n.prototype.byteAt = function (t) {
									return this.data.charCodeAt(this.zero + t)
								}),
								(n.prototype.lastIndexOfSignature = function (t) {
									return this.data.lastIndexOf(t) - this.zero
								}),
								(n.prototype.readAndCheckSignature = function (t) {
									return t === this.readData(4)
								}),
								(n.prototype.readData = function (t) {
									this.checkOffset(t)
									var e = this.data.slice(this.zero + this.index, this.zero + this.index + t)
									return (this.index += t), e
								}),
								(e.exports = n)
						},
						{ '../utils': 32, './DataReader': 18 },
					],
					21: [
						function (t, e, r) {
							'use strict'
							var i = t('./ArrayReader')
							function n(t) {
								i.call(this, t)
							}
							t('../utils').inherits(n, i),
								(n.prototype.readData = function (t) {
									if ((this.checkOffset(t), 0 === t)) return new Uint8Array(0)
									var e = this.data.subarray(this.zero + this.index, this.zero + this.index + t)
									return (this.index += t), e
								}),
								(e.exports = n)
						},
						{ '../utils': 32, './ArrayReader': 17 },
					],
					22: [
						function (t, e, r) {
							'use strict'
							var i = t('../utils'),
								n = t('../support'),
								s = t('./ArrayReader'),
								o = t('./StringReader'),
								a = t('./NodeBufferReader'),
								l = t('./Uint8ArrayReader')
							e.exports = function (t) {
								var e = i.getTypeOf(t)
								return (
									i.checkSupport(e),
									'string' !== e || n.uint8array
										? 'nodebuffer' === e
											? new a(t)
											: n.uint8array
											? new l(i.transformTo('uint8array', t))
											: new s(i.transformTo('array', t))
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
							var i = t('./GenericWorker'),
								n = t('../utils')
							function s(t) {
								i.call(this, 'ConvertWorker to ' + t), (this.destType = t)
							}
							n.inherits(s, i),
								(s.prototype.processChunk = function (t) {
									this.push({ data: n.transformTo(this.destType, t.data), meta: t.meta })
								}),
								(e.exports = s)
						},
						{ '../utils': 32, './GenericWorker': 28 },
					],
					25: [
						function (t, e, r) {
							'use strict'
							var i = t('./GenericWorker'),
								n = t('../crc32')
							function s() {
								i.call(this, 'Crc32Probe'), this.withStreamInfo('crc32', 0)
							}
							t('../utils').inherits(s, i),
								(s.prototype.processChunk = function (t) {
									;(this.streamInfo.crc32 = n(t.data, this.streamInfo.crc32 || 0)), this.push(t)
								}),
								(e.exports = s)
						},
						{ '../crc32': 4, '../utils': 32, './GenericWorker': 28 },
					],
					26: [
						function (t, e, r) {
							'use strict'
							var i = t('../utils'),
								n = t('./GenericWorker')
							function s(t) {
								n.call(this, 'DataLengthProbe for ' + t), (this.propName = t), this.withStreamInfo(t, 0)
							}
							i.inherits(s, n),
								(s.prototype.processChunk = function (t) {
									if (t) {
										var e = this.streamInfo[this.propName] || 0
										this.streamInfo[this.propName] = e + t.data.length
									}
									n.prototype.processChunk.call(this, t)
								}),
								(e.exports = s)
						},
						{ '../utils': 32, './GenericWorker': 28 },
					],
					27: [
						function (t, e, r) {
							'use strict'
							var i = t('../utils'),
								n = t('./GenericWorker')
							function s(t) {
								n.call(this, 'DataWorker')
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
												(e.type = i.getTypeOf(t)),
												e.isPaused || e._tickAndRepeat()
										},
										function (t) {
											e.error(t)
										}
									)
							}
							i.inherits(s, n),
								(s.prototype.cleanUp = function () {
									n.prototype.cleanUp.call(this), (this.data = null)
								}),
								(s.prototype.resume = function () {
									return (
										!!n.prototype.resume.call(this) &&
										(!this._tickScheduled &&
											this.dataIsReady &&
											((this._tickScheduled = !0), i.delay(this._tickAndRepeat, [], this)),
										!0)
									)
								}),
								(s.prototype._tickAndRepeat = function () {
									;(this._tickScheduled = !1),
										this.isPaused ||
											this.isFinished ||
											(this._tick(),
											this.isFinished || (i.delay(this._tickAndRepeat, [], this), (this._tickScheduled = !0)))
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
							function i(t) {
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
							;(i.prototype = {
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
								(e.exports = i)
						},
						{},
					],
					29: [
						function (t, r, i) {
							'use strict'
							var n = t('../utils'),
								s = t('./ConvertWorker'),
								o = t('./GenericWorker'),
								a = t('../base64'),
								l = t('../support'),
								h = t('../external'),
								u = null
							if (l.nodestream)
								try {
									u = t('../nodejs/NodejsStreamOutputAdapter')
								} catch (t) {}
							function c(t, e, r) {
								var i = e
								switch (e) {
									case 'blob':
									case 'arraybuffer':
										i = 'uint8array'
										break
									case 'base64':
										i = 'string'
								}
								try {
									;(this._internalType = i),
										(this._outputType = e),
										(this._mimeType = r),
										n.checkSupport(i),
										(this._worker = t.pipe(new s(i))),
										t.lock()
								} catch (t) {
									;(this._worker = new o('error')), this._worker.error(t)
								}
							}
							;(c.prototype = {
								accumulate: function (t) {
									return (function (t, r) {
										return new h.Promise(function (i, s) {
											var o = [],
												l = t._internalType,
												h = t._outputType,
												u = t._mimeType
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
																	return n.newBlob(n.transformTo('arraybuffer', e), r)
																case 'base64':
																	return a.encode(e)
																default:
																	return n.transformTo(t, e)
															}
														})(
															h,
															(function (t, r) {
																var i,
																	n = 0,
																	s = null,
																	o = 0
																for (i = 0; i < r.length; i++) o += r[i].length
																switch (t) {
																	case 'string':
																		return r.join('')
																	case 'array':
																		return Array.prototype.concat.apply([], r)
																	case 'uint8array':
																		for (s = new Uint8Array(o), i = 0; i < r.length; i++)
																			s.set(r[i], n), (n += r[i].length)
																		return s
																	case 'nodebuffer':
																		return e.concat(r)
																	default:
																		throw new Error("concat : unsupported type '" + t + "'")
																}
															})(l, o),
															u
														)
														i(t)
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
													n.delay(e, arguments, r)
											  }),
										this
									)
								},
								resume: function () {
									return n.delay(this._worker.resume, [], this._worker), this
								},
								pause: function () {
									return this._worker.pause(), this
								},
								toNodejsStream: function (t) {
									if ((n.checkSupport('nodestream'), 'nodebuffer' !== this._outputType))
										throw new Error(this._outputType + ' is not supported by this method')
									return new u(this, { objectMode: 'nodebuffer' !== this._outputType }, t)
								},
							}),
								(r.exports = c)
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
						function (t, r, i) {
							'use strict'
							if (
								((i.base64 = !0),
								(i.array = !0),
								(i.string = !0),
								(i.arraybuffer = 'undefined' != typeof ArrayBuffer && 'undefined' != typeof Uint8Array),
								(i.nodebuffer = void 0 !== e),
								(i.uint8array = 'undefined' != typeof Uint8Array),
								'undefined' == typeof ArrayBuffer)
							)
								i.blob = !1
							else {
								var n = new ArrayBuffer(0)
								try {
									i.blob = 0 === new Blob([n], { type: 'application/zip' }).size
								} catch (t) {
									try {
										var s = new (self.BlobBuilder ||
											self.WebKitBlobBuilder ||
											self.MozBlobBuilder ||
											self.MSBlobBuilder)()
										s.append(n), (i.blob = 0 === s.getBlob('application/zip').size)
									} catch (t) {
										i.blob = !1
									}
								}
							}
							try {
								i.nodestream = !!t('readable-stream').Readable
							} catch (t) {
								i.nodestream = !1
							}
						},
						{ 'readable-stream': 16 },
					],
					31: [
						function (t, e, r) {
							'use strict'
							for (
								var i = t('./utils'),
									n = t('./support'),
									s = t('./nodejsUtils'),
									o = t('./stream/GenericWorker'),
									a = new Array(256),
									l = 0;
								l < 256;
								l++
							)
								a[l] = 252 <= l ? 6 : 248 <= l ? 5 : 240 <= l ? 4 : 224 <= l ? 3 : 192 <= l ? 2 : 1
							function h() {
								o.call(this, 'utf-8 decode'), (this.leftOver = null)
							}
							function u() {
								o.call(this, 'utf-8 encode')
							}
							;(a[254] = a[254] = 1),
								(r.utf8encode = function (t) {
									return n.nodebuffer
										? s.newBufferFrom(t, 'utf-8')
										: (function (t) {
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
												for (e = n.uint8array ? new Uint8Array(l) : new Array(l), s = o = 0; o < l; s++)
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
										  })(t)
								}),
								(r.utf8decode = function (t) {
									return n.nodebuffer
										? i.transformTo('nodebuffer', t).toString('utf-8')
										: (function (t) {
												var e,
													r,
													n,
													s,
													o = t.length,
													l = new Array(2 * o)
												for (e = r = 0; e < o; )
													if ((n = t[e++]) < 128) l[r++] = n
													else if (4 < (s = a[n])) (l[r++] = 65533), (e += s - 1)
													else {
														for (n &= 2 === s ? 31 : 3 === s ? 15 : 7; 1 < s && e < o; )
															(n = (n << 6) | (63 & t[e++])), s--
														1 < s
															? (l[r++] = 65533)
															: n < 65536
															? (l[r++] = n)
															: ((n -= 65536), (l[r++] = 55296 | ((n >> 10) & 1023)), (l[r++] = 56320 | (1023 & n)))
													}
												return (
													l.length !== r && (l.subarray ? (l = l.subarray(0, r)) : (l.length = r)),
													i.applyFromCharCode(l)
												)
										  })((t = i.transformTo(n.uint8array ? 'uint8array' : 'array', t)))
								}),
								i.inherits(h, o),
								(h.prototype.processChunk = function (t) {
									var e = i.transformTo(n.uint8array ? 'uint8array' : 'array', t.data)
									if (this.leftOver && this.leftOver.length) {
										if (n.uint8array) {
											var s = e
											;(e = new Uint8Array(s.length + this.leftOver.length)).set(this.leftOver, 0),
												e.set(s, this.leftOver.length)
										} else e = this.leftOver.concat(e)
										this.leftOver = null
									}
									var o = (function (t, e) {
											var r
											for ((e = e || t.length) > t.length && (e = t.length), r = e - 1; 0 <= r && 128 == (192 & t[r]); )
												r--
											return r < 0 || 0 === r ? e : r + a[t[r]] > e ? r : e
										})(e),
										l = e
									o !== e.length &&
										(n.uint8array
											? ((l = e.subarray(0, o)), (this.leftOver = e.subarray(o, e.length)))
											: ((l = e.slice(0, o)), (this.leftOver = e.slice(o, e.length)))),
										this.push({ data: r.utf8decode(l), meta: t.meta })
								}),
								(h.prototype.flush = function () {
									this.leftOver &&
										this.leftOver.length &&
										(this.push({ data: r.utf8decode(this.leftOver), meta: {} }), (this.leftOver = null))
								}),
								(r.Utf8DecodeWorker = h),
								i.inherits(u, o),
								(u.prototype.processChunk = function (t) {
									this.push({ data: r.utf8encode(t.data), meta: t.meta })
								}),
								(r.Utf8EncodeWorker = u)
						},
						{ './nodejsUtils': 14, './stream/GenericWorker': 28, './support': 30, './utils': 32 },
					],
					32: [
						function (t, e, r) {
							'use strict'
							var i = t('./support'),
								n = t('./base64'),
								s = t('./nodejsUtils'),
								o = t('set-immediate-shim'),
								a = t('./external')
							function l(t) {
								return t
							}
							function h(t, e) {
								for (var r = 0; r < t.length; ++r) e[r] = 255 & t.charCodeAt(r)
								return e
							}
							r.newBlob = function (t, e) {
								r.checkSupport('blob')
								try {
									return new Blob([t], { type: e })
								} catch (r) {
									try {
										var i = new (self.BlobBuilder ||
											self.WebKitBlobBuilder ||
											self.MozBlobBuilder ||
											self.MSBlobBuilder)()
										return i.append(t), i.getBlob(e)
									} catch (t) {
										throw new Error("Bug : can't construct the Blob.")
									}
								}
							}
							var u = {
								stringifyByChunk: function (t, e, r) {
									var i = [],
										n = 0,
										s = t.length
									if (s <= r) return String.fromCharCode.apply(null, t)
									for (; n < s; )
										'array' === e || 'nodebuffer' === e
											? i.push(String.fromCharCode.apply(null, t.slice(n, Math.min(n + r, s))))
											: i.push(String.fromCharCode.apply(null, t.subarray(n, Math.min(n + r, s)))),
											(n += r)
									return i.join('')
								},
								stringifyByChar: function (t) {
									for (var e = '', r = 0; r < t.length; r++) e += String.fromCharCode(t[r])
									return e
								},
								applyCanBeUsed: {
									uint8array: (function () {
										try {
											return i.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length
										} catch (t) {
											return !1
										}
									})(),
									nodebuffer: (function () {
										try {
											return i.nodebuffer && 1 === String.fromCharCode.apply(null, s.allocBuffer(1)).length
										} catch (t) {
											return !1
										}
									})(),
								},
							}
							function c(t) {
								var e = 65536,
									i = r.getTypeOf(t),
									n = !0
								if (
									('uint8array' === i
										? (n = u.applyCanBeUsed.uint8array)
										: 'nodebuffer' === i && (n = u.applyCanBeUsed.nodebuffer),
									n)
								)
									for (; 1 < e; )
										try {
											return u.stringifyByChunk(t, i, e)
										} catch (t) {
											e = Math.floor(e / 2)
										}
								return u.stringifyByChar(t)
							}
							function d(t, e) {
								for (var r = 0; r < t.length; r++) e[r] = t[r]
								return e
							}
							r.applyFromCharCode = c
							var p = {}
							;(p.string = {
								string: l,
								array: function (t) {
									return h(t, new Array(t.length))
								},
								arraybuffer: function (t) {
									return p.string.uint8array(t).buffer
								},
								uint8array: function (t) {
									return h(t, new Uint8Array(t.length))
								},
								nodebuffer: function (t) {
									return h(t, s.allocBuffer(t.length))
								},
							}),
								(p.array = {
									string: c,
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
								(p.arraybuffer = {
									string: function (t) {
										return c(new Uint8Array(t))
									},
									array: function (t) {
										return d(new Uint8Array(t), new Array(t.byteLength))
									},
									arraybuffer: l,
									uint8array: function (t) {
										return new Uint8Array(t)
									},
									nodebuffer: function (t) {
										return s.newBufferFrom(new Uint8Array(t))
									},
								}),
								(p.uint8array = {
									string: c,
									array: function (t) {
										return d(t, new Array(t.length))
									},
									arraybuffer: function (t) {
										return t.buffer
									},
									uint8array: l,
									nodebuffer: function (t) {
										return s.newBufferFrom(t)
									},
								}),
								(p.nodebuffer = {
									string: c,
									array: function (t) {
										return d(t, new Array(t.length))
									},
									arraybuffer: function (t) {
										return p.nodebuffer.uint8array(t).buffer
									},
									uint8array: function (t) {
										return d(t, new Uint8Array(t.length))
									},
									nodebuffer: l,
								}),
								(r.transformTo = function (t, e) {
									if (((e = e || ''), !t)) return e
									r.checkSupport(t)
									var i = r.getTypeOf(e)
									return p[i][t](e)
								}),
								(r.getTypeOf = function (t) {
									return 'string' == typeof t
										? 'string'
										: '[object Array]' === Object.prototype.toString.call(t)
										? 'array'
										: i.nodebuffer && s.isBuffer(t)
										? 'nodebuffer'
										: i.uint8array && t instanceof Uint8Array
										? 'uint8array'
										: i.arraybuffer && t instanceof ArrayBuffer
										? 'arraybuffer'
										: void 0
								}),
								(r.checkSupport = function (t) {
									if (!i[t.toLowerCase()]) throw new Error(t + ' is not supported by this platform')
								}),
								(r.MAX_VALUE_16BITS = 65535),
								(r.MAX_VALUE_32BITS = -1),
								(r.pretty = function (t) {
									var e,
										r,
										i = ''
									for (r = 0; r < (t || '').length; r++)
										i += '\\x' + ((e = t.charCodeAt(r)) < 16 ? '0' : '') + e.toString(16).toUpperCase()
									return i
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
											return i.blob &&
												(t instanceof Blob ||
													-1 !== ['[object File]', '[object Blob]'].indexOf(Object.prototype.toString.call(t))) &&
												'undefined' != typeof FileReader
												? new a.Promise(function (e, r) {
														var i = new FileReader()
														;(i.onload = function (t) {
															e(t.target.result)
														}),
															(i.onerror = function (t) {
																r(t.target.error)
															}),
															i.readAsArrayBuffer(t)
												  })
												: t
										})
										.then(function (e) {
											var u = r.getTypeOf(e)
											return u
												? ('arraybuffer' === u
														? (e = r.transformTo('uint8array', e))
														: 'string' === u &&
														  (l
																? (e = n.decode(e))
																: s &&
																  !0 !== o &&
																  (e = (function (t) {
																		return h(t, i.uint8array ? new Uint8Array(t.length) : new Array(t.length))
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
							var i = t('./reader/readerFor'),
								n = t('./utils'),
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
											'Corrupted zip or bug: unexpected signature (' + n.pretty(e) + ', expected ' + n.pretty(t) + ')'
										)
									}
								},
								isSignature: function (t, e) {
									var r = this.reader.index
									this.reader.setIndex(t)
									var i = this.reader.readString(4) === e
									return this.reader.setIndex(r), i
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
										r = n.transformTo(e, t)
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
									for (var t, e, r, i = this.zip64EndOfCentralSize - 44; 0 < i; )
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
										this.diskNumber === n.MAX_VALUE_16BITS ||
											this.diskWithCentralDirStart === n.MAX_VALUE_16BITS ||
											this.centralDirRecordsOnThisDisk === n.MAX_VALUE_16BITS ||
											this.centralDirRecords === n.MAX_VALUE_16BITS ||
											this.centralDirSize === n.MAX_VALUE_32BITS ||
											this.centralDirOffset === n.MAX_VALUE_32BITS)
									) {
										if (
											((this.zip64 = !0), (t = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0)
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
									var i = e - r
									if (0 < i) this.isSignature(e, s.CENTRAL_FILE_HEADER) || (this.reader.zero = i)
									else if (i < 0) throw new Error('Corrupted zip: missing ' + Math.abs(i) + ' bytes.')
								},
								prepareReader: function (t) {
									this.reader = i(t)
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
							var i = t('./reader/readerFor'),
								n = t('./utils'),
								s = t('./compressedObject'),
								o = t('./crc32'),
								a = t('./utf8'),
								l = t('./compressions'),
								h = t('./support')
							function u(t, e) {
								;(this.options = t), (this.loadOptions = e)
							}
							;(u.prototype = {
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
												n.pretty(this.compressionMethod) +
												' unknown (inner file : ' +
												n.transformTo('string', this.fileName) +
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
										var e = i(this.extraFields[1].value)
										this.uncompressedSize === n.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)),
											this.compressedSize === n.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)),
											this.localHeaderOffset === n.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)),
											this.diskNumberStart === n.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4))
									}
								},
								readExtraFields: function (t) {
									var e,
										r,
										i,
										n = t.index + this.extraFieldsLength
									for (this.extraFields || (this.extraFields = {}); t.index + 4 < n; )
										(e = t.readInt(2)),
											(r = t.readInt(2)),
											(i = t.readData(r)),
											(this.extraFields[e] = { id: e, length: r, value: i })
									t.setIndex(n)
								},
								handleUTF8: function () {
									var t = h.uint8array ? 'uint8array' : 'array'
									if (this.useUTF8())
										(this.fileNameStr = a.utf8decode(this.fileName)),
											(this.fileCommentStr = a.utf8decode(this.fileComment))
									else {
										var e = this.findExtraFieldUnicodePath()
										if (null !== e) this.fileNameStr = e
										else {
											var r = n.transformTo(t, this.fileName)
											this.fileNameStr = this.loadOptions.decodeFileName(r)
										}
										var i = this.findExtraFieldUnicodeComment()
										if (null !== i) this.fileCommentStr = i
										else {
											var s = n.transformTo(t, this.fileComment)
											this.fileCommentStr = this.loadOptions.decodeFileName(s)
										}
									}
								},
								findExtraFieldUnicodePath: function () {
									var t = this.extraFields[28789]
									if (t) {
										var e = i(t.value)
										return 1 !== e.readInt(1) || o(this.fileName) !== e.readInt(4)
											? null
											: a.utf8decode(e.readData(t.length - 5))
									}
									return null
								},
								findExtraFieldUnicodeComment: function () {
									var t = this.extraFields[25461]
									if (t) {
										var e = i(t.value)
										return 1 !== e.readInt(1) || o(this.fileComment) !== e.readInt(4)
											? null
											: a.utf8decode(e.readData(t.length - 5))
									}
									return null
								},
							}),
								(e.exports = u)
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
							function i(t, e, r) {
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
							var n = t('./stream/StreamHelper'),
								s = t('./stream/DataWorker'),
								o = t('./utf8'),
								a = t('./compressedObject'),
								l = t('./stream/GenericWorker')
							i.prototype = {
								internalStream: function (t) {
									var e = null,
										r = 'string'
									try {
										if (!t) throw new Error('No output type specified.')
										var i = 'string' === (r = t.toLowerCase()) || 'text' === r
										;('binarystring' !== r && 'text' !== r) || (r = 'string'), (e = this._decompressWorker())
										var s = !this._dataBinary
										s && !i && (e = e.pipe(new o.Utf8EncodeWorker())), !s && i && (e = e.pipe(new o.Utf8DecodeWorker()))
									} catch (t) {
										;(e = new l('error')).error(t)
									}
									return new n(e, r, '')
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
								var h = ['asText', 'asBinary', 'asNodeBuffer', 'asUint8Array', 'asArrayBuffer'],
									u = function () {
										throw new Error('This method has been removed in JSZip 3.0, please check the upgrade guide.')
									},
									c = 0;
								c < h.length;
								c++
							)
								i.prototype[h[c]] = u
							e.exports = i
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
						function (t, e, i) {
							;(function (t) {
								'use strict'
								var r,
									i,
									n = t.MutationObserver || t.WebKitMutationObserver
								if (n) {
									var s = 0,
										o = new n(u),
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
														u(), (e.onreadystatechange = null), e.parentNode.removeChild(e), (e = null)
													}),
														t.document.documentElement.appendChild(e)
											  }
											: function () {
													setTimeout(u, 0)
											  }
								else {
									var l = new t.MessageChannel()
									;(l.port1.onmessage = u),
										(r = function () {
											l.port2.postMessage(0)
										})
								}
								var h = []
								function u() {
									var t, e
									i = !0
									for (var r = h.length; r; ) {
										for (e = h, h = [], t = -1; ++t < r; ) e[t]()
										r = h.length
									}
									i = !1
								}
								e.exports = function (t) {
									1 !== h.push(t) || i || r()
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
							var i = t('immediate')
							function n() {}
							var s = {},
								o = ['REJECTED'],
								a = ['FULFILLED'],
								l = ['PENDING']
							function h(t) {
								if ('function' != typeof t) throw new TypeError('resolver must be a function')
								;(this.state = l), (this.queue = []), (this.outcome = void 0), t !== n && p(this, t)
							}
							function u(t, e, r) {
								;(this.promise = t),
									'function' == typeof e && ((this.onFulfilled = e), (this.callFulfilled = this.otherCallFulfilled)),
									'function' == typeof r && ((this.onRejected = r), (this.callRejected = this.otherCallRejected))
							}
							function c(t, e, r) {
								i(function () {
									var i
									try {
										i = e(r)
									} catch (i) {
										return s.reject(t, i)
									}
									i === t ? s.reject(t, new TypeError('Cannot resolve promise with itself')) : s.resolve(t, i)
								})
							}
							function d(t) {
								var e = t && t.then
								if (t && ('object' == typeof t || 'function' == typeof t) && 'function' == typeof e)
									return function () {
										e.apply(t, arguments)
									}
							}
							function p(t, e) {
								var r = !1
								function i(e) {
									r || ((r = !0), s.reject(t, e))
								}
								function n(e) {
									r || ((r = !0), s.resolve(t, e))
								}
								var o = f(function () {
									e(n, i)
								})
								'error' === o.status && i(o.value)
							}
							function f(t, e) {
								var r = {}
								try {
									;(r.value = t(e)), (r.status = 'success')
								} catch (t) {
									;(r.status = 'error'), (r.value = t)
								}
								return r
							}
							;((e.exports = h).prototype.finally = function (t) {
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
								(h.prototype.catch = function (t) {
									return this.then(null, t)
								}),
								(h.prototype.then = function (t, e) {
									if (('function' != typeof t && this.state === a) || ('function' != typeof e && this.state === o))
										return this
									var r = new this.constructor(n)
									return (
										this.state !== l ? c(r, this.state === a ? t : e, this.outcome) : this.queue.push(new u(r, t, e)), r
									)
								}),
								(u.prototype.callFulfilled = function (t) {
									s.resolve(this.promise, t)
								}),
								(u.prototype.otherCallFulfilled = function (t) {
									c(this.promise, this.onFulfilled, t)
								}),
								(u.prototype.callRejected = function (t) {
									s.reject(this.promise, t)
								}),
								(u.prototype.otherCallRejected = function (t) {
									c(this.promise, this.onRejected, t)
								}),
								(s.resolve = function (t, e) {
									var r = f(d, e)
									if ('error' === r.status) return s.reject(t, r.value)
									var i = r.value
									if (i) p(t, i)
									else {
										;(t.state = a), (t.outcome = e)
										for (var n = -1, o = t.queue.length; ++n < o; ) t.queue[n].callFulfilled(e)
									}
									return t
								}),
								(s.reject = function (t, e) {
									;(t.state = o), (t.outcome = e)
									for (var r = -1, i = t.queue.length; ++r < i; ) t.queue[r].callRejected(e)
									return t
								}),
								(h.resolve = function (t) {
									return t instanceof this ? t : s.resolve(new this(n), t)
								}),
								(h.reject = function (t) {
									var e = new this(n)
									return s.reject(e, t)
								}),
								(h.all = function (t) {
									var e = this
									if ('[object Array]' !== Object.prototype.toString.call(t))
										return this.reject(new TypeError('must be an array'))
									var r = t.length,
										i = !1
									if (!r) return this.resolve([])
									for (var o = new Array(r), a = 0, l = -1, h = new this(n); ++l < r; ) u(t[l], l)
									return h
									function u(t, n) {
										e.resolve(t).then(
											function (t) {
												;(o[n] = t), ++a !== r || i || ((i = !0), s.resolve(h, o))
											},
											function (t) {
												i || ((i = !0), s.reject(h, t))
											}
										)
									}
								}),
								(h.race = function (t) {
									if ('[object Array]' !== Object.prototype.toString.call(t))
										return this.reject(new TypeError('must be an array'))
									var e = t.length,
										r = !1
									if (!e) return this.resolve([])
									for (var i, o = -1, a = new this(n); ++o < e; )
										(i = t[o]),
											this.resolve(i).then(
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
							var i = {}
							;(0, t('./lib/utils/common').assign)(
								i,
								t('./lib/deflate'),
								t('./lib/inflate'),
								t('./lib/zlib/constants')
							),
								(e.exports = i)
						},
						{ './lib/deflate': 39, './lib/inflate': 40, './lib/utils/common': 41, './lib/zlib/constants': 44 },
					],
					39: [
						function (t, e, r) {
							'use strict'
							var i = t('./zlib/deflate'),
								n = t('./utils/common'),
								s = t('./utils/strings'),
								o = t('./zlib/messages'),
								a = t('./zlib/zstream'),
								l = Object.prototype.toString
							function h(t) {
								if (!(this instanceof h)) return new h(t)
								this.options = n.assign(
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
								var r = i.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy)
								if (0 !== r) throw new Error(o[r])
								if ((e.header && i.deflateSetHeader(this.strm, e.header), e.dictionary)) {
									var u
									if (
										((u =
											'string' == typeof e.dictionary
												? s.string2buf(e.dictionary)
												: '[object ArrayBuffer]' === l.call(e.dictionary)
												? new Uint8Array(e.dictionary)
												: e.dictionary),
										0 !== (r = i.deflateSetDictionary(this.strm, u)))
									)
										throw new Error(o[r])
									this._dict_set = !0
								}
							}
							function u(t, e) {
								var r = new h(e)
								if ((r.push(t, !0), r.err)) throw r.msg || o[r.err]
								return r.result
							}
							;(h.prototype.push = function (t, e) {
								var r,
									o,
									a = this.strm,
									h = this.options.chunkSize
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
										(0 === a.avail_out && ((a.output = new n.Buf8(h)), (a.next_out = 0), (a.avail_out = h)),
										1 !== (r = i.deflate(a, o)) && 0 !== r)
									)
										return this.onEnd(r), !(this.ended = !0)
									;(0 !== a.avail_out && (0 !== a.avail_in || (4 !== o && 2 !== o))) ||
										('string' === this.options.to
											? this.onData(s.buf2binstring(n.shrinkBuf(a.output, a.next_out)))
											: this.onData(n.shrinkBuf(a.output, a.next_out)))
								} while ((0 < a.avail_in || 0 === a.avail_out) && 1 !== r)
								return 4 === o
									? ((r = i.deflateEnd(this.strm)), this.onEnd(r), (this.ended = !0), 0 === r)
									: 2 !== o || (this.onEnd(0), !(a.avail_out = 0))
							}),
								(h.prototype.onData = function (t) {
									this.chunks.push(t)
								}),
								(h.prototype.onEnd = function (t) {
									0 === t &&
										('string' === this.options.to
											? (this.result = this.chunks.join(''))
											: (this.result = n.flattenChunks(this.chunks))),
										(this.chunks = []),
										(this.err = t),
										(this.msg = this.strm.msg)
								}),
								(r.Deflate = h),
								(r.deflate = u),
								(r.deflateRaw = function (t, e) {
									return ((e = e || {}).raw = !0), u(t, e)
								}),
								(r.gzip = function (t, e) {
									return ((e = e || {}).gzip = !0), u(t, e)
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
							var i = t('./zlib/inflate'),
								n = t('./utils/common'),
								s = t('./utils/strings'),
								o = t('./zlib/constants'),
								a = t('./zlib/messages'),
								l = t('./zlib/zstream'),
								h = t('./zlib/gzheader'),
								u = Object.prototype.toString
							function c(t) {
								if (!(this instanceof c)) return new c(t)
								this.options = n.assign({ chunkSize: 16384, windowBits: 0, to: '' }, t || {})
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
								var r = i.inflateInit2(this.strm, e.windowBits)
								if (r !== o.Z_OK) throw new Error(a[r])
								;(this.header = new h()), i.inflateGetHeader(this.strm, this.header)
							}
							function d(t, e) {
								var r = new c(e)
								if ((r.push(t, !0), r.err)) throw r.msg || a[r.err]
								return r.result
							}
							;(c.prototype.push = function (t, e) {
								var r,
									a,
									l,
									h,
									c,
									d,
									p = this.strm,
									f = this.options.chunkSize,
									m = this.options.dictionary,
									g = !1
								if (this.ended) return !1
								;(a = e === ~~e ? e : !0 === e ? o.Z_FINISH : o.Z_NO_FLUSH),
									'string' == typeof t
										? (p.input = s.binstring2buf(t))
										: '[object ArrayBuffer]' === u.call(t)
										? (p.input = new Uint8Array(t))
										: (p.input = t),
									(p.next_in = 0),
									(p.avail_in = p.input.length)
								do {
									if (
										(0 === p.avail_out && ((p.output = new n.Buf8(f)), (p.next_out = 0), (p.avail_out = f)),
										(r = i.inflate(p, o.Z_NO_FLUSH)) === o.Z_NEED_DICT &&
											m &&
											((d =
												'string' == typeof m
													? s.string2buf(m)
													: '[object ArrayBuffer]' === u.call(m)
													? new Uint8Array(m)
													: m),
											(r = i.inflateSetDictionary(this.strm, d))),
										r === o.Z_BUF_ERROR && !0 === g && ((r = o.Z_OK), (g = !1)),
										r !== o.Z_STREAM_END && r !== o.Z_OK)
									)
										return this.onEnd(r), !(this.ended = !0)
									p.next_out &&
										((0 !== p.avail_out &&
											r !== o.Z_STREAM_END &&
											(0 !== p.avail_in || (a !== o.Z_FINISH && a !== o.Z_SYNC_FLUSH))) ||
											('string' === this.options.to
												? ((l = s.utf8border(p.output, p.next_out)),
												  (h = p.next_out - l),
												  (c = s.buf2string(p.output, l)),
												  (p.next_out = h),
												  (p.avail_out = f - h),
												  h && n.arraySet(p.output, p.output, l, h, 0),
												  this.onData(c))
												: this.onData(n.shrinkBuf(p.output, p.next_out)))),
										0 === p.avail_in && 0 === p.avail_out && (g = !0)
								} while ((0 < p.avail_in || 0 === p.avail_out) && r !== o.Z_STREAM_END)
								return (
									r === o.Z_STREAM_END && (a = o.Z_FINISH),
									a === o.Z_FINISH
										? ((r = i.inflateEnd(this.strm)), this.onEnd(r), (this.ended = !0), r === o.Z_OK)
										: a !== o.Z_SYNC_FLUSH || (this.onEnd(o.Z_OK), !(p.avail_out = 0))
								)
							}),
								(c.prototype.onData = function (t) {
									this.chunks.push(t)
								}),
								(c.prototype.onEnd = function (t) {
									t === o.Z_OK &&
										('string' === this.options.to
											? (this.result = this.chunks.join(''))
											: (this.result = n.flattenChunks(this.chunks))),
										(this.chunks = []),
										(this.err = t),
										(this.msg = this.strm.msg)
								}),
								(r.Inflate = c),
								(r.inflate = d),
								(r.inflateRaw = function (t, e) {
									return ((e = e || {}).raw = !0), d(t, e)
								}),
								(r.ungzip = d)
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
							var i =
								'undefined' != typeof Uint8Array &&
								'undefined' != typeof Uint16Array &&
								'undefined' != typeof Int32Array
							;(r.assign = function (t) {
								for (var e = Array.prototype.slice.call(arguments, 1); e.length; ) {
									var r = e.shift()
									if (r) {
										if ('object' != typeof r) throw new TypeError(r + 'must be non-object')
										for (var i in r) r.hasOwnProperty(i) && (t[i] = r[i])
									}
								}
								return t
							}),
								(r.shrinkBuf = function (t, e) {
									return t.length === e ? t : t.subarray ? t.subarray(0, e) : ((t.length = e), t)
								})
							var n = {
									arraySet: function (t, e, r, i, n) {
										if (e.subarray && t.subarray) t.set(e.subarray(r, r + i), n)
										else for (var s = 0; s < i; s++) t[n + s] = e[r + s]
									},
									flattenChunks: function (t) {
										var e, r, i, n, s, o
										for (e = i = 0, r = t.length; e < r; e++) i += t[e].length
										for (o = new Uint8Array(i), e = n = 0, r = t.length; e < r; e++)
											(s = t[e]), o.set(s, n), (n += s.length)
										return o
									},
								},
								s = {
									arraySet: function (t, e, r, i, n) {
										for (var s = 0; s < i; s++) t[n + s] = e[r + s]
									},
									flattenChunks: function (t) {
										return [].concat.apply([], t)
									},
								}
							;(r.setTyped = function (t) {
								t
									? ((r.Buf8 = Uint8Array), (r.Buf16 = Uint16Array), (r.Buf32 = Int32Array), r.assign(r, n))
									: ((r.Buf8 = Array), (r.Buf16 = Array), (r.Buf32 = Array), r.assign(r, s))
							}),
								r.setTyped(i)
						},
						{},
					],
					42: [
						function (t, e, r) {
							'use strict'
							var i = t('./common'),
								n = !0,
								s = !0
							try {
								String.fromCharCode.apply(null, [0])
							} catch (t) {
								n = !1
							}
							try {
								String.fromCharCode.apply(null, new Uint8Array(1))
							} catch (t) {
								s = !1
							}
							for (var o = new i.Buf8(256), a = 0; a < 256; a++)
								o[a] = 252 <= a ? 6 : 248 <= a ? 5 : 240 <= a ? 4 : 224 <= a ? 3 : 192 <= a ? 2 : 1
							function l(t, e) {
								if (e < 65537 && ((t.subarray && s) || (!t.subarray && n)))
									return String.fromCharCode.apply(null, i.shrinkBuf(t, e))
								for (var r = '', o = 0; o < e; o++) r += String.fromCharCode(t[o])
								return r
							}
							;(o[254] = o[254] = 1),
								(r.string2buf = function (t) {
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
									for (e = new i.Buf8(l), s = o = 0; o < l; s++)
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
								}),
								(r.buf2binstring = function (t) {
									return l(t, t.length)
								}),
								(r.binstring2buf = function (t) {
									for (var e = new i.Buf8(t.length), r = 0, n = e.length; r < n; r++) e[r] = t.charCodeAt(r)
									return e
								}),
								(r.buf2string = function (t, e) {
									var r,
										i,
										n,
										s,
										a = e || t.length,
										h = new Array(2 * a)
									for (r = i = 0; r < a; )
										if ((n = t[r++]) < 128) h[i++] = n
										else if (4 < (s = o[n])) (h[i++] = 65533), (r += s - 1)
										else {
											for (n &= 2 === s ? 31 : 3 === s ? 15 : 7; 1 < s && r < a; ) (n = (n << 6) | (63 & t[r++])), s--
											1 < s
												? (h[i++] = 65533)
												: n < 65536
												? (h[i++] = n)
												: ((n -= 65536), (h[i++] = 55296 | ((n >> 10) & 1023)), (h[i++] = 56320 | (1023 & n)))
										}
									return l(h, i)
								}),
								(r.utf8border = function (t, e) {
									var r
									for ((e = e || t.length) > t.length && (e = t.length), r = e - 1; 0 <= r && 128 == (192 & t[r]); ) r--
									return r < 0 || 0 === r ? e : r + o[t[r]] > e ? r : e
								})
						},
						{ './common': 41 },
					],
					43: [
						function (t, e, r) {
							'use strict'
							e.exports = function (t, e, r, i) {
								for (var n = (65535 & t) | 0, s = ((t >>> 16) & 65535) | 0, o = 0; 0 !== r; ) {
									for (r -= o = 2e3 < r ? 2e3 : r; (s = (s + (n = (n + e[i++]) | 0)) | 0), --o; );
									;(n %= 65521), (s %= 65521)
								}
								return n | (s << 16) | 0
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
							var i = (function () {
								for (var t, e = [], r = 0; r < 256; r++) {
									t = r
									for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1
									e[r] = t
								}
								return e
							})()
							e.exports = function (t, e, r, n) {
								var s = i,
									o = n + r
								t ^= -1
								for (var a = n; a < o; a++) t = (t >>> 8) ^ s[255 & (t ^ e[a])]
								return -1 ^ t
							}
						},
						{},
					],
					46: [
						function (t, e, r) {
							'use strict'
							var i,
								n = t('../utils/common'),
								s = t('./trees'),
								o = t('./adler32'),
								a = t('./crc32'),
								l = t('./messages'),
								h = -2,
								u = 258,
								c = 262,
								d = 113
							function p(t, e) {
								return (t.msg = l[e]), e
							}
							function f(t) {
								return (t << 1) - (4 < t ? 9 : 0)
							}
							function m(t) {
								for (var e = t.length; 0 <= --e; ) t[e] = 0
							}
							function g(t) {
								var e = t.state,
									r = e.pending
								r > t.avail_out && (r = t.avail_out),
									0 !== r &&
										(n.arraySet(t.output, e.pending_buf, e.pending_out, r, t.next_out),
										(t.next_out += r),
										(e.pending_out += r),
										(t.total_out += r),
										(t.avail_out -= r),
										(e.pending -= r),
										0 === e.pending && (e.pending_out = 0))
							}
							function y(t, e) {
								s._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, e),
									(t.block_start = t.strstart),
									g(t.strm)
							}
							function _(t, e) {
								t.pending_buf[t.pending++] = e
							}
							function v(t, e) {
								;(t.pending_buf[t.pending++] = (e >>> 8) & 255), (t.pending_buf[t.pending++] = 255 & e)
							}
							function P(t, e) {
								var r,
									i,
									n = t.max_chain_length,
									s = t.strstart,
									o = t.prev_length,
									a = t.nice_match,
									l = t.strstart > t.w_size - c ? t.strstart - (t.w_size - c) : 0,
									h = t.window,
									d = t.w_mask,
									p = t.prev,
									f = t.strstart + u,
									m = h[s + o - 1],
									g = h[s + o]
								t.prev_length >= t.good_match && (n >>= 2), a > t.lookahead && (a = t.lookahead)
								do {
									if (h[(r = e) + o] === g && h[r + o - 1] === m && h[r] === h[s] && h[++r] === h[s + 1]) {
										;(s += 2), r++
										do {} while (
											h[++s] === h[++r] &&
											h[++s] === h[++r] &&
											h[++s] === h[++r] &&
											h[++s] === h[++r] &&
											h[++s] === h[++r] &&
											h[++s] === h[++r] &&
											h[++s] === h[++r] &&
											h[++s] === h[++r] &&
											s < f
										)
										if (((i = u - (f - s)), (s = f - u), o < i)) {
											if (((t.match_start = e), a <= (o = i))) break
											;(m = h[s + o - 1]), (g = h[s + o])
										}
									}
								} while ((e = p[e & d]) > l && 0 != --n)
								return o <= t.lookahead ? o : t.lookahead
							}
							function b(t) {
								var e,
									r,
									i,
									s,
									l,
									h,
									u,
									d,
									p,
									f,
									m = t.w_size
								do {
									if (((s = t.window_size - t.lookahead - t.strstart), t.strstart >= m + (m - c))) {
										for (
											n.arraySet(t.window, t.window, m, m, 0),
												t.match_start -= m,
												t.strstart -= m,
												t.block_start -= m,
												e = r = t.hash_size;
											(i = t.head[--e]), (t.head[e] = m <= i ? i - m : 0), --r;

										);
										for (e = r = m; (i = t.prev[--e]), (t.prev[e] = m <= i ? i - m : 0), --r; );
										s += m
									}
									if (0 === t.strm.avail_in) break
									if (
										((h = t.strm),
										(u = t.window),
										(d = t.strstart + t.lookahead),
										(f = void 0),
										(p = s) < (f = h.avail_in) && (f = p),
										(r =
											0 === f
												? 0
												: ((h.avail_in -= f),
												  n.arraySet(u, h.input, h.next_in, f, d),
												  1 === h.state.wrap
														? (h.adler = o(h.adler, u, f, d))
														: 2 === h.state.wrap && (h.adler = a(h.adler, u, f, d)),
												  (h.next_in += f),
												  (h.total_in += f),
												  f)),
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
								} while (t.lookahead < c && 0 !== t.strm.avail_in)
							}
							function x(t, e) {
								for (var r, i; ; ) {
									if (t.lookahead < c) {
										if ((b(t), t.lookahead < c && 0 === e)) return 1
										if (0 === t.lookahead) break
									}
									if (
										((r = 0),
										t.lookahead >= 3 &&
											((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 3 - 1]) & t.hash_mask),
											(r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
											(t.head[t.ins_h] = t.strstart)),
										0 !== r && t.strstart - r <= t.w_size - c && (t.match_length = P(t, r)),
										t.match_length >= 3)
									)
										if (
											((i = s._tr_tally(t, t.strstart - t.match_start, t.match_length - 3)),
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
									else (i = s._tr_tally(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++
									if (i && (y(t, !1), 0 === t.strm.avail_out)) return 1
								}
								return (
									(t.insert = t.strstart < 2 ? t.strstart : 2),
									4 === e
										? (y(t, !0), 0 === t.strm.avail_out ? 3 : 4)
										: t.last_lit && (y(t, !1), 0 === t.strm.avail_out)
										? 1
										: 2
								)
							}
							function w(t, e) {
								for (var r, i, n; ; ) {
									if (t.lookahead < c) {
										if ((b(t), t.lookahead < c && 0 === e)) return 1
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
											t.strstart - r <= t.w_size - c &&
											((t.match_length = P(t, r)),
											t.match_length <= 5 &&
												(1 === t.strategy || (3 === t.match_length && 4096 < t.strstart - t.match_start)) &&
												(t.match_length = 2)),
										t.prev_length >= 3 && t.match_length <= t.prev_length)
									) {
										for (
											n = t.strstart + t.lookahead - 3,
												i = s._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - 3),
												t.lookahead -= t.prev_length - 1,
												t.prev_length -= 2;
											++t.strstart <= n &&
												((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 3 - 1]) & t.hash_mask),
												(r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
												(t.head[t.ins_h] = t.strstart)),
												0 != --t.prev_length;

										);
										if (
											((t.match_available = 0),
											(t.match_length = 2),
											t.strstart++,
											i && (y(t, !1), 0 === t.strm.avail_out))
										)
											return 1
									} else if (t.match_available) {
										if (
											((i = s._tr_tally(t, 0, t.window[t.strstart - 1])) && y(t, !1),
											t.strstart++,
											t.lookahead--,
											0 === t.strm.avail_out)
										)
											return 1
									} else (t.match_available = 1), t.strstart++, t.lookahead--
								}
								return (
									t.match_available && ((i = s._tr_tally(t, 0, t.window[t.strstart - 1])), (t.match_available = 0)),
									(t.insert = t.strstart < 2 ? t.strstart : 2),
									4 === e
										? (y(t, !0), 0 === t.strm.avail_out ? 3 : 4)
										: t.last_lit && (y(t, !1), 0 === t.strm.avail_out)
										? 1
										: 2
								)
							}
							function C(t, e, r, i, n) {
								;(this.good_length = t),
									(this.max_lazy = e),
									(this.nice_length = r),
									(this.max_chain = i),
									(this.func = n)
							}
							function S() {
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
									(this.dyn_ltree = new n.Buf16(1146)),
									(this.dyn_dtree = new n.Buf16(122)),
									(this.bl_tree = new n.Buf16(78)),
									m(this.dyn_ltree),
									m(this.dyn_dtree),
									m(this.bl_tree),
									(this.l_desc = null),
									(this.d_desc = null),
									(this.bl_desc = null),
									(this.bl_count = new n.Buf16(16)),
									(this.heap = new n.Buf16(573)),
									m(this.heap),
									(this.heap_len = 0),
									(this.heap_max = 0),
									(this.depth = new n.Buf16(573)),
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
							function E(t) {
								var e
								return t && t.state
									? ((t.total_in = t.total_out = 0),
									  (t.data_type = 2),
									  ((e = t.state).pending = 0),
									  (e.pending_out = 0),
									  e.wrap < 0 && (e.wrap = -e.wrap),
									  (e.status = e.wrap ? 42 : d),
									  (t.adler = 2 === e.wrap ? 0 : 1),
									  (e.last_flush = 0),
									  s._tr_init(e),
									  0)
									: p(t, h)
							}
							function I(t) {
								var e = E(t)
								return (
									0 === e &&
										(function (t) {
											;(t.window_size = 2 * t.w_size),
												m(t.head),
												(t.max_lazy_match = i[t.level].max_lazy),
												(t.good_match = i[t.level].good_length),
												(t.nice_match = i[t.level].nice_length),
												(t.max_chain_length = i[t.level].max_chain),
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
							function T(t, e, r, i, s, o) {
								if (!t) return h
								var a = 1
								if (
									(-1 === e && (e = 6),
									i < 0 ? ((a = 0), (i = -i)) : 15 < i && ((a = 2), (i -= 16)),
									s < 1 || 9 < s || 8 !== r || i < 8 || 15 < i || e < 0 || 9 < e || o < 0 || 4 < o)
								)
									return p(t, h)
								8 === i && (i = 9)
								var l = new S()
								return (
									((t.state = l).strm = t),
									(l.wrap = a),
									(l.gzhead = null),
									(l.w_bits = i),
									(l.w_size = 1 << l.w_bits),
									(l.w_mask = l.w_size - 1),
									(l.hash_bits = s + 7),
									(l.hash_size = 1 << l.hash_bits),
									(l.hash_mask = l.hash_size - 1),
									(l.hash_shift = ~~((l.hash_bits + 3 - 1) / 3)),
									(l.window = new n.Buf8(2 * l.w_size)),
									(l.head = new n.Buf16(l.hash_size)),
									(l.prev = new n.Buf16(l.w_size)),
									(l.lit_bufsize = 1 << (s + 6)),
									(l.pending_buf_size = 4 * l.lit_bufsize),
									(l.pending_buf = new n.Buf8(l.pending_buf_size)),
									(l.d_buf = 1 * l.lit_bufsize),
									(l.l_buf = 3 * l.lit_bufsize),
									(l.level = e),
									(l.strategy = o),
									(l.method = r),
									I(t)
								)
							}
							;(i = [
								new C(0, 0, 0, 0, function (t, e) {
									var r = 65535
									for (r > t.pending_buf_size - 5 && (r = t.pending_buf_size - 5); ; ) {
										if (t.lookahead <= 1) {
											if ((b(t), 0 === t.lookahead && 0 === e)) return 1
											if (0 === t.lookahead) break
										}
										;(t.strstart += t.lookahead), (t.lookahead = 0)
										var i = t.block_start + r
										if (
											(0 === t.strstart || t.strstart >= i) &&
											((t.lookahead = t.strstart - i), (t.strstart = i), y(t, !1), 0 === t.strm.avail_out)
										)
											return 1
										if (t.strstart - t.block_start >= t.w_size - c && (y(t, !1), 0 === t.strm.avail_out)) return 1
									}
									return (
										(t.insert = 0),
										4 === e
											? (y(t, !0), 0 === t.strm.avail_out ? 3 : 4)
											: (t.strstart > t.block_start && (y(t, !1), t.strm.avail_out), 1)
									)
								}),
								new C(4, 4, 8, 4, x),
								new C(4, 5, 16, 8, x),
								new C(4, 6, 32, 32, x),
								new C(4, 4, 16, 16, w),
								new C(8, 16, 32, 32, w),
								new C(8, 16, 128, 128, w),
								new C(8, 32, 128, 256, w),
								new C(32, 128, 258, 1024, w),
								new C(32, 258, 258, 4096, w),
							]),
								(r.deflateInit = function (t, e) {
									return T(t, e, 8, 15, 8, 0)
								}),
								(r.deflateInit2 = T),
								(r.deflateReset = I),
								(r.deflateResetKeep = E),
								(r.deflateSetHeader = function (t, e) {
									return t && t.state ? (2 !== t.state.wrap ? h : ((t.state.gzhead = e), 0)) : h
								}),
								(r.deflate = function (t, e) {
									var r, n, o, l
									if (!t || !t.state || 5 < e || e < 0) return t ? p(t, h) : h
									if (((n = t.state), !t.output || (!t.input && 0 !== t.avail_in) || (666 === n.status && 4 !== e)))
										return p(t, 0 === t.avail_out ? -5 : h)
									if (((n.strm = t), (r = n.last_flush), (n.last_flush = e), 42 === n.status))
										if (2 === n.wrap)
											(t.adler = 0),
												_(n, 31),
												_(n, 139),
												_(n, 8),
												n.gzhead
													? (_(
															n,
															(n.gzhead.text ? 1 : 0) +
																(n.gzhead.hcrc ? 2 : 0) +
																(n.gzhead.extra ? 4 : 0) +
																(n.gzhead.name ? 8 : 0) +
																(n.gzhead.comment ? 16 : 0)
													  ),
													  _(n, 255 & n.gzhead.time),
													  _(n, (n.gzhead.time >> 8) & 255),
													  _(n, (n.gzhead.time >> 16) & 255),
													  _(n, (n.gzhead.time >> 24) & 255),
													  _(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0),
													  _(n, 255 & n.gzhead.os),
													  n.gzhead.extra &&
															n.gzhead.extra.length &&
															(_(n, 255 & n.gzhead.extra.length), _(n, (n.gzhead.extra.length >> 8) & 255)),
													  n.gzhead.hcrc && (t.adler = a(t.adler, n.pending_buf, n.pending, 0)),
													  (n.gzindex = 0),
													  (n.status = 69))
													: (_(n, 0),
													  _(n, 0),
													  _(n, 0),
													  _(n, 0),
													  _(n, 0),
													  _(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0),
													  _(n, 3),
													  (n.status = d))
										else {
											var c = (8 + ((n.w_bits - 8) << 4)) << 8
											;(c |= (2 <= n.strategy || n.level < 2 ? 0 : n.level < 6 ? 1 : 6 === n.level ? 2 : 3) << 6),
												0 !== n.strstart && (c |= 32),
												(c += 31 - (c % 31)),
												(n.status = d),
												v(n, c),
												0 !== n.strstart && (v(n, t.adler >>> 16), v(n, 65535 & t.adler)),
												(t.adler = 1)
										}
									if (69 === n.status)
										if (n.gzhead.extra) {
											for (
												o = n.pending;
												n.gzindex < (65535 & n.gzhead.extra.length) &&
												(n.pending !== n.pending_buf_size ||
													(n.gzhead.hcrc && n.pending > o && (t.adler = a(t.adler, n.pending_buf, n.pending - o, o)),
													g(t),
													(o = n.pending),
													n.pending !== n.pending_buf_size));

											)
												_(n, 255 & n.gzhead.extra[n.gzindex]), n.gzindex++
											n.gzhead.hcrc && n.pending > o && (t.adler = a(t.adler, n.pending_buf, n.pending - o, o)),
												n.gzindex === n.gzhead.extra.length && ((n.gzindex = 0), (n.status = 73))
										} else n.status = 73
									if (73 === n.status)
										if (n.gzhead.name) {
											o = n.pending
											do {
												if (
													n.pending === n.pending_buf_size &&
													(n.gzhead.hcrc && n.pending > o && (t.adler = a(t.adler, n.pending_buf, n.pending - o, o)),
													g(t),
													(o = n.pending),
													n.pending === n.pending_buf_size)
												) {
													l = 1
													break
												}
												;(l = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0),
													_(n, l)
											} while (0 !== l)
											n.gzhead.hcrc && n.pending > o && (t.adler = a(t.adler, n.pending_buf, n.pending - o, o)),
												0 === l && ((n.gzindex = 0), (n.status = 91))
										} else n.status = 91
									if (91 === n.status)
										if (n.gzhead.comment) {
											o = n.pending
											do {
												if (
													n.pending === n.pending_buf_size &&
													(n.gzhead.hcrc && n.pending > o && (t.adler = a(t.adler, n.pending_buf, n.pending - o, o)),
													g(t),
													(o = n.pending),
													n.pending === n.pending_buf_size)
												) {
													l = 1
													break
												}
												;(l = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0),
													_(n, l)
											} while (0 !== l)
											n.gzhead.hcrc && n.pending > o && (t.adler = a(t.adler, n.pending_buf, n.pending - o, o)),
												0 === l && (n.status = 103)
										} else n.status = 103
									if (
										(103 === n.status &&
											(n.gzhead.hcrc
												? (n.pending + 2 > n.pending_buf_size && g(t),
												  n.pending + 2 <= n.pending_buf_size &&
														(_(n, 255 & t.adler), _(n, (t.adler >> 8) & 255), (t.adler = 0), (n.status = d)))
												: (n.status = d)),
										0 !== n.pending)
									) {
										if ((g(t), 0 === t.avail_out)) return (n.last_flush = -1), 0
									} else if (0 === t.avail_in && f(e) <= f(r) && 4 !== e) return p(t, -5)
									if (666 === n.status && 0 !== t.avail_in) return p(t, -5)
									if (0 !== t.avail_in || 0 !== n.lookahead || (0 !== e && 666 !== n.status)) {
										var P =
											2 === n.strategy
												? (function (t, e) {
														for (var r; ; ) {
															if (0 === t.lookahead && (b(t), 0 === t.lookahead)) {
																if (0 === e) return 1
																break
															}
															if (
																((t.match_length = 0),
																(r = s._tr_tally(t, 0, t.window[t.strstart])),
																t.lookahead--,
																t.strstart++,
																r && (y(t, !1), 0 === t.strm.avail_out))
															)
																return 1
														}
														return (
															(t.insert = 0),
															4 === e
																? (y(t, !0), 0 === t.strm.avail_out ? 3 : 4)
																: t.last_lit && (y(t, !1), 0 === t.strm.avail_out)
																? 1
																: 2
														)
												  })(n, e)
												: 3 === n.strategy
												? (function (t, e) {
														for (var r, i, n, o, a = t.window; ; ) {
															if (t.lookahead <= u) {
																if ((b(t), t.lookahead <= u && 0 === e)) return 1
																if (0 === t.lookahead) break
															}
															if (
																((t.match_length = 0),
																t.lookahead >= 3 &&
																	0 < t.strstart &&
																	(i = a[(n = t.strstart - 1)]) === a[++n] &&
																	i === a[++n] &&
																	i === a[++n])
															) {
																o = t.strstart + u
																do {} while (
																	i === a[++n] &&
																	i === a[++n] &&
																	i === a[++n] &&
																	i === a[++n] &&
																	i === a[++n] &&
																	i === a[++n] &&
																	i === a[++n] &&
																	i === a[++n] &&
																	n < o
																)
																;(t.match_length = u - (o - n)),
																	t.match_length > t.lookahead && (t.match_length = t.lookahead)
															}
															if (
																(t.match_length >= 3
																	? ((r = s._tr_tally(t, 1, t.match_length - 3)),
																	  (t.lookahead -= t.match_length),
																	  (t.strstart += t.match_length),
																	  (t.match_length = 0))
																	: ((r = s._tr_tally(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++),
																r && (y(t, !1), 0 === t.strm.avail_out))
															)
																return 1
														}
														return (
															(t.insert = 0),
															4 === e
																? (y(t, !0), 0 === t.strm.avail_out ? 3 : 4)
																: t.last_lit && (y(t, !1), 0 === t.strm.avail_out)
																? 1
																: 2
														)
												  })(n, e)
												: i[n.level].func(n, e)
										if (((3 !== P && 4 !== P) || (n.status = 666), 1 === P || 3 === P))
											return 0 === t.avail_out && (n.last_flush = -1), 0
										if (
											2 === P &&
											(1 === e
												? s._tr_align(n)
												: 5 !== e &&
												  (s._tr_stored_block(n, 0, 0, !1),
												  3 === e &&
														(m(n.head), 0 === n.lookahead && ((n.strstart = 0), (n.block_start = 0), (n.insert = 0)))),
											g(t),
											0 === t.avail_out)
										)
											return (n.last_flush = -1), 0
									}
									return 4 !== e
										? 0
										: n.wrap <= 0
										? 1
										: (2 === n.wrap
												? (_(n, 255 & t.adler),
												  _(n, (t.adler >> 8) & 255),
												  _(n, (t.adler >> 16) & 255),
												  _(n, (t.adler >> 24) & 255),
												  _(n, 255 & t.total_in),
												  _(n, (t.total_in >> 8) & 255),
												  _(n, (t.total_in >> 16) & 255),
												  _(n, (t.total_in >> 24) & 255))
												: (v(n, t.adler >>> 16), v(n, 65535 & t.adler)),
										  g(t),
										  0 < n.wrap && (n.wrap = -n.wrap),
										  0 !== n.pending ? 0 : 1)
								}),
								(r.deflateEnd = function (t) {
									var e
									return t && t.state
										? 42 !== (e = t.state.status) &&
										  69 !== e &&
										  73 !== e &&
										  91 !== e &&
										  103 !== e &&
										  e !== d &&
										  666 !== e
											? p(t, h)
											: ((t.state = null), e === d ? p(t, -3) : 0)
										: h
								}),
								(r.deflateSetDictionary = function (t, e) {
									var r,
										i,
										s,
										a,
										l,
										u,
										c,
										d,
										p = e.length
									if (!t || !t.state) return h
									if (2 === (a = (r = t.state).wrap) || (1 === a && 42 !== r.status) || r.lookahead) return h
									for (
										1 === a && (t.adler = o(t.adler, e, p, 0)),
											r.wrap = 0,
											p >= r.w_size &&
												(0 === a && (m(r.head), (r.strstart = 0), (r.block_start = 0), (r.insert = 0)),
												(d = new n.Buf8(r.w_size)),
												n.arraySet(d, e, p - r.w_size, r.w_size, 0),
												(e = d),
												(p = r.w_size)),
											l = t.avail_in,
											u = t.next_in,
											c = t.input,
											t.avail_in = p,
											t.next_in = 0,
											t.input = e,
											b(r);
										r.lookahead >= 3;

									) {
										for (
											i = r.strstart, s = r.lookahead - 2;
											(r.ins_h = ((r.ins_h << r.hash_shift) ^ r.window[i + 3 - 1]) & r.hash_mask),
												(r.prev[i & r.w_mask] = r.head[r.ins_h]),
												(r.head[r.ins_h] = i),
												i++,
												--s;

										);
										;(r.strstart = i), (r.lookahead = 2), b(r)
									}
									return (
										(r.strstart += r.lookahead),
										(r.block_start = r.strstart),
										(r.insert = r.lookahead),
										(r.lookahead = 0),
										(r.match_length = r.prev_length = 2),
										(r.match_available = 0),
										(t.next_in = u),
										(t.input = c),
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
								var r, i, n, s, o, a, l, h, u, c, d, p, f, m, g, y, _, v, P, b, x, w, C, S, E
								;(r = t.state),
									(i = t.next_in),
									(S = t.input),
									(n = i + (t.avail_in - 5)),
									(s = t.next_out),
									(E = t.output),
									(o = s - (e - t.avail_out)),
									(a = s + (t.avail_out - 257)),
									(l = r.dmax),
									(h = r.wsize),
									(u = r.whave),
									(c = r.wnext),
									(d = r.window),
									(p = r.hold),
									(f = r.bits),
									(m = r.lencode),
									(g = r.distcode),
									(y = (1 << r.lenbits) - 1),
									(_ = (1 << r.distbits) - 1)
								t: do {
									f < 15 && ((p += S[i++] << f), (f += 8), (p += S[i++] << f), (f += 8)), (v = m[p & y])
									e: for (;;) {
										if (((p >>>= P = v >>> 24), (f -= P), 0 == (P = (v >>> 16) & 255))) E[s++] = 65535 & v
										else {
											if (!(16 & P)) {
												if (0 == (64 & P)) {
													v = m[(65535 & v) + (p & ((1 << P) - 1))]
													continue e
												}
												if (32 & P) {
													r.mode = 12
													break t
												}
												;(t.msg = 'invalid literal/length code'), (r.mode = 30)
												break t
											}
											;(b = 65535 & v),
												(P &= 15) &&
													(f < P && ((p += S[i++] << f), (f += 8)), (b += p & ((1 << P) - 1)), (p >>>= P), (f -= P)),
												f < 15 && ((p += S[i++] << f), (f += 8), (p += S[i++] << f), (f += 8)),
												(v = g[p & _])
											r: for (;;) {
												if (((p >>>= P = v >>> 24), (f -= P), !(16 & (P = (v >>> 16) & 255)))) {
													if (0 == (64 & P)) {
														v = g[(65535 & v) + (p & ((1 << P) - 1))]
														continue r
													}
													;(t.msg = 'invalid distance code'), (r.mode = 30)
													break t
												}
												if (
													((x = 65535 & v),
													f < (P &= 15) && ((p += S[i++] << f), (f += 8) < P && ((p += S[i++] << f), (f += 8))),
													l < (x += p & ((1 << P) - 1)))
												) {
													;(t.msg = 'invalid distance too far back'), (r.mode = 30)
													break t
												}
												if (((p >>>= P), (f -= P), (P = s - o) < x)) {
													if (u < (P = x - P) && r.sane) {
														;(t.msg = 'invalid distance too far back'), (r.mode = 30)
														break t
													}
													if (((C = d), (w = 0) === c)) {
														if (((w += h - P), P < b)) {
															for (b -= P; (E[s++] = d[w++]), --P; );
															;(w = s - x), (C = E)
														}
													} else if (c < P) {
														if (((w += h + c - P), (P -= c) < b)) {
															for (b -= P; (E[s++] = d[w++]), --P; );
															if (((w = 0), c < b)) {
																for (b -= P = c; (E[s++] = d[w++]), --P; );
																;(w = s - x), (C = E)
															}
														}
													} else if (((w += c - P), P < b)) {
														for (b -= P; (E[s++] = d[w++]), --P; );
														;(w = s - x), (C = E)
													}
													for (; 2 < b; ) (E[s++] = C[w++]), (E[s++] = C[w++]), (E[s++] = C[w++]), (b -= 3)
													b && ((E[s++] = C[w++]), 1 < b && (E[s++] = C[w++]))
												} else {
													for (w = s - x; (E[s++] = E[w++]), (E[s++] = E[w++]), (E[s++] = E[w++]), 2 < (b -= 3); );
													b && ((E[s++] = E[w++]), 1 < b && (E[s++] = E[w++]))
												}
												break
											}
										}
										break
									}
								} while (i < n && s < a)
								;(i -= b = f >> 3),
									(p &= (1 << (f -= b << 3)) - 1),
									(t.next_in = i),
									(t.next_out = s),
									(t.avail_in = i < n ? n - i + 5 : 5 - (i - n)),
									(t.avail_out = s < a ? a - s + 257 : 257 - (s - a)),
									(r.hold = p),
									(r.bits = f)
							}
						},
						{},
					],
					49: [
						function (t, e, r) {
							'use strict'
							var i = t('../utils/common'),
								n = t('./adler32'),
								s = t('./crc32'),
								o = t('./inffast'),
								a = t('./inftrees'),
								l = -2
							function h(t) {
								return ((t >>> 24) & 255) + ((t >>> 8) & 65280) + ((65280 & t) << 8) + ((255 & t) << 24)
							}
							function u() {
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
									(this.lens = new i.Buf16(320)),
									(this.work = new i.Buf16(288)),
									(this.lendyn = null),
									(this.distdyn = null),
									(this.sane = 0),
									(this.back = 0),
									(this.was = 0)
							}
							function c(t) {
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
									  (e.lencode = e.lendyn = new i.Buf32(852)),
									  (e.distcode = e.distdyn = new i.Buf32(592)),
									  (e.sane = 1),
									  (e.back = -1),
									  0)
									: l
							}
							function d(t) {
								var e
								return t && t.state ? (((e = t.state).wsize = 0), (e.whave = 0), (e.wnext = 0), c(t)) : l
							}
							function p(t, e) {
								var r, i
								return t && t.state
									? ((i = t.state),
									  e < 0 ? ((r = 0), (e = -e)) : ((r = 1 + (e >> 4)), e < 48 && (e &= 15)),
									  e && (e < 8 || 15 < e)
											? l
											: (null !== i.window && i.wbits !== e && (i.window = null), (i.wrap = r), (i.wbits = e), d(t)))
									: l
							}
							function f(t, e) {
								var r, i
								return t
									? ((i = new u()), ((t.state = i).window = null), 0 !== (r = p(t, e)) && (t.state = null), r)
									: l
							}
							var m,
								g,
								y = !0
							function _(t) {
								if (y) {
									var e
									for (m = new i.Buf32(512), g = new i.Buf32(32), e = 0; e < 144; ) t.lens[e++] = 8
									for (; e < 256; ) t.lens[e++] = 9
									for (; e < 280; ) t.lens[e++] = 7
									for (; e < 288; ) t.lens[e++] = 8
									for (a(1, t.lens, 0, 288, m, 0, t.work, { bits: 9 }), e = 0; e < 32; ) t.lens[e++] = 5
									a(2, t.lens, 0, 32, g, 0, t.work, { bits: 5 }), (y = !1)
								}
								;(t.lencode = m), (t.lenbits = 9), (t.distcode = g), (t.distbits = 5)
							}
							function v(t, e, r, n) {
								var s,
									o = t.state
								return (
									null === o.window &&
										((o.wsize = 1 << o.wbits), (o.wnext = 0), (o.whave = 0), (o.window = new i.Buf8(o.wsize))),
									n >= o.wsize
										? (i.arraySet(o.window, e, r - o.wsize, o.wsize, 0), (o.wnext = 0), (o.whave = o.wsize))
										: (n < (s = o.wsize - o.wnext) && (s = n),
										  i.arraySet(o.window, e, r - n, s, o.wnext),
										  (n -= s)
												? (i.arraySet(o.window, e, r - n, n, 0), (o.wnext = n), (o.whave = o.wsize))
												: ((o.wnext += s), o.wnext === o.wsize && (o.wnext = 0), o.whave < o.wsize && (o.whave += s))),
									0
								)
							}
							;(r.inflateReset = d),
								(r.inflateReset2 = p),
								(r.inflateResetKeep = c),
								(r.inflateInit = function (t) {
									return f(t, 15)
								}),
								(r.inflateInit2 = f),
								(r.inflate = function (t, e) {
									var r,
										u,
										c,
										d,
										p,
										f,
										m,
										g,
										y,
										P,
										b,
										x,
										w,
										C,
										S,
										E,
										I,
										T,
										A,
										O,
										L,
										k,
										N,
										R,
										B = 0,
										D = new i.Buf8(4),
										M = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
									if (!t || !t.state || !t.output || (!t.input && 0 !== t.avail_in)) return l
									12 === (r = t.state).mode && (r.mode = 13),
										(p = t.next_out),
										(c = t.output),
										(m = t.avail_out),
										(d = t.next_in),
										(u = t.input),
										(f = t.avail_in),
										(g = r.hold),
										(y = r.bits),
										(P = f),
										(b = m),
										(k = 0)
									t: for (;;)
										switch (r.mode) {
											case 1:
												if (0 === r.wrap) {
													r.mode = 13
													break
												}
												for (; y < 16; ) {
													if (0 === f) break t
													f--, (g += u[d++] << y), (y += 8)
												}
												if (2 & r.wrap && 35615 === g) {
													;(D[(r.check = 0)] = 255 & g),
														(D[1] = (g >>> 8) & 255),
														(r.check = s(r.check, D, 2, 0)),
														(y = g = 0),
														(r.mode = 2)
													break
												}
												if (
													((r.flags = 0),
													r.head && (r.head.done = !1),
													!(1 & r.wrap) || (((255 & g) << 8) + (g >> 8)) % 31)
												) {
													;(t.msg = 'incorrect header check'), (r.mode = 30)
													break
												}
												if (8 != (15 & g)) {
													;(t.msg = 'unknown compression method'), (r.mode = 30)
													break
												}
												if (((y -= 4), (L = 8 + (15 & (g >>>= 4))), 0 === r.wbits)) r.wbits = L
												else if (L > r.wbits) {
													;(t.msg = 'invalid window size'), (r.mode = 30)
													break
												}
												;(r.dmax = 1 << L), (t.adler = r.check = 1), (r.mode = 512 & g ? 10 : 12), (y = g = 0)
												break
											case 2:
												for (; y < 16; ) {
													if (0 === f) break t
													f--, (g += u[d++] << y), (y += 8)
												}
												if (((r.flags = g), 8 != (255 & r.flags))) {
													;(t.msg = 'unknown compression method'), (r.mode = 30)
													break
												}
												if (57344 & r.flags) {
													;(t.msg = 'unknown header flags set'), (r.mode = 30)
													break
												}
												r.head && (r.head.text = (g >> 8) & 1),
													512 & r.flags &&
														((D[0] = 255 & g), (D[1] = (g >>> 8) & 255), (r.check = s(r.check, D, 2, 0))),
													(y = g = 0),
													(r.mode = 3)
											case 3:
												for (; y < 32; ) {
													if (0 === f) break t
													f--, (g += u[d++] << y), (y += 8)
												}
												r.head && (r.head.time = g),
													512 & r.flags &&
														((D[0] = 255 & g),
														(D[1] = (g >>> 8) & 255),
														(D[2] = (g >>> 16) & 255),
														(D[3] = (g >>> 24) & 255),
														(r.check = s(r.check, D, 4, 0))),
													(y = g = 0),
													(r.mode = 4)
											case 4:
												for (; y < 16; ) {
													if (0 === f) break t
													f--, (g += u[d++] << y), (y += 8)
												}
												r.head && ((r.head.xflags = 255 & g), (r.head.os = g >> 8)),
													512 & r.flags &&
														((D[0] = 255 & g), (D[1] = (g >>> 8) & 255), (r.check = s(r.check, D, 2, 0))),
													(y = g = 0),
													(r.mode = 5)
											case 5:
												if (1024 & r.flags) {
													for (; y < 16; ) {
														if (0 === f) break t
														f--, (g += u[d++] << y), (y += 8)
													}
													;(r.length = g),
														r.head && (r.head.extra_len = g),
														512 & r.flags &&
															((D[0] = 255 & g), (D[1] = (g >>> 8) & 255), (r.check = s(r.check, D, 2, 0))),
														(y = g = 0)
												} else r.head && (r.head.extra = null)
												r.mode = 6
											case 6:
												if (
													1024 & r.flags &&
													(f < (x = r.length) && (x = f),
													x &&
														(r.head &&
															((L = r.head.extra_len - r.length),
															r.head.extra || (r.head.extra = new Array(r.head.extra_len)),
															i.arraySet(r.head.extra, u, d, x, L)),
														512 & r.flags && (r.check = s(r.check, u, x, d)),
														(f -= x),
														(d += x),
														(r.length -= x)),
													r.length)
												)
													break t
												;(r.length = 0), (r.mode = 7)
											case 7:
												if (2048 & r.flags) {
													if (0 === f) break t
													for (
														x = 0;
														(L = u[d + x++]),
															r.head && L && r.length < 65536 && (r.head.name += String.fromCharCode(L)),
															L && x < f;

													);
													if ((512 & r.flags && (r.check = s(r.check, u, x, d)), (f -= x), (d += x), L)) break t
												} else r.head && (r.head.name = null)
												;(r.length = 0), (r.mode = 8)
											case 8:
												if (4096 & r.flags) {
													if (0 === f) break t
													for (
														x = 0;
														(L = u[d + x++]),
															r.head && L && r.length < 65536 && (r.head.comment += String.fromCharCode(L)),
															L && x < f;

													);
													if ((512 & r.flags && (r.check = s(r.check, u, x, d)), (f -= x), (d += x), L)) break t
												} else r.head && (r.head.comment = null)
												r.mode = 9
											case 9:
												if (512 & r.flags) {
													for (; y < 16; ) {
														if (0 === f) break t
														f--, (g += u[d++] << y), (y += 8)
													}
													if (g !== (65535 & r.check)) {
														;(t.msg = 'header crc mismatch'), (r.mode = 30)
														break
													}
													y = g = 0
												}
												r.head && ((r.head.hcrc = (r.flags >> 9) & 1), (r.head.done = !0)),
													(t.adler = r.check = 0),
													(r.mode = 12)
												break
											case 10:
												for (; y < 32; ) {
													if (0 === f) break t
													f--, (g += u[d++] << y), (y += 8)
												}
												;(t.adler = r.check = h(g)), (y = g = 0), (r.mode = 11)
											case 11:
												if (0 === r.havedict)
													return (
														(t.next_out = p),
														(t.avail_out = m),
														(t.next_in = d),
														(t.avail_in = f),
														(r.hold = g),
														(r.bits = y),
														2
													)
												;(t.adler = r.check = 1), (r.mode = 12)
											case 12:
												if (5 === e || 6 === e) break t
											case 13:
												if (r.last) {
													;(g >>>= 7 & y), (y -= 7 & y), (r.mode = 27)
													break
												}
												for (; y < 3; ) {
													if (0 === f) break t
													f--, (g += u[d++] << y), (y += 8)
												}
												switch (((r.last = 1 & g), (y -= 1), 3 & (g >>>= 1))) {
													case 0:
														r.mode = 14
														break
													case 1:
														if ((_(r), (r.mode = 20), 6 !== e)) break
														;(g >>>= 2), (y -= 2)
														break t
													case 2:
														r.mode = 17
														break
													case 3:
														;(t.msg = 'invalid block type'), (r.mode = 30)
												}
												;(g >>>= 2), (y -= 2)
												break
											case 14:
												for (g >>>= 7 & y, y -= 7 & y; y < 32; ) {
													if (0 === f) break t
													f--, (g += u[d++] << y), (y += 8)
												}
												if ((65535 & g) != ((g >>> 16) ^ 65535)) {
													;(t.msg = 'invalid stored block lengths'), (r.mode = 30)
													break
												}
												if (((r.length = 65535 & g), (y = g = 0), (r.mode = 15), 6 === e)) break t
											case 15:
												r.mode = 16
											case 16:
												if ((x = r.length)) {
													if ((f < x && (x = f), m < x && (x = m), 0 === x)) break t
													i.arraySet(c, u, d, x, p), (f -= x), (d += x), (m -= x), (p += x), (r.length -= x)
													break
												}
												r.mode = 12
												break
											case 17:
												for (; y < 14; ) {
													if (0 === f) break t
													f--, (g += u[d++] << y), (y += 8)
												}
												if (
													((r.nlen = 257 + (31 & g)),
													(g >>>= 5),
													(y -= 5),
													(r.ndist = 1 + (31 & g)),
													(g >>>= 5),
													(y -= 5),
													(r.ncode = 4 + (15 & g)),
													(g >>>= 4),
													(y -= 4),
													286 < r.nlen || 30 < r.ndist)
												) {
													;(t.msg = 'too many length or distance symbols'), (r.mode = 30)
													break
												}
												;(r.have = 0), (r.mode = 18)
											case 18:
												for (; r.have < r.ncode; ) {
													for (; y < 3; ) {
														if (0 === f) break t
														f--, (g += u[d++] << y), (y += 8)
													}
													;(r.lens[M[r.have++]] = 7 & g), (g >>>= 3), (y -= 3)
												}
												for (; r.have < 19; ) r.lens[M[r.have++]] = 0
												if (
													((r.lencode = r.lendyn),
													(r.lenbits = 7),
													(N = { bits: r.lenbits }),
													(k = a(0, r.lens, 0, 19, r.lencode, 0, r.work, N)),
													(r.lenbits = N.bits),
													k)
												) {
													;(t.msg = 'invalid code lengths set'), (r.mode = 30)
													break
												}
												;(r.have = 0), (r.mode = 19)
											case 19:
												for (; r.have < r.nlen + r.ndist; ) {
													for (
														;
														(E = ((B = r.lencode[g & ((1 << r.lenbits) - 1)]) >>> 16) & 255),
															(I = 65535 & B),
															!((S = B >>> 24) <= y);

													) {
														if (0 === f) break t
														f--, (g += u[d++] << y), (y += 8)
													}
													if (I < 16) (g >>>= S), (y -= S), (r.lens[r.have++] = I)
													else {
														if (16 === I) {
															for (R = S + 2; y < R; ) {
																if (0 === f) break t
																f--, (g += u[d++] << y), (y += 8)
															}
															if (((g >>>= S), (y -= S), 0 === r.have)) {
																;(t.msg = 'invalid bit length repeat'), (r.mode = 30)
																break
															}
															;(L = r.lens[r.have - 1]), (x = 3 + (3 & g)), (g >>>= 2), (y -= 2)
														} else if (17 === I) {
															for (R = S + 3; y < R; ) {
																if (0 === f) break t
																f--, (g += u[d++] << y), (y += 8)
															}
															;(y -= S), (L = 0), (x = 3 + (7 & (g >>>= S))), (g >>>= 3), (y -= 3)
														} else {
															for (R = S + 7; y < R; ) {
																if (0 === f) break t
																f--, (g += u[d++] << y), (y += 8)
															}
															;(y -= S), (L = 0), (x = 11 + (127 & (g >>>= S))), (g >>>= 7), (y -= 7)
														}
														if (r.have + x > r.nlen + r.ndist) {
															;(t.msg = 'invalid bit length repeat'), (r.mode = 30)
															break
														}
														for (; x--; ) r.lens[r.have++] = L
													}
												}
												if (30 === r.mode) break
												if (0 === r.lens[256]) {
													;(t.msg = 'invalid code -- missing end-of-block'), (r.mode = 30)
													break
												}
												if (
													((r.lenbits = 9),
													(N = { bits: r.lenbits }),
													(k = a(1, r.lens, 0, r.nlen, r.lencode, 0, r.work, N)),
													(r.lenbits = N.bits),
													k)
												) {
													;(t.msg = 'invalid literal/lengths set'), (r.mode = 30)
													break
												}
												if (
													((r.distbits = 6),
													(r.distcode = r.distdyn),
													(N = { bits: r.distbits }),
													(k = a(2, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, N)),
													(r.distbits = N.bits),
													k)
												) {
													;(t.msg = 'invalid distances set'), (r.mode = 30)
													break
												}
												if (((r.mode = 20), 6 === e)) break t
											case 20:
												r.mode = 21
											case 21:
												if (6 <= f && 258 <= m) {
													;(t.next_out = p),
														(t.avail_out = m),
														(t.next_in = d),
														(t.avail_in = f),
														(r.hold = g),
														(r.bits = y),
														o(t, b),
														(p = t.next_out),
														(c = t.output),
														(m = t.avail_out),
														(d = t.next_in),
														(u = t.input),
														(f = t.avail_in),
														(g = r.hold),
														(y = r.bits),
														12 === r.mode && (r.back = -1)
													break
												}
												for (
													r.back = 0;
													(E = ((B = r.lencode[g & ((1 << r.lenbits) - 1)]) >>> 16) & 255),
														(I = 65535 & B),
														!((S = B >>> 24) <= y);

												) {
													if (0 === f) break t
													f--, (g += u[d++] << y), (y += 8)
												}
												if (E && 0 == (240 & E)) {
													for (
														T = S, A = E, O = I;
														(E = ((B = r.lencode[O + ((g & ((1 << (T + A)) - 1)) >> T)]) >>> 16) & 255),
															(I = 65535 & B),
															!(T + (S = B >>> 24) <= y);

													) {
														if (0 === f) break t
														f--, (g += u[d++] << y), (y += 8)
													}
													;(g >>>= T), (y -= T), (r.back += T)
												}
												if (((g >>>= S), (y -= S), (r.back += S), (r.length = I), 0 === E)) {
													r.mode = 26
													break
												}
												if (32 & E) {
													;(r.back = -1), (r.mode = 12)
													break
												}
												if (64 & E) {
													;(t.msg = 'invalid literal/length code'), (r.mode = 30)
													break
												}
												;(r.extra = 15 & E), (r.mode = 22)
											case 22:
												if (r.extra) {
													for (R = r.extra; y < R; ) {
														if (0 === f) break t
														f--, (g += u[d++] << y), (y += 8)
													}
													;(r.length += g & ((1 << r.extra) - 1)), (g >>>= r.extra), (y -= r.extra), (r.back += r.extra)
												}
												;(r.was = r.length), (r.mode = 23)
											case 23:
												for (
													;
													(E = ((B = r.distcode[g & ((1 << r.distbits) - 1)]) >>> 16) & 255),
														(I = 65535 & B),
														!((S = B >>> 24) <= y);

												) {
													if (0 === f) break t
													f--, (g += u[d++] << y), (y += 8)
												}
												if (0 == (240 & E)) {
													for (
														T = S, A = E, O = I;
														(E = ((B = r.distcode[O + ((g & ((1 << (T + A)) - 1)) >> T)]) >>> 16) & 255),
															(I = 65535 & B),
															!(T + (S = B >>> 24) <= y);

													) {
														if (0 === f) break t
														f--, (g += u[d++] << y), (y += 8)
													}
													;(g >>>= T), (y -= T), (r.back += T)
												}
												if (((g >>>= S), (y -= S), (r.back += S), 64 & E)) {
													;(t.msg = 'invalid distance code'), (r.mode = 30)
													break
												}
												;(r.offset = I), (r.extra = 15 & E), (r.mode = 24)
											case 24:
												if (r.extra) {
													for (R = r.extra; y < R; ) {
														if (0 === f) break t
														f--, (g += u[d++] << y), (y += 8)
													}
													;(r.offset += g & ((1 << r.extra) - 1)), (g >>>= r.extra), (y -= r.extra), (r.back += r.extra)
												}
												if (r.offset > r.dmax) {
													;(t.msg = 'invalid distance too far back'), (r.mode = 30)
													break
												}
												r.mode = 25
											case 25:
												if (0 === m) break t
												if (((x = b - m), r.offset > x)) {
													if ((x = r.offset - x) > r.whave && r.sane) {
														;(t.msg = 'invalid distance too far back'), (r.mode = 30)
														break
													}
													;(w = x > r.wnext ? ((x -= r.wnext), r.wsize - x) : r.wnext - x),
														x > r.length && (x = r.length),
														(C = r.window)
												} else (C = c), (w = p - r.offset), (x = r.length)
												for (m < x && (x = m), m -= x, r.length -= x; (c[p++] = C[w++]), --x; );
												0 === r.length && (r.mode = 21)
												break
											case 26:
												if (0 === m) break t
												;(c[p++] = r.length), m--, (r.mode = 21)
												break
											case 27:
												if (r.wrap) {
													for (; y < 32; ) {
														if (0 === f) break t
														f--, (g |= u[d++] << y), (y += 8)
													}
													if (
														((b -= m),
														(t.total_out += b),
														(r.total += b),
														b && (t.adler = r.check = r.flags ? s(r.check, c, b, p - b) : n(r.check, c, b, p - b)),
														(b = m),
														(r.flags ? g : h(g)) !== r.check)
													) {
														;(t.msg = 'incorrect data check'), (r.mode = 30)
														break
													}
													y = g = 0
												}
												r.mode = 28
											case 28:
												if (r.wrap && r.flags) {
													for (; y < 32; ) {
														if (0 === f) break t
														f--, (g += u[d++] << y), (y += 8)
													}
													if (g !== (4294967295 & r.total)) {
														;(t.msg = 'incorrect length check'), (r.mode = 30)
														break
													}
													y = g = 0
												}
												r.mode = 29
											case 29:
												k = 1
												break t
											case 30:
												k = -3
												break t
											case 31:
												return -4
											case 32:
											default:
												return l
										}
									return (
										(t.next_out = p),
										(t.avail_out = m),
										(t.next_in = d),
										(t.avail_in = f),
										(r.hold = g),
										(r.bits = y),
										(r.wsize || (b !== t.avail_out && r.mode < 30 && (r.mode < 27 || 4 !== e))) &&
										v(t, t.output, t.next_out, b - t.avail_out)
											? ((r.mode = 31), -4)
											: ((P -= t.avail_in),
											  (b -= t.avail_out),
											  (t.total_in += P),
											  (t.total_out += b),
											  (r.total += b),
											  r.wrap &&
													b &&
													(t.adler = r.check = r.flags
														? s(r.check, c, b, t.next_out - b)
														: n(r.check, c, b, t.next_out - b)),
											  (t.data_type =
													r.bits +
													(r.last ? 64 : 0) +
													(12 === r.mode ? 128 : 0) +
													(20 === r.mode || 15 === r.mode ? 256 : 0)),
											  ((0 == P && 0 === b) || 4 === e) && 0 === k && (k = -5),
											  k)
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
										i = e.length
									return t && t.state
										? 0 !== (r = t.state).wrap && 11 !== r.mode
											? l
											: 11 === r.mode && n(1, e, i, 0) !== r.check
											? -3
											: v(t, e, i, i)
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
							var i = t('../utils/common'),
								n = [
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
							e.exports = function (t, e, r, l, h, u, c, d) {
								var p,
									f,
									m,
									g,
									y,
									_,
									v,
									P,
									b,
									x = d.bits,
									w = 0,
									C = 0,
									S = 0,
									E = 0,
									I = 0,
									T = 0,
									A = 0,
									O = 0,
									L = 0,
									k = 0,
									N = null,
									R = 0,
									B = new i.Buf16(16),
									D = new i.Buf16(16),
									M = null,
									F = 0
								for (w = 0; w <= 15; w++) B[w] = 0
								for (C = 0; C < l; C++) B[e[r + C]]++
								for (I = x, E = 15; 1 <= E && 0 === B[E]; E--);
								if ((E < I && (I = E), 0 === E)) return (h[u++] = 20971520), (h[u++] = 20971520), (d.bits = 1), 0
								for (S = 1; S < E && 0 === B[S]; S++);
								for (I < S && (I = S), w = O = 1; w <= 15; w++) if (((O <<= 1), (O -= B[w]) < 0)) return -1
								if (0 < O && (0 === t || 1 !== E)) return -1
								for (D[1] = 0, w = 1; w < 15; w++) D[w + 1] = D[w] + B[w]
								for (C = 0; C < l; C++) 0 !== e[r + C] && (c[D[e[r + C]]++] = C)
								if (
									((_ =
										0 === t
											? ((N = M = c), 19)
											: 1 === t
											? ((N = n), (R -= 257), (M = s), (F -= 257), 256)
											: ((N = o), (M = a), -1)),
									(w = S),
									(y = u),
									(A = C = k = 0),
									(m = -1),
									(g = (L = 1 << (T = I)) - 1),
									(1 === t && 852 < L) || (2 === t && 592 < L))
								)
									return 1
								for (;;) {
									for (
										v = w - A,
											b = c[C] < _ ? ((P = 0), c[C]) : c[C] > _ ? ((P = M[F + c[C]]), N[R + c[C]]) : ((P = 96), 0),
											p = 1 << (w - A),
											S = f = 1 << T;
										(h[y + (k >> A) + (f -= p)] = (v << 24) | (P << 16) | b | 0), 0 !== f;

									);
									for (p = 1 << (w - 1); k & p; ) p >>= 1
									if ((0 !== p ? ((k &= p - 1), (k += p)) : (k = 0), C++, 0 == --B[w])) {
										if (w === E) break
										w = e[r + c[C]]
									}
									if (I < w && (k & g) !== m) {
										for (0 === A && (A = I), y += S, O = 1 << (T = w - A); T + A < E && !((O -= B[T + A]) <= 0); )
											T++, (O <<= 1)
										if (((L += 1 << T), (1 === t && 852 < L) || (2 === t && 592 < L))) return 1
										h[(m = k & g)] = (I << 24) | (T << 16) | (y - u) | 0
									}
								}
								return 0 !== k && (h[y + k] = ((w - A) << 24) | (64 << 16) | 0), (d.bits = I), 0
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
							var i = t('../utils/common')
							function n(t) {
								for (var e = t.length; 0 <= --e; ) t[e] = 0
							}
							var s = 256,
								o = 286,
								a = 30,
								l = 15,
								h = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
								u = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
								c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
								d = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
								p = new Array(576)
							n(p)
							var f = new Array(60)
							n(f)
							var m = new Array(512)
							n(m)
							var g = new Array(256)
							n(g)
							var y = new Array(29)
							n(y)
							var _,
								v,
								P,
								b = new Array(a)
							function x(t, e, r, i, n) {
								;(this.static_tree = t),
									(this.extra_bits = e),
									(this.extra_base = r),
									(this.elems = i),
									(this.max_length = n),
									(this.has_stree = t && t.length)
							}
							function w(t, e) {
								;(this.dyn_tree = t), (this.max_code = 0), (this.stat_desc = e)
							}
							function C(t) {
								return t < 256 ? m[t] : m[256 + (t >>> 7)]
							}
							function S(t, e) {
								;(t.pending_buf[t.pending++] = 255 & e), (t.pending_buf[t.pending++] = (e >>> 8) & 255)
							}
							function E(t, e, r) {
								t.bi_valid > 16 - r
									? ((t.bi_buf |= (e << t.bi_valid) & 65535),
									  S(t, t.bi_buf),
									  (t.bi_buf = e >> (16 - t.bi_valid)),
									  (t.bi_valid += r - 16))
									: ((t.bi_buf |= (e << t.bi_valid) & 65535), (t.bi_valid += r))
							}
							function I(t, e, r) {
								E(t, r[2 * e], r[2 * e + 1])
							}
							function T(t, e) {
								for (var r = 0; (r |= 1 & t), (t >>>= 1), (r <<= 1), 0 < --e; );
								return r >>> 1
							}
							function A(t, e, r) {
								var i,
									n,
									s = new Array(16),
									o = 0
								for (i = 1; i <= l; i++) s[i] = o = (o + r[i - 1]) << 1
								for (n = 0; n <= e; n++) {
									var a = t[2 * n + 1]
									0 !== a && (t[2 * n] = T(s[a]++, a))
								}
							}
							function O(t) {
								var e
								for (e = 0; e < o; e++) t.dyn_ltree[2 * e] = 0
								for (e = 0; e < a; e++) t.dyn_dtree[2 * e] = 0
								for (e = 0; e < 19; e++) t.bl_tree[2 * e] = 0
								;(t.dyn_ltree[512] = 1), (t.opt_len = t.static_len = 0), (t.last_lit = t.matches = 0)
							}
							function L(t) {
								8 < t.bi_valid ? S(t, t.bi_buf) : 0 < t.bi_valid && (t.pending_buf[t.pending++] = t.bi_buf),
									(t.bi_buf = 0),
									(t.bi_valid = 0)
							}
							function k(t, e, r, i) {
								var n = 2 * e,
									s = 2 * r
								return t[n] < t[s] || (t[n] === t[s] && i[e] <= i[r])
							}
							function N(t, e, r) {
								for (
									var i = t.heap[r], n = r << 1;
									n <= t.heap_len &&
									(n < t.heap_len && k(e, t.heap[n + 1], t.heap[n], t.depth) && n++, !k(e, i, t.heap[n], t.depth));

								)
									(t.heap[r] = t.heap[n]), (r = n), (n <<= 1)
								t.heap[r] = i
							}
							function R(t, e, r) {
								var i,
									n,
									o,
									a,
									l = 0
								if (0 !== t.last_lit)
									for (
										;
										(i = (t.pending_buf[t.d_buf + 2 * l] << 8) | t.pending_buf[t.d_buf + 2 * l + 1]),
											(n = t.pending_buf[t.l_buf + l]),
											l++,
											0 === i
												? I(t, n, e)
												: (I(t, (o = g[n]) + s + 1, e),
												  0 !== (a = h[o]) && E(t, (n -= y[o]), a),
												  I(t, (o = C(--i)), r),
												  0 !== (a = u[o]) && E(t, (i -= b[o]), a)),
											l < t.last_lit;

									);
								I(t, 256, e)
							}
							function B(t, e) {
								var r,
									i,
									n,
									s = e.dyn_tree,
									o = e.stat_desc.static_tree,
									a = e.stat_desc.has_stree,
									h = e.stat_desc.elems,
									u = -1
								for (t.heap_len = 0, t.heap_max = 573, r = 0; r < h; r++)
									0 !== s[2 * r] ? ((t.heap[++t.heap_len] = u = r), (t.depth[r] = 0)) : (s[2 * r + 1] = 0)
								for (; t.heap_len < 2; )
									(s[2 * (n = t.heap[++t.heap_len] = u < 2 ? ++u : 0)] = 1),
										(t.depth[n] = 0),
										t.opt_len--,
										a && (t.static_len -= o[2 * n + 1])
								for (e.max_code = u, r = t.heap_len >> 1; 1 <= r; r--) N(t, s, r)
								for (
									n = h;
									(r = t.heap[1]),
										(t.heap[1] = t.heap[t.heap_len--]),
										N(t, s, 1),
										(i = t.heap[1]),
										(t.heap[--t.heap_max] = r),
										(t.heap[--t.heap_max] = i),
										(s[2 * n] = s[2 * r] + s[2 * i]),
										(t.depth[n] = (t.depth[r] >= t.depth[i] ? t.depth[r] : t.depth[i]) + 1),
										(s[2 * r + 1] = s[2 * i + 1] = n),
										(t.heap[1] = n++),
										N(t, s, 1),
										2 <= t.heap_len;

								);
								;(t.heap[--t.heap_max] = t.heap[1]),
									(function (t, e) {
										var r,
											i,
											n,
											s,
											o,
											a,
											h = e.dyn_tree,
											u = e.max_code,
											c = e.stat_desc.static_tree,
											d = e.stat_desc.has_stree,
											p = e.stat_desc.extra_bits,
											f = e.stat_desc.extra_base,
											m = e.stat_desc.max_length,
											g = 0
										for (s = 0; s <= l; s++) t.bl_count[s] = 0
										for (h[2 * t.heap[t.heap_max] + 1] = 0, r = t.heap_max + 1; r < 573; r++)
											m < (s = h[2 * h[2 * (i = t.heap[r]) + 1] + 1] + 1) && ((s = m), g++),
												(h[2 * i + 1] = s),
												u < i ||
													(t.bl_count[s]++,
													(o = 0),
													f <= i && (o = p[i - f]),
													(a = h[2 * i]),
													(t.opt_len += a * (s + o)),
													d && (t.static_len += a * (c[2 * i + 1] + o)))
										if (0 !== g) {
											do {
												for (s = m - 1; 0 === t.bl_count[s]; ) s--
												t.bl_count[s]--, (t.bl_count[s + 1] += 2), t.bl_count[m]--, (g -= 2)
											} while (0 < g)
											for (s = m; 0 !== s; s--)
												for (i = t.bl_count[s]; 0 !== i; )
													u < (n = t.heap[--r]) ||
														(h[2 * n + 1] !== s && ((t.opt_len += (s - h[2 * n + 1]) * h[2 * n]), (h[2 * n + 1] = s)),
														i--)
										}
									})(t, e),
									A(s, u, t.bl_count)
							}
							function D(t, e, r) {
								var i,
									n,
									s = -1,
									o = e[1],
									a = 0,
									l = 7,
									h = 4
								for (0 === o && ((l = 138), (h = 3)), e[2 * (r + 1) + 1] = 65535, i = 0; i <= r; i++)
									(n = o),
										(o = e[2 * (i + 1) + 1]),
										(++a < l && n === o) ||
											(a < h
												? (t.bl_tree[2 * n] += a)
												: 0 !== n
												? (n !== s && t.bl_tree[2 * n]++, t.bl_tree[32]++)
												: a <= 10
												? t.bl_tree[34]++
												: t.bl_tree[36]++,
											(s = n),
											(h = (a = 0) === o ? ((l = 138), 3) : n === o ? ((l = 6), 3) : ((l = 7), 4)))
							}
							function M(t, e, r) {
								var i,
									n,
									s = -1,
									o = e[1],
									a = 0,
									l = 7,
									h = 4
								for (0 === o && ((l = 138), (h = 3)), i = 0; i <= r; i++)
									if (((n = o), (o = e[2 * (i + 1) + 1]), !(++a < l && n === o))) {
										if (a < h) for (; I(t, n, t.bl_tree), 0 != --a; );
										else
											0 !== n
												? (n !== s && (I(t, n, t.bl_tree), a--), I(t, 16, t.bl_tree), E(t, a - 3, 2))
												: a <= 10
												? (I(t, 17, t.bl_tree), E(t, a - 3, 3))
												: (I(t, 18, t.bl_tree), E(t, a - 11, 7))
										;(s = n), (h = (a = 0) === o ? ((l = 138), 3) : n === o ? ((l = 6), 3) : ((l = 7), 4))
									}
							}
							n(b)
							var F = !1
							function Y(t, e, r, n) {
								E(t, 0 + (n ? 1 : 0), 3),
									(function (t, e, r, n) {
										L(t), S(t, r), S(t, ~r), i.arraySet(t.pending_buf, t.window, e, r, t.pending), (t.pending += r)
									})(t, e, r)
							}
							;(r._tr_init = function (t) {
								F ||
									((function () {
										var t,
											e,
											r,
											i,
											n,
											s = new Array(16)
										for (i = r = 0; i < 28; i++) for (y[i] = r, t = 0; t < 1 << h[i]; t++) g[r++] = i
										for (g[r - 1] = i, i = n = 0; i < 16; i++) for (b[i] = n, t = 0; t < 1 << u[i]; t++) m[n++] = i
										for (n >>= 7; i < a; i++) for (b[i] = n << 7, t = 0; t < 1 << (u[i] - 7); t++) m[256 + n++] = i
										for (e = 0; e <= l; e++) s[e] = 0
										for (t = 0; t <= 143; ) (p[2 * t + 1] = 8), t++, s[8]++
										for (; t <= 255; ) (p[2 * t + 1] = 9), t++, s[9]++
										for (; t <= 279; ) (p[2 * t + 1] = 7), t++, s[7]++
										for (; t <= 287; ) (p[2 * t + 1] = 8), t++, s[8]++
										for (A(p, 287, s), t = 0; t < a; t++) (f[2 * t + 1] = 5), (f[2 * t] = T(t, 5))
										;(_ = new x(p, h, 257, o, l)), (v = new x(f, u, 0, a, l)), (P = new x(new Array(0), c, 0, 19, 7))
									})(),
									(F = !0)),
									(t.l_desc = new w(t.dyn_ltree, _)),
									(t.d_desc = new w(t.dyn_dtree, v)),
									(t.bl_desc = new w(t.bl_tree, P)),
									(t.bi_buf = 0),
									(t.bi_valid = 0),
									O(t)
							}),
								(r._tr_stored_block = Y),
								(r._tr_flush_block = function (t, e, r, i) {
									var n,
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
										  B(t, t.l_desc),
										  B(t, t.d_desc),
										  (a = (function (t) {
												var e
												for (
													D(t, t.dyn_ltree, t.l_desc.max_code),
														D(t, t.dyn_dtree, t.d_desc.max_code),
														B(t, t.bl_desc),
														e = 18;
													3 <= e && 0 === t.bl_tree[2 * d[e] + 1];
													e--
												);
												return (t.opt_len += 3 * (e + 1) + 5 + 5 + 4), e
										  })(t)),
										  (n = (t.opt_len + 3 + 7) >>> 3),
										  (o = (t.static_len + 3 + 7) >>> 3) <= n && (n = o))
										: (n = o = r + 5),
										r + 4 <= n && -1 !== e
											? Y(t, e, r, i)
											: 4 === t.strategy || o === n
											? (E(t, 2 + (i ? 1 : 0), 3), R(t, p, f))
											: (E(t, 4 + (i ? 1 : 0), 3),
											  (function (t, e, r, i) {
													var n
													for (E(t, e - 257, 5), E(t, r - 1, 5), E(t, i - 4, 4), n = 0; n < i; n++)
														E(t, t.bl_tree[2 * d[n] + 1], 3)
													M(t, t.dyn_ltree, e - 1), M(t, t.dyn_dtree, r - 1)
											  })(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, a + 1),
											  R(t, t.dyn_ltree, t.dyn_dtree)),
										O(t),
										i && L(t)
								}),
								(r._tr_tally = function (t, e, r) {
									return (
										(t.pending_buf[t.d_buf + 2 * t.last_lit] = (e >>> 8) & 255),
										(t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e),
										(t.pending_buf[t.l_buf + t.last_lit] = 255 & r),
										t.last_lit++,
										0 === e
											? t.dyn_ltree[2 * r]++
											: (t.matches++, e--, t.dyn_ltree[2 * (g[r] + s + 1)]++, t.dyn_dtree[2 * C(e)]++),
										t.last_lit === t.lit_bufsize - 1
									)
								}),
								(r._tr_align = function (t) {
									E(t, 2, 3),
										I(t, 256, p),
										(function (t) {
											16 === t.bi_valid
												? (S(t, t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0))
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
								'function' == typeof i
									? i
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
	384: function (t, e, r) {
		'use strict'
		var i = r(3),
			n = r.n(i),
			s = r(18),
			o = r(85),
			a = r(385),
			l = r(381),
			h = r(2),
			u = r(22)
		class c extends l.a {
			static generateImage(t, e = 800, r = 800, i, n) {
				const o = new s.a({ width: e, height: r, background: i, mainColor: n }),
					a = h.b.create(t)
				if (a) {
					const t = h.b.copy(a, o, void 0, !0)
					if (t) {
						o.add(t), o.update(0)
						const i = !0,
							n = c.adaptShapeToScene(t, o)
						return c.getSceneImage(o, e, r, i, n).then(t => (t.length ? t : '/assets/images/broken-shape.png'))
					}
				}
				return Promise.resolve('/assets/images/broken-shape.png')
			}
			static adaptShapeToScene(t, e, r = 1) {
				e.update(0)
				const i = u.a.getBounding(t.getBuffer())
				return (
					(i.width > e.width || i.height > e.height) &&
						(r = (Math.min(e.width, e.height) / Math.max(i.width, i.height)) * r),
					0.9 * r
				)
			}
			static getSceneImage(t, e = 800, r = 800, i = !1, n) {
				return new Promise(s => {
					if ('undefined' != typeof OffscreenCanvas) {
						const o = new OffscreenCanvas(e, r),
							a = o.getContext('2d')
						c.draw(t, a, { time: 0, fixedLineWidth: i, scale: n }, e),
							o.convertToBlob({ type: 'image/png', quality: 0.95 }).then(t => {
								const e = new FileReader()
								e.addEventListener('load', () => (e.result ? s(e.result) : s('')), { passive: !0 }), e.readAsDataURL(t)
							})
					} else {
						const o = document.createElement('canvas'),
							a = o.getContext('2d')
						;(o.width = e),
							(o.height = r),
							(o.style.width = e + 'px'),
							(o.style.height = r + 'px'),
							c.draw(t, a, { time: 0, fixedLineWidth: i, scale: n }, e),
							s(o.toDataURL())
					}
				})
			}
		}
		var d,
			p = c
		!(function (t) {
			;(t[(t.UNDO = 0)] = 'UNDO'), (t[(t.REDO = 1)] = 'REDO'), (t[(t.NONE = 2)] = 'NONE')
		})(d || (d = {}))
		var f = r(6)
		var m = class {
			constructor(t, e = {}, r = !1, i) {
				;(this.id = t), (this.preventPushToHistory = r || !1), (this.data = e), this.setDescriptor()
			}
			redo(t) {
				if (!this.passive) {
					if (this.status != d.REDO) {
						;(this.handleRedo(t) || !1) && (this.status = d.REDO)
					}
					return this.status
				}
				return (this.status = d.NONE)
			}
			undo(t) {
				if (!this.passive) {
					if (this.status != d.UNDO) {
						;(this.handleUndo(t) || !1) && (this.status = d.UNDO)
					}
					return this.status
				}
				return (this.status = d.NONE)
			}
			handleRedo(t) {
				return !1
			}
			handleUndo(t) {
				return !1
			}
			setDescriptor() {}
		}
		var g = class extends m {
			constructor() {
				super(...arguments),
					(this.slug = 'add'),
					(this.passive = !1),
					(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: [] })
			}
			handleRedo(t) {
				const e = t.getScene(),
					r = t.getDrawer(),
					i = h.b.create(
						this.data.type,
						{ id: this.data.added_id, name: this.data.added_name, order: this.data.added_order },
						e,
						r
					)
				if (i && null == e.find(this.data.added_id)) {
					if (
						((i.scene = e),
						this.data.props && Object.keys(this.data.props).forEach(t => h.a.setProp(i, t, this.data.props[t], r)),
						this.data.parent_id)
					) {
						const t = e.find(this.data.parent_id)
						if (!t) return !1
						h.b.add(t, i, void 0, e)
					} else e.add(i)
					return (
						(this.data.added_order = this.data.added_order || (null == i ? void 0 : i.order)),
						(this.data.added_name = this.data.added_name || (null == i ? void 0 : i.name)),
						(this.data.added_id = i.id),
						(this.effects.select_layer = [this.data.added_id]),
						!0
					)
				}
			}
			handleUndo(t) {
				const e = t.getScene()
				if (e.find(this.data.added_id)) return e.removeFromId(this.data.added_id), (this.effects.select_layer = []), !0
			}
			setDescriptor() {
				this.data.parent_id
					? (this.descriptor = `add "${this.data.type}" to ${this.data.parent_id}`)
					: (this.descriptor = `add "${this.data.type}" to Scene`)
			}
		}
		var y = class extends m {
				constructor(t, e, r = !1, i) {
					super(t, e, r, i),
						(this.slug = 'remove'),
						(this.passive = !1),
						(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: [] }),
						(e = Array.isArray(e) ? e : [e])
					const n = i.getScene(),
						s = i.getDrawer()
					;(this.data = e
						.map(t => {
							var e
							const r = n.find(t)
							return r
								? {
										id: t,
										copied_sceneChild: h.b.copy(r, n, s, !0),
										parent_id: (null === (e = h.b.getParent(r)) || void 0 === e ? void 0 : e.id) || null,
								  }
								: null
						})
						.filter(t => !!t)
						.sort((t, e) => (t && e ? t.copied_sceneChild.order - e.copied_sceneChild.order : 0))),
						this.setDescriptor()
				}
				handleRedo(t) {
					let e = !1
					return (
						this.data.forEach(r => {
							const i = t.getScene().find(r.id)
							i && (h.b.remove(i), (e = !0))
						}),
						e
					)
				}
				handleUndo(t) {
					let e = !1
					return (
						this.data.forEach(r => {
							if (r.copied_sceneChild && !t.getScene().find(r.id)) {
								const i = r.copied_sceneChild,
									n = r.parent_id ? t.getScene().find(r.parent_id) : null
								r.parent_id && n ? (h.b.add(n, i), (e = !0)) : null == r.parent_id && (t.getScene().add(i), (e = !0))
							}
						}),
						e
					)
				}
				setDescriptor() {
					var t
					this.data.length >= 0
						? (this.descriptor = `remove "${
								null === (t = this.data[0].copied_sceneChild) || void 0 === t ? void 0 : t.id
						  }"`)
						: (this.descriptor = `remove "${this.data.length}" scenechild`)
				}
			},
			_ = r(17)
		var v = class extends m {
			constructor(t, e, r = !1, i) {
				super(t, Array.isArray(e) ? e : [e], r, i),
					(this.slug = 'set-prop'),
					(this.passive = !1),
					(this.effects = {
						scene_update: !0,
						scene_child_prop_update: this.data.map(t => ({ id: t.id, name: t.name, value: t.value })),
					}),
					this.setDescriptor(i)
			}
			handleRedo(t) {
				let e = !1,
					r = 0
				return (
					this.data.forEach(({ id: i, name: n, value: s }) => {
						const o = t.getScene().find(i)
						if (o && this.effects.scene_child_prop_update) {
							h.a.setProp(o, n, s, t.getDrawer()),
								(this.effects.scene_child_prop_update[r++].value = s),
								o instanceof _.a &&
									h.b.getChildren(o).forEach(t => {
										this.effects.scene_child_prop_update[r++] = { id: t.id, name: n, value: s }
									})
							const i = h.b.getParent(o)
							i &&
								i instanceof _.a &&
								(i.setPropUnsafe(n, void 0),
								(this.effects.scene_child_prop_update[r++] = { id: i.id, name: n, value: void 0 })),
								(e = e || !0)
						}
					}),
					e
				)
			}
			handleUndo(t) {
				let e = !1,
					r = 0
				return (
					this.data.forEach(({ id: i, name: n, prev_value: s }) => {
						const o = t.getScene().find(i)
						if (o && this.effects.scene_child_prop_update) {
							h.a.setProp(o, n, s, t.getDrawer()),
								(this.effects.scene_child_prop_update[r++].value = s),
								o instanceof _.a &&
									h.b.getChildren(o).forEach(t => {
										this.effects.scene_child_prop_update[r++] = { id: t.id, name: n, value: s }
									})
							const i = h.b.getParent(o)
							i &&
								i instanceof _.a &&
								(i.setPropUnsafe(n, s), (this.effects.scene_child_prop_update[r++] = { id: i.id, name: n, value: s })),
								(e = e || !0)
						}
					}),
					e
				)
			}
			setDescriptor(t) {
				var e
				if (1 == this.data.length) {
					const { name: r, id: i, prev_value: n, value: s } = this.data[0],
						o = (null === (e = null == t ? void 0 : t.getScene().find(i)) || void 0 === e ? void 0 : e.name) || i
					this.descriptor = `set prop "${r}" of "${o}" from "${n}" to "${s}"`
				} else this.descriptor = 'set multiple prop'
			}
		}
		var P = class extends m {
			constructor(t, e, r = !1, i) {
				super(t, Array.isArray(e) ? e : [e], r, i),
					(this.slug = 'set-prop'),
					(this.passive = !1),
					(this.effects = {
						scene_update: !0,
						scene_child_ui_prop_update: this.data.map(t => ({ id: t.id, name: t.name, value: t.value })),
					}),
					this.setDescriptor(i)
			}
			handleRedo(t) {
				let e = !1,
					r = 0
				return (
					this.data.forEach(({ id: i, name: n, value: s }) => {
						const o = t.getScene().find(i)
						o &&
							this.effects.scene_child_ui_prop_update &&
							((o.data[n] = s), (this.effects.scene_child_ui_prop_update[r++].value = s), (e = e || !0))
					}),
					e
				)
			}
			handleUndo(t) {
				let e = !1,
					r = 0
				return (
					this.data.forEach(({ id: i, name: n, prev_value: s }) => {
						const o = t.getScene().find(i)
						o &&
							this.effects.scene_child_ui_prop_update &&
							((o.data[n] = s), (this.effects.scene_child_ui_prop_update[r++].value = s), (e = e || !0))
					}),
					e
				)
			}
			setDescriptor(t) {
				var e
				if (1 == this.data.length) {
					const { name: r, id: i, prev_value: n, value: s } = this.data[0],
						o = (null === (e = null == t ? void 0 : t.getScene().find(i)) || void 0 === e ? void 0 : e.name) || i
					this.descriptor = `set ui prop "${r}" of "${o}" from "${n}" to "${s}"`
				} else this.descriptor = 'set multiple prop'
			}
		}
		var b = class extends m {
				constructor(t, e, r = !1, i) {
					super(t, e, r, i),
						(this.slug = 'make-shape'),
						(this.passive = !1),
						(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: [] }),
						(this.data = {
							ids: e,
							sceneChilds: e
								.map(t => i.getScene().find(t))
								.filter(t => null !== t)
								.sort((t, e) => t.order - e.order),
						})
				}
				hasSameParents(t) {
					if (t.length <= 1) return !0
					const e = t.map(t => h.b.getParent(t))
					let r = e[0]
					for (let t = 1, i = e.length; t < i; t++) {
						if (r != e[t]) return !1
						r = e[t]
					}
					return !0
				}
				handleRedo(t) {
					const e = t.getScene()
					if (this.data.sceneChilds.length > 0 && this.hasSameParents(this.data.sceneChilds)) {
						const r = this.data.sceneChilds,
							i = h.b.getParent(r[0]),
							n = h.b.create('Shape', { id: this.data.new_shape_id }, e)
						return (
							r.forEach(t => {
								h.b.remove(t), h.b.add(n, t, void 0, e)
							}),
							i ? h.b.add(i, n) : t.getScene().add(n),
							(this.data.parent_id = i ? i.id : null),
							(this.data.new_shape_id = n.id),
							(this.effects.select_layer = [this.data.new_shape_id]),
							!0
						)
					}
				}
				handleUndo(t) {
					const e = t.getScene()
					if (this.data.sceneChilds.length > 0 && this.data.new_shape_id) {
						e.removeFromId(this.data.new_shape_id)
						const t = this.data.parent_id ? e.find(this.data.parent_id) : null
						return (
							t ? this.data.sceneChilds.forEach(e => h.b.add(t, e)) : this.data.sceneChilds.forEach(t => e.add(t)),
							(this.effects.select_layer = this.data.sceneChilds.map(t => t.id)),
							!0
						)
					}
				}
				setDescriptor() {
					this.descriptor = 'make shape'
				}
			},
			x = r(65)
		var w = class extends m {
			constructor(t, e, r, i = !1, n) {
				super(t, r, !0, n),
					(this.slug = 'move'),
					(this.passive = !1),
					(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: null }),
					(this.data = { id: r, move: e, sceneChild: n.getScene().find(r) }),
					this.setDescriptor()
			}
			handleRedo(t) {
				var e
				const r = t.getScene()
				if (this.data.sceneChild) {
					const t = h.b.getParent(this.data.sceneChild) || r
					if (t instanceof s.a || t instanceof _.a) {
						const r = h.b.getNeighbors(this.data.sceneChild),
							i = Object(x.indexOfObjectProperty)(r, 'id', this.data.sceneChild.id),
							n =
								'up' == this.data.move
									? i - 1
									: 'top' == this.data.move
									? 0
									: 'down' == this.data.move
									? i + 1
									: r.length - 1
						n >= 0 &&
							n < r.length &&
							((r[i].order = (null !== (e = r[n].order) && void 0 !== e ? e : 0) + (n > i ? 1 : -1)), t.sortChildren())
					}
					return !0
				}
			}
			handleUndo(t) {
				var e
				const r = t.getScene()
				if (this.data.sceneChild) {
					const t = h.b.getParent(this.data.sceneChild) || r
					if (t instanceof s.a || t instanceof _.a) {
						const r = h.b.getNeighbors(this.data.sceneChild),
							i = Object(x.indexOfObjectProperty)(r, 'id', this.data.sceneChild.id),
							n =
								'down' == this.data.move
									? i - 1
									: 'bottom' == this.data.move
									? 0
									: 'up' == this.data.move
									? i + 1
									: r.length - 1
						n >= 0 &&
							n < r.length &&
							((r[i].order = (null !== (e = r[n].order) && void 0 !== e ? e : 0) + (n > i ? 1 : -1)), t.sortChildren())
					}
					return !0
				}
			}
			setDescriptor() {
				this.descriptor = 'move ' + this.data.move
			}
		}
		var C = class extends w {
			constructor(t, e, r = !1, i) {
				super(t, 'up', e, r, i), (this.slug = 'move-up')
			}
		}
		var S = class extends w {
			constructor(t, e, r = !1, i) {
				super(t, 'down', e, r, i), (this.slug = 'move-down')
			}
		}
		var E = class extends w {
			constructor(t, e, r = !1, i) {
				super(t, 'top', e, r, i), (this.slug = 'move-to-top')
			}
		}
		var I = class extends w {
				constructor(t, e, r = !1, i) {
					super(t, 'bottom', e, r, i), (this.slug = 'move-to-bottom')
				}
			},
			T = r(167),
			A = r.n(T)
		function O(t, e) {
			const r = t.getBuffer()
			let i = null
			if (r) {
				const n = t.getProp('repetitions', void 0, 1),
					s = t.getSingleRepetitionBufferLength()
				let o = 0
				for (let t = 0; t < n; t++) {
					const n = s[t],
						a = new Array(n / 2)
					for (let t = 0, e = 0; t < n; t += 2, e++, o += 2) a[e] = { X: r[o], Y: r[o + 1] }
					i = i ? i[e](new A.a([a])) : new A.a([a])
				}
			}
			return i || new A.a([[]])
		}
		var L = class extends m {
			constructor() {
				super(...arguments),
					(this.slug = 'shape-operation'),
					(this.passive = !1),
					(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: [] })
			}
			handleRedo(t) {
				const e = t.getScene(),
					r = t.getDrawer(),
					i = e.find(this.data.a_id),
					n = e.find(this.data.b_id)
				if (i && n) {
					const t = i.getBuffer(),
						s = n.getBuffer()
					if (t && s && t.length > 0 && s.length > 0) {
						;(this.data.a = i), (this.data.b = n)
						const t = (function (t) {
							const e = Array.prototype.concat.apply([], t.paths),
								r = 2 * e.length,
								i = new Float32Array(r)
							for (let t = 0, n = 0; t < r; t += 2, n++) (i[t] = e[n].X), (i[t + 1] = e[n].Y)
							const n = u.a.getBounding(i),
								s = n.width > n.height ? 1 : n.width / n.height,
								o = n.width > n.height ? n.height / n.width : 1,
								a = t.paths.length,
								l = new Array(a)
							for (let e = 0; e < a; e++) {
								const r = t.paths[e],
									i = 2 * r.length,
									a = new Float32Array(i)
								for (let t = 0, e = 0; t < i; t += 2, e++)
									(a[t] = s * ((r[e].X - n.cx) / n.width) * 2), (a[t + 1] = o * ((r[e].Y - n.cy) / n.height) * 2)
								l[e] = a
							}
							return l
						})(O(i, this.data.type)[this.data.type](O(n, this.data.type)))
						if (t && t.length > 0) {
							const n = h.b.getParent(i)
							let s = null
							if (1 == t.length) s = h.b.create('ShapeBuffer', { shape: t[0] }, e, r)
							else {
								s = h.b.create('Shape', void 0, e)
								const i = h.a.getCountSceneChildOfType(e, 'ShapeBuffer') + 1
								if (s)
									for (let n = 0; n < t.length; n++) {
										const o = h.b.create('ShapeBuffer', { shape: t[n] }, e, r)
										o && h.b.add(s, o, { name: 'ShapeBuffer_' + (i + n) }, e)
									}
							}
							if (s)
								return (
									(this.data.new_id = s.id),
									n ? h.b.add(n, s, void 0, e) : e.add(s),
									e.removeFromId(this.data.a_id),
									e.removeFromId(this.data.b_id),
									(this.effects.select_layer = [this.data.new_id]),
									!0
								)
						}
					}
				}
				return !1
			}
			handleUndo(t) {
				const e = t.getScene()
				if (e.find(this.data.new_id)) {
					e.removeFromId(this.data.new_id)
					const t = this.data.a_parent_id ? e.find(this.data.a_parent_id) : null,
						r = this.data.b_parent_id ? e.find(this.data.b_parent_id) : null
					return (
						t ? h.b.add(t, this.data.a, void 0, e) : e.add(this.data.a),
						r ? h.b.add(r, this.data.b, void 0, e) : e.add(this.data.b),
						(this.effects.select_layer = [this.data.a_id, this.data.b_id]),
						!0
					)
				}
			}
			setDescriptor() {
				this.descriptor = `shape "${this.data.type}"`
			}
		}
		var k = class extends m {
			constructor() {
				super(...arguments),
					(this.slug = 'create-from-buffer'),
					(this.passive = !1),
					(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: [] })
			}
			handleRedo(t) {
				const e = t.getScene(),
					r = (function (t, e) {
						var r
						const i = t.getScene()
						let n = null
						if (e.length) {
							const s = null === (r = h.a.sceneChildProps.sideLength) || void 0 === r ? void 0 : r.default
							switch (e.length) {
								case 0:
									n = null
									break
								case 1:
									n = h.b.create('ShapeBuffer', { shape: e[0].buffer, sideLength: s, bCloseShape: e[0].closed }, i, t)
									break
								default:
									;(n = h.b.create('Shape', void 0, i, t)),
										n &&
											e.forEach((e, r) => {
												const o = h.b.create(
													'ShapeBuffer',
													{ shape: e.buffer, sideLength: s, order: r, bCloseShape: e.closed },
													i,
													t
												)
												o && h.b.add(n, o, void 0, i)
											})
							}
							n && i.add(n)
						}
						return n
					})(t.getDrawer(), this.data.buffers)
				if (r && null == e.find(this.data.added_id))
					return (this.data.added_id = r.id), (this.effects.select_layer = [this.data.added_id]), !0
			}
			handleUndo(t) {
				const e = t.getScene()
				if (e.find(this.data.added_id)) return e.removeFromId(this.data.added_id), (this.effects.select_layer = []), !0
			}
			setDescriptor() {
				this.descriptor = 'create from buffer'
			}
		}
		var N = class extends m {
			constructor(t, e, r = !1, i) {
				var n, s
				super(t, e, r, i),
					(this.slug = 'copy'),
					(this.passive = !1),
					(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: [] }),
					(this.data.refName =
						(null === (s = null === (n = i.getScene()) || void 0 === n ? void 0 : n.find(this.data.id)) || void 0 === s
							? void 0
							: s.name) || '')
			}
			handleRedo(t) {
				const e = t.getScene(),
					r = t.getDrawer(),
					i = e.find(this.data.id)
				if (i) {
					const t = h.b.copy(i, e, r)
					if (t) {
						if (this.data.parent_id) {
							const r = e.find(this.data.parent_id)
							if (!r) return !1
							h.b.add(r, t, void 0, e)
						} else e.add(t)
						return (
							(this.data.added_order = this.data.added_order || (null == t ? void 0 : t.order)),
							(this.data.added_name = this.data.added_name || (null == t ? void 0 : t.name)),
							(this.data.added_id = t.id),
							(this.effects.select_layer = [this.data.added_id]),
							!0
						)
					}
				}
			}
			handleUndo(t) {
				const e = t.getScene().find(this.data.added_id)
				if (e) return h.b.remove(e), (this.effects.select_layer = []), !0
			}
			setDescriptor() {
				this.descriptor = `copy "${this.data.refName}"`
			}
		}
		var R = class extends m {
			constructor(t, e, r = !1, i) {
				super(t, e, r, i),
					(this.slug = 'cut'),
					(this.passive = !1),
					(this.effects = { scene_update: !0, scene_layers_update: !0, select_layer: [] })
				const n = i.getScene().find(this.data.id)
				n && ((this.data.parentSceneChild = h.b.getParent(n)), (this.data.refName = n.name))
			}
			handleRedo(t) {
				const e = t.getScene(),
					r = e.find(this.data.id)
				if (r) {
					if ((h.b.remove(r), this.data.parent_id)) {
						const t = e.find(this.data.parent_id)
						t && h.b.add(t, r, void 0, e)
					} else e.add(r)
					return (this.effects.select_layer = [this.data.id]), !0
				}
			}
			handleUndo(t) {
				const e = t.getScene(),
					r = e.find(this.data.id)
				if (r)
					return (
						h.b.remove(r),
						this.data.parentSceneChild ? h.b.add(this.data.parentSceneChild, r) : e.add(r),
						(this.effects.select_layer = []),
						!0
					)
			}
			setDescriptor() {
				this.descriptor = `cut "${this.data.refName}"`
			}
		}
		class B extends o.a {
			constructor() {
				super(),
					(this.command_increment_id = 0),
					(this.commmands = {
						add: g,
						copy: N,
						cut: R,
						'create-from-buffer': k,
						'shape-operation': L,
						remove: y,
						'set-prop': v,
						'set-ui-prop': P,
						'make-shape': b,
						'move-up': C,
						'move-down': S,
						'move-to-top': E,
						'move-to-bottom': I,
					}),
					(this.history = []),
					(this.current_history_index = 0)
			}
			execute(t, e, r, i) {
				if (!(e in this.commmands)) return void console.warn(`Command history: command "${e}" not recognized.`)
				const n = new this.commmands[e](++this.command_increment_id, r, i, t)
				return n.redo(t) !== d.NONE
					? n.preventPushToHistory
						? { scene_update: n.effects.scene_update, scene_layers_update: n.effects.scene_layers_update }
						: (this.reindexingHistory(),
						  this.history.unshift(n),
						  this.history.length >= B.MAX_HISTORY && (this.history = this.history.slice(0, B.MAX_HISTORY)),
						  this.dispatchHistoryUpdate(),
						  n.effects)
					: void 0
			}
			handleCommandEffect(t, e) {
				t &&
					Object.keys(t).forEach(r => {
						const i = Array.isArray(t[r]) ? t[r] : [t[r]]
						switch (r) {
							case 'scene_child_prop_update':
								if (void 0 === e[r]) e[r] = [i]
								else {
									const n = e[r]
									let s = !1
									for (let t = 0, e = n.length; t < e; t++)
										for (let e = 0, r = i.length; t < r; t++)
											n[t].id == i[e].id && n[t].name == i[e].name && ((n[t].value = i.value), (s = !0))
									!s && e[r].push(t[r])
								}
								break
							default:
								e[r] = e[r] || t[r]
						}
					})
			}
			goTo(t, e) {
				if (e == this.current_history_index) return
				const r = {}
				if (e > this.current_history_index)
					for (let i = e - this.current_history_index - 1; i >= 0; i--) this.handleCommandEffect(this.undo(t, !0), r)
				if (e < this.current_history_index)
					for (let i = this.current_history_index - e - 1; i >= 0; i--) this.handleCommandEffect(this.redo(t, !0), r)
				return this.dispatchHistoryUpdate(), r
			}
			redo(t, e = !1) {
				if (this.history.length > 0 && this.current_history_index > 0) {
					const r = Object(f.b)(0, this.history.length, this.current_history_index - 1),
						i = this.history[r]
					return i.redo(t), (this.current_history_index = r), e || this.dispatchHistoryUpdate(), i.effects
				}
			}
			undo(t, e = !1) {
				if (this.history.length >= 0 && this.current_history_index < this.history.length) {
					const r = Object(f.b)(0, this.history.length, this.current_history_index),
						i = this.history[r]
					return i.undo(t), (this.current_history_index = r + 1), e || this.dispatchHistoryUpdate(), i.effects
				}
			}
			reindexingHistory() {
				if (this.current_history_index > 0)
					for (let t = 0, e = this.current_history_index; t < e; t++) this.history.shift()
				this.current_history_index = 0
			}
			dispatchHistoryUpdate() {
				const t = this.history
					.map((t, e) => ({
						id: t.id,
						command: t.descriptor,
						level: e,
						status: t.status,
						bLast: e == this.current_history_index,
						passive: t.passive,
					}))
					.filter(t => !t.passive)
				this.dispatch('command_history:update_history', t)
			}
			clear() {
				;(this.history = []), (this.command_increment_id = 0), (this.current_history_index = 0)
			}
		}
		B.MAX_HISTORY = 100
		var D = B,
			M = r(70)
		function F(t, e, r) {
			;(e.data[t] = r), h.b.getChildren(e).forEach(e => F(t, e, r))
		}
		var Y = r(165)
		var X = r(71),
			z = r(120)
		class U {
			static export(t, e) {
				const r = t.getScene(),
					i = t.getTimeline(),
					n = Math.floor(4 * e.quality),
					s = [],
					o = Object.assign({}, t.getOptions())
				if (o.ghosts) {
					const e = i.getTime(),
						a = i.getSequenceEndTime()
					for (let i = 1; i <= o.ghosts; i++) {
						const l = e - (o.ghost_skip_function ? o.ghost_skip_function(i) : i * (o.ghost_skip_time || 30))
						;(o.clearCanvas = 1 == i),
							(o.ghost_index = i),
							(o.time = l < 0 ? l + a : l > a ? l % a : l),
							s.push(U.draw(r, o, t.getResolution(), n))
					}
					;(o.clearCanvas = !1),
						(o.ghost_index = void 0),
						(o.time = i.getTime()),
						s.push(U.draw(r, o, t.getResolution(), n))
				} else if (o.clearCanvas)
					(o.time = i.getTime()),
						(o.clearCanvas = o.clearCanvas || i.getCurrentFrame() <= 0),
						s.push(U.draw(r, o, t.getResolution(), n))
				else {
					const a = i.getSequence(),
						l = e.time >= a.end ? a.frames : i.getFrameAtTime(e.time)
					for (let e = 0; e <= l; e++) i.setFrame(e), (o.time = i.getTime()), s.push(U.draw(r, o, t.getResolution(), n))
				}
				const a = []
				return (
					a.push(`\x3c!-- Generate with: ${z.a.app_name} ${z.a.app_version} --\x3e`),
					a.push(
						`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r.width.toFixed(n)} ${r.height.toFixed(
							n
						)}" width="${r.width.toFixed(n)}" height="${r.height.toFixed(n)}">`
					),
					e.noBackground ||
						a.push(`\t<rect width="${r.width.toFixed(n)}" height="${r.height.toFixed(n)}" fill="${r.background}" />`),
					a.push(s.map(t => `<g>${t.join('\t\t')}</g>`).join('\t')),
					a.push('</svg>'),
					a.join('\n')
				)
			}
			static draw(t, e, r, i) {
				var n, s, o
				const a = null !== (n = e.scale) && void 0 !== n ? n : 1,
					l = null !== (s = e.translate) && void 0 !== s ? s : [0, 0],
					h = null !== (o = e.time) && void 0 !== o ? o : 0,
					u = void 0 !== e.ghosts && e.ghosts > 0 && void 0 !== e.ghost_index && e.ghost_index > 0,
					c = u ? 1 - e.ghost_index / (e.ghosts + 0.5) : 1,
					d = t.width,
					p = t.height,
					f = [(d / ((r = r || d) / (d > p ? 1 : p / d))) * a, (p / (r / (d > p ? d / p : 1))) * a],
					m = [
						d / 2 - (a > 1 ? (l[0] * d) / (1 / ((a - 1) / 2)) : 0),
						p / 2 - (a > 1 ? (l[1] * p) / (1 / ((a - 1) / 2)) : 0),
					]
				;(t.current_time = h),
					t.getChildren().forEach(t => {
						var e, r
						!1 === (null === (e = null == t ? void 0 : t.data) || void 0 === e ? void 0 : e.visible) ||
							(u && !0 === (null === (r = null == t ? void 0 : t.data) || void 0 === r ? void 0 : r.disableGhost)) ||
							t.generate(h, !0)
					})
				const g = []
				return (
					t.draw(
						({
							lineWidth: t,
							strokeColor: e,
							fillColor: r,
							shape: n,
							buffer: s,
							buffer_length: o,
							current_buffer_index: a,
						}) => {
							var l, h
							if (
								0 == (null === (l = null == n ? void 0 : n.data) || void 0 === l ? void 0 : l.visible) ||
								(u && 1 == (null === (h = null == n ? void 0 : n.data) || void 0 === h ? void 0 : h.disableGhost))
							)
								return
							const y = []
							for (let t = 0; t < o; t += 2) {
								const e = (s[a + t] - d / 2) * f[0] + m[0],
									r = (s[a + t + 1] - p / 2) * f[1] + m[1]
								y.push(e.toFixed(i) + ' ' + r.toFixed(i))
							}
							if (r && u) {
								const t = /\((.+),(.+),(.+),(.+)\)/g.exec(r)
								if (t) {
									let [, e, i, n, s] = t
									const o = s ? parseFloat(s) : 1,
										a = o <= 0 ? 0 : o * c
									r = r.indexOf('rgb') >= 0 ? `rgba(${e},${i},${n},${a})` : `hsla(${e},${i},${n},${a})`
								}
							}
							if (e && t && u) {
								const r = /\((.+),(.+),(.+),(.+)\)/g.exec(e)
								if (r) {
									let [, t, i, n, s] = r
									const o = s ? parseFloat(s) : 1,
										a = o <= 0 ? 0 : o * c
									e = e.indexOf('rgb') >= 0 ? `rgba(${t},${i},${n},${a})` : `hsla(${t},${i},${n},${a})`
								}
								t *= c
							}
							g.push(
								`<path fill="${r || 'none'}" ${e ? `stroke="${e}"` : ''} ${t ? `stroke-width="${t}"` : ''} d="M${y.join(
									' L'
								)} ${n && n.isClosed() ? 'Z' : ''}" />`
							)
						}
					),
					g
				)
			}
		}
		var j = U
		const q = (t, e, r, i, n) => {
			const o = n || r,
				a = r / ('low' == o ? 5 : 'medium' == o ? 2 : 'ultra' == o ? 0.5 : 1)
			e.resize(a, a),
				e.setResolution(a),
				e.setRatio(i),
				s.a.walk(t => {
					const r = t.data.props
					Object.keys(r).forEach(i => {
						h.a.setProp(t, i, r[i], e)
					})
				}, t),
				e.redraw()
		}
		function W(t, e, r) {
			const { scene: i, project: n } = X.a.import(e, t),
				s = void 0 !== typeof OffscreenCanvas ? new OffscreenCanvas(0, 0) : document.createElement('canvas'),
				o = new p(i, s, { noBackground: 'image/png' === r.type && r.noBackground, time: r.time }, r.size)
			return (
				H(n, o),
				o.getTimeline().setTime(r.time),
				q(i, o, r.size, n.ratio, 'high'),
				{ project: n, drawer: o, settings: r }
			)
		}
		function H(t, e) {
			e.setOption('clearCanvas', t.clearCanvas),
				e.setOption('ghosts', t.ghosts),
				e.setOption('ghost_skip_time', t.ghost_skip_time),
				void 0 !== t.sequence.start &&
					void 0 !== t.sequence.end &&
					void 0 !== t.sequence.framerate &&
					e.getTimeline().setSequence(t.sequence.start, t.sequence.end, t.sequence.framerate)
		}
		var Z = r(11)
		var G = function (t, e, r, i) {
				return new (r || (r = Promise))(function (n, s) {
					function o(t) {
						try {
							l(i.next(t))
						} catch (t) {
							s(t)
						}
					}
					function a(t) {
						try {
							l(i.throw(t))
						} catch (t) {
							s(t)
						}
					}
					function l(t) {
						var e
						t.done
							? n(t.value)
							: ((e = t.value),
							  e instanceof r
									? e
									: new r(function (t) {
											t(e)
									  })).then(o, a)
					}
					l((i = i.apply(t, e || [])).next())
				})
			},
			$ = r(126)
		var V = function (t, e, r, i) {
			return new (r || (r = Promise))(function (n, s) {
				function o(t) {
					try {
						l(i.next(t))
					} catch (t) {
						s(t)
					}
				}
				function a(t) {
					try {
						l(i.throw(t))
					} catch (t) {
						s(t)
					}
				}
				function l(t) {
					var e
					t.done
						? n(t.value)
						: ((e = t.value),
						  e instanceof r
								? e
								: new r(function (t) {
										t(e)
								  })).then(o, a)
				}
				l((i = i.apply(t, e || [])).next())
			})
		}
		const J = {
			'export-json': function (t, e) {
				const r = t.args
				return $.a.export(r)
			},
			'import-json': function (t, e) {
				const r = t.args,
					i = e.getDrawer(),
					n = X.a.import(r, i)
				if (n) {
					const { scene: t, project: r } = n
					return (
						H(r, i),
						e.getCommandHistory().clear(),
						e.setScene(t),
						e.sendEvent('project:init', r),
						q(t, i, t.width, r.ratio, 'high'),
						r
					)
				}
				return null
			},
			'append-json': function (t, e) {
				const r = t.args,
					i = e.getDrawer(),
					n = e.getScene(),
					s = X.a.import(r, i)
				if (s) {
					return (
						s.scene.getChildren().forEach(t => {
							n.find(t.id) || n.add(t)
						}),
						e.sendEvent('scene:update-layers', { layers: M.a.export(n, i) }),
						i.redraw(),
						!0
					)
				}
				return !1
			},
			'scene-layers': function (t, e) {
				return M.a.export(e.getScene(), e.getDrawer())
			},
			'layer-highlight': function (t, e) {
				const r = e.getScene().find(t.args.id)
				r && (F('highlighted', r, t.args.status), e.getDrawer().redraw())
			},
			'layer-visibility': [
				function (t, e) {
					const r = e.getScene().find(t.args.id)
					r && (F('visible', r, t.args.status), e.getDrawer().redraw())
				},
				'scene_layers_update',
			],
			'layer-ghost': [
				function (t, e) {
					const r = e.getScene().find(t.args.id)
					r && ((r.data.disableGhost = t.args.status), e.getDrawer().redraw())
				},
				'scene_layers_update',
				({ id: t, status: e }) => ({ scene_child_ui_prop_update: [{ id: t, name: 'disableGhost', value: e }] }),
			],
			'layer-rename': [
				function (t, e) {
					const { id: r, name: i } = t.args,
						n = e.getScene().find(r)
					n && (n.name = i)
				},
				'scene_layers_update',
			],
			'toggle-timeline': (t, e) => {
				const r = e.getDrawer()
				r.getTimeline().bSequenceStarted() ? r.pauseAnimation() : r.playAnimation()
			},
			'change-timeline-state': (t, e) => {
				const r = e.getDrawer()
				t.args == Y.a.START
					? !r.getTimeline().bSequenceStarted() && r.playAnimation()
					: r.getTimeline().bSequenceStarted() && r.pauseAnimation()
			},
			'set-timeline-duration': (t, e) => {
				const r = e.getDrawer(),
					i = t.args
				r.getTimeline().setSequenceEndTime(i)
			},
			'set-timeline-framerate': (t, e) => {
				const r = e.getDrawer(),
					i = t.args
				r.getTimeline().setFramerate(i)
			},
			'set-timeline': (t, e) => {
				const r = e.getDrawer(),
					i = t.args
				r.getTimeline().setTime(i), r.redraw()
			},
			'timeline-sequence': (t, e) => e.getDrawer().getTimeline().getSequence(),
			'set-drawer-offsets': (t, e) => {
				const r = e.getDrawer(),
					{ scale: i, translate: n } = t.args
				r.setOption({ scale: i, translate: n }), r.redraw()
			},
			'set-drawer-lines': (t, e) => {
				const r = e.getDrawer(),
					i = t.args
				r.setOption('simmetricLine', i), r.redraw()
			},
			'set-drawer-clear': (t, e) => {
				const r = e.getDrawer(),
					i = t.args
				r.setOption('clearCanvas', i), r.redraw(), e.sendEvent('project:update-properties', { clearCanvas: i })
			},
			'set-drawer-ghosts': (t, e) => {
				const r = e.getDrawer(),
					{ ghosts: i, ghost_skip_time: n } = t.args
				r.setOption('ghosts', i),
					r.setOption('ghost_skip_time', n),
					r.redraw(),
					e.sendEvent('project:update-properties', {
						ghosts: Math.round(10 * i) / 10,
						ghost_skip_time: Math.round(10 * n) / 10,
					})
			},
			'set-drawer-ratio': (t, e) => {
				const { size: r, ratio: i, resolution: n } = t.args
				q(e.getScene(), e.getDrawer(), r, i, n), e.sendEvent('project:update-properties', { ratio: i })
			},
			'set-scene-background': (t, e) => {
				const r = e.getScene(),
					i = e.getDrawer(),
					{ background: n, preventDispatch: s } = t.args
				;(r.background = n), i.redraw(), !s && e.sendEvent('project:update-properties', { background: n })
			},
			'set-background-image': (t, e) => {
				const { image: r, source: i } = t.args
				e.getDrawer().setOption('backgroundImage', r), e.getDrawer().redraw()
				const n = i
				e.sendEvent('project:update-properties', { backgroundImage: n })
			},
			'render-image': (t, e) => {
				const r = e.getDrawer()
				r.stopAnimation()
				const i = t.args.settings,
					n = t.args.project,
					s = e.getRenderer()
				if ('image/svg+xml' === i.type) {
					const t = W(r, n, i)
					return JSON.stringify({ svg: j.export(t.drawer, i) })
				}
				const o = W(r, n, i)
				return s.renderImage(o.drawer, i)
			},
			'render-animation': (t, e) => {
				const r = e.getDrawer()
				r.stopAnimation()
				const i = t.args.settings,
					n = t.args.project,
					s = e.getRenderer(),
					o = W(r, n, i)
				return s.renderAnimation(o.drawer, i)
			},
			'render-stop': (t, e) => {
				e.getRenderer().stop()
			},
			prop: (t, e) => {
				var r
				const { id: i, name: n } = t.args,
					s = e.getScene().find(i)
				if (0 == n.indexOf('loop.') && s instanceof Z.a) {
					const t = n.substr(5)
					return null !== (r = s.getLoop()[t]) && void 0 !== r ? r : void 0
				}
				return s ? s.getProp(n) : void 0
			},
			'single-bounding': (t, e) => {
				const r = e.getScene(),
					i = e.getScene().find(t.args.id)
				if (i) {
					const t = i.getProp('repetitions', void 0, 1),
						e = i.getProp('distance', void 0, 0)
					i.setProp({ repetitions: 1, distance: 0 }, !0), i.generate(Math.random(), !0)
					const n = u.a.getBounding(i.getBuffer())
					return (
						i.setProp({ repetitions: t, distance: e }),
						(n.x /= r.width),
						(n.y /= r.height),
						(n.cx /= r.width),
						(n.cy /= r.height),
						(n.width /= r.width),
						(n.height /= r.height),
						n
					)
				}
				return null
			},
			toolbar: function (t, e) {
				return G(this, void 0, void 0, function* () {
					const { size: e, color: r } = t.args,
						i = h.b.getRegistered()
					;['ShapeLoop', 'ShapePrimitive', 'ShapeBuffer', 'Shape', 'Group'].forEach(t => {
						i.splice(i.indexOf(t), 1)
					})
					const n = [],
						s = []
					i.forEach(t => {
						s.push(p.generateImage(t, e, e, void 0, r))
					})
					const o = yield Promise.all(s)
					return (
						i.forEach((t, e) => {
							n.push({ name: t, image: o[e] })
						}),
						n
					)
				})
			},
			'scene-points': (t, e) => {
				const r =
						e
							.getScene()
							.getChildren()
							.reduce((t, e) => t + e.getBufferLength(), 0) / 2,
					i = e.getDrawer().getOption('ghosts')
				return i && i > 0 ? r * i : r
			},
			'get-buffer-length': (t, e) => {
				var r
				const i = null === (r = e.getScene().find(t.args.id)) || void 0 === r ? void 0 : r.getBufferLength()
				return i ? i / 2 : 0
			},
		}
		var K = r(25)
		const Q = Float32Array.from([-1, 0.4957, 0, -0.0813, 1, 0.4957, 1, -0.0813, 0, -0.6582, -1, -0.0813]),
			tt = Float32Array.from([-0.3676, 0.4804, -0, 0.2683, 0.3676, 0.4804, 0.3676, 0.2683, -0, 0.0562, -0.3676, 0.2683])
		class et extends K.a {
			constructor(t = {}) {
				;(t.type = 'Desidus'), super(t), (this.created = !1), t.data.imported || this.buildShape()
			}
			buildShape() {
				var t
				if (!this.created && !this.shape) {
					const e = null === (t = h.a.sceneChildProps.sideLength) || void 0 === t ? void 0 : t.default,
						r = h.b.create('Group', { name: this.name + '_Group' }, this.scene),
						i = h.b.create('ShapeBuffer', { name: this.name + '_top', shape: Q }, this.scene),
						n = h.b.create('ShapeBuffer', { name: this.name + '_bottom', shape: tt }, this.scene)
					;(i.data.props.sideLength = e),
						(n.data.props.sideLength = e),
						this.setShape(r),
						r.add(i),
						r.add(n),
						(this.created = !0)
				}
			}
			setProp(t, e) {
				super.setProp(t, e), this.buildShape()
			}
		}
		var rt = et,
			it = function (t, e, r, i) {
				return new (r || (r = Promise))(function (n, s) {
					function o(t) {
						try {
							l(i.next(t))
						} catch (t) {
							s(t)
						}
					}
					function a(t) {
						try {
							l(i.throw(t))
						} catch (t) {
							s(t)
						}
					}
					function l(t) {
						var e
						t.done
							? n(t.value)
							: ((e = t.value),
							  e instanceof r
									? e
									: new r(function (t) {
											t(e)
									  })).then(o, a)
					}
					l((i = i.apply(t, e || [])).next())
				})
			}
		class nt extends o.a {
			constructor() {
				super(),
					(this.scene = new s.a()),
					(this.scene.mainColor = n.a.color('primary').toString('hex')),
					(this.scene.background = n.a.color('dark').toString('hex')),
					(this.drawer = new p(this.scene))
				const t = X.a.getInitialProjectState().sequence
				this.drawer.getTimeline().setSequence(t.start, t.end, t.framerate),
					(this.renderer = new a.a()),
					(this.commandHistory = new D()),
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
					h.b.register('Desidus', rt)
			}
			sendEvent(t, e) {
				this.dispatch('event', { event: t, data: e ? JSON.stringify(e) : void 0 })
			}
			getScene() {
				return this.scene
			}
			setScene(t) {
				this.scene && t.resize(this.scene.width, this.scene.height),
					(this.scene = t),
					this.drawer.setScene(this.scene),
					this.drawer.redraw()
			}
			getDrawer() {
				return this.drawer
			}
			setDrawer(t) {
				t.canvas && this.drawer.setCanvas(t.canvas),
					(t.size || t.ratio || t.resolution) && q(this.scene, this.drawer, t.size, t.ratio, t.resolution),
					this.sendEvent('drawer:update', {})
			}
			getRenderer() {
				return this.renderer
			}
			getCommandHistory() {
				return this.commandHistory
			}
			read(t) {
				return it(this, void 0, void 0, function* () {
					try {
						let e, r
						switch (t.type) {
							case 'set-drawer':
								yield this.setDrawer(t.args)
								break
							case 'run': {
								const r = t.args
								e = yield this.commandHistory.execute(this, t.command, r.args, r.preventPushToHistory)
								break
							}
							case 'ask': {
								const i = yield (function (t, e) {
									return V(this, void 0, void 0, function* () {
										if (t.command in J) {
											const r = J[t.command],
												i = Array.isArray(r) ? r : [r]
											let n
											if (i.length > 1) {
												n = {}
												for (let e = 1; e < i.length; e++) {
													const r = i[e]
													if ('string' == typeof r) n[r] = !0
													else {
														const e = r(t.args)
														Object.keys(e).forEach(t => (n[t] = e[t]))
													}
												}
											}
											return { data: yield i[0](t, e), execution_effects: n }
										}
										console.warn(`Executor Ask '${t.command}' command not recognized`)
									})
								})(t, this)
								;(r = null == i ? void 0 : i.data), (e = null == i ? void 0 : i.execution_effects)
								break
							}
							case 'undo':
								e = yield this.commandHistory.undo(this)
								break
							case 'redo':
								e = yield this.commandHistory.redo(this)
								break
							case 'history':
								e = yield this.commandHistory.goTo(this, t.args)
						}
						if (e) {
							const r = { type: 'execution-effect', deferred_id: t.deferred_id, effect: 'no-effect' }
							return (
								e.scene_update && this.drawer.redraw(),
								e.scene_layers_update &&
									((r.effect = 'scene:update-layers'),
									(r.data = JSON.stringify({
										layers: M.a.export(this.scene, this.drawer),
										selecteds: e.select_layer ? e.select_layer : void 0,
									}))),
								e.scene_child_prop_update &&
									((r.effect = 'scene:update-scene_child-prop'), (r.data = JSON.stringify(e.scene_child_prop_update))),
								e.scene_child_ui_prop_update &&
									((r.effect = 'scene:update-scene_child-ui-prop'),
									(r.data = JSON.stringify(e.scene_child_ui_prop_update))),
								r
							)
						}
						return { deferred_id: t.deferred_id, type: 'response', command: t.command, data: r }
					} catch (e) {
						return { deferred_id: t.deferred_id, type: 'response-unresolved', command: t.command, data: e }
					}
				})
			}
		}
		e.a = nt
	},
	385: function (t, e, r) {
		'use strict'
		var i = r(383),
			n = r(122),
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
						i = this.quality,
						n = this.chunks,
						s = new Promise((s, o) => {
							a.render(t, r, i)
								.then(t => {
									;(n[e] = t), s(e)
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
				const i = performance.now()
				return a.render(t, e, r).then(() => performance.now() - i)
			}
			static getBlob(t, e, r) {
				return new Promise((i, n) => {
					if (t instanceof OffscreenCanvas) return t.convertToBlob({ type: e, quality: r }).then(i).catch(n)
					t instanceof HTMLCanvasElement && t.toBlob(t => (t ? i(t) : n()), e, r), n()
				})
			}
			static render(t, e, r) {
				return new Promise((i, n) => {
					a.getBlob(t, e, r)
						.then(t => {
							const e = new FileReader()
							e.addEventListener(
								'load',
								() => {
									e.result && e.result instanceof ArrayBuffer ? i(new Uint8Array(e.result)) : n()
								},
								{ passive: !0 }
							),
								e.readAsArrayBuffer(t)
						})
						.catch(() => n())
				})
			}
		}
		var l = a,
			h = function (t, e, r, i) {
				return new (r || (r = Promise))(function (n, s) {
					function o(t) {
						try {
							l(i.next(t))
						} catch (t) {
							s(t)
						}
					}
					function a(t) {
						try {
							l(i.throw(t))
						} catch (t) {
							s(t)
						}
					}
					function l(t) {
						var e
						t.done
							? n(t.value)
							: ((e = t.value),
							  e instanceof r
									? e
									: new r(function (t) {
											t(e)
									  })).then(o, a)
					}
					l((i = i.apply(t, e || [])).next())
				})
			}
		class u extends o.a {
			constructor() {
				super(), (this.capturer = new l())
			}
			renderImage(t, e) {
				;(this.started = !0), this.capturer.setSettings(e), this.capturer.stop(), this.capturer.start(1)
				const r = new Promise((r, i) => {
					const n = t.getOption('clearCanvas', !0),
						s = t.getTimeline(),
						o = s.getSequence()
					if (n) t.draw()
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
							.catch(i)
				})
				return (this.renderPromise = Object(s.a)(r)), r
			}
			prepareRenderAnimation(t, e) {
				return h(this, void 0, void 0, function* () {
					const r = performance.now()
					t.setOption('time', 0), t.draw()
					const i = performance.now() - r,
						n = t.getTimeline().getSequence(),
						s = ((yield l.getRenderTime(t.getCanvas(), e.type, e.quality)) + i) * n.frames,
						o = 1 + Math.floor(s / 1e3 / 60),
						a = Math.floor(n.frames / o)
					return { estimated_time: s, total_frames: n.frames, total_parts: o, forPart: a }
				})
			}
			stop() {
				;(this.started = !1), this.renderPromise && this.renderPromise.cancel(), this.capturer.stop()
			}
			renderAnimation(t, e) {
				this.stop(), (this.started = !0)
				const r = t.getTimeline().getSequence(),
					i = new Promise((i, n) => {
						this.prepareRenderAnimation(t, e).then(s =>
							h(this, void 0, void 0, function* () {
								this.dispatch('renderer:start', s)
								const o = []
								for (let i = 0; i < s.total_parts; i++)
									if (this.started)
										try {
											const a = yield this.renderAnimationPart(
												t,
												e,
												i * s.forPart,
												s.forPart,
												i,
												r.frames,
												s.total_parts
											)
											a ? o.push(a) : n()
										} catch (t) {
											n(t)
										}
									else n()
								i(o), (this.started = !1)
							})
						)
					})
				return (this.renderPromise = Object(s.a)(i)), i
			}
			renderAnimationPart(t, e, r, s, o, a, l) {
				return h(this, void 0, void 0, function* () {
					this.capturer.setSettings(e), this.capturer.stop(), this.capturer.start(s)
					const h = t.getTimeline(),
						u = h.getSequence(),
						c = h.getTickTime()
					let d = 0
					for (let e = 0; e < s; e++) {
						if (!this.started) return
						const i = e + r,
							p = Object(n.a)()
						h.setTime((u.start + i * c) % u.end), t.draw(), yield this.capturer.capture(t.getCanvas(), e)
						;(d = Object(n.a)() - p),
							this.dispatch('renderer:render-frame', {
								frame: i,
								part: o,
								forPart: s,
								total_frames: a,
								total_parts: l,
								render_time: d,
							})
					}
					const p = yield this.capturer.save()
					if (this.started) {
						const t = new i()
						for (let e = 0, i = p.length; e < i; e++) {
							const i = (e + r).toString()
							let n = ''
							for (let t = i.length; t <= 4; t++) n += '0'
							;(n += i), t.file(n + this.capturer.extension, p[e])
						}
						const e = yield t.generateAsync({ type: 'blob' })
						if (!this.started) return
						return this.capturer.stop(), e
					}
				})
			}
		}
		e.a = u
	},
	392: function (t, e, r) {
		;(function (t) {
			var i = (void 0 !== t && t) || ('undefined' != typeof self && self) || window,
				n = Function.prototype.apply
			function s(t, e) {
				;(this._id = t), (this._clearFn = e)
			}
			;(e.setTimeout = function () {
				return new s(n.call(setTimeout, i, arguments), clearTimeout)
			}),
				(e.setInterval = function () {
					return new s(n.call(setInterval, i, arguments), clearInterval)
				}),
				(e.clearTimeout = e.clearInterval = function (t) {
					t && t.close()
				}),
				(s.prototype.unref = s.prototype.ref = function () {}),
				(s.prototype.close = function () {
					this._clearFn.call(i, this._id)
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
					var i,
						n,
						s,
						o,
						a,
						l = 1,
						h = {},
						u = !1,
						c = t.document,
						d = Object.getPrototypeOf && Object.getPrototypeOf(t)
					;(d = d && d.setTimeout ? d : t),
						'[object process]' === {}.toString.call(t.process)
							? (i = function (t) {
									e.nextTick(function () {
										f(t)
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
										f(t.data)
								  }),
								  (i = function (t) {
										s.port2.postMessage(t)
								  }))
								: c && 'onreadystatechange' in c.createElement('script')
								? ((n = c.documentElement),
								  (i = function (t) {
										var e = c.createElement('script')
										;(e.onreadystatechange = function () {
											f(t), (e.onreadystatechange = null), n.removeChild(e), (e = null)
										}),
											n.appendChild(e)
								  }))
								: (i = function (t) {
										setTimeout(f, 0, t)
								  })
							: ((o = 'setImmediate$' + Math.random() + '$'),
							  (a = function (e) {
									e.source === t && 'string' == typeof e.data && 0 === e.data.indexOf(o) && f(+e.data.slice(o.length))
							  }),
							  t.addEventListener ? t.addEventListener('message', a, !1) : t.attachEvent('onmessage', a),
							  (i = function (e) {
									t.postMessage(o + e, '*')
							  })),
						(d.setImmediate = function (t) {
							'function' != typeof t && (t = new Function('' + t))
							for (var e = new Array(arguments.length - 1), r = 0; r < e.length; r++) e[r] = arguments[r + 1]
							var n = { callback: t, args: e }
							return (h[l] = n), i(l), l++
						}),
						(d.clearImmediate = p)
				}
				function p(t) {
					delete h[t]
				}
				function f(t) {
					if (u) setTimeout(f, 0, t)
					else {
						var e = h[t]
						if (e) {
							u = !0
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
								p(t), (u = !1)
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
			var i = r(395),
				n = r(396),
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
					if ('string' == typeof e) throw new Error('If encoding is specified then the first argument must be a string')
					return c(this, t)
				}
				return h(this, t, e, r)
			}
			function h(t, e, r, i) {
				if ('number' == typeof e) throw new TypeError('"value" argument must not be a number')
				return 'undefined' != typeof ArrayBuffer && e instanceof ArrayBuffer
					? (function (t, e, r, i) {
							if ((e.byteLength, r < 0 || e.byteLength < r)) throw new RangeError("'offset' is out of bounds")
							if (e.byteLength < r + (i || 0)) throw new RangeError("'length' is out of bounds")
							e =
								void 0 === r && void 0 === i
									? new Uint8Array(e)
									: void 0 === i
									? new Uint8Array(e, r)
									: new Uint8Array(e, r, i)
							l.TYPED_ARRAY_SUPPORT ? ((t = e).__proto__ = l.prototype) : (t = d(t, e))
							return t
					  })(t, e, r, i)
					: 'string' == typeof e
					? (function (t, e, r) {
							;('string' == typeof r && '' !== r) || (r = 'utf8')
							if (!l.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding')
							var i = 0 | f(e, r),
								n = (t = a(t, i)).write(e, r)
							n !== i && (t = t.slice(0, n))
							return t
					  })(t, e, r)
					: (function (t, e) {
							if (l.isBuffer(e)) {
								var r = 0 | p(e.length)
								return 0 === (t = a(t, r)).length || e.copy(t, 0, 0, r), t
							}
							if (e) {
								if (('undefined' != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer) || 'length' in e)
									return 'number' != typeof e.length || (i = e.length) != i ? a(t, 0) : d(t, e)
								if ('Buffer' === e.type && s(e.data)) return d(t, e.data)
							}
							var i
							throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
					  })(t, e)
			}
			function u(t) {
				if ('number' != typeof t) throw new TypeError('"size" argument must be a number')
				if (t < 0) throw new RangeError('"size" argument must not be negative')
			}
			function c(t, e) {
				if ((u(e), (t = a(t, e < 0 ? 0 : 0 | p(e))), !l.TYPED_ARRAY_SUPPORT)) for (var r = 0; r < e; ++r) t[r] = 0
				return t
			}
			function d(t, e) {
				var r = e.length < 0 ? 0 : 0 | p(e.length)
				t = a(t, r)
				for (var i = 0; i < r; i += 1) t[i] = 255 & e[i]
				return t
			}
			function p(t) {
				if (t >= o())
					throw new RangeError('Attempt to allocate Buffer larger than maximum size: 0x' + o().toString(16) + ' bytes')
				return 0 | t
			}
			function f(t, e) {
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
				for (var i = !1; ; )
					switch (e) {
						case 'ascii':
						case 'latin1':
						case 'binary':
							return r
						case 'utf8':
						case 'utf-8':
						case void 0:
							return X(t).length
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
							if (i) return X(t).length
							;(e = ('' + e).toLowerCase()), (i = !0)
					}
			}
			function m(t, e, r) {
				var i = !1
				if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return ''
				if (((void 0 === r || r > this.length) && (r = this.length), r <= 0)) return ''
				if ((r >>>= 0) <= (e >>>= 0)) return ''
				for (t || (t = 'utf8'); ; )
					switch (t) {
						case 'hex':
							return A(this, e, r)
						case 'utf8':
						case 'utf-8':
							return E(this, e, r)
						case 'ascii':
							return I(this, e, r)
						case 'latin1':
						case 'binary':
							return T(this, e, r)
						case 'base64':
							return S(this, e, r)
						case 'ucs2':
						case 'ucs-2':
						case 'utf16le':
						case 'utf-16le':
							return O(this, e, r)
						default:
							if (i) throw new TypeError('Unknown encoding: ' + t)
							;(t = (t + '').toLowerCase()), (i = !0)
					}
			}
			function g(t, e, r) {
				var i = t[e]
				;(t[e] = t[r]), (t[r] = i)
			}
			function y(t, e, r, i, n) {
				if (0 === t.length) return -1
				if (
					('string' == typeof r
						? ((i = r), (r = 0))
						: r > 2147483647
						? (r = 2147483647)
						: r < -2147483648 && (r = -2147483648),
					(r = +r),
					isNaN(r) && (r = n ? 0 : t.length - 1),
					r < 0 && (r = t.length + r),
					r >= t.length)
				) {
					if (n) return -1
					r = t.length - 1
				} else if (r < 0) {
					if (!n) return -1
					r = 0
				}
				if (('string' == typeof e && (e = l.from(e, i)), l.isBuffer(e))) return 0 === e.length ? -1 : _(t, e, r, i, n)
				if ('number' == typeof e)
					return (
						(e &= 255),
						l.TYPED_ARRAY_SUPPORT && 'function' == typeof Uint8Array.prototype.indexOf
							? n
								? Uint8Array.prototype.indexOf.call(t, e, r)
								: Uint8Array.prototype.lastIndexOf.call(t, e, r)
							: _(t, [e], r, i, n)
					)
				throw new TypeError('val must be string, number or Buffer')
			}
			function _(t, e, r, i, n) {
				var s,
					o = 1,
					a = t.length,
					l = e.length
				if (
					void 0 !== i &&
					('ucs2' === (i = String(i).toLowerCase()) || 'ucs-2' === i || 'utf16le' === i || 'utf-16le' === i)
				) {
					if (t.length < 2 || e.length < 2) return -1
					;(o = 2), (a /= 2), (l /= 2), (r /= 2)
				}
				function h(t, e) {
					return 1 === o ? t[e] : t.readUInt16BE(e * o)
				}
				if (n) {
					var u = -1
					for (s = r; s < a; s++)
						if (h(t, s) === h(e, -1 === u ? 0 : s - u)) {
							if ((-1 === u && (u = s), s - u + 1 === l)) return u * o
						} else -1 !== u && (s -= s - u), (u = -1)
				} else
					for (r + l > a && (r = a - l), s = r; s >= 0; s--) {
						for (var c = !0, d = 0; d < l; d++)
							if (h(t, s + d) !== h(e, d)) {
								c = !1
								break
							}
						if (c) return s
					}
				return -1
			}
			function v(t, e, r, i) {
				r = Number(r) || 0
				var n = t.length - r
				i ? (i = Number(i)) > n && (i = n) : (i = n)
				var s = e.length
				if (s % 2 != 0) throw new TypeError('Invalid hex string')
				i > s / 2 && (i = s / 2)
				for (var o = 0; o < i; ++o) {
					var a = parseInt(e.substr(2 * o, 2), 16)
					if (isNaN(a)) return o
					t[r + o] = a
				}
				return o
			}
			function P(t, e, r, i) {
				return U(X(e, t.length - r), t, r, i)
			}
			function b(t, e, r, i) {
				return U(
					(function (t) {
						for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r))
						return e
					})(e),
					t,
					r,
					i
				)
			}
			function x(t, e, r, i) {
				return b(t, e, r, i)
			}
			function w(t, e, r, i) {
				return U(z(e), t, r, i)
			}
			function C(t, e, r, i) {
				return U(
					(function (t, e) {
						for (var r, i, n, s = [], o = 0; o < t.length && !((e -= 2) < 0); ++o)
							(r = t.charCodeAt(o)), (i = r >> 8), (n = r % 256), s.push(n), s.push(i)
						return s
					})(e, t.length - r),
					t,
					r,
					i
				)
			}
			function S(t, e, r) {
				return 0 === e && r === t.length ? i.fromByteArray(t) : i.fromByteArray(t.slice(e, r))
			}
			function E(t, e, r) {
				r = Math.min(t.length, r)
				for (var i = [], n = e; n < r; ) {
					var s,
						o,
						a,
						l,
						h = t[n],
						u = null,
						c = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1
					if (n + c <= r)
						switch (c) {
							case 1:
								h < 128 && (u = h)
								break
							case 2:
								128 == (192 & (s = t[n + 1])) && (l = ((31 & h) << 6) | (63 & s)) > 127 && (u = l)
								break
							case 3:
								;(s = t[n + 1]),
									(o = t[n + 2]),
									128 == (192 & s) &&
										128 == (192 & o) &&
										(l = ((15 & h) << 12) | ((63 & s) << 6) | (63 & o)) > 2047 &&
										(l < 55296 || l > 57343) &&
										(u = l)
								break
							case 4:
								;(s = t[n + 1]),
									(o = t[n + 2]),
									(a = t[n + 3]),
									128 == (192 & s) &&
										128 == (192 & o) &&
										128 == (192 & a) &&
										(l = ((15 & h) << 18) | ((63 & s) << 12) | ((63 & o) << 6) | (63 & a)) > 65535 &&
										l < 1114112 &&
										(u = l)
						}
					null === u
						? ((u = 65533), (c = 1))
						: u > 65535 && ((u -= 65536), i.push(((u >>> 10) & 1023) | 55296), (u = 56320 | (1023 & u))),
						i.push(u),
						(n += c)
				}
				return (function (t) {
					var e = t.length
					if (e <= 4096) return String.fromCharCode.apply(String, t)
					var r = '',
						i = 0
					for (; i < e; ) r += String.fromCharCode.apply(String, t.slice(i, (i += 4096)))
					return r
				})(i)
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
					return h(null, t, e, r)
				}),
				l.TYPED_ARRAY_SUPPORT &&
					((l.prototype.__proto__ = Uint8Array.prototype),
					(l.__proto__ = Uint8Array),
					'undefined' != typeof Symbol &&
						Symbol.species &&
						l[Symbol.species] === l &&
						Object.defineProperty(l, Symbol.species, { value: null, configurable: !0 })),
				(l.alloc = function (t, e, r) {
					return (function (t, e, r, i) {
						return (
							u(e),
							e <= 0 ? a(t, e) : void 0 !== r ? ('string' == typeof i ? a(t, e).fill(r, i) : a(t, e).fill(r)) : a(t, e)
						)
					})(null, t, e, r)
				}),
				(l.allocUnsafe = function (t) {
					return c(null, t)
				}),
				(l.allocUnsafeSlow = function (t) {
					return c(null, t)
				}),
				(l.isBuffer = function (t) {
					return !(null == t || !t._isBuffer)
				}),
				(l.compare = function (t, e) {
					if (!l.isBuffer(t) || !l.isBuffer(e)) throw new TypeError('Arguments must be Buffers')
					if (t === e) return 0
					for (var r = t.length, i = e.length, n = 0, s = Math.min(r, i); n < s; ++n)
						if (t[n] !== e[n]) {
							;(r = t[n]), (i = e[n])
							break
						}
					return r < i ? -1 : i < r ? 1 : 0
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
					var i = l.allocUnsafe(e),
						n = 0
					for (r = 0; r < t.length; ++r) {
						var o = t[r]
						if (!l.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers')
						o.copy(i, n), (n += o.length)
					}
					return i
				}),
				(l.byteLength = f),
				(l.prototype._isBuffer = !0),
				(l.prototype.swap16 = function () {
					var t = this.length
					if (t % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits')
					for (var e = 0; e < t; e += 2) g(this, e, e + 1)
					return this
				}),
				(l.prototype.swap32 = function () {
					var t = this.length
					if (t % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits')
					for (var e = 0; e < t; e += 4) g(this, e, e + 3), g(this, e + 1, e + 2)
					return this
				}),
				(l.prototype.swap64 = function () {
					var t = this.length
					if (t % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits')
					for (var e = 0; e < t; e += 8)
						g(this, e, e + 7), g(this, e + 1, e + 6), g(this, e + 2, e + 5), g(this, e + 3, e + 4)
					return this
				}),
				(l.prototype.toString = function () {
					var t = 0 | this.length
					return 0 === t ? '' : 0 === arguments.length ? E(this, 0, t) : m.apply(this, arguments)
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
				(l.prototype.compare = function (t, e, r, i, n) {
					if (!l.isBuffer(t)) throw new TypeError('Argument must be a Buffer')
					if (
						(void 0 === e && (e = 0),
						void 0 === r && (r = t ? t.length : 0),
						void 0 === i && (i = 0),
						void 0 === n && (n = this.length),
						e < 0 || r > t.length || i < 0 || n > this.length)
					)
						throw new RangeError('out of range index')
					if (i >= n && e >= r) return 0
					if (i >= n) return -1
					if (e >= r) return 1
					if (this === t) return 0
					for (
						var s = (n >>>= 0) - (i >>>= 0),
							o = (r >>>= 0) - (e >>>= 0),
							a = Math.min(s, o),
							h = this.slice(i, n),
							u = t.slice(e, r),
							c = 0;
						c < a;
						++c
					)
						if (h[c] !== u[c]) {
							;(s = h[c]), (o = u[c])
							break
						}
					return s < o ? -1 : o < s ? 1 : 0
				}),
				(l.prototype.includes = function (t, e, r) {
					return -1 !== this.indexOf(t, e, r)
				}),
				(l.prototype.indexOf = function (t, e, r) {
					return y(this, t, e, r, !0)
				}),
				(l.prototype.lastIndexOf = function (t, e, r) {
					return y(this, t, e, r, !1)
				}),
				(l.prototype.write = function (t, e, r, i) {
					if (void 0 === e) (i = 'utf8'), (r = this.length), (e = 0)
					else if (void 0 === r && 'string' == typeof e) (i = e), (r = this.length), (e = 0)
					else {
						if (!isFinite(e)) throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported')
						;(e |= 0), isFinite(r) ? ((r |= 0), void 0 === i && (i = 'utf8')) : ((i = r), (r = void 0))
					}
					var n = this.length - e
					if (((void 0 === r || r > n) && (r = n), (t.length > 0 && (r < 0 || e < 0)) || e > this.length))
						throw new RangeError('Attempt to write outside buffer bounds')
					i || (i = 'utf8')
					for (var s = !1; ; )
						switch (i) {
							case 'hex':
								return v(this, t, e, r)
							case 'utf8':
							case 'utf-8':
								return P(this, t, e, r)
							case 'ascii':
								return b(this, t, e, r)
							case 'latin1':
							case 'binary':
								return x(this, t, e, r)
							case 'base64':
								return w(this, t, e, r)
							case 'ucs2':
							case 'ucs-2':
							case 'utf16le':
							case 'utf-16le':
								return C(this, t, e, r)
							default:
								if (s) throw new TypeError('Unknown encoding: ' + i)
								;(i = ('' + i).toLowerCase()), (s = !0)
						}
				}),
				(l.prototype.toJSON = function () {
					return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) }
				})
			function I(t, e, r) {
				var i = ''
				r = Math.min(t.length, r)
				for (var n = e; n < r; ++n) i += String.fromCharCode(127 & t[n])
				return i
			}
			function T(t, e, r) {
				var i = ''
				r = Math.min(t.length, r)
				for (var n = e; n < r; ++n) i += String.fromCharCode(t[n])
				return i
			}
			function A(t, e, r) {
				var i = t.length
				;(!e || e < 0) && (e = 0), (!r || r < 0 || r > i) && (r = i)
				for (var n = '', s = e; s < r; ++s) n += Y(t[s])
				return n
			}
			function O(t, e, r) {
				for (var i = t.slice(e, r), n = '', s = 0; s < i.length; s += 2) n += String.fromCharCode(i[s] + 256 * i[s + 1])
				return n
			}
			function L(t, e, r) {
				if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint')
				if (t + e > r) throw new RangeError('Trying to access beyond buffer length')
			}
			function k(t, e, r, i, n, s) {
				if (!l.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance')
				if (e > n || e < s) throw new RangeError('"value" argument is out of bounds')
				if (r + i > t.length) throw new RangeError('Index out of range')
			}
			function N(t, e, r, i) {
				e < 0 && (e = 65535 + e + 1)
				for (var n = 0, s = Math.min(t.length - r, 2); n < s; ++n)
					t[r + n] = (e & (255 << (8 * (i ? n : 1 - n)))) >>> (8 * (i ? n : 1 - n))
			}
			function R(t, e, r, i) {
				e < 0 && (e = 4294967295 + e + 1)
				for (var n = 0, s = Math.min(t.length - r, 4); n < s; ++n) t[r + n] = (e >>> (8 * (i ? n : 3 - n))) & 255
			}
			function B(t, e, r, i, n, s) {
				if (r + i > t.length) throw new RangeError('Index out of range')
				if (r < 0) throw new RangeError('Index out of range')
			}
			function D(t, e, r, i, s) {
				return s || B(t, 0, r, 4), n.write(t, e, r, i, 23, 4), r + 4
			}
			function M(t, e, r, i, s) {
				return s || B(t, 0, r, 8), n.write(t, e, r, i, 52, 8), r + 8
			}
			;(l.prototype.slice = function (t, e) {
				var r,
					i = this.length
				if (
					((t = ~~t) < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i),
					(e = void 0 === e ? i : ~~e) < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i),
					e < t && (e = t),
					l.TYPED_ARRAY_SUPPORT)
				)
					(r = this.subarray(t, e)).__proto__ = l.prototype
				else {
					var n = e - t
					r = new l(n, void 0)
					for (var s = 0; s < n; ++s) r[s] = this[s + t]
				}
				return r
			}),
				(l.prototype.readUIntLE = function (t, e, r) {
					;(t |= 0), (e |= 0), r || L(t, e, this.length)
					for (var i = this[t], n = 1, s = 0; ++s < e && (n *= 256); ) i += this[t + s] * n
					return i
				}),
				(l.prototype.readUIntBE = function (t, e, r) {
					;(t |= 0), (e |= 0), r || L(t, e, this.length)
					for (var i = this[t + --e], n = 1; e > 0 && (n *= 256); ) i += this[t + --e] * n
					return i
				}),
				(l.prototype.readUInt8 = function (t, e) {
					return e || L(t, 1, this.length), this[t]
				}),
				(l.prototype.readUInt16LE = function (t, e) {
					return e || L(t, 2, this.length), this[t] | (this[t + 1] << 8)
				}),
				(l.prototype.readUInt16BE = function (t, e) {
					return e || L(t, 2, this.length), (this[t] << 8) | this[t + 1]
				}),
				(l.prototype.readUInt32LE = function (t, e) {
					return (
						e || L(t, 4, this.length), (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3]
					)
				}),
				(l.prototype.readUInt32BE = function (t, e) {
					return (
						e || L(t, 4, this.length), 16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
					)
				}),
				(l.prototype.readIntLE = function (t, e, r) {
					;(t |= 0), (e |= 0), r || L(t, e, this.length)
					for (var i = this[t], n = 1, s = 0; ++s < e && (n *= 256); ) i += this[t + s] * n
					return i >= (n *= 128) && (i -= Math.pow(2, 8 * e)), i
				}),
				(l.prototype.readIntBE = function (t, e, r) {
					;(t |= 0), (e |= 0), r || L(t, e, this.length)
					for (var i = e, n = 1, s = this[t + --i]; i > 0 && (n *= 256); ) s += this[t + --i] * n
					return s >= (n *= 128) && (s -= Math.pow(2, 8 * e)), s
				}),
				(l.prototype.readInt8 = function (t, e) {
					return e || L(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
				}),
				(l.prototype.readInt16LE = function (t, e) {
					e || L(t, 2, this.length)
					var r = this[t] | (this[t + 1] << 8)
					return 32768 & r ? 4294901760 | r : r
				}),
				(l.prototype.readInt16BE = function (t, e) {
					e || L(t, 2, this.length)
					var r = this[t + 1] | (this[t] << 8)
					return 32768 & r ? 4294901760 | r : r
				}),
				(l.prototype.readInt32LE = function (t, e) {
					return e || L(t, 4, this.length), this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
				}),
				(l.prototype.readInt32BE = function (t, e) {
					return e || L(t, 4, this.length), (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
				}),
				(l.prototype.readFloatLE = function (t, e) {
					return e || L(t, 4, this.length), n.read(this, t, !0, 23, 4)
				}),
				(l.prototype.readFloatBE = function (t, e) {
					return e || L(t, 4, this.length), n.read(this, t, !1, 23, 4)
				}),
				(l.prototype.readDoubleLE = function (t, e) {
					return e || L(t, 8, this.length), n.read(this, t, !0, 52, 8)
				}),
				(l.prototype.readDoubleBE = function (t, e) {
					return e || L(t, 8, this.length), n.read(this, t, !1, 52, 8)
				}),
				(l.prototype.writeUIntLE = function (t, e, r, i) {
					;((t = +t), (e |= 0), (r |= 0), i) || k(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
					var n = 1,
						s = 0
					for (this[e] = 255 & t; ++s < r && (n *= 256); ) this[e + s] = (t / n) & 255
					return e + r
				}),
				(l.prototype.writeUIntBE = function (t, e, r, i) {
					;((t = +t), (e |= 0), (r |= 0), i) || k(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
					var n = r - 1,
						s = 1
					for (this[e + n] = 255 & t; --n >= 0 && (s *= 256); ) this[e + n] = (t / s) & 255
					return e + r
				}),
				(l.prototype.writeUInt8 = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || k(this, t, e, 1, 255, 0),
						l.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
						(this[e] = 255 & t),
						e + 1
					)
				}),
				(l.prototype.writeUInt16LE = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || k(this, t, e, 2, 65535, 0),
						l.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8)) : N(this, t, e, !0),
						e + 2
					)
				}),
				(l.prototype.writeUInt16BE = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || k(this, t, e, 2, 65535, 0),
						l.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t)) : N(this, t, e, !1),
						e + 2
					)
				}),
				(l.prototype.writeUInt32LE = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || k(this, t, e, 4, 4294967295, 0),
						l.TYPED_ARRAY_SUPPORT
							? ((this[e + 3] = t >>> 24), (this[e + 2] = t >>> 16), (this[e + 1] = t >>> 8), (this[e] = 255 & t))
							: R(this, t, e, !0),
						e + 4
					)
				}),
				(l.prototype.writeUInt32BE = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || k(this, t, e, 4, 4294967295, 0),
						l.TYPED_ARRAY_SUPPORT
							? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = 255 & t))
							: R(this, t, e, !1),
						e + 4
					)
				}),
				(l.prototype.writeIntLE = function (t, e, r, i) {
					if (((t = +t), (e |= 0), !i)) {
						var n = Math.pow(2, 8 * r - 1)
						k(this, t, e, r, n - 1, -n)
					}
					var s = 0,
						o = 1,
						a = 0
					for (this[e] = 255 & t; ++s < r && (o *= 256); )
						t < 0 && 0 === a && 0 !== this[e + s - 1] && (a = 1), (this[e + s] = (((t / o) >> 0) - a) & 255)
					return e + r
				}),
				(l.prototype.writeIntBE = function (t, e, r, i) {
					if (((t = +t), (e |= 0), !i)) {
						var n = Math.pow(2, 8 * r - 1)
						k(this, t, e, r, n - 1, -n)
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
						r || k(this, t, e, 1, 127, -128),
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
						r || k(this, t, e, 2, 32767, -32768),
						l.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8)) : N(this, t, e, !0),
						e + 2
					)
				}),
				(l.prototype.writeInt16BE = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || k(this, t, e, 2, 32767, -32768),
						l.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t)) : N(this, t, e, !1),
						e + 2
					)
				}),
				(l.prototype.writeInt32LE = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || k(this, t, e, 4, 2147483647, -2147483648),
						l.TYPED_ARRAY_SUPPORT
							? ((this[e] = 255 & t), (this[e + 1] = t >>> 8), (this[e + 2] = t >>> 16), (this[e + 3] = t >>> 24))
							: R(this, t, e, !0),
						e + 4
					)
				}),
				(l.prototype.writeInt32BE = function (t, e, r) {
					return (
						(t = +t),
						(e |= 0),
						r || k(this, t, e, 4, 2147483647, -2147483648),
						t < 0 && (t = 4294967295 + t + 1),
						l.TYPED_ARRAY_SUPPORT
							? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = 255 & t))
							: R(this, t, e, !1),
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
					return M(this, t, e, !0, r)
				}),
				(l.prototype.writeDoubleBE = function (t, e, r) {
					return M(this, t, e, !1, r)
				}),
				(l.prototype.copy = function (t, e, r, i) {
					if (
						(r || (r = 0),
						i || 0 === i || (i = this.length),
						e >= t.length && (e = t.length),
						e || (e = 0),
						i > 0 && i < r && (i = r),
						i === r)
					)
						return 0
					if (0 === t.length || 0 === this.length) return 0
					if (e < 0) throw new RangeError('targetStart out of bounds')
					if (r < 0 || r >= this.length) throw new RangeError('sourceStart out of bounds')
					if (i < 0) throw new RangeError('sourceEnd out of bounds')
					i > this.length && (i = this.length), t.length - e < i - r && (i = t.length - e + r)
					var n,
						s = i - r
					if (this === t && r < e && e < i) for (n = s - 1; n >= 0; --n) t[n + e] = this[n + r]
					else if (s < 1e3 || !l.TYPED_ARRAY_SUPPORT) for (n = 0; n < s; ++n) t[n + e] = this[n + r]
					else Uint8Array.prototype.set.call(t, this.subarray(r, r + s), e)
					return s
				}),
				(l.prototype.fill = function (t, e, r, i) {
					if ('string' == typeof t) {
						if (
							('string' == typeof e
								? ((i = e), (e = 0), (r = this.length))
								: 'string' == typeof r && ((i = r), (r = this.length)),
							1 === t.length)
						) {
							var n = t.charCodeAt(0)
							n < 256 && (t = n)
						}
						if (void 0 !== i && 'string' != typeof i) throw new TypeError('encoding must be a string')
						if ('string' == typeof i && !l.isEncoding(i)) throw new TypeError('Unknown encoding: ' + i)
					} else 'number' == typeof t && (t &= 255)
					if (e < 0 || this.length < e || this.length < r) throw new RangeError('Out of range index')
					if (r <= e) return this
					var s
					if (((e >>>= 0), (r = void 0 === r ? this.length : r >>> 0), t || (t = 0), 'number' == typeof t))
						for (s = e; s < r; ++s) this[s] = t
					else {
						var o = l.isBuffer(t) ? t : X(new l(t, i).toString()),
							a = o.length
						for (s = 0; s < r - e; ++s) this[s + e] = o[s % a]
					}
					return this
				})
			var F = /[^+\/0-9A-Za-z-_]/g
			function Y(t) {
				return t < 16 ? '0' + t.toString(16) : t.toString(16)
			}
			function X(t, e) {
				var r
				e = e || 1 / 0
				for (var i = t.length, n = null, s = [], o = 0; o < i; ++o) {
					if ((r = t.charCodeAt(o)) > 55295 && r < 57344) {
						if (!n) {
							if (r > 56319) {
								;(e -= 3) > -1 && s.push(239, 191, 189)
								continue
							}
							if (o + 1 === i) {
								;(e -= 3) > -1 && s.push(239, 191, 189)
								continue
							}
							n = r
							continue
						}
						if (r < 56320) {
							;(e -= 3) > -1 && s.push(239, 191, 189), (n = r)
							continue
						}
						r = 65536 + (((n - 55296) << 10) | (r - 56320))
					} else n && (e -= 3) > -1 && s.push(239, 191, 189)
					if (((n = null), r < 128)) {
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
				return i.toByteArray(
					(function (t) {
						if (
							(t = (function (t) {
								return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '')
							})(t).replace(F, '')).length < 2
						)
							return ''
						for (; t.length % 4 != 0; ) t += '='
						return t
					})(t)
				)
			}
			function U(t, e, r, i) {
				for (var n = 0; n < i && !(n + r >= e.length || n >= t.length); ++n) e[n + r] = t[n]
				return n
			}
		}.call(this, r(119)))
	},
	395: function (t, e, r) {
		'use strict'
		;(e.byteLength = function (t) {
			var e = h(t),
				r = e[0],
				i = e[1]
			return (3 * (r + i)) / 4 - i
		}),
			(e.toByteArray = function (t) {
				var e,
					r,
					i = h(t),
					o = i[0],
					a = i[1],
					l = new s(
						(function (t, e, r) {
							return (3 * (e + r)) / 4 - r
						})(0, o, a)
					),
					u = 0,
					c = a > 0 ? o - 4 : o
				for (r = 0; r < c; r += 4)
					(e =
						(n[t.charCodeAt(r)] << 18) |
						(n[t.charCodeAt(r + 1)] << 12) |
						(n[t.charCodeAt(r + 2)] << 6) |
						n[t.charCodeAt(r + 3)]),
						(l[u++] = (e >> 16) & 255),
						(l[u++] = (e >> 8) & 255),
						(l[u++] = 255 & e)
				2 === a && ((e = (n[t.charCodeAt(r)] << 2) | (n[t.charCodeAt(r + 1)] >> 4)), (l[u++] = 255 & e))
				1 === a &&
					((e = (n[t.charCodeAt(r)] << 10) | (n[t.charCodeAt(r + 1)] << 4) | (n[t.charCodeAt(r + 2)] >> 2)),
					(l[u++] = (e >> 8) & 255),
					(l[u++] = 255 & e))
				return l
			}),
			(e.fromByteArray = function (t) {
				for (var e, r = t.length, n = r % 3, s = [], o = 0, a = r - n; o < a; o += 16383)
					s.push(u(t, o, o + 16383 > a ? a : o + 16383))
				1 === n
					? ((e = t[r - 1]), s.push(i[e >> 2] + i[(e << 4) & 63] + '=='))
					: 2 === n &&
					  ((e = (t[r - 2] << 8) + t[r - 1]), s.push(i[e >> 10] + i[(e >> 4) & 63] + i[(e << 2) & 63] + '='))
				return s.join('')
			})
		for (
			var i = [],
				n = [],
				s = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
				o = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
				a = 0,
				l = o.length;
			a < l;
			++a
		)
			(i[a] = o[a]), (n[o.charCodeAt(a)] = a)
		function h(t) {
			var e = t.length
			if (e % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4')
			var r = t.indexOf('=')
			return -1 === r && (r = e), [r, r === e ? 0 : 4 - (r % 4)]
		}
		function u(t, e, r) {
			for (var n, s, o = [], a = e; a < r; a += 3)
				(n = ((t[a] << 16) & 16711680) + ((t[a + 1] << 8) & 65280) + (255 & t[a + 2])),
					o.push(i[((s = n) >> 18) & 63] + i[(s >> 12) & 63] + i[(s >> 6) & 63] + i[63 & s])
			return o.join('')
		}
		;(n['-'.charCodeAt(0)] = 62), (n['_'.charCodeAt(0)] = 63)
	},
	396: function (t, e) {
		;(e.read = function (t, e, r, i, n) {
			var s,
				o,
				a = 8 * n - i - 1,
				l = (1 << a) - 1,
				h = l >> 1,
				u = -7,
				c = r ? n - 1 : 0,
				d = r ? -1 : 1,
				p = t[e + c]
			for (c += d, s = p & ((1 << -u) - 1), p >>= -u, u += a; u > 0; s = 256 * s + t[e + c], c += d, u -= 8);
			for (o = s & ((1 << -u) - 1), s >>= -u, u += i; u > 0; o = 256 * o + t[e + c], c += d, u -= 8);
			if (0 === s) s = 1 - h
			else {
				if (s === l) return o ? NaN : (1 / 0) * (p ? -1 : 1)
				;(o += Math.pow(2, i)), (s -= h)
			}
			return (p ? -1 : 1) * o * Math.pow(2, s - i)
		}),
			(e.write = function (t, e, r, i, n, s) {
				var o,
					a,
					l,
					h = 8 * s - n - 1,
					u = (1 << h) - 1,
					c = u >> 1,
					d = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
					p = i ? 0 : s - 1,
					f = i ? 1 : -1,
					m = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0
				for (
					e = Math.abs(e),
						isNaN(e) || e === 1 / 0
							? ((a = isNaN(e) ? 1 : 0), (o = u))
							: ((o = Math.floor(Math.log(e) / Math.LN2)),
							  e * (l = Math.pow(2, -o)) < 1 && (o--, (l *= 2)),
							  (e += o + c >= 1 ? d / l : d * Math.pow(2, 1 - c)) * l >= 2 && (o++, (l /= 2)),
							  o + c >= u
									? ((a = 0), (o = u))
									: o + c >= 1
									? ((a = (e * l - 1) * Math.pow(2, n)), (o += c))
									: ((a = e * Math.pow(2, c - 1) * Math.pow(2, n)), (o = 0)));
					n >= 8;
					t[r + p] = 255 & a, p += f, a /= 256, n -= 8
				);
				for (o = (o << n) | a, h += n; h > 0; t[r + p] = 255 & o, p += f, o /= 256, h -= 8);
				t[r + p - f] |= 128 * m
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
				i = !1
			if (
				(t.exports
					? ((t.exports = r), (i = !0))
					: 'undefined' != typeof document
					? (window.ClipperLib = r)
					: (self.ClipperLib = r),
				i)
			) {
				n = 'chrome'
				e = 'Netscape'
			} else {
				var n = navigator.userAgent.toString().toLowerCase()
				e = navigator.appName
			}
			var s,
				o = {}
			;-1 != n.indexOf('chrome') && -1 == n.indexOf('chromium') ? (o.chrome = 1) : (o.chrome = 0),
				-1 != n.indexOf('chromium') ? (o.chromium = 1) : (o.chromium = 0),
				-1 != n.indexOf('safari') && -1 == n.indexOf('chrome') && -1 == n.indexOf('chromium')
					? (o.safari = 1)
					: (o.safari = 0),
				-1 != n.indexOf('firefox') ? (o.firefox = 1) : (o.firefox = 0),
				-1 != n.indexOf('firefox/17') ? (o.firefox17 = 1) : (o.firefox17 = 0),
				-1 != n.indexOf('firefox/15') ? (o.firefox15 = 1) : (o.firefox15 = 0),
				-1 != n.indexOf('firefox/3') ? (o.firefox3 = 1) : (o.firefox3 = 0),
				-1 != n.indexOf('opera') ? (o.opera = 1) : (o.opera = 0),
				-1 != n.indexOf('msie 10') ? (o.msie10 = 1) : (o.msie10 = 0),
				-1 != n.indexOf('msie 9') ? (o.msie9 = 1) : (o.msie9 = 0),
				-1 != n.indexOf('msie 8') ? (o.msie8 = 1) : (o.msie8 = 0),
				-1 != n.indexOf('msie 7') ? (o.msie7 = 1) : (o.msie7 = 0),
				-1 != n.indexOf('msie ') ? (o.msie = 1) : (o.msie = 0),
				(r.biginteger_used = null)
			function a(t, e, i) {
				;(r.biginteger_used = 1),
					null != t &&
						('number' == typeof t && void 0 === e
							? this.fromInt(t)
							: 'number' == typeof t
							? this.fromNumber(t, e, i)
							: null == e && 'string' != typeof t
							? this.fromString(t, 256)
							: this.fromString(t, e))
			}
			function l() {
				return new a(null, void 0, void 0)
			}
			'Microsoft Internet Explorer' == e
				? ((a.prototype.am = function (t, e, r, i, n, s) {
						for (var o = 32767 & e, a = e >> 15; --s >= 0; ) {
							var l = 32767 & this[t],
								h = this[t++] >> 15,
								u = a * l + h * o
							;(n =
								((l = o * l + ((32767 & u) << 15) + r[i] + (1073741823 & n)) >>> 30) + (u >>> 15) + a * h + (n >>> 30)),
								(r[i++] = 1073741823 & l)
						}
						return n
				  }),
				  (s = 30))
				: 'Netscape' != e
				? ((a.prototype.am = function (t, e, r, i, n, s) {
						for (; --s >= 0; ) {
							var o = e * this[t++] + r[i] + n
							;(n = Math.floor(o / 67108864)), (r[i++] = 67108863 & o)
						}
						return n
				  }),
				  (s = 26))
				: ((a.prototype.am = function (t, e, r, i, n, s) {
						for (var o = 16383 & e, a = e >> 14; --s >= 0; ) {
							var l = 16383 & this[t],
								h = this[t++] >> 14,
								u = a * l + h * o
							;(n = ((l = o * l + ((16383 & u) << 14) + r[i] + n) >> 28) + (u >> 14) + a * h), (r[i++] = 268435455 & l)
						}
						return n
				  }),
				  (s = 28)),
				(a.prototype.DB = s),
				(a.prototype.DM = (1 << s) - 1),
				(a.prototype.DV = 1 << s)
			;(a.prototype.FV = Math.pow(2, 52)), (a.prototype.F1 = 52 - s), (a.prototype.F2 = 2 * s - 52)
			var h,
				u,
				c = new Array()
			for (h = '0'.charCodeAt(0), u = 0; u <= 9; ++u) c[h++] = u
			for (h = 'a'.charCodeAt(0), u = 10; u < 36; ++u) c[h++] = u
			for (h = 'A'.charCodeAt(0), u = 10; u < 36; ++u) c[h++] = u
			function d(t) {
				return '0123456789abcdefghijklmnopqrstuvwxyz'.charAt(t)
			}
			function p(t, e) {
				var r = c[t.charCodeAt(e)]
				return null == r ? -1 : r
			}
			function f(t) {
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
			function g(t) {
				this.m = t
			}
			function y(t) {
				;(this.m = t),
					(this.mp = t.invDigit()),
					(this.mpl = 32767 & this.mp),
					(this.mph = this.mp >> 15),
					(this.um = (1 << (t.DB - 15)) - 1),
					(this.mt2 = 2 * t.t)
			}
			function _(t, e) {
				return t & e
			}
			function v(t, e) {
				return t | e
			}
			function P(t, e) {
				return t ^ e
			}
			function b(t, e) {
				return t & ~e
			}
			function x(t) {
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
			function w(t) {
				for (var e = 0; 0 != t; ) (t &= t - 1), ++e
				return e
			}
			function C() {}
			function S(t) {
				return t
			}
			function E(t) {
				;(this.r2 = l()),
					(this.q3 = l()),
					a.ONE.dlShiftTo(2 * t.t, this.r2),
					(this.mu = this.r2.divide(t)),
					(this.m = t)
			}
			;(g.prototype.convert = function (t) {
				return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
			}),
				(g.prototype.revert = function (t) {
					return t
				}),
				(g.prototype.reduce = function (t) {
					t.divRemTo(this.m, null, t)
				}),
				(g.prototype.mulTo = function (t, e, r) {
					t.multiplyTo(e, r), this.reduce(r)
				}),
				(g.prototype.sqrTo = function (t, e) {
					t.squareTo(e), this.reduce(e)
				}),
				(y.prototype.convert = function (t) {
					var e = l()
					return (
						t.abs().dlShiftTo(this.m.t, e),
						e.divRemTo(this.m, null, e),
						t.s < 0 && e.compareTo(a.ZERO) > 0 && this.m.subTo(e, e),
						e
					)
				}),
				(y.prototype.revert = function (t) {
					var e = l()
					return t.copyTo(e), this.reduce(e), e
				}),
				(y.prototype.reduce = function (t) {
					for (; t.t <= this.mt2; ) t[t.t++] = 0
					for (var e = 0; e < this.m.t; ++e) {
						var r = 32767 & t[e],
							i = (r * this.mpl + (((r * this.mph + (t[e] >> 15) * this.mpl) & this.um) << 15)) & t.DM
						for (t[(r = e + this.m.t)] += this.m.am(0, i, t, e, 0, this.m.t); t[r] >= t.DV; ) (t[r] -= t.DV), t[++r]++
					}
					t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
				}),
				(y.prototype.mulTo = function (t, e, r) {
					t.multiplyTo(e, r), this.reduce(r)
				}),
				(y.prototype.sqrTo = function (t, e) {
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
					for (var i = t.length, n = !1, s = 0; --i >= 0; ) {
						var o = 8 == r ? 255 & t[i] : p(t, i)
						o < 0
							? '-' == t.charAt(i) && (n = !0)
							: ((n = !1),
							  0 == s
									? (this[this.t++] = o)
									: s + r > this.DB
									? ((this[this.t - 1] |= (o & ((1 << (this.DB - s)) - 1)) << s), (this[this.t++] = o >> (this.DB - s)))
									: (this[this.t - 1] |= o << s),
							  (s += r) >= this.DB && (s -= this.DB))
					}
					8 == r &&
						0 != (128 & t[0]) &&
						((this.s = -1), s > 0 && (this[this.t - 1] |= ((1 << (this.DB - s)) - 1) << s)),
						this.clamp(),
						n && a.ZERO.subTo(this, this)
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
						i = t % this.DB,
						n = this.DB - i,
						s = (1 << n) - 1,
						o = Math.floor(t / this.DB),
						a = (this.s << i) & this.DM
					for (r = this.t - 1; r >= 0; --r) (e[r + o + 1] = (this[r] >> n) | a), (a = (this[r] & s) << i)
					for (r = o - 1; r >= 0; --r) e[r] = 0
					;(e[o] = a), (e.t = this.t + o + 1), (e.s = this.s), e.clamp()
				}),
				(a.prototype.rShiftTo = function (t, e) {
					e.s = this.s
					var r = Math.floor(t / this.DB)
					if (r >= this.t) e.t = 0
					else {
						var i = t % this.DB,
							n = this.DB - i,
							s = (1 << i) - 1
						e[0] = this[r] >> i
						for (var o = r + 1; o < this.t; ++o) (e[o - r - 1] |= (this[o] & s) << n), (e[o - r] = this[o] >> i)
						i > 0 && (e[this.t - r - 1] |= (this.s & s) << n), (e.t = this.t - r), e.clamp()
					}
				}),
				(a.prototype.subTo = function (t, e) {
					for (var r = 0, i = 0, n = Math.min(t.t, this.t); r < n; )
						(i += this[r] - t[r]), (e[r++] = i & this.DM), (i >>= this.DB)
					if (t.t < this.t) {
						for (i -= t.s; r < this.t; ) (i += this[r]), (e[r++] = i & this.DM), (i >>= this.DB)
						i += this.s
					} else {
						for (i += this.s; r < t.t; ) (i -= t[r]), (e[r++] = i & this.DM), (i >>= this.DB)
						i -= t.s
					}
					;(e.s = i < 0 ? -1 : 0), i < -1 ? (e[r++] = this.DV + i) : i > 0 && (e[r++] = i), (e.t = r), e.clamp()
				}),
				(a.prototype.multiplyTo = function (t, e) {
					var r = this.abs(),
						i = t.abs(),
						n = r.t
					for (e.t = n + i.t; --n >= 0; ) e[n] = 0
					for (n = 0; n < i.t; ++n) e[n + r.t] = r.am(0, i[n], e, n, 0, r.t)
					;(e.s = 0), e.clamp(), this.s != t.s && a.ZERO.subTo(e, e)
				}),
				(a.prototype.squareTo = function (t) {
					for (var e = this.abs(), r = (t.t = 2 * e.t); --r >= 0; ) t[r] = 0
					for (r = 0; r < e.t - 1; ++r) {
						var i = e.am(r, e[r], t, 2 * r, 0, 1)
						;(t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, i, e.t - r - 1)) >= e.DV &&
							((t[r + e.t] -= e.DV), (t[r + e.t + 1] = 1))
					}
					t.t > 0 && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)), (t.s = 0), t.clamp()
				}),
				(a.prototype.divRemTo = function (t, e, r) {
					var i = t.abs()
					if (!(i.t <= 0)) {
						var n = this.abs()
						if (n.t < i.t) return null != e && e.fromInt(0), void (null != r && this.copyTo(r))
						null == r && (r = l())
						var s = l(),
							o = this.s,
							h = t.s,
							u = this.DB - m(i[i.t - 1])
						u > 0 ? (i.lShiftTo(u, s), n.lShiftTo(u, r)) : (i.copyTo(s), n.copyTo(r))
						var c = s.t,
							d = s[c - 1]
						if (0 != d) {
							var p = d * (1 << this.F1) + (c > 1 ? s[c - 2] >> this.F2 : 0),
								f = this.FV / p,
								g = (1 << this.F1) / p,
								y = 1 << this.F2,
								_ = r.t,
								v = _ - c,
								P = null == e ? l() : e
							for (
								s.dlShiftTo(v, P),
									r.compareTo(P) >= 0 && ((r[r.t++] = 1), r.subTo(P, r)),
									a.ONE.dlShiftTo(c, P),
									P.subTo(s, s);
								s.t < c;

							)
								s[s.t++] = 0
							for (; --v >= 0; ) {
								var b = r[--_] == d ? this.DM : Math.floor(r[_] * f + (r[_ - 1] + y) * g)
								if ((r[_] += s.am(0, b, r, v, 0, c)) < b)
									for (s.dlShiftTo(v, P), r.subTo(P, r); r[_] < --b; ) r.subTo(P, r)
							}
							null != e && (r.drShiftTo(c, e), o != h && a.ZERO.subTo(e, e)),
								(r.t = c),
								r.clamp(),
								u > 0 && r.rShiftTo(u, r),
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
						i = l(),
						n = e.convert(this),
						s = m(t) - 1
					for (n.copyTo(r); --s >= 0; )
						if ((e.sqrTo(r, i), (t & (1 << s)) > 0)) e.mulTo(i, n, r)
						else {
							var o = r
							;(r = i), (i = o)
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
						i = (1 << e) - 1,
						n = !1,
						s = '',
						o = this.t,
						a = this.DB - ((o * this.DB) % e)
					if (o-- > 0)
						for (a < this.DB && (r = this[o] >> a) > 0 && ((n = !0), (s = d(r))); o >= 0; )
							a < e
								? ((r = (this[o] & ((1 << a) - 1)) << (e - a)), (r |= this[--o] >> (a += this.DB - e)))
								: ((r = (this[o] >> (a -= e)) & i), a <= 0 && ((a += this.DB), --o)),
								r > 0 && (n = !0),
								n && (s += d(r))
					return n ? s : '0'
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
					return (r = t < 256 || e.isEven() ? new g(e) : new y(e)), this.exp(t, r)
				}),
				(a.ZERO = f(0)),
				(a.ONE = f(1)),
				(C.prototype.convert = S),
				(C.prototype.revert = S),
				(C.prototype.mulTo = function (t, e, r) {
					t.multiplyTo(e, r)
				}),
				(C.prototype.sqrTo = function (t, e) {
					t.squareTo(e)
				}),
				(E.prototype.convert = function (t) {
					if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m)
					if (t.compareTo(this.m) < 0) return t
					var e = l()
					return t.copyTo(e), this.reduce(e), e
				}),
				(E.prototype.revert = function (t) {
					return t
				}),
				(E.prototype.reduce = function (t) {
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
				(E.prototype.mulTo = function (t, e, r) {
					t.multiplyTo(e, r), this.reduce(r)
				}),
				(E.prototype.sqrTo = function (t, e) {
					t.squareTo(e), this.reduce(e)
				})
			var I = [
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
				T = (1 << 26) / I[I.length - 1]
			;(a.prototype.chunkSize = function (t) {
				return Math.floor((Math.LN2 * this.DB) / Math.log(t))
			}),
				(a.prototype.toRadix = function (t) {
					if ((null == t && (t = 10), 0 == this.signum() || t < 2 || t > 36)) return '0'
					var e = this.chunkSize(t),
						r = Math.pow(t, e),
						i = f(r),
						n = l(),
						s = l(),
						o = ''
					for (this.divRemTo(i, n, s); n.signum() > 0; )
						(o = (r + s.intValue()).toString(t).substr(1) + o), n.divRemTo(i, n, s)
					return s.intValue().toString(t) + o
				}),
				(a.prototype.fromRadix = function (t, e) {
					this.fromInt(0), null == e && (e = 10)
					for (var r = this.chunkSize(e), i = Math.pow(e, r), n = !1, s = 0, o = 0, l = 0; l < t.length; ++l) {
						var h = p(t, l)
						h < 0
							? '-' == t.charAt(l) && 0 == this.signum() && (n = !0)
							: ((o = e * o + h), ++s >= r && (this.dMultiply(i), this.dAddOffset(o, 0), (s = 0), (o = 0)))
					}
					s > 0 && (this.dMultiply(Math.pow(e, s)), this.dAddOffset(o, 0)), n && a.ZERO.subTo(this, this)
				}),
				(a.prototype.fromNumber = function (t, e, r) {
					if ('number' == typeof e)
						if (t < 2) this.fromInt(1)
						else
							for (
								this.fromNumber(t, r),
									this.testBit(t - 1) || this.bitwiseTo(a.ONE.shiftLeft(t - 1), v, this),
									this.isEven() && this.dAddOffset(1, 0);
								!this.isProbablePrime(e);

							)
								this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(a.ONE.shiftLeft(t - 1), this)
					else {
						var i = new Array(),
							n = 7 & t
						;(i.length = 1 + (t >> 3)),
							e.nextBytes(i),
							n > 0 ? (i[0] &= (1 << n) - 1) : (i[0] = 0),
							this.fromString(i, 256)
					}
				}),
				(a.prototype.bitwiseTo = function (t, e, r) {
					var i,
						n,
						s = Math.min(t.t, this.t)
					for (i = 0; i < s; ++i) r[i] = e(this[i], t[i])
					if (t.t < this.t) {
						for (n = t.s & this.DM, i = s; i < this.t; ++i) r[i] = e(this[i], n)
						r.t = this.t
					} else {
						for (n = this.s & this.DM, i = s; i < t.t; ++i) r[i] = e(n, t[i])
						r.t = t.t
					}
					;(r.s = e(this.s, t.s)), r.clamp()
				}),
				(a.prototype.changeBit = function (t, e) {
					var r = a.ONE.shiftLeft(t)
					return this.bitwiseTo(r, e, r), r
				}),
				(a.prototype.addTo = function (t, e) {
					for (var r = 0, i = 0, n = Math.min(t.t, this.t); r < n; )
						(i += this[r] + t[r]), (e[r++] = i & this.DM), (i >>= this.DB)
					if (t.t < this.t) {
						for (i += t.s; r < this.t; ) (i += this[r]), (e[r++] = i & this.DM), (i >>= this.DB)
						i += this.s
					} else {
						for (i += this.s; r < t.t; ) (i += t[r]), (e[r++] = i & this.DM), (i >>= this.DB)
						i += t.s
					}
					;(e.s = i < 0 ? -1 : 0), i > 0 ? (e[r++] = i) : i < -1 && (e[r++] = this.DV + i), (e.t = r), e.clamp()
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
					var i,
						n = Math.min(this.t + t.t, e)
					for (r.s = 0, r.t = n; n > 0; ) r[--n] = 0
					for (i = r.t - this.t; n < i; ++n) r[n + this.t] = this.am(0, t[n], r, n, 0, this.t)
					for (i = Math.min(t.t, e); n < i; ++n) this.am(0, t[n], r, n, 0, e - n)
					r.clamp()
				}),
				(a.prototype.multiplyUpperTo = function (t, e, r) {
					--e
					var i = (r.t = this.t + t.t - e)
					for (r.s = 0; --i >= 0; ) r[i] = 0
					for (i = Math.max(e - this.t, 0); i < t.t; ++i)
						r[this.t + i - e] = this.am(e - i, t[i], r, 0, 0, this.t + i - e)
					r.clamp(), r.drShiftTo(1, r)
				}),
				(a.prototype.modInt = function (t) {
					if (t <= 0) return 0
					var e = this.DV % t,
						r = this.s < 0 ? t - 1 : 0
					if (this.t > 0)
						if (0 == e) r = this[0] % t
						else for (var i = this.t - 1; i >= 0; --i) r = (e * r + this[i]) % t
					return r
				}),
				(a.prototype.millerRabin = function (t) {
					var e = this.subtract(a.ONE),
						r = e.getLowestSetBit()
					if (r <= 0) return !1
					var i = e.shiftRight(r)
					;(t = (t + 1) >> 1) > I.length && (t = I.length)
					for (var n = l(), s = 0; s < t; ++s) {
						n.fromInt(I[Math.floor(Math.random() * I.length)])
						var o = n.modPow(i, this)
						if (0 != o.compareTo(a.ONE) && 0 != o.compareTo(e)) {
							for (var h = 1; h++ < r && 0 != o.compareTo(e); )
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
						i = this.DB - ((t * this.DB) % 8),
						n = 0
					if (t-- > 0)
						for (
							i < this.DB && (r = this[t] >> i) != (this.s & this.DM) >> i && (e[n++] = r | (this.s << (this.DB - i)));
							t >= 0;

						)
							i < 8
								? ((r = (this[t] & ((1 << i) - 1)) << (8 - i)), (r |= this[--t] >> (i += this.DB - 8)))
								: ((r = (this[t] >> (i -= 8)) & 255), i <= 0 && ((i += this.DB), --t)),
								0 != (128 & r) && (r |= -256),
								0 == n && (128 & this.s) != (128 & r) && ++n,
								(n > 0 || r != this.s) && (e[n++] = r)
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
					return this.bitwiseTo(t, _, e), e
				}),
				(a.prototype.or = function (t) {
					var e = l()
					return this.bitwiseTo(t, v, e), e
				}),
				(a.prototype.xor = function (t) {
					var e = l()
					return this.bitwiseTo(t, P, e), e
				}),
				(a.prototype.andNot = function (t) {
					var e = l()
					return this.bitwiseTo(t, b, e), e
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
					for (var t = 0; t < this.t; ++t) if (0 != this[t]) return t * this.DB + x(this[t])
					return this.s < 0 ? this.t * this.DB : -1
				}),
				(a.prototype.bitCount = function () {
					for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r) t += w(this[r] ^ e)
					return t
				}),
				(a.prototype.testBit = function (t) {
					var e = Math.floor(t / this.DB)
					return e >= this.t ? 0 != this.s : 0 != (this[e] & (1 << t % this.DB))
				}),
				(a.prototype.setBit = function (t) {
					return this.changeBit(t, v)
				}),
				(a.prototype.clearBit = function (t) {
					return this.changeBit(t, b)
				}),
				(a.prototype.flipBit = function (t) {
					return this.changeBit(t, P)
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
						i,
						n = t.bitLength(),
						s = f(1)
					if (n <= 0) return s
					;(r = n < 18 ? 1 : n < 48 ? 3 : n < 144 ? 4 : n < 768 ? 5 : 6),
						(i = n < 8 ? new g(e) : e.isEven() ? new E(e) : new y(e))
					var o = new Array(),
						a = 3,
						h = r - 1,
						u = (1 << r) - 1
					if (((o[1] = i.convert(this)), r > 1)) {
						var c = l()
						for (i.sqrTo(o[1], c); a <= u; ) (o[a] = l()), i.mulTo(c, o[a - 2], o[a]), (a += 2)
					}
					var d,
						p,
						_ = t.t - 1,
						v = !0,
						P = l()
					for (n = m(t[_]) - 1; _ >= 0; ) {
						for (
							n >= h
								? (d = (t[_] >> (n - h)) & u)
								: ((d = (t[_] & ((1 << (n + 1)) - 1)) << (h - n)), _ > 0 && (d |= t[_ - 1] >> (this.DB + n - h))),
								a = r;
							0 == (1 & d);

						)
							(d >>= 1), --a
						if (((n -= a) < 0 && ((n += this.DB), --_), v)) o[d].copyTo(s), (v = !1)
						else {
							for (; a > 1; ) i.sqrTo(s, P), i.sqrTo(P, s), (a -= 2)
							a > 0 ? i.sqrTo(s, P) : ((p = s), (s = P), (P = p)), i.mulTo(P, o[d], s)
						}
						for (; _ >= 0 && 0 == (t[_] & (1 << n)); )
							i.sqrTo(s, P), (p = s), (s = P), (P = p), --n < 0 && ((n = this.DB - 1), --_)
					}
					return i.revert(s)
				}),
				(a.prototype.modInverse = function (t) {
					var e = t.isEven()
					if ((this.isEven() && e) || 0 == t.signum()) return a.ZERO
					for (var r = t.clone(), i = this.clone(), n = f(1), s = f(0), o = f(0), l = f(1); 0 != r.signum(); ) {
						for (; r.isEven(); )
							r.rShiftTo(1, r),
								e
									? ((n.isEven() && s.isEven()) || (n.addTo(this, n), s.subTo(t, s)), n.rShiftTo(1, n))
									: s.isEven() || s.subTo(t, s),
								s.rShiftTo(1, s)
						for (; i.isEven(); )
							i.rShiftTo(1, i),
								e
									? ((o.isEven() && l.isEven()) || (o.addTo(this, o), l.subTo(t, l)), o.rShiftTo(1, o))
									: l.isEven() || l.subTo(t, l),
								l.rShiftTo(1, l)
						r.compareTo(i) >= 0
							? (r.subTo(i, r), e && n.subTo(o, n), s.subTo(l, s))
							: (i.subTo(r, i), e && o.subTo(n, o), l.subTo(s, l))
					}
					return 0 != i.compareTo(a.ONE)
						? a.ZERO
						: l.compareTo(t) >= 0
						? l.subtract(t)
						: l.signum() < 0
						? (l.addTo(t, l), l.signum() < 0 ? l.add(t) : l)
						: l
				}),
				(a.prototype.pow = function (t) {
					return this.exp(t, new C())
				}),
				(a.prototype.gcd = function (t) {
					var e = this.s < 0 ? this.negate() : this.clone(),
						r = t.s < 0 ? t.negate() : t.clone()
					if (e.compareTo(r) < 0) {
						var i = e
						;(e = r), (r = i)
					}
					var n = e.getLowestSetBit(),
						s = r.getLowestSetBit()
					if (s < 0) return e
					for (n < s && (s = n), s > 0 && (e.rShiftTo(s, e), r.rShiftTo(s, r)); e.signum() > 0; )
						(n = e.getLowestSetBit()) > 0 && e.rShiftTo(n, e),
							(n = r.getLowestSetBit()) > 0 && r.rShiftTo(n, r),
							e.compareTo(r) >= 0 ? (e.subTo(r, e), e.rShiftTo(1, e)) : (r.subTo(e, r), r.rShiftTo(1, r))
					return s > 0 && r.lShiftTo(s, r), r
				}),
				(a.prototype.isProbablePrime = function (t) {
					var e,
						r = this.abs()
					if (1 == r.t && r[0] <= I[I.length - 1]) {
						for (e = 0; e < I.length; ++e) if (r[0] == I[e]) return !0
						return !1
					}
					if (r.isEven()) return !1
					for (e = 1; e < I.length; ) {
						for (var i = I[e], n = e + 1; n < I.length && i < T; ) i *= I[n++]
						for (i = r.modInt(i); e < n; ) if (i % I[e++] == 0) return !1
					}
					return r.millerRabin(t)
				}),
				(a.prototype.square = function () {
					var t = l()
					return this.squareTo(t), t
				})
			var A = a
			;(A.prototype.IsNegative = function () {
				return -1 == this.compareTo(A.ZERO)
			}),
				(A.op_Equality = function (t, e) {
					return 0 == t.compareTo(e)
				}),
				(A.op_Inequality = function (t, e) {
					return 0 != t.compareTo(e)
				}),
				(A.op_GreaterThan = function (t, e) {
					return t.compareTo(e) > 0
				}),
				(A.op_LessThan = function (t, e) {
					return t.compareTo(e) < 0
				}),
				(A.op_Addition = function (t, e) {
					return new A(t, void 0, void 0).add(new A(e, void 0, void 0))
				}),
				(A.op_Subtraction = function (t, e) {
					return new A(t, void 0, void 0).subtract(new A(e, void 0, void 0))
				}),
				(A.Int128Mul = function (t, e) {
					return new A(t, void 0, void 0).multiply(new A(e, void 0, void 0))
				}),
				(A.op_Division = function (t, e) {
					return t.divide(e)
				}),
				(A.prototype.ToDouble = function () {
					return parseFloat(this.toString())
				})
			var O = function (t, e) {
				var r
				if (void 0 === Object.getOwnPropertyNames) {
					for (r in e.prototype)
						(void 0 !== t.prototype[r] && t.prototype[r] !== Object.prototype[r]) || (t.prototype[r] = e.prototype[r])
					for (r in e) void 0 === t[r] && (t[r] = e[r])
					t.$baseCtor = e
				} else {
					for (var i = Object.getOwnPropertyNames(e.prototype), n = 0; n < i.length; n++)
						void 0 === Object.getOwnPropertyDescriptor(t.prototype, i[n]) &&
							Object.defineProperty(t.prototype, i[n], Object.getOwnPropertyDescriptor(e.prototype, i[n]))
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
				O(r.PolyTree, r.PolyNode),
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
								var i = t[0]
								;(this.X = r.Clipper.Round(i.X)), (this.Y = r.Clipper.Round(i.Y)), (this.Z = 0)
							} else {
								void 0 === (n = t[0]).Z && (n.Z = 0), (this.X = n.X), (this.Y = n.Y), (this.Z = n.Z)
							}
						else (this.X = 0), (this.Y = 0), (this.Z = 0)
					else if (2 === e) (this.X = t[0]), (this.Y = t[1])
					else if (1 === e)
						if (t[0] instanceof r.DoublePoint) {
							i = t[0]
							;(this.X = r.Clipper.Round(i.X)), (this.Y = r.Clipper.Round(i.Y))
						} else {
							var n = t[0]
							;(this.X = n.X), (this.Y = n.Y)
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
				(r.IntPoint2 = function (t, e, i) {
					;(this.X = t), (this.Y = e), r.use_xyz && (this.Z = void 0 === i ? 0 : i)
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
				(r.IntRect4 = function (t, e, r, i) {
					;(this.left = t), (this.top = e), (this.right = r), (this.bottom = i)
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
					var i = e
					do {
						if (r.IntPoint.op_Equality(i.Pt, t)) return !0
						i = i.Next
					} while (i !== e)
					return !1
				}),
				(r.ClipperBase.prototype.PointOnLineSegment = function (t, e, r, i) {
					return i
						? (t.X === e.X && t.Y === e.Y) ||
								(t.X === r.X && t.Y === r.Y) ||
								(t.X > e.X == t.X < r.X &&
									t.Y > e.Y == t.Y < r.Y &&
									A.op_Equality(A.Int128Mul(t.X - e.X, r.Y - e.Y), A.Int128Mul(r.X - e.X, t.Y - e.Y)))
						: (t.X === e.X && t.Y === e.Y) ||
								(t.X === r.X && t.Y === r.Y) ||
								(t.X > e.X == t.X < r.X &&
									t.Y > e.Y == t.Y < r.Y &&
									(t.X - e.X) * (r.Y - e.Y) == (r.X - e.X) * (t.Y - e.Y))
				}),
				(r.ClipperBase.prototype.PointOnPolygon = function (t, e, r) {
					for (var i = e; ; ) {
						if (this.PointOnLineSegment(t, i.Pt, i.Next.Pt, r)) return !0
						if ((i = i.Next) === e) break
					}
					return !1
				}),
				(r.ClipperBase.prototype.SlopesEqual = r.ClipperBase.SlopesEqual = function () {
					var t,
						e,
						i,
						n,
						s,
						o,
						a = arguments,
						l = a.length
					return 3 === l
						? ((t = a[0]),
						  (e = a[1]),
						  a[2]
								? A.op_Equality(A.Int128Mul(t.Delta.Y, e.Delta.X), A.Int128Mul(t.Delta.X, e.Delta.Y))
								: r.Cast_Int64(t.Delta.Y * e.Delta.X) === r.Cast_Int64(t.Delta.X * e.Delta.Y))
						: 4 === l
						? ((i = a[0]),
						  (n = a[1]),
						  (s = a[2]),
						  a[3]
								? A.op_Equality(A.Int128Mul(i.Y - n.Y, n.X - s.X), A.Int128Mul(i.X - n.X, n.Y - s.Y))
								: r.Cast_Int64((i.Y - n.Y) * (n.X - s.X)) - r.Cast_Int64((i.X - n.X) * (n.Y - s.Y)) == 0)
						: ((i = a[0]),
						  (n = a[1]),
						  (s = a[2]),
						  (o = a[3]),
						  a[4]
								? A.op_Equality(A.Int128Mul(i.Y - n.Y, s.X - o.X), A.Int128Mul(i.X - n.X, s.Y - o.Y))
								: r.Cast_Int64((i.Y - n.Y) * (s.X - o.X)) - r.Cast_Int64((i.X - n.X) * (s.Y - o.Y)) == 0)
				}),
				(r.ClipperBase.SlopesEqual3 = function (t, e, i) {
					return i
						? A.op_Equality(A.Int128Mul(t.Delta.Y, e.Delta.X), A.Int128Mul(t.Delta.X, e.Delta.Y))
						: r.Cast_Int64(t.Delta.Y * e.Delta.X) === r.Cast_Int64(t.Delta.X * e.Delta.Y)
				}),
				(r.ClipperBase.SlopesEqual4 = function (t, e, i, n) {
					return n
						? A.op_Equality(A.Int128Mul(t.Y - e.Y, e.X - i.X), A.Int128Mul(t.X - e.X, e.Y - i.Y))
						: r.Cast_Int64((t.Y - e.Y) * (e.X - i.X)) - r.Cast_Int64((t.X - e.X) * (e.Y - i.Y)) == 0
				}),
				(r.ClipperBase.SlopesEqual5 = function (t, e, i, n, s) {
					return s
						? A.op_Equality(A.Int128Mul(t.Y - e.Y, i.X - n.X), A.Int128Mul(t.X - e.X, i.Y - n.Y))
						: r.Cast_Int64((t.Y - e.Y) * (i.X - n.X)) - r.Cast_Int64((t.X - e.X) * (i.Y - n.Y)) == 0
				}),
				(r.ClipperBase.prototype.Clear = function () {
					this.DisposeLocalMinimaList()
					for (var t = 0, e = this.m_edges.length; t < e; ++t) {
						for (var i = 0, n = this.m_edges[t].length; i < n; ++i) this.m_edges[t][i] = null
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
				(r.ClipperBase.prototype.InitEdge = function (t, e, i, n) {
					;(t.Next = e),
						(t.Prev = i),
						(t.Curr.X = n.X),
						(t.Curr.Y = n.Y),
						r.use_xyz && (t.Curr.Z = n.Z),
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
					var i,
						n,
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
							((i = e ? t.Prev : t.Next).Dx === r.ClipperBase.horizontal
								? i.Bot.X !== t.Bot.X && i.Top.X !== t.Bot.X && this.ReverseHorizontal(t)
								: i.Bot.X !== t.Bot.X && this.ReverseHorizontal(t)),
						(i = t),
						e)
					) {
						for (; s.Top.Y === s.Next.Bot.Y && s.Next.OutIdx !== r.ClipperBase.Skip; ) s = s.Next
						if (s.Dx === r.ClipperBase.horizontal && s.Next.OutIdx !== r.ClipperBase.Skip) {
							for (n = s; n.Prev.Dx === r.ClipperBase.horizontal; ) n = n.Prev
							n.Prev.Top.X > s.Next.Top.X && (s = n.Prev)
						}
						for (; t !== s; )
							(t.NextInLML = t.Next),
								t.Dx === r.ClipperBase.horizontal && t !== i && t.Bot.X !== t.Prev.Top.X && this.ReverseHorizontal(t),
								(t = t.Next)
						t.Dx === r.ClipperBase.horizontal && t !== i && t.Bot.X !== t.Prev.Top.X && this.ReverseHorizontal(t),
							(s = s.Next)
					} else {
						for (; s.Top.Y === s.Prev.Bot.Y && s.Prev.OutIdx !== r.ClipperBase.Skip; ) s = s.Prev
						if (s.Dx === r.ClipperBase.horizontal && s.Prev.OutIdx !== r.ClipperBase.Skip) {
							for (n = s; n.Next.Dx === r.ClipperBase.horizontal; ) n = n.Next
							;(n.Next.Top.X === s.Prev.Top.X || n.Next.Top.X > s.Prev.Top.X) && (s = n.Next)
						}
						for (; t !== s; )
							(t.NextInLML = t.Prev),
								t.Dx === r.ClipperBase.horizontal && t !== i && t.Bot.X !== t.Next.Top.X && this.ReverseHorizontal(t),
								(t = t.Prev)
						t.Dx === r.ClipperBase.horizontal && t !== i && t.Bot.X !== t.Next.Top.X && this.ReverseHorizontal(t),
							(s = s.Prev)
					}
					return s
				}),
				(r.ClipperBase.prototype.AddPath = function (t, e, i) {
					r.use_lines
						? i || e !== r.PolyType.ptClip || r.Error('AddPath: Open paths must be subject.')
						: i || r.Error('AddPath: Open paths have been disabled.')
					var n = t.length - 1
					if (i) for (; n > 0 && r.IntPoint.op_Equality(t[n], t[0]); ) --n
					for (; n > 0 && r.IntPoint.op_Equality(t[n], t[n - 1]); ) --n
					if ((i && n < 2) || (!i && n < 1)) return !1
					for (var s = new Array(), o = 0; o <= n; o++) s.push(new r.TEdge())
					var a = !0
					;(s[1].Curr.X = t[1].X), (s[1].Curr.Y = t[1].Y), r.use_xyz && (s[1].Curr.Z = t[1].Z)
					var l = { Value: this.m_UseFullRange }
					this.RangeTest(t[0], l),
						(this.m_UseFullRange = l.Value),
						(l.Value = this.m_UseFullRange),
						this.RangeTest(t[n], l),
						(this.m_UseFullRange = l.Value),
						this.InitEdge(s[0], s[1], s[n], t[0]),
						this.InitEdge(s[n], s[0], s[n - 1], t[n])
					for (o = n - 1; o >= 1; --o)
						(l.Value = this.m_UseFullRange),
							this.RangeTest(t[o], l),
							(this.m_UseFullRange = l.Value),
							this.InitEdge(s[o], s[o + 1], s[o - 1], t[o])
					for (var h, u = s[0], c = u, d = u; ; )
						if (c.Curr !== c.Next.Curr || (!i && c.Next === u)) {
							if (c.Prev === c.Next) break
							if (
								!i ||
								!r.ClipperBase.SlopesEqual4(c.Prev.Curr, c.Curr, c.Next.Curr, this.m_UseFullRange) ||
								(this.PreserveCollinear && this.Pt2IsBetweenPt1AndPt3(c.Prev.Curr, c.Curr, c.Next.Curr))
							) {
								if ((c = c.Next) === d || (!i && c.Next === u)) break
							} else c === u && (u = c.Next), (d = c = (c = this.RemoveEdge(c)).Prev)
						} else {
							if (c === c.Next) break
							c === u && (u = c.Next), (d = c = this.RemoveEdge(c))
						}
					if ((!i && c === c.Next) || (i && c.Prev === c.Next)) return !1
					i || ((this.m_HasOpenPaths = !0), (u.Prev.OutIdx = r.ClipperBase.Skip)), (c = u)
					do {
						this.InitEdge2(c, e), (c = c.Next), a && c.Curr.Y !== u.Curr.Y && (a = !1)
					} while (c !== u)
					if (a) {
						if (i) return !1
						for (
							c.Prev.OutIdx = r.ClipperBase.Skip,
								(f = new r.LocalMinima()).Next = null,
								f.Y = c.Bot.Y,
								f.LeftBound = null,
								f.RightBound = c,
								f.RightBound.Side = r.EdgeSide.esRight,
								f.RightBound.WindDelta = 0;
							c.Bot.X !== c.Prev.Top.X && this.ReverseHorizontal(c), c.Next.OutIdx !== r.ClipperBase.Skip;

						)
							(c.NextInLML = c.Next), (c = c.Next)
						return this.InsertLocalMinima(f), this.m_edges.push(s), !0
					}
					this.m_edges.push(s)
					var p = null
					for (r.IntPoint.op_Equality(c.Prev.Bot, c.Prev.Top) && (c = c.Next); (c = this.FindNextLocMin(c)) !== p; ) {
						var f
						null === p && (p = c),
							((f = new r.LocalMinima()).Next = null),
							(f.Y = c.Bot.Y),
							c.Dx < c.Prev.Dx
								? ((f.LeftBound = c.Prev), (f.RightBound = c), (h = !1))
								: ((f.LeftBound = c), (f.RightBound = c.Prev), (h = !0)),
							(f.LeftBound.Side = r.EdgeSide.esLeft),
							(f.RightBound.Side = r.EdgeSide.esRight),
							i
								? f.LeftBound.Next === f.RightBound
									? (f.LeftBound.WindDelta = -1)
									: (f.LeftBound.WindDelta = 1)
								: (f.LeftBound.WindDelta = 0),
							(f.RightBound.WindDelta = -f.LeftBound.WindDelta),
							(c = this.ProcessBound(f.LeftBound, h)).OutIdx === r.ClipperBase.Skip && (c = this.ProcessBound(c, h))
						var m = this.ProcessBound(f.RightBound, !h)
						m.OutIdx === r.ClipperBase.Skip && (m = this.ProcessBound(m, !h)),
							f.LeftBound.OutIdx === r.ClipperBase.Skip
								? (f.LeftBound = null)
								: f.RightBound.OutIdx === r.ClipperBase.Skip && (f.RightBound = null),
							this.InsertLocalMinima(f),
							h || (c = m)
					}
					return !0
				}),
				(r.ClipperBase.prototype.AddPaths = function (t, e, r) {
					for (var i = !1, n = 0, s = t.length; n < s; ++n) this.AddPath(t[n], e, r) && (i = !0)
					return i
				}),
				(r.ClipperBase.prototype.Pt2IsBetweenPt1AndPt3 = function (t, e, i) {
					return (
						!(r.IntPoint.op_Equality(t, i) || r.IntPoint.op_Equality(t, e) || r.IntPoint.op_Equality(i, e)) &&
						(t.X !== i.X ? e.X > t.X == e.X < i.X : e.Y > t.Y == e.Y < i.Y)
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
						for (var i = this.m_Scanbeam; null !== i.Next && t <= i.Next.Y; ) i = i.Next
						if (t === i.Y) return
						var n = new r.Scanbeam()
						;(n.Y = t), (n.Next = i.Next), (i.Next = n)
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
						i = t.NextInAEL
					return (
						(t.NextInLML.OutIdx = t.OutIdx),
						null !== e ? (e.NextInAEL = t.NextInLML) : (this.m_ActiveEdges = t.NextInLML),
						null !== i && (i.PrevInAEL = t.NextInLML),
						(t.NextInLML.Side = t.Side),
						(t.NextInLML.WindDelta = t.WindDelta),
						(t.NextInLML.WindCnt = t.WindCnt),
						(t.NextInLML.WindCnt2 = t.WindCnt2),
						((t = t.NextInLML).Curr.X = t.Bot.X),
						(t.Curr.Y = t.Bot.Y),
						(t.PrevInAEL = e),
						(t.NextInAEL = i),
						r.ClipperBase.IsHorizontal(t) || this.InsertScanbeam(t.Top.Y),
						t
					)
				}),
				(r.ClipperBase.prototype.SwapPositionsInAEL = function (t, e) {
					if (t.NextInAEL !== t.PrevInAEL && e.NextInAEL !== e.PrevInAEL) {
						if (t.NextInAEL === e) {
							var r = e.NextInAEL
							null !== r && (r.PrevInAEL = t)
							var i = t.PrevInAEL
							null !== i && (i.NextInAEL = e),
								(e.PrevInAEL = i),
								(e.NextInAEL = t),
								(t.PrevInAEL = e),
								(t.NextInAEL = r)
						} else if (e.NextInAEL === t) {
							var n = t.NextInAEL
							null !== n && (n.PrevInAEL = e)
							var s = e.PrevInAEL
							null !== s && (s.NextInAEL = t),
								(t.PrevInAEL = s),
								(t.NextInAEL = e),
								(e.PrevInAEL = t),
								(e.NextInAEL = n)
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
						for (var i = this.m_Maxima; null !== i.Next && t >= i.Next.X; ) i = i.Next
						if (t === i.X) return
						;(e.Next = i.Next), (e.Prev = i), null !== i.Next && (i.Next.Prev = e), (i.Next = e)
					}
				}),
				(r.Clipper.prototype.Execute = function () {
					var t = arguments,
						e = t.length,
						i = t[1] instanceof r.PolyTree
					if (4 === e && !i) {
						var n = t[0],
							s = t[1],
							o = t[2],
							a = t[3]
						if (this.m_ExecuteLocked) return !1
						this.m_HasOpenPaths && r.Error('Error: PolyTree struct is needed for open path clipping.'),
							(this.m_ExecuteLocked = !0),
							r.Clear(s),
							(this.m_SubjFillType = o),
							(this.m_ClipFillType = a),
							(this.m_ClipType = n),
							(this.m_UsingPolyTree = !1)
						try {
							;(h = this.ExecuteInternal()) && this.BuildResult(s)
						} finally {
							this.DisposeAllPolyPts(), (this.m_ExecuteLocked = !1)
						}
						return h
					}
					if (4 === e && i) {
						n = t[0]
						var l = t[1]
						;(o = t[2]), (a = t[3])
						if (this.m_ExecuteLocked) return !1
						;(this.m_ExecuteLocked = !0),
							(this.m_SubjFillType = o),
							(this.m_ClipFillType = a),
							(this.m_ClipType = n),
							(this.m_UsingPolyTree = !0)
						try {
							var h
							;(h = this.ExecuteInternal()) && this.BuildResult2(l)
						} finally {
							this.DisposeAllPolyPts(), (this.m_ExecuteLocked = !1)
						}
						return h
					}
					if (2 === e && !i) {
						;(n = t[0]), (s = t[1])
						return this.Execute(n, s, r.PolyFillType.pftEvenOdd, r.PolyFillType.pftEvenOdd)
					}
					if (2 === e && i) {
						;(n = t[0]), (l = t[1])
						return this.Execute(n, l, r.PolyFillType.pftEvenOdd, r.PolyFillType.pftEvenOdd)
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
							i = {},
							n = {}
						if (!this.PopScanbeam(i)) return !1
						for (this.InsertLocalMinimaIntoAEL(i.v); this.PopScanbeam(n) || this.LocalMinimaPending(); ) {
							if ((this.ProcessHorizontals(), (this.m_GhostJoins.length = 0), !this.ProcessIntersections(n.v)))
								return !1
							this.ProcessEdgesAtTopOfScanbeam(n.v), (i.v = n.v), this.InsertLocalMinimaIntoAEL(i.v)
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
				(r.Clipper.prototype.AddJoin = function (t, e, i) {
					var n = new r.Join()
					;(n.OutPt1 = t),
						(n.OutPt2 = e),
						(n.OffPt.X = i.X),
						(n.OffPt.Y = i.Y),
						r.use_xyz && (n.OffPt.Z = i.Z),
						this.m_Joins.push(n)
				}),
				(r.Clipper.prototype.AddGhostJoin = function (t, e) {
					var i = new r.Join()
					;(i.OutPt1 = t),
						(i.OffPt.X = e.X),
						(i.OffPt.Y = e.Y),
						r.use_xyz && (i.OffPt.Z = e.Z),
						this.m_GhostJoins.push(i)
				}),
				(r.Clipper.prototype.SetZ = function (t, e, i) {
					if (null !== this.ZFillFunction) {
						if (0 !== t.Z || null === this.ZFillFunction) return
						r.IntPoint.op_Equality(t, e.Bot)
							? (t.Z = e.Bot.Z)
							: r.IntPoint.op_Equality(t, e.Top)
							? (t.Z = e.Top.Z)
							: r.IntPoint.op_Equality(t, i.Bot)
							? (t.Z = i.Bot.Z)
							: r.IntPoint.op_Equality(t, i.Top)
							? (t.Z = i.Top.Z)
							: this.ZFillFunction(e.Bot, e.Top, i.Bot, i.Top, t)
					}
				}),
				(r.Clipper.prototype.InsertLocalMinimaIntoAEL = function (t) {
					for (var e, i, n = {}; this.PopLocalMinima(t, n); ) {
						;(e = n.v.LeftBound), (i = n.v.RightBound)
						var s = null
						if (
							(null === e
								? (this.InsertEdgeIntoAEL(i, null),
								  this.SetWindingCount(i),
								  this.IsContributing(i) && (s = this.AddOutPt(i, i.Bot)))
								: null === i
								? (this.InsertEdgeIntoAEL(e, null),
								  this.SetWindingCount(e),
								  this.IsContributing(e) && (s = this.AddOutPt(e, e.Bot)),
								  this.InsertScanbeam(e.Top.Y))
								: (this.InsertEdgeIntoAEL(e, null),
								  this.InsertEdgeIntoAEL(i, e),
								  this.SetWindingCount(e),
								  (i.WindCnt = e.WindCnt),
								  (i.WindCnt2 = e.WindCnt2),
								  this.IsContributing(e) && (s = this.AddLocalMinPoly(e, i, e.Bot)),
								  this.InsertScanbeam(e.Top.Y)),
							null !== i &&
								(r.ClipperBase.IsHorizontal(i)
									? (null !== i.NextInLML && this.InsertScanbeam(i.NextInLML.Top.Y), this.AddEdgeToSEL(i))
									: this.InsertScanbeam(i.Top.Y)),
							null !== e && null !== i)
						) {
							if (null !== s && r.ClipperBase.IsHorizontal(i) && this.m_GhostJoins.length > 0 && 0 !== i.WindDelta)
								for (var o = 0, a = this.m_GhostJoins.length; o < a; o++) {
									var l = this.m_GhostJoins[o]
									this.HorzSegmentsOverlap(l.OutPt1.Pt.X, l.OffPt.X, i.Bot.X, i.Top.X) &&
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
								var h = this.AddOutPt(e.PrevInAEL, e.Bot)
								this.AddJoin(s, h, e.Top)
							}
							if (e.NextInAEL !== i) {
								if (
									i.OutIdx >= 0 &&
									i.PrevInAEL.OutIdx >= 0 &&
									r.ClipperBase.SlopesEqual5(i.PrevInAEL.Curr, i.PrevInAEL.Top, i.Curr, i.Top, this.m_UseFullRange) &&
									0 !== i.WindDelta &&
									0 !== i.PrevInAEL.WindDelta
								) {
									h = this.AddOutPt(i.PrevInAEL, i.Bot)
									this.AddJoin(s, h, i.Top)
								}
								var u = e.NextInAEL
								if (null !== u) for (; u !== i; ) this.IntersectEdges(i, u, e.Curr), (u = u.NextInAEL)
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
					var e, i
					switch (
						(t.PolyTyp === r.PolyType.ptSubject
							? ((e = this.m_SubjFillType), (i = this.m_ClipFillType))
							: ((e = this.m_ClipFillType), (i = this.m_SubjFillType)),
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
							switch (i) {
								case r.PolyFillType.pftEvenOdd:
								case r.PolyFillType.pftNonZero:
									return 0 !== t.WindCnt2
								case r.PolyFillType.pftPositive:
									return t.WindCnt2 > 0
								default:
									return t.WindCnt2 < 0
							}
						case r.ClipType.ctUnion:
							switch (i) {
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
								switch (i) {
									case r.PolyFillType.pftEvenOdd:
									case r.PolyFillType.pftNonZero:
										return 0 === t.WindCnt2
									case r.PolyFillType.pftPositive:
										return t.WindCnt2 <= 0
									default:
										return t.WindCnt2 >= 0
								}
							else
								switch (i) {
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
							switch (i) {
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
						var i = t.PolyTyp === r.PolyType.ptSubject ? this.m_SubjFillType : this.m_ClipFillType
						0 === t.WindDelta ? (t.WindCnt = i === r.PolyFillType.pftNegative ? -1 : 1) : (t.WindCnt = t.WindDelta),
							(t.WindCnt2 = 0),
							(e = this.m_ActiveEdges)
					} else if (0 === t.WindDelta && this.m_ClipType !== r.ClipType.ctUnion)
						(t.WindCnt = 1), (t.WindCnt2 = e.WindCnt2), (e = e.NextInAEL)
					else if (this.IsEvenOddFillType(t)) {
						if (0 === t.WindDelta) {
							for (var n = !0, s = e.PrevInAEL; null !== s; )
								s.PolyTyp === e.PolyTyp && 0 !== s.WindDelta && (n = !n), (s = s.PrevInAEL)
							t.WindCnt = n ? 0 : 1
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
								null !== (i = t.PrevInSEL) && (i.NextInSEL = e),
								(e.PrevInSEL = i),
								(e.NextInSEL = t),
								(t.PrevInSEL = e),
								(t.NextInSEL = r)
						else if (e.NextInSEL === t) {
							null !== (r = t.NextInSEL) && (r.PrevInSEL = e),
								null !== (i = e.PrevInSEL) && (i.NextInSEL = t),
								(t.PrevInSEL = i),
								(t.NextInSEL = e),
								(e.PrevInSEL = t),
								(e.NextInSEL = r)
						} else {
							var r = t.NextInSEL,
								i = t.PrevInSEL
							;(t.NextInSEL = e.NextInSEL),
								null !== t.NextInSEL && (t.NextInSEL.PrevInSEL = t),
								(t.PrevInSEL = e.PrevInSEL),
								null !== t.PrevInSEL && (t.PrevInSEL.NextInSEL = t),
								(e.NextInSEL = r),
								null !== e.NextInSEL && (e.NextInSEL.PrevInSEL = e),
								(e.PrevInSEL = i),
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
				(r.Clipper.prototype.AddLocalMinPoly = function (t, e, i) {
					var n, s, o
					if (
						(r.ClipperBase.IsHorizontal(e) || t.Dx > e.Dx
							? ((n = this.AddOutPt(t, i)),
							  (e.OutIdx = t.OutIdx),
							  (t.Side = r.EdgeSide.esLeft),
							  (e.Side = r.EdgeSide.esRight),
							  (o = (s = t).PrevInAEL === e ? e.PrevInAEL : s.PrevInAEL))
							: ((n = this.AddOutPt(e, i)),
							  (t.OutIdx = e.OutIdx),
							  (t.Side = r.EdgeSide.esRight),
							  (e.Side = r.EdgeSide.esLeft),
							  (o = (s = e).PrevInAEL === t ? t.PrevInAEL : s.PrevInAEL)),
						null !== o && o.OutIdx >= 0 && o.Top.Y < i.Y && s.Top.Y < i.Y)
					) {
						var a = r.Clipper.TopX(o, i.Y),
							l = r.Clipper.TopX(s, i.Y)
						if (
							a === l &&
							0 !== s.WindDelta &&
							0 !== o.WindDelta &&
							r.ClipperBase.SlopesEqual5(
								new r.IntPoint2(a, i.Y),
								o.Top,
								new r.IntPoint2(l, i.Y),
								s.Top,
								this.m_UseFullRange
							)
						) {
							var h = this.AddOutPt(o, i)
							this.AddJoin(n, h, s.Top)
						}
					}
					return n
				}),
				(r.Clipper.prototype.AddOutPt = function (t, e) {
					if (t.OutIdx < 0) {
						;(n = this.CreateOutRec()).IsOpen = 0 === t.WindDelta
						var i = new r.OutPt()
						return (
							(n.Pts = i),
							(i.Idx = n.Idx),
							(i.Pt.X = e.X),
							(i.Pt.Y = e.Y),
							r.use_xyz && (i.Pt.Z = e.Z),
							(i.Next = i),
							(i.Prev = i),
							n.IsOpen || this.SetHoleState(t, n),
							(t.OutIdx = n.Idx),
							i
						)
					}
					var n,
						s = (n = this.m_PolyOuts[t.OutIdx]).Pts,
						o = t.Side === r.EdgeSide.esLeft
					return o && r.IntPoint.op_Equality(e, s.Pt)
						? s
						: !o && r.IntPoint.op_Equality(e, s.Prev.Pt)
						? s.Prev
						: (((i = new r.OutPt()).Idx = n.Idx),
						  (i.Pt.X = e.X),
						  (i.Pt.Y = e.Y),
						  r.use_xyz && (i.Pt.Z = e.Z),
						  (i.Next = s),
						  (i.Prev = s.Prev),
						  (i.Prev.Next = i),
						  (s.Prev = i),
						  o && (n.Pts = i),
						  i)
				}),
				(r.Clipper.prototype.GetLastOutPt = function (t) {
					var e = this.m_PolyOuts[t.OutIdx]
					return t.Side === r.EdgeSide.esLeft ? e.Pts : e.Pts.Prev
				}),
				(r.Clipper.prototype.SwapPoints = function (t, e) {
					var i = new r.IntPoint1(t.Value)
					;(t.Value.X = e.Value.X),
						(t.Value.Y = e.Value.Y),
						r.use_xyz && (t.Value.Z = e.Value.Z),
						(e.Value.X = i.X),
						(e.Value.Y = i.Y),
						r.use_xyz && (e.Value.Z = i.Z)
				}),
				(r.Clipper.prototype.HorzSegmentsOverlap = function (t, e, r, i) {
					var n
					return t > e && ((n = t), (t = e), (e = n)), r > i && ((n = r), (r = i), (i = n)), t < i && r < e
				}),
				(r.Clipper.prototype.SetHoleState = function (t, e) {
					for (var r = t.PrevInAEL, i = null; null !== r; )
						r.OutIdx >= 0 && 0 !== r.WindDelta && (null === i ? (i = r) : i.OutIdx === r.OutIdx && (i = null)),
							(r = r.PrevInAEL)
					null === i
						? ((e.FirstLeft = null), (e.IsHole = !1))
						: ((e.FirstLeft = this.m_PolyOuts[i.OutIdx]), (e.IsHole = !e.FirstLeft.IsHole))
				}),
				(r.Clipper.prototype.GetDx = function (t, e) {
					return t.Y === e.Y ? r.ClipperBase.horizontal : (e.X - t.X) / (e.Y - t.Y)
				}),
				(r.Clipper.prototype.FirstIsBottomPt = function (t, e) {
					for (var i = t.Prev; r.IntPoint.op_Equality(i.Pt, t.Pt) && i !== t; ) i = i.Prev
					var n = Math.abs(this.GetDx(t.Pt, i.Pt))
					for (i = t.Next; r.IntPoint.op_Equality(i.Pt, t.Pt) && i !== t; ) i = i.Next
					var s = Math.abs(this.GetDx(t.Pt, i.Pt))
					for (i = e.Prev; r.IntPoint.op_Equality(i.Pt, e.Pt) && i !== e; ) i = i.Prev
					var o = Math.abs(this.GetDx(e.Pt, i.Pt))
					for (i = e.Next; r.IntPoint.op_Equality(i.Pt, e.Pt) && i !== e; ) i = i.Next
					var a = Math.abs(this.GetDx(e.Pt, i.Pt))
					return Math.max(n, s) === Math.max(o, a) && Math.min(n, s) === Math.min(o, a)
						? this.Area(t) > 0
						: (n >= o && n >= a) || (s >= o && s >= a)
				}),
				(r.Clipper.prototype.GetBottomPt = function (t) {
					for (var e = null, i = t.Next; i !== t; )
						i.Pt.Y > t.Pt.Y
							? ((t = i), (e = null))
							: i.Pt.Y === t.Pt.Y &&
							  i.Pt.X <= t.Pt.X &&
							  (i.Pt.X < t.Pt.X ? ((e = null), (t = i)) : i.Next !== t && i.Prev !== t && (e = i)),
							(i = i.Next)
					if (null !== e)
						for (; e !== i; )
							for (this.FirstIsBottomPt(i, e) || (t = e), e = e.Next; r.IntPoint.op_Inequality(e.Pt, t.Pt); ) e = e.Next
					return t
				}),
				(r.Clipper.prototype.GetLowermostRec = function (t, e) {
					null === t.BottomPt && (t.BottomPt = this.GetBottomPt(t.Pts)),
						null === e.BottomPt && (e.BottomPt = this.GetBottomPt(e.Pts))
					var r = t.BottomPt,
						i = e.BottomPt
					return r.Pt.Y > i.Pt.Y
						? t
						: r.Pt.Y < i.Pt.Y
						? e
						: r.Pt.X < i.Pt.X
						? t
						: r.Pt.X > i.Pt.X || r.Next === r
						? e
						: i.Next === i || this.FirstIsBottomPt(r, i)
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
					var i,
						n = this.m_PolyOuts[t.OutIdx],
						s = this.m_PolyOuts[e.OutIdx]
					i = this.OutRec1RightOfOutRec2(n, s) ? s : this.OutRec1RightOfOutRec2(s, n) ? n : this.GetLowermostRec(n, s)
					var o = n.Pts,
						a = o.Prev,
						l = s.Pts,
						h = l.Prev
					t.Side === r.EdgeSide.esLeft
						? e.Side === r.EdgeSide.esLeft
							? (this.ReversePolyPtLinks(l), (l.Next = o), (o.Prev = l), (a.Next = h), (h.Prev = a), (n.Pts = h))
							: ((h.Next = o), (o.Prev = h), (l.Prev = a), (a.Next = l), (n.Pts = l))
						: e.Side === r.EdgeSide.esRight
						? (this.ReversePolyPtLinks(l), (a.Next = h), (h.Prev = a), (l.Next = o), (o.Prev = l))
						: ((a.Next = l), (l.Prev = a), (o.Prev = h), (h.Next = o)),
						(n.BottomPt = null),
						i === s && (s.FirstLeft !== n && (n.FirstLeft = s.FirstLeft), (n.IsHole = s.IsHole)),
						(s.Pts = null),
						(s.BottomPt = null),
						(s.FirstLeft = n)
					var u = t.OutIdx,
						c = e.OutIdx
					;(t.OutIdx = -1), (e.OutIdx = -1)
					for (var d = this.m_ActiveEdges; null !== d; ) {
						if (d.OutIdx === c) {
							;(d.OutIdx = u), (d.Side = t.Side)
							break
						}
						d = d.NextInAEL
					}
					s.Idx = n.Idx
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
				(r.Clipper.prototype.IntersectEdges = function (t, e, i) {
					var n = t.OutIdx >= 0,
						s = e.OutIdx >= 0
					if ((r.use_xyz && this.SetZ(i, t, e), !r.use_lines || (0 !== t.WindDelta && 0 !== e.WindDelta))) {
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
						var a, l, h, u, c, d
						switch (
							(t.PolyTyp === r.PolyType.ptSubject
								? ((a = this.m_SubjFillType), (h = this.m_ClipFillType))
								: ((a = this.m_ClipFillType), (h = this.m_SubjFillType)),
							e.PolyTyp === r.PolyType.ptSubject
								? ((l = this.m_SubjFillType), (u = this.m_ClipFillType))
								: ((l = this.m_ClipFillType), (u = this.m_SubjFillType)),
							a)
						) {
							case r.PolyFillType.pftPositive:
								c = t.WindCnt
								break
							case r.PolyFillType.pftNegative:
								c = -t.WindCnt
								break
							default:
								c = Math.abs(t.WindCnt)
						}
						switch (l) {
							case r.PolyFillType.pftPositive:
								d = e.WindCnt
								break
							case r.PolyFillType.pftNegative:
								d = -e.WindCnt
								break
							default:
								d = Math.abs(e.WindCnt)
						}
						if (n && s)
							(0 !== c && 1 !== c) ||
							(0 !== d && 1 !== d) ||
							(t.PolyTyp !== e.PolyTyp && this.m_ClipType !== r.ClipType.ctXor)
								? this.AddLocalMaxPoly(t, e, i)
								: (this.AddOutPt(t, i), this.AddOutPt(e, i), r.Clipper.SwapSides(t, e), r.Clipper.SwapPolyIndexes(t, e))
						else if (n)
							(0 !== d && 1 !== d) || (this.AddOutPt(t, i), r.Clipper.SwapSides(t, e), r.Clipper.SwapPolyIndexes(t, e))
						else if (s)
							(0 !== c && 1 !== c) || (this.AddOutPt(e, i), r.Clipper.SwapSides(t, e), r.Clipper.SwapPolyIndexes(t, e))
						else if (!((0 !== c && 1 !== c) || (0 !== d && 1 !== d))) {
							var p, f
							switch (h) {
								case r.PolyFillType.pftPositive:
									p = t.WindCnt2
									break
								case r.PolyFillType.pftNegative:
									p = -t.WindCnt2
									break
								default:
									p = Math.abs(t.WindCnt2)
							}
							switch (u) {
								case r.PolyFillType.pftPositive:
									f = e.WindCnt2
									break
								case r.PolyFillType.pftNegative:
									f = -e.WindCnt2
									break
								default:
									f = Math.abs(e.WindCnt2)
							}
							if (t.PolyTyp !== e.PolyTyp) this.AddLocalMinPoly(t, e, i)
							else if (1 === c && 1 === d)
								switch (this.m_ClipType) {
									case r.ClipType.ctIntersection:
										p > 0 && f > 0 && this.AddLocalMinPoly(t, e, i)
										break
									case r.ClipType.ctUnion:
										p <= 0 && f <= 0 && this.AddLocalMinPoly(t, e, i)
										break
									case r.ClipType.ctDifference:
										;((t.PolyTyp === r.PolyType.ptClip && p > 0 && f > 0) ||
											(t.PolyTyp === r.PolyType.ptSubject && p <= 0 && f <= 0)) &&
											this.AddLocalMinPoly(t, e, i)
										break
									case r.ClipType.ctXor:
										this.AddLocalMinPoly(t, e, i)
								}
							else r.Clipper.SwapSides(t, e)
						}
					} else {
						if (0 === t.WindDelta && 0 === e.WindDelta) return
						t.PolyTyp === e.PolyTyp && t.WindDelta !== e.WindDelta && this.m_ClipType === r.ClipType.ctUnion
							? 0 === t.WindDelta
								? s && (this.AddOutPt(t, i), n && (t.OutIdx = -1))
								: n && (this.AddOutPt(e, i), s && (e.OutIdx = -1))
							: t.PolyTyp !== e.PolyTyp &&
							  (0 !== t.WindDelta ||
							  1 !== Math.abs(e.WindCnt) ||
							  (this.m_ClipType === r.ClipType.ctUnion && 0 !== e.WindCnt2)
									? 0 !== e.WindDelta ||
									  1 !== Math.abs(t.WindCnt) ||
									  (this.m_ClipType === r.ClipType.ctUnion && 0 !== t.WindCnt2) ||
									  (this.AddOutPt(e, i), s && (e.OutIdx = -1))
									: (this.AddOutPt(t, i), n && (t.OutIdx = -1)))
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
						var i = e.Dir, n = e.Left, s = e.Right, o = 0 === t.WindDelta, a = t, l = null;
						null !== a.NextInLML && r.ClipperBase.IsHorizontal(a.NextInLML);

					)
						a = a.NextInLML
					null === a.NextInLML && (l = this.GetMaximaPair(a))
					var h = this.m_Maxima
					if (null !== h)
						if (i === r.Direction.dLeftToRight) {
							for (; null !== h && h.X <= t.Bot.X; ) h = h.Next
							null !== h && h.X >= a.Top.X && (h = null)
						} else {
							for (; null !== h.Next && h.Next.X < t.Bot.X; ) h = h.Next
							h.X <= a.Top.X && (h = null)
						}
					for (var u = null; ; ) {
						for (var c = t === a, d = this.GetNextInAEL(t, i); null !== d; ) {
							if (null !== h)
								if (i === r.Direction.dLeftToRight)
									for (; null !== h && h.X < d.Curr.X; )
										t.OutIdx >= 0 && !o && this.AddOutPt(t, new r.IntPoint2(h.X, t.Bot.Y)), (h = h.Next)
								else
									for (; null !== h && h.X > d.Curr.X; )
										t.OutIdx >= 0 && !o && this.AddOutPt(t, new r.IntPoint2(h.X, t.Bot.Y)), (h = h.Prev)
							if ((i === r.Direction.dLeftToRight && d.Curr.X > s) || (i === r.Direction.dRightToLeft && d.Curr.X < n))
								break
							if (d.Curr.X === t.Top.X && null !== t.NextInLML && d.Dx < t.NextInLML.Dx) break
							if (t.OutIdx >= 0 && !o) {
								r.use_xyz && (i === r.Direction.dLeftToRight ? this.SetZ(d.Curr, t, d) : this.SetZ(d.Curr, d, t)),
									(u = this.AddOutPt(t, d.Curr))
								for (var p = this.m_SortedEdges; null !== p; ) {
									if (p.OutIdx >= 0 && this.HorzSegmentsOverlap(t.Bot.X, t.Top.X, p.Bot.X, p.Top.X)) {
										var f = this.GetLastOutPt(p)
										this.AddJoin(f, u, p.Top)
									}
									p = p.NextInSEL
								}
								this.AddGhostJoin(u, t.Bot)
							}
							if (d === l && c)
								return (
									t.OutIdx >= 0 && this.AddLocalMaxPoly(t, l, t.Top), this.DeleteFromAEL(t), void this.DeleteFromAEL(l)
								)
							if (i === r.Direction.dLeftToRight) {
								var m = new r.IntPoint2(d.Curr.X, t.Curr.Y)
								this.IntersectEdges(t, d, m)
							} else {
								m = new r.IntPoint2(d.Curr.X, t.Curr.Y)
								this.IntersectEdges(d, t, m)
							}
							var g = this.GetNextInAEL(d, i)
							this.SwapPositionsInAEL(t, d), (d = g)
						}
						if (null === t.NextInLML || !r.ClipperBase.IsHorizontal(t.NextInLML)) break
						;(t = this.UpdateEdgeIntoAEL(t)).OutIdx >= 0 && this.AddOutPt(t, t.Bot),
							(e = { Dir: i, Left: n, Right: s }),
							this.GetHorzDirection(t, e),
							(i = e.Dir),
							(n = e.Left),
							(s = e.Right)
					}
					if (t.OutIdx >= 0 && null === u) {
						u = this.GetLastOutPt(t)
						for (p = this.m_SortedEdges; null !== p; ) {
							if (p.OutIdx >= 0 && this.HorzSegmentsOverlap(t.Bot.X, t.Top.X, p.Bot.X, p.Top.X)) {
								f = this.GetLastOutPt(p)
								this.AddJoin(f, u, p.Top)
							}
							p = p.NextInSEL
						}
						this.AddGhostJoin(u, t.Top)
					}
					if (null !== t.NextInLML)
						if (t.OutIdx >= 0) {
							if (((u = this.AddOutPt(t, t.Top)), 0 === (t = this.UpdateEdgeIntoAEL(t)).WindDelta)) return
							var y = t.PrevInAEL
							g = t.NextInAEL
							if (
								null !== y &&
								y.Curr.X === t.Bot.X &&
								y.Curr.Y === t.Bot.Y &&
								0 === y.WindDelta &&
								y.OutIdx >= 0 &&
								y.Curr.Y > y.Top.Y &&
								r.ClipperBase.SlopesEqual3(t, y, this.m_UseFullRange)
							) {
								f = this.AddOutPt(y, t.Bot)
								this.AddJoin(u, f, t.Top)
							} else if (
								null !== g &&
								g.Curr.X === t.Bot.X &&
								g.Curr.Y === t.Bot.Y &&
								0 !== g.WindDelta &&
								g.OutIdx >= 0 &&
								g.Curr.Y > g.Top.Y &&
								r.ClipperBase.SlopesEqual3(t, g, this.m_UseFullRange)
							) {
								f = this.AddOutPt(g, t.Bot)
								this.AddJoin(u, f, t.Top)
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
						for (var i = !0; i && null !== this.m_SortedEdges; ) {
							for (i = !1, e = this.m_SortedEdges; null !== e.NextInSEL; ) {
								var n = e.NextInSEL,
									s = new r.IntPoint0()
								if (e.Curr.X > n.Curr.X) {
									this.IntersectPoint(e, n, s), s.Y < t && (s = new r.IntPoint2(r.Clipper.TopX(e, t), t))
									var o = new r.IntersectNode()
									;(o.Edge1 = e),
										(o.Edge2 = n),
										(o.Pt.X = s.X),
										(o.Pt.Y = s.Y),
										r.use_xyz && (o.Pt.Z = s.Z),
										this.m_IntersectList.push(o),
										this.SwapPositionsInSEL(e, n),
										(i = !0)
								} else e = n
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
							var i = this.m_IntersectList[e]
							;(this.m_IntersectList[e] = this.m_IntersectList[r]), (this.m_IntersectList[r] = i)
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
				(r.Clipper.prototype.IntersectPoint = function (t, e, i) {
					var n, s
					if (((i.X = 0), (i.Y = 0), t.Dx === e.Dx)) return (i.Y = t.Curr.Y), void (i.X = r.Clipper.TopX(t, i.Y))
					if (0 === t.Delta.X)
						(i.X = t.Bot.X),
							r.ClipperBase.IsHorizontal(e)
								? (i.Y = e.Bot.Y)
								: ((s = e.Bot.Y - e.Bot.X / e.Dx), (i.Y = r.Clipper.Round(i.X / e.Dx + s)))
					else if (0 === e.Delta.X)
						(i.X = e.Bot.X),
							r.ClipperBase.IsHorizontal(t)
								? (i.Y = t.Bot.Y)
								: ((n = t.Bot.Y - t.Bot.X / t.Dx), (i.Y = r.Clipper.Round(i.X / t.Dx + n)))
					else {
						n = t.Bot.X - t.Bot.Y * t.Dx
						var o = ((s = e.Bot.X - e.Bot.Y * e.Dx) - n) / (t.Dx - e.Dx)
						;(i.Y = r.Clipper.Round(o)),
							Math.abs(t.Dx) < Math.abs(e.Dx)
								? (i.X = r.Clipper.Round(t.Dx * o + n))
								: (i.X = r.Clipper.Round(e.Dx * o + s))
					}
					if (i.Y < t.Top.Y || i.Y < e.Top.Y) {
						if (t.Top.Y > e.Top.Y) return (i.Y = t.Top.Y), (i.X = r.Clipper.TopX(e, t.Top.Y)), i.X < t.Top.X
						;(i.Y = e.Top.Y),
							Math.abs(t.Dx) < Math.abs(e.Dx) ? (i.X = r.Clipper.TopX(t, i.Y)) : (i.X = r.Clipper.TopX(e, i.Y))
					}
					i.Y > t.Curr.Y &&
						((i.Y = t.Curr.Y),
						Math.abs(t.Dx) > Math.abs(e.Dx) ? (i.X = r.Clipper.TopX(e, i.Y)) : (i.X = r.Clipper.TopX(t, i.Y)))
				}),
				(r.Clipper.prototype.ProcessEdgesAtTopOfScanbeam = function (t) {
					for (var e = this.m_ActiveEdges; null !== e; ) {
						var i = this.IsMaxima(e, t)
						if (i) {
							var n = this.GetMaximaPairEx(e)
							i = null === n || !r.ClipperBase.IsHorizontal(n)
						}
						if (i) {
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
							var h = e.NextInAEL
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
								null !== h &&
								h.Curr.X === e.Bot.X &&
								h.Curr.Y === e.Bot.Y &&
								null !== a &&
								h.OutIdx >= 0 &&
								h.Curr.Y === h.Top.Y &&
								r.ClipperBase.SlopesEqual5(e.Curr, e.Top, h.Curr, h.Top, this.m_UseFullRange) &&
								0 !== e.WindDelta &&
								0 !== h.WindDelta
							) {
								l = this.AddOutPt(h, e.Bot)
								this.AddJoin(a, l, e.Top)
							}
						}
						e = e.NextInAEL
					}
				}),
				(r.Clipper.prototype.DoMaxima = function (t) {
					var e = this.GetMaximaPairEx(t)
					if (null === e) return t.OutIdx >= 0 && this.AddOutPt(t, t.Top), void this.DeleteFromAEL(t)
					for (var i = t.NextInAEL; null !== i && i !== e; )
						this.IntersectEdges(t, i, t.Top), this.SwapPositionsInAEL(t, i), (i = t.NextInAEL)
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
					for (var e = 0, i = this.m_PolyOuts.length; e < i; e++) {
						var n = this.m_PolyOuts[e]
						if (null !== n.Pts) {
							var s = n.Pts.Prev,
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
					for (var e = 0, i = this.m_PolyOuts.length; e < i; e++) {
						var n = this.m_PolyOuts[e],
							s = this.PointCount(n.Pts)
						if (!((n.IsOpen && s < 2) || (!n.IsOpen && s < 3))) {
							this.FixHoleLinkage(n)
							var o = new r.PolyNode()
							t.m_AllPolys.push(o), (n.PolyNode = o), (o.m_polygon.length = s)
							for (var a = n.Pts.Prev, l = 0; l < s; l++) (o.m_polygon[l] = a.Pt), (a = a.Prev)
						}
					}
					for (e = 0, i = this.m_PolyOuts.length; e < i; e++) {
						null !== (n = this.m_PolyOuts[e]).PolyNode &&
							(n.IsOpen
								? ((n.PolyNode.IsOpen = !0), t.AddChild(n.PolyNode))
								: null !== n.FirstLeft && null !== n.FirstLeft.PolyNode
								? n.FirstLeft.PolyNode.AddChild(n.PolyNode)
								: t.AddChild(n.PolyNode))
					}
				}),
				(r.Clipper.prototype.FixupOutPolyline = function (t) {
					for (var e = t.Pts, i = e.Prev; e !== i; )
						if (((e = e.Next), r.IntPoint.op_Equality(e.Pt, e.Prev.Pt))) {
							e === i && (i = e.Prev)
							var n = e.Prev
							;(n.Next = e.Next), (e.Next.Prev = n), (e = n)
						}
					e === e.Prev && (t.Pts = null)
				}),
				(r.Clipper.prototype.FixupOutPolygon = function (t) {
					var e = null
					t.BottomPt = null
					for (var i = t.Pts, n = this.PreserveCollinear || this.StrictlySimple; ; ) {
						if (i.Prev === i || i.Prev === i.Next) return void (t.Pts = null)
						if (
							r.IntPoint.op_Equality(i.Pt, i.Next.Pt) ||
							r.IntPoint.op_Equality(i.Pt, i.Prev.Pt) ||
							(r.ClipperBase.SlopesEqual4(i.Prev.Pt, i.Pt, i.Next.Pt, this.m_UseFullRange) &&
								(!n || !this.Pt2IsBetweenPt1AndPt3(i.Prev.Pt, i.Pt, i.Next.Pt)))
						)
							(e = null), (i.Prev.Next = i.Next), (i.Next.Prev = i.Prev), (i = i.Prev)
						else {
							if (i === e) break
							null === e && (e = i), (i = i.Next)
						}
					}
					t.Pts = i
				}),
				(r.Clipper.prototype.DupOutPt = function (t, e) {
					var i = new r.OutPt()
					return (
						(i.Pt.X = t.Pt.X),
						(i.Pt.Y = t.Pt.Y),
						r.use_xyz && (i.Pt.Z = t.Pt.Z),
						(i.Idx = t.Idx),
						e
							? ((i.Next = t.Next), (i.Prev = t), (t.Next.Prev = i), (t.Next = i))
							: ((i.Prev = t.Prev), (i.Next = t), (t.Prev.Next = i), (t.Prev = i)),
						i
					)
				}),
				(r.Clipper.prototype.GetOverlap = function (t, e, r, i, n) {
					return (
						t < e
							? r < i
								? ((n.Left = Math.max(t, r)), (n.Right = Math.min(e, i)))
								: ((n.Left = Math.max(t, i)), (n.Right = Math.min(e, r)))
							: r < i
							? ((n.Left = Math.max(e, r)), (n.Right = Math.min(t, i)))
							: ((n.Left = Math.max(e, i)), (n.Right = Math.min(t, r))),
						n.Left < n.Right
					)
				}),
				(r.Clipper.prototype.JoinHorz = function (t, e, i, n, s, o) {
					var a = t.Pt.X > e.Pt.X ? r.Direction.dRightToLeft : r.Direction.dLeftToRight,
						l = i.Pt.X > n.Pt.X ? r.Direction.dRightToLeft : r.Direction.dLeftToRight
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
						for (; i.Next.Pt.X <= s.X && i.Next.Pt.X >= i.Pt.X && i.Next.Pt.Y === s.Y; ) i = i.Next
						o && i.Pt.X !== s.X && (i = i.Next),
							(n = this.DupOutPt(i, !o)),
							r.IntPoint.op_Inequality(n.Pt, s) &&
								(((i = n).Pt.X = s.X), (i.Pt.Y = s.Y), r.use_xyz && (i.Pt.Z = s.Z), (n = this.DupOutPt(i, !o)))
					} else {
						for (; i.Next.Pt.X >= s.X && i.Next.Pt.X <= i.Pt.X && i.Next.Pt.Y === s.Y; ) i = i.Next
						o || i.Pt.X === s.X || (i = i.Next),
							(n = this.DupOutPt(i, o)),
							r.IntPoint.op_Inequality(n.Pt, s) &&
								(((i = n).Pt.X = s.X), (i.Pt.Y = s.Y), r.use_xyz && (i.Pt.Z = s.Z), (n = this.DupOutPt(i, o)))
					}
					return (
						(a === r.Direction.dLeftToRight) === o
							? ((t.Prev = i), (i.Next = t), (e.Next = n), (n.Prev = e))
							: ((t.Next = i), (i.Prev = t), (e.Prev = n), (n.Next = e)),
						!0
					)
				}),
				(r.Clipper.prototype.JoinPoints = function (t, e, i) {
					var n = t.OutPt1,
						s = new r.OutPt(),
						o = t.OutPt2,
						a = new r.OutPt(),
						l = t.OutPt1.Pt.Y === t.OffPt.Y
					if (l && r.IntPoint.op_Equality(t.OffPt, t.OutPt1.Pt) && r.IntPoint.op_Equality(t.OffPt, t.OutPt2.Pt)) {
						if (e !== i) return !1
						for (s = t.OutPt1.Next; s !== n && r.IntPoint.op_Equality(s.Pt, t.OffPt); ) s = s.Next
						var h = s.Pt.Y > t.OffPt.Y
						for (a = t.OutPt2.Next; a !== o && r.IntPoint.op_Equality(a.Pt, t.OffPt); ) a = a.Next
						return (
							h !== a.Pt.Y > t.OffPt.Y &&
							(h
								? ((s = this.DupOutPt(n, !1)),
								  (a = this.DupOutPt(o, !0)),
								  (n.Prev = o),
								  (o.Next = n),
								  (s.Next = a),
								  (a.Prev = s),
								  (t.OutPt1 = n),
								  (t.OutPt2 = s),
								  !0)
								: ((s = this.DupOutPt(n, !0)),
								  (a = this.DupOutPt(o, !1)),
								  (n.Next = o),
								  (o.Prev = n),
								  (s.Prev = a),
								  (a.Next = s),
								  (t.OutPt1 = n),
								  (t.OutPt2 = s),
								  !0))
						)
					}
					if (l) {
						for (s = n; n.Prev.Pt.Y === n.Pt.Y && n.Prev !== s && n.Prev !== o; ) n = n.Prev
						for (; s.Next.Pt.Y === s.Pt.Y && s.Next !== n && s.Next !== o; ) s = s.Next
						if (s.Next === n || s.Next === o) return !1
						for (a = o; o.Prev.Pt.Y === o.Pt.Y && o.Prev !== a && o.Prev !== s; ) o = o.Prev
						for (; a.Next.Pt.Y === a.Pt.Y && a.Next !== o && a.Next !== n; ) a = a.Next
						if (a.Next === o || a.Next === n) return !1
						var u = { Left: null, Right: null }
						if (!this.GetOverlap(n.Pt.X, s.Pt.X, o.Pt.X, a.Pt.X, u)) return !1
						var c,
							d = u.Left,
							p = u.Right,
							f = new r.IntPoint0()
						return (
							n.Pt.X >= d && n.Pt.X <= p
								? ((f.X = n.Pt.X), (f.Y = n.Pt.Y), r.use_xyz && (f.Z = n.Pt.Z), (c = n.Pt.X > s.Pt.X))
								: o.Pt.X >= d && o.Pt.X <= p
								? ((f.X = o.Pt.X), (f.Y = o.Pt.Y), r.use_xyz && (f.Z = o.Pt.Z), (c = o.Pt.X > a.Pt.X))
								: s.Pt.X >= d && s.Pt.X <= p
								? ((f.X = s.Pt.X), (f.Y = s.Pt.Y), r.use_xyz && (f.Z = s.Pt.Z), (c = s.Pt.X > n.Pt.X))
								: ((f.X = a.Pt.X), (f.Y = a.Pt.Y), r.use_xyz && (f.Z = a.Pt.Z), (c = a.Pt.X > o.Pt.X)),
							(t.OutPt1 = n),
							(t.OutPt2 = o),
							this.JoinHorz(n, s, o, a, f, c)
						)
					}
					for (s = n.Next; r.IntPoint.op_Equality(s.Pt, n.Pt) && s !== n; ) s = s.Next
					var m = s.Pt.Y > n.Pt.Y || !r.ClipperBase.SlopesEqual4(n.Pt, s.Pt, t.OffPt, this.m_UseFullRange)
					if (m) {
						for (s = n.Prev; r.IntPoint.op_Equality(s.Pt, n.Pt) && s !== n; ) s = s.Prev
						if (s.Pt.Y > n.Pt.Y || !r.ClipperBase.SlopesEqual4(n.Pt, s.Pt, t.OffPt, this.m_UseFullRange)) return !1
					}
					for (a = o.Next; r.IntPoint.op_Equality(a.Pt, o.Pt) && a !== o; ) a = a.Next
					var g = a.Pt.Y > o.Pt.Y || !r.ClipperBase.SlopesEqual4(o.Pt, a.Pt, t.OffPt, this.m_UseFullRange)
					if (g) {
						for (a = o.Prev; r.IntPoint.op_Equality(a.Pt, o.Pt) && a !== o; ) a = a.Prev
						if (a.Pt.Y > o.Pt.Y || !r.ClipperBase.SlopesEqual4(o.Pt, a.Pt, t.OffPt, this.m_UseFullRange)) return !1
					}
					return (
						s !== n &&
						a !== o &&
						s !== a &&
						(e !== i || m !== g) &&
						(m
							? ((s = this.DupOutPt(n, !1)),
							  (a = this.DupOutPt(o, !0)),
							  (n.Prev = o),
							  (o.Next = n),
							  (s.Next = a),
							  (a.Prev = s),
							  (t.OutPt1 = n),
							  (t.OutPt2 = s),
							  !0)
							: ((s = this.DupOutPt(n, !0)),
							  (a = this.DupOutPt(o, !1)),
							  (n.Next = o),
							  (o.Prev = n),
							  (s.Prev = a),
							  (a.Next = s),
							  (t.OutPt1 = n),
							  (t.OutPt2 = s),
							  !0))
					)
				}),
				(r.Clipper.GetBounds = function (t) {
					for (var e = 0, i = t.length; e < i && 0 === t[e].length; ) e++
					if (e === i) return new r.IntRect(0, 0, 0, 0)
					var n = new r.IntRect()
					for (n.left = t[e][0].X, n.right = n.left, n.top = t[e][0].Y, n.bottom = n.top; e < i; e++)
						for (var s = 0, o = t[e].length; s < o; s++)
							t[e][s].X < n.left ? (n.left = t[e][s].X) : t[e][s].X > n.right && (n.right = t[e][s].X),
								t[e][s].Y < n.top ? (n.top = t[e][s].Y) : t[e][s].Y > n.bottom && (n.bottom = t[e][s].Y)
					return n
				}),
				(r.Clipper.prototype.GetBounds2 = function (t) {
					var e = t,
						i = new r.IntRect()
					for (i.left = t.Pt.X, i.right = t.Pt.X, i.top = t.Pt.Y, i.bottom = t.Pt.Y, t = t.Next; t !== e; )
						t.Pt.X < i.left && (i.left = t.Pt.X),
							t.Pt.X > i.right && (i.right = t.Pt.X),
							t.Pt.Y < i.top && (i.top = t.Pt.Y),
							t.Pt.Y > i.bottom && (i.bottom = t.Pt.Y),
							(t = t.Next)
					return i
				}),
				(r.Clipper.PointInPolygon = function (t, e) {
					var r = 0,
						i = e.length
					if (i < 3) return 0
					for (var n = e[0], s = 1; s <= i; ++s) {
						var o = s === i ? e[0] : e[s]
						if (o.Y === t.Y && (o.X === t.X || (n.Y === t.Y && o.X > t.X == n.X < t.X))) return -1
						if (n.Y < t.Y != o.Y < t.Y)
							if (n.X >= t.X)
								if (o.X > t.X) r = 1 - r
								else {
									if (0 === (a = (n.X - t.X) * (o.Y - t.Y) - (o.X - t.X) * (n.Y - t.Y))) return -1
									a > 0 == o.Y > n.Y && (r = 1 - r)
								}
							else if (o.X > t.X) {
								var a
								if (0 === (a = (n.X - t.X) * (o.Y - t.Y) - (o.X - t.X) * (n.Y - t.Y))) return -1
								a > 0 == o.Y > n.Y && (r = 1 - r)
							}
						n = o
					}
					return r
				}),
				(r.Clipper.prototype.PointInPolygon = function (t, e) {
					var r = 0,
						i = e,
						n = t.X,
						s = t.Y,
						o = e.Pt.X,
						a = e.Pt.Y
					do {
						var l = (e = e.Next).Pt.X,
							h = e.Pt.Y
						if (h === s && (l === n || (a === s && l > n == o < n))) return -1
						if (a < s != h < s)
							if (o >= n)
								if (l > n) r = 1 - r
								else {
									if (0 === (u = (o - n) * (h - s) - (l - n) * (a - s))) return -1
									u > 0 == h > a && (r = 1 - r)
								}
							else if (l > n) {
								var u
								if (0 === (u = (o - n) * (h - s) - (l - n) * (a - s))) return -1
								u > 0 == h > a && (r = 1 - r)
							}
						;(o = l), (a = h)
					} while (i !== e)
					return r
				}),
				(r.Clipper.prototype.Poly2ContainsPoly1 = function (t, e) {
					var r = t
					do {
						var i = this.PointInPolygon(r.Pt, e)
						if (i >= 0) return i > 0
						r = r.Next
					} while (r !== t)
					return !0
				}),
				(r.Clipper.prototype.FixupFirstLefts1 = function (t, e) {
					for (var i, n, s = 0, o = this.m_PolyOuts.length; s < o; s++)
						(i = this.m_PolyOuts[s]),
							(n = r.Clipper.ParseFirstLeft(i.FirstLeft)),
							null !== i.Pts && n === t && this.Poly2ContainsPoly1(i.Pts, e.Pts) && (i.FirstLeft = e)
				}),
				(r.Clipper.prototype.FixupFirstLefts2 = function (t, e) {
					for (var i, n, s = e.FirstLeft, o = 0, a = this.m_PolyOuts.length; o < a; o++)
						null !== (i = this.m_PolyOuts[o]).Pts &&
							i !== e &&
							i !== t &&
							(((n = r.Clipper.ParseFirstLeft(i.FirstLeft)) !== s && n !== t && n !== e) ||
								(this.Poly2ContainsPoly1(i.Pts, t.Pts)
									? (i.FirstLeft = t)
									: this.Poly2ContainsPoly1(i.Pts, e.Pts)
									? (i.FirstLeft = e)
									: (i.FirstLeft !== t && i.FirstLeft !== e) || (i.FirstLeft = s)))
				}),
				(r.Clipper.prototype.FixupFirstLefts3 = function (t, e) {
					for (var i, n, s = 0, o = this.m_PolyOuts.length; s < o; s++)
						(i = this.m_PolyOuts[s]),
							(n = r.Clipper.ParseFirstLeft(i.FirstLeft)),
							null !== i.Pts && n === t && (i.FirstLeft = e)
				}),
				(r.Clipper.ParseFirstLeft = function (t) {
					for (; null !== t && null === t.Pts; ) t = t.FirstLeft
					return t
				}),
				(r.Clipper.prototype.JoinCommonEdges = function () {
					for (var t = 0, e = this.m_Joins.length; t < e; t++) {
						var r,
							i = this.m_Joins[t],
							n = this.GetOutRec(i.OutPt1.Idx),
							s = this.GetOutRec(i.OutPt2.Idx)
						if (null !== n.Pts && null !== s.Pts)
							if (!n.IsOpen && !s.IsOpen)
								(r =
									n === s
										? n
										: this.OutRec1RightOfOutRec2(n, s)
										? s
										: this.OutRec1RightOfOutRec2(s, n)
										? n
										: this.GetLowermostRec(n, s)),
									this.JoinPoints(i, n, s) &&
										(n === s
											? ((n.Pts = i.OutPt1),
											  (n.BottomPt = null),
											  ((s = this.CreateOutRec()).Pts = i.OutPt2),
											  this.UpdateOutPtIdxs(s),
											  this.Poly2ContainsPoly1(s.Pts, n.Pts)
													? ((s.IsHole = !n.IsHole),
													  (s.FirstLeft = n),
													  this.m_UsingPolyTree && this.FixupFirstLefts2(s, n),
													  (s.IsHole ^ this.ReverseSolution) == this.Area$1(s) > 0 && this.ReversePolyPtLinks(s.Pts))
													: this.Poly2ContainsPoly1(n.Pts, s.Pts)
													? ((s.IsHole = n.IsHole),
													  (n.IsHole = !s.IsHole),
													  (s.FirstLeft = n.FirstLeft),
													  (n.FirstLeft = s),
													  this.m_UsingPolyTree && this.FixupFirstLefts2(n, s),
													  (n.IsHole ^ this.ReverseSolution) == this.Area$1(n) > 0 && this.ReversePolyPtLinks(n.Pts))
													: ((s.IsHole = n.IsHole),
													  (s.FirstLeft = n.FirstLeft),
													  this.m_UsingPolyTree && this.FixupFirstLefts1(n, s)))
											: ((s.Pts = null),
											  (s.BottomPt = null),
											  (s.Idx = n.Idx),
											  (n.IsHole = r.IsHole),
											  r === s && (n.FirstLeft = s.FirstLeft),
											  (s.FirstLeft = n),
											  this.m_UsingPolyTree && this.FixupFirstLefts3(s, n)))
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
							i = e.Pts
						if (null !== i && !e.IsOpen)
							do {
								for (var n = i.Next; n !== e.Pts; ) {
									if (r.IntPoint.op_Equality(i.Pt, n.Pt) && n.Next !== i && n.Prev !== i) {
										var s = i.Prev,
											o = n.Prev
										;(i.Prev = o), (o.Next = i), (n.Prev = s), (s.Next = n), (e.Pts = i)
										var a = this.CreateOutRec()
										;(a.Pts = n),
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
											(n = i)
									}
									n = n.Next
								}
								i = i.Next
							} while (i !== e.Pts)
					}
				}),
				(r.Clipper.Area = function (t) {
					if (!Array.isArray(t)) return 0
					var e = t.length
					if (e < 3) return 0
					for (var r = 0, i = 0, n = e - 1; i < e; ++i) (r += (t[n].X + t[i].X) * (t[n].Y - t[i].Y)), (n = i)
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
					var i = new Array(),
						n = new r.Clipper(0)
					return (
						(n.StrictlySimple = !0), n.AddPath(t, r.PolyType.ptSubject, !0), n.Execute(r.ClipType.ctUnion, i, e, e), i
					)
				}),
				(r.Clipper.SimplifyPolygons = function (t, e) {
					void 0 === e && (e = r.PolyFillType.pftEvenOdd)
					var i = new Array(),
						n = new r.Clipper(0)
					return (
						(n.StrictlySimple = !0), n.AddPaths(t, r.PolyType.ptSubject, !0), n.Execute(r.ClipType.ctUnion, i, e, e), i
					)
				}),
				(r.Clipper.DistanceSqrd = function (t, e) {
					var r = t.X - e.X,
						i = t.Y - e.Y
					return r * r + i * i
				}),
				(r.Clipper.DistanceFromLineSqrd = function (t, e, r) {
					var i = e.Y - r.Y,
						n = r.X - e.X,
						s = i * e.X + n * e.Y
					return ((s = i * t.X + n * t.Y - s) * s) / (i * i + n * n)
				}),
				(r.Clipper.SlopesNearCollinear = function (t, e, i, n) {
					return Math.abs(t.X - e.X) > Math.abs(t.Y - e.Y)
						? t.X > e.X == t.X < i.X
							? r.Clipper.DistanceFromLineSqrd(t, e, i) < n
							: e.X > t.X == e.X < i.X
							? r.Clipper.DistanceFromLineSqrd(e, t, i) < n
							: r.Clipper.DistanceFromLineSqrd(i, t, e) < n
						: t.Y > e.Y == t.Y < i.Y
						? r.Clipper.DistanceFromLineSqrd(t, e, i) < n
						: e.Y > t.Y == e.Y < i.Y
						? r.Clipper.DistanceFromLineSqrd(e, t, i) < n
						: r.Clipper.DistanceFromLineSqrd(i, t, e) < n
				}),
				(r.Clipper.PointsAreClose = function (t, e, r) {
					var i = t.X - e.X,
						n = t.Y - e.Y
					return i * i + n * n <= r
				}),
				(r.Clipper.ExcludeOp = function (t) {
					var e = t.Prev
					return (e.Next = t.Next), (t.Next.Prev = e), (e.Idx = 0), e
				}),
				(r.Clipper.CleanPolygon = function (t, e) {
					void 0 === e && (e = 1.415)
					var i = t.length
					if (0 === i) return new Array()
					for (var n = new Array(i), s = 0; s < i; ++s) n[s] = new r.OutPt()
					for (s = 0; s < i; ++s)
						(n[s].Pt = t[s]), (n[s].Next = n[(s + 1) % i]), (n[s].Next.Prev = n[s]), (n[s].Idx = 0)
					for (var o = e * e, a = n[0]; 0 === a.Idx && a.Next !== a.Prev; )
						r.Clipper.PointsAreClose(a.Pt, a.Prev.Pt, o)
							? ((a = r.Clipper.ExcludeOp(a)), i--)
							: r.Clipper.PointsAreClose(a.Prev.Pt, a.Next.Pt, o)
							? (r.Clipper.ExcludeOp(a.Next), (a = r.Clipper.ExcludeOp(a)), (i -= 2))
							: r.Clipper.SlopesNearCollinear(a.Prev.Pt, a.Pt, a.Next.Pt, o)
							? ((a = r.Clipper.ExcludeOp(a)), i--)
							: ((a.Idx = 1), (a = a.Next))
					i < 3 && (i = 0)
					var l = new Array(i)
					for (s = 0; s < i; ++s) (l[s] = new r.IntPoint1(a.Pt)), (a = a.Next)
					return (n = null), l
				}),
				(r.Clipper.CleanPolygons = function (t, e) {
					for (var i = new Array(t.length), n = 0, s = t.length; n < s; n++) i[n] = r.Clipper.CleanPolygon(t[n], e)
					return i
				}),
				(r.Clipper.Minkowski = function (t, e, i, n) {
					var s = n ? 1 : 0,
						o = t.length,
						a = e.length,
						l = new Array()
					if (i)
						for (var h = 0; h < a; h++) {
							for (var u = new Array(o), c = 0, d = t.length, p = t[c]; c < d; p = t[++c])
								u[c] = new r.IntPoint2(e[h].X + p.X, e[h].Y + p.Y)
							l.push(u)
						}
					else
						for (h = 0; h < a; h++) {
							for (u = new Array(o), c = 0, d = t.length, p = t[c]; c < d; p = t[++c])
								u[c] = new r.IntPoint2(e[h].X - p.X, e[h].Y - p.Y)
							l.push(u)
						}
					var f = new Array()
					for (h = 0; h < a - 1 + s; h++)
						for (c = 0; c < o; c++) {
							var m = new Array()
							m.push(l[h % a][c % o]),
								m.push(l[(h + 1) % a][c % o]),
								m.push(l[(h + 1) % a][(c + 1) % o]),
								m.push(l[h % a][(c + 1) % o]),
								r.Clipper.Orientation(m) || m.reverse(),
								f.push(m)
						}
					return f
				}),
				(r.Clipper.MinkowskiSum = function (t, e, i) {
					if (e[0] instanceof Array) {
						h = e
						for (var n = new r.Paths(), s = ((a = new r.Clipper()), 0); s < h.length; ++s) {
							var o = r.Clipper.Minkowski(t, h[s], !0, i)
							if ((a.AddPaths(o, r.PolyType.ptSubject, !0), i)) {
								l = r.Clipper.TranslatePath(h[s], t[0])
								a.AddPath(l, r.PolyType.ptClip, !0)
							}
						}
						return a.Execute(r.ClipType.ctUnion, n, r.PolyFillType.pftNonZero, r.PolyFillType.pftNonZero), n
					}
					var a,
						l = e,
						h = r.Clipper.Minkowski(t, l, !0, i)
					return (
						(a = new r.Clipper()).AddPaths(h, r.PolyType.ptSubject, !0),
						a.Execute(r.ClipType.ctUnion, h, r.PolyFillType.pftNonZero, r.PolyFillType.pftNonZero),
						h
					)
				}),
				(r.Clipper.TranslatePath = function (t, e) {
					for (var i = new r.Path(), n = 0; n < t.length; n++) i.push(new r.IntPoint2(t[n].X + e.X, t[n].Y + e.Y))
					return i
				}),
				(r.Clipper.MinkowskiDiff = function (t, e) {
					var i = r.Clipper.Minkowski(t, e, !1, !0),
						n = new r.Clipper()
					return (
						n.AddPaths(i, r.PolyType.ptSubject, !0),
						n.Execute(r.ClipType.ctUnion, i, r.PolyFillType.pftNonZero, r.PolyFillType.pftNonZero),
						i
					)
				}),
				(r.Clipper.PolyTreeToPaths = function (t) {
					var e = new Array()
					return r.Clipper.AddPolyNodeToPaths(t, r.Clipper.NodeType.ntAny, e), e
				}),
				(r.Clipper.AddPolyNodeToPaths = function (t, e, i) {
					var n = !0
					switch (e) {
						case r.Clipper.NodeType.ntOpen:
							return
						case r.Clipper.NodeType.ntClosed:
							n = !t.IsOpen
					}
					t.m_polygon.length > 0 && n && i.push(t.m_polygon)
					for (var s = 0, o = t.Childs(), a = o.length, l = o[s]; s < a; l = o[++s])
						r.Clipper.AddPolyNodeToPaths(l, e, i)
				}),
				(r.Clipper.OpenPathsFromPolyTree = function (t) {
					for (var e = new r.Paths(), i = 0, n = t.ChildCount(); i < n; i++)
						t.Childs()[i].IsOpen && e.push(t.Childs()[i].m_polygon)
					return e
				}),
				(r.Clipper.ClosedPathsFromPolyTree = function (t) {
					var e = new r.Paths()
					return r.Clipper.AddPolyNodeToPaths(t, r.Clipper.NodeType.ntClosed, e), e
				}),
				O(r.Clipper, r.ClipperBase),
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
				(r.ClipperOffset.prototype.AddPath = function (t, e, i) {
					var n = t.length - 1
					if (!(n < 0)) {
						var s = new r.PolyNode()
						if (
							((s.m_jointype = e), (s.m_endtype = i), i === r.EndType.etClosedLine || i === r.EndType.etClosedPolygon)
						)
							for (; n > 0 && r.IntPoint.op_Equality(t[0], t[n]); ) n--
						s.m_polygon.push(t[0])
						for (var o = 0, a = 0, l = 1; l <= n; l++)
							r.IntPoint.op_Inequality(s.m_polygon[o], t[l]) &&
								(o++,
								s.m_polygon.push(t[l]),
								(t[l].Y > s.m_polygon[a].Y || (t[l].Y === s.m_polygon[a].Y && t[l].X < s.m_polygon[a].X)) && (a = o))
						if (
							!(i === r.EndType.etClosedPolygon && o < 2) &&
							(this.m_polyNodes.AddChild(s), i === r.EndType.etClosedPolygon)
						)
							if (this.m_lowest.X < 0) this.m_lowest = new r.IntPoint2(this.m_polyNodes.ChildCount() - 1, a)
							else {
								var h = this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon[this.m_lowest.Y]
								;(s.m_polygon[a].Y > h.Y || (s.m_polygon[a].Y === h.Y && s.m_polygon[a].X < h.X)) &&
									(this.m_lowest = new r.IntPoint2(this.m_polyNodes.ChildCount() - 1, a))
							}
					}
				}),
				(r.ClipperOffset.prototype.AddPaths = function (t, e, r) {
					for (var i = 0, n = t.length; i < n; i++) this.AddPath(t[i], e, r)
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
					var i = e.X - t.X,
						n = e.Y - t.Y
					if (0 === i && 0 === n) return new r.DoublePoint2(0, 0)
					var s = 1 / Math.sqrt(i * i + n * n)
					return (i *= s), (n *= s), new r.DoublePoint2(n, -i)
				}),
				(r.ClipperOffset.prototype.DoOffset = function (t) {
					if (((this.m_destPolys = new Array()), (this.m_delta = t), r.ClipperBase.near_zero(t)))
						for (var e = 0; e < this.m_polyNodes.ChildCount(); e++) {
							;(s = this.m_polyNodes.Childs()[e]).m_endtype === r.EndType.etClosedPolygon &&
								this.m_destPolys.push(s.m_polygon)
						}
					else {
						var i
						this.MiterLimit > 2 ? (this.m_miterLim = 2 / (this.MiterLimit * this.MiterLimit)) : (this.m_miterLim = 0.5),
							(i =
								this.ArcTolerance <= 0
									? r.ClipperOffset.def_arc_tolerance
									: this.ArcTolerance > Math.abs(t) * r.ClipperOffset.def_arc_tolerance
									? Math.abs(t) * r.ClipperOffset.def_arc_tolerance
									: this.ArcTolerance)
						var n = 3.14159265358979 / Math.acos(1 - i / Math.abs(t))
						;(this.m_sin = Math.sin(r.ClipperOffset.two_pi / n)),
							(this.m_cos = Math.cos(r.ClipperOffset.two_pi / n)),
							(this.m_StepsPerRad = n / r.ClipperOffset.two_pi),
							t < 0 && (this.m_sin = -this.m_sin)
						for (e = 0; e < this.m_polyNodes.ChildCount(); e++) {
							var s = this.m_polyNodes.Childs()[e]
							this.m_srcPoly = s.m_polygon
							var o = this.m_srcPoly.length
							if (!(0 === o || (t <= 0 && (o < 3 || s.m_endtype !== r.EndType.etClosedPolygon))))
								if (((this.m_destPoly = new Array()), 1 !== o)) {
									this.m_normals.length = 0
									for (d = 0; d < o - 1; d++)
										this.m_normals.push(r.ClipperOffset.GetUnitNormal(this.m_srcPoly[d], this.m_srcPoly[d + 1]))
									if (
										(s.m_endtype === r.EndType.etClosedLine || s.m_endtype === r.EndType.etClosedPolygon
											? this.m_normals.push(r.ClipperOffset.GetUnitNormal(this.m_srcPoly[o - 1], this.m_srcPoly[0]))
											: this.m_normals.push(new r.DoublePoint1(this.m_normals[o - 2])),
										s.m_endtype === r.EndType.etClosedPolygon)
									) {
										var a = o - 1
										for (d = 0; d < o; d++) a = this.OffsetPoint(d, a, s.m_jointype)
										this.m_destPolys.push(this.m_destPoly)
									} else if (s.m_endtype === r.EndType.etClosedLine) {
										for (a = o - 1, d = 0; d < o; d++) a = this.OffsetPoint(d, a, s.m_jointype)
										this.m_destPolys.push(this.m_destPoly), (this.m_destPoly = new Array())
										var l = this.m_normals[o - 1]
										for (d = o - 1; d > 0; d--)
											this.m_normals[d] = new r.DoublePoint2(-this.m_normals[d - 1].X, -this.m_normals[d - 1].Y)
										;(this.m_normals[0] = new r.DoublePoint2(-l.X, -l.Y)), (a = 0)
										for (d = o - 1; d >= 0; d--) a = this.OffsetPoint(d, a, s.m_jointype)
										this.m_destPolys.push(this.m_destPoly)
									} else {
										var h
										for (a = 0, d = 1; d < o - 1; ++d) a = this.OffsetPoint(d, a, s.m_jointype)
										if (s.m_endtype === r.EndType.etOpenButt) {
											d = o - 1
											;(h = new r.IntPoint2(
												r.ClipperOffset.Round(this.m_srcPoly[d].X + this.m_normals[d].X * t),
												r.ClipperOffset.Round(this.m_srcPoly[d].Y + this.m_normals[d].Y * t)
											)),
												this.m_destPoly.push(h),
												(h = new r.IntPoint2(
													r.ClipperOffset.Round(this.m_srcPoly[d].X - this.m_normals[d].X * t),
													r.ClipperOffset.Round(this.m_srcPoly[d].Y - this.m_normals[d].Y * t)
												)),
												this.m_destPoly.push(h)
										} else {
											d = o - 1
											;(a = o - 2),
												(this.m_sinA = 0),
												(this.m_normals[d] = new r.DoublePoint2(-this.m_normals[d].X, -this.m_normals[d].Y)),
												s.m_endtype === r.EndType.etOpenSquare ? this.DoSquare(d, a) : this.DoRound(d, a)
										}
										for (d = o - 1; d > 0; d--)
											this.m_normals[d] = new r.DoublePoint2(-this.m_normals[d - 1].X, -this.m_normals[d - 1].Y)
										this.m_normals[0] = new r.DoublePoint2(-this.m_normals[1].X, -this.m_normals[1].Y)
										for (d = (a = o - 1) - 1; d > 0; --d) a = this.OffsetPoint(d, a, s.m_jointype)
										s.m_endtype === r.EndType.etOpenButt
											? ((h = new r.IntPoint2(
													r.ClipperOffset.Round(this.m_srcPoly[0].X - this.m_normals[0].X * t),
													r.ClipperOffset.Round(this.m_srcPoly[0].Y - this.m_normals[0].Y * t)
											  )),
											  this.m_destPoly.push(h),
											  (h = new r.IntPoint2(
													r.ClipperOffset.Round(this.m_srcPoly[0].X + this.m_normals[0].X * t),
													r.ClipperOffset.Round(this.m_srcPoly[0].Y + this.m_normals[0].Y * t)
											  )),
											  this.m_destPoly.push(h))
											: ((a = 1),
											  (this.m_sinA = 0),
											  s.m_endtype === r.EndType.etOpenSquare ? this.DoSquare(0, 1) : this.DoRound(0, 1)),
											this.m_destPolys.push(this.m_destPoly)
									}
								} else {
									if (s.m_jointype === r.JoinType.jtRound)
										for (var u = 1, c = 0, d = 1; d <= n; d++) {
											this.m_destPoly.push(
												new r.IntPoint2(
													r.ClipperOffset.Round(this.m_srcPoly[0].X + u * t),
													r.ClipperOffset.Round(this.m_srcPoly[0].Y + c * t)
												)
											)
											var p = u
											;(u = u * this.m_cos - this.m_sin * c), (c = p * this.m_sin + c * this.m_cos)
										}
									else {
										;(u = -1), (c = -1)
										for (var d = 0; d < 4; ++d)
											this.m_destPoly.push(
												new r.IntPoint2(
													r.ClipperOffset.Round(this.m_srcPoly[0].X + u * t),
													r.ClipperOffset.Round(this.m_srcPoly[0].Y + c * t)
												)
											),
												u < 0 ? (u = 1) : c < 0 ? (c = 1) : (u = -1)
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
							h = r.Clipper.GetBounds(this.m_destPolys)
							if (
								((l = new r.Path()).push(new r.IntPoint2(h.left - 10, h.bottom + 10)),
								l.push(new r.IntPoint2(h.right + 10, h.bottom + 10)),
								l.push(new r.IntPoint2(h.right + 10, h.top - 10)),
								l.push(new r.IntPoint2(h.left - 10, h.top - 10)),
								s.AddPath(l, r.PolyType.ptSubject, !0),
								(s.ReverseSolution = !0),
								s.Execute(r.ClipType.ctUnion, o, r.PolyFillType.pftNegative, r.PolyFillType.pftNegative),
								1 === o.ChildCount() && o.Childs()[0].ChildCount() > 0)
							) {
								var i = o.Childs()[0]
								;(o.Childs()[0] = i.Childs()[0]), (o.Childs()[0].m_Parent = o)
								for (var n = 1; n < i.ChildCount(); n++) o.AddChild(i.Childs()[n])
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
								h = r.Clipper.GetBounds(this.m_destPolys)
							;(l = new r.Path()).push(new r.IntPoint2(h.left - 10, h.bottom + 10)),
								l.push(new r.IntPoint2(h.right + 10, h.bottom + 10)),
								l.push(new r.IntPoint2(h.right + 10, h.top - 10)),
								l.push(new r.IntPoint2(h.left - 10, h.top - 10)),
								s.AddPath(l, r.PolyType.ptSubject, !0),
								(s.ReverseSolution = !0),
								s.Execute(r.ClipType.ctUnion, o, r.PolyFillType.pftNegative, r.PolyFillType.pftNegative),
								o.length > 0 && o.splice(0, 1)
						}
					}
				}),
				(r.ClipperOffset.prototype.OffsetPoint = function (t, e, i) {
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
						switch (i) {
							case r.JoinType.jtMiter:
								var n = this.m_normals[t].X * this.m_normals[e].X + this.m_normals[t].Y * this.m_normals[e].Y + 1
								n >= this.m_miterLim ? this.DoMiter(t, e, n) : this.DoSquare(t, e)
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
					var i = Math.tan(
						Math.atan2(
							this.m_sinA,
							this.m_normals[e].X * this.m_normals[t].X + this.m_normals[e].Y * this.m_normals[t].Y
						) / 4
					)
					this.m_destPoly.push(
						new r.IntPoint2(
							r.ClipperOffset.Round(
								this.m_srcPoly[t].X + this.m_delta * (this.m_normals[e].X - this.m_normals[e].Y * i)
							),
							r.ClipperOffset.Round(
								this.m_srcPoly[t].Y + this.m_delta * (this.m_normals[e].Y + this.m_normals[e].X * i)
							)
						)
					),
						this.m_destPoly.push(
							new r.IntPoint2(
								r.ClipperOffset.Round(
									this.m_srcPoly[t].X + this.m_delta * (this.m_normals[t].X + this.m_normals[t].Y * i)
								),
								r.ClipperOffset.Round(
									this.m_srcPoly[t].Y + this.m_delta * (this.m_normals[t].Y - this.m_normals[t].X * i)
								)
							)
						)
				}),
				(r.ClipperOffset.prototype.DoMiter = function (t, e, i) {
					var n = this.m_delta / i
					this.m_destPoly.push(
						new r.IntPoint2(
							r.ClipperOffset.Round(this.m_srcPoly[t].X + (this.m_normals[e].X + this.m_normals[t].X) * n),
							r.ClipperOffset.Round(this.m_srcPoly[t].Y + (this.m_normals[e].Y + this.m_normals[t].Y) * n)
						)
					)
				}),
				(r.ClipperOffset.prototype.DoRound = function (t, e) {
					for (
						var i,
							n = Math.atan2(
								this.m_sinA,
								this.m_normals[e].X * this.m_normals[t].X + this.m_normals[e].Y * this.m_normals[t].Y
							),
							s = Math.max(r.Cast_Int32(r.ClipperOffset.Round(this.m_StepsPerRad * Math.abs(n))), 1),
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
							(i = o),
							(o = o * this.m_cos - this.m_sin * a),
							(a = i * this.m_sin + a * this.m_cos)
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
					for (var i = 0, n = 0; n < t.length; n++) i += r.Clipper.Area(t[n])
					return i / (e * e)
				}),
				(r.JS.BoundsOfPath = function (t, e) {
					return r.JS.BoundsOfPaths([t], e)
				}),
				(r.JS.BoundsOfPaths = function (t, e) {
					e || (e = 1)
					var i = r.Clipper.GetBounds(t)
					return (i.left /= e), (i.bottom /= e), (i.right /= e), (i.top /= e), i
				}),
				(r.JS.Clean = function (t, e) {
					if (!(t instanceof Array)) return []
					var i = t[0] instanceof Array
					t = r.JS.Clone(t)
					if ('number' != typeof e || null === e) return r.Error('Delta is not a number in Clean().'), t
					if (0 === t.length || (1 === t.length && 0 === t[0].length) || e < 0) return t
					i || (t = [t])
					for (var n, s, o, a, l, h, u, c = t.length, d = [], p = 0; p < c; p++)
						if (0 !== (n = (s = t[p]).length))
							if (n < 3) (o = s), d.push(o)
							else {
								for (o = s, a = e * e, l = s[0], h = 1, u = 1; u < n; u++)
									(s[u].X - l.X) * (s[u].X - l.X) + (s[u].Y - l.Y) * (s[u].Y - l.Y) <= a ||
										((o[h] = s[u]), (l = s[u]), h++)
								;(l = s[h - 1]),
									(s[0].X - l.X) * (s[0].X - l.X) + (s[0].Y - l.Y) * (s[0].Y - l.Y) <= a && h--,
									h < n && o.splice(h, n - h),
									o.length && d.push(o)
							}
					return !i && d.length ? (d = d[0]) : i || 0 !== d.length ? i && 0 === d.length && (d = [[]]) : (d = []), d
				}),
				(r.JS.Clone = function (t) {
					if (!(t instanceof Array)) return []
					if (0 === t.length) return []
					if (1 === t.length && 0 === t[0].length) return [[]]
					var e = t[0] instanceof Array
					e || (t = [t])
					var r,
						i,
						n,
						s,
						o = t.length,
						a = new Array(o)
					for (i = 0; i < o; i++) {
						for (r = t[i].length, s = new Array(r), n = 0; n < r; n++) s[n] = { X: t[i][n].X, Y: t[i][n].Y }
						a[i] = s
					}
					return e || (a = a[0]), a
				}),
				(r.JS.Lighten = function (t, e) {
					if (!(t instanceof Array)) return []
					if ('number' != typeof e || null === e)
						return r.Error('Tolerance is not a number in Lighten().'), r.JS.Clone(t)
					if (0 === t.length || (1 === t.length && 0 === t[0].length) || e < 0) return r.JS.Clone(t)
					var i,
						n,
						s,
						o,
						a,
						l,
						h,
						u,
						c,
						d,
						p,
						f,
						m,
						g,
						y,
						_,
						v = t[0] instanceof Array
					v || (t = [t])
					var P = t.length,
						b = e * e,
						x = []
					for (i = 0; i < P; i++)
						if (0 !== (l = (s = t[i]).length)) {
							for (o = 0; o < 1e6; o++) {
								for (
									a = [],
										s[(l = s.length) - 1].X !== s[0].X || s[l - 1].Y !== s[0].Y
											? ((p = 1), s.push({ X: s[0].X, Y: s[0].Y }), (l = s.length))
											: (p = 0),
										d = [],
										n = 0;
									n < l - 2;
									n++
								)
									(h = s[n]),
										(c = s[n + 1]),
										(u = s[n + 2]),
										(y = h.X),
										(_ = h.Y),
										(f = u.X - y),
										(m = u.Y - _),
										(0 === f && 0 === m) ||
											((g = ((c.X - y) * f + (c.Y - _) * m) / (f * f + m * m)) > 1
												? ((y = u.X), (_ = u.Y))
												: g > 0 && ((y += f * g), (_ += m * g))),
										(f = c.X - y) * f + (m = c.Y - _) * m <= b && ((d[n + 1] = 1), n++)
								for (a.push({ X: s[0].X, Y: s[0].Y }), n = 1; n < l - 1; n++) d[n] || a.push({ X: s[n].X, Y: s[n].Y })
								if ((a.push({ X: s[l - 1].X, Y: s[l - 1].Y }), p && s.pop(), !d.length)) break
								s = a
							}
							a[(l = a.length) - 1].X === a[0].X && a[l - 1].Y === a[0].Y && a.pop(), a.length > 2 && x.push(a)
						}
					return v || (x = x[0]), void 0 === x && (x = []), x
				}),
				(r.JS.PerimeterOfPath = function (t, e, r) {
					if (void 0 === t) return 0
					var i,
						n,
						s = Math.sqrt,
						o = 0,
						a = 0,
						l = 0,
						h = 0,
						u = 0,
						c = t.length
					if (c < 2) return 0
					for (e && ((t[c] = t[0]), c++); --c; )
						(a = (i = t[c]).X), (l = i.Y), (o += s((a - (h = (n = t[c - 1]).X)) * (a - h) + (l - (u = n.Y)) * (l - u)))
					return e && t.pop(), o / r
				}),
				(r.JS.PerimeterOfPaths = function (t, e, i) {
					i || (i = 1)
					for (var n = 0, s = 0; s < t.length; s++) n += r.JS.PerimeterOfPath(t[s], e, i)
					return n
				}),
				(r.JS.ScaleDownPath = function (t, e) {
					var r, i
					for (e || (e = 1), r = t.length; r--; ) ((i = t[r]).X = i.X / e), (i.Y = i.Y / e)
				}),
				(r.JS.ScaleDownPaths = function (t, e) {
					var r, i, n
					for (e || (e = 1), r = t.length; r--; )
						for (i = t[r].length; i--; ) ((n = t[r][i]).X = n.X / e), (n.Y = n.Y / e)
				}),
				(r.JS.ScaleUpPath = function (t, e) {
					var r,
						i,
						n = Math.round
					for (e || (e = 1), r = t.length; r--; ) ((i = t[r]).X = n(i.X * e)), (i.Y = n(i.Y * e))
				}),
				(r.JS.ScaleUpPaths = function (t, e) {
					var r,
						i,
						n,
						s = Math.round
					for (e || (e = 1), r = t.length; r--; )
						for (i = t[r].length; i--; ) ((n = t[r][i]).X = s(n.X * e)), (n.Y = s(n.Y * e))
				}),
				(r.ExPolygons = function () {
					return []
				}),
				(r.ExPolygon = function () {
					;(this.outer = null), (this.holes = null)
				}),
				(r.JS.AddOuterPolyNodeToExPolygons = function (t, e) {
					var i = new r.ExPolygon()
					i.outer = t.Contour()
					var n,
						s,
						o,
						a,
						l,
						h,
						u = t.Childs(),
						c = u.length
					for (i.holes = new Array(c), o = 0; o < c; o++)
						for (n = u[o], i.holes[o] = n.Contour(), a = 0, h = (l = n.Childs()).length; a < h; a++)
							(s = l[a]), r.JS.AddOuterPolyNodeToExPolygons(s, e)
					e.push(i)
				}),
				(r.JS.ExPolygonsToPaths = function (t) {
					var e,
						i,
						n,
						s,
						o = new r.Paths()
					for (e = 0, n = t.length; e < n; e++)
						for (o.push(t[e].outer), i = 0, s = t[e].holes.length; i < s; i++) o.push(t[e].holes[i])
					return o
				}),
				(r.JS.PolyTreeToExPolygons = function (t) {
					var e,
						i,
						n,
						s,
						o = new r.ExPolygons()
					for (i = 0, s = (n = t.Childs()).length; i < s; i++) (e = n[i]), r.JS.AddOuterPolyNodeToExPolygons(e, o)
					return o
				})
		})()
	},
	4: function (t, e, r) {
		'use strict'
		var i = r(6)
		const n = new Array(4),
			s = (t, e) => t[0] * e[0] + t[1] * e[1],
			o = t => Math.hypot(t[0], t[1]),
			a = (t, e, r) => {
				const i = t[0] - r[0],
					n = t[1] - r[1]
				;(t[0] = i * e[0] + n * e[1] + r[0]), (t[1] = i * e[2] + n * e[3] + r[1])
			},
			l = Array.from([0, 0]),
			h = Array.from([1, 1])
		e.a = {
			create: (t = 0, e) => {
				const r = new Array(2)
				return 'number' == typeof t ? ((r[0] = t), (r[1] = null != e ? e : t)) : ((r[0] = t[0]), (r[1] = t[1])), r
			},
			distance: (t, e) => Math.hypot(e[0] - t[0], e[1] - t[1]),
			dot: s,
			length: o,
			angle: (t, e) => {
				const r = o(t) * o(e)
				return Math.acos(Object(i.b)(-1, 1, r && s(t, e) / r))
			},
			squeezeX: (t, e) => {
				t[1] += t[1] * (t[0] * -e)
			},
			squeezeY: (t, e) => {
				t[0] += t[0] * (t[1] * e)
			},
			skewX: (t, e) => {
				t[0] += Math.tan(e) * t[1]
			},
			skewY: (t, e) => {
				t[1] += Math.tan(e) * t[0]
			},
			rotateX: (t, e, r) => {
				;(n[0] = 1), (n[1] = 0), (n[2] = 0), (n[3] = Math.cos(r)), a(t, n, e)
			},
			rotateY: (t, e, r) => {
				;(n[0] = Math.cos(r)), (n[1] = 0), (n[2] = 0), (n[3] = 1), a(t, n, e)
			},
			rotateZ: (t, e, r) => {
				;(n[0] = Math.cos(r)), (n[1] = -Math.sin(r)), (n[2] = Math.sin(r)), (n[3] = Math.cos(r)), a(t, n, e)
			},
			translate: (t, e) => {
				;(t[0] += e[0]), (t[1] += e[1])
			},
			scale: (t, e) => {
				;(t[0] *= e[0]), (t[1] *= e[1])
			},
			toString: t => `x: ${t[0]}, y: ${t[1]}`,
			ZERO: l,
			ONE: h,
		}
	},
	408: function (t, e, r) {
		'use strict'
		r.r(e)
		var i = r(384),
			n = function (t, e, r, i) {
				return new (r || (r = Promise))(function (n, s) {
					function o(t) {
						try {
							l(i.next(t))
						} catch (t) {
							s(t)
						}
					}
					function a(t) {
						try {
							l(i.throw(t))
						} catch (t) {
							s(t)
						}
					}
					function l(t) {
						var e
						t.done
							? n(t.value)
							: ((e = t.value),
							  e instanceof r
									? e
									: new r(function (t) {
											t(e)
									  })).then(o, a)
					}
					l((i = i.apply(t, e || [])).next())
				})
			}
		const s = new i.a()
		s.attach('event', t => {
			if (t) {
				const e = Object.assign({ type: 'event' }, t)
				self.postMessage(e)
			}
		}),
			(self.onmessage = function (t) {
				return n(this, void 0, void 0, function* () {
					if (t.data) {
						const e = t.data,
							r = yield s.read(e)
						self.postMessage(r)
					}
				})
			})
	},
	410: function (t, e, r) {
		'use strict'
		var i =
				('undefined' != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
				('undefined' != typeof msCrypto &&
					'function' == typeof msCrypto.getRandomValues &&
					msCrypto.getRandomValues.bind(msCrypto)),
			n = new Uint8Array(16)
		function s() {
			if (!i)
				throw new Error(
					'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
				)
			return i(n)
		}
		var o = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i
		for (
			var a = function (t) {
					return 'string' == typeof t && o.test(t)
				},
				l = [],
				h = 0;
			h < 256;
			++h
		)
			l.push((h + 256).toString(16).substr(1))
		var u,
			c,
			d = function (t) {
				var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
					r = (
						l[t[e + 0]] +
						l[t[e + 1]] +
						l[t[e + 2]] +
						l[t[e + 3]] +
						'-' +
						l[t[e + 4]] +
						l[t[e + 5]] +
						'-' +
						l[t[e + 6]] +
						l[t[e + 7]] +
						'-' +
						l[t[e + 8]] +
						l[t[e + 9]] +
						'-' +
						l[t[e + 10]] +
						l[t[e + 11]] +
						l[t[e + 12]] +
						l[t[e + 13]] +
						l[t[e + 14]] +
						l[t[e + 15]]
					).toLowerCase()
				if (!a(r)) throw TypeError('Stringified UUID is invalid')
				return r
			},
			p = 0,
			f = 0
		e.a = function (t, e, r) {
			var i = (e && r) || 0,
				n = e || new Array(16),
				o = (t = t || {}).node || u,
				a = void 0 !== t.clockseq ? t.clockseq : c
			if (null == o || null == a) {
				var l = t.random || (t.rng || s)()
				null == o && (o = u = [1 | l[0], l[1], l[2], l[3], l[4], l[5]]),
					null == a && (a = c = 16383 & ((l[6] << 8) | l[7]))
			}
			var h = void 0 !== t.msecs ? t.msecs : Date.now(),
				m = void 0 !== t.nsecs ? t.nsecs : f + 1,
				g = h - p + (m - f) / 1e4
			if (
				(g < 0 && void 0 === t.clockseq && (a = (a + 1) & 16383),
				(g < 0 || h > p) && void 0 === t.nsecs && (m = 0),
				m >= 1e4)
			)
				throw new Error("uuid.v1(): Can't create more than 10M uuids/sec")
			;(p = h), (f = m), (c = a)
			var y = (1e4 * (268435455 & (h += 122192928e5)) + m) % 4294967296
			;(n[i++] = (y >>> 24) & 255), (n[i++] = (y >>> 16) & 255), (n[i++] = (y >>> 8) & 255), (n[i++] = 255 & y)
			var _ = ((h / 4294967296) * 1e4) & 268435455
			;(n[i++] = (_ >>> 8) & 255),
				(n[i++] = 255 & _),
				(n[i++] = ((_ >>> 24) & 15) | 16),
				(n[i++] = (_ >>> 16) & 255),
				(n[i++] = (a >>> 8) | 128),
				(n[i++] = 255 & a)
			for (var v = 0; v < 6; ++v) n[i + v] = o[v]
			return e || d(n)
		}
	},
	45: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		let i = 0
		;(e.newId = (t = 0) => ++i + t),
			(e.twoDigits = t => (t <= 9 ? '0' : '') + t),
			(e.clamp01 = t => e.clamp(0, 1, t)),
			(e.clamp = (t, e, r) => (r <= t ? t : r >= e ? e : r)),
			(e.relativeClamp = (t, r, i, n, s) => e.clamp(n, s, ((t - r) / (i - r)) * (s - n) + n)),
			(e.fix = (t, e = 20) => +parseFloat(t).toFixed(e)),
			(e.nextNumber = (t, e, r = 1) => (t + r) % e),
			(e.prevNumber = (t, e, r = 1) => ((t -= r) < 0 ? t + e : t) % e),
			(e.randomFloat = (t, e) => Math.random() * (e - t) + t),
			(e.randomInt = (t, e) => Math.trunc(Math.random() * (e - t + 1)) + t),
			(e.lerp = (t, r, i) => t + (r - t) * e.clamp01(i)),
			(e.round = t => ~~(t + 0.5))
	},
	5: function (t, e, r) {
		'use strict'
		var i
		r.d(e, 'a', function () {
			return i
		}),
			(function (t) {
				;(t[(t.None = 0)] = 'None'),
					(t[(t.Scale = 2)] = 'Scale'),
					(t[(t.Center = 4)] = 'Center'),
					(t[(t.Fill = 8)] = 'Fill')
			})(i || (i = {}))
	},
	56: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 }),
			(e.linear = (t, e, r, i) => (r * t) / i + e),
			(e.quadraticIn = (t, e, r, i) => r * (t /= i) * t + e),
			(e.quadraticOut = (t, e, r, i) => -r * (t /= i) * (t - 2) + e),
			(e.quadraticInOut = (t, e, r, i) =>
				(t /= i / 2) < 1 ? (r / 2) * t * t + e : (-r / 2) * (--t * (t - 2) - 1) + e),
			(e.cubicIn = (t, e, r, i) => r * (t /= i) * t * t + e),
			(e.cubicOut = (t, e, r, i) => ((t /= i), r * (--t * t * t + 1) + e)),
			(e.cubicInOut = (t, e, r, i) =>
				(t /= i / 2) < 1 ? (r / 2) * t * t * t + e : (r / 2) * ((t -= 2) * t * t + 2) + e),
			(e.quarticIn = (t, e, r, i) => r * (t /= i) * t * t * t + e),
			(e.quarticOut = (t, e, r, i) => ((t /= i), -r * (--t * t * t * t - 1) + e)),
			(e.quarticInOut = (t, e, r, i) =>
				(t /= i / 2) < 1 ? (r / 2) * t * t * t * t + e : (-r / 2) * ((t -= 2) * t * t * t - 2) + e),
			(e.quinticIn = (t, e, r, i) => r * (t /= i) * t * t * t * t + e),
			(e.quinticOut = (t, e, r, i) => ((t /= i), r * (--t * t * t * t * t + 1) + e)),
			(e.quinticInOut = (t, e, r, i) =>
				(t /= i / 2) < 1 ? (r / 2) * t * t * t * t * t + e : (r / 2) * ((t -= 2) * t * t * t * t + 2) + e),
			(e.sinusoidalIn = (t, e, r, i) => -r * Math.cos((t / i) * (Math.PI / 2)) + r + e),
			(e.sinusoidalOut = (t, e, r, i) => r * Math.sin((t / i) * (Math.PI / 2)) + e),
			(e.sinusoidalInOut = (t, e, r, i) => (-r / 2) * (Math.cos((Math.PI * t) / i) - 1) + e),
			(e.exponentialIn = (t, e, r, i) => r * Math.pow(2, 10 * (t / i - 1)) + e),
			(e.exponentialOut = (t, e, r, i) => r * (1 - Math.pow(2, (-10 * t) / i)) + e),
			(e.exponentialInOut = (t, e, r, i) =>
				(t /= i / 2) < 1 ? (r / 2) * Math.pow(2, 10 * (t - 1)) + e : (t--, (r / 2) * (2 - Math.pow(2, -10 * t)) + e)),
			(e.circularIn = (t, e, r, i) => ((t /= i), -r * (Math.sqrt(1 - t * t) - 1) + e)),
			(e.circularOut = (t, e, r, i) => ((t /= i), t--, r * Math.sqrt(1 - t * t) + e)),
			(e.circularInOut = (t, e, r, i) =>
				(t /= i / 2) < 1
					? (-r / 2) * (Math.sqrt(1 - t * t) - 1) + e
					: ((t -= 2), (r / 2) * (Math.sqrt(1 - t * t) + 1) + e)),
			(e.elasticIn = function (t, e, r, i, n, s) {
				if (0 == t) return e
				if (1 == (t /= i)) return e + r
				if ((s || (s = 0.3 * i), !n || n < Math.abs(r))) {
					n = r
					var o = s / 4
				} else o = (s / (2 * Math.PI)) * Math.asin(r / n)
				return -n * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * i - o) * (2 * Math.PI)) / s) + e
			}),
			(e.elasticOut = function (t, e, r, i, n, s) {
				if (0 == t) return e
				if (1 == (t /= i)) return e + r
				if ((s || (s = 0.3 * i), !n || n < Math.abs(r))) {
					n = r
					var o = s / 4
				} else o = (s / (2 * Math.PI)) * Math.asin(r / n)
				return n * Math.pow(2, -10 * t) * Math.sin(((t * i - o) * (2 * Math.PI)) / s) + r + e
			}),
			(e.elasticBoth = function (t, e, r, i, n, s) {
				if (0 == t) return e
				if (2 == (t /= i / 2)) return e + r
				if ((s || (s = i * (0.3 * 1.5)), !n || n < Math.abs(r))) {
					n = r
					var o = s / 4
				} else o = (s / (2 * Math.PI)) * Math.asin(r / n)
				return t < 1
					? n * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * i - o) * (2 * Math.PI)) / s) * -0.5 + e
					: n * Math.pow(2, -10 * (t -= 1)) * Math.sin(((t * i - o) * (2 * Math.PI)) / s) * 0.5 + r + e
			}),
			(e.backIn = function (t, e, r, i, n) {
				return void 0 === n && (n = 1.70158), r * (t /= i) * t * ((n + 1) * t - n) + e
			}),
			(e.backOut = function (t, e, r, i, n) {
				return void 0 === n && (n = 1.70158), r * ((t = t / i - 1) * t * ((n + 1) * t + n) + 1) + e
			}),
			(e.backBoth = function (t, e, r, i, n) {
				return (
					void 0 === n && (n = 1.70158),
					(t /= i / 2) < 1
						? (r / 2) * (t * t * ((1 + (n *= 1.525)) * t - n)) + e
						: (r / 2) * ((t -= 2) * t * ((1 + (n *= 1.525)) * t + n) + 2) + e
				)
			}),
			(e.bounceIn = function (t, r, i, n) {
				return i - e.bounceOut(n - t, 0, i, n) + r
			}),
			(e.bounceOut = function (t, e, r, i) {
				return (t /= i) < 1 / 2.75
					? r * (7.5625 * t * t) + e
					: t < 2 / 2.75
					? r * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + e
					: t < 2.5 / 2.75
					? r * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + e
					: r * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + e
			}),
			(e.bounceBoth = function (t, r, i, n) {
				return t < n / 2 ? 0.5 * e.bounceIn(2 * t, 0, i, n) + r : 0.5 * e.bounceOut(2 * t - n, 0, i, n) + 0.5 * i + r
			})
	},
	6: function (t, e, r) {
		'use strict'
		r.d(e, 'c', function () {
			return i
		}),
			r.d(e, 'd', function () {
				return n
			}),
			r.d(e, 'a', function () {
				return s
			}),
			r.d(e, 'f', function () {
				return o
			}),
			r.d(e, 'g', function () {
				return a
			}),
			r.d(e, 'b', function () {
				return l
			}),
			r.d(e, 'e', function () {
				return h
			})
		const i = t => null != t,
			n = () => (performance && performance.now ? performance.now() : Date.now()),
			s = (...t) => {
				for (let e = 0; e < t.length; e++) if (i(t[e])) return t[e]
			},
			o = t => (180 * t) / Math.PI,
			a = t => (t * Math.PI) / 180,
			l = (t, e, r) => (r <= t ? t : r >= e ? e : r),
			h = (t, e, r, i, n) => l(i, n, ((t - e) / (r - e)) * (n - i) + i)
	},
	63: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(115)
		e.default = class {
			export() {
				const t = {}
				return (
					this.exportableProperties.forEach(e => {
						t[e] = this['get' + i.ucfirst(e)](!0)
					}),
					t
				)
			}
		}
	},
	64: function (t, e, r) {
		'use strict'
		var i = r(56),
			n = r(84),
			s = r.n(n),
			o = r(2),
			a = r(6)
		class l {
			static bValueAnimation(t) {
				return 'object' == typeof t && t.type && ('simple' === t.type || 'rete' === t.type)
			}
			static composeAnimation(t, e, r) {
				switch (r.type) {
					case 'simple': {
						const i = r.value
						if ('number' == typeof i.from && 'number' == typeof i.to)
							return l.composeSimpleAnimation(i, (r, n) => {
								const s = l.getTransformedValue(
									t,
									e,
									i.invertOdd && r.repetition.current_index % 2 == 1 ? i.to : i.from
								)
								return (
									s +
									n *
										(l.getTransformedValue(t, e, i.invertOdd && r.repetition.current_index % 2 == 1 ? i.from : i.to) -
											s)
								)
							})
						{
							const t = new s.a(i.from),
								e = new s.a(i.to)
							return l.composeSimpleAnimation(i, (r, n) => {
								const s = i.invertOdd && r.repetition.current_index % 2 == 1 ? e : t,
									o = i.invertOdd && r.repetition.current_index % 2 == 1 ? t : e
								return 'hue' == i.colorTransitionMode ? l.interpolateColorHSL(s, o, n) : l.interpolateColorRGB(s, o, n)
							})
						}
					}
					case 'rete': {
						const t = r.value
						return new Function('{ repetition, parent, time, shape, shape_loop, data }', 'return ' + t.raw)
					}
				}
				return () => 0
			}
			static composeSimpleAnimation(t, e) {
				const { durate: r, type: n, mode: s, mode_function: o, delay: a } = t
				return 'static' === n
					? a && a > 0
						? t => e(t, t.time <= a ? 0 : t.time - a >= r ? 1 : i[o](t.time - a, 0, 1, r))
						: t => e(t, t.time <= r ? i[o](t.time, 0, 1, r) : 1)
					: 'loop' === n
					? 'sinusoidal' == s
						? t => {
								const i = (2 * (t.time || 0) * Math.PI) / r
								return e(t, 0.5 + 0.5 * Math[o](i))
						  }
						: t => {
								const n = r / 2,
									s = t.time % r
								return e(t, s <= n ? i[o](s, 0, 1, n) : i[o](n - (s - n), 0, 1, n))
						  }
					: 'sinusoidal' == s
					? t => {
							let i = t.time % (r + a)
							i = i <= a ? 0 : i - a
							const n = (2 * (i || 0) * Math.PI) / r
							return e(t, 0.5 + 0.5 * Math[o](n))
					  }
					: a && a > 0
					? t => {
							const n = t.time % (r + a)
							return e(t, n <= a ? 0 : n - a >= r ? 1 : i[o](n - a, 0, 1, r))
					  }
					: t => {
							const n = t.time % r
							return e(t, n <= r ? i[o](n, 0, 1, r) : 1)
					  }
			}
			static bPropTransformable(t, e) {
				const r = o.a.sceneChildProps[t]
				return r && 'none' !== r.transformation && void 0 !== e && !l.bValueAnimation(e)
			}
			static getTransformedValue(t, e, r) {
				const i = o.a.sceneChildProps[e]
				if (l.bPropTransformable(e, r)) {
					let e
					switch (i.transformation) {
						case 'angle':
							e = a.g
							break
						case 'resolution-based':
							e = t.getValueFromResolution.bind(t)
							break
						case 'resolution-scaled-based':
							e = t.getValueFromResolutionScaled.bind(t)
					}
					return Array.isArray(r) ? [e(r[0]), e(r[1])] : e(r)
				}
				return r
			}
			static getTransformedValueInverse(t, e, r) {
				const i = o.a.sceneChildProps[e]
				if (l.bPropTransformable(e, r)) {
					let e
					switch (i.transformation) {
						case 'angle':
							e = a.f
							break
						case 'resolution-based':
							e = t.getValueFromResolutionScaled.bind(t)
							break
						case 'resolution-scaled-based':
							e = t.getValueFromResolution.bind(t)
					}
					return Array.isArray(r) ? [e(r[0]), e(r[1])] : e(r)
				}
				return r
			}
			static interpolateColorRGB(t, e, r) {
				const i = t.getAlpha(),
					n = e.getAlpha(),
					s = t.getRgb(),
					o = e.getRgb(),
					l = s.r + r * (o.r - s.r),
					h = s.g + r * (o.g - s.g),
					u = s.b + r * (o.b - s.b),
					c = i + r * (n - i)
				return `rgba(${Math.floor(l)},${Math.floor(h)},${Math.floor(u)},${Object(a.b)(0, 1, c)})`
			}
			static interpolateColorHSL(t, e, r) {
				const i = t.getAlpha(),
					n = e.getAlpha(),
					s = t.getHsl(),
					o = e.getHsl(),
					l = s.h + r * (o.h - s.h),
					h = s.s + r * (o.s - s.s),
					u = s.l + r * (o.l - s.l),
					c = i + r * (n - i)
				return `hsla(${Math.floor(360 * l)},${Math.floor(100 * h)}%,${Math.floor(100 * u)}%,${Object(a.b)(0, 1, c)})`
			}
		}
		e.a = l
	},
	65: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(38),
			n = r(45)
		;(e.toInt = t => t.map(t => parseInt(t))),
			(e.toFloat = t => t.map(t => parseFloat(t))),
			(e.hasObjectProperty = (t, r, i) => e.indexOfObjectProperty(t, r, i) >= 0),
			(e.indexOfObjectProperty = (t, e, r) => {
				for (let n = t.length - 1; n >= 0; n--)
					if ('function' == typeof r ? r(i.getProperty(t[n], e, 'Nil'), t[n]) : i.getProperty(t[n], e) === r) return n
				return -1
			}),
			(e.intersect = (t, e) => {
				var r = 0,
					i = 0
				const n = new Array()
				for (; r < t.length && i < e.length; ) t[r] < e[i] ? r++ : (t[r] > e[i] || (n.push(t[r]), r++), i++)
				return n
			}),
			(e.nextElement = (t, e) => t[n.nextNumber(e, t.length)]),
			(e.prevElement = (t, e) => t[n.prevNumber(e, t.length)]),
			(e.randomElement = t => t[n.randomInt(0, t.length - 1)])
	},
	70: function (t, e, r) {
		'use strict'
		var i = r(2)
		class n {
			static export(t, e) {
				return t.getChildren().map(t => n.sceneChildToLayer(t, void 0, 0, e))
			}
			static exportAsScene(t, e) {
				const r = t.getChildren().map(t => n.sceneChildToLayer(t, void 0, 0, e)),
					i = {}
				for (let t = 0, e = r.length; t < e; t++) i[r[t].id] = r[t]
				return i
			}
			static sceneChildToLayer(t, e, r, s) {
				const o = i.b.isAPrimitive(t),
					a = Object.assign({}, t.data)
				return (
					delete a.props,
					{
						type: t.type,
						props: Object.assign(Object.assign({}, t.getProps()), t.data.props),
						id: t.id,
						name: t.name,
						ui: a,
						order: t.order || 0,
						depth: r,
						parent_id: e,
						shape: t.shape instanceof Float32Array ? t.shape : void 0,
						bPrimitive: o,
						children: o ? void 0 : i.b.getChildren(t).map(e => n.sceneChildToLayer(e, t.id, r + 1, s)),
					}
				)
			}
		}
		e.a = n
	},
	71: function (t, e, r) {
		'use strict'
		var i = r(18),
			n = r(410),
			s = r(2)
		class o {
			static import(t, e) {
				const { id: r, name: i, order: n } = t,
					a = t.shape ? Float32Array.from(Object.values(t.shape)) : void 0,
					l = s.b.create(t.type, { id: r, name: i, order: n, shape: a, data: { ui: t.ui } })
				if (l) {
					if (
						(Object.keys(t.props).forEach(r => {
							s.a.setProp(l, r, t.props[r], e)
						}),
						t.children && t.children.length > 0)
					)
						for (let r = 0, i = t.children.length; r < i; r++) {
							const i = o.import(t.children[r], e)
							i && s.b.add(l, i)
						}
					return l
				}
				return console.warn("JSONImporter: can't import", [t]), null
			}
		}
		var a = o,
			l = r(70),
			h = r(3),
			u = r.n(h)
		class c {
			static getInitialProjectState() {
				return {
					id: Object(n.a)(),
					name: '',
					background: u.a.color('dark').toString('hex'),
					mainColor: u.a.color('primary').toString('hex'),
					clearCanvas: !0,
					scene: {},
					ghosts: 0,
					ghost_skip_time: 30,
					history: [],
					ratio: 1,
					sequence: { start: 0, end: 6e3, durate: 6e3, framerate: 60, frames: 360 },
					selected_layers: [],
				}
			}
			static import(t, e) {
				if (!t) return null
				const r = t && t.length > 0 ? JSON.parse(t) : {}
				if (!('scene' in r)) return null
				const n = c.getInitialProjectState(),
					s = {}
				Object.keys(n).forEach(t => {
					var e
					s[t] = null !== (e = r[t]) && void 0 !== e ? e : n[t]
				})
				const o = new i.a({ mainColor: s.mainColor, background: s.background }),
					h = Object.values(s.scene || [])
				for (let t = 0, r = h.length; t < r; t++) {
					const r = a.import(h[t], e)
					r && o.add(r)
				}
				return (s.scene = l.a.exportAsScene(o, e)), { scene: o, project: s }
			}
		}
		e.a = c
	},
	84: function (t, e, r) {
		'use strict'
		Object.defineProperty(e, '__esModule', { value: !0 })
		const i = r(45),
			n = r(65),
			s = r(362),
			o = r(364)
		e.default = class {
			constructor(t) {
				const e = s.default.parse(t)
				;(this.rgb = this.getRgbFromMath(e)),
					(this.hsl = o.default.rgbToHsl(this.rgb)),
					(this.hsv = o.default.rgbToHsv(this.rgb)),
					(this.hex = o.default.rgbToHex(this.rgb)),
					(this.cmyk = o.default.rgbToCmyk(this.rgb)),
					this.setAlpha(['rgba', 'hsla', 'hsva'].indexOf(e.type) >= 0 && e.value.length >= 3 ? e.value[3] : 1)
			}
			setAlpha(t) {
				;(this.alpha = t), (this.alpha = this.alpha > 1 ? this.alpha / 255 : this.alpha)
			}
			getAlpha() {
				return this.alpha
			}
			getRgbFromMath(t) {
				switch (t.type) {
					case 'rgb':
					case 'rgba':
						const e = n.toFloat(t.value)
						return { r: e[0], g: e[1], b: e[2] }
					case 'hsl':
					case 'hsla':
						const r = n.toFloat(t.value)
						return o.default.hslToRgb({ h: r[0], s: r[1], l: r[2] })
					case 'hsv':
					case 'hsva':
						const i = n.toFloat(t.value)
						return o.default.hsvToRgb({ h: i[0], s: i[1], v: i[2] })
					case 'cmyk':
						const s = n.toFloat(t.value)
						return o.default.cmykToRgb({ c: s[0], m: s[1], y: s[2], k: s[3] })
					case 'hex3':
					case 'hex4':
					case 'hex6':
					case 'hex8':
						return o.default.hexToRgb(t.value)
				}
			}
			getRgb() {
				return Object.assign({}, this.rgb)
			}
			getHsl() {
				return Object.assign({}, this.hsl)
			}
			getHsv() {
				return Object.assign({}, this.hsv)
			}
			getCmyk() {
				return Object.assign({}, this.cmyk)
			}
			toString(t, e, r, i, n = !1, s = !1) {
				const o = s ? '%' : ''
				return `${t + (n ? 'a' : '')}(${Math.round(e)}, ${Math.round(r) + o}, ${Math.round(i) + o}${
					n ? ', ' + this.alpha : ''
				})`
			}
			toRGB(t = !1) {
				return this.toString('rgb', this.rgb.r, this.rgb.g, this.rgb.b, t, !1)
			}
			toHSL(t = !1) {
				return this.toString.call(
					this,
					'hsl',
					i.relativeClamp(this.hsl.h, 0, 1, 0, 360),
					100 * this.hsl.s,
					100 * this.hsl.l,
					t,
					!0
				)
			}
			toHSV(t = !1) {
				return this.toString.call(
					this,
					'hsv',
					i.relativeClamp(this.hsv.h, 0, 1, 0, 360),
					100 * this.hsv.s,
					100 * this.hsv.v,
					t,
					!0
				)
			}
			toCMYK() {
				return `cmyk(${i.fix(100 * this.cmyk.c, 2)}%, ${i.fix(100 * this.cmyk.m, 2)}%, ${i.fix(
					100 * this.cmyk.y,
					2
				)}%, ${i.fix(100 * this.cmyk.k, 2)}%)`
			}
			toHEX() {
				return this.hex
			}
			toRGBA() {
				return this.toRGB(!0)
			}
			toHSLA() {
				return this.toHSL(!0)
			}
			toHSVA() {
				return this.toHSV(!0)
			}
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
					for (let r = 0, i = this.callbacks[t].length; r < i && !1 !== this.callbacks[t][r](e); r++);
			}
		}
	},
})
