<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute,useRouter } from 'vue-router';

const actor = ref(null);
const movies = ref(null);
const nationalite = ref(null);

const route = useRoute();
const router = useRouter();

onMounted(async () => {
    const actorId = route.params.id;
    console.log(actorId);
    const actorsResponse = await axios.get(`http://127.0.0.1:8000/api/actors/${actorId}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Accept': 'application/json'
        }
    })
    .then(function (response) {
        actor.value = actorsResponse.data;
    })
    .catch(function (error) {
        router.push('/login');
    });

    const nationaliteResponse = await axios.get(`http://127.0.0.1:8000${actor.value.nationalite}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Accept': 'application/json'
        }
    })
    .then(function (response) {
        nationalite.value = nationaliteResponse.data.nationalite;
    })
    .catch(function (error) {
        router.push('/login');
    });
    
    actor.movies.forEach(async movie => {
        const moviesResponse = await axios.get(`http://127.0.0.1:8000${movie}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json'
            }
        })
        .then(function (response) {
            movies.value.push(moviesResponse.data.title);
        })
        .catch(function (error) {
            router.push('/login');
        });
    });

    console.log(movies);

    console.log(movies.value);
    console.log(nationalite.value);
    
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
