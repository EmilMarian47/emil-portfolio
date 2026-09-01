<script setup>
const route = useRoute()

// Returns true for sub-routes like /works/some-project, but false for /works
const isWorkDetailPage = computed(() => {
  return route.path.startsWith('/works/') && route.path !== '/works'
})
</script>

<template>
<CRTEffect>
  <div class="min-h-screen flex flex-col bg-background text-primary">
    <Header v-if="!isWorkDetailPage" />

    <main class="flex-grow">
      <NuxtPage />
    </main>

    <Footer v-if="!isWorkDetailPage" />
  </div>
  </CRTEffect>
</template>