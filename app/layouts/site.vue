<script setup lang="ts">
const route = useRoute()
const siteId = useRouteParams("siteId")

const navigation = ref([
  { name: "Components", to: `/sites/${siteId.value}/components` },
  { name: "Content", to: `/sites/${siteId.value}/content` },
  { name: "Settings", to: `/sites/${siteId.value}/settings` }
])
</script>

<template>
  <div class="flex flex-1 flex-col">
    <DPageHeader :navigation="navigation" />
    <main class="flex flex-1 flex-col overflow-scroll">
      <slot></slot>
    </main>
  </div>
</template>
