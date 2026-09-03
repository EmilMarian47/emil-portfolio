<template>
  <div class="container py-2">
    <!-- ABOUT -->
    <section class="border border-gray-500/60 border-dashed px-4 py-3">
      <h1 class="font-dos text-lg leading-6 mb-2">
        ABOUT
      </h1>

      <p class="font-dos text-sm leading-6">
        I'M A UI/UX DESIGNER WITH 5 YEARS OF INDUSTRY EXPERIENCE.
        I DESIGN DIGITAL PRODUCTS, INTERFACES AND EXPERIENCES THAT
        HELP PEOPLE AND BUSINESSES MOVE FORWARD.
      </p>
    </section>

    <div class="py-6">
      <AsciiAnimator theme="ice" :crt="true" />
    </div>
  </div>
</template>

<script setup>
import AsciiAnimator from '@/components/AsciiAnimator.vue'
</script>