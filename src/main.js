import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'helloworld', component: () => import('./components/HelloWorld') },
    { path: '/login', name: 'login', component: () => import('./components/auth/LoginForm.vue') },
    { path: '/register', name: 'register', component: () => import('./components/auth/RegisterForm.vue') },
    { path: '/message-capsule', name: 'messagecapsule', component: () => import('./components/messagecapsule/CreateCapsule.vue') },
    { path: '/message-capsule/:id', name: 'ViewCapsule', component: () => import('./components/messagecapsule/ViewCapsule.vue') },
    { path: '/message-capsule/edit/:id', name: 'EditCapsule', component: () => import('./components/messagecapsule/EditCapsule.vue') },
  ]
});

import store from './store';

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
