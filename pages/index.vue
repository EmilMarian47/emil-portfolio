<template>
  <div class="container">
    <!-- ABOUT -->
    <section ref="aboutRef" class="border border-gray-500/60 border-dashed px-4 py-3 mb-6">
      <p class="font-dos text-sm leading-6">
        I'm a UI/UX designer based in Kerala with 4.5 years of industry experience, 
        creating intuitive and engaging digital experiences across a range of industry sectors. 
        I had the opportunity to work with clients from diverse fields, translating their business needs into thoughtful design solutions. 
        I'm proficient in UI/UX design for websites, mobile applications, and desktop applications, with a strong focus on usability, visual clarity, 
        and user-centered design. I enjoy solving complex problems through simple, purposeful, and visually compelling design.
      </p>
    </section>

    <!-- GALLERY WITH CRT / MOIRE EFFECT -->
    <section class="border border-gray-500/60 border-dashed px-4 py-4 mb-6">
      <div class="grid grid-cols-4 gap-4">
        <div 
          v-for="(image, index) in galleryImages" 
          :key="index" 
          class="relative overflow-hidden group aspect-square border border-gray-700/60"
        >
          <img 
            :src="image" 
            :alt="'Gallery image ' + (index + 1)" 
            class="w-full h-full object-cover aspect-square filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-500" 
          />
          <div class="absolute inset-0 crt-overlay pointer-events-none"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Fetch images dynamically from a specific folder in public
const imagesModules = import.meta.glob('/public/gallery/*', { eager: true })
const galleryImages = Object.values(imagesModules).map((mod) => {
  return mod.default || mod
})
</script>

<style scoped>
.crt-overlay {
  background: 
    linear-gradient(
      rgba(18, 16, 16, 0) 50%, 
      rgba(0, 0, 0, 0.35) 50%
    ),
    linear-gradient(
      90deg, 
      rgba(255, 0, 0, 0.06), 
      rgba(0, 255, 0, 0.02), 
      rgba(0, 0, 255, 0.06)
    );
  background-size: 100% 3px, 3px 100%;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.6);
}
</style>