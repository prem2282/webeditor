<template>
  <q-page class="flex flex-center">
    <CodeListPage/>
  </q-page>
</template>

<script>

import CodeListPage from '../components/CodeListPage'
export default {
  name: 'CodeList',
  components: {
    CodeListPage: CodeListPage
  }
}
</script>
