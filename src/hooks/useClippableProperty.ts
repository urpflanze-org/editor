import * as React from 'react'
import { ctrlKeyPressed } from 'utilities'
import dispatchMessage from 'app/messages/dispatchMessage'

import { ISceneChildUtiltiesData, TAnimation, TPropInputType } from 'urpflanze-ext'

interface ClippedProp {
	value: any
	name: string
	type: TPropInputType
}

let lastClipped: ClippedProp | null = null

function useClippableProperty(
	ref: React.RefObject<HTMLDivElement>,
	sceneChildProp: ISceneChildUtiltiesData,
	currentValue: any,
	handleChange: (
		new_value: TAnimation | string | number | [number, number] | boolean,
		preventPushToHistory?: boolean
	) => void
): void {
	React.useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (ctrlKeyPressed(e)) {
				if (e.shiftKey) {
					e.stopImmediatePropagation()
					if (
						lastClipped &&
						(lastClipped.type === sceneChildProp.type ||
							(lastClipped.type === 'multiple-range' && sceneChildProp.type === 'range') ||
							(sceneChildProp.type === 'multiple-range' && lastClipped.type === 'range'))
					) {
						handleChange(lastClipped.value)
						dispatchMessage(lastClipped.name + ' pasted to ' + sceneChildProp.name)
					}
				} else {
					e.stopImmediatePropagation()
					lastClipped = { value: currentValue, type: sceneChildProp.type, name: sceneChildProp.name }
					dispatchMessage(sceneChildProp.name + ' copied')
				}
			}
		}

		ref.current?.addEventListener('click', handleClick, { passive: true })

		return () => {
			ref.current?.removeEventListener('click', handleClick)
		}
	}, [ref, currentValue, sceneChildProp, handleChange])
}

export default useClippableProperty
