<!-- =========================================================================================
  File Name: SaleView.vue
  Description: Sale View page
========================================================================================== -->

<template>
  <div id="page-user-view">
    <div id="user-data">

      <div class="flex flex-wrap items-center justify-between">
          <!-- <vx-input-group class="mb-base mr-3">
            <vs-input v-model="mailTo" placeholder="Email" />

            <template slot="append">
              <div class="append-text btn-addon">
                <vs-button type="border" @click="mailTo = ''" class="whitespace-no-wrap">Send Invoice</vs-button>
              </div>
            </template>
          </vx-input-group> -->
          <div class="flex items-center">
            <vs-button v-if="sale.status !== 'Pending'" class="mb-base mr-3" type="border" icon-pack="feather" icon="icon icon-download">View Receipt</vs-button>
            <vs-button v-if="sale.status !== 'Pending'" class="mb-base mr-3" icon-pack="feather" icon="icon icon-file" @click="goToReceipt">Generate Receipt</vs-button>
          </div>
        </div>
      <vx-card title="Sale Details" class="mb-base">

        <!-- Avatar -->
        <div class="vx-row">

          <!-- Avatar Col -->
          <!-- <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="user_data.avatar" class="rounded w-full" />
            </div>
          </div> -->

          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Customer</td>
                <td>{{ sale.Customer.name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Phone</td>
                <td>{{ sale.Customer.phone }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Email</td>
                <td>{{ sale.Customer.email }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Customer Type</td>
                <td>{{ sale.Customer.customer_type }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Invoice</td>
                <td>{{ sale.Invoice.name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Invoice Number</td>
                <td>{{ sale.Invoice.invoice_numb }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Created By</td>
                <td>{{ sale.Staff.fullname }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Date Created</td>
                <td>{{ sale.createdAt | moment('DD/MM/YYYY, h:mma') }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 2 -->
          <div class="vx-col w-full flex" id="account-manage-buttons">
            <!-- <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" to="#">Edit</vs-button>
            <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash">Delete</vs-button> -->
          </div>

        </div>

      </vx-card>

      <vx-card>
        <vs-tabs>
            <vs-tab label="Items">
                <div class="mt-6">
                    <div class="vx-row">
                        <!-- CARD 9: SALES ITEMS -->
                        <div class="vx-col w-full">
                            <div slot="no-body" class="mt-4">
                                <vs-table :data="sale.Invoice.InvoiceItems" class="table-dark-inverted">
                                <template slot="thead">
                                    <vs-th>S/N</vs-th>
                                    <vs-th>ITEM</vs-th>
                                    <vs-th>PRICE (₦)</vs-th>
                                    <vs-th>QUANTITY</vs-th>
                                    <vs-th>DATE PURCHASED</vs-th>
                                </template>

                                <template slot-scope="{data}">
                                    <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                                        <vs-td :data="data[indextr]">
                                            <span>{{ indextr + 1 }}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].item">
                                            <span>{{data[indextr].item}}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].price">
                                            <span>{{Number(data[indextr].price).toLocaleString()}}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].quantity">
                                            <span>{{data[indextr].quantity }}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].createdAt">
                                            <span>{{data[indextr].createdAt | moment('DD/MM/YYYY')}}</span>
                                        </vs-td>
                                    </vs-tr>
                                </template>
                                </vs-table>
                            </div>
                        </div>
                    </div>
                </div>
            </vs-tab>
            <vs-tab label="Payments">
                <div class="mt-6">
                    <div class="vx-row">
                        <!-- CARD 9: PAYMENT ITEMS -->
                        <div class="vx-col w-full">
                            <div slot="no-body" class="mt-4">
                                <vs-table :data="sale.Payments" class="table-dark-inverted">
                                <template slot="thead">
                                    <vs-th>S/N</vs-th>
                                    <vs-th>AMOUNT (₦)</vs-th>
                                    <vs-th>BANK</vs-th>
                                    <vs-th>METHOD OF PAYMENT</vs-th>
                                    <vs-th>DATE</vs-th>
                                </template>

                                <template slot-scope="{data}">
                                    <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                                        <vs-td :data="data[indextr]">
                                            <span>{{ indextr + 1 }}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].amount">
                                            <span>{{Number(data[indextr].amount).toLocaleString()}}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].bank">
                                            <span>{{data[indextr].bank }}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].payment_method">
                                            <span>{{data[indextr].payment_method }}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].createdAt">
                                            <span>{{data[indextr].createdAt | moment('DD/MM/YYYY, h:mma')}}</span>
                                        </vs-td>
                                    </vs-tr>
                                </template>
                                </vs-table>
                            </div>
                        </div>
                    </div>
                </div>
            </vs-tab>
        </vs-tabs>
      </vx-card>

    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      user_data: null,
      user_not_found: false
    }
  },
  computed: {
    sale () {
      return this.$store.state.sale.sale
    }
  },
  created () {
    this.$store.dispatch('sale/fetchParamSale', this.$route.params.saleId)
  },
  methods: {
    goToReceipt() {
      this.$router.push(`/app/sale/${this.$route.params.saleId}/receipt`)
    }
  }
}

</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }


@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }

}

</style>
