<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow p-3 mb-5 bg-white rounded w-100" style="max-width: 400px;">
      <h2 class="mb-4">Register</h2>
      <form @submit.prevent="registerUser" class="mx-3">
        <div class="mb-3">
          <!-- <label for="name" class="form-label">Name</label> -->
          <input type="text" id="name" class="form-control" placeholder="Name" v-model="name" required>
        </div>
        <div class="mb-3">
          <!-- <label for="email" class="form-label">Email</label> -->
          <input type="email" id="email" class="form-control" placeholder="Email" v-model="email" required>
        </div>
        <div class="mb-3">
          <!-- <label for="password" class="form-label">Password</label> -->
          <input type="password" id="password" class="form-control" placeholder="Password" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">Register</button>
      </form>
      <div class="text-center mt-3">
        <p>Already have an account? <router-link to="/login">Sign In here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import router from '../../router';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/register', {
          name: this.name,
          email: this.email,
          password: this.password
        });
        console.log('Registration successful:', response.data);
        if (response.data.status === true) {
          this.$router.push({ name: 'login' });
        }
      } catch (error) {
        console.error('Registration failed:', error.response.data);
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.register-box {
  width: 350px;
  padding: 45px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
.login-link {
  text-align: center;
}

.login-link p {
  margin-top: 20px;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #0056b3;
}
</style>
