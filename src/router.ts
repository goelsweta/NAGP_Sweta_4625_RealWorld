import Vue from 'vue';
import Router from 'vue-router';
import Articles from './views/Articles.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'articles',
      component: Articles,
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/editor/:slug?',
      name: 'article-edit',
      component: () => import('./views/ArticleAddEdit.vue'),
    },
    {
      path: '/article/:slug',
      name: 'article',
      component: () => import('./views/Article.vue'),
    },
  ],
});
