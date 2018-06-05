import Vue from 'vue';
import Router from 'vue-router';
import helloWrold from '@/components/HelloWorld.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'helloWrold',
      component: helloWrold
    }
  ]
})
