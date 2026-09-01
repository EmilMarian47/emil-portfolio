<template> 
  <footer class="w-full mt-auto">
    <div class="container">
      <div class="flex items-center justify-center text-base font-mono border-t border-gray border-dashed pt-[10px] pb-8">
        <nuxt-link 
          class="underline" 
          :class="{'text-primary': $route.path !== '/disclosures', 'text-secondary': $route.path === '/disclosures'}" 
          to="/disclosures"
        >
          COPYRIGHT © 2026-2028 EMIL MARIAN.
        </nuxt-link>
      </div>
    </div>
  </footer>
</template>