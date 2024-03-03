import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MoviesView from '../views/MoviesView.vue'
import MovieCard from '../views/MovieCard.vue'
import ActorsView from '../views/ActorsView.vue'
import ActorCard from '../views/ActorCard.vue'
import CategoriesView from '../views/CategoriesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView
    },
    {
      path: '/movies/:id',
      name: 'movie-card',
      component: MovieCard,
      props: true
    },
    {
      path: '/actors/:id',
      name: 'actor-card',
      component: ActorCard,
      props: true
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView
    },
    {
      path: '/categories/:id',
      name: 'categories-movies',
      component: MoviesView,
      props: true
    },
    {
      path: '/actors',
      name: 'actors',
      component: ActorsView
    }
  ]
})

export default router
