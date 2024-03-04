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
    <div>
        <h1>Login</h1>
        <input type="text" v-model="email" placeholder="E-mail">
        <input type="password" v-model="password" placeholder="Password">
        <button @click="login()">Login</button>
    </div>
</template>