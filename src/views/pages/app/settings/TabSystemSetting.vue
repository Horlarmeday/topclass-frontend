<template>
      <div class="vx-row">

                <!-- ADD NEW -->
            <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
                <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                <span class="ml-2 text-base text-primary">Change Settings</span>
            </div>
            <!-- CARD 9: SYSTEM SETTINGS -->
            <div class="vx-col w-full">
                <vx-card title="Settings">
                    <div slot="no-body" class="mt-4">
                        <vs-table :data="setting" class="table-dark-inverted" :sst="true" @change-page="handleChangePage" :max-items="itemsPerPage">
                            <template slot="thead">
                                <vs-th>S/N</vs-th>
                                <vs-th>NAME</vs-th>
                                <vs-th>VALUE</vs-th>
                                <vs-th>DATE ADDED</vs-th>
                                <vs-th>ACTION</vs-th>
                            </template>

                            <template slot-scope="{data}">
                                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                                    <vs-td :data="data[indextr]">
                                        <span>{{getOverallIndex(indextr)}}</span>
                                    </vs-td>
                                    <vs-td :data="data[indextr].name">
                                        <span>{{data[indextr].name.toUpperCase() }}</span>
                                    </vs-td>
                                    <vs-td :data="data[indextr].value">
                                        <span>{{data[indextr].value}}</span>
                                    </vs-td>
                                    <vs-td :data="data[indextr].createdAt">
                                        <span>{{data[indextr].createdAt | moment('DD/MM/YYYY')}}</span>
                                    </vs-td>
                                    <vs-td :data="data[indextr]" class="whitespace-no-wrap">
                                        <a href="#" @click="editData(data[indextr])"><feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" /></a>
                                    </vs-td>
                                </vs-tr>
                            </template>
                        </vs-table>
                        <div>
                            <vs-pagination class="float-right" :total="pages" v-model="currentPage" :max="6"></vs-pagination>
                        </div>
                    </div>
                </vx-card>
            </div>
            <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />
      </div>
</template>

<script>
import DataViewSidebar from './DataSideBar'
export default {
  components: {
    DataViewSidebar
  },

  data () {
    return {
      currentPage: 1,
      sidebarData: {},
      itemsPerPage: 10,
      addNewDataSidebar: {}
    }
  },
  computed: {
    setting() {
        return this.$store.state.setting.settings
    },
    queriedItems () {
      return this.$store.state.setting.total
    },
    pages() {
      return this.$store.state.setting.pages
    }
  },

  created() {
    this.$store.dispatch('setting/fetchSettings', { currentPage: this.currentPage, itemsPerPage: this.itemsPerPage })
  },

  methods: {
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },

    editData (data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },

    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    },

    handleChangePage() {
      this.$store.dispatch('setting/fetchSettings', { currentPage: this.currentPage, itemsPerPage: this.itemsPerPage })
    },

    getOverallIndex(index) {
      return this.currentPage * this.itemsPerPage - this.itemsPerPage + index + 1
    },
  },

//   watch: {
//     currentPage: function () {
//       this.handlePageChange()
//     }
//   }
}
</script>
