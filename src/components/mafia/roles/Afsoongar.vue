<script setup>

import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';

defineProps({
	role: Object
})
</script>

<template>
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
	<MnrCheckSlider v-model:checked="role.options.silent" class="block w-full">سایلنت</MnrCheckSlider>
	<MnrCheckSlider v-model:checked="role.options.fastNight" class="block w-full">شب سریع</MnrCheckSlider>
</template>