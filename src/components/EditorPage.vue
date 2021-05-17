<template>
    <q-page>
        <div class="row justify-center q-pr-sm q-pl-sm bg-black">
            <div  class="col-1">
              <q-btn  class="q-ma-xs" @click='goBack' dense round color="primary" icon="home" />
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
              <q-btn  class="q-ma-xs" :label="title_" color="primary"/>
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
                  <HelpTextViewer
                    :helpText = this.pageContent.description_1
                    :title = this.pageContent.title
                  />
                </div>
                <q-btn class="q-ma-xs" round dense icon='add' color="primary" @click="showCdn = true">
                  <q-tooltip content-class="bg-accent">Add Javascript/CSS CDN libriaries</q-tooltip>
                </q-btn>
                <q-btn  class="q-ma-xs" v-model='showHTML' @click='showHTML=!showHTML' :color="showHTML ? 'red-8' : 'info'" label="html">
                  <q-tooltip content-class="bg-accent">HTML editor</q-tooltip>
                </q-btn>
                <q-btn  class="q-ma-xs" v-model='showCSS' @click='showCSS=!showCSS' :color="showCSS ? 'cyan-8' : 'info'" label="css">
                  <q-tooltip content-class="bg-accent">CSS editor</q-tooltip>
                </q-btn>
                <q-btn  class="q-ma-xs" v-model='showJS' @click='showJS=!showJS' :color="showJS ? 'lime-8' : 'info'" label="js">
                  <q-tooltip content-class="bg-accent">Javascript editor</q-tooltip>
                </q-btn>

              </div>
            </div>
            <div class="col">
              <div class='row float-right'>
                <q-btn dense class="q-ma-xs" @click="updateShowHelp(showHelp)" round color="negative" icon="import_contacts">
                  <q-tooltip content-class="bg-accent">Show Help Text</q-tooltip>
                </q-btn>
                <q-btn dense class="q-ma-xs" v-model='vertView' round @click='vertView=!vertView' color='primary'>
                    <q-icon v-if="vertView" name="view_column" />
                    <q-icon v-else name="vertical_split" />
                    <q-tooltip content-class="bg-accent">Toggle View</q-tooltip>
                </q-btn>
                <q-btn  v-if="editorMode" dense class="q-ma-xs" @click='saveClicked' round color="positive" icon="save">
                  <q-tooltip content-class="bg-accent">Save your document</q-tooltip>
                </q-btn>
                <q-btn  dense class="q-ma-xs" @click='backClicked' round color="positive" icon="arrow_back">
                  <q-tooltip content-class="bg-accent">Previous lesson</q-tooltip>
                </q-btn>
                <q-btn  dense class="q-ma-xs" @click='nextClicked' round color="positive" icon="arrow_forward">
                  <q-tooltip content-class="bg-accent">Next lesson</q-tooltip>
                </q-btn>
                <q-btn  dense class="q-ma-xs" round color="blue" @click="showProfile = true" icon="person">
                  <q-tooltip v-model="showProfile"
                  anchor="bottom start" 
                  self="top middle" 
                  content-class="bg-blue"
                  transition-show="rotate"
                  transition-hide="rotate"
                  >
                    <q-btn round dense class="q-ma-xs" color="red" icon="close" @click="showProfile = false"/>                    
                    <p dense v-text="user.fullName" class="text-subtitle1"></p>
                    <p dense v-text="user.email" class="text-subtitle2"></p>
                    <q-btn  dense class="q-ma-xs" color="blue-14" label="Signout"/>
                  </q-tooltip>
                </q-btn>              
              </div>
            </div>

        </div>
        <div :class="vertView?'outerBoxVert':'outerBoxHor'" v-if="!showHelp">
            <div v-show="showCodeBlocks" class="codeBox" :class="vertView?'vertView':'horView'">
                <div v-if="showHTML" class="box1 bg-red-8" :class="htmlBoxClass">
                  <div class='row q-pl-md'>
                    <h6>HTML</h6>
                    <div class='col'>
                      <div class='float-right'>
                        <q-btn v-show="vertView" @click='fullViewHtml=!fullViewHtml'  :icon="fullViewHtml?'close_fullscreen':'open_in_full'"  />
                      </div>
                    </div>
                  </div>
                  <AceEditor
                      :pageContent= this.pageContent
                      editorBox = 'html'
                      :vertView = this.vertView
                      :height = this.htmlH
                      :width = this.aceWidth
                  />
                </div>
                <div v-if="showCSS" class="box2 bg-cyan-8" :class="!showCSS ? 'boxclose':''">
                  <div class='row q-pl-md'>
                    <h6>CSS</h6>
                    <div class='col'>
                      <div class='float-right'>
                        <q-btn v-show="vertView" @click='fullViewCss=!fullViewCss' :icon="fullViewCss?'close_fullscreen':'open_in_full'" />
                      </div>
                    </div>
                  </div>
                    <AceEditor
                        :pageContent= this.pageContent
                        editorBox = 'css'
                        :vertView = this.vertView
                        :height = this.cssH
                        :width = this.aceWidth
                    />
                </div>
                <div v-if="showJS" class="box3 bg-lime-8" :class="!showJS ? 'boxclose':''">
                  <div class='row q-pl-md'>
                    <h6>JS</h6>
                    <div class='col'>
                      <div class='float-right'>
                        <q-btn v-show="vertView" @click='fullViewJs=!fullViewJs' :icon="fullViewJs?'close_fullscreen':'open_in_full'" />
                      </div>
                    </div>
                  </div>
                  <AceEditor
                      :pageContent= this.pageContent
                      editorBox = 'js'
                      :vertView = this.vertView
                      :height = this.jsH
                      :width = this.aceWidth
                  />
                </div>
            </div>
            <div>
                <iframe class="resultBox" :class="vertView?'vertView':'horView'" :srcDoc="this.outputValue" frameborder="0"></iframe>
            </div>
        </div>
    </q-page>
</template>

<script>

import AceEditor from './AceEditor'
import HelpTextEditor from './HelpTextEditor'
import HelpTextViewer from './HelpTextViewer'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import { vertView } from 'src/store/editorData/getters'
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
      fullViewHtml: false,
      fullViewCss: false,
      fullViewJs: false,
      showTitle: false,
      showCdn: false,
      vertView: false,
      showProfile: false,
    }
  },

  computed: {
    ...mapGetters('editorData', ['pageContent', 'selectedCode', 'codeList', 'showHelp', 'editorMode', 'outputValue', 'codeListIndex','user']),
    showCodeBlocks: function () {
      return this.showHTML || this.showCSS || this.showJS
    },
    htmlBoxClass: function () {
      if (!this.showHTML) {
        return 'boxclose'
      } else {
        return ''
      }
    },

    aceWidth: function () {
      let totalEditors = this.showHTML + this.showCSS + this.showJS
      if (this.vertView) {
        return '50vw'
      } else {
        return String(100/totalEditors) + 'vw'
      }
    },
    htmlH: function () {
      return this.aceHeight(this.fullViewHtml)
    },
    cssH: function () {
      return this.aceHeight(this.fullViewCss)
    },
    jsH: function () {
      return this.aceHeight(this.fullViewJs)
    }
  },
  components: {
    AceEditor,
    HelpTextEditor,
    HelpTextViewer
  },

  methods: {
    ...mapActions('editorData', ['updatePageContent', 'updateCDNText', 'addToCodeList', 'updateToCodeList', 'setView', 'updateShowHelp','updateSelectedCode','updateCodeListIndex']),

    aceHeight: function (fullView) {
      let totalEditors = this.showHTML + this.showCSS + this.showJS
      if (this.vertView) {
        if (fullView) {
          if (totalEditors > 1) {
          return '70vh'
          } else {
          return '80vh'
          }
        } else {
          return String(100/totalEditors) + 'vh'
        }
      } else {
        return '40vh'
      }
    },

    updateTempState: function (pageContent) {
      console.log('in updateTempState', pageContent)
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
    },

    nextClicked: function () {
      let index = this.codeListIndex + 1
      if (index === this.codeList.length) {
        index = 0
        this.$q.notify({
        message: 'No more. Already at the end!',
        color: 'red',
        timeout: 1000,
        position: 'top-right',
        icon: 'warning'
        })
      } else {
        console.log('index:', index);
        this.getSelectedCode(index)
      }
    },

    backClicked: function () {
      let index = this.codeListIndex - 1
      if (index === -1) {
        index = 0
        this.$q.notify({
        message: 'No more. Already at the beginning!',
        color: 'red',
        timeout: 1000,
        position: 'top-right',
        icon: 'warning'
      })
      } else {
        this.getSelectedCode(index)
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
              this.updateTempState(this.pageContent)
              this.updateShowHelp(this.showHelp)
            } else {
              console.log('no data')
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
      console.log('to update:', this.pageContent)
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
            console.log(res)
            if (res.status === 200) {
              this.updatePageContent(this.pageContent)
              this.updateTempState(this.pageContent)
              this.updateToCodeList({ payload: mydata, index: this.codeListIndex })
              console.log('updated')
              this.updatedMessage('Document Updated', true)
            } else {
              this.updatedMessage('Document Updated', false)
              console.log('not updated')
            }
          })
      } else {
        console.log('before post', mydata)
        await axios
          .post(createUrl, mydata)
          .then(res => {
            console.log(res)
            if (res.status === 201) {
              // console.log('created')
              // console.log('res.data', res.data)
              // const payload = {
              //   htmlContent: this.pageContent.htmlContent,
              //   cssContent: this.pageContent.cssContent,
              //   jsContent: this.pageContent.jsContent,
              //   headContent: this.pageContent.headContent,
              //   title: this.pageContent.title,
              //   helpText: this.pageContent.helpText,
              //   id: res.data.id
              // }
              // console.log(payload)
              this.updatePageContent(res.data)
              this.addToCodeList(res.data)
              this.updatedMessage('Document Created', true)
            } else {
              this.updatedMessage('Document Not Created', false)
              console.log('not updated')
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
      console.log('saving text')
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

    console.log('in mounted', this.pageContent)
    this.updateTempState(this.pageContent)
    // this.subject_ = this.codeListIndex > 0 ? this.codeList[this.codeListIndex].subject : ''
    // console.log('subject_ in mounted', this.subject_)
  },
  beforeMount: function () {
    console.log('beforeMount')
    console.log('codeList', this.codeList)
    console.log('pageContent', this.pageContent)
    if (!this.pageContent.description_1 & !this.showHelp) {
      this.updateShowHelp(this.showHelp)
    }

    this.showHTML = this.pageContent.code_2 ? true : false
    this.showCSS = this.pageContent.code_3 ? true : false
    this.showJS = this.pageContent.code_4 ? true : false

    this.fullViewHtml = !this.showCSS && !this.showJS
    this.fullViewCss = !this.showHTML && !this.showJS
    this.fullViewJs = !this.showJS && !this.showCSS

    this.vertView = this.fullViewHtml || this.fullViewCss || this.fullViewJs


  }
}

</script>

<style scoped>

.outerBoxVert {
    display: flex;
}

.outerBoxHor {
    display: grid;
}

.vertView {
    width: 50vw;
    display: grid;
    transition: width 1s linear ease-in-out;
    /* min-height: 30vh; */
}
.horView {
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
.codeBox {
    background: darkslateblue;
    /* width: 100vw; */
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
    min-height: 40vh;
    height: 100%;
    padding: 1em;
    border-left: solid 5px  rgb(31, 30, 30);;
    font-family: Arial, Helvetica, sans-serif;

}

</style>
