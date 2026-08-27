<template>
  <div class="container py-8">
    <h1 class="font-mono text-base leading-8 mb-10">Works including Lorem ipsum dolor sit</h1>

    <ContentList path="/works" v-slot="{ list }">
      <div class="grid grid-cols-1 md:grid-cols-1 gap-5">
        <nuxt-link :to="work._path" v-for="work in list" :key="work._path" class="group flex gap-5">
          <!-- Thumbnail Container -->
          <div class="size-36 bg-[#D9D9D9] shrink-0 overflow-hidden flex items-center justify-center">
            <img 
              v-if="getThumbnail(work)" 
              :src="getThumbnail(work)" 
              :alt="work.title" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>

          <div class="pt-5 flex gap-1 flex-col">
            <h5 class="font-mono text-black underline">{{ work.title }}</h5>
            <p class="font-mono italic text-tertiary">{{ work.type }}</p>
          </div>
        </nuxt-link>
      </div>
    </ContentList>
  </div>
</template>

<script setup>
// Helper function to extract and format thumbnail path from works folder
const getThumbnail = (work) => {
  const imgPath = work.thumbnail || work.cover || work.image;
  if (!imgPath) return null;

  // If path already starts with / or http, return as-is; otherwise, point to /works/
  if (imgPath.startsWith('/') || imgPath.startsWith('http')) {
    return imgPath;
  }
  return `/works/${imgPath}`;
};
</script>