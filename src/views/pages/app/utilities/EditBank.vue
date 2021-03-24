<!-- =========================================================================================
  File Name: EditCustomer.vue
  Description: Edit Bank - Sidebar component
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} BANK DETAIL</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">
            <div class="vx-row mb-3">
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <vs-input
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        label="Account Name"
                        name="name"
                        v-model="account_name"
                        class="w-full"
                        type="text"
                    />
                    <span class="text-danger text-sm">{{errors.first('name')}}</span>
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <vs-input
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        label="Account Number"
                        name="account_number"
                        v-model="account_number"
                        type="text"
                        class="w-full"
                    />
                    <span class="text-danger text-sm">{{errors.first('account_number')}}</span>
                </div>
            </div>
            <div class="vx-row mb-3">
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <vs-input
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        label="Bank Name"
                        name="bank_name"
                        type="text"
                        v-model="bank_name"
                        class="w-full"
                    />
                    <span class="text-danger text-sm">{{errors.first('bank_name')}}</span>
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <vs-input
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        label="Sort Code"
                        name="sort_code"
                        v-model="sort_code"
                        type="text"
                        class="w-full"
                    />
                    <span class="text-danger text-sm">{{errors.first('sort_code')}}</span>
                </div>
            </div>   
            <div class="vx-row mb-3">
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <small class="ml-2">Tin Number</small>
                <vs-input
                    v-validate="'required'"
                    data-vv-validate-on="blur"
                    name="tin_number"
                    v-model="tin_number"
                    class="w-full"
                    type="text"
                />
                <span class="text-danger text-sm">{{errors.first('tin_number')}}</span>
            </div>
            </div>
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import vSelect from 'vue-select'
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
      bank_id: null,
      bank_name: '',
      account_number: null,
      account_name: null,
      sort_code: null,
      tin_number: null,
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
        const { bank_id, bank_name, account_number, account_name, sort_code, tin_number } = JSON.parse(JSON.stringify(this.data))
        this.bank_id = bank_id
        this.bank_name = bank_name
        this.account_number = account_number
        this.account_name = account_name
        this.sort_code = sort_code
        this.tin_number = tin_number
        // this.initValues()
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
    // isFormValid () {
    //   return !this.errors.any() &&
    //          this.name !== '' &&
    //          this.selling_price !== '' && 
    //          this.desc !== '' && 
    //          this.quantity !== '' && 
    //          this.cost !== '' && 
    //          this.unit !== '' &&
    //          this.label !== ''
    // },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    initValues () {
      if (this.data.pid) return
      this.bank_id = null
      this.bank_name = null
      this.account_name = null
      this.account_number = null
      this.sort_code = null
      this.tin_number = null
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
            bank_id: this.bank_id,
            bank_name: this.bank_name,
            account_number: this.account_number,
            account_name: this.account_name,
            sort_code: this.sort_code,
            tin_number: this.tin_number,

          }
          if (this.bank_id !== null && this.bank_id >= 0)
            this.$store.dispatch('utilities/updateBank', obj)
            .then(response => {
                this.handleSuccess(response)
                this.$emit('closeSidebar')
                this.initValues()
            })
            .catch(err => { this.handleError(err) })
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
