import 'server-only'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export async function uploadImagesToCloudinary(images: File[], pioneerName: string, blueprintTitle: string) {
  const uploadPromises = images.map(async (image, index) => {
    const arrayBuffer = await image.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream({
        tags: 'blueprint_image',
        resource_type: 'image',
        public_id: `${blueprintTitle}-${index}`,
        folder: `blueprints/${pioneerName}/${blueprintTitle}`,
        overwrite: false,
        transformation: {
          quality: 'auto:eco',
          format: 'auto',
          width: 1920,
          height: 1080,
        }
      }, (error, result) => {
        if (error) {
          console.error(error)
          reject(new Error('Failed to upload the image.'))
        } else if (result?.secure_url) {
          resolve(result.secure_url) // Ensure it's not undefined
        } else {
          reject(new Error('Failed to retrieve the image URL.'))
        }
      })

      uploadStream.end(buffer)
    })
  })

  // Wait for all uploads to complete
  const imageUrls = await Promise.all(uploadPromises)
  return imageUrls // Returns an array of URLs
}

export async function uploadFilesToCloudinary(files: File[], pioneerName: string, blueprintTitle: string) {
  const uploadPromises = files.map(async (file, index) => {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream({
        tags: 'blueprint_file',
        resource_type: 'raw',
        public_id: `${blueprintTitle}-${index}`,
        folder: `blueprints/${pioneerName}/${blueprintTitle}`,
        overwrite: false
      }, (error, result) => {
        if (error) {
          console.error(error)
          reject(new Error('Failed to upload the file.'))
        } else if (result?.secure_url) {
          resolve(result.secure_url) // Ensure it's not undefined
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
