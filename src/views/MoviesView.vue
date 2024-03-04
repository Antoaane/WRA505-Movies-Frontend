<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { useRoute,useRouter } from 'vue-router';
    import axios from 'axios';
    
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const route = useRoute();
    const router = useRouter();
    
    let data = ref('');
    let dataFull = ref('');
    let categories = ref('');
    let actors = ref('');

    let recherche = ref('');

    let dataTmp = ref([]);
    let moviesUrl = ref('');

    let editedMovieId = ref('');

    let filmTitle = ref('');
    let filmDescription = ref('');
    let filmReleaseDate = ref('');
    let filmDuration = ref('');
    let filmCategorie = ref('');
    let filmActors = ref([]);

    let newFilmTitle = ref('');
    let newFilmDescription = ref('');
    let newFilmReleaseDate = ref('');
    let newFilmDuration = ref('');

    onMounted(() => {
        if (!route.params.id) {
            getFilms();
            getCategories();
        } else {
            getCotageyFilms();
        }

        getActors();
    });

    async function getFilms() {
        const response = await axios.get(`${baseUrl}/api/movies`, {
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

    async function getCategories() {
        const response = await axios.get(`${baseUrl}/api/categories`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json'
            }
        })
        .then(function (response) {
            categories.value = response.data;
        })
        .catch(function (error) {
            router.push('/login');
        });
    }

    async function getActors() {
        const response = await axios.get(`${baseUrl}/api/actors`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json'
            }
        })
        .then(function (response) {
            actors.value = response.data;
        })
        .catch(function (error) {
            router.push('/login');
        });
    }

    async function getCotageyFilms() {
        const response = await axios.get(`${baseUrl}/api/categories/${route.params.id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json'
            }
        });
        moviesUrl = response.data.movies;

        moviesUrl.forEach(async movieUrl => {
            const moviesResponse = await axios.get(`${baseUrl}${movieUrl}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json'
                }
            });
            dataTmp.value.push(moviesResponse.data);
            data.value = dataTmp.value;

            if (data.code == 401) {
                router.push('/login');
            }
        });
    }


    function searchFilm() {
        if (dataFull.value) {
            data.value = dataFull.value.filter(movie => movie.title.toLowerCase().includes(recherche.value.toLowerCase()));
        }
    }

    watch(recherche, () => {
        searchFilm();
    });


    function addFormShow() {
        document.querySelector('.add').style.display = 'flex';
    }

    function editFormShow(currentId) {
        document.querySelector('.edit').style.display = 'flex';

        newFilmTitle.value = data.value.find(movie => movie.id == currentId).title;
        newFilmDescription.value = data.value.find(movie => movie.id == currentId).description;
        newFilmReleaseDate.value = data.value.find(movie => movie.id == currentId).releaseDate;
        newFilmDuration.value = data.value.find(movie => movie.id == currentId).duration;
        editedMovieId.value = currentId;
    }
    
    let newFilm = ref('');

    function addMovie() {

        const newData = {
            title : filmTitle.value,
            description : filmDescription.value,
            releaseDate : filmReleaseDate.value,
            duration : filmDuration.value,
            category : filmCategorie.value,
            actors : filmActors.value
        }

        newFilm = JSON.stringify(newData);

        console.log(JSON.stringify(newData));

        axios.post(`${baseUrl}/api/movies`, newData,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'), 
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            console.log(response);
            getFilms();
        })
        .catch(function (error) {
            alert('Erreur lors de l\'ajout');
        });

        formHide();
    }

    function editMovie(movieId) {
        axios.patch(`${baseUrl}/api/movies/${movieId}`, {
            title: newFilmTitle.value,
            description: newFilmDescription.value,
            releaseDate: newFilmReleaseDate.value,
            duration: newFilmDuration.value
        },
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/merge-patch+json'
            }
        })
        .then(function (response) {
            console.log(response);
            getFilms();
        })
        .catch(function (error) {
            alert('Erreur lors de la modification');
        });

        formHide();
    }

    function deleteMovie(movieId) {
        axios.delete(`${baseUrl}/api/movies/${movieId}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(function (response) {
            console.log(response);
            getFilms();
        })
        .catch(function (error) {
            alert('Erreur lors de la suppression');
        });
    }

    function formHide() {
        document.querySelector('.edit').style.display = 'none';
        document.querySelector('.add').style.display = 'none';

        filmTitle.value = '';
        filmDescription.value = '';
        filmReleaseDate.value = '';
        filmDuration.value = '';
        filmCategorie.value = '';
        filmActors.value = [];

        editedMovieId.value = '';
        newFilmTitle.value = '';
        newFilmDescription.value = '';
        newFilmReleaseDate.value = '';
        newFilmDuration.value = '';
    }
</script>

<template>
    <section>
        <h1>Films</h1>
        <input class="form-input max" type="text" v-model="recherche">
        <button class="btn" @click="addFormShow()">
            Ajouter un film
        </button>
        <pre>
            {{ newFilm }}
        </pre>
        <div class="film-list-item flex" v-for="movie in data" :key="movie.id">
            <router-link class="button m-1" :to="`/movies/${movie.id}`">
                {{ movie.title }} <br>
                {{ movie.description }} <br>
                {{ movie.releaseDate }} <br>
            </router-link>
            <div class="flex flex-col">
                <button class="btn" @click="editFormShow(movie.id)">
                    modifier
                </button>
                <button class="btn" @click="deleteMovie(movie.id)">
                    supprimer
                </button>
            </div>
        </div>
        <div class="add form-container">
            <form @submit.prevent="addMovie()">
                <input 
                    class="form-input"
                    type="text"
                    name="title"
                    id="title"
                    v-model="filmTitle"
                    placeholder="Titre du film"
                >
                <textarea 
                    class="form-input"
                    type="text"
                    name="description"
                    id="description"
                    v-model="filmDescription"
                    placeholder="Description du film"
                ></textarea>
                <input 
                    class="form-input"
                    type="date"
                    name="releaseDate"
                    id="releaseDate"
                    v-model="filmReleaseDate"
                    placeholder="Date de sortie"
                >
                <input 
                    class="form-input"
                    type="number"
                    name="duration"
                    id="duration"
                    v-model="filmDuration"
                    placeholder="Durée du film en minutes"
                >
                <p>Catégorie :</p>
                <select class="form-input" v-model="filmCategorie">
                    <option v-for="category in categories" :key="category.id" :value="'/api/categories/' + category.id">
                        {{ category.name }}
                    </option>
                </select>
                
                <p>Acteurs :</p>
                <div class="form-input w-full h-32 bg-red-500 overflow-auto">
                    <div class="flex items-center" v-for="actor in actors" :key="actor.id">
                        <input
                            class="mr-5"
                            type="checkbox"
                            :value="'/api/actors/' + actor.id"
                            v-model="filmActors"
                        >
                        {{ actor.firstName }} {{ actor.lastName }}
                    </div>
                </div>

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
        <div class="edit form-container">
            <form @submit.prevent="editMovie(editedMovieId)">
                <input 
                    class="form-input"
                    type="text"
                    name="title"
                    id="title"
                    v-model="newFilmTitle"
                >
                <textarea 
                    class="form-input"
                    type="text"
                    name="description"
                    id="description"
                    v-model="newFilmDescription"
                ></textarea>
                <input 
                    class="form-input"
                    type="text"
                    name="releaseDate"
                    id="releaseDate"
                    v-model="newFilmReleaseDate"
                >
                <input 
                    class="form-input"
                    type="text"
                    name="duration"
                    id="duration"
                    v-model="newFilmDuration"
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