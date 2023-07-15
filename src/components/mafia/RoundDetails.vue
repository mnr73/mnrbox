<script setup>
import { Icon } from "@iconify/vue";
import { reactive } from "vue";
import endSound from "@/assets/audio/end.ogg";
import RoleCard from "./RoleCard.vue";
import TargetCard from "./TargetCard.vue";

const props = defineProps({
  userList: Object,
  game: Object,
});
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-full z-50 bg-white bg-opacity-70 px-5 py-20"
    @click.self="userList.open = false"
  >
    <div
      class="bg-white rounded-md w-full h-full max-w-xl max-h-fit mx-auto shadow-lg border flex flex-col overflow-y-auto p-2"
    >
      <div class="flex flex-col gap-3">
        <template v-for="(item, key) in game.selectedRound.steps" :key="key">
          <div>
            <h2 class="font-bold text-lg border-b border-slate-500">
              {{ item.name }}
            </h2>
            <template v-for="(act, index) in item.acts" :key="index">
              <div class="flex gap-1 p-1 items-center">
                <TargetCard :item="act" :to="false" class="w-full" />
                <div>👈</div>
                <TargetCard :item="act" :to="true" class="w-full" />
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
