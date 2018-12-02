
import qs from 'qs';
import {mock,mockAxios,router,ip} from './head'
import {mock as mockcontent} from '../mock/mockcontent'
import {mock as mockapi} from '../mock/mock'




let base = ip;


export const applyorgList = params => { return mockAxios.post(`${base}/system/applyorg/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteApplyorg = params => { return mockAxios.post(`${base}/system/applyorg/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const saveApplyorg = params => { return mockAxios.post(`${base}/system/applyorg/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateApplyorg = params => { return mockAxios.post(`${base}/system/applyorg/update.do`,qs.stringify(params)).then(res => res.data); }; 

export const applycityList = params => { return mockAxios.post(`${base}/system/applycity/list.do`,qs.stringify(params)).then(res => res.data); };
export const enabledApplycity = params => { return mockAxios.post(`${base}/system/applycity/enabled.do`,qs.stringify(params)).then(res => res.data); };
export const disabledApplycity = params => { return mockAxios.post(`${base}/system/applycity/disabled.do`,qs.stringify(params)).then(res => res.data); };
export const saveApplycity = params => { return mockAxios.post(`${base}/system/applycity/save.do`,qs.stringify(params)).then(res => res.data); };
export const deleteApplycity = params => { return mockAxios.post(`${base}/system/applycity/delete.do`,qs.stringify(params)).then(res => res.data); };


export const citydistrictList = params => { return mockAxios.post(`${base}/system/citydistrict/list.do`,qs.stringify(params)).then(res => res.data); };
export const enabledCitydistrict = params => { return mockAxios.post(`${base}/system/citydistrict/enabled.do`,qs.stringify(params)).then(res => res.data); };
export const disabledCitydistrict = params => { return mockAxios.post(`${base}/system/citydistrict/disabled.do`,qs.stringify(params)).then(res => res.data); };
export const saveCitydistrict = params => { return mockAxios.post(`${base}/system/citydistrict/save.do`,qs.stringify(params)).then(res => res.data); };

export const cityareaList = params => { return mockAxios.post(`${base}/system/cityarea/list.do`,qs.stringify(params)).then(res => res.data); };
export const enabledCityarea = params => { return mockAxios.post(`${base}/system/cityarea/enabled.do`,qs.stringify(params)).then(res => res.data); };
export const disabledCityarea = params => { return mockAxios.post(`${base}/system/cityarea/disabled.do`,qs.stringify(params)).then(res => res.data); };
export const saveCityarea = params => { return mockAxios.post(`${base}/system/cityarea/save.do`,qs.stringify(params)).then(res => res.data); };