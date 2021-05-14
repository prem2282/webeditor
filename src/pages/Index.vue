<template>
  <q-page class="flex flex-center">
    <GoogleLogin/>
    <EditorPage/>
  </q-page>
</template>

<script>

import EditorPage from '../components/EditorPage'
import GoogleLogin from '../components/GoogleLogin'

export default {
  name: 'PageIndex',
  components: {
    EditorPage: EditorPage,
    GoogleLogin: GoogleLogin
  }
}
</script>
