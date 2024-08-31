<template>
    <div class="container">
        <div class="flex gap-4 flex-wrap justify-between text-base font-mono border-t border-gray border-dashed pt-[10px] pb-8">
            <nuxt-link class="underline" :class="{'text-tertiary': $route.path !== '/disclosures', 'text-secondary': $route.path === '/disclosures'}" to="/disclosures">Important disclosures</nuxt-link>
            <nuxt-link class="underline" :class="{'text-tertiary': $route.path !== '/terms', 'text-secondary': $route.path === '/terms'}" to="/terms">Website terms of use</nuxt-link>
            <nuxt-link class="underline" :class="{'text-tertiary': $route.path !== '/privacy', 'text-secondary': $route.path === '/privacy'}" to="/privacy">Privacy policy</nuxt-link>
        </div>
    </div>
</template>