<template>
  <q-page>
    <h6>Menu</h6>
    <div :v-if="showData" >
        <div>
          <div class="q-pa-md">
            <q-table
              :data="menuData"
              row-key="id"
            />
          </div>
        </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
const targetUrl = 'https://prem2282.pythonanywhere.com/api/Grouping/'

export default {
  computed: {
    ...mapGetters('editorData', ['menuData']),
    showData: function () {
      if (this.menuData.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    ...mapActions('editorData', ['updateMenuData']),
    getData: async function () {
      if (this.menuData.length === 0) {
        await axios
          .get(targetUrl)
          .then(res => {
            const menuSet = res.data
            if (res.data.length > 0) {
              console.log(menuSet)
              this.updateMenuData(res.data)
            } else {
              console.log('no data')
            }
          })
      }
    }
  }
}
</script>
<style lang='css' scoped>

</style>
