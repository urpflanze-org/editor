import * as React from 'react'

import { IReteEditorOptions } from '&types/visual-editor'

import { createEditor } from './Rete.jsx'
import { Engine, NodeEditor } from 'rete'
import { IRawState } from '@genbs/urpflanze/dist/services/types/animation'

interface VisualEditorProps {
	initialReteState: string | null
	options: IReteEditorOptions
	setReteAnimation: (reteAnimation: IRawState) => void
}

// let globalRete: { editor: NodeEditor; engine: Engine } | null = null

const VisualEditor: React.FunctionComponent<VisualEditorProps> = (props: VisualEditorProps) => {
	const [key, setKey] = React.useState<number>(0)

	React.useEffect(() => {
		setKey(key + 1)
	}, [props.initialReteState, props.options])

	async function buildEditor(ref: HTMLElement | null) {
		if (ref && ref.parentNode) {
			// if (globalRete) {
			// 	await globalRete.engine.abort()
			// 	globalRete.editor.clear()
			// }

			const data =
				props.initialReteState && props.initialReteState.length > 0 ? JSON.parse(props.initialReteState) : null
			const rete = await createEditor(ref.parentNode, data, props.options)

			// globalRete = { editor: rete.editor, engine: rete.engine }

			rete.editor.on(['process', 'nodecreated', 'noderemoved', 'connectioncreated', 'connectionremoved'], () => {
				setTimeout(async () => {
					const reteEditor = JSON.stringify(rete.editor.toJSON())
					const reteAnimation = { raw: await rete.getCode(), state: reteEditor }

					props.setReteAnimation(reteAnimation)
				})
			})

			if (data) {
				setTimeout(async () => {
					props.setReteAnimation({ raw: await rete.getCode(), state: JSON.stringify(rete.editor.toJSON()) })
				})
			}
		}
	}

	return (
		<div key={key} data-key={key} className="visual-editor">
			<div ref={buildEditor}></div>
		</div>
	)
}

export default React.memo(VisualEditor)
