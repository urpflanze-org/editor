import app_utilities from 'app_utilities'

export function createDownload(name: string, data: any, mime: string): void {
	console.log({ name, data, mime })
	const blob = new Blob([data], { type: mime })
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')

	a.setAttribute('href', url)
	a.setAttribute('download', name)
	a.setAttribute('target', '_blank')

	document.body.appendChild(a)

	a.click()
	URL.revokeObjectURL(url)
	a.remove()
}

export async function openProjectFromInput(onlyAddChildrenToScene = false): Promise<string | null> {
	return new Promise<string | null>(resolve => {
		const input = document.createElement('input')
		input.setAttribute('type', 'file')
		input.setAttribute('accept', '.' + app_utilities.file_extension)
		input.style.position = 'absolute'
		input.style.top = '-100000'
		input.style.left = '-100000'
		input.style.display = 'none'

		input.addEventListener(
			'change',
			async e => {
				const result = await checkOpenFile(e)
				input.remove()
				resolve(result)
			},
			{ passive: true }
		)

		document.body.appendChild(input)

		input.click()
	})
}

function checkOpenFile(e): Promise<string | null> {
	// Project json
	if (e.target.files && e.target.files.length > 0) {
		const file = e.target.files[0]
		const utf8decoder = new TextDecoder('utf-8')

		return new Promise<string | null>(resolve => {
			const fileReader = new FileReader()

			fileReader.addEventListener(
				'load',
				async () => {
					const data = fileReader.result as Uint8Array

					try {
						const json = utf8decoder.decode(data)
						resolve(json)
					} catch (e) {
						resolve(null)
					}
				},
				{ passive: true }
			)

			fileReader.readAsArrayBuffer(file)
		})
	}

	return Promise.resolve(null)
}
