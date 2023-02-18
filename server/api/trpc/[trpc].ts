import { createNuxtApiHandler } from 'trpc-nuxt'
import { mergeRouters } from '~/server/trpc/trpc'
import { chatRouter } from '~/server/trpc/routers/chat'
import { userRouter } from '~/server/trpc/routers/user'
import { messageRouter } from '~~/server/trpc/routers/message'
import { createContext } from '~~/server/trpc/context'

export const appRouter = mergeRouters(chatRouter, userRouter, messageRouter)

export type AppRouter = typeof appRouter

export default createNuxtApiHandler({
	router: appRouter,
	createContext,
})
