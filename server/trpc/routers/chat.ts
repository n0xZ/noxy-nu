import { publicProcedure, router } from '../trpc'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export const chatRouter = router({
	chatsRelatedToUser: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input, ctx }) => {
			const chats = await ctx.chat.findFirst({
				where: { members: { every: { id: input.userId } } },
			})
			return chats
		}),
	chatsBasedOnUserInfo: publicProcedure
		.input(
			z.object({
				email: z.string(),
			})
		)
		.query(async ({ input, ctx }) => {
			const existingUser = await ctx.user.findFirst({
				where: { email: input.email },
			})
			if (!existingUser)
				throw new TRPCError({
					message: 'Error: User does not exist',
					code: 'BAD_REQUEST',
				})
			const existingUserChats = await ctx.chat.findMany({
				where: { members: { some: { id: existingUser.id } } },
			})
			return existingUserChats
		}),
	chatById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			const existingChat = await ctx.chat.findUnique({ where: { id: input.id } })
			return existingChat
		}),
	createChat: publicProcedure
		.input(
			z.object({
				chatTitle: z
					.string()
					.min(2, { message: 'El campo requiere de más de 2 carácteres' }),
				authorName: z.string(),
				creatorId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const createdChat = await ctx.chat.create({
				data: {
					members: { connect: { name: input.authorName } },
					name: input.chatTitle,
					creatorId: input.creatorId,
				},
			})
			return createdChat
		}),
	addUserToChat: publicProcedure
		.input(z.object({ userId: z.string(), chatId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const createdChat = await ctx.chat.update({
				data: { members: { connect: { id: input.userId } } },
				where: { id: input.chatId },
			})
			return createdChat
		}),
	deleteChat: publicProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const createdChat = await ctx.chat.delete({ where: { id: input.id } })
			return createdChat
		}),
})
