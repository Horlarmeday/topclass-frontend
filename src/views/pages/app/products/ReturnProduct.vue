<template>
  <div>
        <vs-popup
            :title="`Return ${this.name}`"
            :active.sync="activePrompt">
        <div>
            <div class="vx-row">

                <div class="vx-col ml-auto flex">
                    <feather-icon icon="InfoIcon" class="cursor-pointer" svgClasses="text-success stroke-current w-5 h-5 mr-4"></feather-icon>

                    <feather-icon icon="StarIcon" class="cursor-pointer" svgClasses="text-warning stroke-current w-5 h-5 mr-4"></feather-icon>
                </div>
            </div>
            <div class="">
                <!-- <div class="vx-col sm:w-1/2 w-full mb-2"> -->
                    <vs-input
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        label="Quantity to Return"
                        name="quantity"
                        v-model="quantity"
                        type="number"
                        class="w-full"
                    />
                    <span class="text-danger text-sm">{{errors.first('quantity')}}</span>

                    <vs-input
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        label="Reason for Return"
                        name="reason"
                        v-model="reason"
                        type="text"
                        class="w-full"
                    />
                    <span class="text-danger text-sm">{{errors.first('reason')}}</span>
                <!-- </div> -->
              <div slot="footer" class="pt-8">
                    <vs-button class="mr-6" @click="returnProduct" :disabled="!validateForm">Submit</vs-button>
                    <vs-button type="border" color="danger" @click="activePrompt = false">Cancel</vs-button>
              </div>
            </div>
        </div>
    </vs-popup>
  </div>
</template>

<script>
export default {
    props: {
        isPromptActive: {
            type: Boolean,
            required: true
        },
        data: {
            type: Object,
            required: true,
            default: () => {}
        }
    },
    data() {
        return {
            pid: '',
            quantity: '',
            reason: '',
            name: '',
        }
    },
    watch: {
        isPromptActive (val) {
        if (!val) return
            if (Object.entries(this.data).length === 0) {
                this.initValues()
                this.$validator.reset()
            } else {
                const { pid, name } = JSON.parse(JSON.stringify(this.data))
                this.pid = pid
                this.name = name
            }
        }
    },
    computed: {
        validateForm () {
            return !this.errors.any() &&
             this.quantity !== ''
        },
        activePrompt:{
            get () {
                return this.isPromptActive
            },
            set (value) {
                this.$emit('hidePromptActive', value)
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
      returnProduct () {
        const obj = {
            pid: this.pid,
            quantity: this.quantity,
            reason: this.reason,
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('product/returnProduct', obj)
                .then(response => {
                    this.handleSuccess(response)
                    this.initValues()
                     this.$emit('hidePromptActive', false)
                })
                .catch(err => { this.handleError(err) })
            }
        })
      },

      initValues() {
        this.name = ''
        this.pid = ''
        this.quantity = ''
        this.reason = ''
      }
    },
    
}
</script>

<style>

</style>