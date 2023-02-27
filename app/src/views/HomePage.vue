<template>
    <h1>Hello Students</h1>
    <p>This is the homepage</p>

    <Suspense timeout="0">
        <HomeEvents #default/>

        <template #fallback>
            <LoadingIndicator/>
        </template>
    </Suspense>
</template>

<script setup lang="ts">

import HomeEvents from '../components/HomeEvents.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'

</script>