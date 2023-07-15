<script setup>
import { Icon } from "@iconify/vue";
import { reactive, ref, computed } from "vue";
import endSound from "@/assets/audio/end.ogg";
import RoleCard from "./RoleCard.vue";
import _ from "lodash";

const search = ref("");

const filteredRoles = computed(() => {
  if (search.value.trim() == "") {
    return props.game.selectedRound?.roles;
  }
  return _.filter(props.game.selectedRound?.roles, (x) => {
    return (
      x.userName.match(new RegExp(search.value, "ig")) ||
      x.roleName.match(new RegExp(search.value, "ig"))
    );
  });
});

const props = defineProps({
  userList: Object,
  game: Object,
});

function close() {
  props.userList.open = false;
  search.value = "";
}
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-full z-50 bg-white bg-opacity-70 px-5 py-20"
    @click.self="close()"
  >
    <div
      class="bg-white rounded-md w-full h-full max-w-xl max-h-fit mx-auto shadow-lg border flex flex-col overflow-y-auto p-2"
    >
      <div class="mb-3">
        <input
          type="text"
          placeholder="جستجو"
          v-model="search"
          class="text-xl p-2 w-full border rounded-md"
        />
      </div>
      <div class="flex flex-col gap-2">
        <template v-for="role in filteredRoles" :key="role.userId">
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
                :class="{ '!bg-sky-500 !text-white': role.dead }"
                @click="role.dead = !role.dead"
              >
                <div>کشته</div>
              </button>
              <button
                class="w-full text-center border rounded-md p-2 bg-slate-100"
                :class="{ '!text-white': role.getOut }"
                @click="role.getOut = !role.getOut"
              >
                <div>اخراج</div>
              </button>
              <button
                class="w-full text-center border rounded-md p-2 bg-slate-100"
                :class="{ '!bg-sky-500 !text-white': role.beSimple }"
                @click="role.beSimple = !role.beSimple"
              >
                <div>ساده</div>
              </button>
              <button
                class="w-full text-center border rounded-md p-2 bg-slate-100"
                :class="{ '!bg-sky-500 !text-white': role.mason }"
                @click="role.mason = !role.mason"
              >
                <div>ماسون</div>
              </button>
              <button
                class="w-full text-center border rounded-md p-2 bg-slate-100"
                :class="{ '!bg-sky-500 !text-white': role.bought }"
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
