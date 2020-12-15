<template>
    <vx-card>
        <vs-prompt 
            title="Export To Excel" 
            class="export-options" 
            @cancel="clearFields" 
            @accept="exportToExcel" 
            accept-text="Export" 
            @close="activePrompt = false" 
            :active.sync="activePrompt">

            <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />

            <v-select v-model="selectedFormat" :options="formats" class="my-4" />
            <div class="flex">
                <span class="mr-4">Cell Auto Width:</span>
                <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
            </div>
        </vs-prompt>
    </vx-card>
</template>

<script>
import vSelect from 'vue-select'
import axios from '../../../../axios'
export default {
    props: {
        displayExport: {
          type: Boolean,
          required: true
        },
        data: {
          type: Object,
          required: true
        }
    },
    data() {
        return {
            fileName: '',
            formats:['xlsx', 'csv', 'txt'],
            cellAutoWidth: true,
            selectedFormat: 'xlsx',
            headerTitle: [
                'Name',
                'Unit', 
                'Description', 
                'Cost', 
                'Date', 
            ],
            headerVal: [
              'name', 
              'unit', 
              'description', 
              'cost',
            ],
            expenses: []
        }
    },
    components: {
        vSelect
    },

    computed: {
        activePrompt:{
            get () {
                return this.displayExport
            },
            set (value) {
                this.$emit('hideDisplay', value)
            }
        },
    },

    mounted() {
      this.getExpenses()
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
        getExpenses() {
          axios.get('/reports/expenses-report',
            { 
              params: { 
                search: this.data.search,
                start: this.data.start,
                end: this.data.end,
                should_export: this.data.should_export 
              }
            })
          .then(response => { 
            this.expenses = response.data.data
          }).catch(error => this.handleError(error))
        },
        // async getExportedMembers() {
        //     const data = {
        //         muqam: this.muqam.value
        //     }
        //     this.$vs.loading()
        //     try{
        //         const members = await axios.post('/users/export-users', data)
        //         this.$vs.loading.close()
        //         return members;
        //     } catch(e) {
        //         this.handleError(e)
        //     }
        // },

        async exportToExcel () {
            // const members = await this.getExportedMembers()
            const data = await this.formatJson(this.headerVal, this.expenses)
            const excel = await import('@/vendor/Export2Excel')
            excel.export_json_to_excel({
                header: this.headerTitle,
                data,
                filename: this.fileName,
                autoWidth: this.cellAutoWidth,
                bookType: this.selectedFormat
            })
            this.clearFields()
        },
        async formatJson (filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                // Add col name which needs to be translated
                // if (j === 'timestamp') {
                //   return parseTime(v[j])
                // } else {
                //   return v[j]
                // }

                return v[j]
            }))
        },
        clearFields () {
            this.filename = ''
            this.expenses = []
            this.cellAutoWidth = true
            this.selectedFormat = 'xlsx'
        }
    }
}
</script>

<style>

</style>