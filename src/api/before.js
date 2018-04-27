
import qs from 'qs';
import {mock,mockAxios,router,ip} from './head'
import {mock as mockcontent} from '../mock/mockcontent'
import {mock as mockapi} from '../mock/mock'




let base = ip;


export const applyorgList = params => { return mockAxios.post(`${base}/system/applyorg/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteApplyorg = params => { return mockAxios.post(`${base}/system/applyorg/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const saveApplyorg = params => { return mockAxios.post(`${base}/system/applyorg/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateApplyorg = params => { return mockAxios.post(`${base}/system/applyorg/update.do`,qs.stringify(params)).then(res => res.data); }; 
