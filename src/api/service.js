
import qs from 'qs';
import {mock,mockAxios,router,ip} from './head'
import {mock as mockcontent} from '../mock/mockcontent'
import {mock as mockapi} from '../mock/mock'




let base = ip;


export const saveZbInfo = params => { return mockAxios.post(`${base}/system/zbinfo/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateZbInfo = params => { return mockAxios.post(`${base}/system/zbinfo/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getZbInfoList = params => { return mockAxios.post(`${base}/system/zbinfo/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteZbInfo = params => { return mockAxios.post(`${base}/system/zbinfo/delete.do`,qs.stringify(params)).then(res => res.data); };
export const getZbInfo = params => { return mockAxios.post(`${base}/system/zbinfo/get.do`,qs.stringify(params)).then(res => res.data); }; 

export const saveProduct = params => { return mockAxios.post(`${base}/system/product/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateProduct = params => { return mockAxios.post(`${base}/system/product/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getProductList = params => { return mockAxios.post(`${base}/system/product/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteProduct = params => { return mockAxios.post(`${base}/system/product/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const getProduct = params => { return mockAxios.post(`${base}/system/product/get.do`,qs.stringify(params)).then(res => res.data); }; 
export const changeProductLevel = params => { return mockAxios.post(`${base}/system/product/changeLevel.do`,qs.stringify(params)).then(res => res.data); }
export const getAllProductList = params => { return mockAxios.post(`${base}/system/product/productlist.do`,qs.stringify(params)).then(res => res.data); };
export const viewProduct = params => { window.open(`${base}/hyproduct/productview.html?productId=`+params);}; 


export const saveEnterprise = params => { return mockAxios.post(`${base}/system/enterprise/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateEnterprise = params => { return mockAxios.post(`${base}/system/enterprise/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getEnterpriseList = params => { return mockAxios.post(`${base}/system/enterprise/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteEnterprise = params => { return mockAxios.post(`${base}/system/enterprise/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const getEnterprise = params => { return mockAxios.post(`${base}/system/enterprise/get.do`,qs.stringify(params)).then(res => res.data); }; 
export const changeEnterpriseLevel = params => { return mockAxios.post(`${base}/system/enterprise/changeLevel.do`,qs.stringify(params)).then(res => res.data); }
export const viewEnterprise = params => { window.open(`${base}/hyproduct/enterpriseview.html?enterpriseId=`+params);}; 


export const saveMeet = params => { return mockAxios.post(`${base}/system/meet/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateMeet = params => { return mockAxios.post(`${base}/system/meet/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getMeetList = params => { return mockAxios.post(`${base}/system/meet/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteMeet = params => { return mockAxios.post(`${base}/system/meet/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const getMeet = params => { return mockAxios.post(`${base}/system/meet/get.do`,qs.stringify(params)).then(res => res.data); }; 
export const changeSign = params => { return mockAxios.post(`${base}/system/meet/changeSign.do`,qs.stringify(params)).then(res => res.data); }; 

export const saveMeetSignUp = params => { return mockAxios.post(`${base}/system/meetsignup/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateMeetSignUp = params => { return mockAxios.post(`${base}/system/meetsignup/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getMeetSignUpList = params => { return mockAxios.post(`${base}/system/meetsignup/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteMeetSignUp = params => { return mockAxios.post(`${base}/system/meetsignup/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const getMeetSignUp = params => { return mockAxios.post(`${base}/system/meetsignup/get.do`,qs.stringify(params)).then(res => res.data); }; 
export const getMeetSignUpExcel = params => { window.open(`${base}/system/meetsignup/excel.do?meetId=`+params); }; 


export const saveMeetPlan = params => { return mockAxios.post(`${base}/system/meetplan/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateMeetPlan = params => { return mockAxios.post(`${base}/system/meetplan/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getMeetPlanList = params => { return mockAxios.post(`${base}/system/meetplan/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteMeetPlan = params => { return mockAxios.post(`${base}/system/meetplan/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const getMeetPlan = params => { return mockAxios.post(`${base}/system/meetplan/get.do`,qs.stringify(params)).then(res => res.data); }; 


export const saveEnterpriseCert = params => { return mockAxios.post(`${base}/system/enterprisecert/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateEnterpriseCert = params => { return mockAxios.post(`${base}/system/enterprisecert/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getEnterpriseCertList = params => { return mockAxios.post(`${base}/system/enterprisecert/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteEnterpriseCert = params => { return mockAxios.post(`${base}/system/enterprisecert/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const getEnterpriseCert = params => { return mockAxios.post(`${base}/system/enterprisecert/get.do`,qs.stringify(params)).then(res => res.data); }; 


export const getJobInfoList = params => { return mockAxios.post(`${base}/system/job/list.do`,qs.stringify(params)).then(res => res.data); }
export const changeJobLevel = params => { return mockAxios.post(`${base}/system/job/changeLevel.do`,qs.stringify(params)).then(res => res.data); }
export const deleteJobInfo = params => { return mockAxios.post(`${base}/system/job/delete.do`,qs.stringify(params)).then(res => res.data); };
export const viewJobInfo = params => { window.open(`${base}/job/jobview.html?jobInfoId=`+params);}; 



export const getPersonList = params => { return mockAxios.post(`${base}/system/resume/list.do`,qs.stringify(params)).then(res => res.data); }
export const changePersonLevel = params => { return mockAxios.post(`${base}/system/resume/changeLevel.do`,qs.stringify(params)).then(res => res.data); }
export const deletePerson = params => { return mockAxios.post(`${base}/system/resume/delete.do`,qs.stringify(params)).then(res => res.data); };
export const viewPerson = params => { window.open(`${base}/emp/resume/view.html?personId=`+params);}; 

export const getAccidentUnList = params => { return mockAxios.post(`${base}/system/accidentinfo/unlist.do`,qs.stringify(params)).then(res => res.data); }
export const getAccidentPassList = params => { return mockAxios.post(`${base}/system/accidentinfo/passlist.do`,qs.stringify(params)).then(res => res.data); }
export const getAccidentNoPassList = params => { return mockAxios.post(`${base}/system/accidentinfo/nopasslist.do`,qs.stringify(params)).then(res => res.data); }
export const changePassAccident = params => { return mockAxios.post(`${base}/system/accidentinfo/changePass.do`,qs.stringify(params)).then(res => res.data); }
export const changeNoPassAccident = params => { return mockAxios.post(`${base}/system/accidentinfo/changeNoPass.do`,qs.stringify(params)).then(res => res.data); }
export const getAccident = params => { return mockAxios.post(`${base}/system/accidentinfo/get.do`,qs.stringify(params)).then(res => res.data); }


export const getAbilityUnList = params => { return mockAxios.post(`${base}/system/abilityinfo/unlist.do`,qs.stringify(params)).then(res => res.data); }
export const getAbilityPassList = params => { return mockAxios.post(`${base}/system/abilityinfo/passlist.do`,qs.stringify(params)).then(res => res.data); }
export const getAbilityNoPassList = params => { return mockAxios.post(`${base}/system/abilityinfo/nopasslist.do`,qs.stringify(params)).then(res => res.data); }
export const changePassAbility = params => { return mockAxios.post(`${base}/system/abilityinfo/changePass.do`,qs.stringify(params)).then(res => res.data); }
export const changeNoPassAbility = params => { return mockAxios.post(`${base}/system/abilityinfo/changeNoPass.do`,qs.stringify(params)).then(res => res.data); }
export const getAbility = params => { return mockAxios.post(`${base}/system/abilityinfo/get.do`,qs.stringify(params)).then(res => res.data); }



export const getBuyinfoList = params => { return mockAxios.post(`${base}/system/buyinfo/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteBuyinfo = params => { return mockAxios.post(`${base}/system/buyinfo/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const viewBuyinfo = params => { window.open(`${base}/hyproduct/buyinfoview.html?buyInfoId=`+params);}; 
