<script setup>
import { ref, watch, computed, onMounted, reactive } from "vue";
import mafia from "@/modules/mafia";
import _ from "lodash";
import Bottom from "@/components/Bottom.vue";
import RoleCard from "@/components/mafia/RoleCard.vue";
import TargetSelector from "@/components/mafia/TargetSelector.vue";
import { Icon } from "@iconify/vue";

const data = new mafia();
const daysBox = ref(null);
const users = ref();
const selector = reactive({
  open: false,
  role: {},
  type: "target",
});
const rounds = ref([]);
const selectedIndex = ref();
const game = reactive({
  zeroNight: null,
  rounds: rounds.value,
  roles: [],
});

users.value = data.getActiveUsers();
game.roles = data.getPlayers([]);

let rounds_structure = {
  stepNumber: 0,
  steps: {
    night: {
      number: 0,
      type: "night",
      active: true,
      name: "شب",
      targets: [],
    },
    day: {
      number: 1,
      type: "day",
      active: false,
      name: "روز",
      targets: [],
    },
    vote_1: {
      number: 2,
      type: "vote_1",
      active: false,
      name: "رای 1",
      votes: {},
      targets: [],
    },
    defense: {
      number: 3,
      type: "defense",
      active: false,
      name: "دفاع",
      targets: [],
    },
    vote_2: {
      number: 4,
      type: "vote_2",
      active: false,
      name: "رای 2",
      votes: {},
      targets: [],
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
  rounds.value.push(_.cloneDeep(rounds_structure));
  selectedIndex.value = rounds.value.length - 1;
  // game.value.rounds = rounds.value
});

const selectedRound = computed(() => {
  return rounds.value[selectedIndex.value];
});

const selectedStep = computed(() => {
  return _.find(selectedRound.value?.steps, [
    "number",
    selectedRound.value?.stepNumber,
  ]);
});

const userTargets = computed(() => {
  return _.groupBy(selectedStep.value?.targets, "user.userId");
});

const userTargetBy = computed(() => {
  return _.groupBy(selectedStep.value?.targets, "target.userId");
});

const getRoles = computed(() => {
  if (selectedStep.value?.type == "night") {
    let filtered = _.filter(selectedRound.value?.roles, "nightAwake");
    return {
      beforeMafia: {
        name: "قبل از مافیا",
        roles: _.remove(filtered, (role) => {
          return (
            role.class == "nostradamus" ||
            role.class == "saghi" ||
            role.class == "negahban"
          );
        }),
      },
      mafia: {
        name: "ساید مافیا",
        roles: _.remove(filtered, (role) => {
          return role.side == "mafia" && role.alone?.value != true;
        }),
      },
      aloneMafia: {
        name: "مافیای مستقل",
        roles: _.remove(filtered, (role) => {
          return role.side == "mafia" && role.alone?.value == true;
        }),
      },
      cities: {
        name: "ساید شهر",
        roles: _.remove(filtered, (role) => {
          return role.side == "city";
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
        roles: _.filter(selectedRound.value.roles, ["nightAwake", false]),
      },
    };
  }

  return selectedRound.value?.roles;
});

function nextStep() {
  if (selectedIndex.value == 0) {
    if (selectedRound.value.stepNumber === 0) {
      selectedRound.value.stepNumber = 1;
      selectedRound.value.steps.day.active = true;
      return;
    }
  } else {
    let maxNumber = _.max(_.map(selectedRound.value.steps, "number"));
    if (selectedRound.value.stepNumber < maxNumber) {
      selectedRound.value.stepNumber++;
      _.find(selectedRound.value.steps, [
        "number",
        selectedRound.value.stepNumber,
      ]).active = true;
      return;
    }
  }
  rounds.value.push(_.cloneDeep(rounds_structure));
  selectedIndex.value++;
  daysBox.value.scrollLeft = -10000;
}

function select(role) {
  selector.role = role;
  selector.open = true;
}

function selected(list) {
  console.log(list);
}

watch(
  () => selectedIndex.value,
  (newValue, oldValue) => {
    rounds.value[selectedIndex.value].roles = _.cloneDeep(game.roles);
  },
  { deep: false }
);
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
        :class="{ '!bg-sky-600': selectedIndex == index }"
        v-for="(round, index) in rounds"
        :key="index"
      >
        {{ index || "معارفه" }}
      </div>
      <div class="w-10 flex-shrink-0"></div>
    </div>
  </div>
  <div class="overflow-x-auto sm:my-3 my-2 sm:px-5 px-2 text-sm">
    <div class="flex gap-2 font-light">
      <template v-for="(round, key) in selectedRound?.steps" :key="key">
        <div
          class="bg-slate-400 text-white px-2 py-1 rounded-full flex items-center justify-center flex-shrink-0"
          :class="{
            '!bg-sky-600': selectedRound.stepNumber == round.number,
            '!bg-slate-800':
              round.active && selectedRound.stepNumber != round.number,
          }"
          v-if="selectedIndex != 0 || round.number < 2"
        >
          {{ round.name }}
        </div>
      </template>
      <div class="w-1 flex-shrink-0"></div>
    </div>
  </div>
  <div class="sm:p-5 p-2 pb-60">
    <div v-if="selectedIndex == 0 && selectedStep.type == 'night'">
      <div class="p-4">
        در بعضی از سناریو ها تیم مافیا در شب قبل از معارفه بیدار شده و یک دیگر
        را می‌شناسند.
      </div>
      <div class="flex gap-5 justify-center">
        <button
          class="bg-slate-200 shadow-lg p-2 rounded-md"
          :class="{ 'bg-sky-500 text-white': game.zeroNight === true }"
          @click="game.zeroNight = true"
        >
          شناختند
        </button>
        <button
          class="bg-slate-200 shadow-lg p-2 rounded-md"
          :class="{ 'bg-sky-500 text-white': game.zeroNight === false }"
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
      <div class="" v-if="selectedStep?.type == 'night'">
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
                    (role.side != 'mafia' || role.alone) &&
                    key != 'sleep'
                  "
                />
                <RoleCard :role="role" :step="selectedStep">
                  <div class="p-2">
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
                      </div>
                    </div>
                    <button
                      v-if="key != 'sleep'"
                      class="bg-amber-500 text-white p-1 w-full rounded-md"
                      @click="select(role)"
                    >
                      انتخاب تارگت
                    </button>
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
    :list="selectedRound.roles"
    :step="selectedStep"
    @selectedList="selected"
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
