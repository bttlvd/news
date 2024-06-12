<template>
  <span ref="triggerRef" />
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'Trigger',
  emits: ['intersection-triggered'],
  setup(_, { emit }) {
    const observer = ref(null)
    const triggerRef = ref(null)

    onMounted(() => {
      observer.value = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          emit('intersection-triggered')
        }
      },
      {
        root: null,
        threshold: 1,
      })

      observer.value.observe(triggerRef.value)
    })
    onBeforeUnmount(() => observer.value.disconnect())

    return {
      triggerRef,
    }
  },
}
</script>
