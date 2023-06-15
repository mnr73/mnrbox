<template>
  <div
    class="mnr-input mnr-text"
    :class="[
      {
        'mnr-hover': hover,
        'mnr-focus': focus,
        'mnr-disabled': disabled,
        'mnr-large-dot': modelValue && !show,
      },
      status ? 'mnr-status-' + status : '',
    ]"
  >
    <div class="mnr-title" v-if="title">
      <b>{{ title }}</b>
    </div>
    <div class="mnr-main" :dir="inputDir">
      <div class="mnr-frame" @mouseover="hover = true" @mouseout="hover = false">
        <div class="mnr-box">
          <div class="mnr-input-icon" v-if="$slots.default">
            <slot></slot>
          </div>
          <input
            ref="input"
            :type="show ? 'text' : 'password'"
            :placeholder="placeholder"
            @focus="focus = true"
            @blur="focus = false"
            :disabled="disabled"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
          />
          <div class="mnr-show-icon" @click="show = !show">
            <svg viewBox="0 0 100 100">
              <path
                v-if="show"
                d="M87.23 51.48c-8.52,17.36 -22.36,27.54 -37.23,27.54 -3.51,0 -6.98,-0.56 -10.33,-1.66 -1.76,-0.58 -3.68,0.36 -4.27,2.1 -0.59,1.74 0.37,3.62 2.14,4.2 4.04,1.33 8.22,2 12.46,2 18.6,0 35.38,-13.03 44.72,-34.34 0.37,-0.84 0.37,-1.8 0,-2.64 -2.39,-5.44 -5.24,-10.34 -8.51,-14.61 -1.12,-1.46 -3.24,-1.76 -4.72,-0.66 -1.49,1.11 -1.79,3.19 -0.67,4.66l1.08 1.46c2.14,2.99 4.08,6.32 5.79,9.95l0.24 0.53 -0.7 1.47zm-26.58 0.42c-0.79,4.35 -4.28,7.79 -8.7,8.58 -1.83,0.33 -3.05,2.06 -2.71,3.86 0.33,1.8 2.08,3 3.92,2.68 7.19,-1.29 12.84,-6.86 14.14,-13.94 0.32,-1.81 -0.89,-3.53 -2.73,-3.86l-0.46 -0.05c-1.66,-0.07 -3.16,1.08 -3.46,2.73zm-10.65 -19.24c-9.75,0 -17.61,7.75 -17.61,17.34 0,3.53 1.06,6.86 3,9.68l-9.62 9.47c-5.33,-4.73 -9.93,-11.07 -13.5,-18.7l-0.2 -0.44 0.21 -0.46c4.1,-8.73 9.54,-15.79 15.88,-20.7 6.63,-5.16 14.15,-7.87 21.84,-7.87 6.55,0 12.97,1.98 18.85,5.77l-9.01 8.87c-2.85,-1.9 -6.27,-2.96 -9.84,-2.96zm0 -18.32c-9.26,0 -18.24,3.24 -26.02,9.3 -7.68,5.95 -14.09,14.53 -18.7,25.05 -0.37,0.83 -0.37,1.78 0,2.62 3.98,9.14 9.33,16.8 15.72,22.54l-8.88 8.73 -0.32 0.37c-0.98,1.3 -0.87,3.15 0.32,4.33 1.32,1.29 3.46,1.29 4.78,0l70.98 -69.86 0.33 -0.37c0.98,-1.3 0.87,-3.15 -0.33,-4.33 -1.32,-1.29 -3.46,-1.29 -4.77,0l-9.4 9.25c-7.26,-4.99 -15.36,-7.63 -23.71,-7.63zm4.92 26.12l-14.61 14.38c-0.76,-1.47 -1.17,-3.11 -1.17,-4.84 0,-5.92 4.84,-10.69 10.86,-10.69 1.75,0 3.43,0.4 4.92,1.15z"
              />
              <path
                v-else
                d="M50 39.22c5.99,0 10.85,4.82 10.85,10.78 0,5.95 -4.86,10.78 -10.85,10.78 -6,0 -10.85,-4.83 -10.85,-10.78 0,-5.96 4.85,-10.78 10.85,-10.78zm17.6 10.78c0,-9.66 -7.88,-17.49 -17.6,-17.49 -9.72,0 -17.6,7.83 -17.6,17.49 0,9.66 7.88,17.49 17.6,17.49 9.72,0 17.6,-7.83 17.6,-17.49zm-15.28 -29.21c14.39,1.02 27.62,11.68 35.61,29.21l-0.04 0.1c-8.2,17.9 -21.88,28.63 -36.73,29.17l-1.14 0.02 -1.16 -0.01 -1.2 -0.07c-13.94,-0.99 -26.79,-11.06 -34.83,-27.59l-0.76 -1.62 0.7 -1.5c8.48,-17.52 22.34,-27.8 37.27,-27.8l1.08 0.02 1.2 0.07zm-3.62 65.19l1.29 0.02c18.63,0 35.43,-13.15 44.74,-34.68 0.37,-0.85 0.36,-1.82 -0.02,-2.67l-0.62 -1.42c-9.22,-20.18 -25.1,-32.62 -42.79,-33.21l-1.29 -0.02c-18.63,0 -35.43,13.15 -44.74,34.68 -0.36,0.84 -0.36,1.8 0,2.64l0.65 1.46c9.19,20.14 25.07,32.61 42.78,33.2z"
              />
            </svg>
          </div>
          <div class="mnr-status-icon" v-if="status">
            <component :is="'mnr-icon-' + status" />
          </div>
        </div>
      </div>
    </div>
    <div class="mnr-hint" v-if="msg || hint">
      <span>{{ msg || hint }}</span>
    </div>
  </div>
</template>

<script>
import MnrIconError from "./MnrIconError.vue";
import MnrIconAccepted from "./MnrIconAccepted.vue";
import MnrIconWarning from "./MnrIconWarning.vue";

export default {
  components: {
    MnrIconError,
    MnrIconAccepted,
    MnrIconWarning,
  },
  props: {
    modelValue: {
      type: String,
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
      focus: false,
      hover: false,
      show: false,
    };
  },
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
    &.mnr-large-dot {
      .mnr-box input {
        font-size: 50px;
        padding-top: 10px;
      }
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
      .mnr-show-icon,
      .mnr-input-icon,
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
        svg {
          fill: currentColor;
        }
        &.mnr-show-icon {
          cursor: pointer;
          padding: 0.3em;
          color: inherit;
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
