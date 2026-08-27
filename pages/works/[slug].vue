<template>
  <div class="container py-8 flex-grow">
    <ContentDoc v-slot="{ doc }">
      <div class="content pb-16 border-b border-primary">
        <div class="text-tertiary text-base font-mono mb-6">
          <span>{{ doc._path.split('/works')[0] }}/</span>
          <nuxt-link class="underline" to="/works">works</nuxt-link>
          <span>{{ doc._path.split('/works')[1] }}</span>
        </div>

        <div class="flex gap-3 items-center mb-9">
          <nuxt-link to="/works">
            <img src="~/assets/icons/arrow-left.svg" class="size-6" alt="Back" />
          </nuxt-link>
          <h1 class="text-base">{{ doc.title }}</h1>
        </div>

        <article class="mb-8">
          <ContentRenderer :value="doc" />
        </article>
      </div>

      <div class="py-16">
        <div class="flex gap-2 justify-between mb-11">
          <h4 class="text-base">More Projects</h4>
          <NuxtLink to="/works" class="text-base text-primary font-mono underline underline-offset-2">
            View All
          </NuxtLink>
        </div>
        <ContentList path="/works" v-slot="{ list }">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <template v-for="work in list" :key="work._path">
              <nuxt-link v-if="doc._path !== work._path" :to="work._path" class="group flex gap-5">
                
                <!-- Dynamic Thumbnail Container -->
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
            </template>
          </div>
        </ContentList>
      </div>
    </ContentDoc>
  </div>
</template>

<style>
  /* Edge-to-edge images with 0 margin or gap between consecutive elements */
  article img,
  article video {
    @apply h-auto block my-0;
    width: 100vw;
    max-width: none;
    margin-left: 50%;
    transform: translateX(-50%);
  }
</style>

<script setup>
// Helper function to resolve thumbnail paths from the /works folder
const getThumbnail = (work) => {
  const imgPath = work.thumbnail || work.cover || work.image;
  if (!imgPath) return null;

  if (imgPath.startsWith('/') || imgPath.startsWith('http')) {
    return imgPath;
  }
  return `/works/${imgPath}`;
};
</script>