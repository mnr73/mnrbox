<script setup>

import { defineProps } from 'vue';
import MnrNumber from '@/components/mnr/MnrNumber.vue';
import RoleWrapper from '../RoleWrapper.vue';
import { Icon } from '@iconify/vue';

defineProps({
	role: Object
})
</script>

<template>
	<RoleWrapper :role="role">
		<template #icon>
			<Icon icon="solar:eye-scan-bold" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-red-600 font-bold">بازجو</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			می‌کند. بازجو هرشب بیدار می‌شود و یک نفر را به گاد نشان می‌دهد. گاد نقش آن شخص و کاری که در آن شب کرده را به بازجو
			می‌گوید.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="تعداد بازجویی" title="تعداد بازجویی" :min="0" :max="100" v-model="role.card.count.value">
		</MnrNumber>
	</RoleWrapper></template>