<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    const baseUrl = import.meta.env.VITE_BASE_URL;

    let data = ref('');
    let recherche = ref('');
    let dataFull = ref('');

    const router = useRouter();

    async function getActors() {
        const response = await axios.get(`${baseUrl}/api/actors`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json'
            }
        })
        .then(function (response) {
            data.value = response.data;
            dataFull.value = response.data;
        })
        .catch(function (error) {
            router.push('/login');
        });
    }

    onMounted(() => {
        getActors();
    });

    console.log(data);

    watch(recherche, () => {
        searchActor();
    });


    let editedActorId = ref('');
    let actorFirstName = ref('');
    let actorLastName = ref('');
    let actorNationality = ref('');


    function searchActor() {
        if (dataFull.value) {
            data.value = dataFull.value.filter(actor => actor.title.toLowerCase().includes(recherche.value.toLowerCase()));
        }
    }

    function formShow(currentId) {
        document.querySelector('.form-container').style.display = 'flex';

        actorFirstName.value = data.value.find(actor => actor.id == currentId).firstName;
        actorLastName.value = data.value.find(actor => actor.id == currentId).lastName;
        actorNationality.value = data.value.find(actor => actor.id == currentId).nationalite;
        editedActorId.value = currentId;
    }

    function formHide() {
        document.querySelector('.form-container').style.display = 'none';
        editedActorId.value = '';
        actorFirstName.value = '';
        actorLastName.value = '';
        actorNationality.value = '';
    }

    function editActor(actorId) {
        axios.patch(`${baseUrl}/api/actors/${actorId}`, {
            firstName: actorFirstName.value,
            lastName: actorLastName.value,
        }, {
            headers: {
                'Content-Type': 'application/merge-patch+json'
            }
        })
        .then(function (response) {
            console.log(response);
            getActors();
        })
        .catch(function (error) {
            console.log(error);
        });

        formHide();
    }
</script>

<template>
    <section>
        <h1>Actors</h1>
        <input class="form-input max" type="text" v-model="recherche">
        <!-- <button @click="searchActor()">Rechercher</button> -->
        <div class="film-list-item" v-for="actor in data" :key="actor.id">
            <router-link :to="`/actors/${actor.id}`">
                {{ actor.firstName }} <br>
                {{ actor.lastName }}
            </router-link>
            <button class="btn" @click="formShow(actor.id)">
                modifier
            </button>
        </div>
        <div class="form-container">
            <form @submit.prevent="editActor(editedActorId)">
                <input 
                    class="form-input"
                    type="text"
                    name="title"
                    id="title"
                    v-model="actorFirstName"
                >
                <input 
                    class="form-input"
                    type="text"
                    name="description"
                    id="description"
                    v-model="actorLastName"
                >
                <input 
                    class="form-input"
                    type="text"
                    name="releaseDate"
                    id="releaseDate"
                    v-model="actorNationality"
                >
                <button type="submit" class="btn">
                    Modifier
                </button>
            </form>
            
            <svg
                @click="formHide()"
                class="cross"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24">
                <path
                    class="cross-path"
                    fill="rgb(78, 127, 131)"
                    d="M12 10.586L3.707 2.293 2.293 3.707 10.586 12l-8.293 8.293 1.414 1.414L12 13.414l8.293 8.293 1.414-1.414L13.414 12l8.293-8.293-1.414-1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>
    </section>
</template>