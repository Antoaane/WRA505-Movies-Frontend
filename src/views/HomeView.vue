<script setup>
    import { onMounted, ref, watch } from 'vue'
    import axios from 'axios'

    let data = ref('')
    // let recherche = ref('')
    let dataFull = ref('')

    onMounted(async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/movies', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      data.value = response.data
      dataFull.value = response.data
    })

    // watch(recherche, () => {
    //     filtrerPays()
    // })

    // function filtrerPays() {
    //     data.value = dataFull.value.filter(pays => pays.name.common.toLowerCase().includes(recherche.value.toLowerCase()))
    // }
</script> 

<template>
    <section>
        <h1>Pays</h1>
        <!-- <input type="text" v-model="recherche"> -->
        <!-- <button :on-click="filtrerPays()">Recherher</button> -->
        <router-link :to="`/movie/${movie.title}`" v-for="movie in data" :key="movie.id">
            {{ movie.title }} <br>
            {{ movie.description }} <br>
            {{ movie.releaseDate }} <br>
        </router-link>
        <!-- <pre>
            {{ data }}
        </pre> -->
    </section>
</template>