<!-- =========================================================================================
  File Name: EditEmployee.vue
  Description: Edit Employee - Sidebar component
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} EMPLOYEE</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">

        <!-- NAME -->
        <vs-input label="Name" v-model="fullname" class="mt-5 w-full" name="item-name" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-name')">{{ errors.first('item-name') }}</span>

        <!-- PHONE -->
        <vs-input label="Phone" v-model="phone" class="mt-5 w-full" name="item-phone" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-phone')">{{ errors.first('item-phone') }}</span>

        <!-- EMAIL -->
        <vs-input label="Name" v-model="email" class="mt-5 w-full" name="item-email" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-email')">{{ errors.first('item-email') }}</span>

        <!-- UsERNAME -->
        <vs-input label="Name" v-model="username" class="mt-5 w-full" name="item-username" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-username')">{{ errors.first('item-username') }}</span>

        <!-- ROLE -->
        <small class="ml-2">Role</small>
        <v-select 
            v-validate="'required'"
            data-vv-validate-on="blur"
            class="mt-5 w-full"
            v-model="role"
            name="item-role"
            :closeOnSelect="true" 
            :options="roles" 
            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
        />
        <span class="text-danger text-sm" v-show="errors.has('item-role')">{{ errors.first('item-role') }}</span>
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
import data from "./roles";
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
      sid: null,
      fullname: '',
      phone: null,
      email: null,
      username: null,
      role: null,
      roles: data,
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
        const { sid, phone, fullname, username, role, email } = JSON.parse(JSON.stringify(this.data))
        this.sid = sid
        this.phone = phone
        this.email = email
        this.username = username
        this.fullname = fullname
        this.role = role
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
             this.fullname &&
             this.phone && 
             this.email && 
             this.role && 
             this.username
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    initValues () {
      if (this.data.sid) return
      this.sid = null
      this.fullname = null
      this.phone = null
      this.username = null
      this.role = null
      this.email = null
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
            sid: this.sid,
            fullname: this.fullname,
            phone: this.phone,
            email: this.email,
            username: this.username,
            role: this.role
          }
          if (this.sid !== null && this.sid >= 0)
            this.$store.dispatch('employee/updateEmployee', obj)
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
