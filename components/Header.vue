<template>
  <div class="container pt-12">
    <div class="flex gap-4 items-center mb-7">
      <nuxt-link to="/" class="relative w-14 h-14">
        <img
          src="../assets/img/logo.png"
          alt="Logo"
          class="w-16 h-16 absolute inset-0"
          v-if="isFallbackVisible"
        />
        <img
          ref="videoRef"
          src="/assets/giphy.gif"
          class="w-14 h-14 object-cover rounded-full"
          @error="showFallback"
          @loadeddata="hideFallback"
        ></img>
      </nuxt-link>

      <nuxt-link to="/">
        <h1 class="font-sans text-base">Emil Marian</h1>
      </nuxt-link>
    </div>
    <div class="flex justify-between gap-2 py-2 border-y border-gray border-dashed">
      <nuxt-link
        class="font-medium underline"
        :class="{
          'text-tertiary': $route.path !== '/',
          'text-secondary': $route.path === '/',
        }"
        to="/"
        >About</nuxt-link
      >
      <nuxt-link
        class="font-medium underline"
        :class="{
          'text-tertiary': !$route.path.startsWith('/works'),
          'text-secondary': $route.path.startsWith('/works'),
        }"
        to="/works"
        >Works</nuxt-link
      >
      <nuxt-link
        class="font-medium underline"
        :class="{
          'text-tertiary': $route.path !== '/contact',
          'text-secondary': $route.path === '/contact',
        }"
        to="/contact"
        >Contact</nuxt-link
      >
    </div>
  </div>
</template>

<script setup>
const isFallbackVisible = ref(false);
const videoRef = ref(null);

const showFallback = () => {
  isFallbackVisible.value = true;
};

const hideFallback = () => {
  isFallbackVisible.value = false;
};
</script>
