<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import _ from "lodash";
import draggable from "vuedraggable";

const emit = defineEmits(["close"]);
const userList = ref({});
const file = ref({});

function close() {
  emit("close");
}

const props = defineProps({
  game: Object,
  track: Object,
});

userList.value = _.filter(props.game.selectedRound?.roles, (role) => {
  return role.dead == false && role.getOut == false;
});

function selected(event) {
  let reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  props.track.custom = new Audio();
  reader.addEventListener("load", function () {
    props.track.custom.src = reader.result;
  });
}
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-full z-50 bg-white bg-opacity-70 px-5 py-20 flex items-center"
    @click.self="close()"
  >
    <div
      class="bg-white rounded-md w-full h-64 max-w-xl mx-auto shadow-lg border overflow-y-auto p-3"
    >
      <div class="mb-5">
        <p>
          در این صفحه می‌توانید آهنگ دلخواه خود را انتخاب کنید تا موقع پخش آن
          پخش شود.
        </p>
        <!-- {{ userList }} -->
      </div>
      <div v-if="track.custom === null">
        <input
          type="file"
          accept="audio/mpeg, audio/ogg, audio/wav"
          @change="selected"
        />
      </div>
      <div v-else>
        <button
          class="bg-red-500 text-white rounded-md p-3 w-full"
          @click="track.custom = null"
        >
          حذف آهنگ انتخابی
        </button>
      </div>
    </div>
  </div>
</template>
