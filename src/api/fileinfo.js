import qs from 'qs';
import {mock,mockAxios,router,ip} from './head'
import {mock as mockcontent} from '../mock/mockcontent'
import {mock as mockapi} from '../mock/mock'




export const base = ip+"/";

//fileinfo(附件管理)
let fileinfo=ip+"/file";
export const fileinfos = params => { 
    return mockAxios.post(
            fileinfo+`/list.do`, 
            qs.stringify(params)).then(res => res.data); 
};  
export const deleteFileinfo = params =>{console.log("delete=");console.log(params); return mockAxios.post(fileinfo+`/delete.do`, qs.stringify(params)).then(res => res.data); };  
export const downloadFileinfo = params =>{ window.open(`${base}/file/download.do?fileInfoId=`+params); };  
