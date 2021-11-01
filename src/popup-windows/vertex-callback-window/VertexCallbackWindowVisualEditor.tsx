import * as React from 'react'

import VisualEditor from 'components/VisualEditor/VisualEditor'
import { IRawState } from 'urpflanze-ext'

interface VertextCallbackWindowVisualEditorProp {
	initialReteState: string | null
	setReteAnimationRef: (reteAnimation: IRawState) => void
}

const VertextCallbackWindowVisualEditor: React.FunctionComponent<VertextCallbackWindowVisualEditorProp> = (
	props: VertextCallbackWindowVisualEditorProp
) => {
	return (
		<div style={{ width: '100%', height: '100%' }}>
			<VisualEditor
				options={{ bVector: true, bVertexCallback: true }}
				initialReteState={props.initialReteState}
				setReteAnimation={props.setReteAnimationRef}
			/>
		</div>
	)
}

export default React.memo(VertextCallbackWindowVisualEditor)
