<script setup>
import MnrNumber from "@/components/mnr/MnrNumber.vue";

defineProps({
  role: Object,
});
</script>

<template>
  <p>
    <span class="text-emerald-600 font-bold">کشیش</span> در ساید
    <span class="text-emerald-600 font-bold">شهر</span>
    بازی می‌کند. او یک یا چند نفر از بازیکنان را انتخاب میکند و آن شخص اگر توسط
    افسونگر یا ناتاشا انتخاب شده باشند طلسم آنها برداشته می‌شود. در غیر این صورت
    زمان اضافه برای صحبت دریافت می‌کنند.
  </p>
  <hr class="my-2" />
  <div
    class="flex items-center gap-2 mt-2"
    v-for="(item, index) in role.acts.priest_save.targets"
    :key="index"
  >
    <MnrNumber
      class="flex-grow"
      placeholder="بازیکن"
      :min="0"
      :max="100"
      v-model="item.players"
    >
    </MnrNumber>
    <div>بازیکن</div>
    <MnrNumber
      class="flex-grow"
      placeholder="تعداد"
      :min="0"
      :max="100"
      v-model="item.value"
    >
    </MnrNumber>
    <div>انتخاب</div>
  </div>
</template>
