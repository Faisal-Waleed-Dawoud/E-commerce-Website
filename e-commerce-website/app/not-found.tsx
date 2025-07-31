import Link from 'next/link'
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Image from 'next/image';


export default function NotFound() {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-1/2 w-full h-full bg-[#f9f9f9] flex items-center justify-center'>
      <div>
        <Image 
      src={"/notFoundImage.webp"}
      width={400}
      height={400}
      alt='Not Found Page'></Image>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
      </div>
    </div>
  )
}