<script setup>

import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';
import RoleWrapper from '../RoleWrapper.vue';
import { Icon } from '@iconify/vue';

defineProps({
	role: Object
})
</script>

<template>
	<RoleWrapper :role="role">
		<template #icon>
			<Icon icon="game-icons:police-officer-head" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-emerald-600 font-bold">فرمانده</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او شب بیدار می‌شود و تیری که توسط اسنایپر زده شده را تایید یا رد می‌کند.
		</p>
		<hr class="my-2">
		<MnrCheckSlider v-model:checked="role.card.dieOnFail.value" class="block w-full">در صورت تیر اشتباه فرمانده خواهد مرد
		</MnrCheckSlider>
	</RoleWrapper>
</template>