<template>
  <div>
    <q-btn color="primary" 
    label="Login with Google"
    v-if="!signedIn"   
    @click="login()"
    />
    <q-btn color="primary" 
    label="SignOut"
    v-else   
    @click="logout()"
    />
  </div>
</template>

<script>

import Vue from 'vue'
import VueGapi from 'vue-gapi'
import { mapGetters, mapActions } from 'vuex'
Vue.use(VueGapi, {
//   apiKey: '<YOUR_API_KEY>',
  clientId: '581878376447-bjftl3716gjl969bdlmcufs9cj47knuo.apps.googleusercontent.com',
  scope: 'profile'
//   discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
//   scope: 'https://www.googleapis.com/auth/spreadsheets',
})

export default {
  name: 'login',

  created() {
    // (2) Subscribe to authentication status changes
    console.log('listening to signin');
    this.$gapi.listenUserSignIn((isSignedIn) => {
    this.updateSignedIn(isSignedIn)
    if (isSignedIn) {
      this.$router.push(this.$route.query.redirect || '/')
    } else {
      this.updateUser({}) 
    }
    })
  },
  methods: {
    // (3) Expose $gapi methods
    ...mapActions('editorData',['updateUser','updateSignedIn']),
    async login() {
      console.log('logging in');
      console.log('origin',window.location.origin);
      await this.$gapi.login()
      const user = this.$gapi.getUserData()
      if (user) {
        console.log('updating user');
        this.updateUser(user)
        this.updateSignedIn(true)
        this.$router.push(this.$route.query.redirect || '/')
      }
    },
    logout() {
      console.log('logged out');
      this.$gapi.logout()
      this.updateSignedIn(false)
    },
  },
  computed: {
    ...mapGetters('editorData', ['user','signedIn']),
    userData() {
      // (4) Display authenticated user name
      const user = this.$gapi.getUserData()
      console.log('user in computed:', user);
      if (user) {
        this.updateUser(user)
        this.updateSignedIn(true)
        return user
      }
    },
  },
}

</script>

