<script setup lang="ts">
	import {
		Dialog,
		DialogPanel,
		DialogTitle,
		TransitionRoot,
		TransitionChild,
	} from '@headlessui/vue'

	type Props = {
		isOpen: boolean
		author: { id: string; name: string }
		closeModal: () => void
	}
	const formRefs = ref({ chatName: '' })
	const isLoading = ref(false)
	const { $client } = useNuxtApp()
	const props = defineProps<Props>()

	const onSubmit = async () => {
		isLoading.value = true
		const data = await $client.createChat.mutate({
			chatTitle: formRefs.value.chatName,
			creatorId: props.author.id,
			authorName: props.author.name,
		})
		if (data) {
			isLoading.value = false
			location.reload()
		}
	}
</script>

<template>
	<TransitionRoot appear :show="isOpen" as="template">
		<Dialog as="div" className="relative z-10" @close="closeModal">
			<TransitionChild
				as="template"
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="fixed inset-0 bg-black bg-opacity-25" />
			</TransitionChild>
			<div className="fixed inset-0 overflow-y-auto">
				<div
					className="flex min-h-full items-center justify-center p-4 text-center"
				>
					<TransitionChild
						as="template"
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<DialogPanel
							className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
						>
							<DialogTitle as="h3" className="text-lg   leading-6 text-gray-900 mb-2">
								Crear nuevo chat
							</DialogTitle>

							<form
								className="mt-2 flex flex-col items-center justify-center"
								@submit.prevent="onSubmit"
							>
								<aside
									className="flex flex-col justify-center space-y-3 w-full max-w-md mt-4"
								>
									<label for="chatTitle">Nombre del chat del chat</label>
									<input
										type="text"
										name="authorName"
										placeholder="Ej. Mi primer chat!"
										v-model="formRefs.chatName"
										class="px-3 py-3 rounded-md outline-none max-w-md bg-sky-50"
										:disabled="isLoading"
									/>
								</aside>

								<div className="mt-4 flex flex-row items-center space-x-3">
									<button
										type="submit"
										:disabled="isLoading"
										className="inline-flex justify-center rounded-md border border-transparent bg-rose-400 px-4 py-2 text-base font-medium text-neutral-50 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
									>
										Crear nueva colección
									</button>
									<button
										type="button"
										:disabled="isLoading"
										className="inline-flex justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-base	 font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
										@click="closeModal"
									>
										Cerrar formulario
									</button>
								</div>
							</form>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>
