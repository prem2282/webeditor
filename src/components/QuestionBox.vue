<template>
    <div class="bg-grey-4 q-pa-sm q-ma-lg shadow-11">
        <div class="column">

            <div v-if="editContent">
                <q-input class="q-ma-md text-h6 shadow-10" autogrow bg-color="grey-5" color="white" label-color="grey-8" filled v-model="mydata1.Question" label="Question" />
            </div>
            <div v-else>
                <div class="questionBox shadow-10" :contenteditable="editContent">{{mydata.Question}}</div>
            </div>
            <div class="answerOuterBox">
                <div v-if="editContent">
                    <q-input rounded  class='q-pa-sm q-ma-sm text-body1'  :bg-color="ans_ind==='1' ? 'positive':''" v-model="mydata1.answer_1" label="Option: 1">
                        <template v-slot:prepend>
                            <q-radio  v-model="ans_ind" val="1"/>
                        </template>
                    </q-input>
                    <q-input rounded  class='q-pa-sm q-ma-sm text-body1' :bg-color="ans_ind==='2' ? 'positive':''" v-model="mydata1.answer_2" label="Option: 2">
                        <template v-slot:prepend>
                            <q-radio v-model="ans_ind" val="2"/>
                        </template>
                    </q-input>
                    <q-input rounded  class='q-pa-sm q-ma-sm text-body1' :bg-color="ans_ind==='3' ? 'positive':''"  v-model="mydata1.answer_3" label="Option: 3">
                        <template v-slot:prepend>
                            <q-radio v-model="ans_ind" val="3"/>
                        </template>
                    </q-input>
                    <q-input rounded  class='q-pa-sm q-ma-sm text-body1' :bg-color="ans_ind==='4' ? 'positive':''"  v-model="mydata1.answer_4" label="Option: 4">
                        <template v-slot:prepend>
                            <q-radio v-model="ans_ind" val="4"/>
                        </template>
                    </q-input>
                </div>
                <div v-else>
                    <q-chip class='shadow-11 q-pa-sm q-ma-sm text-body1' :color="mydata.answer_1_ind?'green':'grey-4'" >
                        {{mydata.answer_1}}
                    </q-chip>
                    <q-chip class='shadow-11 q-pa-sm q-ma-sm text-body1' :color="mydata.answer_2_ind?'green':'grey-4'" >
                        {{mydata.answer_2}}
                    </q-chip>
                    <q-chip class='shadow-11 q-pa-sm q-ma-sm text-body1' :color="mydata.answer_3_ind?'green':'grey-4'" >
                        {{mydata.answer_3}}
                    </q-chip>
                    <q-chip class='shadow-11 q-pa-sm q-ma-sm text-body1' :color="mydata.answer_4_ind?'green':'grey-4'" >
                        {{mydata.answer_4}}
                    </q-chip>
                </div>

            </div>
            <div class="row justify-center">
                <q-btn class='q-ma-sm' v-if="editContent" @click="updateRecord()" color="primary" text-color="white">Update</q-btn>
                <q-btn class='q-ma-sm' v-else @click="editContent=!editContent" color="primary" text-color="white">Edit</q-btn>
                <q-btn class='q-ma-sm' v-if="editContent" @click="reset()" color="positive" text-color="white">Reset</q-btn>
                <q-btn class='q-ma-sm' v-if="editContent" @click="cancel()" color="negative" text-color="white">Cancel</q-btn>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {

  props: { mydata: { type: Object }, index: { type: Number }, updateData: { type: Function } },
  data: function () {
    return {
      editContent: false,
      choice_1: 'dummy answer 1',
      mydata1: { ...this.mydata }
    }
  },
  computed: {
    buttonText: function () { return this.editContent ? 'Update' : 'Edit' },
    ans_bg_color: function () { return this.editContent ? 'white' : 'darkslategrey' },
    ans_ind: {
      get: function () {
        if (this.mydata1.answer_1_ind) {
          return '1'
        } else if (this.mydata1.answer_2_ind) {
          return '2'
        } else if (this.mydata1.answer_3_ind) {
          return '3'
        } else if (this.mydata1.answer_4_ind) {
          return '4'
        } else {
          return '0'
        }
      },
      set: function (value) {
        this.mydata1.answer_1_ind = false
        this.mydata1.answer_2_ind = false
        this.mydata1.answer_3_ind = false
        this.mydata1.answer_4_ind = false
        if (value === '1') {
          this.mydata1.answer_1_ind = true
        } else if (value === '2') {
          this.mydata1.answer_2_ind = true
        } else if (value === '3') {
          this.mydata1.answer_3_ind = true
        } else if (value === '4') {
          this.mydata1.answer_4_ind = true
        }
      }

    }

  },
  methods: {

    reset: function () {
      this.mydata1 = { ...this.mydata }
    },

    cancel: function () {
      this.mydata1 = { ...this.mydata }
      this.editContent = false
    },

    updateRecord: async function () {
      console.log('to update:', this.mydata1)
      const targetUrl = 'https://prem2282.pythonanywhere.com/api/QuestionList/edit/' + this.mydata1.id

      if (this.editContent === true) {
        await axios
          .put(targetUrl, this.mydata1)
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              this.editContent = !this.editContent
              console.log('updated')
              this.updateData(this.index, this.mydata1)
            } else {
              console.log('not updated')
            }
          })
      }
    }
  }

}
</script>
<style lang='css' scoped>

.questionBox {
background: rgb(52, 32, 10);
color: seashell;
padding: 1em;
margin: 1em;
border-radius: 1em;
font-size: 1.4em;
}

.answerOuterBox {
padding: 1em;
margin: 1em;
}

.correctBox {
background: greenyellow;
color: grey;
text-align:
}

</style>
