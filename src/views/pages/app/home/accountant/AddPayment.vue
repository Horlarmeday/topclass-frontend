<template>
  <div>
        <vs-prompt
            :title="`${data.Customer.name} Payment`"
            accept-text= "Submit"
            button-cancel = "border"
            @cancel="initValues"
            @accept="addPayment"
            @close="activePrompt = false"
            :is-valid="validateForm"
            :active.sync="activePrompt">
        <div>
            <div class="vx-row">
                <div class="vx-col ml-auto flex">
                    <feather-icon icon="InfoIcon" class="cursor-pointer" svgClasses="text-success stroke-current w-5 h-5 mr-4"></feather-icon>
                    <feather-icon icon="StarIcon" class="cursor-pointer" svgClasses="text-warning stroke-current w-5 h-5 mr-4"></feather-icon>
                </div>
            </div>
            <div class="vx-col w-full mb-base">
                <div class="vx-row mb-2">
                    <div class="vx-col w-full mb-4">
                    <vs-input v-validate="'required'" type="number" data-vv-validate-on="blur" label="Amount" class="w-full" v-model="amount" name="amount" />
                    <span class="text-danger text-sm">{{errors.first('amount')}}</span>
                  </div>
                  <div class="vx-col w-full mb-4">
                    <small class="ml-2">Bank</small>
                    <v-select 
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        name="bank"
                        v-model="bank"
                        :closeOnSelect="true" 
                        :options="banks" 
                        :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                    />
                    <span class="text-danger text-sm">{{errors.first('bank')}}</span>
                  </div>
                  <div class="vx-col w-full mb-4">
                    <small class="ml-2">Payment Method</small>
                    <v-select 
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        name="payment_method"
                        v-model="payment_method"
                        :closeOnSelect="true" 
                        :options="['Cheque', 'Bank Transfer', 'Card', 'Cash']" 
                        :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                    />
                    <span class="text-danger text-sm">{{errors.first('payment_method')}}</span>
                  </div>
                  <div class="mb-2">
                        <small class="ml-4">Tick if you want to generate receipt</small>
                        <ul class="demo-alignment ml-4">
                            <li>
                                <vs-checkbox v-model="should_generate">Generate receipt</vs-checkbox>
                            </li>
                        </ul>
                  </div>
                </div>
            </div>
        </div>
    </vs-prompt>
  </div>
</template>

<script>
import vSelect from 'vue-select'
export default {
    props: {
      paymentPrompt: {
          type: Boolean,
          required: true
      },
      data: {
        type: Object,
        required: true
      }
    },
    components: {
        vSelect
    },
    data() {
      return {
        amount: '',
        payment_method: '',
        bank: '',
        should_generate: false,
        banks: [
          'Access Bank PLC',
          'Fidelity Bank PLC',
          'Guaranty Trust Bank Plc',
          'Zenith Bank PLC',
          'Stanbic IBTC Bank PLC'
        ]
      }
    },
    // watch: {
    //     displayPrompt() {
    //         if (Object.entries(this.data).length === 0) {
    //             this.initValues()
    //             this.$validator.reset()
            
    //     }
    // },
    computed: {
        validateForm () {
            return !this.errors.any() && this.amount !== '' && this.payment_method !== '' && this.bank !== ''
        },
        activePrompt:{
            get () {
                return this.paymentPrompt
            },
            set (value) {
                this.$emit('hidePaymentPrompt', value)
            }
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
      addPayment () {
        const obj = {
          slid: this.data.slid,
          amount: this.amount,
          payment_method: this.payment_method,
          bank: this.bank,
          should_generate: this.should_generate
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('sale/addPayment', obj)
                .then(response => {
                    this.handleSuccess(response)
                    this.initValues()
                    if (this.should_generate) {
                      this.$router.push(`/app/sale/${response.data.data.ptid}/receipt`)
                    }
                })
                .catch(err => { this.handleError(err) })
            }
        })
      },
      initValues() {
        this.amount = ''
        this.payment_method = '',
        this.bank = '',
        this.should_generate = false
      }
    }
    
}
</script>

<style>

</style>