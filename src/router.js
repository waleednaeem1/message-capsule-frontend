import Router from 'vue-router';
import LoginForm from './components/auth/LoginForm.vue';
import RegisterForm from './components/auth/RegisterForm.vue';
import ViewCapsule from './components/messagecapsule/ViewCapsule';
import EditCapsule from './components/messagecapsule/EditCapsule';


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: LoginForm
    },
    {
      path: '/about',
      name: 'About',
      component: RegisterForm
    },
    {
      path: '/message-capsule/:id',
      name: 'ViewCapsule',
      component: ViewCapsule
    },
    {
      path: '/message-capsule/edit/:id',
      name: 'EditCapsule',
      component: EditCapsule
    }
  ]
});