<template>
    <q-page>
        <div class="outerbox row">
            <div class="box1 col">
                <h6>HTML BOX</h6>
                <!-- <textarea class="boxtext1" v-model="htmlContent">
                </textarea> -->
                <AceEditor
                    :pageContent= this.pageContent
                    editorBox = 'html'
                    :itemIndex = this.itemIndex
                />
            </div>
            <div class="box2 col">
                <h6>CSS BOX</h6>
                <AceEditor
                    :pageContent= this.pageContent
                    editorBox = 'css'
                    :itemIndex = this.itemIndex
                />
            </div>
            <div class="box3 col">
                <h6>JS BOX</h6>
                <AceEditor
                    :pageContent= this.pageContent
                    editorBox = 'js'
                    :itemIndex = this.itemIndex
                />
            </div>
        </div>
        <div :v-html="this.pageContent.htmlContent">
        </div>
        <div>
            <iframe class="resultbox" :srcDoc="this.pageContent.outputValue" frameborder="0"></iframe>
        </div>
    </q-page>
</template>

<script>

import AceEditor from './AceEditor'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('editorData', ['pageContent', 'itemIndex']),
    // cssContent: function () {
    //   return this.pageContent[this.itemIndex].cssContent
    // },
    // htmlContent: function () {
    //   return this.pageContent[this.itemIndex].htmlContent
    // },
    // jsContent: function () {
    //   return this.pageContent[this.itemIndex].jsContent
    // },
    outputValue: function () {
      return this.pageContent.outputValue
    }
  },
  components: {
    AceEditor
  },
  methods: {
    ...mapActions('editorData', ['updatePageContent'])
  },
  mounted: function () {
    console.log('this is after mount')
    console.log(this.pageContent)
    this.updatePageContent(this.pageContent)
  }

}

</script>

<style scoped>

* {
    margin: 0;
    padding: 0;
}

.outerbox {
    background: darkslateblue;
    width: 100vw;
    min-height: 100%;

}

.box1, .box2, .box3 {
    margin: .5em;
    color: cornsilk;
    font-size: 1.2em;
}
.box1{
    background: chocolate;
}
.box2{
    background: coral;
}
.box3{
    background: darkgreen;
}

.boxtext1, .boxtext2, .boxtext3{
    min-height: 50vh;
    min-width: 100%;
    background: rgb(31, 30, 30);
    padding: 1em;
    color: cornsilk;
}

h6{
    padding-left: 1em;
}

.resultbox{
    background: cornsilk;
    min-height: 40vh;
    height: 100%;
    padding: 1em;
    width: 100%;
    font-family: Arial, Helvetica, sans-serif;
}

</style>
