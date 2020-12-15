<template>
    <div>
        <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  class="mb-base"
                  icon="UsersIcon"
                  icon-right
                  :statistic="figures.customerCount"
                  statisticTitle="Total Customers"
                  color="violet"
                  :chartData="activeUsers.series" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
               <statistics-card-line
                  class="md:mb-0 mb-base"
                  icon="FilterIcon"
                  icon-right
                  :statistic="figures.salesCount"
                  statisticTitle="Total Sales"
                  color="success"
                  :chartData="siteTraffic.series" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  icon="FileIcon"
                  icon-right
                  :statistic="figures.invoiceCount"
                  statisticTitle="Total Invoice Created"
                  :chartData="newsletter.series"
                  color="danger" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  icon="HashIcon"
                  icon-right
                  :statistic="`₦${Number(figures.generatedAmount).toLocaleString()}`"
                  statisticTitle="Total Revenue"
                  :chartData="revenueGenerated.series"
                  color="warning" />
            </div>
        </div>
        <tabs />
    </div>
</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import analyticsData from './analyticsData.js'
import Tabs from './Tabs'
import axios from '../../../../../axios'
    export default {
        components: {
            StatisticsCardLine,
            Tabs
        },
        data() {
            return {              
                analyticsData,
                settings: { // perfectscrollbar settings
                    maxScrollbarLength: 60,
                    wheelSpeed: .60
                },
                activeUsers: {
                    series: [
                        {
                            name: 'Customers',
                            data: [50, 100, 90, 125, 100, 120, 110]
                        }
                    ]
                },
                siteTraffic: {
                    series: [
                        {
                            name: 'Sales',
                            data: [150, 200, 125, 225, 200, 250]
                        }
                    ]
                },
                newsletter: {
                    series: [
                        {
                            name: 'Invoices',
                            data: [36, 39, 36, 40, 38, 40]
                        }
                    ]
                },
                revenueGenerated: {
                    series: [
                        {
                            name: 'Revenue',
                            data: [350, 275, 400, 300, 350, 300, 450]
                        }
                    ],
                },
                figures: {}
            }
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
        },
        created() {
            axios.get('/dashboard/admin').then(response => this.figures = response.data.data).catch(e => this.handleError(e))
        }
    }
    
</script>

<style lang="scss" scoped></style>