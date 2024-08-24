<template>
  <div class="container py-16">
    <h1 class="font-sans text-2xl leading-8 mb-10">Works including Lorem ipsum dolor sit</h1>

    <ContentList path="/works" v-slot="{ list }">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <nuxt-link :to="work._path" v-for="work in list" :key="work._path" class="group flex gap-5">
        <div class="flex size-36 bg-[#D9D9D9]"></div>
        <div class="pt-5 flex gap-1 flex-col">
          <h5 class="font-mono text-black group-hover:underline">{{ work.title }}</h5>
          <p class="font-mono italic text-[#787878]">{{ work.type }}</p>
        </div>
      </nuxt-link>
      </div>
    </ContentList>
  </div>
</template>