import * as React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'

import { IProjectSceneChild } from 'urpflanze/dist/services/types/exporters-importers'
import { IRawState } from 'urpflanze/dist/services/types/animation'
import useRect from '@hooks/useRect'

interface CodeEditorWindowEditorProp {
	prop_name: string | undefined
	layer: IProjectSceneChild | undefined
	initialCodeState: string | null
	setCurrentRawCode: (raw: IRawState) => void
}

const CodeEditorWindowEditor: React.FunctionComponent<CodeEditorWindowEditorProp> = (
	props: CodeEditorWindowEditorProp
) => {
	const ref = React.useRef<HTMLDivElement>(null)
	const [k, setK] = React.useState<string>(`code__${props.layer?.id}__${props.prop_name}__0`)

	function onChange(code) {
		props.setCurrentRawCode({ raw: code, state: null })
	}
	React.useEffect(() => {
		setK(`code__${props.layer?.id}__${props.prop_name}__${k + 1}`)
	}, [props.layer?.id, props.prop_name, props.initialCodeState])

	const { width, height } = useRect(ref)

	return (
		<div style={{ width: '100%', height: '100%' }} ref={ref}>
			{props.layer && props.prop_name ? (
				<div>
					<AceEditor
						key={k}
						width={width + 'px'}
						height={height + 'px'}
						mode="javascript"
						theme="monokai"
						onChange={onChange}
						value={props.initialCodeState === null ? undefined : props.initialCodeState}
						name={k}
						editorProps={{ $blockScrolling: true }}
						setOptions={{
							enableBasicAutocompletion: true,
							enableLiveAutocompletion: false,
							enableSnippets: true,
							showLineNumbers: true,
							tabSize: 4,
							fontSize: '1rem / 1.618',
						}}
					/>
				</div>
			) : (
				<div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
					<div>Select layer and prop</div>
				</div>
			)}
		</div>
	)
}

export default React.memo(CodeEditorWindowEditor)
