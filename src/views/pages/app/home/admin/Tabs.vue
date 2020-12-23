<template>
  <vs-tabs>
    <vs-tab label="Invoices">
        <div class="mt-6">
            <tab-invoices></tab-invoices>
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
import TabInvoices from './TabInvoice'
import TabAnalytics from './TabAnalytics'
export default {
    components: {
        TabAnalytics,
        TabInvoices
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