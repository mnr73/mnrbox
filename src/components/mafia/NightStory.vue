<script setup>
import { Icon } from "@iconify/vue";

import TargetSelector from "./TargetSelector.vue";
import RoleCard from "./RoleCard.vue";
import { computed, reactive } from "vue";
import _ from "lodash";

// const selector = reactive({
//   open: false,
//   role: {},
//   limit: 1,
//   disabled: [],
//   acts: {},
//   roundActs: {},
//   lastTime: [],
// });

const props = defineProps({
  game: Object,
});

const getRoles = computed(() => {
  let sorted = _.sortBy(props.game.selectedRound?.roles, "nightOrder");
  let filtered = _.filter(sorted, "nightAwake");
  return {
    beforeMafia: {
      name: "قبل از مافیا",
      roles: _.remove(filtered, (role) => {
        return (
          (role.class == "nostradamus" && !props.game.acts[role.class]) ||
          role.class == "saghi" ||
          role.class == "negahban" ||
          role.class == "khabGard"
        );
      }),
    },
    aloneMafia: {
      name: "مافیای مستقل",
      roles: _.remove(filtered, (role) => {
        return role.side == "mafia" && role.options?.alone == true;
      }),
    },
    mafia: {
      name: "ساید مافیا",
      roles: _.remove(filtered, (role) => {
        return role.side == "mafia" && role.options?.alone != true;
      }),
    },
    cities: {
      name: "ساید شهر",
      roles: _.remove(filtered, (role) => {
        return (
          role.side == "city" &&
          role.class != "framason" &&
          role.class != "tiler"
        );
      }),
    },
    masons: {
      name: "فراماسون ها",
      roles: _.filter(sorted, (role) => {
        return role.mason;
      }),
    },
    independent: {
      name: "ساید مستفل",
      roles: _.remove(filtered, (role) => {
        return role.side == "independent";
      }),
    },
    sleep: {
      name: "افراد خواب",
      roles: _.filter(sorted, (role) => {
        return (
          role.nightAwake == false ||
          (role.class == "nostradamus" && props.game.acts[role.class])
        );
      }),
    },
  };
});

function showTargetBtn(key, role, actType) {
  if (role.dead || role.getOut) {
    return false;
  }
  if (key == "sleep") {
    return false;
  }
  if (
    role.class != "godFather" &&
    actType == "mafia_shot" &&
    _.find(props.game.roles, { dead: false, getOut: false })
  ) {
    return false;
  }
  if (role.class == "terrorist") {
    return false;
  }

  if (role.class == "killer" && role.options.justOdd) {
    if (
      _.find(
        props.game.rounds?.[props.game.lastRoundNumber - 1]?.steps?.night?.acts,
        { type: "killer_shot" }
      )
    ) {
      return false;
    }
  }

  return true;
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
            <hr
              class="my-1 border-2 border-dashed border-slate-400"
              v-if="
                index > 0 &&
                (role.side != 'mafia' || role?.options?.alone) &&
                key != 'sleep'
              "
            />
            <RoleCard
              :role="role"
              :game="props.game"
              :step="props.game.selectedStep"
            >
              <div class="flex gap-2 p-2 pt-0">
                <template v-for="(act, index) in role.acts" :key="act.type">
                  <button
                    v-if="showTargetBtn(key, role, act.type)"
                    class="bg-slate-200 border border-slate-300 p-1 w-full rounded-md"
                    @click="game.select(role, act)"
                  >
                    {{ act.name }}
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
