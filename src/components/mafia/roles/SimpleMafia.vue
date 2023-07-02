<script setup>


defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-red-600 font-bold">مافیا ساده</span> در ساید <span class="text-red-600 font-bold">مافیا</span>
			بازی
			می‌کند. مافیای ساده نقش خاصی ندارد فقط در رای گیری ها و مشورت ها به تیم کمک می‌کند.
		</p>
	</template>
	<div class="p-2" v-else>body</div>
</template>