<script setup>
    import { onMounted, ref } from 'vue'
    import axios from 'axios'

    let dataMovies = ref('')
    let dataActors = ref('')

    onMounted(async () => {
      await axios.get('http://127.0.0.1:8000/api/movies', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json'
        }
      })
      .then(function (response) {
        dataMovies.value = response.data
      })
      .catch(function (error) {
        console.log(error)
      });

      await axios.get('http://127.0.0.1:8000/api/actors', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json'
        }
      })
      .then(function (response) {
        dataActors.value = response.data
      })
      .catch(function (error) {
        console.log(error)
      });
    })
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