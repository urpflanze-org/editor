import * as React from 'react'
import pups from '@pups/js'

import { relativeClamp, clamp } from '@urpflanze/core/dist/cjs'
import useRect from 'hooks/useRect'
import useDraggable from 'hooks/useDraggable'

interface BarProps {
	duration: number
	framerate: number
	time: number
	steps: number
	renderedFrames: Array<number>
	enableMoveTime: boolean
	onChange: (time: number) => void
}

function toTime(v: number): string {
	return (Math.round(v / 10) / 100).toFixed(2) + 's'
}

const Bar: React.FunctionComponent<BarProps> = ({
	duration,
	framerate,
	time,
	renderedFrames,
	steps,
	enableMoveTime,
	onChange,
}: BarProps) => {
	const frames = Math.floor((duration / 1000) * framerate)
	const barRef = React.useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>
	const { width } = useRect(barRef)

	const Steps = new Array(steps).fill(0).map((v, i) => (
		<span key={i} onClick={() => handleChange((i * duration) / steps)} style={{ left: i * (100 / steps) + '%' }}>
			{toTime((i * duration) / steps)}
		</span>
	))

	const Lines = new Array(steps * 2 + 1)
		.fill(0)
		.map((v, i) => (
			<span
				style={{ left: i * (100 / (steps * 2)) + '%' }}
				onClick={() => handleChange(i * (duration / (steps * 2)))}
				key={i}
			></span>
		))

	function handleChange(time) {
		const t = clamp(0, duration, time)
		t !== time && onChange(t)
	}

	const cursorRef = useDraggable<HTMLDivElement>({
		onDrag: e => {
			const s = time + ((clamp(0, width, Math.abs(e.x)) * Math.sign(e.x)) / width) * duration
			const t = clamp(0, duration, s)
			enableMoveTime && handleChange(t)
		},
	})

	return (
		<div className="timeline__bar">
			<div className="timeline__bar__steps">
				{Steps}
				<span style={{ left: '100%' }}>{toTime(duration)}</span>
			</div>
			<div className="timeline__bar__progress" ref={barRef}>
				<div className="timeline__bar__progress__loaded-frames">
					{new Array(frames).fill(0).map((v, index) => (
						<div
							key={index}
							style={{
								width: 100 / frames + '%',
								height: '1px',
								background: renderedFrames.includes(index) ? pups.color('primary').toString('hex') : '',
							}}
						></div>
					))}
				</div>
				<div className="timeline__bar__progress__step-lines">{Lines}</div>
				<div
					className="timeline__bar__progress__cursor"
					style={{ left: relativeClamp(0, duration, time, 0, 100) + '%' }}
				>
					<div
						className="timeline__bar__progress__cursor__label"
						style={{ cursor: enableMoveTime ? 'ew-resize' : 'not-allowed' }}
						ref={cursorRef}
					>
						{toTime(time)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default React.memo(Bar)
