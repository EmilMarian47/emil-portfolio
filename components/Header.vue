<template>
    <div class="container pt-12">
        <div class="flex gap-4 items-center mb-7">
            <nuxt-link to="/"><img src="../assets/img/logo.png" alt="Logo" class="w-16 h-16"></nuxt-link>
            <nuxt-link to="/"><h1 class="font-sans text-3xl">Emil Marian</h1></nuxt-link>
        </div>
        <div class="flex justify-between gap-2 py-2 border-y border-[#BCBCBC]">
            <nuxt-link class="font-medium underline underline-offset-2" :class="{'text-[#00000080]': $route.path !== '/', 'text-[#A000AE]': $route.path === '/'}" to="/">About</nuxt-link>
            <nuxt-link class="font-medium underline underline-offset-2" :class="{'text-[#00000080]': $route.path !== '/works', 'text-[#A000AE]': $route.path === '/works'}" to="/works">Works</nuxt-link>
            <nuxt-link class="font-medium underline underline-offset-2" :class="{'text-[#00000080]': $route.path !== '/contact', 'text-[#A000AE]': $route.path === '/contact'}" to="/contact">Contact</nuxt-link>
        </div>
    </div>
</template>
