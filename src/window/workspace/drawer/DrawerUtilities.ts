import { bRunOnServiceWorker } from '@ui-services/utilities/utilies'

export function resizeImage(image: HTMLImageElement, size: number, fit: 'adapt' | 'fill' | 'none', opacity = 1, quality = 1): Promise<HTMLImageElement>
{
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        
        canvas.width = size
        canvas.height = size

        context.globalAlpha = opacity

        const scale = fit == 'none' ? 1 : Math[fit == 'adapt' ? 'min' : 'max'](canvas.width / image.width, canvas.height / image.height)
        const x = fit == 'none' ? 0 : (canvas.width / 2) - (image.width / 2) * scale
        const y = fit == 'none' ? 0 : (canvas.height / 2) - (image.height / 2) * scale
        context.drawImage(image, x, y, image.width * scale, image.height * scale)

        const resized = new Image()

        resized.onload = () => resolve(resized)
        resized.src = canvas.toDataURL('image/png', quality)
    })
}

// TODO: size = exportsize
export function imageToCanvas(base64: string, size: number | null, fit: 'adapt' | 'fill' | 'none', opacity = 1, quality = 1): Promise<{ image: HTMLImageElement | ImageBitmap, source: string}>
{
    return new Promise((resolve) => {
        const image = new Image()
        image.onload = async () => {
            const resized = size ? await resizeImage(image, size, fit, opacity, quality) : image
            if (bRunOnServiceWorker())
            {
                const bitmap = await createImageBitmap(resized)
                resolve({ image: bitmap, source: resized.src })
            }
            else
            {
                resolve({ image: resized, source: resized.src })
            }
        }
        image.src = base64
    })
}
