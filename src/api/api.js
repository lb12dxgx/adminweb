
import qs from 'qs';
import {mock,mockAxios,router,ip} from './head'
import {mock as mockcontent} from '../mock/mockcontent'
import {mock as mockapi} from '../mock/mock'

let base = ip;
//let base = 'http://'+ip+'/api/';
//let base = 'http://192.168.100.105:9011/api/';
export const token = params => { return mockAxios.post(`${base}/token/token.do`,qs.stringify(params)).then(res => res.data); }; 

export const accountList = params => { return mockAxios.post(`${base}/system/account/list.do`,qs.stringify(params)).then(res => res.data); }; 
export const deleteAccount = params => { return mockAxios.post(`${base}/system/account/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const saveAccount = params => { return mockAxios.post(`${base}/system/account/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateAccount = params => { return mockAxios.post(`${base}/system/account/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const accountAllList = params => { return mockAxios.post(`${base}/system/account/alllist.do`,qs.stringify(params)).then(res => res.data); }; 
export const resetAccount = params => { return mockAxios.post(`${base}/system/account/reset.do`,qs.stringify(params)).then(res => res.data); }; 
export const getMenu = params => { return mockAxios.post(`${base}/system/account/getMenu.do`,qs.stringify(params)).then(res => res.data); }; 



export const saveOrg = params => { return mockAxios.post(`${base}/system/org/save.do`,params).then(res => res.data); }; 
export const getOrgTree = params => { return mockAxios.post(`${base}/system/org/tree.do`,qs.stringify(params)).then(res => res.data); }; 

export const saveMenu = params => { return mockAxios.post(`${base}/system/menu/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateMenu = params => { return mockAxios.post(`${base}/system/menu/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getMenuTree = params => { return mockAxios.post(`${base}/system/menu/tree.do`,qs.stringify(params)).then(res => res.data); };
export const deleteMenu = params => { return mockAxios.post(`${base}/system/menu/delete.do`,qs.stringify(params)).then(res => res.data); }; 
 
export const saveDict = params => { return mockAxios.post(`${base}/system/dict/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateDict = params => { return mockAxios.post(`${base}/system/dict/update.do`,qs.stringify(params)).then(res => res.data); }; 
export const getDictTree = params => { return mockAxios.post(`${base}/system/dict/tree.do`,qs.stringify(params)).then(res => res.data); };
export const deleteDict = params => { return mockAxios.post(`${base}/system/dict/delete.do`,qs.stringify(params)).then(res => res.data); }; 
 
export const roleList = params => { return mockAxios.post(`${base}/system/role/list.do`,qs.stringify(params)).then(res => res.data); }; 
export const deleteRole = params => { return mockAxios.post(`${base}/system/role/delete.do`,qs.stringify(params)).then(res => res.data); }; 
export const saveRole = params => { return mockAxios.post(`${base}/system/role/save.do`,qs.stringify(params)).then(res => res.data); }; 
export const updateRole = params => { return mockAxios.post(`${base}/system/role/update.do`,qs.stringify(params)).then(res => res.data); };
export const accountByRole = params => { return mockAxios.post(`${base}/system/role/accountByRole.do`,qs.stringify(params)).then(res => res.data); }; 
export const saveRoleAccount = params => { return mockAxios.post(`${base}/system/role/saveRoleAccount.do`,qs.stringify(params,{arrayFormat:'repeat'})).then(res => res.data); }; 

export const saveRoleMenu = params => { return mockAxios.post(`${base}/system/role/saveRoleMenu.do`,qs.stringify(params,{arrayFormat:'repeat'})).then(res => res.data); }; 
export const getRoleMenu = params => { return mockAxios.post(`${base}/system/role/getRoleMenu.do`,qs.stringify(params)).then(res => res.data); };   

export const saveRoleColumn = params => { return mockAxios.post(`${base}/system/role/saveRoleColumn.do`,qs.stringify(params,{arrayFormat:'repeat'})).then(res => res.data); }; 
export const getRoleColumn = params => { return mockAxios.post(`${base}/system/role/getRoleColumn.do`,qs.stringify(params)).then(res => res.data); };   
export const getColumnByUserId = params => { return mockAxios.post(`${base}/system/role/getColumnByUserId.do`,qs.stringify(params)).then(res => res.data); };   





mockAxios.interceptors.request.use(
    config => {
        if (sessionStorage.getItem('accessToken')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization =sessionStorage.getItem('accessToken');
        }
        return config;
    },
    err => {

        return Promise.reject(err);
 });
 
mockAxios.interceptors.response.use(
    response => {
        console.log(response); 
        if (response.data.state==0) {
            /*MessageBox.alert('操作错误，请联系管理员!', '系统提示', {
                  confirmButtonText: '确定'
                });*/
        };
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                sessionStorage.removeItem('accessToken');
                MessageBox.alert('授权失效', '系统提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    router.push({ path: '/' });
                  }
                });
             }
        }
    });