import * as React from 'react'

import Panel, { ISceneChildPanel } from 'app/workspace/properties/Panel'
import Prop from 'app/workspace/properties/Prop'

const ShapeRecursive: React.FunctionComponent<ISceneChildPanel> = (props: ISceneChildPanel) => {
	const layer = props.layer

	return (
		<Panel name="ShapeRecursive" icon="loop" expandable={true} expanded={true}>
			<Prop layer={layer} name="recursions" />
			<Prop layer={layer} name="recursionScale" />
			<Prop layer={layer} name="recursionVertex" />
		</Panel>
	)
}

export default React.memo(ShapeRecursive)
