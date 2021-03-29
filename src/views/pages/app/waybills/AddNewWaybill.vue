<template>
  <div>
        <vs-popup
            title="Create Waybill"
            :active.sync="activePrompt">
        <div>
            <div class="pr-6 pl-6">
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <small class="ml-2">Customer</small>
                        <v-select 
                            v-validate="'required'"
                            data-vv-validate-on="blur"
                            v-model="cid"
                            label="name"
                            name="cid"
                            @search="searchCustomers"
                            :closeOnSelect="true"
                            :reduce="customers => ({
                                name: customers.name,
                                cid: customers.cid
                            })"
                            :options="customers" 
                            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                        />
                        <span class="text-danger text-sm">{{errors.first('cid')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <small class="ml-2">Invoice</small>
                        <v-select 
                            v-validate="'required'"
                            data-vv-validate-on="blur"
                            v-model="ivid"
                            name="invoice_type"
                            label="name"
                            @search="searchInvoices"
                            :reduce="invoices => invoices.ivid" 
                            :closeOnSelect="true"
                            :options="invoices" 
                            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                        />
                        <span class="text-danger text-sm">{{errors.first('invoice_type')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" label="Vehicle Number" v-model="vehicle_numb" name="vehicle_numb" />
                        <span class="text-danger text-sm">{{errors.first('vehicle_numb')}}</span>
                    </div>
                </div>
                <div v-if="!is_outsourced" class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <small class="ml-2">Driver</small>
                        <v-select 
                            v-model="sid"
                            name="invoice_type"
                            label="fullname"
                            @search="searchEmployees"
                            @input="selectDriver"
                            :reduce="staffs => ({
                                name: staffs.fullname,
                                phone: staffs.phone
                            })" 
                            :closeOnSelect="true"
                            :options="staffs" 
                            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                        />
                    </div>
                </div>
                <p>Want to outsource driver? Click <a href="#" @click="is_outsourced = !is_outsourced">here</a></p>
                <div v-if="is_outsourced" class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" label="Driver Name" v-model="driver_name" name="driver_name" />
                        <span class="text-danger text-sm">{{errors.first('driver_name')}}</span>
                    </div>
                </div>
                <div v-if="is_outsourced" class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input maxLength="11" minLength="11" class="w-full" label="Driver Phone" v-model="driver_phone" name="driver_phone" />
                        <span class="text-danger text-sm">{{errors.first('driver_phone')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <small class="ml-2">Date of Transaction</small>
                        <datepicker input-class="mb-3" placeholder="Date" v-model="date_of_transaction" name="date_of_transaction"/>                        
                        <span class="text-danger text-sm">{{errors.first('date_of_transaction')}}</span>
                    </div>
                </div>
                <div slot="footer" class="pt-8">
                    <vs-button class="mr-6" @click="createWaybill" :disabled="!isFormValid">Submit</vs-button>
                    <vs-button type="border" color="danger" @click="activePrompt = false">Cancel</vs-button>
                </div>
            </div>
        </div>
        </vs-popup>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import Datepicker from 'vuejs-datepicker';
export default {
    props: {
        displayPrompt: {
            type: Boolean,
            required: true
        }
    },
    components: {
        vSelect,
        Datepicker
    },
    data() {
        return {
            driver_name: '',
            driver_phone: '',
            ivid: '',
            cid: '',
            sid: '',
            vehicle_numb: '',
            date_of_transaction: '',
            is_outsourced: false
        }
    },
    computed: {
        invoices () {
          return this.$store.state.invoice.invoices
        },

        staffs () {
          return this.$store.state.employee.employees
        },

        customers () {
          return this.$store.state.customer.customers
        },

        isFormValid () {
            return !this.errors.any() &&
             this.driver_phone !== '' &&
             this.driver_name !== '' &&
             this.ivid !== '' &&
             this.vehicle_numb !== '' &&
             this.date_of_transaction !== '' &&
             this.cid !== ''
        },

        activePrompt:{
           get() {
                return this.displayPrompt
           },

           set(value) {
               this.$emit('hideDisplayPrompt', value)
               this.initValues()
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
      
      selectDriver() {
        this.driver_name = this.sid.name
        this.driver_phone = this.sid.phone
      },
      
      createWaybill () {
        const obj = {
            driver_name: this.driver_name,
            cid: this.cid.cid,
            name: `${this.cid.name} Waybill`,
            driver_phone: this.driver_phone,
            vehicle_numb: this.vehicle_numb,
            date_of_transaction: this.date_of_transaction,
            ivid: this.ivid
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('waybill/addWaybill', obj)
                .then(response => {
                    this.handleSuccess(response)
                    this.initValues()
                    this.$emit('hideDisplayPrompt', false)
                })
                .catch(err => { this.handleError(err) })
            }
        })
      },

      initValues() {
        this.driver_name =''
        this.cid = '',
        this.driver_phone = '',
        this.vehicle_numb = '',
        this.date_of_transaction = '',
        this.ivid = ''
      },

      searchCustomers(search) {
        this.$store.dispatch('customer/fetchCustomers', { currentPage: 1, itemsPerPage: 20, search })
      },

      searchInvoices(search) {
        this.$store.dispatch('invoice/fetchInvoices', { currentPage: 1, itemsPerPage: 20, search })
      },

      searchEmployees(search) {
        this.$store.dispatch('employee/fetchEmployees', { currentPage: 1, itemsPerPage: 20, search })
      },
    
    }
    
}
</script>

<style scoped>
</style>