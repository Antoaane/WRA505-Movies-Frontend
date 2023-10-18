<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/movies">Movies</RouterLink>
      <RouterLink to="/categories">Categories</RouterLink>
      <RouterLink to="/actors">Actors</RouterLink>
    </nav>
  </header>

  <RouterView />
  
</template>