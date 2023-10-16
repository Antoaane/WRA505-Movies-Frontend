<script setup>
const props = defineProps(['actor'])
const actor = props.actor
</script>

<template>
  <div class="card">
    <p>{{ actor.firstName }} {{ actor.lastName }}</p>
    <p>Pays de naissance : {{ actor.nationalite.pays }}</p>
  </div>
</template>