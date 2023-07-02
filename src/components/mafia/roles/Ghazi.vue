<script setup>


defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">قاضی</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او یک بار می‌تواند نتیجه رای‌گیری را ملغی کند و یک بار میتواند تصمیم نهایی را در مورد رای گیری بگیرد.
		</p>
	</template>
	<div class="p-2" v-else>body</div>
</template>