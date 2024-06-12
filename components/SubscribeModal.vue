<template>
  <CModal v-model:show="showModal">
    <div class="subscribe">
      <h1 class="subscribe__title">
        You have been visiting our website for 1 second!
      </h1>
      <span class="subscribe__subtitle">
        I guess it's time to subscribe to our updates now, innit?
        Fill out your email below.
      </span>
      <CInput
        v-model:value="state.email"
        :valid="v$.email.$invalid === false"
        :error="v$.email.$errors[0]?.$message"
        label="Email"
      />
      <button
        class="c-button"
        @click="fakeSubscribe"
      >
        Subscribe
      </button>
    </div>
  </CModal>
</template>

<script>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  name: 'SubscribeModal',
  setup() {
    const showModal = ref(false)
    onMounted(() => {
      setTimeout(() => showModal.value = true, 1000)
    })

    const state = reactive({
      email: null,
    })
    const rules = {
      email: { required, email, $autoDirty: true },
    }
    const v$ = useVuelidate(rules, state)

    const fakeSubscribe = async () => {
      if (await v$.value.$validate()) {
        showModal.value = false
      }
    }

    return { state, v$, showModal, fakeSubscribe }
  },
}
</script>

<style lang="scss" scoped>
.subscribe {
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__title {
    line-height: 1.1;
  }
}
</style>
