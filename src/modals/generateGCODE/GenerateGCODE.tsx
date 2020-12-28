import * as React from 'react'
import { connect } from 'react-redux'

import { RootState } from '&types/state'

const GenerateGCODE = () => {
	return <div>gcode</div>
}
export default React.memo(
	connect((state: RootState) => ({
		project: state.project,
	}))(GenerateGCODE)
)
