<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
========================================================================================== -->


<template>
  <div class="relative">

    <div class="vx-navbar-wrapper" :class="classObj">

      <vs-navbar class="vx-navbar navbar-custom navbar-skelton" :color="navbarColorLocal" :class="textColor">

        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon class="sm:inline-flex xl:hidden cursor-pointer p-2" icon="MenuIcon" @click.stop="showSidebar" />

        <bookmarks :navbarColor="navbarColor" v-if="windowWidth >= 992" />

        <vs-spacer />

        <search-bar />

        <!-- <notification-drop-down /> -->
        
        <feather-icon icon="ActivityIcon" class="cursor-pointer mb-1 sm:mr-6 mr-2" @click.stop="showNotification" :badge="count" />

        <activity :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" />

        <profile-drop-down />

      </vs-navbar>
    </div>
  </div>
</template>


<script>
import Bookmarks            from "./components/Bookmarks.vue"
import SearchBar            from "./components/SearchBar.vue"
// import NotificationDropDown from "./components/NotificationDropDown.vue"
import ProfileDropDown      from "./components/ProfileDropDown.vue"
import Activity      from "./components/Activity.vue"

export default {
  name: "the-navbar-vertical",
  props: {
    navbarColor: {
      type: String,
      default: "#fff",
    },
  },
  data() {
    return {
      addNewDataSidebar: false,
    }
  }, 
  components: {
    Bookmarks,
    SearchBar,
    // NotificationDropDown,
    ProfileDropDown,
    Activity
  },
  computed: {
    count() {
      return this.$store.state.notification.total
    },
    navbarColorLocal() {
      return this.$store.state.theme === "dark" && this.navbarColor === "#fff" ? "#10163a" : this.navbarColor
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth
    },
    textColor() {
      return {'text-white': (this.navbarColor != '#10163a' && this.$store.state.theme === 'dark') || (this.navbarColor != '#fff' && this.$store.state.theme !== 'dark')}
    },
    windowWidth() {
      return this.$store.state.windowWidth
    },

    // NAVBAR STYLE
    classObj() {
      if (this.verticalNavMenuWidth == "default")      return "navbar-default"
      else if (this.verticalNavMenuWidth == "reduced") return "navbar-reduced"
      else return "navbar-full"
    },
  },
  methods: {
    showSidebar() {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true);
    },
    
    showNotification () {
      this.toggleDataSidebar(true)
    },

    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    },
  },
  created() {
    this.$store.dispatch('notification/fetchNotificationsCount')
  }
}
</script>

