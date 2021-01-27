import * as React from 'react'
import { connect } from 'react-redux'

import styled, { keyframes } from 'styled-components'
import pups from '@pups/js'

import { RootState, AppMessages, AppMessage } from '&types/state'

const Messages: React.FunctionComponent<{ messages: AppMessages }> = ({ messages }) => {
	const messages_array: Array<AppMessage> = Object.values(messages).reverse()

	return (
		<ul style={MessagesContainerStyle}>
			{messages_array.map(message => (
				<Message key={message.id}>{message.message}</Message>
			))}
		</ul>
	)
}

const MessagesContainerStyle: React.CSSProperties = {
	position: 'fixed',
	bottom: 0,
	left: 0,
	listStyle: 'none',
	margin: 0,
	padding: 0,
}

const MessageAnimation = keyframes`
    from { transform: translate(0%, 0%) scale(.8); }
    to { transform: translate(0%, 0%) scale(1); }
`

const Message = styled.li`
	background: ${pups.color('secondary')};
	color: #fff;
	padding: ${pups.ms(-1)};
	margin: ${pups.ms(-1)};
	transform-origin: left center;
	animation: ${MessageAnimation} 0.1s ease-out both;
`

export default connect((state: RootState) => ({ messages: state.app.messages }))(Messages)
