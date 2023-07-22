<script setup>
import { Icon } from "@iconify/vue";

import TargetSelector from "./TargetSelector.vue";
import RoleCard from "./RoleCard.vue";
import { computed, reactive } from "vue";
import _ from "lodash";

const props = defineProps({
  game: Object,
});

const getRoles = computed(() => {
  let roles = _.clone(props.game.selectedRound?.roles);
  roles = _.orderBy(roles, "dayOrder", "asc");
  let removed = _.remove(roles, (role) => {
    return role.dead || role.getOut;
  });
  return {
    defense: {
      name: "دفاعیه",
      roles: _.remove(roles, (role) => {
        return Math.floor(props.game.playerCounts / 2) <= role.vote1;
      }),
    },
    others: {
      name: "سایر بازیکنان",
      roles: roles,
    },
    removed: {
      name: "خارج شده ها",
      roles: removed,
    },
  };
});

function showTargetBtn(roleClass, actType) {
  if (roleClass == "cowboy") {
    return true;
  }
  if (roleClass == "terrorist" && actType == "terror") {
    return true;
  }

  return false;
}
</script>

<template>
  <div>
    <template v-for="(roles, key) in getRoles" :key="key">
      <div v-if="roles.roles?.length" class="my-5">
        <h2 class="text-lg font-bold text-slate-700 p-2">
          {{ roles.name }}
        </h2>
        <hr class="border-slate-700 border-2 mb-2" />
        <div class="flex flex-col gap-3">
          <template v-for="(role, index) in roles.roles" :key="role.userId">
            <RoleCard
              :role="role"
              :game="props.game"
              :step="props.game.selectedStep"
            >
              <div class="px-2">
                تعداد رای 1:
                {{ role.vote1 }}
                از {{ game.playerCounts }}
              </div>
              <div class="flex flex-wrap gap-2 justify-center p-2" dir="ltr">
                <button
                  class="w-8 h-8 bg-slate-200 rounded-full px-3 border border-emerald-500 flex justify-center items-center"
                  :class="{
                    '!bg-emerald-500 text-white': role.vote2 == 0,
                  }"
                  @click="role.vote2 = 0"
                >
                  0
                </button>
                <button
                  v-for="item in game.playerCounts"
                  class="w-8 h-8 bg-slate-200 rounded-full px-3 border border-emerald-500 flex justify-center items-center"
                  :class="{
                    '!border-red-500':
                      Math.floor(game.playerCounts / 2) <= item,
                    '!bg-red-500 text-white':
                      role.vote2 == item &&
                      Math.floor(game.playerCounts / 2) <= item,
                    '!bg-emerald-500 text-white':
                      role.vote2 == item &&
                      Math.floor(game.playerCounts / 2) > item,
                  }"
                  @click="role.vote2 = item"
                  :key="item"
                >
                  {{ item }}
                </button>
              </div>
              <div class="px-2" v-if="key == 'defense'">
                تعداد رای 2:
                <b>{{ role.vote2 }}</b>
                از {{ game.playerCounts }}
                <b
                  v-if="Math.floor(game.playerCounts / 2) <= role.vote2"
                  class="text-red-600"
                  >(بیشتر از نصف)</b
                >
              </div>
              <div class="flex gap-2 p-2 pt-0">
                <template v-for="(act, index) in role.acts" :key="act.type">
                  <button
                    v-if="showTargetBtn(role.class, act.type)"
                    class="bg-slate-200 border border-slate-300 p-1 w-full rounded-md"
                    @click="game.select(role, act)"
                  >
                    {{ act.name }}
                  </button>
                </template>
                <template
                  v-if="
                    _.filter(game.userTargetBy?.[role.userId], {
                      user: { class: 'tofangdar' },
                    }).length
                  "
                >
                  <button
                    class="bg-slate-200 border border-slate-300 p-1 w-full rounded-md"
                    @click="
                      game.select(role, {
                        type:
                          'shot_' +
                          _.filter(game.userTargetBy?.[role.userId], {
                            user: { class: 'tofangdar' },
                          })[0].type,
                        name: 'شلیک تیر تفنگدار',
                        kill: true,
                        deep: false,
                        term: 'day',
                      })
                    "
                  >
                    شلیک
                  </button>
                </template>
                <template
                  v-if="
                    _.filter(game.userTargetBy?.[role.userId], {
                      user: { class: 'bomber' },
                    }).length
                  "
                >
                  <button
                    class="bg-slate-200 border border-slate-300 p-1 w-full rounded-md"
                    @click="
                      game.bombExplode(
                        _.filter(game.userTargetBy?.[role.userId], {
                          user: { class: 'bomber' },
                        })[0]
                      )
                    "
                  >
                    انفجار
                  </button>
                </template>
              </div>
            </RoleCard>
          </template>
        </div>
      </div>
    </template>
  </div>
  <TargetSelector
    v-if="game.selector.open"
    :selector="game.selector"
    :list="game.selectedRound.roles"
    :step="game.selectedStep"
    @select="props.game.calcRoundActs()"
  ></TargetSelector>
</template>
