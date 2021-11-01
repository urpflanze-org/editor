import * as React from 'react'
import { connect } from 'react-redux'

import { RootState } from 'types/state'

import executor from 'redux-store/executor'

const GenerateGCODE = () => {
	// const [settings, setSettings] = React.useState<IGCODESettings>(GCODEExporter.defaults)
	const [gcode, setGCODE] = React.useState<string>('')

	async function setGCode() {
		// console.log('settings', settings)
		// const _gcode = await executor.ask('export-gcode', { settings })
		// console.log('OK')
		// setGCODE(_gcode)
	}

	function update(name: string, value: string | number) {
		if (!['penUpCommand', 'penDownCommand'].includes(name)) {
			value = parseFloat(value as string)
		}

		// setSettings({ ...settings, [name]: value })
	}
	// console.log(settings)

	return (
		<div>
			{/* {Object.keys(settings).map(key => (
				<div key={key}>
					{key}{' '}
					<input
						className="input"
						type="text"
						value={settings[key]}
						name={key}
						onChange={e => update(e.target.name, e.target.value)}
					/>
				</div>
			))} */}

			<button onClick={setGCode}>Generate</button>

			<textarea
				className="input textarea"
				value={gcode}
				readOnly
				style={{ width: '400px', height: '400px' }}
			></textarea>
		</div>
	)
}
export default React.memo(
	connect((state: RootState) => ({
		project: state.project,
	}))(GenerateGCODE)
)
