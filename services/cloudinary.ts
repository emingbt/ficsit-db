import 'server-only'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export async function uploadImageToCloudinary(image: File, index: number, pioneerName: string, blueprintTitle: string) {
  const arrayBuffer = await image.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream({
      tags: 'blueprint_image',
      resource_type: 'image',
      public_id: `image-${index}`,
      folder: `blueprints/${pioneerName}/${blueprintTitle}`,
      overwrite: true,
      transformation: {
        quality: 'auto:eco',
        format: 'auto',
        width: 1920,
        height: 1080,
        crop: "fill"
      }
    }, (error, result) => {
      if (error) {
        console.error(error)
        reject(new Error('Failed to upload the image.'))
      } else if (result?.public_id) {
        // Generate URL with automatic quality and format
        const secureUrl = cloudinary.v2.url(result.public_id, {
          transformation: [
            { quality: "auto:eco", fetch_format: "auto" },
          ]
        })
        resolve(secureUrl)
      } else {
        reject(new Error('Failed to retrieve the image URL.'))
      }
    })

    uploadStream.end(buffer)
  })
}

export async function uploadFilesToCloudinary(files: File[], pioneerName: string, blueprintTitle: string) {
  const uploadPromises = files.map(async (file, index) => {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Get the file extension
    const fileExtension = file.name.split('.').pop()

    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream({
        tags: 'blueprint_file',
        resource_type: 'raw',
        public_id: `${blueprintTitle}-${index}.${fileExtension}`,
        folder: `blueprints/${pioneerName}/${blueprintTitle}`,
        overwrite: false
      }, (error, result) => {
        if (error) {
          console.error(error)
          reject(new Error('Failed to upload the file.'))
        } else if (result?.secure_url) {
          resolve(result.secure_url)
        } else {
          reject(new Error('Failed to retrieve the file URL.'))
        }
      })

      uploadStream.end(buffer)
    })
  })

  // Wait for all uploads to complete
  const fileUrls = await Promise.all(uploadPromises)
  return fileUrls // Returns an array of URLs
}

export async function updateCloudinaryImages(images: (File | string)[], existingImageUrls: string[], pioneerName: string, blueprintTitle: string) {
  if (images.length === 0) {
    return existingImageUrls
  }

  let imageUrls: string[] = []

  for (let index = 0; index < images.length; index++) {
    const image = images[index]

    if (typeof image === 'string') {
      if (image === 'skip') {
        imageUrls.push(existingImageUrls[index])
      } else {
        await deleteImage(pioneerName, blueprintTitle, index)
      }
    } else {
      const imageUrl = await uploadImageToCloudinary(image, index, pioneerName, blueprintTitle)
      imageUrls.push(imageUrl)
    }
  }

  return imageUrls
}

export async function deleteImage(pioneerName: string, blueprintTitle: string, index: number) {
  return new Promise<void>((resolve, reject) => {
    cloudinary.v2.uploader.destroy(`blueprints/${pioneerName}/${blueprintTitle}/image-${index}`, (error, result) => {
      if (error) {
        console.error(error)
        reject(new Error('Failed to delete the image.'))
      } else {
        resolve()
      }
    })
  })
}

export async function deleteFolder(pioneerName: string, blueprintTitle: string) {
  return new Promise<void>((resolve, reject) => {
    cloudinary.v2.api.delete_resources_by_prefix(`blueprints/${pioneerName}/${blueprintTitle}`, (error, result) => {
      if (error) {
        console.error(error)
        reject(new Error('Failed to delete the folder.'))
      } else {
        resolve()
      }
    })
  })
}