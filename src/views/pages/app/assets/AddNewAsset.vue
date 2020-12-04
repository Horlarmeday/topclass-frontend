<template>
  <div>
        <vs-popup
            title="Add Asset"
            :active.sync="activePrompt">
        <div>
            <div class="pr-6 pl-6">
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" label="Asset Name" v-model="name" name="name" />
                        <span class="text-danger text-sm">{{errors.first('name')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" type="number" label="Cost" v-model="cost" name="cost" />
                        <span class="text-danger text-sm">{{errors.first('cost')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <small class="ml-2">Date Purchased</small>
                        <datepicker v-model="date_purchased" name="date_purchased" @input="getDate"></datepicker>
                        <span class="text-danger text-sm">{{errors.first('date_purchased')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" type="number" label="Depreciation Percentage" v-model="depreciation" name="depreciation" />
                        <span class="text-danger text-sm">{{errors.first('depreciation')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" label="Location" v-model="location" name="location" />
                        <span class="text-danger text-sm">{{errors.first('location')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" label="Quantity" v-model="quantity" name="quantity" />
                        <span class="text-danger text-sm">{{errors.first('quantity')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" label="Duration" v-model="duration" name="duration" readonly/>
                        <span class="text-danger text-sm">{{errors.first('duration')}}</span>
                    </div>
                </div>
                <div slot="footer" class="pt-8">
                    <vs-button class="mr-6" @click="createAsset" :disabled="!isFormValid">Submit</vs-button>
                    <vs-button type="border" color="danger" @click="activePrompt = false">Cancel</vs-button>
                </div>
            </div>
        </div>
        </vs-popup>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
export default {
    props: {
        displayPrompt: {
            type: Boolean,
            required: true
        }
    },
    components: {
        Datepicker
    },
    data() {
        return {
            name: '',
            date_purchased: '',
            cost: '',
            depreciation: '',
            duration: '',
            location: '',
            quantity: ''
        }
    },
    computed: {

        isFormValid () {
            return !this.errors.any() &&
             this.name !== '' &&
             this.date_purchased !== '' &&
             this.cost !== '' &&
             this.depreciation !== '' &&
             this.duration !== '' &&
             this.location !== ''  &&
             this.quantity !== ''
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

      getDate() {
        this.duration = this.getDateDifference(this.date_purchased)
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
      
      createAsset () {
        const obj = {
            date_purchased: this.date_purchased,
            location: this.location,
            name: this.name,
            cost: this.cost,
            depreciation: this.depreciation,
            quantity: this.quantity,
            duration: this.duration
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('asset/addAsset', obj)
                .then(response => {
                    this.handleSuccess(response)
                    this.initValues()
                    this.$emit('hideDisplayPrompt', false)
                })
                .catch(err => { this.handleError(err) })
            }
        })
      },

      getDateDifference(fromDate, endDate = new Date()) {
        var startDate = new Date(fromDate);
        var startYear = startDate.getFullYear();
        var startMonth = startDate.getMonth();
        var startDay = startDate.getDate();

        var endYear = endDate.getFullYear();
        var endMonth = endDate.getMonth();
        var endDay = endDate.getDate();

        // We calculate February based on end year as it might be a leep year which might influence the number of days.
        var february = (endYear % 4 == 0 && endYear % 100 != 0) || endYear % 400 == 0 ? 29 : 28;
        var daysOfMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        var startDateNotPassedInEndYear = (endMonth < startMonth) || endMonth == startMonth && endDay < startDay;
        var years = endYear - startYear - (startDateNotPassedInEndYear ? 1 : 0);

        var months = (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12;

        // (12 + ...) % 12 makes sure index is always between 0 and 11
        var days = startDay <= endDay ? endDay - startDay : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay;

        return years + ' year' + (years == 1 ? ' ' : 's ') +
                months + ' month' + (months == 1 ? ' ' : 's ') + 'and ' +
                days + ' day' + (days == 1 ? '' : 's');
      },

      initValues() {
        this.date_purchased =''
        this.duration = '',
        this.cost = '',
        this.location = '',
        this.quantity = ''
        this.name = ''
        this.depreciation = ''
      },
    
    }
    
}
</script>

<style scoped>
</style>