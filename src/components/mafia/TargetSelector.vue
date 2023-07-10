<script setup>
import { Icon } from "@iconify/vue";
import { computed, onMounted, ref } from "vue";
import _ from "lodash";

const selectedUsers = ref([]);
// const userActs = ref();
const text = ref();
const bool = ref();
const sniperShot = ref();

const props = defineProps({
  selector: Object,
  list: Array,
  step: Object,
});

if (props.selector.role.class == "farmande") {
  sniperShot.value = _.find(props.step.acts, ["type", "sniper_shot"]);
}

const userActs = computed(() => {
  return _.filter(props.step.acts, ["user", props.selector.role]);
});

onMounted(function () {
  selectedUsers.value = _.map(
    _.filter(props.step.acts, {
      user: props.selector.role,
      type: props.selector.act.type,
    }),
    "target"
  );
  if (props.selector.act.type == "charm") {
    text.value = _.find(props.step.acts, "word")?.word;
  }
  if (props.selector.act.type == "bomb") {
    text.value = _.find(props.step.acts, "bombAct")?.bombAct;
  }
  if (props.selector.act.type == "guess_role") {
    bool.value = _.find(props.step.acts, "guess")?.guess;
  }
  // userActs.value = _.filter(props.step.acts, ["user", props.selector.role]);
});

function select(user) {
  let removedUser = _.remove(selectedUsers.value, (u) => u == user);
  if (props.selector.limit === 1 && removedUser == 0) {
    selectedUsers.value = [];
  }
  if (removedUser.length == 0) {
    if (selectedUsers.value.length < props.selector.limit) {
      selectedUsers.value.push(user);
    }
  }
  _.remove(props.step.acts, {
    user: props.selector.role,
    type: props.selector.act.type,
  });
  _.each(selectedUsers.value, (u) => {
    let value = {
      user: props.selector.role,
      target: u,
      type: props.selector.act.type,
    };
    if (props.selector.act.type == "charm") {
      value.word = text.value;
    }
    if (props.selector.act.type == "bomb") {
      value.bombAct = text.value;
    }
    if (props.selector.act.type == "guess_role") {
      value.guess = bool.value;
    }
    props.step.acts.push(value);
  });
}

function setText() {
  if (props.selector.role.class == "afsoongar" && userActs.value?.[0]) {
    userActs.value[0].word = text.value;
  }
  if (props.selector.role.class == "bomber" && userActs.value?.[0]) {
    userActs.value[0].bombAct = text.value;
  }
}

function setBool() {
  if (props.selector.role.class == "nato" && userActs.value?.[0]) {
    userActs.value[0].guess = bool.value;
  }
}

function khabGardAct(act) {
  _.remove(props.step.acts, ["user", props.selector.role]);
  let value = {
    user: props.selector.role,
    type: props.selector.act.type,
    sacrifice: act,
  };
  props.step.acts.push(value);
  // userActs.value = _.filter(props.step.acts, ["user", props.selector.role]);
}

function farmandeAct(act) {
  _.remove(props.step.acts, ["user", props.selector.role]);
  let value = {
    user: props.selector.role,
    type: props.selector.act.type,
    confirm: act,
  };
  props.step.acts.push(value);
}

function janSakhtAct(act) {
  _.remove(props.step.acts, ["user", props.selector.role]);
  let value = {
    user: props.selector.role,
    type: props.selector.act.type,
    stats: act,
  };
  props.step.acts.push(value);
}
// const emit = defineEmits(["selectedList"]);
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-full z-50 bg-white bg-opacity-70 px-5 py-20"
    @click.self="selector.open = false"
  >
    <div
      class="bg-white rounded-md w-full h-full max-w-xl max-h-fit mx-auto shadow-lg border flex flex-col"
    >
      <div class="p-2 bg-slate-100 rounded-t-md text-center">
        <div>
          {{ selector.role.userName }}
          <span class="text-slate-400 font-thin"
            ><Icon :icon="selector.role.icon" class="inline-block h-full w-6" />
            {{ selector.role.roleName }}</span
          >
        </div>
      </div>
      <div class="flex justify-between p-2 border-b rounded-t-md">
        <div>{{ props.selector.act.name }}</div>
        <div>
          {{ selectedUsers.length }} از {{ props.selector.limit }} انتخاب
        </div>
      </div>
      <div class="p-2" v-if="props.selector.act.type == 'charm'">
        <input
          type="text"
          class="w-full border text-xl p-1"
          placeholder="کلمه را وارد کنید"
          v-model="text"
          @input="setText"
        />
      </div>
      <div class="p-2" v-if="props.selector.act.type == 'bomb'">
        <input
          type="text"
          class="w-full border text-xl p-1"
          placeholder="اکت بمبر را وارد کنید"
          v-model="text"
          @input="setText"
        />
      </div>
      <label
        class="p-2 block text-2xl"
        v-if="props.selector.act.type == 'guess_role'"
      >
        <input type="checkbox" v-model="bool" @change="setBool" /> نقش را درست
        حدس زد؟
        <span>{{ bool ? "بله" : "خیر" }}</span>
      </label>
      <div
        v-if="selector.role.class == 'khabGard'"
        class="p-2 flex flex-col gap-2"
      >
        <div
          class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
          @click="khabGardAct(true)"
          :class="{
            'border-sky-500': userActs?.[0]?.sacrifice === true,
          }"
        >
          <div class="text-lg">
            <div>خودم را فدای شهر می‌کنم 👍</div>
            <div class="text-sm text-slate-400">
              در این صورت مافیا در شب بیدار نمی‌شود
            </div>
          </div>
        </div>
        <div
          class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
          @click="khabGardAct(false)"
          :class="{
            'border-sky-500': userActs?.[0]?.sacrifice === false,
          }"
        >
          <div class="text-lg">
            <div>خودم را فدای شهر نمیکنم 👎</div>
            <div class="text-sm text-slate-400">
              در این صورت مافیا در شب بیدار می‌شود
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="selector.role.class == 'farmande'"
        class="p-2 flex flex-col gap-2"
      >
        <div v-if="sniperShot">
          تارگت اسنایپر : {{ sniperShot.target.userName }}
        </div>
        <div v-else>اسنایپر هیچ کس رو نزده :)</div>
        <template v-if="sniperShot">
          <div
            class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
            :class="{
              'border-sky-500': userActs?.[0]?.confirm === true,
            }"
            @click="farmandeAct(true)"
          >
            <div class="text-lg">
              <div>شات اسنایپر را تایید میکنم 👍</div>
            </div>
          </div>
          <div
            class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
            :class="{
              'border-sky-500': userActs?.[0]?.confirm === false,
            }"
            @click="farmandeAct(false)"
          >
            <div class="text-lg">
              <div>شات اسنایپر را تایید نمی‌کنم 👎</div>
            </div>
          </div>
        </template>
      </div>
      <div
        v-else-if="selector.role.class == 'janSakht'"
        class="p-2 flex flex-col gap-2"
      >
        <div class="text-xl p-2">آیا استعلام میخواهی؟</div>
        <div
          class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
          :class="{
            'border-sky-500': userActs?.[0]?.stats === true,
          }"
          @click="janSakhtAct(true)"
        >
          <div class="text-lg">
            <div>استعلام میخواهم 👍</div>
          </div>
        </div>
        <div
          class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
          :class="{
            'border-sky-500': userActs?.[0]?.stats === false,
          }"
          @click="janSakhtAct(false)"
        >
          <div class="text-lg">
            <div>استعلام نمیخواهم 👎</div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 p-2 overflow-y-auto" v-else>
        <div
          class="bg-white p-3 rounded-md border border-t-4 flex-grow text-center cursor-pointer h-fit"
          v-for="(role, index) in props.list"
          :key="role.userId"
          @click="select(role)"
          :class="{
            'border-sky-500': selectedUsers.find((user) => user == role),
          }"
        >
          <div class="text-lg">
            <div>{{ role.userName }}</div>
            <div class="text-sm text-slate-400">
              <Icon :icon="role.icon" class="inline-block h-full w-5 me-1" />{{
                role.roleName
              }}
            </div>
          </div>
        </div>
      </div>
      <button
        class="mt-auto bg-red-500 text-white p-1 rounded-md"
        @click="selector.open = false"
      >
        بستن
      </button>
    </div>
  </div>
</template>
