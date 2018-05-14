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

import TrainPlan from '@/components/Train/TrainPlan'
import TrainPlanAdd from '@/components/Train/TrainPlanAdd'
import TrainPlanEdit from '@/components/Train/TrainPlanEdit'
import TrainClass from '@/components/Train/TrainClass'
import TrainClassAdd from '@/components/Train/TrainClassAdd'
import TrainClassEdit from '@/components/Train/TrainClassEdit'
import TrainTeacher from '@/components/Train/TrainTeacher'
import TrainTeacherAdd from '@/components/Train/TrainTeacherAdd'
import TrainTeacherEdit from '@/components/Train/TrainTeacherEdit'


import ZbInfo from '@/components/service/ZbInfo'
import ZbInfoAdd from '@/components/service/ZbInfoAdd'
import ZbInfoEdit from '@/components/service/ZbInfoEdit'

import Enterprise from '@/components/service/Enterprise'
import EnterpriseAdd from '@/components/service/EnterpriseAdd'
import EnterpriseEdit from '@/components/service/EnterpriseEdit'

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
           },{
            path: 'system/trainplan',
            component: TrainPlan,
            name:'trainPlan'
           },{
            path: 'system/trainplan/add',
            component: TrainPlanAdd,
            name:'trainPlanAdd'
           },{
            path: 'system/trainplan/edit',
            component: TrainPlanEdit,
            name:'trainPlanEdit'
           },{
            path: 'system/trainclass',
            component: TrainClass,
            name:'trainClass'
           },{
            path: 'system/trainclass/add',
            component: TrainClassAdd,
            name:'trainClassAdd'
           },{
            path: 'system/trainclass/edit',
            component: TrainClassEdit,
            name:'trainClassEdit'
           },{
            path: 'system/trainteacher',
            component: TrainTeacher,
            name:'trainTeacher'
           },{
            path: 'system/trainteacher/add',
            component: TrainTeacherAdd,
            name:'trainTeacher'
           },{
            path: 'system/trainteacher/edit',
            component: TrainTeacherEdit,
            name:'trainTeacher'
           },{
            path: 'system/zbinfo',
            component: ZbInfo,
            name:'zbInfo'
           },{
            path: 'system/zbinfo/add',
            component: ZbInfoAdd,
            name:'zbInfoadd'
           },{
            path: 'system/zbinfo/edit',
            component: ZbInfoEdit,
            name:'zbInfoedit'
           },{
            path: 'system/enterprise',
            component: Enterprise,
            name:'enterprise'
           },{
            path: 'system/enterprise/add',
            component: EnterpriseAdd,
            name:'enterpriseadd'
           },{
            path: 'system/enterprise/edit',
            component: EnterpriseEdit,
            name:'enterpriseedit'
           }



      ]
    }
  ]
})
