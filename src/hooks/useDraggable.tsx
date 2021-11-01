import * as React from 'react'
import useRef from 'hooks/useRef'

import { now } from '@urpflanze/core/dist/cjs'

interface IDraggableEvents {
	onNotDrag?: () => void
	onDragStart?: () => void
	onDragEnd?: (coords: { x: number; y: number }, clientCoords: { x: number; y: number }, drag_time: number) => void
	onDrag?: (coords: { x: number; y: number }, clientCoords: { x: number; y: number }) => void
	onClick?: (clientCoords: { x: number; y: number }) => void
}

function useDraggable<T extends HTMLElement>(events: IDraggableEvents): React.RefObject<T> {
	const [ref] = useRef<T>()

	events = events || {}
	const [state, setState] = React.useState({
		coords: { x: 0, y: 0 },
		bDrag: false,
		time: 0,
	})

	const onDocumentMouseDown = React.useCallback(
		({ target, clientX, clientY }) => {
			const drag = target === ref?.current

			if (drag && drag != state.bDrag) {
				setState({ coords: { x: clientX, y: clientY }, bDrag: true, time: now() })
				events.onDragStart && events.onDragStart()
			}

			if (!drag) events.onNotDrag && events.onNotDrag()
		},
		[ref.current, state.bDrag]
	)

	const onDocumentMouseUp = React.useCallback(
		({ clientX, clientY }) => {
			if (state.bDrag) {
				const drag_time = now() - state.time
				const coords = { x: clientX - state.coords.x, y: clientY - state.coords.y }
				if (drag_time < 300 && coords.x == 0 && coords.y == 0)
					events.onClick && events.onClick({ x: clientX, y: clientY })

				setState({ coords, bDrag: false, time: 0 })
				events.onDragEnd && events.onDragEnd(coords, { x: clientX, y: clientY }, drag_time)
			}
		},
		[ref.current, state.bDrag]
	)

	const onDocumentMouseMove = React.useCallback(
		({ clientX, clientY }) => {
			if (state.bDrag) {
				const coords = { x: clientX - state.coords.x, y: clientY - state.coords.y }
				setState({ coords, bDrag: true, time: 0 })
				events.onDrag && events.onDrag(coords, { x: clientX, y: clientY })
			}
		},
		[ref.current, state.bDrag]
	)

	React.useEffect(() => {
		document.addEventListener('mousedown', onDocumentMouseDown, { passive: true })
		document.addEventListener('mouseup', onDocumentMouseUp, { passive: true })
		document.addEventListener('mousemove', onDocumentMouseMove, { passive: true })

		return () => {
			document.removeEventListener('mousedown', onDocumentMouseDown)
			document.removeEventListener('mouseup', onDocumentMouseUp)
			document.removeEventListener('mousemove', onDocumentMouseMove)
		}
	}, [ref.current, onDocumentMouseDown, onDocumentMouseMove, onDocumentMouseUp])

	return ref
}

export default useDraggable
