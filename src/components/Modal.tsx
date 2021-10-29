import * as React from 'react'
import ReactDOM from 'react-dom'

import Icon from '@components/icons/Icon'

interface ModalProps {
	open: boolean
	noCloseButton?: boolean
	close?: (e: React.MouseEvent) => void
	bCloseOnBackground?: boolean
}

const Modal: React.FunctionComponent<ModalProps> = ({
	bCloseOnBackground,
	open,
	close,
	children,
	noCloseButton = false,
}) => {
	const modalRoot: HTMLElement = document.getElementById('modal-root') as HTMLElement
	const container: HTMLDivElement = document.createElement('div')

	React.useEffect(() => {
		modalRoot.appendChild(container)

		return () => {
			modalRoot.removeChild(container)
		}
	}, [modalRoot, container])

	return open
		? ReactDOM.createPortal(
				<div className="modal">
					<div className="modal__background" onClick={e => bCloseOnBackground && close && close(e)} />
					<div className="modal__content">
						{!noCloseButton && (
							<div className="modal__content__icon-container">
								<Icon onClick={close} name="close" />
							</div>
						)}
						{children}
					</div>
				</div>,
				container
		  )
		: null
}

export default React.memo(Modal)
