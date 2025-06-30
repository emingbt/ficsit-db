import 'server-only'
import cloudinary from 'cloudinary'
import { updateFileRecord } from './file'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export async function uploadImageToCloudinary(image: File, index: number, pioneerName: string, title: string, type: 'blueprint' | 'blueprint-pack' = 'blueprint') {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME

  if (!cloud_name) {
    throw new Error('CLOUDINARY_CLOUD_NAME is not defined')
  }

  const arrayBuffer = await image.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        tags: `${type}_image`,
        resource_type: "image",
        public_id: `${title}-${index}`,
        folder: `${type}s/${pioneerName}/${title}`,
        overwrite: true,
        invalidate: true,
        transformation: {
          quality: "auto:eco",
          format: "auto",
          width: 1920,
          height: 1080,
          crop: "fill",
        },
      },
      (error, result) => {
        if (error) {
          console.error(error)
          reject(new Error("Failed to upload the image."))
        } else if (result?.public_id && result?.version) {
          // Ensure the URL includes the new version to avoid caching issues
          const secureUrl = `https://res.cloudinary.com/${cloud_name}/image/upload/v${result.version}/${result.public_id}`
          resolve(secureUrl)
        } else {
          reject(new Error("Failed to retrieve the image URL."))
        }
      }
    )

    uploadStream.end(buffer)
  })
}

export async function uploadImagesToCloudinary(images: File[], pioneerName: string, title: string, type: 'blueprint' | 'blueprint-pack' = 'blueprint') {
  const uploadPromises = images.map(async (image, index) => {
    return uploadImageToCloudinary(image, index, pioneerName, title, type)
  })

  const imageUrls = await Promise.all(uploadPromises)
  return imageUrls
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

export async function updateCloudinaryImages(images: (File | string)[], existingImageUrls: string[], pioneerName: string, title: string, type: 'blueprint' | 'blueprint-pack' = 'blueprint') {
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
        await deleteImage(pioneerName, title, index, type)
      }
    } else {
      const imageUrl = await uploadImageToCloudinary(image, index, pioneerName, title)
      imageUrls.push(imageUrl)
    }
  }

  return imageUrls
}

export async function deleteImage(pioneerName: string, title: string, index: number, type: 'blueprint' | 'blueprint-pack' = 'blueprint') {
  return new Promise<void>((resolve, reject) => {
    cloudinary.v2.uploader.destroy(`${type}s/${pioneerName}/${title}/image-${index}`, (error, result) => {
      if (error) {
        console.error(error)
        reject(new Error('Failed to delete the image.'))
      } else {
        resolve()
      }
    })
  })
}

export async function deleteFolder(pioneerName: string, title: string, type: 'blueprint' | 'blueprint-pack' = 'blueprint') {
  // 1. Delete all images and files in the folder
  await cloudinary.v2.api.delete_resources_by_prefix(`${type}s/${pioneerName}/${title}`)
  await cloudinary.v2.api.delete_resources([
    `${type}s/${pioneerName}/${title}/${title}-0.sbp`,
    `${type}s/${pioneerName}/${title}/${title}-1.sbpcfg`
  ], { resource_type: 'raw' })

  // 2. Delete the folder
  return new Promise<void>((resolve, reject) => {
    cloudinary.v2.api.delete_folder(`${type}s/${pioneerName}/${title}`, (error, result) => {
      if (error) {
        console.error(error)
        reject(new Error('Failed to delete the folder.'))
      } else {
        resolve()
      }
    })
  })
}

/**
 * Generate a signed upload params for direct-to-Cloudinary upload using the backend SDK.
 * Returns: { signature, timestamp, apiKey, cloudName, uploadUrl, ... }
 */
export function getCloudinaryUploadSignature({
  folder = 'pending',
  public_id,
  resource_type = 'auto',
  eager,
  tags,
  transformation
}: {
  folder?: string
  public_id?: string
  resource_type?: string
  eager?: string
  tags?: string
  transformation?: string
}) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  if (!cloudName || !apiKey) throw new Error('Cloudinary env vars missing')

  const timestamp = Math.floor(Date.now() / 1000)
  const paramsToSign: Record<string, any> = {
    timestamp,
    folder,
    ...(public_id && { public_id }),
    ...(eager && { eager }),
    ...(tags && { tags }),
    ...(transformation && { transformation }),
  }
  // Use the SDK to sign
  const signature = cloudinary.v2.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET!)
  return {
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder,
    public_id,
    transformation,
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/${resource_type}/upload`,
  }
}

// Move a single file in Cloudinary from 'pending' to the final folder using its URL.
export async function moveCloudinaryFile({ url, pioneerName, title, type = 'blueprint', resourceType = 'image' }: {
  url: string,
  pioneerName: string,
  title: string,
  type?: 'blueprint' | 'blueprint-pack',
  resourceType?: 'image' | 'raw'
}) {
  try {
    // Validate URL
    if (!url.startsWith('https://res.cloudinary.com/')) {
      throw new Error('Invalid Cloudinary URL for moving')
    }

    // Extract publicId from URL (after /pending/)
    const match = url.match(/\/pending\/([^\/]+)(?=\.\w+$)/)
    if (!match) {
      throw new Error('Invalid Cloudinary URL for moving')
    }

    const publicId = match[1]
    const fromFolder = 'pending'
    const toFolder = `${type}s/${pioneerName}/${title}`
    const oldPath = `${fromFolder}/${publicId}`
    const newPath = `${toFolder}/${publicId}`
    const result = await cloudinary.v2.uploader.rename(oldPath, newPath, { resource_type: resourceType, overwrite: true, invalidate: true })

    if (!result || !result.secure_url || typeof result.secure_url != 'string') {
      throw new Error('Failed to move Cloudinary file.')
    }

    // Update the file record in the database
    await updateFileRecord(url, result.secure_url, 'linked')

    return result.secure_url
  } catch (error) {
    console.error('Error moving Cloudinary file:', error)
    throw new Error('Failed to move Cloudinary file.')
  }
}


// Move multiple files in Cloudinary from 'pending' to the final folder using their URLs.
export async function moveCloudinaryFiles({
  urls,
  pioneerName,
  title,
  resourceType = 'image'
}: {
  urls: string[],
  pioneerName: string,
  title: string,
  resourceType?: 'image' | 'raw'
}) {
  const movedUrls: string[] = []

  for (const url of urls) {
    const newUrl = await moveCloudinaryFile({ url, pioneerName, title, resourceType })
    movedUrls.push(newUrl)
  }

  return movedUrls
}

/**
 * Delete a Cloudinary image by its URL.
 * Extracts the public ID from the URL and deletes the image.
 */
export async function deleteImageByUrl(url: string, resourceType: 'image' | 'raw' = 'image') {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/)
    if (!match) throw new Error('Invalid Cloudinary URL for deletion')
    const publicId = match[1]
    await cloudinary.v2.uploader.destroy(publicId, { resource_type: resourceType })
  } catch (error) {
    console.error('Failed to delete image by URL:', error)
    throw new Error('Failed to delete the image.')
  }
}