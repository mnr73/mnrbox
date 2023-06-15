<template>
  <div
    class="mnr-input mnr-text"
    :class="[
      {
        'mnr-hover': hover,
        'mnr-focus': focus,
        'mnr-open-list': openList,
        'mnr-disabled': disabled
      },
      status ? 'mnr-status-' + status : ''
    ]"
  >
    <div v-if="title" class="mnr-title">
      <b>{{ title }}</b>
    </div>
    <div class="mnr-main" :dir="inputDir">
      <div class="mnr-frame" @mouseover="hover = true" @mouseout="hover = false">
        <div class="mnr-box">
          <div v-if="$slots.default" class="mnr-input-icon">
            <slot></slot>
          </div>
          <div v-if="before" class="mnr-input-before">{{ before }}</div>
          <input
            ref="input"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            :value="modelValue"
            @focus="focus = true"
            @blur="hover ? $refs.input.focus() : (focus = false)"
            @input="$emit('update:modelValue', $event.target.value)"
          />
          <div v-if="after" class="mnr-input-after">{{ after }}</div>
          <div v-if="status" class="mnr-status-icon">
            <component :is="'mnr-icon-' + status" />
          </div>
          <div v-if="loading" class="mnr-input-spinner">
            <MnrSpinner />
          </div>
        </div>
        <div v-if="options.length > 0" v-show="openList" class="mnr-options">
          <div
            v-for="option in filtered"
            :key="option"
            class="mnr-option"
            @click="$emit('update:modelValue', option)"
          >
            {{ option }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="msg || hint" class="mnr-hint">
      <span>{{ msg || hint }}</span>
    </div>
  </div>
</template>

<script>
import MnrSpinner from "./MnrSpinner.vue";
import MnrIconError from "./MnrIconError.vue";
import MnrIconAccepted from "./MnrIconAccepted.vue";
import MnrIconWarning from "./MnrIconWarning.vue";

export default {
  components: {
    MnrSpinner,
    MnrIconError,
    MnrIconAccepted,
    MnrIconWarning
  },
  props: {
    modelValue: {
      type: [String, null],
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    hint: {
      type: String,
      default: ""
    },
    msg: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    inputDir: {
      type: String,
      default: ""
    },
    before: {
      type: String,
      default: ""
    },
    after: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      focus: false,
      hover: false
      // filteredOptions: this.options,
    };
  },
  computed: {
    openList() {
      return this.focus && this.options.length > 0;
    },
    filtered() {
      let regex = new RegExp(this.modelValue);
      return this.options.filter((item) => regex.test(item) && item != this.modelValue);
    }
  }
};
</script>

<style lang="scss">
.mnr-input {
  &.mnr-text {
    input {
      font-family: inherit;
      font-size: 1.1em;
      border: none;
      background-color: rgba(0, 0, 0, 0);
    }
    &.mnr-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    .mnr-main {
      height: 2.9rem;
      position: relative;
    }
    .mnr-frame {
      height: 100%;
      border-style: solid;
      border-width: 1px;
      border-radius: 5px;
      background-color: #fbfbfb;
      border-color: #dddddd;
      color: #666;
      overflow: hidden;
    }
    &.mnr-hover:not(.mnr-disabled, .mnr-focus) .mnr-frame {
      border-color: #4fc3f7;
    }
    &.mnr-focus .mnr-frame {
      border-color: #039be5;
      box-shadow: 0 0 0 3px rgba(#039be5, 0.2);
    }
    &.mnr-open-list .mnr-frame {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 70;
      height: auto;
      width: 100%;
    }
    .mnr-box {
      display: flex;
      height: 2.9rem;

      input {
        height: 100%;
        display: block;
        width: 100%;
        padding: 0 10px;
        cursor: unset;
        outline: none;
        color: inherit;
        min-width: 1px;
        flex-shrink: 100;
        &::placeholder {
          color: #aaaaaa;
          opacity: 1;
        }
      }
      .mnr-input-before,
      .mnr-input-after {
        white-space: nowrap;
        display: flex;
        height: 100%;
        padding: 0.5em;
        color: #666;
        align-items: center;
        &.mnr-input-before {
          padding-inline-end: 0;
        }
        &.mnr-input-after {
          padding-inline-start: 0;
        }
      }
      .mnr-input-icon,
      .mnr-input-spinner,
      .mnr-status-icon {
        display: flex;
        height: 100%;
        padding: 0.5em;
        color: #666;
        width: 2.2em;
        &.mnr-input-icon {
          padding-inline-end: 0;
        }
        &.mnr-status-icon {
          padding: 0.2em 0;
          color: inherit;
        }
        &.mnr-input-spinner {
          padding: 0.7em;
          padding-inline-start: 0;
        }
        svg {
          fill: currentColor;
        }
      }
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
      .mnr-box,
      .mnr-hint {
        color: #2e7d32;
      }
      .mnr-box {
        background-color: #e8f5e9;
      }
    }
    &.mnr-status-warning {
      .mnr-box,
      .mnr-hint {
        color: #e65100;
      }
      .mnr-box {
        background-color: #fff8e1;
      }
    }
    &.mnr-status-error {
      .mnr-box,
      .mnr-hint {
        color: #c62828;
      }
      .mnr-box {
        background-color: #ffebee;
      }
    }
  }
}
</style>
