
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

export const saveEnterprise = params => { return mockAxios.post(`${base}/system/enterprise/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateEnterprise = params => { return mockAxios.post(`${base}/system/enterprise/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getEnterpriseList = params => { return mockAxios.post(`${base}/system/enterprise/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteEnterprise = params => { return mockAxios.post(`${base}/system/enterprise/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const getEnterprise = params => { return mockAxios.post(`${base}/system/enterprise/get.do`,qs.stringify(params)).then(res => res.data); }; 

export const saveMeet = params => { return mockAxios.post(`${base}/system/meet/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateMeet = params => { return mockAxios.post(`${base}/system/meet/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getMeetList = params => { return mockAxios.post(`${base}/system/meet/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteMeet = params => { return mockAxios.post(`${base}/system/meet/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const getMeet = params => { return mockAxios.post(`${base}/system/meet/get.do`,qs.stringify(params)).then(res => res.data); }; 

export const saveMeetSignUp = params => { return mockAxios.post(`${base}/system/meetsignup/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateMeetSignUp = params => { return mockAxios.post(`${base}/system/meetsignup/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getMeetSignUpList = params => { return mockAxios.post(`${base}/system/meetsignup/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteMeetSignUp = params => { return mockAxios.post(`${base}/system/meetsignup/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const getMeetSignUp = params => { return mockAxios.post(`${base}/system/meetsignup/get.do`,qs.stringify(params)).then(res => res.data); }; 
export const getMeetSignUpExcel = params => { window.open(`${base}/system/meetsignup/excel.do?meetId=`+params); }; 
