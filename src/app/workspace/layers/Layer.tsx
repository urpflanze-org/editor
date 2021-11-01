import * as React from 'react'
import pups from '@pups/js'

import Icon from 'components/icons/Icon'
import Tooltip from 'components/Tooltip'
import executor from 'redux-store/executor'
import { isParentOf } from 'app/workspace/layers/layer_utilities'
import { getIcon } from 'utilities'
import { IProjectSceneChild } from 'urpflanze-ext'

interface LayerProps {
	layer: IProjectSceneChild
	layers: Array<IProjectSceneChild>
	deep: number
	toggleSelection: (e: React.MouseEvent, layer_id: string | number) => void
	selecteds: Array<string | number>
}

const Layer: React.FunctionComponent<LayerProps> = ({
	layer,
	deep,
	toggleSelection,
	layers,
	selecteds,
}: LayerProps) => {
	const [open, setOpen] = React.useState(
		layers && selecteds.length == 1 ? isParentOf(layer.id, selecteds[0], layers) : false
	)
	const [edit, setEdit] = React.useState(false)
	const inputRef = React.createRef<HTMLInputElement>()
	const selected = selecteds.includes(layer.id)

	React.useEffect(() => {
		if (layers && !open && isParentOf(layer.id, selecteds[0], layers)) {
			setOpen(true)
		}
	}, [selecteds, open, layers])

	function rename() {
		if (inputRef.current && inputRef.current.value.length > 0) {
			inputRef.current.value != layer.name &&
				executor.ask('layer-rename', { id: layer.id, name: inputRef.current.value })
			setEdit(false)
		}
	}

	return (
		<div className={`layer ${selected ? 'layer--selected' : ''}`} deep={deep}>
			<div className="layer__head">
				{edit ? (
					<input
						className="layer__head__input"
						ref={inputRef}
						autoFocus={true}
						defaultValue={layer.name}
						onKeyDown={e => e.keyCode == 13 && rename()}
						onFocus={(e: React.FocusEvent) => (e.target as HTMLInputElement).select()}
					/>
				) : (
					<div className="layer__head__name-wrapper">
						<div
							className="layer__head__name-wrapper__open-btn"
							onClick={() => layer.children && layer.children.length > 0 && setOpen(!open)}
						>
							{layer.children && layer.children.length > 0 && (
								<Icon name="arrow-right-fill" size={0} rotate={open ? 90 : 0} fill="#fff" />
							)}
						</div>

						<div className="layer__head__name" onClick={(e: React.MouseEvent) => toggleSelection(e, layer.id)}>
							<Icon size={0} name={getIcon(layer.type)} />
							<span style={{ marginLeft: pups.ms(-3) }}>{layer.name}</span>
						</div>
					</div>
				)}

				{edit ? (
					<Icon name="save" fill="#fff" onClick={() => rename()} />
				) : (
					<Tooltip title="Rename">
						<Icon name="edit" fill="#fff" onClick={() => setEdit(true)} />
					</Tooltip>
				)}
				<Tooltip title="Highlight">
					<Icon
						name="highlight"
						fill="#fff"
						onMouseOver={() => executor.ask('layer-highlight', { id: layer.id, status: true })}
						onMouseOut={() => executor.ask('layer-highlight', { id: layer.id, status: false })}
					/>
				</Tooltip>

				<Tooltip title="Visibility">
					{layer.data.visible ? (
						<Icon
							name="visible"
							fill="#fff"
							onClick={() => executor.ask('layer-visibility', { id: layer.id, status: false })}
						/>
					) : (
						<Icon
							name="hidden"
							fill="#fff"
							onClick={() => executor.ask('layer-visibility', { id: layer.id, status: true })}
						/>
					)}
				</Tooltip>
			</div>

			{open && layer.children && layer.children.length > 0 && (
				<ul style={{ margin: 0, padding: 0 }}>
					{layer.children.map(child => (
						<Layer
							key={child.id}
							layers={layers}
							layer={child}
							selecteds={selecteds}
							toggleSelection={toggleSelection}
							deep={deep + 1}
						/>
					))}
				</ul>
			)}
		</div>
	)
}

export default React.memo(Layer)
