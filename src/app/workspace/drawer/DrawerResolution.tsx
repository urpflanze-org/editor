import * as React from 'react'
import pups from '@pups/js'

import executor from 'redux-store/executor'

import Grid from 'components/Grid'
import Select from 'components/input/Select'
import Storage from 'storage/Storage'

interface IDrawerResolutionProps {
	size: number
	ratio: number
	resolution: 'low' | 'medium' | 'high' | 'ultra'
	setResolution: (resolution: 'low' | 'medium' | 'high' | 'ultra') => void
}

const DrawerResolution: React.FunctionComponent<IDrawerResolutionProps> = ({
	size,
	resolution,
	setResolution,
}: IDrawerResolutionProps) => {
	React.useEffect(() => {
		Storage.set('resolution', resolution)
		executor.setDrawer(undefined, size, resolution)
	}, [resolution])

	return (
		<Grid rows={2} flow="max-content auto" style={{ justifyItems: 'center' }} gap={pups.ms(-2)}>
			<small>Resolution</small>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<small>
					<Select
						width={'5rem'}
						position="top"
						options={['low', 'medium', 'high', 'ultra'].map(e => ({ key: e == 'medium' ? 'med' : e, value: e }))}
						value={resolution}
						onChange={e => setResolution(e)}
						placeholder="Resolution"
					/>
				</small>
			</div>
		</Grid>
	)
}

export default React.memo(DrawerResolution)
