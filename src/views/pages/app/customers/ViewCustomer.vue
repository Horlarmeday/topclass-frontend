<!-- =========================================================================================
  File Name: CustomerView.vue
  Description: Customer View page
========================================================================================== -->

<template>
  <div id="page-user-view">
    <div id="user-data">
      <vx-card title="Customer Details" class="mb-base">

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
                <td class="font-semibold">Name</td>
                <td>{{ customer.name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Phone</td>
                <td>{{ customer.phone }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Email</td>
                <td>{{ customer.email }}</td>
              </tr>
              <tr>
                <td class="font-semibold">State</td>
                <td>{{ customer.state }}</td>
              </tr>
              <tr>
                <td class="font-semibold">LGA</td>
                <td>{{ customer.lga }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Customer Type</td>
                <td>{{ customer.customer_type }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Address</td>
                <td>{{ customer.address }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Created By</td>
                <td>{{ customer.Staff.fullname }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Date Created</td>
                <td>{{ customer.createdAt | moment('DD/MM/YYYY, h:mma') }}</td>
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
    customer () {
      return this.$store.state.customer.customer
    }
  },
  created () {
    this.$store.dispatch('customer/fetchParamCustomer', this.$route.params.customerId)
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
