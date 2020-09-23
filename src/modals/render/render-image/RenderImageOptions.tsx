import * as React from 'react'

import { IRenderSettings } from '@genbs/urpflanze/dist/services/renderer/interfaces'

import Select from '@components/input/Select'
import Slider from '@components/input/Slider'
import Radio from '@components/input/Radio'
import Checkbox from '@components/input/Checkbox'

interface RenderImageOptionProps {
	settings: IRenderSettings
	setSettings: (settings: IRenderSettings) => void
	downloadSize: string | null
}

const SIZES = [256, 512, 1024, 2048, 4096, 8192].map(v => ({ key: v, value: v }))

const RenderImageOption: React.FunctionComponent<RenderImageOptionProps> = ({
	settings,
	setSettings,
	downloadSize,
}: RenderImageOptionProps) => {
	return (
		<div>
			<Radio
				name="Image type"
				selected={settings.type}
				values={[
					{ key: 'JPEG', value: 'image/jpeg' },
					{ key: 'PNG', value: 'image/png' },
					{ key: 'SVG', value: 'image/svg+xml' },
				]}
				onChange={t => setSettings({ ...settings, type: t })}
			/>
			{settings.type !== 'image/svg+xml' && (
				<Select
					value={settings.size}
					placeholder="Size"
					options={SIZES}
					onChange={size => setSettings({ ...settings, size })}
				/>
			)}
			<Slider
				value={settings.quality}
				min={0.1}
				max={1}
				step={0.1}
				onChange={quality => setSettings({ ...settings, quality })}
			/>

			{settings.type !== 'image/jpeg' && (
				<Checkbox
					checked={settings.noBackground}
					onChange={c => setSettings({ ...settings, noBackground: c })}
					name="Remove background color"
				/>
			)}

			{downloadSize && <div>{downloadSize}</div>}
		</div>
	)
}

export default React.memo(RenderImageOption)
