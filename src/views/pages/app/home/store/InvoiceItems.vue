<template>
    <vs-popup
    fullscreen
    title="Items"
    :active.sync="activePrompt">
          <div class="vx-row">
            <!-- CARD 9: CUSTOMERS ON CREDIT -->
            <div class="vx-col w-full">
                <vx-card title="Invoice Items">
                <div slot="no-body" class="mt-4">
                    <vs-table :data="items" class="table-dark-inverted" :sst="true">
                    <template slot="thead">
                        <vs-th>S/N</vs-th>
                        <vs-th>ITEM</vs-th>
                        <vs-th>QUANTITY</vs-th>
                        <vs-th>PRICE</vs-th>
                        <vs-th>LABEL</vs-th>
                        <vs-th>STATUS</vs-th>
                        <vs-th>DATE ADDED</vs-th>
                        <vs-th>ACTION</vs-th>
                    </template>

                    <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td :data="data[indextr]">
                                <span>{{indextr + 1}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].item">
                                <span>{{data[indextr].item }}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].quantity">
                                <span>{{data[indextr].quantity}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].price">
                                <span>₦{{Number(data[indextr].price).toLocaleString()}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].label">
                                <vs-chip :color="getLabelStatusColor(data[indextr].label)" class="product-order-status">{{ data[indextr].label }}</vs-chip>
                            </vs-td>
                            <vs-td :data="data[indextr].status">
                                <span class="flex items-center px-2 py-1 rounded"><div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + getOrderStatusColor(data[indextr].status)"></div>{{data[indextr].status}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].createdAt">
                                <span>{{data[indextr].createdAt | moment('DD/MM/YYYY')}}</span>
                            </vs-td>
                            <vs-td :data="data[indextr].slid" class="whitespace-no-wrap">
                                <feather-icon v-if="data[indextr].status === 'Pending'" icon="CheckSquareIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click="dispenseData(data[indextr].inv_id)"/>
                                <feather-icon  v-else icon="CheckSquareIcon" svgClasses="w-5 h-5 text-success stroke-current" class="ml-2" />
                            </vs-td>
                        </vs-tr>
                    </template>
                    </vs-table>
                </div>

                </vx-card>
            </div>
  </div>
    </vs-popup>
</template>

<script>
export default {
    props: {
      displayPrompt: {
          type: Boolean,
          required: true
      },
    },
    data() {
        return {
            itemsPerPage: 10
        }
    },
    computed: {
      items() {
        return this.$store.state.invoice.items
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
       getOverallIndex(index) {
            return this.currentPage * this.itemsPerPage - this.itemsPerPage + index + 1
       },
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

        getOrderStatusColor (type) {
            if (type === 'Partial')   return 'primary'
            if (type === 'Dispensed') return 'success'
            if (type === 'Pending')  return 'warning'
            return 'dark'
        },
        
        getLabelStatusColor (type) {
            if (type === 'spare part')   return 'primary'
            if (type === 'generator') return 'success'
            if (type === 'solar panels')  return 'warning'
            return 'dark'
        },
      dispenseData (id) {
        const obj = {
          inv_id: id,
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('invoice/dispenseItem', obj)
                .then(response => {
                    this.handleSuccess(response)
                })
                .catch(err => { this.handleError(err) })
            }
        })
      },
    },
    created() {

    }
}
</script>

<style>

</style>