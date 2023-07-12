<script setup>
import MnrNumber from "../../mnr/MnrNumber.vue";
import MnrCheckSlider from "../../mnr/MnrCheckSlider.vue";
import RoleWrapper from "../RoleWrapper.vue";
import { Icon } from "@iconify/vue";

defineProps({
  role: Object,
});
</script>

<template>
  <p>
    <span class="text-red-600 font-bold">مرد قوی</span> در ساید
    <span class="text-red-600 font-bold">مافیا</span> بازی میکند و تیر آن هر
    شخصی را می‌کشد حتی اگر دکتر آن شخص را نجات داده باشد یا آن شخص زره داشته
    باشد
  </p>
  <hr class="my-2" />
  <MnrCheckSlider v-model:checked="role.options.sameShot"
    >شات همزمان با تیم</MnrCheckSlider
  >
  <MnrNumber
    placeholder="استعلام منفی"
    title="تعداد تیر"
    :min="0"
    :max="100"
    v-model="role.acts.strong_shot.inventory"
  >
  </MnrNumber>
  <MnrNumber
    placeholder="جان اضافه"
    title="تعداد جان اضافه"
    :min="0"
    :max="100"
    v-model="role.options.heart"
    class="mt-3"
  >
  </MnrNumber>
</template>
