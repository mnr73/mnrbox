<script setup>
import MnrNumber from "@/components/mnr/MnrNumber.vue";

defineProps({
  role: Object,
});
</script>

<template>
  <p>
    <span class="text-amber-600 font-bold">جوکر</span> در ساید
    <span class="text-amber-600 font-bold">مستقل</span>
    بازی می‌کند. او در شب نمی‌میرد و اگر در روز با رای‌گیری خارج شود 4 نفر را با
    خود از بازی خارج می‌کند. در صورتی که با خارج شدن 4 نفر از بازی بازی تمام شود
    جوکر برنده خواهد شد.
  </p>
  <hr class="my-2" />
  <MnrNumber
    placeholder="تعداد افراد"
    title="تعداد افراد"
    :min="0"
    :max="100"
    v-model="role.acts.joker_smile.targets"
  >
  </MnrNumber>
  <MnrNumber
    placeholder="جان اضافه"
    title="جان اضافه"
    :min="0"
    :max="100"
    v-model="role.options.heart"
  ></MnrNumber>
</template>
