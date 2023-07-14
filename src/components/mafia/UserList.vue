<script setup>
import { Icon } from "@iconify/vue";
import { reactive } from "vue";
import endSound from "@/assets/audio/end.ogg";
import RoleCard from "./RoleCard.vue";

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
      <div class="flex flex-col gap-2">
        <template v-for="role in game.selectedRound?.roles" :key="role.userId">
          <div class="rounded-md border border-r-4 border-slate-300">
            <div
              class="p-2 bg-slate-100 font-bold border-b rounded-t-md flex justify-between"
            >
              <div>
                {{ role?.userName }}
              </div>
              <div class="text-slate-400 font-thin">
                <Icon :icon="role.icon" class="inline-block mx-1 h-full w-6" />
                {{ role?.roleName }}
              </div>
            </div>
            <div class="flex p-2 gap-2">
              <button
                class="w-full text-center border rounded-md p-2 bg-slate-100"
                :class="{ 'bg-sky-500 text-white': role.dead }"
                @click="role.dead = !role.dead"
              >
                <div>کشته</div>
              </button>
              <button
                class="w-full text-center border rounded-md p-2 bg-slate-100"
                :class="{ 'bg-sky-500 text-white': role.getOut }"
                @click="role.getOut = !role.getOut"
              >
                <div>اخراج</div>
              </button>
              <button
                class="w-full text-center border rounded-md p-2 bg-slate-100"
                :class="{ 'bg-sky-500 text-white': role.beSimple }"
                @click="role.beSimple = !role.beSimple"
              >
                <div>ساده</div>
              </button>
              <button
                class="w-full text-center border rounded-md p-2 bg-slate-100"
                :class="{ 'bg-sky-500 text-white': role.mason }"
                @click="role.mason = !role.mason"
              >
                <div>ماسون</div>
              </button>
              <button
                class="w-full text-center border rounded-md p-2 bg-slate-100"
                :class="{ 'bg-sky-500 text-white': role.bought }"
                @click="role.bought = !role.bought"
              >
                <div>خریداری</div>
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
