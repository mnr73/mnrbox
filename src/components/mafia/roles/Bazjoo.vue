<script setup>
import MnrNumber from "@/components/mnr/MnrNumber.vue";

defineProps({
  role: Object,
});
</script>

<template>
  <p>
    <span class="text-red-600 font-bold">بازجو</span> در ساید
    <span class="text-red-600 font-bold">مافیا</span> بازی می‌کند. بازجو هرشب
    بیدار می‌شود و یک نفر را به گاد نشان می‌دهد. گاد نقش آن شخص و کاری که در آن
    شب کرده را به بازجو می‌گوید.
  </p>
  <hr class="my-2" />
  <MnrNumber
    placeholder="تعداد بازجویی"
    title="تعداد بازجویی"
    :min="0"
    :max="100"
    v-model="role.acts.research.inventory"
  >
  </MnrNumber>
</template>
