<script>
    import { onMounted, ref } from 'vue'
    import axios from 'axios'
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const id = route.params.id

    let data = ref('')

    onMounted(async () => {
        const response = await axios.get("http://127.0.0.1:8000/api/movies/" + id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        data.value = response.data
    })
</script>

<template>
    <section>
        <h1>{{ data.title }}</h1>
        <p>{{ data.description }}</p>
        <p>{{ data.releaseDate }}</p>
    </section>
</template>