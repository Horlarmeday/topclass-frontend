<template>
    <div id="invoice">

    <div class="toolbar hidden-print">
        <div class="flex items-center">
          <vs-button class="" type="border" icon-pack="feather" icon="icon icon-download" @click="download">Download</vs-button>
          <vs-button class="ml float-right" icon-pack="feather" icon="icon icon-file" @click="print">Print</vs-button>
        </div>
        <hr>
    </div>
    <div class="invoice overflow-auto" ref="topclass">
        <div style="min-width: 600px">
            <header>
                <div class="row">
                    <div class="col">
                        <a target="_blank" href="#">
                            <img style="width: 300px" src="@/assets/images/pages/logo-bg.png" data-holder-rendered="true" />
                        </a>
                    </div>
                    <!-- <div class="col company-details">
                        <h2 class="name">
                            
                            TopClass Power Limited
                           
                        </h2>
                        <div>Plot C13 Enoch Jarumi Street, Abj</div>
                        <div>0807 088 8853</div>
                        <div>info@topclassng.com</div>
                    </div> -->
                </div>
            </header>
            <main>
                <div class="row contacts">
                    <div class="col invoice-to">
                        <div class="text-gray-light">INVOICE TO:</div>
                        <h2 class="to">{{ invoice.invoice.Customer.name }}</h2>
                        <div class="address">{{ invoice.invoice.Customer.address }}</div>
                        <div class="email">{{ invoice.invoice.Customer.email }}</div>
                    </div>
                    <div class="col invoice-details">
                        <h1 class="invoice-id" style="text-transform: capitalize">{{ invoice.invoice.invoice_type }}</h1>
                        <div class="date"><strong>{{ invoice.invoice.invoice_numb }}</strong></div>
                    </div>
                </div>
                <table border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>ITEM</th>
                            <th class="text-left">DESCRIPTION</th>
                            <th class="text-right">QUANTITY</th>
                            <th class="text-right">UNIT PRICE(₦)</th>
                            <th class="text-right">TOTAL (₦)</th>
                        </tr>
                    </thead>
                    <tbody v-for="(prd, index) in invoice.invoice.InvoiceItems" :key="index">
                        <tr>
                            <td class="no">{{ prd.item }}</td>
                            <td class="text-left">{{ prd.Product.desc }}</td>
                            <td class="unit">{{ prd.quantity }}</td>
                            <td class="qty">{{ Number(Number(prd.price) / prd.quantity).toLocaleString() }}</td>
                            <td class="total">{{ Number(prd.price).toLocaleString() }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2"></td>
                            <td colspan="2">SUBTOTAL</td>
                            <td>₦{{ Number(subtotal).toLocaleString() }}</td>
                        </tr>
                        <tr v-if="invoice.invoice.vat">
                            <td colspan="2"></td>
                            <td colspan="2">VAT ({{ invoice.VAT }}%)</td>
                            <td>₦{{ invoice.invoice.vat.toLocaleString() }}</td>
                        </tr>
                        <tr v-if="invoice.discount">
                            <td colspan="2"></td>
                            <td colspan="2">Discount ({{ invoice.discount }}%)</td>
                            <td>₦{{ Number(discount).toLocaleString() }}</td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td colspan="2">GRAND TOTAL</td>
                            <td>₦{{ Number(total).toLocaleString() }}</td>
                        </tr>
                    </tfoot>
                </table>
                <!-- <div class="thanks">Thank you!</div> -->
                <h5 class="mb ml">{{ information }}</h5>

                <table cellpadding="0" cellspacing="0" class="more-info">
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

                <h5 class="mb ml" v-if="invoice.invoice.invoice_type === 'proforma invoice'" style="text-decoration: underline">
                    ACCOUNT DETAILS
                </h5>

                <div class="notices" v-if="invoice.invoice.invoice_type === 'proforma invoice'">
                    <div class="mb"><span class="bold">ACCOUNT NAME:</span>  <span class="ml">{{ invoice.invoice.Bank.account_name }}</span></div>
                    <div class="mb"><span class="bold">BANK NAME:</span> <span class="ml">{{ invoice.invoice.Bank.bank_name }}</span></div>
                    <div class="mb"><span class="bold">ACCOUNT NUMBER:</span>  <span class="ml">{{ invoice.invoice.Bank.account_number }}</span></div>
                    <div class="mb"><span class="bold">SORT CODE:</span>  <span class="ml">{{ invoice.invoice.Bank.sort_code }}</span></div>
                    <div class="mb"><span class="bold">TIN NUMBER:</span>  <span class="ml">{{ invoice.invoice.Bank.tin_number }}</span></div>
                </div>

                <h5 class="text-center topclass-bg">24/7 ON SITE SUPPORT</h5>
                <h5 class="mb">
                    While assuring you of our best services, we are always available for any clarification you may require from us,
                    and look forward to your valued order soon.
                </h5>
                <div class="flex-container mt">
                    <div class="">
                        <h5>Yours Faithfully,</h5>
                        <h5 style="margin-bottom: 40px">For: TOPCLASS POWER LTD</h5>

                        <h5>{{invoice.invoice.Staff.fullname}}</h5>
                        <small>({{invoice.invoice.Staff.role}} - TopClass Power Ltd)</small>
                    </div>
                    <div class="">
                        <h5 class="underline">Accepted By:</h5>
                        <h5 class="underline" style="margin-bottom: 40px">Name: </h5>
                        <h5 class="underline">Date: {{ invoice.invoice.updatedAt | moment('DD/MM/YYYY') }}</h5>
                    </div>
                    <div class="">
                        <h5 class="underline">Approved By:</h5>
                        <h5>Name: Bishnu Saha</h5>
                        <small>(CEO - TopClass Power Ltd)</small> <br>
                        <img src="@/assets/images/sign.png" alt="signature" style="width: 250px">
                    </div>
                </div>
            </main>
            <footer>
                <hr>
                <p>
                    <strong>HQ: </strong> 
                        Plot C13 Enoch Jarumi Street, Aco Estate AMAC, off Shehu Musa Yaradua Express way, Sabon Lugbe. <br>
                        +234 (0) 903 800 0026,
                        +234 (0) 903 800 0027 <br>
                     <!-- <strong> Sales: </strong> 
                        297, Cadastral Zone A.O Opposite Grand Square, Behind Audit House, Central Area, Abuja FCT. <br>
                        +234 (0) 807 088 8853
                        +234 (0) 801 111 1060 <br> -->
                    <strong> Distributor:</strong>
                        Lagos - +234 (0) 817 516 1882, Portharcourt - +234 (0) 814 000 1020
                    
                </p>
            </footer>
        </div>
        <!--DO NOT DELETE THIS div. IT is responsible for showing footer always at the bottom-->
        <div></div>
    </div>
</div>
</template>

<script>
import html2pdf from 'html2pdf.js'
export default {
    data() {
        return {
            information: 'For more Information, please view the attached brochures for Genset/Sound Attenuated Enclosures',
            warranty: '24 months/2000hrs (whichever occurs first) from the date of commissioning, but on the condition that no third party carries out any Mechanical/Electrical repairs on the Gen set during this period otherwise the warranty is terminated.',
            note: 'Delivery will be done by Topclass Power Ltd. Manual Pushing/Positioning/Area boys will be done by client or as mutually agreed.'
        }
    },

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

        download() {
            html2pdf(this.$refs.topclass, {
                margin: 0.4,
                filename: 'document.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { dpi: 192, letterRendering: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
			})
        }
    }
}
</script>

<style scoped>
  @import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css');
  @import url('../../../../assets/css/newInvoice.css');
</style>