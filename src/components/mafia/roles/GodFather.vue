<script setup>

import MnrNumber from '../../mnr/MnrNumber.vue';
import RoleWrapper from '../RoleWrapper.vue';
import { Icon } from "@iconify/vue";

defineProps({
	role: Object
})
</script>

<template>
	<p><span class="text-red-600 font-bold">گادفادر</span> در ساید <span class="text-red-600 font-bold">مافیا</span> بازی
		میکند و تا زمانی که زنده است حق تیر <span class="text-red-600 font-bold">مافیا</span> با
		<span class="text-red-600 font-bold">گادفادر</span> است و زمانی که کشته شد یا از شهر
		خارج
		شد نفر بعد از اون تیر <span class="text-red-600 font-bold">مافیا</span> را می‌زند.
	</p>
	<ul class="list-disc list-inside my-2">
		<li>استعلام <span class="text-red-600 font-bold">گادفادر</span> برای کاراگاه منفی است.</li>
		<li>در بعضی سناریو ها <span class="text-red-600 font-bold">گادفادر</span> یک جان اضافه نیز دارد که با شات اول در شب
			نمی‌میرد.</li>
	</ul>
	<hr class="my-2">
	<MnrNumber placeholder="جان اضافه" title="تعداد جان اضافه" :min="0" :max="100" v-model="role.options.heart"
		class="mt-3">
	</MnrNumber>
</template>