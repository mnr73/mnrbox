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
  let roles = props.game.selectedRound?.roles;
  return {
    shahrdar: {
      name: "شهردار و فدایی",
      roles: _.filter(
        roles,
        (role) => role.class == "shahrdar" || role.class == "fadayi"
      ),
    },
    defense: {
      name: "دفاعیه",
      roles: _.filter(roles, (role) => {
        return Math.floor(props.game.playerCounts / 2) <= role.vote1;
      }),
    },
  };
});

function showTargetBtn(roleClass, actType) {
  if (actType == "sacrifice" || actType == "veto_vote") {
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
              <template v-if="key == 'defense'">
                <div class="px-2">
                  تعداد رای 1:
                  {{ role.vote1 }}
                  از {{ game.playerCounts }}
                  <b
                    v-if="Math.floor(game.playerCounts / 2) <= role.vote1"
                    class="text-red-600"
                    >(دفاع)</b
                  >
                </div>
                <div class="px-2">
                  تعداد رای 2:
                  {{ role.vote2 }}
                  از {{ game.playerCounts }}
                  <b
                    v-if="Math.floor(game.playerCounts / 2) <= role.vote2"
                    class="text-red-600"
                    >(بیشتر از نصف)</b
                  >
                </div>
              </template>
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
    :list="getRoles.defense.roles"
    :step="game.selectedStep"
    @select="props.game.calcRoundActs()"
  ></TargetSelector>
</template>
