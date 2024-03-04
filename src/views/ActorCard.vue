<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const baseUrl = import.meta.env.VITE_BASE_URL;

const route = useRoute();
const router = useRouter();

let data = ref('');
let nationalite = ref('');
let movies = ref([]);
let moviesUrls = ref([]);

onMounted(async () => {
    const actorId = route.params.id;
    console.log(actorId);
    await axios.get(`${baseUrl}/api/actors/${actorId}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Accept': 'application/json'
        }
    })
    .then(function (response) {
        data.value = response.data;
    })
    .catch(function (error) {
        router.push('/login');
    });

    await axios.get(`${baseUrl}${data.value.nationalite}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Accept': 'application/json'
        }
    })
    .then(function (response) {
        nationalite.value = response.data.nationalite;
    })
    .catch(function (error) {
        router.push('/login');
    });

    moviesUrls.value = data.value.movies;

    console.log(moviesUrls);

    moviesUrls.value.forEach(async movieUrls => {
        await axios.get(`${baseUrl}${movieUrls}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json'
            }
        })
        .then(function (response) {
            movies.value.push(response.data);
        })
        .catch(function (error) {
            console.log(error);
            router.push('/login');
        });
    });
});
</script>

<template>
    <div class="actor-card" v-if="data">
        <h2>{{ data.title }}</h2>
        <p>First name : {{ data.firstName }}</p>
        <p>Last name : {{ data.lastName }}</p>
        <p>Nationality : {{ nationalite }}</p>
        <div class="rounded-xl bg-slate-500 m-10 p-10">
            <p class="text-center">Films</p>
            <ul>
                <li v-for="movie in movies" :key="movie.id">
                    {{ movie.title }}
                </li>
            </ul>
        </div>
    </div>
</template>
