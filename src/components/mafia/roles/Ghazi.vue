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
			<Icon icon="game-icons:scales" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-emerald-600 font-bold">قاضی</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او یک بار می‌تواند نتیجه رای‌گیری را ملغی کند و یک بار میتواند تصمیم نهایی را در مورد رای گیری بگیرد.
		</p>
	</RoleWrapper>
</template>