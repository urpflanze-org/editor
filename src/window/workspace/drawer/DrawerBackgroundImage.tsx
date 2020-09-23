import * as React from 'react'
import pups from '@pups/js'

import executor from '@redux-store/executor'

import Grid from '@components/Grid'
import Color from '@components/input/Color'
import Checkbox from '@components/input/Checkbox'
import Modal from '@components/Modal'
import Dropzone from '@components/input/Dropzone'

import Icon from '@components/icons/Icon'
import { imageToCanvas } from '@window/workspace/drawer/DrawerUtilities'
import Radio from '@components/input/Radio'
import Slider from '@components/input/Slider'


const FitTypes = [
    {key: 'fill', value: 'fill'},
    {key: 'adapt', value: 'adapt'},
    {key: 'none', value: 'none'}
]


const TemporanyImage: React.FunctionComponent<{ image: string, onSave: any, onRemove: any }> = ({ image, onSave, onRemove }) => 
{
    const [fit, setFit] = React.useState<'adapt' | 'fill' | 'none'>('fill')
    const [opacity, setOpacity] = React.useState<number>(1)

    return (
        <div>
            {<img src={image} style={{width: '200px'}} />}

            <Radio name="fit" onChange={setFit} selected={fit} values={FitTypes} />
            <Slider min={0} max={1} step={0.1} value={opacity} onChange={setOpacity} />

            <span onClick={() => onSave(fit, opacity)}>apply</span>
            <span onClick={onRemove}>remove</span>
        </div>
    )
}

const DrawerBackgroundImage: React.FunctionComponent<{ image: string, onChange: (src: { image: CanvasImageSource, source: string } | string | null) => void }> = ({ image, onChange }) => 
{
    const [temporanyImage, setTemporanyImage] = React.useState<string | null>()
    const [bOpenModal, setBOpenModal] = React.useState<boolean>(false)

    
    const temporanyImageSize = 1080
    const temporanyImageQuality = 0.8

    async function handleChange(fit: 'adapt' | 'fill' | 'none', opacity: number)
    {
        onChange(temporanyImage ? await imageToCanvas(temporanyImage, temporanyImageSize, fit, opacity, temporanyImageQuality) : null)
        setBOpenModal(false)
    }

    function handleRemove()
    {
        setTemporanyImage(null)
        onChange(null)
        setBOpenModal(false)
    }

    async function onSelectImage(image: string | null) {
        setTemporanyImage(image ? (await imageToCanvas(image, null, 'none', 1)).source : null)
    }

    return (
        <React.Fragment>
        <div>
            {image ? (
                <Icon name="remove" onClick={() => onChange(null)} />
            ) : (
                <Icon name="image" onClick={() => setBOpenModal(true)} />
            )}
        </div>

        <Modal open={bOpenModal} close={() => setBOpenModal(false)}>
            { temporanyImage ? (
                <TemporanyImage image={temporanyImage} onSave={async (fit, opacity) => handleChange(fit, opacity)} onRemove={handleRemove} />
            ) : (
                <Dropzone 
                    onDrop={() => {}} 
                    accept={['image/png', 'image/jpg', 'image/jpeg', 'image/webp']} 
                    onChange={onSelectImage} 
                    readType="dataUrl"
                />
            )}
        </Modal>
        
        </React.Fragment>
    )
}


export default React.memo(DrawerBackgroundImage)


