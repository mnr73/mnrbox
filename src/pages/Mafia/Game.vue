<script setup>
import { ref, watch, computed, onMounted, reactive } from "vue";
import mafia from "@/modules/mafia";
import _ from "lodash";
import Bottom from "@/components/Bottom.vue";
import { Icon } from "@iconify/vue";
import soundMafia1 from "@/assets/audio/mafia1.mp3";
import TimerPart from "@/components/mafia/TimerPart.vue";
import NightStory from "@/components/mafia/NightStory.vue";

const data = new mafia();
const daysBox = ref(null);
const track = reactive({
  audio: new Audio(soundMafia1),
  paused: true,
});
const timer = reactive({
  open: false,
  speak: 40,
  challenge: 20,
});
// const users = ref();

// const rounds = ref([]);
// const selectedIndex = ref();
const game = reactive({
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

// _.each(game.roles, (role) => {
//   role.obj = new roles[role.class]();
//   role.obj.setUser(role);
// });

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
  addRound();
  game.lastRoundNumber = game.rounds.length - 1;
  game.calcActs();
});

function addRound() {
  if (game.rounds.length == 0) {
    let round = _.cloneDeep(rounds_structure);
    round.steps = _.pick(round.steps, ["night", "day"]);
    game.rounds.push(round);
  } else {
    game.rounds.push(_.cloneDeep(rounds_structure));
  }
}

game.selectedRound = computed(() => {
  return game.rounds[game.lastRoundNumber];
});

game.selectedStep = computed(() => {
  return _.find(game.selectedRound?.steps, [
    "number",
    game.selectedRound?.stepNumber,
  ]);
});

game.userTargets = computed(() => {
  return _.groupBy(_.filter(game.selectedStep?.acts, "target"), "user.userId");
});

game.userActs = computed(() => {
  return _.groupBy(_.reject(game.selectedStep?.acts, "target"), "user.userId");
});

game.userTargetBy = computed(() => {
  return _.groupBy(
    _.filter(game.selectedStep?.acts, "target"),
    "target.userId"
  );
});

function nextStep() {
  scroll(0, 0);
  let maxNumber = _.max(_.map(game.selectedRound.steps, "number"));
  if (game.selectedRound.stepNumber < maxNumber) {
    game.selectedRound.stepNumber++;
    _.find(game.selectedRound.steps, [
      "number",
      game.selectedRound.stepNumber,
    ]).active = true;
  } else {
    addRound();
    game.lastRoundNumber++;
    daysBox.value.scrollLeft = -10000;
  }
  if (["night", "ghazi", "shahrdar"].includes(game.selectedStep.type)) {
    toggleSound("play");
  } else {
    toggleSound("stop");
  }

  game.calcActs();
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

game.calcActs = function () {
  game.acts = game.calcActsStats(_.dropRight(game.rounds));
  game.calcRoundActs();
};

game.calcRoundActs = function () {
  game.roundActs = game.calcActsStats([_.last(game.rounds)]);
};

game.allActs = computed(() => {
  let all = _.cloneDeep(game.acts);
  _.each(game.roundActs, (roleActs, key) => {
    if (all[key]) {
      _.each(all[key], (acts, typeKey) => {
        acts.count += roleActs[typeKey].count;
        acts.selfCount += roleActs[typeKey].selfCount;
      });
    } else {
      all[key] = roleActs;
    }
  });
  return all;
});

game.calcActsStats = function (round) {
  let actsList = _.flatMapDeep(round, (round) => {
    return _.map(round.steps, (step) => {
      return step.acts;
    });
  });
  actsList = _.filter(actsList);
  actsList = _.groupBy(actsList, "user.class");

  actsList = _.mapValues(actsList, (acts) => {
    acts = _.groupBy(acts, "type");
    acts = _.mapValues(acts, (a) => {
      if (a[0]?.user?.class == "khabGard") {
        a = _.filter(a, "sacrifice");
      }
      if (a[0]?.user?.class == "farmande") {
        a = _.filter(a, "confirm");
      }
      if (a[0]?.user?.class == "janSakht") {
        a = _.filter(a, "stats");
      }
      if (a.length) {
        return {
          count: a.length,
          name: a[0].name,
          selfCount: a.filter((x) => x.user == x.target).length,
        };
      }
    });
    return _.omitBy(acts, (a) => {
      return a == undefined;
    });
  });
  // return actsList;
  return _.omitBy(actsList, (a) => {
    return _.values(a).length == 0;
  });
};

function toggleSound(op = "toggle") {
  track.audio.loop = true;
  if (track.paused && (op == "toggle" || op == "play")) {
    track.audio.currentTime = 0;
    track.audio.play();
  } else if (track.paused == false && (op == "toggle" || op == "stop")) {
    track.audio.pause();
  }
  track.paused = { toggle: !track.paused, stop: true, play: false }[op];
}
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
  <div class="sm:p-5 p-2 pb-60 max-w-screen-md mx-auto">
    <div v-if="game.lastRoundNumber == 0 && game.selectedStep.type == 'night'">
      <div class="p-4">
        <h2 class="text-xl font-bold text-red-600">توجه:</h2>
        <p>
          در بعضی از سناریو ها تیم مافیا در شب قبل از معارفه بیدار شده و یک دیگر
          را می‌شناسند. یا نوستراداموس بیدار شده و پیشبینی می‌کند. اگر نمیخواهید
          در شب معارفه کاری انجام شود از این مرحله گذر کنید.
        </p>
      </div>
    </div>

    <!--
				night step
			-->
    <NightStory :game="game" v-if="game.selectedStep?.type == 'night'" />

    <!-- <div v-else-if="game.selectedStep?.type == 'day'">
      <div class="flex flex-col gap-3">
        <template v-for="role in getRoles" :key="role.userId">
          <RoleCard :role="role"> body </RoleCard>
        </template>
      </div>
    </div> -->

    <!-- <div v-else>
      <div class="flex flex-col gap-3">
        <template v-for="role in getRoles" :key="role.userId">
          <RoleCard :role="role"> body </RoleCard>
        </template>
      </div>
    </div> -->

    <div class="h-60"></div>
  </div>

  <Bottom>
    <div class="bg-slate-50 border-t" v-show="timer.open">
      <div class="flex gep-2 justify-around">
        <TimerPart :time="timer.speak" />
        <div class="border-r"></div>
        <TimerPart :time="timer.challenge" />
      </div>
    </div>

    <div class="p-2 border-t flex h-16 gap-2">
      <button
        class="bg-slate-700 text-white shadow-md p-2 w-3/12 rounded-2xl"
        :class="{ '!bg-red-700': !track.paused }"
        @click="toggleSound()"
      >
        <Icon icon="akar-icons:music" class="inline-block w-10 h-full" />
      </button>
      <button
        class="bg-slate-700 text-white shadow-md p-2 w-3/12 rounded-2xl"
        :class="{ '!bg-red-700': timer.open }"
        @click="timer.open = !timer.open"
      >
        <Icon icon="akar-icons:alarm" class="inline-block w-10 h-full" />
      </button>
      <button class="bg-slate-700 text-white shadow-md p-2 w-3/12 rounded-2xl">
        <Icon icon="akar-icons:clipboard" class="inline-block w-10 h-full" />
      </button>
      <button class="bg-slate-700 text-white shadow-md p-2 w-3/12 rounded-2xl">
        <Icon icon="akar-icons:people-group" class="inline-block w-10 h-full" />
      </button>
      <button
        class="bg-slate-700 text-white shadow-md p-2 w-6/12 rounded-2xl"
        @click="nextStep"
      >
        بعدی
        <Icon
          icon="akar-icons:arrow-left-thick"
          class="inline-block w-10 h-full"
        />
      </button>
    </div>
  </Bottom>
</template>
