<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const data = ref(null);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
    const movieId = route.params.id;
    console.log(movieId);
    const response = await axios.get(`http://127.0.0.1:8000/api/movies/${movieId}`, {
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
});
</script>

<template>
    <div class="movie-card" v-if="data">
        <h2>{{ data.title }}</h2>
        <p>Description: {{ data.description }}</p>
        <p>Release Date: {{ data.releaseDate }}</p>
        <p>Duration: {{ data.duration }} min</p>
    </div>
</template>
