import * as React from 'react'
import executor from 'redux-store/executor'

import useRef from 'hooks/useRef'
import useRect from 'hooks/useRect'
import useMouseWheel from 'hooks/useWheel'
import { clamp } from '@urpflanze/core/dist/cjs'
import useDraggable from 'hooks/useDraggable'

import { DrawerOffsets } from 'app/workspace/drawer/DrawerOffsetsViewer'
import Storage from 'storage/Storage'

interface DrawerCanvasProps {
	offsets: DrawerOffsets

	setSize: (size: number) => void
	// updateResolution: (resolution: number) => void
	setOffsets: (offsets: DrawerOffsets) => void
}

const DrawerCanvas: React.FunctionComponent<DrawerCanvasProps> = ({
	offsets,
	setSize,
	setOffsets,
}: DrawerCanvasProps) => {
	const [initialTranslate, setInitialTranslate] = React.useState<[number, number]>([0, 0])

	const [canvasRef] = useRef<HTMLCanvasElement>()
	const containerRef = React.useRef(null)

	const wrapperRef = useDraggable<HTMLDivElement>({
		onDrag: coords => {
			offsets.translate = [
				// clamp(-1.5, 1.5, initialTranslate[0] + coords.x / -100 / offsets.scale),
				// clamp(-1.5, 1.5, initialTranslate[1] + coords.y / -100 / offsets.scale),
				clamp(-1, 1, initialTranslate[0] + coords.x / -100 / offsets.scale),
				clamp(-1, 1, initialTranslate[1] + coords.y / -100 / offsets.scale),
			]

			if (offsets.scale == 1) offsets.translate = [0, 0]

			// if (offsets.scale != 1 || (offsets.translate[0] != 0 && offsets.translate[1] != 0))
			executor.ask('set-drawer-offsets', offsets)

			setOffsets({ ...offsets })
		},
		onDragEnd: () => {
			setInitialTranslate([...offsets.translate])
		},
	})

	const containerRect = useRect(containerRef)
	const canvas_size = Math.floor(Math.min(containerRect.width, containerRect.height))

	useMouseWheel(wrapperRef, (dy, e) => {
		e.preventDefault()

		const currentScale = offsets.scale

		offsets.scale = clamp(1, 10, currentScale + Math.sign(dy) * -1 * (e.shiftKey ? 1 : e.altKey ? 0.01 : 0.1))

		if (offsets.scale == 1) offsets.translate = [0, 0]

		// if (offsets.scale != 1 || (offsets.translate[0] != 0 && offsets.translate[1] != 0))
		executor.ask('set-drawer-offsets', offsets)

		setOffsets({ ...offsets })
	})

	React.useEffect(() => {
		if (wrapperRef.current && canvasRef.current && canvas_size > 0) {
			setOffsets({ ...offsets, size: canvas_size })

			executor.setDrawer(canvasRef.current, canvas_size, Storage.get('resolution', 'high'))
			wrapperRef.current.style.width = canvas_size + 'px'
			wrapperRef.current.style.height = canvas_size + 'px'

			setSize(canvas_size)
		}
	}, [canvas_size])

	React.useEffect(() => {
		if (canvasRef.current && canvas_size > 0) {
			// let width = ratio >= 1 ? canvas_size : canvas_size * ratio
			// let height = ratio >= 1 ? canvas_size / ratio : canvas_size
			let width = canvas_size
			let height = canvas_size

			if (width > canvas_size) {
				const ratio = width / height
				width = canvas_size
				height = canvas_size / ratio
			} else if (height > canvas_size) {
				const ratio = height / width
				height = canvas_size
				width = canvas_size / ratio
			}

			canvasRef.current.style.width = width + 'px'
			canvasRef.current.style.height = height + 'px'
			canvasRef.current.style.maxWidth = width + 'px'
			canvasRef.current.style.maxHeight = height + 'px'
			canvasRef.current.style.minWidth = width + 'px'
			canvasRef.current.style.minHeight = height + 'px'
		}
	}, [canvas_size])

	return (
		<div
			ref={containerRef}
			style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}
		>
			<div
				ref={wrapperRef}
				style={{ background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			>
				<canvas ref={canvasRef} style={{ pointerEvents: 'none', maxWidth: '100%', maxHeight: '100%' }} />
			</div>
		</div>
	)
}

export default React.memo(DrawerCanvas)
