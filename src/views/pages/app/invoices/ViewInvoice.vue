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