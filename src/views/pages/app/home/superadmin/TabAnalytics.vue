<template>
          
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
</template>

<script>
import analyticsData from './analyticsData.js'
import VueApexCharts from 'vue-apexcharts'
import axios from '../../../../../axios'
export default {
    components: {
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

            revenue: [],

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
            
            analyticsData,
            settings: { // perfectscrollbar settings
                maxScrollbarLength: 60,
                wheelSpeed: .60
            }
        }
    },
    created() {
        axios.get('/dashboard/revenue-analytics-data').then(response => this.figures = response.data.data).catch(e => this.handleError(e))
    }
}
</script>

<style>

</style>