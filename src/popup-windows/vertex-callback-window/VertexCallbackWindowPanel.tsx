import * as React from 'react'

import pups from '@pups/js'
import Range from '@components/input/Range'
import SceneChildUtilitiesData, {
	ISceneChildUtiltiesData,
} from '@genbs/urpflanze/dist/services/scene-utilities/SceneChildUtilitiesData'
import Checkbox from '@components/input/Checkbox'
import { IProjectSceneChild } from '@genbs/urpflanze/dist/services/types/exporters-importers'

export interface LoopMeta {
	start: number
	end: number
	inc: number
	dynamyc: boolean
}

interface VertexCallbackWindowWindowPanelProp {
	scene: { [key: string]: IProjectSceneChild }
	layer: IProjectSceneChild
	loopMeta: LoopMeta
	setLoopMeta: (loopMeta: LoopMeta) => void
}

const VertexCallbackWindowWindowPanel: React.FunctionComponent<VertexCallbackWindowWindowPanelProp> = (
	props: VertexCallbackWindowWindowPanelProp
) => {
	const inputs: Array<ISceneChildUtiltiesData> = [
		SceneChildUtilitiesData['loop.start'],
		SceneChildUtilitiesData['loop.end'],
		SceneChildUtilitiesData['loop.inc'],
	]

	return (
		<React.Fragment>
			<div style={Panel}>
				<div style={Name}>{props.layer.name}</div>
				{inputs.map(input => (
					<div key={input.name} style={{ width: pups.ms(5), height: pups.ms(2), lineHeight: pups.ms(2) }}>
						<Range
							max={input.max as number}
							min={input.min as number}
							step={input.step as number}
							value={props.loopMeta[input.label]}
							onChange={v => props.setLoopMeta({ ...props.loopMeta, [input.label]: v })}
						/>
					</div>
				))}
				<div>
					<Checkbox
						name="Dynamic"
						size={1}
						checked={props.loopMeta.dynamyc}
						onChange={dynamyc => props.setLoopMeta({ ...props.loopMeta, dynamyc })}
					/>
				</div>
			</div>
		</React.Fragment>
	)
}

const Panel: React.CSSProperties = {
	position: 'absolute',
	top: 0,
	right: 0,
	display: 'flex',
	alignItems: 'flex-end',
	flexDirection: 'column',
	gap: pups.ms(0),
	padding: pups.ms(1),
}

const Name: React.CSSProperties = {
	fontSize: pups.ms(1),
}

export default React.memo(VertexCallbackWindowWindowPanel)
