import store from '@redux-store/root'
import { showMessage, hideMessage } from '@redux-store/app/actions'


export default function(message: string, data = undefined, durate = 3000): void {
    const { message_id } = store.dispatch(showMessage(message, data))

    setTimeout(() => {
        store.dispatch(hideMessage(message_id))
    }, durate)
}