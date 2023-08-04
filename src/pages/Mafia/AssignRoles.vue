<script setup>
import MnrCheckSlider from "@/components/mnr/MnrCheckSlider.vue";
import MnrNumber from "@/components/mnr/MnrNumber.vue";
import { Icon } from "@iconify/vue";
import { ref, watch, computed, onMounted } from "vue";
import mafia from "@/modules/mafia";
import MnrSelect from "@/components/mnr/MnrSelect.vue";
import _ from "lodash";
import Bottom from "@/components/Bottom.vue";
import Modal from "@/components/Modal.vue";
import LightBtn from "@/components/btn/LightBtn.vue";

const data = new mafia();
const users = ref();
const roles = ref();
// let selectedUser = ref()

users.value = data.getActiveUsers();
users.value = _.shuffle(users.value);
roles.value = data.getPlayers();

users.value = _.map(users.value, (user) => {
  user.seen = false;
  user.open = false;
  return user;
});

onMounted(() => {
  _.forEach(_.filter(roles.value, ["userId", ""]), (role) => {
    let selectedUsers = _.map(roles.value, "userId");
    let freeUsers = _.filter(
      users.value,
      (user) => selectedUsers.find((id) => id == user.id) == undefined
    );
    freeUsers = _.shuffle(freeUsers);
    let randomIndex = Math.floor(Math.random() * freeUsers.length);
    role.userId = freeUsers[randomIndex].id;
    role.userName = freeUsers[randomIndex].name;
  });
  data.updatePlayers(roles.value);
});

const openUser = computed(() => {
  return _.find(users.value, "open") || null;
});

const openRole = computed(() => {
  return _.find(roles.value, ["userId", openUser.value?.id]);
});
</script>
<template>
  <div class="sm:p-5 p-2 pb-20">
    <div class="flex justify-between p-2">
      <h2 class="font-bold">تقسیم نقش ها</h2>
    </div>
    <div class="flex flex-wrap gap-2 justify-center">
      <div
        class="bg-white py-3 px-5 rounded-md border-t-4 flex-grow text-center cursor-pointer"
        :class="{
          'opacity-70': user.seen,
          'border-sky-500 shadow-md': !user.seen,
        }"
        v-for="user in _.sortBy(users, 'seen')"
        :key="user.id"
        @click="user.open = true"
      >
        <div class="text-lg">{{ user.name }}</div>
      </div>
    </div>
    <Modal
      v-show="openUser"
      @close="
        openUser.seen = true;
        openUser.open = false;
      "
      title="نمایش نقش"
      closeText="متوجه شدم"
    >
      <div class="flex flex-col items-center justify-center gap-8 py-16">
        <div class="font-bold">{{ openUser?.name }}</div>
        <div class="text-gray-300">
          <Icon :icon="openRole?.icon" class="h-20 w-20" />
        </div>
        <div class="text-gray-400">
          {{ openRole?.roleName }} ({{
            {
              mafia: "مافیا",
              city: "شهر",
              independent: "مستقل",
              gray: "خاکستری",
            }[openRole?.side]
          }})
        </div>
      </div>
    </Modal>
    <Bottom>
      <div class="p-1 max-w-lg mx-auto">
        <LightBtn
          to="/mafia/game"
          class="!bg-red-500 !text-white"
          icon="akar-icons:thumbs-up"
          :center="true"
          >شروع بازی</LightBtn
        >
      </div>
    </Bottom>
  </div>
</template>
