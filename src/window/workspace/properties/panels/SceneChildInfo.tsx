import * as React from 'react'
import pups from '@pups/js'

import executor from '@redux-store/executor'

import Panel, { ISceneChildPanel } from '@window/workspace/properties/Panel'
import { getPrimitives } from '@window/workspace/layers/layer_utilities'

import Icon from '@components/icons/Icon'
import Grid from '@components/Grid'
import Tooltip from '@components/Tooltip'
import { cancelablePromise } from '@genbs/urpflanze/dist/Utilites'
import { getIcon } from '@ui-services/utilities/utilies'

const SceneChildInfo: React.FunctionComponent<ISceneChildPanel> = (props: ISceneChildPanel) => {
	const [bufferLength, setBufferLength] = React.useState<number>()

	const layer = props.layer
	const name = layer.name

	function askBufferLength() {
		const id = layer.id
		return cancelablePromise(
			executor.ask('get-buffer-length', { id }).then(bufferLength => {
				layer.id === id && setBufferLength(bufferLength)
			})
		)
	}

	React.useEffect(() => {
		let cancelable,
			canceled = false

		executor.attach('scene:update-scene_child-prop', (data: any) => {
			if (!canceled)
				for (let i = 0, len = data.length; i < len; i++) {
					if (data[i].id === layer.id && (data[i].name === 'repetitions' || data[i].name === 'shape'))
						return (cancelable = askBufferLength())
				}
		})

		cancelable = askBufferLength()

		return () => {
			canceled = true
			cancelable && cancelable.cancel()
		}
	}, [layer.id])

	const primitives = getPrimitives(layer)

	return (
		<Panel
			name={name}
			icon={getIcon(layer.type)}
			expandable={true}
			expanded={true}
			action={
				<Icon
					name="highlight"
					size={0}
					onMouseOver={() => executor.ask('layer-highlight', { id: layer.id, status: true })}
					onMouseOut={() => executor.ask('layer-highlight', { id: layer.id, status: false })}
				/>
			}
		>
			Number of points: {bufferLength}
			{primitives.length > 0 && (
				<div style={{ marginTop: pups.ms(0) }}>
					Primitives:
					<div style={{ maxHeight: '10vh', overflowY: 'auto', overflowX: 'hidden' }}>
						{primitives.map(child => (
							<Grid
								key={child.id}
								columns={4}
								gap={pups.ms(-2)}
								valign="center"
								flow="auto max-content max-content max-content"
							>
								<div>{child.name}</div>

								<Icon
									name="highlight"
									size={0}
									onMouseOver={() => executor.ask('layer-highlight', { id: child.id, status: true })}
									onMouseOut={() => executor.ask('layer-highlight', { id: child.id, status: false })}
								/>

								<Tooltip title="Open">
									<Icon name="to-top" size={0} onClick={() => props.selectLayer && props.selectLayer(child.id)} />
								</Tooltip>
							</Grid>
						))}
					</div>
				</div>
			)}
		</Panel>
	)
}

export default React.memo(SceneChildInfo)
