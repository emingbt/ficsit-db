'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'

export default function ImageCarousel({
  images,
  title,
}: {
  images: string[]
  title: string
}) {
  const [currentImage, setCurrentImage] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    handleSwipe()
  }

  const handleSwipe = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const distance = touchStartX.current - touchEndX.current
    const threshold = 50
    if (distance > threshold) nextImage()
    else if (distance < -threshold) prevImage()
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div
      className="w-full lg:w-2/3 flex aspect-video relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full h-full overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full w-full"
          style={{
            transform: `translateX(-${(currentImage / images.length) * 100}%)`,
            width: `${images.length * 100}%`,
          }}
        >
          {images.map((image, index) => (
            <div
              className="relative w-full h-full flex-shrink-0"
              key={index}
              style={{ width: `${100 / images.length}%` }}
            >
              <Image
                src={image}
                alt={`${title} - Image ${index + 1}`}
                fill
                sizes="100%"
                style={{ objectFit: 'cover' }}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>


      <div className={`absolute top-0 left-0 w-full h-full hidden ${images.length == 1 ? "hidden" : "lg:flex"} items-center justify-between p-3`}>
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
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 mx-1 rounded-full transition-colors duration-300 ${currentImage === index ? 'bg-white' : 'bg-black'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
