"use client"

import { useState } from "react"
import ImageIcon from "../assets/imageIcon.svg"

export default function ImageInput({ imageError, existingImageUrls }: {
  imageError: string,
  existingImageUrls?: string[]
}) {
  const [images, setImages] = useState<(File | undefined)[]>(Array.from({ length: 3 }))
  const [imageUrls, setImageUrls] = useState<string[]>(existingImageUrls || [])
  // Use an array to track uploading state per slot
  const [uploading, setUploading] = useState<boolean[]>([false, false, false])

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = event.target.files

    if (files) {
      const image = files[0]
      const newUploading = [...uploading]

      if (image) {
        newUploading[index] = true
        setUploading(newUploading)

        try {
          // 1. Get signed params from API
          const transformation = 'c_limit,w_1920,h_1080,q_auto:eco'
          const signRes = await fetch('/api/cloudinary-signature', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ folder: 'pending', transformation })
          })
          const signData = await signRes.json()
          if (!signRes.ok) throw new Error(signData.error || 'Failed to get signature')

          // 2. Upload to Cloudinary
          const formData = new FormData()
          formData.append('file', image)
          formData.append('api_key', signData.apiKey)
          formData.append('timestamp', signData.timestamp)
          formData.append('signature', signData.signature)
          formData.append('folder', 'pending')
          formData.append('transformation', transformation)

          const uploadRes = await fetch(signData.uploadUrl, {
            method: 'POST',
            body: formData
          })
          const uploadData = await uploadRes.json()
          if (!uploadRes.ok || !uploadData.secure_url) {
            throw new Error(uploadData.error?.message || 'Cloudinary upload failed')
          }

          // 3. Save file metadata via API route
          const fileRes = await fetch('/api/files', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: uploadData.secure_url, size: image.size, type: 'image' })
          })
          const fileData = await fileRes.json()
          if (!fileRes.ok) throw new Error(fileData.error || 'Failed to save file metadata')

          // 4. Update state
          setImages(prev => {
            const updated = [...prev]
            updated[index] = image
            return updated
          })
          setImageUrls(prev => {
            const updated = [...prev]
            updated[index] = uploadData.secure_url
            return updated
          })
        } catch (err: any) {
          alert(err.message || 'Image upload failed')
        } finally {
          setUploading(prev => {
            const updated = [...prev]
            updated[index] = false
            return updated
          })
        }
      }
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
                  uploading[index] ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-bg z-10 cursor-wait">
                      <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="#9ca3af" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                      <p className="text-gray-400 text-center select-none">Uploading...</p>
                    </div>
                  ) : !imageUrls[index] &&
                  <div className="w-full h-full absolute top-0 bg-transparent">
                    <input
                      id="images"
                      type="file"
                      accept="image/jpeg, image/jpg, image/png, image/webp"
                      className="bg-transparent w-full h-full opacity-0 cursor-pointer"
                      onChange={(event) => handleOnChange(event, index)}
                      disabled={uploading[index]}
                    />
                  </div>
                }
              </div>
            )
          })
        }
      </div>
      {/* Hidden inputs for uploaded image URLs */}
      {imageUrls.map((url, idx) => (
        url ? <input key={idx} type="hidden" name={`uploadedImageUrl-${idx}`} value={url} /> : null
      ))}
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