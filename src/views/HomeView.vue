<script setup>
import {onMounted, ref} from 'vue'
import CardActeur from "@/components/CardActeur.vue";
import CardFilm from "@/components/CardFilm.vue";

const movies = ref('')
const data = ref('')
const actors = ref('')

onMounted(async () => {
  fetch('http://localhost/index.php/api/actors')
    .then(response => response.json())
    .then(data => {
      actors.value = data['hydra:member'];
  });

  fetch('http://localhost/index.php/api/movies')
      .then(response => response.json())
      .then(data => {
        movies.value = data['hydra:member'];
      });
});
</script>

<template>
  <main>
    <h2>Films</h2>
    <div v-if="movies" class="flex">
      <template v-for="movie in movies.slice(0,4)">
        <CardFilm :movie="movie"></CardFilm>
      </template>
    </div>
    <div v-else>Chargement des données...</div>

    <h2>Acteurs</h2>
    <div v-if="actors" class="flex">
      <template v-for="act in actors.slice(0,4)">
        <CardActeur :actor="act"></CardActeur>
      </template>
    </div>
    <div v-else>Chargement des données...</div>
  </main>
</template>
