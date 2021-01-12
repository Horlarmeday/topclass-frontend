<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
========================================================================================== -->
<template>
  <div class="h-screen flex w-full bg-img items-center justify-center" id="page-login">
    <div class="vx-col md:w-1/2 lg:w-2/4 xl:w-2/5 sm:m-0 m-4">
      <img
        src="@/assets/images/pages/logo-bg.png"
        alt="register"
        class="mb-5"
        style="margin-left: 30%"
      />
      <vx-card>
        <div class="p-8 login-tabs-container">
          <div class="vx-card__title mb-4">
              <h4 class="mb-4">Login</h4>
              <p>Welcome back, please login to your account.</p>
          </div>
          <div>
            <form @keypress.enter="login">
              <vs-input
                  v-validate="'required|min:3'"
                  data-vv-validate-on="blur"
                  name="username"
                  icon-no-border
                  icon="icon icon-user"
                  icon-pack="feather"
                  label-placeholder="Username"
                  v-model="username"
                  autocomplete="off"
                  autofocus
                  class="w-full"/>
              <span class="text-danger text-sm">{{ errors.first('username') }}</span>

              <vs-input
                  data-vv-validate-on="blur"
                  v-validate="'required|min:6|max:20'"
                  type="password"
                  name="password"
                  icon-no-border
                  icon="icon icon-lock"
                  icon-pack="feather"
                  label-placeholder="Password"
                  v-model="password"
                  class="w-full mt-6" />
              <span class="text-danger text-sm">{{ errors.first('password') }}</span>

              <vs-button class="mt-6" type="filled" style="width: 100%"
                @click="login" :disabled="!isFormValid">Login</vs-button
              >

              <div class="flex flex-wrap justify-between my-5">
                  <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
                  <router-link to="">Forgot Password?</router-link>
              </div>

              <vs-divider></vs-divider>
                <vs-row>
                <vs-col
                  vs-offset="2"
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  vs-w="8"
                >
                </vs-col>
              </vs-row>
            </form>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default{
  data() {
    return {
      username: "",
      password: "",
      checkbox_remember_me: false,
    }
  },
  computed: {
    isFormValid () {
      return !this.errors.any() && this.username && this.password
    },
  },
  methods: {
    handleError(error) {
      this.$vs.notify({
        title:'Error',
        text: error.response.data,
        color:'danger',
        position:'top-center',
        iconPack: 'feather',
        icon:'icon-alert-circle'
      });
    },
    login() {
      let username = this.username
      let password = this.password

      this.$vs.loading()

      this.$store
        .dispatch('auth/login', { username, password })
        .then(response => {
          this.$vs.loading.close()
          this.$router.push('/app/dashboard')
          this.$vs.notify({
            title:'Success',
            text: response.data.message,
            color:'success',
            position:'top-center',
            iconPack: 'feather',
            icon:'icon-alert-circle'
          });
        })
        .catch(error => {
          this.$vs.loading.close()
          this.handleError(error)
        })
    }
  }
}
</script>

<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook { background-color: #1551b1 }
    .bg-twitter { background-color: #00aaff }
    .bg-google { background-color: #4285F4 }
    .bg-github { background-color: #333 }
  }
}


[dir] .layout--full-page .bg-img {
    background-image: url() !important;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

@media (min-width: 1200px){
  .xl\:w-2\/5 {
      width: 30% !important;
  }
}
</style>
