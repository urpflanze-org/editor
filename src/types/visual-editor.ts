import * as Rete from 'rete'

export interface IReteEditor {
	editor: Rete.NodeEditor
	getCode: () => Promise<string>
}

export interface IReteEditorOptions {
	bMatrixRepetitions?: boolean
	bVector?: boolean
	bColor?: boolean
	canbVector?: boolean
	shapeLoop?: boolean
	bVertexCallback?: boolean
}
