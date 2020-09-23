import * as React from 'react'
import useGlobalEvent from '@hooks/useGlobalEvents'

const [on] = useGlobalEvent()

let copiedData: string | undefined

const clipboard_callback: Array<(data: string | undefined) => void> = []

function setData(data: string | undefined): boolean 
{
    if (data == copiedData) return false

    const shadowArea = document.createElement('textarea')
    shadowArea.value = data || ''
    document.body.appendChild(shadowArea)
    shadowArea.select()
    document.execCommand('copy')
    document.body.removeChild(shadowArea)
        
    return true
}

function handler() 
{
    const selection = window.getSelection()
    copiedData = selection ? selection.toString() : undefined

    clipboard_callback.forEach(c => c(copiedData))
}


on(['cut', 'copy'], handler, { passive: true })

function useClipboard(): [string | undefined, (data: string | undefined) => boolean]
{
    const [data, setStateData] = React.useState<string | undefined>(copiedData)

    React.useEffect(() => {
        
        function handler(data: string | undefined) { 
            setStateData(data) 
        } 

        clipboard_callback.push(handler)

        return () => {
            clipboard_callback.splice(clipboard_callback.indexOf(handler, 1))
        }
    }, [])


    return [data, setData]
}

export default useClipboard