import * as React from 'react'
import { connect } from 'react-redux'

import { RootState, AppMessages, AppMessage } from 'types/state'

const Messages: React.FunctionComponent<{ messages: AppMessages }> = ({ messages }) => {
	const messages_array: Array<AppMessage> = Object.values(messages).reverse()

	return (
		<ul className="messages">
			{messages_array.map(message => (
				<div className="messages__message" key={message.id}>
					{message.message}
				</div>
			))}
		</ul>
	)
}

export default connect((state: RootState) => ({ messages: state.app.messages }))(Messages)
