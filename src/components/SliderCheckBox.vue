<script setup>
import { computed } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <label
    class="bg-gray-200 h-6 w-10 rounded-full p-[2px] cursor-pointer relative"
  >
    <input type="checkbox" v-model="value" class="hidden" />
    <div
      class="bg-gray-500 h-full aspect-square rounded-full"
      :class="{ 'mr-0 !bg-red-500 slide-on': value, 'mr-4 slide-off': !value }"
    ></div>
  </label>
</template>

<style scss scoped>
@keyframes slide-off-animate {
  0% {
    @apply mr-0;
  }
  100% {
    @apply mr-4;
  }
}
@keyframes slide-on-animate {
  0% {
    @apply mr-4;
  }
  100% {
    @apply mr-0;
  }
}

.slide-off {
  animation-name: slide-off-animate;
  animation-duration: 0.5s;
}

.slide-on {
  animation-name: slide-on-animate;
  animation-duration: 0.5s;
}
</style>
