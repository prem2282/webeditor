<template>
  <q-page>
    <div>
        <q-btn class='q-ma-sm' @click="createNewCode">Create New</q-btn>
    </div>
    <div :v-if="showData" >
        <div class="row" v-for="(code, index) in this.codeList" :key="code.id" :id="code.id">
            <div class="q-pa-sm q-ma-sm bg-red-1">{{code.subject}}</div>
            <div class="q-pa-sm q-ma-sm bg-red-1">{{code.answer_4}}</div>
            <q-btn class='q-ma-sm' @click="editSelected(index)">Edit</q-btn>
            <q-btn class='q-ma-sm' @click="viewSelected(index)">View</q-btn>
        </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
const targetUrl = 'https://prem2282.pythonanywhere.com/api/QuestionList/'

export default {
  computed: {
    ...mapGetters('editorData', ['codeList', 'showHelp']),
    showData: function () {
      if (this.codeList) {
        return true
      } else {
        return false
      }
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    ...mapActions('editorData', ['updateCodeList', 'updateSelectedCode', 'updatePageContent', 'updateEditorMode', 'updateShowHelp']),
    getData: async function () {
      const group = {
        category: 'Code',
        board: 'Frontend',
        standard: 'CSS',
        subject: 'CSS Basics',
        lessonNum: 1
      }
      if (this.codeList.length === 0) {
        await axios
          .get(targetUrl, {
            params: {
              category: group.category,
              board: group.board,
              standard: group.standard,
              subject: group.subject,
              lessonNum: group.lessonNum
            }
          })
          .then(res => {
            const codelist = res.data
            if (res.data.length > 0) {
              console.log(codelist)
              this.updateCodeList(res.data)
            } else {
              console.log('no data')
            }
          })
      }
    },
    editSelected: function (index) {
      const editMode = true
      this.updateEditorMode(editMode)
      this.codeSelected(index)
    },
    viewSelected: function (index) {
      const editMode = false
      this.updateEditorMode(editMode)
      this.codeSelected(index)
    },
    codeSelected: function (index) {
      this.updateSelectedCode(index)
      const selectedCodeData = this.codeList[index]
      const payload = {
        htmlContent: selectedCodeData.answer_1,
        cssContent: selectedCodeData.answer_2,
        jsContent: selectedCodeData.answer_3,
        id: selectedCodeData.id,
        title: selectedCodeData.answer_4,
        helpText: selectedCodeData.Question,
        codeListIndex: index
      }
      console.log(payload)
      this.updatePageContent(payload)
      this.updateShowHelp(this.showHelp)
      this.$router.push({ path: 'editor' })
    },
    createNewCode: function () {
      const payload = {
        htmlContent: '',
        cssContent: '',
        jsContent: '',
        id: 0,
        title: '',
        codeListIndex: '',
        helpText: ''
      }
      console.log(payload)
      this.updatePageContent(payload)
      this.$router.push({ path: 'editor' })
    }
  }

}
</script>
<style lang='css' scoped>

</style>
