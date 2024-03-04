<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    const baseUrl = import.meta.env.VITE_BASE_URL;

    let data = ref('');
    const router = useRouter();

    async function getCategories() {
        const response = await axios.get(`${baseUrl}/api/categories`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json'
            }
        })
        .then(function (response) {
            data.value = response.data;
        })
        .catch(function (error) {
            router.push('/login');
        });
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