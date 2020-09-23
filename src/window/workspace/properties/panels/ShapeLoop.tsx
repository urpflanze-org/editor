import * as React from 'react'

import Panel, { ISceneChildPanel } from '@window/workspace/properties/Panel'
import { openShapeLoopWindow } from 'popup-windows/PupupUtilities'
import Icon from '@components/icons/Icon'
import pups from '@pups/js'

const ShapeLoop: React.FunctionComponent<ISceneChildPanel> = (props: ISceneChildPanel) => {
	const layer = props.layer

	function generateShape() {
		openShapeLoopWindow(layer.id as string)
	}

	return (
		<Panel name="Loop generation" icon="loop" expandable={true} expanded={true}>
			<div style={{ textAlign: 'center' }}>
				<div style={{ display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }}>
					<div onClick={generateShape}>
						<Icon name="visual-editor" />
						<span style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: pups.ms(-2) }}>
							Generate Shape
						</span>
					</div>
				</div>
			</div>
		</Panel>
	)
}

export default React.memo(ShapeLoop)
