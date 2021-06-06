<template>
    <q-page>
        <q-header class="row justify-center q-pr-sm q-pl-sm bg-black">
            <div  class="col-1">
              <q-btn glossy class="q-ma-xs" @click='goBack' dense round color="primary" icon="home" />
            </div>
            <div  v-if="editorMode"  class="col-2">
              <q-btn  class="q-ma-xs" label="title" color="primary" @click="showTitle = true" />
              <q-dialog v-model="showTitle">
                <q-card>
                  <q-card-section>
                    <div class="text-h6">Update Title</div>
                    <q-input v-model="subject_" label="Subject" placeholder="" hint="" dense="dense" />
                    <q-input v-model="level_" label="Level" placeholder="" hint="" dense="dense" />
                    <q-input v-model="section_" label="Section" placeholder="" hint="" dense="dense" />
                    <q-input v-model="seq_num_" label="Lesson num" placeholder="" hint="" dense="dense" />
                    <q-input v-model="title_" label="Title" placeholder="" hint="" dense="dense" />
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" @click='updateTitleData' v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
            <div v-else class='col-2'>
              <q-btn  class="q-ma-xs" :label="seq_num_ + '. ' + title_" color="transparent"/>
            </div>

            <div class="col-1">
              <q-dialog v-model="showCdn">
                <q-card style="width: 50vw">
                  <q-card-section>
                    <div class="text-p1">Add Javascript CDN</div>
                    <q-input v-model="head_" label="js cdn" placeholder="" hint="" dense="dense" />
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" @click='updateCDNText(head_)' v-close-popup>
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
            <div class="col-3">
              <div class="row justify-center">
                <div v-if='editorMode'>
                  <HelpTextEditor
                    :helpText= this.pageContent.description_1
                    :saveHelpText= this.saveHelpText
                    :helpExit= this.helpExit
                  />
                </div>
                <div v-else>
                  <div>
                      <q-dialog
                      v-model="showHelpText"
                      >
                        <q-card>
                          <q-card-section class="helpTextClass">
                            <div v-html="this.pageContent.description_1"></div>
                          </q-card-section>
                        </q-card>
                      </q-dialog>
                  </div>
                </div>
                <q-btn class="q-ma-xs" round dense glossy icon='add' color="black" @click="showCdn = true">
                  <q-tooltip content-class="bg-accent">Add Javascript/CSS CDN libriaries</q-tooltip>
                </q-btn>
                <q-btn glossy dense class="q-ma-xs" v-model='showHTML' @click='showHTML=!showHTML' :color="showHTML ? 'black' : 'black'" :text-color="showHTML ? 'white' : 'grey'" label="html">
                  <q-tooltip content-class="bg-accent">HTML editor</q-tooltip>
                </q-btn>
                <q-btn glossy  class="q-ma-xs" v-model='showCSS' @click='showCSS=!showCSS' :color="showCSS ? 'black' : 'black'" :text-color="showCSS ? 'white' : 'grey'" label="css">
                  <q-tooltip content-class="bg-accent">CSS editor</q-tooltip>
                </q-btn>
                <q-btn glossy  class="q-ma-xs" v-model='showJS' @click='showJS=!showJS' :color="showJS ? 'black' : 'black'" :text-color="showJS ? 'white' : 'grey'"  label="js ">
                  <q-tooltip content-class="bg-accent">Javascript editor</q-tooltip>
                </q-btn>
              </div>
            </div>
            <div class="col">
              <div class='row float-right'>
                <q-btn dense glossy class="q-ma-xs" @click="updateShowHelp(showHelp)" round color="negative" icon="import_contacts">
                  <q-tooltip content-class="bg-accent">Show Help Text</q-tooltip>
                </q-btn>
                <q-btn dense glossy class="q-ma-xs" v-model='view' round @click='changeView' color='primary'>
                    <q-icon v-if="view === 'vertical'" name="view_column" />
                    <q-icon v-else-if="view === 'horizontal'" name="vertical_split" />
                    <q-icon v-else name="view_module" />
                    <q-tooltip content-class="bg-accent">Change view</q-tooltip>
                </q-btn>
                <q-btn glossy v-if="editorMode" dense class="q-ma-xs" @click='saveClicked' round color="positive" icon="save">
                  <q-tooltip content-class="bg-accent">Save your document</q-tooltip>
                </q-btn>
                <q-btn glossy dense class="q-ma-xs" @click='backClicked' round color="positive" icon="arrow_back">
                  <q-tooltip content-class="bg-accent">Previous lesson</q-tooltip>
                </q-btn>
                <q-btn glossy dense class="q-ma-xs" @click='nextClicked' round color="positive" icon="arrow_forward">
                  <q-tooltip content-class="bg-accent">Next lesson</q-tooltip>
                </q-btn>
                <q-avatar glossy pointer class="q-ma-xs" size='lg'>
                  <img :src="user.imageUrl">
                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                      <p class="q-pa-sm">{{user.fullName}}</p>
                      <q-btn flat label="logout" color="blue" @click='logout'></q-btn>
                    </q-popup-proxy>
                </q-avatar>
              </div>
            </div>

        </q-header>
        <div :class="outerBoxClass" v-if="!showHelp">
            <div v-show="showCodeBlocks" class="codeBox" :class="codeBoxClass">
                <div v-if="showHTML" class="box1 bg-red-8" :class="!showHTML ? 'boxclose':''">
                  <AceEditor
                      :pageContent= this.pageContent
                      editorBox = 'html'
                      :view = this.view
                      :height = this.aceHeight
                      :width = this.aceWidth
                  />
                </div>

                <div v-if="showCSS" class="box2 bg-cyan-8" :class="!showCSS ? 'boxclose':''">
                    <AceEditor
                        :pageContent= this.pageContent
                        editorBox = 'css'
                        :view = this.view
                        :height = this.aceHeight
                        :width = this.aceWidth
                    />
                </div>
                <div v-if="showJS" class="box3 bg-lime-8" :class="!showJS ? 'boxclose':''">
                  <AceEditor
                      :pageContent= this.pageContent
                      editorBox = 'js'
                      :view = this.view
                      :height = this.aceHeight
                      :width = this.aceWidth
                  />
                </div>
            </div>
            <q-separator v-if="view !== 'horizontal'" vertical size='10px' color='black' v-touch-pan.horizontal.prevent.mouse="handlePanVertBlock"/>
            <q-separator else size='15px' color='black' v-touch-pan.vertical.prevent.mouse="handlePanHorizBlock"/>
            <div>
                <iframe class="resultBox" :width="resultBoxWidth" :class="resultBoxClass" :srcDoc="this.outputValue" frameborder="0"></iframe>
            </div>
        </div>
        <div v-else class="emptyback"></div>
    </q-page>
</template>

<script>

import AceEditor from './AceEditor'
import HelpTextEditor from './HelpTextEditor'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
const targetUrl = 'https://prem2282.pythonanywhere.com/api/CodeList/'
export default {
  data () {
    return {
      subject_: '',
      level_: '',
      section_: '',
      seq_num_: '',
      title_: '',
      head_: '',
      showHTML: false,
      showCSS: false,
      showJS: false,
      showTitle: false,
      showCdn: false,
      view: 'horizontal',
      showProfile: false,
      vertCodeEnd: 0,
      horizCodeEnd: 0,
      codeBoxHeight: 0,
      dummyKey: process.env.VUE_CLI_DUMMY_KEY
    }
  },

  computed: {
    ...mapGetters('editorData', ['pageContent', 'selectedCode', 'codeList', 'showHelp', 'editorMode', 'outputValue', 'codeListIndex', 'user']),
    showCodeBlocks: function () {
      return this.showHTML || this.showCSS || this.showJS
    },
    outerBoxClass: {
      get: function () {
        switch (this.view) {
          case 'vertical':
            return 'flexBox'
          case 'horizontal':
            return 'gridBox'
          case 'stack':
            return 'flexBox'
          default:
            return 'flexBox'
        }
      }
    },
    codeBoxClass: {
      get: function () {
        switch (this.view) {
          case 'vertical':
            return 'gridBox'
          case 'horizontal':
            return 'flexBox'
          case 'stack':
            return 'flexBox'
          default:
            return 'gridBox'
        }
      }
    },
    resultBoxClass: {
      get: function () {
        switch (this.view) {
          case 'vertical':
            return 'gridBox'
          case 'horizontal':
            return 'flexBox'
          case 'stack':
            return 'gridBox'
          default:
            return 'gridBox'
        }
      }
    },

    resultBoxWidth: {
      get: function () {
        switch (this.view) {
          case 'vertical':
            if (this.vertCodeEnd > 0) {
              return window.innerWidth - this.vertCodeEnd
            } else {
              return window.innerWidth
            }
          case 'horizontal':
            return window.innerWidth
          case 'stack':
            if (this.vertCodeEnd > 0) {
              return window.innerWidth - this.vertCodeEnd
            } else {
              return window.innerWidth
            }
          default:
            if (this.vertCodeEnd > 0) {
              return window.innerWidth - this.vertCodeEnd
            } else {
              return window.innerWidth
            }
        }
      }
    },

    showHelpText: {
      get: function () {
        return this.showHelp
      },
      set: function () {
        this.updateShowHelp(this.showHelp)
      }
    },
    htmlBoxClass: function () {
      if (!this.showHTML) {
        return 'boxclose'
      } else {
        return ''
      }
    },

    aceHeight: function (fullView) {
      const totalEditors = this.showHTML + this.showCSS + this.showJS
      if (this.view === 'vertical') {
        if (fullView) {
          return '90vh'
        } else {
          return String(100 / totalEditors) + 'vh'
        }
      } else if (this.view === 'horizontal') {
        if (this.horizCodeEnd > 0) {
          return String(this.horizCodeEnd) + 'px'
        } else {
          return '40vh'
        }
      } else {
        return '90vh'
      }
    },

    aceWidth: function () {
      const totalEditors = this.showHTML + this.showCSS + this.showJS
      if (this.view === 'vertical') {
        if (this.vertCodeEnd > 0) {
          return String(this.vertCodeEnd) + 'px'
        } else {
          return '30vw'
        }
      } else if (this.view === 'horizontal') {
        return String(100 / totalEditors) + 'vw'
      } else {
        if (this.vertCodeEnd > 0) {
          return String(this.vertCodeEnd / totalEditors) + 'px'
        } else {
          return '25vw'
        }
      }
    }

    // codeBlockWidth: function () {
    //   if (this.view === 'vertical') {
    //     return this.aceWidth
    //   } else if (this.view === 'horizontal') {
    //     return '100vw'
    //   } else {
    //     const totalEditors = this.showHTML + this.showCSS + this.showJS
    //     return String(100 / totalEditors) + 'vw'
    //   }
    // }
  },
  components: {
    AceEditor,
    HelpTextEditor
  },

  methods: {
    ...mapActions('editorData', ['updatePageContent', 'updateCDNText', 'addToCodeList', 'updateToCodeList', 'setView', 'updateShowHelp', 'updateSelectedCode', 'updateCodeListIndex']),

    logout: function () {
      console.log('nothing happens yet')
    },
    updateTempState: function (pageContent) {
      this.subject_ = pageContent.subject
      this.level_ = pageContent.level
      this.section_ = pageContent.section
      this.seq_num_ = pageContent.seq_num
      this.title_ = pageContent.title
      this.head_ = pageContent.code_1
    },

    updateTitleData: function () {
      this.pageContent.subject = this.subject_
      this.pageContent.level = this.level_
      this.pageContent.section = this.section_
      this.pageContent.seq_num = this.seq_num_
      this.pageContent.title = this.title_
      this.pageContent.code_1 = this.head_
      this.updatePageContent(this.pageContent)
      this.saveClicked()
    },

    nextClicked: function () {
      const currentCode = this.codeList[this.codeListIndex]
      const subset = this.codeList.filter(code => code.subject === this.codeList[this.codeListIndex].subject)
      const indexInSubset = subset.indexOf(currentCode)
      const nextIndex = indexInSubset + 1
      if (nextIndex === subset.length) {
        this.$q.notify({
          message: 'No more. Already at the end!',
          color: 'red',
          timeout: 1000,
          position: 'top-right',
          icon: 'warning'
        })
      } else {
        const codeId = subset[nextIndex].id
        this.getSelectedCode(codeId)
      }
    },

    backClicked: function () {
      const currentCode = this.codeList[this.codeListIndex]
      const subset = this.codeList.filter(code => code.subject === this.codeList[this.codeListIndex].subject)
      const indexInSubset = subset.indexOf(currentCode)
      const nextIndex = indexInSubset - 1
      if (nextIndex === -1) {
        this.$q.notify({
          message: 'No more. Already at the beginning!',
          color: 'red',
          timeout: 1000,
          position: 'top-right',
          icon: 'warning'
        })
      } else {
        const codeId = subset[nextIndex].id
        this.getSelectedCode(codeId)
      }
    },
    changeView: function () {
      if (this.view === 'vertical') {
        this.view = 'horizontal'
      } else if (this.view === 'horizontal') {
        this.view = 'stack'
      } else {
        this.view = 'vertical'
      }
    },
    getSelectedCode: async function (id) {
      this.updateSelectedCode(id)
      const selectedCodeId = id
      const codeURL = targetUrl + selectedCodeId
      if (selectedCodeId > 0) {
        await axios
          .get(codeURL)
          .then(res => {
            if (res.data.id === selectedCodeId) {
              this.updatePageContent(res.data)
              this.updateCodeListIndex(id)
              this.updateTempState(this.pageContent)
              this.updateShowHelp(this.showHelp)
            } else {
              return null
            }
          })
      }
    },

    saveClicked: function () {
      const { subject, level, section, title } = this.pageContent
      if (subject && level && section && title) {
        this.updateRecord()
      } else {
        this.showTitle = true
      }
    },

    updateRecord: async function () {
      const createUrl = 'https://prem2282.pythonanywhere.com/api/CodeList/create'
      let updateUrl = 'https://prem2282.pythonanywhere.com/api/CodeList/edit/'

      const mydata = {
        id: this.pageContent.id,
        subject: this.pageContent.subject,
        level: this.pageContent.level,
        section: this.pageContent.section,
        seq_num: this.pageContent.seq_num,
        title: this.pageContent.title,
        contributor: this.pageContent.contributor,
        description_1: this.pageContent.description_1,
        description_2: this.pageContent.description_2,
        description_3: this.pageContent.description_3,
        code_1: this.pageContent.code_1,
        code_1_type: 'head',
        code_2: this.pageContent.code_2,
        code_2_type: 'html',
        code_3: this.pageContent.code_3,
        code_3_type: 'css',
        code_4: this.pageContent.code_4,
        code_4_type: 'js'
      }

      if (mydata.id > 0) {
        updateUrl = updateUrl + mydata.id
        await axios
          .put(updateUrl, mydata)
          .then(res => {
            if (res.status === 200) {
              this.updatePageContent(this.pageContent)
              this.updateTempState(this.pageContent)
              this.updateToCodeList({ payload: mydata, index: this.codeListIndex })
              this.updatedMessage('Document Updated', true)
            } else {
              this.updatedMessage('Document Updated', false)
            }
          })
      } else {
        await axios
          .post(createUrl, mydata)
          .then(res => {
            if (res.status === 201) {
              this.updatePageContent(res.data)
              this.addToCodeList(res.data)
              this.updatedMessage('Document Created', true)
            } else {
              this.updatedMessage('Document Not Created', false)
            }
          })
      }
    },
    goBack: function () {
      this.$router.push({ path: 'codelist' })
    },
    helpExit: function () {
      this.updateShowHelp(this.showHelp)
    },
    saveHelpText: function () {
    },

    handlePanVertBlock: function ({ evt, ...info }) {
      // const elementBox = document.getElementsByClassName('resultBox')[0]
      this.vertCodeEnd = info.position.left
    },
    handlePanHorizBlock: function ({ evt, ...info }) {
      if (info.isFirst) {
        this.codeBoxHeight = document.getElementsByClassName('codeBox')[0].offsetHeight
      } else {
        const headerBoxHeight = document.getElementsByClassName('aceHeading')[0].offsetHeight
        this.horizCodeEnd = this.codeBoxHeight - headerBoxHeight + info.offset.y
      }
    },

    updatedMessage (message, success) {
      const color = success ? 'green' : 'red'

      this.$q.notify({
        message: message,
        color: color,
        timeout: 1000,
        position: 'top-right',
        icon: 'save'
      })
    }

  },
  mounted: function () {
    this.updateTempState(this.pageContent)
  },
  beforeMount: function () {
    if (!this.pageContent.description_1 & !this.showHelp) {
      this.updateShowHelp(this.showHelp)
    }

    this.showHTML = !!this.pageContent.code_2
    this.showCSS = !!this.pageContent.code_3
    this.showJS = !!this.pageContent.code_4
  }
}

</script>

<style scoped>

.topClass {
  z-index: 9;
}
.flexBox {
    display: flex;
}

.gridBox {
    display: grid;
}

.horResult {
    width: 100vw;
    display: flex;
    /* min-height: 50vh; */
}

.showHeader {
    color: white;
    padding-left: 1em;
}
.hideHeader {
    color: darkslateblue;
    padding-left: 1em;
}
.box1, .box2, .box3 {
    margin: .1em;
    color: cornsilk;
    font-size: 1.2em;
    animation: boxAppear 1s ease-in-out;
    width: 100%;
    min-height: inherit;
}

.box1{
    background-color: $red-6;
}
.box2{
    background: coral;
}
.box3{
    background: darkgreen;
}

.boxclose{
    width: 0;
    height: 0;
    text-overflow: none;
    animation: boxDisAppear 1s ease-in;
}

.emptyback{
  background: black;
  width: 100vw;
  height: 100vh;
  opacity: 50%;
}

@keyframes boxAppear {
    0% {height: 00%;}
    100% {height: 100%}
}

@keyframes boxDisAppear {
    0% {width:100%; height:100%}
    100% {width: 0%; height: 0%}
}

h6{
    line-height: unset;
    margin: .1em;
}

.titleClass{
  margin-top: .3em;
  padding-left: .3em;
  font-size: 1.5em;
  text-align: center;
  color: aliceblue;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.resultBox{
    background: whitesmoke;
    min-height: 50vh;
    height: 100%;
    padding: .5em;
    border-left: solid 0px  rgb(31, 30, 30);;
    font-family: Arial, Helvetica, sans-serif;

}

</style>
