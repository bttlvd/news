<template>
  <div class="default-layout">
    <PageHeader />
    <main class="main p-container">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  height: 100dvh;
  width: 100%;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;

  .main {
    padding: var(--container-padding);
    width: 100%;
    flex: 1;
    height: 200vh;
  }
}
</style>
