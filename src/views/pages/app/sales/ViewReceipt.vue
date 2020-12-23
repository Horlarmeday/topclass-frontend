<!-- =========================================================================================
    File Name: Invoice.vue
    Description: Invoice Page
========================================================================================== -->


<template>
    <div id="invoice-page">
        <div class="flex flex-wrap items-center justify-between">
          <vx-input-group class="mb-base mr-3">
            <vs-input v-model="mailTo" placeholder="Email" />

            <template slot="append">
              <div class="append-text btn-addon">
                <vs-button type="border" @click="mailTo = ''" class="whitespace-no-wrap">Send Invoice</vs-button>
              </div>
            </template>
          </vx-input-group>
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
                        <p>{{ sale.Customer.name }}</p>
                        <p>{{ sale.Customer.state }}</p>
                        <p>{{ sale.Customer.lga }}</p>
                        <p class="flex items-center">
                            <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ sale.Customer.email }}</span>
                        </p>
                        <p class="flex items-center">
                            <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ sale.Customer.phone }}</span>
                        </p>
                    </div>
                </div>
                <div class="vx-col w-1/2 mt-base text-right ">
                    <h1 class="">Sales Receipt</h1>
                    <div class="invoice__invoice-detail mt-6">
                        <h6>RECEIPT NO: <span class="font-semibold">{{ sale.Invoice.invoice_numb }}</span></h6>
                        <h6 class="mt-4">RECEIPT DATE: <span class="font-semibold">{{ sale.Invoice.createdAt | moment('DD, MMM Do YYYY') }}</span></h6>
                    </div>
                </div>
            </div>

            <!-- INVOICE CONTENT -->
            <div class="p-base">
                <!-- INVOICE TASKS TABLE -->
                <vs-table hoverFlat :data="sale.Invoice.InvoiceItems">
                    <!-- HEADER -->
                    <template slot="thead">
                        <vs-th class="pointer-events-none bg-topclass">ITEM DESCRIPTION</vs-th>
                        <vs-th class="pointer-events-none bg-topclass">QUANTITY</vs-th>
                        <vs-th class="pointer-events-none bg-topclass">UNIT PRICE (₦)</vs-th>
                        <vs-th class="pointer-events-none bg-topclass">TOTAL (₦)</vs-th>
                    </template>

                    <!-- DATA -->
                    <template slot-scope="{data}">
                        <vs-tr v-for="(tr, index) in data" :key="index">
                            <vs-td :data="data[index].item">{{ data[index].item }}</vs-td>
                            <vs-td :data="data[index].quantity">{{ data[index].quantity }}</vs-td>
                            <vs-td :data="data[index].price">{{ Number(data[index].price).toLocaleString() }}</vs-td>
                            <vs-td :data="data[index].price">{{ Number(data[index].price).toLocaleString() }}</vs-td>
                        </vs-tr>
                    </template>
                </vs-table>

                <!-- INVOICE SUMMARY TABLE -->
                <vs-table hoverFlat class="w-1/2 ml-auto mt-4 bg-trans" :data="invoiceData.tasks">
                    <vs-tr>
                        <vs-th class="pointer-events-none">SUBTOTAL</vs-th>
                        <vs-td>₦{{ Number(subtotal).toLocaleString() }}</vs-td>
                    </vs-tr>
                    <vs-tr v-if="sale.Invoice.vat">
                        <vs-th class="pointer-events-none">VAT (7.5%)</vs-th>
                        <vs-td>₦{{ Number(sale.Invoice.vat).toLocaleString() }}</vs-td>
                    </vs-tr>
                    <vs-tr v-if="sale.discount">
                        <vs-th class="pointer-events-none">DISCOUNT ({{sale.discount}}%)</vs-th>
                        <vs-td>₦{{ discount.toLocaleString() }}</vs-td>
                    </vs-tr>
                     <vs-tr>
                        <vs-th class="pointer-events-none">TOTAL</vs-th>
                        <vs-td>₦{{ total.toLocaleString() }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-th class="pointer-events-none">AMOUNT PAID</vs-th>
                        <vs-td>₦{{ Number(sale.amount_paid).toLocaleString() }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-th class="pointer-events-none bg-topclass mb-2">BALANCE</vs-th>
                        <vs-td class="bg-topclass font-semibold">₦{{ Number(sale.amount_remaining).toLocaleString() }}</vs-td>
                    </vs-tr>
                </vs-table>
            </div>

            <!-- INVOICE FOOTER -->
            <div class="invoice__footer p-base">
                <p class="mb-4"> <span class="mr-2">AMOUNT IN WORDS:</span> <span class="font-semibold mr-2">{{ converter.toWords(sale.amount_paid).toUpperCase() + ' NAIRA ONLY' }}</span> .</p>
                <p>
                    <span class="mr-8">PREPARED BY: <span class="font-semibold">{{ sale.Staff.fullname }}</span></span>
                    <!-- <span>IBAN: <span class="font-semibold"> G882-1111-2222-3333 </span></span> -->
                </p>
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
      invoiceDetails: {
        invoiceNo: '001/2019',
        invoiceDate: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)'
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
    sale () {
      return this.$store.state.sale.sale
    },

    subtotal() {
      return this.sale.Invoice.InvoiceItems.map(cost => Number(cost.price)).reduce((a, b)  => a + b, 0)
    },

    amount_due() {
      return this.subtotal + this.sale.Invoice.vat
    },

    discount() {
      return this.amount_due * (this.sale.discount / 100)
    },

    total() {
      return this.subtotal + this.sale.Invoice.vat - this.discount
    }
    
  },
  methods: {
    printInvoice () {
      window.print()
    }
  },
  components: {},
  created () {
    this.$store.dispatch('sale/fetchParamSale', this.$route.params.saleId)
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
