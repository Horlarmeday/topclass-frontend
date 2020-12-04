<template>
  <div class="vx-row">
      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer mr-4 mb-4">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
              <span class="mr-2">Actions</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="SaveIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Export</span>
                </span>
              </vs-dropdown-item>

            </vs-dropdown-menu>
          </vs-dropdown>

           <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer mr-4 mb-4">

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
          </vs-dropdown>
          
           <!-- ADD NEW -->
          <!-- <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Create Expenditure</span>
          </div> -->
          <input type="text" class="">
        <datepicker input-class="dd-actions cursor-pointer mr-4 mb-4" v-model="date_purchased"></datepicker>

          <p class="mb-2">Total: <span class="total">{{ queriedItems ? queriedItems : 0 }}</span></p>
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ creditors.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : creditors.length }} of {{ queriedItems }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
        </vs-dropdown>
      </div>
            <!-- CARD 9: CUSTOMERS ON CREDIT -->
            <div class="vx-col w-full">
                <vx-card title="Customers on Credit">
                <div slot="no-body" class="mt-4">
                    <vs-table :data="creditors" class="table-dark-inverted" :sst="true" @change-page="handleChangePage" :max-items="itemsPerPage">
                    <template slot="thead">
                        <vs-th>S/N</vs-th>
                        <vs-th>CUSTOMER</vs-th>
                        <vs-th>ITEM</vs-th>
                        <vs-th>AMOUNT DUE</vs-th>
                        <vs-th>AMOUNT REMAINING</vs-th>
                        <vs-th>AMOUNT PAID</vs-th>
                        <vs-th>STATUS</vs-th>
                        <vs-th>DATE PURCHASED</vs-th>
                        <vs-th>ACTION</vs-th>
                    </template>

                    <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td :data="data[indextr]">
                                <span>{{getOverallIndex(indextr)}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].Customer.name">
                                <span>{{data[indextr].Customer.name.toUpperCase() }}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].Invoice.name">
                                <span>{{data[indextr].Invoice.name}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].amount_due">
                                <span>₦{{Number(data[indextr].amount_due).toLocaleString()}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].amount_remaining">
                                <span>₦{{Number(data[indextr].amount_remaining).toLocaleString()}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].amount_paid">
                                <span>₦{{Number(data[indextr].amount_paid).toLocaleString()}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].status">
                                <span class="flex items-center px-2 py-1 rounded"><div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + getOrderStatusColor(data[indextr].status)"></div>{{data[indextr].status}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].createdAt">
                                <span>{{data[indextr].createdAt | moment('DD/MM/YYYY')}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].slid" class="whitespace-no-wrap">
                                <a href="#" @click="viewData(data[indextr].slid)"><feather-icon icon="EyeIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" /></a>
                            </vs-td>
                        </vs-tr>
                    </template>
                    </vs-table>
                    <div class="mt-3">
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
export default {
    data() {
        return {
           itemsPerPage: 10,
           creditors: [],
           currentPage: 1,
           date_purchased: '',
           pages: '',
           options1:[
                {text:'IT',value:0},
                {text:'Blade Runner',value:2},
                {text:'Thor Ragnarok',value:3},
            ],
        }
    },
    computed: {
        vSelect,
        Datepicker
    },
    methods: {
        handleChangePage(page) {
            axios.get('/sales/creditors', { params: { currentPage: page, pageLimit: this.itemsPerPage } })
            .then(response => { 
                this.creditors = response.data.data.docs
                this.pages = response.data.data.total
            }).catch(error => this.handleError(error))
        },
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
            this.$router.push(`/app/sale/${id}`)
        },
        getOverallIndex(index) {
            return this.currentPage * this.itemsPerPage - this.itemsPerPage + index + 1
        },

        getOrderStatusColor (type) {
            if (type === 'Partial')   return 'primary'
            if (type === 'Paid') return 'success'
            if (type === 'Pending')  return 'warning'
            return 'dark'
        },
    },
    created() {
        axios.get('/sales/creditors', { params: { currentPage: 1, pageLimit: this.itemsPerPage } })
        .then(response => { 
            this.creditors = response.data.data.docs
            this.pages = response.data.data.total
        }).catch(error => this.handleError(error))
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