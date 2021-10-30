import * as React from 'react'
import { connect } from 'react-redux'

import { hideSplashScreen, showTutorial } from '@redux-store/app/actions'

import Grid from '@components/Grid'
import executor from '@redux-store/executor'
import SplashScreenImage from '@window/splash_screen/SplashScreenImage'
import { openProject, newProject } from '@window/app_bar/menu/File'
import app_utilities from 'app_utilities'
import pups from '@pups/js'

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
		<div className="splash-screen">
			<div className="splash-screen__background" onClick={hide}></div>
			<div className="splash-screen__wrapper">
				<SplashScreenImage />
				<div className="splash-screen__content">
					<h2 className="splash-screen__content__title">
						Work in progress <small className="splash-screen__content__subtitle">v{app_utilities.app_version}</small>
					</h2>
					<Grid className="splash-screen__content__info" rows={2} flow={'max-content max-content'} gap={pups.ms(0)}>
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
							<div>
								<a href="https://ko-fi.com/urpflanze" target="_blank" rel="noreferrer">
									Support this project
								</a>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
		</div>
	)
}

export default React.memo(
	connect(null, dispatch => ({
		hide: () => dispatch(hideSplashScreen()),
		showTutorial: () => dispatch(showTutorial()),
	}))(SplashScreen)
)
