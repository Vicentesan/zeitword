import { defineStore } from "pinia"
import { computed, ref } from "vue"
import type { sites } from "~~/server/database/schema"

type Site = typeof sites.$inferSelect


export const useSiteStore = defineStore("site", () => {
	const route = useRoute()
  // state
  const currentSite = ref<Site | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // getters
  const siteName = computed(() => currentSite.value?.name)
  const siteId = computed(() => currentSite.value?.id)

  // actions
  async function fetchSite(siteId: string) {
    if (currentSite.value?.id === siteId) {
      return
    }

    console.log("fetching site", siteId)

    isLoading.value = true
    error.value = null

    try {
      const { data: response } = await useFetch<Site>(`/api/sites/${siteId}`)
      if (response.value) {
        currentSite.value = {
          ...response.value
        }
      }
    } catch (err) {
      error.value = "Failed to fetch site"
      console.error("Error fetching site:", err)
    } finally {
      isLoading.value = false
    }
  }

	onMounted(async () => {
		if (!route.params.siteId) return
		await fetchSite(route.params.siteId as string)
	})

  watch(route, async (newRoute) => {
		if (!newRoute.params.siteId) return
    await fetchSite(newRoute.params.siteId as string)
  })

  return {
    // state
    currentSite,
    isLoading,
    error,

    // getters
    siteName,
    siteId,

    // actions
    fetchSite
  }
})
