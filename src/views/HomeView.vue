<script setup>
    import { onMounted, ref, watch } from 'vue'
    import axios from 'axios'

    let data = ref('')
    let dataFull = ref('')

    onMounted(async () => {
      const response = await axios.get('http://localhost/index.php/api/movies', {
        headers: {
          'Accept': 'application/json'
        }
      })
      data.value = response.data
      dataFull.value = response.data
    })

    console.log(data)
</script> 

<template>
    <section>
        <h1>Pays</h1>
        <router-link :to="`/movies/${movie.id}`" v-for="movie in data" :key="movie.id">
            {{ movie.title }} <br>
            {{ movie.description }} <br>
            {{ movie.releaseDate }} <br>
        </router-link>
        <!-- <pre>
            {{ data }}
        </pre> -->
    </section>
</template>