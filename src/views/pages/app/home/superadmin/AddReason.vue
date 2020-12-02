<template>
  <div>
        <vs-prompt
            title="Give a Reason"
            accept-text= "Submit"
            button-cancel = "border"
            @cancel="initValues"
            @accept="addReason"
            @close="activePrompt = false"
            :is-valid="validateForm"
            :active.sync="activePrompt">
        <div>
            <div class="vx-row">

                <div class="vx-col ml-auto flex">
                    <feather-icon icon="InfoIcon" class="cursor-pointer" svgClasses="text-success stroke-current w-5 h-5 mr-4"></feather-icon>

                    <feather-icon icon="StarIcon" class="cursor-pointer" svgClasses="text-warning stroke-current w-5 h-5 mr-4"></feather-icon>
                </div>
            </div>
            <div class="vx-col w-full mb-base">
                <div class="vx-row mb-2">
                  <div class="vx-col w-full">
                    <small>Comment</small>
                    <vs-textarea v-validate="'required'" data-vv-validate-on="blur" class="w-full" v-model="comment" name="comment" height="200px"/>
                    <span class="text-danger text-sm">{{errors.first('comment')}}</span>
                  </div>
                </div>
            </div>
        </div>
    </vs-prompt>
  </div>
</template>

<script>
export default {
    props: {
      displayPrompt: {
          type: Boolean,
          required: true
      },
      data: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        comment: ''
      }
    },
    // watch: {
    //     displayPrompt() {
    //         if (Object.entries(this.data).length === 0) {
    //             this.initValues()
    //             this.$validator.reset()
            
    //     }
    // },
    computed: {
        validateForm () {
            return !this.errors.any() && this.comment !== ''
        },
        activePrompt:{
            get () {
                return this.displayPrompt
            },
            set (value) {
                this.$emit('hideDisplayPrompt', value)
            }
        },
    },
    methods: {
      handleError(error) {
            this.$vs.loading.close()
            this.$vs.notify({
              title:'Error',
              text: error.response.data,
              color:'danger',
              position:'top-center',
              iconPack: 'feather',
              icon:'icon-alert-circle'
            });
        },

      handleSuccess(response) {
            this.$vs.loading.close()
            this.$vs.notify({
              title:'Success',
              text: response.data.message,
              color:'success',
              position:'top-center',
              iconPack: 'feather',
              icon:'icon-alert-circle'
            });
      },
      addReason () {
        const obj = {
          invoice_id: this.data,
          comment: this.comment
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('invoice/declineInvoice', obj)
                .then(response => {
                    this.handleSuccess(response)
                    this.initValues()
                })
                .catch(err => { this.handleError(err) })
            }
        })
      },
      initValues() {
        this.comment = ''
      }
    }
    
}
</script>

<style>

</style>