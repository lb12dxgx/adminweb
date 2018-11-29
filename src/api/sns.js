import qs from 'qs';
import {mock,mockAxios,router,ip} from './head'
import {mock as mockcontent} from '../mock/mockcontent'
import {mock as mockapi} from '../mock/mock'
let base = ip;


export const saveGift = params => { return mockAxios.post(`${base}/system/mail/gift/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateGift = params => { return mockAxios.post(`${base}/system/mail/gift/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getGiftList = params => { return mockAxios.post(`${base}/system/mail/gift/list.do`,qs.stringify(params)).then(res => res.data); };
export const deleteGift = params => { return mockAxios.post(`${base}/system/mail/gift/delete.do`,qs.stringify(params)).then(res => res.data); };
export const getGift = params => { return mockAxios.post(`${base}/system/mail/gift/get.do`,qs.stringify(params)).then(res => res.data); }; 


export const getExchangeList = params => { return mockAxios.post(`${base}/system/mail/exchange/list.do`,qs.stringify(params)).then(res => res.data); };
export const getExchangeFinshList = params => { return mockAxios.post(`${base}/system/mail/exchange/finshlist.do`,qs.stringify(params)).then(res => res.data); };
export const addExchangePost = params => { return mockAxios.post(`${base}/system/mail/exchange/addPost.do`,qs.stringify(params)).then(res => res.data); }; 
export const getExchange = params => { return mockAxios.post(`${base}/system/mail/exchange/get.do`,qs.stringify(params)).then(res => res.data); }; 



export const getScoreList = params => { return mockAxios.post(`${base}/system/mail/score/list.do`,qs.stringify(params)).then(res => res.data); }; 
export const getRechargerecordList = params => { return mockAxios.post(`${base}/system/mail/rechargerecord/list.do`,qs.stringify(params)).then(res => res.data); }; 


export const getProblem = params => { return mockAxios.post(`${base}/system/sns/problem/get.do`,qs.stringify(params)).then(res => res.data); }; 
export const getProblemList = params => { return mockAxios.post(`${base}/system/sns/problem/list.do`,qs.stringify(params)).then(res => res.data); }; 
export const getProblemOverList = params => { return mockAxios.post(`${base}/system/sns/problem/overlist.do`,qs.stringify(params)).then(res => res.data); }; 
export const getProblemOverAndRefundList = params => { return mockAxios.post(`${base}/system/sns/problem/overrefundlist.do`,qs.stringify(params)).then(res => res.data); }; 
export const getProblemEndList = params => { return mockAxios.post(`${base}/system/sns/problem/endlist.do`,qs.stringify(params)).then(res => res.data); }; 
export const refundProblem = params => { return mockAxios.post(`${base}/system/sns/problem/refund.do`,qs.stringify(params)).then(res => res.data); }; 
export const getAnswerList = params => { return mockAxios.post(`${base}/system/sns/answer/list.do`,qs.stringify(params)).then(res => res.data); }; 
export const getResultList = params => { return mockAxios.post(`${base}/system/sns/result/list.do`,qs.stringify(params)).then(res => res.data); }; 
