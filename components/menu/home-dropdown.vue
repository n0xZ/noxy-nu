<script setup lang="ts">
	import { Menu, MenuItem, MenuItems, MenuButton } from '@headlessui/vue'

	const { signOut, data, status } = useSession()
	const isLoading = status.value === 'loading'
</script>

<template>
	<Menu as="div" className=" relative inline-block text-left">
		<MenuButton
			class="w-full flex flex-row justify-center items-center space-x-2 rounded-md text-sm font-medium c-neutral-500 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
		>
			<img
				:src="data?.user?.image!"
				:class="`rounded-full w-9 h-9  ${
					isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'
				}`"
			/>
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
						<p
							:class="` ${
								active ? 'c-neutral-500' : 'c-neutral-900'
							} group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2  `"
						>
							{{ data?.user?.email }}
						</p>
					</MenuItem>
					<MenuItem v-slot="active">
						<button
							@click="signOut()"
							:class="` ${
								active ? 'c-neutral-500' : 'c-neutral-900'
							} group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2  `"
						>
							<Icon class="h-4 w-4" :name="'carbon-logout'" />

							<span>Cerrar sesión</span>
						</button>
					</MenuItem>
				</div>
			</MenuItems>
		</transition>
	</Menu>
</template>
