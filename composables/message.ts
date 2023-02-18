import type { inferRouterOutputs } from '@trpc/server'
import { TRPCClientError } from '@trpc/client'
import type { AppRouter } from '~/server/api/trpc/[trpc]'

type RouterOutput = inferRouterOutputs<AppRouter>
type GetMessageOutput = RouterOutput['messagesByChatId']
type ErrorOutput = TRPCClientError<AppRouter>
export const useGetMessageByChatId = (chatId: string) => {
	const { $client } = useNuxtApp()
	return useAsyncData<GetMessageOutput, ErrorOutput>(
		'messagesByChatId',
		async () => await $client.messagesByChatId.query({ chatId })
	)
}
