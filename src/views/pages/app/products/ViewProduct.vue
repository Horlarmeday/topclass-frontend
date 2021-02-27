<!-- =========================================================================================
  File Name: ProductView.vue
  Description: Product View page
========================================================================================== -->

<template>
  <div id="page-user-view">
    <div id="user-data">
      <vx-card title="Product Details" class="mb-base">

        <!-- Avatar -->
        <div class="vx-row">

          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Name</td>
                <td>{{ product.name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Quantity</td>
                <td>{{ product.phone }} {{ product.unit }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Product Type</td>
                <td>{{ product.label }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Description</td>
                <td>{{ product.desc }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr v-show="$acl.check(Accountant)">
                <td class="font-semibold">Cost</td>
                <td>₦{{ product.cost }}</td>
              </tr>
              <tr v-show="$acl.check(Accountant)">
                <td class="font-semibold">Selling Price</td>
                <td>₦{{ product.selling_price }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Comment</td>
                <td>{{ product.comment }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Created By</td>
                <td>{{ product.Staff.fullname }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Date Created</td>
                <td>{{ product.createdAt | moment('DD/MM/YYYY, h:mma') }}</td>
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
            <vs-tab label="Dispense History">
                <div class="mt-6">
                    <div class="vx-row">
                        <!-- CARD 9: DISPENSE HISTORY -->
                        <div class="vx-col w-full">
                            <div slot="no-body" class="mt-4">
                                <vs-table :data="product.DispenseHistories" class="table-dark-inverted">
                                <template slot="thead">
                                    <vs-th>S/N</vs-th>
                                    <vs-th>QUANTITY</vs-th>
                                    <vs-th>QUANTITY REMAINING</vs-th>
                                    <vs-th>CUSTOMER</vs-th>
                                    <vs-th>STAFF</vs-th>
                                    <vs-th>DATE DISPENSED</vs-th>
                                </template>

                                <template slot-scope="{data}">
                                    <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                                        <vs-td :data="data[indextr]">
                                            <span>{{ indextr + 1 }}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].quantity">
                                            <span>{{data[indextr].quantity }}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].remain_quantity">
                                            <span>{{data[indextr].remain_quantity }}</span>
                                        </vs-td>
                                        <vs-td v-if="data[indextr].cid" :data="data[indextr].Customer.name">
                                            <span>{{data[indextr].Customer.name}}</span>
                                        </vs-td>
                                        <vs-td v-else>
                                            <span>Not Available</span>
                                        </vs-td>
                                        <vs-td v-if="data[indextr].sid" :data="data[indextr].Staff.fullname">
                                            <span>{{data[indextr].Staff.fullname}}</span>
                                        </vs-td>
                                        <vs-td v-else>
                                            <span>Not Available</span>
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
            <vs-tab label="Return History">
                <div class="mt-6">
                    <div class="vx-row">
                        <!-- CARD 9: PAYMENT ITEMS -->
                        <div class="vx-col w-full">
                            <div slot="no-body" class="mt-4">
                                <vs-table :data="product.ReturnHistories" class="table-dark-inverted">
                                <template slot="thead">
                                    <vs-th>S/N</vs-th>
                                    <vs-th>QUANTITY</vs-th>
                                    <vs-th>REMAIN QUANTITY</vs-th>
                                    <vs-th>REASON FOR RETURN</vs-th>
                                    <vs-th>STAFF</vs-th>
                                    <vs-th>DATE RETURNED</vs-th>
                                </template>

                                <template slot-scope="{data}">
                                    <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                                        <vs-td :data="data[indextr]">
                                            <span>{{ indextr + 1 }}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].quantity">
                                            <span>{{data[indextr].quantity}}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].remain_quantity">
                                            <span>{{data[indextr].remain_quantity }}</span>
                                        </vs-td>
                                        <vs-td :data="data[indextr].reason">
                                            <span>{{data[indextr].reason }}</span>
                                        </vs-td>
                                        <vs-td v-if="data[indextr].staff_id" :data="data[indextr].Staff.fullname">
                                            <span>{{data[indextr].Staff.fullname}}</span>
                                        </vs-td>
                                        <vs-td v-else>
                                            <span>Not Available</span>
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
      user_not_found: false,
      displayPrompt: false,
    }
  },
  computed: {
    product () {
      return this.$store.state.product.product
    }
  },
  created () {
    this.$store.dispatch('product/fetchParamProduct', this.$route.params.productId)
  },
  methods: {

    showDisplayPrompt () {
      this.displayPrompt = true
    },

    hidePrompt () {
      this.displayPrompt = false
    },
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
