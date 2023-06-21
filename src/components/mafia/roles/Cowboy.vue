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
			<Icon icon="game-icons:outback-hat" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-emerald-600 font-bold">کابوی</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. کابوی می‌تواند یک نفر را وسط بازی با خود بیرون ببرد.
		</p>
	</RoleWrapper>
</template>