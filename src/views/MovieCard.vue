<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const baseUrl = import.meta.env.VITE_BASE_URL;

const route = useRoute();
const router = useRouter();

let data = ref('');
let actors = ref([]);
let actorsUrls = ref([]);

onMounted(async () => {
    const movieId = route.params.id;
    console.log(movieId);
    await axios.get(`${baseUrl}/api/movies/${movieId}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Accept': 'application/json'
        }
    })
    .then(function (response) {
        data.value = response.data;
    })
    .catch(function (error) {
        console.log(error);
        router.push('/login');
    });

    actorsUrls.value = data.value.actors;

    console.log(actorsUrls);

    actorsUrls.value.forEach(async actorUrl => {
        await axios.get(`${baseUrl}${actorUrl}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json'
            }
        })
        .then(function (response) {
            actors.value.push(response.data);
        })
        .catch(function (error) {
            console.log(error);
            router.push('/login');
        });
    });
});

</script>

<template>
    <div class="movie-card" v-if="data">
        <h2>{{ data.title }}</h2>
        <p>Description : {{ data.description }}</p>
        <p>Release Date : {{ data.releaseDate }}</p>
        <p>Duration : {{ data.duration }} min</p>
        <div class="rounded-xl bg-slate-500 m-10 p-10">
            <p class="text-center">Actors</p>
            <ul>
                <li v-for="actor in actors" :key="actor.id">
                    {{ actor.firstName }} {{ actor.lastName }}
                </li>
            </ul>
        </div>
    </div>
</template>
