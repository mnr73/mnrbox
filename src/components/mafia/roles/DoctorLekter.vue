<script setup>
import MnrNumber from "@/components/mnr/MnrNumber.vue";

defineProps({
  role: Object,
});
</script>

<template>
  <p>
    <span class="text-red-600 font-bold">دکتر لکتر</span> در ساید
    <span class="text-red-600 font-bold">مافیا</span> بازی می‌کند. هر شب بیدار
    می‌شود و یکی از مافیا را انتخاب میکند. در صورتی که آن شخص در شب شات شود نجات
    پیدا می‌کند. میتوانید مشخص کنید که چند با بتواند خودش را انتخاب کند.
  </p>
  <hr class="my-2" />
  <MnrNumber
    placeholder="نجات خود"
    title="نجات خود"
    :min="1"
    :max="100"
    v-model="role.acts.save_mafia.onSelf"
  ></MnrNumber>
</template>
