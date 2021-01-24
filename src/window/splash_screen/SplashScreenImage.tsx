import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import pups from '@pups/js'
import { randomElement } from '@pups/utility/build/Array'

import DrawerCanvas from '@genbs/urpflanze/dist/services/drawers/drawer-canvas/DrawerCanvas'
import JSONImporter from '@genbs/urpflanze/dist/services/importers/JSONImporter'

//prettier-ignore
const examples = [
	// `{"id":"e5b65351-f7a4-11ea-b945-35980b588c30","name":"splash_1","width":491,"height":265.4054054054054,"background":"#111413","color":"#1fcc9a","clear":true,"ghosts":3,"ghostSkipTime":45,"ratio":1.85,"scene":{"761599d0-d011-11ea-94c2-93a9acce0c52":{"id":"761599d0-d011-11ea-94c2-93a9acce0c52","type":"Shape","name":"Shape_3","order":0,"data":{"props":{"distance":0,"repetitions":1,"displace":{"type":"simple","value":{"from":0,"to":360,"durate":5000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"scale":4.43},"visible":true,"highlighted":false,"disableGhost":false},"depth":0,"bPrimitive":false,"props":{"distance":0,"repetitions":1,"displace":{"type":"simple","value":{"from":0,"to":360,"durate":5000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"scale":4.43},"children":[{"id":"20e2a580-d010-11ea-90ac-51b5f98cf390","type":"Shape","name":"Shape_1","order":0,"data":{"props":{"distance":{"type":"simple","value":{"from":0,"to":16,"durate":2500,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"repetitions":9,"squeezeX":{"type":"simple","value":{"from":0,"to":0.01,"durate":2500,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"easing","modeFunction":"cubicInOut","delay":0}},"displace":0,"scale":0.54},"visible":true,"highlighted":false,"disableGhost":false},"depth":1,"bPrimitive":false,"props":{"distance":{"type":"simple","value":{"from":0,"to":16,"durate":2500,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"repetitions":9,"squeezeX":{"type":"simple","value":{"from":0,"to":0.01,"durate":2500,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"easing","modeFunction":"cubicInOut","delay":0}},"displace":0,"scale":0.54},"children":[{"id":"70271dc0-d00f-11ea-90ac-51b5f98cf390","type":"Shape","name":"Shape_1","order":0,"data":{"props":{"distance":{"type":"simple","value":{"from":6,"to":22,"durate":2500,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"cos","delay":0}},"repetitions":6,"rotateX":{"type":"simple","value":{"from":0,"to":180,"durate":2500,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"skewX":0,"squeezeX":{"type":"simple","value":{"from":0,"to":0.016,"durate":2500,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"displace":0},"visible":true,"highlighted":false,"disableGhost":false},"depth":2,"bPrimitive":false,"props":{"distance":{"type":"simple","value":{"from":6,"to":22,"durate":2500,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"cos","delay":0}},"repetitions":6,"rotateX":{"type":"simple","value":{"from":0,"to":180,"durate":2500,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"skewX":0,"squeezeX":{"type":"simple","value":{"from":0,"to":0.016,"durate":2500,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"displace":0},"children":[{"id":"0d22e920-d00f-11ea-90ac-51b5f98cf390","type":"Rect","name":"Circle_1","order":0,"data":{"props":{"distance":{"type":"simple","value":{"from":0,"to":3,"durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"repetitions":4,"skewX":0,"skewY":0,"squeezeX":{"type":"simple","value":{"from":0,"to":0.01,"durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"displace":0,"scale":{"type":"simple","value":{"from":0.15,"to":0.34,"durate":2500,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"sideLength":2.4,"fillColor":{"type":"simple","value":{"from":"rgba(0,255,104,1)","to":"rgba(255,0,5,1)","durate":2500,"invertOdd":true,"colorTransitionMode":"hue","type":"loop","mode":"sinusoidal","modeFunction":"cos","delay":0}},"bAdaptBuffer":2,"bCloseShape":true},"visible":true,"highlighted":false,"disableGhost":false},"depth":3,"bPrimitive":true,"props":{"distance":{"type":"simple","value":{"from":0,"to":3,"durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"repetitions":4,"skewX":0,"skewY":0,"squeezeX":{"type":"simple","value":{"from":0,"to":0.01,"durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"displace":0,"scale":{"type":"simple","value":{"from":0.15,"to":0.34,"durate":2500,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"sideLength":2.4,"fillColor":{"type":"simple","value":{"from":"rgba(0,255,104,1)","to":"rgba(255,0,5,1)","durate":2500,"invertOdd":true,"colorTransitionMode":"hue","type":"loop","mode":"sinusoidal","modeFunction":"cos","delay":0}},"bAdaptBuffer":2,"bCloseShape":true},"shape":{"0":-1,"1":-1,"2":1,"3":-1,"4":1,"5":1,"6":-1,"7":1},"bAdaptBuffer":2,"bCloseShape":true}]}]}]}},"sequence":{"start":0,"end":5000,"durate":5000,"framerate":60}}`,
	// `{"id":"b01fdeb1-f7a3-11ea-9ebd-454398a9d50f","name":"splash_2","width":500,"height":270,"background":"#111413","color":"#1fcc9a","clear":true,"ghosts":4,"ghostSkipTime":20,"ratio":1.85,"scene":{"9508e580-d0f3-11ea-8311-efe78dbb3dbe":{"id":"9508e580-d0f3-11ea-8311-efe78dbb3dbe","type":"Shape","name":"Shape_2","order":0,"data":{"props":{"scale":{"type":"simple","value":{"from":0.5,"to":1.06,"durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"easing","modeFunction":"cubicOut","delay":0}},"distance":0},"visible":true,"highlighted":false,"disableGhost":false},"depth":0,"bPrimitive":false,"props":{"distance":0,"scale":{"type":"simple","value":{"from":0.5,"to":1.06,"durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"easing","modeFunction":"cubicOut","delay":0}}},"children":[{"id":"d60f4750-d0f2-11ea-8311-efe78dbb3dbe","type":"Shape","name":"Shape_1","order":0,"data":{"props":{"distance":{"type":"simple","value":{"from":0,"to":25,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"repetitions":8,"rotateY":{"type":"simple","value":{"from":0,"to":180,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"cos","delay":0}},"skewX":0,"squeezeX":{"type":"simple","value":{"from":0,"to":0.022,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"cos","delay":0}},"scale":{"type":"simple","value":{"from":1.7,"to":0.52,"durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"cos","delay":0}},"rotateX":{"type":"simple","value":{"from":0,"to":180,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}}},"visible":true,"highlighted":false,"disableGhost":false},"depth":1,"bPrimitive":false,"props":{"distance":{"type":"simple","value":{"from":0,"to":25,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"repetitions":8,"rotateX":{"type":"simple","value":{"from":0,"to":180,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"rotateY":{"type":"simple","value":{"from":0,"to":180,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"cos","delay":0}},"skewX":0,"squeezeX":{"type":"simple","value":{"from":0,"to":0.022,"durate":2000,"invertOdd":true,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"cos","delay":0}},"scale":{"type":"simple","value":{"from":1.7,"to":0.52,"durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"cos","delay":0}}},"children":[{"id":"d60f6e60-d0f2-11ea-8311-efe78dbb3dbe","type":"Group","name":"Group_1","order":0,"data":{"props":{"distance":46,"repetitions":10},"visible":true,"highlighted":false,"disableGhost":false},"depth":2,"bPrimitive":false,"props":{"data":{"ui":{"visible":true,"shapeLoop":{},"highlighted":false,"props":{"distance":37}}},"distance":46,"repetitions":10},"children":[{"id":"b9afca30-d0f2-11ea-8311-efe78dbb3dbe","type":"Line","name":"Line_1","order":0,"data":{"props":{"distance":37,"repetitions":10,"squeezeX":0,"sideLength":15.9,"lineWidth":0.2,"strokeColor":{"type":"simple","value":{"from":"rgba(255,16,0,1)","to":"rgba(0,194,204,1)","durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"bAdaptBuffer":2,"bCloseShape":true,"sideNumber":2},"visible":true,"highlighted":false,"disableGhost":false},"depth":3,"bPrimitive":true,"props":{"distance":37,"repetitions":10,"squeezeX":0,"sideLength":15.9,"lineWidth":0.2,"strokeColor":{"type":"simple","value":{"from":"rgba(255,16,0,1)","to":"rgba(0,194,204,1)","durate":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"bAdaptBuffer":2,"sideNumber":2,"data":{"ui":{"visible":true,"shapeLoop":{},"highlighted":false,"props":{"distance":37}}},"bCloseShape":true},"shape":{"0":-1,"1":0,"2":1,"3":0},"bAdaptBuffer":2,"bCloseShape":true},{"id":"c0543ab0-d0f2-11ea-8311-efe78dbb3dbe","type":"Rect","name":"Circle_1","order":1,"data":{"props":{"distance":37,"repetitions":10,"sideLength":0.7,"fillColor":{"type":"simple","value":{"from":"rgba(129,0,255,1)","to":"rgba(193,128,255,1)","durate":2000,"invertOdd":true,"colorTransitionMode":"hue","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"bAdaptBuffer":2,"bCloseShape":true,"squeezeX":0.02},"visible":true,"highlighted":false,"disableGhost":false},"depth":3,"bPrimitive":true,"props":{"distance":37,"repetitions":10,"squeezeX":0.02,"sideLength":0.7,"fillColor":{"type":"simple","value":{"from":"rgba(129,0,255,1)","to":"rgba(193,128,255,1)","durate":2000,"invertOdd":true,"colorTransitionMode":"hue","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"bAdaptBuffer":2,"data":{"ui":{"visible":true,"shapeLoop":{},"highlighted":false,"props":{"distance":37}}},"bCloseShape":true},"shape":{"0":-1,"1":-1,"2":1,"3":-1,"4":1,"5":1,"6":-1,"7":1},"bAdaptBuffer":2,"bCloseShape":true},{"id":"bd410740-d0f2-11ea-8311-efe78dbb3dbe","type":"Circle","name":"Circle_1","order":2,"data":{"props":{"distance":46,"repetitions":10,"squeezeX":0.2,"sideLength":2.3,"fillColor":{"type":"simple","value":{"from":"rgba(164,0,255,1)","to":"rgba(59,255,112,1)","durate":2000,"invertOdd":true,"colorTransitionMode":"hue","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"bAdaptBuffer":2,"bCloseShape":true},"visible":true,"highlighted":false,"disableGhost":false},"depth":3,"bPrimitive":true,"props":{"distance":46,"repetitions":10,"squeezeX":0.2,"sideLength":2.3,"fillColor":{"type":"simple","value":{"from":"rgba(164,0,255,1)","to":"rgba(59,255,112,1)","durate":2000,"invertOdd":true,"colorTransitionMode":"hue","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"bAdaptBuffer":2,"data":{"ui":{"visible":true,"shapeLoop":{},"highlighted":false,"props":{"distance":37}}},"bCloseShape":true},"bAdaptBuffer":2,"bCloseShape":true}]}]}]}},"sequence":{"start":0,"end":2000,"framerate":60}}`,
	`{"id":"eb94f280-5dd0-11eb-a957-dbb3bcd0c558","urpflanze_version":"%VERSION%","name":"EmptyProject","width":922,"height":498.37837837837833,"resolution":600,"background":"#111413","color":"#5c6361","clear":true,"ghosts":10,"ghostSkipTime":15,"ratio":1.85,"scene":{"7bd501c0-5a9b-11eb-a564-c1b5010acd62":{"id":"7bd501c0-5a9b-11eb-a564-c1b5010acd62","type":"Shape","name":"Shape_1","order":0,"data":{"visible":true},"depth":0,"bPrimitive":false,"props":{"distance":{"type":"simple","value":{"from":{"type":"transformable-prop","value":-10},"to":{"type":"transformable-prop","value":15},"duration":3000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"cos","delay":0}},"repetitions":6,"rotateX":{"type":"transformable-prop"},"rotateY":0,"rotateZ":0,"squeezeY":0,"displace":{"type":"simple","value":{"from":{"type":"transformable-prop","value":0},"to":{"type":"transformable-prop","value":360},"duration":6000,"invertOdd":false,"colorTransitionMode":"rgb","type":"static","mode":"easing","modeFunction":"linear","delay":0}},"translate":{"type":"transformable-prop","value":[0,22.7]},"scale":1,"transformOrigin":[0,0],"perspective":0,"perspectiveOrigin":[0,0]},"style":{},"bUseParent":false,"bUseRecursion":false,"children":[{"id":"72080110-5a9b-11eb-a564-c1b5010acd62","type":"Circle","name":"Circle_1","data":{"visible":true},"depth":1,"bPrimitive":true,"props":{"distance":{"type":"simple","value":{"from":{"type":"transformable-prop","value":0},"to":{"type":"transformable-prop","value":15},"duration":2000,"invertOdd":false,"colorTransitionMode":"rgb","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}},"repetitions":39,"scale":0.56,"sideLength":{"type":"transformable-prop","value":1}},"style":{"fill":{"type":"simple","value":{"from":"hsla(37, 100%, 56%, 0.41)","to":"hsla(207, 100%, 50%, 0.26)","duration":2000,"invertOdd":false,"colorTransitionMode":"hue","type":"loop","mode":"sinusoidal","modeFunction":"sin","delay":0}}},"parentId":"7bd501c0-5a9b-11eb-a564-c1b5010acd62","bUseParent":false,"bUseRecursion":false,"adaptMode":0,"bClosed":true}]}},"sequence":{"duration":6000,"framerate":60}}`
]

// const examples_images = ['meanderings.jpg']
const examples_images = []

const SplashScreenImage: React.FunctionComponent<{}> = () => {
	const canvas = React.createRef<HTMLCanvasElement>()

	React.useEffect(() => {
		let drawer: DrawerCanvas | null

		if (canvas.current) {
			if (Math.random() > 1) {
				const image = new Image()

				image.addEventListener('load', () => {
					if (canvas.current) {
						canvas.current.getContext('2d')?.drawImage(image, 0, 0)
					}
				})
				canvas.current.width = 1024
				canvas.current.height = 1024
				canvas.current.style.transform = 'translateY(-25%)'
				image.src = '/assets/images/examples/' + randomElement(examples_images)
			} else {
				// drawer = new DrawerCanvas(undefined, undefined, {}, 500)
				drawer = JSONImporter.parse(randomElement(examples))

				if (drawer) {
					drawer.setBuffering(true)
					drawer.setCanvas(canvas.current)
					// canvas.current.style.transform = 'translateY(-25%)'
					// drawer.startAnimation()
					// drawer.preload().then(time => {
					// 	console.log('preloaded in', time)
					// })
					drawer?.startAnimation()
				}
			}
		}
		return () => {
			drawer && drawer.stopAnimation()
		}
	}, [canvas.current])

	return (
		<div style={{ position: 'relative' }}>
			<Containter>
				<canvas ref={canvas} />
			</Containter>
			<div
				style={{
					background: 'linear-gradient(0deg, rgba(0,0,0, 0.4) 0%, rgba(0,0,0,0) 80%)',
					position: 'absolute',
					bottom: -1,
					left: 0,
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: `${pups.ms(-1)} ${pups.ms(0)}`,
					color: 'rgba(255,255,255,.4)',
				}}
			>
				<div>Author</div>
				<div>Send yours</div>
			</div>
		</div>
	)
}

const Appear = keyframes`from { opacity: 1; } to { opacity: 0; } `

const Containter = styled.div`
	position: relative;
	width: 500px;
	height: 270px;
	overflow: hidden;
	position: relative;

	&:after {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		content: ' ';
		width: 100%;
		height: 100%;
		background: ${pups.color('dark')};
		animation: ${Appear} 0.5s 0.1s linear both;
	}

	canvas {
		width: 100% !important;
		height: auto !important;
	}
`

export default React.memo(SplashScreenImage)
