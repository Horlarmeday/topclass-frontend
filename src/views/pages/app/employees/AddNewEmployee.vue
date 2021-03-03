<template>
  <div>
        <vs-popup
            title="Create Employee"
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
                <div class="vx-col w-full">
                    <vs-input class="w-full" label="Full Name" v-model="fullname" name="name" />
                    <span class="text-danger text-sm">{{errors.first('name')}}</span>
                </div>
                </div>
                <div class="vx-row mb-2">
                <div class="vx-col w-full">
                    <vs-input class="w-full" type="text" label="Phone" v-model="phone" name="phone" minLength="11" maxLength="11"/>
                    <span class="text-danger text-sm">{{errors.first('phone')}}</span>
                </div>
                </div>
                <div class="vx-row mb-2">
                <div class="vx-col w-full">
                    <vs-input class="w-full" type="email" label="Email" v-model="email" name="email" />
                    <span class="text-danger text-sm">{{errors.first('phone')}}</span>
                </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" type="text" label="Username" v-model="username" name="username" />
                        <span class="text-danger text-sm">{{errors.first('username')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" type="password" label="Password" v-model="password" name="password" />
                        <span class="text-danger text-sm">{{errors.first('password')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <small class="ml-2">Gender</small>
                        <v-select 
                        v-validate="'required'"
                        data-vv-validate-on="blur"
                        v-model="gender"
                        name="gender"
                        :closeOnSelect="true" 
                        :options="['Female', 'Male']" 
                        :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                        />
                        <span class="text-danger text-sm">{{errors.first('gender')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" type="text" label="Guarantor Name" v-model="guarantor_name" name="guarantor_name" />
                        <span class="text-danger text-sm">{{errors.first('guarantor_name')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full"  v-validate="'required|min:11|max:11'" maxLength="11" data-vv-validate-on="blur" type="text" label="Guarantor Phone" v-model="guarantor_phone" name="guarantor_phone" />
                        <span class="text-danger text-sm">{{errors.first('guarantor_phone')}}</span>
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <small class="ml-2">Role</small>
                        <v-select 
                            v-validate="'required'"
                            data-vv-validate-on="blur"
                            v-model="role"
                            name="role"
                            :closeOnSelect="true" 
                            :options="roles" 
                            :dir="$vs.rtl ? 'rtl' : 'ltr'" 
                        />
                        <span class="text-danger text-sm">{{errors.first('role')}}</span>
                    </div>
                </div>
                <div slot="footer" class="pt-8">
                    <vs-button class="mr-6" @click="createEmployee" :disabled="!validateForm">Submit</vs-button>
                    <vs-button type="border" color="danger" @click="activePrompt = false">Cancel</vs-button>
                </div>
            </div>
        </div>
    </vs-popup>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import data from "./roles"
export default {
    props: {
        displayPrompt: {
            type: Boolean,
            required: true
        }
    },
    components: {
        vSelect
    },
    data() {
        return {
            role: '',
            phone: '',
            fullname: '',
            email: '',
            username: '',
            gender: '',
            password: '',
            guarantor_name: '',
            guarantor_phone: '',
            roles: data,
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
            return !this.errors.any() &&
             this.fullname !== '' &&
             this.phone !== '' && 
             this.email !== '' && 
             this.role !== '' && 
             this.username !== '' && 
             this.guarantor_name !== '' && 
             this.guarantor_phone !== '' && 
             this.gender !== '' && 
             this.password !== ''
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
      createEmployee () {
        const obj = {
            fullname: this.fullname,
            phone: this.phone,
            email: this.email,
            username: this.username,
            password: this.password,
            role: this.role,
            gender: this.gender,
            guarantor_name: this.guarantor_name,
            guarantor_phone: this.guarantor_phone,
        }
        this.$vs.loading()
        this.$validator.validateAll().then(result => {
            if (result) {
                this.$store.dispatch('employee/addEmployee', obj)
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
        this.fullname = ''
        this.phone = ''
        this.email = ''
        this.username = ''
        this.password = ''
        this.role = ''
        this.guarantor_name = ''
        this.guarantor_phone = ''
      }
    },
    
}
</script>

<style>

</style>