<template>
  <div class="vx-row">
      <export-revenue-report :data="dataToExport" :displayExport="displayExport" @hideDisplay="hideDisplayExport" v-if="displayExport"/>

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

           <!-- PAYMENT METHOD - DROPDOWN -->
           <v-select 
              v-validate="'required'"
              data-vv-validate-on="blur"
              name="payment_method"
              style="width: 200px;"
              v-model="paymentMethod"
              :closeOnSelect="true" 
              :options="['Cheque', 'Bank Transfer', 'Card', 'Cash']" 
              :dir="$vs.rtl ? 'rtl' : 'ltr'" 
            />

            <!-- TYPE OF PRODUCT -->
            <v-select 
              style="width: 200px; margin-left: 10px"
              label="name"
              v-model="typeOfProduct"
              :reduce="labels => labels.name"
              :closeOnSelect="true" 
              :options="labels" 
              :dir="$vs.rtl ? 'rtl' : 'ltr'" 
            />
          <!-- <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer mr-4 mb-4">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
              <span class="mr-2">Payment Method</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <span>Cheque</span>
                </span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span class="flex items-center">
                  <span>Bank Transfer</span>
                </span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span class="flex items-center">
                  <span>Card</span>
                </span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span class="flex items-center">
                  <span>Cash</span>
                </span>
              </vs-dropdown-item>

            </vs-dropdown-menu>
          </vs-dropdown> -->

          
           <!-- LABEL - DROPDOWN -->
          <!-- <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer mr-4 mb-4">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
              <span class="mr-2">Filter Label</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item v-for="label in labels" :key="label.lid" v-model="label_id">
                <span class="flex items-center">
                  <span>{{ label.name }}</span>
                </span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown> -->
          
           <!-- ADD NEW -->
          <!-- <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Create Expenditure</span>
          </div> -->

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
          <vs-button class="ml-6" @click="getRevenue">Apply Filter</vs-button>
          
          <!-- <p class="mb-2">Total: <span class="total">{{ queriedItems ? queriedItems : 0 }}</span></p> -->
        </div>
        <!-- ITEMS PER PAGE -->
        <!-- <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ creditors.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : creditors.length }} of {{ queriedItems }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <vs-dropdown-menu>

            <vs-dropdown-item @click="itemsPerPage=10">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=20">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=30">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=40">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown> -->
      </div>
            <!-- CARD 9: REVENUE REPORT -->
      <div class="vx-col w-full">
          <vx-card title="Revenue Report">
            <div slot="no-body" class="mt-4">
                <vs-table :data="revenue" class="table-dark-inverted" search  :sst="true" stripe @change-page="getRevenue" :max-items="itemsPerPage">
                <template slot="thead">
                    <vs-th>S/N</vs-th>
                    <vs-th>CUSTOMER</vs-th>
                    <vs-th>INVOICE</vs-th>
                    <vs-th>INVOICE ID</vs-th>
                    <vs-th>AMOUNT PAID</vs-th>
                    <vs-th>PAYMENT METHOD</vs-th>
                    <vs-th>BANK</vs-th>
                    <vs-th>DATE ADDED</vs-th>
                    <vs-th>ACTION</vs-th>
                </template>

                <template slot-scope="{data}">
                    <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td :data="data[indextr]">
                            <span>{{getOverallIndex(indextr)}}</span>
                        </vs-td>
                        <vs-td :data="data[indextr].Invoice.Customer.name">
                            <span>{{data[indextr].Invoice.Customer.name.toUpperCase() }}</span>
                        </vs-td>
                        <vs-td :data="data[indextr].Invoice.name">
                            <span>{{data[indextr].Invoice.name}}</span>
                        </vs-td>
                        <vs-td :data="data[indextr].Invoice.invoice_numb">
                            <span>{{data[indextr].Invoice.invoice_numb}}</span>
                        </vs-td>
                        <vs-td :data="data[indextr].amount">
                            <span>₦{{Number(data[indextr].amount).toLocaleString()}}</span>
                        </vs-td>
                        <vs-td :data="data[indextr].payment_method">
                            <span>{{data[indextr].payment_method}}</span>
                        </vs-td>
                        <vs-td :data="data[indextr].bank">
                            <span>{{data[indextr].bank}}</span>
                        </vs-td>
                        <!-- <vs-td :data="data[indextr].status">
                            <span class="flex items-center px-2 py-1 rounded"><div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + getOrderStatusColor(data[indextr].status)"></div>{{data[indextr].status}}</span>
                        </vs-td> -->
                        <vs-td :data="data[indextr].createdAt">
                            <span>{{data[indextr].createdAt | moment('DD/MM/YYYY')}}</span>
                        </vs-td>
                        <vs-td :data="data[indextr].ptid" class="whitespace-no-wrap">
                            <a href="#" @click="viewData(data[indextr].ptid)"><feather-icon icon="EyeIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" /></a>
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
import vSelect from 'vue-select'
import Datepicker from 'vuejs-datepicker';
import ExportRevenueReport from './ExportRevenueReport.vue';
export default {
    data() {
        return {
           itemsPerPage: 10,
           revenue: [],
           currentPage: 1,
           queriedItems: '',
           pages: '' || 1,
           displayExport: false,
           typeOfProduct: '',
           paymentMethod: '',
           start: '',
           end: '',
           should_export: false,
           dataToExport: {}
        }
    },
    components: {
        vSelect,
        Datepicker,
        ExportRevenueReport
    },

    computed: {
      labels () {
       return this.$store.state.utilities.labels
      },
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

        viewData(id) {
            this.$router.push(`/app/revenue/${id}`)
        },

        getOverallIndex(index) {
            return this.currentPage * this.itemsPerPage - this.itemsPerPage + index + 1
        },

        showDisplayExport () {
          this.should_export = true
          this.dataToExport = {
            typeOfProduct: this.typeOfProduct,
            paymentMethod: this.paymentMethod,
            start: this.start,
            end: this.end,
            should_export: this.should_export,
          }
          this.displayExport = true
        },

        hideDisplayExport () {
          this.should_export = false
          this.displayExport = false
        },

        getRevenue() {
          axios.get('/reports/revenue-report',
            { 
              params: { 
                currentPage: this.currentPage, 
                pageLimit: this.itemsPerPage,
                typeOfProduct: this.typeOfProduct,
                paymentMethod: this.paymentMethod,
                start: this.start,
                end: this.end 
              } 
            })
          .then(response => { 
            this.revenue = response.data.data.revenue.docs
            this.pages = response.data.data.revenue.pages
            this.queriedItems = response.data.data.revenue.total
          }).catch(error => this.handleError(error))
        },

        getOrderStatusColor (type) {
            if (type === 'Partial')   return 'primary'
            if (type === 'Paid') return 'success'
            if (type === 'Pending')  return 'warning'
            return 'dark'
        },
    },
    created() {
      this.$store.dispatch('utilities/fetchLabels', { currentPage: 1, itemsPerPage: 10 })
    },
    watch: {
        currentPage: function () {
            this.handlePageChange()
        }
    }
}
</script>

<style>

</style>