<template>
 <div class="min-h-screen flex flex-col justify-between bg-cover bg-no-repeat bg-center bg-[url('/assets/bg1.png')]"> 
  <div>
    <Header />
    <NuxtPage />
  </div>
  <Footer />
</div>
</template>

<style>
body {
  @apply bg-background text-primary; 
}
</style>
