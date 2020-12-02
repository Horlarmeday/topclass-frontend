<template>
  <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">

    <!-- GENERAL -->
    <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'General' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <tab-general />
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'Change Password' : ''">
      <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
        <tab-change-password />
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-link-2" :label="!isSmallerScreen ? 'System Settings' : ''">
      <div class="tab-text md:ml-4 md:mt-0 mt-4 ml-0">
        <tab-system-setting />
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-bell" :label="!isSmallerScreen ? 'Notifications' : ''">
      <div class="tab-text md:ml-4 md:mt-0 mt-4 ml-0">
        <tab-notifications />
      </div>
    </vs-tab>
  </vs-tabs>
</template>

<script>
import TabGeneral from './TabGeneral'
import TabChangePassword from './TabChangePassword'
import TabSystemSetting from './TabSystemSetting'
import TabNotifications from './TabNotifications'

export default {
  components: {
    TabGeneral,
    TabChangePassword,
    TabSystemSetting,
    TabNotifications
  },
  data () {
    return {

    }
  },
  computed: {
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    }
  }
}
</script>

<style lang="scss">
#profile-tabs {
  .vs-tabs--content {
    padding: 0;
  }
}
</style>
