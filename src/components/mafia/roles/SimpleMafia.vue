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
			<Icon icon="game-icons:bully-minion" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-red-600 font-bold">مافیا ساده</span> در ساید <span class="text-red-600 font-bold">مافیا</span>
			بازی
			می‌کند. مافیای ساده نقش خاصی ندارد فقط در رای گیری ها و مشورت ها به تیم کمک می‌کند.
		</p>
	</RoleWrapper>
</template>