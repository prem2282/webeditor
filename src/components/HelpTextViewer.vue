<template>
    <div @click=updateShowHelp(showHelpText)>
        <q-dialog
        v-model="showHelpText"
        >
          <q-card>
            <q-card-section class="helpTextClass">
              <q-btn icon="close" flat round dense v-close-popup @click=updateShowHelp(showHelpText) />
              <div v-html="this.helpText"></div>
            </q-card-section>
          </q-card>
        </q-dialog>
    </div>
</template>

<script>
import { showHelp } from 'src/store/editorData/getters'
import { mapGetters, mapActions } from 'vuex'
export default {
  // props: ['helpText'],
  data () {
    return {
      maximizedToggle: true
    }
  },
  props: {
    helpText: { type: String },
    title: { type: String },
    showHelp: { type: Boolean }
  },
  computed: {
    ...mapGetters('editorData', ['showHelp']),
    showHelpText: showHelp
  },
  methods: {
    ...mapActions('editorData', ['updateShowHelp'])
  }

}
</script>

<style scoped>

.helpBox {
  position: absolute;
  top: 10%;
  left: 25%;
  z-index: 10;
  animation: helpBoxAni 1s ease-in-out;
  display: grid;
  align-items: center;
  justify-content: center;
}

.helpTextClass {

  width: 50vw;
  min-height: 25vh;
  border-radius: 1em;
  background-color: rgb(3, 3, 3);
  color: white;
  padding: 1em;
  border: solid .1em blanchedalmond;
}

.blurBox {
  position: absolute;
  height: 100%;
  width: 100vw;
  background-color: black;
  z-index: 9;
}

.blurBoxAppear {
  top: 0;
  left: 0;
  opacity: 90%;
  animation: blurAni .5s ease-in-out;
}

.blurBoxExit {
  top: 100vh;
  height: 0;
  left: 0;
  opacity: 0%;
  animation: blurAniExit .5s ease-in-out;
}

@keyframes blurAni {
  0% {
      opacity: 0%;
      left: 10vw;
  }
  100% {
      left: 0;
      opacity: 80%;
  }
}

@keyframes blurAniExit {
  0% {
      opacity: 50%;
      left: 0vw;
      height: 100%;
  }
  100% {
      opacity: 0%;
      left: 10vw;
      height: 100%;
      z-index: -9;
  }
}
</style>
