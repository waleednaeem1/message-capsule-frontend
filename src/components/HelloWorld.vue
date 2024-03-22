<template>
  <div class="home">
    <h1 class="heading">Welcome to Dealers United</h1>
    <div class="buttons">
      <router-link to="/login" class="btn">Login</router-link>
      <router-link to="/register" class="btn">Register</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.heading {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
