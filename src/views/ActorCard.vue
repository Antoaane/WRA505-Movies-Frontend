<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const actor = ref(null);
const movies = ref(null);
const nationalite = ref(null);
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

    const nationaliteResponse = await axios.get(`http://127.0.0.1:8000${actor.value.nationalite}`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    nationalite.value = nationaliteResponse.data.nationalite;

    console.log(actor.movies);
    //for each movies in actor.movies, get the movie
    actor.movies.forEach(async movie => {
        const moviesResponse = await axios.get(`http://127.0.0.1:8000${movie}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        movies.value.push(moviesResponse.data.title);
    });

    console.log(movies);

    console.log(movies.value);
    console.log(nationalite.value);
    
    //filter movies by actor
    movies.value = movies.value.filter(movie => movie.actors.find(actor => actor.id == actorId));

    console.log(movies.value);
});
</script>

<template>
    <div class="actor-card" v-if="actor">
        <h2>{{ actor.title }}</h2>
        <p>Prénom: {{ actor.firstName }}</p>
        <p>Nom: {{ actor.lastName }}</p>
        <p>Nationalité: {{ nationalite }}</p>
        <p>Films: {{ movies }}</p>
    </div>
</template>
