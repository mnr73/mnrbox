<template>
  <div
    class="mnr-input mnr-textarea"
    :class="[
      {
        'mnr-hover': hover,
        'mnr-focus': focus,
        'mnr-disabled': disabled,
      },
      status ? 'mnr-status-' + status : '',
    ]"
  >
    <div class="mnr-title" v-if="title">
      <b>{{ title }}</b>
    </div>
    <div class="mnr-main" @mouseover="hover = true" @mouseout="hover = false">
      <textarea
        name=""
        @focus="focus = true"
        @blur="focus = false"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue"
      ></textarea>
    </div>
    <div class="mnr-hint" v-if="msg || hint">
      <span>{{ msg || hint }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, null],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    hint: {
      type: String,
      default: "",
    },
    msg: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "",
    },
    inputDir: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      hover: false,
      focus: false,
    };
  },
};
</script>

<style lang="scss">
.mnr-input {
  &.mnr-textarea {
    &.mnr-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    .mnr-main {
      border-style: solid;
      border-width: 1px;
      border-radius: 5px;
      background-color: #fbfbfb;
      border-color: #dddddd;
      color: #666;
      overflow: hidden;

      textarea {
        max-width: 100%;
        min-width: 100%;
        min-height: 4.9em;
        height: 6.9em;
        display: block;
        width: 100%;
        padding: 10px;
        cursor: unset;
        outline: none;
        color: inherit;
        // min-width: 1px;
        flex-shrink: 100;
        font-family: inherit;
        font-size: 1.1em;
        border: none;
        background-color: rgba(0, 0, 0, 0);
        &::placeholder {
          color: #aaaaaa;
          opacity: 1;
        }
      }
    }
    &.mnr-hover:not(.mnr-disabled, .mnr-focus) .mnr-main {
      border-color: #4fc3f7;
    }
    &.mnr-focus .mnr-main {
      border-color: #039be5;
      box-shadow: 0 0 0 3px rgba(#039be5, 0.2);
    }
    .mnr-title {
      color: #555;
      font-size: 1.2em;
      margin-bottom: 6px;
    }
    .mnr-hint {
      color: #666;
      font-size: 0.9em;
      margin-top: 6px;
    }
    &.mnr-status-accepted {
      .mnr-main,
      .mnr-hint {
        color: #2e7d32;
      }
      .mnr-main {
        background-color: #e8f5e9;
      }
    }
    &.mnr-status-warning {
      .mnr-main,
      .mnr-hint {
        color: #e65100;
      }
      .mnr-main {
        background-color: #fff8e1;
      }
    }
    &.mnr-status-error {
      .mnr-main,
      .mnr-hint {
        color: #c62828;
      }
      .mnr-main {
        background-color: #ffebee;
      }
    }
  }
}
</style>
