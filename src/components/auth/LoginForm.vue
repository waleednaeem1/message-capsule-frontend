<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 25rem;">
      <div class="card-body">
        <h2 class="card-title text-center">Login</h2>
        <form @submit.prevent="loginUser">
          <div class="mb-3">
            <input type="email" class="form-control" v-model="email" placeholder="Email" required>
          </div>
          <div class="mb-3">
            <input type="password" class="form-control" v-model="password" placeholder="Password" required>
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <div class="text-center mt-4">
          <p>Don't have an account? <router-link to="/register" class="text-primary">Sign up here</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async loginUser() {
      // const router = useRouter();
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          email: this.email,
          password: this.password
        });
        console.log('Login response:', response.data);
        if (response.data.status === true) {
          // Save response data in cookies
          Cookies.set('userData', JSON.stringify(response.data));
          this.$router.push({ name: 'messagecapsule' });
        } else {
          console.error('Login failed:', response.data.message);
        }
      } catch (error) {
        console.log(error)
        if (error.response) {
          // Server responded with an error status code
          console.error('Login failed:', error.response.data);
        } else {
          // Request was made but no response was received
          console.error('Login failed: No response received');
        }
      }

    }
  }
};
</script>
