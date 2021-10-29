import * as React from 'react'

import pups from '@pups/js'
import executor from '@redux-store/executor'
import styled from 'styled-components'
import Tooltip from '@components/Tooltip'

const Toolbar: React.FunctionComponent = () => {
	const [shapes, setShapes] = React.useState<Array<{ name: string; image: string }>>([])

	React.useEffect(() => {
		executor.ask('toolbar', { size: 128, color: pups.color('primary').toString('hex') }).then(setShapes)
	}, [])

	const addShape = type => {
		executor.run('add', { type })
	}

	return (
		<section data-name="toolbar" style={ContainerStyle}>
			<ul style={ListStyle}>
				{shapes.map((shape, index) => (
					<Item key={index} onClick={() => addShape(shape.name)}>
						<Tooltip title={`Add <i><b>${shape.name}</b></i> shape to Scene`} position="right">
							<img src={shape.image} style={{ width: '100%' }} />
						</Tooltip>
					</Item>
				))}
			</ul>
		</section>
	)
}

const ContainerStyle: React.CSSProperties = {
	position: 'relative',
	border: `1px solid ${pups.color('dark-lighten')}`,
	width: pups.add(2, 0) as string,
	borderRadius: '2px',
	maxHeight: '70vh',
	// overflowY: 'hidden'
}

const ListStyle: React.CSSProperties = {
	listStyle: 'none',
	margin: 0,
	padding: 0,
	width: '100%',
}

const Item = styled.li`
	position: relative;
	width: 100%;
	cursor: pointer;
	padding: ${pups.div(1, '2rem')};

	&:hover img {
		filter: hue-rotate(180deg);
	}

	& + & {
		margin-top: 1px;
	}
`

export default Toolbar
