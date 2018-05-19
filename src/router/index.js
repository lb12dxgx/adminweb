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

import TrainSignUp from '@/components/Train/TrainSignUp'
import TrainSignUpAdd from '@/components/Train/TrainSignUpAdd'
import TrainSignUpEdit from '@/components/Train/TrainSignUpEdit'

import TrainTeacher from '@/components/Train/TrainTeacher'
import TrainTeacherAdd from '@/components/Train/TrainTeacherAdd'
import TrainTeacherEdit from '@/components/Train/TrainTeacherEdit'

import TrainPlanCert from '@/components/Train/TrainPlanCert'
import TrainCert from '@/components/Train/TrainCert'
import TrainCertAdd from '@/components/Train/TrainCertAdd'
import TrainCertEdit from '@/components/Train/TrainCertEdit'


import ZbInfo from '@/components/service/ZbInfo'
import ZbInfoAdd from '@/components/service/ZbInfoAdd'
import ZbInfoEdit from '@/components/service/ZbInfoEdit'
import Enterprise from '@/components/service/Enterprise'
import EnterpriseAdd from '@/components/service/EnterpriseAdd'
import EnterpriseEdit from '@/components/service/EnterpriseEdit'
import Product from '@/components/service/Product'
import ProductAdd from '@/components/service/ProductAdd'
import ProductEdit from '@/components/service/ProductEdit'
import Meet from '@/components/service/Meet'
import MeetAdd from '@/components/service/MeetAdd'
import MeetEdit from '@/components/service/MeetEdit'
import MeetSignUp from '@/components/service/MeetSignUp'
import MeetSignUpAdd from '@/components/service/MeetSignUpAdd'
import MeetSignUpEdit from '@/components/service/MeetSignUpEdit'


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
            path: 'system/trainsignup',
            component: TrainSignUp,
            name:'trainSignUp'
           },{
            path: 'system/trainsignup/add',
            component: TrainSignUpAdd,
            name:'trainSignUpAdd'
           },{
            path: 'system/trainsignup/edit',
            component: TrainSignUpEdit,
            name:'trainSignUpEdit'
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
            path: 'system/trainpalncert',
            component: TrainPlanCert,
            name:'trainPlanCert'
           },{
            path: 'system/traincert',
            component: TrainCert,
            name:'trainCert'
           },{
            path: 'system/traincert/add',
            component: TrainCertAdd,
            name:'trainCertAdd'
           },{
            path: 'system/traincert/edit',
            component: TrainCertEdit,
            name:'trainCertEdit'
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
           },{
            path: 'system/product',
            component: Product,
            name:'product'
           },{
            path: 'system/product/add',
            component: ProductAdd,
            name:'productadd'
           },{
            path: 'system/product/edit',
            component: ProductEdit,
            name:'productedit'
           },{
            path: 'system/meet',
            component: Meet,
            name:'meet'
           },{
            path: 'system/meet/add',
            component: MeetAdd,
            name:'meetAdd'
           },{
            path: 'system/meet/edit',
            component: MeetEdit,
            name:'meetedit'
           },{
            path: 'system/meetsignup',
            component: MeetSignUp,
            name:'meetsignup'
           },{
            path: 'system/meetsignup/add',
            component: MeetSignUpAdd,
            name:'meetsignupAdd'
           },{
            path: 'system/meetsignup/edit',
            component: MeetSignUpEdit,
            name:'meetsignupEdit'
           }
        ]
    }
  ]
})
