import * as React from 'react'
import { connect } from 'react-redux'
import pups from '@pups/js'

import { hideTutorial } from '@redux-store/app/actions'

import { TutorialPartProps } from '@window/tutorial/TutorialPart'
import Introduction from '@window/tutorial/Introduction'
import AddShapeToScene from '@window/tutorial/AddShapeToScene'

const TutorialParts: Array<React.FunctionComponent<TutorialPartProps>> = [Introduction, AddShapeToScene]

interface TutorialProps {
	hide: () => void
}

const Tutorial: React.FunctionComponent<TutorialProps> = ({ hide }: TutorialProps) => {
	const sliderRef = React.useRef<HTMLDivElement>(null)
	const [page, setPage] = React.useState<number>(0)
	const pages = TutorialParts.length

	React.useEffect(() => {
		if (sliderRef.current) {
			sliderRef.current.style.transform = `translateX(-${page * (100 / pages)}%)`
		}
	}, [page, sliderRef])

	return (
		<div style={Container}>
			<div style={Content}>
				<div style={{ overflow: 'hidden', width: '100%', maxWidth: '36vw' }}>
					<div
						ref={sliderRef}
						style={{
							width: pages * 100 + '%',
							display: 'flex',
							flexDirection: 'row',
							transition: 'transform .2s cubic-bezier(0.580, 0.145, 0.860, 0.855)',
						}}
					>
						{TutorialParts.map((Part, index) => (
							<Part key={index} pages={pages} active={index === page} />
						))}
					</div>
				</div>
				<div style={{ display: 'flex', flexDirection: 'row', gap: pups.ms(-2) }}>
					{new Array(pages).fill(1).map((v, i) => (
						<div
							key={i}
							onClick={() => setPage(i)}
							style={{ ...Bullet, background: pups.color(i === page ? 'primary' : 'dark-verylighten').toString('hex') }}
						></div>
					))}
				</div>
				<div style={{ marginTop: pups.ms(2) }} onClick={hide}>
					close
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

const Bullet: React.CSSProperties = {
	width: pups.ms(-1),
	height: pups.ms(-1),
	cursor: 'pointer',
	borderRadius: '50%',
}

export default React.memo(
	connect(null, dispatch => ({
		hide: () => dispatch(hideTutorial()),
	}))(Tutorial)
)
