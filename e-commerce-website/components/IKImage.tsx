import { ImageKitProvider} from '@imagekit/next'
import React from 'react'
import { Image } from '@imagekit/next';

function IKImage({url, alt, width, height, className}: {url: string, alt: string, width: number, height: number, className?: string}) {


    const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT


    return (
        <ImageKitProvider urlEndpoint={urlEndPoint}>
            <Image src={url} alt={alt} width={width} className={className} height={height} />
        </ImageKitProvider>
    )
}

export default IKImage

