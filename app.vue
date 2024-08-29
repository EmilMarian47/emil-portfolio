<template>
<div class="mix-blend-multiply min-h-screen flex flex-col justify-between bg-cover bg-no-repeat bg-center bg-[url('/assets/bg.png')]">
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
