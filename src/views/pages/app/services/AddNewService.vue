<template>
  <div>
        <vs-prompt
            title="Create Service"
            accept-text= "Submit"
            button-cancel = "border"
            @cancel="initValues"
            @accept="createService"
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
            <div class="p-6">
              <div class="vx-row mb-3">
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <vs-input
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        label="Name"
                        name="name"
                        v-model="name"
                        class="w-full"
                    />
                    <span class="text-danger text-sm">{{errors.first('name')}}</span>
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <vs-input
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        label="Quantity"
                        name="quantity"
                        v-model="quantity"
                        type="number"
                        class="w-full"
                    />
                    <span class="text-danger text-sm">{{errors.first('quantity')}}</span>
                </div>
              </div>
              <div class="vx-row mb-3">
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <vs-input
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        label="Price"
                        name="selling_price"
                        v-model="selling_price"
                        type="number"
                        class="w-full"
                    />
                    <span class="text-danger text-sm">{{errors.first('selling_price')}}</span>
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <small class="ml-2">Unit</small>
                    <v-select 
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        name="unit"
                        v-model="unit"
                        label="name"
                        @search="searchUnits"
                        :reduce="units => units.name"
                        :closeOnSelect="true" 
                        :options="units" 
                        :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                    />
                    <span class="text-danger text-sm">{{errors.first('unit')}}</span>
                </div>
              </div>
              <div class="vx-row mb-3">
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <small class="ml-2">Description</small>
                    <vs-textarea
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        name="desc"
                        v-model="desc"
                        class="w-full"
                    />
                    <span class="text-danger text-sm">{{errors.first('desc')}}</span>
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <small class="ml-2">Comment</small>
                    <vs-textarea
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        name="comment"
                        v-model="comment"
                        class="w-full"
                    />
                    <span class="text-danger text-sm">{{errors.first('comment')}}</span>
                </div>
              </div>
            </div>
        </div>
    </vs-prompt>
  </div>
</template>

<script>
import vSelect from 'vue-select'
export default {
    props: {
        displayPrompt: {
            type: Boolean,
            required: true
        }
    },
    components: {
        vSelect
    },
    data() {
        return {
            name: '',
            unit: '',
            quantity: '',
            desc: '',
            selling_price: '',
            comment: '',
        }
    },
    computed: {
        units () {
          return this.$store.state.utilities.units
        },

        validateForm () {
            return !this.errors.any() &&
             this.unit !== '' &&
             this.name !== '' &&
             this.quantity !== '' && 
             this.desc !== '' && 
             this.selling_price !== ''
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
      createService () {
        const obj = {
            name: this.name,
            unit: this.unit,
            quantity: this.quantity,
            selling_price: this.selling_price,
            desc: this.desc,
            comment: this.comment
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('service/addService', obj)
                .then(response => {
                    this.handleSuccess(response)
                    this.initValues()
                })
                .catch(err => { this.handleError(err) })
            }
        })
      },

      initValues() {
        this.name = ''
        this.unit = ''
        this.selling_price = ''
        this.desc = ''
        this.comment = ''
        this.quantity = ''
      },

      searchUnits(search) {
        this.$store.dispatch('utilities/fetchUnits', { currentPage: 1, itemsPerPage: 20, search })
      }
    }
    
}
</script>

<style>

</style>