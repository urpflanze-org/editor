import * as React from 'react'

import useWindowSize from 'hooks/useWindowSize'

const DEFAULT_RECT: Partial<DOMRect> = {
	width: 0,
	height: 0,
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	x: 0,
	y: 0,
}

function useRect<T extends HTMLElement>(ref: React.RefObject<T | undefined>): DOMRect {
	const [rect, setRect] = React.useState(ref && ref.current ? ref.current.getBoundingClientRect() : DEFAULT_RECT)

	const size = useWindowSize()

	React.useEffect(() => {
		ref.current && setRect(ref.current.getBoundingClientRect())
	}, [size, ref.current])

	return rect as DOMRect
}

export default useRect
