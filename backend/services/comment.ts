import { prisma } from '../prisma'
import { TRPCError } from '@trpc/server'
import type { Context } from '../utils/trpc'

const addComment = async ({ input, ctx }: {
  input: { blueprintTitle: string, comment: string },
  ctx: Context
}) => {
  // Check if blueprint exists, and get its id
  const blueprint = await prisma.blueprint.findFirst({
    where: {
      title: input.blueprintTitle
    }
  })

  // If blueprint does not exist, throw error
  if (!blueprint) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Blueprint does not exist' })
  }

  // Create comment
  const newComment = await prisma.comment.create({
    data: {
      content: input.comment,
      blueprintId: blueprint.id,
      authorId: ctx.userId
    }
  })

  return {
    id: newComment.id,
    blueprint: blueprint.title,
    comment: newComment.content,
    commentedAt: newComment.createdAt
  }
}

const removeComment = async ({ input, ctx }: {
  input: { commentId: string },
  ctx: Context
}) => {
  // Check if comment exists, and get its id
  const comment = await prisma.comment.findFirst({
    where: {
      id: input.commentId
    }
  })

  // If comment does not exist, throw error
  if (!comment) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Comment does not exist' })
  }
  // Check if user is the author of the comment
  if (comment.authorId !== ctx.userId) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'You are not the author of this comment' })
  }

  // Delete comment
  const deletedComment = await prisma.comment.delete({
    where: {
      id: input.commentId
    }
  })

  return {
    comment: deletedComment.content,
    deletedAt: deletedComment.createdAt
  }
}

export {
  addComment,
  removeComment
}