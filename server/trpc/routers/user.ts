import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

export const userRouter = router({
	userByEmail: publicProcedure
		.input(z.object({ email: z.string().email() }))
		.query(async ({ input: { email }, ctx }) => {
			const existingUser = await ctx.user.findUnique({ where: { email } })
			return existingUser
		}),
})
