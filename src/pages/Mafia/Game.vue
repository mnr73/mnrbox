<script setup>
import { ref, watch, computed, onMounted, reactive } from "vue";
import mafia from "@/modules/mafia";
import _ from "lodash";
import Bottom from "@/components/Bottom.vue";
import RoleCard from "@/components/mafia/RoleCard.vue";
import TargetSelector from "@/components/mafia/TargetSelector.vue";
import { Icon } from "@iconify/vue";
import * as roles from "@/modules/roles";

const data = new mafia();
const daysBox = ref(null);
// const users = ref();
const selector = reactive({
  open: false,
  role: {},
  limit: 1,
  disable: [],
});
// const rounds = ref([]);
// const selectedIndex = ref();
const game = reactive({
  zeroNight: null,
  rounds: [],
  roles: [],
  lastRoundNumber: null,
  selectedRound: {},
  selectedStep: {},
});

// users.value = data.getActiveUsers();
game.roles = data.getPlayers([]);

// let test = new roles.godFather();
// test.setUser(_.find(game.roles, ["class", "godFather"]));
// console.log(test.property);

_.each(game.roles, (role) => {
  role.obj = new roles[role.class]();
  role.obj.setUser(role);
});

let rounds_structure = {
  stepNumber: 0,
  steps: {
    night: {
      number: 0,
      type: "night",
      active: true,
      name: "شب",
      acts: [],
    },
    day: {
      number: 1,
      type: "day",
      active: false,
      name: "روز",
      acts: [],
    },
    vote_1: {
      number: 2,
      type: "vote_1",
      active: false,
      name: "رای 1",
      votes: {},
      acts: [],
    },
    defense: {
      number: 3,
      type: "defense",
      active: false,
      name: "دفاع",
      acts: [],
    },
  },
};

if (_.find(game.roles, ["class", "ghazi"])) {
  rounds_structure.steps.ghazi = {
    number: _.max(_.map(rounds_structure.steps, "number")) + 1,
    type: "ghazi",
    active: false,
    name: "قاضی",
    do: null,
    role: null,
  };
}
rounds_structure.steps.vote_2 = {
  number: _.max(_.map(rounds_structure.steps, "number")) + 1,
  type: "vote_2",
  active: false,
  name: "رای 2",
  votes: {},
  acts: [],
};
if (_.find(game.roles, ["class", "shahrdar"])) {
  rounds_structure.steps.shahrdar = {
    number: _.max(_.map(rounds_structure.steps, "number")) + 1,
    type: "shahrdar",
    active: false,
    name: "شهردار",
    veto: null,
  };
}

onMounted(() => {
  game.rounds.push(_.cloneDeep(rounds_structure));
  game.lastRoundNumber = game.rounds.length - 1;
  calcActs();
});

game.selectedRound = computed(() => {
  return game.rounds[game.lastRoundNumber];
});

game.selectedStep = computed(() => {
  return _.find(game.selectedRound?.steps, [
    "number",
    game.selectedRound?.stepNumber,
  ]);
});

const userTargets = computed(() => {
  return _.groupBy(_.filter(game.selectedStep?.acts, "target"), "user.userId");
});

const userActs = computed(() => {
  return _.groupBy(_.reject(game.selectedStep?.acts, "target"), "user.userId");
});

const userTargetBy = computed(() => {
  return _.groupBy(
    _.filter(game.selectedStep?.acts, "target"),
    "target.userId"
  );
});

const getRoles = computed(() => {
  if (game.selectedStep?.type == "night") {
    let sorted = _.sortBy(game.selectedRound?.roles, "nightOrder");
    let filtered = _.filter(sorted, "nightAwake");
    return {
      beforeMafia: {
        name: "قبل از مافیا",
        roles: _.remove(filtered, (role) => {
          return (
            role.class == "nostradamus" ||
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
        roles: _.remove(sorted, (role) => {
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
        roles: _.filter(sorted, ["nightAwake", false]),
      },
    };
  }

  return game.selectedRound?.roles;
});

function nextStep() {
  calcActs();
  if (game.lastRoundNumber == 0) {
    if (game.selectedRound.stepNumber === 0) {
      game.selectedRound.stepNumber = 1;
      game.selectedRound.steps.day.active = true;
      return;
    }
  } else {
    let maxNumber = _.max(_.map(game.selectedRound.steps, "number"));
    if (game.selectedRound.stepNumber < maxNumber) {
      game.selectedRound.stepNumber++;
      _.find(game.selectedRound.steps, [
        "number",
        game.selectedRound.stepNumber,
      ]).active = true;
      return;
    }
  }
  game.rounds.push(_.cloneDeep(rounds_structure));
  game.lastRoundNumber++;
  daysBox.value.scrollLeft = -10000;
}

function select(role, act) {
  selector.limit = 1;
  if (role?.options?.counts) {
    let playerCounts = _.filter(game.roles, { dead: false, getOut: false })
      .length;
    selector.limit = _.orderBy(role.options.counts, "players", "desc").find(
      (o) => o.players <= playerCounts
    ).value;
  }
  if (role.class == "nostradamus") {
    selector.limit = 3;
  }
  selector.role = role;
  selector.open = true;
  selector.act = act;
}

function showTargetBtn(key, roleClass, actType) {
  if (game.selectedStep.type == "night") {
    if (key == "sleep") {
      return false;
    }
    if (
      roleClass != "godFather" &&
      actType == "mafia_shot" &&
      _.find(game.roles, { dead: false, getOut: false })
    ) {
      return false;
    }
    if (roleClass == "terrorist") {
      return false;
    }
  }

  return true;
}

/**
 * add roles in each round
 */
watch(
  () => game.lastRoundNumber,
  (newValue, oldValue) => {
    game.rounds[game.lastRoundNumber].roles = _.cloneDeep(game.roles);
  },
  { deep: false }
);

function calcActs() {
  let acts = _.flatMapDeep(game.rounds, (round) => {
    return _.map(round.steps, (step) => {
      return step.acts;
    });
  });
  acts = _.filter(acts);
  acts = _.groupBy(acts, "user.class");

  _.each(game.selectedRound.roles, (role) => {
    role.acts = acts[role.class] || [];
  });
  // game.acts = _.each(game.acts, (role) => {
  //   return _.each(role, (acts) => {
  //     acts.test = "true";
  //   });
  // });
}
// watch(
//   () => selectedStep.value?.targets,
//   (newValue, oldValue) => {
//     console.log("hi");
//   },
//   { deep: false }
// );
</script>

<template>
  <div class="overflow-x-auto sm:my-3 my-2 sm:px-5 px-2 text-sm" ref="daysBox">
    <div class="flex gap-2">
      <div
        class="bg-slate-700 text-white h-8 px-2 rounded-full flex items-center justify-center flex-shrink-0"
        style="min-width: 2rem"
        :class="{ '!bg-sky-600': game.lastRoundNumber == index }"
        v-for="(round, index) in game.rounds"
        :key="index"
      >
        {{ index || "معارفه" }}
      </div>
      <div class="w-10 flex-shrink-0"></div>
    </div>
  </div>
  <div class="overflow-x-auto sm:my-3 my-2 sm:px-5 px-2 text-sm">
    <div class="flex gap-2 font-light">
      <template v-for="(round, key) in game.selectedRound?.steps" :key="key">
        <div
          class="bg-slate-400 text-white px-2 py-1 rounded-full flex items-center justify-center flex-shrink-0"
          :class="{
            '!bg-sky-600': game.selectedRound.stepNumber == round.number,
            '!bg-slate-800':
              round.active && game.selectedRound.stepNumber != round.number,
          }"
          v-if="game.lastRoundNumber != 0 || round.number < 2"
        >
          {{ round.name }}
        </div>
      </template>
      <div class="w-1 flex-shrink-0"></div>
    </div>
  </div>
  <div class="sm:p-5 p-2 pb-60">
    <div v-if="game.lastRoundNumber == 0 && game.selectedStep.type == 'night'">
      <div class="p-4">
        در بعضی از سناریو ها تیم مافیا در شب قبل از معارفه بیدار شده و یک دیگر
        را می‌شناسند.
      </div>
      <div class="flex gap-5 justify-center">
        <button
          class="bg-slate-200 shadow-lg p-2 rounded-md"
          :class="{ '!bg-sky-500 text-white': game.zeroNight === true }"
          @click="game.zeroNight = true"
        >
          شناختند
        </button>
        <button
          class="bg-slate-200 shadow-lg p-2 rounded-md"
          :class="{ '!bg-sky-500 text-white': game.zeroNight === false }"
          @click="game.zeroNight = false"
        >
          لازم نیست
        </button>
      </div>
    </div>

    <div v-else class="flex flex-col gap-3">
      <!--
				night step
			-->
      <div class="" v-if="game.selectedStep?.type == 'night'">
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
                <RoleCard :role="role" :step="game.selectedStep">
                  <div class="p-2">
                    <div v-if="role.class == 'khabGard'" class="p-2">
                      <div v-if="userActs[role.userId]?.[0]?.sacrifice">
                        خودش را فدای شهر کرد 👍
                      </div>
                      <div
                        v-else-if="
                          userActs[role.userId]?.[0]?.sacrifice === false
                        "
                      >
                        خودش را فدای شهر نکرد 👎
                      </div>
                    </div>
                    <div v-if="role.class == 'farmande'" class="p-2">
                      <div v-if="userActs[role.userId]?.[0]?.confirm">
                        شات اسنایپر را تایید کرد 👍
                      </div>
                      <div
                        v-else-if="
                          userActs[role.userId]?.[0]?.confirm === false
                        "
                      >
                        شات اسنایپر را تایید نکرد 👎
                      </div>
                    </div>
                    <div v-if="role.class == 'janSakht'" class="p-2">
                      <div v-if="userActs[role.userId]?.[0]?.stats">
                        استعلام میخواهد 👍
                      </div>
                      <div
                        v-else-if="userActs[role.userId]?.[0]?.stats === false"
                      >
                        استعلام نمی‌خواهد 👎
                      </div>
                    </div>
                    <div
                      class="flex flex-wrap gap-1 p-2 items-center"
                      v-if="userTargets[role.userId]?.length"
                    >
                      <div>تارگت ها:</div>
                      <div
                        v-for="(item, index) in userTargets[role.userId]"
                        :key="index"
                        class="bg-slate-100 border border-r-4 border-r-sky-400 rounded-md py-1 px-2"
                      >
                        {{ item?.target?.userName }}
                        <span class="text-slate-400">
                          <Icon
                            :icon="item?.target?.icon"
                            class="inline-block w-6 h-full"
                          />
                          {{ item?.target?.roleName }}
                        </span>
                        <span
                          class="text-slate-500 font-bold"
                          v-if="item?.word"
                        >
                          ({{ item?.word }})
                        </span>
                        <span
                          class="text-slate-500 font-bold"
                          v-if="item?.bombAct"
                        >
                          ({{ item?.bombAct }})
                        </span>
                        <span
                          class="text-slate-500 font-bold"
                          v-if="item.guess !== undefined"
                        >
                          ({{ item?.guess ? "درست" : "غلط" }})
                        </span>
                        <span
                          class="text-slate-500 font-bold"
                          v-if="item.type == 'rob_from'"
                        >
                          (دزدیدن)
                        </span>
                        <span
                          class="text-slate-500 font-bold"
                          v-if="item.type == 'rob_to'"
                        >
                          (زدن)
                        </span>
                        <span
                          class="text-slate-500 font-bold"
                          v-if="item.type == 'true_gun'"
                        >
                          (واقعی)
                        </span>
                        <span
                          class="text-slate-500 font-bold"
                          v-if="item.type == 'fake_gun'"
                        >
                          (مشقی)
                        </span>
                      </div>
                    </div>
                    <div
                      class="flex flex-wrap gap-1 p-2 items-center"
                      v-if="userTargetBy[role.userId]?.length"
                    >
                      <div>تارگت شده توسط:</div>
                      <div
                        v-for="(item, index) in userTargetBy[role.userId]"
                        :key="index"
                        class="bg-slate-100 border border-r-4 border-r-red-500 rounded-md py-1 px-2"
                      >
                        {{ item?.user?.userName }}
                        <span class="text-slate-400">
                          <Icon
                            :icon="item?.user?.icon"
                            class="inline-block w-6 h-full"
                          />
                          {{ item?.user?.roleName }}
                        </span>
                        <span
                          class="text-slate-500 font-bold"
                          v-if="item?.word"
                        >
                          ({{ item?.word }})
                        </span>
                        <span
                          class="text-slate-500 font-bold"
                          v-if="item?.bombAct"
                        >
                          ({{ item?.bombAct }})
                        </span>
                        <span
                          class="text-slate-500 font-bold"
                          v-if="item.guess !== undefined"
                        >
                          ({{ item?.guess ? "درست" : "غلط" }})
                        </span>
                        <span
                          class="text-slate-500 font-bold"
                          v-if="item.type == 'rob_from'"
                        >
                          (دزدیدن)
                        </span>
                        <span
                          class="text-slate-500 font-bold"
                          v-if="item.type == 'rob_to'"
                        >
                          (زدن)
                        </span>
                        <span
                          class="text-slate-500 font-bold"
                          v-if="item.type == 'true_gun'"
                        >
                          (واقعی)
                        </span>
                        <span
                          class="text-slate-500 font-bold"
                          v-if="item.type == 'fake_gun'"
                        >
                          (مشقی)
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <template
                        v-for="(act, index) in role.obj.property.acts"
                        :key="act.type"
                      >
                        <button
                          v-if="showTargetBtn(key, role.class, act.type)"
                          class="bg-slate-200 border border-slate-300 p-1 w-full rounded-md"
                          @click="select(role, act)"
                        >
                          {{ act.name }}
                        </button>
                      </template>
                    </div>
                  </div>
                </RoleCard>
              </template>
            </div>
          </div>
        </template>
      </div>

      <template v-else v-for="role in getRoles" :key="role.userId">
        <RoleCard :role="role"> body </RoleCard>
      </template>

      <div class="h-60"></div>
    </div>
  </div>
  <TargetSelector
    v-if="selector.open"
    :selector="selector"
    :list="game.selectedRound.roles"
    :step="game.selectedStep"
  ></TargetSelector>
  <Bottom>
    <div class="p-2 border-t flex h-16 gap-2">
      <button class="bg-slate-700 text-white shadow-md p-2 w-3/12 rounded-2xl">
        موزیک
      </button>
      <button class="bg-slate-700 text-white shadow-md p-2 w-3/12 rounded-2xl">
        تایمر
      </button>
      <button
        class="bg-slate-700 text-white shadow-md p-2 w-6/12 rounded-2xl"
        @click="nextStep"
      >
        مرحله بعد
      </button>
    </div>
  </Bottom>
</template>
