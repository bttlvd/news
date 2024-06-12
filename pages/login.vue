<template>
  <div class="login">
    <div class="login-block">
      <h2 class="login-block__title">
        Login to continue
      </h2>
      <CInput
        v-model:value="state.email"
        label="Email"
        :valid="isFormValid"
        :error="v$.email.$errors[0]?.$message"
      />
      <CInput
        v-model:value="state.password"
        label="Password"
        type="password"
        :valid="isFormValid"
        :error="v$.password.$errors[0]?.$message"
      />
      <button
        class="c-button"
        @click="checkFormValidity"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'LoginPage',
  setup() {
    const state = reactive({
      email: null,
      password: null,
    })
    const rules = {
      password: { required },
      email: { required },
    }
    const v$ = useVuelidate(rules, state)

    const isFormValid = ref(false)
    watch(state, () => isFormValid.value = false)

    const checkFormValidity = async () => {
      if (await v$.value.$validate()) {
        isFormValid.value = true
        setTimeout(() => isFormValid.value = false, 5000)
      }
    }

    return { state, v$, isFormValid, checkFormValidity }
  },
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &-block {
    background: var(--color-white);
    width: 100%;
    max-width: 400px;
    padding: var(--container-padding);
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__title {
      line-height: 1;
      margin-bottom: 8px;
    }
  }
}
</style>
