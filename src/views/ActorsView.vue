<script setup>
    import CardActeur from '../components/CardActeur.vue';
    import { ref } from 'vue';
    import axios from 'axios';

    const actors = ref([]);

    axios.get('http://localhost/index.php/api/actors?page=1')
        .then((response) => {
            actors.value = response['hydra:member'];
            console.log(actors.value);
        })
        .catch((error) => {
            console.log(error);
        });

</script>

<template>
<h1>Acteurs</h1>

<div class="flex">
    <template v-for="act in actors">
        <p>{{ act }}</p>
        <CardActeur :actor="act"></CardActeur>
    </template>
</div>

</template>