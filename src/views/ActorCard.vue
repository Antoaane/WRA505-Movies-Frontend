<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const actor = ref(null);
const movies = ref(null);
const route = useRoute();

onMounted(async () => {
    const actorId = route.params.id;
    console.log(actorId);
    const actorsResponse = await axios.get(`http://127.0.0.1:8000/api/actors/${actorId}`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    actor.value = actorsResponse.data;

    const moviesResponse = await axios.get(`http://127.0.0.1:8000/api/movies`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    movies.value = moviesResponse.data;
    //filter movies by actor
    movies.value = movies.value.filter(movie => movie.actors.find(actor => actor.id == actorId));
});
</script>

<template>
    <div class="actor-card" v-if="actor">
        <h2>{{ actor.title }}</h2>
        <p>Prénom: {{ actor.firstName }}</p>
        <p>Nom: {{ actor.lastName }}</p>
        <p>Nationalité: {{ actor.nationalite }}</p>
    </div>
</template>
