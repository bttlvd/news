<template>
  <div
    v-if="show"
    class="modal-overlay"
    @mousedown="registerGestureStart('overlay')"
    @mouseup="registerGestureEnd('overlay')"
  >
    <div
      class="modal-content"
      @mousedown.stop="registerGestureStart('modal')"
      @mouseup.stop="registerGestureEnd('modal')"
    >
      <slot />
    </div>
  </div>
</template>

<script>
/**
 * Can be teleported, but in that case i consider static as ok
 */

export default {
  name: 'CModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:show'],
  setup(_, { emit }) {
    const gestureStartPlace = ref(null)

    const registerGestureStart = (p) => gestureStartPlace.value = p
    const registerGestureEnd = (p) => {
      if (p === 'overlay' && p === gestureStartPlace.value) {
        emit('update:show', false)
      }
    }

    return {
      registerGestureStart,
      registerGestureEnd,
    }
  },
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  z-index: 3;
  position: fixed;
  inset: 0;
  background: var(--color-overlay);
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-content {
    padding: var(--container-padding);
    background: var(--color-background);
    border-radius: var(--container-padding);
    max-width: 90vw;
    max-height: 90dvh;
  }
}
</style>
