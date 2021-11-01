import * as React from 'react'
import { connect } from 'react-redux'
import pups from '@pups/js'
import { relativeClamp } from '@urpflanze/core/dist/cjs'

import { RootState, TOpenModal } from 'types/state'

import AppBar from 'app/app_bar/AppBar'
import StatusBar from 'app/status_bar/StatusBar'
import Messages from 'app/messages/Messages'
import Workspace from 'app/workspace/Workspace'
import SplashScreen from 'app/splash_screen/SplashScreen'
import Tutorial from 'app/tutorial/Tutorial'

import Grid from 'components/Grid'
import useWindowSize from 'hooks/useWindowSize'

import Modals from 'app/Modals'

interface MainProps {
	bSplashScreen: boolean
	bTutorial: boolean
	modal: TOpenModal
	modal_props: any
	closeModal: () => void
}

const Main: React.FunctionComponent<MainProps> = ({ bSplashScreen, bTutorial }: MainProps) => {
	const size = useWindowSize()

	React.useEffect(() => {
		const rootBase = Math.floor(relativeClamp(600, 2560, size.width, 13, 18))

		pups.modularScale.setRootBase(rootBase + 'px')
		document.documentElement.style.fontSize = rootBase + 'px'
	}, [size])

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
