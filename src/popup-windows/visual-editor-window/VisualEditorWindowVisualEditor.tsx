import * as React from 'react'

import VisualEditor from '@components/VisualEditor/VisualEditor'
import { IProjectSceneChild } from 'urpflanze/dist/services/types/exporters-importers'
import { IRawState } from 'urpflanze/dist/services/types/animation'
import SceneChildPropsData from '@ui-services/utilities/SceneChildUtilitiesData'

interface VisualEditorWindowVisualEditorProp {
	prop_name: string | undefined
	layer: IProjectSceneChild | undefined
	initialReteState: string | null
	setReteAnimation: (reteAnimation: IRawState) => void
}

const VisualEditorWindowVisualEditor: React.FunctionComponent<VisualEditorWindowVisualEditorProp> = (
	props: VisualEditorWindowVisualEditorProp
) => {
	const options = {
		bMatrixRepetitions: props.layer?.props.repetitions ? Array.isArray(props.layer?.props.repetitions) : false,
		bVector: props.prop_name ? SceneChildPropsData[props.prop_name].type === 'multiple-range' : false,
		bColor: props.prop_name ? SceneChildPropsData[props.prop_name].type === 'color' : false,
		// canbVector?: boolean
		// shapeLoop?: boolean
		// bVertexCallback?: boolean
	}
	return (
		<div style={{ width: '100%', height: '100%' }}>
			{props.layer && props.prop_name ? (
				<VisualEditor
					options={options}
					initialReteState={props.initialReteState}
					setReteAnimation={props.setReteAnimation}
				/>
			) : (
				<div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
					<div>Select layer and prop</div>
				</div>
			)}
		</div>
	)
}

export default React.memo(VisualEditorWindowVisualEditor)
