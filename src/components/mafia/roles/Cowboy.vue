<script setup>


defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">کابوی</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. کابوی می‌تواند یک نفر را وسط بازی با خود بیرون ببرد.
		</p>
	</template>
	<div class="p-2" v-else>body</div>
</template>