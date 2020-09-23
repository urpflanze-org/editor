;(window.webpackJsonp = window.webpackJsonp || []).push([
	[3],
	{
		411: function (e, t, n) {
			'use strict'
			var c = n(1),
				s = n(163),
				o = n(3),
				a = n.n(o),
				r = function (e, t) {
					var n = {}
					for (var c in e) Object.prototype.hasOwnProperty.call(e, c) && t.indexOf(c) < 0 && (n[c] = e[c])
					if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
						var s = 0
						for (c = Object.getOwnPropertySymbols(e); s < c.length; s++)
							t.indexOf(c[s]) < 0 && Object.prototype.propertyIsEnumerable.call(e, c[s]) && (n[c[s]] = e[c[s]])
					}
					return n
				}
			const i = s.b.div`
    display: inline-block;
    vertical-align: ${e => e.valign || 'middle'};    
    width: ${e => ('string' == typeof e.size ? e.size : a.a.ms(void 0 !== e.size ? e.size : 1))};
    height: ${e => ('string' == typeof e.size ? e.size : a.a.ms(void 0 !== e.size ? e.size : 1))};
    line-height: ${e => ('string' == typeof e.size ? e.size : a.a.ms(void 0 !== e.size ? e.size : 1))};
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
			t.a = c.memo(e => {
				const { name: t } = e,
					s = r(e, ['name']),
					o = n(417)(`./${t}.svg`).default
				return c.createElement(i, Object.assign({}, s, { dangerouslySetInnerHTML: { __html: o } }))
			})
		},
		413: function (e, t, n) {
			'use strict'
			var c = n(1),
				s = n(163),
				o = n(3),
				a = n.n(o),
				r = n(411)
			const i = s.b.div`
	position: relative;
	width: ${e => e.width};
	border: 1px solid ${a.a.color('gray-dark')};
	border-radius: 2px;
`,
				l = s.b.div`
	padding: 0 ${a.a.ms(-1)};
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
`,
				u = s.b.ul`
	position: absolute;
	z-index: 1;
	width: 100%;
	max-height: 20vh;
	overflow: auto;
	${e => ('top' == e.position ? 'bottom: 100%;' : 'top: 100%; ')}
	border: 1px solid ${a.a.color('gray-dark')};
	display: ${e => (e.open ? 'block' : 'none')};
	list-style: none;
	margin: ${a.a.ms(-2)} 0;
	padding: 0;
	background: ${a.a.color('dark')};
`,
				v = s.b.li`
	padding: 0 ${a.a.ms(-1)};
	cursor: pointer;
	background: ${e => (e.selected ? a.a.color('primary') : null)};

	&:hover {
		background: ${e => (e.selected ? null : a.a.color('dark').lighten(5))};
	}
`
			t.a = c.memo(e => {
				const [t, n] = c.useState(!1)
				return (
					c.useEffect(() => {
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
					c.createElement(
						i,
						{ width: e.width },
						c.createElement(
							l,
							{ onClick: () => n(!0) },
							c.createElement(
								'span',
								null,
								e.value
									? (function () {
											for (let t = 0, n = e.options.length; t < n; t++)
												if (e.options[t].value == e.value) return e.options[t].key
									  })()
									: c.createElement('i', null, e.placeholder)
							),
							c.createElement(r.a, {
								rotate: 90,
								style: { transform: `scale(${(t ? -1 : 1) * ('top' == e.position ? -1 : 1)})` },
								name: 'arrow-right',
							})
						),
						c.createElement(
							u,
							{ position: e.position || 'bottom', open: t },
							e.options.map(t =>
								c.createElement(
									v,
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
		414: function (e, t, n) {
			'use strict'
			n.d(t, 'a', function () {
				return s
			}),
				n.d(t, 'd', function () {
					return o
				}),
				n.d(t, 'e', function () {
					return a
				}),
				n.d(t, 'b', function () {
					return i
				}),
				n.d(t, 'c', function () {
					return l
				})
			var c = n(412)
			const s = new c.c.Socket('Number'),
				o = new c.c.Socket('Variable'),
				a = new c.c.Socket('Vector2'),
				r = (new c.c.Socket('Boolean'), new c.c.Socket('Any')),
				i = new c.c.Socket('NumberOrVariable'),
				l = new c.c.Socket('NumberOrVariableOrVector')
			s.combineWith(r),
				o.combineWith(r),
				a.combineWith(r),
				s.combineWith(i),
				o.combineWith(i),
				s.combineWith(l),
				o.combineWith(l),
				a.combineWith(l),
				i.combineWith(l)
		},
		415: function (e, t, n) {
			'use strict'
			var c = n(1)
			t.a = function (e = null) {
				const t = c.useRef(e),
					n = c.useCallback(e => {
						t.current, (t.current = e)
					}, [])
				return [t, n]
			}
		},
		416: function (e, t, n) {
			'use strict'
			var c = n(1),
				s = n(412)
			class o extends s.c.Control {
				constructor(e, t, n, s = !1) {
					super(t),
						(this.emitter = e),
						(this.key = t),
						(this.component = ({ value: e, onChange: t }) =>
							c.createElement('input', {
								type: 'number',
								value: e,
								ref: e => {
									e && e.addEventListener('pointerdown', e => e.stopPropagation())
								},
								onChange: e => t(+e.target.value),
							}))
					const o = n.data[t] || 0
					;(n.data[t] = o),
						(this.props = {
							readonly: s,
							value: o,
							onChange: e => {
								this.setValue(e), this.emitter.trigger('process')
							},
						})
				}
				setValue(e) {
					;(this.props.value = e), this.putData(this.key, e), this.update()
				}
			}
			t.a = o
		},
		417: function (e, t, n) {
			var c = {
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
			function s(e) {
				var t = o(e)
				return n(t)
			}
			function o(e) {
				if (!n.o(c, e)) {
					var t = new Error("Cannot find module '" + e + "'")
					throw ((t.code = 'MODULE_NOT_FOUND'), t)
				}
				return c[e]
			}
			;(s.keys = function () {
				return Object.keys(c)
			}),
				(s.resolve = o),
				(e.exports = s),
				(s.id = 417)
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
		463: function (e, t, n) {
			'use strict'
			var c = n(1),
				s = n(412),
				o = n(65),
				a = n(414)
			class r extends s.c.Control {
				constructor(e, t, n, s, o = s[0].key, a) {
					super(t),
						(this.emitter = e),
						(this.key = t),
						(this.component = ({ value: e, onChange: t }) =>
							c.createElement(
								'select',
								{
									defaultValue: o,
									ref: e => {
										e && e.addEventListener('pointerdown', e => e.stopPropagation())
									},
									onChange: e => t(e.target.value),
								},
								s.map(e => c.createElement('option', { key: e.key, value: e.key }, e.label))
							))
					const r = n.data[t] || o
					;(n.data[t] = r),
						(this.props = {
							value: r,
							onChange: e => {
								this.setValue(e), this.emitter.trigger('process'), a && a(e)
							},
						})
				}
				setValue(e) {
					;(this.props.value = e), this.putData(this.key, e), this.update()
				}
			}
			var i = r,
				l = n(416)
			class u extends s.c.Component {
				constructor(e, t, n = a.b) {
					super(e),
						(this.dynamicFunctions = t),
						(this.outputType = n),
						(this.component = Node),
						(this.maxInputs = Math.max.apply(
							null,
							this.dynamicFunctions.map(e => e.inputs)
						)),
						(this.setInputFromDynamicFunction = this.setInputFromDynamicFunction.bind(this))
				}
				getInputsFromFunctions(e) {
					const t = Object(o.indexOfObjectProperty)(this.dynamicFunctions, 'key', e)
					return t >= 0 ? this.dynamicFunctions[t].inputs : 0
				}
				builder(e) {
					const t = new s.c.Output('result', 'out', this.outputType)
					e.addControl(
						new i(
							this.editor,
							'dynamic_function',
							e,
							this.dynamicFunctions,
							e.data.dynamic_function,
							this.setInputFromDynamicFunction.bind(null, e)
						)
					),
						this.setInputFromDynamicFunction(e, e.data.dynamic_function),
						e.addOutput(t)
				}
				getCurrentDynamicFunction(e) {
					return e.data.dynamic_function && e.data.dynamic_function.length > 0 ? e.data.dynamic_function : null
				}
				setInputFromDynamicFunction(e, t) {
					const n = this.getInputsFromFunctions(t)
					for (let t = 1; t <= this.maxInputs; t++) {
						const c = 'input_' + t
						t <= n ? this.addInput(e, c, ['x', 'y', 'z', 'a', 'b', 'c'][t - 1]) : this.removeInput(e, c)
					}
					e.update()
				}
				addInput(e, t, n) {
					if (!e.inputs.has(t)) {
						const c = new s.c.Input(t, n, a.b)
						c.addControl(new l.a(this.editor, t, e)), e.addInput(c)
					}
				}
				removeInput(e, t) {
					if (e.inputs.has(t)) {
						const n = e.inputs.get(t)
						n.connections.slice().map(this.editor.removeConnection.bind(this.editor)), e.removeInput(n)
					}
				}
				getInputValue(e, t, n) {
					return t[n] && t[n].length > 0 ? t[n][0] : e.data[n]
				}
				code(e, t, n) {}
			}
			t.a = u
		},
		473: function (module, __webpack_exports__, __webpack_require__) {
			'use strict'
			var _DynamicComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(463)
			const MathFunctions = [
				{ key: 'abs', label: 'abs', inputs: 1 },
				{ key: 'sin', label: 'sin', inputs: 1 },
				{ key: 'cos', label: 'cos', inputs: 1 },
				{ key: 'tan', label: 'tan', inputs: 1 },
				{ key: 'atan', label: 'atan', inputs: 1 },
				{ key: 'atan2', label: 'atan2', inputs: 2 },
				{ key: 'ceil', label: 'ceil', inputs: 1 },
				{ key: 'floor', label: 'floor', inputs: 1 },
				{ key: 'log', label: 'log', inputs: 1 },
				{ key: 'min', label: 'min', inputs: 2 },
				{ key: 'max', label: 'max', inputs: 2 },
				{ key: 'pow', label: 'pow', inputs: 2 },
				{ key: 'round', label: 'round', inputs: 1 },
				{ key: 'random', label: 'random', inputs: 0 },
				{ key: 'sqrt', label: 'sqrt', inputs: 1 },
			]
			class MathComponent extends _DynamicComponent__WEBPACK_IMPORTED_MODULE_0__.a {
				constructor() {
					super('Math', MathFunctions)
				}
				worker(node, inputs, outputs) {
					const math_function = this.getCurrentDynamicFunction(node)
					if (math_function) {
						const input_count = this.getInputsFromFunctions(math_function),
							x = this.getInputValue(node, inputs, 'input_1'),
							y = this.getInputValue(node, inputs, 'input_2')
						let result
						switch (math_function) {
							case 'abs':
								result = `Math.abs(${x})`
								break
							case 'sin':
								result = `Math.sin(${x})`
								break
							case 'cos':
								result = `Math.cos(${x})`
								break
							case 'tan':
								result = `Math.tan(${x})`
								break
							case 'atan':
								result = `Math.atan(${x})`
								break
							case 'atan2':
								result = `Math.atan2(${y}, ${x})`
								break
							case 'ceil':
								result = `Math.ceil(${x})`
								break
							case 'floor':
								result = `Math.floor(${x})`
								break
							case 'log':
								result = `Math.log(${x})`
								break
							case 'min':
								result = `Math.min(${x}, ${y})`
								break
							case 'max':
								result = `Math.max(${x}, ${y})`
								break
							case 'pow':
								result = `Math.round(${x}, ${y})`
								break
							case 'round':
								result = `Math.round(${x})`
								break
							case 'random':
								result = 'Math.random()'
								break
							case 'sqrt':
								result = `Math.sqrt(${x})`
						}
						;(0 == input_count ||
							(1 == input_count && 'number' == typeof x) ||
							(2 == input_count && 'number' == typeof x && 'number' == typeof y)) &&
							(result = eval(result)),
							(outputs.result = result)
					}
				}
			}
			__webpack_exports__.a = MathComponent
		},
		474: function (module, __webpack_exports__, __webpack_require__) {
			'use strict'
			var _DynamicComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(463)
			const OperationFunctions = [
				{ key: 'add', label: 'Add', inputs: 2 },
				{ key: 'sub', label: 'Subtract', inputs: 2 },
				{ key: 'mul', label: 'Multiply', inputs: 2 },
				{ key: 'div', label: 'Divide', inputs: 2 },
				{ key: 'mod', label: 'Modulus ', inputs: 2 },
			]
			class OperationComponent extends _DynamicComponent__WEBPACK_IMPORTED_MODULE_0__.a {
				constructor() {
					super('Operation', OperationFunctions)
				}
				worker(node, inputs, outputs) {
					const dynamic_function = this.getCurrentDynamicFunction(node)
					if (dynamic_function) {
						let operator = '+'
						switch (dynamic_function) {
							case 'add':
								operator = '+'
								break
							case 'div':
								operator = '/'
								break
							case 'mul':
							case 'sub':
								operator = '*'
								break
							case 'mod':
								operator = '%'
						}
						const input_1 = this.getInputValue(node, inputs, 'input_1'),
							input_2 = this.getInputValue(node, inputs, 'input_2')
						let result
						;(result =
							'number' == typeof input_1 && 'number' == typeof input_2
								? eval(`${input_1} ${operator} ${input_2}`)
								: `(${input_1} ${operator} ${input_2})`),
							(outputs.result = result)
					}
				}
			}
			__webpack_exports__.a = OperationComponent
		},
		479: function (e, t, n) {
			'use strict'
			n.r(t)
			var c = n(1),
				s = n(125),
				o = n(415),
				a = n(121),
				r = n(3),
				i = n.n(r),
				l = n(411)
			const u = c.memo(
					({
						layer: e,
						depth: t,
						position: n,
						hasNeighbor: s,
						parentPosition: o,
						selected_id: r,
						layers: p,
						selectLayer: d,
					}) => {
						const [h, m] = c.useState(!!r && Object(a.g)(e.id, r, p))
						c.useEffect(() => {
							const t = !!r && Object(a.g)(e.id, r, p)
							t && t != h && m(t)
						}, [r])
						const g = r == e.id,
							w = e.children ? e.children.length : 0,
							f = e => 0 === e || (e === t - 1 && !s && ((e === t - 1 && !s && '└' !== o) || e !== t - 1))
						return c.createElement(
							'li',
							null,
							new Array(t)
								.fill(1)
								.map((e, n) =>
									c.createElement(
										'span',
										{ key: n, style: { color: f(n) ? '' : 'rgba(255,255,255,.1)' } },
										'│',
										t > 0 && ' '
									)
								),
							n,
							'─',
							w > 0 && h ? '┐' : ' ',
							c.createElement('span', { style: { fontSize: '.2rem' } }, ' '),
							c.createElement(
								'span',
								{
									style: { cursor: g ? '' : 'pointer', color: g ? i.a.color('primary').toString('hex') : '' },
									onClick: () => d(e),
								},
								e.name
							),
							c.createElement(
								'span',
								{ style: v, onClick: () => e.children && e.children.length > 0 && m(!h) },
								e.children &&
									e.children.length > 0 &&
									c.createElement(l.a, { name: 'arrow-right-fill', size: 0, rotate: h ? 90 : 0, fill: '#fff' })
							),
							h &&
								e.children &&
								e.children.length > 0 &&
								c.createElement(
									'ul',
									{ style: { margin: 0, padding: 0, listStyle: 'none' } },
									e.children.map((e, s) =>
										c.createElement(u, {
											layers: p,
											selectLayer: d,
											selected_id: r,
											position: 0 === s && w > 1 ? '├' : '└',
											parentPosition: n,
											layer: e,
											key: e.id,
											hasNeighbor: w > 1,
											depth: t + 1,
										})
									)
								)
						)
					}
				),
				v = { cursor: 'pointer', width: i.a.add(0, -3), paddingLeft: i.a.ms(-3), height: '100%' }
			var p = c.memo(({ scene: e, selectLayer: t, selected_id: n }) => {
					const s = Object.values(e),
						o = s.length
					return c.createElement(
						'div',
						null,
						c.createElement(l.a, { name: 'scene' }),
						c.createElement(
							'ul',
							{
								style: {
									padding: '0 0 0 0.3rem',
									margin: 0,
									listStyle: 'none',
									fontSize: '1rem',
									lineHeight: '1.1rem',
								},
							},
							s.map((e, a) =>
								c.createElement(u, {
									key: e.id,
									selected_id: n,
									position: 0 === a && o > 1 ? '├' : '└',
									selectLayer: t,
									layer: e,
									layers: s,
									hasNeighbor: o > 1,
									depth: 0,
								})
							)
						)
					)
				}),
				d = n(413),
				h = n(2)
			const m = {
					position: 'absolute',
					top: 0,
					right: 0,
					display: 'flex',
					alignItems: 'flex-end',
					flexDirection: 'column',
					gap: i.a.ms(0),
					padding: i.a.ms(1),
				},
				g = { fontSize: i.a.ms(1) },
				w = {
					position: 'absolute',
					bottom: i.a.ms(1),
					right: i.a.ms(1),
					padding: i.a.ms(1),
					fontSize: i.a.ms(1),
					background: i.a.color('dark-lighten').toString('hex'),
				}
			var f = c.memo(e =>
					c.createElement(
						c.Fragment,
						null,
						c.createElement(
							'div',
							{ style: m },
							c.createElement('div', { style: g }, e.layer ? e.layer.name : 'select layer'),
							c.createElement(
								'div',
								null,
								c.createElement(d.a, {
									options: Object.keys(h.a.sceneChildProps).map(e => ({ key: e, value: e })),
									placeholder: 'Select property',
									value: e.prop_name,
									onChange: e.selectPropName,
									width: i.a.add(5, 2),
								})
							)
						),
						c.createElement(
							'div',
							{ style: w },
							c.createElement(p, {
								selectLayer: e.selectLayer,
								selected_id: e.layer ? e.layer.id : void 0,
								scene: e.scene,
							})
						)
					)
				),
				y = n(412),
				b = n(462),
				_ = n(467),
				x = n(468),
				k = n(476),
				z = n(472),
				M = n(414),
				E = n(416)
			class C extends y.c.Component {
				constructor() {
					super('Number')
				}
				builder(e) {
					const t = new y.c.Output('value', 'Output', M.a),
						n = new E.a(this.editor, 'value', e)
					e.addControl(n), e.addOutput(t)
				}
				worker(e, t, n) {
					n.value = e.data.value
				}
				code(e, t, n) {}
			}
			var O = C
			class V extends y.c.Component {
				constructor() {
					super('Vector')
				}
				builder(e) {
					const t = new y.c.Output('value', 'Output', M.e),
						n = new y.c.Input('x', 'x', M.b)
					n.addControl(new E.a(this.editor, 'x', e)), e.addInput(n)
					const c = new y.c.Input('y', 'y', M.b)
					c.addControl(new E.a(this.editor, 'y', e)), e.addInput(c), e.addOutput(t)
				}
				worker(e, t, n) {
					const c = t.x && t.x.length > 0 ? t.x[0] : e.data.x,
						s = t.y && t.y.length > 0 ? t.y[0] : e.data.y
					n.value = `[${c}, ${s}]`
				}
				code(e, t, n) {}
			}
			var S = V
			const $ = [
				{ key: 'repetition.current_index', label: 'Current index' },
				{ key: 'repetition.current_offset', label: 'Current offset' },
				{ key: 'repetition.current_row', label: 'Current row' },
				{ key: 'repetition.current_row_offset', label: 'Current row offset' },
				{ key: 'repetition.current_col', label: 'Current col' },
				{ key: 'repetition.current_col_offset', label: 'Current col offset' },
				{ key: 'repetition.current_angle', label: 'Current angle' },
				{ key: 'repetition.count', label: 'Count' },
				{ key: 'repetition.count_col', label: 'Count col' },
				{ key: 'repetition.count_row', label: 'Count row' },
			]
			class B extends y.c.Component {
				constructor() {
					super('Repetition')
				}
				builder(e) {
					$.forEach(t => {
						e.addOutput(new y.c.Output(t.key, t.label, M.d))
					})
				}
				worker(e, t, n) {
					$.forEach(t => {
						e.outputs[t.key].connections.length > 0 && (n[t.key] = t.key)
					})
				}
				code(e, t, n) {}
			}
			var L = B
			const I = [
				{ key: 'shape_loop.current_index', label: 'Current index' },
				{ key: 'shape_loop.current_angle', label: 'Current angle' },
				{ key: 'shape_loop.count', label: 'Count' },
			]
			class N extends y.c.Component {
				constructor() {
					super('ShapeLoop')
				}
				builder(e) {
					I.forEach(t => {
						e.addOutput(new y.c.Output(t.key, t.label, M.d))
					})
				}
				worker(e, t, n) {
					I.forEach(t => {
						e.outputs[t.key].connections.length > 0 && (n[t.key] = t.key)
					})
				}
				code(e, t, n) {}
			}
			var H = N
			const R = [
				{ key: 'shape.getAngleFromMatrixRepetition(repetition)', label: 'Matrix angle' },
				{ key: 'shape.getDistanceFromMatrixRepetition(repetition)', label: 'Matrix distance' },
			]
			class F extends y.c.Component {
				constructor() {
					super('Shape')
				}
				builder(e) {
					R.forEach(t => {
						e.addOutput(new y.c.Output(t.key, t.label, M.d))
					})
				}
				worker(e, t, n) {
					R.forEach(t => {
						e.outputs[t.key].connections.length > 0 && (n[t.key] = t.key)
					})
				}
				code(e, t, n) {}
			}
			var D = F
			class P extends y.c.Component {
				constructor() {
					super('Output')
				}
				builder(e) {
					const t = e.data.bVector,
						n = e.data.canbVector
					if (t) {
						const t = new y.c.Input('input_x', 'x value', M.b),
							n = new y.c.Input('input_y', 'y value', M.b)
						e.addInput(t), e.addInput(n)
					} else {
						const t = new y.c.Input('input', 'return value', n ? M.c : M.b)
						e.addInput(t)
					}
				}
				worker(e, t, n) {
					null != t.input && t.input.length > 0 && (e.data.return_value = t.input[0]),
						t.input_x &&
							t.input_x.length > 0 &&
							t.input_y &&
							t.input_y.length > 0 &&
							(e.data.return_value = `[${t.input_x[0]},${t.input_y[0]}]`)
				}
				code(e, t, n) {
					e.data.return_value && n('' + e.data.return_value)
				}
			}
			var j = P
			class T extends y.c.Component {
				constructor() {
					super('Time')
				}
				builder(e) {
					const t = new y.c.Output('time', 'Current time (ms)', M.d),
						n = new y.c.Output('mstime', 'Current time (s)', M.d)
					e.addOutput(t), e.addOutput(n)
				}
				worker(e, t, n) {
					;(n.time = 'time'), (n.mstime = '(time / 1000)')
				}
				code() {}
			}
			var A = T,
				W = n(473)
			const q = [
				{ key: 'Math.PI', label: 'PI' },
				{ key: '(Math.PI * 2)', label: 'PI2' },
				{ key: 'Math.LN2', label: 'LN2' },
				{ key: 'Math.LN10', label: 'LN10' },
				{ key: 'Math.SQRT1_2', label: 'SQRT1_2' },
				{ key: 'Math.SQRT2', label: 'SQRT2' },
			]
			class J extends y.c.Component {
				constructor() {
					super('Math Constant')
				}
				builder(e) {
					q.forEach(t => {
						e.addOutput(new y.c.Output(t.key, t.label, M.d))
					})
				}
				worker(e, t, n) {
					q.forEach(t => {
						e.outputs[t.key].connections.length > 0 && (n[t.key] = t.key)
					})
				}
				code(e, t, n) {}
			}
			var U = J,
				K = n(474),
				Q = class extends b.b {
					render() {
						const { node: e, bindSocket: t, bindControl: n } = this.props,
							{ outputs: s, controls: o, inputs: a, selected: r } = this.state
						return c.createElement(
							'div',
							{ className: 'ui-node node ' + r },
							c.createElement('div', { className: 'title' }, e.name),
							s.map(e =>
								c.createElement(
									'div',
									{ className: 'output', key: e.key },
									c.createElement('div', { className: 'output-title' }, e.name),
									c.createElement(b.c, { type: 'output', socket: e.socket, io: e, innerRef: t })
								)
							),
							o.map(e => c.createElement(b.a, { className: 'control', key: e.key, control: e, innerRef: n })),
							a.map(e =>
								c.createElement(
									'div',
									{ className: 'input', key: e.key },
									c.createElement(b.c, { type: 'input', socket: e.socket, io: e, innerRef: t }),
									!e.showControl() && c.createElement('div', { className: 'input-title' }, e.name),
									e.showControl() &&
										c.createElement(b.a, { className: 'input-control', control: e.control, innerRef: n })
								)
							)
						)
					}
				}
			const G = {
					Number: new O(),
					Vector: new S(),
					Operation: new K.a(),
					Math: new W.a(),
					MathConstant: new U(),
					Shape: new D(),
					Repetition: new L(),
					Time: new A(),
					Output: new j(),
				},
				X = new H(),
				Y = ['Time', 'Repetition', 'Output']
			async function Z(e, t, n) {
				var c = new y.c.NodeEditor('mandala-ui@0.1.0', e)
				c.use(z.a), c.use(x.a), c.use(_.a), c.use(b.d, { component: Q }), c.use(k.a, { searchBar: !0, delay: 100 })
				var s = new y.c.Engine('mandala-ui@0.1.0')
				return (
					Object.keys(G).forEach(e => {
						c.register(G[e]), s.register(G[e])
					}),
					n.shapeLoop && (c.register(X), s.register(X)),
					await (async function (e, t, n) {
						if ((e.clear(), t)) await e.fromJSON(t)
						else {
							const t = await G.Repetition.createNode(),
								c = await G.Time.createNode(),
								s = await G.Output.createNode({ bVector: n.bVector, canbVector: n.canbVector })
							if (
								((c.position = [0, 0]),
								(t.position = [0, 120]),
								(s.position = [1e3, 100]),
								e.addNode(c),
								e.addNode(t),
								e.addNode(s),
								n.shapeLoop)
							) {
								const t = await X.createNode()
								;(t.position = [400, 60]), e.addNode(t)
							}
						}
					})(c, t, n),
					c.view.resize(),
					z.a.zoomAt(c, c.nodes),
					c.on('nodecreate', e => {
						if (Y.includes(e.name)) {
							if (c.nodes.some(t => t.name === e.name)) {
								const t = c.nodes.find(t => t.name === e.name)
								return c.selectNode(t), !1
							}
						}
					}),
					c.on(['process', 'nodecreated', 'noderemoved', 'connectioncreated', 'connectionremoved'], async () => {
						await s.abort(), await s.process(c.toJSON())
					}),
					c.on('zoom', ({ source: e }) => 'dblclick' !== e),
					c.trigger('process'),
					{ editor: c, getCode: () => Object(x.b)(s, c.toJSON()) }
				)
			}
			var ee = function (e, t, n, c) {
				return new (n || (n = Promise))(function (s, o) {
					function a(e) {
						try {
							i(c.next(e))
						} catch (e) {
							o(e)
						}
					}
					function r(e) {
						try {
							i(c.throw(e))
						} catch (e) {
							o(e)
						}
					}
					function i(e) {
						var t
						e.done
							? s(e.value)
							: ((t = e.value),
							  t instanceof n
									? t
									: new n(function (e) {
											e(t)
									  })).then(a, r)
					}
					i((c = c.apply(e, t || [])).next())
				})
			}
			var te = c.memo(e =>
				c.createElement('div', {
					className: 'visual-editor',
					ref: function (t) {
						return ee(this, void 0, void 0, function* () {
							if (t) {
								const n = e.initialReteState && e.initialReteState.length > 0 ? JSON.parse(e.initialReteState) : null,
									c = yield Z(t, n, e.options)
								c.editor.on(['process', 'nodecreated', 'noderemoved', 'connectioncreated', 'connectionremoved'], () => {
									setTimeout(() =>
										ee(this, void 0, void 0, function* () {
											const t = JSON.stringify(c.editor.toJSON()),
												n = { raw: yield c.getCode(), reteEditor: t }
											console.log('reteAnimation', n), e.setReteAnimation(n)
										})
									)
								})
							}
						})
					},
				})
			)
			var ne = c.memo(e => {
					var t
					const [n, s] = c.useState(0)
					return (
						c.useEffect(() => {
							s(n + 1)
						}, [e.initialReteState]),
						c.createElement(
							'div',
							{ style: { width: '100%', height: '100%' } },
							e.layer && e.prop_name
								? c.createElement(te, {
										key: `${null === (t = e.layer) || void 0 === t ? void 0 : t.id}_${e.prop_name}_${n}`,
										options: {},
										initialReteState: e.initialReteState,
										setReteAnimation: e.setReteAnimationRef,
								  })
								: c.createElement(
										'div',
										{
											style: {
												display: 'flex',
												width: '100%',
												height: '100%',
												alignItems: 'center',
												justifyContent: 'center',
											},
										},
										c.createElement('div', null, 'Select layer and prop')
								  )
						)
					)
				}),
				ce = n(64)
			const se = { position: 'absolute', top: 0, left: 0, padding: i.a.ms(1) }
			t.default = Object(s.b)(e => ({ scene: e.project.scene }))(e => {
				var t
				const [n, s] = c.useState({}),
					[r, i] = Object(o.a)(null),
					[u, v] = c.useState(null),
					[p, d] = c.useState(null)
				return (
					c.useEffect(() => {
						function t(t) {
							if (t.data && t.data.event)
								switch (t.data.event) {
									case 'changeroute':
										s({ prop_name: t.data.prop_name, layer: Object(a.c)(t.data.layer_id, Object.values(e.scene)) })
								}
						}
						return window.addEventListener('message', t, !1), () => window.removeEventListener('message', t)
					}, [e.scene]),
					c.useEffect(() => {
						const e =
							n.layer &&
							n.prop_name &&
							ce.a.bValueAnimation(n.layer.props[n.prop_name]) &&
							'rete' === n.layer.props[n.prop_name].type
								? n.layer.props[n.prop_name].value.reteEditor
								: null
						d(e)
					}, [n.prop_name, null === (t = n.layer) || void 0 === t ? void 0 : t.id]),
					console.log({ state: n, scene: e.scene, initialReteState: p }),
					c.createElement(
						'div',
						{ style: { width: '100vw', height: '100vh' } },
						c.createElement(
							'div',
							{ style: { position: 'relative', width: '100%', height: '100%' } },
							c.createElement(
								'div',
								{ style: se },
								c.createElement(l.a, {
									name: 'save',
									onClick: function () {
										if (n.layer && n.prop_name) {
											const e = {
												id: n.layer.id,
												name: n.prop_name,
												value: { type: 'rete', value: r.current },
												prev_value: n.layer.props[n.prop_name],
											}
											window.opener.postMessage({ event: 'set-popup-window-value', value: e }, location.origin)
										}
									},
									size: 2,
								}),
								c.createElement(l.a, {
									name: 'copy',
									size: 2,
									onClick: function () {
										var e
										n.prop_name &&
											v({
												prop_name: n.prop_name,
												value: (null === (e = r.current) || void 0 === e ? void 0 : e.reteEditor) || null,
											})
									},
								}),
								c.createElement(l.a, {
									name: 'paste',
									disabled: null === u,
									size: 2,
									onClick: function () {
										u && d(u.value)
									},
								})
							),
							c.createElement(ne, {
								layer: n.layer,
								prop_name: n.prop_name,
								initialReteState: p,
								setReteAnimationRef: i,
							})
						),
						c.createElement(f, {
							scene: e.scene,
							layer: n.layer,
							prop_name: n.prop_name,
							selectLayer: e => {
								s({ prop_name: n.prop_name, layer: e })
							},
							selectPropName: e => {
								s({ layer: n.layer, prop_name: e })
							},
						})
					)
				)
			})
		},
	},
])
