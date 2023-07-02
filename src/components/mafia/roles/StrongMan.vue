<script setup>

import MnrNumber from '../../mnr/MnrNumber.vue';
import MnrCheckSlider from '../../mnr/MnrCheckSlider.vue';
import RoleWrapper from '../RoleWrapper.vue';
import { Icon } from "@iconify/vue";

defineProps({
	role: Object
})
</script>

<template>
	<template v-if="role?.mode == 'select'">
		<p><span class="text-red-600 font-bold">مرد قوی</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
			میکند و تیر آن هر شخصی را می‌کشد حتی اگر دکتر آن شخص را نجات داده باشد یا آن شخص زره داشته باشد
		</p>
		<hr class="my-2">
		<MnrCheckSlider v-model:checked="role.sameShot.value">شات همزمان با تیم</MnrCheckSlider>
		<MnrNumber placeholder="استعلام منفی" title="تعداد تیر" :min="0" :max="100" v-model="role.shot.value">
		</MnrNumber>
		<MnrNumber placeholder="جان اضافه" title="تعداد جان اضافه" :min="0" :max="100" v-model="role.heart.value"
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