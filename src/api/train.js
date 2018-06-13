
import qs from 'qs';
import {mock,mockAxios,router,ip} from './head'
import {mock as mockcontent} from '../mock/mockcontent'
import {mock as mockapi} from '../mock/mock'




let base = ip;


export const saveTrainPlan = params => { return mockAxios.post(`${base}/system/trainplan/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateTrainPlan = params => { return mockAxios.post(`${base}/system/trainplan/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getTrainPlanList = params => { return mockAxios.post(`${base}/system/trainplan/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteTrainPlan = params => { return mockAxios.post(`${base}/system/trainplan/delete.do`,qs.stringify(params)).then(res => res.data); };
export const getTrainPlan = params => { return mockAxios.post(`${base}/system/trainplan/get.do`,qs.stringify(params)).then(res => res.data); }; 
export const changeSign = params => { return mockAxios.post(`${base}/system/trainplan/changeSign.do`,qs.stringify(params)).then(res => res.data); }; 

export const saveTrainClass = params => { return mockAxios.post(`${base}/system/trainclass/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateTrainClass = params => { return mockAxios.post(`${base}/system/trainclass/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getTrainClassList = params => { return mockAxios.post(`${base}/system/trainclass/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteTrainClass = params => { return mockAxios.post(`${base}/system/trainclass/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const getTrainClass = params => { return mockAxios.post(`${base}/system/trainclass/get.do`,qs.stringify(params)).then(res => res.data); }; 

export const saveTrainTeacher = params => { return mockAxios.post(`${base}/system/trainteacher/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateTrainTeacher = params => { return mockAxios.post(`${base}/system/trainteacher/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getTrainTeacherList = params => { return mockAxios.post(`${base}/system/trainteacher/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteTrainTeacher = params => { return mockAxios.post(`${base}/system/trainteacher/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const getTrainTeacher = params => { return mockAxios.post(`${base}/system/trainteacher/get.do`,qs.stringify(params)).then(res => res.data); }; 


export const saveTrainCert = params => { return mockAxios.post(`${base}/system/traincert/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateTrainCert = params => { return mockAxios.post(`${base}/system/traincert/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getTrainCertList = params => { return mockAxios.post(`${base}/system/traincert/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteTrainCert = params => { return mockAxios.post(`${base}/system/traincert/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const getTrainCert = params => { return mockAxios.post(`${base}/system/traincert/get.do`,qs.stringify(params)).then(res => res.data); }; 

export const saveTrainSignUp = params => { return mockAxios.post(`${base}/system/trainsignup/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateTrainSignUp = params => { return mockAxios.post(`${base}/system/trainsignup/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getTrainSignUpList = params => { return mockAxios.post(`${base}/system/trainsignup/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteTrainSignUp = params => { return mockAxios.post(`${base}/system/trainsignup/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const getTrainSignUp = params => { return mockAxios.post(`${base}/system/trainsignup/get.do`,qs.stringify(params)).then(res => res.data); }; 
export const getTrainSignUpExcel = params => { window.open(`${base}/system/trainsignup/excel.do?trainPlanId=`+params); }; 