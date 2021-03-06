import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'timers',
      component: require('@/components/Timers').default,
    },
    {
      path: '/about',
      name: 'about',
      component: require('@/components/About').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
