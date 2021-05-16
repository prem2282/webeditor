<template>
  <AceEditor
    v-model="mycontent"
    @init="editorInit"
    :lang=this.editorBox
    theme="monokai"
    :width=this.width
    :height="this.height?this.height:'90vh'"
    :options="{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      fontSize: 15,
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
</template>

<script>

import AceEditor from 'vuejs-ace-editor'
import { mapActions } from 'vuex'
export default {

  data: function () {
    return {
      dummyData: 'dummy data'
    }
  },

  props: ['pageContent', 'editorBox', 'vertView', 'height', 'width'],
  components: {
    AceEditor
  },
  computed: {
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
        console.log(payload)
        this.updatePageContent(payload)
      }
    }
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
    updateContent: function (mycontent) {
      console.log('data will be updated with:', mycontent)
    }
  }
}
</script>

<style scoped></style>
