import * as React from 'react'

interface DropzoneProps {
    onChange: (data: any) => void 
    accept?: string | RegExp | Array<string>
    maxFileSize?: number
    bMultiple?: boolean
    readType?: 'text' | 'dataUrl' | 'arrayBuffer' | 'binary'
}


enum DROP_STATUS {
    WAIT = 0,
    CAN_DROP = 1
}

const Dropzone: React.FunctionComponent<DropzoneProps> = ({ 
    onChange,
    accept = '*', maxFileSize = 1000000, 
    bMultiple = false, readType = 'dataUrl', 
    children 
}) => {
    const [dropStatus, setDropState] = React.useState<{ status: DROP_STATUS, error: string | undefined }>({ status: DROP_STATUS.WAIT, error: undefined })
    const dropzoneRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>()

    React.useEffect(() => {
        function paste(e: ClipboardEventInit) {
            console.log('paste')
            e.clipboardData && eachFiles(e.clipboardData?.items)
        }

        window.addEventListener('paste', paste, { passive: true })

        return () => window.removeEventListener('paste', paste)
    }, [])

    function handleDrag(e: React.DragEvent<HTMLDivElement>)
    {
        e.preventDefault()
        setDropState({ status: DROP_STATUS.CAN_DROP, error: undefined })
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>)
    {
        e.preventDefault()

        e.dataTransfer.items && e.dataTransfer.items.length > 0 && eachFiles(e.dataTransfer.items)
    }

    function onSelectFile(event: React.ChangeEvent<HTMLInputElement>)
    {
        event.target.files && event.target.files.length > 0 && eachFiles(event.target.files)
    }
    
    function eachFiles(files: FileList | DataTransferItemList)
    {
        const promises: Array<Promise<any>> = []

        for (let i = 0; i < files.length; i++)
            promises.push(validateFile(files[i] instanceof File ? files[i] as File : (files[i] as DataTransferItem).getAsFile()))
        
        Promise.all(promises).then(values => {
            values = values.filter(v => !!v)
            handleChange(bMultiple ? values : values[0])
        })
    }

    function validateFile(file: File | null): Promise<any>
    {
        if (file == null)
            return Promise.resolve(null)
            
        return new Promise((resolve, reject) => {
            const reader: FileReader = new FileReader()

            reader.addEventListener('load', e => resolve(reader.result), { passive: true })

            if (accept != '*' && !(Array.isArray(accept) ? accept.includes(file.type) : accept instanceof RegExp ? file.type.match(accept) : accept == file.type))
            {
                resolve(null)
                setDropState({ status: DROP_STATUS.WAIT, error: 'Cannot read this file' })
            }
            if (file.size > maxFileSize)
            {
                resolve(null)
                setDropState({ status: DROP_STATUS.WAIT, error: 'File is too large' })
            }

            switch(readType)
            {
                case 'arrayBuffer': reader.readAsArrayBuffer(file); break;
                case 'binary': reader.readAsBinaryString(file); break;
                case 'text': reader.readAsText(file); break;
                default: reader.readAsDataURL(file); 
            }

            setDropState({ status: DROP_STATUS.WAIT, error: undefined })
        })
    }

    function handleChange(data: any)
    {
        Array.isArray(data) ? data.length > 0 : data && onChange(data)
    }
    

    return (
        <div ref={dropzoneRef} onDrop={handleDrop} onDragOver={handleDrag} onDragEnd={handleDrag}>
            {dropStatus.status}
            {dropStatus.error}
            <input type="file" multiple={bMultiple} onChange={onSelectFile} accept={typeof accept === 'string' ? accept : undefined} />
            {children}
        </div>
    )
}




export default Dropzone