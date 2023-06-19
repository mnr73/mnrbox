<script setup>

import RoleWrapper from '../RoleWrapper.vue';
import { Icon } from '@iconify/vue';
import MnrNumber from '@/components/mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<RoleWrapper :role="role">
		<template #icon>
			<Icon icon="ic:round-search" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-emerald-600 font-bold">کاراگاه</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او شب بیدار می‌شود و استعلام یک نفر را می‌گیرد. استعلام گادفادر و جاسوس برای او برعکس است.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="استعلام" title="تعداد استعلام" :min="1" :max="100" v-model="role.card.count.value">
		</MnrNumber>
	</RoleWrapper>
</template>