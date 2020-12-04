<!-- =========================================================================================
  File Name: ViewAsset.vue
  Description: View Asset - Sidebar component
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "VIEW" }} ASSET</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">

        <!-- NAME -->
        <vs-input label="Name" v-model="name" class="mt-5 w-full" readonly/>

        <vs-input label="Cost" v-model="cost" class="mt-5 w-full" readonly/>

        <vs-input label="Depreciation" v-model="depreciation" class="mt-5 w-full" readonly/>

        <vs-input label="Duration" v-model="duration" class="mt-5 w-full" readonly/>

        <vs-input label="Location" v-model="location" class="mt-5 w-full" readonly/>

        <vs-input label="Quantity" v-model="quantity" class="mt-5 w-full mb-5" readonly/>

        <small class="ml-2">Date Purchased</small>
        <datepicker v-model="date_purchased" name="date_purchased" readonly></datepicker>

        <p class="mt-4">CREATED BY: <span class="ml-3">{{ staff }}</span></p>
        
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <!-- <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Submit</vs-button> -->
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
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
    Datepicker
  },
  data () {
    return {
      name: '',
      date_purchased: null,
      cost: null,
      depreciation: null,
      duration: null,
      location: null,
      quantity: null,
      staff: null,
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
        const { cost, quantity, name, location, depreciation, duration, date_purchased, Staff } = JSON.parse(JSON.stringify(this.data))
        this.cost = cost
        this.quantity = quantity
        this.name = name
        this.location = location
        this.depreciation = depreciation
        this.duration = duration
        this.date_purchased = date_purchased
        this.staff = Staff.fullname
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
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    initValues () {
      if (this.data.asid) return
      this.name = null
      this.quantity = null
      this.location = null
      this.duration = null
      this.date_purchased = null
      this.quantity = null
      this.depreciation = null
      this.staff = null
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
