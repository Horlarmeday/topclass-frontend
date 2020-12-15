<template>
  <div>
        <vs-popup
            title="Create Default Item"
            :active.sync="activePrompt">
            <div>
                <div class="pr-6 pl-6">
                <div class="vx-col w-full mb-base">
                    <div class="mb-6">
                        <small class="mt-2">Choose any of the below</small>
                        <ul class="demo-alignment mb-3">
                            <li>
                                <vs-radio v-model="checkProduct" vs-value="products">Products</vs-radio>
                            </li>
                            <li>
                                <vs-radio v-model="checkProduct" vs-value="services">Services</vs-radio>
                            </li>
                        </ul>
                    </div>
                    <div class="vx-row mb-2">
                        <div class="vx-col w-full">
                            <small class="ml-2">Item</small>
                            <v-select 
                                v-if="checkProduct == 'products'"
                                v-validate="'required'"
                                data-vv-validate-on="blur"
                                v-model="pid"
                                label="name"
                                name="pid"
                                @input="selectProductPrice"
                                @search="searchProducts"
                                :closeOnSelect="true"
                                :reduce="products => ({
                                    item_id: products.pid,
                                    name: products.name,
                                    price: products.selling_price,
                                    label: products.label
                                })" 
                                :options="products" 
                                :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                            />
                            <span class="text-danger text-sm">{{errors.first('pid')}}</span>
                            <v-select
                                v-if="checkProduct == 'services'"
                                v-model="sid"
                                :closeOnSelect="true"
                                label="name"
                                name="sid"
                                :options="services" 
                                @input="selectServicePrice"
                                @search="searchServices"
                                :reduce="services => ({
                                    item_id: services.svid,
                                    name: services.name,
                                    price: services.selling_price,
                                    label: services.label
                                })"
                                :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                            />
                            <span class="text-danger text-sm">{{errors.first('sid')}}</span>
                        </div>
                    </div>
                    <div class="vx-row mb-2">
                        <div class="vx-col w-full">
                            <vs-input class="w-full" label="Price" v-model="price" name="price" readonly/>
                            <span class="text-danger text-sm">{{errors.first('price')}}</span>
                        </div>
                    </div>
                    <div class="vx-row mb-2">
                        <div class="vx-col w-full">
                            <vs-input class="w-full" @keyup="calculateTotalPrice" label="Quantity" v-model="quantity" name="quantity" />
                            <span class="text-danger text-sm">{{errors.first('quantity')}}</span>
                        </div>
                    </div>
                    <div class="vx-row mb-2">
                        <div class="vx-col w-full">
                            <small class="ml-2">Item Type</small>
                            <v-select
                                v-validate="'required'"
                                data-vv-validate-on="blur"
                                v-model="type"
                                name="type"
                                :closeOnSelect="true"
                                :options="['Installation', 'Repairs']" 
                                :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                            />
                            <span class="text-danger text-sm">{{errors.first('type')}}</span>
                        </div>
                    </div>

                    <div slot="footer" class="pt-8">
                        <vs-button class="mr-6" @click="createDefault" :disabled="!isFormValid">Submit</vs-button>
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
            type: '',
            item: '',
            item_id: '',
            label: '',
            pid: '',
            sid: '',
            quantity: '',
            price: '',
            checkProduct: 'products',


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
             this.type !== '' &&
             this.quantity !== '' &&
             this.item_id !== '' &&
             this.price !== '' &&
             this.item !== ''
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

      createDefault () {
        const obj = {
            type: this.type,
            item: this.item,
            item_id: this.item_id,
            label: this.label,
            quantity: this.quantity,
            price: this.price,
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('utilities/addDefault', obj)
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
        this.price = ''
        this.quantity = ''
        this.pid = ''
        this.sid = ''
        this.type = ''
        this.item = ''
        this.item_id = ''
        this.label = ''
        this.checkProduct = 'products'
      },

      searchProducts(search) {
        this.$store.dispatch('product/fetchProducts', { currentPage: 1, itemsPerPage: 20, search })
      },

      searchServices(search) {
        this.$store.dispatch('service/fetchServices', { currentPage: 1, itemsPerPage: 20, search })
      },

      selectProductPrice() {
        this.item = this.pid.name,
        this.item_id = this.pid.item_id
        this.price = this.pid.price
        this.label = this.pid.label
      },

      selectServicePrice() {
        this.item = this.sid.name,
        this.item_id = this.sid.item_id
        this.price = this.sid.price
        this.label = this.sid.label
      },

      calculateTotalPrice() {
        if (this.sid) this.price = Number(this.sid.price) * this.quantity
        else this.price = Number(this.pid.price) * this.quantity
      },
    
    }
    
}
</script>

<style scoped>
.vs-con-input-label {
    width: 180px;
}
</style>