<template>
  <component :is="dashboardComponent"></component>
</template>

<script>
import { parseJwt } from '@/views/pages/app/utilities/helper'
import SuperAdminDashboard from './superadmin/Dashboard'
import AccountantDashboard from './accountant/Dashboard'
import SecretaryDashboard from './secretary/Dashboard'
import WorkshopDashboard from './workshop/Dashboard'

const RoleDashboardMapping = {
  SuperAdmin: SuperAdminDashboard,
  Accountant: AccountantDashboard,
  Secretary: SecretaryDashboard,
  'Workshop Cordinator': WorkshopDashboard
}
export default {
  data(){
    return {
        user: '',
        dashboardComponent: ''
    }
  },
  created() {
    this.user = parseJwt(localStorage.getItem('user-token'))
    this.dashboardComponent = RoleDashboardMapping[this.user.role]
  },
}
</script>

<style>

</style>