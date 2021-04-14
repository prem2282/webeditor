<template>
    <q-page>
        <div class="row justify-center q-pr-sm q-pl-sm bg-black">
            <div  class="col-1">
              <q-btn  class="q-ma-xs" @click='goBack' dense round color="primary" icon="arrow_back" />
            </div>
            <div  v-if="editorMode"  class="col">
              <q-btn class="q-ma-xs" no-caps color='grey-10' text-color="white">{{this.title}}</q-btn>
              <q-popup-edit v-model="title" buttons>
                <q-input v-model="title" dense autofocus counter />
              </q-popup-edit>
            </div>
            <div v-else class='col-3'>
              <div class='titleClass'>{{this.title}}</div>
            </div>
            <div class="col">
              <div class="row justify-center">
                <div v-if='editorMode'>
                   <HelpTextEditor
                    :helpText= this.pageContent.helpText
                    :saveHelpText= this.saveHelpText
                    :helpExit= this.helpExit
                   />
                </div>
                <div v-else>
                  <HelpTextViewer
                    :helpText = this.pageContent.helpText
                  />
                </div>
                <q-btn  class="q-ma-xs" v-model='showHTML' @click='showHTML=!showHTML' :color="showHTML ? 'red-8' : 'info'" label="html"/>
                <q-btn  class="q-ma-xs" v-model='showCSS' @click='showCSS=!showCSS' :color="showCSS ? 'cyan-8' : 'info'" label="css"/>
                <q-btn  class="q-ma-xs" v-model='showJS' @click='showJS=!showJS' :color="showJS ? 'lime-8' : 'info'" label="js"/>
              </div>
            </div>
            <div class="col">
              <div class='row float-right'>
                <q-btn dense class="q-ma-xs" @click='updateShowHelp(showHelp)' round color="negative" icon="import_contacts" />
                <q-btn dense class="q-ma-xs" v-model='vertView' round @click='setView(vertView)' color='primary'>
                    <q-icon v-if="vertView" name="view_column" />
                    <q-icon v-else name="vertical_split" />
                </q-btn>
                <q-btn  v-if="editorMode" dense class="q-ma-xs" @click='updateRecord' round color="positive" icon="save" />
              </div>
            </div>

        </div>
        <div :class="vertView?'outerBoxVert':'outerBoxHor'">
            <div v-show="showCodeBlocks" class="codeBox" :class="vertView?'vertView':'horView'">
                <div class="box1 bg-red-8" :class="htmlBoxClass">
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
                  />
                </div>
                <div class="box2 bg-cyan-8" :class="!showCSS ? 'boxclose':''">
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
                    />
                </div>
                <div class="box3 bg-lime-8" :class="!showJS ? 'boxclose':''">
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
                  />
                </div>
            </div>
            <div>
                <iframe class="resultBox" :class="vertView?'vertView':'horView'" :srcDoc="this.pageContent.outputValue" frameborder="0"></iframe>
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

export default {
  data () {
    return {
      showHTML: false,
      showCSS: false,
      showJS: false,
      fullViewHtml: false,
      fullViewCss: false,
      fullViewJs: false
    }
  },
  computed: {
    ...mapGetters('editorData', ['pageContent', 'selectedCode', 'codeList', 'vertView', 'showHelp', 'editorMode']),
    showCodeBlocks: function () {
      return this.showHTML || this.showCSS || this.showJS
    },
    outputValue: function () {
      return this.pageContent.outputValue
    },
    title: {
      get: function () {
        return this.pageContent.title
      },
      set: function (newValue) {
        this.updateTitle(newValue)
      }
    },
    helpText: {
      get: function () {
        return ''
      },
      set: function (newValue) {
        console.log(newValue)
      }
    },
    htmlBoxClass: function () {
      if (!this.showHTML) {
        return 'boxclose'
      } else {
        return ''
      }
    },
    htmlH: function () {
      if (this.vertView) {
        if (this.fullViewHtml) {
          return '80vh'
        } else {
          return '30vh'
        }
      } else {
        return '40vh'
      }
    },
    cssH: function () {
      if (this.vertView) {
        if (this.fullViewCss) {
          return '80vh'
        } else {
          return '30vh'
        }
      } else {
        return '40vh'
      }
    },
    jsH: function () {
      if (this.vertView) {
        if (this.fullViewJs) {
          return '80vh'
        } else {
          return '30vh'
        }
      } else {
        return '40vh'
      }
    }
  },
  components: {
    AceEditor,
    HelpTextEditor,
    HelpTextViewer
  },
  methods: {
    ...mapActions('editorData', ['updatePageContent', 'updateTitle', 'addToCodeList', 'updateToCodeList', 'setView', 'updateShowHelp']),
    updateRecord: async function () {
      console.log('to update:', this.pageContent)
      const createUrl = 'https://prem2282.pythonanywhere.com/api/QuestionList/create'
      let updateUrl = 'https://prem2282.pythonanywhere.com/api/QuestionList/edit/'
      const mydata = {
        id: this.pageContent.id,
        Q_image: '',
        Question: this.pageContent.helpText,
        QuestionType: '2',
        answer_1: this.pageContent.htmlContent,
        answer_1_ind: false,
        answer_2: this.pageContent.cssContent,
        answer_2_ind: false,
        answer_3: this.pageContent.jsContent,
        answer_3_ind: false,
        answer_4: this.pageContent.title,
        answer_4_ind: false,
        answer_5: '',
        answer_5_ind: false,
        answer_6: '',
        answer_6_ind: false,
        board: 'Frontend',
        category: 'Code',
        difficulty: 1,
        lessonNum: 1,
        marks: 1,
        standard: 'CSS',
        subject: 'CSS Basics'
      }

      if (mydata.id > 0) {
        updateUrl = updateUrl + mydata.id
        await axios
          .put(updateUrl, mydata)
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              this.updatePageContent(this.pageContent)
              this.updateToCodeList({ payload: mydata, index: this.pageContent.codeListIndex })
              console.log('updated')
            } else {
              console.log('not updated')
            }
          })
      } else {
        await axios
          .post(createUrl, mydata)
          .then(res => {
            console.log(res)
            if (res.status === 201) {
              console.log('created')
              const payload = {
                htmlContent: this.pageContent.htmlContent,
                cssContent: this.pageContent.cssContent,
                jsContent: this.pageContent.jsContent,
                title: this.pageContent.title,
                helpText: this.pageContent.helpText,
                id: res.data.id
              }
              console.log(payload)
              this.updatePageContent(payload)
              this.addToCodeList(mydata)
            } else {
              console.log('not updated')
            }
          })
      }
    },
    goBack: function () {
      this.$router.push({ path: 'codelist' })
    },
    helpExit: function () {
      this.showHelp = false
    },
    saveHelpText: function () {
      console.log('saving text')
    }

  },
  mounted: function () {
    this.showHTML = true
    this.showCSS = true
    this.showJS = true
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
    0% {width: 00%;}
    100% {width: 100%}
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
