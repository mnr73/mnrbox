<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  selector: Object,
  list: Array,
});

defineEmits(["close"]);
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-full z-50 bg-white bg-opacity-70 px-5 py-20"
    @click.self="selector.open = false"
  >
    <div
      class="bg-white rounded-md w-full h-full max-w-xl max-h-fit mx-auto shadow-lg border flex flex-col"
    >
      <div class="p-2 bg-slate-100 rounded-t-md text-center">
        <div>
          {{ selector.role.userName }}
          <span class="text-slate-400 font-thin"
            ><Icon :icon="selector.role.icon" class="inline-block h-full w-6" />
            {{ selector.role.roleName }}</span
          >
        </div>
      </div>
      <div class="flex justify-between p-2 border-b rounded-t-md">
        <div>شات مافیا</div>
        <div>1 انتخاب</div>
      </div>
      <div class="flex flex-wrap gap-2 p-2 overflow-y-auto">
        <div
          class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
          v-for="(role, index) in props.list"
          :key="role.userId"
        >
          <div class="text-lg">
            <div>{{ role.userName }}</div>
            <div class="text-sm text-slate-400">
              <Icon :icon="role.icon" class="inline-block h-full w-5 me-1" />{{
                role.roleName
              }}
            </div>
          </div>
        </div>
      </div>
      <button
        class="mt-auto bg-red-500 text-white p-1 rounded-md"
        @click="selector.open = false"
      >
        بستن
      </button>
    </div>
  </div>
</template>
