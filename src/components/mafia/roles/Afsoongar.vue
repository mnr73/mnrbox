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
			<Icon icon="game-icons:burning-skull" class="inline-block w-7 h-full" />
		</template>
		<p>
			<span class="text-red-600 font-bold">افسونگر</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			می‌کند. افسونگر یک کلمه 4 حرفی را برای یک بازیکن انتخاب می‌کند. اگر بازیکن آن کلمه را در طول روز به کار ببرد آن شخص
			اخراج می‌شود.
		</p>
		<ul class="list-disc list-inside my-2">
			<li><b>سایلنت</b>: میتواند به جای کلمه یک نفر را در روز بعد سایلنت کند</li>
			<li><b>شب سریع</b>: اگر شخص کلمه را گفت بلافاصله شب می‌شود</li>
		</ul>
		<hr class="my-2">
		<MnrCheckSlider v-model:checked="role.card.silent.value" class="block w-full">سایلنت</MnrCheckSlider>
		<MnrCheckSlider v-model:checked="role.card.fastNight.value" class="block w-full">شب سریع</MnrCheckSlider>
	</RoleWrapper>
</template>