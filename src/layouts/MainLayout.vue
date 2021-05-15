<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Skill Buddy: Online IDE
        </q-toolbar-title>
        <q-avatar v-if="user.imageUrl" @click='logout'>
          <img :src="user.imageUrl">
        </q-avatar>
        <div v-else-if="user.firstName">{{user.firstName}}</div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import VueGapi from 'vue-gapi'
import { updateSignedIn } from 'src/store/editorData/mutations'
Vue.use(VueGapi, {
  clientId: '581878376447-bjftl3716gjl969bdlmcufs9cj47knuo.apps.googleusercontent.com',
  scope: 'profile'
})
export default {
  name: 'MainLayout',

  computed: {
  ...mapGetters('editorData', ['user','signedIn'])
  },
  methods: {
    ...mapActions('editorData', ['updateSignedIn']),
    async logout() {
      console.log('logged out');
      await this.$gapi.logout()
      this.updateSignedIn(false)
      console.log('before router push');
      this.$router.push(this.$route.query.redirect || '/signin')
    }
  },
  created() {
    if (!this.signedIn) {
      console.log('pushing to signin');
        this.$router.push(this.$route.query.redirect || '/signin')
    }
  }
}
</script>
