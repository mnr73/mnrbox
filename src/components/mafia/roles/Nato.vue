<script setup>

import MnrNumber from '../../mnr/MnrNumber.vue';

defineProps({
	role: Object
})
</script>

<template>
	<p>
		<span class="text-red-600 font-bold">ناتو</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
		میکند. ناتو می‌تواند به جای تیر شب ناتویی کند و اگر درست نقش کسی را حدس بزند آن شخص بی چون و چرا از بازی خارج
		می‌شود.
		اگر ناتو {{ role.options.failsCount }} بار اشتباه حدس بزند از بازی خارج می‌شود.
	</p>
	<hr class="my-2">
	<MnrNumber placeholder="تعداد حدس اشتباه" title="حدس اشتباه" :min="0" :max="100" v-model="role.options.failsCount"
		class="mt-3">
	</MnrNumber>
</template>