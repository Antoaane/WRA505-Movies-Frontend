<script setup>
const props = defineProps(['movie'])
const movie = props.movie

const date = new Date(movie.releaseDate)
const options = { year: 'numeric', month: 'long', day: 'numeric' };
movie.releaseDate = date.toLocaleDateString('fr-FR', options)
</script>

<template>
  <div class="card">
    <p>
      {{ movie.title }} <br>
      {{ movie.description }} <br>
      Durée : {{ movie.duration }} <br>
      Sortie : {{ movie.releaseDate }}
    </p>
  </div>
</template>

<style scoped>
.card{
  width: 250px;
  margin: 10px;
  padding: 10px;
}
</style>