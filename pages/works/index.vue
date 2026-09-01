<template>
  <div class="container py-8">
    <h1 class="font-mono text-primary text-base leading-8 mb-10">
      PROJECTS INCLUDE WEBSITES, DESKTOP APPS, MOBILE APPS AND MY OWN PAINTINGS
    </h1>

    <ContentList path="/works" v-slot="{ list }">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <nuxt-link 
          v-for="work in list" 
          :key="work._path" 
          :to="work._path" 
          class="group flex gap-5"
        >
          <!-- Thumbnail Container (Supports both Images & Videos) -->
          <div class="size-36 bg-[#D9D9D9] shrink-0 overflow-hidden flex items-center justify-center">
            <!-- Video Thumbnail -->
            <video 
              v-if="isVideo(getThumbnail(work))" 
              :src="getThumbnail(work)" 
              autoplay 
              loop 
              muted 
              playsinline 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <!-- Image Thumbnail -->
            <img 
              v-else-if="getThumbnail(work)" 
              :src="getThumbnail(work)" 
              :alt="work.title" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>

          <div class="pt-5 flex gap-1 flex-col">
            <h5 class="font-mono text-black underline">{{ work.title }}</h5>
            <p class="font-mono italic text-primary">{{ work.type }}</p>
          </div>
        </nuxt-link>
      </div>
    </ContentList>
  </div>
</template>

<script setup>
// Check if path points to a video asset
const isVideo = (path) => {
  if (!path) return false;
  return /\.(mp4|webm|ogg|mov)$/i.test(path);
};

// Helper function to extract and format thumbnail path from works/<slug>/ folder
const getThumbnail = (work) => {
  return work.thumbnail || work.cover || work.image || null;
};
</script>