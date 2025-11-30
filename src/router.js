import Vue from 'vue';
import Router from 'vue-router';
import Words from './views/Words.vue';
import NewWord from './views/New.vue';
import WordDetail from './views/Show.vue';
import EditWord from './views/Edit.vue';
import Tester from './views/Test.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/words' },
    { path: '/words', name: 'words', component: Words },
    { path: '/words/new', name: 'add', component: NewWord },
    { path: '/words/:id', name: 'detail', component: WordDetail },
    { path: '/words/:id/edit', name: 'edit', component: EditWord },
    { path: '/test', name: 'test', component: Tester }
  ]
});
