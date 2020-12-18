import * as React from 'react'
import { IProjectSceneChild } from '@genbs/urpflanze/dist/services/types/exporters-importers'

import pups from '@pups/js'
import Range from '@components/input/Range'
import SceneChildPropsData from '@ui-services/utilities/SceneChildPropsData'
import { ISceneChildPropData } from '@genbs/urpflanze/dist/services/scene-utilities/SceneChildPropsData'
import Checkbox from '@components/input/Checkbox'

export interface LoopMeta {
	start: number
	end: number
	inc: number
	dynamyc: boolean
}

interface ShapeLoopWindowPanelProp {
	scene: { [key: string]: IProjectSceneChild }
	layer: IProjectSceneChild
	loopMeta: LoopMeta
	setLoopMeta: (loopMeta: LoopMeta) => void
}

const ShapeLoopWindowPanel: React.FunctionComponent<ShapeLoopWindowPanelProp> = (props: ShapeLoopWindowPanelProp) => {
	const inputs: Array<ISceneChildPropData> = [
		SceneChildPropsData['loop.start'],
		SceneChildPropsData['loop.end'],
		SceneChildPropsData['loop.inc'],
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

export default React.memo(ShapeLoopWindowPanel)
