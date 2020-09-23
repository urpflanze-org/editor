import * as React from 'react'

function useMouseWheel(ref: React.RefObject<any>, callback: (deltaY: number, event: MouseWheelEvent) => void) 
{ 
    React.useEffect(() => {
        function handleWheel(e: MouseWheelEvent) { 
            if (e.target === ref.current)
            {
                e.stopPropagation()
                e.stopImmediatePropagation()
                e.preventDefault()
                callback(e.deltaY, e)
            }
        }
  
        document.addEventListener('wheel', handleWheel, { passive: false })

        return () => document.removeEventListener('wheel', handleWheel) 
    }, [ref.current, callback])
}

export default useMouseWheel