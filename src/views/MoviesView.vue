<script setup>
import CardFilm from '../components/CardFilm.vue';
</script>

<template>
    
    <h1>Films</h1>

    <div class="flex">
        <template v-for="movie in movies">
            <CardFilm :movie="movie"></CardFilm>
        </template>
    </div>

</template>