<template>
  <div>
    <NewsPost
      v-if="!error"
      :data="data"
      mode="page"
    />
    <div
      v-else
      class="news-page__error c-error-page"
    >
      <h1>Error!</h1>
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import moment from 'moment'
import { utf8Decode } from 'string-encode'

export default {
  name: 'PostPage',
  async setup() {
    const nuxtApp = useNuxtApp()
    const error = ref(null)

    const route = useRoute()

    const selectedArticle = ref(null)

    const id = route.params.id
    try {
      const [title, publishedAt] = utf8Decode(atob(id)).split('___')

      const apiPath = '/api/everything'
      const query = {
        pageSize: 1,
        page: 1,
        q: `"${title.replaceAll('"', '""')}"`,
        searchIn: ['title'],
        from: moment(publishedAt).subtract(1, 'ms').toISOString(),
        to: moment(publishedAt).add(1, 'ms').toISOString(),
      }

      const { data } = await useFetch(
        apiPath,
        {
          query,
          immediate: true,
        },
      )

      selectedArticle.value = data.value?.articles?.[0]

      nuxtApp.runWithContext(() => useSeoMeta({
        articleAuthor: selectedArticle.value.author,
        articlePublishedTime: selectedArticle.value.publishedAt,
        title: `News | ${selectedArticle.value.title}`,
        ogTitle: `Take a look what i've found! ${selectedArticle.value.title}`,
        description: selectedArticle.value.description,
        ogImage: selectedArticle.value.urlToImage,
        robots: 'index',
      }))
    } catch (e) {
      console.error(e)
      error.value = e?._data?.message ?? 'Unknown error. See console.'
    }

    return {
      data: selectedArticle.value,
      error,
    }
  },
}
</script>
