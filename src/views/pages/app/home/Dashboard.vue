<template>
    <div>
        <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="UsersIcon"
                  icon-right
                  :statistic="12"
                  statisticTitle="Total Customers" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="FileTextIcon"
                  icon-right
                  :statistic="10"
                  statisticTitle="Total Receipt Generated"
                  color="success" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="FilterIcon"
                  icon-right
                  :statistic="100"
                  statisticTitle="Total Sales"
                  color="danger" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="HashIcon"
                  icon-right
                  :statistic="100000"
                  statisticTitle="Total Revenue"
                  color="warning" />
            </div>
        </div>
        <div class="vx-row">
            <div class="vx-col w-full md:w-2/3 mb-base">
                <vx-card title="Revenue">
                    <template slot="actions">
                        <feather-icon icon="SettingsIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
                    </template>
                    <div slot="no-body" class="p-6 pb-0">
                        <div class="flex" v-if="revenueComparisonLine.analyticsData">
                            <div class="mr-6">
                                <p class="mb-1 font-semibold">This Month</p>
                                <p class="text-3xl text-success"><sup class="text-base mr-1">₦</sup>{{ revenueComparisonLine.analyticsData.thisMonth.toLocaleString() }}</p>
                            </div>
                            <div>
                                <p class="mb-1 font-semibold">Last Month</p>
                                <p class="text-3xl"><sup class="text-base mr-1">₦</sup>{{ revenueComparisonLine.analyticsData.lastMonth.toLocaleString() }}</p>
                            </div>
                        </div>
                        <vue-apex-charts
                          type="line"
                          height="266"
                          :options="analyticsData.revenueComparisonLine.chartOptions"
                          :series="revenueComparisonLine.series" />
                    </div>
                </vx-card>
            </div>
            <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mb-base">
                <vx-card title="Items Statistics">
                    <div v-for="(browser, index) in browserStatistics" :key="browser.id" :class="{'mt-4': index}">
                        <div class="flex justify-between">
                            <div class="flex flex-col">
                                <span class="mb-1">{{ browser.name }}</span>
                                <h4>{{ browser.ratio }}%</h4>
                            </div>
                            <div class="flex flex-col text-right">
                                <span class="flex -mr-1">
                                    <span class="mr-1">{{ browser.comparedResult }}</span>
                                    <feather-icon :icon=" browser.comparedResult < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'" :svgClasses="[browser.comparedResult < 0 ? 'text-danger' : 'text-success'  ,'stroke-current h-4 w-4 mb-1 mr-1']"></feather-icon>
                                </span>
                                <span class="text-grey">{{ browser.time }}</span>
                            </div>
                        </div>
                        <vs-progress :percent="browser.ratio"></vs-progress>
                    </div>
                </vx-card>
            </div>
        </div>
        <div class="vx-row">
            <!-- CARD 9: CUSTOMERS ON CREDIT -->
            <div class="vx-col w-full">
                <vx-card title="Customers on Credit">
                <div slot="no-body" class="mt-4">
                    <vs-table :data="dispatchedOrders" class="table-dark-inverted">
                    <template slot="thead">
                        <vs-th>ORDER NO.</vs-th>
                        <vs-th>CUSTOMER</vs-th>
                        <vs-th>ITEM</vs-th>
                        <vs-th>PRICE</vs-th>
                        <vs-th>STATUS</vs-th>
                        <vs-th>DATE PURCHASED</vs-th>
                    </template>

                    <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td :data="data[indextr].orderNo">
                                <span>#{{data[indextr].orderNo}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].customer">
                                <span>{{data[indextr].customer}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].item">
                                <span>{{data[indextr].item}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].price">
                                <span>₦{{data[indextr].price.toLocaleString()}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].status">
                                <span class="flex items-center px-2 py-1 rounded"><div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + data[indextr].statusColor"></div>{{data[indextr].status}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].date">
                                <span>{{data[indextr].date}}</span>
                            </vs-td>
                        </vs-tr>
                    </template>
                    </vs-table>
                </div>

                </vx-card>
            </div>
        </div>
    </div>
</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import analyticsData from './analyticsData.js'
import VueApexCharts from 'vue-apexcharts'
    export default {
        components: {
            StatisticsCardLine,
            VueApexCharts,
        },
        data() {
            return {
                revenueComparisonLine: {
                    analyticsData: {
                        thisMonth: 86589,
                        lastMonth: 73683
                    },
                    series: [
                        {
                            name: 'This Month',
                            data: [45000, 47000, 44800, 47500, 45500, 48000, 46500, 48600]
                        },
                        {
                            name: 'Last Month',
                            data: [46000, 48000, 45500, 46600, 44500, 46500, 45000, 47000]
                        }
                    ]
                },

                browserStatistics: [
                    {
                        id: 1,
                        name: 'Generating Set',
                        ratio: 73,
                        time: 'Mon Dec 10 2018',
                        comparedResult: '800'
                    },
                    {
                        id: 3,
                        name: 'Solar Panel',
                        ratio: 8,
                        time: 'Mon Dec 10 2018',
                        comparedResult: '-200'
                    },
                    {
                        id: 2,
                        name: 'Spare Part',
                        ratio: 19,
                        time: 'Mon Dec 10 2018',
                        comparedResult: '100'
                    },
                    {
                        id: 4,
                        name: 'Services',
                        ratio: 27,
                        time: 'Mon Dec 10 2018',
                        comparedResult: '-450'
                    }
                ],

                dispatchedOrders: [
                    {
                        orderNo: 879985,
                        status: 'Partial',
                        statusColor: 'warning',
                        customer: 'Cinar Knowles',
                        item: '30KVA Generator',
                        price: 1000000,
                        date: '26/07/2018',
                    },
                    {
                        orderNo: 879747,
                        status: 'Pending',
                        statusColor: 'danger',
                        customer: 'Abiodun Marshal',
                        item: '25KVA Generator',
                        price: 1500000,
                        date: '21/11/2020',
                    },
                    {
                        orderNo: 879985,
                        status: 'Partial',
                        statusColor: 'warning',
                        customer: 'Ado Abdullahi',
                        item: '50KVA Generator',
                        price: 500000000,
                        date: '02/12/2019',
                    },
    
                ],
                
                analyticsData,
                settings: { // perfectscrollbar settings
                    maxScrollbarLength: 60,
                    wheelSpeed: .60
                }
            }
        },
    }
    
</script>

<style lang="scss" scoped></style>