<script setup>
import { Icon } from "@iconify/vue";
import mafia from "@/modules/mafia";
import _ from "lodash";
import * as role from "@/modules/roles";
import { ref, reactive, computed, watch } from "vue";
import * as rolesComponent from "@/modules/rolesComponent";
import RoleWrapper from "@/components/mafia/RoleWrapper.vue";

let data = new mafia();
let name = ref();
let users = ref();
let roles = ref();

setRoles();

function setRoles() {
  roles.value = data.getRoles();
  if (!roles.value) {
    roles.value = _.map(role, (r) => {
      let obj = new r();
      return {
        active: false,
        open: false,
        card: obj.card,
      };
    });
    roles.value = _.orderBy(
      roles.value,
      [
        (x) => x.card.side == "mafia",
        (x) => x.card.side == "city",
        "card.side",
        "card.nightOrder",
      ],
      ["desc", "desc", "desc", "asc"]
    );
  }
}

const filteredRoles = computed(() =>
  _.orderBy(
    _.filter(roles.value, (x) => !x.card.roleName.search(name.value)),
    "active",
    "desc"
  )
);

users.value = data.getUsers();

watch(
  () => roles.value,
  (newValue, oldValue) => {
    name.value = "";
    data.updateRoles(roles.value);
    data.updatePlayers(_.map(_.filter(roles.value, "active"), "card"));
  },
  { deep: true }
);

function deleteRoles() {
  data.deleteRoles();
  setRoles();
}
</script>
<template>
  <div class="sm:p-5 p-2">
    <input
      placeholder="جستجو"
      type="text"
      v-model="name"
      class="shadow-sm w-full border border-red-300 outline-none px-2 rounded-md h-14"
    />
    <hr class="my-4" />
    <div class="bg-white sm:p-5 p-2 border rounded-sm">
      <div class="flex justify-between">
        <h2 class="font-bold">
          نقش ها (<span>{{ _.filter(roles, "active").length }}</span> از
          <span>{{ Object.keys(roles).length }}</span
          >) -
          <span class="text-slate-400"
            >بازیکن ها {{ _.filter(users, "active")?.length || 0 }}</span
          >
        </h2>
        <button
          class="bg-red-300 text-red-800 px-2 rounded-md"
          @click="deleteRoles()"
        >
          ریست
        </button>
      </div>
      <div class="grid grid-cols-4 gap-2 mt-2">
        <div class="bg-red-500 p-2 rounded-md text-white text-center">
          {{
            _.filter(roles, {
              card: { side: "mafia" },
              active: true,
            }).length
          }}
          از {{ _.filter(roles, ["card.side", "mafia"]).length }}
        </div>
        <div class="bg-emerald-500 p-2 rounded-md text-white text-center">
          {{
            _.filter(roles, {
              card: { side: "city" },
              active: true,
            }).length
          }}
          از {{ _.filter(roles, ["card.side", "city"]).length }}
        </div>
        <div class="bg-amber-500 p-2 rounded-md text-white text-center">
          {{
            _.filter(roles, {
              card: { side: "independent" },
              active: true,
            }).length
          }}
          از {{ _.filter(roles, ["card.side", "independent"]).length }}
        </div>
        <div class="bg-slate-500 p-2 rounded-md text-white text-center">
          {{
            _.filter(roles, {
              card: { side: "gray" },
              active: true,
            }).length
          }}
          از {{ _.filter(roles, ["card.side", "gray"]).length }}
        </div>
      </div>
      <div class="mt-5" v-if="Object.keys(roles).length == 0">
        کاربری وجود ندارد
      </div>
      <div class="mt-5 grid grid-cols-1 gap-3" v-else>
        <template v-for="role in filteredRoles" :key="role.card.class">
          <RoleWrapper :role="role">
            <component
              :is="rolesComponent[role.card.roleComponent]"
              :role="role.card"
            ></component>
          </RoleWrapper>
        </template>
      </div>
    </div>
  </div>
</template>
