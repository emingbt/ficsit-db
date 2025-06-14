import 'server-only'

import db from '../utils/postgres'
import { BlueprintComment, Pioneer } from '../drizzle/schema'
import { eq, desc } from 'drizzle-orm'

export const getCommentsByBlueprintId = async (blueprintId: number) => {
  const comments = await db
    .select({
      id: BlueprintComment.id,
      content: BlueprintComment.content,
      createdAt: BlueprintComment.createdAt,
      updatedAt: BlueprintComment.updatedAt,
      pioneer: {
        name: Pioneer.name,
        avatar: Pioneer.avatar,
        color: Pioneer.color
      }
    })
    .from(BlueprintComment)
    .innerJoin(Pioneer, eq(BlueprintComment.pioneerId, Pioneer.id))
    .where(eq(BlueprintComment.blueprintId, blueprintId))
    .orderBy(desc(BlueprintComment.createdAt))

  return comments
}

export async function createComment(
  blueprintId: number,
  pioneerId: number,
  content: string
) {
  try {
    const [comment] = await db.insert(BlueprintComment)
      .values({
        blueprintId,
        pioneerId,
        content,
      })
      .returning()
    return comment
  } catch (error) {
    console.error('Error creating comment:', error)
    throw new Error('Failed to create comment')
  }
}

export async function updateComment(
  commentId: number,
  pioneerId: number,
  content: string
) {
  try {
    const [comment] = await db
      .update(BlueprintComment)
      .set({
        content,
        updatedAt: new Date(),
      })
      .where(
        eq(BlueprintComment.id, commentId) &&
        eq(BlueprintComment.pioneerId, pioneerId)
      )
      .returning()

    if (!comment) {
      throw new Error('Comment not found or unauthorized')
    }

    return comment
  } catch (error) {
    console.error('Error updating comment:', error)
    throw new Error('Failed to update comment')
  }
}

export async function deleteCommentById(commentId: number) {
  try {
    const [comment] = await db
      .delete(BlueprintComment)
      .where(eq(BlueprintComment.id, commentId))
      .returning()

    if (!comment) {
      throw new Error('Comment not found or unauthorized')
    }

    return comment
  } catch (error) {
    console.error('Error deleting comment:', error)
    throw new Error('Failed to delete comment')
  }
}