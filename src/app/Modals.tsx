import * as React from 'react'
import { connect } from 'react-redux'
import { RootState, TOpenModal } from 'types/state'

import { openModal } from 'redux-store/app/actions'

import Modal from 'components/Modal'

import RenderImage from 'modals/render/render-image/RenderImage'
import RenderAnimation from 'modals/render/render-animation/RenderAnimation'
import GenerateGCODE from 'modals/generateGCODE/GenerateGCODE'
import SVGImport from 'modals/SVGImport'

interface ModalsProps {
	modal: TOpenModal
	modal_props: any
	closeModal: () => void
}

const Modals: React.FunctionComponent<ModalsProps> = ({ modal, modal_props, closeModal }: ModalsProps) => {
	function getModalComponent(modal: Required<TOpenModal>) {
		switch (modal) {
			case 'render-image':
				return <RenderImage {...modal_props} closeModal={closeModal} />
			case 'render-animation':
				return <RenderAnimation {...modal_props} closeModal={closeModal} />
			case 'generate-gcode':
				return <GenerateGCODE {...modal_props} closeModal={closeModal} />
			case 'import-svg':
				return <SVGImport {...modal_props} closeModal={closeModal} />
		}
	}

	return modal ? (
		<Modal open={true} close={closeModal} noCloseButton={modal == 'render-animation' || modal == 'render-image'}>
			{getModalComponent(modal)}
		</Modal>
	) : null
}

export default React.memo(
	connect(
		(state: RootState) => ({
			modal: state.app.opened_modal,
			modal_props: state.app.opened_modal_props,
		}),
		dispatch => ({
			closeModal: () => dispatch(openModal(undefined)),
		})
	)(Modals)
)
