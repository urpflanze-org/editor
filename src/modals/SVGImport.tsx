import * as React from 'react'

// import DrawerCanvas from 'urpflanze/dist/services/drawer-canvas/DrawerCanvas'

import executor from '@redux-store/executor'
import { SVGImporter } from '../../../js/dist'

interface SVGImprtModalProps {
	closeModal: () => void
	svg: string
}

// interface SVGImportState {
//     drawer?: DrawerCanvas
//     points: number
//     svg: string
// }

const SVGImport: React.FunctionComponent<SVGImprtModalProps> = ({ svg, closeModal }: SVGImprtModalProps) => {
	// const canvasRef = React.createRef<HTMLCanvasElement>()

	// const [buffers, setBuffers] = React.useState<Array<{ buffer: Float32Array, closed: boolean }> | null>(null)

	// const [state, setState] = React.useState<SVGImportState>({
	//     points: 0, simplify: 0.001, svg: ''
	// })

	// React.useEffect(() => {
	//     setTimeout(() => {
	//         SVGImporter.toBuffersAsync(svg).then(setBuffers)
	//     })
	// }, [])

	// React.useEffect(() => {
	//     if (canvasRef.current && buffers)
	//     {
	//         const scene = new Scene({
	//             background: pups.color('dark').toString('hex'),
	//             mainColor: pups.color('primary').toString('hex')
	//         })
	//         const size = 400
	//         const drawer = new DrawerCanvas(scene, canvasRef.current, {}, size)
	//         drawer.resize(size, size)

	//         const sceneChild = svgBufferToScene(drawer, buffers)
	//         if (sceneChild)
	//         {
	//             sceneChild.setProp('scale', 4)
	//             drawer.draw()
	//             setState({ drawer, points: sceneChild.getBufferLength() / 2, svg })
	//         }
	//     }
	// }, [canvasRef.current, buffers])

	// return (
	//     <div>
	//         <canvas ref={canvasRef} style={{ width: 0, height: 0 }}></canvas>

	//         {state.drawer ? (
	//             <div>
	//                 <div style={SVGTextStyle} value={state.svg} disabled={true}></div>

	//                 {state.points}
	//             </div>
	//         ) : (
	//             <div>loading</div>
	//         )}
	//         <div onClick={closeModal}>Close</div>
	//     </div>
	// )

	React.useEffect(() => {
		executor.run('create-from-buffer', { buffers: SVGImporter.SVGStringToBuffers(svg) }).then(closeModal)
	}, [])

	return <div>import svg</div>
}

const SVGTextStyle = {}

export default React.memo(SVGImport)
