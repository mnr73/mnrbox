<script setup>
import MnrCheckSlider from "@/components/mnr/MnrCheckSlider.vue";
import MnrNumber from "@/components/mnr/MnrNumber.vue";
import { Icon } from "@iconify/vue";
import { ref, watch, computed, onMounted } from "vue";
import mafia from "@/modules/mafia";
import MnrSelect from "@/components/mnr/MnrSelect.vue";
import _ from "lodash";
import Bottom from "@/components/Bottom.vue";
import LightBtn from "@/components/btn/LightBtn.vue";
import Modal from "@/components/Modal.vue";

const data = new mafia();
const users = ref();
const roles = ref();
const openModal = ref(false);
const selectedRole = ref();

users.value = data.getActiveUsers();
roles.value = data.getPlayers();

onMounted(() => {
  _.forEach(roles.value, (role) => {
    if (role.userId && _.find(users.value, ["id", role.userId]) == null) {
      role.userName = "";
      role.userId = "";
    }
  });
});

const userRole = computed(() => {
  roles.value = data.updatePlayers(roles.value);
  return _.map(users.value, (user) => {
    return { ...user, role: _.find(roles.value, ["userId", user.id]) };
  });
});

function resetRoles() {
  _.forEach(roles.value, (role) => {
    role.userName = "";
    role.userId = "";
  });
}

function setRole(selectedRole, user) {
  if (user.role == selectedRole) {
    user.role.userId = null;
    user.role.userName = null;
    openModal.value = false;
    return;
  }
  /**
   * reset user role at first
   */
  if (user?.role?.userId) {
    user.role.userId = null;
    user.role.userName = null;
  }

  selectedRole.userId = user.id;
  selectedRole.userName = user.name;
  openModal.value = false;
}
</script>
<template>
  <div class="sm:p-5 p-2 pb-20 max-w-lg mx-auto">
    <div class="flex justify-between p-2">
      <h2 class="font-bold">تعیین نقش ها</h2>
      <button
        class="bg-red-300 text-red-800 px-2 rounded-md"
        @click="resetRoles()"
      >
        ریست
      </button>
    </div>

    <div class="flex-col flex gap-3 mt-10">
      <template v-for="role in roles" :key="role.class">
        <div
          class="rounded-md shadow-sm h-10 bg-white flex border-r-4 items-center gap-2 px-2 hover:bg-slate-100 cursor-pointer"
          :class="{ 'border-sky-500': role.userName }"
          @click="
            selectedRole = role;
            openModal = true;
          "
        >
          <div
            :class="{
              'text-red-600': role.side == 'mafia',
              'text-emerald-600': role.side == 'city',
              'text-amber-600': role.side == 'independent',
              'text-slate-600': role.side == 'gray',
            }"
            class="text-lg h-10 flex gap-2 items-center w-2/5"
          >
            <Icon :icon="role.icon" class="h-full w-6" />
            {{ role.roleName }}
          </div>
          <div class="w-1/5">
            <Icon
              v-if="role.userName"
              icon="akar-icons:arrow-left"
              class="block h-full w-6 mx-auto text-sky-500"
            />
            <Icon
              v-else
              icon="akar-icons:arrow-shuffle"
              :horizontalFlip="true"
              class="block h-full w-6 mx-auto text-gray-400"
            />
          </div>
          <div class="text-sky-500 w-2/5 text-left" v-if="role.userName">
            {{ role.userName }}
          </div>
          <div class="text-gray-400 w-2/5 text-left" v-else>تصادفی</div>
        </div>
      </template>
    </div>

    <div class="h-60"></div>
    <Bottom>
      <div class="p-1 max-w-lg mx-auto">
        <LightBtn
          to="/mafia/start/assign-roles"
          class="!bg-red-500 !text-white"
          icon="akar-icons:thumbs-up"
          :center="true"
          >تقسیم نقش ها</LightBtn
        >
      </div>
    </Bottom>

    <Modal
      v-show="openModal"
      :title="selectedRole?.roleName"
      @close="openModal = false"
    >
      <div class="flex flex-wrap gap-2 justify-center p-2">
        <div
          class="bg-white py-2 px-5 rounded-md border-t-4 flex-grow text-center cursor-pointer shadow-md"
          v-for="user in userRole"
          :key="user.id"
          :class="{ 'border-sky-500': user?.role }"
          @click="setRole(selectedRole, user)"
        >
          <div class="text-lg">{{ user.name }}</div>
          <div class="text-gray-400 h-8 flex gap-2 items-center justify-center">
            <Icon
              v-if="user?.role?.icon"
              :icon="user?.role?.icon"
              class="h-full w-6"
            />
            {{ user?.role?.roleName || "تصادفی" }}
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
