<script setup lang="ts">

import {StudentsEvent} from '../../../@types/Types.js'
import {ref} from 'vue'
import {fetchData} from '../util.js'

let events = ref<[StudentsEvent] | null>(null)
events.value = await fetchNextEvents()

async function fetchNextEvents(): Promise<[StudentsEvent] | null> {
    try {
        const res = await setTimeout( () => 'hello', 3000)
        console.log(res)
        return await fetchData('/api/events')
    } catch (err) {
        // TODO: handle error
        console.error(err)
        return null
    }
}

</script>

<template>

    <p>Events:</p>
    <div v-if="events">
        <p>Events...</p>
    </div>
    <div v-else>
        <p>Events could not be loaded</p>
    </div>

</template>