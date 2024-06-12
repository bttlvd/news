<template>
  <div class="c-input-wrapper">
    <label
      class="c-input"
      :class="{
        'c-input--active': !!proxyValue,
        'c-input--error': !!error,
        'c-input--valid': valid,
      }"
    >
      <span class="c-input__label c-text-ellipsis">
        {{ label }}
      </span>
      <input
        v-model="proxyValue"
        :type="type"
        class="c-input__input"
      >
    </label>
    <span class="c-input-wrapper__label-error c-text-ellipsis">
      {{ error }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'CInput',
  props: {
    value: {
      type: [String, null],
      default: null,
    },
    label: {
      type: [String, null],
      default: null,
    },
    type: {
      type: String,
      default: 'text',
      validator: (v) => ['text', 'password'].includes(v),
    },
    valid: {
      type: Boolean,
      default: false,
    },
    error: {
      type: [String, null],
      default: null,
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const proxyValue = computed({
      get: () => props.value,
      set: (v) => emit('update:value', v),
    })

    return {
      proxyValue,
    }
  },
}
</script>

<style lang="scss" scoped>
.c-input {
  --color-input-background: var(--color-white-mute);
  --color-input-border: var(--color-border-mute);
  --color-input-text: var(--color-text-mute);

  display: block;
  background: var(--color-input-background);
  border: 1px solid var(--color-input-border);
  color: var(--color-input-text);
  border-radius: 4px;
  padding: 4px;
  position: relative;

  &__input {
    width: 100%;
    margin: 0;
    display: block;
    border: 0;
    outline: 0;
    font-size: inherit;
    background: transparent;
  }

  &__label {
    top: 2px;
    display: inline-block;
    position: absolute;
    color: var(--input-color-text);
    transition: 0.15s;
    border-radius: 2px;
  }

  &:focus-within,
  &.c-input--active {
    .c-input__label {
      padding: 0 4px;
      top: -6px;
      font-size: 8px;
      background: var(--color-input-background);

      &::after {
        content: '';
        display: block;
        position: absolute;
        inset: 0 0 50%;
        border: 1px solid var(--color-input-border);
        border-bottom: 0;
        border-radius: 4px 4px 0 0;
        animation: 0.15s fade reverse forwards;
      }
    }
  }

  &--valid {
    --color-input-background: var(--color-success-mute);
    --color-input-border: var(--color-success);
    --color-input-text: var(--color-success);
  }

  &--error {
    --color-input-background: var(--color-error-mute);
    --color-input-border: var(--color-error);
    --color-input-text: var(--color-error);
  }

  &-wrapper {
    &__label-error {
      font-size: 12px;
      line-height: 1;
      margin-top: 4px;
      color: var(--color-error);
    }
  }
}
</style>
