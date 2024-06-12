<template>
  <header class="header">
    <div class="header-container">
      <nav class="header-links">
        <NuxtLink
          v-for="link in headerLinks"
          :key="link.to"
          :to="link.to"
          exact-active-class="c-link--active"
          class="header-links__link c-link--base"
        >
          {{ link.title }}
        </NuxtLink>
      </nav>
      <NuxtLink
        class="header-container__profile c-link--base"
        exact-active-class="c-link--active"
        to="/login"
      >
        <span class="header-container__profile-caption">
          Account
        </span>
        <img
          class="header-container__profile-icon"
          src="../assets/images/icons/account.png"
        >
      </NuxtLink>
    </div>
  </header>
</template>

<script>
const headerLinks = [
  {
    title: 'News',
    to: '/news',
  },
]
export default {
  name: 'PageHeader',
  setup() {
    return {
      headerLinks,
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  height: 76px;
  background: var(--color-background-mute);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  flex-shrink: 0;

  &-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px var(--container-padding);
    max-width: var(--container-width);

    &__profile {
      display: flex;
      align-items: center;
      gap: 8px;

      &-icon {
        width: 24px;
        height: 24px;
        display: block;
      }
    }
  }

  &-links {
    display: flex;
    gap: 12px;
  }
}
</style>
