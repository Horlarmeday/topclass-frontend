<!-- =========================================================================================
  File Name: EditCustomer.vue
  Description: Edit Customer - Sidebar component
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} CUSTOMER</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">

        <!-- NAME -->
        <vs-input label="Name" v-model="name" class="mt-5 w-full" name="item-name" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-name')">{{ errors.first('item-name') }}</span>

        <!-- PHONE -->
        <vs-input label="Phone" v-model="phone" class="mt-5 w-full" name="item-phone" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-phone')">{{ errors.first('item-phone') }}</span>

        <!-- EMAIL -->
        <vs-input label="Name" v-model="email" class="mt-5 w-full" name="item-email" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-email')">{{ errors.first('item-email') }}</span>

        <!-- STATE -->
        <small class="ml-2">State</small>
        <v-select 
            v-validate="'required'"
            data-vv-validate-on="blur"
            class="mt-5 w-full"
            v-model="state"
            @input="getCities"
            name="item-state"
            :closeOnSelect="true" 
            :options="states" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
        />
        <span class="text-danger text-sm" v-show="errors.has('item-state')">{{ errors.first('item-state') }}</span>

        <!-- LGA -->
        <small class="ml-2">LGA</small>
        <v-select 
            v-validate="'required'"
            data-vv-validate-on="blur"
            class="mt-5 w-full"
            v-model="lga"
            name="item-lga"
            :closeOnSelect="true" 
            :options="cities" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
        />
        <span class="text-danger text-sm" v-show="errors.has('item-lga')">{{ errors.first('item-lga') }}</span>

        <!-- CUSTOMER TYPE -->
        <small class="ml-2">Customer Type</small>
        <v-select 
            v-validate="'required'"
            data-vv-validate-on="blur"
            class="mt-5 w-full"
            v-model="customer_type"
            name="item-customer_type"
            :closeOnSelect="true" 
            :options="customerTypesOptions" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
            />
        <span class="text-danger text-sm" v-show="errors.has('item-customer_type')">{{ errors.first('item-customer_type') }}</span>
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
import NaijaStates from 'naija-state-local-government'
import vSelect from 'vue-select'
import data from "./customerOptions";
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
    vSelect
  },
  data () {
    return {
      cid: null,
      name: '',
      phone: null,
      email: null,
      customer_type: null,
      state: null,
      lga: null,
      states: [],
      cities: [],
      customerTypesOptions: data,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  created() {
    this.getStates()
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        const { cid, phone, name, customer_type, state, lga, email } = JSON.parse(JSON.stringify(this.data))
        this.cid = cid
        this.phone = phone
        this.email = email
        this.customer_type = customer_type
        this.state = state
        this.name = name
        this.lga = lga
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
             this.name &&
             this.phone && 
             this.email && 
             this.state && 
             this.lga && 
             this.customer_type
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    initValues () {
      if (this.data.cid) return
      this.cid = null
      this.name = null
      this.phone = null
      this.customer_type = null
      this.state = null
      this.lga = null
      this.email = null
    },
    getStates() {
      this.states = NaijaStates.states()
    },

    getCities() {
      this.lga = ''
      const cities = NaijaStates.lgas(`${this.state}`)
      this.cities = cities.lgas
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
            cid: this.cid,
            name: this.name,
            phone: this.phone,
            email: this.email,
            customer_type: this.customer_type,
            state: this.state,
            lga: this.lga
          }
          if (this.cid !== null && this.cid >= 0)
            this.$store.dispatch('customer/updateCustomer', obj)
            .then(response => {
              this.handleSuccess(response)
              this.$emit('closeSidebar')
              this.initValues()
            }).catch(err => { this.handleError(err) })
        }
      })
    }
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
