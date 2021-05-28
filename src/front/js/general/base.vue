<template>
    <div class="app__container">
        <site-header />

        <div class="app__content">
            <router-view />
        </div>

        <site-footer />
    </div>
</template>

<script>
    import {defineComponent} from 'vue';
    import SiteHeader from './header.vue';
    import SiteFooter from './footer.vue';


    export default defineComponent({
        components: {SiteHeader, SiteFooter},
    });
</script>
