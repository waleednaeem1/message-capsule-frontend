<template>
    <div class="container mt-4">
      <h2>Edit Message Capsule</h2>
      <form @submit.prevent="save">
      <div class="mb-3">
        <input type="hidden" class="form-control" v-model="capsule.user_id">
        <textarea v-if="capsule.message" v-model="capsule.message" class="form-control" rows="5" autofocus placeholder="Enter your message here"></textarea>
        <div v-if="errors && errors.message" class="text-danger">
          {{ errors.message[0] }}
        </div>
      </div>
      <div class="mb-3">
        <input type="datetime-local" class="form-control" v-model="capsule.scheduled_opening_time">
        <div v-if="errors && errors.scheduled_opening_time" class="text-danger">
          {{ errors.scheduled_opening_time[0] }}
        </div>
      </div>
      <button @click="updateData" class="btn btn-primary w-25">Update</button>
      </form>
      </div>
  </template>
  
  <script>
  import axios from '../axios';
  export default {
    data() {
      return {
        capsule: {
          message:'',
          scheduled_opening_time:'',
          user_id:''
        },
        errors: null,
      };
    },
    created() {
      this.fetchCapsules();
    },
    methods: {
      fetchCapsules() {
       axios
        .get("message-capsules/"+this.$route.params.id)
        .then((response) => {
          const {message,scheduled_opening_time,user_id}  =response?.data;
          this.capsule.message=message;
          this.capsule.scheduled_opening_time=scheduled_opening_time;
          this.capsule.user_id=user_id;
                 
        })
        .catch((error) => {
          console.error("Error fetching capsules:", error);
        });
    },
      updateData() {
            axios.put(`message-capsules/${this.$route.params.id}`, this.capsule)
            .then(response => {
              console.log('Response from server:', response?.data);
                this.$router.push({ name: 'messagecapsule' });
            })
            .catch((error) => {  
              console.log(error)
                this.errors = error?.response?.data?.errors || {};
            });
      }
    }
  };
  </script>