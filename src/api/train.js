
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

export const saveTrainClass = params => { return mockAxios.post(`${base}/system/trainclass/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateTrainClass = params => { return mockAxios.post(`${base}/system/trainclass/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getTrainClassList = params => { return mockAxios.post(`${base}/system/trainclass/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteTrainClass = params => { return mockAxios.post(`${base}/system/trainclass/delete.do`,qs.stringify(params)).then(res => res.data); }; 

export const saveTrainTeacher = params => { return mockAxios.post(`${base}/system/trainteacher/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateTrainTeacher = params => { return mockAxios.post(`${base}/system/trainteacher/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getTrainTeacherList = params => { return mockAxios.post(`${base}/system/trainteacher/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteTrainTeacher = params => { return mockAxios.post(`${base}/system/trainteacher/delete.do`,qs.stringify(params)).then(res => res.data); }; 
