<script setup>
import MnrCheckSlider from "@/components/mnr/MnrCheckSlider.vue";
import MnrNumber from "@/components/mnr/MnrNumber.vue";

defineProps({
  role: Object,
});
</script>

<template>
  <p>
    <span class="text-amber-600 font-bold">قاتل</span> در ساید
    <span class="text-amber-600 font-bold">مستقل</span>
    بازی می‌کند. او هر شب توسط گاد بیدار میشود و یک نفر را به قتل میرساند در ضمن
    دکتر نمیتواند آن شخص را نجات دهد.هدف کیلر در بازی حفظ خود تا آخر بازی و حذف
    همه بازيکنان ميباشد و در اين صورت ميتواند يک نفره برنده کل بازی شود.
  </p>
  <hr class="my-2" />
  <MnrCheckSlider v-model:checked="role.options.justOdd" class="block w-full"
    >یک شب در میان. هر شبی که تیر بزند شب بعد نمی‌تواند تیر بزند</MnrCheckSlider
  >
  <MnrCheckSlider v-model:checked="role.options.deepShot" class="block w-full"
    >شلیک عمیق (غیر قابل نجات دادت توسط پزشک)</MnrCheckSlider
  >
  <MnrNumber
    placeholder="جان اضافه"
    title="جان اضافه"
    :min="0"
    :max="100"
    v-model="role.options.heart"
  ></MnrNumber>
</template>
