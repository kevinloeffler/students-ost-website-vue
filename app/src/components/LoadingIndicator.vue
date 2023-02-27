<template>
    <div class="loading-wrapper">
        <div class="loading-bar"></div>
    </div>
</template>

<script setup lang="ts">

import {ref} from 'vue'

const props = defineProps({
    invertColor: Boolean
})

const color = ref(props.invertColor ? '#000000' : '#ffffff')

</script>

<style scoped>

.loading-wrapper {
    width: 50px;
    height: 6px;
    border: solid 2px v-bind(color);
}

.loading-bar {
    width: 33%;
    height: 100%;
    background-color: v-bind(color);

    animation-duration: 1s;
    animation-name: loading-animation;
    animation-iteration-count: infinite;
}

@keyframes loading-animation {
    0% { margin-left: 0; }
    50% { margin-left: 67%; }
    100% { margin-left: 0; }
}

</style>