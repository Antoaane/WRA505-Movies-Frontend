import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MoviesView from '../views/MoviesView.vue'
// import MovieDetailView from '../views/MovieDetailView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import ActorsView from '../views/ActorsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView
    },
    // {
    //   path: '/movies/:id',
    //   name: 'movies',
    //   component: MovieDetailView
    // },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView
    },
    {
      path: '/actors',
      name: 'actors',
      component: ActorsView
    }
  ]
})

export default router
