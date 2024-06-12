<template>
  <article
    :class="{ 'news-item': true, 'news-item--card-view': isCardMode }"
  >
    <div
      v-if="data.urlToImage"
      class="news-item__image-container"
    >
      <img
        :src="data.urlToImage"
        class="news-item__image"
        @onload="isImageLoading = false"
      >
      <div
        v-if="isImageLoading"
        class="news-item__image-loader"
      />
    </div>
    <h2 class="news-item__title">
      {{ data.title }}
    </h2>
    <p class="news-item__description">
      {{ isCardMode ? data.description : data.content }}
    </p>
    <div class="news-item__footer">
      <NuxtLink
        v-if="isCardMode"
        :to="{ name: 'news-id', params: { id: data.uid } }"
        class="c-link--base"
      >
        Read more...
      </NuxtLink>
      <p
        v-else-if="data.author"
        class="news-item__author"
      >
        {{ data.author }}
      </p>
      <p class="news-item__published-at">
        {{ getPublishedAt }}
      </p>
    </div>
  </article>
</template>

<script>
import moment from 'moment'

export default {
  name: 'NewsPost',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    mode: {
      type: String,
      default: 'card',
      validator: (v) => ['card', 'page'].includes(v),
    },
  },
  setup(props) {
    const getPublishedAt = computed(
      () => props.data.publishedAt
        ? moment(props.data.publishedAt).format('MMMM Do YYYY, HH:mm:ss')
        : undefined,
    )

    const isCardMode = computed(() => props.mode === 'card')

    const isImageLoading = ref(false)

    return {
      isCardMode,
      isImageLoading,
      getPublishedAt,
    }
  },
}
</script>

<style lang="scss" scoped>
.news-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px 0;
  position: relative;

  &--card-view {
    border-bottom: 1px solid var(--color-border-mute);
  }

  &__image {
    display: block;
    height: 380px;
    width: 100%;
    object-fit: cover;

    &-container {
      position: relative;
      margin-bottom: 8px;
    }

    &-loader {
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      display: block;
      content: '';
      animation: loading 0.75s infinite alternate ease-in-out;
    }
  }

  &__title {
    font-weight: 500;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-indigo);
  }
}
</style>
