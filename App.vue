<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/movies">Films</RouterLink>
      <RouterLink to="/actors">Acteurs</RouterLink>
      <RouterLink to="/categories">Catégories</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
