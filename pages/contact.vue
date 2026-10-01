<template>
  <div class="container">
    <section ref="contactRef" class="border border-gray-500/60 border-dashed px-4 py-3 md:py-5 mb-4 md:mb-6">
      <div class="flex flex-col gap-3 md:gap-6">
        <div class="flex flex-col gap-0.5 md:gap-1">
          <p class="font-dos text-xs md:text-sm">Phone</p>
          <a class="font-dos text-sm md:text-base text-primary underline break-all" href="tel:+918547956056">+91 8547956056</a>
        </div>
        
        <div class="flex flex-col gap-0.5 md:gap-1">
          <p class="font-dos text-xs md:text-sm">LinkedIn</p>
          <a class="font-dos text-sm md:text-base text-primary underline break-all" href="https://www.linkedin.com/in/emil-marian/" target="_blank" rel="noopener noreferrer">linkedin.com/in/emil-marian/</a>
        </div>
        
        <div class="flex flex-col gap-0.5 md:gap-1">
          <p class="font-dos text-xs md:text-sm">Email</p>
          <a class="font-dos text-sm md:text-base text-primary underline break-all" href="mailto:emil.marian.info@gmail.com">emil.marian.info@gmail.com</a>
        </div>
      </div>
    </section>

    <!-- SCANLINES -->
    <div class="mb-6 w-full border border-gray-500/60 border-dashed">
      <Scanlines :height="scanlinesHeight" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Scanlines from '@/components/Scanlines.vue'

const contactRef = ref(null)
const scanlinesHeight = ref('280px')

const updateHeight = () => {
  if (!import.meta.client) return

  const vh = window.innerHeight
  const headerEl = document.querySelector('header')?.closest('.container')
  const footerEl = document.querySelector('footer')

  const headerH = headerEl ? headerEl.offsetHeight : 180
  const footerH = footerEl ? footerEl.offsetHeight : 80
  const contactH = contactRef.value ? contactRef.value.offsetHeight : 180

  const remaining = vh - headerH - footerH - contactH - 48
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