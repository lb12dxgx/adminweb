import {mock,uuidv4} from '../api/head'

 let orgJson=[{
             orgId:"0",
             orgName:"部门管理",
             children:[{
                orgId:"0-1",
                orgName:"平台运维部",
               },{
                orgId:"0-2",
                orgName:"平台市场部1",
               },{
                orgId:"0-3",
                orgName:"平台市场部2",
               } ,{
                orgId:"0-4",
                orgName:"平台市场部3",
               } ,{
                orgId:"0-5",
                orgName:"平台市场部4",
               }  ,{
                orgId:"0-6",
                orgName:"平台市场部5",
               }     
              ]
        }]


   let menuTree=[{
             menuId:"0",
             menuName:"菜单管理",
             menuUrl:"",
             children:[{
                menuId:"0-1",
                menuName:"系统管理",
                menuUrl:"",
                children:[{
                   menuId:"0-1-1",
                   menuName:"用户管理",
                   menuUrl:"/main/system/account",
                },{
                   menuId:"0-1-2",
                   menuName:"部门管理",
                   menuUrl:"/main/system/org",
                },{
                   menuId:"0-1-3",
                   menuName:"角色管理",
                   menuUrl:"/main/system/role",
                },{
                   menuId:"0-1-4",
                   menuName:"菜单管理",
                   menuUrl:"/main/system/menu",
                }
                ]
               },{
                menuId:"0-2",
                menuName:"内容管理",
                menuUrl:"",
                children:[{
                   menuId:"0-2-1",
                   menuName:"栏目管理",
                   menuUrl:"/main/system/account",
                }
                ]
               },{
                menuId:"0-3",
                menuName:"会员管理",
                menuUrl:"",
                children:[]
               },{
                menuId:"0-4",
                menuName:"培训管理",
                menuUrl:"",
                children:[]
               },{
                menuId:"0-5",
                menuName:"招聘管理",
                menuUrl:"",
                children:[]
               },{
                menuId:"0-6",
                menuName:"商品管理",
                menuUrl:"",
                children:[]
               },
              ]
        }]

let Loginuser = [
	{
	  accountId:"1",
	  accountName:"管理员1",
      userName:"admin1",
      passworld:"123456",
      accountType:0,
      state:0,
      orgId:0,
      orgName:"平台管理",
      token:"1"
    },
    {
      accountId:"2",
      accountName:"管理员2",
      userName:"admin2",
      passworld:"123456",
      accountType:10,
      state:0,
      orgId:2,
      orgName:'业务科室2',
      token:"2"
    },
    {
      accountId:"3",
      accountName:"管理员3",
      userName:"admin3",
      passworld:"123456",
      accountType:10,
      state:0,
      orgId:2,
      orgName:'业务科室3',
      token:"3"
    },
    {
      accountId:"4",
      accountName:"管理员4",
      userName:"admin4",
      passworld:"123456",
      accountType:10,
      state:0,
      orgId:2,
      orgName:'业务科室1',
      token:"4"
    },
    {
      accountId:"5",
      accountName:"管理员5",
      userName:"admin5",
      passworld:"123456",
      accountType:10,
      state:0,
      orgId:2,
      orgName:'业务科室2',
      token:"5"
    },
    {
      accountId:"6",
      accountName:"管理员6",
      userName:"admin6",
      passworld:"123456",
      accountType:10,
      state:0,
      orgId:2,
      orgName:'业务科室3',
      token:"6"
    },
    {
      accountId:"7",
      accountName:"管理员7",
      userName:"admin7",
      passworld:"123456",
      accountType:10,
      state:0,
      orgId:2,
      orgName:'业务科室3',
      token:"6"
    },
    {
      accountId:"8",
      accountName:"管理员8",
      userName:"admin6",
      passworld:"123456",
      accountType:10,
      state:0,
      orgId:2,
      orgName:'业务科室3',
      token:"6"
    },
    {
      accountId:"9",
      accountName:"管理员9",
      userName:"admin6",
      passworld:"123456",
      accountType:10,
      state:0,
      orgId:2,
      orgName:'业务科室3',
      token:"6"
    },
    {
      accountId:"10",
      accountName:"管理员10",
      userName:"admin6",
      passworld:"123456",
      accountType:10,
      state:0,
      orgId:2,
      orgName:'业务科室3',
      token:"6"
    },
    {
      accountId:"11",
      accountName:"管理员11",
      userName:"admin6",
      passworld:"123456",
      accountType:10,
      state:0,
      orgId:2,
      orgName:'业务科室3',
      token:"6"
    },
    {
      accountId:"12",
      accountName:"管理员12",
      userName:"admin6",
      passworld:"123456",
      accountType:10,
      state:0,
      orgId:2,
      orgName:'业务科室3',
      token:"6"
    },
    {
      accountId:"13",
      accountName:"管理员13",
      userName:"admin6",
      passworld:"123456",
      accountType:10,
      state:0,
      orgId:2,
      orgName:'业务科室3',
      token:"6"
    }
]

let roleList=[
  {
    roleName: '角色1',
    roleCode: 'code1',
    roleSummary: '测试角色',
    roleId:'1'
  },{
    roleName: '角色2',
    roleCode: 'code3',
    roleSummary: '测试角色2',
    roleId:'2'
  }
]

let accountRoleList=[
  {
   roleId:"1",
   userId:"1",
   roleUserId:"1"
  },{
   roleId:"2",
   userId:"2",
   roleUserId:"2"
  }
]


let menuRoleList=[
  {
   roleId:"1",
   menuId:"1",
   roleMenuId:"1"
  },{
   roleId:"2",
   menuId:"2",
   roleMenuId:"2"
  }
]




// mock.onGet("/submint").reply(200,res=>{
// 	console.log(res)
// })
mock.onPost("/token/token.do").reply(config=>{   //config是post传过来的参数
	console.log(config.data);
	let {accountName,accountPassword}=JSON.parse(config.data)  //把字符串转化为一个对象
	return new Promise((resolve,reject) => {
		let headers = false;
		var cu={};
		setTimeout(()=>{
			Loginuser.some( u =>{
				console.log(u.username)
				if(u.userName === accountName && u.passworld === accountPassword){
						headers=true;
						cu=u;
						console.log(cu);
						return true;
				}
			})
			if(headers){
				resolve([200,{state:200,retData:cu}])
			}else{
				resolve([200,{state:0,retData:"账户或密码错误"}])
			}
		},500)
	})
})



mock.onPost("/system/account/list.do").reply(config=>{   //config是post传过来的参数
	console.log("/system/list.do"+config.data);
	let {pageNum}=JSON.parse(config.data) 
	return new Promise((resolve,reject) => {
		setTimeout(()=>{
			if(pageNum==0){
				pageNum=1;
			}
			var l=Loginuser.slice((pageNum-1)*5,pageNum*5)
			resolve([200,{state:1,retData:{"content":l,"totalElements":Loginuser.length}}])
		},500)
	})
})

mock.onPost("/system/account/alllist.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/alllist.do"+config.data);
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      resolve([200,{state:1,retData:Loginuser}])
    },500)
  })
})

mock.onPost("/system/account/save.do").reply(config=>{   //config是post传过来的参数
	console.log("/system/save.do"+config.data);
	let account=JSON.parse(config.data) 
	return new Promise((resolve,reject) => {
		setTimeout(()=>{
      account.state=0;
      account.accountId=uuidv4();
			Loginuser.push(account);
			var l=Loginuser.slice(0,5)
			resolve([200,{state:1,retData:{"content":l,"totalElements":Loginuser.length}}])
		},500)
	})
})

mock.onPost("/system/account/update.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/update.do"+config.data);
  let account=JSON.parse(config.data) 
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      for (var i = Loginuser.length - 1; i >= 0; i--) {
          if (Loginuser[i].accountId == account.accountId) {
              Loginuser[i]=account;
          }
      }
      var l=Loginuser.slice(0,5)
      resolve([200,{state:1,retData:{"content":l,"totalElements":Loginuser.length}}])
    },500)
  })
})

mock.onPost("/system/account/delete.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/delete.do"+config.data);
  let {accountId}=JSON.parse(config.data) 
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      for (var i = Loginuser.length - 1; i >= 0; i--) {
          if (Loginuser[i].accountId == accountId) {
              Loginuser.splice(i, 1);
          }
      }
      var l=Loginuser.slice(0,5)
      resolve([200,{state:1,retData:{"content":l,"totalElements":Loginuser.length}}])
    },500)
  })
})


mock.onPost("/system/org/save.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/org/save.do"+config);
  let orgJson=config.data 
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      resolve([200,{state:1,retData:orgJson}])
    },500)
  })
})


mock.onPost("/system/org/tree.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/org/tree.do"+config);
 
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
     resolve([200,{state:1,retData:orgJson}])
    },500)
  })
})

mock.onPost("/system/menu/tree.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/menu/tree.do"+config);
 
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
     resolve([200,{state:1,retData:{tree:menuTree}}])
    },500)
  })
})

mock.onPost("/system/menu/update.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/menu/save.do"+config);
  let menuJson=JSON.parse(config.data)
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      resolve([200,{state:1,retData:{node:menuJson}}])
    },500)
  })
})

mock.onPost("/system/menu/save.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/menu/save.do"+config);
  let menuJson=JSON.parse(config.data)
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      menuJson.menuId=uuidv4();
      resolve([200,{state:1,retData:{node:menuJson}}])
    },500)
  })
})

mock.onPost("/system/menu/delete.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/menu/delete.do"+config);
  let menuJson=JSON.parse(config.data)
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      resolve([200,{state:1,retData:1}])
    },500)
  })
})


mock.onPost("/system/role/list.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/role/list.do"+config.data);
  let {pageNum}=JSON.parse(config.data) 
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      if(pageNum==0){
        pageNum=1;
      }
      var l=roleList.slice((pageNum-1)*5,pageNum*5)
      resolve([200,{state:1,retData:{"content":l,"totalElements":roleList.length}}])
    },500)
  })
})

mock.onPost("/system/role/save.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/role/save.do"+config.data);
  let role=JSON.parse(config.data) 
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      role.accountId=uuidv4();
      roleList.push(role);
      var l=roleList.slice(0,5)
      resolve([200,{state:1,retData:{"content":l,"totalElements":roleList.length}}])
    },500)
  })
})

mock.onPost("/system/role/update.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/role/update.do"+config.data);
  let role=JSON.parse(config.data) 
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      for (var i = roleList.length - 1; i >= 0; i--) {
          if (roleList[i].roleId == role.roleId) {
              roleList[i]=role;
          }
      }
      var l=roleList.slice(0,5)
      resolve([200,{state:1,retData:{"content":l,"totalElements":roleList.length}}])
    },500)
  })
})

mock.onPost("/system/role/delete.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/role/delete.do"+config.data);
  let {roleId}=JSON.parse(config.data) 
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      for (var i = roleList.length - 1; i >= 0; i--) {
          if (roleList[i].roleId == roleId) {
              roleList.splice(i, 1);
          }
      }
      var l=roleList.slice(0,5)
      resolve([200,{state:1,retData:{"content":l,"totalElements":roleList.length}}])
    },500)
  })
})


mock.onPost("/system/role/accountByRole.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/role/accountByRole.do"+config.data);
  let {roleId}=JSON.parse(config.data) 
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      let l=[];
      for(var n of accountRoleList ){
        if(n.roleId == roleId){
          l.push(n);
        }
      }
      
      resolve([200,{state:1,retData:l}])
    },500)
  })
})

mock.onPost("/system/role/saveRoleAccount.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/role/saveRoleAccount.do"+config.data);
  let {userList,roleId}=JSON.parse(config.data) 
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      for (var i = accountRoleList.length - 1; i >= 0; i--) {
          if (accountRoleList[i].roleId == roleId) {
              accountRoleList.splice(i, 1);
          }
      }

      for(var n of userList){
           let accountRole={};
           accountRole.roleId=roleId;
           accountRole.userId=n;
           accountRole.roleUserId=uuidv4();
           accountRoleList.push(accountRole);
       }
      resolve([200,{state:1,retData:""}])
    },500)
  })
})


mock.onPost("/system/role/saveRoleMenu.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/role/saveRoleMenu.do"+config.data);
  let {menuList,roleId}=JSON.parse(config.data) 
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      for (var i = menuRoleList.length - 1; i >= 0; i--) {
          if (menuRoleList[i].roleId == roleId) {
              menuRoleList.splice(i, 1);
          }
      }

      for(var n of menuList){
           let menuRole={};
           menuRole.roleId=roleId;
           menuRole.menuId=n;
           menuRole.roleMenuId=uuidv4();
           menuRoleList.push(menuRole);
       }
      resolve([200,{state:1,retData:""}])
    },500)
  })
})

mock.onPost("/system/role/getRoleMenu.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/role/getRoleMenu.do"+config.data);
  let {roleId}=JSON.parse(config.data) 
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      var roleMenuList=[]
      for (var i = menuRoleList.length - 1; i >= 0; i--) {
          if (menuRoleList[i].roleId == roleId) {
              roleMenuList.push(menuRoleList[i]);
          }
      }
      resolve([200,{state:1,retData:{"menuList":roleMenuList}}])
    },500)
  })
})




export default mock