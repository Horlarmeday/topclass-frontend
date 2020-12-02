<template>
  <vs-tabs>
    <vs-tab label="System Analytics">
        <div class="mt-6">
            <tab-analytics></tab-analytics>
        </div>
    </vs-tab>
    <vs-tab label="Invoices">
        <div class="mt-6">
            <tab-table></tab-table>
        </div>
    </vs-tab>
    <vs-tab label="Creditors">
        <div class="mt-6">
            <tab-creditors></tab-creditors>
        </div>
    </vs-tab>
  </vs-tabs>
</template>

<script>
import TabTable from './TabTable'
import TabAnalytics from './TabAnalytics'
import TabCreditors from './TabCreditors'
export default {
    components: {
        TabAnalytics,
        TabTable,
        TabCreditors
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