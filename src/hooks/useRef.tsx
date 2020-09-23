import * as React from 'react'

function useRef<T>(initial: any = null): [React.RefObject<T>, (t: any) => void] {
	const ref = React.useRef(initial)

	const setRef = React.useCallback(next => {
		if (ref.current) {
			// Make sure to cleanup any events/references added to the last instance
		}

		if (next) {
			// Check if a node is actually passed. Otherwise node would be null.
			// You can now do what you need to, addEventListeners, measure, etc.
		}

		// Save a reference to the node
		ref.current = next
	}, [])

	return [ref, setRef]
}

export default useRef
