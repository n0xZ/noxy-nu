import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

export const messageRouter = router({
	messagesByChatId: publicProcedure
		.input(z.object({ chatId: z.string() }))
		.query(async ({ input: { chatId }, ctx }) => {
			const messages = await ctx.message.findMany({ where: { id: chatId } })
			return messages
		}),
	createMessage: publicProcedure
		.input(
			z.object({ chatId: z.string(), authorId: z.string(), content: z.string() })
		)
		.mutation(async ({ input: { chatId, authorId, content }, ctx }) => {
			const createdMessage = await ctx.message.create({
				data: { authorId, content, chatId },
			})
			return createdMessage
		}),
	deleteMessage: publicProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input: { id }, ctx }) => {
			const deletedMessage = await ctx.message.delete({
				where: { id },
			})
			return deletedMessage
		}),
})
