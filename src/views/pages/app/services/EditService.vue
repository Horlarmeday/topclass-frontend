<!-- =========================================================================================
  File Name: EditService.vue
  Description: Edit Service - Sidebar component
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} SERVICE</h4>
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
                        label="Name"
                        name="name"
                        v-model="name"
                        class="w-full"
                    />
                    <span class="text-danger text-sm">{{errors.first('name')}}</span>
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <vs-input
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        label="Quantity"
                        name="quantity"
                        v-model="quantity"
                        type="number"
                        class="w-full"
                    />
                    <span class="text-danger text-sm">{{errors.first('quantity')}}</span>
                </div>
            </div>
            <div class="vx-row mb-3">
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <vs-input
                    v-validate="'required'"
                    data-vv-validate-on="blur"
                    label="Selling Price"
                    name="selling_price"
                    v-model="selling_price"
                    type="number"
                    class="w-full"
                />
                <span class="text-danger text-sm">{{errors.first('selling_price')}}</span>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <small class="ml-2">Unit</small>
                <v-select 
                    v-validate="'required'"
                    data-vv-validate-on="blur"
                    name="unit"
                    v-model="unit"
                    @search="searchUnits"
                    :reduce="units => units.name"
                    :closeOnSelect="true" 
                    :options="units" 
                    :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                />
                <span class="text-danger text-sm">{{errors.first('unit')}}</span>
            </div>
            </div>
            <div class="vx-row mb-3">
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <small class="ml-2">Description</small>
                <vs-textarea
                    v-validate="'required'"
                    data-vv-validate-on="blur"
                    name="desc"
                    v-model="desc"
                    class="w-full"
                />
                <span class="text-danger text-sm">{{errors.first('desc')}}</span>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <small class="ml-2">Comment</small>
                <vs-textarea
                    v-validate="'required'"
                    data-vv-validate-on="blur"
                    name="comment"
                    v-model="comment"
                    class="w-full"
                />
                <span class="text-danger text-sm">{{errors.first('comment')}}</span>
            </div>
            </div>
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
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar,
    vSelect
  },
  data () {
    return {
      svid: null,
      name: '',
      quantity: null,
      desc: null,
      selling_price: null,
      comment: null,
      unit: null,
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
        const { svid, name, selling_price, desc, comment, unit, quantity } = JSON.parse(JSON.stringify(this.data))
        this.svid = svid
        this.name = name
        this.selling_price = selling_price
        this.name = name
        this.desc = desc
        this.comment = comment
        this.unit = unit
        this.quantity = quantity
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
             this.selling_price && 
             this.desc && 
             this.comment && 
             this.quantity &&
             this.unit
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },

    units () {
      return this.$store.state.utilities.units
    },
  },
  methods: {
    initValues () {
      if (this.data.svid) return
      this.svid = null
      this.name = null
      this.selling_price = null
      this.desc = null
      this.comment = null
      this.quantity = null
      this.unit = null
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
            svid: this.svid,
            name: this.name,
            selling_price: this.selling_price,
            unit: this.unit,
            desc: this.desc,
            comment: this.comment,
            quantity: this.quantity
          }
          if (this.svid !== null && this.svid >= 0)
            this.$store.dispatch('service/updateService', obj)
            .then(response => {
                this.handleSuccess(response)
                this.$emit('closeSidebar')
                this.initValues()
            })
            .catch(err => { this.handleError(err) })
        }
      })
    },

    searchUnits(search) {
      this.$store.dispatch('utilities/fetchUnits', { currentPage: 1, itemsPerPage: 20, search })
    },
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
