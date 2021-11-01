import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'types/state'

import { selectLayers } from 'redux-store/project/actions'

import SceneChildInfo from 'app/workspace/properties/panels/SceneChildInfo'
import Repetition from 'app/workspace/properties/panels/Repetitions'
import Primitive from 'app/workspace/properties/panels/Primitive'
import Transform from 'app/workspace/properties/panels/Transform'
import ShapeLoop from 'app/workspace/properties/panels/ShapeLoop'
import Style from 'app/workspace/properties/panels/Style'
import ShapeRecursive from 'app/workspace/properties/panels/ShapeRecursive'
import { IProjectSceneChild } from 'urpflanze-ext'

interface PropertiesProp {
	selected_layer?: IProjectSceneChild
	selectLayer: (id: any) => void
}

const Properties: React.FunctionComponent<PropertiesProp> = ({ selected_layer, selectLayer }: PropertiesProp) => {
	return (
		<section data-name="properties" style={{ maxHeight: '100%', overflow: 'auto' }}>
			{selected_layer ? (
				<React.Fragment>
					<SceneChildInfo layer={selected_layer} selectLayer={selectLayer} />

					{selected_layer.type === 'ShapeLoop' && <ShapeLoop layer={selected_layer} />}
					{(selected_layer.bPrimitive || selected_layer.type === 'Group') && <Style layer={selected_layer} />}
					{selected_layer.type === 'ShapeRecursive' && <ShapeRecursive layer={selected_layer} />}
					<Repetition layer={selected_layer} />
					{selected_layer.bPrimitive && <Primitive layer={selected_layer} />}
					<Transform layer={selected_layer} />
				</React.Fragment>
			) : (
				<i>Select layer to change properties</i>
			)}
		</section>
	)
}

export default connect(
	(state: RootState) => ({
		selected_layer: state.project.open_layer_properties,
	}),
	dispatch => ({
		selectLayer: id => dispatch(selectLayers([id])),
	})
)(Properties)