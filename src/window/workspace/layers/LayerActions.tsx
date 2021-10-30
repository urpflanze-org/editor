import * as React from 'react'

import executor from '@redux-store/executor'

import Tooltip from '@components/Tooltip'
import Icon from '@components/icons/Icon'

import { canBeSorted, find, hasSameParent } from '@window/workspace/layers/layer_utilities'
import dispatchMessage from '@window/messages/dispatchMessage'

import { PossibleCommand } from '@executor/Command/CommandHistory'
import { IProjectSceneChild, TProjectSceneChildProps } from 'urpflanze/dist/services/types/exporters-importers'

interface LayerActionProps {
	selecteds: Array<string | number>
	layers: { [kye: string]: IProjectSceneChild }
}

const ShapesList = [
	'Line',
	'Triangle',
	'Rect',
	'Polygon',
	'Circle',
	'Rose',
	'Spiral',
	'Lissajous',
	'SuperShape',
	'Desidus',
	'Shape',
	'ShapeLoop',
	'Group',
]

function prepareProps(
	layer_id: string,
	props: TProjectSceneChildProps,
	oldprops: TProjectSceneChildProps
): Array<{ id: string; name: string; value: any; prev_value: any }> {
	const result: Array<{ id: string; name: string; value: any; prev_value: any }> = []

	Object.keys(props).forEach(key => {
		result.push({
			id: layer_id,
			name: key,
			value: props[key],
			prev_value: oldprops[key],
		})
	})

	return result
}

function canBeShapeOperation(selecteds: Array<IProjectSceneChild>): boolean {
	if (selecteds.length == 2) {
		return (
			selecteds[0].parentId == selecteds[1].parentId &&
			((selecteds[0].bPrimitive &&
				selecteds[0].type !== 'Line' &&
				typeof selecteds[0].props.repetitions === 'undefined') ||
				selecteds[0].props.repetitions == 1) &&
			((selecteds[1].bPrimitive &&
				selecteds[1].type !== 'Line' &&
				typeof selecteds[1].props.repetitions === 'undefined') ||
				selecteds[1].props.repetitions == 1)
		)
	}

	return false
}

const LayerActions: React.FunctionComponent<LayerActionProps> = (props: LayerActionProps) => {
	const [lastAction, setLastAction] = React.useState<{
		type: 'copy' | 'copy-properties' | 'cut'
		layer: IProjectSceneChild
	} | null>(null)
	const [add, setAdd] = React.useState<boolean>(false)
	const shapesContainer = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		function onDocumentClick(e: MouseEvent) {
			if (
				e.target &&
				shapesContainer.current &&
				e.target != shapesContainer.current &&
				!shapesContainer.current.contains(e.target as HTMLElement)
			)
				setAdd(false)
		}

		document.addEventListener('click', onDocumentClick, { passive: true })

		return () => {
			document.removeEventListener('click', onDocumentClick)
		}
	}, [add])

	const onScene = props.selecteds.length === 0
	const oneSelected = props.selecteds.length === 1
	const multipleSelected = props.selecteds.length > 1

	const layers = Object.values(props.layers)

	const selected = oneSelected && find(props.selecteds[0], layers)
	const selecteds: Array<IProjectSceneChild> = props.selecteds
		.map(selected_id => find(selected_id, layers))
		.filter(l => !!l) as Array<IProjectSceneChild>
	const selectedIsPrimitive = oneSelected && selected ? selected.bPrimitive : false
	const disablePaste = !(
		lastAction &&
		(onScene ||
			(oneSelected && lastAction.layer.id !== (selected as IProjectSceneChild).id) ||
			lastAction.type === 'copy')
	)
	const disablePasteProperties =
		multipleSelected ||
		onScene ||
		!lastAction ||
		lastAction.type != 'copy-properties' ||
		(selected && lastAction.layer.id == (selected as IProjectSceneChild).id)
	const disableCombine = onScene || oneSelected || !canBeShapeOperation(selecteds)

	const cbs = selected ? canBeSorted(selected, layers) : -100
	const bSameParent = hasSameParent(props.selecteds, layers)

	function call(e: React.MouseEvent, action: string, args?: any) {
		switch (action) {
			case 'add': {
				executor.run('add', { type: args, parentId: oneSelected && selected ? selected.id : undefined })
				setAdd(false)
				break
			}
			case 'paste': {
				if (lastAction && lastAction.type !== 'copy-properties') {
					executor.run(lastAction.type, {
						id: lastAction.layer.id,
						parentId: oneSelected && selected ? selected.id : undefined,
						props: lastAction.layer.props,
					})
				}
				break
			}
			case 'paste-properties': {
				if (lastAction && lastAction.type == 'copy-properties' && selected) {
					const props = lastAction.layer.props
					const oldprops = (selected as IProjectSceneChild).props
					executor.run('set-prop', prepareProps(selected.id as string, props, oldprops))
				}
				break
			}
			case 'union':
			case 'difference':
			case 'intersect':
			case 'xor': {
				if (props.selecteds.length == 2) {
					executor.run('shape-operation', {
						type: action,
						a_id: props.selecteds[0],
						b_id: props.selecteds[1],
					})
				}
				break
			}
			default:
				executor.run(action as PossibleCommand, args)
		}
	}

	function canBeMovedToParent(selecteds: Array<IProjectSceneChild>): boolean {
		return true
	}

	function handleLastAction(type: 'copy' | 'copy-properties' | 'cut') {
		if (!(onScene || multipleSelected)) {
			const layer: IProjectSceneChild = selected as IProjectSceneChild
			setLastAction({ type, layer })

			dispatchMessage(`${type} ${layer.name}`)
		}
	}

	return (
		<div className="layer-actions">
			<div className="layer-actions__container layer-actions__container--1">
				{/* <Tooltip position="top" title="Add to custom shapes" disabled={onScene || multipleSelected}>
                    <Icon name="custom-shape" disabled={onScene || multipleSelected}  onClick={(e: React.MouseEvent) => call(e, 'addCustomShape') } />
                </Tooltip> */}
				{/* <Tooltip position="top" title="Move to parent" disabled={onScene || canBeMovedToParent(selecteds)}>
					<Icon
						name="to-top"
						disabled={onScene || canBeMovedToParent(selecteds)}
						onClick={(e: React.MouseEvent) => call(e, e.shiftKey ? 'moveToScene' : 'moveToParent')}
					/>
				</Tooltip> */}
				{/* <Tooltip position="top" title="Cut" disabled={onScene || multipleSelected}>
					<Icon name="cut" disabled={onScene || multipleSelected} onClick={() => handleLastAction('cut')} />
				</Tooltip>
				<Tooltip position="top" title="Copy" disabled={onScene || multipleSelected}>
					<Icon name="copy" disabled={onScene || multipleSelected} onClick={() => handleLastAction('copy')} />
				</Tooltip> */}
				<Tooltip position="top" title="Copy properties" disabled={onScene || multipleSelected}>
					<Icon
						name="copy-properties"
						disabled={onScene || multipleSelected}
						onClick={() => handleLastAction('copy-properties')}
					/>
				</Tooltip>
				{/* <Tooltip position="top" title="Paste" disabled={disablePaste}>
					<Icon name="paste" disabled={disablePaste} onClick={(e: React.MouseEvent) => call(e, 'paste')} />
				</Tooltip> */}
				<Tooltip position="top" title="Paste properties" disabled={disablePasteProperties}>
					<Icon
						name="paste-properties"
						disabled={disablePasteProperties}
						onClick={(e: React.MouseEvent) => call(e, 'paste-properties')}
					/>
				</Tooltip>
				<Tooltip position="top" title="Add shape" disabled={add || !onScene || selectedIsPrimitive}>
					<div className="layer-actions__add" ref={shapesContainer}>
						<Icon
							onClick={() => setAdd(!add)}
							style={{ position: 'relative', zIndex: 2 }}
							name="add"
							rotate={add ? 45 : 0}
							disabled={!onScene && selectedIsPrimitive}
						/>
						<div className={`layer-actions__add__list ${add ? 'layer-actions__add__list--open' : ''}`}>
							{ShapesList.map(shapeName => (
								<div
									className="layer-actions__add__list__item"
									key={shapeName}
									onClick={(e: React.MouseEvent) => {
										call(e, 'add', shapeName)
									}}
								>
									{shapeName}
								</div>
							))}
						</div>
					</div>
				</Tooltip>
				<Tooltip position="top" title="Move down" disabled={multipleSelected || cbs <= -2 || cbs == -1}>
					<Icon
						name="arrow-right-fill"
						size={0}
						rotate={90}
						disabled={multipleSelected || cbs <= -2 || cbs == -1}
						onClick={(e: React.MouseEvent) => call(e, e.shiftKey ? 'move-to-bottom' : 'move-down', props.selecteds[0])}
					/>
				</Tooltip>
				<Tooltip position="top" title="Move up" disabled={multipleSelected || cbs <= -2 || cbs == 1}>
					<Icon
						name="arrow-right-fill"
						size={0}
						rotate={270}
						disabled={multipleSelected || cbs <= -2 || cbs == 1}
						onClick={(e: React.MouseEvent) => call(e, e.shiftKey ? 'move-to-top' : 'move-up', props.selecteds[0])}
					/>
				</Tooltip>
				<Tooltip position="top" title="Make shape" disabled={onScene || !bSameParent}>
					<Icon
						name="shape"
						disabled={onScene || !bSameParent}
						onClick={(e: React.MouseEvent) => call(e, 'make-shape', props.selecteds)}
					/>
				</Tooltip>
				<Tooltip position="top" title="Make recursion" disabled={onScene || !bSameParent}>
					<Icon
						name="recursion"
						disabled={onScene || multipleSelected}
						onClick={(e: React.MouseEvent) => call(e, 'make-recursion', props.selecteds)}
					/>
				</Tooltip>
				{/* <Tooltip position="top" title="Make group" disabled={oneSelected || onScene || !bSameParent}>
					<Icon
						name="group"
						disabled={oneSelected || onScene || !bSameParent}
						onClick={(e: React.MouseEvent) => call(e, 'makeGroup')}
					/>
				</Tooltip> */}
				<Tooltip position="top" title="Remove" disabled={onScene}>
					<Icon
						name="remove"
						disabled={onScene}
						onClick={(e: React.MouseEvent) => call(e, 'remove', props.selecteds)}
					/>
				</Tooltip>
			</div>
			<div className="layer-actions__container layer-actions__container--2">
				<Tooltip position="top" title="Union" disabled={disableCombine}>
					<Icon
						name="shape-combine-union"
						disabled={disableCombine}
						onClick={(e: React.MouseEvent) => call(e, 'union')}
					/>
				</Tooltip>
				<Tooltip position="top" title="Difference" disabled={disableCombine}>
					<Icon
						name="shape-combine-difference"
						disabled={disableCombine}
						onClick={(e: React.MouseEvent) => call(e, 'difference')}
					/>
				</Tooltip>
				<Tooltip position="top" title="Intersect" disabled={disableCombine}>
					<Icon
						name="shape-combine-intersect"
						disabled={disableCombine}
						onClick={(e: React.MouseEvent) => call(e, 'intersect')}
					/>
				</Tooltip>
				<Tooltip position="top" title="XOR" disabled={disableCombine}>
					<Icon name="shape-combine-xor" disabled={disableCombine} onClick={(e: React.MouseEvent) => call(e, 'xor')} />
				</Tooltip>
			</div>
		</div>
	)
}

export default React.memo(LayerActions)
