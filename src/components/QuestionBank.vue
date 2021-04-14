<template>
  <q-page>
    <h6>QuestionBank</h6>
    <div :v-if="showData" >
        <div v-for="(mydata,index) in this.storedData" :key="mydata.id">
            <QuestionBox
            :mydata = mydata
            :index = index
            :updateData = updateData
            />
        </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import QuestionBox from './QuestionBox'
const targetUrl = 'https://prem2282.pythonanywhere.com/api/QuestionList/'

export default {
  components: {
    QuestionBox: QuestionBox
  },
  computed: {
    ...mapGetters('editorData', ['storedData']),
    showData: function () {
      if (this.storedData.length > 0) {
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
    ...mapActions('editorData', ['updateStoredData']),
    updateData: function (index, mydata) {
      const updatedData = [...this.storedData]
      updatedData[index] = mydata
      this.updateStoredData(updatedData)
    },
    getData: async function () {
      const group = {
        category: 'Professional',
        board: 'AWS',
        standard: 'CSAA',
        subject: 'S3',
        lessonNum: '1'
      }
      if (this.storedData.length === 0) {
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
            const newQuizSet = res.data
            if (res.data.length > 0) {
              console.log(newQuizSet)
              this.updateStoredData(res.data)
            } else {
              console.log('no data')
            }
          })
      }
    }
  }
}
</script>
<style lang='css' scoped>
</style>
