<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import router from '../router';

    const baseUrl = import.meta.env.VITE_BASE_URL;

    let data = ref('');
    let email = ref('');
    let password = ref('');

    async function login() {
        const response = await axios.post(`${baseUrl}/api/login_check`, {
            "username": email.value,
            "password": password.value
        });
        data.value = response.data;
        
        if (data.code == 401) {
            alert('Mauvais identifiants');
        } else {
            localStorage.setItem('token', data.value.token);
            location.reload().then(router.push('/'));
        }
    }
</script>

<template> 
    <div class="w-72 my-20 mx-auto flex flex-col">
        <h1 class="title">Login</h1>
        <input class="form-input !w-full" type="text" v-model="email" placeholder="E-mail">
        <input class="form-input !w-full" type="password" v-model="password" placeholder="Password">
        <button class="btn" @click="login()">Login</button>
    </div>
</template>