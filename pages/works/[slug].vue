<template>
  <div class="container py-8 flex-grow">
    <!-- ContentQuery fetches document data cleanly without crashing on empty bodies -->
    <ContentQuery :path="$route.path" find="one" v-slot="{ data: doc }">
      <div v-if="doc" class="content pb-16 border-b border-primary">
        <!-- Breadcrumbs -->
        <div class="text-tertiary text-base font-mono mb-6">
          <span>{{ doc._path.split('/works')[0] }}/</span>
          <nuxt-link class="underline" to="/works">works</nuxt-link>
          <span>{{ doc._path.split('/works')[1] }}</span>
        </div>

        <!-- Header -->
        <div class="flex justify-between items-center mb-9">
          <div class="flex gap-3 items-center">
            <nuxt-link to="/works">
              <img src="~/assets/icons/arrow-left.svg" class="size-6" alt="Back" />
            </nuxt-link>
            <h1 class="text-base font-mono">{{ doc.title }}</h1>
          </div>

          <!-- Go to website Hyperlink (Renders if website/url/link frontmatter exists) -->
          <a
            v-if="getWebsiteUrl(doc)"
            :href="getWebsiteUrl(doc)"
            target="_blank"
            rel="noopener noreferrer"
            class="text-base font-mono text-primary underline underline-offset-2 flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            Go to website
          </a>
        </div>

        <!-- Full-Viewport iFrame (Shows if frontmatter iframe/figma/embed exists) -->
        <div v-if="getIframeUrl(doc)" class="iframe-container mb-12">
          <iframe
            :src="getIframeUrl(doc)"
            class="w-screen h-[90vh] max-w-none left-1/2 -ml-[50vw] relative border-0 bg-neutral-900 rounded-lg shadow-inner"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>

        <!-- Markdown Article Body (With automatically transformed relative asset paths) -->
        <article v-if="hasBodyContent(doc)" class="mb-8">
          <ContentRenderer :value="transformBodyAssets(doc)" />
        </article>
      </div>

      <!-- More Projects Section -->
      <div v-if="doc" class="py-16">
        <div class="flex gap-2 justify-between mb-11">
          <h4 class="text-base font-mono">More Projects</h4>
          <NuxtLink to="/works" class="text-base text-primary font-mono underline underline-offset-2">
            View All
          </NuxtLink>
        </div>

        <ContentList path="/works" v-slot="{ list }">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <template v-for="work in list" :key="work._path">
              <nuxt-link v-if="doc._path !== work._path" :to="work._path" class="group flex gap-5">

                <!-- Dynamic Thumbnail Container (Images + Videos) -->
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
                  <p class="font-mono italic text-tertiary">{{ work.type }}</p>
                </div>
              </nuxt-link>
            </template>
          </div>
        </ContentList>
      </div>
    </ContentQuery>
  </div>
</template>

<style>
  /* Edge-to-edge styling for images, videos, AND inline iframes in article body */
  article img,
  article video,
  article iframe {
    @apply block my-0;
    width: 100vw;
    max-width: none;
    margin-left: 50%;
    transform: translateX(-50%);
  }

  /* Default height for inline iframes in markdown */
  article iframe {
    height: 80vh;
    border: none;
  }
</style>

<script setup>
// Extract website URL from frontmatter
const getWebsiteUrl = (doc) => {
  return doc?.website || doc?.url || doc?.link || doc?.site || null;
};

// Extract project slug from document path (e.g. "/works/marker" -> "marker")
const getProjectSlug = (doc) => {
  return doc?._path ? doc._path.split('/').pop() : '';
};

// Check if document has actual body content
const hasBodyContent = (doc) => {
  return doc?.body?.children && doc.body.children.length > 0;
};

// Check if file path points to a video
const isVideo = (path) => {
  if (!path) return false;
  return /\.(mp4|webm|ogg|mov)$/i.test(path);
};

// Resolve thumbnail paths: /works/<slug>/<filename>
const getThumbnail = (work) => {
  const imgPath = work.thumbnail || work.cover || work.image;
  if (!imgPath) return null;

  if (imgPath.startsWith('/') || imgPath.startsWith('http')) {
    return imgPath;
  }

  const slug = getProjectSlug(work);
  return slug ? `/works/${slug}/${imgPath}` : `/works/${imgPath}`;
};

// Automatically prepends /works/<slug>/ to relative images inside the Markdown body AST
const transformBodyAssets = (doc) => {
  if (!doc?.body) return doc;
  
  const slug = getProjectSlug(doc);
  if (!slug) return doc;

  // Clone document object to prevent unintended side effects
  const clonedDoc = JSON.parse(JSON.stringify(doc));

  const resolvePath = (src) => {
    if (!src || src.startsWith('/') || src.startsWith('http')) return src;
    return `/works/${slug}/${src}`;
  };

  const walkNodes = (nodes) => {
    if (!Array.isArray(nodes)) return;
    for (const node of nodes) {
      if (node.tag === 'img' && node.props?.src) {
        node.props.src = resolvePath(node.props.src);
      }
      if (node.tag === 'video' && node.props?.src) {
        node.props.src = resolvePath(node.props.src);
      }
      if (node.children) {
        walkNodes(node.children);
      }
    }
  };

  walkNodes(clonedDoc.body.children);
  return clonedDoc;
};

// Extracts src from raw <iframe> string, direct URL, or Figma share links
const getIframeUrl = (doc) => {
  const rawInput = doc.iframe || doc.figma || doc.figmaUrl || doc.embed;
  if (!rawInput) return null;

  // 1. If user pasted a full <iframe ... src="..."> code snippet
  if (rawInput.includes('<iframe')) {
    const srcMatch = rawInput.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      return srcMatch[1];
    }
  }

  // 2. If user pasted a standard Figma URL, convert to embed format
  if (rawInput.includes('figma.com/') && !rawInput.includes('embed.figma.com/')) {
    return rawInput.replace('www.figma.com', 'embed.figma.com');
  }

  // 3. Otherwise return direct URL string as-is
  return rawInput;
};
</script>