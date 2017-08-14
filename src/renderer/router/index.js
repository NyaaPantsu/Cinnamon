import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'torrentlist',
      component: require('@/components/TorrentList')
    },
    {
      path: '/player',
      name: 'player',
      component: require('@/components/Player')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
