<template>
  <div>
        <vs-popup
            title="Create Bank"
            :active.sync="activePrompt">
        <div>
            <div class="vx-col w-full mb-base">
                <div class="vx-row mb-2">
                <div class="vx-col w-full">
                    <vs-input class="w-full" label="Account Name" v-model="account_name" name="account_name" />
                    <span class="text-danger text-sm">{{errors.first('account_name')}}</span>
                </div>
                </div>
                <div class="vx-row mb-2">
                <div class="vx-col w-full">
                    <vs-input class="w-full" type="text" label="Account Number" v-model="account_number" name="account_number" maxLength="10" minLength="10"/>
                    <span class="text-danger text-sm">{{errors.first('account_number')}}</span>
                </div>
                </div>
                <div class="vx-row mb-2">
                <div class="vx-col w-full">
                    <vs-input class="w-full" type="text" label="Bank Name" v-model="bank_name" name="bank_name" />
                    <span class="text-danger text-sm">{{errors.first('bank_name')}}</span>
                </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" type="text" label="Sort Code" v-model="sort_code" name="sort_code" />
                        <span class="text-danger text-sm">{{errors.first('sort_code')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" type="text" label="Tin Number" v-model="tin_number" name="tin_number" />
                        <span class="text-danger text-sm">{{errors.first('tin_number')}}</span>
                    </div>
                </div>
                <div slot="footer" class="pt-8">
                    <vs-button class="mr-6" @click="createBank" :disabled="!validateForm">Submit</vs-button>
                    <vs-button type="border" color="danger" @click="activePrompt = false">Cancel</vs-button>
                </div>
            </div>
        </div>
    </vs-popup>
  </div>
</template>

<script>
export default {
    props: {
        displayPrompt: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            account_name: '',
            account_number: '',
            bank_name: '',
            sort_code: '',
            tin_number: ''
        }
    },
    computed: {
        validateForm () {
            return !this.errors.any() &&
             this.account_name !== '' &&
             this.account_number !== '' && 
             this.bank_name !== '' && 
             this.sort_code !== '' && 
             this.tin_number !== ''
        },
        activePrompt:{
            get () {
                return this.displayPrompt
            },
            set (value) {
                this.$emit('hideDisplayPrompt', value)
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
      createBank () {
        const obj = {
            account_name: this.account_name,
            account_number: this.account_number,
            bank_name: this.bank_name,
            sort_code: this.sort_code,
            tin_number: this.tin_number
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('utilities/addBank', obj)
                .then(response => {
                    this.handleSuccess(response)
                    this.initValues()
                    this.$emit('hideDisplayPrompt', false)
                })
                .catch(err => { this.handleError(err) })
            }
        })
      },
      initValues() {
        this.account_name = ''
        this.account_number = ''
        this.bank_name = ''
        this.sort_code = ''
        this.tin_number = ''
      }
    },
    
}
</script>

<style>

</style>