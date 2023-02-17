<script setup lang="ts">
	import { Menu, MenuItem, MenuItems, MenuButton } from '@headlessui/vue'
	import { SessionData } from '@sidebase/nuxt-auth/dist/runtime/composables/useSessionState'

	type MenuProps = {
		imgSrc?: string | null
		session?: SessionData
	}
	const { signOut } = useSession()
	const props = defineProps<MenuProps>()
</script>

<template>
	<Menu as="div" className=" relative inline-block text-left">
		<MenuButton
			class="w-full flex flex-row justify-center items-center space-x-2 rounded-md text-sm font-medium c-neutral-500 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
		>
			<img :src="props.imgSrc!" class="rounded-full w-9 h-9" />
			<p>{{ session?.user?.name }}</p>
		</MenuButton>
		<transition
			enter="transition ease-out duration-100"
			enterFrom="transform opacity-0 scale-95"
			enterTo="transform opacity-100 scale-100"
			leave="transition ease-in duration-75"
			leaveFrom="transform opacity-100 scale-100"
			leaveTo="transform opacity-0 scale-95"
		>
			<MenuItems
				className="absolute right-0 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			>
				<div className="px-1 py-1 ">
					<MenuItem v-slot="active">
						<NuxtLink
							:class="` ${
								active ? 'c-neutral-500' : 'c-neutral-900'
							} group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2 `"
							to="/home/projects/create"
						>
							<div class="i-carbon-task-add h-4 w-4"></div>
							<span>Crear proyecto</span></NuxtLink
						>
					</MenuItem>
					<MenuItem v-slot="active">
						<button
							@click="signOut()"
							:class="` ${
								active ? 'c-neutral-500' : 'c-neutral-900'
							} group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2  `"
						>
							<div class="i-carbon-logout h-4 w-4"></div>

							<span>Cerrar sesión</span>
						</button>
					</MenuItem>
				</div>
			</MenuItems>
		</transition>
	</Menu>
</template>
