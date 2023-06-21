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
			<Icon icon="game-icons:pentacle" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-emerald-600 font-bold">فراماسون</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او هر شب یک نفر را بیدار می‌کند و به تیم ماسونی اضافه می‌کند. اگر مافیا را بیدار کند کل تیم ماسونی خواهند
			مرد.
		</p>
	</RoleWrapper>
</template>