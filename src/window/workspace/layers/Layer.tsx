import * as React from 'react'
import styled from 'styled-components'
import pups from '@pups/js'

import Icon from '@components/icons/Icon'
import Tooltip from '@components/Tooltip'
import executor from '@redux-store/executor'
import { isParentOf } from '@window/workspace/layers/layer_utilities'
import { getIcon } from '@ui-services/utilities/utilies'
import { IProjectSceneChild } from 'urpflanze/dist/services/types/exporters-importers'

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
		<Container deep={deep}>
			<Headline selected={selected}>
				{edit ? (
					<Input
						ref={inputRef}
						autoFocus={true}
						defaultValue={layer.name}
						onKeyDown={e => e.keyCode == 13 && rename()}
						onFocus={(e: React.FocusEvent) => (e.target as HTMLInputElement).select()}
					/>
				) : (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<OpenLayerButton onClick={() => layer.children && layer.children.length > 0 && setOpen(!open)}>
							{layer.children && layer.children.length > 0 && (
								<Icon name="arrow-right-fill" size={0} rotate={open ? 90 : 0} fill="#fff" />
							)}
						</OpenLayerButton>

						<Name onClick={(e: React.MouseEvent) => toggleSelection(e, layer.id)}>
							<Icon size={0} name={getIcon(layer.type)} />
							<span style={{ marginLeft: pups.ms(-3) }}>{layer.name}</span>
						</Name>
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
			</Headline>

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
		</Container>
	)
}

const Headline = styled.div<{ selected: boolean }>`
	border: 1px solid ${props => (props.selected ? pups.color('primary') : pups.color('dark'))};
	display: grid;
	align-items: center;
	grid-template-columns: auto max-content max-content max-content;
	line-height: ${pups.ms(2)};
	grid-gap: ${pups.ms(-2)};
	padding-right: ${pups.ms(-2)};

	&:hover {
		background: ${pups.color('dark').lighten(10)};
	}
`

const Container = styled.li<{ deep: number }>`
	list-style: none;
	margin: 0;
	user-select: none;

	position: relative;
	z-index: 1;

	> ${Headline} {
		padding-left: ${props => (props.deep > 0 ? pups.mul(pups.add(0, -2, -2), props.deep + 'rem') : 0)};
	}
`

const Name = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	cursor: cell;
`

const Input = styled.input`
	width: 100%;
	line-height: inherit;
	background: ${pups.color('dark-lighten')};
	border: none;
	padding: 0 ${pups.ms(-1)};
`

const OpenLayerButton = styled.div`
	cursor: pointer;
	width: ${pups.add(0, -3)};
	padding-left: ${pups.ms(-3)};
	height: 100%;
`

export default React.memo(Layer)
