import type { inferRouterOutputs } from '@trpc/server'
import { TRPCClientError } from '@trpc/client'
import type { AppRouter } from '~/server/api/trpc/[trpc]'

type RouterOutput = inferRouterOutputs<AppRouter>
type GetChatOutput = RouterOutput['chatsRelatedToUser']
type ErrorOutput = TRPCClientError<AppRouter>
export const useGetChatsByUserId = (userId: string) => {
	const { $client } = useNuxtApp()
	return useAsyncData<GetChatOutput, ErrorOutput>(
		async () => await $client.chatsRelatedToUser.query({ userId })
	)
}

export const useGetChatById = (id: string) => {
	const { $client } = useNuxtApp()
	return useAsyncData<GetChatOutput, ErrorOutput>(
		async () => await $client.chatById.query({ id })
	)
}
