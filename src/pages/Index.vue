<template>
  <q-page class="flex flex-center">
    <MainPage/>
  </q-page>
</template>

<script>

import MainPage from '../components/MainPage'

export default {
  name: 'PageIndex',
  components: {
    MainPage: MainPage
  }
}
</script>
