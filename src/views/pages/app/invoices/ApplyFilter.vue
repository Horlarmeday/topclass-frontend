<template>
  <div>
        <vs-prompt
            title="Filter By Date"
            accept-text= "Submit"
            button-cancel = "border"
            @cancel="initValues"
            @accept="getInvoicesByDate"
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
                <datepicker input-class="mb-3" placeholder="From" v-model="start"></datepicker>
                <datepicker input-class="mb-3" placeholder="To" v-model="end"></datepicker>
            </div>
        </div>
    </vs-prompt>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
export default {
    props: {
      promptFilter: {
          type: Boolean,
          required: true
      },
    },
    components: {
        Datepicker
    },
    data() {
      return {
        start: '',
        end: ''
      }
    },
    computed: {
        validateForm () {
            return !this.errors.any() && this.start !== '' && this.end !== ''
        },
        activePrompt:{
            get () {
                return this.promptFilter
            },
            set (value) {
                this.$emit('hidepromptFilter', value)
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
      getInvoicesByDate () {
        const obj = {
          start: this.start,
          end: this.end,
          currentPage: 1,
          itemsPerPage: 10, 
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('invoice/fetchInvoices', obj)
                .then(response => {
                    this.handleSuccess(response)
                    this.initValues()
                })
                .catch(err => { this.handleError(err) })
            }
        })
      },
      initValues() {
        this.start = ''
        this.end = ''
      }
    }
    
}
</script>

<style>

</style>