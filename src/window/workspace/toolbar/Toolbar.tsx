import * as React from 'react'

import pups from '@pups/js'
import executor from '@redux-store/executor'
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
		<section className="toolbar" data-name="toolbar">
			<ul className="toolbar__list">
				{shapes.map((shape, index) => (
					<div className="toolbar__list__item" key={index} onClick={() => addShape(shape.name)}>
						<Tooltip title={<ToolbarTooltip name={shape.name} />} position="right">
							<img src={shape.image} />
						</Tooltip>
					</div>
				))}
			</ul>
		</section>
	)
}

function ToolbarTooltip({ name }: { name: string }) {
	return (
		<div>
			Add{' '}
			<i>
				<b>${name}</b>
			</i>{' '}
			shape to Scene
		</div>
	)
}

export default Toolbar
