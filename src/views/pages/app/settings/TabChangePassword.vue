<template>
  <vx-card no-shadow>

    <vs-input 
      class="w-full mb-base"       
      data-vv-validate-on="blur"
      v-validate="'required|min:6'"
      name="password" 
      type="password" 
      label-placeholder="Old Password" 
      v-model="old_password" 
    />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>
    <vs-input 
      class="w-full mb-base" 
      data-vv-validate-on="blur"
      v-validate="'required|min:6'"
      name="new_password"  
      type="password" 
      label-placeholder="New Password" 
      v-model="new_password" 
    />
    <span class="text-danger text-sm">{{ errors.first('new_password') }}</span>
    <vs-input 
      class="w-full mb-base" 
      v-validate="'min:6'"
      data-vv-validate-on="blur"
      data-vv-as="password"
      name="confirm_password" 
      type="password" 
      label-placeholder="Confirm Password" 
      v-model="confirm_new_password" 
    />
    <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2" @click="changePassword" :disabled="!validateForm">Save Changes</vs-button>
      <vs-button class="ml-4 mt-2" @click="initValues" type="border" color="warning">Reset</vs-button>
    </div>
  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      old_password: '',
      new_password: '',
      confirm_new_password: ''
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.old_password !== '' && this.new_password !== '' && this.confirm_new_password !== ''
    }
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

    initValues() {
      this.old_password = '',
      this.new_password = '',
      this.confirm_new_password = ''
    },

    changePassword () {
        const obj = {
            oldPassword: this.old_password,
            newPassword: this.new_password,
            confirmPassword: this.confirm_new_password,
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('employee/changePassword', obj)
                .then(response => {
                    this.handleSuccess(response)
                    this.initValues()
                })
                .catch(err => { this.handleError(err) })
            }
        })
    },
  }
}
</script>
