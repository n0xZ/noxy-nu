import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

export const chatRouter = router({
	chatsRelatedToUser: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input, ctx }) => {
			const chats = await ctx.chat.findFirst({ where: { userId: input.userId } })
			return chats
		}),
	chatById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			const existingChat = await ctx.chat.findUnique({ where: { id: input.id } })
			return existingChat
		}),
	createChat: publicProcedure
		.input(z.object({ userId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const createdChat = await ctx.chat.create({ data: { userId: input.userId } })
			return createdChat
		}),
})
