<script setup>


defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">ساقی</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او هر شب بیدار می‌شود و یک نفر را مست می‌کند و روی حرکت آن شخص در شب اثر میگذارد
		</p>
	</template>
	<div class="p-2" v-else>body</div>
</template>