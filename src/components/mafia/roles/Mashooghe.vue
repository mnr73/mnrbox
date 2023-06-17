<script setup>

import { defineProps } from 'vue';
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
			<Icon icon="game-icons:evil-love" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-red-600 font-bold">معشوقه</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			می‌کند. در صورت مرگ یا اخراج گادفادر معشوقه قابلیت های آن را می‌گیرد. همچنین در صورتی که معشوقه از بازی خارج شود
			مافیا در شب بعد دو تیر خواهد زد..
		</p>
		<hr class="my-2">
		<MnrCheckSlider v-model:checked="role.card.byVote.value" class="block w-full">شب مافیایی در صورت خارج شدن با رای
		</MnrCheckSlider>
		<MnrCheckSlider v-model:checked="role.card.inDay.value" class="block w-full">شب مافیایی در صورت کشته شدن در روز
		</MnrCheckSlider>
		<MnrCheckSlider v-model:checked="role.card.inNight.value" class="block w-full">شب مافیایی در صورت کشته شدن در شب
	</MnrCheckSlider>
</RoleWrapper></template>