<template>
  <div>
        <vs-popup
            title="Create Expenditure"
            :active.sync="activePrompt">
        <div>
            <div class="pr-6 pl-6">
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" label="Name" v-model="name" name="name" />
                        <span class="text-danger text-sm">{{errors.first('name')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" label="Unit" v-model="unit" name="unit" />
                        <span class="text-danger text-sm">{{errors.first('unit')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" label="Cost" v-model="cost" name="cost" />
                        <span class="text-danger text-sm">{{errors.first('cost')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" label="Description" v-model="description" name="description" />
                        <span class="text-danger text-sm">{{errors.first('description')}}</span>
                    </div>
                </div>
                <div slot="footer" class="pt-8">
                    <vs-button class="mr-6" @click="createExpense" :disabled="!isFormValid">Submit</vs-button>
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
            name: '',
            unit: '',
            cost: '',
            description: ''
        }
    },
    computed: {

        isFormValid () {
            return !this.errors.any() &&
             this.name !== '' &&
             this.unit !== '' &&
             this.cost !== '' &&
             this.description !== ''
        },

        activePrompt:{
           get() {
                return this.displayPrompt
           },

           set(value) {
               this.$emit('hideDisplayPrompt', value)
               this.initValues()
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
      
      createExpense () {
        const obj = {
            name: this.name,
            cost: this.cost,
            description: this.description,
            unit: this.unit
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('expense/addExpense', obj)
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
        this.unit = '',
        this.cost = '',
        this.name = ''
        this.description = ''
      },
    
    }
    
}
</script>

<style scoped>
</style>