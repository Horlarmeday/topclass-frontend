<template>
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
                                v-model="quotation"
                                name="quotation"
                                @input="getDefaultItems"
                                :closeOnSelect="true"
                                :options="['installation', 'repairs']" 
                                :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                            />
                            <span class="text-danger text-sm">{{errors.first('quotation')}}</span>
                        </div>
                    </div>
                    <br>
                    <h4>
                        ITEM(S) 
                        <em v-if="invoiceItems.length">Delete the item/product you want to update from the table and add a new one</em>
                    </h4>
                    <div class="vx-row">
                        <!-- CARD 9: SALES ITEMS -->
                        <div class="vx-col w-full">
                            <div slot="no-body" class="mt-4">
                                <vs-table :data="invoiceItems" class="table-dark-inverted">
                                <template slot="thead">
                                    <vs-th>S/N</vs-th>
                                    <vs-th>ITEM</vs-th>
                                    <vs-th>PRICE (₦)</vs-th>
                                    <vs-th>QUANTITY</vs-th>
                                    <vs-th>ACTION</vs-th>
                                </template>

                                <template slot-scope="{data}">
                                    <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                                        <vs-td :data="data[indextr]">
                                            <span>{{ indextr + 1 }}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].item">
                                            <span>{{data[indextr].item}}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].price">
                                            <span>{{Number(data[indextr].price).toLocaleString()}}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].quantity">
                                            <span>{{data[indextr].quantity }}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].inv_id">
                                            <feather-icon icon="TrashIcon" class="ml-3" 
                                            svgClasses="w-5 h-5 hover:text-danger text-danger stroke-current" @click="deleteProduct(data[indextr].inv_id)" />
                                        </vs-td>
                                    </vs-tr>
                                </template>
                                </vs-table>
                            </div>
                        </div>
                    </div>

                    <div v-if="defaults.length" class="mb-6">
                            <p class="mb-2 ml-2"> <strong>Default Items</strong></p>
                            <div class="vx-row mb-2 ml-1" v-for="(prod, index) in defaults" :key="index">
                                <div class="w-1/3 mr-2">
                                    <vs-input type="text" class="w-full" v-model="prod.item" readonly />
                                </div>
                                <div class="w-1/3 mr-2">
                                    <vs-input type="number" class="w-full" v-model="prod.quantity" readonly/>
                                </div>
                                <div class="w-1/4">
                                    <vs-input class="w-full" style="background: #fcfcfc" v-model="prod.price" />
                                </div>
                                <feather-icon icon="TrashIcon" class="ml-3" svgClasses="w-5 h-5 hover:text-danger text-danger stroke-current" @click="clearDefault(index)" />
                            </div>
                    </div>

                    <div class="mb-2 mt-4">
                        <small v-if="invoice_type !== 'quotation'" class="ml-2">Click <a href="#" @click="checkProduct = 'products'">here</a> to add products</small>
                        <small v-if="defaults.length" class="ml-2">Want to add more? Click <a href="#" @click="checkProduct = 'products'">here</a></small>
                        <ul class="demo-alignment ml-2" v-if="checkProduct">
                            <li>
                                <vs-radio v-model="checkProduct" vs-value="products">Products</vs-radio>
                            </li>
                            <li>
                                <vs-radio v-model="checkProduct" vs-value="services">Services</vs-radio>
                            </li>
                            <li>
                                <a href="#" @click="addNewProduct" v-if="checkProduct === 'products'">
                                <feather-icon icon="PlusIcon" class="ml-5" svgClasses="w-6 h-6 hover:text-success text-success stroke-current" />
                                </a>
                                <a href="#" @click="addNewService" v-if="checkProduct === 'services'">
                                <feather-icon icon="PlusIcon" class="ml-5" svgClasses="w-6 h-6 hover:text-info text-info stroke-current" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <br>
                    <div v-if="checkProduct === 'products'" class="mb-6">
                        <div class="vx-row mb-3 ml-1" v-for="(prod, index) in productItems" :key="index">
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
                                    <vs-input placeholder="Total Price" class="w-full" style="background: #f1f1f1" v-model="prod.price" />
                                </div>
                                <feather-icon icon="TrashIcon" class="ml-3" svgClasses="w-5 h-5 hover:text-danger text-danger stroke-current" @click="clearProduct(index)" />
                        </div>
                    </div>

                    <div v-if="checkProduct === 'services'" class="mb-6">
                        <div class="vx-row mb-3 ml-1" v-for="(serv, index) in serviceItems" :key="index">
                            <div class="w-1/3 mr-2">
                                <v-select
                                    v-model="serv.service"
                                    :closeOnSelect="true"
                                    label="name"
                                    :options="services" 
                                    @search="searchServices"
                                    @input="selectService"
                                    :reduce="services => ({
                                        item_id: services.svid,
                                        item: services.name,
                                        price: services.selling_price,
                                        label: services.label,
                                    })"
                                    :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                                />
                            </div>
                            <div class="w-1/3 mr-2">
                                    <vs-input type="number" class="w-full" placeholder="Enter Quantity" v-model="serv.quantity" @keyup="calculateServiceTotalPrice(index)"/>
                            </div>
                            <div class="w-1/4">
                                <vs-input placeholder="Total Price" class="w-full" style="background: #f1f1f1" v-model="serv.price" />
                            </div>
                            <feather-icon icon="TrashIcon" class="ml-3" svgClasses="w-5 h-5 hover:text-danger text-danger stroke-current" @click="clearService(index)" />

                        </div>
                    </div>

                    <div v-if="invoice_type === 'proforma invoice'">
                        <div class="vx-row mb-2">
                            <div class="vx-col w-full">
                                <vs-input class="w-full" label="Country of Origin" v-model="country_of_origin" />
                            </div>
                        </div>
                        <div class="vx-row mb-2">
                            <div class="vx-col w-full">
                                <vs-input class="w-full" label="Condition of Sale" v-model="condition_of_sale" />
                            </div>
                        </div>
                        <div class="vx-row mb-2">
                            <div class="vx-col w-full">
                                <vs-input class="w-full" label="Terms of Payment" v-model="terms_of_payment" />
                            </div>
                        </div>
                        <div class="vx-row mb-2">
                            <div class="vx-col w-full">
                                <vs-input class="w-full" label="Delivery" v-model="delivery" />
                            </div>
                        </div>
                        <div class="vx-row mb-2">
                            <div class="vx-col w-full">
                                <vs-input class="w-full" label="Validity" v-model="validity" />
                            </div>
                        </div>
                        <div class="vx-row mb-2">
                            <div class="vx-col w-full">
                                <vs-input class="w-full" label="Installation" v-model="installation" />
                            </div>
                        </div>
                        <div class="vx-row mb-2">
                            <div class="vx-col w-full">
                                <vs-input class="w-full" label="Place of Delivery" v-model="place_of_delivery" />
                            </div>
                        </div>
                        <div class="vx-row mb-2">
                            <div class="vx-col w-full">
                                <small class="ml-2">Bank</small>
                                <v-select 
                                    v-validate="'required'"
                                    data-vv-validate-on="blur"
                                    v-model="bank_id"
                                    label="bank_name"
                                    :closeOnSelect="true"
                                    :options="banks"
                                    :reduce="banks => banks.bank_id"
                                    :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                                />
                            </div>
                        </div>
                    </div>

                    <div class="vx-row mb-2">
                        <div class="vx-col w-full">
                            <small class="ml-2">Date of Transaction</small>
                            <datepicker input-class="mb-3" placeholder="Date" v-model="date_of_transaction" />
                        </div>
                    </div>
                    <ul class="centerx mt-4">
                            <li>
                                <vs-checkbox v-model="should_include_vat">Include VAT</vs-checkbox>
                            </li>
                          </ul>
                    <div slot="footer" class="pt-8">
                        <vs-button class="mr-6" @click="updateInvoice" :disabled="!isFormValid">Submit</vs-button>
                    </div>
                </div>
                <div class="w-1/5"></div>
            </div>
        </div>
    </div>
</template>

<script>
import vSelect from 'vue-select'
import axios from '../../../../axios'
import Datepicker from 'vuejs-datepicker';
export default {
    components: {
        vSelect,
        Datepicker
    },
    data() {
        return {
            name: '',
            invoice_type: '',
            should_include_vat: false,
            country_of_origin: '',
            condition_of_sale: '',
            terms_of_payment: '',
            delivery: '',
            validity: '',
            installation: '',
            place_of_delivery: '',
            date_of_transaction: '',
            bank_id: '',
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
                label: '',
                item_type: 'Service'
            }],
            productItems: [{
                quantity: '',
                item: '',
                item_id: '',
                price: '',
                product: '',
                label: '',
                item_type: 'Product'
            }],
            showModal: true,
            invoiceItems: []
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

        banks () {
            return this.$store.state.utilities.banks
        },

        paramInvoice () {
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
    watch: {
        paramInvoice: function() {
            const { 
                name, invoice_type, condition_of_sale, country_of_origin, terms_of_payment, delivery, validity,
                cid, bank_id, quotation, installation, place_of_delivery, date_of_transaction, InvoiceItems
            } = this.paramInvoice.invoice

            this.name = name
            this.invoice_type = invoice_type
            this.country_of_origin = country_of_origin
            this.condition_of_sale = condition_of_sale
            this.terms_of_payment = terms_of_payment
            this.delivery = delivery
            this.validity = validity,
            this.installation = installation
            this.place_of_delivery = place_of_delivery
            this.date_of_transaction = date_of_transaction
            this.bank_id = bank_id
            this.cid = cid
            this.quotation = quotation
            this.invoiceItems = InvoiceItems
        }
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

      deleteProduct(id) {
        const isOk = window.confirm('Are you sure you want to delete?')
        if(isOk) {
            axios.delete(`/invoices/invoice-item`, { data: { inv_id: id }})
            .then((response) => {
                const ItemIndex = this.invoiceItems.findIndex((i) => i.inv_id === id)
                this.invoiceItems.splice(ItemIndex, 1)
                this.handleSuccess(response)
            })
            .catch((error) => this.handleError(error))
        }
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
      
      updateInvoice () {
        let obj
        if(this.productItems[0].product) {
            this.items = [...this.defaults, ...this.productItems]
            obj = {
                name: this.name,
                cid: this.cid,
                product: this.items,
                invoice_type: this.invoice_type,
                should_include_vat: this.should_include_vat,
                country_of_origin: this.country_of_origin,
                condition_of_sale: this.condition_of_sale,
                terms_of_payment: this.terms_of_payment,
                delivery: this.delivery,
                validity: this.validity,
                installation: this.installation,
                place_of_delivery: this.place_of_delivery,
                bank_id: this.bank_id,
                date_of_transaction: this.date_of_transaction,
            }
        } else if(this.serviceItems[0].service) {
            this.items = [...this.defaults, ...this.serviceItems]
            obj = {
                name: this.name,
                cid: this.cid,
                product: this.items,
                invoice_type: this.invoice_type,
                should_include_vat: this.should_include_vat,
                country_of_origin: this.country_of_origin,
                condition_of_sale: this.condition_of_sale,
                terms_of_payment: this.terms_of_payment,
                delivery: this.delivery,
                validity: this.validity,
                installation: this.installation,
                place_of_delivery: this.place_of_delivery,
                bank_id: this.bank_id,
                date_of_transaction: this.date_of_transaction,
            }
        } else {
            obj = {
                name: this.name,
                cid: this.cid,
                product: this.defaults,
                invoice_type: this.invoice_type,
                should_include_vat: this.should_include_vat,
                country_of_origin: this.country_of_origin,
                condition_of_sale: this.condition_of_sale,
                terms_of_payment: this.terms_of_payment,
                delivery: this.delivery,
                validity: this.validity,
                installation: this.installation,
                place_of_delivery: this.place_of_delivery,
                bank_id: this.bank_id,
                date_of_transaction: this.date_of_transaction,
            }
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('invoice/updateInvoice', { id: this.$route.params.id, invoice: obj })
                .then(response => {
                    console.log(response)
                    this.handleSuccess(response)
                    this.initValues()
                    this.$router.push(`/app/invoices`)
                })
                .catch(err => { 
                    console.log(err)
                    this.handleError(err) 
                })
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
        this.country_of_origin = '',
        this.terms_of_payment = '',
        this.delivery = '',
        this.validity = '',
        this.condition_of_sale = '',
        this.installation = '',
        this.place_of_delivery = '',
        this.product = []
        this.service = []
        this.defaults = []
        this.items = []
        this.date_of_transaction = '',
        this.serviceItems = [{
            quantity: '',
            item: '',
            item_id: '',
            price: '',
            product: '',
            label: '',
            item_type: 'Service'
        }]
        this.productItems = [{
            quantity: '',
            item: '',
            item_id: '',
            price: '',
            product: '',
            label: '',
            item_type: 'Product'
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
        this.$store.dispatch('utilities/fetchBanks', { currentPage: 1, itemsPerPage: 20 })
        this.$store.dispatch('invoice/fetchParamInvoice', this.$route.params.id)
        this.$store.dispatch('customer/fetchCustomers', { currentPage: 1, itemsPerPage: 20 })
    }
    
}
</script>

<style scoped>
</style>