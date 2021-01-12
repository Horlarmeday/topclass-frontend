<template>
  <div>
        <vs-popup
            title="Create Product"
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
                        label="Cost"
                        name="cost"
                        type="number"
                        v-model="cost"
                        class="w-full"
                    />
                    <!-- <span class="text-danger text-sm">{{errors.first('cost')}}</span> -->
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <vs-input
                        label="Selling Price"
                        name="selling_price"
                        v-model="selling_price"
                        type="number"
                        class="w-full"
                    />
                    <!-- <span class="text-danger text-sm">{{errors.first('selling_price')}}</span> -->
                </div>
              </div>
              <div class="vx-row mb-3">
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <small class="ml-2">Unit</small>
                    <v-select 
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        name="unit"
                        label="name"
                        v-model="unit"
                        @search="searchUnits"
                        :reduce="units => units.name"
                        :closeOnSelect="true" 
                        :options="units" 
                        :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                    />
                    <span class="text-danger text-sm">{{errors.first('unit')}}</span>
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <small class="ml-2">Label</small>
                    <v-select 
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        name="label"
                        label="name"
                        @search="searchLabels"
                        v-model="label"
                        :reduce="labels => labels.name"
                        :closeOnSelect="true" 
                        :options="labels" 
                        :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                    />
                    <span class="text-danger text-sm">{{errors.first('label')}}</span>
                </div>
              </div>
              <div class="vx-row mb-3">
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <small class="ml-2">Description</small>
                    <vs-textarea
                        name="desc"
                        v-model="desc"
                        class="w-full"
                    />
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <small class="ml-2">Comment</small>
                    <vs-textarea
                        name="comment"
                        v-model="comment"
                        class="w-full"
                    />
                </div>
              </div>
              <div slot="footer" class="pt-8">
                    <vs-button class="mr-6" @click="createProduct" :disabled="!validateForm">Submit</vs-button>
                    <vs-button type="border" color="danger" @click="activePrompt = false">Cancel</vs-button>
              </div>
            </div>
        </div>
    </vs-popup>
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
            cost: '',
            label: '',
            desc: '',
            selling_price: '',
            comment: '',
        }
    },
    computed: {
        units () {
          return this.$store.state.utilities.units
        },

        labels () {
          return this.$store.state.utilities.labels
        },
        validateForm () {
            return !this.errors.any() &&
             this.unit !== '' &&
             this.name !== '' &&
             this.quantity !== '' && 
             this.label !== '' 
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
      createProduct () {
        const obj = {
            name: this.name,
            unit: this.unit,
            cost: this.cost,
            label: this.label,
            quantity: this.quantity,
            selling_price: this.selling_price,
            desc: this.desc,
            comment: this.comment
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('product/addProduct', obj)
                .then(response => {
                    this.handleSuccess(response)
                    this.initValues()
                     this.$emit('hideDisplayPrompt', false)
                })
                .catch(err => { this.handleError(err) })
            }
        })
      },

      searchUnits(search) {
        this.$store.dispatch('utilities/fetchUnits', { currentPage: 1, itemsPerPage: 20, search })
      },

      searchLabels(search) {
        this.$store.dispatch('utilities/fetchLabels', { currentPage: 1, itemsPerPage: 20, search })
      },

      initValues() {
        this.name = ''
        this.unit = ''
        this.selling_price = ''
        this.desc = ''
        this.comment = ''
        this.quantity = ''
        this.cost = ''
      }
    },
    
}
</script>

<style>

</style>