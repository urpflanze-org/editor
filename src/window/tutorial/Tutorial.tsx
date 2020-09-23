import * as React from 'react'
import { connect } from 'react-redux'
import pups from '@pups/js'

import { hideTutorial } from '@redux-store/app/actions'
import Button from '@components/input/Button'

interface TutorialProps {
	hide: () => void
}

const Tutorial: React.FunctionComponent<TutorialProps> = ({ hide }: TutorialProps) => {
	return (
		<div style={Container}>
			<div style={Content}>
				<div style={{ overflow: 'hidden', width: '100%', maxWidth: '36vw' }}>
					<h2>Sorry!</h2>
					<p>Will be available soon</p>
				</div>

				<div style={{ marginTop: pups.ms(0), textAlign: 'right' }} onClick={hide}>
					<Button label="Close" />
				</div>
			</div>
		</div>
	)
}

const Container: React.CSSProperties = {
	position: 'fixed',
	zIndex: 11,
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
}

const Content: React.CSSProperties = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	background: pups.color('dark-lighten').toString('hex'),
	transform: 'translate(-50%, -50%)',
	boxShadow: `0 ${pups.ms(0)} ${pups.ms(2)} ${pups.ms(0)} rgba(0, 0, 0, 0.5)`,
	borderRadius: '2px',
	zIndex: 12,
	padding: pups.ms(2),
}

export default React.memo(
	connect(null, dispatch => ({
		hide: () => dispatch(hideTutorial()),
	}))(Tutorial)
)
