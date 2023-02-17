<template>
	<div>
		<header class="p-6">
			<nav
				class="flex flex-row items-center justify-between container mx-auto max-w-2xl"
			>
				<h1><NuxtLink to="/">Noxy-nu</NuxtLink></h1>
				<ul class="flex flex-row items-center">
					<li>
						<NuxtLink to="/login" class="bg-amber-400 px-3 py-3 rounded-lg"
							>Empieza ya!</NuxtLink
						>
					</li>
				</ul>
			</nav>
		</header>
		<main class="h-full">
			<h2>Conectate con tus amigos devs!</h2>
			<p>
				En Nu, vas a poder chatear con varios de tus amigos, de manera rápida,
				flexible, y organizada
			</p>
			<NuxtLink to="/login" ss="bg-amber-400 px-3 py-3 rounded-lg"
				>Empieza ya!</NuxtLink
			>
		</main>
	</div>
</template>
