import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'
import { parseJwt } from '@/views/pages/app/utilities/helper'

Vue.use(AclInstaller)

let initialRole = 'Public'

const token = localStorage.getItem('user-token')
if (token) {
  const userInfo = parseJwt(token)
  initialRole = userInfo.role
} 
// if (userInfo && userInfo.role) 

export default new AclCreate({
  initial  : initialRole,
  notfound : '/pages/not-authorized',
  router,
  acceptLocalRules : true,
  globalRules: {
    SuperAdmin  : new AclRule('SuperAdmin').generate(),
    Public  : new AclRule('Public').or('Accountant').or('Secretary').or('Store').or('Workshop').or('Admin').or('SuperAdmin').generate(),
    Accountant : new AclRule('Accountant').or('SuperAdmin').or('Admin').generate(),
    Secretary : new AclRule('Secretary').or('SuperAdmin').or('Admin').or('Workshop').generate(),
    Store : new AclRule('Store').or('SuperAdmin').or('Accountant').generate(),
    Workshop : new AclRule('Workshop').or('SuperAdmin').generate(),
  }
})
