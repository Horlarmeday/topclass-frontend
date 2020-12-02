<!-- =========================================================================================
    File Name: Invoice.vue
    Description: Invoice Page
========================================================================================== -->


<template>
    <div id="invoice-page">
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
            <vs-button class="mb-base mr-3" type="border" icon-pack="feather" icon="icon icon-download">Download</vs-button>
            <vs-button class="mb-base mr-3" icon-pack="feather" icon="icon icon-file" @click="printInvoice">Print</vs-button>
          </div>
        </div>

        <vx-card id="invoice-container">

            <!-- INVOICE METADATA -->
            <div class="vx-row leading-loose p-base">
                <div class="vx-col w-1/2">
                    <img src="@/assets/images/pages/logo-bg.png" alt="topclass-logo">
                </div>
                <div class="vx-col w-1/2 text-right">
                    <h5>{{ companyDetails.name }}</h5>
                    <div class="invoice__company-info my-4">
                        <p>{{ companyDetails.addressLine1 }}</p>
                        <p>{{ companyDetails.addressLine2 }}</p>
                        <p class="flex items-center justify-end">
                            <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ companyDetails.mailId }}</span>
                        </p>
                        <p class="flex items-center justify-end">
                            <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ companyDetails.mobile }}</span>
                        </p>
                    </div>
                </div>
                <vs-divider></vs-divider>
                <div class="vx-col w-1/2 ">
                    <h5>TO:</h5>
                    <div class="invoice__recipient-info my-4">
                        <p>{{ waybill.Customer.name }}</p>
                        <p>{{ waybill.Customer.state }}</p>
                        <p>{{ waybill.Customer.lga }}</p>
                        <p class="flex items-center">
                            <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ waybill.Customer.email }}</span>
                        </p>
                        <p class="flex items-center">
                            <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ waybill.Customer.phone }}</span>
                        </p>
                    </div>
                </div>
                <div class="vx-col w-1/2 mt-base text-right ">
                    <h1 class="">WAYBILL</h1>
                    <div class="invoice__invoice-detail mt-6">
                        <h6 class="">WAYBILL NO: <span class="font-semibold">{{ waybill.waybill_numb }}</span></h6>
                        <h6 class="mt-2">INVOICE NO: <span class="font-semibold">{{ waybill.Invoice.invoice_numb }}</span></h6>
                        <h6 class="mt-2">DATE GENERATED: <span class="font-semibold">{{ waybill.createdAt | moment('DD, MMM Do YYYY') }}</span></h6>
                    </div>
                </div>
            </div>

            <!-- INVOICE CONTENT -->
            <div class="p-base">
                <!-- INVOICE TASKS TABLE -->
                <vs-table hoverFlat :data="waybill.Invoice.InvoiceItems">
                    <!-- HEADER -->
                    <template slot="thead">
                        <vs-th class="pointer-events-none bg-topclass">S/N</vs-th>
                        <vs-th class="pointer-events-none bg-topclass">ITEM DESCRIPTION</vs-th>
                        <vs-th class="pointer-events-none bg-topclass">QUANTITY</vs-th>
                    </template>

                    <!-- DATA -->
                    <template slot-scope="{data}">
                        <vs-tr v-for="(tr, index) in data" :key="index">
                            <vs-td :data="data[index].item">{{ index + 1 }}</vs-td>
                            <vs-td :data="data[index].item">{{ data[index].item }}</vs-td>
                            <vs-td :data="data[index].quantity">{{ data[index].quantity }}</vs-td>
                        </vs-tr>
                    </template>
                </vs-table>

                <div class="flex">

                <!-- INVOICE SUMMARY TABLE -->
                <vs-table hoverFlat class="w-1/2 mt-4" :data="invoiceData.tasks">
                    <vs-tr>
                        <vs-th class="pointer-events-none">DRIVER NAME</vs-th>
                        <vs-td>{{ waybill.driver_name }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-th class="pointer-events-none">DRIVER NUMBER</vs-th>
                        <vs-td>{{ waybill.driver_phone }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-th class="pointer-events-none">VEHICLE NUMBER</vs-th>
                        <vs-td>{{ waybill.vehicle_numb }}</vs-td>
                    </vs-tr>
                    <!-- <vs-tr>
                        <vs-th class="pointer-events-none bg-topclass mb-2">TOTAL</vs-th>
                        <vs-td class="bg-topclass font-semibold">₦{{ sale.amount_due }}</vs-td>
                    </vs-tr> -->
                </vs-table>
                <vs-table hoverFlat class="w-1/2 mt-4" :data="invoiceData.tasks">
                    <vs-tr>
                        <vs-th class="pointer-events-none">PREPARED BY</vs-th>
                        <vs-td>{{ waybill.Staff.fullname }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-th class="pointer-events-none">APPROVED BY</vs-th>
                        <vs-td>Bishnu Saha</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-th class="pointer-events-none">DATE</vs-th>
                        <vs-td>{{ waybill.createdAt | moment('DD/MM/YYYY, h:mma') }}</vs-td>
                    </vs-tr>
                    <!-- <vs-tr>
                        <vs-th class="pointer-events-none bg-topclass mb-2">TOTAL</vs-th>
                        <vs-td class="bg-topclass font-semibold">₦{{ sale.amount_due }}</vs-td>
                    </vs-tr> -->
                </vs-table>
                </div>
            </div>

            <!-- INVOICE FOOTER -->
            <div class="invoice__footer p-base">
                <p class="mb-4"> <span class="mr-2">RECEIVED BY:</span> <span class="font-semibold mr-2"> </span> .</p>
            </div>
        </vx-card>
    </div>
</template>

<script>
import converter from 'number-to-words'

export default{
  data () {
    return {
      mailTo: '',
      companyDetails: {
        name: 'TopClass Power Ltd.',
        addressLine1: 'Plot C13 Enoch Jarumi Street',
        addressLine2: 'Aco Estate AMAC, off Shehu Musa Yaradua Express way, Sabon Lugbe',
        mailId: 'info@topclassng.com',
        mobile: '0807 088 8853'
      },
        invoiceData: {
        tasks: [
          {
            id: 1,
            task: 'Website Redesign',
            hours: 60,
            rate: 15,
            amount: 90000
          },
          {
            id: 2,
            task: 'Newsletter template design',
            hours: 20,
            rate: 12,
            amount: 24000
          }
        ],
        subtotal: 114000,
        discountPercentage: 5,
        discountedAmount: 5700,
        total: 108300
      },
      converter,
    }
  },
  computed: {
    waybill () {
      return this.$store.state.waybill.waybill
    }
  },
  methods: {
    printInvoice () {
      window.print()
    }
  },
  components: {},
  created () {
    this.$store.dispatch('waybill/fetchParamWaybill', this.$route.params.waybillId)
  },
  mounted () {
    this.$emit('setAppClasses', 'invoice-page')
  }
}
</script>

<style lang="scss">
.bg-topclass {
    background: #AE1E21;
    color: #fff;
}

.bg-trans {
    background: #ae1e2033;
}

.title-class {
    background: rgb(91, 100, 109);
    margin-left: 60%;
    padding-right: 10px;
    color: #ffffff;
}

@media print {
  .invoice-page {
    * {
      visibility: hidden;
    }

    #content-area {
      margin: 0 !important;
    }

    .vs-con-table {
      .vs-con-tbody {
        overflow: hidden !important;
      }
    }

    #invoice-container,
    #invoice-container * {
      visibility: visible;
    }
    #invoice-container {
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: none;
    }
  }
}

@page {
  size: auto;
}
</style>
