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
  return props.game.selectedRound?.roles;
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
  <div class="flex flex-col gap-3">
    <template v-for="role in getRoles" :key="role.userId">
      <RoleCard :role="role" :game="props.game" :step="props.game.selectedStep">
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
  <TargetSelector
    v-if="game.selector.open"
    :selector="game.selector"
    :list="game.selectedRound.roles"
    :step="game.selectedStep"
    @select="props.game.calcRoundActs()"
  ></TargetSelector>
</template>
