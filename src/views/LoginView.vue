<script setup>
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import router from '../router';

    let data = ref('');
    let email = ref('');
    let password = ref('');

    async function login() {
        const response = await axios.post('http://127.0.0.1:8000/api/login_check', {
            "username": email.value,
            "password": password.value
        });
        data.value = response.data;
        
        if (data.code == 401) {
            alert('Mauvais identifiants');
        } else {
            localStorage.setItem('token', data.value.token);
            router.push('/');
            location.reload();
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