import * as React from 'react'
import { TutorialPartProps, Style } from '@window/tutorial/TutorialPart'

const Introduction: React.FunctionComponent<TutorialPartProps> = ({ active, pages }: TutorialPartProps) => {
	return (
		<div style={Style(pages)}>
			<h3>Introduction</h3>
			<p>Benvenuti in mandalla app, un software open source per la creazione di geometrie o animazioni</p>
		</div>
	)
}

export default Introduction
