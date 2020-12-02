<template>
  <div>
        <vs-prompt
            title="Create Customer"
            accept-text= "Submit"
            button-cancel = "border"
            @cancel="initValues"
            @accept="createCustomer"
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
                          <vs-input class="w-full" label="Name" v-model="name" name="name" />
                          <span class="text-danger text-sm">{{errors.first('name')}}</span>
                        </div>
                      </div>
                      <div class="vx-row mb-2">
                        <div class="vx-col w-full">
                          <vs-input class="w-full" type="text" label="Phone" maxLength="11" minLength="11" v-model="phone" name="phone" />
                          <span class="text-danger text-sm">{{errors.first('phone')}}</span>
                        </div>
                      </div>
                      <div class="vx-row mb-2">
                        <div class="vx-col w-full">
                          <vs-input class="w-full" type="email" label="Email" v-model="email" name="email" />
                          <span class="text-danger text-sm">{{errors.first('phone')}}</span>
                        </div>
                      </div>
                      <div class="vx-row mb-2">
                        <div class="vx-col w-full">
                          <small class="ml-2">State</small>
                          <v-select 
                            v-validate="'required'"
                            data-vv-validate-on="blur"
                            v-model="state"
                            @input="getCities"
                            name="state"
                            :closeOnSelect="true" 
                            :options="states" 
                            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                          />
                          <span class="text-danger text-sm">{{errors.first('state')}}</span>
                        </div>
                      </div>
                      <div class="vx-row mb-2">
                        <div class="vx-col w-full">
                          <small class="ml-2">LGA</small>
                          <v-select 
                            v-validate="'required'"
                            data-vv-validate-on="blur"
                            v-model="lga"
                            name="lga"
                            :closeOnSelect="true" 
                            :options="cities" 
                            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                          />
                          <span class="text-danger text-sm">{{errors.first('lga')}}</span>
                        </div>
                      </div>
                      <div class="vx-row mb-2">
                        <div class="vx-col w-full">
                          <vs-input class="w-full" label="Address" v-model="address" name="address" />
                          <span class="text-danger text-sm">{{errors.first('address')}}</span>
                        </div>
                      </div>
                      <div class="vx-row mb-2">
                        <div class="vx-col w-full">
                          <small class="ml-2">Customer Type</small>
                          <v-select 
                            v-validate="'required'"
                            data-vv-validate-on="blur"
                            v-model="customer_type"
                            name="customer_type"
                            :closeOnSelect="true" 
                            :options="customerTypesOptions" 
                            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                          />
                          <span class="text-danger text-sm">{{errors.first('customer_type')}}</span>
                        </div>
                      </div>
                  </div>
            
        </div>
    </vs-prompt>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import NaijaStates from 'naija-state-local-government'
import data from "./customerOptions"
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
            customer_type: '',
            phone: '',
            name: '',
            email: '',
            state: '',
            address: '',
            lga: '',
            states: [],
            cities: [],
            customerTypesOptions: data,
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
            return !this.errors.any() &&
             this.name !== '' &&
             this.phone !== '' && 
             this.email !== '' && 
             this.state !== '' && 
             this.lga !== '' && 
             this.address !== '' && 
             this.customer_type !== ''
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

      getStates() {
        this.states = NaijaStates.states()
      },

      getCities() {
        this.lga = ''
        const cities = NaijaStates.lgas(`${this.state}`)
        this.cities = cities.lgas
      },
      createCustomer () {
        const obj = {
            name: this.name,
            phone: this.phone,
            email: this.email,
            customer_type: this.customer_type,
            state: this.state,
            lga: this.lga,
            address: this.address
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('customer/addCustomer', obj)
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
        this.phone = ''
        this.email = ''
        this.customer_type = ''
        this.state = ''
        this.lga = ''
        this.address = ''
      }
    },
    created() {
      this.getStates()
    }
    
}
</script>

<style>

</style>