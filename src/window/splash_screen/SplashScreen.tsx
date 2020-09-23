import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import pups from '@pups/js'

import { hideSplashScreen, showTutorial } from '@redux-store/app/actions'

import Grid from '@components/Grid'
import executor from '@redux-store/executor'
import SplashScreenImage from '@window/splash_screen/SplashScreenImage'
import { openProject, newProject } from '@window/app_bar/menu/File'
import app_utilities from 'app_utilities'

interface SplashScreenProps {
	hide: () => void
	showTutorial: () => void
}

const SplashScreen: React.FunctionComponent<SplashScreenProps> = ({ hide, showTutorial }: SplashScreenProps) => {
	function runTutorial() {
		hide()
		showTutorial()
	}

	const bAutosave = executor.hasAutosave()

	return (
		<React.Fragment>
			<div
				style={{ position: 'fixed', zIndex: 11, top: 0, left: 0, width: '100vw', height: '100vh' }}
				onClick={hide}
			></div>
			<Container>
				<SplashScreenImage />
				<div style={{ padding: pups.ms(2) }}>
					<h2 style={{ marginBottom: pups.ms(0) }}>
						Work in progress{' '}
						<small style={{ fontSize: '.8rem', fontWeight: 'initial' }}>v{app_utilities.app_version}</small>
					</h2>
					<Grid rows={2} flow={'max-content max-content'} gap={pups.ms(0)}>
						<Grid columns={2}>
							<div onClick={runTutorial}>Tutorial 👋</div>
							<div></div>
						</Grid>
						<Grid columns={2}>
							<div>
								<div
									style={{ cursor: 'pointer' }}
									onClick={() => {
										newProject(() => hide())
									}}
								>
									New
								</div>
								<div
									style={{ cursor: 'pointer' }}
									onClick={() => {
										openProject(false, () => hide())
									}}
								>
									Open
								</div>
								<div
									style={{ opacity: bAutosave ? 1 : 0.2, cursor: bAutosave ? 'pointer' : '' }}
									onClick={() => {
										if (executor.hasAutosave()) {
											executor.restoreAutosave()
											hide()
										}
									}}
								>
									Recover Last Session
								</div>
							</div>
							<div>{/* Support */}</div>
						</Grid>
					</Grid>
				</div>
			</Container>
		</React.Fragment>
	)
}

const Container = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	background: ${pups.color('dark-lighten')};
	transform: translate(-50%, -50%);
	box-shadow: 0 ${pups.ms(0)} ${pups.ms(2)} ${pups.ms(0)} rgba(0, 0, 0, 0.5);
	border-radius: 2px;
	z-index: 12;
`

export default React.memo(
	connect(null, dispatch => ({
		hide: () => dispatch(hideSplashScreen()),
		showTutorial: () => dispatch(showTutorial()),
	}))(SplashScreen)
)
