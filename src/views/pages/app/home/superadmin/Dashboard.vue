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
                  :statistic="`₦${100000}`"
                  statisticTitle="Total Revenue"
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
                }
            }
        },
    }
    
</script>

<style lang="scss" scoped></style>