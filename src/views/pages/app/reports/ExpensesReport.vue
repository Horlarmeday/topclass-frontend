<template>
  <div class="vx-row">
      <export-expenses-report :data="dataToExport" :displayExport="displayExport" @hideDisplay="hideDisplayExport" v-if="displayExport"/>

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between mb-4">
        <div class="flex flex-wrap-reverse items-center data-list-btn-container">
          <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer mr-4 mb-4">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
              <span class="mr-2">Actions</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item>
                <span class="flex items-center" @click="showDisplayExport">
                  <feather-icon icon="SaveIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Export</span>
                </span>
              </vs-dropdown-item>

            </vs-dropdown-menu>
          </vs-dropdown>

          <p class="mr-4">Total: <span class="total">₦{{ totalAmount ? Number(totalAmount).toLocaleString() : 0 }}</span></p>

          
          <vx-input-group class="ml-2" appendClasses="border border-solid border-grey border-r-0">
            <datepicker placeholder="from" v-model="start"></datepicker>

              <template slot="append">
                <div class="append-text btn-addon">
                  <vs-button type="border" class="whitespace-no-wrap" style="border: 0">...</vs-button>
                  <!-- <span type="border" class="whitespace-no-wrap">..</span> -->
                </div>
              </template>
          </vx-input-group>
          <datepicker input-class="" placeholder="to" v-model="end"></datepicker>
          <vs-button class="ml-6" @click="getExpenses">Apply Filter</vs-button>
        </div>
      </div>
            <!-- CARD 9: REVENUE REPORT -->
      <div class="vx-col w-full">
          <vx-card title="Expenses Report">
            <div slot="no-body" class="mt-4">
                <vs-table :data="expenses" class="table-dark-inverted" @search="handleSearch" search  :sst="true" stripe @change-page="getExpenses" :max-items="itemsPerPage">
                <template slot="thead">
                    <vs-th>S/N</vs-th>
                    <vs-th>NAME</vs-th>
                    <vs-th>UNIT</vs-th>
                    <vs-th>DESCRIPTION</vs-th>
                    <vs-th>COST</vs-th>
                    <vs-th>ADDED BY</vs-th>
                    <vs-th>DATE ADDED</vs-th>
                </template>

                <template slot-scope="{data}">
                    <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td :data="data[indextr]">
                            <span>{{getOverallIndex(indextr)}}</span>
                        </vs-td>
                        <vs-td :data="data[indextr].name">
                            <span>{{data[indextr].name.toUpperCase() }}</span>
                        </vs-td>
                        <vs-td :data="data[indextr].unit">
                            <span>{{data[indextr].unit}}</span>
                        </vs-td>
                        <vs-td :data="data[indextr].description">
                            <span>{{data[indextr].unit}}</span>
                        </vs-td>
                        <vs-td :data="data[indextr].cost">
                            <span>₦{{Number(data[indextr].cost).toLocaleString()}}</span>
                        </vs-td>
                        <vs-td :data="data[indextr].Staff.fullname">
                            <span>{{data[indextr].Staff.fullname}}</span>
                        </vs-td>
                        <vs-td :data="data[indextr].createdAt">
                            <span>{{data[indextr].createdAt | moment('DD/MM/YYYY, h:mma')}}</span>
                        </vs-td>
                    </vs-tr>
                </template>
                </vs-table>
                <div class="mt-4">
                    <vs-pagination class="float-right" :total="pages" v-model="currentPage" :max="6"></vs-pagination>
                </div>
            </div>
          </vx-card>
      </div>
  </div>
</template>

<script>
import axios from '../../../../axios'
import Datepicker from 'vuejs-datepicker';
import ExportExpensesReport from './ExportExpensesReport';
export default {
    data() {
        return {
           itemsPerPage: 10,
           expenses: [],
           currentPage: 1,
           queriedItems: '',
           pages: '' || 1,
           displayExport: false,
           start: '',
           end: '',
           totalAmount: '',
           should_export: false,
           dataToExport: {},
           search: ''
        }
    },
    components: {
        Datepicker,
        ExportExpensesReport
    },

    created() {
        this.getExpenses()
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

        getOverallIndex(index) {
            return this.currentPage * this.itemsPerPage - this.itemsPerPage + index + 1
        },

        showDisplayExport () {
          this.should_export = true
          this.dataToExport = {
            start: this.start,
            end: this.end,
            search: this.search,
            should_export: this.should_export,
          }
          this.displayExport = true
        },

        hideDisplayExport () {
          this.should_export = false
          this.displayExport = false
        },

        getExpenses() {
          axios.get('/reports/expenses-report',
            { 
              params: { 
                currentPage: this.currentPage, 
                pageLimit: this.itemsPerPage,
                start: this.start,
                end: this.end 
              }
            })
          .then(response => { 
            this.expenses = response.data.data.expenses.docs
            this.pages = response.data.data.expenses.pages
            this.queriedItems = response.data.data.expenses.total
            this.totalAmount = response.data.data.totalAmount
          }).catch(error => this.handleError(error))
        },
        handleSearch(search) {
          typeof search !== 'string' ? this.search = null : this.search = search
          axios.get('/reports/expenses-report',
            { 
              params: { 
                currentPage: this.currentPage, 
                pageLimit: this.itemsPerPage,
                search: this.search,
                start: this.start,
                end: this.end 
              }
            })
          .then(response => { 
            this.expenses = response.data.data.expenses.docs
            this.pages = response.data.data.expenses.pages
            this.queriedItems = response.data.data.expenses.total
            this.totalAmount = response.data.data.totalAmount
          }).catch(error => this.handleError(error))
        },
    },
    watch: {
        currentPage: function () {
            this.getExpenses()
        }
    }
}
</script>

<style>
    .total {
      background: #b22334d9;
      padding: 4px;
      color: #fff
    }
</style>