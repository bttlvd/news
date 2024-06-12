<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <SubscribeModal />
    </NuxtLayout>
  </div>
</template>

<script>
export default {
  name: 'App',
  setup() {
    useHead({
      title: 'News App',
      meta: [
        { name: 'description', content: 'Open News API-based news site.' },
      ],
    })
  },
}
</script>
