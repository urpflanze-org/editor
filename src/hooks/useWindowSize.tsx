import * as React from 'react'
import { debounce } from '@ui-services/utilities/utilies'

function useWindowSize() 
{ 
    function getSize() 
    {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
  
    const [windowSize, setWindowSize] = React.useState(getSize)  

    React.useEffect(() => {
        
        function handleResize() 
        { 
            setWindowSize(getSize()) 
        }

        const dHandleResize = debounce(handleResize, 100)
  
        window.addEventListener('resize', dHandleResize, { passive: true })

        return () => window.removeEventListener('resize', dHandleResize) 
    }, [])
  
    return windowSize
}

export default useWindowSize