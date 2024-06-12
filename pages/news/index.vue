<template>
  <div>
    <header class="news-page__header">
      <h1 class="news-page__title">
        News List
      </h1>
      <CInput
        v-model:value="search"
        label="Type to search..."
      />
    </header>
    <div
      v-if="!error"
      class="news-page__list"
    >
      <!--
        There would be a Virtual Scroller, but there is an API limit of 100 entries
        Therefore i have considered using VS unnecessary. But i know about this feature!
       -->
      <NewsPost
        v-for="item in newsList"
        :key="item.uid"
        :data="item"
      />
      <template v-if="newsList.length">
        <Trigger
          v-if="!isLastPage"
          @intersection-triggered="loadNextPage"
        />
        <p
          v-else
          class="news-page__end"
        >
          That's all!
        </p>
      </template>
    </div>
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
import { computed, ref, watch } from 'vue'
import { debounce } from 'lodash'
import { utf8Encode } from 'string-encode'

export default {
  name: 'NewsPage',
  async setup() {
    const newsList = ref([])
    const error = ref(null)
    const search = ref(null)
    const page = ref(1)
    const perPage = 20
    const isLastPage = ref(false)

    const clearNewsList = () => {
      page.value = 1
      error.value = null
      isLastPage.value = false
      newsList.value = []
    }

    /**
     * Data fetching section
     */

    const apiPath = '/api/everything'
    const computedQuery = computed(() => (
      {
        pageSize: perPage,
        page: page.value,
        q: search.value,
        excludeDomains: ['removed.com'],
      }
    ))

    const { refresh, pending } = await useFetch(
      apiPath,
      {
        query: computedQuery,
        dedupe: 'defer',
        watch: false,
        immediate: false,
        onResponse({ response }) {
          /**
           * can't use @onResponseError due to a known issue with not working handler :/
           */
          if (response.ok === false) {
            if (response.status === 426) {
              isLastPage.value = true
            } else {
              clearNewsList()
              error.value = response._data.message ?? 'Unknown error. See console.'
            }
            return
          }

          const preparedResponse = response._data.articles
            .map((v) => ({ ...v, uid: btoa(utf8Encode(`${v.title}___${v.publishedAt}`)) }))
          if (response._data.articles.length < 10) {
            isLastPage.value = true
          }
          newsList.value.push(...preparedResponse)
        },
      },
    )

    const debouncedRefreshOnSearch = debounce(() => {
      clearNewsList()
      if (search.value) {
        refresh()
      }
    }, 500)

    watch(search, debouncedRefreshOnSearch)

    watch(page, (val, oldVal) => {
      if (val > oldVal) refresh()
    })

    const loadNextPage = () => {
      if (!pending.value) {
        page.value++
      }
    }

    return {
      newsList,
      search,
      loadNextPage,
      isLastPage,
      error,
    }
  },
}
</script>

<style lang="scss" scoped>
.news-page {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
