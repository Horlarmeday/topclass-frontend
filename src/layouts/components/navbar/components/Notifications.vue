<template>
    <component :is="scrollbarTag" ref="mainSidebarPs" class="scroll-area--nofications-dropdown p-0 mb-10" :settings="settings" :key="$vs.rtl">
        <ul class="bordered-items">
          <li v-for="log in notifications" :key="log.nid" class="flex justify-between px-4 py-4 notification cursor-pointer">
            <div class="flex items-start">
              <feather-icon :icon="getIcon(log.category)" :svgClasses="[`text-${getIconColor(log.category)}`, 'stroke-current mr-1 h-6 w-6']"></feather-icon>
              <div class="mx-2" :style="!log.is_read ? `fontWeight: 800` : `fontWeight: 300`" @click="readNotification(log.nid)">
                <span class="block notification-title" :class="[`text-${getIconColor(log.category)}`]">{{ log.title }}</span>
                <small>{{ log.content }}</small>
              </div>
            </div>
            <small class="mt-1 whitespace-no-wrap text-bold" style="font-size: 10px; font-weight: 800">{{ log.createdAt | moment('from', 'now') }}</small>
          </li>
        </ul>
    </component>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
    data() {
        return {
            settings: {
                maxScrollbarLength: 60,
                wheelSpeed: .60,
            },
            pageLimit: 10,
        }
    },
    components: {
        VuePerfectScrollbar
    },
    computed: {
        notifications() {
            return this.$store.state.notification.notifications
        },
        scrollbarTag() { return this.$store.getters.scrollbarTag }
    },
    methods: {
        handleError(error) {
            this.$vs.notify({
              title:'Error',
              text: error.response.data,
              color:'danger',
              position:'top-center',
              iconPack: 'feather',
              icon:'icon-alert-circle'
            });
        },

        getIcon(category){
            if(category === 'Approved') return 'CheckCircleIcon'
            if(category === 'Declined') return 'AlertOctagonIcon'
            if(category === 'New') return 'MessageSquareIcon'
            return 'CreditCardIcon'
        },

        getIconColor (category) {
            if (category === 'Approved')   return 'success'
            if (category === 'Declined')   return 'primary'
            if (category === 'New')   return 'violet'
            return 'dark'
        },

        readNotification(nid) {
            this.$store.dispatch('notification/readNotification', {notification_id: nid}).catch(err => { this.handleError(err) })
        }
    },
    created() {
        this.$store.dispatch('notification/fetchNotifications', { pageLimit: this.pageLimit })
    }
}
</script>

<style>

</style>