"use client"

import Image from "next/image"
import { useState } from "react"

export default function ImageCarousel({ images, title }: { images: string[], title: string }) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    if (currentImage === images.length - 1) {
      setCurrentImage(0)
    } else {
      setCurrentImage(currentImage + 1)
    }
  }

  const prevImage = () => {
    if (currentImage === 0) {
      setCurrentImage(images.length - 1)
    } else {
      setCurrentImage(currentImage - 1)
    }
  }

  return (
    <div className="h-full w-full flex lg:flex-1 aspect-video relative">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <Image
          src={images[currentImage]}
          fill
          sizes='100%'
          alt={title}
          style={{ objectFit: 'cover' }}
          unoptimized
          priority
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between lg:opacity-0 lg:hover:opacity-100 duration-200 transition-opacity p-3">
        <button
          onClick={prevImage}
          className="w-10 h-10 bg-black hover:bg-main-gray hover:bg-opacity-40 bg-opacity-50 flex items-center justify-center rounded-full text-white font-bold select-none"
        >
          &#60;
        </button>
        <button
          onClick={nextImage}
          className="w-10 h-10 bg-black hover:bg-main-gray hover:bg-opacity-40 bg-opacity-50 flex items-center justify-center rounded-full text-white font-bold select-none"
        >
          &#62;
        </button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-10 flex items-center justify-center">
        <div className="flex items-center justify-center p-1 sm:p-2 rounded-full bg-light-bg">
          {
            images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 mx-1 rounded-full ${currentImage === index ? 'bg-white' : 'bg-black'}`}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
