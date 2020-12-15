<!-- =========================================================================================
  File Name: EditEmployee.vue
  Description: Edit Employee - Sidebar component
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>NOTIFICATIONS</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div class="p-6">
        <vs-tabs alignment="fixed">
            <vs-tab label="Notifications">
                <div class="mt-6">
                    <div></div>
                </div>
            </vs-tab>
            <vs-tab label="Audit Logs">
                <div class="mt-6">
                    <tab-audit-log></tab-audit-log>
                </div>
            </vs-tab>
        </vs-tabs>
      </div>
    </component>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import TabAuditLog from './TabAuditLog'
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
  },
  components: {
    VuePerfectScrollbar,
    TabAuditLog
  },
  data () {
    return {
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  watch: {
    // isSidebarActive (val) {
    //   if (!val) return
    //   if (Object.entries(this.data).length === 0) {
    //     this.initValues()
    //     this.$validator.reset()
    //   } else {
    //     const { sid, phone, fullname, username, role, email } = JSON.parse(JSON.stringify(this.data))
    //     this.sid = sid
    //     this.phone = phone
    //     this.email = email
    //     this.username = username
    //     this.fullname = fullname
    //     this.role = role
    //     this.initValues()
    //   }
    // }
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
