import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Main from '@/components/Main'


import SystemUser from '@/components/system/User'
import SystemOrg from '@/components/system/Org'
import SystemAccount from '@/components/system/Account'
import SystemMenu from '@/components/system/Menu'
import SystemDict from '@/components/system/Dict'
import SystemRole from '@/components/system/Role'
import SystemRoleUser from '@/components/system/RoleUser'
import SystemRoleMenu from '@/components/system/RoleMenu'
import SystemRoleColumn from '@/components/system/RoleColumn'

import ContentColumnInfo from '@/components/content/ColumnInfo'
import ContentInfo from '@/components/content/ContentInfo'
import AccidentInfo from '@/components/content/AccidentInfo'
import AccidentInfoView from '@/components/content/AccidentInfoView'
import OutNews from '@/components/content/OutNews'
import OutKey from '@/components/content/OutKey'

import ApplyCity from '@/components/before/ApplyCity'
import ApplyCityAdd from '@/components/before/ApplyCityAdd'

import CityDistrict from '@/components/before/CityDistrict'
import CityDistrictAdd from '@/components/before/CityDistrictAdd'

import CityArea from '@/components/before/CityArea'
import CityAreaAdd from '@/components/before/CityAreaAdd'

import ApplyOrg from '@/components/before/ApplyOrg'
import BeforeApply from '@/components/before/BeforeApply'

import BeforePerson from '@/components/before/BeforePerson'
import BeforeEnterprise from '@/components/before/BeforeEnterprise'
import BeforeEnterpriseView from '@/components/before/BeforeEnterpriseView'

import TrainPlan from '@/components/Train/TrainPlan'
import TrainPlanAdd from '@/components/Train/TrainPlanAdd'
import TrainPlanEdit from '@/components/Train/TrainPlanEdit'
import TrainClass from '@/components/Train/TrainClass'
import TrainClassAdd from '@/components/Train/TrainClassAdd'
import TrainClassEdit from '@/components/Train/TrainClassEdit'
import TrainSignUp from '@/components/Train/TrainSignUp'
import TrainSignUpAdd from '@/components/Train/TrainSignUpAdd'
import TrainSignUpEdit from '@/components/Train/TrainSignUpEdit'

import Meet from '@/components/Train/Meet'
import MeetAdd from '@/components/Train/MeetAdd'
import MeetEdit from '@/components/Train/MeetEdit'
import MeetSignUp from '@/components/Train/MeetSignUp'
import MeetSignUpAdd from '@/components/Train/MeetSignUpAdd'
import MeetSignUpEdit from '@/components/Train/MeetSignUpEdit'

import MeetPlan from '@/components/Train/MeetPlan'
import MeetPlanAdd from '@/components/Train/MeetPlanAdd'
import MeetPlanEdit from '@/components/Train/MeetPlanEdit'






import Enterprise from '@/components/service/Enterprise'
import EnterpriseAdd from '@/components/service/EnterpriseAdd'
import EnterpriseEdit from '@/components/service/EnterpriseEdit'
import Product from '@/components/service/Product'
import ProductAdd from '@/components/service/ProductAdd'
import ProductEdit from '@/components/service/ProductEdit'





import JobInfo from '@/components/hyJob/JobInfo'
import Resume from '@/components/hyJob/Resume'


import HyEnterprise from '@/components/hyproduct/HyEnterprise'
import HyProduct from '@/components/hyproduct/HyProduct'
import HyBuyInfo from '@/components/hyproduct/HyBuyInfo'
import ZbInfo from '@/components/hyproduct/ZbInfo'
import ZbInfoAdd from '@/components/hyproduct/ZbInfoAdd'
import ZbInfoEdit from '@/components/hyproduct/ZbInfoEdit'




import TrainTeacher from '@/components/hyManage/TrainTeacher'
import TrainTeacherAdd from '@/components/hyManage/TrainTeacherAdd'
import TrainTeacherEdit from '@/components/hyManage/TrainTeacherEdit'

import TrainPlanCert from '@/components/hyManage/TrainPlanCert'
import TrainCert from '@/components/hyManage/TrainCert'
import TrainCertAdd from '@/components/hyManage/TrainCertAdd'
import TrainCertEdit from '@/components/hyManage/TrainCertEdit'

import HyAbility from '@/components/hyManage/HyAbility'
import HyAbilityView from '@/components/hyManage/HyAbilityView'

import EnterpriseCert from '@/components/hyManage/EnterpriseCert'
import EnterpriseCertAdd from '@/components/hyManage/EnterpriseCertAdd'
import EnterpriseCertEdit from '@/components/hyManage/EnterpriseCertEdit'


import Gift from '@/components/mail/Gift'
import GiftAdd from '@/components/mail/GiftAdd'
import GiftEdit from '@/components/mail/GiftEdit'

import Exchange from '@/components/mail/Exchange'
import ExchangeFinsh from '@/components/mail/ExchangeFinsh'
import ExchangeEdit from '@/components/mail/ExchangeEdit'

import Problem from '@/components/sns/Problem'
import ProblemFinsh from '@/components/sns/ProblemFinsh'
import ProblemView from '@/components/sns/ProblemView'
import ProblemResultView from '@/components/sns/ProblemResultView'
import ProblemOver from '@/components/sns/ProblemOver'
import ProblemOverRefund from '@/components/sns/ProblemOverRefund'

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
            path: 'system/dict',
            component: SystemDict,
            name:'systemDict'
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
            path: 'system/role/column',
            component: SystemRoleColumn,
            name:'systemRoleColumn'
          },{
            path: 'system/column',
            component: ContentColumnInfo,
            name:'contentColumnInfo'
          },{
            path: 'system/content',
            component: ContentInfo,
            name:'contentInfo'
            
          },{
            path: 'system/accidentInfo',
            component: AccidentInfo,
            name:'accidentInfo'
            
          },{
            path: 'system/accidentInfo/view',
            component: AccidentInfoView,
            name:'accidentInfoView'
            
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
            path: 'system/applycity',
            component: ApplyCity,
            name:'applyCity'
           },{
            path: 'system/applycity/add',
            component: ApplyCityAdd,
            name:'applyCityAdd'
           },{
            path: 'system/citydistrict',
            component: CityDistrict,
            name:'cityDistrict'
           },{
            path: 'system/citydistrict/add',
            component: CityDistrictAdd,
            name:'citydistrictAdd'
           },{
            path: 'system/cityarea',
            component: CityArea,
            name:'cityDistrict'
           },{
            path: 'system/cityarea/add',
            component: CityAreaAdd,
            name:'cityAreaAdd'
           },{
            path: 'system/beforeapply',
            component: BeforeApply,
            name:'beforeApply'
           },{
            path: 'system/beforeperson',
            component: BeforePerson,
            name:'beforePerson'
           },{
            path: 'system/beforeenterprise',
            component: BeforeEnterprise,
            name:'beforeEnterprise'
           },{
            path: 'system/beforeenterprise/view',
            component: BeforeEnterpriseView,
            name:'beforeEnterpriseView'
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
            path: 'system/meetplan',
            component: MeetPlan,
            name:'meetplan'
           },{
            path: 'system/meetplan/add',
            component: MeetPlanAdd,
            name:'meetplanAdd'
           },{
            path: 'system/meetplan/edit',
            component: MeetPlanEdit,
            name:'meetplanedit'
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
           },{
            path: 'system/enterprisecert',
            component: EnterpriseCert,
            name:'enterprisecert'
           },{
            path: 'system/enterprisecert/add',
            component: EnterpriseCertAdd,
            name:'enterprisecertAdd'
           },{
            path: 'system/enterprisecert/edit',
            component: EnterpriseCertEdit,
            name:'enterprisecertEdit'
           },{
            path: 'system/jobinfo',
            component: JobInfo,
            name:'jobInfo'
           },{
            path: 'system/resume',
            component: Resume,
            name:'resume'
           },{
            path: 'system/hyenterprise',
            component: HyEnterprise,
            name:'hyEnterprise'
           },{
            path: 'system/hyproduct',
            component: HyProduct,
            name:'hyProduct'
           },{
            path: 'system/hybuyinfo',
            component: HyBuyInfo,
            name:'hyBuyInfo'
           },{
            path: 'system/hyability',
            component: HyAbility,
            name:'hyAbility'
           },{
            path: 'system/hyability/view',
            component: HyAbilityView,
            name:'hyAbilityView'
           },{
            path: 'system/gift',
            component: Gift,
            name:'gift'
           },{
            path: 'system/gift/add',
            component: GiftAdd,
            name:'giftAdd'
           },{
            path: 'system/gift/edit',
            component: GiftEdit,
            name:'giftEdit'
           },{
            path: 'system/exchange',
            component: Exchange,
            name:'exchange'
           },{
            path: 'system/exchange/finsh',
            component: ExchangeFinsh,
            name:'exchangeFinsh'
           },{
            path: 'system/exchange/edit',
            component: ExchangeEdit,
            name:'exchangeEdit'
           },{
            path: 'system/sns/problem',
            component: Problem,
            name:'problem'
           },{
            path: 'system/sns/problem/over',
            component: ProblemOver,
            name:'problemOver'
           },{
            path: 'system/sns/problem/overrefund',
            component: ProblemOverRefund,
            name:'problemOverRefund'
           },{
            path: 'system/sns/problem/finsh',
            component: ProblemFinsh,
            name:'problemFinsh'
           },{
            path: 'system/sns/problemview',
            component: ProblemView,
            name:'problemView'
           },{
            path: 'system/sns/problemresultview',
            component: ProblemResultView,
            name:'problemResultView'
           }
        ]
    }
  ]
})
