<template>
  <AceEditor
    v-model="mycontent"
    @init="editorInit"
    lang="html"
    theme="monokai"
    width="100%"
    height="50vh"
    :options="{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      fontSize: 15,
      highlightActiveLine: true,
      enableSnippets: false,
      showLineNumbers: true,
      tabSize: 2,
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

  props: ['pageContent', 'editorBox', 'itemIndex'],
  components: {
    AceEditor
  },
  computed: {
    mycontent: {
      get: function () {
        let value = ''
        if (this.editorBox === 'html') {
          value = this.pageContent.htmlContent
        }
        if (this.editorBox === 'css') {
          value = this.pageContent.cssContent
        }
        if (this.editorBox === 'js') {
          value = this.pageContent.jsContent
        }
        return value
      },
      // setter
      set: function (newValue) {
        const payload = {
          htmlContent: this.editorBox === 'html' ? newValue : this.pageContent.htmlContent,
          cssContent: this.editorBox === 'css' ? newValue : this.pageContent.cssContent,
          jsContent: this.editorBox === 'js' ? newValue : this.pageContent.jsContent,
          itemIndex: this.itemIndex
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
      require('brace/snippets/javascript') // snippet
    },
    updateContent: function (mycontent) {
      console.log('data will be updated with:', mycontent)
    }
  }
}
</script>

<style scoped></style>
