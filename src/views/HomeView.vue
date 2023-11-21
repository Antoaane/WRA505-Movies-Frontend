<script setup>
    import { onMounted, ref } from 'vue'
    import axios from 'axios'

    let dataMovies = ref('')
    let dataActors = ref('')

    onMounted(async () => {
      const responseMovies = await axios.get('http://localhost/index.php/api/movies', {
        headers: {
          'Accept': 'application/json'
        }
      })
      const responseActors = await axios.get('http://localhost/index.php/api/actors', {
        headers: {
          'Accept': 'application/json'
        }
      })
      dataMovies.value = responseMovies.data
      dataActors.value = responseActors.data
    })

    console.log(dataActors)
</script> 

<template>
    <section>
        <h1>Home</h1>
        <h2>Movies</h2>
        <router-link :to="`/movies/${movie.id}`" v-for="movie in dataMovies.slice(0, 4)" :key="movie.id">
          {{ movie.title }} <br>
          {{ movie.description }} <br>
          {{ movie.releaseDate }} <br>
        </router-link>
        <h2>Actors</h2>
        <router-link :to="`/actors/${actor.id}`" v-for="actor in dataActors.slice(0, 4)" :key="actor.id">
          {{ actor.firstName }} <br>
          {{ actor.lastName }} <br>
          {{ actor.nationalite }} <br>
        </router-link>

    </section>
</template>