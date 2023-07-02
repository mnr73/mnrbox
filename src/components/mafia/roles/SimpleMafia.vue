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
	<div class="rounded-md overflow-hidden shadow-md" v-else>
		<div class="p-2 bg-slate-100 font-bold border-b">{{ role.userName }} <span class="text-slate-400 font-thin">({{
			role.roleName
		}})</span>
		</div>
		<div class="p-2">body</div>
	</div>
</template>