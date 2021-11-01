import pups from '@pups/js'

export interface TutorialPartProps {
	pages: number
	active: boolean
}

const color = pups.color('primary').spin(180).toString('hex')

export const Style = (pages): React.CSSProperties => ({
	width: 100 / pages + '%',
})

export const highlight = (element: HTMLElement) => {
	element.dataset.tmp = JSON.stringify({
		outline: element.style.outline,
		boxShadow: element.style.boxShadow,
	})

	element.style.outline = '1px solid ' + color
	element.style.boxShadow = '0 0 20px ' + color
}

export const dehighlight = (element: HTMLElement) => {
	const tmp = element.dataset.tmp ? JSON.parse(element.dataset.tmp) : { outline: '', boxShadow: '' }

	element.style.outline = tmp.outline
	element.style.boxShadow = tmp.boxShadow
}
