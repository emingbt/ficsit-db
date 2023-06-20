import type { Context } from '../utils/trpc'
import { prisma } from '../prisma'
import { TRPCError } from '@trpc/server'

const upvoteBlueprint = async ({ input, ctx }: {
  input: { blueprintTitle: string },
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

  // Check if user has already upvoted the blueprint
  const upvote = await prisma.upvote.findFirst({
    where: {
      blueprintId: blueprint.id,
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
      blueprintId: blueprint.id,
      userId: ctx.userId
    }
  })

  return {
    blueprint: blueprint.title,
    upvotedAt: newUpvote.createdAt
  }
}

const removeUpvote = async ({ input, ctx }: {
  input: { blueprintTitle: string },
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

  // Check if user has already upvoted the blueprint
  const upvote = await prisma.upvote.findFirst({
    where: {
      blueprintId: blueprint.id,
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