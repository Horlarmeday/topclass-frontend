<!-- =========================================================================================
    File Name: Error404.vue
    Description: 404 Page
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center">
            <img src="@/assets/images/pages/404.png" alt="graphic-404" class="mx-auto mb-4 max-w-full">
            <h1 class="sm:mx-0 mx-4 mb-12 text-5xl d-theme-heading-color">404 - Page Not Found!</h1>
            <p class="sm:mx-0 mx-4 mb-4 sm:mb-16 d-theme-text-inverse font-black" style="color: #8b8989">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
            <vs-button size="large" @click="$router.go(-1)">Back</vs-button>
        </div>
    </div>
</template>


<style lang="scss">
[dir] .layout--full-page .bg-img {
    background-image: url(../../assets/images/pages/v-login-bg.png) !important;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>