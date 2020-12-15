<template>
    <component :is="scrollbarTag" ref="mainSidebarPs" class="scroll-area--nofications-dropdown p-0 mb-10" :settings="settings" :key="$vs.rtl">
        <ul class="bordered-items">
          <li v-for="log in logs" :key="log.alid" class="flex justify-between px-4 py-4 notification cursor-pointer">
            <div class="flex items-start">
              <div class="mx-2">
                <small>{{ log.content }}</small>
              </div>
            </div>
            <small class="mt-1 whitespace-no-wrap text-bold" style="font-size: 10px; font-weight: 800">{{ log.createdAt | moment('from', 'now') }}</small>
          </li>
        </ul>
    </component>
</template>

<script>
import axios from '../../../../axios'
export default {
    data() {
        return {
            settings: {
                maxScrollbarLength: 60,
                wheelSpeed: .60,
            },
            logs: [],
            pageLimit: 10
        }
    },
    computed: {
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
        getLogs() {
            axios.get('/notifications/logs', { params: { pageLimit: this.pageLimit } })
            .then(response => { this.logs = response.data.data.docs }).catch(e => this.handleError(e))
        }
    },
    created() {
        this.getLogs()
    }
}
</script>

<style>

</style>