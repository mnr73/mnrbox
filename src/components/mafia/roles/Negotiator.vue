<script setup>

import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';

defineProps({
	role: Object
})
</script>

<template>
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
	<MnrCheckSlider v-model:checked="role.options.framason">مذاکره اعضای ماسونی</MnrCheckSlider>
</template>