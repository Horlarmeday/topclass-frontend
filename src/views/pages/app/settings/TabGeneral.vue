<template>
  <vx-card no-shadow>
    <!-- Info -->
    <vs-input class="w-full mb-base" label-placeholder="Full Name" v-model="fullname"></vs-input>
    <vs-input class="w-full mb-base" label-placeholder="Username" v-model="username"></vs-input>
    <vs-input class="w-full mb-base" label-placeholder="Email" v-model="email"></vs-input>
    <vs-input class="w-full mb-base" label-placeholder="Phone Number" v-model="phone"></vs-input>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2" @click="submitData">Save Changes</vs-button>
      <!-- <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button> -->
    </div>
  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      sid: null,
      fullname: '',
      phone: null,
      email: null,
      username: null,
    }
  },
  computed: {
    staff() {
        return this.$store.state.employee.employee
    }
  },

  watch: {
    staff: function () {
      const { sid, phone, fullname, username, email } = JSON.parse(JSON.stringify(this.staff))
      this.sid = sid
      this.phone = phone
      this.email = email
      this.username = username
      this.fullname = fullname
    }
  },

  created() {
    this.$store.dispatch('employee/fetchEmployee')
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
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            sid: this.sid,
            fullname: this.fullname,
            phone: this.phone,
            email: this.email,
            username: this.username,
            role: this.role
          }
          if (this.sid !== null && this.sid >= 0)
            this.$store.dispatch('employee/updateEmployee', obj)
            .then(response => {
                this.handleSuccess(response)
            })
            .catch(err => { this.handleError(err) })
        }
      })
    }
  }
}
</script>
