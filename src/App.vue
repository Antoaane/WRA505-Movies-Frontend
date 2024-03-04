<script setup>
import { RouterLink, RouterView } from 'vue-router'

let isConnected = localStorage.getItem('token');

function logout() {
  localStorage.removeItem('token');
  location.reload();
}

</script>

<template>
  <header>
    <nav class="navigation">
      <RouterLink class="button" to="/">Home</RouterLink>
      <RouterLink class="button" to="/movies">Movies</RouterLink>
      <RouterLink class="button" to="/categories">Categories</RouterLink>
      <RouterLink class="button" to="/actors">Actors</RouterLink>
    </nav>
    <nav class="connexion">
      <button class="text-white button" v-if="isConnected" @click="logout()">Logout</button>
      <RouterLink class="button" v-else to="/login">Login</RouterLink>
    </nav>
  </header>

  <RouterView />
  
</template>