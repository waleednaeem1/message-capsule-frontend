<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Create Message Capsule</h2>
      <button @click="logout" class="btn btn-danger w-25">Logout</button>
    </div>
    <form @submit.prevent="save">
      <div class="mb-3">
        <textarea
          v-model="form.message"
          class="form-control"
          rows="5"
          autofocus
          placeholder="Enter your message here"
        ></textarea>
        <div v-if="errors && errors.message" class="text-danger">
          {{ errors.message[0] }}
        </div>
      </div>
      <div class="mb-3">
        <input
          type="datetime-local"
          class="form-control"
          v-model="form.scheduledOpeningTime"
        />
        <div v-if="errors && errors.scheduled_opening_time" class="text-danger">
          {{ errors.scheduled_opening_time[0] }}
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary w-25"
        :disabled="capsuleValidate"
      >
        Save
      </button>
    </form>

    <div class="mt-5">
      <h2>Capsules</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Message</th>
            <th>Scheduled Opening Time</th>
            <th>Opened</th>
            <th>Created By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="capsule in capsules" :key="capsule.id">
            <td>{{ capsule.message }}</td>
            <td>{{ capsule.scheduled_opening_time }}</td>
            <td>{{ capsule.opened ? "Yes" : "No" }}</td>
            <td>{{ capsule.user.name }}</td>
            <td class="d-flex" v-if="canEditOrView(capsule)">
              <router-link  class="btn btn-info btn-sm me-2" :to="{ path: `/message-capsule/${capsule.id}`}">Show</router-link>
              <router-link  class="btn btn-secondary btn-sm" :to="{ path: `/message-capsule/edit/${capsule.id}`}">Edit</router-link> 
             
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from ".././axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      form: {
        message: "",
        scheduledOpeningTime: null,
      },
      errors: null,
      capsules: [],
      toggleEditModal: false,
      selectedCapsule: null,
    };
  },
  components: {
  },
  mounted() {
    this.fetchCapsules();
  },
  computed: {
    capsuleValidate() {
      if (this.form.message && this.form.scheduledOpeningTime) {
        return false;
      }
      return true;
    },
  },
  methods: {
    reset() {
      this.form = {
        message: "",
        scheduledOpeningTime: null,
      };
    },
    canEditOrView(capsule) {
     var firstDate = new Date(capsule.scheduled_opening_time);
     var secondDate = new Date();
     var userId = '';
      if(Cookies.get('userData')){
      const cookieData = JSON.parse(Cookies.get('userData'));
      userId = cookieData.user?.id;
      if(firstDate < secondDate && capsule.user_id == userId)
      return true;
      //  return firstDate< secondDate;
     }
    },
    save() {
      const payload = {
        message: this.form.message,
        scheduled_opening_time: this.form.scheduledOpeningTime,
      };
      axios.post("message-capsules", payload)
        .then((response) => {
          console.log("Response from server:", response.data);
          this.reset();
          this.fetchCapsules();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors || {};
          } else {
            this.errors = {};
          }
        });
    },
    logout() {
      axios
        .get("/logout")
        .then((response) => {
          console.log(response);
          Cookies.remove("userData");
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          console.error("Error fetching capsules:", error);
        });
    },
    fetchCapsules() {
      axios
        .get("allUnopenedCapsules")
        .then((response) => {
          if ("messageCapsule" in response.data) {
            this.capsules = response.data.messageCapsule;
          } else {
            console.error("Unexpected response format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching capsules:", error);
        });
    },
  },
};
</script>
