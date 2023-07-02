<script setup>

import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-red-600 font-bold">گروگانگیر</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			می‌کند. او هر شب بیدار شده و یک نفر را گروگان میگیرد و آن شخص نمیتواند از قابلیت خود استفاده کند.
		</p>
		<ul class="list-disc list-inside my-2">
			<li>گروگانگیر نمیتواند یک نفر را پشت سر هم گروگان بگیرد</li>
			<li>اگر نگهبان را انتخاب کند هیچ اتفاقی نمی‌افتد</li>
		</ul>
		<hr class="my-2" />
		<MnrCheckSlider v-model:checked="role.alone.value" class="block w-full">بیدار شدن مستقل از مافیا</MnrCheckSlider>
	</template>
	<div class="rounded-md overflow-hidden shadow-md" v-else>
		<div class="p-2 bg-slate-100 font-bold border-b">{{ role.userName }} <span class="text-slate-400 font-thin">({{
			role.roleName
		}})</span>
		</div>
		<div class="p-2">body</div>
	</div>
</template>