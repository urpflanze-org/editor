import * as React from 'react'
import pups from '@pups/js'

import Range, { IRange } from 'components/input/Range'
import { toNumber, toArray } from 'utilities'
import Grid from 'components/Grid'
import { TSliderMode } from 'hooks/useSlider'

interface IMultipleRange extends Omit<IRange, 'value'> {
	value: Array<number>
	locked: boolean
}

const MultipleRange: React.FunctionComponent<IMultipleRange> = (props: IMultipleRange) => {
	function onChange(new_value: any, mode: TSliderMode, index?: number) {
		let value

		if (typeof index !== 'undefined') {
			value = toArray(props.value)
			value[index] = new_value
		} else value = new_value

		props.onChange(value, mode)
	}

	if (props.locked) return <Range {...props} value={toNumber(props.value)} onChange={(v, m) => onChange(v, m)} />

	const value = toArray(props.value)

	return (
		<Grid rows={2} gap={pups.ms(-4)} style={{ height: '100%', width: '100%' }}>
			<Range {...props} small={true} value={value[0]} onChange={(v, m) => onChange(v, m, 0)} />
			<Range {...props} small={true} value={value[1]} onChange={(v, m) => onChange(v, m, 1)} />
		</Grid>
	)
}

export default React.memo(MultipleRange)
