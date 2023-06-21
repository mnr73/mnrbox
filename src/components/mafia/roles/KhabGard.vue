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
			<span class="text-emerald-600 font-bold">خوابگرد</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او نقشی یک بار در طول بازی می‌تواند خود را فدای شهر کند تا مافیا در شب از خواب بیدار نشوند.
		</p>
	</RoleWrapper>
</template>