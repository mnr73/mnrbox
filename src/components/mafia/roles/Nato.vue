<script setup>

import MnrNumber from '../../mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-red-600 font-bold">ناتو</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			میکند. ناتو می‌تواند به جای تیر شب ناتویی کند و اگر درست نقش کسی را حدس بزند آن شخص بی چون و چرا از بازی خارج
			می‌شود.
			اگر ناتو {{ role.failsCount.value }} بار اشتباه حدس بزند از بازی خارج می‌شود.
		</p>
		<hr class="my-2">
		<MnrNumber placeholder="تعداد حدس اشتباه" title="حدس اشتباه" :min="0" :max="100" v-model="role.failsCount.value"
			class="mt-3">
		</MnrNumber>
	</template>
	<div class="rounded-md overflow-hidden shadow-md" v-else>
		<div class="p-2 bg-slate-100 font-bold border-b">{{ role.userName }} <span class="text-slate-400 font-thin">({{
			role.roleName
		}})</span>
		</div>
		<div class="p-2">body</div>
	</div>
</template>