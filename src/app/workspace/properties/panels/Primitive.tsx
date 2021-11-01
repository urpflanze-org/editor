import * as React from 'react'

import Panel, { ISceneChildPanel } from 'app/workspace/properties/Panel'
import Prop from 'app/workspace/properties/Prop'
import executor from 'redux-store/executor'
import Tooltip from 'components/Tooltip'
import pups from '@pups/js'

const Primitive: React.FunctionComponent<ISceneChildPanel> = ({ layer }: ISceneChildPanel) => {
	return (
		<Panel name="Primitive settings" icon="primitive" expandable={true} expanded={true}>
			<Prop layer={layer} name="sideLength" />

			{layer.shape && (
				<div style={{ textAlign: 'right' }}>
					<div style={{ display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }}></div>
				</div>
			)}

			{layer.type === 'Polygon' && <Prop layer={layer} name="sideNumber" />}

			{layer.type === 'Rose' && (
				<React.Fragment>
					<Prop layer={layer} name="n" />
					<Prop layer={layer} name="d" />
				</React.Fragment>
			)}

			{layer.type === 'Lissajous' && (
				<React.Fragment>
					<Prop layer={layer} name="wx" />
					<Prop layer={layer} name="wy" />
					<Prop layer={layer} name="wz" />
				</React.Fragment>
			)}

			{layer.type === 'Spiral' && (
				<React.Fragment>
					<Prop layer={layer} name="twists" />
					<Prop layer={layer} name="twistsStart" />

					<div style={{ display: 'flex', gap: pups.ms(0) }}>
						<span>Spiral type</span>
						<div style={{ flex: 1 }}>
							<Prop layer={layer} name="spiral" />
						</div>
					</div>
				</React.Fragment>
			)}
			{layer.type === 'SuperShape' && (
				<React.Fragment>
					<Prop layer={layer} name="a" />
					<Prop layer={layer} name="b" />
					<Prop layer={layer} name="m" />
					<Prop layer={layer} name="n1" />
					<Prop layer={layer} name="n2" />
					<Prop layer={layer} name="n3" />
				</React.Fragment>
			)}

			<div style={{ textAlign: 'right' }}>
				<div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
					<Prop layer={layer} name="bClosed" />
				</div>
			</div>
			<Prop layer={layer} name="adaptMode" />
		</Panel>
	)
}

export default React.memo(Primitive)
