// eslint-disable-next-line no-undef
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  // eslint-disable-next-line no-undef
  const query = await getQuery(event)

  const response = await $fetch('https://newsapi.org/v2/everything', {
    method: 'get',
    query,
    headers: {
      Authorization: config.API_NEWS_KEY,
    },
  })

  return response
})
