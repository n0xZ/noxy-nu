<script setup lang="ts">
	definePageMeta({ middleware: ['auth'] })
	useHead({ title: 'Noxy-nu | Home' })
	const { getSession, data: sessionData } = useSession()
	const userId = useUserId()
	const { $client } = useNuxtApp()
	const isOpen = ref(false)

	const { data: chatsData } = await useAsyncData('chatsByUserInfo', async () => {
		const data = await getSession({ required: true })

		const userChats = await $client.chatsBasedOnUserInfo.query({
			email: data?.user?.email!,
		})

		return { chats: userChats }
	})
	const { data: userRequestedData, pending } = await useAsyncData(
		'userData',
		async () => {
			const user = await $client.userByEmail.query({
				email: sessionData.value?.user?.email!,
			})
			userId.value = user?.id
			return { userId: user?.id, username: user?.name }
		},
		{ lazy: true }
	)
	const openModal = () => {
		isOpen.value = true
	}
	const closeModal = () => {
		isOpen.value = false
	}
	const createChat = async ({
		chatName,
		authorName,
		creatorId,
	}: {
		authorName: string
		creatorId: string
		chatName: string
	}) => {
		const newChat = await $client.createChat.mutate({
			authorName,
			creatorId,
			chatTitle: chatName,
		})
		if (newChat) {
			chatsData.value?.chats.push(newChat)
			closeModal()
		}
	}
</script>

<template>
	<header class="p-5 border-b-2 border-neutral-100">
		<nav
			class="flex flex-row items-center justify-between container mx-auto max-w-4xl"
		>
			<h1>
				<NuxtLink to="/home">{{ sessionData?.user?.name }}</NuxtLink>
			</h1>

			<MenuHomeDropdown />
		</nav>
	</header>
	<section className="flex  flex-row h-full  ">
		<aside
			className="xl:w-96 lg:w-96 md:w-32 w-28   shadow-sm    border-neutral-100 border-r-2 rounded  col-start-1 col-end-1 container mx-auto"
		>
			<span
				class="w-full flex flex-row justify-between items-center mt-3 p-5 items-center space-x-7"
			>
				<h1 className=" font-medium xl:text-lg text-sm    text-center">
					Chats actuales
				</h1>
				<Icon
					name="mdi:chat-plus-outline"
					class="h-5 w-5 cursor-pointer"
					@click="openModal"
				/>
			</span>

			<p v-if="!chatsData?.chats || chatsData?.chats.length === 0">
				No hay chats creados por el momento.
			</p>
			<ChatList v-else :chats="chatsData.chats" />
		</aside>
		<article className="grid place-items-center w-full items-center h-full ">
			<NuxtPage />
		</article>
	</section>

	<ChatCreateChat
		v-if="!pending"
		:is-open="isOpen"
		:close-modal="closeModal"
		:create-chat="createChat"
		:author="{ name: userRequestedData?.username!,id:userRequestedData?.userId! }"
	/>
</template>
