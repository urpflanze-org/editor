import * as React from 'react'
import { connect } from 'react-redux'

import Panel, { ISceneChildPanel } from '@window/workspace/properties/Panel'
import Prop from '@window/workspace/properties/Prop'
import Grid from '@components/Grid'
import pups from '@pups/js'
import Checkbox from '@components/input/Checkbox'
import executor from '@redux-store/executor'
// import Select from '@components/input/Select'
// import executor from '@redux-store/executor'
import { RootState } from '&types/state'

const Style: React.FunctionComponent<ISceneChildPanel & { bGhost: boolean }> = ({
	layer,
	bGhost,
}: ISceneChildPanel & { bGhost: boolean }) => {
	// function onCompositeChange(c)
	// {
	//     c = c == 'none' ? undefined : c
	//     console.log('composite', c);
	//     executor.run('set-ui-prop', {
	//         id: layer.id,
	//         name: 'composite',
	//         value: c,
	//         prev_value: props.composite
	//     })
	// }

	const [disableGhost, setDisableGhost] = React.useState<boolean>(layer.data.disableGhost)

	async function toggleGhost() {
		const _disableGhost = !disableGhost

		await executor.ask('layer-ghost', {
			id: layer.id,
			status: _disableGhost,
		})

		setDisableGhost(_disableGhost)
	}

	React.useEffect(() => {
		layer.data.disableGhost != disableGhost && setDisableGhost(layer.data.disableGhost)
	}, [layer.id])

	return (
		<Panel name="Style" icon="style" expandable={true} expanded={true}>
			<Grid
				columns={4}
				gap={pups.ms(-2)}
				flow="max-content max-content auto max-content"
				valign="center"
				style={{ width: '100%', overflow: 'hidden' }}
			>
				<Prop layer={layer} name="style.fill" />
				<Prop layer={layer} name="style.stroke" />
				<Prop layer={layer} name="style.lineWidth" />
				<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
					{bGhost && (
						<React.Fragment>
							<small style={{ lineHeight: 1, marginBottom: pups.ms(-2) }}>Disable Ghost</small>
							<div style={{ display: 'flex', height: pups.add(1, -1), alignItems: 'center', justifyContent: 'center' }}>
								<Checkbox checked={disableGhost} name="" onChange={toggleGhost} size={1} />
							</div>
						</React.Fragment>
					)}
				</div>
			</Grid>
			{/* <Select options={COMPOSITE} value={props.composite} placeholder="Composite" onChange={onCompositeChange} /> */}
		</Panel>
	)
}

// const COMPOSITE = [
//     'none',
//     'source-over', 'source-in', 'source-out', 'source-atop',
//     'destination-over', 'destination-in', 'destination-out', 'destination-atop',
//     'lighter', 'copy', 'xor', 'multiply', 'screen', 'overlay',
//     'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light',
//     'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'
// ].map(c => ({ key: c, value: c }))

// export default React.memo(
//     connect((state: RootState, props: ISceneChildPanel) => ({
//         composite: props.layer ? props.layer.ui.composite : undefined
//     }))(Style)
// )
export default React.memo(
	connect((state: RootState) => ({
		bGhost: state.project.ghosts > 0,
	}))(Style)
)
