<template>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Skill Buddy: Online IDE
        </q-toolbar-title>

        <q-avatar v-if="user.imageUrl">
          <img :src="user.imageUrl" :alt="user.firstName[0]">
          <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
            <p class="q-pa-sm">{{user.fullName}}</p>
            <q-btn flat label="logout" color="blue" @click='logout'></q-btn>
          </q-popup-proxy>
        </q-avatar>
        <div v-else-if="user.firstName">{{user.firstName}}</div>

      </q-toolbar>
    </q-header>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import VueGapi from 'vue-gapi'
Vue.use(VueGapi, {
  clientId: '581878376447-bjftl3716gjl969bdlmcufs9cj47knuo.apps.googleusercontent.com',
  scope: 'profile'
})
export default {
  name: 'MainLayout',

  computed: {
    ...mapGetters('editorData', ['user', 'signedIn'])
  },
  methods: {
    ...mapActions('editorData', ['updateSignedIn']),
    async logout () {
      console.log('logged out')
      await this.$gapi.logout()
      this.updateSignedIn(false)
      console.log('before router push')
      this.$router.push(this.$route.query.redirect || '/signin')
    }
  }
}
</script>
