<template>
    <div @click='updateShowHelp(showHelp)' class="blurBox"  :class="showHelp ? 'blurBoxAppear' : 'blurBoxExit'">
        <div class="helpBox">

        </div>
        <div class="helpBox " >
            <div class="helpTextClass shadow-15" v-html="this.helpText">
            </div>
        </div>
    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['helpText'],

  computed: {
    ...mapGetters('editorData', ['showHelp'])
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
  border: solid .3em blanchedalmond;
}

.blurBox {
  position: absolute;
  height: 100%;
  width: 100vw;
  background-color:rgb(235, 229, 226);
  z-index: 9;
}

.blurBoxAppear {
  top: 0;
  left: 0;
  opacity: 90%;
  animation: blurAni .5s ease-in-out;
}

.blurBoxExit {
  top: -100vh;
  height: 0;
  left: 0;
  opacity: 0%;
  animation: blurAniExit .5s ease-in-out;
}

@keyframes blurAni {
  0% {
      opacity: 0%;
      top: 100vh;
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
      height: 100%;
  }
  100% {
      opacity: 0%;
      top: 150vh;
      height: 0;
  }
}
</style>
