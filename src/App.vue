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
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/movies">Movies</RouterLink>
      <RouterLink to="/categories">Categories</RouterLink>
      <RouterLink to="/actors">Actors</RouterLink>
    </nav>
    <nav class="connexion">
      <button class="btn" v-if="isConnected" @click="logout()">Logout</button>
      <RouterLink class="btn" v-else to="/login">Login</RouterLink>
    </nav>
  </header>

  <RouterView />
  
</template>