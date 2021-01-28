<!-- =========================================================================================
    File Name: VerticalNavMenuItem.vue
    Description: Vertical NavMenu item component. Extends vuesax framework's 'vs-sidebar-item' component
    Component Name: VerticalNavMenuItem
========================================================================================== -->

<template>
  <div
    v-if="canSee"
    class="vs-sidebar--item mb-4"
    :class="[
      {'vs-sidebar-item-active'            : activeLink},
      {'disabled-item pointer-events-none' : isDisabled}
    ]" >

      <router-link
        tabindex="-1"
        v-if="to"
        exact
        :class="[{'router-link-active': activeLink}]"
        :to="to"
        :target="target" >
          <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon" />
          <feather-icon v-else :class="{'w-3 h-3': iconSmall}" :icon="icon" />
          <slot />
      </router-link>

      <a v-else :target="target" :href="href" tabindex="-1">
        <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon" />
        <feather-icon v-else :class="{'w-3 h-3': iconSmall}" :icon="icon" />
        <slot />
      </a>
  </div>
</template>

<script>
import { parseJwt } from '@/views/pages/app/utilities/helper'
export default {
  name: 'v-nav-menu-item',
  data() {
    return {
      user: ''
    }
  },
  props: {
    icon        : { type: String,                 default: ""               },
    iconSmall   : { type: Boolean,                default: false            },
    iconPack    : { type: String,                 default: 'material-icons' },
    href        : { type: [String, null],         default: '#'              },
    to          : { type: [String, Object, null], default: null             },
    slug        : { type: String,                 default: null             },
    index       : { type: [String, Number],       default: null             },
    featherIcon : { type: Boolean,                default: true             },
    target      : { type: String,                 default: '_self'          },
    isDisabled  : { type: Boolean,                default: false            },
  },
  computed: {
    canSee () {
      this.$acl.check(this.user)
      return this.to ? this.$acl.check(this.$router.match(this.to).meta.rule) : true
    },
    activeLink() {
      return ((this.to == this.$route.path) || (this.$route.meta.parent == this.slug) && this.to) ? true : false
    }
  },
  created() {
    const token = parseJwt(localStorage.getItem('user-token'))
    if (token) {
      this.user = token.role
    }
  }
}

</script>

