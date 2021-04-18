<template>

<div>
  <div @click='updateShowHelp(showHelp)' class='blurBox' :class="showHelp ? 'blurBoxAppear' : 'blurBoxExit'">
  </div>
  <div v-if='showHelp' class="helpBox">
    <div class="q-pa-md q-gutter-sm">
      <q-editor class="helpTextClass"
        v-model="helpText"
        :dense="$q.screen.lt.md"
        toolbar-bg="white"
        :toolbar="[
          [
            {
              label: $q.lang.editor.align,
              icon: $q.iconSet.editor.align,
              fixedLabel: true,
              list: 'only-icons',
              options: ['left', 'center', 'right', 'justify']
            }
          ],
          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
          ['token', 'hr', 'link', 'custom_btn'],
          [
            {
              label: $q.lang.editor.formatting,
              icon: $q.iconSet.editor.formatting,
              list: 'no-icons',
              options: [
                'p',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'code'
              ]
            },
            {
              label: $q.lang.editor.fontSize,
              icon: $q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
                'size-5',
                'size-6',
                'size-7'
              ]
            },
            {
              label: $q.lang.editor.defaultFont,
              icon: $q.iconSet.editor.font,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'default_font',
                'arial',
                'arial_black',
                'comic_sans',
                'courier_new',
                'impact',
                'lucida_grande',
                'times_new_roman',
                'verdana'
              ]
            },
            'removeFormat'
          ],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

          ['undo', 'redo'],
          ['viewsource']
        ]"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana'
        }"
      />
      </div>
      <div class="saveButtonClass">
          <q-btn @click='updateShowHelp(showHelp)' color="purple">done</q-btn>
      </div>

  </div>
</div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  props: { saveHelpText: { type: Function }, helpExit: { type: Function } },

  computed: {
    ...mapGetters('editorData', ['showHelp', 'pageContent']),
    helpText: {
      get: function () {
        return this.pageContent.description_1 ? this.pageContent.description_1 : ''
      },
      set: function (newValue) {
        this.updateHelpText(newValue)
      }
    }
  },
  methods: {
    ...mapActions('editorData', ['updateShowHelp', 'updateHelpText'])
  }

}

</script>

<style scoped>

.blurBox {
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color:rgb(23, 13, 7);
  z-index: 9;
}

.blurBoxAppear {
  top: 0;
  left: 0;
  opacity: 80%;
  animation: blurAni .5s ease-in-out;
}

.blurBoxExit {
  top: -100vh;
  left: 0;
  opacity: 0%;
  animation: blurAniExit .5s ease-in-out;
}

@keyframes blurAni {
  0% {
      opacity: 0%;
      top: -100vh;
  }
  100% {
      top: 0;
      opacity: 80%;
  }
}

@keyframes blurAniExit {
  0% {
      opacity: 80%;
      top: 0;
  }
  100% {
      opacity: 0%;
      top: -100;
  }
}

.helpBox {
  position: absolute;
  top: 10%;
  left: 20%;
  z-index: 10;
  animation: helpBoxAni 1s ease-in-out;
}

@keyframes helpBoxAni {
  0% {
      top: 0%;
      transform: scaleX(0);
  }
  100% {
      top: 10%;
      scale: 1;
      transform: scaleX(1);
  }
}

.helpTextClass {

  width: 60vw;
  min-height: 25vh;
  opacity: 80%;
  background-color: aliceblue;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
}

.saveButtonClass{
    display: grid;
    justify-items: center;
}

</style>
