<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    
    <!-- main container expands to fill available height and push footer down -->
    <main class="flex-grow">
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>

<style>
body {
  @apply bg-background text-primary; 
}
</style>