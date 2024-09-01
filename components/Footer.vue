<template> 
    <div class="container">
        <div class="flex items-center justify-center text-base font-mono border-t border-gray border-dashed pt-[10px] pb-8">
            <nuxt-link class="underline" :class="{'text-tertiary': $route.path !== '/disclosures', 'text-secondary': $route.path === '/disclosures'}" to="/disclosures">Copyright © 2022-2024 Emil Marian. </nuxt-link>
        </div>
    </div>
</template>