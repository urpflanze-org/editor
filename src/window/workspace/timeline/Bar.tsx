import * as React from 'react'
import pups from '@pups/js'
import styled from 'styled-components'

import { relativeClamp, clamp } from '@genbs/urpflanze/dist/core/Utilites'
import useRect from '@hooks/useRect'
import useDraggable from '@hooks/useDraggable'

interface BarProps {
	sequence_start: number
	sequence_end: number
	sequence_framerate: number
	current_time: number
	steps: number
	renderedFrames: Array<number>
	enableMoveTime: boolean
	onChange: (time: number) => void
}

function toTime(v: number): string {
	return (Math.round(v / 10) / 100).toFixed(2) + 's'
}

const Bar: React.FunctionComponent<BarProps> = ({
	sequence_start,
	sequence_end,
	sequence_framerate,
	current_time,
	renderedFrames,
	steps,
	enableMoveTime,
	onChange,
}: BarProps) => {
	const frames = Math.floor(((sequence_end - sequence_start) / 1000) * sequence_framerate)
	const barRef = React.useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>
	const { width } = useRect(barRef)

	const Steps = new Array(steps).fill(0).map((v, i) => (
		<span
			key={i}
			onClick={() => handleChange((i * (sequence_end - sequence_start)) / steps)}
			style={{ left: i * (100 / steps) + '%' }}
		>
			{toTime((i * (sequence_end - sequence_start)) / steps)}
		</span>
	))

	const Lines = new Array(steps * 2 + 1)
		.fill(0)
		.map((v, i) => (
			<span
				style={{ left: i * (100 / (steps * 2)) + '%' }}
				onClick={() => handleChange(i * ((sequence_end - sequence_start) / (steps * 2)))}
				key={i}
			></span>
		))

	function handleChange(time) {
		const t = clamp(sequence_start, sequence_end, time)
		t != current_time && onChange(time)
	}

	const cursorRef = useDraggable<HTMLDivElement>({
		onDrag: e => {
			const s =
				current_time + ((clamp(0, width, Math.abs(e.x)) * Math.sign(e.x)) / width) * (sequence_end - sequence_start)
			const time = clamp(sequence_start, sequence_end, s)
			enableMoveTime && handleChange(time)
		},
	})

	return (
		<Container>
			<TimeSteps>
				{Steps}
				<span style={{ left: '100%' }}>{toTime(sequence_end)}</span>
			</TimeSteps>
			<Progress ref={barRef}>
				<LoadedFrames>
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
				</LoadedFrames>
				<LinesSteps>{Lines}</LinesSteps>
				<Cursor style={{ left: relativeClamp(current_time, sequence_start, sequence_end, 0, 100) + '%' }}>
					<CursorLabel style={{ cursor: enableMoveTime ? 'ew-resize' : 'not-allowed' }} ref={cursorRef}>
						{toTime(current_time)}
					</CursorLabel>
				</Cursor>
			</Progress>
		</Container>
	)
}

const Container = styled.div`
	line-height: 1;
`

const TimeSteps = styled.div`
	display: flex;
	position: relative;
	height: 0.8rem;
	width: 100%;
	margin: ${pups.ms(-2)} 0;

	> span {
		position: absolute;
		transform: translate(-50%, 0);
	}
`

const LoadedFrames = styled.div`
	display: flex;
`

const LinesSteps = styled.div`
	display: flex;
	justify-content: space-between;
	height: ${pups.ms(0)};

	> span {
		position: absolute;
		height: 100%;
		width: 6px;
		transform: translate(-50%, 0);

		&:after  {
			position: absolute;
			top: 0;
			left: 2.5px;
			width: 1px;
			height: 100%;
			display: block;
			content: ' ';
		}
		&:nth-child(2n + 1):after {
			background: rgba(255, 255, 255, 0.05);
		}
		&:nth-child(2n):after {
			background: rgba(0, 0, 0, 0.2);
		}
	}
`

const Progress = styled.div`
	position: relative;
	background: ${pups.color('dark-lighten')};
`

const Cursor = styled.div`
	position: absolute;
	top: -${pups.ms(-2)};

	&:after {
		position: absolute;
		top: 0;
		display: block;
		content: ' ';
		width: 1px;
		height: ${pups.add(0, -2)};
		background: ${pups.color('primary')};
	}
`

const CursorLabel = styled.div`
	position: absolute;
	bottom: 100%;
	background: ${pups.color('primary')};
	padding: ${pups.ms(-3)};
	font-weight: 600;
	transform: translateX(-50%);
	border-radius: 2px;
`

export default React.memo(Bar)
