<script setup>


defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p>
			<span class="text-emerald-600 font-bold">خوابگرد</span> در ساید <span class="text-emerald-600 font-bold">شهر</span>
			بازی
			می‌کند. او نقشی یک بار در طول بازی می‌تواند خود را فدای شهر کند تا مافیا در شب از خواب بیدار نشوند.
		</p>
	</template>
	<div class="rounded-md overflow-hidden shadow-md" v-else>
		<div class="p-2 bg-slate-100 font-bold border-b">{{ role.userName }} <span class="text-slate-400 font-thin">({{
			role.roleName
		}})</span>
		</div>
		<div class="p-2">body</div>
	</div>
</template>