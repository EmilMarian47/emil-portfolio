<template>
  <div class="container pt-12">
    
    <header
      class="w-full bg-tertiary text-background
             px-3 py-2 flex items-center"
    >
      <nuxt-link to="/" class="relative w-10 h-10 shrink-0">
        <img
          v-if="isFallbackVisible"
          src="../assets/img/logo.png"
          alt="Logo"
          class="w-10 h-10 absolute inset-0 object-cover rounded-full"
        />

        <img
          ref="videoRef"
          src="/assets/giphy.gif"
          alt=""
          class="w-10 h-10 object-cover rounded-full"
          @error="showFallback"
          @load="hideFallback"
        />
      </nuxt-link>

      <nuxt-link to="/" class="ml-3">
        <h1 class="font-dos text-sm leading-5">
          EMIL MARIAN
        </h1>
      </nuxt-link>

      <div class="ml-auto">
        <a
          href="/resume.pdf"
          download
          class="font-dos text-sm leading-5 underline"
        >
          DOWNLOAD RESUME
        </a>
      </div>
    </header>


    <section class="border border-gray-500/60 border-dashed px-4 py-5 mb-9">
      <nav class="w-full">
        <div class="flex items-center justify-between">

          <nuxt-link
            class="font-dos text-sm px-2 py-1"
            :class="{
              'text-primary underline': $route.path !== '/',
              'bg-tertiary text-background no-underline': $route.path === '/',
            }"
            to="/"
          >
            ABOUT
          </nuxt-link>

          <nuxt-link
            class="font-dos text-sm px-2 py-1"
            :class="{
              'text-primary underline': !$route.path.startsWith('/works'),
              'bg-tertiary text-background no-underline': $route.path.startsWith('/works'),
            }"
            to="/works"
          >
            WORKS
          </nuxt-link>

          <nuxt-link
            class="font-dos text-sm px-2 py-1"
            :class="{
              'text-primary underline': $route.path !== '/contact',
              'bg-tertiary text-background no-underline': $route.path === '/contact',
            }"
            to="/contact"
          >
            CONTACT
          </nuxt-link>

        </div>
      </nav>
    </section>

  </div>
</template>

<script setup>
const isFallbackVisible = ref(false)
const videoRef = ref(null)

const showFallback = () => {
  isFallbackVisible.value = true
}

const hideFallback = () => {
  isFallbackVisible.value = false
}
</script>