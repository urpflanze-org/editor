import * as React from 'react'

import { IProjectScene, IProjectSceneChild } from '@genbs/urpflanze/dist/services/types/project'

import { findLayer } from '@window/workspace/layers/layer_utilities'

interface PopupWindowState {
	prop_name?: string
	layer: IProjectSceneChild
}

export default function (
	popup: 'animate' | 'shape-loop' | 'vertex-callback' | 'code',
	scene: IProjectScene,
	layer_id?: number | string,
	prop_name?: string
): [PopupWindowState, React.Dispatch<React.SetStateAction<PopupWindowState>>] {
	const [state, setState] = React.useState<PopupWindowState>({
		layer: {
			id: '',
			name: '',
			order: 0,
			type: '',
			props: {},
			data: {
				highlighted: false,
				visible: false,
				disableGhost: false,
			},
			bPrimitive: false,
			depth: 0,
		},
	})

	React.useEffect(() => {
		function handleMessage(e: MessageEvent) {
			if (e.data && e.data.event) {
				switch (e.data.event) {
					case 'changeroute': {
						find(e.data.layer_id, e.data.prop_name)
						break
					}
				}
			}
		}

		find(state && state.layer.id.length > 0 ? state.layer.id : layer_id, state.prop_name || prop_name)

		function find(layer_id, prop_name) {
			const finded = findLayer(layer_id, Object.values(scene))
			finded &&
				setState({
					prop_name: prop_name,
					layer: finded,
				})
		}

		window.addEventListener('message', handleMessage, false)

		function handleHistoryChange(e) {
			console.log('sadfsd', e)
			const path = window.location.pathname

			if (path.indexOf('/' + popup) === 0) {
				const match = path.substring(('/' + popup).length + 1).split('/')
				const layer_id = match.length > 0 ? match[0] : null
				const prop_name = match.length > 1 ? match[1] : null

				layer_id && layer_id.length && find(layer_id, prop_name)
			}
		}

		window.addEventListener('popstate', handleHistoryChange, false)

		return () => {
			window.removeEventListener('message', handleMessage)
			window.removeEventListener('popstate', handleHistoryChange)
		}
	}, [scene, layer_id, prop_name])

	React.useEffect(() => {
		if (state.layer && state.layer.id) {
			const url = '/' + popup + '/' + state.layer.id + (state.prop_name ? '/' + state.prop_name : '')

			if (location.pathname !== url) {
				window.history.pushState(null, popup + ' ' + state.layer.name, url)
			}
		}
	}, [state])

	return [state, setState]
}
