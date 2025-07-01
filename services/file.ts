import 'server-only'
import { eq, inArray } from 'drizzle-orm'

import db from '../utils/postgres'
import { File } from '..//drizzle/schema'

/**
 * Create a file record in the database with status 'pending'.
 * Returns the created file record.
 */
export async function createFileRecord({ pioneerId, url, type, size }: {
  pioneerId: number
  url: string
  type: "image" | "sbpFile" | "sbpcfgFile"
  size: number
}) {
  try {
    const file = await db.insert(File).values({
      pioneerId,
      url,
      type,
      size,
      status: 'pending'
    }).returning()

    return file
  } catch (error) {
    console.error('Error creating file record:', error)
    throw new Error('Failed to create file record')
  }
}

export async function updateFileRecord(oldUrl: string, newUrl: string, status: 'pending' | 'linked' = 'linked') {
  try {
    const updatedFile = await db.update(File)
      .set({ status, url: newUrl })
      .where(eq(File.url, oldUrl))
      .returning()

    return updatedFile
  } catch (error) {
    console.error('Error updating file status:', error)
    throw new Error('Failed to update file status')
  }
}