<template>
  <div>
        <vs-popup
            title="Create Invoice"
            :active.sync="activePrompt">
        <div>
            <div class="pr-6 pl-6">
              <div class="vx-col w-full mb-base">
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" label="Name" v-model="name" name="name" />
                        <span class="text-danger text-sm">{{errors.first('name')}}</span>
                    </div>
                </div>
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
                            :reduce="customers => customers.cid" 
                            :options="customers" 
                            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                        />
                        <span class="text-danger text-sm">{{errors.first('cid')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <small class="ml-2">Invoice Type</small>
                        <v-select 
                            v-validate="'required'"
                            data-vv-validate-on="blur"
                            v-model="invoice_type"
                            name="invoice_type"
                            :closeOnSelect="true"
                            :options="['proforma invoice', 'invoice']" 
                            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                        />
                        <span class="text-danger text-sm">{{errors.first('invoice_type')}}</span>
                    </div>
                </div>
                <div class="mb-6">
                    <small class="mt-2">Choose any of the below</small>
                    <ul class="demo-alignment mb-3">
                        <li>
                            <vs-checkbox v-model="checkProduct">Products</vs-checkbox>
                        </li>
                        <li>
                            <vs-checkbox v-model="checkService">Services</vs-checkbox>
                        </li>
                    </ul>
                </div>
                <div v-if="checkProduct" class="mb-6">
                    <p class="mb-4"> <strong>Products</strong> <vs-button size="small" class="ml-6" @click="addNewProduct">New</vs-button></p>
                    <div class="vx-row mb-6" v-for="(prod, index) in productItems" :key="index">
                            <div class="vx-col w-full sm:w-1/3 md:w-1/2 lg:w-1/4 xl:w-1/4">
                                <v-select
                                    v-model="prod.product"
                                    :closeOnSelect="true"
                                    label="name"
                                    @search="searchProducts"
                                    :options="products"
                                    :reduce="products => ({
                                        pid: products.pid,
                                        name: products.name,
                                        price: products.selling_price
                                    })" 
                                    :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                                />
                            </div>
                            <div class="vx-col w-full sm:w-1/3 md:w-1/2 lg:w-1/4 xl:w-1/4" style="margin-right: 9%">
                                <vs-input type="number" placeholder="Enter Quantity" v-model="prod.quantity" @keyup="calculateTotalPrice(index)"/>
                            </div>
                            <div class="vx-col w-full sm:w-1/3 md:w-1/2 lg:w-1/4 xl:w-1/4">
                                <vs-input placeholder="Total Price" style="background: #f1f1f1" v-model="prod.total_price" readonly />
                            </div>
                            <feather-icon icon="TrashIcon" style="margin-left: 11%; color: #C00C10" v-if="index !== 0" svgClasses="w-5 h-5 hover:text-danger stroke-current" @click="clearProduct(index)" />
                    </div>
                </div>

                <div v-if="checkService">
                    <p class="mb-4"> <strong>Services</strong><vs-button size="small" class="ml-6" @click="addNewService">New</vs-button></p>
                    <div class="vx-row mb-3" v-for="(serv, index) in serviceItems" :key="index">
                        <div class="vx-col w-full sm:w-1/3 md:w-1/2 lg:w-1/4 xl:w-1/4">
                                <v-select
                                    v-model="serv.service"
                                    :closeOnSelect="true"
                                    label="name"
                                    :options="services" 
                                    @search="searchServices"
                                    :reduce="services => ({
                                        svid: services.svid,
                                        name: services.name,
                                        price: services.selling_price
                                    })"
                                    :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                                />
                        </div>
                        <div class="vx-col w-full sm:w-1/3 md:w-1/2 lg:w-1/4 xl:w-1/4" style="margin-right: 9%">
                                <vs-input type="number" placeholder="Enter Quantity" v-model="serv.quantity" @keyup="calculateServiceTotalPrice(index)"/>
                        </div>
                        <div class="vx-col w-full sm:w-1/3 md:w-1/2 lg:w-1/4 xl:w-1/4">
                            <vs-input placeholder="Total Price" style="background: #f1f1f1" v-model="serv.total_price" readonly />
                        </div>
                        <feather-icon icon="TrashIcon" style="margin-left: 11%; color: #C00C10" v-if="index !== 0" svgClasses="w-5 h-5 hover:text-danger stroke-current" @click="clearService(index)" />

                    </div>
                </div>

                <div slot="footer" class="pt-8">
                    <vs-button class="mr-6" @click="createInvoice" :disabled="!isFormValid">Submit</vs-button>
                    <vs-button type="border" color="danger" @click="activePrompt = false">Cancel</vs-button>
                </div>
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
            invoice_type: '',
            cid: '',
            product: [],
            service: [],
            checkProduct: false,
            checkService: false,
            serviceItems: [{
                quantity: '',
                total_price: '',
                service: ''
            }],
            productItems: [{
                quantity: '',
                total_price: '',
                product: ''
            }],

            showModal: true

        }
    },
    computed: {
        products () {
          return this.$store.state.product.products
        },

        services () {
          return this.$store.state.service.services
        },

        customers () {
          return this.$store.state.customer.customers
        },

        isFormValid () {
            return !this.errors.any() &&
             this.invoice_type !== '' &&
             this.name !== '' &&
             this.cid !== ''
        },

        activePrompt:{
           get() {
                return this.displayPrompt
           },

           set(value) {
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

      addNewProduct() {
        this.productItems.push({
            quantity: '',
            total_price: '',
            product: ''
        })
      },

      clearProduct(index) {
        this.productItems.splice(index, 1)
      },

      addNewService() {
        this.serviceItems.push({
            quantity: '',
            total_price: '',
            service: ''
        })
      },

      clearService(index) {
        this.serviceItems.splice(index, 1)
      },
      createInvoice () {
        const obj = {
            name: this.name,
            cid: this.cid,
            product: this.product,
            service: this.service,
            invoice_type: this.invoice_type,
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('invoice/addInvoice', obj)
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
        this.cid = ''
        this.invoice_type = ''
        this.checkProduct = false
        this.checkService = false
        this.product = []
        this.service = []
        this.serviceItems = [{
            quantity: '',
            total_price: '',
            service: ''
        }]
        this.productItems = [{
            quantity: '',
            total_price: '',
            product: ''
        }]
      },

      searchCustomers(search) {
        this.$store.dispatch('customer/fetchCustomers', { currentPage: 1, itemsPerPage: 20, search })
      },

      searchProducts(search) {
        this.$store.dispatch('product/fetchProducts', { currentPage: 1, itemsPerPage: 20, search })
      },

      searchServices(search) {
        this.$store.dispatch('service/fetchServices', { currentPage: 1, itemsPerPage: 20, search })
      },

      calculateTotalPrice(index) {
        this.productItems[index].total_price = Number(this.productItems[index].product.price) * this.productItems[index].quantity
        const obj = Object.assign(this.productItems[index].product, { total_price:  this.productItems[index].total_price, quantity: this.productItems[index].quantity })
        this.product.push(obj)
      },

      calculateServiceTotalPrice(index) {
        this.serviceItems[index].total_price = Number(this.serviceItems[index].service.price) * this.serviceItems[index].quantity
        const obj = Object.assign(this.serviceItems[index].service, { total_price:  this.serviceItems[index].total_price, quantity: this.serviceItems[index].quantity })
        this.service.push(obj)
      }
    
    }
    
}
</script>

<style scoped>
.vs-con-input-label {
    width: 180px;
}
</style>