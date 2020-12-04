<template>
  <div>
        <vs-prompt
            title="Add Discount"
            accept-text= "Submit"
            button-cancel = "border"
            @cancel="initValues"
            @accept="addDiscount"
            @close="activePrompt = false"
            :is-valid="validateForm"
            :active.sync="activePrompt">
        <div>
                <!-- <div class="vx-row">

                    <div class="vx-col ml-auto flex">
                        <feather-icon icon="InfoIcon" class="cursor-pointer" svgClasses="text-success stroke-current w-5 h-5 mr-4"></feather-icon>

                        <feather-icon icon="StarIcon" class="cursor-pointer" svgClasses="text-warning stroke-current w-5 h-5 mr-4"></feather-icon>
                    </div>
                </div> -->
                  <div class="vx-col w-full mb-base">
                      <div class="vx-row mb-2">
                        <div class="vx-col w-full">
                          <vs-input class="w-full" type="number" label="Discount (%)" v-model="discount" name="discount" />
                          <span class="text-danger text-sm">{{errors.first('discount')}}</span>
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
        }
    },
    data() {
        return {
            discount: ''
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
            return !this.errors.any() && this.discount !== ''
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
      addDiscount () {
        const obj = {
          discount: this.discount,
          slid: this.$route.params.saleId
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('sale/applyDiscount', obj)
                .then(response => {
                    this.handleSuccess(response)
                    this.initValues()
                })
                .catch(err => { this.handleError(err) })
            }
        })
      },
      initValues() {
        this.discount = ''
      }
    }
    
}
</script>

<style>

</style>