<template>
  <q-page class="flex flex-center">
    <MenuItems/>
    <QuestionBank/>
  </q-page>
</template>

<script>

import QuestionBank from '../components/QuestionBank'
import MenuItems from '../components/MenuItems'
export default {
  name: 'QuizData',
  components: {
    QuestionBank: QuestionBank,
    MenuItems: MenuItems
  }
}
</script>
