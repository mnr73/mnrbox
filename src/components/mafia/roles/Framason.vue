<script setup>


defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">فراماسون</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او هر شب یک نفر را بیدار می‌کند و به تیم ماسونی اضافه می‌کند. اگر مافیا را بیدار کند کل تیم ماسونی خواهند
			مرد.
		</p>
	</template>
	<div class="p-2" v-else>body</div>
</template>