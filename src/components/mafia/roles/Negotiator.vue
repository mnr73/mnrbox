<script setup>

import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';
import { defineProps } from 'vue';
import RoleWrapper from '../RoleWrapper.vue';
import { Icon } from '@iconify/vue';

defineProps({
	role: Object
})
</script>

<template>
	<RoleWrapper :role="role">
		<template #icon>
			<Icon icon="game-icons:pay-money" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-red-600 font-bold">مذاکره کننده</span> در ساید <span class="text-red-600 font-bold">مافیا</span>
			بازی
			می‌کند. مذاکره کننده در طول بازی می‌تواند یک نفر را مذاکره کند و آن شخص به تیم مافیا وارد می‌شود.
		</p>
		<ul class="list-disc list-inside my-2">
			<li>شخص مذاکره شده فقط می‌تواند شهر ساده باشد.</li>
			<li>باید حد اقل یک نفر از اعضای مافیا از بازی خارج شده باشد</li>
			<li>اگر مذاکره کننده یکی از اعضای ماسونی را انتخاب کند و مذاکره انجام شود مرگ ماسونی رخ خواهد داد</li>
		</ul>
		<hr class="my-2" />
		<MnrCheckSlider v-model:checked="role.card.framason.value">مذاکره اعضای ماسونی</MnrCheckSlider>
	</RoleWrapper>
</template>