<template>
  <q-page>
    <div>
        <q-btn class='q-ma-sm' @click="createNewCode">Create New</q-btn>
    </div>
    <div :v-if="showData" class="containerClass" >
        <div class="pa-sm" v-for="(code, index) in this.codeList" :key="code.id" :id="code.id">
          <div class="row q-mb-sm">
            <div class='col-1'></div>
            <div class='col-2'>
              <div class="q-pa-sm  bg-blue-1 text-center">{{code.subject}}</div>
              <div class="q-pa-sm  bg-blue-1 text-center">{{code.level}}  {{code.section}}</div>
            </div>
            <div class="col-1 ">
              <div class="q-pa-sm bg-blue-3 text-center align-center seqNumClass">{{code.seq_num}}</div>
            </div>
            <div class="col-6 grid" @click="viewSelected(index)">
              <q-item clickable class="q-pa-sm titleClass">
                <div>{{code.title}}</div>
                </q-item>
            </div>
            <div class="col-1">
              <div class="row">
                <q-btn v-if="isEditor" class='col-12' @click="editSelected(index)" color='blue-4' icon='brush'></q-btn>
                <q-btn v-if="isEditor" class='col-12' @click="deletePrompt(index)" color='blue-6' icon='delete'></q-btn>
              </div>
            </div>

          </div>

            <q-dialog v-model="deleteConfirm" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar icon="delete" color="primary" text-color="white" />
                  <span class="q-ml-sm">Are you sure to delete</span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" @click='cancelDelete' v-close-popup />
                  <q-btn flat label="Yes" color="danger" @click='performDelete' v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
        </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
const targetUrl = 'https://prem2282.pythonanywhere.com/api/CodeList/'

export default {

  data () {
    return {
      deleteConfirm: false,
      deleteMarkedIndex: null
    }
  },
  computed: {
    ...mapGetters('editorData', ['codeList', 'showHelp','editorMode', 'isEditor']),
    showData: function () {
      if (this.codeList) {
        return true
      } else {
        return false
      }
    }
  },

  mounted: function () {
    this.getCodeList()
  },
  methods: {
    ...mapActions('editorData', ['updateCodeList', 'updateCodeListIndex', 'updateSelectedCode', 'updatePageContent', 'updateEditorMode', 'updateShowHelp', 'deleteFromCodeList']),
    getCodeList: async function () {
      if (this.codeList.length === 0) {
        await axios
          .get(targetUrl)
          .then(res => {
            const codelist = res.data
            if (res.data.length > 0) {
              console.log('res.data', codelist)
              this.updateCodeList(res.data)
            } else {
              console.log('no data')
            }
          })
      }
    },

    getSelectedCode: async function (index) {
      this.updateSelectedCode(index)
      const selectedCodeId = this.codeList[index].id
      const codeURL = targetUrl + selectedCodeId
      console.log('codeURL', codeURL)
      if (selectedCodeId > 0) {
        await axios
          .get(codeURL)
          .then(res => {
            console.log('response in codeURL:', res.data)
            if (res.data.id === selectedCodeId) {
              this.updatePageContent(res.data)
              this.updateCodeListIndex(index)
              this.updateShowHelp(this.showHelp)
              this.$router.push({ path: 'editor' })
            } else {
              console.log('no data')
              return null
            }
          })
      }
    },

    editSelected: function (index) {
      const editMode = true
      this.updateEditorMode(editMode)
      this.getSelectedCode(index)
    },
    viewSelected: function (index) {
      const editMode = false
      this.updateEditorMode(editMode)
      this.getSelectedCode(index)
    },

    deletePrompt: function (index) {
      this.deleteConfirm = true
      this.deleteMarkedIndex = index
    },

    cancelDelete: function () {
      this.deleteConfirm = false
      this.deleteMarkedIndex = null
    },

    performDelete: async function () {
      const deleteId = this.codeList[this.deleteMarkedIndex].id
      const deleteURL = targetUrl + 'delete/' + deleteId

      await axios
        .delete(deleteURL)
        .then(res => {
          console.log('deleted', res)
          if (res.status === 204) {
            this.deleteFromCodeList(this.deleteMarkedIndex)
            console.log('deleted from codeList')
            this.deletedMessage('Code Deleted', 'red')
          } else {
            console.log('not deleted')
            this.deletedMessage('Code Not Deleted', 'orange')
          }
        })
    },

    deletedMessage (message, color) {
      this.$q.notify({
        message: message,
        color: color,
        timeout: 1000,
        position: 'center',
        icon: 'save'
      })
    },

    createNewCode: function () {
      const payload = {
        code_1: '',
        code_1_type: '',
        code_2: '',
        code_2_type: '',
        code_3: '',
        code_3_type: '',
        code_4: '',
        code_4_type: '',
        contributor: '',
        description_1: '',
        description_2: '',
        description_3: '',
        id: 0,
        level: '',
        section: '',
        seq_num: '',
        subject: '',
        title: ''
      }
      console.log(payload)
      this.updatePageContent(payload)
      const editMode = true
      this.updateEditorMode(editMode)
      this.$router.push({ path: 'editor' })
    }
  }

}
</script>
<style lang='css' scoped>

.seqNumClass {
  font-size: 2rem;
  height: 100%;
  text-align: center;
  justify-content: center;
  text-shadow: silver;
}

.titleClass {
  height: 100%;
  font-size: 1.7rem;
  color: silver;
  background-color: rgb(58, 58, 63);
  transition: color .5s, background-color .5s, font-size .5s;
  transition-timing-function: ease;
  text-align: center;
}

.titleClass:hover {
  font-size: 1.8rem;
  color:white;
  background-color: rgb(40, 40, 32);
}

.containerClass {
  width: 80vw;

}

</style>
