<template>
  <q-page>
    <Header/>
    <div
      class = 'q-ma-lg'
      v-for="(subject, index) in this.subjects"
      :key="subject+index"
      :id="subject+index"
    >
      <div class = "row q-ma-lg">
        <div class = "text-h4">{{subject}}</div>
        <div>
          <q-btn v-if="isEditor" class="q-ml-lg" @click="createNewCode" icon="add">Create New</q-btn>
        </div>
      </div>
      <div class="containerClass row q-pa-xl bg-blue-1">
        <div
          class="q-pa-sm col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 inline"
          v-for="code in codeList.filter(code => code.subject === subject)"
          :key="code.id"
          :id="code.id"
        >
          <div class="col-12-xs col-6-sm col-3-xl q-ma-xs" >
            <q-card class="card-class my-card text-white row">
              <q-card-section  class="col-10  " @click="viewSelected(code.id)">
                <div class="text-h6">{{ code.seq_num }}. {{ code.title }}</div>
                <div class="text-subtitle2 text-grey">
                  {{ code.subject }} {{ code.section }}
                </div>
              </q-card-section>

              <q-card-actions  class="col q-ma-xs justify-center" v-if="isEditor">
                <q-btn
                  icon="brush"
                  class="bg-black"
                  @click="editSelected(code.id)"
                  text-color="yellow"
                  dense
                  glossy
                  round
                ></q-btn>
                <q-btn
                  icon="delete"
                  class="bg-black"
                  @click="deletePrompt(code.id)"
                  text-color="red-4"
                  dense
                  round
                  glossy
                ></q-btn>
                <q-btn
                  icon="file_copy"
                  class="bg-black"
                  @click="duplicate(code.id)"
                  text-color="grey-8"
                  dense
                  round
                  glossy
                ></q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <q-dialog v-model="deleteConfirm">
            <q-card>
              <q-card-section>
                <div class="text-h6">Delete Confirmation</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                Are you sure you want to delete?
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn class="negative" flat label="Yes.Delete it" @click="performDelete" />
                <q-btn flat label="No" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import Header from '../components/Header'
const targetUrl = 'https://prem2282.pythonanywhere.com/api/CodeList/'

export default {
  data () {
    return {
      deleteConfirm: false,
      deleteMarkedId: null,
      cardClass: 'my-card bg-black text-white q-ma-sm',
      showData: false
    }
  },

  components: {
    Header
  },
  computed: {
    ...mapGetters('editorData', [
      'codeList',
      'showHelp',
      'editorMode',
      'isEditor',
      'subjects',
      'signedIn'
    ])
  },

  beforeMount: function () {
    if (!this.signedIn) {
      console.log('not signed in ')
      this.$router.push({ path: '/signin' })
    } else {
      this.getCodeList()
    }
  },

  methods: {
    ...mapActions('editorData', [
      'updateCodeList',
      'updateCodeListIndex',
      'updateSelectedCode',
      'updatePageContent',
      'updateEditorMode',
      'updateShowHelp',
      'deleteFromCodeList'
    ]),
    getCodeList: async function () {
      if (this.codeList.length === 0) {
        await axios.get(targetUrl).then(res => {
          if (res.data.length > 0) {
            this.updateCodeList(res.data)
            this.subjects = [...new Set(res.data.map(item => item.subject))]
            this.showData = true
          } else {
            console.log('no data')
          }
        })
      }
    },

    getSelectedCode: async function (id) {
      this.updateSelectedCode(id)
      const selectedCodeId = id
      const codeURL = targetUrl + selectedCodeId
      if (selectedCodeId > 0) {
        await axios.get(codeURL).then(res => {
          if (res.data.id === selectedCodeId) {
            this.updatePageContent(res.data)
            this.updateCodeListIndex(id)
            this.updateShowHelp(this.showHelp)
            this.$router.push({ path: 'editor' })
          } else {
            return null
          }
        })
      }
    },

    getSelectedCodeForDuplicate: async function (id) {
      const codeURL = targetUrl + id
      let code = {}
      if (id > 0) {
        await axios.get(codeURL).then(res => {
          code = res.data
        })
      } else {
        code = null
      }
      return code
    },

    editSelected: function (id) {
      const editMode = true
      this.updateEditorMode(editMode)
      this.getSelectedCode(id)
    },
    viewSelected: function (id) {
      const editMode = false
      this.updateEditorMode(editMode)
      this.getSelectedCode(id)
    },

    deletePrompt: function (id) {
      this.deleteConfirm = true
      this.deleteMarkedId = id
    },

    cancelDelete: function () {
      this.deleteConfirm = false
      this.deleteMarkedId = null
    },

    performDelete: async function () {
      this.deleteConfirm = false
      const deleteURL = targetUrl + 'delete/' + this.deleteMarkedId

      await axios.delete(deleteURL).then(res => {
        if (res.status === 204) {
          this.deleteFromCodeList(this.deleteMarkedId)
          this.deletedMessage('Code Deleted', 'red')
        } else {
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

    codeData: async function (id) {
      let payload = {}
      if (id) {
        const code = await this.getSelectedCodeForDuplicate(id)
        code.id = 0
        code.seq_num = ''
        code.title = ''
        payload = code
      } else {
        payload = {
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
      }
      return payload
    },
    createNewCode: function () {
      const payload = this.codeData()
      this.updatePageContent(payload)
      const editMode = true
      this.updateEditorMode(editMode)
      this.$router.push({ path: 'editor' })
    },
    duplicate: async function (id) {
      const payload = await this.codeData(id)
      this.updatePageContent(payload)
      const editMode = true
      this.updateEditorMode(editMode)
      this.$router.push({ path: 'editor' })
    }
  }
}
</script>
<style lang="css" scoped>
.seqNumClass {
  font-size: 1.1rem;
  height: 100%;
  text-align: center;
  justify-content: center;
  text-shadow: silver;
}

.titleClass {
  height: 100%;
  font-size: 1rem;
  color: silver;
  background-color: rgb(58, 58, 63);
  transition: color 0.5s, background-color 0.5s, font-size 0.5s;
  transition-timing-function: ease;
  text-align: center;
}

.titleClass:hover {
  font-size: 1.1rem;
  color: white;
  background-color: rgb(40, 40, 32);
}

.containerClass {
  width: 100vw;
}

.card-class {
  /* width: 100%; */
  background-color: rgb(16, 15, 22);
  cursor: pointer;
}

.my-card {
  transition: color 0.5s, background-color 0.5s, font-size 0.5s;
  transition-timing-function: ease;
}

.my-card:hover {
  background-color: rgb(26, 25, 31);
  color: gray;
}

</style>
