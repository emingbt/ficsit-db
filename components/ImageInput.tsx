"use client"

import { useState } from "react"
import ImageIcon from "../assets/imageIcon.svg"

export default function ImageInput({ imageError, existingImageUrls }: { imageError: string, existingImageUrls?: string[] }) {
  const [images, setImages] = useState<(File | undefined)[]>(Array.from({ length: 3 }))
  const [imageUrls, setImageUrls] = useState<string[]>(existingImageUrls || [])

  const maxImageSize = 1000000 // 1MB

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = event.target.files

    if (files) {
      const image = files[0]
      const newImages = [...images]
      const newImageUrls = [...imageUrls]

      if (image && image?.size > maxImageSize) {
        alert('Image size must be less than 1MB')
        return
      }

      newImages[index] = image
      newImageUrls[index] = ''

      setImages(newImages)
      setImageUrls(newImageUrls)
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    const newImageUrls = [...imageUrls]

    newImages[index] = undefined
    newImageUrls[index] = ''

    setImages(newImages)
    setImageUrls(newImageUrls)
  }

  return (
    <>
      <label htmlFor="images">Images</label>
      <div className="w-full flex flex-col sm:flex-row gap-4">
        {
          images.map((image, index) => {
            return (
              <div key={index} className="w-full aspect-video relative bg-dark-bg hover:bg-light-bg">
                {image ?
                  <div
                    className="w-full h-full cursor-pointer"
                    onClick={() => removeImage(index)}
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`image-${index}`}
                      className='w-full h-full object-cover bg-light-bg'
                    />
                  </div> :
                  imageUrls[index] ?
                    <div
                      className="w-full h-full cursor-pointer"
                      onClick={() => removeImage(index)}
                    >
                      <img
                        src={imageUrls[index]}
                        alt={`image-${index}`}
                        className='w-full h-full object-cover bg-light-bg'
                      />
                    </div>
                    :
                    <div className="w-full h-full relative flex flex-col items-center justify-center cursor-pointer">
                      <ImageIcon className="w-8 h-8" />
                      <p className="text-gray-400 text-center">Upload an image</p>
                    </div>
                }
                {
                  !imageUrls[index] &&
                  <div className="w-full h-full absolute top-0 bg-transparent">
                    <input
                      id="images"
                      type="file"
                      name={`image-${index}`}
                      accept="image/jpeg, image/jpg, image/png, image/webp"
                      className="bg-transparent w-full h-full opacity-0 cursor-pointer"
                      onChange={(event) => handleOnChange(event, index)}
                    />
                  </div>
                }
              </div>
            )
          })
        }
      </div>
      {
        imageError &&
        <div className='w-full text-xs lg:text-base text-error'>
          <p>{imageError}</p>
        </div>
      }
      <p className="text-main-gray">- Maximum image size: 1MB</p>
      <p className="text-main-gray mb-4">- Please upload images with 16:9 aspect ratio</p>
    </>
  )
}