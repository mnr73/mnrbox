<script setup>

import MnrCheckSlider from '@/components/mnr/MnrCheckSlider.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-red-600 font-bold">معشوقه</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			می‌کند. در صورت مرگ یا اخراج گادفادر معشوقه قابلیت های آن را می‌گیرد. همچنین در صورتی که معشوقه از بازی خارج شود
			مافیا در شب بعد دو تیر خواهد زد..
		</p>
		<hr class="my-2">
		<MnrCheckSlider v-model:checked="role.byVote.value" class="block w-full">شب مافیایی در صورت خارج شدن با رای
		</MnrCheckSlider>
		<MnrCheckSlider v-model:checked="role.inDay.value" class="block w-full">شب مافیایی در صورت کشته شدن در روز
		</MnrCheckSlider>
		<MnrCheckSlider v-model:checked="role.inNight.value" class="block w-full">شب مافیایی در صورت کشته شدن در شب
		</MnrCheckSlider>
	</template>
	<div class="rounded-md overflow-hidden shadow-md" v-else>
		<div class="p-2 bg-slate-100 font-bold border-b">{{ role.userName }} <span class="text-slate-400 font-thin">({{
			role.roleName
		}})</span>
		</div>
		<div class="p-2">body</div>
	</div>
</template>