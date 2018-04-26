import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Main from '@/components/Main'


import SystemUser from '@/components/system/User'
import SystemOrg from '@/components/system/Org'
import SystemAccount from '@/components/system/Account'
import SystemMenu from '@/components/system/Menu'
import SystemRole from '@/components/system/Role'
import SystemRoleUser from '@/components/system/RoleUser'
import SystemRoleMenu from '@/components/system/RoleMenu'

import ContentColumnInfo from '@/components/content/ColumnInfo'
import ContentInfo from '@/components/content/ContentInfo'
import OutNews from '@/components/content/OutNews'
import OutKey from '@/components/content/OutKey'


import ApplyOrg from '@/components/before/ApplyOrg'
import BeforeApply from '@/components/before/BeforeApply'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/',
      name: 'Login',
      component: Login
    },
    {
    	  path: '/main',
      	name: 'Main',
      	component: Main,
        children:[
          {
            path: 'system/user',
            component: SystemUser,
            name:'systemUser'
          },{
            path: 'system/account',
            component: SystemAccount,
            name:'account'
          },{
            path: 'system/org',
            component: SystemOrg,
            name:'systemOrg'
          },{
            path: 'system/menu',
            component: SystemMenu,
            name:'systemMenu'
          },{
            path: 'system/role',
            component: SystemRole,
            name:'systemRole'
          },{
            path: 'system/role/user',
            component: SystemRoleUser,
            name:'systemRoleUser'
          },{
            path: 'system/role/menu',
            component: SystemRoleMenu,
            name:'systemRoleMenu'
          },{
            path: 'system/column',
            component: ContentColumnInfo,
            name:'contentColumnInfo'
          },{
            path: 'system/content',
            component: ContentInfo,
            name:'contentInfo'
            
          },{
            path: 'system/outnews',
            component: OutNews,
            name:'outNews'
           },{
            path: 'system/outkey',
            component: OutKey,
            name:'outKey'
           },{
            path: 'system/applyorg',
            component: ApplyOrg,
            name:'applyOrg'
           },{
            path: 'system/beforeapply',
            component: BeforeApply,
            name:'beforeApply'
           }
      ]
    }
  ]
})
