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
    // {
    //   path: '/landing-page',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default,
    // },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
