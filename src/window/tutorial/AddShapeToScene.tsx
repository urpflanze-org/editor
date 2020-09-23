import * as React from 'react'
import { TutorialPartProps } from '@window/tutorial/TutorialPart'
import { highlight, dehighlight } from '@window/tutorial/TutorialPart'

const Introduction: React.FunctionComponent<TutorialPartProps> = ({ active, pages }: TutorialPartProps) => {
	React.useEffect(() => {
		const toolbarElement = document.querySelector('section[data-name="toolbar"]') as HTMLElement | null

		if (active) {
			if (toolbarElement) {
				highlight(toolbarElement)
			}
		} else {
			if (toolbarElement) {
				dehighlight(toolbarElement)
			}
		}
	}, [active])

	return (
		<div style={{ width: 100 / pages + '%' }}>
			asdasd asdasdasdas asda
			<div>asdas</div>
		</div>
	)
}

export default Introduction
