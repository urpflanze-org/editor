import Executor from 'executor/Executor'
import { IComunication, IComunicationResponse, IEventResponse } from 'types/comunication'

const executor = new Executor()

executor.attach('event', event => {
	if (event) {
		const response: IEventResponse = { type: 'event', ...event }

		//@ts-ignore
		self.postMessage(response)
	}
})

self.onmessage = async function (e: MessageEvent) {
	if (e.data) {
		const comunication: IComunication = e.data
		const response: IComunicationResponse = await executor.read(comunication)

		// console.log('deamon response', response)
		//@ts-ignore
		self.postMessage(response)
	}
}
