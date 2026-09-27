<template>
  <div class="container">
    <!-- ABOUT -->
    <section ref="aboutRef" class="border border-gray-500/60 border-dashed px-4 py-3 mb-6">
      

      <p class="font-dos text-sm leading-6">
        I'M A UI/UX DESIGNER BASED IN KERALA WITH 4.5 YEARS OF INDUSTRY EXPERIENCE, CREATING INTUITIVE AND ENGAGING DIGITAL EXPERIENCES ACROSS A RANGE OF INDUSTRIES. 
        I HAD THE OPPORTUNITY TO WORK WITH CLIENTS FROM DIVERSE SECTORS, TRANSLATING THEIR BUSINESS NEEDS INTO THOUGHTFUL DESIGN SOLUTIONS. 
        I'M PROFICIENT IN UI/UX DESIGN FOR WEBSITES, MOBILE APPLICATIONS, AND DESKTOP APPLICATIONS, WITH A STRONG FOCUS ON USABILITY, VISUAL CLARITY, AND USER-CENTERED DESIGN. 
        I ENJOY SOLVING COMPLEX PROBLEMS THROUGH SIMPLE, PURPOSEFUL, AND VISUALLY COMPELLING DESIGN.
      </p>
    </section>

    <div class="mb-6 w-full">
      <Scanlines :height="scanlinesHeight" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Scanlines from '@/components/Scanlines.vue'

const aboutRef = ref(null)
const scanlinesHeight = ref('280px')

const updateHeight = () => {
  if (!import.meta.client) return

  const vh = window.innerHeight
  const headerEl = document.querySelector('header')?.closest('.container')
  const footerEl = document.querySelector('footer')

  const headerH = headerEl ? headerEl.offsetHeight : 180
  const footerH = footerEl ? footerEl.offsetHeight : 80
  const aboutH = aboutRef.value ? aboutRef.value.offsetHeight : 180

  // 48px covers the mb-6 (24px) on About and mb-6 (24px) on Scanlines wrapper
  const remaining = vh - headerH - footerH - aboutH - 48

  scanlinesHeight.value = `${Math.max(140, Math.floor(remaining))}px`
}

onMounted(() => {
  nextTick(() => {
    updateHeight()
  })
  window.addEventListener('resize', updateHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight)
})
</script>