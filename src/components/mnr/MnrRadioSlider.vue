<template>
  <label
    class="mnr-input mnr-radio-slider"
    :class="[
      {
        'mnr-checked': isChecked,
        'mnr-focus': focus,
        'mnr-disabled': disabled,
      },
      status ? 'mnr-status-' + status : '',
    ]"
  >
    <input
      ref="input"
      type="radio"
      :checked="isChecked"
      :value="value"
      @input="onInput"
      @focus="focus = true"
      @blur="focus = false"
      :disabled="disabled || loading"
      :name="name"
    />
    <span class="mnr-frame">
      <span class="mnr-key"></span>
    </span>
    <span class="mnr-input-spinner" v-if="loading">
      <MnrSpinner />
    </span>
    <span class="mnr-text"><slot></slot></span>
  </label>
</template>

<script>
import MnrSpinner from "./MnrSpinner.vue";

export default {
  components: {
    MnrSpinner,
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    value: null,
    name: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      focus: false,
    };
  },
  computed: {
    isChecked() {
      return this.modelValue == this.value;
    },
  },
  methods: {
    onInput(e) {
      if (e.target.checked) {
        this.$emit("update:modelValue", e.target.value);
      }
    },
  },
};
</script>

<style lang="scss">
.mnr-input {
  &.mnr-radio-slider {
    display: inline-flex;
    align-items: center;
    height: 2.9rem;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    // background-color: red;
    &.mnr-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    .mnr-frame {
      width: 2.7em;
      height: 1.5em;
      border-radius: 1000px;
      border-style: solid;
      border-width: 0.15em;
      border-color: #dddddd;
      background-color: #fbfbfb;
      display: block;
      position: relative;
    }
    .mnr-key {
      height: 1.5em;
      width: 1.5em;
      position: absolute;
      top: -0.15em;
      left: -0.15em;
      border-radius: 1000px;
      background-color: #aaaaaa;
      transition: left 0.3s;
      padding: 0.5em;
      &::before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background-color: #fbfbfb;
        border-radius: 1000px;
      }
    }
    &.mnr-checked {
      .mnr-frame {
        background-color: #e1f5fe;
      }
      .mnr-key {
        left: calc(1.2em - 0.15em);
        background-color: #4fc3f7;
        box-shadow: 0 0 0 0.25em rgba(#4fc3f7, 0.5);
      }
      &.mnr-status-accepted {
        .mnr-frame {
          background-color: #e8f5e9;
        }
        .mnr-key {
          background-color: #4caf50;
          box-shadow: 0 0 0 0.25em rgba(#4caf50, 0.5);
          &::before {
            background-color: #e8f5e9;
          }
        }
      }
      &.mnr-status-warning {
        .mnr-frame {
          background-color: #fff8e1;
        }
        .mnr-key {
          background-color: #ffc107;
          box-shadow: 0 0 0 0.25em rgba(#ffc107, 0.5);
          &::before {
            background-color: #fff8e1;
          }
        }
      }
      &.mnr-status-error {
        .mnr-frame {
          background-color: #ffebee;
        }
        .mnr-key {
          background-color: #f44336;
          box-shadow: 0 0 0 0.25em rgba(#f44336, 0.5);
          &::before {
            background-color: #ffebee;
          }
        }
      }
    }
    &:hover:not(.mnr-disabled, .mnr-checked),
    &.mnr-focus:not(.mnr-disabled, .mnr-checked) {
      .mnr-key {
        box-shadow: 0 0 0 0.25em rgba(#aaa, 0.5);
      }
    }
    .mnr-text {
      margin: 0 10px;
    }
    .mnr-input-spinner {
      display: flex;
      height: 100%;
      padding: 0.5em;
      color: #666;
      width: 2.2em;
      &.mnr-input-spinner {
        padding: 0 0.7em;
        padding-inline-end: 0;
      }
      svg {
        fill: currentColor;
      }
    }
  }
}
</style>
