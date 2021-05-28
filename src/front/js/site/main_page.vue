<template>
    <div class="slider">
        <div class="slider__container">
            <div class="slider-controls">
                <div class="slider-controls__prev" @click="prev">Назад</div>
                <div class="slider-controls__next" @click="next">Вперед</div>
            </div>

            <div class="slider__body" :class="{loading: !imageLoaded || fetchProcess}">
                <div class="slider__title" v-text="currentData.safe_title"></div>
                <img :src="currentData.img" class="slider_img" @load="imageLoadHandler">
                <div v-if="currentData.alt" v-text="currentData.alt" class="slider__description"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {computed, onBeforeMount, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';

export default {
    name: 'main-page',
    setup() {
        const router = useRouter();
        const route = useRoute();
        const mainComicUrl = 'http://localhost:8010/proxy/info.0.json'
        const templateUrl = 'http://localhost:8010/proxy/{}/info.0.json'
        const currentId = ref(0);
        const imageLoaded = ref(false);
        const currentData = ref({});

        if (route.params.id) {
            currentId.value = parseInt(route.params.id);
        }

        // Это тестовое задание, поэтому сделано по простому, без прелоадинга
        const fetchProcess = ref(false);

        const currentUrl = computed(() => {
            if (!currentId.value) {
                return mainComicUrl
            } else {
                return  templateUrl.replace('{}', String(currentId.value));
            }
        });

        async function next() {
            currentId.value += 1;
        }

        async function prev() {
            if (currentId.value > 0) {
                currentId.value -= 1;
            }
        }

        async function fetchPost() {
            fetchProcess.value = true;
            imageLoaded.value = false;

            try {
                await router.replace({name: 'main', params: {id: currentId.value}})
                const response = await fetch(
                    currentUrl.value, {cache: 'no-cache'},
                )

                if (response.ok) {
                    currentData.value = await response.json();
                }
            } catch (error) {
                console.log(error)
            } finally {
                fetchProcess.value = false;
            }
        }

        function imageLoadHandler() {
            imageLoaded.value = true;
        }

        watch(currentId,  async () => {
            if (fetchProcess.value) {
                return
            }
            await fetchPost();
        });

        onBeforeMount(async () => {
            await fetchPost();
        })

        return {fetchProcess, currentData, imageLoaded, next, prev, imageLoadHandler}
    }
};
</script>

<style scoped>


</style>