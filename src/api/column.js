
import qs from 'qs';
import {mock,mockAxios,router,ip} from './head'
import {mock as mockcontent} from '../mock/mockcontent'
import {mock as mockapi} from '../mock/mock'




let base = ip;


export const saveColumn = params => { return mockAxios.post(`${base}/system/column/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateColumn = params => { return mockAxios.post(`${base}/system/column/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getColumnTree = params => { return mockAxios.post(`${base}/system/column/tree.do`,qs.stringify(params)).then(res => res.data); };
export const treeByPrivage = params => { return mockAxios.post(`${base}/system/column/treeByPrivage.do`,qs.stringify(params,{arrayFormat:'repeat'})).then(res => res.data); };
export const deleteColumn = params => { return mockAxios.post(`${base}/system/column/delete.do`,qs.stringify(params)).then(res => res.data); }; 

export const saveContent = params => { return mockAxios.post(`${base}/system/content/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateContent = params => { return mockAxios.post(`${base}/system/content/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getContentList = params => { return mockAxios.post(`${base}/system/content/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteContent = params => { return mockAxios.post(`${base}/system/content/delete.do`,qs.stringify(params)).then(res => res.data); }; 


export const getOutNewsList = params => { return mockAxios.post(`${base}/system/outnews/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteOutNew = params => { return mockAxios.post(`${base}/system/outnews/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const deleteAllOutNew = params => { return mockAxios.post(`${base}/system/outnews/alldelete.do`,qs.stringify(params)).then(res => res.data); }; 


export const outKeyList = params => { return mockAxios.post(`${base}/system/outkey/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteOutKey = params => { return mockAxios.post(`${base}/system/outkey/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const saveOutKey = params => { return mockAxios.post(`${base}/system/outkey/save.do`,qs.stringify(params)).then(res => res.data); }; 
