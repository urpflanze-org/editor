import * as React from 'react'

import { ProjectState } from '&types/state'
import executor from '@redux-store/executor'
import dispatchMessage from '@window/messages/dispatchMessage'
import { ctrlKeyPressed } from '@ui-services/utilities/utilies'

import Prompt from '@components/Prompt'
import Confirm from '@components/Confirm'
import app_utilities from 'app_utilities'
import { openModal } from '@redux-store/app/actions'
import store from '@redux-store/root'
import { isOpenPopup } from '@popup-windows/PupupUtilities'
import { SVGImporter } from '../../../js/dist'

interface KeyboardControllerProps {
	project: ProjectState
	updateProjectProperties: (props: Omit<Partial<ProjectState>, 'scene'>) => void
}

export interface IAutosaveState {
	project_id: string
	interval: boolean
}

function KeyboardController({ project, updateProjectProperties }: KeyboardControllerProps): void {
	const [autosaveState, setAutosaveState] = React.useState<IAutosaveState>({
		project_id: '',
		interval: false,
	})

	const [promptOpen, setPromptOpen] = React.useState<boolean>(false)

	React.useEffect(() => {
		function handlePaste(e: ClipboardEvent) {
			const data = e.clipboardData?.getData('text') || ''
			if (SVGImporter.isSVG(data)) {
				// executor.ask('import-svg', SVGImporter.toBuffers(data))
				store.dispatch(openModal('import-svg', { svg: data }))
			}
		}

		document.addEventListener('paste', handlePaste, { passive: true })

		return () => document.removeEventListener('paste', handlePaste)
	}, [])

	React.useEffect(() => {
		let tid = 0

		if (autosaveState.interval && autosaveState.project_id === project.id) {
			tid = setTimeout(() => {
				if (!isOpenPopup()) {
					dispatchMessage('autosave')
					executor.autosave(project)
				}
			}, app_utilities.autosave_timeout)
		}

		return () => {
			tid && clearTimeout(tid)
		}
	}, [autosaveState, project])

	React.useEffect(() => {
		async function autosave() {
			const restored_id = executor.getAutosaveProjectId()

			if (restored_id && restored_id != project.id) {
				setPromptOpen(true)
				const override = await Confirm('Override exist autosave project?', 'Yes', 'No')

				if (!override) {
					const restore = await Confirm('Restore autosave project?', 'Yes', 'No')
					if (restore) {
						setAutosaveState({ project_id: restored_id, interval: true })
						executor.restoreAutosave()
					}

					setPromptOpen(false)
					return
				}
			}

			if (typeof project.name === 'undefined' || project.name.length === 0) {
				setPromptOpen(true)
				const name = await Prompt('Set project name', app_utilities.empty_project_name)

				if (name === null) {
					return
				}

				updateProjectProperties({ name })
				project.name = name
				document.title = app_utilities.getDocumentProjectTitle(name)
				setAutosaveState({ ...autosaveState })
				setPromptOpen(false)
			}

			if (
				project.id !== autosaveState.project_id ||
				(project.id === autosaveState.project_id && !autosaveState.interval)
			) {
				setAutosaveState({ project_id: project.id, interval: true })
			}

			executor.autosave(project).then(() => dispatchMessage(`${project.name} saved`))
		}

		function handleKeyDown(event) {
			if (event.keyCode == 70 /*f*/ && ctrlKeyPressed(event)) {
				if (!document.fullscreenElement) document.body.requestFullscreen()
				else document.exitFullscreen()
				return event.preventDefault()
			}

			if (!promptOpen) {
				switch (event.keyCode) {
					case 32 /* space_bar */:
						executor.ask('toggle-timeline')
						break
					case 90 /*z*/:
						if (ctrlKeyPressed(event)) {
							event.shiftKey ? executor.redo() : executor.undo()
						}
						break
					case 83 /*s*/:
						if (ctrlKeyPressed(event)) {
							event.preventDefault()
							autosave()
						}
						break
					// case 86 /*v*/:
					//     handlePaste()
					//     break
				}
			} else if (event.keyCode == 83 /*s*/ && ctrlKeyPressed(event)) {
				event.preventDefault()
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [project, autosaveState, promptOpen])
}

export default KeyboardController
