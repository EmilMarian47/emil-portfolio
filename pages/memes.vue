<template>
  <div class="container py-8">
    <h1 class="font-mono text-base leading-8 mb-6">MEMES</h1>

    <div v-if="images?.length" class="grid grid-cols-2 gap-3 mb-10">
      <button
        v-for="image in images"
        :key="image.src"
        type="button"
        class="block w-full p-0 border-0 bg-transparent cursor-pointer"
        @click="open(image)"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          class="w-full aspect-square object-cover"
        />
      </button>
    </div>

    <p v-else class="mb-10">
      Add images to the server/assets/memes folder to see them here.
    </p>

    <Teleport to="body">
      <div
        v-if="selected"
        class="fixed inset-0 z-50 flex items-center justify-center px-5"
        style="background-color: #111111;"
        role="dialog"
        aria-modal="true"
        aria-label="Meme preview"
        @click="close"
      >
        <button
          type="button"
          class="absolute top-5 right-5 font-sans text-base text-primary underline"
          @click.stop="close"
        >
          Close
        </button>

        <img
          :src="selected.src"
          :alt="selected.alt"
          class="max-h-[85vh] max-w-full object-contain"
          @click.stop
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
const { data: images } = await useFetch('/api/memes', {
  default: () => [],
})

const selected = ref(null)

const open = (image) => {
  selected.value = image
}

const close = () => {
  selected.value = null
}

const onKeydown = (event) => {
  if (event.key === 'Escape') {
    close()
  }
}

watch(selected, (image) => {
  if (!import.meta.client) {
    return
  }

  document.body.style.overflow = image ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>