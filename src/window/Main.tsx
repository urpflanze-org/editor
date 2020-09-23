import * as React from 'react'
import { connect } from 'react-redux'
import pups from '@pups/js'

import { RootState, TOpenModal } from '&types/state'

import AppBar from '@window/app_bar/AppBar'
import StatusBar from '@window/status_bar/StatusBar'
import Messages from '@window/messages/Messages'
import Workspace from '@window/workspace/Workspace'
import SplashScreen from '@window/splash_screen/SplashScreen'
import Tutorial from '@window/tutorial/Tutorial'

import Grid from '@components/Grid'

import Modals from './Modals'

interface MainProps {
	bSplashScreen: boolean
	bTutorial: boolean
	modal: TOpenModal
	modal_props: any
	closeModal: () => void
}

const Main: React.FunctionComponent<MainProps> = ({ bSplashScreen, bTutorial }: MainProps) => {
	return (
		<React.Fragment>
			<Grid {...mainLayout}>
				<AppBar />
				<Workspace />
				<StatusBar />
				<Messages />
			</Grid>
			{bTutorial && <Tutorial />}
			{bSplashScreen && <SplashScreen />}

			<Modals />
		</React.Fragment>
	)
}

const mainLayout = {
	rows: 3,
	flow: `${pups.ms(2)} auto ${pups.ms(1)}`,
	style: { height: '100vh' },
	component: 'section',
}

export default React.memo(
	connect((state: RootState) => ({
		bTutorial: state.app.bTutorial,
		bSplashScreen: state.app.bSplashScreen,
	}))(Main)
)
