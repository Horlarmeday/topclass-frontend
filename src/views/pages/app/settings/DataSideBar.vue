<!-- =========================================================================================
  File Name: DataSidebar.vue
  Description: Add New Data - Sidebar component
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} SETTING</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">

        <small class="ml-2">Select Field</small>
        <v-select 
            v-validate="'required'"
            data-vv-validate-on="blur"
            class="mt-5 w-full"
            v-model="name"
            name="field"
            :closeOnSelect="true" 
            :options="settingFields" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
        />
        <span class="text-danger text-sm" v-show="errors.has('field')">{{ errors.first('field') }}</span>

        <!-- VALUE -->
        <vs-input
          label="Value"
          v-model="value"
          class="mt-5 w-full"
          v-validate="'required'"
          data-vv-validate-on="blur"
          name="value" />
        <span class="text-danger text-sm" v-show="errors.has('value')">{{ errors.first('value') }}</span>

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
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    VuePerfectScrollbar,
    vSelect
  },
  data () {
    return {
      stid: null,
      name: '',
      value: null,

      settingFields: [
        'VAT',
        'companyName'
      ],

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
        console.log(this.data)
        const { name, stid, value } = JSON.parse(JSON.stringify(this.data))
        this.stid = stid
        this.name = name
        this.value = value
        this.initValues()
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
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
      return !this.errors.any() && this.name && this.value
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    initValues () {
      if (this.data.id) return
      this.stid = null
      this.name = ''
      this.value = null
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
          color:'primary',
          position:'top-center',
          iconPack: 'feather',
          icon:'icon-alert-circle'
      });
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            stid: this.stid,
            name: this.name,
            value: this.value,
          }
          this.$vs.loading()

          if (this.stid !== null && this.stid >= 0) {
            this.$store.dispatch('setting/updateSetting', obj)
                .then(response => {
                    this.handleSuccess(response)
                    this.$emit('closeSidebar')
                    this.initValues()
                }).catch(err => { this.handleError(err) })
          } else {
            delete obj.stid
            this.$store.dispatch('setting/addSetting', obj)
                .then(response => {
                    this.handleSuccess(response)
                    this.$emit('closeSidebar')
                    this.initValues()
                }).catch(err => { this.handleError(err) })
          }
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
