<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/movies">Movies</RouterLink>
      <RouterLink to="/categories">Categories</RouterLink>
      <RouterLink to="/actors">Actors</RouterLink>
    </nav>
    <nav class="connexion">
      <RouterLink to="/">Login</RouterLink>
      <RouterLink to="/">Register</RouterLink>
    </nav>
  </header>

  <RouterView />
  
</template>