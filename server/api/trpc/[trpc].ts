import { createNuxtApiHandler } from 'trpc-nuxt'
import { mergeRouters } from '~/server/trpc/trpc'
import { chatRouter } from '~/server/trpc/routers/chat'
import { userRouter } from '~/server/trpc/routers/user'
import { createContext } from '~~/server/trpc/context'

export const appRouter = mergeRouters(chatRouter, userRouter)

export type AppRouter = typeof appRouter

export default createNuxtApiHandler({
	router: appRouter,
	createContext,
})
