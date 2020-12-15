<template>
    <div>
        <div class="vx-row">
            <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="UsersIcon"
                  icon-right
                  :statistic="figures.customerCount"
                  statisticTitle="Total Customers" />
            </div>

            <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="FileTextIcon"
                  icon-right
                  :statistic="figures.invoiceCount"
                  statisticTitle="Total Invoice Created"
                  color="success" />
            </div>

            <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="FilterIcon"
                  icon-right
                  :statistic="figures.assetsCount"
                  statisticTitle="Total Assets"
                  color="danger" />
            </div>

            <!-- <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="HashIcon"
                  icon-right
                  :statistic="`₦${100000}`"
                  statisticTitle="Total Revenue"
                  color="warning" />
            </div> -->
        </div>
        <tabs />
    </div>
</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import axios from '../../../../../axios'
// import analyticsData from './analyticsData.js'
import Tabs from './Tabs'
    export default {
        components: {
            StatisticsCardLine,
            Tabs
        },
        data() {
            return {              
                // analyticsData,
                settings: { // perfectscrollbar settings
                    maxScrollbarLength: 60,
                    wheelSpeed: .60
                },
                figures: {}
            }
        },
        created() {
            axios.get('/dashboard/workshop').then(response => this.figures = response.data.data).catch(e => this.handleError(e))
        }
    }
    
</script>

<style lang="scss" scoped></style>