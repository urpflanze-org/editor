import * as React from 'react'

import VisualEditor from '@components/VisualEditor/VisualEditor'
import { IRawState } from 'urpflanze/dist/services/types/animation'

interface ShapeLoopWindowVisualEditorProp {
	initialReteState: string | null
	setReteAnimationRef: (reteAnimation: IRawState) => void
}

const ShapeLoopWindowVisualEditor: React.FunctionComponent<ShapeLoopWindowVisualEditorProp> = (
	props: ShapeLoopWindowVisualEditorProp
) => {
	return (
		<div style={{ width: '100%', height: '100%' }}>
			<VisualEditor
				options={{ shapeLoop: true, bVector: true }}
				initialReteState={props.initialReteState}
				setReteAnimation={props.setReteAnimationRef}
			/>
		</div>
	)
}

export default React.memo(ShapeLoopWindowVisualEditor)
