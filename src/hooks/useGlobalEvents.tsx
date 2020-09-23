import * as React from 'react'
import { type } from 'os'

const defaultOptions: EventOptions = {
    passive: true,
    once: false,
    capture: false
}

interface EventOptions {
    passive?: boolean
    once?: boolean
    capture?: boolean
}

type Callback = (args: any) => void


type OnGlobalEvent = (events: string | Array<string>, callback: Callback, options?: EventOptions) => void
type OffGlobalEvent = (events: string | Array<string>, callback: Callback, options?: EventOptions) => void

interface GlobalEventHandler {
    options: EventOptions
    callbacks: Array<Callback> 
    handler: any
}

const global_events_listeners: { [eventName: string]: Array<GlobalEventHandler> } = {}


function bEqualOptions(a: EventOptions, b: EventOptions): boolean { return a.passive == b.passive && a.capture == b.capture && a.once == b.once }


function on(e: string | Array<string>, callback: Callback, o: EventOptions = defaultOptions) 
{
    const options: EventOptions = { ...defaultOptions, ...(o || {}) }
    const events: Array<string> = typeof e === 'string' ? [e] : e

    events.forEach(event => {

        if (event in global_events_listeners) 
        {
            let added = false
            for (let i = 0, len = global_events_listeners[event].length; i < len; i++)
            {
                const optionsCallback: GlobalEventHandler = global_events_listeners[event][i]
                if (bEqualOptions(options, optionsCallback.options))
                {
                    optionsCallback.callbacks.push(callback)
                    added = true
                    break
                }
            }

            if (!added)
                global_events_listeners[event].push({ options, callbacks: [callback], handler: createHandler(event, options) })
        } 
        else {
            global_events_listeners[event] = [{ options, callbacks: [callback], handler: createHandler(event, options) }]
        }
    })
}

function off(e: string | Array<string>, callback: Callback, o: EventOptions = defaultOptions) 
{
    const events: Array<string> = typeof e === 'string' ? [e] : e
    const options: EventOptions = { ...defaultOptions, ...(o || {}) }

    events.forEach(event => {
        if (event in global_events_listeners) 
        {
            for (let i = 0, len = global_events_listeners[event].length; i < len; i++)
            {
                const optionsCallback: GlobalEventHandler = global_events_listeners[event][i]
                if (bEqualOptions(options, optionsCallback.options))
                {
                    optionsCallback.callbacks.splice(optionsCallback.callbacks.indexOf(callback), 1)
                    if (optionsCallback.callbacks.length === 0) 
                    {
                        window.removeEventListener(event, optionsCallback.handler)

                        global_events_listeners[event].splice(i, 1)

                        break
                    }
                }
            }

            if (global_events_listeners[event].length == 0)
                delete global_events_listeners[event]
        } 
    })
}


function createHandler(event: string, options: EventOptions) 
{
    function handler(e)
    {
        if (event in global_events_listeners) {
            const optionCallbacks: Array<GlobalEventHandler> = global_events_listeners[event]
            optionCallbacks.forEach((optionCallback: GlobalEventHandler) => {
                if (bEqualOptions(optionCallback.options, options)) {
                    optionCallback.callbacks.forEach(callback => callback(e))
                }
            })
        }
    }
    
    window.addEventListener(event, handler, options)

    return handler
}


function useGlobalEvent(): [OnGlobalEvent, OffGlobalEvent]
{
    return [on, off]
}

export default useGlobalEvent