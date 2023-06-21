<script setup>

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
			<Icon icon="game-icons:castle" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-emerald-600 font-bold">شهردار</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او میتواند نتیجه رای‌گیری را وتو کند و نگذارد شهروند از شهر خارج شود.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="وتو" title="تعداد وتو" :min="1" :max="100" v-model="role.card.count.value">
		</MnrNumber>
	</RoleWrapper>
</template>