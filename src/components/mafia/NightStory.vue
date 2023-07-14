<script setup>
import { Icon } from "@iconify/vue";

import TargetSelector from "./TargetSelector.vue";
import RoleCard from "./RoleCard.vue";
import { computed, reactive } from "vue";
import _ from "lodash";

const selector = reactive({
  open: false,
  role: {},
  limit: 1,
  disabled: [],
  acts: {},
  roundActs: {},
  lastTime: [],
});

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

function showTargetBtn(key, roleClass, actType) {
  if (key == "sleep") {
    return false;
  }
  if (
    roleClass != "godFather" &&
    actType == "mafia_shot" &&
    _.find(props.game.roles, { dead: false, getOut: false })
  ) {
    return false;
  }
  if (roleClass == "terrorist") {
    return false;
  }
  if (roleClass == "killer" && props.game.lastRoundNumber % 2 != 0) {
    return false;
  }

  return true;
}

function select(role, act) {
  selector.limit = 1;
  if (role?.acts?.[act.type]?.targets) {
    if (typeof role.acts[act.type].targets == "object") {
      let playerCounts = _.filter(props.game.roles, {
        dead: false,
        getOut: false,
      }).length;
      selector.limit = _.orderBy(
        role.acts[act.type].targets,
        "players",
        "desc"
      ).find((o) => o.players <= playerCounts).value;
    } else if (typeof role.acts[act.type].targets == "number") {
      selector.limit = role.acts[act.type].targets;
    }
  }
  selector.role = role;
  selector.open = true;
  selector.act = act;
  if (role.class == "tofangdar") {
    if (act.type == "true_gun") {
      selector.disabled = _.map(
        _.filter(props.game.selectedStep.acts, (act) => {
          return act.user == role && act.type == "fake_gun";
        }),
        "target"
      );
    } else if (act.type == "fake_gun") {
      selector.disabled = _.map(
        _.filter(props.game.selectedStep.acts, (act) => {
          return act.user == role && act.type == "true_gun";
        }),
        "target"
      );
    }
  }
  if (props.game.rounds[props.game.lastRoundNumber - 1] != undefined) {
    selector.lastTime = _.filter(
      props.game.rounds[props.game.lastRoundNumber - 1].steps[
        props.game.selectedStep.type
      ].acts,
      (a) => a.user.class == role.class
    );
  }
  // selector.lastTime = _.map(selector.lastTime, "target");
  // selector.lastTime = _.map()
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
                    v-if="showTargetBtn(key, role.class, act.type)"
                    class="bg-slate-200 border border-slate-300 p-1 w-full rounded-md"
                    @click="select(role, act)"
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
    v-if="selector.open"
    :selector="selector"
    :list="game.selectedRound.roles"
    :step="game.selectedStep"
    @select="props.game.calcRoundActs()"
  ></TargetSelector>
</template>
