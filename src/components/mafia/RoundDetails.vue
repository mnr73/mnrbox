<script setup>
import TargetCard from "./TargetCard.vue";
import Modal from "../Modal.vue";

const props = defineProps({
  userList: Object,
  game: Object,
});
</script>

<template>
  <Modal @close="userList.open = false">
    <div class="flex flex-col gap-3 p-2">
      <template v-for="(item, key) in game.selectedRound?.steps" :key="key">
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
  </Modal>
</template>
