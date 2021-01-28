<template>
  <vs-tabs>
    <vs-tab label="Sales">
        <div class="mt-6">
            <tab-sales></tab-sales>
        </div>
    </vs-tab>
    <vs-tab label="Debtors">
        <div class="mt-6">
            <tab-creditors></tab-creditors>
        </div>
    </vs-tab>
    <vs-tab label="Usage Analytics">
        <div class="mt-6">
            <tab-analytics></tab-analytics>
        </div>
    </vs-tab>
  </vs-tabs>
</template>

<script>
import TabSales from './TabSales'
import TabAnalytics from './TabAnalytics'
import TabCreditors from './TabCreditors'
export default {
    components: {
        TabAnalytics,
        TabCreditors,
        TabSales,
    }
}
</script>

<style>
/* .white-bg {
    background: #fff;
    border-radius: .5rem;
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);
    -webkit-transition: all .3s ease-in-out;
    padding: 10px;
} */
</style>