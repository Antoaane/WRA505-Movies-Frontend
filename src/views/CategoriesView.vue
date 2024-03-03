<script setup>
    import { onMounted, ref, watch } from 'vue';
    import axios from 'axios';

    let data = ref('');

    async function getCategories() {
        const response = await axios.get('http://127.0.0.1:8000/api/categories', {
            headers: {
                'Accept': 'application/json'
            }
        });
        data.value = response.data;
    }

    onMounted(() => {
        getCategories();
    });

    console.log(data);
</script>

<template>
    <section>
        <h1>Catégories</h1>
        <div class="film-list-item" v-for="category in data" :key="category.id">
            <router-link :to="`/categories/${category.id}`">
                {{ category.name }} <br>
            </router-link>
        </div>
    </section>
</template>