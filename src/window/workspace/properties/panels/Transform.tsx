import * as React from 'react'

import Panel, { ISceneChildPanel } from '@window/workspace/properties/Panel'

import Prop from '@window/workspace/properties/Prop'
import { openVertexCallbackWindow } from '@popup-windows/PupupUtilities'
import Icon from '@components/icons/Icon'
import pups from '@pups/js'

const Transform: React.FunctionComponent<ISceneChildPanel> = (props: ISceneChildPanel) => {
	const layer = props.layer

	function vertexCallback() {
		openVertexCallbackWindow(layer.id + '')
	}

	return (
		<Panel name="Transformations" icon="transform" expandable={true} expanded={true}>
			<Prop layer={layer} name="scale" />
			<Prop layer={layer} name="translate" />
			<Prop layer={layer} name="squeezeX" />
			<Prop layer={layer} name="squeezeY" />
			<Prop layer={layer} name="skewX" />
			<Prop layer={layer} name="skewY" />
			<Prop layer={layer} name="rotateX" />
			<Prop layer={layer} name="rotateY" />
			<Prop layer={layer} name="rotateZ" />
			<Prop layer={layer} name="transformOrigin" />

			<Prop layer={layer} name="perspective" />
			<Prop layer={layer} name="perspectiveOrigin" />

			<div style={{ textAlign: 'right' }}>
				<div style={{ display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }}>
					<div onClick={vertexCallback}>
						<Icon name="visual-editor" />
						<span style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: pups.ms(-2) }}>
							Apply point transformation
						</span>
					</div>
				</div>
			</div>
		</Panel>
	)
}

export default React.memo(Transform)
