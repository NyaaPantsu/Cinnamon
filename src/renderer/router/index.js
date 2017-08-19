import Vue from 'vue'
import Router from 'vue-router'

// layouts
import LayoutDefault from '@/layouts/default.vue'
// pages
import PageHome from '@/pages/Home.vue'
import PageKitsuSearch from '@/pages/KitsuSearch.vue'
// components

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: LayoutDefault,
      children: [
        {
          path: '',
          component: PageHome
        }
      ]
    },
    {
      path: '/kitsusearch',
      name: 'kitsu-search',
      component: LayoutDefault,
      children: [
        {
          path: '',
          component: PageKitsuSearch
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
