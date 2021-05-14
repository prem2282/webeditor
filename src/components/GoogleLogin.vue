<template>
  <div>
    <div v-if="isSignedIn">
      <button @click="logout()" type="button">Logout</button>
      {{ userName }}
    </div>
    <q-btn color="primary" 
    label="Login with Google"
    v-if="!isSignedIn"   
    @click="login()"
    />
  </div>
</template>

<script>

import Vue from 'vue'
import VueGapi from 'vue-gapi'

Vue.use(VueGapi, {
//   apiKey: '<YOUR_API_KEY>',
  clientId: '581878376447-bjftl3716gjl969bdlmcufs9cj47knuo.apps.googleusercontent.com',
//   discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
//   scope: 'https://www.googleapis.com/auth/spreadsheets',
})

export default {
  name: 'login',
  data() {
    return {
      isSignedIn: null, // (1) Track authenticated state
    }
  },
  created() {
    // (2) Subscribe to authentication status changes
    console.log('listening to signin');
    this.$gapi.listenUserSignIn((isSignedIn) => {
      this.isSignedIn = isSignedIn
    })
  },
  methods: {
    // (3) Expose $gapi methods
    login() {
        console.log('logging in');
      this.$gapi.login()
    },
    logout() {
      this.$gapi.logout()
    },
  },
  computed: {
    userName() {
      // (4) Display authenticated user name
      const user = this.$gapi.getUserData()

      if (user) {
        return user.firstName
      }
    },
  },
}

</script>

