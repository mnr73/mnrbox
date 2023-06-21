<script setup>

import RoleWrapper from '../RoleWrapper.vue';
import { Icon } from '@iconify/vue';

defineProps({
	role: Object
})
</script>

<template>
	<RoleWrapper :role="role">
		<template #icon>
			<Icon icon="quill:user-happy" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-emerald-600 font-bold">آهنگر</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او هر شب به یک نفر یک زره می‌دهد و آن شخص در طول روز به هر نحوی که بخواهد از بازی خارج شود نمی‌شود و فقط زره
			آن می‌افتد
		</p>
	</RoleWrapper>
</template>