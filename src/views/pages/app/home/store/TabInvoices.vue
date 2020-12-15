<!-- =========================================================================================
  File Name: TabTable.vue
  Description: Invoice List - List View
========================================================================================== -->
<template>
  <div id="data-list-list-view" class="data-list-container">

    <!-- <edit-invoice :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" /> -->

    <vs-table :sst="true"  ref="table" :max-items="itemsPerPage" :data="invoices" :total="queriedItems">
      
      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <!-- <div class="flex flex-wrap-reverse items-center data-list-btn-container">
          <p class="mb-2">Total: <span class="total">{{ queriedItems ? queriedItems : 0 }}</span></p>
        </div> -->

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ invoices.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : invoices.length }} of {{ queriedItems }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
        </vs-dropdown>
      </div>


      <template slot="thead">
        <vs-th sort-key="s/n">S/N</vs-th>
        <vs-th sort-key="customer">Customer</vs-th>
        <vs-th sort-key="name">Name</vs-th>
        <vs-th sort-key="invoice_type">Invoice Type</vs-th>
        <vs-th sort-key="createdAt">Date Created</vs-th>
        <vs-th>Action</vs-th>
      </template>

        <template slot-scope="{data}">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

              <vs-td>
                <p class="product-name font-medium truncate">{{ getOverallIndex(indextr) }}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.Customer.name.toUpperCase() }}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.name.toUpperCase() }}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.invoice_type }}</p>
              </vs-td>

              <vs-td>
                <p class="product-price">{{ tr.createdAt | moment('ddd, MMM Do YYYY') }}</p>
              </vs-td>
              <vs-td class="whitespace-no-wrap">
                  <feather-icon icon="EyeIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click="viewData(tr.ivid)" />
              </vs-td>
            </vs-tr>
          </tbody>
        </template>

    </vs-table>
        <div>
          <vs-pagination class="float-right" :total="pages" v-model="currentPage" :max="6"></vs-pagination>
        </div>
        <invoice-items :displayPrompt="displayPrompt" @hideDisplayPrompt="hidePrompt"></invoice-items>
  </div>
</template>

<script>

import InvoiceItems from './InvoiceItems'
export default {
  components: {
    InvoiceItems
  },
  data () {
    return {
      selected: [],
      itemsPerPage: 10,
      isMounted: false,

      currentPage: 1,
      displayPrompt: false,
      invoiceToEdit: '',
      invoice_id: '',
    }
  },
  computed: {
    invoices () {
      return this.$store.state.invoice.invoices
    },
    queriedItems () {
      return this.$store.state.invoice.total
    },
    pages() {
      return this.$store.state.invoice.pages
    },
  },
  methods: {
    handleError(error) {
      this.$vs.loading.close()
      this.$vs.notify({
          title:'Error',
          text: error.response.data,
          color:'danger',
          position:'top-center',
          iconPack: 'feather',
          icon:'icon-alert-circle'
      });
    },

    handleSuccess(response) {
      this.$vs.loading.close()
      this.$vs.notify({
          title:'Success',
          text: response.data.message,
          color:'success',
          position:'top-center',
          iconPack: 'feather',
          icon:'icon-alert-circle'
      });
    },

    viewData(id) {
        this.$store.dispatch('invoice/fetchInvoiceItems', { ivid: id })
        this.showDisplayPrompt()
    },

    showDisplayPrompt () {
      this.displayPrompt = true
    },

    hidePrompt () {
      this.displayPrompt = false
    },

    getOverallIndex(index) {
      return this.currentPage * this.itemsPerPage - this.itemsPerPage + index + 1
    },

    handleSearch(search) {
      this.currentPage = 1
      this.$store.dispatch('invoice/fetchInvoices', { currentPage: this.currentPage, itemsPerPage: this.itemsPerPage, search })
    },

    handlePageChange() {
      this.$store.dispatch('invoice/fetchInvoices', { currentPage: this.currentPage, itemsPerPage: this.itemsPerPage, filter: 1 })
    },

    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    }
  },
  created () {
    this.$store.dispatch('invoice/fetchInvoices', { currentPage: this.currentPage, itemsPerPage: this.itemsPerPage, stepdown: 1 })
  },
  mounted () {
    this.isMounted = true
  },
  watch: {
    currentPage: function () {
      this.handlePageChange()
    }
  }
}
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {

    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .total {
      background: #b22334d9;
      padding: 4px;
      color: #fff
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 20px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
          }
          td.td-check{
            padding: 20px !important;
          }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
