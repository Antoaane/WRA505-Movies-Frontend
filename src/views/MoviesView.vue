<script setup>
    import { onMounted, ref, watch } from 'vue';
    import axios from 'axios';

    let data = ref('');
    let recherche = ref('');
    let dataFull = ref('');

    async function getFilms() {
        const response = await axios.get('http://localhost/index.php/api/movies', {
            headers: {
                'Accept': 'application/json'
            }
        });
        data.value = response.data;
        dataFull.value = response.data;
    }

    onMounted(() => {
        getFilms();
    });

    console.log(data);

    watch(recherche, () => {
        filtrerPays();
    });


    let editedMovieId = ref('');
    let filmTitle = ref('');

    function filtrerPays() {
        if (dataFull.value) {
            data.value = dataFull.value.filter(movie => movie.title.toLowerCase().includes(recherche.value.toLowerCase()));
        }
    }

    function formShow(currentId) {
        document.querySelector('.form-container').style.display = 'flex';

        filmTitle.value = data.value.find(movie => movie.id == currentId).title;
        editedMovieId.value = currentId;
    }

    function formHide() {
        document.querySelector('.form-container').style.display = 'none';
        editedMovieId.value = '';
        filmTitle.value = '';
    }

    function editMovieTitle(movieId) {
        axios.patch(`http://localhost/index.php/api/movies/${movieId}`, {
            title: filmTitle.value
        }, {
            headers: {
                'Content-Type': 'application/merge-patch+json'
            }
        })
        .then(function (response) {
            console.log(response);
            getFilms();
        })
        .catch(function (error) {
            console.log(error);
        });

        formHide();
    }
</script>

<template>
    <section>
        <h1>Films</h1>
        <input type="text" v-model="recherche">
        <button @click="filtrerPays()">Rechercher</button>
        <div class="film-list-item" v-for="movie in data" :key="movie.id">
            <router-link :to="`/movies/${movie.id}`">
                {{ movie.title }} <br>
                {{ movie.description }} <br>
                {{ movie.releaseDate }} <br>
            </router-link>
            <button class="btn" @click="formShow(movie.id)">
                modifier
            </button>
        </div>
        <div class="form-container">
            <form @submit.prevent="editMovieTitle(editedMovieId)">
                <input 
                    class="form-input"
                    type="text"
                    name="title"
                    id="title"
                    v-model="filmTitle"
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