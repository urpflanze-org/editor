import * as React from 'react'
import Loading from '@bootstrap/Loading'
import pups from '@pups/js'
import useWindowSize from '@hooks/useWindowSize'
import { relativeClamp } from '@genbs/urpflanze/dist/core/Utilites'
import executor from '@redux-store/executor'
import CodeEditorWindow from '@popup-windows/code-editor-window/CodeEditorWindow'

const Main = React.lazy(
	() => import(/* webpackChunkName: "main" */ /* webpackPreload: true */ /* webpackMode: "lazy" */ '@window/Main')
)

const AnimatePropWindow = React.lazy(
	() =>
		import(
			/* webpackChunkName: "animate-prop-window" */ /* webpackPreload: true */ /* webpackMode: "lazy" */
			'@popup-windows/animate-prop-window/AnimatePropWindow'
		)
)
const ShapeLoopWindow = React.lazy(
	() =>
		import(
			/* webpackChunkName: "shape-loop-window" */ /* webpackPreload: true */ /* webpackMode: "lazy" */
			'@popup-windows/shape-loop-window/ShapeLoopWindow'
		)
)
const VertexCallbackWindow = React.lazy(
	() =>
		import(
			/* webpackChunkName: "shape-loop-window" */ /* webpackPreload: true */ /* webpackMode: "lazy" */
			'@popup-windows/vertex-callback-window/VertexCallbackWindow'
		)
)

const animatePropWindowRegex = /^\/animate(\/([0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12})(\/(\w+)?)?)?$/i
const codeEditorWindowRegex = /^\/code(\/([0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12})(\/(\w+)?)?)?$/i
const shapeLoopWindowRegex = /^\/shape-loop(\/([0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}))?$/i
const vertexCallbackWindowRegex = /^\/vertex-callback(\/([0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}))?$/i

const NotFound: React.FunctionComponent = () => <div>404</div>
const Fallback = NotFound

const Router: React.FunctionComponent = () => {
	const locationPath = window.location.pathname

	React.useEffect(() => {
		// executor.restoreAutosave()
		function handleLocationChange(e) {
			console.log(e)
		}

		window.addEventListener('popstate', handleLocationChange, { passive: true })

		return () => window.removeEventListener('popstate', handleLocationChange)
	}, [])

	let CurrentComponent: React.FunctionComponent | React.LazyExoticComponent<React.FunctionComponent> = Fallback

	let props = {}

	switch (true) {
		case animatePropWindowRegex.test(locationPath): {
			const match = locationPath.match(animatePropWindowRegex) || [null, null, null, null]
			CurrentComponent = AnimatePropWindow
			props = { layer_id: match[2], prop_name: match[4] }
			break
		}
		case shapeLoopWindowRegex.test(locationPath): {
			const match = locationPath.match(animatePropWindowRegex) || [null, null]
			CurrentComponent = ShapeLoopWindow
			props = { layer_id: match[2] }
			break
		}
		case vertexCallbackWindowRegex.test(locationPath): {
			const match = locationPath.match(animatePropWindowRegex) || [null, null]
			CurrentComponent = VertexCallbackWindow
			props = { layer_id: match[2] }
			break
		}
		case codeEditorWindowRegex.test(locationPath): {
			const match = locationPath.match(animatePropWindowRegex) || [null, null, null, null]
			CurrentComponent = CodeEditorWindow
			props = { layer_id: match[2], prop_name: match[4] }
			break
		}
		default: {
			CurrentComponent = Main
		}
	}

	// CurrentComponent = ShapeLoopWindow
	// props = { layer_id: 'b17d5bf0-ee18-11ea-9fed-8d112b15e91e' }

	const size = useWindowSize()

	const rootBase = Math.floor(relativeClamp(size.width, 600, 2560, 10, 16))

	pups.modularScale.setRootBase(rootBase + 'px')
	document.documentElement.style.fontSize = rootBase + 'px'

	return (
		<React.Suspense fallback={<Loading />}>
			<CurrentComponent {...props} />
		</React.Suspense>
	)
}

export default React.memo(Router)
