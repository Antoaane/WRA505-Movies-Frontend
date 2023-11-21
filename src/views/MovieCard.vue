<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const data = ref(null);
const route = useRoute();

onMounted(async () => {
    const movieId = route.params.id;
    console.log(movieId);
    const response = await axios.get(`http://localhost/index.php/api/movies/${movieId}`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    data.value = response.data;
});
</script>

<template>
    <div class="movie-card" v-if="data">
        <h2>{{ data.title }}</h2>
        <p>Description: {{ data.description }}</p>
        <p>Release Date: {{ data.releaseDate }}</p>
        <p>Duration: {{ data.duration }} min</p>
        <!-- Ajoute d'autres détails du film selon tes besoins -->
    </div>
</template>
