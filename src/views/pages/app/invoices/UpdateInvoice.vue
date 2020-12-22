<template>
  <div>
        <vs-popup
            fullscreen
            title="Create Invoice"
            :active.sync="activePrompt">
        <div>
            <div class="pr-6 pl-6">
                <div class="flex">
                    <div class="w-1/5"></div>
                    <div class="vx-col w-3/5">
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
                                    v-model="invoice.cid"
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
                                    v-model="invoice.invoice_type"
                                    name="invoice_type"
                                    @input="emptyDefaultItems"
                                    :closeOnSelect="true"
                                    :options="['proforma invoice', 'invoice', 'quotation']" 
                                    :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                                />
                                <span class="text-danger text-sm">{{errors.first('invoice_type')}}</span>
                            </div>
                        </div>
                        <div v-if="invoice_type === 'quotation'" class="vx-row mb-6">
                            <div class="vx-col w-full">
                                <small class="ml-2">Quotation Type</small>
                                <v-select 
                                    v-validate="'required'"
                                    data-vv-validate-on="blur"
                                    v-model="invoice.quotation"
                                    name="quotation"
                                    @input="getDefaultItems"
                                    :closeOnSelect="true"
                                    :options="['installation', 'repairs']" 
                                    :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                                />
                                <span class="text-danger text-sm">{{errors.first('quotation')}}</span>
                            </div>
                        </div>
                        <div class="mb-6">
                            <div class="mb-4 ml-2"> <vs-button size="small" @click="addNewProduct">New</vs-button></div>
                            <div class="vx-row mb-3" v-for="(prod, index) in invoice.InvoiceItems" :key="index">
                                    <div class="w-1/3 mr-2">
                                        <v-select
                                            v-model="prod.product"
                                            :closeOnSelect="true"
                                            label="name"
                                            @search="searchProducts"
                                            @input="selectProduct(index)"
                                            :options="products"
                                            :reduce="products => ({
                                                item_id: products.pid,
                                                item: products.name,
                                                price: products.selling_price,
                                                label: products.label,
                                            })" 
                                            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                                        />
                                    </div>
                                    <div class="w-1/3 mr-2">
                                        <vs-input type="number" class="w-full" placeholder="Enter Quantity" v-model="prod.quantity" @keyup="calculateTotalPrice(index)"/>
                                    </div>
                                    <div class="w-1/4">
                                        <vs-input placeholder="Total Price" class="w-full" style="background: #f1f1f1" v-model="prod.price" readonly />
                                    </div>
                                    <feather-icon icon="TrashIcon" class="ml-3" v-if="index !== 0" svgClasses="w-5 h-5 hover:text-danger text-danger stroke-current" @click="clearProduct(index)" />
                            </div>
                        </div>

                          <ul class="centerx mt-4">
                            <li>
                                <vs-checkbox v-model="should_include_vat">Include VAT</vs-checkbox>
                            </li>
                        </ul>
                        <div slot="footer" class="pt-8">
                            <vs-button class="mr-6" @click="createInvoice" :disabled="!isFormValid">Submit</vs-button>
                            <vs-button type="border" color="danger" @click="activePrompt = false">Cancel</vs-button>
                        </div>
                    </div>
                    <div class="w-1/5"></div>
                </div>
            </div>
        </div>
        </vs-popup>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import axios from '../../../../axios'
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
    components: {
        vSelect
    },
    data() {
        return {
            name: '',
            invoice_type: '',
            should_include_vat: false,
            cid: '',
            quotation: '',
            product: [],
            service: [],
            defaults: [],
            items: [],
            checkProduct: false,
            checkService: false,
            serviceItems: [{
                quantity: '',
                item: '',
                item_id: '',
                price: '',
                service: '',
                label: ''
            }],
            productItems: [{
                quantity: '',
                item: '',
                item_id: '',
                price: '',
                product: '',
                label: ''
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

        invoice () {
          return this.$store.state.invoice.invoice
        },

        // defaults () {
        //   return this.$store.state.utilities.defaults
        // },

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

      addNewProduct() {
        this.productItems.push({
            quantity: '',
            item: '',
            item_id: '',
            price: '',
            product: '',
            label: ''
        })
      },

      clearProduct(index) {
        this.productItems.splice(index, 1)
      },

      addNewService() {
        this.serviceItems.push({
            quantity: '',
            item: '',
            item_id: '',
            price: '',
            service: '',
            label: ''
        })
      },

      clearService(index) {
        this.serviceItems.splice(index, 1)
      },

      clearDefault(index) {
        this.defaults.splice(index, 1)
      },
      
      selectProduct(index) {
        this.productItems[index].item = this.productItems[index].product.item
        this.productItems[index].item_id = this.productItems[index].product.item_id
        this.productItems[index].price = this.productItems[index].product.price
        this.productItems[index].label = this.productItems[index].product.label
      },

      selectService(index) {
        this.serviceItems[index].item = this.serviceItems[index].service.item
        this.serviceItems[index].item_id = this.serviceItems[index].service.item_id
        this.serviceItems[index].price = this.serviceItems[index].service.price
        this.serviceItems[index].label = this.serviceItems[index].service.label
      },
      
      createInvoice () {
        let obj
        if(this.productItems[0].product) {
            this.items = [...this.defaults, ...this.productItems]
            obj = {
                name: this.name,
                cid: this.cid,
                product: this.items,
                invoice_type: this.invoice_type,
                should_include_vat: this.should_include_vat
            }
        } else if(this.serviceItems[0].service) {
            this.items = [...this.defaults, ...this.serviceItems]
            obj = {
                name: this.name,
                cid: this.cid,
                product: this.items,
                invoice_type: this.invoice_type,
                should_include_vat: this.should_include_vat
            }
        } else {
            obj = {
                name: this.name,
                cid: this.cid,
                product: this.defaults,
                invoice_type: this.invoice_type,
                should_include_vat: this.should_include_vat
            }
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('invoice/addInvoice', obj)
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
        this.name = ''
        this.cid = ''
        this.invoice_type = ''
        this.checkProduct = false
        this.checkService = false
        this.should_include_vat = false
        this.product = []
        this.service = []
        this.defaults = []
        this.items = []
        this.serviceItems = [{
            quantity: '',
            item: '',
            item_id: '',
            price: '',
            product: '',
            label: ''
        }]
        this.productItems = [{
            quantity: '',
            item: '',
            item_id: '',
            price: '',
            product: '',
            label: ''
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

      getDefaultItems() {
        if (this.quotation === 'installation') axios.get('/utilities/default', { params: { currentPage: 1, pageLimit: 20, filter: 'Installation' } }).then((response) => { this.defaults = response.data.data.docs }).catch((error) => { this.handleError(error) })
        else axios.get('/utilities/default', { params: { currentPage: 1, pageLimit: 20, filter: 'Repairs' } }).then((response) => { this.defaults = response.data.data.docs }).catch((error) => { this.handleError(error) })
      },

      emptyDefaultItems() {
          this.quotation = ''
          this.defaults = []
      },
    //   getDefaultItems() {
    //     if (this.quotation === 'installation') this.$store.dispatch('utilities/fetchDefaults', { currentPage: 1, itemsPerPage: 20, filter: 'Installation' })
    //     else this.$store.dispatch('utilities/fetchDefaults', { currentPage: 1, itemsPerPage: 20, filter: 'Repairs' })
    //   },


      calculateTotalPrice(index) {
        this.productItems[index].price = Number(this.productItems[index].product.price) * this.productItems[index].quantity
        // Object.assign(this.productItems[index].product, { price:  this.productItems[index].price, quantity: this.productItems[index].quantity })
      },

      calculateServiceTotalPrice(index) {
        this.serviceItems[index].price = Number(this.serviceItems[index].service.price) * this.serviceItems[index].quantity
        // Object.assign(this.serviceItems[index].service, { price:  this.serviceItems[index].price, quantity: this.serviceItems[index].quantity })
      },
    },

    created() {
        this.$store.dispatch('invoice/fetchOneInvoice', { invoice_id: this.data })
    }
    
}
</script>

<style scoped>
</style>