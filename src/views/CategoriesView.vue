<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    let data = ref('');
    const router = useRouter();

    async function getCategories() {
        const response = await axios.get('http://127.0.0.1:8000/api/categories', {
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