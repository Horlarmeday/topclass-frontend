<template>
  <div>
    <div id="button-area" class="flex flex-wrap items-center justify-between">
        <vx-input-group class="mb-base mr-3">
          <vs-input placeholder="Email" />

          <template slot="append">
            <div class="append-text btn-addon">
              <vs-button type="border" class="whitespace-no-wrap">Send Invoice</vs-button>
            </div>
          </template>
        </vx-input-group>
        <div class="flex items-center">
          <vs-button class="mb-base mr-3" type="border" icon-pack="feather" icon="icon icon-download">Download</vs-button>
          <vs-button class="mb-base mr-3" icon-pack="feather" icon="icon icon-file" @click="print">Print</vs-button>
        </div>
    </div>

    <div id="container">
        <section id="memo">
          <div class="logo">
            <img src="@/assets/images/pages/logo-bg.png" />
          </div>
          
          <div class="company-info">
            <div>TopClass Power Ltd</div>

            <br />
            
            <span>Plot C13 Enoch Jarumi Street,</span> <br />
            <span>Aco Estate AMAC, off Shehu Musa Yaradua Express way, Sabon Lugbe</span>

            <br />
            
            <span>0807 088 8853</span> <br>
            <span>info@topclassng.com</span>
          </div>

        </section> <br />

        <section id="invoice-title-number">
        
          <span id="title">{{ invoice.invoice.invoice_type }}</span>
          <span id="number">{{ invoice.invoice.invoice_numb }}</span>
          
        </section>
        
        <div class="clearfix"></div>
        
        <section id="client-info">
          <span class="to">To:</span>
          <div>
            <span class="bold">{{ invoice.invoice.Customer.name }}</span>
          </div>
          
          <div>
            <span>{{ invoice.invoice.Customer.state }}</span>
          </div>
          
          <div>
            <span>{{ invoice.invoice.Customer.lga }}</span>
          </div>
          
          <div>
            <span>{{ invoice.invoice.Customer.phone }}</span>
          </div>
          
          <div>
            <span>{{ invoice.invoice.Customer.email }}</span>
          </div>
          
          <!-- <div>
            <span>{client_other}</span>
          </div> -->
        </section>
        
        <div class="clearfix"></div>
        
        <section id="items">
          
          <table cellpadding="0" cellspacing="0" v-if="invoice.invoice.InvoiceItems.length">
          
            <tr>
              <th>S/N</th> 
              <th>ITEM</th>
              <th>DESC.</th>
              <th>QUANTITY</th>
              <th>UNIT COST(₦)</th>
              <th>TOTAL(₦)</th>
            </tr>
            
            <tr data-iterate="item" v-for="(prd, index) in invoice.invoice.InvoiceItems" :key="index">
              <td>{{ index + 1 }}</td> <!-- Don't remove this column as it's needed for the row commands -->
              <td>{{ prd.item }}</td>
              <td>{{ prd.Product.desc }}</td>
              <td>{{ prd.quantity }}</td>
              <td>{{ Number(Number(prd.price) / prd.quantity).toLocaleString() }}</td>
              <td>{{ Number(prd.price).toLocaleString() }}</td>
            </tr>
            
          </table>

          <!-- <table cellpadding="0" cellspacing="0" v-if="invoice.service.length">
          
            <tr>
              <th>S/N</th>
              <th>ITEM</th>
              <th>QUANTITY</th>
              <th>UNIT COST(₦)</th>
              <th>TOTAL COST(₦)</th>
            </tr>
            
            <tr data-iterate="item" v-for="(srv, index) in invoice.service" :key="srv.svid">
              <td>{{ index + 1 }}</td>
              <td>{{ srv.name }}</td>
              <td>{{ srv.quantity }}</td>
              <td>{{ srv.price }}</td>
              <td>{{ srv.total_price }}</td>
            </tr>
            
          </table> -->
          
        </section>
        
        <section id="sums">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <th>Subtotal</th>
              <td>₦{{ Number(subtotal).toLocaleString() }}</td>
            </tr>

            
            <tr data-iterate="tax" v-if="invoice.invoice.vat">
              <th>VAT ({{ invoice.VAT }}%)</th>
              <td>₦{{ invoice.invoice.vat.toLocaleString() }}</td>
            </tr>
            
            <tr v-if="invoice.discount">
              <th>Discount ({{ invoice.discount }}%)</th>
              <td>₦{{ Number(discount).toLocaleString() }}</td>
            </tr>

            <tr class="amount-total">
              <th>TOTAL</th>
              <td>₦{{ Number(total).toLocaleString() }}</td>
            </tr>
            
            <!-- You can use attribute data-hide-on-quote="true" to hide specific information on quotes.
                For example Invoicebus doesn't need amount paid and amount due on quotes  -->
            <!-- <tr data-hide-on-quote="true">
              <th>{amount_paid_label}</th>
              <td>{amount_paid}</td>
            </tr> -->
            
            <tr data-hide-on-quote="true">
              <th>Amount Due</th>
              <td>₦{{ Number(total).toLocaleString() }}</td>
            </tr>
            
          </table>

          <div class="clearfix"></div>
          
        </section>

        <div class="clearfix"></div>

        <section id="information" v-if="invoice.invoice.invoice_type === 'proforma invoice'">
          <p class="bold mb-2">{{ information }}</p>
          <table cellpadding="0" cellspacing="0">
            <tr>
              <th>Country of Origin</th>
              <td class="bold">{{ invoice.invoice.country_of_origin }}</td>
            </tr>
            
            <tr data-iterate="tax">
              <th>Condition of Sale:</th>
              <td class="bold">{{ invoice.invoice.condition_of_sale }}</td>
            </tr>
            
            <tr>
              <th>Terms of Payment:</th>
              <td class="bold">{{ invoice.invoice.terms_of_payment }}</td>
            </tr>

            <tr class="amount-total">
              <th>Delivery</th>
              <td class="bold">{{ invoice.invoice.delivery }}</td>
            </tr>
            
            <tr data-hide-on-quote="true">
              <th>Warranty:</th>
              <td class="bold">{{ warranty }}</td>
            </tr>

            <tr data-hide-on-quote="true">
              <th>Validity:</th>
              <td class="bold">{{ invoice.invoice.validity }}</td>
            </tr>

            <tr data-hide-on-quote="true">
              <th>Installation:</th>
              <td class="bold">{{ invoice.invoice.installation }}</td>
            </tr>
            <tr data-hide-on-quote="true">
              <th>Place of Delivery:</th>
              <td class="bold">{{ invoice.invoice.place_of_delivery }}</td>
            </tr>
            <tr>
              <th>Note:</th>
              <td class="bold">{{ note }}</td>
            </tr>
          </table>
        </section>

        <div class="clearfix"></div>

        <section id="bank" v-if="invoice.invoice.invoice_type === 'proforma invoice'">
          <p class="to-upper-case text-underline mb-2 bold">Account Details</p>
          <table cellpadding="0" cellspacing="0">
            <tr>
              <th>Account Name</th>
              <td class="bold">{{ invoice.invoice.Bank.account_name }}</td>
            </tr>

            
            <tr data-iterate="tax">
              <th>Bank Name</th>
              <td class="bold">{{ invoice.invoice.Bank.bank_name }}</td>
            </tr>
            
            <tr>
              <th>Account Number</th>
              <td class="bold">{{ invoice.invoice.Bank.account_number }}</td>
            </tr>

            <tr class="amount-total">
              <th>Sort Code</th>
              <td class="bold">{{ invoice.invoice.Bank.sort_code }}</td>
            </tr>
            
            <tr data-hide-on-quote="true">
              <th>Tin Number</th>
              <td class="bold">{{ invoice.invoice.Bank.tin_number }}</td>
            </tr>
          </table>
        </section>
        
        <div class="clearfix"></div>

        <section id="signature">
          <div class="mb-4">
            <span>Yours Faithfully</span>
            <span class="space-right bold">Accepted By</span>
            <p></p>
          </div>
          <div style="margin-bottom: 45px">
            <span class="bold">For: TOPCLASS POWER LTD</span>
            <span class="space-right"></span>
            <p></p>
          </div>
          <div class="mb-2">
            <small>{{invoice.invoice.Staff.fullname}}</small>
            <span class="space-right">Date</span>
          </div>
          <div>
            <small>{{invoice.invoice.Staff.role}}</small>
          </div>
        </section>

        <!-- <section id="invoice-info">
          <div>
            <span class="ml">Issue Date: </span> <span>{{ invoice.invoice.updatedAt | moment('DD/MM/YYYY') }}</span>
          </div>
          <div>
            <span class="ml">Due On: </span> <span>{{ invoice.invoice.updatedAt | moment('DD/MM/YYYY') }}</span>
          </div>

          <br />
        </section> -->
        
        <section id="terms">
          <p class="date"><span>Issue Date: </span> {{ invoice.invoice.updatedAt | moment('DD/MM/YYYY') }}</p>
          <!-- <p><span>Due On: </span> {{ invoice.invoice.updatedAt | moment('DD/MM/YYYY') }}</p> -->
          <div class="notes">Thank you very much. We really appreciate your patronage.<br>Please quote invoice number when remitting funds.</div>
        </section>
<!-- 
        <div class="clearfix"></div>

        <div class="thank-you">Thanks!</div> -->
<!-- 
        <div class="clearfix"></div> -->
    </div>
  </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('invoice/fetchParamInvoice', this.$route.params.invoiceId).catch(err => { this.handleError(err) })
    },

    data() {
      return {
        information: 'For more Information, please view the attached brochures for Genset/Sound Attenuated Enclosures',
        warranty: '24 months/2000hrs (whichever occurs first) from the date of commissioning, but on the condition that no third party carries out any Mechanical/Electrical repairs on the Gen set during this period otherwise the warranty is terminated.',
        note: 'Delivery will be done by Topclass Power Ltd. Manual Pushing/Positioning/Area boys will be done by client or as mutually agreed.'
      }
    },

    computed: {
        invoice() {
            return this.$store.state.invoice.invoice
        },

        subtotal() {
          return this.invoice.invoice.InvoiceItems.map(cost => Number(cost.price)).reduce((a, b)  => a + b, 0)
        },

        amount_due() {
          return this.subtotal + this.invoice.invoice.vat
        },

        discount() {
          return this.amount_due * (this.invoice.discount / 100)
        },

        total() {
          return (this.subtotal - this.discount) + this.invoice.invoice.vat
        },
    },

    methods: {
        print() {
            window.print()
        },
        handleError(error) {
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
            this.$vs.notify({
                title:'Success',
                text: response.data.message,
                color:'success',
                position:'top-center',
                iconPack: 'feather',
                icon:'icon-alert-circle'
            });
        },
    }
}
</script>

<style scoped>
  @import url('../../../../assets/css/invoice.css');
</style>