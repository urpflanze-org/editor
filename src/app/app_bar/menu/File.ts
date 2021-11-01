import executor from 'redux-store/executor'
import { SubMenuActions } from 'app/app_bar/SubMenu'
import dispatchMessage from 'app/messages/dispatchMessage'
import { createDownload, openProjectFromInput } from 'app/app_bar/menu/FileUtility'
import Prompt from 'components/Prompt'
import app_utilities from 'app_utilities'
import pups from '@pups/js'

export async function newProject(callback?: () => any): Promise<void> {
	const name = await Prompt('Set project name', app_utilities.empty_project_name)

	if (name !== null) {
		const project = await executor.ask(
			'import-json',
			JSON.stringify({
				name,
				scene: {},
				background: pups.color('dark').toString('hex'),
				mainColor: pups.color('primary').toString('hex'),
				sequence: { start: 0, end: 6000, durate: 6000, framerate: 60 },
			})
		)

		if (project) {
			dispatchMessage(name + ' created.')
			callback && callback()
			return
		}

		dispatchMessage('creation error')
	}

	callback && callback()
}

export async function openProject(onlyAddChildrenToScene = false, callback?: () => any): Promise<void> {
	const result = await openProjectFromInput(onlyAddChildrenToScene)
	if (result) {
		const project = await executor.ask(onlyAddChildrenToScene ? 'append-json' : 'import-json', result)

		if (project) {
			callback && callback()
			dispatchMessage(onlyAddChildrenToScene ? 'added to scene' : 'imported')

			return
		}
	}

	dispatchMessage('error import')
}

const FileActions: SubMenuActions = [
	{
		name: 'New',
		action: () => {
			newProject()
		},
	},
	{
		name: 'Open',
		action: () => {
			openProject()
		},
	},
	{
		name: 'Recover',
		action: () => {
			executor.restoreAutosave()
		},
	},
	{
		name: 'Import',
		action: () => {
			openProject(true)
		},
	},
	{
		name: 'Save',
		action: ({ project }) => {
			executor.autosave(project).then(() => {
				dispatchMessage('Save complete')
			})
		},
	},
	{
		name: 'Save As',
		action: async ({ project }) => {
			const name = await Prompt(
				'Project name',
				project.name && project.name.length > 0 ? project.name : app_utilities.empty_project_name
			)

			const project_json = await executor.ask('export-json', { name })
			// project.name = name
			// const project_json = new JSONExporter().parse(project)
			const utf8encoder = new TextEncoder()
			const data = utf8encoder.encode(project_json)
			createDownload(project.name + '.' + app_utilities.file_extension, data, 'application/octet-stream')
		},
	},
]

export default FileActions
