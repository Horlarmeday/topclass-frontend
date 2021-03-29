<!-- =========================================================================================
  File Name: EditEmployee.vue
  Description: Edit Employee - Sidebar component
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} WAYBILL</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">
        <!-- CUSTOMER -->
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

        <!-- INVOICE -->
        <small class="ml-2">Invoice</small>
        <v-select 
            v-validate="'required'"
            data-vv-validate-on="blur"
            v-model="ivid"
            label="name"
            name="invoice_type"
            @search="searchInvoices"
            :reduce="invoices => invoices.ivid" 
            :closeOnSelect="true"
            :options="invoices" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
        />
        <span class="text-danger text-sm">{{errors.first('invoice_type')}}</span>

        <!-- VEHICLE NUMBER -->
        <vs-input label="Vehicle Number" v-model="vehicle_numb" class="mt-5 w-full" name="vehicle_numb" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('vehicle_numb')">{{ errors.first('vehicle_numb') }}</span>

        <!-- DRIVER NAME -->
        <vs-input label="Driver Name" v-model="driver_name" class="mt-5 w-full" name="driver_name" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('driver_name')">{{ errors.first('driver_name') }}</span>

        <!-- DRIVER PHONE -->
        <vs-input label="Driver Phone" v-model="driver_phone" class="mt-5 w-full" name="driver_phone" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('driver_phone')">{{ errors.first('driver_phone') }}</span>

        <small class="ml-2">Date of Transaction</small>
        <datepicker input-class="mb-3" placeholder="Date" v-model="date_of_transaction" name="date_of_transaction"/> 
        <span class="text-danger text-sm" v-show="errors.has('driver_phone')">{{ errors.first('driver_phone') }}</span>

      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import vSelect from 'vue-select'
import Datepicker from 'vuejs-datepicker';
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar,
    vSelect,
    Datepicker
  },
  data () {
    return {
      driver_name: '',
      driver_phone: '',
      date_of_transaction: '',
      ivid: '',
      cid: '',
      wyid: '',
      vehicle_numb: '',
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        const { wyid, driver_phone, driver_name, vehicle_numb, ivid, cid, date_of_transaction } = JSON.parse(JSON.stringify(this.data))
        this.wyid = wyid
        this.driver_phone = driver_phone
        this.driver_name = driver_name
        this.vehicle_numb = vehicle_numb
        this.ivid = ivid
        this.cid = cid
        this.date_of_transaction = date_of_transaction
        this.initValues()
      }
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
          // this.$validator.reset()
          // this.initValues()
        }
      }
    },
    isFormValid () {
      return !this.errors.any() &&
             this.driver_name &&
             this.driver_phone && 
             this.vehicle_numb && 
             this.ivid && 
             this.cid
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },
    
    invoices () {
        return this.$store.state.invoice.invoices
    },

    customers () {
        return this.$store.state.customer.customers
    },
  },
  methods: {
    initValues () {
      if (this.data.wyid) return
      this.wyid = null
      this.driver_name = null
      this.driver_phone = null
      this.vehicle_numb = null
      this.cid = null
      this.ivid = null
      this.date_of_transaction = null
    },
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
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            wyid: this.wyid,
            driver_name: this.driver_name,
            driver_phone: this.driver_phone,
            vehicle_numb: this.vehicle_numb,
            cid: this.cid,
            ivid: this.ivid,
            date_of_transaction: this.date_of_transaction
          }
          if (this.wyid !== null && this.wyid >= 0)
            this.$store.dispatch('waybill/updateWaybill', obj)
            .then(response => {
                this.handleSuccess(response)
                this.$emit('closeSidebar')
                this.initValues()
            })
            .catch(err => { this.handleError(err) })
        }
      })
    },

    searchCustomers(search) {
        this.$store.dispatch('customer/fetchCustomers', { currentPage: 1, itemsPerPage: 20, search })
    },

    searchInvoices(search) {
        this.$store.dispatch('invoice/fetchInvoices', { currentPage: 1, itemsPerPage: 20, search })
    },


  },
  created() {
    this.$store.dispatch('customer/fetchCustomers', { currentPage: 1, itemsPerPage: 20 })

    this.$store.dispatch('invoice/fetchInvoices', { currentPage: 1, itemsPerPage: 20 })
  }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

    &:not(.ps) {
      overflow-y: auto;
    }
}
</style>
