"use client"

import { useState } from "react"
import ImageIcon from "../assets/imageIcon.svg"

export default function ImageInput({ imageError }: { imageError: string }) {
  const [images, setImages] = useState<File[]>(Array.from({ length: 3 }))

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = event.target.files

    if (files) {
      const image = files[0]
      const newImages = [...images]

      newImages[index] = image
      setImages(newImages)
    }
  }

  return (
    <>
      <label htmlFor="images">Images</label>
      <div className="w-full flex flex-col sm:flex-row gap-4">
        <div className="w-full aspect-video relative bg-dark-bg hover:bg-light-bg">
          <div className="w-full h-full absolute top-0 bg-transparent">
            {images[0] ?
              <img
                key={images[0].name}
                src={URL.createObjectURL(images[0])}
                alt={images[0].name}
                className='w-full h-full object-cover bg-light-bg'
              /> :
              <div className="w-full h-full flex flex-col items-center justify-center">
                <ImageIcon className="w-8 h-8" />
                <p className="text-gray-400 text-center">Upload thumbnail</p>
              </div>
            }
          </div>
          <input
            id="images"
            type="file"
            name="images"
            accept="image/jpeg, image/jpg, image/png, image/webp"
            className="bg-transparent w-full h-full opacity-0 cursor-pointer"
            onChange={(event) => handleOnChange(event, 0)}
          />
        </div>
        <div className="w-full aspect-video relative bg-dark-bg hover:bg-light-bg">
          <div className="w-full h-full absolute top-0 bg-transparent">
            {images[1] ?
              <img
                key={images[1].name}
                src={URL.createObjectURL(images[1])}
                alt={images[1].name}
                className='w-full h-full object-cover bg-light-bg'
              /> :
              <div className="w-full h-full flex flex-col items-center justify-center">
                <ImageIcon className="w-8 h-8" />
                <p className="text-gray-400 text-center">Upload an image</p>
              </div>
            }
          </div>
          <input
            id="images"
            type="file"
            name="images"
            accept="image/jpeg, image/jpg, image/png, image/webp"
            className="bg-transparent w-full h-full opacity-0 cursor-pointer"
            onChange={(event) => handleOnChange(event, 1)}
          />
        </div>
        <div className="w-full aspect-video relative bg-dark-bg hover:bg-light-bg">
          <div className="w-full h-full absolute top-0 bg-transparent">
            {images[2] ?
              <img
                key={images[2].name}
                src={URL.createObjectURL(images[2])}
                alt={images[2].name}
                className='w-full h-full object-cover bg-light-bg'
              /> :
              <div className="w-full h-full flex flex-col items-center justify-center">
                <ImageIcon className="w-8 h-8" />
                <p className="text-gray-400 text-center">Upload an image</p>
              </div>
            }
          </div>
          <input
            id="images"
            type="file"
            name="images"
            accept="image/jpeg, image/jpg, image/png, image/webp"
            className="bg-transparent w-full h-full opacity-0 cursor-pointer"
            onChange={(event) => handleOnChange(event, 2)}
          />
        </div>
      </div>
      {
        imageError &&
        <div className='w-full text-xs lg:text-base text-error'>
          <p>{imageError}</p>
        </div>
      }
      <p className="text-main-gray mb-4">- Please upload images with 16:9 aspect ratio</p>
    </>
  )
}