<script setup lang="ts">
	useHead({
		link: [
			{
				rel: 'preconnect',
				href: 'https://fonts.googleapis.com',
			},
			{
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossorigin: 'anonymous',
			},
		],
	})
</script>
<template>
	<div class="font-inter">
		<NuxtLoadingIndicator />
		<NuxtPage />
	</div>
</template>
