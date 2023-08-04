<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: String,
  closeText: {
    type: String,
    default: "بستن",
  },
});
</script>

<template>
  <div
    class="fixed bg-gray-500 bg-opacity-50 bg-glass w-full h-full z-50 top-0 left-0 flex justify-center px-5 py-10 md:py-20"
    @click.self="$emit('close')"
  >
    <div
      class="w-full max-w-xl max-h-full h-fit min-h-[400px] bg-white shadow-md flex flex-col rounded-md"
    >
      <div class="bg-slate-100 flex h-8 items-center shrink-0 rounded-t-md">
        <div class="shrink-0 px-2 cursor-pointer" @click="$emit('close')">
          <Icon icon="akar-icons:cross" class="h-full w-6 p-1" />
        </div>
        <div class="w-full text-center">
          {{ props.title || "title" }}
        </div>
        <div class="shrink-0 px-2 cursor-pointer">
          <Icon icon="akar-icons:chevron-left" class="h-full w-6 p-1" />
        </div>
      </div>
      <div class="flex-grow overflow-auto">
        <slot></slot>
      </div>
      <div
        class="mt-auto bg-red-500 text-white shrink-0 rounded-b-md p-2 text-center cursor-pointer"
        @click="$emit('close')"
      >
        {{ props.closeText || "بستن" }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-glass {
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
}
</style>
