<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="card" style="width: 40rem;">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">View Message Capsule</h2>
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">Message:</th>
              <td>{{ capsule ? capsule.message : '' }}</td>
            </tr>
            <tr>
              <th scope="row">Scheduled Opening Time:</th>
              <td>{{ capsule ? capsule.scheduled_opening_time : '' }}</td>
            </tr>
          </tbody>
        </table>
        <div class="text-center">
          <router-link to="/message-capsule" class="btn btn-primary">Back</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from ".././axios";

export default {
  data() {
    return {
      capsule: null,
    };
  },
  created() {
    this.loadCapsuleData();
  },
  methods: {
    loadCapsuleData() {
      axios.get(`message-capsules/${this.$route.params.id}`
      )
      .then((response) => {
          this.capsule = response.data;
      })
      .catch((error) => {
      console.error('Error fetching capsules:', error);
      });
    },
  }
};
</script>