import type { Context } from '../utils/trpc'
import { prisma } from '../prisma'
import { TRPCError } from '@trpc/server'

const upvoteBlueprint = async ({ input, ctx }: {
  input: { blueprintId: string },
  ctx: Context
}) => {
  // Check if user has already upvoted the blueprint
  const upvote = await prisma.upvote.findFirst({
    where: {
      blueprintId: input.blueprintId,
      userId: ctx.userId
    }
  })

  // If user has already upvoted the blueprint, throw error
  if (upvote) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'You have already upvoted this blueprint' })
  }

  // Create upvote
  const newUpvote = await prisma.upvote.create({
    data: {
      blueprintId: input.blueprintId,
      userId: ctx.userId
    }
  })

  return newUpvote
}

const removeUpvote = async ({ input, ctx }: {
  input: { blueprintId: string },
  ctx: Context
}) => {
  // Check if user has already upvoted the blueprint
  const upvote = await prisma.upvote.findFirst({
    where: {
      blueprintId: input.blueprintId,
      userId: ctx.userId
    }
  })

  // If user has not upvoted the blueprint, throw error
  if (!upvote) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'You have not upvoted this blueprint' })
  }

  // Delete upvote
  const removedUpvote = await prisma.upvote.delete({
    where: {
      id: upvote.id
    }
  })

  return removedUpvote
}

export {
  upvoteBlueprint,
  removeUpvote
}