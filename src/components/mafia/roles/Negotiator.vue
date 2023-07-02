<script setup>

import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
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
		<MnrCheckSlider v-model:checked="role.framason.value">مذاکره اعضای ماسونی</MnrCheckSlider>
	</template>
	<div class="rounded-md overflow-hidden shadow-md" v-else>
		<div class="p-2 bg-slate-100 font-bold border-b">{{ role.userName }} <span class="text-slate-400 font-thin">({{
			role.roleName
		}})</span>
		</div>
		<div class="p-2">body</div>
	</div>
</template>