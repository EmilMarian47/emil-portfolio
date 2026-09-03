<template>
  <div class="container py-8 flex-grow">
    <!-- ContentQuery fetches document data cleanly without crashing on empty bodies -->
    <ContentQuery :path="$route.path" find="one" v-slot="{ data: doc }">
      <div v-if="doc" class="content">

        <!-- Header -->
        <div class="flex justify-between items-center mb-9">
          <div class="flex gap-3 items-center">
            <nuxt-link to="/works">
              <img src="~/assets/icons/arrow-left.svg" class="size-6" alt="Back" />
            </nuxt-link>
            <h1 class="text-base font-dos">{{ doc.title }}</h1>
          </div>

          <!-- Go to website Hyperlink (Renders if website/url/link frontmatter exists) -->
          <a
            v-if="getWebsiteUrl(doc)"
            :href="getWebsiteUrl(doc)"
            target="_blank"
            rel="noopener noreferrer"
            class="text-base font-dos text-primary underline underline-offset-2 flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            GO TO WEBSITE
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
        <article v-if="hasBodyContent(doc)">
          <ContentRenderer :value="transformBodyAssets(doc)" />
        </article>
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
  if (
    rawInput.includes('figma.com/') &&
    !rawInput.includes('embed.figma.com/')
  ) {
    return rawInput.replace('www.figma.com', 'embed.figma.com');
  }

  // 3. Otherwise return direct URL string as-is
  return rawInput;
};
</script>