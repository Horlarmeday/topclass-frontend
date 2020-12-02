<template>
  <div class="vx-row">
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
                    <div>
                        <vs-pagination class="float-right" :total="pages" v-model="currentPage" :max="6"></vs-pagination>
                    </div>
                </div>

                </vx-card>
            </div>
  </div>
</template>

<script>
import axios from '../../../../../axios'
export default {
    data() {
        return {
           itemsPerPage: 10,
           creditors: [],
           currentPage: 1,
           pages: ''
        }
    },
    computed: {

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