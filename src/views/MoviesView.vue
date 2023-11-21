<script setup>
    import { onMounted, ref, watch } from 'vue';
    import axios from 'axios';

    let data = ref('');
    let recherche = ref('');
    let dataFull = ref('');

    onMounted(async () => {
        const response = await axios.get('http://localhost/index.php/api/movies', {
            headers: {
            'Accept': 'application/json'
            }
        });
        data.value = response.data;
        dataFull.value = response.data;
    });

    console.log(data);

    watch(recherche, () => {
        filtrerPays();
    });

    function filtrerPays() {
        if (dataFull.value) {
            data.value = dataFull.value.filter(movie => movie.title.toLowerCase().includes(recherche.value.toLowerCase()));
        }
    }
</script>

<template>
    <section>
        <h1>Films</h1>
        <input type="text" v-model="recherche">
        <button @click="filtrerPays()">Rechercher</button>
        <router-link :to="`/movies/${movie.id}`" v-for="movie in data" :key="movie.id">
            {{ movie.title }} <br>
            {{ movie.description }} <br>
            {{ movie.releaseDate }} <br>
        </router-link>
    </section>
</template>