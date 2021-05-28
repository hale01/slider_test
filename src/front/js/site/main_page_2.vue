<template>
    <div class="slider">
        <div class="slider__container">
            <div class="slider-controls">
                <div class="slider-controls__prev">Назад</div>
                <div class="slider-controls__next">Вперед</div>
            </div>

            <div class="slider__body loading">
                <div class="slider__title"></div>
                <img class="slider__img">
                <div class="slider__description"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {onMounted} from 'vue';
import {Slider} from '@/slider';

export default {
    name: 'main-page',
    setup() {
        onMounted(() => {
           new Slider();
        });

        return {}
    }
};
</script>

<style scoped>


</style>