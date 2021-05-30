<template>
  <div>
  <div class='row'>
    <div class='col'>
        <q-btn dense :label="editorBox" class='float-left q-mr-lg' color="transparent">
        </q-btn>
        <q-btn
          class='q-mr-sm'
          rounded
          dense
          glossy
          @click="clearBox()"
          :icon="clearView?'replay':'delete_sweep'">
          <q-tooltip content-class="bg-black">{{clearView?'load all':'remove all'}}</q-tooltip>
        </q-btn>
        <q-btn
          :disable="showingLines.length === lines.length"
          class='q-mr-sm'
          rounded
          dense
          glossy
          @click="stepInto()"
          icon='redo'>
          <q-tooltip content-class="bg-black">step line by line</q-tooltip>
        </q-btn>
        <q-btn
        v-if="stepView & showingLines.length > 0"
        class='q-mr-sm'
        rounded
        dense
        glossy
        @click="undoStepInto()"
        icon='undo'>
        <q-tooltip content-class="bg-black">undo last step</q-tooltip>
        </q-btn>
      <div class='float-right'>
        <q-btn dense v-show="vertView" @click='setHeightUp()'  icon='open_in_full' />
        <q-btn dense v-show="vertView" @click='setHeightDown()'  icon='close_fullscreen'/>
      </div>
    </div>
  </div>
  <div class="container">
    <AceEditor
      v-model="mycontent"
      @init="editorInit"
      :lang=this.editorBox
      theme="monokai"
      :width=this.width
      :height=this.height_
      :options="{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        fontSize: '10pt',
        highlightActiveLine: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 1,
        showPrintMargin: false,
        showGutter: true
      }"
      :commands="[
        {
          name: 'save',
          bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
          exec: dataSumit,
          readOnly: true
        }
      ]"
    />
    </div>
  </div>
</template>

<script>

import AceEditor from 'vuejs-ace-editor'
import { mapActions } from 'vuex'
export default {

  data: function () {
    return {
      dummyData: 'dummy data',
      showingLines: [],
      showLine: [],
      lines: [],
      height: 40,
      stepView: false,
      splitted: false,
      clearView: false
    }
  },

  props: ['pageContent', 'editorBox', 'vertView', 'width', 'fullView'],
  components: {
    AceEditor
  },
  computed: {
    height_: {
      get: function () {
        if (this.height) {
          return String(this.height) + 'vh'
        } else {
          return '40vh'
        }
      }
    },
    mycontent: {
      get: function () {
        let value = ''
        if (this.editorBox === 'html') {
          value = this.pageContent.code_2
        }
        if (this.editorBox === 'css') {
          value = this.pageContent.code_3
        }
        if (this.editorBox === 'js') {
          value = this.pageContent.code_4
        }
        if (this.clearView) {
          value = ''
        } else {
          value = this.showingLines.join('\n')
        }

        if (this.stepView) {
          value = this.showingLines.join('\n')
        }

        return value
      },
      // setter
      set: function (newValue) {
        const payload = this.pageContent

        if (this.editorBox === 'html') {
          payload.code_2 = newValue
        }
        if (this.editorBox === 'css') {
          payload.code_3 = newValue
        }
        if (this.editorBox === 'js') {
          payload.code_4 = newValue
        }
        this.updatePageContent(payload)
      }
    }
  },
  mounted: function () {
    let value = ''
    if (this.editorBox === 'html') {
      value = this.pageContent.code_2
    }
    if (this.editorBox === 'css') {
      value = this.pageContent.code_3
    }
    if (this.editorBox === 'js') {
      value = this.pageContent.code_4
    }
    this.lines = value.split('\n')
    this.showLine = this.lines.map(line => true)
    this.showingLines = [...this.lines]
  },
  methods: {
    ...mapActions('editorData', ['updatePageContent']),
    dataSumit: function () {
      console.log('dummy submit')
    },
    editorInit: function () {
      require('brace/ext/language_tools') // language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/javascript') // language
      require('brace/mode/css')
      require('brace/theme/monokai')
      // require('brace/snippets/javascript') // snippet
    },
    setHeightUp: function () {
      if (this.height < 100) {
        this.height = this.height + 20
      } else {
        this.height = 90
      }
    },
    setHeightDown: function () {
      if (this.height > 20) {
        this.height = this.height - 20
      } else {
        this.height = 20
      }
    },
    clearBox: function () {
      this.stepView = false
      if (this.clearView) {
        this.clearView = false
        this.showingLines = [...this.lines]
        this.showLine = this.showLine.map(item => true)
      } else {
        this.clearView = true
        this.showingLines = []
        this.showLine = this.showLine.map(item => false)
      }
    },
    splitLines: function (value) {
      this.lines = this.mycontent.split('\n')
      this.showingLines = []
      this.showLine = this.lines.map(line => false)
      this.splitted = true
      this.stepView = true
    },
    stepInto: function () {
      this.stepView = true
      this.clearView = false
      if (this.showLine.every((item) => item === true)) {
        this.showLine = this.showLine.map(item => false)
        this.splitLines(this.mycontent)
      }

      let addedLine = false

      for (let index = 0; index < this.lines.length; index++) {
        if (this.showLine[index] === false && addedLine === false) {
          this.showingLines.push(this.lines[index])
          this.showLine[index] = true
          if (this.lines[index].length > 0) {
            addedLine = true
          }
        }
      }
    },
    undoStepInto: function () {
      this.clearView = false
      let removedLine = false

      for (let index = this.showingLines.length - 1; index >= 0; index--) {
        if (!removedLine) {
          const firstTrueIndex = this.showingLines.length - 1
          this.showLine[firstTrueIndex] = false
          this.showingLines.pop()
          if (this.showingLines[this.showingLines.length - 1].length > 0) {
            removedLine = true
          }
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
