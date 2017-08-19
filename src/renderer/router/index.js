import Vue from 'vue'
import Router from 'vue-router'

// layouts
import LayoutDefault from '@/layouts/default.vue'
// pages
import PageHome from '@/pages/Home.vue'
// components
import VideoPlayer from '@/components/VideoPlayer.vue'

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
      path: '*',
      redirect: '/'
    }
  ]
})
